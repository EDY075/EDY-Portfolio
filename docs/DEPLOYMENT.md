# Preparação para publicação

O checkout oficial é `D:\EDY-Projects\EDY-Portfolio`. O site foi publicado no Cloudflare Workers em 28/09/2026 como `edy-gomes-portfolio`, na URL `https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/`. Para a prévia local, inicie `npm run dev` e use a URL exibida pelo servidor.

Versão pública atual verificada: `acb96424-b85d-4cc0-ae6f-77c64130ea13` (03/10/2026). Versão anterior preservada no histórico: `4657e186-a92f-4579-9127-0919f03660ea` (02/10/2026).

## Estado e próximas decisões

- Correção publicada em 02/10/2026: as capas dos cases até 900 px ficam abaixo dos textos, com altura automática e proporção original. A caixa com altura baseada no viewport causava espaço escuro excedente e sobreposição em telas altas. O desktop mantém a composição existente. `scripts/qa-case-hero.mjs` reproduziu a falha antes da correção e verifica proporção, separação do texto e overflow nos onze cases em 390 px, com conferência adicional em 320, tela alta, 768 e desktop. Tipagem, lint, build e ensaio de deploy passaram.
- Atualização publicada em 02/10/2026: o link de Andréa Tur aponta para `https://andrea-tur.edy-scanurl-family-worker.workers.dev/`, substituindo o antigo Netlify. A tecnologia de hospedagem no case foi atualizada para Cloudflare Workers. Destino confirmado com HTTP 200 e identidade do site; link conferido no case publicado. Tipagem, lint, build com `SITE_URL` e ensaio Wrangler passaram.
- O proprietário aprovou a divulgação de CR Fitness, Assistente Personalizado e SHADOWCAT e escolheu a URL atual do Worker. CR Fitness tem link público verificado em `https://cr-fitness-academia.pages.dev/`. Assistente Personalizado e SHADOWCAT têm cases públicos no portfólio, mas seus repositórios e aplicações são privados; essas rotas usam `noindex` e ficam fora do sitemap. Isso reduz indexação, mas não restringe acesso.
- O domínio personalizado ainda será escolhido. Após a escolha, validar DNS e o endereço final antes de trocar `SITE_URL` e publicar novamente.
- O portfólio substituirá o Linktree na bio depois. Não há referência a Linktree no código deste repositório.
- A revisão de interação removeu o halo do cursor e reforçou a visibilidade das faíscas. No celular, as faíscas aparecem ao toque e acompanham o arrasto com limite menor de partículas e resolução; a área do retrato continua excluída. A galeria 3D aceita gesto horizontal, setas e índice, com legenda e descrição separadas da imagem em larguras de 320 e 390 px. O preloader também aparece no celular. As novas capas possuem variantes WebP de 640, 1080 e 1600 px, com fontes registradas em `docs/cover-sources/`. A medição local anterior deu 98–99 pontos de desempenho no desktop e 86–90 no celular em três execuções por formato; esses números não se aplicam automaticamente à atualização de capas.
- Atualização publicada em 29/09/2026: a galeria 3D volta a capturar a roda do mouse após uma pausa ou retorno ao limite, e os links "Ver projeto" levam diretamente à visão geral do case, com navegação para problema, recursos e estado. As faíscas receberam 15% mais intensidade, mantendo os limites de partículas. Andréa Tur conserva o endereço clicável com texto neutro; o proprietário reativará o site. Build, lint, tipagem e teste automatizado da galeria, dez cases e larguras móveis de 320/390 px passaram localmente e no Worker publicado.
- Atualização de capas publicada em 29/09/2026: dez capas foram revistas com capturas atuais, arte oficial ou interface fornecida pelo proprietário; o Assistente Personalizado mantém a ilustração aprovada. A CR Fitness usa captura do site público atual, que também aparece como link no case. RECON usa o terminal verde enviado pelo proprietário. SHADOWCAT entrou na galeria técnica com arte aprovada e case sem link para repositório privado. Capturas da interface ficam dentro dos cases, com ação de ampliar. Build, lint, tipagem e QA de onze cases, galeria 3D, desktop e mobile (390/320 px) passaram localmente e no endereço público.
- Atualização visual publicada em 29/09/2026: os onze cases exibem duas imagens contextualizadas, com deslize, setas e ampliação; a transição mostra a capa ao abrir um case; a página Projetos tem índice de seções para o celular. As doze novas imagens WebP somam 652 KiB. O build foi feito com `SITE_URL` do Worker; ensaio Wrangler e deploy passaram. A versão pública foi verificada em desktop, 390 e 320 px: onze cases, galeria 3D, transição, `robots.txt`, sitemap, canonical, imagens e `noindex` dos dois cases privados.

## Build e ensaio

No PowerShell, a partir da raiz do repositório:

```powershell
npm ci
npm run lint
npm run typecheck
$env:SITE_URL = 'https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev'
npm run build
.\node_modules\.bin\wrangler.cmd deploy --dry-run --config dist/server/wrangler.json --keep-vars
```

