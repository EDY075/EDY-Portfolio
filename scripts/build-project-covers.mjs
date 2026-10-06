import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/images/projects/covers');
await mkdir(output, { recursive: true });

const source = (relative) => path.join(root, relative);
const save = async (name, buffer) => {
  for (const width of [640, 1080, 1600]) {
    await sharp(buffer).resize({ width }).webp({ quality: 83, effort: 5 }).toFile(path.join(output, `${name}-${width}.webp`));
  }
  console.log(name);
};
const svg = (markup) => Buffer.from(markup);
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

async function framedImage(relative, background = '#080a0b') {
  const image = await sharp(source(relative)).resize(1600, 1000, { fit: 'contain', background }).toBuffer();
  return image;
}

async function direct(name, relative, background) {
  await save(name, await framedImage(relative, background));
}

async function editorial(name, relative, lines, eyebrow, accent, background) {
  const screenshot = await sharp(source(relative)).resize(970, 590, { fit: 'contain', background: '#080d12' }).png().toBuffer();
  const title = lines.map((line, index) => `<text x="80" y="${315 + index * 105}" font-size="${line.length > 10 ? 64 : 82}" font-weight="700" fill="#f5f2e9" letter-spacing="-3">${escape(line)}</text>`).join('');
  const base = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs><radialGradient id="light"><stop stop-color="${accent}" stop-opacity=".24"/><stop offset="1" stop-color="${background}" stop-opacity="0"/></radialGradient><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#050707"/></linearGradient></defs>
    <rect width="1600" height="1000" fill="url(#bg)"/><circle cx="1160" cy="360" r="750" fill="url(#light)"/>
    <path d="M80 112h1440M80 900h1440" stroke="${accent}" stroke-opacity=".48" stroke-width="2"/>
    <text x="80" y="172" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="${accent}" letter-spacing="7">${escape(eyebrow)}</text>
    <g font-family="Arial, sans-serif">${title}</g>
    <path d="M80 568h96" stroke="${accent}" stroke-width="6"/>
    <text x="80" y="942" font-family="Arial, sans-serif" font-size="19" fill="#c7d1cc" letter-spacing="4">CAPTURA DO PROJETO · VISÃO EDITORIAL</text>
    <rect x="570" y="177" width="950" height="628" rx="18" fill="#000" opacity=".46"/>
    <rect x="548" y="155" width="974" height="614" rx="16" fill="#0e1519" stroke="${accent}" stroke-opacity=".7" stroke-width="3"/>
    <circle cx="582" cy="181" r="7" fill="${accent}" opacity=".85"/><circle cx="607" cy="181" r="7" fill="#667275"/><circle cx="632" cy="181" r="7" fill="#667275"/>
  </svg>`);
  const result = await sharp(base).composite([{ input: screenshot, left: 550, top: 202 }]).png().toBuffer();
  await save(name, result);
}

// Client site covers use the actual site or an approved, contemporary site capture.
await direct('cr-fitness', 'docs/cover-sources/cr-fitness-live-2026-09-29.png', '#050505');
const ocean = await sharp(source('docs/cover-sources/andrea-tur-site-hero.png')).resize(1600, 1000, { fit: 'cover' }).blur(18).modulate({ brightness: .55 }).toBuffer();
const andreaShot = await sharp(source('docs/cover-sources/andrea-tur-site-hero.png')).resize(1470, 490, { fit: 'contain', background: '#06373a' }).toBuffer();
const andreaTitle = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect width="1600" height="1000" fill="#062d30" opacity=".34"/><text x="65" y="136" font-family="Georgia, serif" font-size="84" fill="#fff">Andréa Tur</text><text x="69" y="189" font-family="Arial, sans-serif" font-size="20" letter-spacing="6" fill="#e9f4ee">SITE DE TURISMO · CAPTURA REAL</text><rect x="62" y="258" width="1476" height="496" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/><text x="70" y="868" font-family="Georgia, serif" font-size="37" fill="#fff">Viaje, descubra, viva.</text></svg>`);
await save('andrea-tur', await sharp(ocean).composite([{ input: andreaShot, left: 65, top: 261 }, { input: andreaTitle }]).png().toBuffer());

// The owner explicitly selected this exact RECON terminal capture for its cover.
await direct('edy-recon', 'docs/cover-sources/recon-terminal-approved.png', '#000000');
await direct('edy-shadowcat', 'docs/cover-sources/shadowcat-approved-cover.png', '#0b0712');
await direct('edy-soc-analytics', 'docs/cover-sources/soc-analytics-illustration.png', '#03101a');
const verdictBackground = await sharp(source('docs/cover-sources/verdict-banner.png')).resize(1600, 1000, { fit: 'cover' }).blur(28).modulate({ brightness: .4 }).toBuffer();
const verdictBanner = await sharp(source('docs/cover-sources/verdict-banner.png')).resize(1520, 510, { fit: 'contain', background: '#03101a' }).toBuffer();
const verdictFooter = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect x="40" y="192" width="1520" height="515" fill="none" stroke="#3ee5d1" stroke-opacity=".55" stroke-width="2"/><text x="54" y="795" font-family="Arial,sans-serif" font-size="43" fill="#e9f2f5">Verificação local para Windows.</text><text x="58" y="850" font-family="Arial,sans-serif" font-size="20" letter-spacing="5" fill="#6bddd2">CÓDIGO PÚBLICO · RELEASE CANDIDATE</text></svg>`);
await save('edy-verdict', await sharp(verdictBackground).composite([{ input: verdictBanner, left: 40, top: 195 }, { input: verdictFooter }]).png().toBuffer());

await editorial('edy-scanurl-family', 'docs/cover-sources/scanurl-live-2026-09-29.png', ['ScanURL', 'Family'], 'LINKS E CONFIANÇA', '#8ce1c5', '#071612');
await editorial('edy-helpdesk', 'public/images/projects/helpdesk-ticket-workspace.png', ['HelpDesk'], 'SUPORTE E SERVIÇOS', '#d69352', '#1c110a');
await editorial('edy-shield', 'public/images/projects/shield-endpoint-integrity.png', ['Shield'], 'INTEGRIDADE LOCAL', '#9dcbb3', '#071310');
await editorial('edy-siem', 'public/images/projects/siem-decision-center.png', ['SIEM'], 'OPERAÇÕES SOC', '#66b3ce', '#07121b');

const details = [
  ['andrea-tur-site', 'docs/cover-sources/andrea-tur-site-hero.png'],
  ['cr-fitness-mobile', 'docs/cover-sources/cr-fitness-live-mobile-2026-09-29.png'],
  ['shadowcat-dashboard', 'docs/cover-sources/shadowcat-demo-dashboard.png'],
];
for (const [name, relative] of details) {
  await sharp(source(relative)).webp({ quality: 84, effort: 5 }).toFile(path.join(output, `${name}.webp`));
}

const names = ['andrea-tur', 'cr-fitness', 'edy-scanurl-family', 'edy-helpdesk', 'edy-shield', 'edy-siem', 'edy-soc-analytics', 'edy-verdict', 'edy-recon', 'edy-shadowcat'];
const tiles = await Promise.all(names.map(async (name, index) => ({
  input: await sharp(path.join(output, `${name}-640.webp`)).resize(480, 300).png().toBuffer(),
  left: (index % 2) * 500,
  top: Math.floor(index / 2) * 320,
})));
await sharp({ create: { width: 1000, height: 1600, channels: 4, background: '#e9e5d8' } })
  .composite(tiles)
  .png()
  .toFile(path.join(root, 'outputs/project-covers-contact-sheet.png'));
