import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
const output = 'outputs/portfolio-review';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const casesOnly = process.env.QA_CASES_ONLY === '1';
const routes = casesOnly
  ? ['andrea-tur', 'edy-scanurl-family', 'edy-helpdesk', 'edy-shield', 'edy-siem', 'edy-soc-analytics', 'edy-crm', 'war-room', 'edy-verdict', 'edy-recon', 'edy-shadowcat', 'cr-fitness', 'assistente-personalizado'].map(slug => `/work/${slug}`)
  : ['/', '/about', '/work', '/capabilities', '/contact'];
const sizes = casesOnly ? [[390, 844], [1440, 900]] : [[320, 720], [390, 844], [768, 1024], [1024, 600], [1280, 720], [1366, 768], [1440, 900], [1920, 1080], [2560, 1440]];

try {
  for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    let errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      errors = [];
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
      for (const section of await page.locator('main > section, .project-entry').all()) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(900);
      const report = await page.evaluate(() => {
        const visible = (node) => {
          const style = getComputedStyle(node);
          return node.getClientRects().length && style.visibility !== 'hidden' && Number(style.opacity) > 0;
        };
        const label = (node) => ({ tag: node.tagName, class: node.className, text: node.textContent.trim().slice(0, 90) });
        const textBounds = (node) => {
          const range = document.createRange();
          range.selectNodeContents(node);
          return Array.from(range.getClientRects());
        };
        const textNodes = Array.from(document.querySelectorAll('h1,h2,h3,p,a,button,summary,small'))
          .filter(node => visible(node) && !node.closest('.page-transition-curtain,.home-entry,.case-gallery-track,.work-jump-nav') && node.textContent.trim());
        const overflow = textNodes.filter(node => textBounds(node).some(rect => rect.left < -2 || rect.right > innerWidth + 2)).map(label);
        const overlap = [];
        const heads = textNodes.filter(node => /^H[123]$/.test(node.tagName));
        const other = textNodes.filter(node => !/^H[123]$/.test(node.tagName));
        for (const heading of heads) {
          for (const node of other) {
            if (heading.contains(node) || node.contains(heading)) continue;
            const a = heading.getBoundingClientRect(), b = node.getBoundingClientRect();
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 8 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 8) {
              overlap.push({ heading: label(heading), other: label(node) });
            }
          }
        }
        const arrows = Array.from(document.querySelectorAll('a,button,summary')).filter(node => /[↗→←]/.test(node.textContent) || node.querySelector('[class*="lucide-arrow"]')).map(label);
        return { scrollWidth: document.documentElement.scrollWidth, overflow, overlap, arrows, h1: document.querySelectorAll('h1').length };
      });
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true });
      results.push({ route, width, height, status: response?.status(), errors: [...errors], ...report });
      console.log(JSON.stringify(results.at(-1)));
    }
    await context.close();
  }
  for (const [width, height] of casesOnly ? [] : [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.locator('.project-explorer > summary').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Próximo projeto' }).filter({ visible: true }).click();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${output}/gallery-${width}.png` });
    const gallery = await page.locator('.project-wheel-section').evaluate((node) => {
      const rect = (selector) => {
        const bounds = node.querySelector(selector).getBoundingClientRect();
        return { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };
      };
      const rail = node.querySelector('.project-wheel-rail');
      return { stage: rect('.project-wheel-stage'), rail: rect('.project-wheel-rail'), card: rect('#project-wheel-0'), scrollHeight: rail.scrollHeight, clientHeight: rail.clientHeight };
    });
    results.push({ route: '/work#explorar-3d', width, height, gallery });
    console.log(JSON.stringify(results.at(-1)));
    await page.close();
  }
  await fs.writeFile(`${output}/${casesOnly ? 'case-layout' : 'layout'}.json`, JSON.stringify(results, null, 2));
  const failures = results.filter(row => !row.gallery && (row.status !== 200 || row.errors.length || row.overflow.length || row.overlap.length || row.arrows.length));
  assert.deepEqual(failures, [], 'layout review must have no page errors, text overlap, clipped text or arrows');
} finally {
  await browser.close();
}
