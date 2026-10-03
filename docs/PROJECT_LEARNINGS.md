# Aprendizados reutilizáveis — EDY Portfolio

## Objetivo e direção

Portfólio editorial orientado a projetos reais. A interface combina tipografia de alto impacto, fotografia, capturas autênticas dos produtos e navegação narrativa, sem esconder a informação principal.

## Tecnologias utilizadas

- React 19 e TypeScript.
- Vinext/Vite para App Router e build compatível com Cloudflare Workers.
- Framer Motion para revelações pontuais e transições de página.
- GSAP apenas nas sequências editoriais que realmente dependem de timeline.
- Lenis no desktop para interpolação de rolagem; rolagem nativa no mobile e em dispositivos de ponteiro impreciso.
- Sharp para gerar AVIF/WebP responsivos.
- Oxlint, TypeScript e `git diff --check` como verificação rápida; build de produção e auditoria fecham o passe.

## Método aplicado

1. Preservar a identidade visual existente e delimitar cada ajuste por breakpoint.
2. Tratar desktop e mobile como composições próprias, não como uma simples redução proporcional.
3. Medir as caixas reais dos textos nas larguras críticas antes de aceitar títulos grandes.
4. Usar screenshots reais e informativos dos projetos, preferindo estados com dados, menus e ações visíveis.
5. Manter o título editorial fora da área útil da captura para evitar nomes duplicados ou sobrepostos.
6. Antecipar o carregamento de imagens próximas e evitar animações contínuas em cards grandes.
7. Em navegação entre capítulos, abrir a próxima rota no topo e validar o comportamento após a transição.
8. Executar QA visual em desktop e mobile, além de lint, typecheck, build, auditoria e verificação do diff.

## Decisões que funcionaram

- Fontes responsivas com `clamp()` e exceções cirúrgicas para palavras longas.
- AVIF como primeira opção, WebP como alternativa e fonte original como fallback.
- `object-fit: contain` em capturas de ferramentas quando menus e dados precisam permanecer inteiros.
- Motion de entrada curto e executado uma vez; nenhum `scrub` em listas extensas de projetos.
- Lenis desativado no mobile para preservar resposta direta e LCP.
- Conteúdo em português como padrão, mantendo nomes técnicos somente quando agregam precisão.

## Armadilhas a evitar

- Não posicionar títulos gigantes sobre screenshots que já contêm o nome do produto.
- Não carregar imagens apenas quando entram na viewport; a decodificação pode causar queda perceptível de FPS.
- Não usar `scroll: false` em mudanças de rota que devem começar no topo.
- Não aplicar o mesmo tamanho tipográfico a palavras com comprimentos muito diferentes.
- Não usar homes vazias como imagem principal quando existem telas reais com resultados e contexto.
- Não adicionar múltiplas camadas de animação ao mesmo card.

## Checklist para reutilização

Ao sincronizar uma capa após uma revisão de produto, capturar a interface real em DPR 2 e exportar variantes menores com nomes novos para evitar cache da capa anterior. Preservar as imagens internas quando a mudança afeta somente a entrada; não reconstruir capturas com arte gerada.

- Conferir títulos e serifas em 390, 430, 1366, 1440 e 1920 px.
- Confirmar ausência de overflow horizontal.
- Verificar menu completo nas capturas de produto.
- Testar a passagem pelo segundo conjunto de cards sem queda de fluidez.
- Testar os botões de próximo capítulo depois de rolar até o rodapé.
- Validar `prefers-reduced-motion` e navegação por teclado.
- Rodar `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev` e `git diff --check`.
