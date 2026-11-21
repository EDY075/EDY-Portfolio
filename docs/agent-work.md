# Protótipo da home — 20/11/2026

Coordenação: seleção editorial, interface e integração em /preview.
Teste: matriz responsiva e percurso de home → case na mesma worktree.
Revisão: escopo, estados dos projetos e riscos de navegação, em leitura.

## Execução

Na worktree de prévia, rodar npm ci --cache .cache/npm e npm run dev -- --port 4391. Abrir http://localhost:4391/preview. A seleção desta página usa o catálogo existente e não muda os destaques da rota pública.

## Seleção

- EDY CRM. Sistema próprio com demonstração local baseada em dados fictícios.
- ScanURL Family. Aplicação defensiva com versão web pública.
- Andréa Tur. Site com conteúdo gerenciável entregue para cliente.

O teste scripts/test-project-curation.mjs, lint, verificação de tipos e build passaram. As capturas e a matriz de interface ficam em work/preview-qa.

## Segunda versão — referência Lando Norris

Coordenação: abertura, galeria e reaproveitamento de recursos da cópia autorizada. Implementação independente: menu local em PreviewMenu.tsx e preview-menu.css. QA: validação da entrada, menu, galeria e links após integração.

A nova prévia reutiliza a textura de contorno e as fontes Brier e Mona Sans da cópia autorizada. Abertura em máscara, retrato interativo, monograma e galeria foram implementados em React e CSS no portfólio. O foco de cor acompanha o cursor no desktop, e o botão do retrato controla a versão colorida em telas de toque. As imagens da galeria e o retrato são do próprio portfólio.

## Direção visual em todo o portfólio

Coordenação: layout comum, navegação, transição de rota e seleção de capas. Implementação especializada: comportamento do retrato e transição de rolagem da home. Páginas internas: composição editorial, casas de conteúdo e estados existentes. QA: matriz local e percursos entre rotas.

### Comparação com a cópia autorizada

- Retrato: a referência usa WebGL, mapas de profundidade/texturas e shaders sensíveis ao ponteiro. O portfólio usa um retrato cinza com recorte SVG deformado por velocidade/tempo e restaura o estado base ao rolar ou sair.
- Rolagem: a referência encadeia fundo, retrato e bloco de assinatura via timeline. O portfólio substitui o corte reto por uma onda cujo andamento acompanha a rolagem.
- Rotas: a referência usa artboard Rive e roteamento Taxi. Aqui o roteador Vinext e o Framer Motion movem uma máscara em duas etapas, com material do case quando disponível.
- Galeria: o padrão de alturas alternadas usa capas avaliadas lado a lado. EDY CRM, CR Fitness, Andréa Tur e WAR ROOM entram na home; o catálogo continua oferecendo todos os cases e os estados documentados.

### Verificação da versão integrada

- Build Vinext, lint, TypeScript, curadoria e git diff --check passaram.
- Validação Chromium em 15 viewports, zoom equivalente e texto a 200%, incluindo navegação, retorno do histórico, 404, menu por teclado, três estados do CRM e galerias dos cases. Capturas e matriz em work/preview-qa/site-v3.
- Teste de reteste confirmou saída de marca, EG e Contato durante a rolagem e botão Menu funcional a 390 e 1440 px. Também foi verificado o retrato em Sobre e a abertura e o fechamento por Escape da galeria 3D.
- A máscara líquida e as cortinas foram verificadas pelos seus estados e progressão, sem certificação pixel a pixel com Lando. A validação em aparelhos físicos e leitores de tela permanece pendente.

### Refinamento de cursor, transição e rodapé

Coordenação: cursor e interação da hero. Navegação: rodapé e atalhos entre páginas. Passagem de capítulos: transições internas da home e contraste dos controles. Integração e validação: coordenação.

Cursor circular no desktop, foco de luz com inércia e ampliação da máscara ao segurar sobre o retrato. Com toque, o botão de cor continua disponível. A passagem Da ideia ao sistema → Projetos apresenta curva vinculada ao scroll, com versão estática para movimento reduzido. Os controles do CRM usam contraste explícito e crossfade. O próximo capítulo abre Sobre e o rodapé recupera os quatro atalhos do catálogo de rotas. Build, lint, tipos, curadoria e testes em Chromium passaram. Foram simulados 6 viewports, zoom e texto ampliados; aparelho físico e Safari não foram testados. Evidências locais em work/v4-*.png e work/handoff-check.

### Menu tipográfico e fundo da abertura

