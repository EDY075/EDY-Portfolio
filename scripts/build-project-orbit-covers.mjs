import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

const publicRoot = new URL('../public/', import.meta.url);
const manifest = new URL('../data/project-orbit-covers.json', import.meta.url);
const output = new URL('images/projects/orbit/', publicRoot);
const catalog = await readFile(new URL('../data/projects.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(catalog, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

await mkdir(output, { recursive: true });

const entries = await Promise.all(projects.map(async ({ image }) => {
  const original = new URL(image.src.slice(1), publicRoot);
  const name = original.pathname.split('/').at(-1).replace(/(?:-1600)?\.webp$/, '');
  const originalBytes = await readFile(original);
  const widths = [192, 384].filter(width => width <= image.width);
  const variants = await Promise.all(widths.map(async (width) => {
    const filename = `${name}-${width}.webp`;
    await sharp(originalBytes)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(fileURLToPath(new URL(filename, output)));
    return `/images/projects/orbit/${filename} ${width}w`;
  }));
  const large = image.src.replace(/-1600\.webp$/, '-640.webp');
  if (large !== image.src) {
    await access(new URL(large.slice(1), publicRoot));
    variants.push(`${large} 640w`);
  } else {
    variants.push(`${image.src} ${image.width}w`);
  }
  return [image.src, variants.join(', ')];
}));

await writeFile(manifest, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);
