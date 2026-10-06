import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = (process.env.BASE_URL || 'http://localhost:4175').replace(/\/$/, '');
const canonicalBase = 'https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev';
const output = process.env.QA_OUTPUT || 'outputs/portfolio-review/release';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  assert.equal(await page.locator('.project-entry').count(), 14);
  assert.equal(await page.locator('.project-entry .project-case-label').filter({ hasText: 'Ver case' }).count(), 14);
  const casePaths = await page.locator('.project-entry a').evaluateAll(nodes => [...new Set(nodes.map(node => new URL(node.href).pathname))]);
  assert.equal(casePaths.length, 13);
  assert(casePaths.includes('/work/edy-crm'));
  assert(casePaths.includes('/work/war-room'));
  for (const path of casePaths) {
    const caseResponse = await page.goto(base + path, { waitUntil: 'networkidle' });
    assert.equal(caseResponse.status(), 200, `${path}: status`);
    assert.equal(await page.locator('h1').count(), 1, `${path}: heading`);
    assert(await page.locator('.case-hero').evaluate(hero => {
      const kicker = hero.querySelector('.page-kicker').getBoundingClientRect();
      const back = hero.querySelector('.back-link').getBoundingClientRect();
      return back.top >= kicker.bottom + 8;
    }), `${path}: back link must not overlap the project kicker`);
    assert.equal(await page.locator('#detalhes').count(), 1, `${path}: details`);
    assert.equal(await page.locator('.case-gallery-slide').count(), 2, `${path}: images`);
    await page.locator('.case-art img').evaluate(image => image.decode());
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonicalBase + path);
    assert.equal(await page.locator('a [class*="lucide-arrow"], button [class*="lucide-arrow"]').count(), 0);
    const clickableLabels = await page.locator('main a, main button, main summary').allTextContents();
    assert(clickableLabels.every(label => !/[↗→←]/.test(label)), `${path}: decorative arrows in controls`);
    if (path === '/work/edy-crm') {
      assert.equal(await page.locator('.case-links a').getAttribute('href'), 'https://github.com/EDY075/EDY-CRM');
      await page.locator('.case-hero').screenshot({ path: `${output}/crm-desktop.png` });
    }
    results.push({ path, status: caseResponse.status() });
  }
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  const xml = await sitemap.text();
  assert(xml.includes(`${canonicalBase}/work/edy-crm`));
  assert(xml.includes(`${canonicalBase}/work/war-room`));
  assert(!xml.includes('/work/edy-shadowcat'));
  assert(!xml.includes('/work/assistente-personalizado'));
  const robots = await context.request.get(`${base}/robots.txt`);
  assert.equal(robots.status(), 200);
  assert(!(await robots.text()).includes('Disallow: /\n'));
  assert.deepEqual(errors, []);
  assert.equal((await context.request.get(`${base}/experience`)).status(), 404, 'paused experiment must stay out of this release');
  await context.close();

  for (const [width, height] of [[320, 720], [390, 844], [768, 1024], [1024, 600], [1440, 900]]) {
    const phone = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    await phone.goto(`${base}/work/edy-crm`, { waitUntil: 'networkidle' });
    await phone.locator('.case-art img').evaluate(image => image.decode());
    assert(!(await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), `${width}: overflow`);
    for (const image of await phone.locator('.case-gallery-slide img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(node => node.decode());
      assert(await image.evaluate(node => node.naturalWidth > 0));
    }
    await phone.getByRole('button', { name: 'Ver imagem:' }).first().click();
    await phone.waitForTimeout(550);
    assert.equal(await phone.getByRole('button', { name: 'Ver imagem:' }).first().getAttribute('aria-current'), 'true');
    await phone.getByRole('button', { name: 'Próxima imagem' }).click();
    await phone.waitForTimeout(550);
    assert.equal(await phone.getByRole('button', { name: 'Ver imagem:' }).nth(1).getAttribute('aria-current'), 'true');
    await phone.getByRole('button', { name: 'Imagem anterior' }).click();
    await phone.waitForTimeout(550);
    assert.equal(await phone.getByRole('button', { name: 'Ver imagem:' }).first().getAttribute('aria-current'), 'true');
    await phone.locator('.case-hero').screenshot({ path: `${output}/crm-${width}.png` });
    await phone.close();
  }
  await fs.writeFile(`${output}/checks.json`, JSON.stringify({ base, cases: results, status: 'PASS' }, null, 2));
  console.log('PASS: 13 cases, CRM, WAR ROOM, imagens, links, canonical, sitemap, robots e CRM em cinco viewports');
} finally {
  await browser.close();
}