Coordenação: menu, links e Instagram. Implementação de abertura: retirar o efeito localizado do ponteiro e animar o fundo sem interferir com os controles. Verificação integrada por Chromium.

O menu usa 600 ms e 20 ms entre letras, conforme a animação observada no menu do Lando. O retrato do mosaico abre Sobre e as três capas abrem seus cases. No celular o mosaico aparece após a navegação. A hero ganhou movimento de fundo independente do ponteiro, marcador neutro e uma única imagem que muda integralmente de cor. Desenvolvimento está na linha de atuação. Lenis usa lerp 0,1 na home, como a referência, e CSS acompanha a rolagem no título, no retrato e na entrada dos projetos. Sobre tem cartões expansíveis nativos com links a exemplos reais. Chromium validou a abertura, menu, rolagem e navegação dos cartões, com tamanhos simulados e preferências de movimento.

### Enquadramento do retrato durante a rolagem

Antes deste ajuste, a rolagem deslocava e reduzia a moldura inteira no desktop. O novo movimento altera o enquadramento e amplia a foto dentro da moldura tanto no desktop quanto no celular. É reversível ao subir e está desativado com movimento reduzido. A cor inteira no hover ou pelo botão, a retomada monocromática no scroll, o cursor neutro, o fundo animado e a onda da abertura foram preservados. A alteração é CSS e usa a timeline de rolagem existente.

## Comparação de aberturas A/B/C

A rota /preview inclui um seletor fixo para comparar cada abertura com o mesmo portfólio. O parâmetro hero aceita a, b ou c. A seleção volta ao início para que o movimento possa ser repetido desde o primeiro scroll.

- A. O retrato recortado e o fundo se deslocam em planos separados. A cor retorna gradualmente e a onda conduz à seção seguinte.
- B. O retrato abre espaço para o painel do EDY CRM e as capas CR Fitness e Andréa Tur. Os cards levam aos cases.
- C. Uma linha acompanha o retrato, continua em “Da ideia ao sistema” e sublinha “Projetos”.

Com movimento reduzido, a abertura é estática. Os cases continuam disponíveis na seção Projetos. A comparação roda somente na prévia local.


## Abertura escolhida

A versão C virou a abertura de / e /preview. A faixa de comparação aparece nos links de teste com ?hero=a, ?hero=b ou ?hero=c na prévia. O traço só aparece quando a rolagem começa e se apaga por completo ao voltar ao topo. A cena tem um percurso maior para desenhar a linha, com rolagem de mouse mais gradual na home e gesto nativo no celular.


## Interações de Sobre e Projetos em contexto

Responsabilidades. Coordenação e retrato em app/about, carrossel em app/work, verificação integrada em Chromium. Links dos sites de clientes conferidos nas notas de publicação e por HTTP antes de atualizar o catálogo.

Em Sobre, o retrato recupera as cores com o ponteiro, o controle de cor ou a rolagem. O enquadramento aproxima a foto e desenha duas marcas fora dela, com uma curva de passagem para a trajetória. Com movimento reduzido, a ação de cor continua disponível e o enquadramento é estático.

Em Projetos, as 13 miniaturas do catálogo percorrem um infinito e levam aos cases. Os controles pausam e avançam a seleção. A reprodução automática para fora da área visível, em segundo plano e com movimento reduzido. CR Fitness e Andréa Tur recebem o link “Visitar site” ao serem selecionados. A página inicial dos repositórios foi confirmada pelo GitHub autenticado. Os destinos registrados nos cases coincidem e retornam HTTP 200 diretamente do Cloudflare.

Verificação em Chromium local. Sobre em 320×568, 390×844, 700/701×900, 768×1024, 1024×768, 1280×720, 1440×900 e 1920×1080. Projetos nessas faixas representativas, também em 844×390, 1024×600 e nos dois lados do breakpoint de 1050 px. Texto a 200% simulado em 320, 390 e 768 px, com acesso ao contato pelo menu quando o cabeçalho fica estreito. Hover, toque emulado, navegação por teclado, saída para cases, links externos e movimento reduzido aprovados. Lint, tipagem e build passaram. Validação em aparelhos físicos pendente.

## Legendas dos projetos e experiência de contato

Ajuste dos cards em components/ProjectCard.tsx e app/portfolio-pages.css. Experiência de contato em app/contact. A validação integrada cobre as duas rotas na prévia de desenvolvimento.

