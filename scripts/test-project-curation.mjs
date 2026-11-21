import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

async function dataModule(file, imports = {}) {
  const source = await fs.readFile(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  const content = outputText.replace(/from '([^']+)'/g, (match, path) => {
    if (imports[path]) return `from '${imports[path]}'`;
    throw new Error(`Missing test module for ${match}`);
  });
  return `data:text/javascript;base64,${Buffer.from(content).toString('base64')}`;
}

const [projectModule, productIdentityModule, technicalIdentityModule] = await Promise.all([
  dataModule('../data/projects.ts'),
  dataModule('../data/case-identities-product.ts'),
  dataModule('../data/case-identities-technical.ts'),
]);
const data = await import(projectModule);
const { caseIdentities } = await import(await dataModule('../data/case-identity.ts', {
  './case-identities-product': productIdentityModule,
  './case-identities-technical': technicalIdentityModule,
}));
const featured = ['edy-energy', 'edy-crm', 'edy-soc-analytics', 'edy-shadowcat', 'edy-recon', 'war-room'];
assert.deepEqual(data.featuredProjects.map(project => project.slug), featured);
assert.deepEqual(data.projects.slice(0, featured.length).map(project => project.slug), featured);
assert.equal(data.projects.length, 15);
assert.equal(new Set(data.projects.map(project => project.slug)).size, 15);
assert.deepEqual([...data.featuredProjects, ...data.technicalProjects, ...data.clientProjects], data.projects);
assert.deepEqual(data.clientProjects.map(project => project.slug), ['raquel-web', 'cr-fitness', 'assistente-personalizado', 'andrea-tur']);
for (const project of data.projects) assert(project.origin?.length > 60, `${project.slug}: documented origin`);
for (const project of data.projects) {
  const slides = [project.caseImage, ...(project.caseGallery ?? []).map(slide => slide.image)].filter(Boolean);
  const expected = project.slug === 'raquel-web' ? 4 : ['edy-crm', 'cr-fitness', 'edy-soc-analytics', 'edy-shadowcat'].includes(project.slug) ? 4 : 2;
  assert.equal(slides.length, expected, `${project.slug}: project images beyond its cover`);
  assert(slides.every(image => image.src !== project.image.src), `${project.slug}: gallery must not repeat the cover`);
}
for (const slug of ['edy-shadowcat', 'assistente-personalizado', 'raquel-web']) assert.deepEqual(data.getProject(slug).links, []);
const raquel = data.getProject('raquel-web');
assert(raquel.demo.src.startsWith('/media/raquel-web/'));
assert.match(raquel.demo.description, /dados fictícios/);
assert(raquel.demo.captions.startsWith('/media/raquel-web/'));
assert.deepEqual(Object.keys(caseIdentities).sort(), data.projects.map(project => project.slug).sort());
for (const project of data.projects) {
  const identity = caseIdentities[project.slug];
  assert(identity.description && identity.typography, `${project.slug}: visual direction and type documented`);
  assert(identity.details?.length >= 2, `${project.slug}: distinct visual characteristics`);
  assert(identity.colors.length >= 4, `${project.slug}: meaningful color palette`);
  assert(identity.colors.every(color => color.name && /^#[0-9A-F]{6}$/.test(color.value)), `${project.slug}: named HEX swatches`);
  assert.equal(new Set(identity.colors.map(color => color.value)).size, identity.colors.length);
  assert(project.stack.length > 0, `${project.slug}: documented technologies`);
}
assert.equal(caseIdentities['raquel-web'].colors.length, 9);
assert.match(caseIdentities['assistente-personalizado'].paletteNote, /Telegram/);
assert.match(caseIdentities['edy-recon'].paletteNote, /ANSI/);
console.log('PASS: ordered highlights, 15 unique cases with visual identities and stacks, documented origins and private links preserved');
