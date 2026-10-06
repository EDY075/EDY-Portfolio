import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

const source = await fs.readFile(new URL('../data/projects.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const data = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const featured = ['edy-crm', 'cr-fitness', 'edy-soc-analytics', 'assistente-personalizado', 'edy-shadowcat', 'edy-recon', 'war-room'];
assert.deepEqual(data.featuredProjects.map(project => project.slug), featured);
assert.deepEqual(data.projects.slice(0, featured.length).map(project => project.slug), featured);
assert.equal(data.projects.length, 13);
assert.equal(new Set(data.projects.map(project => project.slug)).size, 13);
assert.deepEqual([...data.featuredProjects, ...data.technicalProjects, ...data.clientProjects], data.projects);
assert.deepEqual(data.clientProjects.map(project => project.slug), ['andrea-tur']);
for (const project of data.projects) assert(project.origin?.length > 60, `${project.slug}: documented origin`);
for (const project of data.projects) {
  const slides = [project.caseImage, ...(project.caseGallery ?? []).map(slide => slide.image)].filter(Boolean);
  const expected = ['edy-crm', 'cr-fitness', 'edy-soc-analytics', 'edy-shadowcat'].includes(project.slug) ? 4 : 2;
  assert.equal(slides.length, expected, `${project.slug}: project images beyond its cover`);
  assert(slides.every(image => image.src !== project.image.src), `${project.slug}: gallery must not repeat the cover`);
}
for (const slug of ['edy-shadowcat', 'assistente-personalizado']) assert.deepEqual(data.getProject(slug).links, []);
console.log('PASS: ordered highlights, complete unique catalog, documented origins and private links preserved');