A grade de Projetos apresenta a capa em 16:10, seguida de título, descrição e acesso ao case dentro da mesma moldura. A geometria foi verificada em Chromium de 320×568 a 1887×933, incluindo os limites dos breakpoints de 700/701 e 900/901 px. Texto a 200% verificado em 320 e 390 px. O link abriu o case correspondente ao pressionar Enter.

Contato usa o retrato retocado do projeto em uma composição com camadas. O fundo tem entrada animada e usa os mesmos dados do ponteiro que inclinam a moldura e deslocam a foto em intensidade diferente. A lista fica à direita em telas grandes e inclui o Instagram de data/site.ts. Em telas de toque o retrato permanece estático, e a preferência por movimento reduzido também desativa a entrada animada.

Contato verificado no Chromium em 320×568, 390×844, 700/701×900, 768×1024, 844×390, 1024×600, 1120/1121×768, 1280×720, 1440×900 e 1890×949. Texto a 200% verificado em 320, 390 e 768 px. Conferidos mouse, retorno ao centro, toque emulado, foco, movimento reduzido e destino do Instagram. Lint, tipagem e build passaram. Os testes de celular foram emulados.

## Alternativas para a página Contato

A coordenação implementa a opção clara e o seletor compartilhado em app/contact. A opção de retrato cinematográfico e a opção de monograma têm arquivos independentes. A revisão integrada compara os três caminhos, o Instagram, o mouse e os estados responsivos na prévia.

A escolha final foi B, com retrato integrado à cena, contatos no trilho lateral e cabeçalho transparente. A URL /contact abre a opção B. Os endereços com ?visual=a, ?visual=b ou ?visual=c abrem a comparação. A foto no celular começa com uma transição suave abaixo dos controles para preservar o enquadramento.

Verificação em Chromium de 320 a 1884 px, incluindo os limites de 767/768 e 959/960 px. Texto a 200% em 320, 390 e 768 px. Verificados menu, Instagram, posição do fundo sob o cabeçalho, mouse, toque emulado e preferência por movimento reduzido. Lint, tipagem e build passaram. Aparelhos físicos ainda não foram usados na validação.

## Destaque da home

CR Fitness abre a seleção pela leitura da capa em miniatura e ocupa a vitrine detalhada com capturas reais da página inicial, modalidades e planos. EDY CRM aparece na seleção como case técnico. Conferidos a ordem, os três controles e a abertura do case em Chromium a 390×844 e 1440×900. Tipagem e lint passaram.

Escolha final do usuário. WAR ROOM abre a grade e a vitrine usa as capturas da abertura, do mapa e dos episódios narrados. Ordem, três controles e link para o case verificados em Chromium a 390×844 e 1440×900. Tipagem e lint passaram.

As prévias da vitrine usam /preview?warroom=a, b ou c com a âncora #vitrine-war-room. A destaca números e uma captura do mapa. B integra a galáxia à composição. C inicia pelo mapa e permite navegar pelas três telas. Verificados acionamento por toque e teclado, links, layout de 320 a 1440 px e texto a 200% em 390 px. Build, lint e tipos passaram.

A opção B usa os arquivos galaxy.webp (1672×940) e galaxy-mobile.webp (900×506) de assets/images/entrance do WAR ROOM, idênticos aos publicados no GitHub Pages. A animação galaxy-drift de 32 s foi portada para a camada da vitrine, com pausa manual, ao sair de vista e para movimento reduzido. Conferidos em Chromium de 320 a 1884 px, incluindo a troca de imagem em 900/901 px. Build, lint e tipos passaram.

A pedido do usuário, a opção B perdeu o botão de pausa visível e o movimento passou de 32 s para 27,35 s por trecho, cerca de 17% mais rápido. A animação pausa fora da área visível e respeita movimento reduzido. Verificados Chromium desktop e celular emulado, lint e tipos.

A opção B agora é a vitrine padrão da home, na âncora #vitrine-war-room. Os links de prévia com ?warroom=a, b ou c mantêm a comparação. O movimento acelera mais 15% sobre o ajuste anterior, de 27,35 s para 23,78 s por trecho.

## Case Raquel Web e publicação paralela

Captura isolada com dados fictícios, integração editorial dos projetos de cliente e preparação do lançamento em Worker separado. A coordenação valida os assets destinados ao portfólio, monta a peça com Brag e HyperFrames e só desativa o endereço anterior depois do aceite técnico no novo endereço.

