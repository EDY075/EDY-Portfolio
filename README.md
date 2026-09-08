# EDY — GOMES

Portfólio editorial de Edmilson Gomes, dedicado a projetos de **IT Support**, **Cybersecurity** e **Systems & Automation**.

O site apresenta seis estudos de caso com capturas reais, contexto técnico e navegação narrativa, preservando uma experiência própria para desktop e mobile.

## Stack

- React 19 e TypeScript
- Vinext/Vite com App Router
- Tailwind CSS
- Framer Motion e GSAP
- Lenis no desktop e rolagem nativa no mobile
- Cloudflare Workers como runtime de produção

## Projetos apresentados

- EDY Shadowcat
- EDY Verdict
- EDY Recon
- EDY ScanURL Family
- EDY HelpDesk
- EDY SOC Analytics

## Rodar localmente

Requisitos: Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

Abra a URL exibida pelo servidor. Para executar os gates locais:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

O build oficial gera um Worker Vinext em `dist/server/` e os assets públicos em `dist/client/`.

## Produção

O código oficial vive neste repositório e a produção utiliza Cloudflare Workers:

- https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev

`SITE_URL` deve receber essa URL, sem barra final, durante o build de produção para gerar canonical, Open Graph, robots e sitemap com endereços absolutos corretos. O deploy usa o arquivo gerado `dist/server/wrangler.json`.

## Onde editar

- Textos gerais, localização e links: `data/site.ts`
- Conteúdo dos projetos e cases: `data/projects.ts`
- Biografia, valores e capacidades: `data/about.ts`
- Retratos responsivos: `public/images/` e `public/images/optimized/`
- Estilos e tokens: `app/globals.css`
- Metadados globais: `app/layout.tsx`

## Rotas

- `/` — Home
- `/about` — Perfil e princípios
- `/work` — Galeria completa
- `/work/[slug]` — Case study dinâmico
- `/capabilities` — Capacidades
- `/contact` — Contato

## Imagens de projetos

As capturas reais ficam em `public/images/projects/`; as variantes AVIF/WebP responsivas são geradas em `public/images/optimized/` pelos scripts do projeto.
