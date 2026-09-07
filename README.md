# EDY — GOMES

Portfólio pessoal editorial de Edmilson Gomes, criado com Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion e `next/image`.

## Rodar localmente

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Para validar a versão de produção:

```bash
npm run build
```

## Onde editar

- Textos gerais, localização e links: `data/site.ts`
- Conteúdo dos projetos e cases: `data/projects.ts`
- Biografia, valores e capacidades: `data/about.ts`
- Retrato principal: substitua `public/images/edy-portrait.png`, mantendo o mesmo nome, ou atualize o caminho em `components/HeroPortrait.tsx`
- Estilos e tokens: `app/globals.css`
- Metadados globais: `app/layout.tsx`

Os placeholders `SEU_EMAIL_AQUI` e `SEU_LINKEDIN_AQUI` aparecem de forma segura como campos ainda não publicados. Basta trocá-los em `data/site.ts` para ativar os links.

## Rotas

- `/` — Home
- `/about` — Perfil e princípios
- `/work` — Galeria completa
- `/work/[slug]` — Case study dinâmico
- `/capabilities` — Capacidades
- `/contact` — Contato

## Imagens de projetos

Os blocos dos projetos usam uma direção abstrata criada em CSS para evitar mockups falsos. Quando houver screenshots reais, coloque-os em `public/images/projects/` e associe cada arquivo ao projeto correspondente em `data/projects.ts`.
