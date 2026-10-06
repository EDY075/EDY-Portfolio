# Imagens internas dos cases

As imagens em `public/images/projects/cases/` são versões WebP otimizadas. `node scripts/build-case-media.mjs` as recria a partir das fontes locais abaixo. As primeiras imagens de cada galeria já existiam em `public/images/projects/` e estão indicadas em `data/projects.ts`.

| Case | Arquivo gerado | Fonte verificada | Limite de divulgação |
|---|---|---|---|
| Andréa Tur | `andrea-destinos.webp` | `../ANDREA-TUR/artifacts/presentation/verification-netlify/all-routes/desktop-1440-04-destinos.png` | Captura histórica de verificação; não representa agenda atual. |
| ScanURL Family | `scanurl-public.webp` | `docs/cover-sources/scanurl-live-2026-09-29.png` | Site público capturado em 29/09/2026; análise não garante segurança de compra. |
| EDY HelpDesk | `helpdesk-knowledge.webp` | `../EDY-HelpDesk/docs/screenshots/release-1.0.0/11-knowledge-base-ptbr-operations.png` | Demonstração local com registros sintéticos. |
| EDY Shield | `shield-siem-handoff.webp` | `../EDY-Shield/docs/screenshots/release-fim-siem-handoff.png` | Integração opcional com o SIEM; uso local. |
| EDY SIEM | `siem-case-center.webp` | `../EDY-SIEM/assets/screenshots/release-case-center.png` | Captura da release local, sem demo hospedada. |
| EDY SOC Analytics | `soc-incident.webp` | `../EDY-SOC-Analytics/screenshots/mobile-final-true/9. Incident Drillthrough.png` | Todos os dados do relatório são sintéticos. |
| EDY VERDICT | `verdict-url.webp` | `../EDY-VERDICT/docs/screenshots/05-web-url.png` | Candidato distribuído como código-fonte; sem instalador público. |
| EDY RECON | `recon-terminal.webp` | `docs/cover-sources/recon-terminal-approved.png` | Captura fornecida pelo proprietário; números exibidos pertencem à máquina capturada, não à release. |
| EDY SHADOWCAT | `shadowcat-pipeline.webp` | `../EDY-SHADOWCAT/linkedin-post/03-investigation-pipeline.png` | Arte de divulgação aprovada em `../EDY-SHADOWCAT/docs/security/PUBLICATION_AUDIT.md`; banco demo sintético; aplicação privada. |
| CR Fitness | `cr-fitness-public.webp` | `docs/cover-sources/cr-fitness-live-2026-09-29.png` | Captura da versão pública atual em 29/09/2026. Não usar as capturas locais antigas. |
| Assistente Personalizado | `assistant-fichas-illustration.webp` e `assistant-documents-illustration.webp` | `social/assistente-personalizado-7x7-2026-09/export/feed-03-fichas.png` e `feed-05-documentos.png` | Artes ilustrativas com dados fictícios; não são capturas da conversa privada. |

As galerias combinam interfaces reais, demonstrações sintéticas e materiais ilustrativos explicitamente identificados. Nenhum repositório privado, registro real de treino ou demonstração não aprovada foi incluído. As legendas públicas em `data/projects.ts` registram o contexto de cada imagem.

## WAR ROOM · 03/10/2026

Capturas reais do projeto de Edmilson Gomes: página inicial, cartografia e player de narração do NotPetya. Originais: `WAR_ROOM/assets/screenshots/experience/hero-desktop.png`, `map-desktop.png` e `WAR_ROOM/assets/screenshots/narration/notpetya-desktop.png`. As variantes WebP apenas redimensionam/comprimem as capturas; não são reconstituições. [Projeto e créditos](https://github.com/EDY075/WAR_ROOM).

## EDY CRM · 06/10/2026

Capturas reais do workspace local com dados fictícios da demonstração pública. A origem, atribuição MIT e variantes estão documentadas em [edy-crm/README.md](../cover-sources/edy-crm/README.md). O script `scripts/build-crm-media.mjs` gera a capa responsiva e as duas imagens internas.

## Curadoria e galerias ampliadas · 06/10/2026

CRM, CR Fitness, SOC Analytics e SHADOWCAT agora têm quatro imagens internas por case. As oito fontes adicionais estão documentadas em [curation-20261006/README.md](curation-20261006/README.md), com dimensões, caráter sintético e limites de divulgação. O script `scripts/build-curation-media.mjs` gera as variantes WebP sem cortar ou reconstruir as telas. Assistente Personalizado mantém demonstrações ilustrativas, pois não há captura real aprovada para publicação.