A demonstração usa o frontend do checkpoint privado e respostas fictícias de API, com solicitações externas bloqueadas durante a gravação. Foram gravados o painel da personal, a lista de alunas, a ficha versionada, o editor e a leitura do treino no celular. Os avatares de Nina, Lia e Bia foram gerados especificamente para esses perfis fictícios. A galeria e a capa usam capturas da demonstração. A montagem final é de 24 segundos, 1920×1080 a 30 fps, sem narração.

QA local do case em Chromium cobriu 320×568, 390×844 e texto a 200%, 844×390, 768×1024, 900×768, 901×768, 1280×720 e 1440×900, além da curadoria com 14 projetos únicos. As gravações originais, a composição e o manifesto ficam fora do Git. A publicação contém somente as mídias revisadas do case.

## Preloader e identidade visual dos cases

A coordenação mantém o componente compartilhado e integra navegação, dados e validação. O preloader tem implementação isolada. O catálogo de identidades é dividido entre cases de produto e cliente e cases de segurança e dados, a partir das fontes locais e das capturas públicas do portfólio.

A seção de identidade é compartilhada pelos 14 cases e independe da existência de vídeo. As paletas foram confrontadas com CSS, tokens de tema ou capturas do projeto. A amostragem editorial do Assistente Personalizado e do EDY RECON é identificada na própria página. As tecnologias foram complementadas a partir dos manifestos dos projetos.

A home abre com monograma EG, topografia e saída diagonal de 580 ms. A cortina de navegação entre páginas continua independente. A entrada dispensa links com âncora e a preferência por movimento reduzido. A revisão independente detectou que o foco programático no elemento main cortava a animação durante a hidratação. A correção foi validada em três aberturas da home e manteve a dispensa da cortina ao focar controles com o teclado.

Chromium em 320×568, 390×844 e 1440×900 verificou os 14 cases. Raquel Web, WAR ROOM, EDY SOC Analytics e Assistente Personalizado também passaram em 700×844, 701×844, 768×1024, 844×390, 900×768, 901×768, 1024×600, 1280×720 e 1920×1080. Texto a 200% foi conferido nesses quatro cases em 320×568, 390×844 e 768×1024. Validados âncoras, navegação por Enter com Lenis, cores e quebra de texto. Os testes da home cobriram entrada, navegação interna, retorno, âncora direta e movimento reduzido. A demonstração da Raquel Web tocou e avançou em 390×844 e 1440×900. Lint, tipagem, build e curadoria passaram. Não houve teste em aparelho físico.

Capturas e QA desta iteração ficaram em work/preloader-identity no worktree. A entrega está na prévia local.

### Preloader com a referência pedida

A revisão reproduz a abertura verde-lima da referência do Lando Norris com EG no centro e recorte angular que revela a hero. O intervalo fixo é de 1000 ms seguido por uma saída de 500 ms. Os quadros foram comparados apenas no recorte de cor, com diferença média de 0,44% em desktop e 1,00% no celular. O material de comparação está em work/.reanimate/preloader.

QA local em Chromium a 320×568, 390×844, 844×390, 768×1024, 1024×768, 1280×720, 1440×900 e 1920×1080. Conferidos movimento reduzido sem JavaScript, texto a 200% em 320×568, navegação entre home e contato, retorno e âncoras diretas. Lint, tipagem, build e curadoria passaram. Aparelhos físicos ainda não foram testados.

Publicação autorizada em 20/11/2026. A versão 9ad5ecea-165b-4a0f-9e3a-33d700a57b41 recebeu 100% do tráfego do Worker edy-gomes-portfolio-v2 com o runtime de 54fd3e6. Build com SITE_URL de produção e ensaio Wrangler passaram.

No endereço público, Chromium em 390×844 e 1440×900 aprovou o preloader, o acesso às âncoras, os 14 cases com identidade e tecnologias e a reprodução e o avanço do vídeo da Raquel Web. O teste HTTP confirmou sitemap no domínio ativo, HTTP 206 para bytes do vídeo e HTTP 404 no endereço da edição arquivada.

O recarregamento de /#inicio agora exibe o preloader. A verificação no Chromium reproduziu a supressão em produção e validou abertura e recarga da home, recarga após clicar no logotipo, entrada direta na vitrine e movimento reduzido. A matriz usou 1874×922, 768×1024 e 390×844.

## Movimento e cartões da página Sobre

A coordenação cuida da animação do fundo e da validação integrada. O estado visual dos cartões de Princípios tem implementação paralela e escopo próprio no CSS.

