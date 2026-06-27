# MANUAL-OFICIAL-MINI-ERP-PWA.md

# Manual Oficial do Mini ERP PWA

Projeto: Mini ERP Queijos Serra da Canastra
ResponsÃ¡vel operacional: Delber VilaÃ§a
Empresa: Queijos Serra da Canastra
DomÃ­nio oficial: https://mini-erp-canastra.vercel.app
Projeto Vercel oficial: mini-erp-canastra
Pasta local oficial: C:\Users\Delber\Mini-ERP\projeto
VersÃ£o estÃ¡vel de referÃªncia mais recente: 2026.06.24.03
Data base deste manual: 27/06/2026

## 1. Objetivo deste documento

Este documento Ã© o manual oficial e completo do Mini ERP Queijos Serra da Canastra.

Ele deve servir como documento mestre para retomada do projeto, auditoria, refinamento, diagnÃ³stico, deploy, rollback, backup e planejamento da transformaÃ§Ã£o do Mini ERP em um aplicativo PWA instalÃ¡vel.

Este manual nÃ£o Ã© um resumo. Ele deve concentrar todo o conhecimento acumulado do projeto, com foco em preservar estabilidade, evitar regressÃµes, impedir downgrade de versÃ£o e garantir que qualquer nova frente de trabalho seja feita com cautela.

A transformaÃ§Ã£o em PWA deve respeitar uma regra central: o desktop deve permanecer exatamente como estÃ¡. A experiÃªncia instalÃ¡vel deve melhorar principalmente o uso no celular, sem desmontar, reescrever ou trocar a arquitetura atual.

## 2. Escopo do manual

Este manual cobre:

1. Estado atual do Mini ERP.
2. Arquitetura tÃ©cnica conhecida.
3. Estrutura de pastas oficial.
4. MÃ³dulos existentes.
5. Regras permanentes de trabalho.
6. HistÃ³rico de versionamento.
7. HistÃ³rico do problema de downgrade.
8. HistÃ³rico de Service Worker.
9. HistÃ³rico de cache.
10. Fluxo oficial de deploy.
11. Fluxo oficial de rollback.
12. PolÃ­tica de backups.
13. Refinamentos implementados.
14. Funcionalidades aprovadas.
15. Funcionalidades pendentes.
16. Riscos conhecidos.
17. Protocolo oficial de auditoria.
18. Protocolo de refinamento localizado.
19. Comandos oficiais para Codex.
20. Checklist de testes.
21. EstratÃ©gia oficial para transformar o Mini ERP em PWA.
22. CritÃ©rios de sucesso para desktop, mobile e aplicativo instalado.

## 3. Regra principal deste manual

Antes de qualquer alteraÃ§Ã£o no Mini ERP, este manual deve ser lido junto com o arquivo LEIA-PRIMEIRO-MINI-ERP.md.

O LEIA-PRIMEIRO-MINI-ERP.md Ã© o documento curto de retomada rÃ¡pida.

O MANUAL-OFICIAL-MINI-ERP-PWA.md Ã© o documento mestre completo.

A ordem correta Ã©:

1. Ler o LEIA-PRIMEIRO-MINI-ERP.md.
2. Conferir este manual oficial.
3. Auditar o ZIP recebido.
4. Confirmar a versÃ£o atual real.
5. Confirmar a pasta correta.
6. Confirmar o projeto Vercel correto.
7. Confirmar o domÃ­nio oficial.
8. Somente depois discutir qualquer refinamento.

## 4. Identidade do projeto

O Mini ERP Ã© um sistema operacional interno da Queijos Serra da Canastra.

Ele foi criado para apoiar a rotina real de vendas, cobranÃ§as, entregas, prÃ©-vendas, pagamentos, clientes, produtos e controle financeiro bÃ¡sico.

O sistema Ã© usado principalmente em dois contextos:

1. Celular em campo, durante entregas, recreios, visitas a clientes, cobranÃ§as e registros rÃ¡pidos.
2. Desktop, para conferÃªncia, administraÃ§Ã£o, revisÃ£o, ajustes e visÃ£o mais ampla do negÃ³cio.

A prioridade do projeto sempre foi resolver problemas reais da operaÃ§Ã£o, nÃ£o criar um sistema genÃ©rico.

O Mini ERP deve permanecer simples, direto, rÃ¡pido e confiÃ¡vel.

## 5. Ambiente oficial

### 5.1 Pasta local oficial

A pasta oficial do Mini ERP Ã©:

C:\Users\Delber\Mini-ERP\projeto

Essa pasta deve ser tratada como a Ãºnica pasta operacional correta para o Mini ERP.

NÃ£o se deve publicar, testar ou gerar ZIP de outra pasta sem antes provar que ela Ã© a pasta correta.

### 5.2 DomÃ­nio oficial

O domÃ­nio oficial em produÃ§Ã£o Ã©:

https://mini-erp-canastra.vercel.app

Qualquer teste de produÃ§Ã£o deve apontar para esse domÃ­nio.

### 5.3 Projeto Vercel oficial

O projeto oficial na Vercel Ã©:

mini-erp-canastra

Antes de qualquer deploy, deve ser confirmado que o terminal estÃ¡ conectado ao projeto correto.

### 5.4 Sistema operacional usado

O ambiente operacional do usuÃ¡rio Ã© Windows.

Os comandos devem ser pensados para Windows PowerShell.

NÃ£o usar instruÃ§Ãµes baseadas em Linux como padrÃ£o.

NÃ£o assumir ambiente Linux, Bash, WSL ou Mac.

### 5.5 Navegadores e dispositivos

Uso principal:

1. Google Chrome no desktop.
2. Google Chrome no celular.
3. Safari no iPhone para testes especÃ­ficos.
4. PWA instalado no iPhone como objetivo futuro.

O histÃ³rico do projeto mostrou comportamento diferente entre desktop, navegador mobile, Safari iPhone, 4G e Wi-Fi. Por isso, qualquer teste sÃ©rio precisa considerar mais de um ambiente.

## 6. VersÃ£o estÃ¡vel de referÃªncia

A versÃ£o estÃ¡vel mais recente consolidada no histÃ³rico Ã©:

2026.06.24.03

Essa versÃ£o foi validada com os seguintes pontos:

1. version.json online respondendo 200 OK.
2. DomÃ­nio oficial respondendo corretamente.
3. VersÃ£o do aplicativo compatÃ­vel com a versÃ£o publicada.
4. Service Worker disponÃ­vel.
5. Service Worker controlando a pÃ¡gina.
6. Sistema online.
7. Supabase conectado ou sem erro registrado.
8. Dados carregados em produÃ§Ã£o.
9. Sem erro de sincronizaÃ§Ã£o registrado.
10. Ambiente de produÃ§Ã£o ativo.

Registro de diagnÃ³stico validado no histÃ³rico:

VersÃ£o do aplicativo: 2026.06.24.03
VersÃ£o publicada: 2026.06.24.03
Maior versÃ£o aceita: 2026.06.24.03
Status da versÃ£o: OK
Service Worker disponÃ­vel: sim
Service Worker controlando a pÃ¡gina: sim
Online: sim
Ambiente: produÃ§Ã£o
URL: https://mini-erp-canastra.vercel.app/?v=2026.06.24.03-1782342793308
Navegador: Safari Mobile
Sistema: iOS

Esse diagnÃ³stico Ã© importante porque mostra que a versÃ£o 2026.06.24.03 chegou corretamente ao ambiente real em campo.

## 7. Stack tÃ©cnica conhecida

O Mini ERP utiliza:

1. React.
2. Vite.
3. CSS prÃ³prio em src/index.css.
4. Supabase como backend.
5. Banco PostgreSQL via Supabase.
6. Vercel para deploy.
7. Arquivos pÃºblicos de versionamento e Service Worker na pasta public.
8. Build gerado na pasta dist.
9. Service Worker para controle de cache, limpeza ou atualizaÃ§Ã£o, conforme fase do projeto.
10. version.json para conferÃªncia de versÃ£o publicada.

A arquitetura atual nÃ£o deve ser trocada sem necessidade comprovada.

A frente PWA deve partir da arquitetura existente.

NÃ£o deve haver reescrita geral do sistema apenas para transformÃ¡-lo em aplicativo instalÃ¡vel.

## 8. Arquivos crÃ­ticos do projeto

Os arquivos crÃ­ticos do Mini ERP sÃ£o:

1. src/App.jsx
2. src/main.jsx
3. src/index.css
4. public/version.json
5. public/sw.js
6. public/service-worker.js
7. vercel.json
8. dist/version.json
9. package.json
10. package-lock.json
11. README.md
12. LEIA-PRIMEIRO-MINI-ERP.md
13. MANUAL-OFICIAL-MINI-ERP-PWA.md
14. sql/
15. arquivos de documentaÃ§Ã£o tÃ©cnica do projeto

Esses arquivos devem ser auditados antes de qualquer alteraÃ§Ã£o relevante.

## 9. Arquivos que nÃ£o devem ser tratados como fonte operacional

Os seguintes itens nÃ£o devem ser tratados como parte limpa da versÃ£o operacional, salvo anÃ¡lise especÃ­fica:

1. node_modules
2. dist, quando estiver sendo enviado como artefato antigo sem contexto
3. .vercel
4. .git
5. .env.local
6. arquivos mortos
7. backups antigos dentro da pasta operacional
8. zips antigos misturados Ã  pasta do projeto
9. arquivos duplicados sem funÃ§Ã£o clara
10. versÃµes antigas de documentaÃ§Ã£o sem identificaÃ§Ã£o

A presenÃ§a desses itens em ZIPs pode dificultar auditoria, aumentar risco de confusÃ£o e expor informaÃ§Ã£o desnecessÃ¡ria.

## 10. DiferenÃ§a entre Mini ERP e CatÃ¡logo

O Mini ERP e o CatÃ¡logo sÃ£o projetos diferentes.

Nunca misturar as pastas dos dois projetos.

Nunca publicar o Mini ERP estando dentro da pasta do CatÃ¡logo.

Nunca publicar o CatÃ¡logo estando dentro da pasta do Mini ERP.

O Mini ERP tem domÃ­nio:

https://mini-erp-canastra.vercel.app

O CatÃ¡logo tem outra estrutura e outro objetivo.

O Mini ERP Ã© sistema operacional interno.

O CatÃ¡logo Ã© vitrine comercial e pedido via WhatsApp.

As regras de PWA deste manual sÃ£o exclusivas do Mini ERP.

## 11. Estado atual do sistema

O Mini ERP estÃ¡ em produÃ§Ã£o e Ã© usado como ferramenta real de operaÃ§Ã£o.

Os mÃ³dulos principais estÃ£o funcionando, com foco em:

1. Clientes.
2. Produtos.
3. Vendas.
4. CobranÃ§as.
5. Pagamentos.
6. Delivery.
7. PrÃ©-vendas.
8. Painel.
9. Financeiro.
10. RelatÃ³rios.
11. DiagnÃ³stico do sistema.
12. OperaÃ§Ã£o offline ou base para operaÃ§Ã£o offline, conforme versÃ£o auditada.

O sistema jÃ¡ passou por incidentes importantes de versÃ£o, cache e Service Worker.

A fase atual nÃ£o Ã© de expansÃ£o agressiva.

A fase atual Ã© de consolidaÃ§Ã£o, documentaÃ§Ã£o, seguranÃ§a operacional e preparaÃ§Ã£o para PWA.

## 12. Filosofia operacional do Mini ERP

O Mini ERP deve respeitar a rotina real do negÃ³cio.

A operaÃ§Ã£o em campo exige velocidade.

O desktop exige visÃ£o ampla e seguranÃ§a.

O celular exige toque simples, campos legÃ­veis, botÃµes claros e pouca fricÃ§Ã£o.

A lÃ³gica do sistema deve favorecer:

1. Registrar rÃ¡pido.
2. Conferir antes de salvar.
3. Evitar perda de dados.
4. Evitar retrabalho.
5. Facilitar cobranÃ§a.
6. Facilitar entrega.
7. Facilitar conversÃ£o de prÃ©-venda em venda.
8. Manter histÃ³rico.
9. Evitar regressÃµes.
10. Evitar qualquer retorno para versÃ£o antiga.

## 13. SeparaÃ§Ã£o entre mobile e desktop

A estratÃ©gia aprovada para evoluÃ§Ã£o Ã© separar a experiÃªncia sem quebrar a arquitetura.

No desktop, manter a visÃ£o administrativa completa.

No mobile, priorizar operaÃ§Ã£o de campo.

A transformaÃ§Ã£o em PWA deve reforÃ§ar essa separaÃ§Ã£o visual e operacional, mas sem criar outro sistema desconectado.

### 13.1 Desktop

No desktop, manter exatamente como estÃ¡ atÃ© prova de necessidade.

O desktop deve continuar servindo para:

1. Painel.
2. Vendas.
3. CobranÃ§as.
4. Delivery.
5. Pagamentos.
6. Despesas.
7. Clientes.
8. Produtos.
9. Fornecedores.
10. Pedidos para fornecedor.
11. RelatÃ³rios.
12. Taxas.
13. ConfiguraÃ§Ãµes.
14. ConferÃªncia geral da operaÃ§Ã£o.

### 13.2 Mobile

No mobile, a experiÃªncia deve priorizar:

1. PrÃ©-vendas.
2. Vendas.
3. CobranÃ§as.
4. Delivery.
5. Pagamentos.
6. PendÃªncias.
7. Painel resumido.
8. AÃ§Ãµes rÃ¡pidas.
9. BotÃµes grandes.
10. Evitar zoom indevido.
11. Evitar campos que obriguem movimento de pinÃ§a.
12. Evitar excesso de informaÃ§Ã£o na tela.

### 13.3 Aplicativo PWA instalado

O PWA deve ser tratado como uma forma mais fluida de abrir o Mini ERP no celular.

Ele nÃ£o deve ser tratado como outro produto.

Ele deve usar a mesma base, a mesma versÃ£o e o mesmo domÃ­nio.

A vantagem esperada Ã©:

1. Abrir como aplicativo.
2. Ter Ã­cone na tela inicial.
3. Reduzir distraÃ§Ãµes do navegador.
4. Melhorar fluidez no uso em campo.
5. Permitir experiÃªncia mais prÃ³xima de app.
6. Preservar o desktop exatamente como estÃ¡.

## 14. MÃ³dulos do Mini ERP

## 14.1 Painel

O Painel Ã© a Ã¡rea de visÃ£o geral.

Ele deve oferecer leitura rÃ¡pida da operaÃ§Ã£o.

Pode incluir indicadores de vendas, cobranÃ§as, pagamentos, pendÃªncias, delivery, prÃ©-vendas ou resumo financeiro, conforme a versÃ£o auditada.

No mobile, o Painel nÃ£o deve atrapalhar a operaÃ§Ã£o principal. Ele pode ser resumido.

No desktop, pode manter visÃ£o mais ampla.

## 14.2 Clientes

O mÃ³dulo de Clientes Ã© base estrutural do Mini ERP.

Ele permite manter cadastro de clientes e referÃªncias.

A referÃªncia Ã© um campo muito importante para a operaÃ§Ã£o real, pois muitos clientes sÃ£o identificados por escola, prÃ©dio, quadra, bloco, apartamento, setor ou local de entrega.

Exemplos recorrentes de referÃªncia:

1. EP 314 Sul.
2. EP 210 Norte.
3. EC 306 Norte.
4. Paulo Freire.
5. SEB.
6. CHPP.
7. CEAN.
8. 114 Sul.
9. 304 Norte.
10. 405 Norte.
11. Escola Parque.
12. Escola DNA.
13. Setor Oeste.
14. DEAM.
15. DPE.
16. 35Âª DP.

O sistema deve preservar referÃªncias compostas, sem cortar nÃºmero, bloco, apartamento, letra ou complemento.

## 14.3 Produtos

O mÃ³dulo de Produtos mantÃ©m os itens vendidos.

Os produtos precisam estar disponÃ­veis para vendas, prÃ©-vendas, cobranÃ§as e relatÃ³rios.

O sistema deve preservar a lÃ³gica de produto real do negÃ³cio.

Exemplos de produtos trabalhados:

1. Minas PadrÃ£o.
2. Minas Frescal.
3. Meia cura.
4. Mussarela palito.
5. Mussarela tranÃ§a.
6. Provolone desidratado.
7. ParmesÃ£o.
8. Defumado.
9. RequeijÃ£o.
10. Doce de leite.
11. Goiabada.
12. Figo Ramy.
13. Salame.
14. CafÃ©.
15. Mel.
16. Kit quatro queijos.
17. Kit tranÃ§a.
18. Cocada cremosa.
19. CachaÃ§a especial, quando aplicÃ¡vel em outros fluxos.

O Mini ERP nÃ£o deve confundir produtos do ERP com a lÃ³gica visual do CatÃ¡logo.

## 14.4 Vendas

O mÃ³dulo de Vendas registra vendas efetivadas.

Pontos consolidados:

1. Permite cliente cadastrado.
2. Permite cliente avulso.
3. Permite itens adquiridos.
4. Permite forma de pagamento.
5. Permite valor.
6. Integra com pagamentos e financeiro, conforme versÃ£o.
7. Deve preservar conferÃªncia antes de salvar.
8. Deve permitir lanÃ§amento rÃ¡pido em campo.

O fluxo por voz foi trabalhado para registrar vendas com estrutura como:

cliente [nome], referÃªncia [texto], itens adquiridos [lista], forma de pagamento [pix/crÃ©dito/dÃ©bito]

A preferÃªncia Ã© sempre conferir antes de salvar.

## 14.5 Pagamentos

O mÃ³dulo de Pagamentos acompanha formas de pagamento e pendÃªncias financeiras.

Formas de pagamento recorrentes:

1. Pix.
2. DÃ©bito.
3. CrÃ©dito.
4. Fiado.
5. Em aberto.

O sistema deve diferenciar venda paga de venda pendente.

O Pix precisa ser reconhecido corretamente, inclusive quando o reconhecimento de voz interpreta errado como â€œpicsâ€, â€œpixxâ€ ou variaÃ§Ãµes.

## 14.6 CobranÃ§as

O mÃ³dulo de CobranÃ§as Ã© crÃ­tico para a operaÃ§Ã£o.

Ele permite controlar clientes que estÃ£o devendo, gerar mensagens e acompanhar pendÃªncias.

Pontos jÃ¡ consolidados:

1. MÃºltiplas pendÃªncias por cliente.
2. Mensagem final com marcaÃ§Ã£o visual.
3. Resumo de cobranÃ§as.
4. Controle de valores em aberto.
5. AÃ§Ãµes pensadas para WhatsApp.
6. Utilidade direta em campo.

O mÃ³dulo de CobranÃ§as deve ser preservado com muito cuidado.

Qualquer mudanÃ§a nele precisa ser localizada e testada.

## 14.7 Delivery

O mÃ³dulo de Delivery controla entregas.

Fluxo conhecido:

1. Nova Entrega.
2. Modal de cadastro ou ediÃ§Ã£o.
3. Controle de cliente.
4. Controle de referÃªncia.
5. Controle de itens.
6. Controle de status.
7. Utilidade direta em campo.

O Delivery Ã© um dos mÃ³dulos mais importantes para uso mobile.

Na transformaÃ§Ã£o PWA, ele deve estar entre os primeiros mÃ³dulos testados.

## 14.8 PrÃ©-vendas

O mÃ³dulo de PrÃ©-vendas nasceu de uma necessidade operacional real: registrar pedidos rapidamente em momentos curtos, especialmente durante recreios ou janelas apertadas de atendimento, para converter depois em venda.

Esse mÃ³dulo Ã© essencial para o uso em campo.

Pontos consolidados:

1. Registrar intenÃ§Ã£o de compra antes da venda final.
2. Usar Supabase em vez de depender apenas de localStorage.
3. Permitir editar prÃ©-venda.
4. Permitir gerar mensagem.
5. Permitir converter em venda.
6. Permitir marcar como convertida.
7. Permitir excluir.
8. Mover convertidas para o final.
9. Diferenciar visualmente convertidas.
10. Reduzir tamanho de card quando convertido.
11. Voltar para PrÃ©-venda apÃ³s salvar e continuar.
12. Possibilitar conversÃ£o para Delivery quando nÃ£o houver estoque.

A PrÃ©-venda Ã© um dos pontos mais sensÃ­veis do sistema.

NÃ£o deve ser alterada de forma ampla sem auditoria localizada.

## 14.9 Financeiro

O Financeiro acompanha valores, taxas, despesas, fornecedores, pagamentos e visÃ£o operacional do dinheiro.

Alguns parÃ¢metros financeiros jÃ¡ fazem parte da lÃ³gica do negÃ³cio:

1. Pix com taxa zero.
2. DÃ©bito com taxa aproximada de 1,09%.
3. CrÃ©dito com taxas por parcela.
4. Link de pagamento com taxas prÃ³prias.
5. Controle de fornecedores.
6. Controle de despesas.
7. Controle de margem.
8. Controle de peÃ§as.
9. Controle de frete.
10. Controle de pagamentos em aberto.

Meta operacional discutida:

A margem operacional por produto deve buscar aproximadamente R$ 15,00 a R$ 20,00 como parÃ¢metro de decisÃ£o.

Esse nÃºmero nÃ£o deve ser aplicado cegamente como regra automÃ¡tica sem validaÃ§Ã£o, mas Ã© referÃªncia importante para precificaÃ§Ã£o e anÃ¡lise.

## 14.10 RelatÃ³rios

Os RelatÃ³rios ajudam a entender o desempenho do negÃ³cio.

Podem envolver:

1. Vendas por perÃ­odo.
2. Pagamentos.
3. PendÃªncias.
4. Clientes.
5. Produtos.
6. PeÃ§as vendidas.
7. Margem.
8. Fornecedores.
9. Despesas.
10. Taxas.

No desktop, os RelatÃ³rios podem ser mais amplos.

No mobile, devem ser simples ou secundÃ¡rios.

## 14.11 Despesas

O mÃ³dulo de Despesas compÃµe a visÃ£o financeira.

Ele deve registrar custos operacionais que afetam o resultado real.

Exemplos recorrentes:

1. Frete.
2. Taxas.
3. Custos de viagem.
4. Fornecedores.
5. Compras especÃ­ficas.
6. Custos de entrega.

## 14.12 Fornecedores

O mÃ³dulo de Fornecedores organiza a origem dos produtos.

Fornecedores jÃ¡ citados no histÃ³rico do negÃ³cio:

1. AssociaÃ§Ã£o dos Queijeiros.
2. Buba Canastra.
3. Van Ita.
4. Divinos.
5. Jean, Formiga.
6. Eduardo, Celeiros de Minas.
7. Daniel, cachaÃ§as.
8. Serra da Abelha.
9. Juliatto.

O controle de fornecedores deve ajudar na conferÃªncia de compras, custos e reposiÃ§Ã£o.

## 14.13 Pedidos para fornecedor

O mÃ³dulo de Pedidos para fornecedor deve apoiar reposiÃ§Ã£o e organizaÃ§Ã£o das compras.

Ele deve ser preservado como parte do desktop administrativo.

No mobile, nÃ£o deve ser prioridade inicial do PWA, salvo necessidade operacional posterior.

## 14.14 Taxas

O mÃ³dulo de Taxas ajuda a calcular custo de recebimento por cartÃ£o, dÃ©bito, crÃ©dito e link.

Taxas conhecidas no histÃ³rico:

1. Pix: 0%.
2. DÃ©bito: 1,09%.
3. CrÃ©dito 1x: assumida conforme polÃ­tica operacional.
4. CrÃ©dito 2x: 5,39% no custo real citado.
5. CrÃ©dito 3x: 6,12% no custo real citado.
6. CrÃ©dito 4x: 6,85% no custo real citado.
7. Link 1x: 4,99%.
8. Link 2x: 7,50%.
9. Link 3x: 9,20%.

Essas taxas devem ser conferidas no sistema antes de qualquer automatizaÃ§Ã£o nova.

## 14.15 ConfiguraÃ§Ãµes

ConfiguraÃ§Ãµes devem concentrar parÃ¢metros do sistema.

Na frente PWA, configuraÃ§Ãµes podem incluir ou se relacionar com:

1. VersÃ£o do aplicativo.
2. DiagnÃ³stico.
3. AtualizaÃ§Ã£o.
4. Service Worker.
5. Cache.
6. Ambiente.
7. Dados de sincronizaÃ§Ã£o.
8. PreferÃªncias visuais ou operacionais, se jÃ¡ existirem.

NÃ£o criar novas configuraÃ§Ãµes sem necessidade comprovada.

## 14.16 DiagnÃ³stico do Sistema

O DiagnÃ³stico do Sistema Ã© peÃ§a crÃ­tica do projeto.

Ele deve permitir verificar:

1. Data e hora.
2. VersÃ£o do aplicativo.
3. VersÃ£o publicada.
4. Maior versÃ£o aceita.
5. Status da versÃ£o.
6. Service Worker disponÃ­vel.
7. Service Worker controlando a pÃ¡gina.
8. Online ou offline.
9. Ambiente.
10. URL atual.
11. Navegador.
12. Sistema operacional.
13. Estado do Supabase.
14. Ãšltima atualizaÃ§Ã£o de dados.
15. Erro de sincronizaÃ§Ã£o.
16. Quantidade de clientes carregados.
17. Quantidade de prÃ©-vendas carregadas.
18. Quantidade de cobranÃ§as carregadas.
19. Quantidade de delivery carregados.
20. Outros mÃ³dulos carregados, conforme versÃ£o.

Esse diagnÃ³stico foi fundamental para diferenciar problema real de deploy, cache local, Service Worker, iPhone, Safari, 4G e versÃ£o publicada.

Ele deve ser preservado e valorizado na transformaÃ§Ã£o PWA.

## 15. Regras permanentes do projeto

## 15.1 Nunca assumir a versÃ£o

Nunca assumir que a versÃ£o citada na conversa Ã© a mesma que estÃ¡ no ZIP.

Sempre auditar o arquivo recebido.

Sempre confirmar a versÃ£o real nos arquivos.

Sempre confirmar a versÃ£o online.

## 15.2 Nunca alterar antes de auditar

Antes de qualquer cÃ³digo, deve haver auditoria.

A auditoria deve verificar:

1. Pasta correta.
2. Projeto correto.
3. DomÃ­nio correto.
4. VersÃ£o local.
5. VersÃ£o no App.jsx.
6. VersÃ£o no main.jsx.
7. VersÃ£o no public/version.json.
8. VersÃ£o no sw.js.
9. VersÃ£o no service-worker.js.
10. VersÃ£o no dist/version.json, quando existir.
11. vercel.json.
12. Service Worker.
13. Cache.
14. Build.
15. Riscos de regressÃ£o.

## 15.3 Nunca misturar Mini ERP com CatÃ¡logo

Essa regra Ã© absoluta.

Antes de qualquer deploy, confirmar que o terminal estÃ¡ na pasta:

C:\Users\Delber\Mini-ERP\projeto

## 15.4 Nunca publicar sem teste local

O deploy sÃ³ deve acontecer depois de:

1. Auditoria.
2. Ajuste localizado, quando houver.
3. Build local.
4. Teste local.
5. ConferÃªncia de versÃ£o.
6. ConferÃªncia dos mÃ³dulos crÃ­ticos.
7. ValidaÃ§Ã£o bÃ¡sica no mobile, quando a mudanÃ§a afetar mobile.

## 15.5 Nunca fazer mudanÃ§a ampla sem necessidade

A regra do projeto Ã© refinamento localizado.

NÃ£o reescrever o sistema.

NÃ£o trocar arquitetura.

NÃ£o reorganizar tudo.

NÃ£o alterar mÃ³dulos estÃ¡veis por estÃ©tica ou preferÃªncia tÃ©cnica.

## 15.6 Provar o local antes de mexer

Antes de alterar qualquer componente sensÃ­vel, o cÃ³digo deve ser localizado e mostrado.

Exemplo de regra jÃ¡ adotada:

Antes de alterar a barra inferior mobile, Ã© obrigatÃ³rio abrir o App.jsx, mostrar o trecho exato onde a barra estÃ¡, mostrar a composiÃ§Ã£o real encontrada no cÃ³digo e sÃ³ depois propor alteraÃ§Ã£o.

Essa regra vale para qualquer Ã¡rea sensÃ­vel:

1. Barra inferior mobile.
2. PrÃ©-vendas.
3. CobranÃ§as.
4. Delivery.
5. Vendas.
6. Service Worker.
7. Cache.
8. Versionamento.
9. Deploy.
10. PWA.

## 15.7 Preservar o que estÃ¡ funcionando

Se um mÃ³dulo estÃ¡ estÃ¡vel, ele nÃ£o deve ser modificado por reflexo.

Toda mudanÃ§a precisa responder:

1. Qual problema real serÃ¡ resolvido?
2. Onde exatamente estÃ¡ o cÃ³digo?
3. Qual trecho serÃ¡ alterado?
4. Qual risco existe?
5. Como testar?
6. Como voltar atrÃ¡s?

## 15.8 Desktop intocÃ¡vel na frente PWA

A transformaÃ§Ã£o PWA nÃ£o pode desmontar o desktop.

O desktop deve permanecer exatamente como estÃ¡, salvo ajuste mÃ­nimo e comprovadamente necessÃ¡rio para compatibilidade geral.

A frente PWA deve focar:

1. Manifest.
2. Ãcone.
3. InstalaÃ§Ã£o.
4. Service Worker correto.
5. Cache controlado.
6. ExperiÃªncia mobile.
7. SeguranÃ§a contra downgrade.
8. DiagnÃ³stico.
9. Teste em aplicativo instalado.

## 16. PrincÃ­pio de evoluÃ§Ã£o para PWA

O Mini ERP deve virar PWA sem virar outro sistema.

A estratÃ©gia correta Ã© incremental:

1. Auditar a base atual.
2. Confirmar versÃ£o estÃ¡vel.
3. Confirmar Service Worker atual.
4. Confirmar polÃ­tica de cache.
5. Confirmar version.json.
6. Criar ou revisar manifest.
7. Definir Ã­cones.
8. Garantir installability.
9. Garantir que o app instalado use a mesma versÃ£o correta.
10. Garantir que desktop continue igual.
11. Testar em desktop.
12. Testar em mobile navegador.
13. Testar em iPhone instalado.
14. Testar atualizaÃ§Ã£o apÃ³s deploy.
15. Testar rollback.

A frente PWA nÃ£o deve comeÃ§ar por cÃ³digo.

Ela deve comeÃ§ar por documentaÃ§Ã£o, auditoria e definiÃ§Ã£o de critÃ©rios de sucesso.

## 17. CritÃ©rio de sucesso inicial para o PWA

A transformaÃ§Ã£o em PWA sÃ³ serÃ¡ considerada bem sucedida quando:

1. O Mini ERP continuar funcionando no desktop exatamente como antes.
2. O Mini ERP abrir no celular pelo navegador.
3. O Mini ERP puder ser instalado como aplicativo.
4. O aplicativo instalado abrir com a versÃ£o correta.
5. O aplicativo instalado nÃ£o voltar para versÃ£o antiga.
6. O version.json online continuar acessÃ­vel.
7. O diagnÃ³stico mostrar versÃ£o correta.
8. O Service Worker nÃ£o prender HTML antigo.
9. O cache nÃ£o causar downgrade.
10. O usuÃ¡rio conseguir usar em campo com mais fluidez.
11. PrÃ©-vendas continuarem funcionando.
12. Vendas continuarem funcionando.
13. CobranÃ§as continuarem funcionando.
14. Delivery continuar funcionando.
15. Pagamentos continuarem funcionando.
16. Supabase continuar conectado.
17. NÃ£o haver perda de dados.
18. NÃ£o haver regressÃ£o visual relevante no mobile.
19. NÃ£o haver alteraÃ§Ã£o indevida no desktop.
20. Haver caminho claro de rollback.

## 18. Ordem oficial das prÃ³ximas partes deste manual

A continuaÃ§Ã£o deste manual deve seguir esta ordem:

Parte 2: HistÃ³rico completo de versionamento, downgrade, cache e Service Worker.

Parte 3: Fluxo oficial de deploy, rollback, backups e conferÃªncia de produÃ§Ã£o.

Parte 4: Protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex.

Parte 5: HistÃ³rico de refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes.

Parte 6: Riscos conhecidos, pontos intocÃ¡veis, sintomas de erro e critÃ©rios de decisÃ£o.

Parte 7: EstratÃ©gia tÃ©cnica oficial para PWA instalÃ¡vel, mantendo desktop exatamente como estÃ¡.

Parte 8: Checklist final de validaÃ§Ã£o, aceite operacional e modelo de retomada para novas conversas.
# MANUAL-OFICIAL-MINI-ERP-PWA.md

## Parte 2: HistÃ³rico completo de versionamento, downgrade, Service Worker e cache

## 19. ImportÃ¢ncia desta parte do manual

O histÃ³rico de versionamento, downgrade, Service Worker e cache Ã© uma das partes mais importantes do Mini ERP.

O projeto jÃ¡ sofreu um incidente grave em que versÃµes antigas voltavam a aparecer em produÃ§Ã£o, mesmo depois de uma versÃ£o nova ter sido publicada e validada.

Esse incidente afetou diretamente a confianÃ§a no sistema, principalmente porque o Mini ERP Ã© usado diariamente em campo.

A principal liÃ§Ã£o operacional Ã© simples: Service Worker, cache, versionamento, atualizaÃ§Ã£o automÃ¡tica e deploy nÃ£o podem ser tratados como detalhes tÃ©cnicos secundÃ¡rios.

Essas Ã¡reas sÃ£o parte da seguranÃ§a do sistema.

Por isso, qualquer alteraÃ§Ã£o futura nessas Ã¡reas deve ser feita somente com autorizaÃ§Ã£o explÃ­cita, auditoria completa, teste local, teste em produÃ§Ã£o, teste em campo e backup posterior.

## 20. VersÃ£o estÃ¡vel oficial atual

A versÃ£o estÃ¡vel oficial consolidada Ã©:

2026.06.24.03

Essa versÃ£o deve ser considerada a referÃªncia principal do projeto nesta fase.

Ela foi:

1. Utilizada em produÃ§Ã£o.
2. Validada em desktop.
3. Validada em iPhone.
4. Validada em campo.
5. Considerada sem regressÃµes conhecidas no LEIA-PRIMEIRO-MINI-ERP.md.
6. Confirmada como projeto estÃ¡vel.
7. Confirmada como base para iniciar a prÃ³xima frente PWA.

Essa versÃ£o nÃ£o deve ser alterada sem autorizaÃ§Ã£o.

Qualquer nova frente deve partir dela, ou de um ZIP mais recente que seja auditado e confirmado como descendente correto dessa versÃ£o.

## 21. HistÃ³rico de versÃµes relevantes

O Mini ERP passou por vÃ¡rias versÃµes durante a fase de estabilizaÃ§Ã£o.

As versÃµes mais citadas no histÃ³rico recente incluem:

1. 2026.06.15.05
2. 2026.06.16.05
3. 2026.06.18.01
4. 2026.06.20.02
5. 2026.06.20.03
6. 2026.06.24.03

A versÃ£o 2026.06.20.03 foi importante porque representou uma fase de correÃ§Ã£o de Service Worker e tentativa de estabilizaÃ§Ã£o contra retorno de versÃµes antigas.

A versÃ£o 2026.06.24.03 Ã© a versÃ£o estÃ¡vel posterior, validada em produÃ§Ã£o e usada em campo.

A ordem histÃ³rica mostra que o projeto avanÃ§ou por refinamentos controlados, mas tambÃ©m enfrentou riscos sÃ©rios quando versionamento, cache e Service Worker nÃ£o estavam perfeitamente alinhados.

## 22. O que foi o incidente de downgrade

O incidente de downgrade foi o comportamento em que o Mini ERP, mesmo apÃ³s uma publicaÃ§Ã£o nova, voltava a abrir uma versÃ£o antiga em determinados contextos.

Esse problema nÃ£o era apenas visual.

Em alguns momentos, a versÃ£o antiga realmente aparecia com funcionalidades ausentes.

Exemplo de sintoma grave relatado:

1. O sistema abria sem PrÃ©-venda.
2. O sistema abria sem DiagnÃ³stico do Sistema.
3. A tela apresentava aparÃªncia ou estrutura de versÃ£o antiga.
4. A versÃ£o correta funcionava em um local ou rede, mas a versÃ£o antiga aparecia em outro local ou rede.
5. O comportamento acontecia em navegaÃ§Ã£o normal e tambÃ©m em navegaÃ§Ã£o anÃ´nima.
6. O problema era mais percebido em campo, em 4G ou fora da regiÃ£o onde o sistema havia sido validado.

Esse tipo de problema nÃ£o pode ser tratado como simples cache do navegador sem investigaÃ§Ã£o.

Ele precisa ser tratado como incidente de versÃ£o.

## 23. Sintomas observados durante o downgrade

Os sintomas acumulados foram:

1. A versÃ£o nova era publicada e funcionava inicialmente.
2. Depois de algum tempo, especialmente em campo, o sistema abria versÃ£o antiga.
3. Em casa ou em determinada regiÃ£o, o 4G abria corretamente.
4. Ao sair da regiÃ£o, o 4G podia abrir uma versÃ£o antiga.
5. Desktop e mobile podiam apresentar comportamentos diferentes.
6. iPhone e Safari Mobile exigiam atenÃ§Ã£o especial.
7. NavegaÃ§Ã£o normal e anÃ´nima chegaram a abrir versÃ£o antiga.
8. O sistema mostrava tela sem mÃ³dulos novos.
9. PrÃ©-vendas desapareciam em versÃµes antigas.
10. DiagnÃ³stico do Sistema nÃ£o aparecia em versÃµes antigas.
11. Em alguns testes, o endpoint de version.json mostrava versÃ£o correta enquanto a interface carregava conteÃºdo antigo.
12. A atualizaÃ§Ã£o visual nem sempre significava atualizaÃ§Ã£o real do aplicativo carregado.
13. A presenÃ§a de Service Worker controlando a pÃ¡gina podia manter arquivos antigos.
14. A existÃªncia de mais de um Service Worker ou arquivo relacionado podia aumentar confusÃ£o.
15. Arquivos em cache podiam sobreviver a deploys novos.
16. O usuÃ¡rio perdia confianÃ§a porque nÃ£o sabia se estava usando a versÃ£o correta.

## 24. Por que o downgrade foi grave

O downgrade foi grave porque o Mini ERP nÃ£o Ã© um projeto experimental.

Ele Ã© usado em produÃ§Ã£o.

Ele apoia:

1. Clientes.
2. PrÃ©-vendas.
3. Vendas.
4. Delivery.
5. CobranÃ§as.
6. Financeiro.
7. RelatÃ³rios.
8. Pagamentos.
9. OperaÃ§Ã£o em campo.

Quando uma versÃ£o antiga aparece, o risco nÃ£o Ã© apenas estÃ©tico.

Os riscos reais sÃ£o:

1. Registrar dados em fluxo antigo.
2. Perder acesso a funcionalidades novas.
3. Confundir o usuÃ¡rio durante entrega.
4. Gerar retrabalho.
5. Perder prÃ©-vendas.
6. Dificultar cobranÃ§as.
7. Fazer diagnÃ³stico errado.
8. Publicar nova correÃ§Ã£o em cima de premissa falsa.
9. Mexer em mÃ³dulo estÃ¡vel tentando resolver sintoma de cache.
10. Criar regressÃ£o em Ã¡reas que estavam funcionando.

Por isso, a regra permanente Ã©: problema de versÃ£o deve ser investigado como problema estrutural, nÃ£o como ajuste comum.

## 25. Causas provÃ¡veis identificadas no histÃ³rico

O histÃ³rico apontou um conjunto de causas provÃ¡veis, nÃ£o uma Ãºnica causa isolada.

As principais causas foram:

1. Desencontro de versÃµes entre arquivos.
2. Service Worker antigo mantendo cache.
3. PossÃ­vel coexistÃªncia ou confusÃ£o entre public/sw.js e public/service-worker.js.
4. Cache de navegador ou cache controlado pelo Service Worker.
5. HTML antigo sendo servido ou reaproveitado.
6. Assets antigos sendo carregados.
7. Deploy sem limpeza suficiente.
8. PossÃ­vel diferenÃ§a entre arquivo publicado e arquivo carregado pelo dispositivo.
9. DependÃªncia excessiva de cache para arquivos que deveriam ser sempre revalidados.
10. Falta de prova imediata da versÃ£o real carregada no navegador.

Esse conjunto explica por que o problema parecia intermitente.

Em alguns ambientes, a versÃ£o correta aparecia.

Em outros, a versÃ£o antiga persistia.

## 26. Desencontro de versÃµes

Uma liÃ§Ã£o importante foi que a versÃ£o do Mini ERP precisa estar alinhada em todos os pontos crÃ­ticos.

Arquivos que podem conter ou influenciar a versÃ£o:

1. src/App.jsx
2. src/main.jsx
3. public/version.json
4. dist/version.json
5. public/sw.js
6. public/service-worker.js
7. vercel.json, quando houver cabeÃ§alhos ou regras relacionadas
8. arquivos gerados no build

O problema nÃ£o deve ser investigado olhando apenas um arquivo.

Se App.jsx indica uma versÃ£o, mas version.json indica outra, hÃ¡ risco.

Se public/version.json foi atualizado, mas o build antigo ficou em cache, hÃ¡ risco.

Se o Service Worker guarda assets de uma versÃ£o anterior, hÃ¡ risco.

Se o navegador carrega HTML antigo, hÃ¡ risco.

Por isso, a conferÃªncia precisa cruzar os arquivos e a produÃ§Ã£o.

## 27. Papel do version.json

O arquivo version.json virou peÃ§a central para conferÃªncia de produÃ§Ã£o.

Ele deve servir para responder uma pergunta objetiva:

Qual versÃ£o estÃ¡ publicada no domÃ­nio oficial agora?

O endpoint oficial esperado Ã©:

https://mini-erp-canastra.vercel.app/version.json

Esse arquivo ajuda a separar trÃªs situaÃ§Ãµes diferentes:

1. A produÃ§Ã£o realmente estÃ¡ antiga.
2. A produÃ§Ã£o estÃ¡ correta, mas o navegador estÃ¡ carregando cache antigo.
3. A produÃ§Ã£o estÃ¡ correta, mas o Service Worker estÃ¡ servindo assets antigos.

O version.json nÃ£o resolve tudo sozinho.

Ele Ã© uma referÃªncia de comparaÃ§Ã£o.

O diagnÃ³stico do sistema deve comparar a versÃ£o do aplicativo carregado com a versÃ£o publicada.

## 28. Papel do DiagnÃ³stico do Sistema no incidente

O DiagnÃ³stico do Sistema foi criado ou reforÃ§ado como ferramenta de seguranÃ§a.

Ele permite verificar se o aplicativo carregado estÃ¡ coerente com a versÃ£o publicada.

Campos importantes do diagnÃ³stico:

1. Data.
2. VersÃ£o do aplicativo.
3. VersÃ£o publicada.
4. Maior versÃ£o aceita.
5. Status da versÃ£o.
6. Service Worker disponÃ­vel.
7. Service Worker controlando a pÃ¡gina.
8. Online.
9. Ambiente.
10. URL.
11. Navegador.
12. Sistema.
13. Supabase.
14. Ãšltima atualizaÃ§Ã£o de dados.
15. Erro de sincronizaÃ§Ã£o.
16. Clientes carregados.
17. PrÃ©-vendas carregadas.
18. CobranÃ§as carregadas.
19. Delivery carregados.

Durante o incidente, o diagnÃ³stico ajudou a provar se a tela aberta era a versÃ£o esperada ou uma versÃ£o antiga.

A versÃ£o 2026.06.24.03 apresentou diagnÃ³stico coerente:

VersÃ£o do aplicativo: 2026.06.24.03
VersÃ£o publicada: 2026.06.24.03
Maior versÃ£o aceita: 2026.06.24.03
Status da versÃ£o: OK
Service Worker disponÃ­vel: sim
Service Worker controlando a pÃ¡gina: sim
Online: sim
Ambiente: produÃ§Ã£o

Esse tipo de leitura deve continuar existindo no futuro PWA.

## 29. Service Worker no Mini ERP

O Service Worker Ã© uma peÃ§a poderosa.

Ele pode melhorar carregamento, permitir comportamento offline e contribuir para experiÃªncia de aplicativo.

Mas ele tambÃ©m pode causar problema grave se for mal controlado.

No histÃ³rico do Mini ERP, o Service Worker esteve diretamente ligado ao incidente de downgrade.

Por isso, a regra permanente Ã©:

NÃ£o modificar Service Worker durante refinamentos comuns.

Service Worker sÃ³ deve ser alterado em uma frente prÃ³pria, com auditoria completa e autorizaÃ§Ã£o explÃ­cita.

## 30. Arquivos de Service Worker citados

O histÃ³rico cita dois arquivos crÃ­ticos:

1. public/sw.js
2. public/service-worker.js

A existÃªncia de dois arquivos relacionados a Service Worker exige cuidado.

Antes de qualquer alteraÃ§Ã£o PWA, Ã© obrigatÃ³rio auditar:

1. Qual arquivo estÃ¡ registrado no navegador.
2. Qual arquivo Ã© realmente servido em produÃ§Ã£o.
3. Qual arquivo contÃ©m lÃ³gica ativa.
4. Se ambos existem por necessidade ou histÃ³rico.
5. Se hÃ¡ registro duplicado.
6. Se hÃ¡ cache antigo sendo mantido.
7. Se hÃ¡ limpeza de cache.
8. Se hÃ¡ estratÃ©gia de atualizaÃ§Ã£o.
9. Se hÃ¡ controle de versÃ£o de cache.
10. Se o HTML estÃ¡ sendo cacheado indevidamente.

NÃ£o se deve apagar, renomear ou trocar esses arquivos sem prova.

## 31. O risco de Service Worker antigo

Um Service Worker antigo pode continuar controlando a aplicaÃ§Ã£o mesmo depois de um novo deploy.

Isso pode causar:

1. Carregamento de JS antigo.
2. Carregamento de CSS antigo.
3. Carregamento de HTML antigo.
4. ExibiÃ§Ã£o de mÃ³dulos antigos.
5. Falha em mostrar mÃ³dulos novos.
6. InterferÃªncia na atualizaÃ§Ã£o.
7. PersistÃªncia de cache em iPhone.
8. DiferenÃ§a de comportamento entre navegador e app instalado.
9. DiferenÃ§a entre desktop e mobile.
10. SensaÃ§Ã£o de que a Vercel publicou errado, mesmo quando o problema estÃ¡ no cliente.

Por isso, no PWA, o Service Worker precisa ser planejado com mais rigor do que em um site comum.

## 32. HistÃ³rico de limpeza de Service Worker

Durante a fase de correÃ§Ã£o, foi adotada uma estratÃ©gia de limpeza de Service Worker e caches.

O objetivo era remover Service Workers antigos e limpar caches que poderiam estar segurando versÃµes passadas.

Essa fase foi importante para estabilizar o projeto.

A versÃ£o 2026.06.20.03 aparece no histÃ³rico como uma versÃ£o associada Ã  correÃ§Ã£o de Service Worker e limpeza de cache.

A liÃ§Ã£o nÃ£o Ã© que todo problema se resolve apagando cache.

A liÃ§Ã£o correta Ã© que o Service Worker precisa ter polÃ­tica clara.

Sem polÃ­tica clara, ele vira risco.

## 33. Cache no Mini ERP

O cache Ã© necessÃ¡rio para desempenho, mas perigoso quando mal aplicado.

No Mini ERP, o cache deve respeitar uma regra central:

Arquivos que determinam a versÃ£o e o HTML principal nÃ£o podem prender versÃ£o antiga.

O cache pode ser Ãºtil para:

1. Ãcones.
2. Imagens estÃ¡ticas.
3. Arquivos auxiliares.
4. Recursos que nÃ£o mudam com frequÃªncia.

O cache pode ser perigoso para:

1. index.html.
2. Arquivos JS principais.
3. Arquivos CSS principais.
4. version.json.
5. Dados de diagnÃ³stico.
6. LÃ³gica de atualizaÃ§Ã£o.
7. Service Worker.
8. Manifest PWA, quando estiver em fase de alteraÃ§Ã£o.

Durante a frente PWA, essa distinÃ§Ã£o precisa ser formalizada.

## 34. Cache e Vercel

A Vercel pode servir arquivos com regras prÃ³prias de cache.

O projeto tambÃ©m pode ter cabeÃ§alhos definidos em vercel.json.

Por isso, a auditoria deve verificar:

1. Se existe vercel.json.
2. Quais headers estÃ£o definidos.
3. Se version.json tem cache desativado ou revalidaÃ§Ã£o adequada.
4. Se index.html pode ficar preso em cache.
5. Se assets versionados estÃ£o sendo gerados corretamente.
6. Se o deploy forÃ§ado foi necessÃ¡rio.
7. Se o domÃ­nio oficial aponta para o deploy correto.

Nunca assumir que um deploy novo resolveu tudo sem verificar o domÃ­nio final e o version.json online.

## 35. DiferenÃ§a entre build, deploy e versÃ£o carregada

O Mini ERP ensinou uma diferenÃ§a operacional importante.

Build aprovado nÃ£o significa produÃ§Ã£o correta.

Deploy concluÃ­do nÃ£o significa navegador atualizado.

version.json correto nÃ£o significa interface carregada correta.

O fluxo completo precisa confirmar quatro camadas:

1. CÃ³digo local correto.
2. Build local correto.
3. ProduÃ§Ã£o publicada correta.
4. Dispositivo carregando versÃ£o correta.

O downgrade aconteceu justamente porque essas camadas podiam divergir.

## 36. DiferenÃ§a entre versÃ£o publicada e versÃ£o em uso

A versÃ£o publicada Ã© o que estÃ¡ no servidor.

A versÃ£o em uso Ã© o que o navegador ou app instalado carregou.

Elas precisam ser iguais.

Quando nÃ£o sÃ£o iguais, o diagnÃ³stico deve mostrar problema.

Exemplo ideal:

VersÃ£o do aplicativo: 2026.06.24.03
VersÃ£o publicada: 2026.06.24.03
Status da versÃ£o: OK

Exemplo de risco:

VersÃ£o do aplicativo: 2026.06.20.03
VersÃ£o publicada: 2026.06.24.03
Status da versÃ£o: desatualizada ou incompatÃ­vel

Esse tipo de diferenÃ§a deve bloquear qualquer conclusÃ£o apressada.

## 37. Maior versÃ£o aceita

O conceito de maior versÃ£o aceita foi importante para impedir retorno silencioso a versÃµes antigas.

A maior versÃ£o aceita funciona como referÃªncia de seguranÃ§a.

Ela ajuda a indicar quando o aplicativo carregado nÃ£o deveria mais ser aceito.

Na prÃ¡tica, isso serve para combater downgrade.

Se o aplicativo carregar versÃ£o abaixo da maior versÃ£o aceita, o sistema deve alertar ou forÃ§ar atualizaÃ§Ã£o, conforme a polÃ­tica implementada.

Essa lÃ³gica precisa ser preservada na transformaÃ§Ã£o PWA.

## 38. AtualizaÃ§Ã£o automÃ¡tica

A atualizaÃ§Ã£o automÃ¡tica Ã© funcionalidade estÃ¡vel citada no LEIA.

Ela deve ser preservada.

Mas atualizaÃ§Ã£o automÃ¡tica precisa ser tratada com cautela, pois estÃ¡ ligada a:

1. Versionamento.
2. version.json.
3. Cache.
4. Service Worker.
5. Navegador.
6. PWA instalado.
7. AtualizaÃ§Ã£o de assets.
8. DiagnÃ³stico do sistema.

Qualquer mudanÃ§a em atualizaÃ§Ã£o automÃ¡tica deve ser considerada mudanÃ§a sensÃ­vel.

NÃ£o entra em refinamento comum.

## 39. Incidente em campo

Um ponto marcante do histÃ³rico foi a diferenÃ§a entre ambientes.

O sistema podia funcionar corretamente em casa, em Wi-Fi ou em 4G de determinada regiÃ£o.

Ao sair da Ã¡rea, o sistema podia abrir versÃ£o antiga.

Isso gerou a hipÃ³tese de que o problema nÃ£o era apenas no aparelho, mas podia envolver combinaÃ§Ã£o de:

1. Cache local.
2. Service Worker.
3. Rede.
4. CDN.
5. Navegador.
6. Momento do deploy.
7. Arquivos antigos.
8. Estado anterior do aplicativo no dispositivo.

Mesmo que a causa final nÃ£o tenha sido isolada em um Ãºnico fator, a resposta correta do projeto foi fortalecer versionamento, diagnÃ³stico e polÃ­tica de cache.

## 40. NavegaÃ§Ã£o normal e navegaÃ§Ã£o anÃ´nima

Durante o incidente, houve relato de que tanto a navegaÃ§Ã£o normal quanto a navegaÃ§Ã£o anÃ´nima abriram versÃ£o antiga.

Esse dado foi importante porque enfraqueceu a explicaÃ§Ã£o simples de cache comum do navegador.

A investigaÃ§Ã£o precisou considerar:

1. ProduÃ§Ã£o.
2. CDN.
3. Service Worker.
4. Arquivos publicados.
5. Cache em camadas.
6. DomÃ­nio oficial.
7. Deploy correto.
8. PossÃ­vel projeto errado.
9. PossÃ­vel pasta errada.
10. PossÃ­vel versÃ£o antiga servida por algum caminho.

Por isso, o protocolo oficial nÃ£o pode depender de â€œlimpar cache e tentar novamenteâ€ como Ãºnica soluÃ§Ã£o.

## 41. AusÃªncia de PrÃ©-venda e DiagnÃ³stico como prova de versÃ£o antiga

Durante o downgrade, dois sinais fortes indicavam carregamento de versÃ£o antiga:

1. AusÃªncia do mÃ³dulo de PrÃ©-venda.
2. AusÃªncia do DiagnÃ³stico do Sistema.

Esses sinais sÃ£o importantes porque mostram que nÃ£o era apenas uma diferenÃ§a pequena de layout.

Era uma base anterior do sistema.

No futuro, quando houver suspeita de downgrade, os primeiros pontos a conferir sÃ£o:

1. Existe PrÃ©-venda?
2. Existe DiagnÃ³stico do Sistema?
3. O diagnÃ³stico mostra versÃ£o correta?
4. A versÃ£o publicada bate com a versÃ£o do aplicativo?
5. O Service Worker estÃ¡ controlando?
6. O version.json online estÃ¡ correto?
7. O domÃ­nio Ã© o oficial?
8. A URL contÃ©m parÃ¢metro de versÃ£o?
9. O problema ocorre no desktop, no mobile ou no app instalado?
10. O problema ocorre em Wi-Fi, 4G ou ambos?

## 42. RelaÃ§Ã£o entre downgrade e PWA

A frente PWA nÃ£o pode ignorar o histÃ³rico de downgrade.

PWA depende fortemente de Service Worker, cache, manifest, instalaÃ§Ã£o e atualizaÃ§Ã£o.

Esses sÃ£o exatamente os pontos que jÃ¡ causaram risco.

Por isso, transformar o Mini ERP em PWA exige mais cautela do que criar um atalho visual.

A estratÃ©gia PWA deve garantir:

1. O app instalado nÃ£o carrega versÃ£o antiga.
2. O app instalado consegue atualizar corretamente.
3. O version.json continua conferÃ­vel.
4. O diagnÃ³stico funciona dentro do app instalado.
5. O Service Worker nÃ£o prende versÃ£o antiga.
6. O cache nÃ£o mantÃ©m HTML antigo.
7. O desktop segue intacto.
8. O mobile navegador segue funcionando.
9. O app instalado nÃ£o cria comportamento paralelo difÃ­cil de auditar.
10. O rollback continua possÃ­vel.

## 43. Regras permanentes para Service Worker

As regras oficiais sÃ£o:

1. NÃ£o alterar Service Worker sem autorizaÃ§Ã£o explÃ­cita.
2. NÃ£o alterar Service Worker durante refinamento visual comum.
3. NÃ£o alterar Service Worker junto com mÃºltiplos mÃ³dulos funcionais.
4. NÃ£o trocar estratÃ©gia de cache sem auditoria.
5. NÃ£o apagar arquivo de Service Worker sem provar registro real.
6. NÃ£o manter dois Service Workers ativos sem saber qual controla a pÃ¡gina.
7. NÃ£o cachear HTML principal de forma agressiva.
8. NÃ£o cachear version.json de forma que atrase atualizaÃ§Ã£o.
9. NÃ£o criar PWA sem revisar a estratÃ©gia de atualizaÃ§Ã£o.
10. NÃ£o publicar mudanÃ§a de Service Worker sem teste em produÃ§Ã£o e mobile.

## 44. Regras permanentes para cache

As regras oficiais sÃ£o:

1. Cache nÃ£o pode impedir atualizaÃ§Ã£o.
2. Cache nÃ£o pode esconder versÃ£o nova.
3. Cache nÃ£o pode fazer o usuÃ¡rio trabalhar em versÃ£o antiga.
4. Cache deve ser documentado.
5. Cache deve ser testado em desktop.
6. Cache deve ser testado em mobile.
7. Cache deve ser testado em iPhone.
8. Cache deve ser testado no app instalado quando houver PWA.
9. Cache deve ter estratÃ©gia de limpeza ou renovaÃ§Ã£o.
10. Cache nÃ£o deve ser alterado junto com refinamentos comuns.

## 45. Regras permanentes para versionamento

As regras oficiais sÃ£o:

1. Toda versÃ£o publicada precisa estar claramente identificada.
2. public/version.json precisa refletir a versÃ£o correta.
3. A versÃ£o interna do aplicativo precisa bater com a versÃ£o publicada.
4. A maior versÃ£o aceita precisa ser coerente.
5. O diagnÃ³stico precisa exibir a comparaÃ§Ã£o.
6. O histÃ³rico de versÃ£o deve ser preservado.
7. NÃ£o alterar versÃ£o sem autorizaÃ§Ã£o.
8. NÃ£o publicar versÃ£o sem build aprovado.
9. NÃ£o publicar versÃ£o sem teste.
10. NÃ£o criar nova versÃ£o para alteraÃ§Ã£o incompleta.

## 46. Regras permanentes para atualizaÃ§Ã£o automÃ¡tica

As regras oficiais sÃ£o:

1. A atualizaÃ§Ã£o automÃ¡tica deve preservar dados.
2. A atualizaÃ§Ã£o automÃ¡tica nÃ£o pode prender o usuÃ¡rio em loop.
3. A atualizaÃ§Ã£o automÃ¡tica deve respeitar version.json.
4. A atualizaÃ§Ã£o automÃ¡tica deve ser testada apÃ³s deploy.
5. A atualizaÃ§Ã£o automÃ¡tica deve funcionar em mobile.
6. A atualizaÃ§Ã£o automÃ¡tica deve funcionar em desktop.
7. A atualizaÃ§Ã£o automÃ¡tica deve ser compatÃ­vel com PWA instalado.
8. A atualizaÃ§Ã£o automÃ¡tica nÃ£o deve ser alterada durante refinamentos comuns.
9. A atualizaÃ§Ã£o automÃ¡tica deve ser documentada quando alterada.
10. A atualizaÃ§Ã£o automÃ¡tica deve ter caminho de rollback.

## 47. DiagnÃ³stico obrigatÃ³rio em suspeita de downgrade

Quando houver suspeita de downgrade, nÃ£o iniciar correÃ§Ã£o imediatamente.

Primeiro coletar diagnÃ³stico.

O diagnÃ³stico deve responder:

1. Qual URL estÃ¡ aberta?
2. Qual navegador estÃ¡ sendo usado?
3. Qual sistema estÃ¡ sendo usado?
4. EstÃ¡ no desktop, mobile navegador ou app instalado?
5. EstÃ¡ em Wi-Fi ou 4G?
6. Qual versÃ£o do aplicativo aparece?
7. Qual versÃ£o publicada aparece?
8. Qual Ã© a maior versÃ£o aceita?
9. O status da versÃ£o estÃ¡ OK?
10. Service Worker estÃ¡ disponÃ­vel?
11. Service Worker estÃ¡ controlando?
12. Supabase estÃ¡ conectado?
13. Clientes foram carregados?
14. PrÃ©-vendas foram carregadas?
15. CobranÃ§as foram carregadas?
16. Delivery foi carregado?
17. Existe erro de sincronizaÃ§Ã£o?
18. A tela mostra mÃ³dulos atuais?
19. O version.json online responde a versÃ£o correta?
20. O deploy na Vercel aponta para o domÃ­nio oficial?

Sem essas respostas, qualquer correÃ§Ã£o serÃ¡ tentativa no escuro.

## 48. Como classificar um problema de versÃ£o

Um problema de versÃ£o deve ser classificado em uma das categorias abaixo.

### 48.1 ProduÃ§Ã£o realmente antiga

A produÃ§Ã£o realmente estÃ¡ antiga quando:

1. version.json online mostra versÃ£o antiga.
2. Vercel aponta para deploy antigo.
3. O domÃ­nio oficial nÃ£o estÃ¡ no deploy esperado.
4. O build publicado nÃ£o contÃ©m a versÃ£o nova.

Nesse caso, o problema estÃ¡ no deploy ou no projeto Vercel.

### 48.2 ProduÃ§Ã£o correta, navegador antigo

A produÃ§Ã£o estÃ¡ correta, mas o navegador estÃ¡ antigo quando:

1. version.json online mostra versÃ£o nova.
2. DiagnÃ³stico do app mostra versÃ£o antiga.
3. O navegador carrega assets antigos.
4. Limpeza ou atualizaÃ§Ã£o muda o comportamento.
5. Outro dispositivo abre corretamente.

Nesse caso, investigar cache local e Service Worker.

### 48.3 ProduÃ§Ã£o correta, Service Worker antigo

A produÃ§Ã£o estÃ¡ correta, mas o Service Worker antigo estÃ¡ controlando quando:

1. version.json online mostra versÃ£o nova.
2. Service Worker aparece controlando a pÃ¡gina.
3. Interface antiga aparece.
4. Arquivos antigos continuam sendo servidos.
5. Atualizar a pÃ¡gina nÃ£o resolve.
6. Fechar e abrir nÃ£o resolve.

Nesse caso, investigar registro, escopo e caches do Service Worker.

### 48.4 ProduÃ§Ã£o correta, CDN ou cache intermediÃ¡rio suspeito

Essa hipÃ³tese aparece quando:

1. Ambientes diferentes recebem versÃµes diferentes.
2. NavegaÃ§Ã£o anÃ´nima tambÃ©m apresenta versÃ£o antiga.
3. Em uma regiÃ£o funciona e em outra nÃ£o.
4. version.json pode responder correto, mas interface nÃ£o.
5. O problema parece depender de rede ou local.

Nesse caso, investigar headers, Vercel, CDN, cache e deploy forÃ§ado.

## 49. O que nÃ£o fazer diante de downgrade

Diante de suspeita de downgrade, nunca:

1. Refatorar mÃ³dulos.
2. Mexer em PrÃ©-vendas sem prova.
3. Mexer em CobranÃ§as sem prova.
4. Mexer em Delivery sem prova.
5. Criar nova funcionalidade.
6. Alterar layout.
7. Publicar deploy Ã s cegas.
8. Apagar Service Worker sem auditoria.
9. Trocar versionamento sem conferir arquivos.
10. Concluir que o problema Ã© apenas cache comum.
11. Trocar projeto Vercel.
12. Usar pasta errada.
13. Misturar Mini ERP com CatÃ¡logo.
14. Fazer mÃºltiplas mudanÃ§as juntas.
15. Criar PWA antes de estabilizar atualizaÃ§Ã£o.

## 50. O que fazer diante de downgrade

Diante de suspeita de downgrade, fazer:

1. Registrar data e hora.
2. Registrar local e rede usada.
3. Abrir DiagnÃ³stico do Sistema.
4. Conferir versÃ£o do aplicativo.
5. Conferir versÃ£o publicada.
6. Conferir maior versÃ£o aceita.
7. Conferir status da versÃ£o.
8. Conferir Service Worker.
9. Conferir Supabase.
10. Conferir mÃ³dulos carregados.
11. Abrir version.json online.
12. Confirmar domÃ­nio oficial.
13. Confirmar projeto Vercel.
14. Confirmar pasta local.
15. Confirmar versÃ£o nos arquivos locais.
16. Rodar build somente se houver necessidade.
17. Fazer deploy somente com autorizaÃ§Ã£o.
18. Validar em desktop.
19. Validar em iPhone.
20. Validar em campo.
21. Criar backup apÃ³s validaÃ§Ã£o.

## 51. RelaÃ§Ã£o entre Supabase e downgrade

O Supabase nÃ£o foi identificado como causa principal do downgrade.

Mas ele entra no diagnÃ³stico porque ajuda a diferenciar problema de versÃ£o de problema de dados.

Se o sistema abre corretamente, mas nÃ£o carrega dados, pode ser problema de Supabase, rede, permissÃµes, consulta ou sincronizaÃ§Ã£o.

Se o sistema abre versÃ£o antiga, sem mÃ³dulos novos, o problema Ã© anterior ao Supabase.

Por isso, no diagnÃ³stico, Supabase deve ser lido junto com versÃ£o e mÃ³dulos carregados.

## 52. RelaÃ§Ã£o entre prÃ©-vendas e estabilidade

As PrÃ©-vendas foram uma das funcionalidades mais importantes da fase recente.

Elas passaram por refinamentos implementados:

1. ConfirmaÃ§Ã£o antes de excluir.
2. PaginaÃ§Ã£o.
3. Filtro por data.
4. Resumo por data.
5. ConferÃªncia consolidada dos produtos.
6. ReferÃªncia do cliente.
7. HorÃ¡rio da prÃ©-venda.
8. Quantidade dos itens.
9. Forma de pagamento.
10. Total por cliente.
11. Modal corrigido.
12. RemoÃ§Ã£o do botÃ£o â€œCopiar resumoâ€ por decisÃ£o de projeto.

Como esse mÃ³dulo foi consolidado na versÃ£o estÃ¡vel, ele tambÃ©m funciona como sinal de versÃ£o correta.

Se PrÃ©-vendas desaparece, ou volta a comportamento antigo, hÃ¡ suspeita de downgrade.

## 53. RelaÃ§Ã£o entre atualizaÃ§Ã£o automÃ¡tica e confianÃ§a operacional

A atualizaÃ§Ã£o automÃ¡tica foi estabilizada como funcionalidade importante.

O usuÃ¡rio em campo nÃ£o pode ficar tentando descobrir manualmente se estÃ¡ na versÃ£o certa.

O sistema precisa ajudar nessa conferÃªncia.

Por isso, o Mini ERP deve preservar:

1. IdentificaÃ§Ã£o clara da versÃ£o.
2. DiagnÃ³stico acessÃ­vel.
3. ComparaÃ§Ã£o com versÃ£o publicada.
4. Status da versÃ£o.
5. Aviso quando a versÃ£o nÃ£o estiver correta.
6. AtualizaÃ§Ã£o confiÃ¡vel.
7. ProteÃ§Ã£o contra versÃ£o antiga.

No PWA, essa necessidade aumenta.

Um aplicativo instalado pode dar sensaÃ§Ã£o de estabilidade, mas tambÃ©m pode prender uma versÃ£o antiga se o Service Worker estiver errado.

## 54. A versÃ£o 2026.06.24.03 como marco de estabilidade

A versÃ£o 2026.06.24.03 deve ser tratada como marco de estabilidade porque foi validada em produÃ§Ã£o e em campo.

Ela representa o ponto a partir do qual a frente PWA pode comeÃ§ar a ser planejada.

Essa versÃ£o contÃ©m:

1. Clientes estÃ¡veis.
2. PrÃ©-vendas estÃ¡veis.
3. Vendas estÃ¡veis.
4. Delivery estÃ¡vel.
5. CobranÃ§as estÃ¡veis.
6. Financeiro estÃ¡vel.
7. RelatÃ³rios estÃ¡veis.
8. SincronizaÃ§Ã£o Supabase estÃ¡vel.
9. AtualizaÃ§Ã£o automÃ¡tica estÃ¡vel.
10. Deploy Vercel estÃ¡vel.
11. Refinamentos recentes de prÃ©-vendas.
12. AusÃªncia de regressÃµes conhecidas no documento LEIA.

A frente PWA nÃ£o deve comeÃ§ar por â€œmelhorar tudoâ€.

Ela deve comeÃ§ar por preservar esta estabilidade.

## 55. ConclusÃ£o operacional da Parte 2

A histÃ³ria do downgrade define a postura tÃ©cnica do projeto.

O Mini ERP nÃ£o deve evoluir por entusiasmo tÃ©cnico.

Ele deve evoluir por necessidade operacional, com prova, teste e backup.

Service Worker, cache, versionamento e atualizaÃ§Ã£o automÃ¡tica sÃ£o Ã¡reas sensÃ­veis.

Na frente PWA, essas Ã¡reas serÃ£o inevitavelmente tocadas ou revisadas.

Por isso, a prÃ³xima etapa do manual precisa formalizar os fluxos de deploy, rollback, backup e conferÃªncia de produÃ§Ã£o.

Sem esse fluxo, nÃ£o se deve iniciar implementaÃ§Ã£o PWA.
# MANUAL OFICIAL MINI ERP PWA

## Parte 3: Fluxo oficial de deploy, rollback, backups e conferÃªncia de produÃ§Ã£o

## 56. ImportÃ¢ncia desta parte do manual

Esta parte define o procedimento oficial para publicar, reverter, conferir produÃ§Ã£o e preservar backups do Mini ERP.

O Mini ERP estÃ¡ em produÃ§Ã£o e Ã© utilizado diariamente em campo.

Por isso, deploy, rollback e backup nÃ£o podem ser tratados como tarefas automÃ¡ticas ou secundÃ¡rias.

O histÃ³rico do projeto mostrou que uma publicaÃ§Ã£o aparentemente correta pode nÃ£o significar que o sistema realmente estÃ¡ correto no navegador, no celular, no iPhone ou no ambiente de campo.

A regra central desta parte Ã©:

Nenhum deploy deve ser feito sem build aprovado, teste mÃ­nimo, conferÃªncia de versÃ£o e autorizaÃ§Ã£o explÃ­cita.

## 57. Objetivo do fluxo oficial

O fluxo oficial existe para garantir que:

1. O projeto correto seja publicado.
2. A pasta correta seja usada.
3. A versÃ£o correta seja conferida antes e depois do deploy.
4. O domÃ­nio oficial receba o deploy certo.
5. O Service Worker nÃ£o esconda versÃ£o antiga.
6. O cache nÃ£o provoque downgrade.
7. Os mÃ³dulos estÃ¡veis continuem funcionando.
8. O desktop permaneÃ§a preservado.
9. O mobile continue funcional.
10. O sistema possa ser revertido se houver problema.
11. Um backup seja criado apÃ³s validaÃ§Ã£o real.
12. A operaÃ§Ã£o diÃ¡ria nÃ£o seja prejudicada.

## 58. Regra absoluta antes de qualquer deploy

Antes de qualquer deploy, confirmar que o terminal estÃ¡ na pasta oficial:

```powershell
cd C:\Users\Delber\Mini-ERP\projeto
```

Essa conferÃªncia Ã© obrigatÃ³ria.

Nunca publicar estando em outra pasta.

Nunca publicar dentro da pasta do CatÃ¡logo.

Nunca publicar a partir de ZIP extraÃ­do em local temporÃ¡rio sem antes confirmar que ele Ã© a base correta.

Nunca publicar a partir de uma pasta antiga apenas porque ela parece parecida.

## 59. DomÃ­nio oficial de produÃ§Ã£o

O domÃ­nio oficial do Mini ERP Ã©:

```text
https://mini-erp-canastra.vercel.app
```

Toda conferÃªncia de produÃ§Ã£o deve apontar para esse domÃ­nio.

Se o deploy gerar outro endereÃ§o temporÃ¡rio da Vercel, ele pode ser usado apenas como referÃªncia tÃ©cnica, mas a validaÃ§Ã£o final precisa ser feita no domÃ­nio oficial.

## 60. Projeto Vercel oficial

O projeto Vercel oficial Ã©:

```text
mini-erp-canastra
```

Antes de publicar, deve existir seguranÃ§a de que a pasta local estÃ¡ vinculada ao projeto correto.

Se houver dÃºvida, nÃ£o publicar.

A confusÃ£o entre projetos ou pastas Ã© um risco real, principalmente porque o usuÃ¡rio tambÃ©m trabalha com o CatÃ¡logo.

## 61. Arquivos que precisam ser conferidos antes do deploy

Antes de publicar, conferir pelo menos:

1. `src\App.jsx`
2. `src\main.jsx`
3. `src\index.css`
4. `public\version.json`
5. `public\sw.js`
6. `public\service-worker.js`
7. `vercel.json`
8. `package.json`
9. `package-lock.json`
10. `LEIA-PRIMEIRO-MINI-ERP.md`
11. `MANUAL-OFICIAL-MINI-ERP-PWA.md`, quando jÃ¡ estiver no projeto
12. Pasta `sql`, quando houver mudanÃ§a de banco ou referÃªncia tÃ©cnica

A conferÃªncia nÃ£o significa alterar todos esses arquivos.

Significa confirmar que nada sensÃ­vel foi mexido sem intenÃ§Ã£o.

## 62. ConferÃªncia inicial da versÃ£o local

Rodar:

```powershell
type public\version.json
```

O objetivo Ã© confirmar a versÃ£o declarada no arquivo pÃºblico.

A versÃ£o esperada para a base estÃ¡vel atual Ã©:

```text
2026.06.24.03
```

Se a versÃ£o local nÃ£o for a esperada, parar e investigar.

NÃ£o corrigir no impulso.

Primeiro descobrir se o ZIP Ã© outro, se a pasta Ã© antiga ou se houve alteraÃ§Ã£o ainda nÃ£o documentada.

## 63. ConferÃªncia da versÃ£o no App.jsx

Rodar:

```powershell
Select-String -Path src\App.jsx -Pattern "APP_VERSION"
```

O objetivo Ã© verificar se o aplicativo tem uma versÃ£o interna declarada e se ela bate com a versÃ£o do `public\version.json`.

Se a versÃ£o interna do app for diferente da versÃ£o pÃºblica, hÃ¡ risco de diagnÃ³stico falso ou atualizaÃ§Ã£o incorreta.

Nesse caso, nÃ£o publicar antes de resolver a divergÃªncia.

## 64. ConferÃªncia da versÃ£o no main.jsx

Rodar:

```powershell
Select-String -Path src\main.jsx -Pattern "2026.06"
```

O objetivo Ã© localizar qualquer referÃªncia direta a versÃ£o, atualizaÃ§Ã£o, cache ou parÃ¢metro de recarga.

Se houver versÃ£o antiga em `src\main.jsx`, investigar.

NÃ£o alterar automaticamente.

Primeiro entender a funÃ§Ã£o daquela referÃªncia.

## 65. ConferÃªncia de Service Worker antes do deploy

Como o Mini ERP jÃ¡ sofreu downgrade relacionado a Service Worker e cache, antes de qualquer deploy estrutural Ã© obrigatÃ³rio conferir:

```powershell
dir public
```

Depois verificar se existem:

```text
public\sw.js
public\service-worker.js
```

Se os dois existirem, nÃ£o apagar nenhum.

Primeiro entender:

1. Qual deles Ã© registrado.
2. Qual deles Ã© servido em produÃ§Ã£o.
3. Qual deles contÃ©m lÃ³gica ativa.
4. Qual deles controla cache.
5. Qual deles pode afetar atualizaÃ§Ã£o.
6. Qual deles pode interferir no PWA.
7. Qual deles jÃ¡ foi usado em correÃ§Ã£o anterior.

Service Worker nÃ£o deve ser alterado em refinamentos comuns.

## 66. ConferÃªncia do vercel.json

O arquivo `vercel.json` pode conter regras crÃ­ticas de cabeÃ§alho, cache, roteamento ou publicaÃ§Ã£o.

Antes de deploy, conferir:

```powershell
type vercel.json
```

O objetivo Ã© verificar se hÃ¡ regras relacionadas a:

1. Cache.
2. `version.json`.
3. HTML principal.
4. Service Worker.
5. Headers.
6. Redirecionamentos.
7. Rotas.
8. Build.

Se houver cabeÃ§alhos de cache, qualquer alteraÃ§Ã£o precisa ser tratada como sensÃ­vel.

## 67. InstalaÃ§Ã£o de dependÃªncias

Se a pasta foi recÃ©m extraÃ­da de ZIP ou se hÃ¡ dÃºvida sobre dependÃªncias, rodar:

```powershell
npm install
```

Se o PowerShell bloquear scripts ou houver problema com `npm`, usar:

```powershell
npm.cmd install
```

NÃ£o usar `npm install` como tentativa de corrigir erro sem ler a mensagem.

Se aparecer erro, registrar o erro e investigar.

## 68. Build oficial

O comando oficial de build Ã©:

```powershell
npm run build
```

Se o PowerShell bloquear scripts, usar:

```powershell
npm.cmd run build
```

O build precisa terminar sem erro.

Warning nÃ£o deve ser ignorado automaticamente.

Se houver warning relevante em Ã¡rea alterada, investigar.

Se houver erro, nÃ£o publicar.

## 69. O que o build aprovado significa

Build aprovado significa apenas que o projeto conseguiu gerar uma versÃ£o compilada.

Build aprovado nÃ£o significa:

1. Que o sistema estÃ¡ correto.
2. Que o deploy pode ser feito sem teste.
3. Que o Service Worker estÃ¡ correto.
4. Que o cache estÃ¡ correto.
5. Que o PWA estÃ¡ instalÃ¡vel.
6. Que o mobile estÃ¡ bom.
7. Que o desktop estÃ¡ preservado.
8. Que a versÃ£o publicada serÃ¡ a versÃ£o carregada no iPhone.

O build Ã© etapa obrigatÃ³ria, mas nÃ£o Ã© validaÃ§Ã£o final.

## 70. Teste local antes do deploy

ApÃ³s build aprovado, testar localmente.

Comando comum:

```powershell
npm run dev
```

Ou, se necessÃ¡rio:

```powershell
npm.cmd run dev
```

O teste local deve verificar pelo menos:

1. Sistema abre.
2. Desktop nÃ£o quebrou.
3. Menu principal aparece.
4. Clientes carregam.
5. PrÃ©-vendas aparecem.
6. Vendas aparecem.
7. Delivery aparece.
8. CobranÃ§as aparecem.
9. Financeiro aparece.
10. RelatÃ³rios aparecem.
11. DiagnÃ³stico do Sistema abre.
12. NÃ£o hÃ¡ erro visual grosseiro.
13. NÃ£o hÃ¡ tela branca.
14. NÃ£o hÃ¡ erro de console evidente.
15. O refinamento solicitado, quando houver, funciona.

## 71. Teste local nÃ£o substitui produÃ§Ã£o

O teste local Ã© obrigatÃ³rio, mas nÃ£o substitui validaÃ§Ã£o no domÃ­nio oficial.

O histÃ³rico do Mini ERP mostrou que problemas de cache, Service Worker, Vercel e versÃ£o podem aparecer apenas em produÃ§Ã£o.

Por isso, depois do deploy, a conferÃªncia de produÃ§Ã£o Ã© obrigatÃ³ria.

## 72. Quando usar deploy

Deploy sÃ³ deve ser feito quando:

1. A alteraÃ§Ã£o foi autorizada.
2. A pasta correta foi confirmada.
3. A versÃ£o foi conferida.
4. O build passou.
5. O teste local passou.
6. O risco foi entendido.
7. O rollback Ã© possÃ­vel.
8. O usuÃ¡rio autorizou publicar.

Sem autorizaÃ§Ã£o explÃ­cita, nÃ£o publicar.

## 73. Comando oficial de deploy

O comando oficial de deploy em produÃ§Ã£o Ã©:

```powershell
vercel --prod
```

Quando houver necessidade comprovada de forÃ§ar publicaÃ§Ã£o, especialmente apÃ³s problemas de cache, usar apenas com autorizaÃ§Ã£o:

```powershell
vercel --prod --force
```

O uso de `--force` nÃ£o deve ser automÃ¡tico.

Ele pode ser Ãºtil em situaÃ§Ãµes de atualizaÃ§Ã£o ou cache, mas tambÃ©m deve ser documentado.

## 74. ConferÃªncia do resultado do deploy

ApÃ³s o deploy, observar a saÃ­da do terminal.

Procurar confirmaÃ§Ã£o de alias para o domÃ­nio oficial.

O ponto esperado Ã© que a Vercel indique o domÃ­nio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Se o deploy gerar apenas um domÃ­nio temporÃ¡rio e nÃ£o associar o domÃ­nio oficial, investigar antes de considerar concluÃ­do.

## 75. ConferÃªncia de alias

Rodar:

```powershell
vercel alias ls
```

O objetivo Ã© confirmar que o domÃ­nio oficial estÃ¡ apontando para o deploy correto.

Se houver dÃºvida sobre alias, nÃ£o concluir a publicaÃ§Ã£o.

O domÃ­nio oficial precisa estar corretamente associado ao projeto `mini-erp-canastra`.

## 76. ConferÃªncia do version.json em produÃ§Ã£o

ApÃ³s deploy, rodar:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

Conferir se a resposta contÃ©m a versÃ£o esperada.

Para a base estÃ¡vel atual, a versÃ£o esperada Ã©:

```text
2026.06.24.03
```

Quando uma nova versÃ£o for autorizada futuramente, a versÃ£o esperada serÃ¡ a nova versÃ£o definida no processo.

## 77. ConferÃªncia manual no navegador desktop

Abrir:

```text
https://mini-erp-canastra.vercel.app
```

Verificar no desktop:

1. Sistema abre.
2. NÃ£o hÃ¡ tela branca.
3. Layout principal permanece correto.
4. Menu ou navegaÃ§Ã£o principal aparece.
5. Clientes carregam.
6. PrÃ©-vendas carregam.
7. Vendas carregam.
8. Delivery carrega.
9. CobranÃ§as carregam.
10. Financeiro carrega.
11. RelatÃ³rios carregam.
12. DiagnÃ³stico do Sistema abre.
13. VersÃ£o do aplicativo estÃ¡ correta.
14. VersÃ£o publicada estÃ¡ correta.
15. Status da versÃ£o estÃ¡ OK.
16. Supabase nÃ£o mostra erro.
17. NÃ£o hÃ¡ regressÃ£o evidente.

## 78. ConferÃªncia manual no celular

ApÃ³s validar no desktop, testar no celular.

No celular, conferir:

1. Sistema abre pelo navegador.
2. A barra inferior mobile aparece corretamente.
3. PrÃ©-venda aparece.
4. Vendas aparecem.
5. CobranÃ§as aparecem.
6. Delivery aparece.
7. BotÃµes sÃ£o clicÃ¡veis.
8. Campos nÃ£o dÃ£o zoom indevido.
9. Modais abrem corretamente.
10. Modais fecham corretamente.
11. Rolagem funciona.
12. DiagnÃ³stico abre.
13. VersÃ£o estÃ¡ correta.
14. Supabase carrega dados.
15. NÃ£o hÃ¡ retorno para versÃ£o antiga.

## 79. ConferÃªncia em iPhone

O iPhone deve ser tratado como ambiente importante.

Conferir:

1. Safari Mobile.
2. Chrome no iPhone, se usado.
3. Tela inicial, quando o PWA estiver instalado.
4. Comportamento em Wi-Fi.
5. Comportamento em 4G.
6. DiagnÃ³stico do Sistema.
7. Service Worker disponÃ­vel.
8. Service Worker controlando a pÃ¡gina.
9. VersÃ£o do aplicativo.
10. VersÃ£o publicada.
11. Status da versÃ£o.

O histÃ³rico mostrou que iPhone e campo podem revelar problemas que o desktop nÃ£o mostra.

## 80. ConferÃªncia em campo

A validaÃ§Ã£o em campo Ã© importante porque o sistema Ã© usado em situaÃ§Ã£o real.

Depois de deploy sensÃ­vel, observar:

1. Funcionamento em 4G.
2. Funcionamento fora da residÃªncia.
3. Funcionamento em local de entrega.
4. Carregamento de PrÃ©-vendas.
5. Carregamento de CobranÃ§as.
6. Carregamento de Delivery.
7. Registro de venda ou prÃ©-venda.
8. SincronizaÃ§Ã£o com Supabase.
9. AusÃªncia de downgrade.
10. DiagnÃ³stico coerente.

Uma versÃ£o sÃ³ deve ser considerada plenamente estÃ¡vel depois de sobreviver ao uso real.

## 81. CritÃ©rio de deploy bem sucedido

Um deploy sÃ³ Ã© considerado bem sucedido quando:

1. Build passou.
2. Deploy terminou sem erro.
3. DomÃ­nio oficial aponta para a publicaÃ§Ã£o correta.
4. `version.json` online mostra a versÃ£o esperada.
5. Desktop abre corretamente.
6. Mobile abre corretamente.
7. DiagnÃ³stico mostra status OK.
8. Supabase carrega dados.
9. MÃ³dulos crÃ­ticos aparecem.
10. NÃ£o hÃ¡ regressÃ£o imediata.
11. O usuÃ¡rio confirma que a versÃ£o estÃ¡ utilizÃ¡vel.
12. Backup Ã© criado apÃ³s validaÃ§Ã£o.

## 82. MÃ³dulos obrigatÃ³rios para teste pÃ³s deploy

Os mÃ³dulos mÃ­nimos para teste apÃ³s deploy sÃ£o:

1. Clientes.
2. PrÃ©-vendas.
3. Vendas.
4. Delivery.
5. CobranÃ§as.
6. Financeiro.
7. RelatÃ³rios.
8. DiagnÃ³stico do Sistema.
9. SincronizaÃ§Ã£o Supabase.
10. AtualizaÃ§Ã£o automÃ¡tica.

Se o deploy envolver PWA, acrescentar:

1. Manifest.
2. Ãcone.
3. InstalaÃ§Ã£o.
4. Abertura em tela cheia.
5. AtualizaÃ§Ã£o do app instalado.
6. DiagnÃ³stico dentro do app instalado.
7. NÃ£o ocorrÃªncia de downgrade no app instalado.

## 83. PolÃ­tica oficial de backup

Sempre manter:

1. Ãšltima versÃ£o estÃ¡vel.
2. VersÃ£o imediatamente anterior.
3. Backup aprovado em campo.
4. Backups histÃ³ricos relevantes.
5. DocumentaÃ§Ã£o correspondente Ã  versÃ£o.
6. Registro da versÃ£o e data.
7. IndicaÃ§Ã£o clara do motivo do backup.

Nunca sobrescrever backups histÃ³ricos.

Nunca apagar backup antigo sem autorizaÃ§Ã£o explÃ­cita.

Nunca confiar apenas no deploy da Vercel como backup.

## 84. Quando criar backup

Criar backup:

1. ApÃ³s versÃ£o estÃ¡vel validada.
2. ApÃ³s deploy bem sucedido.
3. ApÃ³s uso em campo sem regressÃ£o.
4. Antes de iniciar frente sensÃ­vel.
5. Antes de mexer em Service Worker.
6. Antes de mexer em cache.
7. Antes de mexer em versionamento.
8. Antes de iniciar PWA.
9. Antes de alterar Supabase ou estrutura de banco.
10. Antes de refinar mÃ³dulo crÃ­tico como PrÃ©-vendas, CobranÃ§as ou Delivery.

## 85. Nome recomendado para backup

O nome do backup deve deixar claro:

1. Projeto.
2. VersÃ£o.
3. Data.
4. Estado.
5. Motivo.

Exemplo:

```text
MINI-ERP-BACKUP-V2026.06.24.03-ESTAVEL-CAMPO.zip
```

Outro exemplo:

```text
MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip
```

Outro exemplo:

```text
MINI-ERP-BACKUP-ANTES-SERVICE-WORKER-V2026.06.24.03.zip
```

O nome precisa evitar ambiguidade.

## 86. O que deve entrar no backup

O backup deve conter o projeto necessÃ¡rio para retomada.

Deve incluir:

1. `src`
2. `public`
3. `sql`, quando existir
4. `package.json`
5. `package-lock.json`
6. `vercel.json`
7. `README.md`
8. `LEIA-PRIMEIRO-MINI-ERP.md`
9. `MANUAL-OFICIAL-MINI-ERP-PWA.md`
10. Documentos tÃ©cnicos oficiais
11. Arquivos de configuraÃ§Ã£o necessÃ¡rios, sem expor segredos
12. Registro da versÃ£o

## 87. O que nÃ£o deve entrar no backup enviado para conversa

Evitar enviar em ZIP de auditoria:

1. `node_modules`
2. `.git`
3. `.vercel`
4. `.env.local`
5. Arquivos com segredos
6. Backups antigos dentro do ZIP
7. Zips antigos dentro do ZIP
8. Pasta `dist`, salvo quando houver motivo especÃ­fico
9. Arquivos mortos sem necessidade
10. Arquivos temporÃ¡rios do sistema

Esses itens deixam o ZIP pesado e podem gerar confusÃ£o.

No backup local completo, alguns itens podem existir por contexto, mas o ZIP enviado para auditoria deve ser limpo.

## 88. Backup antes da frente PWA

Antes de iniciar qualquer implementaÃ§Ã£o PWA, criar backup da versÃ£o atual estÃ¡vel.

Nome sugerido:

```text
MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip
```

Esse backup deve ser tratado como ponto de retorno.

Se a frente PWA gerar problema, o sistema deve poder voltar para essa base.

## 89. Backup depois da frente PWA

Depois que o PWA for implementado, testado e aprovado em campo, criar novo backup.

Nome sugerido:

```text
MINI-ERP-BACKUP-PWA-ESTAVEL-V[VERSAO].zip
```

Esse backup sÃ³ deve ser criado depois de validaÃ§Ã£o real.

NÃ£o criar backup â€œestÃ¡velâ€ apenas porque o build passou.

## 90. DiferenÃ§a entre backup tÃ©cnico e backup aprovado em campo

Backup tÃ©cnico Ã© uma cÃ³pia do projeto em determinado momento.

Backup aprovado em campo Ã© uma cÃ³pia de uma versÃ£o que foi usada na operaÃ§Ã£o real sem regressÃ£o conhecida.

O backup aprovado em campo tem mais valor operacional.

Ele deve ser preservado com prioridade.

## 91. Fluxo oficial de rollback

Rollback Ã© o processo de voltar para uma versÃ£o anterior estÃ¡vel.

Ele deve ser usado quando uma versÃ£o nova causa problema relevante.

O fluxo oficial Ã©:

1. Identificar o problema.
2. Confirmar se Ã© problema real e nÃ£o apenas cache local.
3. Coletar diagnÃ³stico.
4. Identificar a Ãºltima versÃ£o estÃ¡vel.
5. Localizar o backup correto.
6. Restaurar o backup em pasta controlada.
7. Conferir versÃ£o do backup.
8. Rodar `npm install`, se necessÃ¡rio.
9. Rodar build.
10. Testar localmente.
11. Publicar somente com autorizaÃ§Ã£o.
12. Conferir `version.json` em produÃ§Ã£o.
13. Conferir domÃ­nio oficial.
14. Conferir desktop.
15. Conferir mobile.
16. Conferir iPhone.
17. Conferir campo, quando possÃ­vel.
18. Registrar o rollback.
19. Criar novo backup do estado recuperado, se necessÃ¡rio.

## 92. Rollback nÃ£o Ã© apagar mudanÃ§as no escuro

Rollback nÃ£o deve ser feito apagando arquivos manualmente sem controle.

A forma correta Ã© restaurar uma versÃ£o estÃ¡vel conhecida.

Se usar backup, restaurar o backup inteiro.

Se usar controle de versÃ£o, voltar para commit correto, quando aplicÃ¡vel.

Se usar ZIP, extrair em pasta clara e conferir antes de substituir.

NÃ£o misturar arquivos de versÃµes diferentes.

## 93. Quando fazer rollback

Rollback deve ser considerado quando:

1. Sistema abre versÃ£o errada.
2. PrÃ©-vendas somem.
3. Vendas quebram.
4. CobranÃ§as quebram.
5. Delivery quebra.
6. Supabase deixa de carregar por causa de alteraÃ§Ã£o recente.
7. Desktop Ã© afetado indevidamente.
8. Mobile fica inutilizÃ¡vel.
9. App instalado prende versÃ£o antiga.
10. Service Worker causa loop ou downgrade.
11. AtualizaÃ§Ã£o automÃ¡tica falha gravemente.
12. HÃ¡ risco operacional em campo.

## 94. Quando nÃ£o fazer rollback imediatamente

NÃ£o fazer rollback imediato quando:

1. O problema ainda nÃ£o foi diagnosticado.
2. O problema pode ser apenas cache local.
3. O `version.json` online estÃ¡ correto e apenas um aparelho estÃ¡ com cache antigo.
4. O erro estÃ¡ em dado especÃ­fico e nÃ£o na versÃ£o.
5. O problema Ã© pequeno e tem correÃ§Ã£o localizada segura.
6. A versÃ£o nova ainda nÃ£o foi confirmada como causadora do erro.

Nesses casos, primeiro coletar diagnÃ³stico.

## 95. Rollback e Service Worker

Rollback envolvendo Service Worker exige muito cuidado.

Um Service Worker novo pode continuar ativo mesmo apÃ³s voltar cÃ³digo antigo.

Um Service Worker antigo pode continuar controlando a pÃ¡gina mesmo apÃ³s deploy novo.

Por isso, em rollback relacionado a Service Worker, conferir:

1. Arquivo registrado.
2. Escopo.
3. Caches existentes.
4. PolÃ­tica de ativaÃ§Ã£o.
5. PolÃ­tica de limpeza.
6. `version.json`.
7. DiagnÃ³stico.
8. Desktop.
9. Mobile.
10. iPhone.
11. App instalado, quando houver PWA.

NÃ£o fazer rollback de Service Worker sem auditoria.

## 96. Rollback e cache

Rollback pode ser confundido por cache.

Depois de rollback, o usuÃ¡rio pode continuar vendo versÃ£o anterior por cache.

Por isso, sempre conferir:

1. `version.json` online.
2. DiagnÃ³stico do Sistema.
3. Aba anÃ´nima.
4. Outro dispositivo.
5. Desktop.
6. Mobile.
7. iPhone.
8. 4G.
9. Wi-Fi.
10. App instalado, quando houver.

A conclusÃ£o precisa se basear em evidÃªncia.

## 97. ConferÃªncia de produÃ§Ã£o apÃ³s rollback

ApÃ³s rollback, repetir a conferÃªncia completa:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

Depois abrir o domÃ­nio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Verificar:

1. VersÃ£o correta.
2. Status OK.
3. PrÃ©-vendas presentes.
4. Vendas presentes.
5. CobranÃ§as presentes.
6. Delivery presente.
7. Clientes carregados.
8. Supabase conectado.
9. Sem regressÃ£o visual.
10. Sem retorno para versÃ£o problemÃ¡tica.

## 98. Registro de rollback

Todo rollback deve ser documentado.

Registrar:

1. Data.
2. Hora.
3. VersÃ£o com problema.
4. VersÃ£o restaurada.
5. Motivo do rollback.
6. Sintomas observados.
7. Ambiente afetado.
8. Resultado do diagnÃ³stico.
9. Comandos usados.
10. Resultado da validaÃ§Ã£o.
11. Se houve impacto em dados.
12. Se houve necessidade de limpar cache ou Service Worker.
13. Se backup foi criado.

## 99. Fluxo oficial de conferÃªncia de produÃ§Ã£o

A conferÃªncia de produÃ§Ã£o deve seguir esta ordem:

1. Conferir domÃ­nio.
2. Conferir `version.json`.
3. Conferir alias Vercel.
4. Abrir desktop.
5. Abrir DiagnÃ³stico.
6. Conferir versÃ£o do aplicativo.
7. Conferir versÃ£o publicada.
8. Conferir maior versÃ£o aceita.
9. Conferir status da versÃ£o.
10. Conferir Service Worker.
11. Conferir Supabase.
12. Conferir mÃ³dulos carregados.
13. Testar mobile.
14. Testar iPhone.
15. Testar campo, quando necessÃ¡rio.
16. Registrar resultado.
17. Criar backup se aprovado.

## 100. Comandos oficiais de conferÃªncia

Entrar na pasta correta:

```powershell
cd C:\Users\Delber\Mini-ERP\projeto
```

Conferir versÃ£o pÃºblica local:

```powershell
type public\version.json
```

Conferir versÃ£o no App.jsx:

```powershell
Select-String -Path src\App.jsx -Pattern "APP_VERSION"
```

Conferir referÃªncias de versÃ£o no main.jsx:

```powershell
Select-String -Path src\main.jsx -Pattern "2026.06"
```

Conferir arquivos pÃºblicos:

```powershell
dir public
```

Conferir Vercel:

```powershell
vercel alias ls
```

Rodar build:

```powershell
npm run build
```

Alternativa no PowerShell:

```powershell
npm.cmd run build
```

Deploy em produÃ§Ã£o, somente com autorizaÃ§Ã£o:

```powershell
vercel --prod
```

Deploy forÃ§ado, somente com justificativa e autorizaÃ§Ã£o:

```powershell
vercel --prod --force
```

Conferir versÃ£o online:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

## 101. Checklist mÃ­nimo antes de publicar

Antes de publicar, confirmar:

1. Estou na pasta `C:\Users\Delber\Mini-ERP\projeto`.
2. O projeto Ã© o Mini ERP, nÃ£o o CatÃ¡logo.
3. A versÃ£o local foi conferida.
4. `public\version.json` foi conferido.
5. `src\App.jsx` foi conferido.
6. `src\main.jsx` foi conferido.
7. Service Worker nÃ£o foi alterado sem autorizaÃ§Ã£o.
8. Cache nÃ£o foi alterado sem autorizaÃ§Ã£o.
9. Supabase nÃ£o foi alterado sem autorizaÃ§Ã£o.
10. Banco nÃ£o foi alterado sem autorizaÃ§Ã£o.
11. A alteraÃ§Ã£o foi localizada.
12. O build passou.
13. O teste local passou.
14. O usuÃ¡rio autorizou deploy.
15. Existe caminho de rollback.

## 102. Checklist mÃ­nimo depois de publicar

Depois de publicar, confirmar:

1. Deploy terminou sem erro.
2. DomÃ­nio oficial foi associado.
3. `vercel alias ls` estÃ¡ coerente.
4. `version.json` online mostra a versÃ£o esperada.
5. Desktop abre.
6. Mobile abre.
7. DiagnÃ³stico abre.
8. VersÃ£o do aplicativo estÃ¡ correta.
9. VersÃ£o publicada estÃ¡ correta.
10. Status da versÃ£o estÃ¡ OK.
11. Service Worker estÃ¡ coerente.
12. Supabase carrega.
13. Clientes carregam.
14. PrÃ©-vendas carregam.
15. Vendas carregam.
16. Delivery carrega.
17. CobranÃ§as carregam.
18. Financeiro carrega.
19. RelatÃ³rios carregam.
20. NÃ£o hÃ¡ regressÃ£o imediata.

## 103. Checklist especial para PWA apÃ³s publicaÃ§Ã£o

Quando a frente PWA comeÃ§ar, acrescentar:

1. Manifest existe.
2. Manifest Ã© carregado em produÃ§Ã£o.
3. Ãcone aparece corretamente.
4. Aplicativo pode ser instalado.
5. Aplicativo abre em tela cheia.
6. Aplicativo usa o mesmo domÃ­nio.
7. Aplicativo usa o mesmo Supabase.
8. Aplicativo usa o mesmo cÃ³digo.
9. Desktop permanece igual.
10. Mobile navegador permanece igual ou melhor.
11. App instalado mostra DiagnÃ³stico.
12. App instalado mostra versÃ£o correta.
13. App instalado nÃ£o carrega versÃ£o antiga.
14. AtualizaÃ§Ã£o automÃ¡tica funciona.
15. Rollback continua possÃ­vel.
16. Service Worker nÃ£o prende HTML antigo.
17. Cache nÃ£o prende assets antigos crÃ­ticos.
18. `version.json` nÃ£o fica preso em cache.
19. O app instalado funciona em Wi-Fi.
20. O app instalado funciona em 4G.

## 104. Procedimento em caso de erro apÃ³s deploy

Se aparecer erro apÃ³s deploy:

1. NÃ£o fazer nova alteraÃ§Ã£o imediatamente.
2. Abrir DiagnÃ³stico do Sistema.
3. Registrar versÃ£o do aplicativo.
4. Registrar versÃ£o publicada.
5. Registrar status da versÃ£o.
6. Registrar ambiente.
7. Conferir `version.json` online.
8. Conferir se o problema ocorre no desktop.
9. Conferir se o problema ocorre no mobile.
10. Conferir se o problema ocorre em outro dispositivo.
11. Conferir se o problema ocorre em aba anÃ´nima.
12. Conferir se o problema ocorre em 4G e Wi-Fi.
13. Classificar se Ã© problema de cÃ³digo, cache, Service Worker, deploy, Supabase ou dado.
14. Decidir entre correÃ§Ã£o localizada e rollback.
15. SÃ³ agir depois de entender o cenÃ¡rio.

## 105. Procedimento em caso de tela branca

Se houver tela branca:

1. NÃ£o publicar outra versÃ£o no impulso.
2. Conferir build local.
3. Conferir console do navegador.
4. Conferir `version.json`.
5. Conferir se o deploy foi associado ao domÃ­nio.
6. Conferir se o erro ocorre no desktop e no mobile.
7. Conferir se o problema aparece em aba anÃ´nima.
8. Conferir se o Service Worker estÃ¡ controlando.
9. Conferir arquivos de cache.
10. Considerar rollback se o sistema estiver inutilizÃ¡vel.

Tela branca em produÃ§Ã£o Ã© incidente crÃ­tico.

## 106. Procedimento em caso de sumiÃ§o de mÃ³dulo

Se um mÃ³dulo sumir apÃ³s deploy, principalmente PrÃ©-vendas ou DiagnÃ³stico:

1. Suspeitar de downgrade.
2. Abrir DiagnÃ³stico, se disponÃ­vel.
3. Conferir versÃ£o do aplicativo.
4. Conferir versÃ£o publicada.
5. Conferir `version.json`.
6. Conferir desktop.
7. Conferir mobile.
8. Conferir aba anÃ´nima.
9. Conferir outro dispositivo.
10. Conferir Service Worker.
11. NÃ£o mexer no mÃ³dulo desaparecido sem provar que o problema estÃ¡ nele.

SumiÃ§o de mÃ³dulo pode ser versÃ£o antiga carregada, nÃ£o erro no mÃ³dulo.

## 107. Procedimento em caso de erro de Supabase

Se o sistema abre, mas os dados nÃ£o carregam:

1. Conferir se a versÃ£o estÃ¡ correta.
2. Conferir mensagem de erro no diagnÃ³stico.
3. Conferir conexÃ£o.
4. Conferir se hÃ¡ erro de sincronizaÃ§Ã£o.
5. Conferir se clientes carregam.
6. Conferir se prÃ©-vendas carregam.
7. Conferir se cobranÃ§as carregam.
8. Conferir se delivery carrega.
9. NÃ£o alterar banco sem autorizaÃ§Ã£o.
10. NÃ£o alterar Supabase sem auditoria.

Supabase Ã© Ã¡rea permanente protegida.

## 108. Procedimento em caso de problema apenas no iPhone

Se o problema ocorre apenas no iPhone:

1. Conferir Safari Mobile.
2. Conferir Chrome no iPhone, se aplicÃ¡vel.
3. Conferir se estÃ¡ em Wi-Fi ou 4G.
4. Conferir se hÃ¡ PWA instalado.
5. Conferir se a tela inicial usa app antigo.
6. Conferir DiagnÃ³stico.
7. Conferir Service Worker.
8. Conferir versÃ£o publicada.
9. Conferir `version.json`.
10. NÃ£o concluir que o cÃ³digo estÃ¡ errado sem comparar com desktop.

iPhone pode reter comportamento especÃ­fico de cache e PWA.

## 109. Procedimento em caso de problema apenas em campo

Se o problema ocorre apenas em campo:

1. Registrar local aproximado.
2. Registrar rede usada.
3. Registrar horÃ¡rio.
4. Abrir DiagnÃ³stico.
5. Conferir versÃ£o.
6. Conferir mÃ³dulos.
7. Conferir Supabase.
8. Comparar com Wi-Fi de casa.
9. Comparar com outro dispositivo.
10. Conferir se Ã© rede, cache, Service Worker ou versÃ£o.

O histÃ³rico mostrou que campo pode revelar problema real de atualizaÃ§Ã£o.

## 110. PolÃ­tica de autorizaÃ§Ã£o

As seguintes aÃ§Ãµes exigem autorizaÃ§Ã£o explÃ­cita:

1. Deploy.
2. Rollback.
3. AlteraÃ§Ã£o de Service Worker.
4. AlteraÃ§Ã£o de cache.
5. AlteraÃ§Ã£o de versionamento.
6. AlteraÃ§Ã£o de Supabase.
7. AlteraÃ§Ã£o de estrutura do banco.
8. AlteraÃ§Ã£o de arquitetura.
9. InÃ­cio da implementaÃ§Ã£o PWA.
10. RefatoraÃ§Ã£o.
11. RemoÃ§Ã£o de arquivo crÃ­tico.
12. MudanÃ§a em mÃ³dulo nÃ£o relacionado.
13. PublicaÃ§Ã£o forÃ§ada com `vercel --prod --force`.

Sem autorizaÃ§Ã£o, a aÃ§Ã£o deve ficar apenas no plano ou no diagnÃ³stico.

## 111. PolÃ­tica para Codex em deploy

O Codex pode ajudar a auditar, localizar arquivos e sugerir comandos.

Mas nÃ£o deve publicar sem autorizaÃ§Ã£o explÃ­cita.

Comando para orientar o Codex em fase de conferÃªncia:

```text
Audite somente o necessÃ¡rio para confirmar a versÃ£o local, o build, o Service Worker, o cache e o projeto Vercel. NÃ£o altere arquivos. NÃ£o publique. NÃ£o gere ZIP. NÃ£o faÃ§a deploy. Apenas informe se a pasta estÃ¡ correta, se a versÃ£o local bate com public/version.json, se hÃ¡ risco em Service Worker ou cache e se o projeto parece pronto para build.
```

Comando para orientar o Codex antes de deploy autorizado:

```text
Estamos no projeto Mini ERP Queijos Serra da Canastra, pasta oficial C:\Users\Delber\Mini-ERP\projeto. Antes de qualquer publicaÃ§Ã£o, confirme a versÃ£o, rode npm run build ou npm.cmd run build, valide que nÃ£o houve alteraÃ§Ã£o indevida em Service Worker, cache, Supabase, banco ou arquitetura. NÃ£o faÃ§a deploy sem eu autorizar explicitamente.
```

Comando para deploy somente depois de autorizaÃ§Ã£o:

```text
Deploy autorizado. Confirme novamente que estÃ¡ na pasta C:\Users\Delber\Mini-ERP\projeto, que o projeto Ã© mini-erp-canastra, que o build passou e publique em produÃ§Ã£o na Vercel. ApÃ³s publicar, confira o domÃ­nio oficial https://mini-erp-canastra.vercel.app, confira o version.json online e informe o resultado.
```

## 112. PolÃ­tica para Codex em rollback

Comando para orientar o Codex em caso de rollback:

```text
Precisamos avaliar rollback do Mini ERP. NÃ£o altere arquivos ainda. Primeiro identifique a versÃ£o atual, a versÃ£o publicada, o problema relatado, o Ãºltimo backup estÃ¡vel e o caminho de restauraÃ§Ã£o. Depois informe o plano de rollback com riscos e comandos. NÃ£o publique nada sem autorizaÃ§Ã£o explÃ­cita.
```

Comando para rollback autorizado:

```text
Rollback autorizado para a Ãºltima versÃ£o estÃ¡vel validada. Use somente o backup indicado, confirme a versÃ£o restaurada, rode npm install se necessÃ¡rio, rode npm run build ou npm.cmd run build, teste localmente e publique somente no projeto mini-erp-canastra. Depois confira version.json online, domÃ­nio oficial e status da versÃ£o no DiagnÃ³stico do Sistema.
```

## 113. PolÃ­tica para Codex em backup

Comando para orientar backup antes de frente sensÃ­vel:

```text
Criar um backup limpo do Mini ERP antes da prÃ³xima frente de trabalho. A pasta oficial Ã© C:\Users\Delber\Mini-ERP\projeto. O backup deve conter src, public, sql quando existir, package.json, package-lock.json, vercel.json, README e documentos oficiais. NÃ£o incluir node_modules, .git, .vercel, .env.local, dist salvo necessidade justificada, backups antigos ou arquivos temporÃ¡rios. Nome sugerido: MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip.
```

## 114. Regra de documentaÃ§Ã£o apÃ³s deploy

Depois de uma publicaÃ§Ã£o aprovada, atualizar a documentaÃ§Ã£o somente se a mudanÃ§a realmente alterou o estado do projeto.

Registrar:

1. VersÃ£o.
2. Data.
3. Motivo.
4. Arquivos alterados.
5. MÃ³dulos afetados.
6. Testes realizados.
7. Resultado em desktop.
8. Resultado em mobile.
9. Resultado em iPhone.
10. Resultado em campo, quando houver.
11. Backup criado.
12. Riscos remanescentes.

NÃ£o criar documentaÃ§Ã£o inflada para alteraÃ§Ã£o pequena, mas tambÃ©m nÃ£o deixar mudanÃ§a sensÃ­vel sem registro.

## 115. Regra de documentaÃ§Ã£o apÃ³s rollback

ApÃ³s rollback, documentar obrigatoriamente:

1. VersÃ£o problemÃ¡tica.
2. VersÃ£o restaurada.
3. Motivo.
4. Sintoma.
5. DiagnÃ³stico.
6. Comando usado.
7. Resultado.
8. PendÃªncia futura.
9. Backup utilizado.
10. Se Service Worker ou cache foram envolvidos.

Rollback sem registro enfraquece a seguranÃ§a do projeto.

## 116. RelaÃ§Ã£o entre deploy e nova frente PWA

A frente PWA mexe em pontos sensÃ­veis.

Mesmo que a primeira etapa pareÃ§a simples, como adicionar manifest e Ã­cones, o contexto envolve:

1. InstalaÃ§Ã£o.
2. Tela cheia.
3. Cache.
4. Service Worker.
5. AtualizaÃ§Ã£o.
6. Ãcones.
7. Manifest.
8. iPhone.
9. Mobile.
10. Desktop preservado.

Por isso, o primeiro deploy PWA deve ser tratado como deploy sensÃ­vel.

Antes dele, criar backup.

Depois dele, testar mais do que em um refinamento comum.

## 117. O que nÃ£o pode acontecer em um deploy PWA

Um deploy PWA nÃ£o pode:

1. Alterar visual do desktop sem necessidade.
2. Remover mÃ³dulo.
3. Quebrar PrÃ©-vendas.
4. Quebrar CobranÃ§as.
5. Quebrar Delivery.
6. Quebrar Vendas.
7. Alterar Supabase sem autorizaÃ§Ã£o.
8. Criar segunda base de cÃ³digo.
9. Criar outro domÃ­nio.
10. Criar outro banco.
11. Prender versÃ£o antiga no app instalado.
12. Causar downgrade.
13. Remover diagnÃ³stico.
14. Impedir rollback.
15. Esconder a versÃ£o real.

## 118. CondiÃ§Ã£o para considerar uma versÃ£o PWA estÃ¡vel

Uma versÃ£o PWA sÃ³ serÃ¡ estÃ¡vel quando:

1. Desktop estiver igual.
2. Mobile navegador estiver funcional.
3. App instalado estiver funcional.
4. DiagnÃ³stico funcionar nos trÃªs contextos.
5. VersÃ£o do app bater com versÃ£o publicada.
6. `version.json` estiver correto.
7. Supabase estiver conectado.
8. PrÃ©-vendas estiverem carregando.
9. CobranÃ§as estiverem carregando.
10. Delivery estiver carregando.
11. Vendas estiverem carregando.
12. AtualizaÃ§Ã£o funcionar apÃ³s novo deploy.
13. NÃ£o houver downgrade.
14. Houver backup pÃ³s validaÃ§Ã£o.
15. O usuÃ¡rio aprovar em uso real.

## 119. ConclusÃ£o operacional da Parte 3

Deploy, rollback e backup sÃ£o pilares de seguranÃ§a do Mini ERP.

O projeto nÃ£o deve depender de sorte, memÃ³ria ou tentativa.

Toda publicaÃ§Ã£o precisa seguir um ritual.

Toda reversÃ£o precisa partir de versÃ£o estÃ¡vel conhecida.

Todo backup precisa ter nome claro e funÃ§Ã£o clara.

A versÃ£o 2026.06.24.03 Ã© a base estÃ¡vel atual e deve ser preservada antes da frente PWA.

A prÃ³xima parte do manual deve formalizar os protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex.
# MANUAL OFICIAL MINI ERP PWA

## Parte 4: Protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex

## 120. Objetivo desta parte

Esta parte define como qualquer anÃ¡lise ou refinamento deve ser conduzido no Mini ERP.

O objetivo Ã© evitar confusÃ£o, alteraÃ§Ã£o fora de escopo, regressÃ£o e novo incidente de versÃ£o.

O Mini ERP deve ser trabalhado sempre com mÃ©todo.

A regra principal Ã©:

Primeiro auditar.
Depois localizar.
Depois propor.
Depois testar.
SÃ³ entÃ£o publicar, se houver autorizaÃ§Ã£o.

## 121. Dois modos oficiais de trabalho

O Mini ERP possui dois modos oficiais de trabalho:

1. Auditoria completa.
2. Refinamento localizado.

Esses modos nÃ£o devem ser misturados.

## 122. Auditoria completa

A auditoria completa deve ser usada quando o assunto envolver risco estrutural.

Usar auditoria completa em casos como:

1. Nova versÃ£o recebida por ZIP.
2. Suspeita de downgrade.
3. Problema de atualizaÃ§Ã£o.
4. Problema de cache.
5. Problema de Service Worker.
6. Problema de versionamento.
7. Problema de deploy.
8. Problema de Supabase.
9. Problema de banco de dados.
10. TransformaÃ§Ã£o em PWA.
11. MudanÃ§a de arquitetura.
12. Tela branca.
13. SumiÃ§o de mÃ³dulo.
14. InconsistÃªncia entre desktop e mobile.
15. Erro em produÃ§Ã£o sem causa clara.

Na auditoria completa, o Codex pode percorrer mais arquivos, mas nÃ£o deve alterar nada sem autorizaÃ§Ã£o.

## 123. Refinamento localizado

O refinamento localizado deve ser usado para mudanÃ§as pequenas e controladas.

Exemplos:

1. Ajuste visual.
2. Texto de botÃ£o.
3. Mensagem.
4. Modal.
5. Filtro.
6. PaginaÃ§Ã£o.
7. OrganizaÃ§Ã£o de card.
8. Pequena melhoria de UX.
9. Ajuste de cor.
10. Ajuste de espaÃ§amento.
11. Ajuste em lista.
12. Ajuste em formulÃ¡rio.

No refinamento localizado, nÃ£o se deve percorrer o projeto inteiro.

NÃ£o se deve refatorar.

NÃ£o se deve mexer em mÃ³dulos nÃ£o relacionados.

NÃ£o se deve alterar Service Worker, cache, versionamento, Supabase, banco, deploy ou arquitetura.

## 124. Regra de ouro do refinamento localizado

Antes de alterar qualquer coisa, provar onde estÃ¡ o cÃ³digo.

O Codex deve mostrar:

1. O arquivo exato.
2. O trecho atual.
3. O componente ou funÃ§Ã£o envolvida.
4. O comportamento atual.
5. O comportamento desejado.
6. A alteraÃ§Ã£o mÃ­nima necessÃ¡ria.
7. O risco da alteraÃ§Ã£o.
8. O teste necessÃ¡rio.

Sem isso, nÃ£o alterar.

## 125. Ãreas protegidas

As Ã¡reas abaixo sÃ£o protegidas e nÃ£o devem ser alteradas em refinamentos comuns:

1. Service Worker.
2. Cache.
3. Versionamento.
4. AtualizaÃ§Ã£o automÃ¡tica.
5. Supabase.
6. SincronizaÃ§Ã£o.
7. Estrutura do banco.
8. Deploy.
9. Vercel.
10. Arquitetura geral.
11. AutenticaÃ§Ã£o, se existir na versÃ£o auditada.
12. Dados persistidos.
13. EstratÃ©gia offline.
14. Arquivos de configuraÃ§Ã£o sensÃ­veis.

Qualquer alteraÃ§Ã£o nessas Ã¡reas exige autorizaÃ§Ã£o explÃ­cita.

## 126. MÃ³dulos sensÃ­veis

Os mÃ³dulos abaixo sÃ£o sensÃ­veis porque fazem parte da operaÃ§Ã£o diÃ¡ria:

1. PrÃ©-vendas.
2. Vendas.
3. Delivery.
4. CobranÃ§as.
5. Clientes.
6. Pagamentos.
7. Financeiro.
8. RelatÃ³rios.
9. DiagnÃ³stico do Sistema.

AlteraÃ§Ãµes nesses mÃ³dulos devem ser pequenas, justificadas e testadas.

## 127. Protocolo oficial de auditoria inicial

Quando receber um ZIP ou iniciar uma nova conversa, seguir esta ordem:

1. Confirmar que o projeto Ã© o Mini ERP.
2. Confirmar que nÃ£o Ã© o CatÃ¡logo.
3. Confirmar a versÃ£o.
4. Conferir a estrutura de pastas.
5. Conferir arquivos principais.
6. Conferir Service Worker.
7. Conferir cache.
8. Conferir versionamento.
9. Conferir Supabase.
10. Conferir vercel.json.
11. Conferir mÃ³dulos existentes.
12. Conferir riscos.
13. NÃ£o alterar nada.
14. NÃ£o gerar cÃ³digo.
15. NÃ£o gerar deploy.
16. NÃ£o gerar ZIP.
17. Entregar relatÃ³rio objetivo.

## 128. Arquivos obrigatÃ³rios na auditoria inicial

Conferir:

1. src/App.jsx
2. src/main.jsx
3. src/index.css
4. public/version.json
5. public/sw.js
6. public/service-worker.js
7. vercel.json
8. package.json
9. package-lock.json
10. README.md
11. LEIA-PRIMEIRO-MINI-ERP.md
12. MANUAL-OFICIAL-MINI-ERP-PWA.md
13. sql, se existir

O objetivo Ã© entender o estado real do projeto, nÃ£o alterar arquivos.

## 129. Protocolo de auditoria para PWA

Antes de iniciar qualquer implementaÃ§Ã£o PWA, auditar:

1. Se jÃ¡ existe manifest.
2. Se jÃ¡ existe link para manifest no HTML ou na estrutura do Vite.
3. Se jÃ¡ existem Ã­cones.
4. Se jÃ¡ existe Service Worker ativo.
5. Qual Service Worker estÃ¡ registrado.
6. Qual cache estÃ¡ sendo usado.
7. Se o Service Worker cacheia HTML.
8. Se version.json Ã© cacheado.
9. Se index.html pode ficar preso em cache.
10. Se hÃ¡ cabeÃ§alhos de cache no vercel.json.
11. Se hÃ¡ atualizaÃ§Ã£o automÃ¡tica.
12. Se o DiagnÃ³stico mostra Service Worker.
13. Se o desktop depende de alguma lÃ³gica mobile.
14. Se o mobile jÃ¡ tem layout prÃ³prio.
15. Se hÃ¡ risco de quebrar o desktop.
16. Se hÃ¡ risco de novo downgrade.

Nenhuma implementaÃ§Ã£o PWA deve comeÃ§ar antes dessa auditoria.

## 130. Protocolo de refinamento localizado

Para qualquer refinamento pequeno, seguir:

1. Ler o pedido.
2. Identificar o mÃ³dulo afetado.
3. Localizar o arquivo exato.
4. Mostrar o trecho atual.
5. Explicar o ajuste mÃ­nimo.
6. Confirmar que Service Worker, cache, Supabase, banco e versionamento nÃ£o serÃ£o tocados.
7. Alterar apenas o necessÃ¡rio.
8. Rodar build.
9. Testar o fluxo afetado.
10. Conferir mÃ³dulos crÃ­ticos.
11. NÃ£o publicar sem autorizaÃ§Ã£o.

## 131. Regra para barra inferior mobile

Antes de alterar a barra inferior mobile, Ã© obrigatÃ³rio:

1. Abrir src/App.jsx.
2. Localizar o trecho exato da barra inferior.
3. Mostrar a composiÃ§Ã£o atual real.
4. Confirmar os botÃµes existentes.
5. Confirmar a ordem atual.
6. Confirmar qual alteraÃ§Ã£o foi pedida.
7. Alterar somente aquele trecho.
8. Testar mobile.
9. Conferir desktop para garantir que nÃ£o foi afetado.

Essa regra nasceu porque mudanÃ§as aparentemente pequenas na navegaÃ§Ã£o mobile podem afetar a operaÃ§Ã£o em campo.

## 132. Regra para PrÃ©-vendas

Antes de alterar PrÃ©-vendas, Ã© obrigatÃ³rio:

1. Localizar o trecho exato do mÃ³dulo.
2. Identificar se a alteraÃ§Ã£o envolve listagem, modal, filtro, paginaÃ§Ã£o, resumo, exclusÃ£o, ediÃ§Ã£o ou conversÃ£o.
3. Confirmar se a alteraÃ§Ã£o afeta dados salvos no Supabase.
4. Confirmar se a alteraÃ§Ã£o afeta apenas visual ou tambÃ©m lÃ³gica.
5. Proteger o fluxo de salvar.
6. Proteger o fluxo de editar.
7. Proteger o fluxo de excluir.
8. Proteger o fluxo de converter.
9. Proteger o filtro por data.
10. Proteger a paginaÃ§Ã£o.
11. Rodar build.
12. Testar no mobile.

PrÃ©-vendas Ã© mÃ³dulo crÃ­tico.

NÃ£o mexer nele por deduÃ§Ã£o.

## 133. Regra para CobranÃ§as

Antes de alterar CobranÃ§as, Ã© obrigatÃ³rio:

1. Localizar o trecho exato.
2. Confirmar se a mudanÃ§a afeta lista, mensagem, resumo, pagamento ou baixa.
3. Preservar pendÃªncias mÃºltiplas.
4. Preservar valores em aberto.
5. Preservar mensagem para WhatsApp.
6. Preservar dados salvos.
7. Testar cliente com uma pendÃªncia.
8. Testar cliente com mÃºltiplas pendÃªncias.
9. Conferir Financeiro, se houver integraÃ§Ã£o.
10. Rodar build.

CobranÃ§as nÃ£o deve ser alterado junto com outros mÃ³dulos sem motivo forte.

## 134. Regra para Delivery

Antes de alterar Delivery, Ã© obrigatÃ³rio:

1. Localizar o trecho exato.
2. Confirmar se a mudanÃ§a afeta Nova Entrega.
3. Confirmar se afeta modal.
4. Confirmar se afeta status.
5. Confirmar se afeta cliente.
6. Confirmar se afeta referÃªncia.
7. Confirmar se afeta itens.
8. Preservar dados salvos.
9. Testar no mobile.
10. Rodar build.

Delivery Ã© fluxo de campo.

Pequenas quebras podem atrapalhar a entrega real.

## 135. Regra para Vendas

Antes de alterar Vendas, Ã© obrigatÃ³rio:

1. Localizar o trecho exato.
2. Confirmar se a mudanÃ§a afeta cliente cadastrado.
3. Confirmar se afeta cliente avulso.
4. Confirmar se afeta itens.
5. Confirmar se afeta forma de pagamento.
6. Confirmar se afeta total.
7. Confirmar se afeta conferÃªncia antes de salvar.
8. Confirmar se afeta retorno para PrÃ©-venda.
9. Testar venda simples.
10. Testar venda com pagamento em aberto.
11. Rodar build.

## 136. Regra para reconhecimento por voz

Antes de alterar reconhecimento por voz, Ã© obrigatÃ³rio:

1. Localizar parser ou funÃ§Ã£o responsÃ¡vel.
2. Preservar cliente.
3. Preservar referÃªncia.
4. Preservar itens adquiridos.
5. Preservar forma de pagamento.
6. Preservar valor.
7. Testar frase real.
8. Testar variaÃ§Ãµes de Pix.
9. Testar referÃªncia com nÃºmero e complemento.
10. Testar referÃªncia com escola ou local.
11. Testar fala incompleta.
12. Rodar build.

Regra consolidada para referÃªncia:

Quando a fala tiver â€œreferÃªnciaâ€, capturar tudo que vier depois dela atÃ© encontrar â€œitens adquiridosâ€, â€œitensâ€, â€œprodutoâ€, â€œprodutosâ€, â€œforma de pagamentoâ€, â€œpagamentoâ€ ou o fim da frase.

NÃ£o cortar nÃºmero, bloco, apartamento, letra ou complemento.

Exemplos vÃ¡lidos:

1. EP 314 Sul.
2. 314 Sul.
3. 210 Norte.
4. 306 Norte.
5. 210 Sul Bloco A apto 102.
6. EC 306 Norte.
7. Escola Parque 210 Norte.
8. Paulo Freire.
9. SEB.
10. CHPP.

## 137. Regra para forma de pagamento por voz

O parser deve reconhecer:

1. Pix.
2. DÃ©bito.
3. CrÃ©dito.
4. Fiado.
5. Em aberto.

Deve considerar variaÃ§Ãµes reconhecidas incorretamente, como:

1. pics.
2. pixx.
3. pics.
4. piques, se aparecer em teste real.
5. crÃ©dito com ruÃ­do.
6. dÃ©bito com ruÃ­do.

NÃ£o salvar automaticamente sem conferÃªncia.

O fluxo preferido Ã©:

Falar.
Conferir.
Salvar.

## 138. Protocolo de teste mÃ­nimo apÃ³s refinamento

ApÃ³s qualquer refinamento, testar:

1. Sistema abre.
2. Desktop nÃ£o quebrou.
3. Mobile nÃ£o quebrou.
4. MÃ³dulo alterado funciona.
5. PrÃ©-vendas continuam aparecendo.
6. Vendas continuam aparecendo.
7. Delivery continua aparecendo.
8. CobranÃ§as continuam aparecendo.
9. Clientes carregam.
10. DiagnÃ³stico abre.
11. Supabase nÃ£o mostra erro.
12. Build passou.

## 139. Protocolo de teste completo

Usar teste completo quando houver mudanÃ§a sensÃ­vel.

Testar:

1. Desktop Chrome.
2. Mobile Chrome.
3. Safari iPhone.
4. Wi-Fi.
5. 4G.
6. DiagnÃ³stico.
7. Versionamento.
8. Service Worker.
9. Cache.
10. Supabase.
11. Clientes.
12. PrÃ©-vendas.
13. Vendas.
14. Delivery.
15. CobranÃ§as.
16. Financeiro.
17. RelatÃ³rios.
18. AtualizaÃ§Ã£o automÃ¡tica.
19. PWA instalado, quando existir.
20. Rollback possÃ­vel.

## 140. Teste especÃ­fico para desktop

No desktop, conferir:

1. Layout principal.
2. Menu.
3. Painel.
4. Clientes.
5. PrÃ©-vendas.
6. Vendas.
7. Delivery.
8. CobranÃ§as.
9. Financeiro.
10. RelatÃ³rios.
11. Produtos.
12. DiagnÃ³stico.
13. AusÃªncia de tela branca.
14. AusÃªncia de erro visual grave.
15. Desktop preservado.

## 141. Teste especÃ­fico para mobile

No mobile, conferir:

1. Barra inferior.
2. BotÃµes principais.
3. Leitura dos cards.
4. Modais.
5. FormulÃ¡rios.
6. Rolagem.
7. AusÃªncia de zoom indevido.
8. PrÃ©-vendas.
9. Vendas.
10. CobranÃ§as.
11. Delivery.
12. DiagnÃ³stico.
13. Teclado.
14. Campo de quantidade.
15. Campo de cliente.
16. Campo de referÃªncia.
17. BotÃ£o voltar.
18. BotÃ£o salvar.
19. BotÃ£o excluir com confirmaÃ§Ã£o.
20. Uso em tela pequena.

## 142. Teste especÃ­fico para PrÃ©-vendas

Conferir:

1. Lista aparece.
2. PaginaÃ§Ã£o funciona.
3. Filtro por data funciona.
4. Resumo por data aparece.
5. ConferÃªncia consolidada dos produtos funciona.
6. ReferÃªncia aparece.
7. HorÃ¡rio aparece.
8. Quantidade aparece.
9. Forma de pagamento aparece.
10. Total por cliente aparece.
11. Modal abre.
12. Modal fecha.
13. EdiÃ§Ã£o funciona.
14. ExclusÃ£o pede confirmaÃ§Ã£o.
15. BotÃ£o â€œCopiar resumoâ€ continua removido.
16. Dados carregam do Supabase.
17. Mobile nÃ£o dÃ¡ zoom indevido.
18. Desktop permanece correto.

## 143. Teste especÃ­fico para CobranÃ§as

Conferir:

1. Lista de pendÃªncias aparece.
2. Cliente com uma cobranÃ§a aparece corretamente.
3. Cliente com mÃºltiplas cobranÃ§as aparece corretamente.
4. Valor total estÃ¡ correto.
5. Mensagem para WhatsApp estÃ¡ correta.
6. Baixa de pagamento funciona, se aplicÃ¡vel.
7. Resumo aparece.
8. Filtros funcionam, se existirem.
9. Mobile estÃ¡ legÃ­vel.
10. Supabase nÃ£o apresenta erro.

## 144. Teste especÃ­fico para Delivery

Conferir:

1. Lista de entregas aparece.
2. Nova Entrega abre.
3. Modal abre corretamente.
4. Cliente aparece.
5. ReferÃªncia aparece.
6. Itens aparecem.
7. Status funciona.
8. EdiÃ§Ã£o funciona, se existir.
9. FinalizaÃ§Ã£o funciona, se existir.
10. Mobile estÃ¡ utilizÃ¡vel.

## 145. Teste especÃ­fico para Vendas

Conferir:

1. Nova venda abre.
2. Cliente cadastrado funciona.
3. Cliente avulso funciona.
4. Itens funcionam.
5. Quantidade funciona.
6. Valor funciona.
7. Pix funciona.
8. DÃ©bito funciona.
9. CrÃ©dito funciona.
10. Em aberto funciona.
11. ConferÃªncia antes de salvar funciona.
12. Salvar funciona.
13. Retorno para PrÃ©-venda funciona, quando aplicÃ¡vel.
14. Pagamentos e financeiro nÃ£o quebraram.

## 146. Teste especÃ­fico para DiagnÃ³stico do Sistema

Conferir:

1. DiagnÃ³stico abre.
2. Mostra data.
3. Mostra versÃ£o do aplicativo.
4. Mostra versÃ£o publicada.
5. Mostra maior versÃ£o aceita.
6. Mostra status da versÃ£o.
7. Mostra Service Worker disponÃ­vel.
8. Mostra Service Worker controlando.
9. Mostra online ou offline.
10. Mostra ambiente.
11. Mostra URL.
12. Mostra navegador.
13. Mostra sistema.
14. Mostra Supabase.
15. Mostra Ãºltima atualizaÃ§Ã£o de dados.
16. Mostra erro de sincronizaÃ§Ã£o, se houver.
17. Mostra clientes carregados.
18. Mostra prÃ©-vendas carregadas.
19. Mostra cobranÃ§as carregadas.
20. Mostra delivery carregados.

## 147. Teste especÃ­fico para PWA

Quando a frente PWA comeÃ§ar, testar:

1. Manifest carregado.
2. Ãcone correto.
3. Nome correto do app.
4. InstalaÃ§Ã£o disponÃ­vel.
5. Abertura em tela cheia.
6. Mesmo domÃ­nio.
7. Mesmo Supabase.
8. Mesmo cÃ³digo.
9. Desktop preservado.
10. Mobile preservado.
11. DiagnÃ³stico dentro do app instalado.
12. VersÃ£o correta dentro do app instalado.
13. AtualizaÃ§Ã£o apÃ³s deploy.
14. Sem downgrade.
15. Sem cache antigo.
16. Sem HTML antigo.
17. Sem perda de dados.
18. Funcionamento em Wi-Fi.
19. Funcionamento em 4G.
20. Rollback possÃ­vel.

## 148. Comando oficial para Codex, auditoria inicial

Usar quando abrir uma nova etapa de trabalho:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Projeto: Mini ERP Queijos Serra da Canastra.
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
DomÃ­nio oficial: https://mini-erp-canastra.vercel.app
VersÃ£o estÃ¡vel de referÃªncia: 2026.06.24.03

Objetivo:

Auditar o projeto atual antes de qualquer alteraÃ§Ã£o.

Regras:

NÃ£o alterar arquivos.
NÃ£o gerar cÃ³digo.
NÃ£o gerar deploy.
NÃ£o gerar ZIP.
NÃ£o modificar Service Worker.
NÃ£o modificar cache.
NÃ£o modificar versionamento.
NÃ£o modificar Supabase.
NÃ£o modificar banco.
NÃ£o modificar arquitetura.
NÃ£o criar novo projeto.
NÃ£o criar segunda base de cÃ³digo.

Confirme:

1. Se a pasta Ã© a correta.
2. Se o projeto Ã© o Mini ERP, nÃ£o o CatÃ¡logo.
3. Qual versÃ£o local foi encontrada.
4. Se public/version.json existe.
5. Se src/App.jsx contÃ©m versÃ£o interna.
6. Se src/main.jsx contÃ©m referÃªncia de versÃ£o.
7. Se existem public/sw.js e public/service-worker.js.
8. Se existe vercel.json.
9. Se hÃ¡ arquivos relacionados a PWA.
10. Quais mÃ³dulos existem.
11. Quais riscos existem.
12. Qual plano seguro para a prÃ³xima etapa.
```

## 149. Comando oficial para Codex, refinamento localizado

Usar quando for fazer ajuste pequeno:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Vamos fazer apenas um refinamento localizado no Mini ERP.

Regras:

NÃ£o refatorar.
NÃ£o percorrer o projeto inteiro sem necessidade.
NÃ£o alterar Service Worker.
NÃ£o alterar cache.
NÃ£o alterar versionamento.
NÃ£o alterar Supabase.
NÃ£o alterar banco.
NÃ£o alterar arquitetura.
NÃ£o alterar mÃ³dulos nÃ£o relacionados.
NÃ£o fazer deploy sem autorizaÃ§Ã£o.

Antes de alterar:

1. Identifique o arquivo exato.
2. Mostre o trecho atual.
3. Explique o comportamento atual.
4. Explique a alteraÃ§Ã£o mÃ­nima necessÃ¡ria.
5. Informe riscos.
6. Informe como testar.

Depois da alteraÃ§Ã£o, rode npm run build ou npm.cmd run build.
```

## 150. Comando oficial para Codex, auditoria PWA sem alteraÃ§Ã£o

Usar antes de implementar PWA:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Objetivo:

Auditar a base atual do Mini ERP para preparar a transformaÃ§Ã£o em PWA instalÃ¡vel.

Regras:

NÃ£o alterar arquivos.
NÃ£o gerar cÃ³digo.
NÃ£o fazer deploy.
NÃ£o criar novo projeto.
NÃ£o criar segunda base de cÃ³digo.
NÃ£o alterar desktop.
NÃ£o alterar Service Worker.
NÃ£o alterar cache.
NÃ£o alterar versionamento.
NÃ£o alterar Supabase.
NÃ£o alterar banco.

Confirme:

1. Se existe manifest.
2. Se existem Ã­cones de app.
3. Se existe registro de Service Worker.
4. Qual Service Worker estÃ¡ ativo.
5. Como o cache estÃ¡ configurado.
6. Como version.json Ã© servido.
7. Se vercel.json possui headers relevantes.
8. Se o desktop depende de algo que poderia ser afetado pelo PWA.
9. Quais arquivos precisariam ser tocados em uma futura implementaÃ§Ã£o PWA.
10. Quais riscos existem para downgrade.
11. Qual seria o plano seguro em etapas, sem implementar ainda.
```

## 151. Comando oficial para Codex, implementaÃ§Ã£o PWA autorizada

Usar somente depois de auditoria e autorizaÃ§Ã£o:

```text
ImplementaÃ§Ã£o PWA autorizada, mas somente em etapas pequenas.

Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Regras absolutas:

Manter o desktop exatamente como estÃ¡.
NÃ£o criar novo projeto.
NÃ£o criar segunda base de cÃ³digo.
NÃ£o criar outro Supabase.
NÃ£o criar outro banco.
NÃ£o criar outro domÃ­nio.
NÃ£o alterar mÃ³dulos funcionais sem necessidade.
NÃ£o mexer em Service Worker alÃ©m do mÃ­nimo necessÃ¡rio e somente se for comprovado.
NÃ£o alterar cache sem explicar impacto.
NÃ£o alterar versionamento sem autorizaÃ§Ã£o especÃ­fica.
NÃ£o fazer deploy sem autorizaÃ§Ã£o final.

Primeira etapa:

Propor a menor implementaÃ§Ã£o possÃ­vel para tornar o Mini ERP instalÃ¡vel como PWA, preservando a versÃ£o estÃ¡vel 2026.06.24.03 como referÃªncia.

Antes de alterar, mostre:

1. Arquivos que serÃ£o tocados.
2. Trechos atuais.
3. AlteraÃ§Ã£o proposta.
4. Risco de cada alteraÃ§Ã£o.
5. Testes necessÃ¡rios.
6. Plano de rollback.
```

## 152. Comando oficial para Codex, teste pÃ³s alteraÃ§Ã£o

Usar depois de qualquer alteraÃ§Ã£o:

```text
FaÃ§a a validaÃ§Ã£o pÃ³s alteraÃ§Ã£o do Mini ERP.

Regras:

NÃ£o alterar novos arquivos.
NÃ£o fazer deploy.
NÃ£o refatorar.
Apenas testar e relatar.

Execute:

1. npm run build ou npm.cmd run build.
2. Confira se nÃ£o houve erro.
3. Liste os arquivos alterados.
4. Confirme se Service Worker foi ou nÃ£o alterado.
5. Confirme se cache foi ou nÃ£o alterado.
6. Confirme se versionamento foi ou nÃ£o alterado.
7. Confirme se Supabase foi ou nÃ£o alterado.
8. Confirme se banco foi ou nÃ£o alterado.
9. Confirme se desktop foi preservado.
10. Informe o checklist manual necessÃ¡rio para o usuÃ¡rio testar.
```

## 153. Comando oficial para Codex, suspeita de downgrade

Usar se aparecer versÃ£o antiga:

```text
Suspeita de downgrade no Mini ERP.

NÃ£o altere arquivos.
NÃ£o publique.
NÃ£o gere cÃ³digo.
NÃ£o faÃ§a rollback ainda.

Investigue e informe:

1. VersÃ£o local em public/version.json.
2. VersÃ£o interna em src/App.jsx.
3. ReferÃªncias de versÃ£o em src/main.jsx.
4. ExistÃªncia de public/sw.js.
5. ExistÃªncia de public/service-worker.js.
6. EstratÃ©gia de cache encontrada.
7. ConteÃºdo de vercel.json.
8. PossÃ­vel causa para versÃ£o antiga.
9. Como conferir version.json online.
10. Como conferir alias da Vercel.
11. Qual diagnÃ³stico pedir ao usuÃ¡rio.
12. PrÃ³ximos passos seguros.

Lembrete:

O domÃ­nio oficial Ã© https://mini-erp-canastra.vercel.app.
A versÃ£o estÃ¡vel de referÃªncia Ã© 2026.06.24.03.
```

## 154. Comando oficial para Codex, backup antes do PWA

Usar antes de iniciar implementaÃ§Ã£o PWA:

```text
Criar um backup limpo do Mini ERP antes da frente PWA.

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Nome sugerido:

MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip

Incluir:

1. src
2. public
3. sql, se existir
4. package.json
5. package-lock.json
6. vercel.json
7. README.md
8. LEIA-PRIMEIRO-MINI-ERP.md
9. MANUAL-OFICIAL-MINI-ERP-PWA.md
10. Demais documentos oficiais necessÃ¡rios

NÃ£o incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. dist, salvo justificativa
6. backups antigos
7. zips antigos
8. arquivos temporÃ¡rios

NÃ£o alterar o projeto.
NÃ£o publicar.
Apenas criar o backup limpo e informar o caminho final.
```

## 155. Comando oficial para Codex, deploy autorizado

Usar apenas se o usuÃ¡rio autorizar:

```text
Deploy autorizado pelo usuÃ¡rio.

Antes de publicar:

1. Confirme que estÃ¡ em C:\Users\Delber\Mini-ERP\projeto.
2. Confirme que o projeto Ã© mini-erp-canastra.
3. Confirme que nÃ£o Ã© o CatÃ¡logo.
4. Rode npm run build ou npm.cmd run build.
5. Confirme que o build passou.
6. Confirme arquivos alterados.
7. Confirme se Service Worker foi alterado.
8. Confirme se cache foi alterado.
9. Confirme se versionamento foi alterado.
10. Confirme se Supabase ou banco foram alterados.

Depois publique em produÃ§Ã£o:

vercel --prod

Se houver justificativa aprovada para forÃ§ar:

vercel --prod --force

Depois do deploy:

1. Confirme o domÃ­nio https://mini-erp-canastra.vercel.app.
2. Confira version.json online.
3. Confira alias da Vercel.
4. Informe o checklist para teste em desktop, mobile e iPhone.
```

## 156. Comando oficial para Codex, rollback

Usar em caso de necessidade real:

```text
Avaliar rollback do Mini ERP.

NÃ£o alterar arquivos ainda.
NÃ£o publicar ainda.

Primeiro informe:

1. VersÃ£o atual.
2. VersÃ£o publicada.
3. Problema relatado.
4. MÃ³dulos afetados.
5. Se hÃ¡ suspeita de cache.
6. Se hÃ¡ suspeita de Service Worker.
7. Qual backup estÃ¡vel serÃ¡ usado.
8. Quais riscos existem.
9. Plano de rollback.
10. Comandos necessÃ¡rios.

SÃ³ executar rollback depois de autorizaÃ§Ã£o explÃ­cita.
```

## 157. Como o usuÃ¡rio deve usar estes comandos

O usuÃ¡rio nÃ£o precisa colar o manual inteiro no Codex toda vez.

O correto Ã© manter estes arquivos dentro da pasta do projeto:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Depois, no Codex, basta pedir:

Leia os dois arquivos oficiais antes de qualquer aÃ§Ã£o.

Assim, o Codex usa o manual como referÃªncia e evita depender de memÃ³ria da conversa.

## 158. O que o Codex nunca deve fazer sem autorizaÃ§Ã£o

O Codex nunca deve:

1. Publicar.
2. Fazer rollback.
3. Alterar Service Worker.
4. Alterar cache.
5. Alterar versionamento.
6. Alterar Supabase.
7. Alterar banco.
8. Refatorar arquitetura.
9. Criar novo projeto.
10. Criar segunda base.
11. Criar outro domÃ­nio.
12. Misturar Mini ERP com CatÃ¡logo.
13. Apagar arquivos crÃ­ticos.
14. Criar ZIP de produÃ§Ã£o sem pedido.
15. Tratar PWA como projeto separado.

## 159. O que o Codex pode fazer em seguranÃ§a

O Codex pode:

1. Ler arquivos.
2. Auditar estrutura.
3. Identificar versÃ£o.
4. Localizar trecho de cÃ³digo.
5. Explicar riscos.
6. Propor plano.
7. Rodar build quando autorizado.
8. Listar arquivos alterados.
9. Criar backup limpo quando pedido.
10. Preparar checklist.
11. Validar se a alteraÃ§Ã£o ficou localizada.
12. Alertar sobre risco de regressÃ£o.

## 160. ConclusÃ£o operacional da Parte 4

O Mini ERP deve evoluir com disciplina.

A auditoria completa serve para cenÃ¡rios estruturais e sensÃ­veis.

O refinamento localizado serve para ajustes pequenos.

Service Worker, cache, versionamento, Supabase, banco e arquitetura sÃ£o Ã¡reas protegidas.

A frente PWA deve comeÃ§ar por auditoria, nÃ£o por implementaÃ§Ã£o.

O Codex deve ser usado como auxiliar tÃ©cnico, mas sempre dentro das regras do projeto.

A prÃ³xima parte do manual deve registrar refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes.
# MANUAL OFICIAL MINI ERP PWA

## Parte 5: Refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes

## 161. Objetivo desta parte

Esta parte registra o que jÃ¡ foi implementado, o que estÃ¡ aprovado como direÃ§Ã£o do projeto e o que ainda estÃ¡ pendente.

O objetivo Ã© evitar retrabalho, evitar mudanÃ§as repetidas e impedir que uma funcionalidade estÃ¡vel seja refeita sem necessidade.

O Mini ERP evolui por refinamentos pequenos e controlados.

Cada refinamento precisa respeitar o estado estÃ¡vel atual:

VersÃ£o oficial estÃ¡vel: 2026.06.24.03

Essa versÃ£o deve ser preservada como base antes da frente PWA.

## 162. Regra para leitura desta parte

As funcionalidades citadas como estÃ¡veis nÃ£o devem ser refeitas do zero.

Se houver novo ajuste, ele deve ser localizado.

As funcionalidades citadas como aprovadas nÃ£o significam autorizaÃ§Ã£o automÃ¡tica para implementar.

Elas indicam direÃ§Ã£o de projeto jÃ¡ aceita.

As funcionalidades pendentes precisam de auditoria antes de qualquer cÃ³digo.

## 163. Funcionalidades estÃ¡veis principais

O LEIA PRIMEIRO confirma como estÃ¡veis:

1. Clientes.
2. PrÃ© vendas.
3. Vendas.
4. Delivery.
5. CobranÃ§as.
6. Financeiro.
7. RelatÃ³rios.
8. SincronizaÃ§Ã£o Supabase.
9. AtualizaÃ§Ã£o automÃ¡tica.
10. Deploy Vercel.

Essas Ã¡reas formam o nÃºcleo operacional do Mini ERP.

Qualquer alteraÃ§Ã£o futura deve proteger esses mÃ³dulos.

## 164. Clientes, estado consolidado

O mÃ³dulo de Clientes Ã© estÃ¡vel.

Ele serve como base para:

1. Vendas.
2. PrÃ© vendas.
3. Delivery.
4. CobranÃ§as.
5. ReferÃªncias de entrega.
6. OrganizaÃ§Ã£o da operaÃ§Ã£o em campo.

A referÃªncia do cliente Ã© parte importante do uso real.

Ela pode representar escola, quadra, prÃ©dio, setor, bloco, apartamento ou local de entrega.

Exemplos de referÃªncias usadas na operaÃ§Ã£o:

1. EP 314 Sul.
2. EP 210 Norte.
3. EC 306 Norte.
4. CEF 306 Norte.
5. Paulo Freire.
6. SEB.
7. CHPP.
8. CEAN.
9. 114 Sul.
10. 304 Norte.
11. 405 Norte.
12. Escola Parque 210 Sul.
13. Escola DNA.
14. Setor Oeste.
15. DPE.
16. DEAM.
17. 35Âª DP.

A referÃªncia nÃ£o deve ser cortada ou simplificada indevidamente.

## 165. Clientes, cuidados futuros

Antes de mexer em Clientes, conferir:

1. Cadastro.
2. EdiÃ§Ã£o.
3. Busca.
4. ReferÃªncia.
5. IntegraÃ§Ã£o com venda.
6. IntegraÃ§Ã£o com prÃ© venda.
7. IntegraÃ§Ã£o com delivery.
8. IntegraÃ§Ã£o com cobranÃ§a.
9. Cliente avulso.
10. Supabase.

NÃ£o alterar Clientes apenas para resolver problema em outro mÃ³dulo.

## 166. PrÃ© vendas, estado consolidado

PrÃ© vendas Ã© um dos mÃ³dulos mais importantes do Mini ERP.

Ele nasceu de uma necessidade real da operaÃ§Ã£o:

Registrar rapidamente uma intenÃ§Ã£o de compra em momentos curtos, especialmente em campo, para converter depois em venda.

O mÃ³dulo estÃ¡ estÃ¡vel na versÃ£o 2026.06.24.03.

O LEIA PRIMEIRO confirma os seguintes refinamentos implementados em PrÃ© vendas:

1. ConfirmaÃ§Ã£o antes de excluir.
2. PaginaÃ§Ã£o.
3. Filtro por data.
4. Resumo por data.
5. ConferÃªncia consolidada dos produtos.
6. ReferÃªncia do cliente.
7. HorÃ¡rio da prÃ© venda.
8. Quantidade dos itens.
9. Forma de pagamento.
10. Total por cliente.
11. Modal corrigido.
12. BotÃ£o â€œCopiar resumoâ€ removido por decisÃ£o de projeto.

Esses pontos devem ser considerados consolidados.

## 167. PrÃ© vendas, confirmaÃ§Ã£o antes de excluir

A exclusÃ£o de prÃ© venda deve exigir confirmaÃ§Ã£o.

Essa confirmaÃ§Ã£o evita apagar pedidos por engano durante uso em campo.

Essa regra deve ser preservada.

NÃ£o remover confirmaÃ§Ã£o de exclusÃ£o sem autorizaÃ§Ã£o explÃ­cita.

## 168. PrÃ© vendas, paginaÃ§Ã£o

A paginaÃ§Ã£o foi implementada para melhorar organizaÃ§Ã£o e leitura.

Ela evita listas longas demais e torna o mÃ³dulo mais controlÃ¡vel.

A paginaÃ§Ã£o deve continuar funcionando no desktop e no mobile.

Ao testar PrÃ© vendas, conferir:

1. MudanÃ§a de pÃ¡gina.
2. Quantidade de itens por pÃ¡gina.
3. Funcionamento junto com filtro por data.
4. Funcionamento junto com resumo por data.
5. AusÃªncia de quebra visual no mobile.

## 169. PrÃ© vendas, filtro por data

O filtro por data foi implementado para facilitar a conferÃªncia de pedidos por dia.

Ele Ã© Ãºtil para a rotina de entrega e fechamento.

Deve ser preservado.

Ao testar, conferir:

1. Data atual.
2. Datas anteriores.
3. Lista filtrada.
4. Resumo filtrado.
5. PaginaÃ§Ã£o junto com filtro.
6. AusÃªncia de perda de dados.

## 170. PrÃ© vendas, resumo por data

O resumo por data ajuda a entender o volume de pedidos em determinado dia.

Ele deve considerar corretamente os itens das prÃ© vendas filtradas.

Ao testar, conferir:

1. Produtos listados.
2. Quantidades consolidadas.
3. Totais por cliente.
4. CoerÃªncia com a lista visÃ­vel.
5. Funcionamento no mobile.

## 171. PrÃ© vendas, conferÃªncia consolidada dos produtos

A conferÃªncia consolidada dos produtos Ã© uma melhoria importante.

Ela permite enxergar os itens de forma agrupada, facilitando preparo, separaÃ§Ã£o e conferÃªncia.

Esse recurso deve ser preservado.

NÃ£o reintroduzir botÃ£o ou resumo removido sem nova decisÃ£o de projeto.

## 172. PrÃ© vendas, referÃªncia do cliente

A referÃªncia do cliente foi incorporada ao fluxo de prÃ© vendas.

Isso Ã© essencial para a operaÃ§Ã£o real, pois muitos pedidos sÃ£o organizados pelo local.

A referÃªncia deve aparecer de forma clara.

NÃ£o deve ser escondida no mobile.

NÃ£o deve ser cortada indevidamente.

## 173. PrÃ© vendas, horÃ¡rio da prÃ© venda

O horÃ¡rio da prÃ© venda foi implementado para dar contexto operacional.

Ele ajuda a entender quando o pedido foi registrado.

Esse dado pode ajudar em conferÃªncia e prioridade de atendimento.

Deve ser preservado.

## 174. PrÃ© vendas, quantidade dos itens

A quantidade dos itens foi ajustada para aparecer corretamente.

Esse campo Ã© essencial para evitar erro de separaÃ§Ã£o e cobranÃ§a.

Ao testar, conferir:

1. Produto com uma unidade.
2. Produto com mais de uma unidade.
3. Produto com valor total.
4. Produto em modal.
5. Produto em listagem.

## 175. PrÃ© vendas, forma de pagamento

A forma de pagamento aparece nas prÃ© vendas.

Isso ajuda a separar vendas pagas, em aberto ou por forma de recebimento.

Formas comuns:

1. Pix.
2. DÃ©bito.
3. CrÃ©dito.
4. Fiado.
5. Em aberto.

Esse dado deve ser preservado no mÃ³dulo.

## 176. PrÃ© vendas, total por cliente

O total por cliente foi consolidado.

Esse total Ã© importante para cobranÃ§a, conferÃªncia e conversÃ£o.

Ao testar, conferir:

1. Soma correta dos itens.
2. Cliente com um produto.
3. Cliente com vÃ¡rios produtos.
4. Cliente com pagamento em aberto.
5. Cliente convertido, se aplicÃ¡vel.

## 177. PrÃ© vendas, modal corrigido

O modal de prÃ© vendas foi corrigido e deve ser preservado.

O histÃ³rico menciona problema de zoom no mobile ao editar prÃ© venda e ao clicar em voltar.

A correÃ§Ã£o do modal foi relevante porque o uso em campo depende de tela estÃ¡vel.

Cuidados futuros:

1. NÃ£o alterar inputs sem testar no iPhone.
2. NÃ£o alterar tamanho de fonte sem testar zoom.
3. NÃ£o alterar modal junto com outras mudanÃ§as.
4. NÃ£o alterar comportamento do botÃ£o voltar sem teste.
5. Testar abertura e fechamento no mobile.

## 178. PrÃ© vendas, botÃ£o â€œCopiar resumoâ€ removido

O botÃ£o â€œCopiar resumoâ€ foi removido por decisÃ£o de projeto.

Essa remoÃ§Ã£o deve ser respeitada.

NÃ£o recolocar esse botÃ£o sem nova autorizaÃ§Ã£o.

Se houver necessidade futura de copiar informaÃ§Ãµes, deve ser discutido antes, para nÃ£o voltar com uma funÃ§Ã£o que jÃ¡ foi descartada.

## 179. PrÃ© vendas, funcionalidades jÃ¡ discutidas e aprovadas como direÃ§Ã£o

AlÃ©m dos refinamentos implementados, hÃ¡ direÃ§Ãµes aprovadas ou discutidas para evoluÃ§Ã£o de PrÃ© vendas:

1. Mover convertidas para o final.
2. Dar cor diferente para convertidas.
3. Reduzir card de prÃ© venda convertida.
4. Permitir conversÃ£o para Delivery quando nÃ£o houver estoque.
5. Retornar para PrÃ© vendas apÃ³s salvar venda.
6. Remover ou reduzir o botÃ£o â€œConverterâ€ da listagem, conforme decisÃ£o de UX.
7. Melhorar reconhecimento de referÃªncia por voz.
8. Melhorar reconhecimento de forma de pagamento por voz.
9. Preservar fluxo Falar, Conferir, Salvar.

Esses pontos nÃ£o devem ser implementados todos juntos.

Cada um exige auditoria localizada.

## 180. Vendas, estado consolidado

O mÃ³dulo de Vendas Ã© estÃ¡vel.

Ele deve permitir lanÃ§amento real de venda, com cliente cadastrado ou cliente avulso.

Elementos importantes:

1. Cliente.
2. ReferÃªncia.
3. Itens adquiridos.
4. Quantidade.
5. Valor.
6. Forma de pagamento.
7. ConferÃªncia antes de salvar.
8. IntegraÃ§Ã£o com pagamentos e financeiro.
9. IntegraÃ§Ã£o com prÃ© venda, quando houver conversÃ£o.

O fluxo de venda Ã© central para o Mini ERP.

NÃ£o alterar Vendas sem teste completo.

## 181. Vendas, cliente avulso

O cliente avulso Ã© permitido.

Essa funÃ§Ã£o Ã© importante para venda rÃ¡pida sem cadastro prÃ©vio.

O sistema deve preservar o nome informado, mesmo sem cadastro completo.

NÃ£o obrigar cadastro antes da venda, salvo decisÃ£o futura muito bem justificada.

## 182. Vendas, conferÃªncia antes de salvar

O fluxo preferido Ã© sempre:

Falar.
Conferir.
Salvar.

Ou, em uso manual:

Preencher.
Conferir.
Salvar.

Essa conferÃªncia evita erro em cliente, referÃªncia, item, valor e pagamento.

NÃ£o remover etapa de conferÃªncia para â€œganhar velocidadeâ€ sem avaliar risco.

## 183. Vendas, reconhecimento por voz

O reconhecimento por voz foi trabalhado para acelerar o lanÃ§amento.

Frase padrÃ£o preferida:

cliente [nome], referÃªncia [texto], itens adquiridos [lista], forma de pagamento [pix, crÃ©dito, dÃ©bito, fiado ou em aberto]

O parser deve reconhecer:

1. Cliente.
2. ReferÃªncia.
3. Itens adquiridos.
4. Forma de pagamento.
5. Valor, quando informado.
6. Pix, mesmo quando reconhecido errado.
7. CrÃ©dito.
8. DÃ©bito.
9. Fiado.
10. Em aberto.

O reconhecimento por voz ainda deve ser refinado com cautela.

## 184. Vendas, reconhecimento de referÃªncia por voz

Regra correta jÃ¡ definida:

Quando a fala tiver â€œreferÃªnciaâ€, o sistema deve capturar tudo que vier depois dela atÃ© encontrar:

1. â€œitens adquiridosâ€.
2. â€œitensâ€.
3. â€œprodutoâ€.
4. â€œprodutosâ€.
5. â€œforma de pagamentoâ€.
6. â€œpagamentoâ€.
7. Fim da frase.

O parser nÃ£o deve cortar nÃºmero, bloco, apartamento, letra ou complemento.

Exemplos vÃ¡lidos:

1. referÃªncia EP 314 Sul.
2. referÃªncia 314 Sul.
3. referÃªncia 210 Norte.
4. referÃªncia 306 Norte.
5. referÃªncia 210 Sul Bloco A apto 102.
6. referÃªncia EC 306 Norte.
7. referÃªncia Escola Parque 210 Norte.
8. referÃªncia Paulo Freire.
9. referÃªncia SEB.
10. referÃªncia CHPP.

Essa regra vale como referÃªncia oficial para futuro refinamento.

## 185. Vendas, reconhecimento de Pix

O reconhecimento de voz pode transformar Pix em palavras erradas.

CorreÃ§Ãµes futuras aprovadas como direÃ§Ã£o:

1. â€œpicsâ€ deve virar Pix.
2. â€œpixxâ€ deve virar Pix.
3. â€œpics.â€ deve virar Pix.
4. Outras variaÃ§Ãµes reais podem ser adicionadas depois de teste.

NÃ£o salvar automaticamente pagamento errado.

Sempre preservar conferÃªncia.

## 186. Delivery, estado consolidado

O mÃ³dulo Delivery Ã© estÃ¡vel.

Ele apoia a rotina de entregas e deve funcionar bem no mobile.

Fluxo conhecido:

1. Nova Entrega.
2. Modal.
3. Cliente.
4. ReferÃªncia.
5. Itens.
6. Status.
7. Controle da entrega.
8. Uso em campo.

Delivery Ã© mÃ³dulo crÃ­tico para PWA.

O aplicativo instalado deve melhorar o acesso a esse mÃ³dulo, nÃ£o criar risco.

## 187. Delivery, funcionalidades aprovadas como direÃ§Ã£o

Funcionalidade discutida e aprovada como direÃ§Ã£o:

Converter prÃ© venda para Delivery quando nÃ£o houver estoque.

Essa funcionalidade faz sentido porque nem toda intenÃ§Ã£o de compra vira venda imediata.

Quando faltar produto, pode virar entrega futura.

Essa mudanÃ§a deve ser feita com cuidado, pois envolve PrÃ© vendas, Delivery e possivelmente Vendas.

NÃ£o implementar junto com mudanÃ§as de PWA.

## 188. CobranÃ§as, estado consolidado

O mÃ³dulo CobranÃ§as Ã© estÃ¡vel e crÃ­tico.

Ele permite controlar pagamentos em aberto e organizar cobranÃ§a de clientes.

Funcionalidades consolidadas no histÃ³rico:

1. MÃºltiplas pendÃªncias por cliente.
2. Mensagem final com marcaÃ§Ã£o visual.
3. Resumo de cobranÃ§as.
4. Controle de valores em aberto.
5. Apoio ao envio pelo WhatsApp.
6. Uso em campo.

CobranÃ§as nÃ£o deve ser alterado junto com mudanÃ§as de PWA, salvo necessidade comprovada.

## 189. CobranÃ§as, cuidados futuros

Antes de mexer em CobranÃ§as, preservar:

1. Cliente.
2. PendÃªncias mÃºltiplas.
3. Valor individual.
4. Valor total.
5. Mensagem.
6. Baixa de pagamento.
7. Resumo.
8. IntegraÃ§Ã£o financeira.
9. Supabase.
10. Mobile.

Erro em CobranÃ§as afeta diretamente recebimento.

## 190. Financeiro, estado consolidado

O Financeiro Ã© estÃ¡vel.

Ele deve acompanhar:

1. Vendas.
2. Pagamentos.
3. PendÃªncias.
4. Taxas.
5. Despesas.
6. Fornecedores.
7. Margem.
8. Resultado.
9. RelatÃ³rios.
10. Controle de caixa.

O mÃ³dulo financeiro deve ser preservado com cuidado.

NÃ£o alterar cÃ¡lculo financeiro sem validaÃ§Ã£o.

## 191. Financeiro, parÃ¢metros operacionais conhecidos

ParÃ¢metros financeiros citados no histÃ³rico:

1. Pix: 0%.
2. DÃ©bito: 1,09%.
3. CrÃ©dito 2x: 5,39%.
4. CrÃ©dito 3x: 6,12%.
5. CrÃ©dito 4x: 6,85%.
6. Link 1x: 4,99%.
7. Link 2x: 7,50%.
8. Link 3x: 9,20%.

HÃ¡ tambÃ©m uma referÃªncia operacional de margem por produto:

R$ 15,00 a R$ 20,00 de margem operacional como parÃ¢metro de decisÃ£o.

Esses dados devem ser conferidos no sistema antes de qualquer automatizaÃ§Ã£o nova.

## 192. RelatÃ³rios, estado consolidado

RelatÃ³rios Ã© funcionalidade estÃ¡vel.

Pode envolver:

1. Vendas.
2. Clientes.
3. Produtos.
4. Financeiro.
5. CobranÃ§as.
6. Delivery.
7. Despesas.
8. Pagamentos.
9. PerÃ­odos.
10. Totais.

No desktop, RelatÃ³rios pode permanecer mais completo.

No mobile, deve ser tratado como secundÃ¡rio em relaÃ§Ã£o Ã  operaÃ§Ã£o de campo.

## 193. Produtos, estado consolidado

Produtos Ã© funcionalidade estÃ¡vel.

O mÃ³dulo precisa manter a lista de produtos vendidos pela Queijos Serra da Canastra.

Produtos citados no histÃ³rico:

1. Minas PadrÃ£o.
2. Minas Frescal.
3. Meia cura zero lactose.
4. Mussarela palito.
5. Mussarela tranÃ§a.
6. Provolone desidratado com goiabada.
7. ParmesÃ£o.
8. Defumado.
9. RequeijÃ£o tradicional.
10. RequeijÃ£o de bÃºfala.
11. Doce de leite.
12. Goiabada.
13. Figo Ramy.
14. Salame.
15. CafÃ©.
16. Mel.
17. Kit quatro queijos.
18. Kit tranÃ§a.
19. Cocada cremosa.

NÃ£o misturar a lÃ³gica de produtos do Mini ERP com a lÃ³gica visual do CatÃ¡logo.

## 194. SincronizaÃ§Ã£o Supabase, estado consolidado

A sincronizaÃ§Ã£o com Supabase Ã© funcionalidade estÃ¡vel.

Ela Ã© Ã¡rea protegida.

NÃ£o alterar Supabase durante refinamentos comuns.

NÃ£o alterar estrutura do banco sem autorizaÃ§Ã£o.

NÃ£o alterar sincronizaÃ§Ã£o sem auditoria completa.

A sincronizaÃ§Ã£o deve ser conferida no DiagnÃ³stico do Sistema.

## 195. AtualizaÃ§Ã£o automÃ¡tica, estado consolidado

A atualizaÃ§Ã£o automÃ¡tica Ã© funcionalidade estÃ¡vel.

Ela estÃ¡ ligada a:

1. Versionamento.
2. version.json.
3. Service Worker.
4. Cache.
5. DiagnÃ³stico.
6. ProteÃ§Ã£o contra downgrade.
7. ProduÃ§Ã£o Vercel.
8. Futuro PWA.

NÃ£o alterar atualizaÃ§Ã£o automÃ¡tica durante refinamentos comuns.

Na frente PWA, essa parte deve ser auditada com cuidado antes de qualquer implementaÃ§Ã£o.

## 196. Deploy Vercel, estado consolidado

O deploy pela Vercel Ã© funcionalidade estÃ¡vel.

Projeto oficial:

mini-erp-canastra

DomÃ­nio oficial:

https://mini-erp-canastra.vercel.app

Caminho local oficial:

C:\Users\Delber\Mini-ERP\projeto

Deploy exige autorizaÃ§Ã£o explÃ­cita.

NÃ£o publicar sem build e validaÃ§Ã£o.

## 197. DiagnÃ³stico do Sistema, estado consolidado

O DiagnÃ³stico do Sistema Ã© funcionalidade crÃ­tica.

Ele deve mostrar:

1. Data.
2. VersÃ£o do aplicativo.
3. VersÃ£o publicada.
4. Maior versÃ£o aceita.
5. Status da versÃ£o.
6. Service Worker disponÃ­vel.
7. Service Worker controlando.
8. Online.
9. Ambiente.
10. URL.
11. Navegador.
12. Sistema.
13. Supabase.
14. Ãšltima atualizaÃ§Ã£o de dados.
15. Erro de sincronizaÃ§Ã£o.
16. Clientes carregados.
17. PrÃ© vendas carregadas.
18. CobranÃ§as carregadas.
19. Delivery carregados.

Esse mÃ³dulo deve continuar existindo no PWA.

Ele serÃ¡ indispensÃ¡vel para confirmar se o app instalado estÃ¡ usando a versÃ£o correta.

## 198. Barra inferior mobile, estado e cuidados

A barra inferior mobile Ã© importante para operaÃ§Ã£o em campo.

HistÃ³rico consolidado de ordem discutida:

1. Painel.
2. PrÃ© venda.
3. Vendas.
4. CobranÃ§as.
5. Outros itens conforme versÃ£o real do cÃ³digo.

Antes de alterar a barra inferior, Ã© obrigatÃ³rio auditar o trecho real no App.jsx.

NÃ£o assumir composiÃ§Ã£o pela memÃ³ria da conversa.

Mostrar o antes real.

SÃ³ depois alterar.

## 199. Mobile, refinamentos jÃ¡ tratados

O histÃ³rico do Mini ERP inclui preocupaÃ§Ã£o com mobile.

Pontos relevantes:

1. Evitar zoom indevido em campos.
2. Corrigir modal de prÃ© venda.
3. Preservar botÃµes principais.
4. Preservar barra inferior.
5. Manter leitura dos cards.
6. Garantir rolagem.
7. Garantir clique em botÃµes.
8. Testar em iPhone.
9. Testar em campo.
10. Preservar desktop.

A frente PWA deve melhorar fluidez mobile sem reescrever o sistema.

## 200. Funcionalidades aprovadas para evoluÃ§Ã£o futura

Funcionalidades aprovadas como direÃ§Ã£o, mas ainda dependentes de auditoria e autorizaÃ§Ã£o:

1. Transformar o Mini ERP em PWA instalÃ¡vel.
2. Manter desktop exatamente como estÃ¡.
3. NÃ£o criar novo projeto.
4. NÃ£o criar segunda base de cÃ³digo.
5. Usar mesmo domÃ­nio.
6. Usar mesmo Supabase.
7. Usar mesmo banco.
8. Usar mesmo deploy.
9. Criar experiÃªncia mais fluida no celular.
10. Ter Ã­cone na tela inicial.
11. Abrir em tela cheia.
12. Preservar DiagnÃ³stico do Sistema.
13. Preservar atualizaÃ§Ã£o automÃ¡tica.
14. Preservar proteÃ§Ã£o contra downgrade.
15. Criar backup antes da frente PWA.

## 201. Funcionalidades pendentes principais

PendÃªncias jÃ¡ discutidas ou naturais para a prÃ³xima fase:

1. Auditoria completa antes do PWA.
2. Backup antes do PWA.
3. Verificar existÃªncia de manifest.
4. Verificar existÃªncia de Ã­cones.
5. Verificar Service Worker atual.
6. Verificar cache atual.
7. Verificar headers no vercel.json.
8. Planejar installability.
9. Testar PWA em iPhone.
10. Testar PWA em Chrome mobile.
11. Testar atualizaÃ§Ã£o do app instalado.
12. Testar ausÃªncia de downgrade.
13. Documentar nova versÃ£o PWA.
14. Criar backup pÃ³s PWA estÃ¡vel.

## 202. PendÃªncias em PrÃ© vendas

PendÃªncias possÃ­veis em PrÃ© vendas:

1. Melhorar conversÃ£o para Delivery quando nÃ£o houver estoque.
2. Refinar comportamento de convertidas.
3. Melhorar diferenciaÃ§Ã£o visual de convertidas.
4. Reduzir card de convertidas.
5. Avaliar botÃ£o â€œConverterâ€ na listagem.
6. Preservar retorno para PrÃ© venda depois de salvar.
7. Melhorar reconhecimento de referÃªncia por voz.
8. Melhorar reconhecimento de forma de pagamento por voz.
9. Evitar zoom no mobile em qualquer campo novo.
10. Testar em iPhone apÃ³s cada ajuste.

Essas pendÃªncias nÃ£o devem ser feitas durante a primeira implementaÃ§Ã£o PWA.

## 203. PendÃªncias em reconhecimento por voz

PendÃªncias possÃ­veis:

1. Corrigir variaÃ§Ãµes de Pix.
2. Melhorar captura de referÃªncia.
3. Melhorar captura de forma de pagamento.
4. Melhorar captura de itens adquiridos.
5. Preservar cliente avulso.
6. Preservar conferÃªncia antes de salvar.
7. Testar frases reais de campo.
8. Evitar salvar informaÃ§Ã£o errada automaticamente.

Exemplo real esperado:

Cliente SÃ­lvio.
ReferÃªncia EP 314 Sul.
Itens: Grana Padano R$ 49,00 e Figo Ramy R$ 65,00.
Pagamento: Fiado ou Em aberto.

## 204. PendÃªncias em Delivery

PendÃªncias possÃ­veis:

1. ConversÃ£o de prÃ© venda para Delivery.
2. Melhor visualizaÃ§Ã£o mobile.
3. Melhor organizaÃ§Ã£o por status.
4. Teste em campo.
5. IntegraÃ§Ã£o segura com vendas e prÃ© vendas.

NÃ£o alterar Delivery junto com PWA inicial, salvo se a auditoria mostrar necessidade mÃ­nima.

## 205. PendÃªncias em CobranÃ§as

PendÃªncias possÃ­veis:

1. Melhorias de mensagem.
2. Melhorias de resumo.
3. Melhor filtro.
4. Melhor visual mobile.
5. Melhor integraÃ§Ã£o com pagamentos.

Essas pendÃªncias devem ser tratadas em frente prÃ³pria.

CobranÃ§as Ã© mÃ³dulo financeiro sensÃ­vel.

## 206. PendÃªncias em Financeiro

PendÃªncias possÃ­veis:

1. Refinar controle de taxas.
2. Refinar controle de frete.
3. Refinar margem por produto.
4. Melhorar relatÃ³rios.
5. Melhorar visÃ£o de despesas.
6. Melhorar separaÃ§Ã£o entre pago, fiado e em aberto.

NÃ£o mexer em cÃ¡lculo sem conferÃªncia.

## 207. PendÃªncias em PWA

PendÃªncias especÃ­ficas da frente PWA:

1. Confirmar se jÃ¡ existe manifest.
2. Criar ou ajustar manifest, se necessÃ¡rio.
3. Definir nome do aplicativo.
4. Definir nome curto.
5. Definir Ã­cones.
6. Definir cor de tema.
7. Definir modo de exibiÃ§Ã£o em tela cheia ou standalone.
8. Confirmar escopo do app.
9. Confirmar start_url.
10. Confirmar compatibilidade com Vercel.
11. Confirmar compatibilidade com Service Worker atual.
12. Confirmar estratÃ©gia de cache.
13. Confirmar que desktop nÃ£o muda.
14. Confirmar que mobile navegador continua funcionando.
15. Confirmar que app instalado abre corretamente.
16. Confirmar atualizaÃ§Ã£o automÃ¡tica.
17. Confirmar version.json.
18. Confirmar DiagnÃ³stico.
19. Confirmar rollback.
20. Criar backup final.

## 208. Nome do PWA

O nome do aplicativo ainda deve ser decidido antes da implementaÃ§Ã£o.

OpÃ§Ãµes possÃ­veis:

1. Mini ERP Canastra.
2. Mini ERP Queijos Canastra.
3. Queijos Serra da Canastra ERP.
4. Mini ERP.

Essa decisÃ£o deve ser feita antes de criar ou ajustar o manifest.

O nome deve ser curto, claro e reconhecÃ­vel na tela inicial do celular.

## 209. Ãcone do PWA

O Ã­cone do PWA ainda deve ser definido.

Ele deve ser simples, legÃ­vel e adequado para a tela inicial.

NÃ£o deve depender de detalhe pequeno demais.

NÃ£o deve poluir a identidade visual.

Deve funcionar em tamanhos diferentes.

Antes de implementar, definir se o Ã­cone serÃ¡:

1. Logo da Queijos Serra da Canastra.
2. Ãcone simples de queijo.
3. Ãcone com iniciais.
4. Ãcone especÃ­fico do Mini ERP.

A criaÃ§Ã£o do Ã­cone deve ser tratada como parte da frente PWA.

## 210. Tela cheia do PWA

Objetivo aprovado:

O PWA deve abrir em modo mais prÃ³ximo de aplicativo.

Isso significa reduzir distraÃ§Ãµes do navegador no celular.

O comportamento esperado Ã©:

1. Abrir pela tela inicial.
2. Usar o mesmo domÃ­nio.
3. Usar a mesma base.
4. Manter login ou estado conforme funcionamento atual.
5. Mostrar interface mobile.
6. Preservar diagnÃ³stico.
7. NÃ£o criar versÃ£o separada.

## 211. Desktop preservado

Essa Ã© uma regra absoluta.

O desktop deve permanecer exatamente como estÃ¡.

A frente PWA nÃ£o deve:

1. Alterar layout desktop.
2. Remover mÃ³dulos desktop.
3. Simplificar desktop por causa do mobile.
4. Criar telas separadas sem necessidade.
5. Mudar navegaÃ§Ã£o desktop.
6. Alterar relatÃ³rios desktop.
7. Alterar financeiro desktop.
8. Alterar fluxo administrativo.

Se algum ajuste global for inevitÃ¡vel para PWA, deve ser explicado e aprovado antes.

## 212. O que nÃ£o deve entrar na primeira implementaÃ§Ã£o PWA

A primeira implementaÃ§Ã£o PWA nÃ£o deve incluir:

1. Redesenho visual geral.
2. Nova arquitetura.
3. Novo banco.
4. Novo Supabase.
5. Novo domÃ­nio.
6. Novo projeto.
7. RefatoraÃ§Ã£o de mÃ³dulos.
8. AlteraÃ§Ã£o de financeiro.
9. AlteraÃ§Ã£o de cobranÃ§as.
10. AlteraÃ§Ã£o de vendas.
11. AlteraÃ§Ã£o de prÃ© vendas.
12. AlteraÃ§Ã£o de delivery.
13. Nova lÃ³gica offline complexa.
14. Push notification.
15. Login novo.
16. Reescrita do Service Worker sem necessidade comprovada.

A primeira etapa deve ser mÃ­nima e segura.

## 213. Funcionalidades que podem vir depois do PWA bÃ¡sico

Depois que o PWA bÃ¡sico estiver estÃ¡vel, podem ser avaliadas:

1. Melhorias especÃ­ficas de mobile.
2. Atalhos internos.
3. Tela inicial mobile mais operacional.
4. Melhorias em PrÃ© vendas.
5. Melhorias em Delivery.
6. Melhorias em CobranÃ§as.
7. OperaÃ§Ã£o offline mais robusta.
8. Alertas internos.
9. Melhorias no diagnÃ³stico.
10. Melhor experiÃªncia de atualizaÃ§Ã£o.

Essas melhorias devem ser feitas uma por vez.

## 214. Funcionalidades que precisam de mais cuidado

Exigem cautela mÃ¡xima:

1. OperaÃ§Ã£o offline.
2. SincronizaÃ§Ã£o posterior.
3. AlteraÃ§Ã£o de Service Worker.
4. AlteraÃ§Ã£o de cache.
5. AlteraÃ§Ã£o de banco.
6. AlteraÃ§Ã£o em Supabase.
7. AtualizaÃ§Ã£o automÃ¡tica.
8. Rollback.
9. PWA instalado.
10. Versionamento.

Essas Ã¡reas se relacionam diretamente com o histÃ³rico de downgrade.

## 215. OperaÃ§Ã£o offline, estado e direÃ§Ã£o

A operaÃ§Ã£o offline jÃ¡ foi discutida como objetivo futuro para:

1. PrÃ© vendas.
2. Delivery.
3. CobranÃ§as.

Mas ela nÃ£o deve ser misturada com o primeiro PWA.

PWA instalÃ¡vel nÃ£o significa automaticamente operaÃ§Ã£o offline segura.

Offline com sincronizaÃ§Ã£o Ã© uma frente prÃ³pria e mais complexa.

Antes de implementar offline, serÃ¡ necessÃ¡rio definir:

1. Quais dados podem ser salvos offline.
2. Como sincronizar depois.
3. Como evitar duplicidade.
4. Como resolver conflito.
5. Como indicar pendÃªncia de sincronizaÃ§Ã£o.
6. Como preservar Supabase.
7. Como diagnosticar falha.
8. Como testar em campo.
9. Como fazer rollback.
10. Como evitar perda de dados.

## 216. Recibos e comprovantes bonitos

Foi discutida a possibilidade de o app ajudar a gerar recibos e comprovantes de pagamento mais bonitos.

Essa possibilidade faz sentido como evoluÃ§Ã£o futura.

Mas nÃ£o deve entrar na primeira etapa PWA.

Primeiro, o app precisa ser instalÃ¡vel e estÃ¡vel.

Depois, pode ser criada uma frente especÃ­fica para:

1. Recibos.
2. Comprovantes de pagamento.
3. Layout de comprovante.
4. Compartilhamento pelo WhatsApp.
5. PDF ou imagem.
6. HistÃ³rico de comprovantes.
7. IntegraÃ§Ã£o com vendas.
8. IntegraÃ§Ã£o com pagamentos.

Essa frente deve ser planejada separadamente.

## 217. WhatsApp e mensagens

O Mini ERP tem relaÃ§Ã£o com mensagens enviadas ao cliente, principalmente em cobranÃ§as, pedidos, prÃ© vendas e registros.

PreferÃªncias consolidadas de comunicaÃ§Ã£o:

1. Texto direto.
2. Tom profissional.
3. Sem excesso de formalidade.
4. Sem parecer desesperado para vender.
5. Linguagem prÃ³xima e clara.
6. Evitar â€œfico no aguardoâ€.
7. Evitar agradecimentos genÃ©ricos demais.
8. Preferir mensagens curtas.
9. Manter primeira pessoa quando fizer sentido.
10. NÃ£o encher a mensagem com informaÃ§Ã£o desnecessÃ¡ria.

Essas preferÃªncias devem ser respeitadas em futuras mensagens geradas pelo sistema.

## 218. Chave Pix e pagamentos

O botÃ£o preferido Ã©:

Copiar Chave Pix

Essa preferÃªncia deve ser preservada.

NÃ£o trocar para texto mais longo sem necessidade.

Em mensagens ao cliente, evitar excesso de detalhes.

Manter clareza sobre valor, forma de pagamento e chave Pix quando aplicÃ¡vel.

## 219. Produtos e registro de compras

O usuÃ¡rio costuma gerar registros de compras para clientes com:

1. Nome do cliente.
2. ReferÃªncia.
3. Itens adquiridos.
4. Valor.
5. Forma de pagamento.
6. Chave Pix, quando necessÃ¡rio.
7. ObservaÃ§Ã£o de pagamento em aberto, quando aplicÃ¡vel.

O Mini ERP deve continuar apoiando essa lÃ³gica.

NÃ£o complicar o registro com campos desnecessÃ¡rios.

## 220. Funcionalidades jÃ¡ descartadas ou removidas

Funcionalidade removida por decisÃ£o de projeto:

1. BotÃ£o â€œCopiar resumoâ€ em PrÃ© vendas.

Essa remoÃ§Ã£o deve ser respeitada.

NÃ£o reintroduzir sem nova anÃ¡lise.

TambÃ©m deve haver cautela com qualquer recurso que gere excesso de botÃµes ou poluiÃ§Ã£o no mobile.

## 221. CritÃ©rio para aprovar nova funcionalidade

Uma nova funcionalidade sÃ³ deve ser aprovada quando responder claramente:

1. Qual problema real resolve?
2. Em qual mÃ³dulo entra?
3. Ã‰ para desktop, mobile ou ambos?
4. Afeta dados?
5. Afeta Supabase?
6. Afeta Service Worker?
7. Afeta cache?
8. Afeta versionamento?
9. Afeta mÃ³dulos estÃ¡veis?
10. Qual o teste?
11. Qual o risco?
12. Qual o rollback?

Sem essas respostas, a funcionalidade deve ficar em discussÃ£o, nÃ£o em implementaÃ§Ã£o.

## 222. CritÃ©rio para recusar ou adiar funcionalidade

Uma funcionalidade deve ser recusada ou adiada quando:

1. NÃ£o resolve problema operacional claro.
2. Complica o uso em campo.
3. Aumenta risco de downgrade.
4. Exige mexer em Service Worker sem necessidade.
5. Exige mexer em cache sem necessidade.
6. Afeta desktop indevidamente.
7. Mistura vÃ¡rias mudanÃ§as.
8. NÃ£o tem teste claro.
9. NÃ£o tem rollback claro.
10. Pode ser feita depois sem prejuÃ­zo.

## 223. Ordem recomendada das prÃ³ximas aÃ§Ãµes

A ordem segura Ã©:

1. Concluir este manual.
2. Salvar o manual na pasta oficial.
3. Criar backup limpo antes do PWA.
4. Pedir auditoria PWA ao Codex.
5. Confirmar arquivos de PWA existentes ou ausentes.
6. Confirmar Service Worker e cache.
7. Planejar implementaÃ§Ã£o mÃ­nima.
8. Autorizar primeira etapa PWA, se estiver seguro.
9. Rodar build.
10. Testar local.
11. Publicar somente com autorizaÃ§Ã£o.
12. Validar produÃ§Ã£o.
13. Testar desktop.
14. Testar mobile.
15. Testar iPhone.
16. Testar app instalado.
17. Criar backup pÃ³s validaÃ§Ã£o.

## 224. O que nÃ£o fazer agora

Neste momento, nÃ£o fazer:

1. CÃ³digo.
2. Deploy.
3. Novo projeto chamado Aplicativo.
4. Segunda base de cÃ³digo.
5. Novo Supabase.
6. Novo banco.
7. Nova arquitetura.
8. AlteraÃ§Ã£o de Service Worker.
9. AlteraÃ§Ã£o de cache.
10. AlteraÃ§Ã£o de versionamento.
11. RefatoraÃ§Ã£o.
12. PWA sem auditoria.

O momento atual Ã© de documentaÃ§Ã£o e preparaÃ§Ã£o.

## 225. ConclusÃ£o operacional da Parte 5

O Mini ERP jÃ¡ possui uma base estÃ¡vel e funcional.

Os principais mÃ³dulos estÃ£o consolidados.

PrÃ© vendas recebeu refinamentos importantes e deve ser protegida.

Vendas, Delivery, CobranÃ§as, Financeiro, RelatÃ³rios, Clientes, Produtos, Supabase e atualizaÃ§Ã£o automÃ¡tica estÃ£o na base estÃ¡vel.

A prÃ³xima frente aprovada Ã© transformar o Mini ERP em PWA instalÃ¡vel, mantendo o desktop exatamente como estÃ¡.

Essa frente deve comeÃ§ar por auditoria e backup, nÃ£o por cÃ³digo.

A prÃ³xima parte do manual deve registrar riscos conhecidos, pontos intocÃ¡veis, sintomas de erro e critÃ©rios de decisÃ£o.
# MANUAL OFICIAL MINI ERP PWA

## Parte 6: Riscos conhecidos, pontos intocÃ¡veis, sintomas de erro e critÃ©rios de decisÃ£o

## 226. Objetivo desta parte

Esta parte registra os riscos conhecidos do Mini ERP, os pontos que nÃ£o podem ser alterados sem autorizaÃ§Ã£o, os sintomas que indicam problema e os critÃ©rios para decidir entre investigar, corrigir, publicar, adiar ou fazer rollback.

O Mini ERP estÃ¡ em produÃ§Ã£o.

Ele Ã© usado diariamente em campo.

Por isso, qualquer decisÃ£o tÃ©cnica deve proteger a estabilidade antes de buscar melhoria.

## 227. Regra central de risco

No Mini ERP, o maior risco nÃ£o Ã© deixar de implementar uma melhoria.

O maior risco Ã© quebrar uma operaÃ§Ã£o que jÃ¡ funciona.

A prioridade correta Ã©:

1. Preservar a versÃ£o estÃ¡vel.
2. Preservar os dados.
3. Preservar o desktop.
4. Preservar o mobile.
5. Preservar Supabase.
6. Preservar atualizaÃ§Ã£o automÃ¡tica.
7. Evitar downgrade.
8. Evitar regressÃµes.
9. Implementar melhorias somente com controle.

## 228. Risco principal do projeto

O risco principal do Mini ERP Ã© repetir o incidente de downgrade.

O downgrade foi grave porque uma versÃ£o antiga voltou a aparecer em determinados ambientes, mesmo apÃ³s publicaÃ§Ã£o e validaÃ§Ã£o de versÃ£o nova.

Esse histÃ³rico obriga cautela especial com:

1. Service Worker.
2. Cache.
3. Versionamento.
4. AtualizaÃ§Ã£o automÃ¡tica.
5. Deploy.
6. Vercel.
7. Arquivos pÃºblicos.
8. App instalado.
9. PWA.
10. Navegadores mobile.

## 229. Riscos estruturais conhecidos

Riscos estruturais do projeto:

1. Publicar a partir da pasta errada.
2. Misturar Mini ERP com CatÃ¡logo.
3. Usar ZIP antigo como base.
4. Publicar projeto Vercel errado.
5. Deixar version.json diferente da versÃ£o interna.
6. Alterar Service Worker sem auditoria.
7. Alterar cache sem auditoria.
8. Alterar Supabase sem autorizaÃ§Ã£o.
9. Alterar banco sem autorizaÃ§Ã£o.
10. Fazer refatoraÃ§Ã£o ampla sem necessidade.
11. Criar segunda base de cÃ³digo.
12. Criar novo projeto chamado Aplicativo.
13. Transformar PWA em sistema separado.
14. Quebrar desktop ao tentar melhorar mobile.
15. Quebrar mobile ao ajustar desktop.

## 230. Riscos operacionais conhecidos

Riscos operacionais:

1. Perder prÃ© vendas.
2. Registrar venda em fluxo errado.
3. Apagar cobranÃ§a por engano.
4. Duplicar registro.
5. Salvar cliente incorreto.
6. Cortar referÃªncia do cliente.
7. Registrar forma de pagamento errada.
8. Gerar valor total incorreto.
9. Perder controle de pagamento em aberto.
10. Confundir venda com delivery.
11. Confundir prÃ© venda com venda efetivada.
12. Falhar em campo por causa de mobile ruim.
13. Ficar sem acesso durante entrega.
14. Trabalhar em versÃ£o antiga sem perceber.
15. Fazer deploy no meio da operaÃ§Ã£o sem necessidade.

## 231. Riscos de dados

Os dados do Mini ERP sÃ£o parte central da operaÃ§Ã£o.

Riscos de dados:

1. Perda de registros.
2. Duplicidade.
3. InconsistÃªncia entre tela e Supabase.
4. Salvamento parcial.
5. Falha de sincronizaÃ§Ã£o.
6. AlteraÃ§Ã£o de estrutura de banco sem migraÃ§Ã£o.
7. ExclusÃ£o acidental.
8. ConversÃ£o incorreta de prÃ© venda.
9. Baixa incorreta de cobranÃ§a.
10. Forma de pagamento incorreta.
11. ReferÃªncia incorreta.
12. Cliente avulso perdido.
13. HistÃ³rico incompleto.

Qualquer alteraÃ§Ã£o que toque dados precisa ser tratada como sensÃ­vel.

## 232. Riscos de Supabase

Supabase Ã© Ã¡rea protegida.

Riscos relacionados:

1. Alterar tabela sem autorizaÃ§Ã£o.
2. Alterar coluna sem revisar cÃ³digo.
3. Alterar polÃ­tica de acesso sem teste.
4. Alterar consulta usada por mÃ³dulo estÃ¡vel.
5. Quebrar sincronizaÃ§Ã£o.
6. Quebrar carregamento de clientes.
7. Quebrar carregamento de prÃ© vendas.
8. Quebrar carregamento de cobranÃ§as.
9. Quebrar carregamento de delivery.
10. Criar conflito entre dados locais e remotos.
11. Tratar erro de rede como erro de banco.
12. Fazer mudanÃ§a sem backup.

Nenhuma mudanÃ§a em Supabase deve ocorrer durante refinamento comum.

## 233. Riscos de Service Worker

Service Worker Ã© uma das Ã¡reas mais sensÃ­veis do Mini ERP.

Riscos:

1. Manter versÃ£o antiga em cache.
2. Controlar a pÃ¡gina com lÃ³gica antiga.
3. Servir HTML antigo.
4. Servir JavaScript antigo.
5. Servir CSS antigo.
6. Impedir atualizaÃ§Ã£o automÃ¡tica.
7. Criar loop de atualizaÃ§Ã£o.
8. Interferir no app instalado.
9. DiferenÃ§a entre navegador e PWA.
10. DiferenÃ§a entre desktop e mobile.
11. DiferenÃ§a entre Wi Fi e 4G.
12. Dificultar rollback.
13. Registrar arquivo errado.
14. Manter dois Service Workers sem clareza.
15. Apagar Service Worker necessÃ¡rio sem prova.

Service Worker nunca deve ser alterado sem auditoria completa.

## 234. Riscos de cache

Cache pode melhorar velocidade, mas pode quebrar confianÃ§a.

Riscos:

1. Cachear index.html indevidamente.
2. Cachear version.json indevidamente.
3. Cachear assets crÃ­ticos sem renovaÃ§Ã£o.
4. Manter tela antiga apÃ³s deploy.
5. Manter mÃ³dulo antigo.
6. Esconder atualizaÃ§Ã£o.
7. Fazer o usuÃ¡rio acreditar que estÃ¡ na versÃ£o nova quando nÃ£o estÃ¡.
8. Afetar apenas alguns dispositivos.
9. Afetar apenas iPhone.
10. Afetar apenas app instalado.
11. Afetar apenas campo.
12. Dificultar diagnÃ³stico.

Cache deve ser tratado como Ã¡rea protegida.

## 235. Riscos de versionamento

Versionamento precisa ser coerente.

Riscos:

1. public/version.json com versÃ£o diferente da versÃ£o interna.
2. App.jsx com versÃ£o antiga.
3. main.jsx com referÃªncia antiga.
4. dist/version.json divergente, quando existir.
5. Maior versÃ£o aceita incorreta.
6. DiagnÃ³stico mostrando versÃ£o errada.
7. AtualizaÃ§Ã£o automÃ¡tica comparando versÃµes incorretas.
8. Deploy novo com versÃ£o antiga.
9. Rollback com versÃ£o mal identificada.
10. Backup sem versÃ£o clara.

NÃ£o alterar versÃ£o sem autorizaÃ§Ã£o e sem objetivo claro.

## 236. Riscos de deploy

Deploy Ã© aÃ§Ã£o sensÃ­vel.

Riscos:

1. Publicar pasta errada.
2. Publicar CatÃ¡logo no lugar do Mini ERP.
3. Publicar Mini ERP no projeto errado.
4. Publicar sem build.
5. Publicar sem teste local.
6. Publicar sem autorizaÃ§Ã£o.
7. Publicar com Service Worker alterado sem saber.
8. Publicar com version.json errado.
9. Publicar sem conferir domÃ­nio oficial.
10. Publicar sem conferir alias da Vercel.
11. Publicar sem conferir produÃ§Ã£o.
12. Publicar sem backup.
13. Publicar em horÃ¡rio ruim para a operaÃ§Ã£o.
14. Publicar vÃ¡rias mudanÃ§as juntas.

Deploy sÃ³ deve acontecer com ritual completo.

## 237. Riscos de rollback

Rollback tambÃ©m tem risco.

Riscos:

1. Voltar para backup errado.
2. Misturar arquivos de versÃµes diferentes.
3. Voltar cÃ³digo, mas manter Service Worker novo.
4. Voltar cÃ³digo, mas manter cache antigo.
5. Perder refinamento vÃ¡lido.
6. Reintroduzir bug antigo.
7. Publicar rollback sem testar.
8. NÃ£o conferir version.json apÃ³s rollback.
9. NÃ£o documentar motivo.
10. NÃ£o confirmar Supabase.

Rollback deve usar versÃ£o estÃ¡vel conhecida.

## 238. Riscos da frente PWA

A frente PWA tem risco especial porque envolve instalaÃ§Ã£o e cache.

Riscos:

1. App instalado carregar versÃ£o antiga.
2. App instalado nÃ£o atualizar.
3. App instalado abrir tela branca.
4. App instalado nÃ£o mostrar diagnÃ³stico.
5. App instalado se comportar diferente do navegador.
6. Service Worker prender versÃ£o antiga.
7. Cache prender HTML antigo.
8. Manifest mal configurado.
9. Ãcone errado ou ausente.
10. start_url errado.
11. scope errado.
12. Desktop ser alterado sem necessidade.
13. Mobile navegador quebrar.
14. Criar segunda base de cÃ³digo.
15. Criar outro projeto por engano.
16. Confundir PWA com app nativo.
17. Misturar PWA com operaÃ§Ã£o offline complexa cedo demais.

A primeira etapa PWA deve ser mÃ­nima e segura.

## 239. Riscos de desktop

Desktop deve permanecer exatamente como estÃ¡ na frente PWA.

Riscos:

1. Alterar layout desktop por causa do mobile.
2. Remover informaÃ§Ã£o administrativa.
3. Simplificar demais relatÃ³rios.
4. Quebrar navegaÃ§Ã£o principal.
5. Alterar largura de telas.
6. Alterar estilos globais sem teste.
7. Afetar tabelas.
8. Afetar modais.
9. Afetar financeiro.
10. Afetar relatÃ³rios.

Desktop Ã© Ã¡rea de conferÃªncia e administraÃ§Ã£o.

NÃ£o deve ser sacrificado pela experiÃªncia mobile.

## 240. Riscos de mobile

Mobile Ã© Ã¡rea de operaÃ§Ã£o em campo.

Riscos:

1. BotÃµes pequenos.
2. Modal cortado.
3. Tela dando zoom indevido.
4. Teclado atrapalhando.
5. Rolagem travada.
6. Barra inferior errada.
7. BotÃ£o principal escondido.
8. Card grande demais.
9. Texto pequeno demais.
10. Campo difÃ­cil de tocar.
11. Uso ruim no iPhone.
12. Uso ruim em 4G.
13. Perda de fluidez.
14. App instalado com comportamento diferente do navegador.

Toda mudanÃ§a visual precisa ser testada no mobile.

## 241. Riscos em PrÃ© vendas

PrÃ© vendas Ã© mÃ³dulo crÃ­tico.

Riscos:

1. Perder registro.
2. Excluir sem confirmaÃ§Ã£o.
3. Quebrar paginaÃ§Ã£o.
4. Quebrar filtro por data.
5. Quebrar resumo por data.
6. Quebrar conferÃªncia consolidada.
7. Esconder referÃªncia.
8. Esconder horÃ¡rio.
9. Esconder quantidade.
10. Esconder forma de pagamento.
11. Calcular total errado.
12. Quebrar modal.
13. Trazer de volta botÃ£o removido sem decisÃ£o.
14. Quebrar mobile.
15. Quebrar conversÃ£o para venda.
16. Quebrar futura conversÃ£o para delivery.

PrÃ© vendas deve ser testado em qualquer alteraÃ§Ã£o relevante.

## 242. Riscos em Vendas

Riscos:

1. Cliente avulso deixar de funcionar.
2. Cliente cadastrado nÃ£o carregar.
3. Item nÃ£o ser salvo.
4. Quantidade errada.
5. Valor errado.
6. Forma de pagamento errada.
7. Venda em aberto salva como paga.
8. Venda paga salva como aberta.
9. ConferÃªncia antes de salvar removida.
10. Retorno para PrÃ© vendas quebrado.
11. IntegraÃ§Ã£o com financeiro quebrada.
12. IntegraÃ§Ã£o com pagamentos quebrada.

Vendas deve ser tratado como mÃ³dulo central.

## 243. Riscos em CobranÃ§as

Riscos:

1. PendÃªncias sumirem.
2. PendÃªncias duplicarem.
3. Cliente com mÃºltiplas pendÃªncias calcular errado.
4. Valor em aberto incorreto.
5. Mensagem para WhatsApp errada.
6. Baixa de pagamento incorreta.
7. CobranÃ§a desaparecer sem pagamento.
8. Resumo incorreto.
9. IntegraÃ§Ã£o financeira quebrada.
10. Erro no mobile durante cobranÃ§a em campo.

CobranÃ§as impacta diretamente recebimento.

## 244. Riscos em Delivery

Riscos:

1. Entrega nÃ£o aparecer.
2. Nova Entrega nÃ£o abrir.
3. Modal quebrar.
4. Cliente nÃ£o carregar.
5. ReferÃªncia sumir.
6. Itens sumirem.
7. Status errado.
8. Entrega finalizada por engano.
9. IntegraÃ§Ã£o com prÃ© venda quebrada.
10. Uso em campo prejudicado.

Delivery deve ser testado no mobile.

## 245. Riscos em Financeiro

Riscos:

1. Taxa incorreta.
2. Total incorreto.
3. Despesa nÃ£o computada.
4. Fornecedor incorreto.
5. Margem errada.
6. Pagamento duplicado.
7. Pagamento em aberto nÃ£o aparecer.
8. RelatÃ³rio divergente.
9. Venda nÃ£o refletir no financeiro.
10. Baixa de cobranÃ§a nÃ£o refletir.

Financeiro nÃ£o deve ser alterado sem conferÃªncia de cÃ¡lculo.

## 246. Riscos em RelatÃ³rios

Riscos:

1. PerÃ­odo errado.
2. Total errado.
3. Dado ausente.
4. Filtro errado.
5. RelatÃ³rio carregando lento.
6. RelatÃ³rio quebrado no desktop.
7. RelatÃ³rio inÃºtil no mobile.
8. DivergÃªncia com Financeiro.
9. DivergÃªncia com Vendas.
10. DivergÃªncia com CobranÃ§as.

RelatÃ³rios devem ser preservados no desktop.

## 247. Pontos intocÃ¡veis sem autorizaÃ§Ã£o explÃ­cita

NÃ£o alterar sem autorizaÃ§Ã£o explÃ­cita:

1. Service Worker.
2. Cache.
3. Versionamento.
4. AtualizaÃ§Ã£o automÃ¡tica.
5. Supabase.
6. Estrutura do banco.
7. SincronizaÃ§Ã£o.
8. Deploy.
9. vercel.json.
10. Arquitetura geral.
11. Projeto Vercel.
12. DomÃ­nio oficial.
13. Pasta oficial.
14. Fluxo de rollback.
15. Dados persistidos.
16. MÃ³dulos nÃ£o relacionados ao pedido.
17. Desktop durante frente PWA.
18. LÃ³gica de diagnÃ³stico.
19. PublicaÃ§Ã£o em produÃ§Ã£o.
20. Backups histÃ³ricos.

## 248. Pontos que exigem auditoria antes de qualquer mudanÃ§a

Exigem auditoria:

1. public/sw.js.
2. public/service-worker.js.
3. public/version.json.
4. src/App.jsx.
5. src/main.jsx.
6. vercel.json.
7. package.json.
8. package-lock.json.
9. Arquivos de Supabase.
10. Pasta sql.
11. Manifest PWA, se existir.
12. Ãcones PWA, se existirem.
13. CÃ³digo de atualizaÃ§Ã£o automÃ¡tica.
14. CÃ³digo de diagnÃ³stico.
15. CÃ³digo de sincronizaÃ§Ã£o.

## 249. Sinais de alerta imediato

Sinais de alerta:

1. Tela branca.
2. PrÃ© vendas sumiram.
3. DiagnÃ³stico sumiu.
4. VersÃ£o do aplicativo diferente da versÃ£o publicada.
5. Status da versÃ£o nÃ£o estÃ¡ OK.
6. Service Worker controlando com versÃ£o errada.
7. Dados nÃ£o carregam.
8. Supabase mostra erro.
9. Mobile abre diferente do desktop sem motivo.
10. iPhone abre versÃ£o antiga.
11. Campo dÃ¡ zoom indevido.
12. BotÃ£o principal desaparece.
13. CobranÃ§as somem.
14. Delivery some.
15. Venda nÃ£o salva.
16. AtualizaÃ§Ã£o fica em loop.
17. App instalado nÃ£o atualiza.
18. version.json online mostra versÃ£o inesperada.
19. DomÃ­nio oficial aponta para deploy errado.
20. Build passa, mas produÃ§Ã£o quebra.

## 250. Sintoma: tela branca

Tela branca Ã© incidente crÃ­tico.

PossÃ­veis causas:

1. Erro de JavaScript.
2. Build com problema.
3. Asset nÃ£o carregado.
4. Cache antigo.
5. Service Worker servindo arquivo errado.
6. Caminho incorreto.
7. Deploy incompleto.
8. ConfiguraÃ§Ã£o incorreta na Vercel.
9. Erro em importaÃ§Ã£o.
10. MudanÃ§a global quebrada.

AÃ§Ã£o correta:

1. NÃ£o fazer nova mudanÃ§a no impulso.
2. Conferir console.
3. Conferir version.json.
4. Conferir build.
5. Conferir Service Worker.
6. Conferir domÃ­nio oficial.
7. Avaliar rollback se o sistema estiver inutilizÃ¡vel.

## 251. Sintoma: versÃ£o antiga aparece

PossÃ­veis causas:

1. Downgrade real.
2. Cache local.
3. Cache intermediÃ¡rio.
4. Service Worker antigo.
5. Deploy errado.
6. Alias errado.
7. version.json divergente.
8. Pasta errada publicada.
9. Projeto Vercel errado.
10. App instalado preso em versÃ£o antiga.

AÃ§Ã£o correta:

1. Abrir DiagnÃ³stico.
2. Conferir versÃ£o do aplicativo.
3. Conferir versÃ£o publicada.
4. Conferir maior versÃ£o aceita.
5. Conferir status da versÃ£o.
6. Conferir version.json online.
7. Conferir Service Worker.
8. Conferir domÃ­nio.
9. Conferir desktop.
10. Conferir mobile.
11. Conferir iPhone.
12. NÃ£o mexer em mÃ³dulos funcionais atÃ© entender.

## 252. Sintoma: PrÃ© vendas somem

PossÃ­veis causas:

1. VersÃ£o antiga carregada.
2. Erro no mÃ³dulo.
3. Erro em Supabase.
4. Erro de filtro.
5. Erro de data.
6. Erro de paginaÃ§Ã£o.
7. Erro visual.
8. Problema de permissÃ£o.
9. Dados nÃ£o carregados.
10. Cache antigo.

AÃ§Ã£o correta:

1. Suspeitar primeiro de downgrade se o DiagnÃ³stico tambÃ©m sumiu.
2. Conferir versÃ£o.
3. Conferir Supabase.
4. Conferir filtro por data.
5. Conferir paginaÃ§Ã£o.
6. Conferir console.
7. NÃ£o refazer mÃ³dulo.
8. Corrigir somente apÃ³s localizar causa.

## 253. Sintoma: DiagnÃ³stico some

Se o DiagnÃ³stico do Sistema desaparece, hÃ¡ forte suspeita de versÃ£o antiga ou quebra sÃ©ria.

AÃ§Ã£o correta:

1. Conferir version.json online.
2. Conferir domÃ­nio.
3. Conferir se PrÃ© vendas tambÃ©m sumiu.
4. Conferir navegador.
5. Conferir Service Worker.
6. Conferir cache.
7. Conferir deploy.
8. NÃ£o iniciar refinamento.
9. Tratar como incidente de versÃ£o.

## 254. Sintoma: Supabase nÃ£o carrega

PossÃ­veis causas:

1. Rede.
2. Erro de conexÃ£o.
3. Chave ou configuraÃ§Ã£o.
4. PolÃ­tica de acesso.
5. Tabela alterada.
6. Consulta quebrada.
7. Erro de sincronizaÃ§Ã£o.
8. VersÃ£o antiga.
9. Falha temporÃ¡ria.
10. Dados inconsistentes.

AÃ§Ã£o correta:

1. Conferir DiagnÃ³stico.
2. Conferir erro de sincronizaÃ§Ã£o.
3. Conferir se a versÃ£o estÃ¡ correta.
4. Conferir se outros mÃ³dulos carregam.
5. Conferir rede.
6. NÃ£o alterar banco sem autorizaÃ§Ã£o.
7. NÃ£o alterar Supabase sem auditoria.

## 255. Sintoma: mobile dÃ¡ zoom indevido

PossÃ­veis causas:

1. Input com fonte pequena.
2. Modal alterado.
3. Campo novo sem ajuste mobile.
4. CSS global alterado.
5. Comportamento especÃ­fico do iPhone.
6. Foco automÃ¡tico em campo.
7. Tamanho de viewport inadequado.

AÃ§Ã£o correta:

1. Localizar campo exato.
2. Testar no iPhone.
3. Corrigir somente CSS ou componente afetado.
4. NÃ£o alterar mÃ³dulo inteiro.
5. Conferir desktop depois.

## 256. Sintoma: botÃ£o desaparece no mobile

PossÃ­veis causas:

1. CSS responsivo.
2. Overflow.
3. Modal cortado.
4. Barra inferior sobrepondo conteÃºdo.
5. CondiÃ§Ã£o de renderizaÃ§Ã£o.
6. MudanÃ§a em layout global.
7. Tela pequena nÃ£o testada.

AÃ§Ã£o correta:

1. Identificar mÃ³dulo.
2. Localizar botÃ£o.
3. Conferir CSS mobile.
4. Testar rolagem.
5. Corrigir de forma localizada.
6. Conferir desktop.

## 257. Sintoma: venda nÃ£o salva

PossÃ­veis causas:

1. Erro em formulÃ¡rio.
2. Erro de validaÃ§Ã£o.
3. Erro de Supabase.
4. Cliente nÃ£o definido.
5. Item nÃ£o definido.
6. Forma de pagamento invÃ¡lida.
7. Valor invÃ¡lido.
8. Falha de rede.
9. MudanÃ§a recente no mÃ³dulo.
10. VersÃ£o antiga.

AÃ§Ã£o correta:

1. Conferir dados preenchidos.
2. Conferir console.
3. Conferir DiagnÃ³stico.
4. Conferir Supabase.
5. Testar venda simples.
6. Testar cliente avulso.
7. Testar cliente cadastrado.
8. NÃ£o alterar financeiro sem prova.

## 258. Sintoma: cobranÃ§a errada

PossÃ­veis causas:

1. PendÃªncia duplicada.
2. Valor incorreto.
3. Baixa incorreta.
4. Cliente errado.
5. Mensagem gerada errada.
6. Erro de filtro.
7. Erro em integraÃ§Ã£o com pagamentos.
8. Erro em Supabase.
9. MudanÃ§a recente no mÃ³dulo.

AÃ§Ã£o correta:

1. Conferir cliente.
2. Conferir pendÃªncias.
3. Conferir valor original.
4. Conferir valor total.
5. Conferir baixa.
6. Conferir Supabase.
7. NÃ£o publicar correÃ§Ã£o sem teste em cliente com mÃºltiplas pendÃªncias.

## 259. Sintoma: app instalado nÃ£o atualiza

PossÃ­veis causas:

1. Service Worker prendendo versÃ£o.
2. Cache segurando arquivos.
3. Manifest com start_url inadequado.
4. version.json cacheado.
5. App instalado usando escopo errado.
6. Navegador mantendo estado antigo.
7. AtualizaÃ§Ã£o automÃ¡tica incompatÃ­vel.
8. Deploy nÃ£o associado ao domÃ­nio oficial.

AÃ§Ã£o correta:

1. Conferir DiagnÃ³stico dentro do app instalado.
2. Conferir version.json online.
3. Conferir Service Worker.
4. Conferir cache.
5. Conferir domÃ­nio.
6. Conferir navegador normal.
7. Conferir desktop.
8. NÃ£o mexer em mÃ³dulos funcionais.

## 260. Sintoma: desktop muda apÃ³s PWA

Isso nÃ£o deve acontecer.

PossÃ­veis causas:

1. CSS global alterado.
2. Layout responsivo mal isolado.
3. MudanÃ§a em App.jsx sem proteÃ§Ã£o.
4. AlteraÃ§Ã£o de navegaÃ§Ã£o.
5. AlteraÃ§Ã£o visual ampla.
6. RefatoraÃ§Ã£o desnecessÃ¡ria.

AÃ§Ã£o correta:

1. Comparar desktop antes e depois.
2. Identificar arquivo alterado.
3. Reverter alteraÃ§Ã£o visual que afetou desktop.
4. Manter PWA no mÃ­nimo necessÃ¡rio.
5. NÃ£o aceitar PWA que prejudique desktop.

## 261. CritÃ©rio para investigar antes de corrigir

Investigar antes de corrigir quando:

1. A causa nÃ£o estÃ¡ clara.
2. O problema envolve versÃ£o.
3. O problema envolve Service Worker.
4. O problema envolve cache.
5. O problema envolve Supabase.
6. O problema envolve produÃ§Ã£o.
7. O problema aparece sÃ³ em alguns dispositivos.
8. O problema aparece sÃ³ em campo.
9. O problema pode ser downgrade.
10. O problema envolve perda de dados.

Nesses casos, agir rÃ¡pido demais aumenta risco.

## 262. CritÃ©rio para correÃ§Ã£o localizada

CorreÃ§Ã£o localizada Ã© adequada quando:

1. O problema estÃ¡ em um trecho claro.
2. O mÃ³dulo afetado foi identificado.
3. A mudanÃ§a nÃ£o toca Ã¡reas protegidas.
4. A mudanÃ§a nÃ£o altera arquitetura.
5. A mudanÃ§a nÃ£o altera banco.
6. A mudanÃ§a nÃ£o altera Service Worker.
7. A mudanÃ§a nÃ£o altera cache.
8. A mudanÃ§a tem teste simples.
9. O rollback Ã© fÃ¡cil.
10. O risco Ã© baixo.

## 263. CritÃ©rio para auditoria completa

Auditoria completa Ã© obrigatÃ³ria quando:

1. HÃ¡ suspeita de downgrade.
2. HÃ¡ tela branca.
3. HÃ¡ problema em produÃ§Ã£o sem causa clara.
4. HÃ¡ alteraÃ§Ã£o em Service Worker.
5. HÃ¡ alteraÃ§Ã£o em cache.
6. HÃ¡ alteraÃ§Ã£o em versionamento.
7. HÃ¡ alteraÃ§Ã£o em Supabase.
8. HÃ¡ alteraÃ§Ã£o em banco.
9. HÃ¡ inÃ­cio de frente PWA.
10. HÃ¡ mudanÃ§a de arquitetura.
11. HÃ¡ sumiÃ§o de mÃ³dulo.
12. HÃ¡ divergÃªncia entre desktop e mobile.
13. HÃ¡ divergÃªncia entre versÃ£o local e publicada.

## 264. CritÃ©rio para adiar funcionalidade

Adiar quando:

1. A funcionalidade nÃ£o Ã© urgente.
2. A base ainda nÃ£o foi auditada.
3. HÃ¡ risco de regressÃ£o.
4. A mudanÃ§a mexe em Ã¡reas protegidas.
5. O benefÃ­cio nÃ£o estÃ¡ claro.
6. O usuÃ¡rio estÃ¡ em operaÃ§Ã£o de campo.
7. NÃ£o hÃ¡ backup.
8. NÃ£o hÃ¡ teste definido.
9. NÃ£o hÃ¡ rollback claro.
10. A mudanÃ§a pode ser feita depois.

Adiar nÃ£o Ã© desistir.

Adiar Ã© preservar estabilidade.

## 265. CritÃ©rio para aprovar funcionalidade

Aprovar quando:

1. Resolve problema real.
2. Tem escopo pequeno.
3. Tem arquivo localizado.
4. Tem teste claro.
5. NÃ£o quebra desktop.
6. NÃ£o quebra mobile.
7. NÃ£o toca Ã¡reas protegidas, ou a alteraÃ§Ã£o sensÃ­vel foi autorizada.
8. Tem rollback.
9. Tem backup quando necessÃ¡rio.
10. O benefÃ­cio compensa o risco.

## 266. CritÃ©rio para publicar

Publicar somente quando:

1. Houve autorizaÃ§Ã£o explÃ­cita.
2. A pasta correta foi confirmada.
3. O projeto Vercel correto foi confirmado.
4. A versÃ£o foi conferida.
5. O build passou.
6. O teste local passou.
7. Os arquivos alterados foram listados.
8. Os riscos foram entendidos.
9. O rollback Ã© possÃ­vel.
10. A produÃ§Ã£o serÃ¡ conferida apÃ³s deploy.

## 267. CritÃ©rio para nÃ£o publicar

NÃ£o publicar quando:

1. Build falhou.
2. HÃ¡ dÃºvida sobre pasta.
3. HÃ¡ dÃºvida sobre projeto Vercel.
4. HÃ¡ divergÃªncia de versÃ£o.
5. Service Worker foi alterado sem auditoria.
6. Cache foi alterado sem auditoria.
7. Supabase foi alterado sem autorizaÃ§Ã£o.
8. Banco foi alterado sem autorizaÃ§Ã£o.
9. Desktop quebrou.
10. Mobile quebrou.
11. Teste local nÃ£o foi feito.
12. NÃ£o hÃ¡ autorizaÃ§Ã£o.
13. NÃ£o hÃ¡ rollback.
14. O usuÃ¡rio ainda estÃ¡ inseguro com a mudanÃ§a.

## 268. CritÃ©rio para rollback

Considerar rollback quando:

1. ProduÃ§Ã£o ficou inutilizÃ¡vel.
2. Tela branca em produÃ§Ã£o.
3. PrÃ© vendas sumiram.
4. CobranÃ§as quebraram.
5. Vendas quebraram.
6. Delivery quebrou.
7. Supabase parou de carregar por alteraÃ§Ã£o recente.
8. Desktop foi afetado indevidamente.
9. Mobile ficou inutilizÃ¡vel.
10. App instalado prendeu versÃ£o antiga.
11. Service Worker causou problema grave.
12. Cache causou downgrade.
13. A correÃ§Ã£o localizada Ã© mais arriscada do que voltar.

## 269. CritÃ©rio para nÃ£o fazer rollback ainda

NÃ£o fazer rollback imediatamente quando:

1. O problema pode ser cache local.
2. O problema ocorre em apenas um dispositivo.
3. version.json online estÃ¡ correto.
4. DiagnÃ³stico mostra status OK.
5. O erro Ã© pequeno e localizado.
6. HÃ¡ correÃ§Ã£o simples.
7. NÃ£o foi coletado diagnÃ³stico.
8. NÃ£o se sabe qual backup usar.
9. O rollback pode reintroduzir erro antigo.
10. O sistema continua operÃ¡vel.

Primeiro diagnosticar.

Depois decidir.

## 270. CritÃ©rio para considerar uma versÃ£o estÃ¡vel

Uma versÃ£o sÃ³ deve ser considerada estÃ¡vel quando:

1. Build passou.
2. ProduÃ§Ã£o foi publicada corretamente.
3. version.json online estÃ¡ correto.
4. Desktop foi testado.
5. Mobile foi testado.
6. iPhone foi testado, quando aplicÃ¡vel.
7. DiagnÃ³stico mostra status OK.
8. Supabase carrega.
9. Clientes carregam.
10. PrÃ© vendas carregam.
11. Vendas carregam.
12. Delivery carrega.
13. CobranÃ§as carregam.
14. Financeiro carrega.
15. RelatÃ³rios carregam.
16. NÃ£o hÃ¡ downgrade.
17. NÃ£o hÃ¡ regressÃ£o conhecida.
18. O usuÃ¡rio validou em uso real ou em campo, quando necessÃ¡rio.
19. Backup foi criado.
20. A documentaÃ§Ã£o foi atualizada, quando necessÃ¡rio.

## 271. CritÃ©rio para considerar o PWA estÃ¡vel

O PWA sÃ³ serÃ¡ estÃ¡vel quando:

1. Desktop continuar igual.
2. Navegador mobile continuar funcionando.
3. App instalado abrir corretamente.
4. App instalado mostrar a versÃ£o correta.
5. App instalado mostrar DiagnÃ³stico.
6. App instalado usar o mesmo domÃ­nio.
7. App instalado usar o mesmo Supabase.
8. App instalado nÃ£o carregar versÃ£o antiga.
9. AtualizaÃ§Ã£o automÃ¡tica funcionar.
10. version.json nÃ£o ficar preso em cache.
11. Service Worker estiver coerente.
12. Cache nÃ£o prender HTML antigo.
13. Ãcone aparecer corretamente.
14. Tela cheia funcionar.
15. PrÃ© vendas funcionarem.
16. Vendas funcionarem.
17. Delivery funcionar.
18. CobranÃ§as funcionarem.
19. Funcionamento em Wi Fi for validado.
20. Funcionamento em 4G for validado.

## 272. Pontos que nÃ£o podem ser confundidos

NÃ£o confundir:

1. PWA com app nativo.
2. App instalado com projeto separado.
3. Ãcone na tela inicial com nova arquitetura.
4. Build aprovado com produÃ§Ã£o validada.
5. Deploy concluÃ­do com versÃ£o carregada.
6. version.json correto com interface atualizada.
7. Cache comum com Service Worker.
8. Erro de Supabase com downgrade.
9. Problema visual com problema de banco.
10. Problema local com problema geral.

Essas distinÃ§Ãµes evitam decisÃµes erradas.

## 273. DecisÃ£o sobre novo projeto chamado Aplicativo

NÃ£o criar novo projeto chamado Aplicativo.

A frente PWA deve acontecer dentro do Mini ERP atual.

Caminho oficial:

C:\Users\Delber\Mini-ERP\projeto

O PWA deve usar:

1. Mesmo projeto.
2. Mesmo cÃ³digo.
3. Mesmo domÃ­nio.
4. Mesmo Supabase.
5. Mesmo banco.
6. Mesmo deploy.
7. Mesma versÃ£o.
8. Mesma documentaÃ§Ã£o.

O nome Aplicativo pode ser usado apenas como nome informal da frente de trabalho.

## 274. DecisÃ£o sobre segunda base de cÃ³digo

NÃ£o criar segunda base de cÃ³digo.

Riscos de segunda base:

1. Duplicar manutenÃ§Ã£o.
2. Divergir funcionalidades.
3. Quebrar Supabase.
4. Criar versÃµes diferentes.
5. Aumentar risco de deploy errado.
6. Dificultar rollback.
7. Dificultar diagnÃ³stico.
8. Confundir desktop e mobile.
9. Aumentar custo operacional.
10. Criar retrabalho permanente.

O PWA deve nascer da base atual.

## 275. DecisÃ£o sobre desktop

Desktop Ã© intocÃ¡vel na frente PWA.

Qualquer alteraÃ§Ã£o que afete desktop deve ser considerada risco.

Se for inevitÃ¡vel, precisa ser justificada antes.

A meta Ã©:

Desktop igual.
Mobile mais fluido.
App instalÃ¡vel.
Mesma base.

## 276. DecisÃ£o sobre operaÃ§Ã£o offline

NÃ£o misturar PWA bÃ¡sico com operaÃ§Ã£o offline complexa.

PWA instalÃ¡vel Ã© uma etapa.

Offline com sincronizaÃ§Ã£o Ã© outra etapa.

Offline exige plano prÃ³prio para:

1. Dados locais.
2. SincronizaÃ§Ã£o posterior.
3. Conflitos.
4. Duplicidade.
5. DiagnÃ³stico.
6. Falha de rede.
7. RecuperaÃ§Ã£o.
8. Rollback.
9. Teste em campo.
10. ProteÃ§Ã£o contra perda de dados.

A primeira implementaÃ§Ã£o PWA deve evitar essa complexidade.

## 277. DecisÃ£o sobre recibos e comprovantes

Recibos bonitos e comprovantes podem ser uma frente futura.

NÃ£o devem entrar na primeira implementaÃ§Ã£o PWA.

Primeiro, estabilizar:

1. Manifest.
2. Ãcone.
3. InstalaÃ§Ã£o.
4. Tela cheia.
5. DiagnÃ³stico.
6. AtualizaÃ§Ã£o.
7. AusÃªncia de downgrade.

Depois, abrir frente especÃ­fica para recibos.

## 278. DecisÃ£o sobre notificaÃ§Ãµes

NotificaÃ§Ãµes nÃ£o devem entrar no PWA inicial.

Push notification exige cuidado com permissÃµes, Service Worker, UX e suporte em dispositivos.

NÃ£o implementar notificaÃ§Ãµes antes do PWA bÃ¡sico estar estÃ¡vel.

## 279. DecisÃ£o sobre login novo

NÃ£o criar login novo na primeira etapa PWA.

Se o Mini ERP jÃ¡ tiver lÃ³gica de acesso na versÃ£o auditada, preservar.

Se nÃ£o tiver, nÃ£o adicionar como parte do PWA inicial.

Login novo Ã© frente prÃ³pria.

## 280. DecisÃ£o sobre mudanÃ§a visual ampla

NÃ£o fazer redesign amplo na frente PWA inicial.

A primeira etapa deve ter foco tÃ©cnico e operacional:

1. Instalar.
2. Abrir bem.
3. Atualizar corretamente.
4. Preservar desktop.
5. Preservar mobile.
6. Evitar downgrade.

A aparÃªncia pode ser refinada depois, em partes.

## 281. DecisÃ£o sobre arquivos antigos e ZIPs

ZIPs antigos nÃ£o devem ficar misturados na pasta operacional.

Riscos:

1. Codex auditar arquivo errado.
2. UsuÃ¡rio se confundir.
3. Backup ficar pesado.
4. VersÃµes antigas serem tratadas como atuais.
5. Arquivos mortos parecerem ativos.

A pasta oficial deve ficar limpa.

Backups devem ficar separados e nomeados.

## 282. DecisÃ£o sobre documentaÃ§Ã£o

DocumentaÃ§Ã£o Ã© parte da seguranÃ§a do Mini ERP.

Arquivos oficiais:

1. LEIA PRIMEIRO MINI ERP.
2. MANUAL OFICIAL MINI ERP PWA.

O LEIA Ã© guia curto.

O MANUAL Ã© documento mestre.

O Codex deve ler os dois antes de qualquer anÃ¡lise.

## 283. DecisÃ£o sobre comandos do Codex

O Codex deve receber comandos claros.

Sempre indicar:

1. Pasta oficial.
2. DomÃ­nio oficial.
3. VersÃ£o estÃ¡vel.
4. Objetivo da etapa.
5. O que pode fazer.
6. O que nÃ£o pode fazer.
7. Se pode alterar ou nÃ£o.
8. Se pode publicar ou nÃ£o.
9. Se deve apenas auditar.
10. Qual resultado deve entregar.

Comando vago aumenta risco.

## 284. Sintomas que exigem parar tudo

Parar qualquer implementaÃ§Ã£o se ocorrer:

1. Tela branca.
2. SumiÃ§o de PrÃ© vendas.
3. SumiÃ§o de DiagnÃ³stico.
4. version.json divergente.
5. Service Worker inesperado.
6. Cache segurando versÃ£o antiga.
7. Supabase com erro geral.
8. Desktop quebrado.
9. Mobile inutilizÃ¡vel.
10. App instalado carregando versÃ£o antiga.
11. Build falhando.
12. Pasta errada detectada.
13. Projeto Vercel errado detectado.
14. Dados ausentes.
15. UsuÃ¡rio em dÃºvida sobre o que foi alterado.

Quando isso acontecer, voltar para diagnÃ³stico.

## 285. Sintomas que permitem continuar com cautela

Ã‰ possÃ­vel continuar com cautela quando:

1. O erro Ã© visual e localizado.
2. O mÃ³dulo afetado foi identificado.
3. O build passa.
4. Desktop estÃ¡ preservado.
5. Mobile estÃ¡ preservado.
6. Supabase estÃ¡ normal.
7. Versionamento estÃ¡ coerente.
8. Service Worker nÃ£o foi tocado.
9. Cache nÃ£o foi tocado.
10. HÃ¡ teste claro.

Mesmo assim, publicar sÃ³ com autorizaÃ§Ã£o.

## 286. DecisÃ£o em caso de dÃºvida

Em caso de dÃºvida, nÃ£o implementar.

A ordem correta Ã©:

1. Parar.
2. Auditar.
3. Confirmar versÃ£o.
4. Confirmar arquivo.
5. Confirmar risco.
6. Definir teste.
7. Definir rollback.
8. SÃ³ depois alterar, se fizer sentido.

No Mini ERP, prudÃªncia vale mais que velocidade.

## 287. Matriz simples de decisÃ£o

Se o problema Ã© visual e localizado, fazer refinamento localizado.

Se o problema envolve versÃ£o, fazer auditoria completa.

Se o problema envolve Service Worker, fazer auditoria completa.

Se o problema envolve cache, fazer auditoria completa.

Se o problema envolve Supabase, fazer auditoria completa.

Se o problema envolve banco, nÃ£o alterar sem autorizaÃ§Ã£o.

Se o problema envolve desktop na frente PWA, parar e revisar.

Se o problema envolve app instalado carregando versÃ£o antiga, tratar como incidente de PWA e cache.

Se o problema ocorre sÃ³ em campo, coletar diagnÃ³stico antes de mexer.

Se o problema causa perda operacional, considerar rollback.

## 288. Prioridade dos riscos

Prioridade mÃ¡xima:

1. Perda de dados.
2. Downgrade.
3. Tela branca.
4. Supabase quebrado.
5. PrÃ© vendas indisponÃ­veis.
6. Vendas indisponÃ­veis.
7. CobranÃ§as indisponÃ­veis.
8. Delivery indisponÃ­vel.
9. Desktop quebrado.
10. App instalado preso em versÃ£o antiga.

Prioridade mÃ©dia:

1. Erro visual localizado.
2. Modal com problema.
3. BotÃ£o desalinhado.
4. Texto confuso.
5. Filtro com comportamento ruim.
6. PaginaÃ§Ã£o com ajuste necessÃ¡rio.

Prioridade baixa:

1. Ajuste estÃ©tico sem impacto.
2. Nome de botÃ£o que nÃ£o atrapalha uso.
3. ReorganizaÃ§Ã£o desejÃ¡vel, mas nÃ£o urgente.
4. Melhoria que pode esperar.
5. Ideia nova sem necessidade operacional imediata.

## 289. Regra de proteÃ§Ã£o da versÃ£o 2026.06.24.03

A versÃ£o 2026.06.24.03 Ã© a base estÃ¡vel de referÃªncia para a frente PWA.

Antes de qualquer implementaÃ§Ã£o PWA, criar backup dessa versÃ£o.

Nome sugerido:

MINI ERP BACKUP ANTES PWA V2026.06.24.03.zip

Essa versÃ£o deve funcionar como ponto de retorno.

NÃ£o iniciar PWA sem esse backup.

## 290. ConclusÃ£o operacional da Parte 6

O Mini ERP deve evoluir com cautela.

Os principais riscos conhecidos estÃ£o ligados a downgrade, Service Worker, cache, versionamento, Supabase, deploy, dados e impacto indevido no desktop.

A frente PWA Ã© possÃ­vel e coerente, mas deve ser feita dentro do projeto atual, sem nova base e sem novo projeto.

O desktop deve permanecer exatamente como estÃ¡.

A prÃ³xima parte do manual deve tratar da estratÃ©gia tÃ©cnica oficial para transformar o Mini ERP em PWA instalÃ¡vel, com etapas mÃ­nimas, seguras e testÃ¡veis.
# MANUAL OFICIAL MINI ERP PWA

## Parte 7: EstratÃ©gia tÃ©cnica oficial para transformar o Mini ERP em PWA instalÃ¡vel

## 291. Objetivo desta parte

Esta parte define a estratÃ©gia oficial para transformar o Mini ERP em um aplicativo PWA instalÃ¡vel.

A regra principal Ã©:

Transformar o Mini ERP em PWA sem criar outro projeto, sem criar outra base de cÃ³digo, sem alterar o desktop e sem comprometer a versÃ£o estÃ¡vel.

A frente PWA deve ser feita em etapas pequenas, auditÃ¡veis e reversÃ­veis.

## 292. DefiniÃ§Ã£o prÃ¡tica de PWA para este projeto

Para o Mini ERP, PWA significa:

1. O sistema continuar sendo o mesmo Mini ERP.
2. O sistema continuar abrindo pelo navegador.
3. O sistema poder ser instalado na tela inicial do celular.
4. O sistema abrir com aparÃªncia mais prÃ³xima de aplicativo.
5. O sistema usar o mesmo domÃ­nio.
6. O sistema usar o mesmo Supabase.
7. O sistema usar o mesmo banco.
8. O sistema usar o mesmo deploy.
9. O sistema preservar o desktop.
10. O sistema continuar protegido contra downgrade.

PWA nÃ£o significa criar aplicativo nativo.

PWA nÃ£o significa publicar em loja.

PWA nÃ£o significa criar projeto novo.

PWA nÃ£o significa reescrever o Mini ERP.

## 293. DecisÃ£o oficial sobre novo projeto

NÃ£o criar novo projeto chamado Aplicativo.

NÃ£o criar nova pasta operacional.

NÃ£o criar novo domÃ­nio.

NÃ£o criar novo Supabase.

NÃ£o criar novo banco.

NÃ£o criar novo projeto Vercel.

O caminho oficial continua sendo:

`C:\Users\Delber\Mini-ERP\projeto`

O projeto oficial continua sendo:

`mini-erp-canastra`

O domÃ­nio oficial continua sendo:

`https://mini-erp-canastra.vercel.app`

## 294. DecisÃ£o oficial sobre base de cÃ³digo

O PWA deve nascer da base atual do Mini ERP.

NÃ£o haverÃ¡ duas versÃµes:

1. Uma versÃ£o desktop.
2. Uma versÃ£o aplicativo.

A regra correta Ã©:

Um Ãºnico cÃ³digo.
Uma Ãºnica base.
Um Ãºnico deploy.
Um Ãºnico Supabase.
Um Ãºnico banco.
Uma Ãºnica documentaÃ§Ã£o oficial.

O desktop e o aplicativo instalado devem ser duas formas de acessar o mesmo sistema.

## 295. DecisÃ£o oficial sobre desktop

O desktop deve permanecer exatamente como estÃ¡.

Na frente PWA, o desktop nÃ£o deve ser redesenhado.

NÃ£o deve haver simplificaÃ§Ã£o do desktop por causa do celular.

NÃ£o deve haver remoÃ§Ã£o de relatÃ³rios, financeiro, menus, tabelas ou mÃ³dulos administrativos.

Se qualquer ajuste tÃ©cnico afetar o desktop, a alteraÃ§Ã£o deve ser parada e revisada.

## 296. DecisÃ£o oficial sobre mobile

O mobile Ã© o foco prÃ¡tico da frente PWA.

O objetivo Ã© melhorar o uso em campo, principalmente no celular.

A experiÃªncia esperada Ã©:

1. Abrir pela tela inicial.
2. Reduzir distraÃ§Ãµes do navegador.
3. Dar sensaÃ§Ã£o de app.
4. Manter a barra inferior mobile.
5. Manter PrÃ© vendas acessÃ­vel.
6. Manter Vendas acessÃ­vel.
7. Manter CobranÃ§as acessÃ­vel.
8. Manter Delivery acessÃ­vel.
9. Manter DiagnÃ³stico acessÃ­vel.
10. Evitar zoom indevido.
11. Evitar tela cortada.
12. Evitar modais ruins no iPhone.

## 297. DecisÃ£o oficial sobre operaÃ§Ã£o offline

A primeira etapa PWA nÃ£o deve implementar operaÃ§Ã£o offline complexa.

PWA instalÃ¡vel Ã© uma etapa.

Offline com sincronizaÃ§Ã£o Ã© outra etapa.

A operaÃ§Ã£o offline exige plano prÃ³prio porque envolve:

1. Dados locais.
2. SincronizaÃ§Ã£o posterior.
3. Conflitos.
4. Duplicidade.
5. Falha de rede.
6. RecuperaÃ§Ã£o de dados.
7. DiagnÃ³stico.
8. Supabase.
9. Cache.
10. Service Worker.

Portanto, na primeira etapa, o objetivo Ã© instalar e abrir bem, nÃ£o criar offline completo.

## 298. DecisÃ£o oficial sobre Service Worker

Service Worker Ã© Ã¡rea sensÃ­vel.

Como o Mini ERP jÃ¡ sofreu incidente de downgrade, nenhuma mudanÃ§a em Service Worker deve ser feita sem auditoria.

A estratÃ©gia para PWA deve ser:

1. Primeiro auditar o Service Worker atual.
2. Entender qual arquivo estÃ¡ registrado.
3. Entender qual arquivo controla a pÃ¡gina.
4. Entender se hÃ¡ `public/sw.js`.
5. Entender se hÃ¡ `public/service-worker.js`.
6. Entender a estratÃ©gia de cache atual.
7. Entender se `version.json` pode ficar preso em cache.
8. Entender se `index.html` pode ficar preso em cache.
9. SÃ³ alterar se for realmente necessÃ¡rio.
10. Testar atualizaÃ§Ã£o depois de qualquer mudanÃ§a.

## 299. DecisÃ£o oficial sobre cache

Cache nÃ£o pode ser tratado como melhoria inocente.

No Mini ERP, cache errado pode causar downgrade.

A estratÃ©gia correta Ã©:

1. NÃ£o cachear agressivamente o HTML principal.
2. NÃ£o prender `version.json` em cache.
3. NÃ£o esconder atualizaÃ§Ã£o nova.
4. NÃ£o manter assets crÃ­ticos antigos sem controle.
5. NÃ£o criar cache novo sem nome e versÃ£o claros.
6. NÃ£o alterar cache junto com vÃ¡rias mudanÃ§as funcionais.
7. Testar cache em desktop.
8. Testar cache em mobile.
9. Testar cache em iPhone.
10. Testar cache no app instalado.

## 300. DecisÃ£o oficial sobre versionamento no PWA

O PWA deve continuar respeitando o versionamento oficial.

A versÃ£o do aplicativo deve bater com a versÃ£o publicada.

O DiagnÃ³stico do Sistema deve continuar mostrando:

1. VersÃ£o do aplicativo.
2. VersÃ£o publicada.
3. Maior versÃ£o aceita.
4. Status da versÃ£o.
5. Service Worker disponÃ­vel.
6. Service Worker controlando.
7. Online ou offline.
8. Ambiente.
9. Supabase.
10. Dados carregados.

O aplicativo instalado nÃ£o pode esconder a versÃ£o real.

## 301. DecisÃ£o oficial sobre atualizaÃ§Ã£o automÃ¡tica no PWA

A atualizaÃ§Ã£o automÃ¡tica deve continuar funcionando.

A transformaÃ§Ã£o em PWA nÃ£o pode prender o usuÃ¡rio em versÃ£o antiga.

O app instalado deve conseguir perceber quando existe versÃ£o nova.

Antes de considerar o PWA estÃ¡vel, Ã© obrigatÃ³rio testar:

1. Abrir versÃ£o instalada.
2. Publicar nova versÃ£o autorizada no futuro.
3. Conferir se o app instalado percebe a atualizaÃ§Ã£o.
4. Conferir se o DiagnÃ³stico muda corretamente.
5. Conferir se nÃ£o hÃ¡ loop de atualizaÃ§Ã£o.
6. Conferir se nÃ£o hÃ¡ downgrade.

## 302. Etapa zero: concluir documentaÃ§Ã£o

Antes de qualquer implementaÃ§Ã£o PWA, concluir este manual.

Arquivos oficiais obrigatÃ³rios dentro do projeto:

1. `LEIA-PRIMEIRO-MINI-ERP.md`
2. `MANUAL-OFICIAL-MINI-ERP-PWA.md`

O Codex deve ler os dois antes de qualquer auditoria.

Sem esses documentos no projeto, nÃ£o iniciar a frente PWA.

## 303. Etapa um: criar backup antes do PWA

Antes de qualquer alteraÃ§Ã£o, criar backup limpo da versÃ£o estÃ¡vel.

Nome sugerido:

`MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip`

Esse backup deve conter:

1. `src`
2. `public`
3. `sql`, se existir
4. `package.json`
5. `package-lock.json`
6. `vercel.json`
7. `README.md`
8. `LEIA-PRIMEIRO-MINI-ERP.md`
9. `MANUAL-OFICIAL-MINI-ERP-PWA.md`
10. Documentos oficiais necessÃ¡rios

NÃ£o incluir:

1. `node_modules`
2. `.git`
3. `.vercel`
4. `.env.local`
5. `dist`, salvo justificativa
6. Backups antigos
7. ZIPs antigos
8. Arquivos temporÃ¡rios

## 304. Etapa dois: auditoria PWA sem alteraÃ§Ã£o

Depois do backup, fazer auditoria PWA sem alterar arquivos.

A auditoria deve responder:

1. Existe manifest?
2. Onde estÃ¡ o manifest?
3. O manifest estÃ¡ linkado?
4. Existem Ã­cones?
5. Quais tamanhos de Ã­cone existem?
6. Existe `public/sw.js`?
7. Existe `public/service-worker.js`?
8. Qual Service Worker estÃ¡ registrado?
9. O Service Worker cacheia HTML?
10. O Service Worker cacheia `version.json`?
11. Existe regra de cache no `vercel.json`?
12. Existe atualizaÃ§Ã£o automÃ¡tica?
13. O DiagnÃ³stico mostra Service Worker?
14. O desktop depende de alguma lÃ³gica que pode ser afetada?
15. O mobile jÃ¡ estÃ¡ separado por CSS responsivo?
16. Quais arquivos precisam ser tocados para PWA?
17. Quais riscos existem?
18. Qual Ã© a menor implementaÃ§Ã£o possÃ­vel?

Nenhum cÃ³digo deve ser criado antes dessa auditoria.

## 305. Etapa trÃªs: definir nome do aplicativo

Antes de criar ou ajustar o manifest, decidir o nome do app.

OpÃ§Ãµes possÃ­veis:

1. Mini ERP Canastra.
2. Mini ERP Queijos Canastra.
3. Queijos Serra da Canastra ERP.
4. Mini ERP.

CritÃ©rio recomendado:

O nome deve ser curto, claro e fÃ¡cil de reconhecer na tela inicial.

SugestÃ£o preferencial:

Mini ERP Canastra

Motivo:

1. Ã‰ curto.
2. Identifica o sistema.
3. Identifica o negÃ³cio.
4. Fica bem em tela de celular.
5. Evita nome longo demais.

## 306. Etapa quatro: definir nome curto

O nome curto aparece em espaÃ§os menores.

OpÃ§Ãµes possÃ­veis:

1. ERP Canastra.
2. Mini ERP.
3. Canastra ERP.

SugestÃ£o preferencial:

Mini ERP

Motivo:

1. Ã‰ curto.
2. Cabe melhor abaixo do Ã­cone.
3. NÃ£o polui a tela inicial.
4. Ã‰ fÃ¡cil de reconhecer.

## 307. Etapa cinco: definir Ã­cone do PWA

O Ã­cone precisa ser simples e legÃ­vel.

Ele deve funcionar pequeno na tela inicial.

OpÃ§Ãµes possÃ­veis:

1. Logo da Queijos Serra da Canastra.
2. Ãcone simples de queijo.
3. Iniciais do sistema.
4. Marca simplificada do Mini ERP.

CritÃ©rio recomendado:

1. Evitar muito texto.
2. Evitar detalhe pequeno.
3. Evitar imagem poluÃ­da.
4. Usar fundo limpo.
5. Manter identidade do negÃ³cio.
6. Testar em tamanho pequeno.
7. Gerar tamanhos necessÃ¡rios para PWA.
8. Preservar boa leitura em iPhone.

A escolha do Ã­cone deve ser feita antes da implementaÃ§Ã£o.

## 308. Etapa seis: definir cores do PWA

O PWA pode usar cor de tema e cor de fundo.

Essas cores influenciam aparÃªncia do app instalado e tela de abertura em alguns ambientes.

A decisÃ£o deve respeitar o visual atual do Mini ERP.

NÃ£o criar identidade visual nova sem necessidade.

CritÃ©rio recomendado:

1. Usar cor jÃ¡ presente no Mini ERP.
2. Evitar cor chamativa demais.
3. Evitar alterar desktop.
4. Evitar mexer em CSS global sem necessidade.
5. Manter aparÃªncia profissional.
6. Validar no celular.

## 309. Etapa sete: revisar manifest

O manifest Ã© o arquivo que informa ao navegador como o aplicativo deve se comportar quando instalado.

A auditoria deve verificar se ele existe.

Se nÃ£o existir, a futura implementaÃ§Ã£o pode criar um manifest mÃ­nimo.

Se existir, a futura implementaÃ§Ã£o deve revisar sem substituir no impulso.

O manifest deve considerar:

1. Nome do aplicativo.
2. Nome curto.
3. Ãcones.
4. URL inicial.
5. Escopo.
6. Modo de exibiÃ§Ã£o.
7. Cor de tema.
8. Cor de fundo.
9. OrientaÃ§Ã£o, se necessÃ¡rio.
10. DescriÃ§Ã£o, se aplicÃ¡vel.

## 310. Regra para start_url

O `start_url` deve abrir o Mini ERP no mesmo domÃ­nio oficial.

Ele nÃ£o deve apontar para outro projeto.

Ele nÃ£o deve apontar para rota temporÃ¡ria.

Ele nÃ£o deve apontar para ambiente antigo.

Ele deve respeitar a polÃ­tica de versionamento e atualizaÃ§Ã£o.

A decisÃ£o sobre parÃ¢metro de versÃ£o no `start_url` deve ser tomada com cuidado, porque o histÃ³rico do projeto jÃ¡ envolveu URL com versÃ£o e cache.

## 311. Regra para scope

O escopo define qual parte do site pertence ao aplicativo instalado.

O escopo deve ser compatÃ­vel com o domÃ­nio oficial do Mini ERP.

NÃ£o deve incluir outro projeto.

NÃ£o deve misturar CatÃ¡logo.

NÃ£o deve abrir caminho para rotas fora do Mini ERP.

A auditoria deve confirmar o escopo antes da implementaÃ§Ã£o.

## 312. Regra para display

O modo de exibiÃ§Ã£o desejado Ã© o comportamento mais prÃ³ximo de app.

OpÃ§Ãµes comuns incluem navegador, tela independente ou tela cheia, conforme suporte do ambiente.

Para o Mini ERP, a direÃ§Ã£o preferida Ã© abrir sem a interface normal do navegador, preservando a navegaÃ§Ã£o interna do sistema.

A escolha deve ser testada no iPhone e no Chrome mobile.

Se tela cheia causar problema de usabilidade, usar comportamento mais seguro.

## 313. Regra para orientaÃ§Ã£o de tela

NÃ£o travar orientaÃ§Ã£o sem necessidade.

O Mini ERP deve funcionar bem em retrato no celular.

O desktop deve continuar livre.

Se a orientaÃ§Ã£o for definida no manifest, ela deve favorecer o uso mobile em campo, mas sem prejudicar tablets ou desktop.

A recomendaÃ§Ã£o inicial Ã© evitar decisÃ£o agressiva sem teste.

## 314. Etapa oito: revisar HTML de entrada

O PWA precisa que o manifest seja referenciado pelo HTML principal.

No projeto Vite, isso geralmente envolve o arquivo de entrada HTML do projeto.

Antes de alterar, o Codex deve:

1. Localizar o HTML real.
2. Mostrar o trecho atual.
3. Confirmar se jÃ¡ existe link para manifest.
4. Confirmar se jÃ¡ existem meta tags relacionadas a PWA.
5. Confirmar se hÃ¡ referÃªncias antigas.
6. Propor a menor alteraÃ§Ã£o possÃ­vel.
7. Explicar risco.
8. Testar build.

NÃ£o alterar HTML sem mostrar o antes.

## 315. Etapa nove: revisar Ã­cones no public

Os Ã­cones do PWA devem ficar em local adequado, geralmente na pasta pÃºblica.

Antes de criar Ã­cones novos, auditar:

1. Quais imagens jÃ¡ existem.
2. Se existe logo.
3. Se existem Ã­cones antigos.
4. Se existem arquivos duplicados.
5. Se algum Ã­cone pertence ao CatÃ¡logo por engano.
6. Se hÃ¡ tamanho adequado.
7. Se o nome dos arquivos Ã© claro.
8. Se os Ã­cones sÃ£o referenciados pelo manifest.

NÃ£o misturar imagens do CatÃ¡logo sem decisÃ£o.

## 316. Etapa dez: revisar Service Worker existente

A auditoria precisa decidir se a implementaÃ§Ã£o PWA exige mudanÃ§a no Service Worker.

CenÃ¡rios possÃ­veis:

1. O Service Worker atual jÃ¡ Ã© suficiente.
2. O Service Worker atual precisa apenas ser preservado.
3. O Service Worker atual precisa de pequeno ajuste.
4. O Service Worker atual tem risco e precisa de plano prÃ³prio.
5. HÃ¡ dois arquivos e Ã© necessÃ¡rio entender qual estÃ¡ ativo.
6. A melhor primeira etapa Ã© nÃ£o mexer no Service Worker.

Por causa do histÃ³rico de downgrade, a opÃ§Ã£o preferida Ã© nÃ£o mexer no Service Worker na primeira etapa, se o PWA puder ser instalado com seguranÃ§a sem isso.

## 317. Etapa onze: revisar polÃ­tica de cache

Antes de alterar cache, responder:

1. O que estÃ¡ sendo cacheado hoje?
2. O HTML principal Ã© cacheado?
3. `version.json` Ã© cacheado?
4. Arquivos JS sÃ£o cacheados?
5. Arquivos CSS sÃ£o cacheados?
6. Existe nome de cache por versÃ£o?
7. Existe limpeza de cache antigo?
8. Existe risco de downgrade?
9. O app instalado atualizaria corretamente?
10. O rollback continuaria possÃ­vel?

Sem essas respostas, nÃ£o alterar cache.

## 318. Etapa doze: revisar vercel.json

O `vercel.json` pode conter regras que afetam cache e publicaÃ§Ã£o.

Antes de implementar PWA, verificar:

1. Headers.
2. Cache de `version.json`.
3. Cache de HTML.
4. Cache de Service Worker.
5. Rotas.
6. Redirecionamentos.
7. ConfiguraÃ§Ã£o de build.
8. ConfiguraÃ§Ã£o de arquivos pÃºblicos.

NÃ£o alterar `vercel.json` sem necessidade.

Se precisar alterar, tratar como mudanÃ§a sensÃ­vel.

## 319. Etapa treze: preservar DiagnÃ³stico do Sistema

O DiagnÃ³stico do Sistema deve ser mantido e valorizado na frente PWA.

Ele deve funcionar em:

1. Desktop.
2. Mobile navegador.
3. App instalado.

Ele deve continuar mostrando:

1. VersÃ£o do aplicativo.
2. VersÃ£o publicada.
3. Maior versÃ£o aceita.
4. Status da versÃ£o.
5. Service Worker disponÃ­vel.
6. Service Worker controlando.
7. Ambiente.
8. URL.
9. Navegador.
10. Sistema.
11. Supabase.
12. Dados carregados.

Sem DiagnÃ³stico funcionando no app instalado, o PWA nÃ£o deve ser considerado estÃ¡vel.

## 320. Etapa quatorze: implementaÃ§Ã£o mÃ­nima

A primeira implementaÃ§Ã£o PWA deve ser a menor possÃ­vel.

Objetivo da primeira implementaÃ§Ã£o:

1. Manifest correto.
2. Ãcones corretos.
3. Link correto para manifest.
4. ConfiguraÃ§Ã£o mÃ­nima de aparÃªncia.
5. PreservaÃ§Ã£o do Service Worker, se possÃ­vel.
6. PreservaÃ§Ã£o do cache, se possÃ­vel.
7. Desktop intacto.
8. Mobile intacto.
9. Build aprovado.
10. Teste local aprovado.

NÃ£o incluir melhorias extras.

## 321. O que pode ser tocado na primeira implementaÃ§Ã£o

Somente se a auditoria confirmar necessidade, podem ser tocados:

1. Arquivo de manifest.
2. HTML de entrada para linkar manifest.
3. Ãcones dentro de `public`.
4. Metadados visuais mÃ­nimos.
5. DocumentaÃ§Ã£o.
6. Eventual ajuste mÃ­nimo relacionado Ã  instalaÃ§Ã£o.

Service Worker sÃ³ deve ser tocado se a auditoria provar que Ã© necessÃ¡rio.

Cache sÃ³ deve ser tocado se a auditoria provar que Ã© necessÃ¡rio.

## 322. O que nÃ£o pode ser tocado na primeira implementaÃ§Ã£o

NÃ£o tocar na primeira implementaÃ§Ã£o PWA:

1. PrÃ© vendas.
2. Vendas.
3. Delivery.
4. CobranÃ§as.
5. Financeiro.
6. RelatÃ³rios.
7. Clientes.
8. Produtos.
9. Supabase.
10. Banco.
11. LÃ³gica de vendas.
12. LÃ³gica de pagamentos.
13. LÃ³gica de cobranÃ§as.
14. LÃ³gica de delivery.
15. Layout desktop.
16. Arquitetura geral.
17. OperaÃ§Ã£o offline complexa.
18. NotificaÃ§Ãµes.
19. Recibos.
20. Login novo.

## 323. Etapa quinze: build local

ApÃ³s implementaÃ§Ã£o mÃ­nima, rodar build.

Comando oficial:

`npm run build`

Alternativa se necessÃ¡rio:

`npm.cmd run build`

Se o build falhar, nÃ£o publicar.

Se o build passar, ainda nÃ£o significa que o PWA estÃ¡ validado.

Ã‰ necessÃ¡rio testar localmente e depois validar produÃ§Ã£o com autorizaÃ§Ã£o.

## 324. Etapa dezesseis: teste local

Teste local mÃ­nimo:

1. Sistema abre.
2. Desktop abre igual.
3. Mobile simulado nÃ£o quebra.
4. PrÃ© vendas aparecem.
5. Vendas aparecem.
6. Delivery aparece.
7. CobranÃ§as aparecem.
8. DiagnÃ³stico abre.
9. Supabase nÃ£o apresenta erro.
10. NÃ£o hÃ¡ tela branca.
11. Manifest nÃ£o gera erro visÃ­vel.
12. Ãcones nÃ£o quebram build.

## 325. Etapa dezessete: teste em produÃ§Ã£o

Depois de deploy autorizado, testar em produÃ§Ã£o:

1. DomÃ­nio oficial abre.
2. `version.json` online estÃ¡ correto.
3. DiagnÃ³stico mostra versÃ£o correta.
4. Status da versÃ£o estÃ¡ OK.
5. Desktop estÃ¡ igual.
6. Mobile navegador estÃ¡ funcional.
7. PrÃ© vendas carregam.
8. Vendas carregam.
9. Delivery carrega.
10. CobranÃ§as carregam.
11. Supabase carrega.
12. NÃ£o hÃ¡ downgrade.
13. Manifest Ã© reconhecido.
14. InstalaÃ§Ã£o Ã© possÃ­vel, quando o navegador oferecer.
15. App instalado abre corretamente.

## 326. Etapa dezoito: teste no iPhone

No iPhone, testar:

1. Abrir pelo navegador.
2. Conferir DiagnÃ³stico.
3. Adicionar Ã  tela inicial, se disponÃ­vel.
4. Abrir pelo Ã­cone.
5. Verificar se parece app.
6. Verificar se usa a versÃ£o correta.
7. Verificar se PrÃ© vendas abre.
8. Verificar se Vendas abre.
9. Verificar se CobranÃ§as abre.
10. Verificar se Delivery abre.
11. Verificar se modais funcionam.
12. Verificar se nÃ£o hÃ¡ zoom indevido.
13. Verificar se nÃ£o hÃ¡ tela cortada.
14. Verificar se funciona em Wi Fi.
15. Verificar se funciona em 4G.

## 327. Etapa dezenove: teste no Chrome mobile

No Chrome mobile, testar:

1. Abrir o domÃ­nio oficial.
2. Conferir DiagnÃ³stico.
3. Verificar possibilidade de instalaÃ§Ã£o.
4. Instalar, se disponÃ­vel.
5. Abrir pelo Ã­cone.
6. Conferir versÃ£o.
7. Conferir Supabase.
8. Conferir PrÃ© vendas.
9. Conferir Vendas.
10. Conferir CobranÃ§as.
11. Conferir Delivery.
12. Conferir atualizaÃ§Ã£o.
13. Conferir ausÃªncia de downgrade.

## 328. Etapa vinte: teste em campo

O teste em campo Ã© necessÃ¡rio antes de considerar o PWA estÃ¡vel.

Testar em situaÃ§Ã£o real:

1. Abrir fora de casa.
2. Abrir em 4G.
3. Abrir pelo Ã­cone instalado.
4. Abrir pelo navegador.
5. Conferir DiagnÃ³stico.
6. Conferir versÃ£o.
7. Registrar ou consultar PrÃ© vendas.
8. Consultar CobranÃ§as.
9. Consultar Delivery.
10. Fazer uso real com cautela.
11. Observar se hÃ¡ retorno de versÃ£o antiga.
12. Observar se hÃ¡ erro de sincronizaÃ§Ã£o.

## 329. Etapa vinte e um: teste de atualizaÃ§Ã£o futura

Depois que o PWA estiver instalado, a atualizaÃ§Ã£o precisa ser testada em uma versÃ£o futura autorizada.

O teste deve confirmar:

1. App instalado nÃ£o fica preso na versÃ£o anterior.
2. `version.json` mostra versÃ£o nova.
3. DiagnÃ³stico percebe versÃ£o nova.
4. AtualizaÃ§Ã£o automÃ¡tica funciona.
5. NÃ£o hÃ¡ loop.
6. NÃ£o hÃ¡ tela branca.
7. NÃ£o hÃ¡ downgrade.
8. Dados continuam carregando.

Esse teste Ã© essencial por causa do histÃ³rico do Mini ERP.

## 330. Etapa vinte e dois: backup pÃ³s PWA aprovado

Depois que o PWA estiver validado em desktop, mobile, iPhone e campo, criar backup.

Nome sugerido:

`MINI-ERP-BACKUP-PWA-ESTAVEL-V[VERSAO].zip`

Esse backup sÃ³ deve ser criado quando a versÃ£o for realmente aprovada.

NÃ£o chamar de estÃ¡vel apenas porque instalou.

EstÃ¡vel significa testado e aprovado.

## 331. CritÃ©rio de sucesso da primeira etapa PWA

A primeira etapa PWA serÃ¡ considerada bem sucedida quando:

1. Desktop permanecer igual.
2. Mobile navegador continuar funcionando.
3. App puder ser instalado.
4. Ãcone aparecer corretamente.
5. App abrir pelo Ã­cone.
6. App abrir com aparÃªncia de aplicativo.
7. DiagnÃ³stico funcionar no app instalado.
8. VersÃ£o do app estiver correta.
9. VersÃ£o publicada estiver correta.
10. Status da versÃ£o estiver OK.
11. PrÃ© vendas carregarem.
12. Vendas carregarem.
13. Delivery carregar.
14. CobranÃ§as carregarem.
15. Supabase carregar.
16. NÃ£o houver tela branca.
17. NÃ£o houver downgrade.
18. NÃ£o houver regressÃ£o conhecida.
19. Rollback continuar possÃ­vel.
20. Backup pÃ³s validaÃ§Ã£o for criado.

## 332. CritÃ©rio de falha da primeira etapa PWA

A primeira etapa PWA falha se:

1. Desktop mudar indevidamente.
2. Mobile navegador quebrar.
3. App instalado abrir versÃ£o antiga.
4. DiagnÃ³stico sumir.
5. PrÃ© vendas sumirem.
6. CobranÃ§as sumirem.
7. Delivery sumir.
8. Vendas quebrarem.
9. Supabase nÃ£o carregar.
10. Tela branca aparecer.
11. AtualizaÃ§Ã£o entrar em loop.
12. Cache prender versÃ£o antiga.
13. Service Worker causar comportamento inesperado.
14. Rollback ficar confuso.
15. O usuÃ¡rio nÃ£o conseguir usar em campo.

Se falhar, parar e diagnosticar.

## 333. Plano de rollback do PWA

Antes de implementar, definir o rollback.

Rollback deve voltar para:

`MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip`

O rollback deve conferir:

1. VersÃ£o restaurada.
2. Build.
3. ProduÃ§Ã£o.
4. `version.json`.
5. DiagnÃ³stico.
6. Desktop.
7. Mobile.
8. iPhone.
9. Supabase.
10. Service Worker.
11. Cache.
12. App instalado, se ainda existir no aparelho.

Rollback PWA pode exigir atenÃ§Ã£o ao app instalado, porque ele pode manter estado ou cache anterior.

## 334. Como tratar o app instalado apÃ³s rollback

Se o PWA jÃ¡ foi instalado e houver rollback, conferir:

1. O app instalado abre a versÃ£o restaurada?
2. O DiagnÃ³stico mostra versÃ£o correta?
3. O app continua preso na versÃ£o problemÃ¡tica?
4. O navegador abre corretamente?
5. O `version.json` estÃ¡ correto?
6. O Service Worker estÃ¡ coerente?
7. O cache estÃ¡ coerente?

Se o app instalado continuar preso, o problema deve ser tratado como cache ou Service Worker, nÃ£o como erro de mÃ³dulo.

## 335. EstratÃ©gia de menor risco

A estratÃ©gia de menor risco Ã©:

1. NÃ£o mudar mÃ³dulos funcionais.
2. NÃ£o mexer em Supabase.
3. NÃ£o mexer em banco.
4. NÃ£o mexer em desktop.
5. NÃ£o mexer em Service Worker sem necessidade.
6. NÃ£o mexer em cache sem necessidade.
7. Criar manifest mÃ­nimo.
8. Criar Ã­cones corretos.
9. Linkar manifest.
10. Testar instalaÃ§Ã£o.
11. Validar diagnÃ³stico.
12. SÃ³ depois pensar em melhorias.

## 336. Ordem oficial da frente PWA

A ordem oficial Ã©:

1. Concluir manual.
2. Salvar manual no projeto.
3. Criar backup antes do PWA.
4. Auditar PWA sem alterar.
5. Definir nome do app.
6. Definir nome curto.
7. Definir Ã­cone.
8. Confirmar manifest.
9. Confirmar Service Worker.
10. Confirmar cache.
11. Confirmar `vercel.json`.
12. Planejar implementaÃ§Ã£o mÃ­nima.
13. Autorizar alteraÃ§Ã£o.
14. Implementar mÃ­nimo.
15. Rodar build.
16. Testar local.
17. Autorizar deploy.
18. Publicar.
19. Testar produÃ§Ã£o.
20. Testar desktop.
21. Testar mobile.
22. Testar iPhone.
23. Testar app instalado.
24. Testar campo.
25. Criar backup pÃ³s validaÃ§Ã£o.

## 337. Comando para Codex iniciar auditoria PWA

Usar este comando quando o manual estiver completo e salvo no projeto:

`Leia obrigatoriamente LEIA-PRIMEIRO-MINI-ERP.md e MANUAL-OFICIAL-MINI-ERP-PWA.md. Estamos iniciando apenas a auditoria da frente PWA do Mini ERP. NÃ£o altere arquivos, nÃ£o gere cÃ³digo, nÃ£o faÃ§a deploy, nÃ£o crie novo projeto e nÃ£o crie segunda base de cÃ³digo. Confirme a versÃ£o atual, a existÃªncia ou ausÃªncia de manifest, Ã­cones, Service Worker, cache, versionamento e regras no vercel.json. Informe os riscos e proponha o plano mÃ­nimo para tornar o Mini ERP instalÃ¡vel como PWA mantendo o desktop exatamente como estÃ¡.`

## 338. Comando para Codex criar backup antes do PWA

Usar depois da auditoria inicial ou antes dela, se for o procedimento escolhido:

`Crie um backup limpo do Mini ERP antes da frente PWA. A pasta oficial Ã© C:\Users\Delber\Mini-ERP\projeto. Nome sugerido: MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip. Inclua src, public, sql se existir, package.json, package-lock.json, vercel.json, README.md, LEIA-PRIMEIRO-MINI-ERP.md e MANUAL-OFICIAL-MINI-ERP-PWA.md. NÃ£o inclua node_modules, .git, .vercel, .env.local, dist salvo justificativa, backups antigos, zips antigos ou arquivos temporÃ¡rios. NÃ£o altere o projeto e nÃ£o publique.`

## 339. Comando para Codex planejar implementaÃ§Ã£o mÃ­nima

Usar somente depois da auditoria:

`Com base na auditoria PWA e nos documentos oficiais, proponha a menor implementaÃ§Ã£o possÃ­vel para tornar o Mini ERP instalÃ¡vel como PWA. NÃ£o altere arquivos ainda. Liste exatamente quais arquivos seriam tocados, por que seriam tocados, qual risco existe, como testar, como validar no desktop, como validar no mobile, como validar no iPhone, como validar o app instalado e como fazer rollback para a versÃ£o 2026.06.24.03.`

## 340. Comando para Codex implementar PWA mÃ­nimo

Usar somente com autorizaÃ§Ã£o explÃ­cita:

`ImplementaÃ§Ã£o PWA mÃ­nima autorizada. Siga o plano aprovado. NÃ£o altere mÃ³dulos funcionais. NÃ£o altere Supabase. NÃ£o altere banco. NÃ£o altere desktop. NÃ£o altere Service Worker ou cache alÃ©m do que foi aprovado explicitamente. FaÃ§a apenas o necessÃ¡rio para manifest, Ã­cones e instalaÃ§Ã£o. Depois liste arquivos alterados, rode npm run build ou npm.cmd run build e informe o checklist de testes. NÃ£o faÃ§a deploy sem nova autorizaÃ§Ã£o.`

## 341. Comando para Codex testar antes de deploy

Usar apÃ³s implementaÃ§Ã£o local:

`Valide a implementaÃ§Ã£o PWA antes de deploy. NÃ£o altere novos arquivos. Rode npm run build ou npm.cmd run build. Liste arquivos alterados. Confirme se Service Worker foi alterado. Confirme se cache foi alterado. Confirme se versionamento foi alterado. Confirme se Supabase foi alterado. Confirme se banco foi alterado. Confirme se desktop foi preservado. Informe o checklist manual para desktop, mobile, iPhone e app instalado.`

## 342. Comando para Codex publicar PWA autorizado

Usar somente depois de teste e autorizaÃ§Ã£o:

`Deploy autorizado da etapa PWA mÃ­nima. Confirme que estÃ¡ em C:\Users\Delber\Mini-ERP\projeto. Confirme que o projeto Ã© mini-erp-canastra. Confirme que nÃ£o Ã© o CatÃ¡logo. Rode npm run build ou npm.cmd run build. Publique com vercel --prod. Depois confira o domÃ­nio oficial, confira version.json online, confira alias da Vercel e informe o checklist de validaÃ§Ã£o em produÃ§Ã£o, desktop, mobile, iPhone e app instalado.`

## 343. Comando para Codex investigar problema no PWA instalado

Usar se o app instalado abrir errado:

`Problema no PWA instalado do Mini ERP. NÃ£o altere arquivos e nÃ£o publique. Investigue possÃ­vel cache, Service Worker, manifest, start_url, scope, version.json e versÃ£o carregada. Compare navegador normal, app instalado, desktop e mobile. Informe quais diagnÃ³sticos o usuÃ¡rio deve coletar e quais prÃ³ximos passos sÃ£o seguros. NÃ£o mexa em mÃ³dulos funcionais.`

## 344. O que nÃ£o entra na estratÃ©gia inicial

NÃ£o entra na primeira etapa:

1. Offline completo.
2. SincronizaÃ§Ã£o offline.
3. NotificaÃ§Ãµes.
4. Recibos.
5. Comprovantes.
6. Redesign.
7. Novo login.
8. Nova navegaÃ§Ã£o.
9. MudanÃ§a em financeiro.
10. MudanÃ§a em cobranÃ§as.
11. MudanÃ§a em vendas.
12. MudanÃ§a em prÃ© vendas.
13. MudanÃ§a em delivery.
14. RefatoraÃ§Ã£o.
15. Novo projeto.

Essas frentes podem ser avaliadas depois.

## 345. O que pode vir depois do PWA estÃ¡vel

Depois que o PWA estiver estÃ¡vel, podem ser abertas frentes separadas:

1. Melhorias mobile especÃ­ficas.
2. Atalhos internos para uso em campo.
3. Recibos e comprovantes bonitos.
4. ConversÃ£o de prÃ© venda para delivery.
5. Melhorias em reconhecimento por voz.
6. Melhorias em cobranÃ§as.
7. OperaÃ§Ã£o offline controlada.
8. DiagnÃ³stico mais completo.
9. Teste de atualizaÃ§Ã£o avanÃ§ado.
10. Melhorias de performance.

Cada frente deve ter auditoria e backup quando necessÃ¡rio.

## 346. RelaÃ§Ã£o entre PWA e recibos bonitos

O PWA pode facilitar o uso em campo, mas nÃ£o precisa incluir recibos na primeira etapa.

Recibos e comprovantes devem ser uma frente posterior.

Motivo:

1. Recibo mexe em layout.
2. Recibo mexe em venda.
3. Recibo mexe em pagamento.
4. Recibo pode envolver imagem ou PDF.
5. Recibo pode envolver WhatsApp.
6. Recibo precisa de teste prÃ³prio.

Primeiro instalar bem.

Depois melhorar comprovantes.

## 347. RelaÃ§Ã£o entre PWA e fluidez

O PWA deve melhorar a fluidez percebida porque abre como aplicativo instalado.

Mas fluidez nÃ£o deve ser confundida com refatoraÃ§Ã£o.

A primeira melhoria de fluidez esperada vem de:

1. Acesso pela tela inicial.
2. Menos distraÃ§Ã£o do navegador.
3. Interface em modo aplicativo.
4. Menos passos para abrir.
5. Uso mais natural em campo.

Melhorias profundas de performance devem ser outra etapa.

## 348. RelaÃ§Ã£o entre PWA e seguranÃ§a operacional

O PWA deve aumentar praticidade sem reduzir seguranÃ§a.

A seguranÃ§a operacional depende de:

1. DiagnÃ³stico visÃ­vel.
2. VersÃ£o correta.
3. AtualizaÃ§Ã£o confiÃ¡vel.
4. Supabase carregando.
5. AusÃªncia de downgrade.
6. Backup antes da mudanÃ§a.
7. Rollback possÃ­vel.
8. Teste em campo.

Se o PWA comprometer qualquer um desses pontos, a implementaÃ§Ã£o deve ser interrompida.

## 349. VersÃ£o recomendada para primeira frente PWA

A base recomendada Ã©:

`2026.06.24.03`

Essa Ã© a versÃ£o estÃ¡vel validada.

Antes de implementar, confirmar no projeto recebido se a versÃ£o continua sendo essa.

Se o ZIP anexado for mais recente, auditar primeiro.

NÃ£o assumir versÃ£o pela conversa.

## 350. Controle de versÃ£o para a primeira entrega PWA

Quando a primeira implementaÃ§Ã£o PWA for autorizada, ela deve receber nova versÃ£o.

A nova versÃ£o deve ser definida antes da publicaÃ§Ã£o.

Exemplo de lÃ³gica:

VersÃ£o base: `2026.06.24.03`

Primeira versÃ£o PWA autorizada: definir uma nova versÃ£o posterior, seguindo padrÃ£o do projeto.

NÃ£o publicar PWA com versÃ£o antiga se houver alteraÃ§Ã£o real.

A nova versÃ£o deve aparecer corretamente no DiagnÃ³stico e no `version.json`.

## 351. Cuidado com versionamento na primeira entrega PWA

Alterar versÃ£o Ã© Ã¡rea protegida.

Mas uma publicaÃ§Ã£o PWA real provavelmente precisarÃ¡ de nova versÃ£o.

Por isso, a mudanÃ§a de versÃ£o deve ser explÃ­cita, planejada e validada.

Conferir:

1. `public/version.json`
2. VersÃ£o interna do aplicativo.
3. Maior versÃ£o aceita.
4. DiagnÃ³stico.
5. `version.json` online.
6. App instalado.
7. AtualizaÃ§Ã£o automÃ¡tica.

NÃ£o alterar versÃ£o sem registrar.

## 352. Checklist antes de iniciar implementaÃ§Ã£o PWA

Antes de implementar, confirmar:

1. Manual concluÃ­do.
2. Manual salvo no projeto.
3. LEIA salvo no projeto.
4. Backup criado.
5. Pasta correta.
6. Projeto correto.
7. VersÃ£o confirmada.
8. Manifest auditado.
9. Ãcones auditados.
10. Service Worker auditado.
11. Cache auditado.
12. `vercel.json` auditado.
13. Desktop preservado como regra.
14. Plano mÃ­nimo aprovado.
15. Rollback definido.

## 353. Checklist depois de implementar localmente

Depois de implementar localmente, confirmar:

1. Arquivos alterados listados.
2. Nenhum mÃ³dulo funcional alterado sem autorizaÃ§Ã£o.
3. Service Worker nÃ£o alterado, ou alteraÃ§Ã£o aprovada.
4. Cache nÃ£o alterado, ou alteraÃ§Ã£o aprovada.
5. Supabase nÃ£o alterado.
6. Banco nÃ£o alterado.
7. Desktop nÃ£o alterado.
8. Build passou.
9. Teste local passou.
10. Checklist manual foi preparado.

## 354. Checklist depois do deploy PWA

Depois do deploy, confirmar:

1. DomÃ­nio oficial correto.
2. Alias correto.
3. `version.json` online correto.
4. DiagnÃ³stico correto.
5. Desktop igual.
6. Mobile navegador funcional.
7. App instalado funcional.
8. Ãcone correto.
9. Nome correto.
10. Tela em modo aplicativo.
11. PrÃ© vendas funcionando.
12. Vendas funcionando.
13. Delivery funcionando.
14. CobranÃ§as funcionando.
15. Supabase funcionando.
16. Sem downgrade.
17. Sem tela branca.
18. Sem erro de atualizaÃ§Ã£o.
19. Campo validado.
20. Backup pÃ³s validaÃ§Ã£o criado.

## 355. ConclusÃ£o operacional da Parte 7

A transformaÃ§Ã£o do Mini ERP em PWA Ã© coerente e possÃ­vel.

A forma correta nÃ£o Ã© criar outro projeto.

A forma correta Ã© transformar o Mini ERP atual em instalÃ¡vel, mantendo a mesma base, o mesmo domÃ­nio, o mesmo Supabase, o mesmo banco e o mesmo deploy.

A primeira etapa deve ser mÃ­nima:

1. Backup.
2. Auditoria.
3. Manifest.
4. Ãcones.
5. InstalaÃ§Ã£o.
6. DiagnÃ³stico.
7. Testes.
8. Desktop preservado.
9. AusÃªncia de downgrade.

Depois que o PWA bÃ¡sico estiver estÃ¡vel, outras frentes podem ser planejadas.

A prÃ³xima parte do manual deve trazer o checklist final de validaÃ§Ã£o, aceite operacional e modelo de retomada para novas conversas.
# MANUAL OFICIAL MINI ERP PWA

## Parte 8: Checklist final, aceite operacional e modelo de retomada para novas conversas

## 356. Objetivo desta parte

Esta parte encerra o manual oficial.

Ela define:

1. Checklist final antes de qualquer aÃ§Ã£o.
2. Checklist final antes do PWA.
3. Checklist final depois do PWA.
4. CritÃ©rios de aceite operacional.
5. Como abrir nova conversa sem perder contexto.
6. Como chamar o Codex sem confusÃ£o.
7. O que fazer quando o usuÃ¡rio estiver perdido.
8. O que nunca fazer.
9. O pacote final de comandos oficiais.

O objetivo Ã© dar um caminho claro, simples e seguro.

## 357. Regra final do projeto

O Mini ERP estÃ¡ estÃ¡vel na versÃ£o:

`2026.06.24.03`

Essa versÃ£o deve ser protegida.

A prÃ³xima frente Ã© PWA instalÃ¡vel.

Mas a ordem correta Ã©:

1. Concluir documentaÃ§Ã£o.
2. Salvar documentaÃ§Ã£o no projeto.
3. Criar backup.
4. Auditar.
5. Planejar.
6. Implementar somente o mÃ­nimo.
7. Testar.
8. Publicar somente com autorizaÃ§Ã£o.
9. Validar em campo.
10. Criar novo backup aprovado.

## 358. Norte operacional simples

Quando houver dÃºvida, seguir este norte:

1. NÃ£o criar projeto novo.
2. NÃ£o criar pasta Aplicativo.
3. NÃ£o criar outro Supabase.
4. NÃ£o criar outro banco.
5. NÃ£o criar outro domÃ­nio.
6. NÃ£o mexer em cÃ³digo antes de backup e auditoria.
7. NÃ£o mexer em Service Worker sem auditoria.
8. NÃ£o mexer em cache sem auditoria.
9. NÃ£o mexer em versionamento sem autorizaÃ§Ã£o.
10. NÃ£o publicar sem autorizaÃ§Ã£o.

O PWA serÃ¡ feito dentro do Mini ERP atual.

Caminho oficial:

`C:\Users\Delber\Mini-ERP\projeto`

## 359. Arquivos oficiais obrigatÃ³rios

A pasta oficial do Mini ERP deve conter:

1. `LEIA-PRIMEIRO-MINI-ERP.md`
2. `MANUAL-OFICIAL-MINI-ERP-PWA.md`

O LEIA Ã© o guia curto.

O MANUAL Ã© o documento mestre.

O Codex deve ler os dois antes de qualquer anÃ¡lise.

## 360. O que o usuÃ¡rio deve fazer depois de concluir este manual

Depois que todas as partes forem reunidas, fazer:

1. Criar o arquivo `MANUAL-OFICIAL-MINI-ERP-PWA.md`.
2. Colar nele todas as partes em sequÃªncia.
3. Salvar esse arquivo dentro de `C:\Users\Delber\Mini-ERP\projeto`.
4. Garantir que `LEIA-PRIMEIRO-MINI-ERP.md` tambÃ©m esteja na mesma pasta.
5. NÃ£o chamar implementaÃ§Ã£o ainda.
6. Primeiro pedir auditoria ao Codex.
7. Depois criar backup limpo.
8. SÃ³ depois planejar PWA.

## 361. Ordem correta dos arquivos no manual

Ao juntar o manual, manter a ordem:

1. Parte 1: Estado atual, arquitetura, mÃ³dulos e regras permanentes.
2. Parte 2: Versionamento, downgrade, Service Worker e cache.
3. Parte 3: Deploy, rollback, backups e conferÃªncia de produÃ§Ã£o.
4. Parte 4: Auditoria, refinamento localizado, testes e comandos do Codex.
5. Parte 5: Refinamentos implementados, funcionalidades aprovadas e pendentes.
6. Parte 6: Riscos conhecidos, pontos intocÃ¡veis e critÃ©rios de decisÃ£o.
7. Parte 7: EstratÃ©gia tÃ©cnica oficial para PWA.
8. Parte 8: Checklist final, aceite operacional e retomada.

NÃ£o deixar partes soltas.

NÃ£o trocar a ordem.

NÃ£o resumir o manual depois de pronto.

## 362. Checklist antes de chamar o Codex

Antes de chamar o Codex, confirmar:

1. O Mini ERP estÃ¡ na pasta oficial.
2. O arquivo `LEIA-PRIMEIRO-MINI-ERP.md` estÃ¡ na pasta.
3. O arquivo `MANUAL-OFICIAL-MINI-ERP-PWA.md` estÃ¡ na pasta.
4. A versÃ£o de referÃªncia Ã© `2026.06.24.03`.
5. O objetivo Ã© PWA instalÃ¡vel.
6. O desktop deve permanecer exatamente como estÃ¡.
7. NÃ£o serÃ¡ criado novo projeto.
8. NÃ£o serÃ¡ criada nova base.
9. NÃ£o haverÃ¡ deploy nesta primeira chamada.
10. O Codex farÃ¡ apenas auditoria.

## 363. Primeiro comando oficial para o Codex

Usar este comando quando o manual estiver salvo dentro da pasta do Mini ERP:

```text
Leia obrigatoriamente estes dois arquivos antes de qualquer anÃ¡lise:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Projeto: Mini ERP Queijos Serra da Canastra.
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
DomÃ­nio oficial: https://mini-erp-canastra.vercel.app
VersÃ£o estÃ¡vel de referÃªncia: 2026.06.24.03

Objetivo desta etapa:

Auditar o projeto atual para preparar a transformaÃ§Ã£o em PWA instalÃ¡vel.

Regras absolutas:

NÃ£o alterar arquivos.
NÃ£o gerar cÃ³digo.
NÃ£o fazer deploy.
NÃ£o criar novo projeto.
NÃ£o criar pasta chamada Aplicativo.
NÃ£o criar segunda base de cÃ³digo.
NÃ£o criar outro Supabase.
NÃ£o criar outro banco.
NÃ£o criar outro domÃ­nio.
NÃ£o modificar Service Worker.
NÃ£o modificar cache.
NÃ£o modificar versionamento.
NÃ£o modificar Supabase.
NÃ£o modificar banco.
NÃ£o modificar arquitetura.
NÃ£o alterar desktop.

Confirme:

1. Se a pasta atual Ã© a pasta oficial.
2. Se o projeto Ã© o Mini ERP e nÃ£o o CatÃ¡logo.
3. Qual versÃ£o local foi encontrada.
4. Se public/version.json existe.
5. Se src/App.jsx contÃ©m versÃ£o interna.
6. Se src/main.jsx contÃ©m referÃªncia de versÃ£o.
7. Se existem public/sw.js e public/service-worker.js.
8. Qual Service Worker parece estar ativo.
9. Se existe manifest.
10. Se existem Ã­cones de PWA.
11. Se existe vercel.json.
12. Se hÃ¡ regras de cache.
13. Se hÃ¡ risco de downgrade.
14. Quais arquivos precisariam ser tocados em uma implementaÃ§Ã£o PWA mÃ­nima.
15. Qual Ã© o plano seguro em etapas, sem implementar ainda.
```

## 364. Comando para criar backup antes do PWA

Depois da auditoria, ou antes da implementaÃ§Ã£o, pedir:

```text
Crie um backup limpo do Mini ERP antes da frente PWA.

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Nome do backup:

MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip

Incluir:

1. src
2. public
3. sql, se existir
4. package.json
5. package-lock.json
6. vercel.json
7. README.md
8. LEIA-PRIMEIRO-MINI-ERP.md
9. MANUAL-OFICIAL-MINI-ERP-PWA.md
10. Demais documentos oficiais necessÃ¡rios

NÃ£o incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. dist, salvo justificativa
6. backups antigos
7. zips antigos
8. arquivos temporÃ¡rios

NÃ£o alterar o projeto.
NÃ£o publicar.
Apenas criar o backup limpo e informar o caminho final.
```

## 365. Comando para planejar PWA mÃ­nimo

Usar somente depois da auditoria:

```text
Com base na auditoria PWA e nos documentos oficiais, proponha a menor implementaÃ§Ã£o possÃ­vel para tornar o Mini ERP instalÃ¡vel como PWA.

NÃ£o altere arquivos ainda.
NÃ£o gere cÃ³digo ainda.
NÃ£o faÃ§a deploy.
NÃ£o crie novo projeto.
NÃ£o crie segunda base de cÃ³digo.
NÃ£o altere desktop.

Liste exatamente:

1. Quais arquivos seriam tocados.
2. Por que cada arquivo seria tocado.
3. Qual trecho atual serÃ¡ afetado.
4. Qual alteraÃ§Ã£o mÃ­nima seria feita.
5. Qual risco existe.
6. Como testar no desktop.
7. Como testar no mobile.
8. Como testar no iPhone.
9. Como testar o app instalado.
10. Como conferir version.json.
11. Como conferir DiagnÃ³stico do Sistema.
12. Como fazer rollback para a versÃ£o 2026.06.24.03.
```

## 366. Comando para implementar PWA mÃ­nimo

Usar somente depois de plano aprovado:

```text
ImplementaÃ§Ã£o PWA mÃ­nima autorizada.

Siga somente o plano aprovado.

Regras:

NÃ£o alterar mÃ³dulos funcionais.
NÃ£o alterar PrÃ©-vendas.
NÃ£o alterar Vendas.
NÃ£o alterar Delivery.
NÃ£o alterar CobranÃ§as.
NÃ£o alterar Financeiro.
NÃ£o alterar RelatÃ³rios.
NÃ£o alterar Clientes.
NÃ£o alterar Produtos.
NÃ£o alterar Supabase.
NÃ£o alterar banco.
NÃ£o alterar desktop.
NÃ£o alterar Service Worker ou cache alÃ©m do que foi aprovado explicitamente.
NÃ£o fazer deploy sem nova autorizaÃ§Ã£o.

FaÃ§a apenas o necessÃ¡rio para tornar o Mini ERP instalÃ¡vel como PWA.

Depois:

1. Liste arquivos alterados.
2. Explique cada alteraÃ§Ã£o.
3. Rode npm run build ou npm.cmd run build.
4. Informe se o build passou.
5. Informe o checklist de testes.
```

## 367. Comando para validar antes de deploy

Usar depois da implementaÃ§Ã£o local:

```text
Valide a implementaÃ§Ã£o PWA antes de deploy.

NÃ£o altere novos arquivos.
NÃ£o faÃ§a deploy.
NÃ£o refatore.

Execute:

1. npm run build ou npm.cmd run build.
2. Confirme se o build passou.
3. Liste arquivos alterados.
4. Confirme se Service Worker foi alterado.
5. Confirme se cache foi alterado.
6. Confirme se versionamento foi alterado.
7. Confirme se Supabase foi alterado.
8. Confirme se banco foi alterado.
9. Confirme se desktop foi preservado.
10. Informe o checklist manual para teste em desktop, mobile, iPhone e app instalado.
```

## 368. Comando para deploy autorizado

Usar somente depois de autorizaÃ§Ã£o explÃ­cita:

```text
Deploy autorizado da etapa PWA mÃ­nima.

Antes de publicar:

1. Confirme que estÃ¡ em C:\Users\Delber\Mini-ERP\projeto.
2. Confirme que o projeto Ã© mini-erp-canastra.
3. Confirme que nÃ£o Ã© o CatÃ¡logo.
4. Rode npm run build ou npm.cmd run build.
5. Confirme que o build passou.
6. Confirme os arquivos alterados.
7. Confirme se Service Worker foi alterado.
8. Confirme se cache foi alterado.
9. Confirme se versionamento foi alterado.
10. Confirme se Supabase ou banco foram alterados.

Depois publique em produÃ§Ã£o com:

vercel --prod

Depois do deploy:

1. Confira o domÃ­nio oficial.
2. Confira version.json online.
3. Confira alias da Vercel.
4. Informe o checklist de validaÃ§Ã£o em produÃ§Ã£o, desktop, mobile, iPhone e app instalado.
```

## 369. Checklist final antes da implementaÃ§Ã£o PWA

Antes de qualquer cÃ³digo, responder sim para tudo:

1. O manual estÃ¡ concluÃ­do.
2. O LEIA estÃ¡ salvo no projeto.
3. O MANUAL estÃ¡ salvo no projeto.
4. A pasta oficial foi confirmada.
5. O projeto correto foi confirmado.
6. A versÃ£o atual foi confirmada.
7. O backup antes do PWA foi criado.
8. O manifest foi auditado.
9. Os Ã­cones foram auditados.
10. O Service Worker foi auditado.
11. O cache foi auditado.
12. O vercel.json foi auditado.
13. O risco de downgrade foi avaliado.
14. O desktop serÃ¡ preservado.
15. O plano mÃ­nimo foi aprovado.
16. O rollback estÃ¡ claro.

Se qualquer resposta for nÃ£o, nÃ£o implementar.

## 370. Checklist final depois da implementaÃ§Ã£o local

Depois de implementar localmente, confirmar:

1. Arquivos alterados foram listados.
2. AlteraÃ§Ãµes foram explicadas.
3. Nenhum mÃ³dulo funcional foi alterado sem autorizaÃ§Ã£o.
4. PrÃ© vendas nÃ£o foram alteradas.
5. Vendas nÃ£o foram alteradas.
6. Delivery nÃ£o foi alterado.
7. CobranÃ§as nÃ£o foram alteradas.
8. Financeiro nÃ£o foi alterado.
9. Supabase nÃ£o foi alterado.
10. Banco nÃ£o foi alterado.
11. Desktop foi preservado.
12. Service Worker nÃ£o foi alterado, ou alteraÃ§Ã£o foi aprovada.
13. Cache nÃ£o foi alterado, ou alteraÃ§Ã£o foi aprovada.
14. Versionamento estÃ¡ coerente.
15. Build passou.
16. Teste local foi feito.
17. Checklist para produÃ§Ã£o estÃ¡ pronto.

## 371. Checklist final depois do deploy

Depois do deploy, confirmar:

1. Deploy terminou sem erro.
2. DomÃ­nio oficial estÃ¡ correto.
3. Alias da Vercel estÃ¡ correto.
4. version.json online mostra versÃ£o esperada.
5. DiagnÃ³stico abre.
6. VersÃ£o do aplicativo estÃ¡ correta.
7. VersÃ£o publicada estÃ¡ correta.
8. Maior versÃ£o aceita estÃ¡ correta.
9. Status da versÃ£o estÃ¡ OK.
10. Service Worker estÃ¡ coerente.
11. Supabase carrega.
12. Clientes carregam.
13. PrÃ© vendas carregam.
14. Vendas carregam.
15. Delivery carrega.
16. CobranÃ§as carregam.
17. Financeiro carrega.
18. RelatÃ³rios carregam.
19. Desktop estÃ¡ igual.
20. Mobile navegador funciona.
21. App instalado abre.
22. App instalado mostra versÃ£o correta.
23. App instalado mostra DiagnÃ³stico.
24. NÃ£o hÃ¡ downgrade.
25. NÃ£o hÃ¡ tela branca.

## 372. Checklist de teste no desktop

No desktop, conferir:

1. Abrir o domÃ­nio oficial.
2. Conferir tela inicial.
3. Conferir menu.
4. Conferir Painel.
5. Conferir Clientes.
6. Conferir PrÃ© vendas.
7. Conferir Vendas.
8. Conferir Delivery.
9. Conferir CobranÃ§as.
10. Conferir Financeiro.
11. Conferir RelatÃ³rios.
12. Conferir DiagnÃ³stico.
13. Conferir versÃ£o.
14. Conferir Supabase.
15. Confirmar que o layout desktop nÃ£o mudou.

## 373. Checklist de teste no mobile navegador

No celular, pelo navegador, conferir:

1. Abrir o domÃ­nio oficial.
2. Conferir barra inferior.
3. Conferir PrÃ© vendas.
4. Conferir Vendas.
5. Conferir CobranÃ§as.
6. Conferir Delivery.
7. Conferir Clientes, se necessÃ¡rio.
8. Conferir DiagnÃ³stico.
9. Conferir versÃ£o.
10. Conferir Supabase.
11. Conferir modais.
12. Conferir campos.
13. Conferir se nÃ£o hÃ¡ zoom indevido.
14. Conferir rolagem.
15. Conferir botÃµes principais.

## 374. Checklist de teste no iPhone

No iPhone, conferir:

1. Abrir no Safari.
2. Conferir DiagnÃ³stico.
3. Conferir versÃ£o.
4. Conferir Supabase.
5. Adicionar Ã  tela inicial, quando aplicÃ¡vel.
6. Abrir pelo Ã­cone.
7. Conferir se abre como app.
8. Conferir PrÃ© vendas.
9. Conferir Vendas.
10. Conferir CobranÃ§as.
11. Conferir Delivery.
12. Conferir modais.
13. Conferir teclado.
14. Conferir zoom.
15. Conferir 4G.
16. Conferir Wi Fi.

## 375. Checklist de teste no app instalado

No app instalado, conferir:

1. Ãcone aparece corretamente.
2. Nome aparece corretamente.
3. App abre pelo Ã­cone.
4. App abre no domÃ­nio correto.
5. App nÃ£o abre outro projeto.
6. App nÃ£o abre CatÃ¡logo.
7. App mostra Mini ERP.
8. DiagnÃ³stico aparece.
9. VersÃ£o do aplicativo estÃ¡ correta.
10. VersÃ£o publicada estÃ¡ correta.
11. Status da versÃ£o estÃ¡ OK.
12. Supabase carrega.
13. PrÃ© vendas carregam.
14. Vendas carregam.
15. CobranÃ§as carregam.
16. Delivery carrega.
17. NÃ£o hÃ¡ tela branca.
18. NÃ£o hÃ¡ downgrade.
19. App funciona em Wi Fi.
20. App funciona em 4G.

## 376. Checklist de teste em campo

Em campo, conferir:

1. Abrir app instalado.
2. Abrir navegador, se necessÃ¡rio.
3. Conferir versÃ£o.
4. Conferir DiagnÃ³stico.
5. Conferir Supabase.
6. Consultar PrÃ© vendas.
7. Consultar CobranÃ§as.
8. Consultar Delivery.
9. Registrar uma operaÃ§Ã£o simples, se seguro.
10. Observar lentidÃ£o.
11. Observar tela branca.
12. Observar retorno para versÃ£o antiga.
13. Observar comportamento em 4G.
14. Observar comportamento fora da residÃªncia.
15. Registrar qualquer anomalia.

## 377. CritÃ©rio final de aceite do PWA

O PWA sÃ³ serÃ¡ aceito quando:

1. Desktop permanecer exatamente como estava.
2. Mobile navegador continuar funcionando.
3. App instalado abrir corretamente.
4. App instalado usar o mesmo domÃ­nio.
5. App instalado usar o mesmo Supabase.
6. App instalado mostrar DiagnÃ³stico.
7. App instalado mostrar versÃ£o correta.
8. App instalado nÃ£o carregar versÃ£o antiga.
9. PrÃ© vendas funcionarem.
10. Vendas funcionarem.
11. Delivery funcionar.
12. CobranÃ§as funcionarem.
13. Financeiro nÃ£o for afetado.
14. RelatÃ³rios nÃ£o forem afetados.
15. Supabase carregar sem erro.
16. AtualizaÃ§Ã£o automÃ¡tica continuar coerente.
17. Service Worker nÃ£o causar problema.
18. Cache nÃ£o causar downgrade.
19. Rollback estiver possÃ­vel.
20. Backup pÃ³s validaÃ§Ã£o for criado.

## 378. CritÃ©rio de rejeiÃ§Ã£o do PWA

Rejeitar a entrega PWA se:

1. Desktop mudar indevidamente.
2. PrÃ© vendas sumirem.
3. DiagnÃ³stico sumir.
4. App instalado abrir versÃ£o antiga.
5. App instalado nÃ£o atualizar.
6. Supabase nÃ£o carregar.
7. CobranÃ§as quebrarem.
8. Delivery quebrar.
9. Vendas quebrarem.
10. Mobile ficar pior.
11. iPhone apresentar tela cortada.
12. Campo apresentar downgrade.
13. Service Worker ficar confuso.
14. Cache prender versÃ£o antiga.
15. Rollback nÃ£o estiver claro.

Se isso acontecer, parar e diagnosticar.

## 379. Procedimento se o usuÃ¡rio ficar perdido

Se o usuÃ¡rio ficar perdido, voltar para o norte simples:

1. Estamos no Mini ERP atual.
2. NÃ£o existe projeto novo chamado Aplicativo.
3. O PWA serÃ¡ uma forma instalada do mesmo Mini ERP.
4. O desktop fica igual.
5. O celular ganha acesso mais fluido.
6. Antes de qualquer cÃ³digo, precisa ter manual e backup.
7. O Codex primeiro audita.
8. Depois planeja.
9. Depois implementa o mÃ­nimo.
10. Deploy sÃ³ com autorizaÃ§Ã£o.

## 380. Resumo ultracurto para o usuÃ¡rio

Quando precisar simplificar, usar este resumo:

```text
Agora o caminho Ã©:

1. Juntar todas as partes do manual.
2. Salvar como MANUAL-OFICIAL-MINI-ERP-PWA.md.
3. Colocar esse arquivo na pasta C:\Users\Delber\Mini-ERP\projeto.
4. Garantir que o LEIA-PRIMEIRO-MINI-ERP.md tambÃ©m estÃ¡ lÃ¡.
5. Pedir ao Codex apenas auditoria.
6. Criar backup antes do PWA.
7. SÃ³ depois planejar implementaÃ§Ã£o.

NÃ£o criar projeto Aplicativo.
NÃ£o criar segunda base.
NÃ£o mexer no desktop.
NÃ£o fazer deploy agora.
```

## 381. Modelo para abrir nova conversa no ChatGPT

Usar este texto em uma nova conversa:

```text
MINI ERP, NOVA FRENTE PWA

Vou anexar:

1. ZIP atualizado do Mini ERP.
2. LEIA-PRIMEIRO-MINI-ERP.md.
3. MANUAL-OFICIAL-MINI-ERP-PWA.md.

Objetivo:

Preparar a transformaÃ§Ã£o do Mini ERP em PWA instalÃ¡vel.

Regras:

NÃ£o gerar cÃ³digo.
NÃ£o alterar arquivos.
NÃ£o fazer deploy.
NÃ£o modificar Service Worker.
NÃ£o modificar cache.
NÃ£o modificar versionamento.
NÃ£o modificar Supabase.
NÃ£o modificar banco.
NÃ£o modificar arquitetura.
NÃ£o criar novo projeto.
NÃ£o criar segunda base de cÃ³digo.
Manter o desktop exatamente como estÃ¡.

Primeira tarefa:

Auditar o ZIP e os documentos oficiais.

Confirmar:

1. VersÃ£o atual.
2. Estrutura do projeto.
3. Arquivos de PWA existentes ou ausentes.
4. Service Worker.
5. Cache.
6. version.json.
7. vercel.json.
8. Riscos de downgrade.
9. Plano seguro para PWA mÃ­nimo.
```

## 382. Modelo para nova conversa de investigaÃ§Ã£o de downgrade

Usar se voltar a aparecer versÃ£o antiga:

```text
MINI ERP, SUSPEITA DE DOWNGRADE

Contexto:

O Mini ERP jÃ¡ teve incidente grave de downgrade envolvendo Service Worker, cache, versionamento e atualizaÃ§Ã£o automÃ¡tica.

VersÃ£o estÃ¡vel de referÃªncia:

2026.06.24.03

DomÃ­nio oficial:

https://mini-erp-canastra.vercel.app

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Regras:

NÃ£o alterar arquivos.
NÃ£o gerar cÃ³digo.
NÃ£o fazer deploy.
NÃ£o fazer rollback ainda.
NÃ£o mexer em mÃ³dulos funcionais.
NÃ£o mexer em Supabase.
NÃ£o mexer em banco.

Primeira tarefa:

Auditar evidÃªncias e pedir diagnÃ³stico.

Verificar:

1. VersÃ£o do aplicativo.
2. VersÃ£o publicada.
3. Maior versÃ£o aceita.
4. Status da versÃ£o.
5. Service Worker.
6. Cache.
7. version.json online.
8. Vercel alias.
9. Desktop.
10. Mobile.
11. iPhone.
12. App instalado, se existir.
```

## 383. Modelo para nova conversa de refinamento localizado

Usar para ajuste pequeno:

```text
MINI ERP, REFINAMENTO LOCALIZADO

Vou anexar o ZIP atual e os documentos oficiais.

Leia primeiro:

1. LEIA-PRIMEIRO-MINI-ERP.md.
2. MANUAL-OFICIAL-MINI-ERP-PWA.md.

Objetivo:

Fazer apenas um refinamento localizado.

Regras:

NÃ£o refatorar.
NÃ£o percorrer o projeto inteiro sem necessidade.
NÃ£o alterar Service Worker.
NÃ£o alterar cache.
NÃ£o alterar versionamento.
NÃ£o alterar Supabase.
NÃ£o alterar banco.
NÃ£o alterar arquitetura.
NÃ£o alterar mÃ³dulos nÃ£o relacionados.
NÃ£o fazer deploy sem autorizaÃ§Ã£o.

Antes de alterar:

1. Identifique o arquivo exato.
2. Mostre o trecho atual.
3. Explique o comportamento atual.
4. Explique a alteraÃ§Ã£o mÃ­nima.
5. Informe riscos.
6. Informe testes.
```

## 384. Modelo para nova conversa de backup

Usar quando quiser criar backup:

```text
MINI ERP, BACKUP DE SEGURANÃ‡A

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Objetivo:

Criar backup limpo da versÃ£o atual.

Regras:

NÃ£o alterar arquivos.
NÃ£o gerar cÃ³digo.
NÃ£o fazer deploy.
NÃ£o mexer em Service Worker.
NÃ£o mexer em cache.
NÃ£o mexer em versionamento.
NÃ£o mexer em Supabase.
NÃ£o mexer em banco.

O backup deve incluir:

1. src
2. public
3. sql, se existir
4. package.json
5. package-lock.json
6. vercel.json
7. README.md
8. LEIA-PRIMEIRO-MINI-ERP.md
9. MANUAL-OFICIAL-MINI-ERP-PWA.md
10. Documentos oficiais

NÃ£o incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. backups antigos
6. zips antigos
7. arquivos temporÃ¡rios
```

## 385. Modelo para nova conversa de deploy

Usar somente quando jÃ¡ estiver autorizado:

```text
MINI ERP, DEPLOY AUTORIZADO

Leia os documentos oficiais antes de agir:

1. LEIA-PRIMEIRO-MINI-ERP.md.
2. MANUAL-OFICIAL-MINI-ERP-PWA.md.

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Projeto Vercel:

mini-erp-canastra

DomÃ­nio oficial:

https://mini-erp-canastra.vercel.app

Objetivo:

Publicar a versÃ£o validada.

Antes de publicar:

1. Confirmar pasta.
2. Confirmar projeto.
3. Confirmar versÃ£o.
4. Rodar npm run build ou npm.cmd run build.
5. Confirmar arquivos alterados.
6. Confirmar que Service Worker, cache, Supabase, banco e desktop nÃ£o foram alterados indevidamente.

Depois de publicar:

1. Conferir domÃ­nio oficial.
2. Conferir version.json online.
3. Conferir alias Vercel.
4. Conferir DiagnÃ³stico.
5. Informar checklist para desktop, mobile e iPhone.
```

## 386. Modelo para nova conversa de rollback

Usar em caso de problema grave:

```text
MINI ERP, AVALIAÃ‡ÃƒO DE ROLLBACK

NÃ£o executar rollback ainda.

Primeiro avaliar.

Contexto:

O Mini ERP estÃ¡ em produÃ§Ã£o e possui versÃ£o estÃ¡vel de referÃªncia 2026.06.24.03.

Regras:

NÃ£o alterar arquivos.
NÃ£o publicar.
NÃ£o apagar nada.
NÃ£o mexer em Service Worker.
NÃ£o mexer em cache.
NÃ£o mexer em Supabase.
NÃ£o mexer em banco.

Primeira tarefa:

Avaliar se rollback Ã© necessÃ¡rio.

Informar:

1. VersÃ£o atual.
2. VersÃ£o publicada.
3. Sintoma.
4. MÃ³dulos afetados.
5. Se hÃ¡ suspeita de cache.
6. Se hÃ¡ suspeita de Service Worker.
7. Se hÃ¡ suspeita de Supabase.
8. Qual backup deve ser usado.
9. Plano de rollback.
10. Riscos.
```

## 387. Lista de coisas que nunca devem ser pedidas ao Codex sem contexto

Nunca pedir de forma vaga:

1. â€œTransforma em app.â€
2. â€œFaz virar aplicativo.â€
3. â€œArruma o cache.â€
4. â€œAtualiza o Service Worker.â€
5. â€œPublica aÃ­.â€
6. â€œRefatora o projeto.â€
7. â€œMelhora o mobile todo.â€
8. â€œOrganiza o cÃ³digo.â€
9. â€œFaz uma versÃ£o separada.â€
10. â€œCria outro projeto.â€

Esses pedidos sÃ£o perigosos porque abrem margem para alteraÃ§Ã£o ampla.

## 388. Forma correta de pedir ao Codex

A forma correta Ã© sempre especÃ­fica:

1. Dizer que Ã© Mini ERP.
2. Dizer a pasta oficial.
3. Dizer o domÃ­nio oficial.
4. Dizer a versÃ£o estÃ¡vel.
5. Dizer o objetivo.
6. Dizer o que nÃ£o pode fazer.
7. Dizer se Ã© auditoria, refinamento, backup, deploy ou rollback.
8. Exigir que leia LEIA e MANUAL.
9. Pedir lista de arquivos afetados.
10. Pedir riscos e testes.

## 389. Checklist de seguranÃ§a para qualquer resposta do Codex

Depois que o Codex responder, conferir se ele respeitou:

1. Leu os documentos.
2. NÃ£o sugeriu projeto novo.
3. NÃ£o sugeriu segunda base.
4. NÃ£o confundiu Mini ERP com CatÃ¡logo.
5. NÃ£o propÃ´s mexer no desktop sem necessidade.
6. NÃ£o propÃ´s mexer em Service Worker sem auditoria.
7. NÃ£o propÃ´s mexer em cache sem auditoria.
8. NÃ£o propÃ´s deploy sem autorizaÃ§Ã£o.
9. NÃ£o ignorou versionamento.
10. NÃ£o ignorou rollback.
11. NÃ£o ignorou backup.
12. NÃ£o inventou caminho diferente.

Se falhar nisso, parar e corrigir o rumo.

## 390. Checklist de aceite da auditoria do Codex

A auditoria do Codex sÃ³ serÃ¡ considerada boa se responder:

1. Qual pasta foi auditada.
2. Qual versÃ£o encontrou.
3. Quais arquivos principais existem.
4. Se existe manifest.
5. Se existem Ã­cones.
6. Se existe Service Worker.
7. Qual arquivo de Service Worker existe.
8. Se existe cache sensÃ­vel.
9. Se existe vercel.json.
10. Se version.json estÃ¡ presente.
11. Se App.jsx tem versÃ£o.
12. Se main.jsx tem versÃ£o.
13. Quais mÃ³dulos existem.
14. Quais riscos existem.
15. Qual plano mÃ­nimo recomenda.
16. O que nÃ£o deve ser alterado.

## 391. Checklist de aceite do backup

O backup sÃ³ serÃ¡ aceito se:

1. Tiver nome claro.
2. Tiver versÃ£o no nome.
3. Estiver fora de node_modules.
4. NÃ£o incluir .env.local.
5. NÃ£o incluir .git.
6. NÃ£o incluir .vercel.
7. NÃ£o incluir backups antigos.
8. NÃ£o incluir zips antigos.
9. Incluir src.
10. Incluir public.
11. Incluir package.json.
12. Incluir package-lock.json.
13. Incluir vercel.json.
14. Incluir LEIA.
15. Incluir MANUAL.
16. Incluir sql, se existir.

## 392. Checklist de aceite da implementaÃ§Ã£o PWA mÃ­nima

A implementaÃ§Ã£o mÃ­nima sÃ³ serÃ¡ aceita se:

1. Tocar apenas os arquivos aprovados.
2. NÃ£o alterar mÃ³dulos funcionais.
3. NÃ£o alterar desktop.
4. NÃ£o alterar Supabase.
5. NÃ£o alterar banco.
6. NÃ£o alterar Service Worker sem aprovaÃ§Ã£o.
7. NÃ£o alterar cache sem aprovaÃ§Ã£o.
8. Manifest estiver correto.
9. Ãcones estiverem corretos.
10. App puder ser instalado.
11. Build passar.
12. DiagnÃ³stico continuar funcionando.
13. Versionamento continuar coerente.
14. Rollback continuar possÃ­vel.

## 393. Checklist de aceite em produÃ§Ã£o

A produÃ§Ã£o sÃ³ serÃ¡ aceita se:

1. DomÃ­nio oficial abrir.
2. version.json online estiver correto.
3. DiagnÃ³stico mostrar status OK.
4. Desktop funcionar.
5. Mobile funcionar.
6. App instalado funcionar.
7. Supabase carregar.
8. PrÃ© vendas carregar.
9. Vendas carregar.
10. Delivery carregar.
11. CobranÃ§as carregar.
12. Financeiro carregar.
13. RelatÃ³rios carregar.
14. NÃ£o houver tela branca.
15. NÃ£o houver downgrade.

## 394. Checklist de aceite em campo

A versÃ£o sÃ³ serÃ¡ realmente aprovada em campo se:

1. Abrir fora de casa.
2. Abrir em 4G.
3. Abrir no iPhone.
4. Abrir pelo app instalado.
5. Mostrar versÃ£o correta.
6. Mostrar DiagnÃ³stico.
7. Carregar dados.
8. NÃ£o perder PrÃ© vendas.
9. NÃ£o perder CobranÃ§as.
10. NÃ£o perder Delivery.
11. NÃ£o voltar para versÃ£o antiga.
12. NÃ£o atrapalhar a operaÃ§Ã£o real.

## 395. Procedimento se a auditoria encontrar problemas

Se a auditoria encontrar problema:

1. NÃ£o implementar PWA.
2. Classificar o problema.
3. Confirmar se Ã© versÃ£o, cache, Service Worker, Supabase, banco, deploy ou cÃ³digo.
4. Resolver primeiro o risco estrutural.
5. Rodar build.
6. Testar.
7. Atualizar documentaÃ§Ã£o, se necessÃ¡rio.
8. SÃ³ depois retomar PWA.

NÃ£o construir PWA em cima de base duvidosa.

## 396. Procedimento se o backup falhar

Se o backup falhar:

1. NÃ£o implementar.
2. Verificar permissÃµes.
3. Verificar arquivos grandes.
4. Verificar se node_modules foi incluÃ­do por engano.
5. Verificar se hÃ¡ zip antigo dentro da pasta.
6. Corrigir a seleÃ§Ã£o dos arquivos.
7. Gerar novo backup.
8. Conferir nome.
9. SÃ³ depois continuar.

Sem backup, nÃ£o iniciar PWA.

## 397. Procedimento se o build falhar

Se o build falhar:

1. NÃ£o publicar.
2. Ler o erro.
3. Identificar arquivo.
4. Verificar se o erro veio da alteraÃ§Ã£o PWA.
5. Corrigir de forma localizada.
6. Rodar build novamente.
7. NÃ£o mexer em mÃ³dulos nÃ£o relacionados.
8. NÃ£o fazer deploy.

Build falhando bloqueia deploy.

## 398. Procedimento se o deploy falhar

Se o deploy falhar:

1. NÃ£o tentar vÃ¡rias vezes no impulso.
2. Ler a mensagem.
3. Confirmar pasta.
4. Confirmar projeto Vercel.
5. Confirmar login Vercel.
6. Confirmar build.
7. Confirmar conexÃ£o.
8. Confirmar se o problema Ã© temporÃ¡rio.
9. NÃ£o alterar cÃ³digo sem motivo.
10. Tentar novamente apenas depois de entender.

## 399. Procedimento se o PWA instalar, mas abrir errado

Se instalar, mas abrir errado:

1. Abrir DiagnÃ³stico dentro do app.
2. Conferir versÃ£o do app.
3. Conferir versÃ£o publicada.
4. Conferir start_url.
5. Conferir scope.
6. Conferir manifest.
7. Conferir Service Worker.
8. Conferir cache.
9. Conferir navegador normal.
10. Conferir desktop.
11. NÃ£o mexer em mÃ³dulos funcionais.
12. Tratar como problema de PWA, cache ou Service Worker.

## 400. Procedimento se o app instalado prender versÃ£o antiga

Se o app instalado prender versÃ£o antiga:

1. Suspeitar de Service Worker.
2. Suspeitar de cache.
3. Conferir version.json online.
4. Conferir DiagnÃ³stico no navegador.
5. Conferir DiagnÃ³stico no app instalado.
6. Comparar versÃµes.
7. Conferir se o Service Worker estÃ¡ controlando.
8. Conferir se version.json estÃ¡ cacheado.
9. Conferir se HTML estÃ¡ cacheado.
10. NÃ£o alterar PrÃ© vendas, Vendas, CobranÃ§as ou Delivery.
11. NÃ£o publicar correÃ§Ã£o sem auditoria.

## 401. Procedimento se desktop mudar apÃ³s PWA

Se desktop mudar:

1. Rejeitar a entrega.
2. Identificar arquivo alterado.
3. Confirmar se foi CSS global.
4. Confirmar se foi App.jsx.
5. Confirmar se foi navegaÃ§Ã£o.
6. Reverter alteraÃ§Ã£o que afetou desktop.
7. Testar desktop novamente.
8. NÃ£o aceitar PWA com desktop alterado.

Desktop preservado Ã© regra absoluta.

## 402. Procedimento se mobile piorar apÃ³s PWA

Se mobile piorar:

1. Identificar tela afetada.
2. Conferir se Ã© navegador ou app instalado.
3. Conferir iPhone.
4. Conferir Chrome mobile.
5. Conferir CSS alterado.
6. Conferir manifest, se afetar visual do app.
7. Conferir se hÃ¡ problema de tela cheia.
8. Corrigir apenas o necessÃ¡rio.
9. NÃ£o mexer no desktop.
10. NÃ£o mexer em mÃ³dulos nÃ£o relacionados.

## 403. Procedimento se Supabase falhar apÃ³s PWA

Se Supabase falhar apÃ³s PWA:

1. Conferir se Supabase foi alterado.
2. Conferir se banco foi alterado.
3. Conferir DiagnÃ³stico.
4. Conferir erro de sincronizaÃ§Ã£o.
5. Conferir rede.
6. Conferir navegador normal.
7. Conferir app instalado.
8. Conferir se Ã© problema de versÃ£o.
9. NÃ£o alterar banco sem autorizaÃ§Ã£o.
10. NÃ£o publicar tentativa sem entender.

## 404. Procedimento se PrÃ© vendas falhar apÃ³s PWA

Se PrÃ© vendas falhar apÃ³s PWA:

1. Conferir se PrÃ© vendas foi alterado.
2. Se nÃ£o foi alterado, suspeitar de versÃ£o, cache ou Service Worker.
3. Conferir DiagnÃ³stico.
4. Conferir Supabase.
5. Conferir filtro por data.
6. Conferir paginaÃ§Ã£o.
7. Conferir navegador normal.
8. Conferir app instalado.
9. NÃ£o refazer o mÃ³dulo.
10. Corrigir apenas depois de localizar causa.

## 405. Procedimento se CobranÃ§as falhar apÃ³s PWA

Se CobranÃ§as falhar apÃ³s PWA:

1. Conferir se CobranÃ§as foi alterado.
2. Conferir versÃ£o.
3. Conferir Supabase.
4. Conferir cliente com pendÃªncia.
5. Conferir cliente com mÃºltiplas pendÃªncias.
6. Conferir app instalado.
7. Conferir navegador normal.
8. NÃ£o alterar financeiro sem prova.
9. Corrigir de forma localizada.

## 406. Procedimento se Delivery falhar apÃ³s PWA

Se Delivery falhar apÃ³s PWA:

1. Conferir se Delivery foi alterado.
2. Conferir versÃ£o.
3. Conferir Supabase.
4. Conferir Nova Entrega.
5. Conferir modal.
6. Conferir status.
7. Conferir app instalado.
8. Conferir navegador normal.
9. Corrigir apenas depois de localizar causa.

## 407. Registro final de versÃ£o PWA

Quando a primeira versÃ£o PWA for criada, registrar:

1. VersÃ£o base.
2. Nova versÃ£o.
3. Data.
4. Arquivos alterados.
5. Se manifest foi criado ou alterado.
6. Se Ã­cones foram criados ou alterados.
7. Se HTML de entrada foi alterado.
8. Se Service Worker foi alterado.
9. Se cache foi alterado.
10. Se versionamento foi alterado.
11. Resultado do build.
12. Resultado no desktop.
13. Resultado no mobile.
14. Resultado no iPhone.
15. Resultado no app instalado.
16. Resultado em campo.
17. Backup antes.
18. Backup depois.
19. PendÃªncias.
20. Riscos remanescentes.

## 408. Modelo de registro pÃ³s PWA

Usar este modelo depois de validar o PWA:

```text
REGISTRO PÃ“S PWA MINI ERP

Data:
VersÃ£o base:
Nova versÃ£o:
ResponsÃ¡vel:
Pasta:
DomÃ­nio:

Arquivos alterados:

1.
2.
3.

Service Worker foi alterado?
Cache foi alterado?
Versionamento foi alterado?
Supabase foi alterado?
Banco foi alterado?
Desktop foi alterado?

Resultado do build:

Resultado desktop:

Resultado mobile navegador:

Resultado iPhone:

Resultado app instalado:

Resultado em 4G:

Resultado Supabase:

Resultado DiagnÃ³stico:

Houve downgrade?

Backup antes do PWA:

Backup pÃ³s validaÃ§Ã£o:

PendÃªncias:

ConclusÃ£o:
```

## 409. Modelo de relatÃ³rio de problema

Usar se houver erro:

```text
RELATÃ“RIO DE PROBLEMA MINI ERP

Data:
Hora:
Local:
Rede:
Dispositivo:
Navegador:
App instalado ou navegador:

VersÃ£o do aplicativo:
VersÃ£o publicada:
Maior versÃ£o aceita:
Status da versÃ£o:
Service Worker disponÃ­vel:
Service Worker controlando:
Supabase:
Ãšltima atualizaÃ§Ã£o de dados:
Erro de sincronizaÃ§Ã£o:

MÃ³dulo afetado:

Sintoma:

Acontece no desktop?
Acontece no mobile?
Acontece no app instalado?
Acontece em aba anÃ´nima?
Acontece em 4G?
Acontece em Wi Fi?

version.json online confere?

Prints anexados:

ConclusÃ£o inicial:
```

## 410. Modelo de comando para analisar problema com print

Usar quando houver print de erro:

```text
Analise os prints anexados do Mini ERP.

Contexto:

Projeto em produÃ§Ã£o.
VersÃ£o estÃ¡vel de referÃªncia: 2026.06.24.03.
Frente atual: PWA instalÃ¡vel.
Desktop deve permanecer preservado.

Regras:

NÃ£o propor cÃ³digo ainda.
NÃ£o propor deploy.
NÃ£o mexer em Service Worker.
NÃ£o mexer em cache.
NÃ£o mexer em versionamento.
NÃ£o mexer em Supabase.
NÃ£o mexer em banco.

Primeiro identifique:

1. O que o print mostra.
2. Se parece versÃ£o antiga.
3. Se parece erro visual.
4. Se parece erro de dados.
5. Se parece problema de cache.
6. Se parece problema de Service Worker.
7. Qual diagnÃ³stico pedir.
8. Qual prÃ³ximo passo seguro.
```

## 411. Modelo de comando para continuar o manual em outra conversa

Se precisar continuar o manual em outra conversa:

```text
Estou continuando o MANUAL-OFICIAL-MINI-ERP-PWA.md.

JÃ¡ foram criadas as partes:

1. Estado atual, arquitetura, mÃ³dulos e regras.
2. Versionamento, downgrade, Service Worker e cache.
3. Deploy, rollback, backups e produÃ§Ã£o.
4. Auditoria, refinamento localizado, testes e comandos.
5. Refinamentos implementados, aprovados e pendentes.
6. Riscos, pontos intocÃ¡veis e critÃ©rios de decisÃ£o.
7. EstratÃ©gia tÃ©cnica oficial para PWA.
8. Checklist final, aceite e retomada.

Objetivo:

Revisar o manual completo, remover duplicidades graves, preservar conteÃºdo tÃ©cnico e preparar uma versÃ£o final Ãºnica para salvar no projeto.

Regras:

NÃ£o resumir demais.
NÃ£o omitir histÃ³rico de downgrade.
NÃ£o omitir Service Worker.
NÃ£o omitir cache.
NÃ£o omitir versionamento.
NÃ£o omitir deploy e rollback.
NÃ£o alterar decisÃµes do projeto.
```

## 412. O que fazer se houver conflito entre LEIA e MANUAL

Se houver conflito:

1. NÃ£o agir no impulso.
2. Comparar os dois documentos.
3. Conferir o ZIP atual.
4. Conferir a versÃ£o real.
5. Conferir o cÃ³digo.
6. Atualizar o documento que estiver desatualizado.
7. Registrar a correÃ§Ã£o.
8. NÃ£o implementar antes de resolver.

O LEIA Ã© guia curto.

O MANUAL Ã© documento mestre.

Mas o cÃ³digo auditado e a versÃ£o real sempre precisam ser conferidos.

## 413. Regra sobre informaÃ§Ãµes antigas da conversa

InformaÃ§Ã£o de conversa antiga ajuda, mas nÃ£o substitui auditoria.

Antes de agir, sempre conferir:

1. ZIP atual.
2. Arquivos reais.
3. VersÃ£o real.
4. public/version.json.
5. App.jsx.
6. main.jsx.
7. Service Worker.
8. vercel.json.
9. Supabase.
10. DiagnÃ³stico.

MemÃ³ria nÃ£o deve mandar mais que evidÃªncia.

## 414. Regra sobre anexos

Quando o usuÃ¡rio anexar ZIP:

1. Auditar antes de qualquer coisa.
2. Confirmar versÃ£o.
3. Confirmar se Ã© Mini ERP.
4. Confirmar se nÃ£o Ã© CatÃ¡logo.
5. Confirmar estrutura.
6. Confirmar arquivos crÃ­ticos.
7. Confirmar riscos.
8. NÃ£o alterar.
9. NÃ£o publicar.
10. Entregar diagnÃ³stico.

## 415. Regra sobre prints

Quando o usuÃ¡rio mandar print:

1. Ler o print com cuidado.
2. Identificar tela.
3. Identificar mÃ³dulo.
4. Identificar se parece versÃ£o antiga.
5. Pedir ou usar DiagnÃ³stico, se necessÃ¡rio.
6. NÃ£o concluir sem comparar com versÃ£o.
7. NÃ£o propor alteraÃ§Ã£o ampla.
8. Relacionar com histÃ³rico de downgrade quando fizer sentido.

## 416. Regra sobre mensagens de erro

Quando aparecer erro tÃ©cnico:

1. Copiar erro completo.
2. NÃ£o resumir demais.
3. Identificar arquivo citado.
4. Identificar linha, se houver.
5. Relacionar com Ãºltima alteraÃ§Ã£o.
6. Rodar build, se aplicÃ¡vel.
7. NÃ£o publicar enquanto houver erro.
8. Corrigir de forma localizada.

## 417. Regra sobre ansiedade operacional

Quando houver inseguranÃ§a, a resposta deve ser simples.

O projeto deve voltar ao bÃ¡sico:

1. Qual Ã© a versÃ£o?
2. Qual Ã© a pasta?
3. Qual Ã© o domÃ­nio?
4. O diagnÃ³stico estÃ¡ OK?
5. O Supabase carregou?
6. O desktop estÃ¡ igual?
7. O mobile funciona?
8. O backup existe?
9. O rollback Ã© possÃ­vel?
10. O Codex leu os documentos?

Se essas perguntas estiverem respondidas, o projeto estÃ¡ sob controle.

## 418. DecisÃ£o final sobre a frente PWA

A frente PWA estÃ¡ aprovada como direÃ§Ã£o.

Mas a implementaÃ§Ã£o depende de:

1. Manual concluÃ­do.
2. Manual salvo.
3. LEIA salvo.
4. Backup criado.
5. Auditoria do Codex.
6. Plano mÃ­nimo aprovado.
7. AutorizaÃ§Ã£o explÃ­cita.
8. Build aprovado.
9. Testes aprovados.
10. Deploy autorizado.

Sem isso, nÃ£o implementar.

## 419. DecisÃ£o final sobre aplicativo

O aplicativo serÃ¡ um PWA instalado do Mini ERP.

NÃ£o serÃ¡:

1. App nativo.
2. App de loja.
3. Projeto novo.
4. Pasta nova.
5. Banco novo.
6. Supabase novo.
7. DomÃ­nio novo.
8. Sistema separado.

SerÃ¡:

1. Mesmo Mini ERP.
2. Mesmo cÃ³digo.
3. Mesmo domÃ­nio.
4. Mesmo Supabase.
5. Mesmo banco.
6. Mesmo deploy.
7. Desktop preservado.
8. Mobile mais fluido.

## 420. DecisÃ£o final sobre desktop

O desktop fica como estÃ¡.

Essa Ã© uma regra de aceite.

Se uma implementaÃ§Ã£o PWA alterar o desktop de forma indevida, a entrega deve ser rejeitada.

## 421. DecisÃ£o final sobre mobile

O mobile deve ficar mais prÃ¡tico, mas nÃ£o pode ficar mais arriscado.

Prioridades do mobile:

1. Abrir rÃ¡pido.
2. Abrir pelo Ã­cone.
3. Mostrar PrÃ© vendas.
4. Mostrar Vendas.
5. Mostrar CobranÃ§as.
6. Mostrar Delivery.
7. Mostrar DiagnÃ³stico.
8. NÃ£o dar zoom indevido.
9. NÃ£o cortar modal.
10. NÃ£o carregar versÃ£o antiga.

## 422. DecisÃ£o final sobre Service Worker

Service Worker sÃ³ serÃ¡ alterado se a auditoria provar necessidade.

NÃ£o alterar por suposiÃ§Ã£o.

NÃ£o alterar por entusiasmo tÃ©cnico.

NÃ£o alterar junto com vÃ¡rias mudanÃ§as.

Qualquer alteraÃ§Ã£o em Service Worker precisa de:

1. Justificativa.
2. Arquivo exato.
3. Trecho atual.
4. Trecho proposto.
5. Risco.
6. Teste.
7. Rollback.
8. ValidaÃ§Ã£o em desktop.
9. ValidaÃ§Ã£o em mobile.
10. ValidaÃ§Ã£o no app instalado.

## 423. DecisÃ£o final sobre cache

Cache sÃ³ serÃ¡ alterado se a auditoria provar necessidade.

O cache nÃ£o pode prender versÃ£o antiga.

O cache nÃ£o pode prender version.json.

O cache nÃ£o pode esconder atualizaÃ§Ã£o.

O cache nÃ£o pode causar downgrade.

## 424. DecisÃ£o final sobre versionamento

Toda nova versÃ£o publicada deve ter versionamento coerente.

Conferir:

1. public/version.json.
2. VersÃ£o interna do aplicativo.
3. main.jsx, se houver referÃªncia.
4. Maior versÃ£o aceita.
5. DiagnÃ³stico.
6. version.json online.
7. App instalado.

VersÃ£o errada bloqueia deploy.

## 425. DecisÃ£o final sobre Supabase

Supabase nÃ£o serÃ¡ alterado na frente PWA inicial.

Se algum problema aparecer em dados, investigar antes.

NÃ£o alterar tabela.

NÃ£o alterar polÃ­tica.

NÃ£o alterar sincronizaÃ§Ã£o.

NÃ£o alterar banco.

## 426. DecisÃ£o final sobre operaÃ§Ã£o offline

Offline fica para depois.

A primeira etapa PWA nÃ£o deve incluir sincronizaÃ§Ã£o offline.

Offline serÃ¡ outra frente, com planejamento prÃ³prio.

## 427. DecisÃ£o final sobre recibos

Recibos e comprovantes ficam para depois.

Eles sÃ£o uma frente futura.

NÃ£o entram na primeira implementaÃ§Ã£o PWA.

## 428. DecisÃ£o final sobre notificaÃ§Ãµes

NotificaÃ§Ãµes ficam para depois.

NÃ£o entram no PWA inicial.

## 429. DecisÃ£o final sobre refinamentos

Refinamentos futuros devem ser feitos um por vez.

NÃ£o misturar:

1. PWA com PrÃ© vendas.
2. PWA com CobranÃ§as.
3. PWA com Delivery.
4. PWA com Financeiro.
5. PWA com reconhecimento por voz.
6. PWA com recibos.
7. PWA com offline.

Primeiro estabilizar PWA.

Depois abrir novas frentes.

## 430. Checklist mestre de seguranÃ§a

Antes de qualquer aÃ§Ã£o importante, conferir:

1. Pasta correta.
2. Projeto correto.
3. DomÃ­nio correto.
4. VersÃ£o correta.
5. Backup existente.
6. LEIA presente.
7. MANUAL presente.
8. Codex orientado.
9. Escopo pequeno.
10. Ãreas protegidas preservadas.
11. Build possÃ­vel.
12. Teste definido.
13. Rollback possÃ­vel.
14. Deploy autorizado.
15. ProduÃ§Ã£o conferida.

## 431. Checklist mestre de Ã¡reas protegidas

Ãreas protegidas:

1. Service Worker.
2. Cache.
3. Versionamento.
4. AtualizaÃ§Ã£o automÃ¡tica.
5. Supabase.
6. Banco.
7. SincronizaÃ§Ã£o.
8. Deploy.
9. vercel.json.
10. Arquitetura.
11. Desktop.
12. DiagnÃ³stico.
13. Dados.
14. Backups.
15. Projeto Vercel.

## 432. Checklist mestre de mÃ³dulos crÃ­ticos

MÃ³dulos crÃ­ticos:

1. Clientes.
2. PrÃ© vendas.
3. Vendas.
4. Delivery.
5. CobranÃ§as.
6. Financeiro.
7. RelatÃ³rios.
8. Produtos.
9. Pagamentos.
10. DiagnÃ³stico.

Esses mÃ³dulos precisam continuar funcionando depois de qualquer alteraÃ§Ã£o.

## 433. Checklist mestre do PWA

Para o PWA, confirmar:

1. Manifest.
2. Ãcones.
3. Nome do app.
4. Nome curto.
5. start_url.
6. scope.
7. display.
8. theme_color.
9. background_color.
10. Link do manifest.
11. Service Worker auditado.
12. Cache auditado.
13. version.json preservado.
14. DiagnÃ³stico preservado.
15. Desktop preservado.
16. Mobile funcional.
17. App instalado funcional.
18. AtualizaÃ§Ã£o coerente.
19. Sem downgrade.
20. Backup pÃ³s validaÃ§Ã£o.

## 434. Comando final mais seguro para iniciar a prÃ³xima etapa

Quando tudo estiver pronto, este Ã© o comando mais seguro para comeÃ§ar:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Estamos iniciando a frente PWA do Mini ERP.

Nesta etapa, faÃ§a apenas auditoria.

NÃ£o altere arquivos.
NÃ£o gere cÃ³digo.
NÃ£o faÃ§a deploy.
NÃ£o crie novo projeto.
NÃ£o crie segunda base.
NÃ£o altere desktop.
NÃ£o altere Service Worker.
NÃ£o altere cache.
NÃ£o altere versionamento.
NÃ£o altere Supabase.
NÃ£o altere banco.

Confirme a versÃ£o atual, os arquivos relacionados a PWA, Service Worker, cache, versionamento e Vercel.

Depois entregue um plano mÃ­nimo, seguro e em etapas para transformar o Mini ERP em PWA instalÃ¡vel, mantendo o desktop exatamente como estÃ¡.
```

## 435. Estado final esperado depois deste manual

Depois deste manual, o projeto deve ter:

1. LEIA curto para retomada.
2. MANUAL completo para referÃªncia.
3. Regras claras.
4. HistÃ³rico de downgrade registrado.
5. Service Worker tratado como Ã¡rea sensÃ­vel.
6. Cache tratado como Ã¡rea sensÃ­vel.
7. Versionamento tratado como Ã¡rea sensÃ­vel.
8. Deploy controlado.
9. Rollback documentado.
10. Backup obrigatÃ³rio.
11. PWA planejado com cautela.
12. Desktop preservado.
13. Mobile como foco operacional.
14. Codex orientado.
15. Menos risco de confusÃ£o.

## 436. ConclusÃ£o final do manual

O Mini ERP Queijos Serra da Canastra Ã© um sistema em produÃ§Ã£o, usado diariamente em campo.

A versÃ£o estÃ¡vel de referÃªncia Ã©:

`2026.06.24.03`

O projeto jÃ¡ passou por incidente grave de downgrade.

Por isso, a evoluÃ§Ã£o deve ser cuidadosa.

A transformaÃ§Ã£o em PWA Ã© coerente e Ãºtil, especialmente para melhorar a fluidez no celular.

Mas ela deve acontecer dentro do projeto atual.

NÃ£o deve haver novo projeto.

NÃ£o deve haver segunda base.

NÃ£o deve haver novo banco.

NÃ£o deve haver novo Supabase.

NÃ£o deve haver novo domÃ­nio.

O desktop deve permanecer exatamente como estÃ¡.

A primeira implementaÃ§Ã£o PWA deve ser mÃ­nima, segura, testÃ¡vel e reversÃ­vel.

O caminho correto Ã©:

1. Manual concluÃ­do.
2. Backup antes do PWA.
3. Auditoria.
4. Plano mÃ­nimo.
5. ImplementaÃ§Ã£o autorizada.
6. Build.
7. Teste.
8. Deploy autorizado.
9. ValidaÃ§Ã£o em produÃ§Ã£o.
10. ValidaÃ§Ã£o em campo.
11. Backup pÃ³s aprovaÃ§Ã£o.

Fim do MANUAL-OFICIAL-MINI-ERP-PWA.md.
