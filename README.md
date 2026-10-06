![EDY — GOMES — Portfólio de Edmilson Gomes](docs/assets/github/banner.webp)

# EDY — GOMES

Portfólio editorial de **Edmilson Gomes** para trabalhos em suporte de TI, segurança, sistemas e análise de dados. A identidade usa preto e creme, tipografia de alto contraste, fotografia e capturas de projetos reais.

**[Site publicado](https://edy-gomes-portfolio.edy-scanurl-family-worker.workers.dev/)** · **[Repositório](https://github.com/EDY075/EDY-Portfolio)** · **[LinkedIn](https://www.linkedin.com/in/edmilsongomes21/)**

## Apresentação em vídeo

https://github.com/user-attachments/assets/7668f4da-9530-4102-8719-9fa3e71c3e60

> A versão com capas atualizadas, galerias visuais e navegação móvel foi publicada na URL acima em 29/09/2026. Um domínio personalizado ainda será escolhido.

## Projetos

Os seis destaques aparecem primeiro. VERDICT, RECON e SHADOWCAT compõem a galeria técnica. Andréa Tur e CR Fitness também aparecem na seção de projetos para pessoas reais como sites desenvolvidos para clientes. Assistente Personalizado aparece como trabalho de uso privado, com nome, imagem e conteúdo aprovados pelo proprietário, sem link externo.

As páginas do Assistente Personalizado e do SHADOWCAT ficam fora do sitemap e usam `noindex, nofollow`. Elas continuam acessíveis pela galeria e por URL direta; essa marcação não as torna confidenciais.

| Seleção | Projeto | Estado apresentado |
|---|---|---|
| Destaque e trabalho real | Andréa Tur | Site de turismo desenvolvido para cliente; repositório privado |
| Destaque | EDY ScanURL Family | Web/PWA publicada; confirmação física final do Android pendente |
| Destaque | EDY HelpDesk | Release pública v1.0.1; demonstração local com dados sintéticos |
| Destaque | EDY Shield | Release pública v2.3.0; execução local |
| Destaque | EDY SIEM | Release pública v0.3.0; execução local |
| Destaque | EDY SOC Analytics | Release pública v1.1.0; Power BI Desktop, sem publicação no Service |
| Galeria técnica | EDY VERDICT | Código público em release candidate 1.0.0-rc.1; sem instalador distribuído |
| Galeria técnica | EDY RECON | Release pública v1.1.0; validação pública offline |
| Galeria técnica | EDY SHADOWCAT | Plataforma local e privada de investigação autorizada |
| Trabalho real | CR Fitness | Site institucional público em Cloudflare Pages |
| Trabalho privado | Assistente Personalizado | Assistente privado pelo Telegram; sem demo pública |

Descrições, estados, imagens e links de cada case ficam em [data/projects.ts](data/projects.ts). O site só aponta para páginas públicas verificadas; nenhum repositório privado aparece como CTA. As capas em [public/images/projects/covers](public/images/projects/covers) combinam capturas atuais e artes aprovadas; interfaces e imagens de demonstração aparecem dentro dos cases. A [proveniência das capas](docs/cover-sources/README.md) registra cada origem, inclusive a captura do RECON fornecida pelo proprietário. As novas imagens internas têm [origem e contexto documentados](docs/case-media/README.md).

## Experiência

A página inicial apresenta os seis destaques em cartões legíveis. A página de projetos reúne destaques, galeria técnica e trabalhos para pessoas reais; a apresentação em 3D é secundária e opcional. Um índice de seções permite pular diretamente para cada grupo, especialmente no celular. No computador, a roda fica enquadrada na janela: a rolagem percorre um projeto por vez, mantém a página estável e volta a mover a página nos extremos. No celular, gestos horizontais avançam os projetos enquanto a rolagem vertical permanece nativa. Botões, índice e Escape oferecem caminhos adicionais. Cada case apresenta duas imagens com contexto, troca por toque ou setas e acesso à imagem ampliada. Os cases também explicam problema, solução, recursos, tecnologias e estado atual. A interface respeita preferência por movimento reduzido.

A primeira abertura mostra uma apresentação tipográfica curta enquanto a fonte e a imagem inicial terminam de carregar. A espera mínima é de 1,25 segundo, com limite para não prender a navegação em conexão lenta. Ao abrir um projeto pelo card, a transição editorial mostra sua capa durante a entrada do case; movimento reduzido mantém a navegação direta.

O fundo usa partículas leves que flutuam e desaparecem perto do cursor ou do toque, sem cobrir o retrato. Um shader WebGL desenha apenas faíscas na posição do cursor no desktop e em toques ou arrastos no celular: douradas nas áreas escuras e pretas nas áreas claras, sem halo circular. No celular, a quantidade de faíscas e a resolução do canvas são menores; o efeito respeita economia de dados, movimento reduzido e a área do retrato. Os projetos entram suavemente na tela e a galeria aceita gestos horizontais, com rolagem vertical nativa preservada e controles legíveis abaixo da imagem.

As páginas Sobre e Competências mantêm o conteúdo dos cartões sempre visível, com destaque visual ao passar o mouse. Nas áreas claras, o fundo usa o mesmo bege editorial da página de projetos. A numeração decorativa foi retirada dos cartões e dos títulos de seção. A rolagem da galeria 3D foi ajustada para avançar um pouco mais devagar.

Capturas em [docs/assets/github/screenshots](docs/assets/github/screenshots) registram versões anteriores do site. As galerias dos cases e o índice móvel estão disponíveis no endereço público acima.

## Artes para divulgação

O pacote [Assistente Personalizado: 7 stories + 7 feeds](social/assistente-personalizado-7x7-2026-09/assistente-personalizado-7-stories-7-feeds.zip) contém PNGs em 2160×3840 e 2160×2700 px. As interfaces são ilustrativas, usam dados fictícios e não revelam a identidade da profissional atendida. Roteiro e instruções estão em [social/assistente-personalizado-7x7-2026-09/README.md](social/assistente-personalizado-7x7-2026-09/README.md).

## Stack

- React 19, TypeScript 5.9, Vinext 1.0 beta e Vite 8
- Tailwind CSS 4, Framer Motion 12 e GSAP 3
- Lenis no desktop; rolagem nativa no celular
- Cloudflare Workers para a versão publicada

## Desenvolvimento local

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

Use a URL exibida pelo servidor. Gates disponíveis:

```bash
npm run lint
npm run typecheck
npm run build
```

Para gerar o pacote de produção, defina `SITE_URL` com o endereço que receberá esta versão. O valor entra no Worker e alimenta canonical, sitemap e robots. A implantação e a ligação de um domínio estão descritas em [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Esta atualização passou por lint, checagem de tipos, build e revisão visual local e pública em desktop e celular. Nenhum número de Lighthouse ou auditoria de versão anterior é apresentado como resultado atual.

## Estrutura

```text
app/          rotas, layouts, estilos e metadata
components/   interface, navegação e animações
data/         projetos, biografia e links
lib/          SEO e utilitários
public/       imagens e outros assets
docs/         documentação histórica
```

## Conteúdo e documentação

- Textos gerais e links: [data/site.ts](data/site.ts)
- Projetos e cases: [data/projects.ts](data/projects.ts)
- Biografia e competências: [data/about.ts](data/about.ts)
- Estilos: [app/globals.css](app/globals.css)
- [Aprendizados do projeto](docs/PROJECT_LEARNINGS.md)
- [Playbook de design, motion, performance e QA](docs/CODEX_WEB_PROJECT_MEMORY.md)
