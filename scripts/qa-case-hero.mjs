import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
const slugs = ['andrea-tur', 'edy-scanurl-family', 'edy-helpdesk', 'edy-shield', 'edy-siem', 'edy-soc-analytics', 'edy-crm', 'war-room', 'edy-verdict', 'edy-recon', 'edy-shadowcat', 'cr-fitness', 'assistente-personalizado'];
const formats = [['mobile', 390, 844], ['narrow', 320, 720], ['tall', 390, 1200], ['tablet', 768, 1024], ['desktop', 1440, 900]];
await mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  for (const [name, width, height] of formats) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 901, hasTouch: width < 901, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const slug of name === 'mobile' ? slugs : ['andrea-tur', 'edy-crm', 'war-room', 'assistente-personalizado']) {
      await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
      await page.locator('.case-art img').evaluate(image => image.decode());
      const layout = await page.evaluate(() => {
        const art = document.querySelector('.case-art');
        const image = art.querySelector('img');
        const status = document.querySelector('.case-status');
        const rect = element => { const r = element.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
        return { art: rect(art), image: rect(image), status: rect(status), naturalRatio: image.naturalWidth / image.naturalHeight, position: getComputedStyle(art).position, overflow: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      if (slug === 'andrea-tur') await page.locator('.case-hero').screenshot({ path: `outputs/case-hero-andrea-${name}.png` });
      assert.equal(layout.overflow, false, `${name} ${slug}: horizontal overflow`);
      if (width < 901) {
        assert(layout.art.top >= layout.status.bottom + 16, `${name} ${slug}: cover overlaps text or has no spacing ${JSON.stringify(layout)}`);
        assert(Math.abs(layout.image.height - layout.image.width / layout.naturalRatio) < 2, `${name} ${slug}: cover proportions distorted`);
        assert(Math.abs(layout.art.height - layout.image.height) <= 3, `${name} ${slug}: empty dark space around cover ${JSON.stringify(layout)}`);
      } else {
        assert.equal(layout.position, 'absolute', `${slug}: desktop composition changed`);
      }
    }
    assert.deepEqual(errors, [], `${name}: browser errors`);
    console.log(`PASS: case covers ${name}`);
    await context.close();
  }
} finally {
  await browser.close();
}