O fundo topográfico da abertura do Sobre percorre um ciclo contínuo de 26 segundos. O teste comparou os pontos de passagem e confirmou que o início e o fim do ciclo coincidem. Os cartões de Princípios usam fundo verde-lima enquanto abertos e restauram a cor original ao fechar. O contraste entre o fundo aberto e o texto escuro é de 12,51:1.

Matriz local em Chromium: 320×568, 390×844, 844×390, 700×900, 701×900, 768×1024, 900×768, 901×768, 1280×720, 1440×900 e 1900×790. Conferidos toque emulado, teclado, fechamento, links, contraste e ausência de rolagem horizontal. Texto a 200% em 320×568, 390×844 e 768×1024. Movimento reduzido mantém o fundo estático e a troca de cor. Lint, tipagem e build passaram. Capturas e QA estão em work/about-motion. Aparelhos físicos ainda não foram testados.

### Topografia em movimento nas demais páginas

A coordenação compartilha o ciclo do Sobre com as páginas internas, Contato e fundos da home. O menu e a seção final da home têm integração independente, usando os mesmos tokens de movimento.

O mesmo ciclo contínuo de 26 segundos do Sobre foi aplicado aos fundos topográficos em Projetos, Competências, cases, Contato, menu e seções da home. A abertura da home preserva seu movimento topográfico próprio e o Contato combina o ciclo contínuo com a resposta ao mouse. A preferência por movimento reduzido desliga o ciclo.

Chromium com viewports 390×844, 768×1024 e 1860×840 verificou as camadas, a coincidência entre início e fim do ciclo, avanço do carrossel por teclado, resposta ao ponteiro em Contato, abertura e fechamento do menu por Escape e link de encerramento da home. Movimento reduzido verificado em 390×844 e 1280×720. Texto a 200% em Projetos a 320×568, 844×390 e 1280×720. Lint, tipagem, curadoria e build passaram. Sem teste em aparelho físico. Captura e QA estão em work/about-motion.

## Páginas de erro e revisão antes da publicação

A coordenação integra a resposta HTTP de indisponibilidade, executa a matriz de texto e publica. A interface de erro e a revisão ortográfica têm responsáveis independentes.

A revisão editorial corrigiu concordância, pontuação e expressões dos cases, além do rótulo Projetos de clientes. A revisão visual abriu espaço entre títulos e descrições na home, no Sobre, em Projetos, no Contato e nas galerias dos cases. Ajustou também a quebra de texto na home e em Competências a 200%.

No Worker local, o teste de layout verificou 143 combinações de páginas e tamanhos em Chromium. Todas as 19 páginas de conteúdo, dois caminhos 404 e a rota 503 foram verificadas em 320×568, 390×844 e 1440×900. A amostra reduzida foi verificada em tablet, celular em paisagem, notebook e desktop amplo, incluindo texto a 200% em 320×568, 390×844 e 768×1024. O teste examinou sobreposições, texto fora da largura disponível, erros JavaScript e status HTTP. Galerias com rolagem horizontal e o carrossel têm testes próprios. Não houve teste em aparelhos físicos.

A 404 oferece links para o início e Projetos. A 503 usa um HTML estático com ação de tentativa e resposta sem cache. A simulação local de manutenção retornou 503 na página solicitada e manteve os arquivos estáticos e o vídeo disponíveis. O teste da Raquel Web confirmou reprodução e avanço. Lint, tipagem, curadoria, build e ensaio Wrangler passaram.

Publicação de 20/11/2026. Worker edy-gomes-portfolio-v2 na versão dcb36c1b-8e36-4075-9be5-51ecb66bd018, com 100% do tráfego. No ambiente público, as 22 rotas passaram em 390×844 e 1440×900. A home confirmou HTTP 200. A página ausente confirmou HTTP 404. A rota de indisponibilidade confirmou HTTP 503 por GET e HEAD, com Retry-After e noindex. A reprodução, o avanço e a resposta HTTP 206 do vídeo da Raquel Web passaram.

## Otimização de carregamento

A coordenação mede e integra. Tipografia, capas responsivas e auditoria de código legado têm responsáveis separados; resultados serão confrontados com o perfil móvel de entrada da medição publicada.

A otimização remove GSAP e a rolagem legada da árvore ativa. Lenis carrega sob demanda em desktop com movimento permitido. A galeria 3D carrega ao abrir, e o preloader usa 1,1 s no celular com o mesmo recorte angular de saída. A tipografia usa subconjuntos latino e estendido, preservando os 546 caracteres da fonte. O original pode ser recuperado no histórico como public/preview-assets/sans.woff2. As 14 miniaturas da órbita usam variantes dedicadas, e a demonstração da Raquel usa carregamento nativo ao se aproximar do vídeo em navegadores compatíveis.

