import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const portrait = 'public/images/edy-portrait-retouched.png';
const desktopPortrait = 'public/images/edy-portrait-desktop.png';
const mobilePortrait = 'public/images/edy-portrait-suit.jpg';
const inputs = [portrait, desktopPortrait, mobilePortrait, ...(await fs.readdir('public/images/projects')).filter(name => /\.(png|jpe?g|webp)$/i.test(name)).map(name => `public/images/projects/${name}`)];
const report = [];
const manifest = {};
await fs.mkdir('public/images/optimized', { recursive: true });
for (const input of inputs) {
  const meta = await sharp(input).metadata();
  const sourceBytes = (await fs.stat(input)).size;
  const isPortrait = input === portrait;
  const isDesktopPortrait = input === desktopPortrait;
  const isMobilePortrait = input === mobilePortrait;
  const widths = [...new Set([...(isPortrait || isMobilePortrait ? [640, 828] : isDesktopPortrait ? [1280] : [640, 1080, 1440]).filter(w => w < meta.width), meta.width])];
  const base = path.parse(input).name;
  const variants = [];
  for (const width of widths) {
    for (const format of ['avif', 'webp']) {
      const output = `public/images/optimized/${base}-${width}.${format}`;
      const resized = sharp(input).resize({ width, withoutEnlargement: true });
      if (format === 'avif') await resized.avif({ quality: isPortrait ? 75 : isMobilePortrait ? 84 : 82, effort: 6, chromaSubsampling: '4:4:4' }).toFile(output);
      else if (isPortrait || isDesktopPortrait || isMobilePortrait) await resized.webp({ quality: isDesktopPortrait ? 93 : isMobilePortrait ? 95 : 91, effort: 6 }).toFile(output);
      else if (meta.format === 'png') await resized.webp({ lossless: true, effort: 6 }).toFile(output);
      else await resized.webp({ quality: 91, effort: 6 }).toFile(output);
      const bytes = (await fs.stat(output)).size;
      variants.push({ width, format, bytes, src: `/${output.replace('public/', '')}` });
    }
  }
  manifest[`/${input.replace('public/', '')}`] = {
    avif: variants.filter(v => v.format === 'avif' && variants.filter(x => x.format === 'avif').at(-1).bytes < Math.min(sourceBytes, variants.filter(x => x.format === 'webp').at(-1).bytes)).map(v => `${v.src} ${v.width}w`).join(', '),
    webp: variants.filter(v => v.format === 'webp').map(v => `${meta.format === 'webp' && v.width === meta.width && v.bytes > sourceBytes ? '/' + input.replace('public/', '') : v.src} ${v.width}w`).join(', '),
  };
  report.push({ source: input, sourceBytes, width: meta.width, height: meta.height, format: meta.format, variants });
}
await fs.mkdir(path.join(root, 'artifacts/performance-final'), { recursive: true });
await fs.writeFile('artifacts/performance-final/image-inventory.json', JSON.stringify(report, null, 2));
await fs.writeFile('data/image-sources.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(report.map(r => ({ source: r.source, before: r.sourceBytes, maxAvif: r.variants.filter(v => v.format === 'avif').at(-1).bytes, maxWebp: r.variants.filter(v => v.format === 'webp').at(-1).bytes })), null, 2));
