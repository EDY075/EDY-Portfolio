import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = (process.env.BASE_URL || 'https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev').replace(/\/$/, '');
const output = process.env.QA_OUTPUT || 'outputs/portfolio-review/curation-public';
await fs.mkdir(output, { recursive: true });
const images = [];
for (const directory of ['covers', 'cases']) {
  const path = `public/images/projects/${directory}`;
  for (const file of (await fs.readdir(path)).filter(file => file.includes('cinematic-20261006') || file.endsWith('-20261006.webp'))) {
    const response = await fetch(`${base}/images/projects/${directory}/${file}`);
    assert.equal(response.status, 200, `${file}: HTTP status`);
    assert.match(response.headers.get('content-type'), /image\/webp/);
    const localHash = createHash('sha256').update(await fs.readFile(`${path}/${file}`)).digest('hex');
    const remoteHash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
    assert.equal(remoteHash, localHash, `${file}: published bytes must match the tested source`);
    images.push({ file, sha256: remoteHash });
  }
}
assert.equal(images.length, 17);
const headers = [];
for (const route of ['/', '/work', '/work/edy-crm', '/work/assistente-personalizado', '/work/edy-shadowcat']) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  if (base.startsWith('https:')) assert.match(response.headers.get('strict-transport-security'), /max-age=31536000/);
  headers.push({ route, status: response.status });
}
await fs.writeFile(`${output}/asset-hashes.json`, JSON.stringify({ base, status: 'PASS', images, headers }, null, 2));
console.log('PASS: 17 published WebP assets match SHA-256 and public security headers are preserved');