Em três aberturas sem cache por rota, comparando dois builds de produção no mesmo Worker local, o celular simulado usou CPU 6×, rede de 1,6 Mb/s e 150 ms de latência. LCP de Início, Projetos e Raquel Web passou de 3,56/2,77/2,66 s para 2,76/2,37/2,52 s. O tráfego passou de 625/1.014/704 kB para 396/433/526 kB. No PC simulado com CPU 4×, o LCP final ficou entre 1,08 e 1,33 s. Projetos e Raquel Web tiveram ligeira alta de LCP no PC, junto de menos bytes e término inicial mais cedo.

Chromium em 320, 390, 768 e 1440 px verificou fontes, preloader em #inicio, rolagem, avanço no carrossel, abertura tardia e fechamento por Escape na galeria 3D e reprodução do vídeo. As miniaturas foram testadas em oito tamanhos e densidades, inclusive texto a 200% no menor viewport. Lint, tipos, curadoria, build e ensaio Wrangler passaram. Relatórios brutos estão em work/performance-opt. Aparelhos físicos e Core Web Vitals de visitantes não foram medidos.

Publicação concluída em 21/11/2026 no Worker edy-gomes-portfolio-v2, versão d52accb7-2f52-41a5-b3ab-9a09149e2b38 com 100% do tráfego e runtime f07b192. A validação pública em 320, 390, 768 e 1440 px confirmou tipografia, preloader, rolagem, carrossel e galeria sob demanda. A demonstração da Raquel Web reproduziu e avançou em desktop e celular emulados. Respostas de Sobre, 404, 503 e os novos assets foram conferidas.

## EDY Energy · 21/11/2026

- Coordenação: dados do case, identidade visual, destaque, integração e publicação.
- Mídia: capa responsiva e capturas reais da demonstração pública.
- Verificação: revisão independente da integração e matriz de telas após o build.

A capa e as duas imagens internas vieram da demonstração pública do EDY Energy. As capturas mostram o Original Nitro, o Ultra Rosa e o montador com as seis latas selecionadas. Foram geradas versões WebP de 640, 1080 e 1600 px para as capas e de 192 e 384 px para o carrossel.

A revisão independente no Chrome headless cobriu 320×568, 390×844, 768×1024, 900×900, 901×900, 1024×600, 1280×720 e 1440×900, com movimento reduzido. Em 390 e 1440 px, também conferiu texto ampliado a 200%. Foram verificados os caminhos do card, do carrossel infinito e da galeria 3D até o case, o carregamento das imagens, a ausência de sobreposição e o sitemap. A captura do pack foi refeita após a animação do título. Aparelhos físicos não foram usados.

Publicado no Worker edy-gomes-portfolio-v2, versão `eb0389a8-1ff5-4b0e-b95b-4a225d63a2cc` com 100% do tráfego. A listagem, o case, o sitemap e as metatags responderam no endereço público. Os sete WebP publicados conferem com as dimensões e os hashes locais.

## Auditoria de links · 21/11/2026

- Coordenação: rastrear os links renderizados em produção e testar rotas, âncoras, menu e galeria.
- Revisão paralela: conferir endereços atuais dos sites e os destinos dos repositórios públicos.

A auditoria em produção cobriu os 15 cases, 119 destinos com âncora e 42 recursos de galeria e demonstração. As páginas de teste de erro devolveram 404 e 503 conforme o esperado. Em Chrome headless, a navegação por menu, da abertura à lista de projetos e do índice 3D ao detalhe de um case completou o fluxo.

Os dez repositórios dos cases abriram sem autenticação e correspondem às URLs canônicas do GitHub. Os seis destinos de sites e demonstrações, incluindo o catálogo narrado do WAR ROOM, responderam HTTP 200 no endereço esperado. Os 17 áudios do catálogo aceitaram requisições parciais. Instagram e GitHub exibiram a identidade esperada. O LinkedIn bloqueou a requisição direta automatizada, mas o mesmo identificador foi confirmado no perfil público. A licença musical foi localizada no site do autor. O link de e-mail foi conferido sem envio de mensagem.

O campo de site do perfil público EDY075 no GitHub ainda aponta para o Worker da primeira edição. Esse endereço fica no perfil do GitHub e não exige alteração de código no portfólio 2.0.

## Auditoria mobile · 21/11/2026

