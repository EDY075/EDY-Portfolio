import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
const output = 'outputs/portfolio-review';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function openGallery(page) {
  await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
  await page.locator('.project-explorer > summary').click();
  await page.waitForTimeout(1000);
  const stage = await page.locator('.project-wheel-stage').boundingBox();
  assert(stage);
  await page.mouse.move(stage.x + stage.width / 2, stage.y + stage.height / 2);
  await page.mouse.wheel(0, 140);
  await page.waitForTimeout(1100);
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await openGallery(page);
  await page.locator('#project-wheel-0').click();
  await page.waitForURL('**/work/andrea-tur#detalhes', { timeout: 5000 });
  console.log('PASS: clicar diretamente na capa 3D abre o case');

  await openGallery(page);
  const card = await page.locator('#project-wheel-0').boundingBox();
  assert(card);
  await page.mouse.move(card.x + card.width / 2, card.y + card.height / 2);
  await page.mouse.down();
  for (let step = 1; step <= 20; step++) {
    await page.mouse.move(card.x + card.width / 2, card.y + card.height / 2 - 21 * step);
    await page.waitForTimeout(16);
  }
  await page.mouse.up();
  await page.waitForTimeout(1100);
  assert.equal(new URL(page.url()).pathname, '/work', 'arrastar não deve abrir o case');
  assert.match(await page.locator('.project-wheel-current h3').textContent(), /ScanURL Family/);
  await page.locator('#project-wheel-1').click();
  await page.waitForURL('**/work/edy-scanurl-family#detalhes');
  console.log('PASS: arrastar gira a galeria e o clique seguinte abre o projeto');

  await openGallery(page);
  const expected = await page.locator('.project-wheel-index a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  for (let index = 0; index < expected.length; index++) {
    if (index > 0) await openGallery(page);
    await page.locator('.project-wheel-index a').nth(index).hover();
    await page.waitForTimeout(1100);
    await page.locator(`#project-wheel-${index}`).click();
    await page.waitForURL(base + expected[index]);
  }
  console.log(`PASS: as ${expected.length} capas 3D abrem os respectivos cases`);

  await openGallery(page);
  await page.locator('#project-wheel-0').focus();
  await page.waitForTimeout(1100);
  await page.keyboard.press('Enter');
  await page.waitForURL('**/work/andrea-tur#detalhes');
  console.log('PASS: teclado abre a capa em foco');
  await page.close();

  const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await phone.goto(`${base}/work`, { waitUntil: 'networkidle' });
  await phone.locator('.project-explorer > summary').tap();
  await phone.getByRole('button', { name: 'Próximo projeto' }).filter({ visible: true }).tap();
  await phone.waitForTimeout(1100);
  await phone.locator('#project-wheel-0').tap();
  await phone.waitForURL('**/work/andrea-tur#detalhes');
  console.log('PASS: toque na capa abre o case no celular');
  await phone.close();
} finally {
  await browser.close();
}
