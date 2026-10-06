# Curadoria e capas cinematograficas

## Selecao

Os destaques abrem a home, a pagina de projetos e a galeria 3D nesta ordem:

1. EDY CRM
2. CR Fitness
3. EDY SOC Analytics
4. Assistente Personalizado
5. EDY SHADOWCAT
6. EDY RECON
7. WAR ROOM

A curadoria combina complexidade de sistemas, analise de seguranca e trabalho para clientes, sem atribuir resultados comerciais ou operacionais nao documentados. Os demais cases permanecem acessiveis. O catalogo tem treze projetos unicos, sem duplicar os destaques em outros grupos. O nome publico e as restricoes dos cases privados permanecem preservados.

## Capas e imagens internas

RECON, CR Fitness e Assistente Personalizado receberam novas artes cinematograficas, geradas com a ferramenta built-in `image_gen`. Referencias, prompts completos e originais estao em [cover-sources/cinematic-20261006/README.md](cover-sources/cinematic-20261006/README.md). As artes ilustrativas nao sao apresentadas como screenshots ou fotografias documentais dos clientes. CRM, SOC Analytics, SHADOWCAT e WAR ROOM conservam suas identidades e capas existentes.

Oito imagens adicionais ampliam os cases de CRM, CR Fitness, SOC Analytics e SHADOWCAT para quatro imagens cada. As fontes e os limites de publicacao estao em [case-media/curation-20261006/README.md](case-media/curation-20261006/README.md). Ao todo, os treze cases reunem 34 imagens internas, distintas das capas.

O Assistente Personalizado continua com duas demonstracoes explicitamente ilustrativas. Nao foi encontrada uma captura real aprovada para publicacao; nenhuma conversa ou ficha privada foi acessada ou exposta. SHADOWCAT utiliza apenas a demonstracao sintetica aprovada. As imagens internas de CRM e SOC Analytics mostram interfaces reais com dados ficticios. CR Fitness inclui capturas do site publicado; as fotografias ilustrativas do proprio site nao comprovam a aparencia fisica da unidade.

Todos os cases incluem contexto de criacao, problema, solucao, recursos e estado atual. Os textos de origem explicam a proposta documentada, sem inventar datas de lancamento, historias pessoais ou resultados.

## Reproducao e validacao

`node scripts/build-curation-media.mjs` converte os originais em WebP, sem redesenhar interfaces nem recortar as capturas. As capas possuem variantes 640/1080/1600; os nomes versionados evitam reutilizar capas antigas em cache.

`node scripts/test-project-curation.mjs` verifica ordem, integridade do catalogo, origens, numero de imagens e ausencia de links privados. O runtime `c27dfb7` passou em lint, tipagem, build de producao e ensaio Wrangler. A validacao utilizou o pacote isolado de `git archive`, sem incorporar experimentos locais pausados.

- Layout: cinco paginas em nove larguras entre 320 e 2560 px, com 45 combinacoes e quatro visualizacoes da galeria; nenhum erro de pagina, recorte de texto ou sobreposicao detectado.
- Cases: 26 verificacoes de layout dos treze projetos em desktop/celular; origem, problema, solucao e recursos preservados.
- Midia: galerias dos treze cases em 1440, 390 e 320 px, incluindo todas as imagens, controles de pagina e limite final; capas e hero em cinco formatos.
- Curadoria visual: ordem dos sete destaques na home e em Projetos, titulos e `Ver case` sem colisao, links de origem/galeria, todas as imagens dos destaques e privacidade em 390/1440.
- Navegacao 3D: clique direto nas treze capas, arrasto sem abrir por acidente, clique seguinte, teclado, toque, rolagem continua e limites.
- Publicacao: treze cases, canonical/sitemap/robots, experimento ausente e CRM em cinco viewports; integracao WAR ROOM, teclado, Escape/foco e transicoes preservados.

Capturas e relatorios locais ficam em `outputs/portfolio-review/`, ignorado pelo Git. Chrome e Edge foram utilizados com perfis isolados; Chrome DevTools MCP estava indisponivel e Playwright foi o fallback. Nao houve nova medicao Lighthouse nem teste em Safari/aparelhos fisicos. A versao do Worker e a conferência publica sao registradas em [DEPLOYMENT.md](DEPLOYMENT.md).

Conferencia publica concluida no Worker `97549a71-9c73-4ab8-a701-789c925d18dc`: suite de publicacao, CRM em cinco viewports, navegacao 3D e curadoria visual em 390/1440 passaram. `scripts/qa-curation-assets.mjs` confirmou os 17 novos WebPs por SHA-256 e os headers de seguranca de cinco rotas. `scripts/qa-curation-visual.mjs` confirmou ordem dos destaques, separacao de titulo/CTA, origem, todas as imagens dos destaques e restricoes dos cases privados. A suite de publicacao usa o link real para a galeria e uma espera limitada para imagens lazy, evitando competir com o ajuste inicial de rolagem da pagina. Relatorios publicos em `outputs/portfolio-review/curation-public/`.

Nao houve alteracao de dependencias nesta curadoria. A pendencia de seis alertas altos na cadeia de build permanece documentada na [revisao anterior](PORTFOLIO_REVIEW_2026-10-06.md). Experimentos locais pausados continuam fora do pacote de publicacao.
