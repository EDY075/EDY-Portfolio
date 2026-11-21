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
