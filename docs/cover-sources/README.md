# Fontes das capas dos projetos

As imagens desta pasta documentam a origem das capas em `public/images/projects/covers/`. O gerador `scripts/build-project-covers.mjs` usa apenas estas fontes e capturas já presentes em `public/images/projects/`; não inventa telas, números ou funções.

| Arquivo | Origem e uso |
|---|---|
| `cr-fitness-live-2026-09-29.png` e `cr-fitness-live-mobile-2026-09-29.png` | Capturas da versão pública de `https://cr-fitness-academia.pages.dev/` em 29/09/2026. Substituem a captura local anterior, que já não representa o site publicado. |
| `andrea-tur-site-hero.png` | Captura do próprio site em `ANDREA-TUR/artifacts/presentation/screenshots/desktop-1440-home-hero.png`, sem agenda datada. |
| `recon-terminal-approved.png` | Captura do terminal verde enviada pelo proprietário nesta conversa para ser a capa do EDY RECON. Os números visíveis pertencem ao ambiente da captura e não são apresentados como métricas da release pública. |
| `shadowcat-approved-cover.png` e `shadowcat-demo-dashboard.png` | Materiais de `EDY-SHADOWCAT/linkedin-post/01-cover-edy-shadowcat.png` e `02-dashboard.png`, aprovados para publicação em `EDY-SHADOWCAT/docs/security/PUBLICATION_AUDIT.md`. A interface da segunda imagem usa dados sintéticos. |
| `verdict-banner.png` | Banner do projeto em `EDY-VERDICT/docs/assets/banner-edy-verdict.png`; combina a marca com uma captura real. |
| `soc-analytics-illustration.png` | Arte conceitual de `EDY-SOC-Analytics/docs/assets/edy-soc-analytics-hero.png`. A captura do relatório Power BI aparece no case. |
| `scanurl-live-2026-09-29.png` | Captura da versão pública de `https://edy-scanurl-family.pages.dev/` em 29/09/2026. |

HelpDesk, Shield e SIEM usam capturas reais já presentes no portfólio. As composições editoriais colocam essas capturas em um quadro com título e cor; os painéis originais continuam disponíveis dentro dos cases.

Para regenerar as capas, execute `node scripts/build-project-covers.mjs` com as dependências instaladas. A imagem de contato é salva em `outputs/project-covers-contact-sheet.png`.

## WAR ROOM · 03/10/2026

Atualização da entrada: `war-room-entrance-2026-10-03.png` é captura real da hero revisada em viewport 1440 × 900, DPR 2 (2880 × 1800), sem alterar a interface para exportar. As novas variantes `war-room-entrance-{640,1080,1600}.webp` usam resolução suficiente para reduzir sem ampliar. O novo nome de arquivo evita reutilizar uma capa anterior em cache. As imagens internas de mapa/narração permanecem as já verificadas.

Capturas reais do projeto de Edmilson Gomes: página inicial, cartografia e player de narração do NotPetya. Originais: `WAR_ROOM/assets/screenshots/experience/hero-desktop.png`, `map-desktop.png` e `WAR_ROOM/assets/screenshots/narration/notpetya-desktop.png`. As variantes WebP apenas redimensionam/comprimem as capturas; não são reconstituições. [Projeto e créditos](https://github.com/EDY075/WAR_ROOM).


Entrada galáctica: `war-room-galaxy-2026-10-03.png` é captura real em DPR 2 (2880×1800) da hero publicada em WAR ROOM `648ef97`, com galáxia ilustrativa identificada como IA e rede interativa. Novas variantes WebP 640/1080/1600 recebem nome próprio para invalidar a capa anterior em cache. A captura não altera layout/conteúdo, só remove foco via clique em espaço livre. Demais cases, mapa/narração e o pacote promocional anterior ficam preservados.

## EDY CRM · 06/10/2026

Capturas reais do workspace local com dados fictícios da demonstração pública. A origem, atribuição MIT e variantes estão documentadas em [edy-crm/README.md](edy-crm/README.md). O script `scripts/build-crm-media.mjs` gera a capa responsiva e as duas imagens internas.

## Capas cinematográficas · 06/10/2026

RECON, CR Fitness e Assistente Personalizado passam a utilizar novas artes ilustrativas. Os originais, referências e prompts da ferramenta built-in `image_gen` estão em [cinematic-20261006/README.md](cinematic-20261006/README.md). `scripts/build-curation-media.mjs` gera WebPs responsivos com nomes versionados. As capas antigas permanecem preservadas; o terminal aprovado do RECON continua na galeria interna, e o site real da CR Fitness aparece em suas capturas públicas.