- Coordenação: escopo, critérios, comparação entre motores, mídia e publicação dos resultados.
- Verificação independente: WebKit em perfis iOS e Chrome em perfis Android.

Escopo em produção: Início, Projetos, Sobre, Competências, Contato, 15 cases e páginas de erro 404 e 503. Chrome com perfis Android cobriu as 22 telas em 320×568, 360×800, 393×851, 412×915, 430×932, 851×393 e 800×1280. WebKit com perfis iOS/iPadOS cobriu as 22 telas em 320×568, 390×844, 440×956, 844×390 e 768×1024, mais sete telas em cada lado do breakpoint em 760 e 761 px. Foram 278 carregamentos nessa matriz, sem falhas de status, rolagem horizontal na página ou sobreposição detectada entre cabeçalhos dos cases e suas capas. Os três modos da rota de prévia também foram abertos em ambos os motores.

Os testes de toque incluíram menu, retrato, controle dos princípios, carrossel, índice 3D, navegação entre cases e galeria. O preloader apareceu em carregamentos novos de Início, encerrou a animação em aproximadamente 1,1 s e ficou oculto com redução de movimento. O vídeo do Raquel Web reproduziu, avançou para 12 s e carregou as legendas pt-BR em ambos os motores. O menu e o conteúdo principal tiveram conferência adicional com tamanho-base de fonte simulado em 200%, incluindo largura de 320 px.

Alvos secundários próximos de 40–43 px foram medidos nas miniaturas do carrossel, no menu de tablet e no controle de ampliar imagens. O WebKit para Windows renderizou pesos da fonte variável com espessura semelhante. A diferença também foi reproduzida com o arquivo anterior do portfólio e com Roboto variável, enquanto o controle Arial estático mudou de espessura. A emulação retornou 0 px para as áreas seguras de tela. Aparelhos físicos, recortes de tela e barras reais do navegador precisam de confirmação em dispositivo.

No Chrome com perfil Pixel 7, um gesto vertical iniciado logo após abrir um case pode perder a posição e saltar para o topo. O salto ocorreu tanto no acesso direto quanto ao entrar pelo carrossel, com e sem redução de movimento. Na repetição em produção, um gesto iniciado 420 ms após abrir o case avançou até pelo menos 56 px e retornou ao topo aos 588 ms. Com início aos 700 ms, o salto deixou de ocorrer. O provedor de rolagem reaplica a posição de destino em 90, 240 e 600 ms.

Na fase inicial do carrossel infinito com redução de movimento, o cartão EDY SOC Analytics cobre o centro do EDY HelpDesk em larguras de 320, 390 e 440 px no WebKit. Em 390 px, confirmei nos dois motores que um toque no ponto compartilhado abre o case de SOC Analytics. A listagem abaixo do carrossel e o índice 3D oferecem acesso ao HelpDesk. O código e o site publicado ficaram sem mudanças durante a auditoria.

## Correções de navegação mobile · 21/11/2026

- Coordenação: integração, reprodução comparativa, testes com perfil aproximado do Moto G8 e publicação.
- Implementação: rolagem após a navegação e seleção de projetos no carrossel em arquivos separados.

O provedor de rolagem interrompe os realinhamentos quando detecta gesto, roda ou tecla de rolagem. A transição deixou de reaplicar um segundo conjunto de resets e permite seguir um link na página nova durante a saída da cortina. Menu e controles do carrossel só ficam habilitados quando já conseguem responder ao toque.

O carrossel mostra três capas separadas em telas compactas e com toque. O link Ver case acompanha o projeto selecionado. Os 15 projetos continuam disponíveis pelos controles. Em telas amplas com mouse, a órbita mantém as 15 capas em movimento.

A matriz do build final cobriu 22 rotas nos perfis móveis em Chrome, Edge, Firefox e WebKit, incluindo navegação pelo menu, troca de case e reprodução do vídeo de Raquel Web. Samsung Internet, Opera, Brave, Android System WebView, Instagram e Facebook no Android, além de Chrome, Edge e Firefox no iOS, foram simulados por perfil e testados em cinco rotas e nos fluxos de menu e carrossel. Esses perfis usam os motores de teste, sem executar os aplicativos móveis correspondentes.

O perfil aproximado do Moto G8 cobriu 22 rotas em 360×720 CSS px, DPR 2, e quatro rotas em 360×665 px com CPU quatro vezes mais lenta, download limitado a 1,6 Mbit/s e latência de 150 ms. Conferi também 320 px com fonte a 200%, paisagem em 780×360, iPhone em 390×844, os 15 destinos do carrossel e a órbita animada em desktop. Não houve teste com o aparelho da pessoa que relatou o problema.

