# Preparação para publicação

O checkout oficial é `D:\EDY-Projects\EDY-Portfolio`. O site foi publicado no Cloudflare Workers em 28/09/2026 como `edy-gomes-portfolio`, na URL `https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/`. Para a prévia local, inicie `npm run dev` e use a URL exibida pelo servidor.

Versão pública verificada: `4657e186-a92f-4579-9127-0919f03660ea` (02/10/2026).

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

Deployment em preparação; confirmar versão e endereço público antes de registrar sucesso. Os números Lighthouse anteriores são históricos, sem nova medição desta integração.
