import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4178';
const output = process.env.QA_OUTPUT || 'outputs/portfolio-review/curation';
const featured = ['edy-crm', 'cr-fitness', 'edy-soc-analytics', 'assistente-personalizado', 'edy-shadowcat', 'edy-recon', 'war-room'];
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

try {
  for (const [width, height] of [[390, 844], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/work']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      const selection = page.locator(route === '/' ? '#selected-work .project-entry' : '#destaques .project-entry');
      assert.deepEqual(await selection.locator('a').evaluateAll(nodes => nodes.map(node => new URL(node.href).pathname)), featured.map(slug => `/work/${slug}`));
      for (let index = 0; index < featured.length; index++) {
        const card = selection.nth(index);
        await card.scrollIntoViewIfNeeded();
        await card.locator('img').evaluate(image => image.decode());
        await page.waitForTimeout(250);
        const labelFits = await card.locator('.project-copy').evaluate(copy => {
          const range = document.createRange();
          range.selectNodeContents(copy.querySelector('h3'));
          const titleRects = Array.from(range.getClientRects());
          const label = copy.querySelector('.project-case-label').getBoundingClientRect();
          return titleRects.every(rect => Math.min(rect.right, label.right) <= Math.max(rect.left, label.left)
            || Math.min(rect.bottom, label.bottom) <= Math.max(rect.top, label.top));
        });
        assert(labelFits, `${route} ${featured[index]} ${width}: title and CTA must not overlap`);
        if (['cr-fitness', 'assistente-personalizado', 'edy-shadowcat', 'edy-recon'].includes(featured[index])) {
          await card.screenshot({ path: `${output}/${route === '/' ? 'home' : 'work'}-${featured[index]}-${width}.png` });
        }
      }
    }

    for (const slug of featured) {
      await page.goto(`${base}/work/${slug}`, { waitUntil: 'networkidle' });
      await page.locator('.case-art img').evaluate(image => image.decode());
      const cover = await page.locator('.case-art img').getAttribute('src');
      const galleryImages = await page.locator('.case-gallery-slide img').evaluateAll(nodes => nodes.map(node => node.getAttribute('src')));
      assert(galleryImages.every(src => src !== cover), `${slug}: screenshots must differ from the cover`);
      if (['assistente-personalizado', 'edy-shadowcat'].includes(slug)) {
        assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
        assert.equal(await page.locator('.case-links a').count(), 0);
      }
      if (['cr-fitness', 'assistente-personalizado', 'edy-recon'].includes(slug)) {
        assert.match(await page.locator('.case-cover-note').innerText(), /ilustrativa/);
        await page.locator('.case-hero').screenshot({ path: `${output}/case-${slug}-${width}.png` });
      }
      await page.getByRole('link', { name: 'Origem', exact: true }).click();
      assert.equal(new URL(page.url()).hash, '#origem');
      await page.waitForFunction(() => Array.from(document.querySelectorAll('#origem > div')).every(node => Number(getComputedStyle(node).opacity) === 1));
      await page.locator('#origem').screenshot({ path: `${output}/origin-${slug}-${width}.png` });
      await page.getByRole('link', { name: 'Imagens do projeto', exact: true }).click();
      assert.equal(new URL(page.url()).hash, '#galeria');
      for (let index = 0; index < galleryImages.length; index++) {
        await page.getByRole('button', { name: 'Ver imagem:' }).nth(index).click();
        await page.waitForTimeout(450);
        const slide = page.locator('.case-gallery-slide').nth(index);
        await slide.locator('img').evaluate(image => image.decode());
        assert.equal(await page.getByRole('button', { name: 'Ver imagem:' }).nth(index).getAttribute('aria-current'), 'true');
        assert((await slide.locator('figcaption p').innerText()).trim(), `${slug}: each image needs a contextual caption`);
        if (index === galleryImages.length - 1) {
          await slide.screenshot({ path: `${output}/inside-${slug}-${width}.png` });
        }
      }
      results.push({ slug, width, images: galleryImages.length });
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  await fs.writeFile(`${output}/visual-checks.json`, JSON.stringify({ base, results, status: 'PASS' }, null, 2));
  console.log('PASS: highlight order, cover/title/CTA layout, origin links, all featured gallery images, captions and privacy at 390/1440');
} finally {
  await browser.close();
}