As correções foram publicadas no Worker edy-gomes-portfolio-v2, versão `86a5327c-9796-4640-8786-37b779fbc486`. A rodada pública confirmou as 22 rotas e os fluxos principais nos quatro motores/perfis já citados. Ao voltar de um case para a listagem, Chrome e WebKit recuperaram a posição anterior em ambos os modos de movimento. O histórico usa a posição registrada para a rota que o navegador está reabrindo.

## Prévias animadas dos projetos · 21/11/2026

- Interface: controles de prévia e reprodução sob demanda nos cards de Projetos.
- Mídia: compilação de cenas públicas de cada case. Coordenação verifica a matriz, integra e publica.

Os 15 cards da listagem em Projetos ganharam loops H.264 mudos, de 640×400 px e cerca de 6 segundos, com 65 a 233 kB por arquivo. O EDY Energy usa uma captura da troca de sabores. O Raquel Web usa trechos da demonstração com dados fictícios. Os outros 13 vídeos alternam imagens públicas dos cases.

A capa aparece antes da interação. Passar o mouse no card inicia a prévia quando a preferência de movimento permite. O botão Prévia oferece início e parada por toque ou teclado. Uma única prévia fica ativa e o link do case continua independente. Sair da área visível, trocar de card, ocultar a página ou enfrentar uma falha libera o vídeo conforme o modo de reprodução.

O build integrado foi testado em Chrome para desktop (1440×900), notebook (1280×720) e nos perfis Android 360×720 e 320×568 com fonte-base em 200%. O WebKit foi testado em perfis iPhone 390×844 e iPad 768×1024. A validação cobriu os 15 vídeos no perfil Android, hover sobre o título, teclado, movimento reduzido, troca e parada, erros de mídia e navegação até o case. Com CPU 4× mais lenta, 150 ms de latência e download de 1,6 Mbit/s, o perfil aproximado do Moto G8 reproduziu o EDY Energy, baixou só o vídeo escolhido e abriu o case. O teste foi emulado.

Publicado no Worker edy-gomes-portfolio-v2, versão `29030b8a-2fe9-4eff-a852-3b0314d790fc` com 100% do tráfego. A matriz passou novamente em produção e os 15 MP4 públicos têm o mesmo SHA-256 dos arquivos locais.

## Fluidez das prévias · 21/11/2026

- Mídia: reexportar os loops de imagens e recapturar o movimento do EDY Energy.
- Interface: antecipar a resposta ao hover mantendo uma única reprodução sob demanda.

Na versão anterior, os arquivos tinham 15–18 fps e o hover aguardava 320 ms antes de montar o vídeo. No Chrome, a reprodução apresentou 15–18 quadros por segundo. O detector de quadros semelhantes reteve apenas 6 de 100 no Raquel Web e 42 de 107 no EDY Energy.

As 15 prévias agora usam H.264 a 30 fps, mudo e 640×400, com arquivos de 127–227 kB. O EDY Energy foi recapturado quadro a quadro do carrossel publicado. O Raquel Web e demais loops usam movimento de câmera sobre as telas públicas. A checagem reteve 165 de 165 quadros no EDY Energy, 164 de 164 no Raquel Web e 169 de 170 no EDY CRM após remoção de quadros semelhantes.

O hover aguarda 120 ms. Quando o cursor chega ao card durante a rolagem, o carregamento começa assim que a rolagem termina, se ele continuar sobre o card. A troca e o encerramento liberam o vídeo ativo. A matriz anterior de desktop, notebook, Android, iPhone e iPad foi reexecutada. O perfil aproximado do Moto G8 também reproduziu a prévia solicitada e abriu o case com CPU e rede limitadas.

Publicado no Worker edy-gomes-portfolio-v2, versão `bd6d43c5-cf45-417b-8be3-f0096bfe4cda` com 100% do tráfego. A matriz e os hashes dos 15 MP4 com `?v=2` passaram em produção. O Chrome mediu 30 quadros por segundo sem descarte na janela de cerca de dois segundos para EDY Energy, EDY CRM e Raquel Web.

Os controles de prévia passam a exibir apenas ícones, com área de toque de 44×44 px e rótulos para leitores de tela. O build foi testado em Chrome para desktop, notebook e Android emulado, e em WebKit com perfis de iPhone e iPad. Validei também fonte a 200% em 320 px, reprodução, parada, foco por teclado e hover. Os testes foram emulados.
