import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// These sources were checked against the public cases on 2026-09-29.
// The SHADOWCAT inputs are the approved synthetic demo artwork only.
// The assistant inputs are explicitly illustrative social artwork.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/images/projects/cases');
const sources = [
  ['andrea-destinos', '../ANDREA-TUR/artifacts/presentation/verification-netlify/all-routes/desktop-1440-04-destinos.png', 1440],
  ['scanurl-public', 'docs/cover-sources/scanurl-live-2026-09-29.png', 1440],
  ['helpdesk-knowledge', '../EDY-HelpDesk/docs/screenshots/release-1.0.0/11-knowledge-base-ptbr-operations.png', 1425],
  ['shield-siem-handoff', '../EDY-Shield/docs/screenshots/release-fim-siem-handoff.png', 1600],
  ['siem-case-center', '../EDY-SIEM/assets/screenshots/release-case-center.png', 1600],
  ['soc-incident', '../EDY-SOC-Analytics/screenshots/mobile-final-true/9. Incident Drillthrough.png', 1600],
  ['verdict-url', '../EDY-VERDICT/docs/screenshots/05-web-url.png', 1600],
  ['recon-terminal', 'docs/cover-sources/recon-terminal-approved.png', 964],
  ['shadowcat-pipeline', '../EDY-SHADOWCAT/linkedin-post/03-investigation-pipeline.png', 1600],
  ['cr-fitness-public', 'docs/cover-sources/cr-fitness-live-2026-09-29.png', 1440],
  ['assistant-fichas-illustration', 'social/assistente-personalizado-7x7-2026-09/export/feed-03-fichas.png', 900],
  ['assistant-documents-illustration', 'social/assistente-personalizado-7x7-2026-09/export/feed-05-documentos.png', 900],
];

await mkdir(output, { recursive: true });
for (const [name, source, width] of sources) {
  const input = path.resolve(root, source);
  const destination = path.join(output, `${name}.webp`);
  const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(destination);
  console.log(`${name}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KiB`);
}