Troque `SITE_URL` pelo domínio escolhido antes do build definitivo. Confira `dist/server/wrangler.json`: `vars.SITE_URL` deve coincidir com o endereço final. Se `SITE_URL` não estiver definido, `robots.txt` bloqueia indexação e o sitemap fica vazio.

O pacote usa os arquivos de `dist/`; `.next`, `.vinext`, `.wrangler`, `node_modules`, caches e saídas de QA são gerados ou locais e não devem ser enviados como fonte. `.env*` e `.dev.vars*` permanecem ignorados.

## Próxima publicação

```powershell
.\node_modules\.bin\wrangler.cmd deploy --config dist/server/wrangler.json --keep-vars
```

`--keep-vars` preserva variáveis já definidas no painel. Após a publicação, conferir a página inicial, projetos, cases, navegação por toque e teclado, `robots.txt`, `sitemap.xml`, canonical e os links externos. Um domínio personalizado pode ser ligado depois no Cloudflare; gere novo build com `SITE_URL` do domínio antes de apontar o link de bio para ele.

## Integração WAR ROOM · 03/10/2026

Publicação solicitada explicitamente pelo proprietário. O checkout oficial já tinha alterações e o runtime publicado de onze cases; foi preservado sem reset, stash ou edições. A integração é preparada no worktree `codex/portfolio-war-room-release`, baseado em `origin/main` e preservando também os commits remotos de README/vídeo. O runtime já publicado é registrado primeiro para evitar regressão ao publicar esta atualização.

WAR ROOM entra como o décimo segundo case, na pesquisa e na galeria 3D, com duas capturas reais, capa responsiva 640/1080/1600, links para GitHub, GitHub Pages e os 17 episódios narrados. Não cria serviço ou dependência nova. Build com o SITE_URL atual, lint, tipagem, ensaio Wrangler, capas em cinco formatos, galerias dos 12 cases em desktop/390/320, transição, navegação por teclado, Escape/foco e sitemap/noindex passaram em Edge headless. Chrome DevTools MCP não estava disponível; Playwright/Edge foi a ferramenta de navegador real.

Publicado no Worker existente: `5a5bc460-a0b5-4bb6-a58d-a13eb80211dc`, fonte de runtime `1206ee0`. Case: https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/work/war-room. `--keep-vars` preservou as variáveis já configuradas. Repositório atualizado por fast-forward sem force push; README/vídeo remoto e histórico permanecem preservados.

Conferência pós-deploy concluída no endereço público: navegação para o novo case, três links corretos, canonical e sitemap com WAR ROOM, `noindex`/exclusão dos dois cases privados, teclado, Escape/foco, galeria 3D, 12 galerias em desktop/390/320, transição, decodificação das imagens e hashes SHA-256 das cinco variantes novas no navegador. O acesso por urllib foi bloqueado por HTTP 403 do Cloudflare; a conferência real no Edge passou, sem contornar a proteção. Capturas atuais em `docs/assets/github/screenshots/war-room-case-desktop.webp` e `war-room-case-mobile.webp`. Os 276 arquivos de runtime do checkout original mantêm zero diferenças SHA-256. Logs/saídas/cache permanecem ignorados.

Os números Lighthouse anteriores são históricos, sem nova medição desta integração. Não há teste novo em aparelho físico.

### Transição do novo case · publicação final

Nova entrada WAR ROOM: o proprietário solicitou hero/preloader mais leves e uma nova publicação do projeto. A capa do case foi sincronizada com uma captura real da hero revisada, exportada em DPR 2 e reduzida para três variantes WebP com novos nomes de arquivo. Apenas a fonte/capas, os registros de imagem, a documentação e a espera explícita do índice 3D na suíte de QA foram alterados no worktree; o checkout original permanece preservado. Os demais cases, a transição, mapa e player continuam iguais. Runtime `01af7f2`, Worker `85c20a35-3a11-4be5-9bf5-5e7f8c3e0b30`; lint, tipagem, build e dry-run passaram, assim como QA local desktop/mobile, links, galeria, foco/Escape e transição. Conferência SHA-256 do checkout original: 276 arquivos, zero diferenças.

Auditoria adicional `npm audit --omit=dev` desta entrega: 12 avisos existentes (10 high / 2 moderate), incluindo dependências transitivas de shadcn/Vinext e ferramentas de build. `package.json` e lockfile não foram alterados. Não foi executado `npm audit fix --force`, que propõe mudança incompatível de shadcn; tratamento de dependências requer uma atualização separada com validação do stack. Estes avisos não são apresentados como um teste aprovado, nem como introduzidos pela troca da capa. A publicação usa o mesmo stack do runtime anterior.

