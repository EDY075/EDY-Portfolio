import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4175';
const canonical = 'https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev';
await mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width < 901, isMobile: width < 901 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    const caseLink = page.locator('.project-entry a[href="/work/war-room"]').first();
    await caseLink.click();
    await page.waitForURL('**/work/war-room');
    await page.locator('.page-transition-content[data-navigation-ready="true"]').waitFor();
    await page.locator('.case-art img').evaluate(image => image.decode());
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.site-nav .nav-primary a')).color === 'rgb(217, 215, 204)');
    assert.equal(await page.locator('h1').innerText(), 'WAR ROOM');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${canonical}/work/war-room`);
    assert.equal(await page.locator('.case-links a').count(), 3);
    assert.equal(await page.getByRole('link', { name: 'Ouvir os 17 casos' }).getAttribute('href'), 'https://edy075.github.io/WAR_ROOM/assets/media/narrations/');
    await page.getByRole('link', { name: 'Ouvir os 17 casos' }).focus();
    assert.equal(await page.getByRole('link', { name: 'Ouvir os 17 casos' }).evaluate(e => e === document.activeElement), true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.site-nav').dataset.scrollState === 'top' && document.querySelector('.site-nav').dataset.surface === 'dark');
    await page.screenshot({ path: `outputs/war-room-case-${name}.png` });
    await page.locator('.case-gallery').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Próxima imagem' }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelectorAll('.case-gallery-pagination button')[1]?.getAttribute('aria-current') === 'true');
    await page.locator('.case-gallery-slide').nth(1).locator('img').evaluate(image => image.decode());
    await page.locator('.case-gallery').screenshot({ path: `outputs/war-room-gallery-${name}.png` });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    await page.getByRole('link', { name: 'Todos os projetos', exact: true }).first().click();
    await page.waitForURL('**/work');
    await page.locator('#explorar-3d summary').click();
    assert.equal(await page.locator('#explorar-3d').getAttribute('open'), '');
    await page.locator('.project-wheel-index a').first().waitFor();
    assert.equal(await page.locator('.project-wheel-index a').count(), 12);
    assert.equal(await page.locator('.project-wheel-index a[href="/work/war-room#detalhes"]').count(), 1);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#explorar-3d').getAttribute('open'), null);
    assert.equal(await page.locator('#explorar-3d summary').evaluate(e => e === document.activeElement), true);
    assert.deepEqual(errors, []);
    const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
    assert(sitemap.includes(`${canonical}/work/war-room`));
    assert(!sitemap.includes('/work/edy-shadowcat'));
    assert(!sitemap.includes('/work/assistente-personalizado'));
    for (const slug of ['edy-shadowcat', 'assistente-personalizado']) {
      await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
      assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    }
    console.log(`PASS: WAR ROOM integration, keyboard, gallery, Escape/focus and metadata ${name} at ${base}`);
    await context.close();
  }
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference', hasTouch: width < 901, isMobile: width < 901 });
    const page = await context.newPage();
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.locator('.project-entry a[href="/work/war-room"]').first().click();
    await page.locator('.page-transition-cover').waitFor({ state: 'visible' });
    await page.waitForURL('**/work/war-room');
    await page.locator('.page-transition-content[data-navigation-ready="true"]').waitFor();
    await page.waitForFunction(() => scrollY < 24);
    assert.equal(await page.locator('h1').innerText(), 'WAR ROOM');
    console.log(`PASS: WAR ROOM cover transition and arrival position at ${width}px`);
    await context.close();
  }
} finally { await browser.close(); }
