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

`node scripts/test-project-curation.mjs` verifica ordem, integridade do catalogo, origens, numero de imagens e ausencia de links privados. As suites de navegador verificam a selecao publicada, as capas, as galerias completas, as rotas, os metadados e a navegacao 3D. Resultado final e versao do Worker serao registrados em [DEPLOYMENT.md](DEPLOYMENT.md) depois da inspeção.

Nao houve alteracao de dependencias nesta curadoria. A pendencia de seis alertas altos na cadeia de build permanece documentada na [revisao anterior](PORTFOLIO_REVIEW_2026-10-06.md). Experimentos locais pausados continuam fora do pacote de publicacao.
