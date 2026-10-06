import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
await fs.mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  for (const [name, width, height, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true], ['narrow', 320, 720, true]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
    const cards = page.locator('.project-entry');
    assert.equal(await cards.count(), 14, `${name}: seven featured, four technical, three client cards`);
    for (const entry of await cards.all()) {
      await entry.scrollIntoViewIfNeeded();
      const card = entry.locator('img').first();
      await card.waitFor({ state: 'visible' });
      await card.evaluate((image) => image.decode());
      assert(await card.evaluate((image) => image.naturalWidth > 0), `${name}: cover failed`);
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name}: horizontal overflow`);
    await page.locator('.work-private').screenshot({ path: `outputs/covers-real-work-${name}.png` });
    if (name === 'desktop') await page.locator('.work-technical').screenshot({ path: 'outputs/covers-technical-desktop.png' });
    assert.deepEqual(errors, [], `${name}: browser errors`);
    await context.close();
    console.log(`PASS: covers ${name}`);
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const slug of ['cr-fitness', 'edy-recon', 'edy-shadowcat', 'assistente-personalizado']) {
    await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
    await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
    await page.locator('.case-art img').evaluate((image) => image.decode());
    await page.screenshot({ path: `outputs/case-${slug}-mobile-cover.png` });
    if (await page.locator('.case-evidence').count()) {
      await page.locator('.case-evidence').scrollIntoViewIfNeeded();
      await page.locator('.case-evidence img').evaluate((image) => image.decode());
      await page.locator('.case-evidence').screenshot({ path: `outputs/case-${slug}-mobile-detail.png` });
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${slug}: horizontal overflow`);
    console.log(`PASS: mobile case ${slug}`);
  }
  await context.close();
} finally {
  await browser.close();
}
