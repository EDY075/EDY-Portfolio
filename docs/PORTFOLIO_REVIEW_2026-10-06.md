# Revisão do portfólio · 06/10/2026

## Estado da entrega

A atualização foi autorizada para o endereço principal e o GitHub, após validação. O código de runtime aprovado é `505696d`, integrado ao histórico remoto sem remover o WAR ROOM. Build, lint, tipagem, ensaio de publicação e inspeção final passaram no pacote isolado. A publicação e sua conferência pública são registradas em [DEPLOYMENT.md](DEPLOYMENT.md). O audit de dependências permanece como pendência explícita abaixo, não como gate aprovado.

Destino: `https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/`, Worker `edy-gomes-portfolio`. A versão pública anterior é `acb96424-b85d-4cc0-ae6f-77c64130ea13`. A nova versão e a conferência pública serão registradas em [DEPLOYMENT.md](DEPLOYMENT.md).

## Mudanças e escopo

- EDY CRM adicionado como sétimo destaque, com capa responsiva e duas capturas reais da demonstração com dados fictícios. A origem e a atribuição MIT estão em [cover-sources/edy-crm/README.md](cover-sources/edy-crm/README.md).
- Treze cases e quatorze cards na página de projetos. Andréa Tur aparece em dois grupos; isso não cria um case duplicado. WAR ROOM, suas capas, links e transições foram preservados.
- A galeria 3D mantém o link no clique simples; a captura de ponteiro começa depois do deslocamento de arrasto. O arrasto não abre o case por acidente. Cards, índice e ação do projeto em foco exibem `Ver case`.
- Setas retiradas dos links e controles clicáveis. A navegação entre projetos e imagens continua disponível por controles com texto, teclado e gestos.
- Espaçamentos revisados em desktop, tablet e celular. O layout de Competências e a galeria em tablet foram ajustados para evitar sobreposição.
- A experiência pausada em `/experience`, seus assets e os diretórios de experimentos, material social e vídeos de trabalho ficaram fora do commit e do pacote publicado.

## Evidências reunidas

| Verificação | Evidência e alcance |
|---|---|
| Galeria 3D | Treze projetos verificados com mouse, teclado, toque e deltas que representam touchpad; clique, arrasto, abertura do case, limites de rolagem e retorno à página. |
| Layout principal | Cinco páginas em nove larguras: 320, 390, 768, 1024, 1280, 1366, 1440, 1920 e 2560 px; 45 combinações principais, com conferências adicionais de altura. |
| Layout dos cases | Vinte e seis verificações, cobrindo os treze cases em desktop e celular. |
| Capas e imagens | Capas responsivas decodificadas; hero, galerias, troca de imagem, ampliação e transição conferidos nas suítes de capas e mídia. A suíte de galerias cobriu os treze cases em três formatos, totalizando 39 visitas. |
| Rotas e metadados | Treze cases respondendo; CRM e WAR ROOM presentes no canonical e sitemap. Cases privados excluídos do sitemap; `robots.txt` coerente com `SITE_URL`. |
| Links externos | Quatorze links públicos conferidos, todos com resposta HTTP 200 na verificação. Isso registra disponibilidade naquele momento. |
| Gates de código | Lint, tipagem, build e ensaio Wrangler passaram no runtime final `505696d`. A suíte de publicação aprovou os treze cases e CRM em cinco viewports. |
| Empacotamento | Artefato extraído de commit com `git archive`, sem os arquivos locais pausados. Ensaio final aprovado com 111 módulos e 244 assets. |

A inspeção encontrou uma sobreposição em Sobre, no formato 1024 × 600 px. A altura mínima do hero desktop agora é 780 px. O retorno dos cases foi separado dos metadados no desktop e ganhou mais respiro em tablet. O reteste confirmou as correções: 45 combinações principais e quatro galerias passaram, assim como 26 visualizações dos cases. A última alteração de tablet foi validada em 43 visitas: treze cases em 640, 768 e 900 px com DPR 2, além de Sobre e CRM em 1366 e 1920 px com DPR 2. Dezoito verificações adicionais incluíram larguras equivalentes a zoom de 200%, sem sobreposição efetiva de texto. Equivalência de viewport não substitui teste em todos os navegadores com zoom real.

As evidências locais ficam em `outputs/portfolio-review/`, ignorado pelo Git. Os roteiros versionados incluem `scripts/qa-portfolio-layout.mjs`, `scripts/qa-portfolio-interactions.mjs`, `scripts/qa-portfolio-release.mjs`, `scripts/qa-gallery.mjs`, `scripts/qa-covers.mjs`, `scripts/qa-case-gallery.mjs` e `scripts/qa-case-hero.mjs`.

## Dependências e segurança

`npm audit --omit=dev` permanece com **seis alertas altos e nenhuma vulnerabilidade crítica**. São avisos da mesma cadeia de build:

```text
vinext → vite-plugin-commonjs → vite-plugin-dynamic-import
       → fast-glob → micromatch → braces@3.0.3
```

O [advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) descreve esgotamento da pilha com padrões profundamente aninhados e ainda não informa versão corrigida. O import e a chamada do plugin foram localizados na entrada de configuração do Vinext. A busca nos arquivos JavaScript do bundle servidor e cliente não encontrou essa cadeia. A ocorrência isolada do nome `braces` é o ícone Lucide do contato, não a biblioteca vulnerável. A conclusão de alcance é de risco nas ferramentas de build; ela não transforma o audit em aprovado.

O CLI `shadcn`, sem import no aplicativo, foi removido. As dependências associadas ao alerta crítico de `proxy-addr` saíram da árvore. `sharp`, `source-map-js` e `tinypool` receberam correções compatíveis, com lockfile preservado. Não foi usado `npm audit fix --force` nem downgrade do framework.

Os casos Assistente Personalizado e SHADOWCAT continuam públicos como apresentações, com `noindex, nofollow`, sem links externos privados e fora do sitemap. Essas diretivas não restringem acesso. O CRM importa somente imagens da demonstração pública sanitizada; nenhum banco, credencial, cliente real ou sessão privada foi incluído.

Os headers herdados em `public/_headers` incluem CSP, política de permissões, política de referência, `nosniff`, proteção de enquadramento e HSTS. A conferência HTTPS pública confirmou todos esses grupos na home, em Projetos, CRM e WAR ROOM. A CSP preserva `unsafe-inline` para a compatibilidade atual; esta entrega não é uma auditoria completa de segurança do framework.

O config do artefato aponta para o Worker existente e o `SITE_URL` principal. Não adiciona bancos, R2 ou outros serviços. O deploy deve manter `--keep-vars`.

## Limites da inspeção

As verificações utilizaram navegadores Chromium, Chrome e Edge, com automação e inspeção de capturas. Não houve novo teste em Safari/iOS, aparelho físico ou em todas as densidades de pixels. Gestos e deltas sintéticos não substituem uma conferência em cada dispositivo real.

Os números de Lighthouse apresentados no README são históricos. Não há nova medição de Lighthouse nesta entrega, nem garantia de comportamento em qualquer resolução, densidade ou combinação de navegador. Os resultados da conferência pública após o deploy estão em [DEPLOYMENT.md](DEPLOYMENT.md).
