import fs from 'node:fs/promises';
import sharp from 'sharp';

const source = 'docs/cover-sources/edy-crm';
const covers = 'public/images/projects/covers';
const cases = 'public/images/projects/cases';
await fs.mkdir(covers, { recursive: true });
await fs.mkdir(cases, { recursive: true });

const framed = await sharp(`${source}/cover.jpg`).resize(1600, 1000, { fit: 'contain', background: '#080a0b' }).toBuffer();
for (const width of [640, 1080, 1600]) {
  await sharp(framed).resize({ width }).webp({ quality: 83, effort: 5 }).toFile(`${covers}/edy-crm-${width}.webp`);
}
for (const name of ['dashboard', 'montagem']) {
  await sharp(`${source}/${name}.jpg`).webp({ quality: 85, effort: 5 }).toFile(`${cases}/edy-crm-${name}.webp`);
}
