import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const portraitPath = fileURLToPath(new URL('../public/images/edy-portrait-desktop.png', import.meta.url));
const ogPath = fileURLToPath(new URL('../public/og.png', import.meta.url));
const applePath = fileURLToPath(new URL('../app/apple-icon.png', import.meta.url));
const faviconPath = fileURLToPath(new URL('../app/favicon.ico', import.meta.url));

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const ogOverlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#070807" stop-opacity="0.94"/><stop offset="0.48" stop-color="#070807" stop-opacity="0.72"/><stop offset="0.68" stop-color="#070807" stop-opacity="0"/></linearGradient></defs>
    <rect width="850" height="630" fill="url(#shade)"/>
    <rect x="42" y="42" width="1116" height="546" fill="none" stroke="#f1eee4" stroke-opacity="0.45"/>
    <text x="76" y="190" fill="#f1eee4" font-family="Georgia, serif" font-size="84" letter-spacing="-2">${escapeXml('EDY —')}</text>
    <text x="76" y="294" fill="#f1eee4" font-family="Georgia, serif" font-size="112" letter-spacing="-4">${escapeXml('GOMES')}</text>
    <line x1="76" y1="340" x2="548" y2="340" stroke="#f1eee4" stroke-opacity="0.7"/>
    <text x="76" y="403" fill="#f1eee4" font-family="Arial, sans-serif" font-size="23" letter-spacing="5">${escapeXml('IT SUPPORT')}</text>
    <text x="76" y="450" fill="#f1eee4" font-family="Arial, sans-serif" font-size="23" letter-spacing="5">${escapeXml('CYBERSECURITY')}</text>
    <text x="76" y="497" fill="#f1eee4" font-family="Arial, sans-serif" font-size="23" letter-spacing="5">${escapeXml('SYSTEMS & AUTOMATION')}</text>
  </svg>
`);

await sharp(portraitPath).resize(1200, 630, { fit: 'cover', position: 'center' }).composite([{ input: ogOverlay }]).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(ogPath);

const iconSvg = Buffer.from(`<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" rx="22" fill="#090a09"/><rect x="13" y="13" width="154" height="154" rx="14" fill="none" stroke="#f1eee4" stroke-width="3"/><text x="90" y="126" text-anchor="middle" fill="#f1eee4" font-family="Georgia, serif" font-size="108">E</text></svg>`);
const applePng = await sharp(iconSvg).png().toBuffer();
await writeFile(applePath, applePng);

const faviconPng = await sharp(iconSvg).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(faviconPng.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(faviconPath, Buffer.concat([header, faviconPng]));

const source = await readFile(portraitPath);
console.log(`Generated launch assets from approved portrait (${source.length} source bytes).`);