Conferência pública da nova capa concluída no Edge: integração WAR ROOM em desktop/mobile, teclado, galeria, índice 3D, Escape/foco, canonical/sitemap/noindex e transição passaram. As três variantes novas retornam HTTP 200 e os SHA-256 calculados no navegador são idênticos aos arquivos locais. A suíte aguarda o primeiro link do índice 3D antes de contar os 12 itens, respeitando a montagem assíncrona existente. Nenhum runtime do checkout original foi modificado.

O WAR ROOM foi registrado no mapa existente de nomes da transição de páginas, com capa ao abrir e posição inicial restaurada, mantendo as demais rotas. Runtime `dac04fc`, Worker `7f40d6c8-619f-470f-b6f7-f089745dc59d`; a versão `5a5bc460-a0b5-4bb6-a58d-a13eb80211dc` é o primeiro deploy desta integração. Lint, tipagem, rebuild e dry-run passaram. O preview Wrangler local foi encerrado antes do rebuild: no Windows, seu processo mantinha `dist` ocupado e causava EPERM. A suíte específica agora confere a transição real em desktop/mobile, além da integração, galeria 3D, teclado/foco, metadados e imagens.


### Capa galáctica · 03/10/2026

WAR ROOM runtime `648ef97` / Pages build `37155681649` trouxe primeira tela inteira, galáxia ilustrativa original creditada, rede interativa e nova abertura/reload. Sincronização limitada à capa do case: captura real 2880×1800, variantes WebP 640/1080/1600 com novos nomes e alt fiel. Demais cases, mapas, áudios, transições, dependências e variáveis ficam preservados. Lint/tipagem/build e Wrangler dry-run com `--keep-vars` passaram. QA local aprovou desktop/mobile, três links, navegação, galeria/3D, teclado/foco/Escape, canonical/sitemap/noindex e transição de entrada. Original preservado: 276 hashes, zero diferenças. As auditorias antigas de dependências continuam históricas; esta alteração não atualiza pacotes. Conferência pública e Worker exatos registrados após deploy.

Capa galáctica publicada: runtime `66d5d15`, Worker `acb96424-b85d-4cc0-ae6f-77c64130ea13`, domínio existente preservado com `--keep-vars`. Conferência pública: capa responsiva real decodificada em 1440/390/320/2560, alt e hashes SHA-256 dos três WebPs iguais aos locais; integração, links, teclado, Escape/foco, metadados, galeria e transição desktop/mobile passaram. Fonte original permanece com 276 hashes idênticos.

## EDY CRM e revisão responsiva · 06/10/2026

O proprietário autorizou a atualização do portfólio principal e do GitHub após validação. A entrega adiciona o EDY CRM com imagens reais de demonstração, corrige o clique dos projetos na galeria 3D, remove setas dos controles e melhora espaçamentos responsivos. O WAR ROOM e seu histórico publicado foram preservados na integração de `origin/main`.

A rota `/experience` e seus assets continuam como trabalho local pausado e ficaram fora do commit e do pacote desta publicação. Os arquivos locais do proprietário foram preservados.

Runtime `505696d`, extraído por `git archive` para um pacote isolado no próprio projeto. Lint, tipagem, build, dry-run e inspeção de navegador passaram antes do deploy. Matriz de cinco páginas em nove larguras de 320 a 2560 px: 45 combinações e quatro galerias; treze cases em desktop/celular: 26 visitas. Reteste final em tablet/DPR 2: 43 visitas. Todos os quatorze links externos retornaram HTTP 200 com identidade e destinos conferidos. Detalhes e a pendência explícita de seis alertas altos na cadeia de build estão em [PORTFOLIO_REVIEW_2026-10-06.md](PORTFOLIO_REVIEW_2026-10-06.md); `npm audit` não é declarado aprovado.

Publicado no Worker existente, com `--keep-vars`, versão `651db85a-5e35-4803-83e8-59b750458d27`. Endereço preservado: https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/. Versão anterior: `acb96424-b85d-4cc0-ae6f-77c64130ea13`.

Conferência pública: os treze cases responderam HTTP 200, CRM em cinco viewports passou, canonical/sitemap/robots corretos e experimento ausente (`404`). A suíte WAR ROOM passou em desktop/celular com teclado, Escape/foco, galeria e transições. As cinco imagens novas do CRM têm SHA-256 idêntico aos arquivos locais. Headers HTTPS CSP, Permissions Policy, HSTS, `nosniff`, DENY e Referrer Policy foram confirmados na home, Projetos, CRM e WAR ROOM.

A suíte pública de rolagem da galeria passou com pausas, deltas contínuos, liberação da página no limite e retorno à galeria. CTA e detalhes dos treze cases, controles em celular, formato 320 px e redirecionamento antigo passaram. Os cartões públicos de CRM e WAR ROOM foram inspecionados em 1380 e 390 px: `Ver case` legível, sem sobreposição.

A suíte pública de interação confirmou clique direto nas treze capas, arrasto sem navegação acidental, clique posterior, Enter e toque no celular. O histórico remoto foi integrado sem force push; o commit de documentação acompanha o runtime aprovado, sem incluir a experiência pausada.
