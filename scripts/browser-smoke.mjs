import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debugPort = 9333;
const origin = 'http://127.0.0.1:4173';
const routes = [
  '/', '/about', '/work', '/capabilities', '/contact',
  '/work/edy-shadowcat', '/work/edy-verdict', '/work/edy-recon',
  '/work/edy-scanurl-family', '/work/edy-helpdesk', '/work/edy-soc-analytics',
];
const profileDir = resolve('.qa-chrome', `launch-${Date.now()}`);
await mkdir(profileDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profileDir}`, 'about:blank',
], { stdio: 'ignore' });

const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
let socket;
let sequence = 0;
const pending = new Map();
const consoleErrors = [];

async function waitForDebugger() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await delay(100);
  }
  throw new Error('Chrome DevTools Protocol indisponível.');
}

function send(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolveCommand, rejectCommand) => {
    pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(pathname) {
  await send('Page.navigate', { url: `${origin}${pathname}` });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(`document.readyState === 'complete' && location.pathname === ${JSON.stringify(pathname)}`);
    if (ready) break;
    await delay(100);
  }
  await delay(250);
  return evaluate(`({ path: location.pathname, title: document.title, h1: document.querySelector('h1')?.innerText ?? '', y: Math.round(scrollY) })`);
}

try {
  const webSocketUrl = await waitForDebugger();
  socket = new WebSocket(webSocketUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener('open', resolveOpen, { once: true });
    socket.addEventListener('error', rejectOpen, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handler.reject(new Error(message.error.message));
      else handler.resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') consoleErrors.push(message.params.exceptionDetails.text);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(' '));
    }
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') consoleErrors.push(message.params.entry.text);
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  const desktop = [];
  for (const route of routes) desktop.push(await navigate(route));

  await send('Emulation.setDeviceMetricsOverride', {
    width: 393, height: 851, deviceScaleFactor: 2.75, mobile: true,
    screenWidth: 393, screenHeight: 851,
  });
  const mobile = [];
  for (const route of routes) mobile.push(await navigate(route));

  await navigate('/');
  await evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await delay(250);
  const scrolledBeforeClick = await evaluate('Math.round(scrollY)');
  await evaluate("document.querySelector('.next-chapter-link[href=\"/about\"]')?.click()");
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await evaluate("location.pathname === '/about'")) break;
    await delay(100);
  }
  await delay(850);
  const topAfterChapterNavigation = await evaluate('Math.round(scrollY)');

  const externalLinks = await evaluate(`Array.from(document.querySelectorAll('a[href^="http"]')).map((a) => a.href)`);
  console.log(JSON.stringify({ desktop, mobile, scrolledBeforeClick, topAfterChapterNavigation, externalLinks: [...new Set(externalLinks)], consoleErrors }, null, 2));
} finally {
  socket?.close();
  chrome.kill();
}
