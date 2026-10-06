import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const covers = path.join(root, 'public/images/projects/covers');
const cases = path.join(root, 'public/images/projects/cases');
await fs.mkdir(covers, { recursive: true });
await fs.mkdir(cases, { recursive: true });

for (const [source, name] of [['recon', 'edy-recon'], ['fitness', 'cr-fitness'], ['assistant', 'assistente-personalizado']]) {
  const input = path.join(root, `docs/cover-sources/cinematic-20261006/${source}.png`);
  for (const width of [640, 1080, 1600]) {
    await sharp(input).resize(width, Math.round(width * .625), { fit: 'contain', background: '#050605' })
      .webp({ quality: 87, effort: 5 }).toFile(path.join(covers, `${name}-cinematic-20261006-${width}.webp`));
  }
  console.log(`Cover: ${name}`);
}

for (const [source, name] of [
  ['crm-preview.jpg', 'crm-preview'], ['crm-gallery.jpg', 'crm-gallery'],
  ['soc-command.png', 'soc-command'], ['soc-quality.png', 'soc-quality'],
  ['shadowcat-evidence.png', 'shadowcat-evidence'], ['shadowcat-reports.png', 'shadowcat-reports'],
  ['fitness-modalities.png', 'fitness-modalities'], ['fitness-plans.png', 'fitness-plans'],
]) {
  const output = path.join(cases, `${name}-20261006.webp`);
  await sharp(path.join(root, 'docs/case-media/curation-20261006', source))
    .resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 87, effort: 5 }).toFile(output);
  const { width, height } = await sharp(output).metadata();
  console.log(`Case: ${name} ${width}x${height}`);
}
