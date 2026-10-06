import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:4175';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await fs.mkdir('outputs', { recursive: true });

async function openGallery(page) {
  await page.goto(base + '/work', { waitUntil: 'networkidle' });
  await page.locator('.home-entry').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
  await page.locator('.project-explorer > summary').click();
  await page.locator('.project-wheel-section').waitFor({ state: 'visible' });
  await page.waitForTimeout(950);
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await openGallery(page);
  const gallery = page.locator('.project-explorer');
  const stage = page.locator('.project-wheel-stage');
  const box = await stage.boundingBox();
  assert(box, 'gallery stage must be visible');
  await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5);
  const activeTitle = () => page.locator('.project-wheel-current h3').textContent();
  const wheel = async (delta, pause = 850) => { await page.mouse.wheel(0, delta); await page.waitForTimeout(pause); };

  await wheel(140);
  assert.match(await activeTitle(), /Andréa Tur/);
  await wheel(140, 1200);
  assert.match(await activeTitle(), /ScanURL Family/);
  console.log('PASS: roda avança mesmo após uma pausa longa');

  // A sequência de pequenos eventos não pode estender indefinidamente o intervalo.
  await wheel(140, 100);
  for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 140); await page.waitForTimeout(150); }
  await page.mouse.wheel(0, 140);
  await page.waitForTimeout(900);
  assert.notEqual(await activeTitle(), 'EDY ScanURL Family', 'continuous wheel events must not freeze progress');
  console.log('PASS: touchpad contínuo não congela a galeria');

  // O limite deve liberar a página e aceitar a direção contrária sem reabrir o painel.
  await page.locator('.project-wheel-index a').last().hover();
  await page.waitForTimeout(950);
  const beforeReverse = await activeTitle();
  await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5);
  const beforeExitY = await page.evaluate(() => window.scrollY);
  await wheel(160, 1000);
  const afterExitY = await page.evaluate(() => window.scrollY);
  assert(afterExitY > beforeExitY + 2, 'wheel past the final project must resume page scrolling');
  await gallery.evaluate((node) => node.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(350);
  const returnBox = await stage.boundingBox();
  assert(returnBox);
  await page.mouse.move(returnBox.x + returnBox.width * .5, returnBox.y + returnBox.height * .5);
  await wheel(-180, 950);
  assert.notEqual(await activeTitle(), beforeReverse, 'reversing at the end must return to a project');
  assert(await gallery.getAttribute('open') !== null, 'gallery must remain open');
  await page.screenshot({ path: 'outputs/gallery-wheel-desktop-qa.png' });
  console.log('PASS: saída e retorno pelo limite');

  // O CTA do projeto abre o case completo e traz o problema ao primeiro foco.
  await page.locator('.project-wheel-current a').click();
  await page.waitForURL(/\/work\/[\w-]+#detalhes$/);
  await page.locator('#detalhes').waitFor({ state: 'visible', timeout: 10000 });
  assert(await page.getByText('O desafio').isVisible());
  await page.waitForTimeout(850);
  const desktopTop = await page.locator('#detalhes').evaluate((node) => node.getBoundingClientRect().top);
  assert(Math.abs(desktopTop) < 180, `desktop case details should be in view, got top=${desktopTop}`);
  console.log('PASS: Ver projeto abre detalhes e desafio');
  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
  const phone = await mobile.newPage();
  await openGallery(phone);
  await phone.getByRole('button', { name: 'Próximo projeto' }).click();
  assert.match(await phone.locator('.project-wheel-current h3').textContent(), /Andréa Tur/);
  await phone.locator('.project-wheel-current a').click();
  await phone.waitForURL(/\/work\/andrea-tur#detalhes$/);
  await phone.locator('#detalhes').waitFor({ state: 'visible', timeout: 10000 });
  assert(await phone.getByText('O desafio').isVisible());
  assert.equal((await phone.locator('.case-links a').first().textContent())?.trim(), 'Endereço do site');
  assert(!(await phone.locator('body').innerText()).includes('fora do ar'), 'Andréa Tur case must use the neutral status copy');
  assert(!(await phone.locator('body').innerText()).includes('reativado'), 'Andréa Tur case must not discuss the upcoming reactivation');
  await phone.waitForTimeout(850);
  const mobileTop = await phone.locator('#detalhes').evaluate((node) => node.getBoundingClientRect().top);
  assert(Math.abs(mobileTop) < 180, `mobile case details should be in view, got top=${mobileTop}`);
  await phone.screenshot({ path: 'outputs/gallery-case-mobile-qa.png' });
  const overflow = await phone.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  assert(!overflow, 'mobile case must not overflow horizontally');
  const titleFits = await phone.locator('.overview-title h2 em').evaluate((node) => node.getBoundingClientRect().right <= window.innerWidth - 4);
  assert(titleFits, 'mobile case title must fit inside the viewport');
  console.log('PASS: controles, detalhes e largura no celular');
  await mobile.close();

  const narrow = await browser.newContext({ viewport: { width: 320, height: 720 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const narrowPage = await narrow.newPage();
  await narrowPage.goto(base + '/work/andrea-tur#detalhes', { waitUntil: 'domcontentloaded' });
  const narrowTitleFits = await narrowPage.locator('.overview-title h2 em').evaluate((node) => node.getBoundingClientRect().right <= window.innerWidth - 4);
  assert(narrowTitleFits, 'case title must fit on a 320px phone');
  assert(!(await narrowPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)), '320px case must not overflow');
  console.log('PASS: título e largura em 320px');
  await narrow.close();

  const linksContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const linksPage = await linksContext.newPage();
  const slugs = ['andrea-tur', 'edy-scanurl-family', 'edy-helpdesk', 'edy-shield', 'edy-siem', 'edy-soc-analytics', 'edy-crm', 'war-room', 'edy-verdict', 'edy-recon', 'edy-shadowcat', 'cr-fitness', 'assistente-personalizado'];
  for (const slug of slugs) {
    const response = await linksPage.goto(`${base}/work/${slug}#detalhes`, { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200, `${slug} route`);
    assert.equal(await linksPage.locator('#detalhes').count(), 1, `${slug} details`);
    assert.equal(await linksPage.locator('#desafio').count(), 1, `${slug} problem/solution`);
    assert.equal(await linksPage.locator('#recursos').count(), 1, `${slug} features`);
    const cover = linksPage.locator('.case-art img').first();
    await cover.scrollIntoViewIfNeeded();
    await cover.waitFor({ state: 'visible' });
    await cover.evaluate((image) => image.decode());
    assert(await cover.evaluate((image) => image.complete && image.naturalWidth > 0), `${slug} cover must load`);
  }
  console.log(`PASS: ${slugs.length} cases com capa, detalhes, problema e recursos`);
  await linksPage.goto(`${base}/work/cr-fitness#detalhes`, { waitUntil: 'domcontentloaded' });
  assert.equal(await linksPage.locator('.case-links a').getAttribute('href'), 'https://cr-fitness-academia.pages.dev/');
  await linksPage.goto(`${base}/work/edy-shadowcat#detalhes`, { waitUntil: 'domcontentloaded' });
  assert.equal(await linksPage.locator('.case-links a').count(), 0, 'private SHADOWCAT must have no public project link');
  await linksPage.goto(`${base}/work/assistente-da-raquel`, { waitUntil: 'domcontentloaded' });
  await linksPage.waitForURL(/\/work\/assistente-personalizado$/);
  assert(!(await linksPage.locator('body').innerText()).includes('Raquel'), 'new public case name must be anonymous');
  await linksPage.goto(`${base}/work`, { waitUntil: 'domcontentloaded' });
  assert(!(await linksPage.locator('body').innerText()).includes('Raquel'), 'project gallery must use the anonymous name');
  console.log('PASS: nome público e redirecionamento do case antigo');
  await linksContext.close();
} finally {
  await browser.close();
}
