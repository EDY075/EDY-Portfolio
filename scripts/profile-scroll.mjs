import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const label = process.argv[2] ?? 'baseline';
const baseUrl = process.argv[3] ?? 'http://127.0.0.1:4173';
const outputDir = path.resolve('artifacts/about-scroll-performance');
const profileDir = path.join(outputDir, `chrome-profile-${label}`);
const expectedProfileRoot = `${outputDir}${path.sep}`;
if (!profileDir.startsWith(expectedProfileRoot)) throw new Error('Unsafe Chrome profile path.');
const port = 9337;
const scenarios = [
  { name: 'slow', count: 12, deltaY: 70, interval: 140 },
  { name: 'normal', count: 12, deltaY: 190, interval: 80 },
  { name: 'fast', count: 10, deltaY: 460, interval: 45 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const percentile = (values, ratio) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * ratio))];
};
const round = (value) => Number(value.toFixed(2));

class Cdp {
  constructor(url) {
    this.id = 0;
    this.pending = new Map();
    this.waiters = new Map();
    this.ws = new WebSocket(url);
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const waiters = this.waiters.get(message.method) ?? [];
      this.waiters.delete(message.method);
      waiters.forEach((resolve) => resolve(message.params));
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  event(method) {
    return new Promise((resolve) => {
      const waiters = this.waiters.get(method) ?? [];
      waiters.push(resolve);
      this.waiters.set(method, waiters);
    });
  }

  close() { this.ws.close(); }
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error('Chrome debugging endpoint did not become ready.');
}

async function createPage(url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  if (!response.ok) throw new Error(`Unable to create CDP page: ${response.status}`);
  return response.json();
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

function summarizeSegment(segment) {
  const frames = segment.frames.filter((value) => value > 0 && value < 1000);
  const firstWheel = segment.wheels[0];
  const lastWheel = segment.wheels.at(-1);
  const firstMovement = firstWheel
    ? segment.scrolls.find((sample) => sample.t >= firstWheel.t && sample.y !== firstWheel.y)
    : undefined;
  const lastMovement = segment.scrolls.at(-1);
  return {
    scenario: segment.name,
    frameCount: frames.length,
    averageFrameMs: round(frames.reduce((sum, value) => sum + value, 0) / Math.max(1, frames.length)),
    p95FrameMs: round(percentile(frames, 0.95)),
    p99FrameMs: round(percentile(frames, 0.99)),
    worstFrameMs: round(Math.max(0, ...frames)),
    framesOver16_7Ms: frames.filter((value) => value > 16.7).length,
    framesOver25Ms: frames.filter((value) => value > 25).length,
    framesOver33Ms: frames.filter((value) => value > 33.34).length,
    estimatedDroppedFrames: frames.reduce((sum, value) => sum + Math.max(0, Math.floor(value / 16.67) - 1), 0),
    wheelToFirstMovementMs: firstWheel && firstMovement ? round(firstMovement.t - firstWheel.t) : null,
    glideAfterLastWheelMs: lastWheel && lastMovement ? round(Math.max(0, lastMovement.t - lastWheel.t)) : null,
    scrollDistance: round((lastMovement?.y ?? segment.startY) - segment.startY),
    wheelDelta: segment.wheels.reduce((sum, event) => sum + event.deltaY, 0),
    longTasks: segment.longTasks.length,
    worstLongTaskMs: round(Math.max(0, ...segment.longTasks.map((task) => task.duration))),
  };
}

async function profileRoute(cdp, route, native = false) {
  const url = `${baseUrl}${route}${native ? '?native-scroll=1' : ''}`;
  const loaded = cdp.event('Page.loadEventFired');
  await cdp.send('Page.navigate', { url });
  await loaded;
  await evaluate(cdp, `document.fonts.ready.then(() => new Promise(resolve => setTimeout(resolve, 500)))`);
  await cdp.send('Performance.disable');
  await cdp.send('Performance.enable', { timeDomain: 'timeTicks' });
  await evaluate(cdp, `
    (() => {
      window.scrollTo(0, 0);
      window.__edyScrollProbeCleanup?.();
      const state = { segments: [], active: null, observer: null };
      let raf = 0;
      let previousFrame = 0;
      const frame = (time) => {
        if (state.active) {
          if (previousFrame) state.active.frames.push(time - previousFrame);
          previousFrame = time;
        } else previousFrame = 0;
        raf = requestAnimationFrame(frame);
      };
      const wheel = (event) => {
        if (state.active) state.active.wheels.push({ t: performance.now(), y: scrollY, deltaY: event.deltaY });
      };
      const scroll = () => {
        if (state.active) state.active.scrolls.push({ t: performance.now(), y: scrollY });
      };
      addEventListener('wheel', wheel, { passive: true });
      addEventListener('scroll', scroll, { passive: true });
      if ('PerformanceObserver' in window) {
        state.observer = new PerformanceObserver((list) => {
          if (!state.active) return;
          for (const entry of list.getEntries()) state.active.longTasks.push({ start: entry.startTime, duration: entry.duration });
        });
        try { state.observer.observe({ type: 'longtask', buffered: true }); } catch {}
      }
      raf = requestAnimationFrame(frame);
      window.__edyScrollProbe = state;
      window.__edyScrollProbeStart = (name) => {
        const segment = { name, startY: scrollY, frames: [], wheels: [], scrolls: [], longTasks: [] };
        state.segments.push(segment);
        state.active = segment;
      };
      window.__edyScrollProbeStop = () => { state.active = null; };
      window.__edyScrollProbeCleanup = () => {
        cancelAnimationFrame(raf);
        removeEventListener('wheel', wheel);
        removeEventListener('scroll', scroll);
        state.observer?.disconnect();
      };
      return true;
    })()
  `);

  const metricsBefore = await cdp.send('Performance.getMetrics');
  for (const scenario of scenarios) {
    await evaluate(cdp, `window.scrollTo(0, 0); new Promise(resolve => setTimeout(resolve, 300))`);
    await evaluate(cdp, `window.__edyScrollProbeStart(${JSON.stringify(scenario.name)})`);
    for (let index = 0; index < scenario.count; index += 1) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: scenario.deltaY });
      await sleep(scenario.interval);
    }
    await sleep(650);
    await evaluate(cdp, 'window.__edyScrollProbeStop()');
    await sleep(120);
  }
  const metricsAfter = await cdp.send('Performance.getMetrics');
  const data = await evaluate(cdp, 'window.__edyScrollProbe.segments');
  await evaluate(cdp, 'window.__edyScrollProbeCleanup()');
  const toMap = ({ metrics }) => Object.fromEntries(metrics.map(({ name, value }) => [name, value]));
  const before = toMap(metricsBefore);
  const after = toMap(metricsAfter);
  const metricDelta = {};
  for (const key of ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration']) {
    metricDelta[key] = round(((after[key] ?? 0) - (before[key] ?? 0)) * 1000);
  }
  return {
    route,
    mode: native ? 'native' : 'lenis',
    viewport: { width: 1440, height: 900 },
    htmlClass: await evaluate(cdp, 'document.documentElement.className'),
    scrollTriggers: await evaluate(cdp, `document.querySelectorAll('[data-scroll-trigger]').length`),
    performance: metricDelta,
    scenarios: data.map(summarizeSegment),
  };
}

await mkdir(outputDir, { recursive: true });
await rm(profileDir, { recursive: true, force: true });
const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  '--disable-extensions',
  '--disable-background-networking',
  '--disable-default-apps',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  'about:blank',
], { stdio: 'ignore', windowsHide: true });

try {
  await waitForChrome();
  const page = await createPage('about:blank');
  const cdp = new Cdp(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const native = label.includes('native');
  const results = native
    ? [await profileRoute(cdp, '/about', true)]
    : [await profileRoute(cdp, '/'), await profileRoute(cdp, '/about'), await profileRoute(cdp, '/work')];
  cdp.close();
  const report = { label, generatedAt: new Date().toISOString(), scenarios, results };
  await writeFile(path.join(outputDir, `${label}.json`), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report, null, 2));
} finally {
  chrome.kill();
  await sleep(300);
  await rm(profileDir, { recursive: true, force: true });
}
