import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
const slugs = ['edy-crm', 'war-room', 'andrea-tur', 'edy-scanurl-family', 'edy-helpdesk', 'edy-shield', 'edy-siem', 'edy-soc-analytics', 'edy-verdict', 'edy-recon', 'edy-shadowcat', 'cr-fitness', 'assistente-personalizado'];
await mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  for (const [name, width, height, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true], ['narrow', 320, 720, true]].filter(([name]) => !process.env.QA_VIEWPORT || name === process.env.QA_VIEWPORT)) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
    assert.equal(await page.locator('.work-jump-nav a').count(), 4);
    await page.locator('.work-jump-nav a').nth(2).click();
    assert.equal(new URL(page.url()).hash, '#trabalhos-reais');
    for (const slug of slugs) {
      console.log(`CHECK: ${name} ${slug}`);
      await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
      await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
      const slides = page.locator('.case-gallery-slide');
      const expected = ['edy-crm', 'cr-fitness', 'edy-soc-analytics', 'edy-shadowcat'].includes(slug) ? 4 : 2;
      assert.equal(await slides.count(), expected, `${name} ${slug}: distinct case images`);
      await slides.first().scrollIntoViewIfNeeded();
      const firstImage = slides.first().locator('img');
      await firstImage.evaluate(image => image.decode());
      assert(await firstImage.evaluate(image => image.naturalWidth > 0), `${name} ${slug}: first image failed`);
      const next = page.getByRole('button', { name: 'Próxima imagem' });
      await next.click();
      await page.waitForTimeout(450);
      await slides.nth(1).scrollIntoViewIfNeeded();
      const secondImage = slides.nth(1).locator('img');
      await secondImage.evaluate(image => image.decode());
      assert(await secondImage.evaluate(image => image.naturalWidth > 0), `${name} ${slug}: second image failed`);
      assert.equal(await page.getByRole('button', { name: 'Ver imagem:' }).nth(1).getAttribute('aria-current'), 'true', `${name} ${slug}: gallery next`);
      for (let index = 2; index < expected; index++) {
        await page.getByRole('button', { name: 'Ver imagem:' }).nth(index).click();
        await page.waitForTimeout(450);
        await slides.nth(index).scrollIntoViewIfNeeded();
        await slides.nth(index).locator('img').evaluate(image => image.decode());
        assert.equal(await page.getByRole('button', { name: 'Ver imagem:' }).nth(index).getAttribute('aria-current'), 'true', `${name} ${slug}: gallery image ${index + 1}`);
      }
      assert(await next.isDisabled(), `${name} ${slug}: next is disabled at the final image`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name} ${slug}: horizontal overflow`);
      if (['edy-siem', 'cr-fitness', 'assistente-personalizado'].includes(slug) && name !== 'narrow') {
        await page.locator('.case-gallery').screenshot({ path: `outputs/case-gallery-${slug}-${name}.png` });
      }
    }
    assert.deepEqual(errors, [], `${name}: browser errors`);
    console.log(`PASS: 13 galleries and section links ${name}`);
    await context.close();
  }

  const transitionMobile = process.env.QA_TRANSITION_MOBILE === '1';
  const context = await browser.newContext({ viewport: transitionMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: transitionMobile, hasTouch: transitionMobile, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
  await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
  await page.locator('.project-entry a[href="/work/edy-siem"]').first().click();
  await page.locator('.page-transition-cover').waitFor({ state: 'visible' });
  await page.waitForTimeout(180);
  await page.screenshot({ path: `outputs/cover-transition-${transitionMobile ? 'mobile' : 'desktop'}.png` });
  await page.waitForURL('**/work/edy-siem');
  await page.locator('.case-hero').waitFor({ state: 'visible' });
  console.log('PASS: project cover appears during case transition');
  await context.close();
} finally {
  await browser.close();
}
