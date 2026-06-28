# MANUAL-OFICIAL-MINI-ERP-PWA.md

# Manual Oficial do Mini ERP PWA

Projeto: Mini ERP Queijos Serra da Canastra
Responsável operacional: Delber Vilaça
Empresa: Queijos Serra da Canastra
Domínio oficial: https://mini-erp-canastra.vercel.app
Projeto Vercel oficial: mini-erp-canastra
Pasta local oficial: C:\Users\Delber\Mini-ERP\projeto
Versão estável de referência mais recente: 2026.06.24.03
Data base deste manual: 28/06/2026

## Atualizacao oficial em 28/06/2026

Estado real atual do Mini ERP PWA:

1. PWA publicado em producao.
2. Producao funcionando no dominio oficial.
3. Git local limpo apos rebase controlado e push normal.
4. GitHub sincronizado com `origin/main`.
5. Sem commits a frente ou atras de `origin/main`.
6. Backup pos producao aprovado criado fora da pasta do projeto.
7. Deploy aprovado e documentado.

Dominio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Versao preservada:

```text
2026.06.24.03
```

Nome do app PWA:

```text
ERP Canastra
```

Nome completo do app:

```text
ERP Queijos Serra da Canastra
```

Manifest final aprovado em producao:

```text
name: ERP Queijos Serra da Canastra
short_name: ERP Canastra
```

Icones oficiais em producao:

```text
/pwa/icon-192.png
/pwa/icon-512.png
/pwa/icon-maskable-512.png
```

Assets oficiais da tela de abertura:

```text
/brand/logo-queijos-serra-da-canastra.png
/brand/fundo-madeira-canastra.png
```

Tela de abertura oficial:

1. Implementada em `src/App.jsx` e `src/index.css`.
2. Usa o logo completo Queijos Serra da Canastra sobre o fundo de madeira.
3. Exibe o texto discreto `ERP Canastra`.
4. E uma tela visual dentro do React.
5. Nao e splash nativa do sistema operacional.

Commits relevantes apos rebase e push:

```text
7a2b075 documenta deploy pwa com identidade visual e splash
bbe18bc implementa tela de abertura oficial do pwa
9ee1373 aplica identidade visual oficial do pwa
f801cc5 documenta teste operacional vercel cli
1db7033 documenta diagnostico vercel pre deploy
0a8b094 documenta preparacao deploy pwa
5f964ac documenta backup pos pwa local
f3ca4d6 documenta auditoria pwa minimo
```

Relatorio oficial de deploy:

```text
RELATORIO_DEPLOY_PWA_IDENTIDADE_SPLASH_PRODUCAO.md
```

Backup oficial pos producao aprovado:

```text
C:\Users\Delber\Mini-ERP\BACKUP-MINI-ERP-2026-06-24-03-PWA-PRODUCAO-APROVADO.zip
```

Estado do GitHub:

```text
Branch: main
Remoto: origin https://github.com/chatgptplanilhas-cmyk/mini-erp-canastra.git
Push normal concluido com sucesso
Sem push force
Sem divergencia com origin/main
```

## 1. Objetivo deste documento

Este documento é o manual oficial e completo do Mini ERP Queijos Serra da Canastra.

Ele deve servir como documento mestre para retomada do projeto, auditoria, refinamento, diagnóstico, deploy, rollback, backup e planejamento da transformação do Mini ERP em um aplicativo PWA instalável.

Este manual não é um resumo. Ele deve concentrar todo o conhecimento acumulado do projeto, com foco em preservar estabilidade, evitar regressões, impedir downgrade de versão e garantir que qualquer nova frente de trabalho seja feita com cautela.

A transformação em PWA deve respeitar uma regra central: o desktop deve permanecer exatamente como está. A experiência instalável deve melhorar principalmente o uso no celular, sem desmontar, reescrever ou trocar a arquitetura atual.

## 2. Escopo do manual

Este manual cobre:

1. Estado atual do Mini ERP.
2. Arquitetura técnica conhecida.
3. Estrutura de pastas oficial.
4. Módulos existentes.
5. Regras permanentes de trabalho.
6. Histórico de versionamento.
7. Histórico do problema de downgrade.
8. Histórico de Service Worker.
9. Histórico de cache.
10. Fluxo oficial de deploy.
11. Fluxo oficial de rollback.
12. Política de backups.
13. Refinamentos implementados.
14. Funcionalidades aprovadas.
15. Funcionalidades pendentes.
16. Riscos conhecidos.
17. Protocolo oficial de auditoria.
18. Protocolo de refinamento localizado.
19. Comandos oficiais para Codex.
20. Checklist de testes.
21. Estratégia oficial para transformar o Mini ERP em PWA.
22. Critérios de sucesso para desktop, mobile e aplicativo instalado.

## 3. Regra principal deste manual

Antes de qualquer alteração no Mini ERP, este manual deve ser lido junto com o arquivo LEIA-PRIMEIRO-MINI-ERP.md.

O LEIA-PRIMEIRO-MINI-ERP.md é o documento curto de retomada rápida.

O MANUAL-OFICIAL-MINI-ERP-PWA.md é o documento mestre completo.

A ordem correta é:

1. Ler o LEIA-PRIMEIRO-MINI-ERP.md.
2. Conferir este manual oficial.
3. Auditar o ZIP recebido.
4. Confirmar a versão atual real.
5. Confirmar a pasta correta.
6. Confirmar o projeto Vercel correto.
7. Confirmar o domínio oficial.
8. Somente depois discutir qualquer refinamento.

## 4. Identidade do projeto

O Mini ERP é um sistema operacional interno da Queijos Serra da Canastra.

Ele foi criado para apoiar a rotina real de vendas, cobranças, entregas, pré-vendas, pagamentos, clientes, produtos e controle financeiro básico.

O sistema é usado principalmente em dois contextos:

1. Celular em campo, durante entregas, recreios, visitas a clientes, cobranças e registros rápidos.
2. Desktop, para conferência, administração, revisão, ajustes e visão mais ampla do negócio.

A prioridade do projeto sempre foi resolver problemas reais da operação, não criar um sistema genérico.

O Mini ERP deve permanecer simples, direto, rápido e confiável.

## 5. Ambiente oficial

### 5.1 Pasta local oficial

A pasta oficial do Mini ERP é:

C:\Users\Delber\Mini-ERP\projeto

Essa pasta deve ser tratada como a única pasta operacional correta para o Mini ERP.

Não se deve publicar, testar ou gerar ZIP de outra pasta sem antes provar que ela é a pasta correta.

### 5.2 Domínio oficial

O domínio oficial em produção é:

https://mini-erp-canastra.vercel.app

Qualquer teste de produção deve apontar para esse domínio.

### 5.3 Projeto Vercel oficial

O projeto oficial na Vercel é:

mini-erp-canastra

Antes de qualquer deploy, deve ser confirmado que o terminal está conectado ao projeto correto.

### 5.4 Sistema operacional usado

O ambiente operacional do usuário é Windows.

Os comandos devem ser pensados para Windows PowerShell.

Não usar instruções baseadas em Linux como padrão.

Não assumir ambiente Linux, Bash, WSL ou Mac.

### 5.5 Navegadores e dispositivos

Uso principal:

1. Google Chrome no desktop.
2. Google Chrome no celular.
3. Safari no iPhone para testes específicos.
4. PWA instalado no iPhone como objetivo de teste de campo pos-producao.

O histórico do projeto mostrou comportamento diferente entre desktop, navegador mobile, Safari iPhone, 4G e Wi-Fi. Por isso, qualquer teste sério precisa considerar mais de um ambiente.

## 6. Versão estável de referência

A versão estável mais recente consolidada no histórico é:

2026.06.24.03

Essa versão foi validada com os seguintes pontos:

1. version.json online respondendo 200 OK.
2. Domínio oficial respondendo corretamente.
3. Versão do aplicativo compatível com a versão publicada.
4. Service Worker disponível.
5. Service Worker controlando a página.
6. Sistema online.
7. Supabase conectado ou sem erro registrado.
8. Dados carregados em produção.
9. Sem erro de sincronização registrado.
10. Ambiente de produção ativo.

Registro de diagnóstico validado no histórico:

Versão do aplicativo: 2026.06.24.03
Versão publicada: 2026.06.24.03
Maior versão aceita: 2026.06.24.03
Status da versão: OK
Service Worker disponível: sim
Service Worker controlando a página: sim
Online: sim
Ambiente: produção
URL: https://mini-erp-canastra.vercel.app/?v=2026.06.24.03-1782342793308
Navegador: Safari Mobile
Sistema: iOS

Esse diagnóstico é importante porque mostra que a versão 2026.06.24.03 chegou corretamente ao ambiente real em campo.

## 7. Stack técnica conhecida

O Mini ERP utiliza:

1. React.
2. Vite.
3. CSS próprio em src/index.css.
4. Supabase como backend.
5. Banco PostgreSQL via Supabase.
6. Vercel para deploy.
7. Arquivos públicos de versionamento e Service Worker na pasta public.
8. Build gerado na pasta dist.
9. Service Worker para controle de cache, limpeza ou atualização, conforme fase do projeto.
10. version.json para conferência de versão publicada.

A arquitetura atual não deve ser trocada sem necessidade comprovada.

A frente PWA deve partir da arquitetura existente.

Não deve haver reescrita geral do sistema apenas para transformá-lo em aplicativo instalável.

## 8. Arquivos críticos do projeto

Os arquivos críticos do Mini ERP são:

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
15. arquivos de documentação técnica do projeto

Esses arquivos devem ser auditados antes de qualquer alteração relevante.

## 9. Arquivos que não devem ser tratados como fonte operacional

Os seguintes itens não devem ser tratados como parte limpa da versão operacional, salvo análise específica:

1. node_modules
2. dist, quando estiver sendo enviado como artefato antigo sem contexto
3. .vercel
4. .git
5. .env.local
6. arquivos mortos
7. backups antigos dentro da pasta operacional
8. zips antigos misturados à pasta do projeto
9. arquivos duplicados sem função clara
10. versões antigas de documentação sem identificação

A presença desses itens em ZIPs pode dificultar auditoria, aumentar risco de confusão e expor informação desnecessária.

## 10. Diferença entre Mini ERP e Catálogo

O Mini ERP e o Catálogo são projetos diferentes.

Nunca misturar as pastas dos dois projetos.

Nunca publicar o Mini ERP estando dentro da pasta do Catálogo.

Nunca publicar o Catálogo estando dentro da pasta do Mini ERP.

O Mini ERP tem domínio:

https://mini-erp-canastra.vercel.app

O Catálogo tem outra estrutura e outro objetivo.

O Mini ERP é sistema operacional interno.

O Catálogo é vitrine comercial e pedido via WhatsApp.

As regras de PWA deste manual são exclusivas do Mini ERP.

## 11. Estado atual do sistema

O Mini ERP está em produção e é usado como ferramenta real de operação.

Os módulos principais estão funcionando, com foco em:

1. Clientes.
2. Produtos.
3. Vendas.
4. Cobranças.
5. Pagamentos.
6. Delivery.
7. Pré-vendas.
8. Painel.
9. Financeiro.
10. Relatórios.
11. Diagnóstico do sistema.
12. Operação offline ou base para operação offline, conforme versão auditada.

O sistema já passou por incidentes importantes de versão, cache e Service Worker.

A fase atual não é de expansão agressiva.

A fase atual é de consolidação, documentação, segurança operacional e preparação para PWA.

## 12. Filosofia operacional do Mini ERP

O Mini ERP deve respeitar a rotina real do negócio.

A operação em campo exige velocidade.

O desktop exige visão ampla e segurança.

O celular exige toque simples, campos legíveis, botões claros e pouca fricção.

A lógica do sistema deve favorecer:

1. Registrar rápido.
2. Conferir antes de salvar.
3. Evitar perda de dados.
4. Evitar retrabalho.
5. Facilitar cobrança.
6. Facilitar entrega.
7. Facilitar conversão de pré-venda em venda.
8. Manter histórico.
9. Evitar regressões.
10. Evitar qualquer retorno para versão antiga.

## 13. Separação entre mobile e desktop

A estratégia aprovada para evolução é separar a experiência sem quebrar a arquitetura.

No desktop, manter a visão administrativa completa.

No mobile, priorizar operação de campo.

A transformação em PWA deve reforçar essa separação visual e operacional, mas sem criar outro sistema desconectado.

### 13.1 Desktop

No desktop, manter exatamente como está até prova de necessidade.

O desktop deve continuar servindo para:

1. Painel.
2. Vendas.
3. Cobranças.
4. Delivery.
5. Pagamentos.
6. Despesas.
7. Clientes.
8. Produtos.
9. Fornecedores.
10. Pedidos para fornecedor.
11. Relatórios.
12. Taxas.
13. Configurações.
14. Conferência geral da operação.

### 13.2 Mobile

No mobile, a experiência deve priorizar:

1. Pré-vendas.
2. Vendas.
3. Cobranças.
4. Delivery.
5. Pagamentos.
6. Pendências.
7. Painel resumido.
8. Ações rápidas.
9. Botões grandes.
10. Evitar zoom indevido.
11. Evitar campos que obriguem movimento de pinça.
12. Evitar excesso de informação na tela.

### 13.3 Aplicativo PWA instalado

O PWA deve ser tratado como uma forma mais fluida de abrir o Mini ERP no celular.

Ele não deve ser tratado como outro produto.

Ele deve usar a mesma base, a mesma versão e o mesmo domínio.

A vantagem esperada é:

1. Abrir como aplicativo.
2. Ter ícone na tela inicial.
3. Reduzir distrações do navegador.
4. Melhorar fluidez no uso em campo.
5. Permitir experiência mais próxima de app.
6. Preservar o desktop exatamente como está.

## 14. Módulos do Mini ERP

## 14.1 Painel

O Painel é a área de visão geral.

Ele deve oferecer leitura rápida da operação.

Pode incluir indicadores de vendas, cobranças, pagamentos, pendências, delivery, pré-vendas ou resumo financeiro, conforme a versão auditada.

No mobile, o Painel não deve atrapalhar a operação principal. Ele pode ser resumido.

No desktop, pode manter visão mais ampla.

## 14.2 Clientes

O módulo de Clientes é base estrutural do Mini ERP.

Ele permite manter cadastro de clientes e referências.

A referência é um campo muito importante para a operação real, pois muitos clientes são identificados por escola, prédio, quadra, bloco, apartamento, setor ou local de entrega.

Exemplos recorrentes de referência:

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
16. 35ª DP.

O sistema deve preservar referências compostas, sem cortar número, bloco, apartamento, letra ou complemento.

## 14.3 Produtos

O módulo de Produtos mantém os itens vendidos.

Os produtos precisam estar disponíveis para vendas, pré-vendas, cobranças e relatórios.

O sistema deve preservar a lógica de produto real do negócio.

Exemplos de produtos trabalhados:

1. Minas Padrão.
2. Minas Frescal.
3. Meia cura.
4. Mussarela palito.
5. Mussarela trança.
6. Provolone desidratado.
7. Parmesão.
8. Defumado.
9. Requeijão.
10. Doce de leite.
11. Goiabada.
12. Figo Ramy.
13. Salame.
14. Café.
15. Mel.
16. Kit quatro queijos.
17. Kit trança.
18. Cocada cremosa.
19. Cachaça especial, quando aplicável em outros fluxos.

O Mini ERP não deve confundir produtos do ERP com a lógica visual do Catálogo.

## 14.4 Vendas

O módulo de Vendas registra vendas efetivadas.

Pontos consolidados:

1. Permite cliente cadastrado.
2. Permite cliente avulso.
3. Permite itens adquiridos.
4. Permite forma de pagamento.
5. Permite valor.
6. Integra com pagamentos e financeiro, conforme versão.
7. Deve preservar conferência antes de salvar.
8. Deve permitir lançamento rápido em campo.

O fluxo por voz foi trabalhado para registrar vendas com estrutura como:

cliente [nome], referência [texto], itens adquiridos [lista], forma de pagamento [pix/crédito/débito]

A preferência é sempre conferir antes de salvar.

## 14.5 Pagamentos

O módulo de Pagamentos acompanha formas de pagamento e pendências financeiras.

Formas de pagamento recorrentes:

1. Pix.
2. Débito.
3. Crédito.
4. Fiado.
5. Em aberto.

O sistema deve diferenciar venda paga de venda pendente.

O Pix precisa ser reconhecido corretamente, inclusive quando o reconhecimento de voz interpreta errado como “pics”, “pixx” ou variações.

## 14.6 Cobranças

O módulo de Cobranças é crítico para a operação.

Ele permite controlar clientes que estão devendo, gerar mensagens e acompanhar pendências.

Pontos já consolidados:

1. Múltiplas pendências por cliente.
2. Mensagem final com marcação visual.
3. Resumo de cobranças.
4. Controle de valores em aberto.
5. Ações pensadas para WhatsApp.
6. Utilidade direta em campo.

O módulo de Cobranças deve ser preservado com muito cuidado.

Qualquer mudança nele precisa ser localizada e testada.

## 14.7 Delivery

O módulo de Delivery controla entregas.

Fluxo conhecido:

1. Nova Entrega.
2. Modal de cadastro ou edição.
3. Controle de cliente.
4. Controle de referência.
5. Controle de itens.
6. Controle de status.
7. Utilidade direta em campo.

O Delivery é um dos módulos mais importantes para uso mobile.

Na transformação PWA, ele deve estar entre os primeiros módulos testados.

## 14.8 Pré-vendas

O módulo de Pré-vendas nasceu de uma necessidade operacional real: registrar pedidos rapidamente em momentos curtos, especialmente durante recreios ou janelas apertadas de atendimento, para converter depois em venda.

Esse módulo é essencial para o uso em campo.

Pontos consolidados:

1. Registrar intenção de compra antes da venda final.
2. Usar Supabase em vez de depender apenas de localStorage.
3. Permitir editar pré-venda.
4. Permitir gerar mensagem.
5. Permitir converter em venda.
6. Permitir marcar como convertida.
7. Permitir excluir.
8. Mover convertidas para o final.
9. Diferenciar visualmente convertidas.
10. Reduzir tamanho de card quando convertido.
11. Voltar para Pré-venda após salvar e continuar.
12. Possibilitar conversão para Delivery quando não houver estoque.

A Pré-venda é um dos pontos mais sensíveis do sistema.

Não deve ser alterada de forma ampla sem auditoria localizada.

## 14.9 Financeiro

O Financeiro acompanha valores, taxas, despesas, fornecedores, pagamentos e visão operacional do dinheiro.

Alguns parâmetros financeiros já fazem parte da lógica do negócio:

1. Pix com taxa zero.
2. Débito com taxa aproximada de 1,09%.
3. Crédito com taxas por parcela.
4. Link de pagamento com taxas próprias.
5. Controle de fornecedores.
6. Controle de despesas.
7. Controle de margem.
8. Controle de peças.
9. Controle de frete.
10. Controle de pagamentos em aberto.

Meta operacional discutida:

A margem operacional por produto deve buscar aproximadamente R$ 15,00 a R$ 20,00 como parâmetro de decisão.

Esse número não deve ser aplicado cegamente como regra automática sem validação, mas é referência importante para precificação e análise.

## 14.10 Relatórios

Os Relatórios ajudam a entender o desempenho do negócio.

Podem envolver:

1. Vendas por período.
2. Pagamentos.
3. Pendências.
4. Clientes.
5. Produtos.
6. Peças vendidas.
7. Margem.
8. Fornecedores.
9. Despesas.
10. Taxas.

No desktop, os Relatórios podem ser mais amplos.

No mobile, devem ser simples ou secundários.

## 14.11 Despesas

O módulo de Despesas compõe a visão financeira.

Ele deve registrar custos operacionais que afetam o resultado real.

Exemplos recorrentes:

1. Frete.
2. Taxas.
3. Custos de viagem.
4. Fornecedores.
5. Compras específicas.
6. Custos de entrega.

## 14.12 Fornecedores

O módulo de Fornecedores organiza a origem dos produtos.

Fornecedores já citados no histórico do negócio:

1. Associação dos Queijeiros.
2. Buba Canastra.
3. Van Ita.
4. Divinos.
5. Jean, Formiga.
6. Eduardo, Celeiros de Minas.
7. Daniel, cachaças.
8. Serra da Abelha.
9. Juliatto.

O controle de fornecedores deve ajudar na conferência de compras, custos e reposição.

## 14.13 Pedidos para fornecedor

O módulo de Pedidos para fornecedor deve apoiar reposição e organização das compras.

Ele deve ser preservado como parte do desktop administrativo.

No mobile, não deve ser prioridade inicial do PWA, salvo necessidade operacional posterior.

## 14.14 Taxas

O módulo de Taxas ajuda a calcular custo de recebimento por cartão, débito, crédito e link.

Taxas conhecidas no histórico:

1. Pix: 0%.
2. Débito: 1,09%.
3. Crédito 1x: assumida conforme política operacional.
4. Crédito 2x: 5,39% no custo real citado.
5. Crédito 3x: 6,12% no custo real citado.
6. Crédito 4x: 6,85% no custo real citado.
7. Link 1x: 4,99%.
8. Link 2x: 7,50%.
9. Link 3x: 9,20%.

Essas taxas devem ser conferidas no sistema antes de qualquer automatização nova.

## 14.15 Configurações

Configurações devem concentrar parâmetros do sistema.

Na frente PWA, configurações podem incluir ou se relacionar com:

1. Versão do aplicativo.
2. Diagnóstico.
3. Atualização.
4. Service Worker.
5. Cache.
6. Ambiente.
7. Dados de sincronização.
8. Preferências visuais ou operacionais, se já existirem.

Não criar novas configurações sem necessidade comprovada.

## 14.16 Diagnóstico do Sistema

O Diagnóstico do Sistema é peça crítica do projeto.

Ele deve permitir verificar:

1. Data e hora.
2. Versão do aplicativo.
3. Versão publicada.
4. Maior versão aceita.
5. Status da versão.
6. Service Worker disponível.
7. Service Worker controlando a página.
8. Online ou offline.
9. Ambiente.
10. URL atual.
11. Navegador.
12. Sistema operacional.
13. Estado do Supabase.
14. Última atualização de dados.
15. Erro de sincronização.
16. Quantidade de clientes carregados.
17. Quantidade de pré-vendas carregadas.
18. Quantidade de cobranças carregadas.
19. Quantidade de delivery carregados.
20. Outros módulos carregados, conforme versão.

Esse diagnóstico foi fundamental para diferenciar problema real de deploy, cache local, Service Worker, iPhone, Safari, 4G e versão publicada.

Ele deve ser preservado e valorizado na transformação PWA.

## 15. Regras permanentes do projeto

## 15.1 Nunca assumir a versão

Nunca assumir que a versão citada na conversa é a mesma que está no ZIP.

Sempre auditar o arquivo recebido.

Sempre confirmar a versão real nos arquivos.

Sempre confirmar a versão online.

## 15.2 Nunca alterar antes de auditar

Antes de qualquer código, deve haver auditoria.

A auditoria deve verificar:

1. Pasta correta.
2. Projeto correto.
3. Domínio correto.
4. Versão local.
5. Versão no App.jsx.
6. Versão no main.jsx.
7. Versão no public/version.json.
8. Versão no sw.js.
9. Versão no service-worker.js.
10. Versão no dist/version.json, quando existir.
11. vercel.json.
12. Service Worker.
13. Cache.
14. Build.
15. Riscos de regressão.

## 15.3 Nunca misturar Mini ERP com Catálogo

Essa regra é absoluta.

Antes de qualquer deploy, confirmar que o terminal está na pasta:

C:\Users\Delber\Mini-ERP\projeto

## 15.4 Nunca publicar sem teste local

O deploy só deve acontecer depois de:

1. Auditoria.
2. Ajuste localizado, quando houver.
3. Build local.
4. Teste local.
5. Conferência de versão.
6. Conferência dos módulos críticos.
7. Validação básica no mobile, quando a mudança afetar mobile.

## 15.5 Nunca fazer mudança ampla sem necessidade

A regra do projeto é refinamento localizado.

Não reescrever o sistema.

Não trocar arquitetura.

Não reorganizar tudo.

Não alterar módulos estáveis por estética ou preferência técnica.

## 15.6 Provar o local antes de mexer

Antes de alterar qualquer componente sensível, o código deve ser localizado e mostrado.

Exemplo de regra já adotada:

Antes de alterar a barra inferior mobile, é obrigatório abrir o App.jsx, mostrar o trecho exato onde a barra está, mostrar a composição real encontrada no código e só depois propor alteração.

Essa regra vale para qualquer área sensível:

1. Barra inferior mobile.
2. Pré-vendas.
3. Cobranças.
4. Delivery.
5. Vendas.
6. Service Worker.
7. Cache.
8. Versionamento.
9. Deploy.
10. PWA.

## 15.7 Preservar o que está funcionando

Se um módulo está estável, ele não deve ser modificado por reflexo.

Toda mudança precisa responder:

1. Qual problema real será resolvido?
2. Onde exatamente está o código?
3. Qual trecho será alterado?
4. Qual risco existe?
5. Como testar?
6. Como voltar atrás?

## 15.8 Desktop intocável na frente PWA

A transformação PWA não pode desmontar o desktop.

O desktop deve permanecer exatamente como está, salvo ajuste mínimo e comprovadamente necessário para compatibilidade geral.

A frente PWA deve focar:

1. Manifest.
2. Ícone.
3. Instalação.
4. Service Worker correto.
5. Cache controlado.
6. Experiência mobile.
7. Segurança contra downgrade.
8. Diagnóstico.
9. Teste em aplicativo instalado.

## 16. Princípio de evolução para PWA

O Mini ERP deve virar PWA sem virar outro sistema.

A estratégia correta é incremental:

1. Auditar a base atual.
2. Confirmar versão estável.
3. Confirmar Service Worker atual.
4. Confirmar política de cache.
5. Confirmar version.json.
6. Criar ou revisar manifest.
7. Definir ícones.
8. Garantir installability.
9. Garantir que o app instalado use a mesma versão correta.
10. Garantir que desktop continue igual.
11. Testar em desktop.
12. Testar em mobile navegador.
13. Testar em iPhone instalado.
14. Testar atualização após deploy.
15. Testar rollback.

A frente PWA não deve começar por código.

Ela deve começar por documentação, auditoria e definição de critérios de sucesso.

## 17. Critério de sucesso inicial para o PWA

A transformação em PWA só será considerada bem sucedida quando:

1. O Mini ERP continuar funcionando no desktop exatamente como antes.
2. O Mini ERP abrir no celular pelo navegador.
3. O Mini ERP puder ser instalado como aplicativo.
4. O aplicativo instalado abrir com a versão correta.
5. O aplicativo instalado não voltar para versão antiga.
6. O version.json online continuar acessível.
7. O diagnóstico mostrar versão correta.
8. O Service Worker não prender HTML antigo.
9. O cache não causar downgrade.
10. O usuário conseguir usar em campo com mais fluidez.
11. Pré-vendas continuarem funcionando.
12. Vendas continuarem funcionando.
13. Cobranças continuarem funcionando.
14. Delivery continuar funcionando.
15. Pagamentos continuarem funcionando.
16. Supabase continuar conectado.
17. Não haver perda de dados.
18. Não haver regressão visual relevante no mobile.
19. Não haver alteração indevida no desktop.
20. Haver caminho claro de rollback.

## 18. Ordem oficial das próximas partes deste manual

A continuação deste manual deve seguir esta ordem:

Parte 2: Histórico completo de versionamento, downgrade, cache e Service Worker.

Parte 3: Fluxo oficial de deploy, rollback, backups e conferência de produção.

Parte 4: Protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex.

Parte 5: Histórico de refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes.

Parte 6: Riscos conhecidos, pontos intocáveis, sintomas de erro e critérios de decisão.

Parte 7: Estratégia técnica oficial para PWA instalável, mantendo desktop exatamente como está.

Parte 8: Checklist final de validação, aceite operacional e modelo de retomada para novas conversas.
# MANUAL-OFICIAL-MINI-ERP-PWA.md

## Parte 2: Histórico completo de versionamento, downgrade, Service Worker e cache

## 19. Importância desta parte do manual

O histórico de versionamento, downgrade, Service Worker e cache é uma das partes mais importantes do Mini ERP.

O projeto já sofreu um incidente grave em que versões antigas voltavam a aparecer em produção, mesmo depois de uma versão nova ter sido publicada e validada.

Esse incidente afetou diretamente a confiança no sistema, principalmente porque o Mini ERP é usado diariamente em campo.

A principal lição operacional é simples: Service Worker, cache, versionamento, atualização automática e deploy não podem ser tratados como detalhes técnicos secundários.

Essas áreas são parte da segurança do sistema.

Por isso, qualquer alteração futura nessas áreas deve ser feita somente com autorização explícita, auditoria completa, teste local, teste em produção, teste em campo e backup posterior.

## 20. Versão estável oficial atual

A versão estável oficial consolidada é:

2026.06.24.03

Essa versão deve ser considerada a referência principal do projeto nesta fase.

Ela foi:

1. Utilizada em produção.
2. Validada em desktop.
3. Validada em iPhone.
4. Validada em campo.
5. Considerada sem regressões conhecidas no LEIA-PRIMEIRO-MINI-ERP.md.
6. Confirmada como projeto estável.
7. Confirmada como base para iniciar a próxima frente PWA.

Essa versão não deve ser alterada sem autorização.

Qualquer nova frente deve partir dela, ou de um ZIP mais recente que seja auditado e confirmado como descendente correto dessa versão.

## 21. Histórico de versões relevantes

O Mini ERP passou por várias versões durante a fase de estabilização.

As versões mais citadas no histórico recente incluem:

1. 2026.06.15.05
2. 2026.06.16.05
3. 2026.06.18.01
4. 2026.06.20.02
5. 2026.06.20.03
6. 2026.06.24.03

A versão 2026.06.20.03 foi importante porque representou uma fase de correção de Service Worker e tentativa de estabilização contra retorno de versões antigas.

A versão 2026.06.24.03 é a versão estável posterior, validada em produção e usada em campo.

A ordem histórica mostra que o projeto avançou por refinamentos controlados, mas também enfrentou riscos sérios quando versionamento, cache e Service Worker não estavam perfeitamente alinhados.

## 22. O que foi o incidente de downgrade

O incidente de downgrade foi o comportamento em que o Mini ERP, mesmo após uma publicação nova, voltava a abrir uma versão antiga em determinados contextos.

Esse problema não era apenas visual.

Em alguns momentos, a versão antiga realmente aparecia com funcionalidades ausentes.

Exemplo de sintoma grave relatado:

1. O sistema abria sem Pré-venda.
2. O sistema abria sem Diagnóstico do Sistema.
3. A tela apresentava aparência ou estrutura de versão antiga.
4. A versão correta funcionava em um local ou rede, mas a versão antiga aparecia em outro local ou rede.
5. O comportamento acontecia em navegação normal e também em navegação anônima.
6. O problema era mais percebido em campo, em 4G ou fora da região onde o sistema havia sido validado.

Esse tipo de problema não pode ser tratado como simples cache do navegador sem investigação.

Ele precisa ser tratado como incidente de versão.

## 23. Sintomas observados durante o downgrade

Os sintomas acumulados foram:

1. A versão nova era publicada e funcionava inicialmente.
2. Depois de algum tempo, especialmente em campo, o sistema abria versão antiga.
3. Em casa ou em determinada região, o 4G abria corretamente.
4. Ao sair da região, o 4G podia abrir uma versão antiga.
5. Desktop e mobile podiam apresentar comportamentos diferentes.
6. iPhone e Safari Mobile exigiam atenção especial.
7. Navegação normal e anônima chegaram a abrir versão antiga.
8. O sistema mostrava tela sem módulos novos.
9. Pré-vendas desapareciam em versões antigas.
10. Diagnóstico do Sistema não aparecia em versões antigas.
11. Em alguns testes, o endpoint de version.json mostrava versão correta enquanto a interface carregava conteúdo antigo.
12. A atualização visual nem sempre significava atualização real do aplicativo carregado.
13. A presença de Service Worker controlando a página podia manter arquivos antigos.
14. A existência de mais de um Service Worker ou arquivo relacionado podia aumentar confusão.
15. Arquivos em cache podiam sobreviver a deploys novos.
16. O usuário perdia confiança porque não sabia se estava usando a versão correta.

## 24. Por que o downgrade foi grave

O downgrade foi grave porque o Mini ERP não é um projeto experimental.

Ele é usado em produção.

Ele apoia:

1. Clientes.
2. Pré-vendas.
3. Vendas.
4. Delivery.
5. Cobranças.
6. Financeiro.
7. Relatórios.
8. Pagamentos.
9. Operação em campo.

Quando uma versão antiga aparece, o risco não é apenas estético.

Os riscos reais são:

1. Registrar dados em fluxo antigo.
2. Perder acesso a funcionalidades novas.
3. Confundir o usuário durante entrega.
4. Gerar retrabalho.
5. Perder pré-vendas.
6. Dificultar cobranças.
7. Fazer diagnóstico errado.
8. Publicar nova correção em cima de premissa falsa.
9. Mexer em módulo estável tentando resolver sintoma de cache.
10. Criar regressão em áreas que estavam funcionando.

Por isso, a regra permanente é: problema de versão deve ser investigado como problema estrutural, não como ajuste comum.

## 25. Causas prováveis identificadas no histórico

O histórico apontou um conjunto de causas prováveis, não uma única causa isolada.

As principais causas foram:

1. Desencontro de versões entre arquivos.
2. Service Worker antigo mantendo cache.
3. Possível coexistência ou confusão entre public/sw.js e public/service-worker.js.
4. Cache de navegador ou cache controlado pelo Service Worker.
5. HTML antigo sendo servido ou reaproveitado.
6. Assets antigos sendo carregados.
7. Deploy sem limpeza suficiente.
8. Possível diferença entre arquivo publicado e arquivo carregado pelo dispositivo.
9. Dependência excessiva de cache para arquivos que deveriam ser sempre revalidados.
10. Falta de prova imediata da versão real carregada no navegador.

Esse conjunto explica por que o problema parecia intermitente.

Em alguns ambientes, a versão correta aparecia.

Em outros, a versão antiga persistia.

## 26. Desencontro de versões

Uma lição importante foi que a versão do Mini ERP precisa estar alinhada em todos os pontos críticos.

Arquivos que podem conter ou influenciar a versão:

1. src/App.jsx
2. src/main.jsx
3. public/version.json
4. dist/version.json
5. public/sw.js
6. public/service-worker.js
7. vercel.json, quando houver cabeçalhos ou regras relacionadas
8. arquivos gerados no build

O problema não deve ser investigado olhando apenas um arquivo.

Se App.jsx indica uma versão, mas version.json indica outra, há risco.

Se public/version.json foi atualizado, mas o build antigo ficou em cache, há risco.

Se o Service Worker guarda assets de uma versão anterior, há risco.

Se o navegador carrega HTML antigo, há risco.

Por isso, a conferência precisa cruzar os arquivos e a produção.

## 27. Papel do version.json

O arquivo version.json virou peça central para conferência de produção.

Ele deve servir para responder uma pergunta objetiva:

Qual versão está publicada no domínio oficial agora?

O endpoint oficial esperado é:

https://mini-erp-canastra.vercel.app/version.json

Esse arquivo ajuda a separar três situações diferentes:

1. A produção realmente está antiga.
2. A produção está correta, mas o navegador está carregando cache antigo.
3. A produção está correta, mas o Service Worker está servindo assets antigos.

O version.json não resolve tudo sozinho.

Ele é uma referência de comparação.

O diagnóstico do sistema deve comparar a versão do aplicativo carregado com a versão publicada.

## 28. Papel do Diagnóstico do Sistema no incidente

O Diagnóstico do Sistema foi criado ou reforçado como ferramenta de segurança.

Ele permite verificar se o aplicativo carregado está coerente com a versão publicada.

Campos importantes do diagnóstico:

1. Data.
2. Versão do aplicativo.
3. Versão publicada.
4. Maior versão aceita.
5. Status da versão.
6. Service Worker disponível.
7. Service Worker controlando a página.
8. Online.
9. Ambiente.
10. URL.
11. Navegador.
12. Sistema.
13. Supabase.
14. Última atualização de dados.
15. Erro de sincronização.
16. Clientes carregados.
17. Pré-vendas carregadas.
18. Cobranças carregadas.
19. Delivery carregados.

Durante o incidente, o diagnóstico ajudou a provar se a tela aberta era a versão esperada ou uma versão antiga.

A versão 2026.06.24.03 apresentou diagnóstico coerente:

Versão do aplicativo: 2026.06.24.03
Versão publicada: 2026.06.24.03
Maior versão aceita: 2026.06.24.03
Status da versão: OK
Service Worker disponível: sim
Service Worker controlando a página: sim
Online: sim
Ambiente: produção

Esse tipo de leitura deve continuar existindo no futuro PWA.

## 29. Service Worker no Mini ERP

O Service Worker é uma peça poderosa.

Ele pode melhorar carregamento, permitir comportamento offline e contribuir para experiência de aplicativo.

Mas ele também pode causar problema grave se for mal controlado.

No histórico do Mini ERP, o Service Worker esteve diretamente ligado ao incidente de downgrade.

Por isso, a regra permanente é:

Não modificar Service Worker durante refinamentos comuns.

Service Worker só deve ser alterado em uma frente própria, com auditoria completa e autorização explícita.

## 30. Arquivos de Service Worker citados

O histórico cita dois arquivos críticos:

1. public/sw.js
2. public/service-worker.js

A existência de dois arquivos relacionados a Service Worker exige cuidado.

Antes de qualquer alteração PWA, é obrigatório auditar:

1. Qual arquivo está registrado no navegador.
2. Qual arquivo é realmente servido em produção.
3. Qual arquivo contém lógica ativa.
4. Se ambos existem por necessidade ou histórico.
5. Se há registro duplicado.
6. Se há cache antigo sendo mantido.
7. Se há limpeza de cache.
8. Se há estratégia de atualização.
9. Se há controle de versão de cache.
10. Se o HTML está sendo cacheado indevidamente.

Não se deve apagar, renomear ou trocar esses arquivos sem prova.

## 31. O risco de Service Worker antigo

Um Service Worker antigo pode continuar controlando a aplicação mesmo depois de um novo deploy.

Isso pode causar:

1. Carregamento de JS antigo.
2. Carregamento de CSS antigo.
3. Carregamento de HTML antigo.
4. Exibição de módulos antigos.
5. Falha em mostrar módulos novos.
6. Interferência na atualização.
7. Persistência de cache em iPhone.
8. Diferença de comportamento entre navegador e app instalado.
9. Diferença entre desktop e mobile.
10. Sensação de que a Vercel publicou errado, mesmo quando o problema está no cliente.

Por isso, no PWA, o Service Worker precisa ser planejado com mais rigor do que em um site comum.

## 32. Histórico de limpeza de Service Worker

Durante a fase de correção, foi adotada uma estratégia de limpeza de Service Worker e caches.

O objetivo era remover Service Workers antigos e limpar caches que poderiam estar segurando versões passadas.

Essa fase foi importante para estabilizar o projeto.

A versão 2026.06.20.03 aparece no histórico como uma versão associada à correção de Service Worker e limpeza de cache.

A lição não é que todo problema se resolve apagando cache.

A lição correta é que o Service Worker precisa ter política clara.

Sem política clara, ele vira risco.

## 33. Cache no Mini ERP

O cache é necessário para desempenho, mas perigoso quando mal aplicado.

No Mini ERP, o cache deve respeitar uma regra central:

Arquivos que determinam a versão e o HTML principal não podem prender versão antiga.

O cache pode ser útil para:

1. Ícones.
2. Imagens estáticas.
3. Arquivos auxiliares.
4. Recursos que não mudam com frequência.

O cache pode ser perigoso para:

1. index.html.
2. Arquivos JS principais.
3. Arquivos CSS principais.
4. version.json.
5. Dados de diagnóstico.
6. Lógica de atualização.
7. Service Worker.
8. Manifest PWA, quando estiver em fase de alteração.

Durante a frente PWA, essa distinção precisa ser formalizada.

## 34. Cache e Vercel

A Vercel pode servir arquivos com regras próprias de cache.

O projeto também pode ter cabeçalhos definidos em vercel.json.

Por isso, a auditoria deve verificar:

1. Se existe vercel.json.
2. Quais headers estão definidos.
3. Se version.json tem cache desativado ou revalidação adequada.
4. Se index.html pode ficar preso em cache.
5. Se assets versionados estão sendo gerados corretamente.
6. Se o deploy forçado foi necessário.
7. Se o domínio oficial aponta para o deploy correto.

Nunca assumir que um deploy novo resolveu tudo sem verificar o domínio final e o version.json online.

## 35. Diferença entre build, deploy e versão carregada

O Mini ERP ensinou uma diferença operacional importante.

Build aprovado não significa produção correta.

Deploy concluído não significa navegador atualizado.

version.json correto não significa interface carregada correta.

O fluxo completo precisa confirmar quatro camadas:

1. Código local correto.
2. Build local correto.
3. Produção publicada correta.
4. Dispositivo carregando versão correta.

O downgrade aconteceu justamente porque essas camadas podiam divergir.

## 36. Diferença entre versão publicada e versão em uso

A versão publicada é o que está no servidor.

A versão em uso é o que o navegador ou app instalado carregou.

Elas precisam ser iguais.

Quando não são iguais, o diagnóstico deve mostrar problema.

Exemplo ideal:

Versão do aplicativo: 2026.06.24.03
Versão publicada: 2026.06.24.03
Status da versão: OK

Exemplo de risco:

Versão do aplicativo: 2026.06.20.03
Versão publicada: 2026.06.24.03
Status da versão: desatualizada ou incompatível

Esse tipo de diferença deve bloquear qualquer conclusão apressada.

## 37. Maior versão aceita

O conceito de maior versão aceita foi importante para impedir retorno silencioso a versões antigas.

A maior versão aceita funciona como referência de segurança.

Ela ajuda a indicar quando o aplicativo carregado não deveria mais ser aceito.

Na prática, isso serve para combater downgrade.

Se o aplicativo carregar versão abaixo da maior versão aceita, o sistema deve alertar ou forçar atualização, conforme a política implementada.

Essa lógica precisa ser preservada na transformação PWA.

## 38. Atualização automática

A atualização automática é funcionalidade estável citada no LEIA.

Ela deve ser preservada.

Mas atualização automática precisa ser tratada com cautela, pois está ligada a:

1. Versionamento.
2. version.json.
3. Cache.
4. Service Worker.
5. Navegador.
6. PWA instalado.
7. Atualização de assets.
8. Diagnóstico do sistema.

Qualquer mudança em atualização automática deve ser considerada mudança sensível.

Não entra em refinamento comum.

## 39. Incidente em campo

Um ponto marcante do histórico foi a diferença entre ambientes.

O sistema podia funcionar corretamente em casa, em Wi-Fi ou em 4G de determinada região.

Ao sair da área, o sistema podia abrir versão antiga.

Isso gerou a hipótese de que o problema não era apenas no aparelho, mas podia envolver combinação de:

1. Cache local.
2. Service Worker.
3. Rede.
4. CDN.
5. Navegador.
6. Momento do deploy.
7. Arquivos antigos.
8. Estado anterior do aplicativo no dispositivo.

Mesmo que a causa final não tenha sido isolada em um único fator, a resposta correta do projeto foi fortalecer versionamento, diagnóstico e política de cache.

## 40. Navegação normal e navegação anônima

Durante o incidente, houve relato de que tanto a navegação normal quanto a navegação anônima abriram versão antiga.

Esse dado foi importante porque enfraqueceu a explicação simples de cache comum do navegador.

A investigação precisou considerar:

1. Produção.
2. CDN.
3. Service Worker.
4. Arquivos publicados.
5. Cache em camadas.
6. Domínio oficial.
7. Deploy correto.
8. Possível projeto errado.
9. Possível pasta errada.
10. Possível versão antiga servida por algum caminho.

Por isso, o protocolo oficial não pode depender de “limpar cache e tentar novamente” como única solução.

## 41. Ausência de Pré-venda e Diagnóstico como prova de versão antiga

Durante o downgrade, dois sinais fortes indicavam carregamento de versão antiga:

1. Ausência do módulo de Pré-venda.
2. Ausência do Diagnóstico do Sistema.

Esses sinais são importantes porque mostram que não era apenas uma diferença pequena de layout.

Era uma base anterior do sistema.

No futuro, quando houver suspeita de downgrade, os primeiros pontos a conferir são:

1. Existe Pré-venda?
2. Existe Diagnóstico do Sistema?
3. O diagnóstico mostra versão correta?
4. A versão publicada bate com a versão do aplicativo?
5. O Service Worker está controlando?
6. O version.json online está correto?
7. O domínio é o oficial?
8. A URL contém parâmetro de versão?
9. O problema ocorre no desktop, no mobile ou no app instalado?
10. O problema ocorre em Wi-Fi, 4G ou ambos?

## 42. Relação entre downgrade e PWA

A frente PWA não pode ignorar o histórico de downgrade.

PWA depende fortemente de Service Worker, cache, manifest, instalação e atualização.

Esses são exatamente os pontos que já causaram risco.

Por isso, transformar o Mini ERP em PWA exige mais cautela do que criar um atalho visual.

A estratégia PWA deve garantir:

1. O app instalado não carrega versão antiga.
2. O app instalado consegue atualizar corretamente.
3. O version.json continua conferível.
4. O diagnóstico funciona dentro do app instalado.
5. O Service Worker não prende versão antiga.
6. O cache não mantém HTML antigo.
7. O desktop segue intacto.
8. O mobile navegador segue funcionando.
9. O app instalado não cria comportamento paralelo difícil de auditar.
10. O rollback continua possível.

## 43. Regras permanentes para Service Worker

As regras oficiais são:

1. Não alterar Service Worker sem autorização explícita.
2. Não alterar Service Worker durante refinamento visual comum.
3. Não alterar Service Worker junto com múltiplos módulos funcionais.
4. Não trocar estratégia de cache sem auditoria.
5. Não apagar arquivo de Service Worker sem provar registro real.
6. Não manter dois Service Workers ativos sem saber qual controla a página.
7. Não cachear HTML principal de forma agressiva.
8. Não cachear version.json de forma que atrase atualização.
9. Não criar PWA sem revisar a estratégia de atualização.
10. Não publicar mudança de Service Worker sem teste em produção e mobile.

## 44. Regras permanentes para cache

As regras oficiais são:

1. Cache não pode impedir atualização.
2. Cache não pode esconder versão nova.
3. Cache não pode fazer o usuário trabalhar em versão antiga.
4. Cache deve ser documentado.
5. Cache deve ser testado em desktop.
6. Cache deve ser testado em mobile.
7. Cache deve ser testado em iPhone.
8. Cache deve ser testado no app instalado quando houver PWA.
9. Cache deve ter estratégia de limpeza ou renovação.
10. Cache não deve ser alterado junto com refinamentos comuns.

## 45. Regras permanentes para versionamento

As regras oficiais são:

1. Toda versão publicada precisa estar claramente identificada.
2. public/version.json precisa refletir a versão correta.
3. A versão interna do aplicativo precisa bater com a versão publicada.
4. A maior versão aceita precisa ser coerente.
5. O diagnóstico precisa exibir a comparação.
6. O histórico de versão deve ser preservado.
7. Não alterar versão sem autorização.
8. Não publicar versão sem build aprovado.
9. Não publicar versão sem teste.
10. Não criar nova versão para alteração incompleta.

## 46. Regras permanentes para atualização automática

As regras oficiais são:

1. A atualização automática deve preservar dados.
2. A atualização automática não pode prender o usuário em loop.
3. A atualização automática deve respeitar version.json.
4. A atualização automática deve ser testada após deploy.
5. A atualização automática deve funcionar em mobile.
6. A atualização automática deve funcionar em desktop.
7. A atualização automática deve ser compatível com PWA instalado.
8. A atualização automática não deve ser alterada durante refinamentos comuns.
9. A atualização automática deve ser documentada quando alterada.
10. A atualização automática deve ter caminho de rollback.

## 47. Diagnóstico obrigatório em suspeita de downgrade

Quando houver suspeita de downgrade, não iniciar correção imediatamente.

Primeiro coletar diagnóstico.

O diagnóstico deve responder:

1. Qual URL está aberta?
2. Qual navegador está sendo usado?
3. Qual sistema está sendo usado?
4. Está no desktop, mobile navegador ou app instalado?
5. Está em Wi-Fi ou 4G?
6. Qual versão do aplicativo aparece?
7. Qual versão publicada aparece?
8. Qual é a maior versão aceita?
9. O status da versão está OK?
10. Service Worker está disponível?
11. Service Worker está controlando?
12. Supabase está conectado?
13. Clientes foram carregados?
14. Pré-vendas foram carregadas?
15. Cobranças foram carregadas?
16. Delivery foi carregado?
17. Existe erro de sincronização?
18. A tela mostra módulos atuais?
19. O version.json online responde a versão correta?
20. O deploy na Vercel aponta para o domínio oficial?

Sem essas respostas, qualquer correção será tentativa no escuro.

## 48. Como classificar um problema de versão

Um problema de versão deve ser classificado em uma das categorias abaixo.

### 48.1 Produção realmente antiga

A produção realmente está antiga quando:

1. version.json online mostra versão antiga.
2. Vercel aponta para deploy antigo.
3. O domínio oficial não está no deploy esperado.
4. O build publicado não contém a versão nova.

Nesse caso, o problema está no deploy ou no projeto Vercel.

### 48.2 Produção correta, navegador antigo

A produção está correta, mas o navegador está antigo quando:

1. version.json online mostra versão nova.
2. Diagnóstico do app mostra versão antiga.
3. O navegador carrega assets antigos.
4. Limpeza ou atualização muda o comportamento.
5. Outro dispositivo abre corretamente.

Nesse caso, investigar cache local e Service Worker.

### 48.3 Produção correta, Service Worker antigo

A produção está correta, mas o Service Worker antigo está controlando quando:

1. version.json online mostra versão nova.
2. Service Worker aparece controlando a página.
3. Interface antiga aparece.
4. Arquivos antigos continuam sendo servidos.
5. Atualizar a página não resolve.
6. Fechar e abrir não resolve.

Nesse caso, investigar registro, escopo e caches do Service Worker.

### 48.4 Produção correta, CDN ou cache intermediário suspeito

Essa hipótese aparece quando:

1. Ambientes diferentes recebem versões diferentes.
2. Navegação anônima também apresenta versão antiga.
3. Em uma região funciona e em outra não.
4. version.json pode responder correto, mas interface não.
5. O problema parece depender de rede ou local.

Nesse caso, investigar headers, Vercel, CDN, cache e deploy forçado.

## 49. O que não fazer diante de downgrade

Diante de suspeita de downgrade, nunca:

1. Refatorar módulos.
2. Mexer em Pré-vendas sem prova.
3. Mexer em Cobranças sem prova.
4. Mexer em Delivery sem prova.
5. Criar nova funcionalidade.
6. Alterar layout.
7. Publicar deploy às cegas.
8. Apagar Service Worker sem auditoria.
9. Trocar versionamento sem conferir arquivos.
10. Concluir que o problema é apenas cache comum.
11. Trocar projeto Vercel.
12. Usar pasta errada.
13. Misturar Mini ERP com Catálogo.
14. Fazer múltiplas mudanças juntas.
15. Criar PWA antes de estabilizar atualização.

## 50. O que fazer diante de downgrade

Diante de suspeita de downgrade, fazer:

1. Registrar data e hora.
2. Registrar local e rede usada.
3. Abrir Diagnóstico do Sistema.
4. Conferir versão do aplicativo.
5. Conferir versão publicada.
6. Conferir maior versão aceita.
7. Conferir status da versão.
8. Conferir Service Worker.
9. Conferir Supabase.
10. Conferir módulos carregados.
11. Abrir version.json online.
12. Confirmar domínio oficial.
13. Confirmar projeto Vercel.
14. Confirmar pasta local.
15. Confirmar versão nos arquivos locais.
16. Rodar build somente se houver necessidade.
17. Fazer deploy somente com autorização.
18. Validar em desktop.
19. Validar em iPhone.
20. Validar em campo.
21. Criar backup após validação.

## 51. Relação entre Supabase e downgrade

O Supabase não foi identificado como causa principal do downgrade.

Mas ele entra no diagnóstico porque ajuda a diferenciar problema de versão de problema de dados.

Se o sistema abre corretamente, mas não carrega dados, pode ser problema de Supabase, rede, permissões, consulta ou sincronização.

Se o sistema abre versão antiga, sem módulos novos, o problema é anterior ao Supabase.

Por isso, no diagnóstico, Supabase deve ser lido junto com versão e módulos carregados.

## 52. Relação entre pré-vendas e estabilidade

As Pré-vendas foram uma das funcionalidades mais importantes da fase recente.

Elas passaram por refinamentos implementados:

1. Confirmação antes de excluir.
2. Paginação.
3. Filtro por data.
4. Resumo por data.
5. Conferência consolidada dos produtos.
6. Referência do cliente.
7. Horário da pré-venda.
8. Quantidade dos itens.
9. Forma de pagamento.
10. Total por cliente.
11. Modal corrigido.
12. Remoção do botão “Copiar resumo” por decisão de projeto.

Como esse módulo foi consolidado na versão estável, ele também funciona como sinal de versão correta.

Se Pré-vendas desaparece, ou volta a comportamento antigo, há suspeita de downgrade.

## 53. Relação entre atualização automática e confiança operacional

A atualização automática foi estabilizada como funcionalidade importante.

O usuário em campo não pode ficar tentando descobrir manualmente se está na versão certa.

O sistema precisa ajudar nessa conferência.

Por isso, o Mini ERP deve preservar:

1. Identificação clara da versão.
2. Diagnóstico acessível.
3. Comparação com versão publicada.
4. Status da versão.
5. Aviso quando a versão não estiver correta.
6. Atualização confiável.
7. Proteção contra versão antiga.

No PWA, essa necessidade aumenta.

Um aplicativo instalado pode dar sensação de estabilidade, mas também pode prender uma versão antiga se o Service Worker estiver errado.

## 54. A versão 2026.06.24.03 como marco de estabilidade

A versão 2026.06.24.03 deve ser tratada como marco de estabilidade porque foi validada em produção e em campo.

Ela representa o ponto a partir do qual a frente PWA pode começar a ser planejada.

Essa versão contém:

1. Clientes estáveis.
2. Pré-vendas estáveis.
3. Vendas estáveis.
4. Delivery estável.
5. Cobranças estáveis.
6. Financeiro estável.
7. Relatórios estáveis.
8. Sincronização Supabase estável.
9. Atualização automática estável.
10. Deploy Vercel estável.
11. Refinamentos recentes de pré-vendas.
12. Ausência de regressões conhecidas no documento LEIA.

A frente PWA não deve começar por “melhorar tudo”.

Ela deve começar por preservar esta estabilidade.

## 55. Conclusão operacional da Parte 2

A história do downgrade define a postura técnica do projeto.

O Mini ERP não deve evoluir por entusiasmo técnico.

Ele deve evoluir por necessidade operacional, com prova, teste e backup.

Service Worker, cache, versionamento e atualização automática são áreas sensíveis.

Na frente PWA, essas áreas serão inevitavelmente tocadas ou revisadas.

Por isso, a próxima etapa do manual precisa formalizar os fluxos de deploy, rollback, backup e conferência de produção.

Sem esse fluxo, não se deve iniciar implementação PWA.
# MANUAL OFICIAL MINI ERP PWA

## Parte 3: Fluxo oficial de deploy, rollback, backups e conferência de produção

## 56. Importância desta parte do manual

Esta parte define o procedimento oficial para publicar, reverter, conferir produção e preservar backups do Mini ERP.

O Mini ERP está em produção e é utilizado diariamente em campo.

Por isso, deploy, rollback e backup não podem ser tratados como tarefas automáticas ou secundárias.

O histórico do projeto mostrou que uma publicação aparentemente correta pode não significar que o sistema realmente está correto no navegador, no celular, no iPhone ou no ambiente de campo.

A regra central desta parte é:

Nenhum deploy deve ser feito sem build aprovado, teste mínimo, conferência de versão e autorização explícita.

## 57. Objetivo do fluxo oficial

O fluxo oficial existe para garantir que:

1. O projeto correto seja publicado.
2. A pasta correta seja usada.
3. A versão correta seja conferida antes e depois do deploy.
4. O domínio oficial receba o deploy certo.
5. O Service Worker não esconda versão antiga.
6. O cache não provoque downgrade.
7. Os módulos estáveis continuem funcionando.
8. O desktop permaneça preservado.
9. O mobile continue funcional.
10. O sistema possa ser revertido se houver problema.
11. Um backup seja criado após validação real.
12. A operação diária não seja prejudicada.

## 58. Regra absoluta antes de qualquer deploy

Antes de qualquer deploy, confirmar que o terminal está na pasta oficial:

```powershell
cd C:\Users\Delber\Mini-ERP\projeto
```

Essa conferência é obrigatória.

Nunca publicar estando em outra pasta.

Nunca publicar dentro da pasta do Catálogo.

Nunca publicar a partir de ZIP extraído em local temporário sem antes confirmar que ele é a base correta.

Nunca publicar a partir de uma pasta antiga apenas porque ela parece parecida.

## 59. Domínio oficial de produção

O domínio oficial do Mini ERP é:

```text
https://mini-erp-canastra.vercel.app
```

Toda conferência de produção deve apontar para esse domínio.

Se o deploy gerar outro endereço temporário da Vercel, ele pode ser usado apenas como referência técnica, mas a validação final precisa ser feita no domínio oficial.

## 60. Projeto Vercel oficial

O projeto Vercel oficial é:

```text
mini-erp-canastra
```

Antes de publicar, deve existir segurança de que a pasta local está vinculada ao projeto correto.

Se houver dúvida, não publicar.

A confusão entre projetos ou pastas é um risco real, principalmente porque o usuário também trabalha com o Catálogo.

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
11. `MANUAL-OFICIAL-MINI-ERP-PWA.md`, quando já estiver no projeto
12. Pasta `sql`, quando houver mudança de banco ou referência técnica

A conferência não significa alterar todos esses arquivos.

Significa confirmar que nada sensível foi mexido sem intenção.

## 62. Conferência inicial da versão local

Rodar:

```powershell
type public\version.json
```

O objetivo é confirmar a versão declarada no arquivo público.

A versão esperada para a base estável atual é:

```text
2026.06.24.03
```

Se a versão local não for a esperada, parar e investigar.

Não corrigir no impulso.

Primeiro descobrir se o ZIP é outro, se a pasta é antiga ou se houve alteração ainda não documentada.

## 63. Conferência da versão no App.jsx

Rodar:

```powershell
Select-String -Path src\App.jsx -Pattern "APP_VERSION"
```

O objetivo é verificar se o aplicativo tem uma versão interna declarada e se ela bate com a versão do `public\version.json`.

Se a versão interna do app for diferente da versão pública, há risco de diagnóstico falso ou atualização incorreta.

Nesse caso, não publicar antes de resolver a divergência.

## 64. Conferência da versão no main.jsx

Rodar:

```powershell
Select-String -Path src\main.jsx -Pattern "2026.06"
```

O objetivo é localizar qualquer referência direta a versão, atualização, cache ou parâmetro de recarga.

Se houver versão antiga em `src\main.jsx`, investigar.

Não alterar automaticamente.

Primeiro entender a função daquela referência.

## 65. Conferência de Service Worker antes do deploy

Como o Mini ERP já sofreu downgrade relacionado a Service Worker e cache, antes de qualquer deploy estrutural é obrigatório conferir:

```powershell
dir public
```

Depois verificar se existem:

```text
public\sw.js
public\service-worker.js
```

Se os dois existirem, não apagar nenhum.

Primeiro entender:

1. Qual deles é registrado.
2. Qual deles é servido em produção.
3. Qual deles contém lógica ativa.
4. Qual deles controla cache.
5. Qual deles pode afetar atualização.
6. Qual deles pode interferir no PWA.
7. Qual deles já foi usado em correção anterior.

Service Worker não deve ser alterado em refinamentos comuns.

## 66. Conferência do vercel.json

O arquivo `vercel.json` pode conter regras críticas de cabeçalho, cache, roteamento ou publicação.

Antes de deploy, conferir:

```powershell
type vercel.json
```

O objetivo é verificar se há regras relacionadas a:

1. Cache.
2. `version.json`.
3. HTML principal.
4. Service Worker.
5. Headers.
6. Redirecionamentos.
7. Rotas.
8. Build.

Se houver cabeçalhos de cache, qualquer alteração precisa ser tratada como sensível.

## 67. Instalação de dependências

Se a pasta foi recém extraída de ZIP ou se há dúvida sobre dependências, rodar:

```powershell
npm install
```

Se o PowerShell bloquear scripts ou houver problema com `npm`, usar:

```powershell
npm.cmd install
```

Não usar `npm install` como tentativa de corrigir erro sem ler a mensagem.

Se aparecer erro, registrar o erro e investigar.

## 68. Build oficial

O comando oficial de build é:

```powershell
npm run build
```

Se o PowerShell bloquear scripts, usar:

```powershell
npm.cmd run build
```

O build precisa terminar sem erro.

Warning não deve ser ignorado automaticamente.

Se houver warning relevante em área alterada, investigar.

Se houver erro, não publicar.

## 69. O que o build aprovado significa

Build aprovado significa apenas que o projeto conseguiu gerar uma versão compilada.

Build aprovado não significa:

1. Que o sistema está correto.
2. Que o deploy pode ser feito sem teste.
3. Que o Service Worker está correto.
4. Que o cache está correto.
5. Que o PWA está instalável.
6. Que o mobile está bom.
7. Que o desktop está preservado.
8. Que a versão publicada será a versão carregada no iPhone.

O build é etapa obrigatória, mas não é validação final.

## 70. Teste local antes do deploy

Após build aprovado, testar localmente.

Comando comum:

```powershell
npm run dev
```

Ou, se necessário:

```powershell
npm.cmd run dev
```

O teste local deve verificar pelo menos:

1. Sistema abre.
2. Desktop não quebrou.
3. Menu principal aparece.
4. Clientes carregam.
5. Pré-vendas aparecem.
6. Vendas aparecem.
7. Delivery aparece.
8. Cobranças aparecem.
9. Financeiro aparece.
10. Relatórios aparecem.
11. Diagnóstico do Sistema abre.
12. Não há erro visual grosseiro.
13. Não há tela branca.
14. Não há erro de console evidente.
15. O refinamento solicitado, quando houver, funciona.

## 71. Teste local não substitui produção

O teste local é obrigatório, mas não substitui validação no domínio oficial.

O histórico do Mini ERP mostrou que problemas de cache, Service Worker, Vercel e versão podem aparecer apenas em produção.

Por isso, depois do deploy, a conferência de produção é obrigatória.

## 72. Quando usar deploy

Deploy só deve ser feito quando:

1. A alteração foi autorizada.
2. A pasta correta foi confirmada.
3. A versão foi conferida.
4. O build passou.
5. O teste local passou.
6. O risco foi entendido.
7. O rollback é possível.
8. O usuário autorizou publicar.

Sem autorização explícita, não publicar.

## 73. Comando oficial de deploy

O comando oficial de deploy em produção é:

```powershell
vercel --prod
```

Quando houver necessidade comprovada de forçar publicação, especialmente após problemas de cache, usar apenas com autorização:

```powershell
vercel --prod --force
```

O uso de `--force` não deve ser automático.

Ele pode ser útil em situações de atualização ou cache, mas também deve ser documentado.

## 74. Conferência do resultado do deploy

Após o deploy, observar a saída do terminal.

Procurar confirmação de alias para o domínio oficial.

O ponto esperado é que a Vercel indique o domínio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Se o deploy gerar apenas um domínio temporário e não associar o domínio oficial, investigar antes de considerar concluído.

## 75. Conferência de alias

Rodar:

```powershell
vercel alias ls
```

O objetivo é confirmar que o domínio oficial está apontando para o deploy correto.

Se houver dúvida sobre alias, não concluir a publicação.

O domínio oficial precisa estar corretamente associado ao projeto `mini-erp-canastra`.

## 76. Conferência do version.json em produção

Após deploy, rodar:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

Conferir se a resposta contém a versão esperada.

Para a base estável atual, a versão esperada é:

```text
2026.06.24.03
```

Quando uma nova versão for autorizada futuramente, a versão esperada será a nova versão definida no processo.

## 77. Conferência manual no navegador desktop

Abrir:

```text
https://mini-erp-canastra.vercel.app
```

Verificar no desktop:

1. Sistema abre.
2. Não há tela branca.
3. Layout principal permanece correto.
4. Menu ou navegação principal aparece.
5. Clientes carregam.
6. Pré-vendas carregam.
7. Vendas carregam.
8. Delivery carrega.
9. Cobranças carregam.
10. Financeiro carrega.
11. Relatórios carregam.
12. Diagnóstico do Sistema abre.
13. Versão do aplicativo está correta.
14. Versão publicada está correta.
15. Status da versão está OK.
16. Supabase não mostra erro.
17. Não há regressão evidente.

## 78. Conferência manual no celular

Após validar no desktop, testar no celular.

No celular, conferir:

1. Sistema abre pelo navegador.
2. A barra inferior mobile aparece corretamente.
3. Pré-venda aparece.
4. Vendas aparecem.
5. Cobranças aparecem.
6. Delivery aparece.
7. Botões são clicáveis.
8. Campos não dão zoom indevido.
9. Modais abrem corretamente.
10. Modais fecham corretamente.
11. Rolagem funciona.
12. Diagnóstico abre.
13. Versão está correta.
14. Supabase carrega dados.
15. Não há retorno para versão antiga.

## 79. Conferência em iPhone

O iPhone deve ser tratado como ambiente importante.

Conferir:

1. Safari Mobile.
2. Chrome no iPhone, se usado.
3. Tela inicial, quando o PWA estiver instalado.
4. Comportamento em Wi-Fi.
5. Comportamento em 4G.
6. Diagnóstico do Sistema.
7. Service Worker disponível.
8. Service Worker controlando a página.
9. Versão do aplicativo.
10. Versão publicada.
11. Status da versão.

O histórico mostrou que iPhone e campo podem revelar problemas que o desktop não mostra.

## 80. Conferência em campo

A validação em campo é importante porque o sistema é usado em situação real.

Depois de deploy sensível, observar:

1. Funcionamento em 4G.
2. Funcionamento fora da residência.
3. Funcionamento em local de entrega.
4. Carregamento de Pré-vendas.
5. Carregamento de Cobranças.
6. Carregamento de Delivery.
7. Registro de venda ou pré-venda.
8. Sincronização com Supabase.
9. Ausência de downgrade.
10. Diagnóstico coerente.

Uma versão só deve ser considerada plenamente estável depois de sobreviver ao uso real.

## 81. Critério de deploy bem sucedido

Um deploy só é considerado bem sucedido quando:

1. Build passou.
2. Deploy terminou sem erro.
3. Domínio oficial aponta para a publicação correta.
4. `version.json` online mostra a versão esperada.
5. Desktop abre corretamente.
6. Mobile abre corretamente.
7. Diagnóstico mostra status OK.
8. Supabase carrega dados.
9. Módulos críticos aparecem.
10. Não há regressão imediata.
11. O usuário confirma que a versão está utilizável.
12. Backup é criado após validação.

## 82. Módulos obrigatórios para teste pós deploy

Os módulos mínimos para teste após deploy são:

1. Clientes.
2. Pré-vendas.
3. Vendas.
4. Delivery.
5. Cobranças.
6. Financeiro.
7. Relatórios.
8. Diagnóstico do Sistema.
9. Sincronização Supabase.
10. Atualização automática.

Se o deploy envolver PWA, acrescentar:

1. Manifest.
2. Ícone.
3. Instalação.
4. Abertura em tela cheia.
5. Atualização do app instalado.
6. Diagnóstico dentro do app instalado.
7. Não ocorrência de downgrade no app instalado.

## 83. Política oficial de backup

Sempre manter:

1. Última versão estável.
2. Versão imediatamente anterior.
3. Backup aprovado em campo.
4. Backups históricos relevantes.
5. Documentação correspondente à versão.
6. Registro da versão e data.
7. Indicação clara do motivo do backup.

Nunca sobrescrever backups históricos.

Nunca apagar backup antigo sem autorização explícita.

Nunca confiar apenas no deploy da Vercel como backup.

## 84. Quando criar backup

Criar backup:

1. Após versão estável validada.
2. Após deploy bem sucedido.
3. Após uso em campo sem regressão.
4. Antes de iniciar frente sensível.
5. Antes de mexer em Service Worker.
6. Antes de mexer em cache.
7. Antes de mexer em versionamento.
8. Antes de iniciar PWA.
9. Antes de alterar Supabase ou estrutura de banco.
10. Antes de refinar módulo crítico como Pré-vendas, Cobranças ou Delivery.

## 85. Nome recomendado para backup

O nome do backup deve deixar claro:

1. Projeto.
2. Versão.
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

O backup deve conter o projeto necessário para retomada.

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
10. Documentos técnicos oficiais
11. Arquivos de configuração necessários, sem expor segredos
12. Registro da versão

## 87. O que não deve entrar no backup enviado para conversa

Evitar enviar em ZIP de auditoria:

1. `node_modules`
2. `.git`
3. `.vercel`
4. `.env.local`
5. Arquivos com segredos
6. Backups antigos dentro do ZIP
7. Zips antigos dentro do ZIP
8. Pasta `dist`, salvo quando houver motivo específico
9. Arquivos mortos sem necessidade
10. Arquivos temporários do sistema

Esses itens deixam o ZIP pesado e podem gerar confusão.

No backup local completo, alguns itens podem existir por contexto, mas o ZIP enviado para auditoria deve ser limpo.

## 88. Backup antes da frente PWA

Antes de iniciar qualquer implementação PWA, criar backup da versão atual estável.

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

Esse backup só deve ser criado depois de validação real.

Não criar backup “estável” apenas porque o build passou.

## 90. Diferença entre backup técnico e backup aprovado em campo

Backup técnico é uma cópia do projeto em determinado momento.

Backup aprovado em campo é uma cópia de uma versão que foi usada na operação real sem regressão conhecida.

O backup aprovado em campo tem mais valor operacional.

Ele deve ser preservado com prioridade.

## 91. Fluxo oficial de rollback

Rollback é o processo de voltar para uma versão anterior estável.

Ele deve ser usado quando uma versão nova causa problema relevante.

O fluxo oficial é:

1. Identificar o problema.
2. Confirmar se é problema real e não apenas cache local.
3. Coletar diagnóstico.
4. Identificar a última versão estável.
5. Localizar o backup correto.
6. Restaurar o backup em pasta controlada.
7. Conferir versão do backup.
8. Rodar `npm install`, se necessário.
9. Rodar build.
10. Testar localmente.
11. Publicar somente com autorização.
12. Conferir `version.json` em produção.
13. Conferir domínio oficial.
14. Conferir desktop.
15. Conferir mobile.
16. Conferir iPhone.
17. Conferir campo, quando possível.
18. Registrar o rollback.
19. Criar novo backup do estado recuperado, se necessário.

## 92. Rollback não é apagar mudanças no escuro

Rollback não deve ser feito apagando arquivos manualmente sem controle.

A forma correta é restaurar uma versão estável conhecida.

Se usar backup, restaurar o backup inteiro.

Se usar controle de versão, voltar para commit correto, quando aplicável.

Se usar ZIP, extrair em pasta clara e conferir antes de substituir.

Não misturar arquivos de versões diferentes.

## 93. Quando fazer rollback

Rollback deve ser considerado quando:

1. Sistema abre versão errada.
2. Pré-vendas somem.
3. Vendas quebram.
4. Cobranças quebram.
5. Delivery quebra.
6. Supabase deixa de carregar por causa de alteração recente.
7. Desktop é afetado indevidamente.
8. Mobile fica inutilizável.
9. App instalado prende versão antiga.
10. Service Worker causa loop ou downgrade.
11. Atualização automática falha gravemente.
12. Há risco operacional em campo.

## 94. Quando não fazer rollback imediatamente

Não fazer rollback imediato quando:

1. O problema ainda não foi diagnosticado.
2. O problema pode ser apenas cache local.
3. O `version.json` online está correto e apenas um aparelho está com cache antigo.
4. O erro está em dado específico e não na versão.
5. O problema é pequeno e tem correção localizada segura.
6. A versão nova ainda não foi confirmada como causadora do erro.

Nesses casos, primeiro coletar diagnóstico.

## 95. Rollback e Service Worker

Rollback envolvendo Service Worker exige muito cuidado.

Um Service Worker novo pode continuar ativo mesmo após voltar código antigo.

Um Service Worker antigo pode continuar controlando a página mesmo após deploy novo.

Por isso, em rollback relacionado a Service Worker, conferir:

1. Arquivo registrado.
2. Escopo.
3. Caches existentes.
4. Política de ativação.
5. Política de limpeza.
6. `version.json`.
7. Diagnóstico.
8. Desktop.
9. Mobile.
10. iPhone.
11. App instalado, quando houver PWA.

Não fazer rollback de Service Worker sem auditoria.

## 96. Rollback e cache

Rollback pode ser confundido por cache.

Depois de rollback, o usuário pode continuar vendo versão anterior por cache.

Por isso, sempre conferir:

1. `version.json` online.
2. Diagnóstico do Sistema.
3. Aba anônima.
4. Outro dispositivo.
5. Desktop.
6. Mobile.
7. iPhone.
8. 4G.
9. Wi-Fi.
10. App instalado, quando houver.

A conclusão precisa se basear em evidência.

## 97. Conferência de produção após rollback

Após rollback, repetir a conferência completa:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

Depois abrir o domínio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Verificar:

1. Versão correta.
2. Status OK.
3. Pré-vendas presentes.
4. Vendas presentes.
5. Cobranças presentes.
6. Delivery presente.
7. Clientes carregados.
8. Supabase conectado.
9. Sem regressão visual.
10. Sem retorno para versão problemática.

## 98. Registro de rollback

Todo rollback deve ser documentado.

Registrar:

1. Data.
2. Hora.
3. Versão com problema.
4. Versão restaurada.
5. Motivo do rollback.
6. Sintomas observados.
7. Ambiente afetado.
8. Resultado do diagnóstico.
9. Comandos usados.
10. Resultado da validação.
11. Se houve impacto em dados.
12. Se houve necessidade de limpar cache ou Service Worker.
13. Se backup foi criado.

## 99. Fluxo oficial de conferência de produção

A conferência de produção deve seguir esta ordem:

1. Conferir domínio.
2. Conferir `version.json`.
3. Conferir alias Vercel.
4. Abrir desktop.
5. Abrir Diagnóstico.
6. Conferir versão do aplicativo.
7. Conferir versão publicada.
8. Conferir maior versão aceita.
9. Conferir status da versão.
10. Conferir Service Worker.
11. Conferir Supabase.
12. Conferir módulos carregados.
13. Testar mobile.
14. Testar iPhone.
15. Testar campo, quando necessário.
16. Registrar resultado.
17. Criar backup se aprovado.

## 100. Comandos oficiais de conferência

Entrar na pasta correta:

```powershell
cd C:\Users\Delber\Mini-ERP\projeto
```

Conferir versão pública local:

```powershell
type public\version.json
```

Conferir versão no App.jsx:

```powershell
Select-String -Path src\App.jsx -Pattern "APP_VERSION"
```

Conferir referências de versão no main.jsx:

```powershell
Select-String -Path src\main.jsx -Pattern "2026.06"
```

Conferir arquivos públicos:

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

Deploy em produção, somente com autorização:

```powershell
vercel --prod
```

Deploy forçado, somente com justificativa e autorização:

```powershell
vercel --prod --force
```

Conferir versão online:

```powershell
Invoke-WebRequest https://mini-erp-canastra.vercel.app/version.json -UseBasicParsing
```

## 101. Checklist mínimo antes de publicar

Antes de publicar, confirmar:

1. Estou na pasta `C:\Users\Delber\Mini-ERP\projeto`.
2. O projeto é o Mini ERP, não o Catálogo.
3. A versão local foi conferida.
4. `public\version.json` foi conferido.
5. `src\App.jsx` foi conferido.
6. `src\main.jsx` foi conferido.
7. Service Worker não foi alterado sem autorização.
8. Cache não foi alterado sem autorização.
9. Supabase não foi alterado sem autorização.
10. Banco não foi alterado sem autorização.
11. A alteração foi localizada.
12. O build passou.
13. O teste local passou.
14. O usuário autorizou deploy.
15. Existe caminho de rollback.

## 102. Checklist mínimo depois de publicar

Depois de publicar, confirmar:

1. Deploy terminou sem erro.
2. Domínio oficial foi associado.
3. `vercel alias ls` está coerente.
4. `version.json` online mostra a versão esperada.
5. Desktop abre.
6. Mobile abre.
7. Diagnóstico abre.
8. Versão do aplicativo está correta.
9. Versão publicada está correta.
10. Status da versão está OK.
11. Service Worker está coerente.
12. Supabase carrega.
13. Clientes carregam.
14. Pré-vendas carregam.
15. Vendas carregam.
16. Delivery carrega.
17. Cobranças carregam.
18. Financeiro carrega.
19. Relatórios carregam.
20. Não há regressão imediata.

## 103. Checklist especial para PWA após publicação

Quando a frente PWA começar, acrescentar:

1. Manifest existe.
2. Manifest é carregado em produção.
3. Ícone aparece corretamente.
4. Aplicativo pode ser instalado.
5. Aplicativo abre em tela cheia.
6. Aplicativo usa o mesmo domínio.
7. Aplicativo usa o mesmo Supabase.
8. Aplicativo usa o mesmo código.
9. Desktop permanece igual.
10. Mobile navegador permanece igual ou melhor.
11. App instalado mostra Diagnóstico.
12. App instalado mostra versão correta.
13. App instalado não carrega versão antiga.
14. Atualização automática funciona.
15. Rollback continua possível.
16. Service Worker não prende HTML antigo.
17. Cache não prende assets antigos críticos.
18. `version.json` não fica preso em cache.
19. O app instalado funciona em Wi-Fi.
20. O app instalado funciona em 4G.

## 104. Procedimento em caso de erro após deploy

Se aparecer erro após deploy:

1. Não fazer nova alteração imediatamente.
2. Abrir Diagnóstico do Sistema.
3. Registrar versão do aplicativo.
4. Registrar versão publicada.
5. Registrar status da versão.
6. Registrar ambiente.
7. Conferir `version.json` online.
8. Conferir se o problema ocorre no desktop.
9. Conferir se o problema ocorre no mobile.
10. Conferir se o problema ocorre em outro dispositivo.
11. Conferir se o problema ocorre em aba anônima.
12. Conferir se o problema ocorre em 4G e Wi-Fi.
13. Classificar se é problema de código, cache, Service Worker, deploy, Supabase ou dado.
14. Decidir entre correção localizada e rollback.
15. Só agir depois de entender o cenário.

## 105. Procedimento em caso de tela branca

Se houver tela branca:

1. Não publicar outra versão no impulso.
2. Conferir build local.
3. Conferir console do navegador.
4. Conferir `version.json`.
5. Conferir se o deploy foi associado ao domínio.
6. Conferir se o erro ocorre no desktop e no mobile.
7. Conferir se o problema aparece em aba anônima.
8. Conferir se o Service Worker está controlando.
9. Conferir arquivos de cache.
10. Considerar rollback se o sistema estiver inutilizável.

Tela branca em produção é incidente crítico.

## 106. Procedimento em caso de sumiço de módulo

Se um módulo sumir após deploy, principalmente Pré-vendas ou Diagnóstico:

1. Suspeitar de downgrade.
2. Abrir Diagnóstico, se disponível.
3. Conferir versão do aplicativo.
4. Conferir versão publicada.
5. Conferir `version.json`.
6. Conferir desktop.
7. Conferir mobile.
8. Conferir aba anônima.
9. Conferir outro dispositivo.
10. Conferir Service Worker.
11. Não mexer no módulo desaparecido sem provar que o problema está nele.

Sumiço de módulo pode ser versão antiga carregada, não erro no módulo.

## 107. Procedimento em caso de erro de Supabase

Se o sistema abre, mas os dados não carregam:

1. Conferir se a versão está correta.
2. Conferir mensagem de erro no diagnóstico.
3. Conferir conexão.
4. Conferir se há erro de sincronização.
5. Conferir se clientes carregam.
6. Conferir se pré-vendas carregam.
7. Conferir se cobranças carregam.
8. Conferir se delivery carrega.
9. Não alterar banco sem autorização.
10. Não alterar Supabase sem auditoria.

Supabase é área permanente protegida.

## 108. Procedimento em caso de problema apenas no iPhone

Se o problema ocorre apenas no iPhone:

1. Conferir Safari Mobile.
2. Conferir Chrome no iPhone, se aplicável.
3. Conferir se está em Wi-Fi ou 4G.
4. Conferir se há PWA instalado.
5. Conferir se a tela inicial usa app antigo.
6. Conferir Diagnóstico.
7. Conferir Service Worker.
8. Conferir versão publicada.
9. Conferir `version.json`.
10. Não concluir que o código está errado sem comparar com desktop.

iPhone pode reter comportamento específico de cache e PWA.

## 109. Procedimento em caso de problema apenas em campo

Se o problema ocorre apenas em campo:

1. Registrar local aproximado.
2. Registrar rede usada.
3. Registrar horário.
4. Abrir Diagnóstico.
5. Conferir versão.
6. Conferir módulos.
7. Conferir Supabase.
8. Comparar com Wi-Fi de casa.
9. Comparar com outro dispositivo.
10. Conferir se é rede, cache, Service Worker ou versão.

O histórico mostrou que campo pode revelar problema real de atualização.

## 110. Política de autorização

As seguintes ações exigem autorização explícita:

1. Deploy.
2. Rollback.
3. Alteração de Service Worker.
4. Alteração de cache.
5. Alteração de versionamento.
6. Alteração de Supabase.
7. Alteração de estrutura do banco.
8. Alteração de arquitetura.
9. Início da implementação PWA.
10. Refatoração.
11. Remoção de arquivo crítico.
12. Mudança em módulo não relacionado.
13. Publicação forçada com `vercel --prod --force`.

Sem autorização, a ação deve ficar apenas no plano ou no diagnóstico.

## 111. Política para Codex em deploy

O Codex pode ajudar a auditar, localizar arquivos e sugerir comandos.

Mas não deve publicar sem autorização explícita.

Comando para orientar o Codex em fase de conferência:

```text
Audite somente o necessário para confirmar a versão local, o build, o Service Worker, o cache e o projeto Vercel. Não altere arquivos. Não publique. Não gere ZIP. Não faça deploy. Apenas informe se a pasta está correta, se a versão local bate com public/version.json, se há risco em Service Worker ou cache e se o projeto parece pronto para build.
```

Comando para orientar o Codex antes de deploy autorizado:

```text
Estamos no projeto Mini ERP Queijos Serra da Canastra, pasta oficial C:\Users\Delber\Mini-ERP\projeto. Antes de qualquer publicação, confirme a versão, rode npm run build ou npm.cmd run build, valide que não houve alteração indevida em Service Worker, cache, Supabase, banco ou arquitetura. Não faça deploy sem eu autorizar explicitamente.
```

Comando para deploy somente depois de autorização:

```text
Deploy autorizado. Confirme novamente que está na pasta C:\Users\Delber\Mini-ERP\projeto, que o projeto é mini-erp-canastra, que o build passou e publique em produção na Vercel. Após publicar, confira o domínio oficial https://mini-erp-canastra.vercel.app, confira o version.json online e informe o resultado.
```

## 112. Política para Codex em rollback

Comando para orientar o Codex em caso de rollback:

```text
Precisamos avaliar rollback do Mini ERP. Não altere arquivos ainda. Primeiro identifique a versão atual, a versão publicada, o problema relatado, o último backup estável e o caminho de restauração. Depois informe o plano de rollback com riscos e comandos. Não publique nada sem autorização explícita.
```

Comando para rollback autorizado:

```text
Rollback autorizado para a última versão estável validada. Use somente o backup indicado, confirme a versão restaurada, rode npm install se necessário, rode npm run build ou npm.cmd run build, teste localmente e publique somente no projeto mini-erp-canastra. Depois confira version.json online, domínio oficial e status da versão no Diagnóstico do Sistema.
```

## 113. Política para Codex em backup

Comando para orientar backup antes de frente sensível:

```text
Criar um backup limpo do Mini ERP antes da próxima frente de trabalho. A pasta oficial é C:\Users\Delber\Mini-ERP\projeto. O backup deve conter src, public, sql quando existir, package.json, package-lock.json, vercel.json, README e documentos oficiais. Não incluir node_modules, .git, .vercel, .env.local, dist salvo necessidade justificada, backups antigos ou arquivos temporários. Nome sugerido: MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip.
```

## 114. Regra de documentação após deploy

Depois de uma publicação aprovada, atualizar a documentação somente se a mudança realmente alterou o estado do projeto.

Registrar:

1. Versão.
2. Data.
3. Motivo.
4. Arquivos alterados.
5. Módulos afetados.
6. Testes realizados.
7. Resultado em desktop.
8. Resultado em mobile.
9. Resultado em iPhone.
10. Resultado em campo, quando houver.
11. Backup criado.
12. Riscos remanescentes.

Não criar documentação inflada para alteração pequena, mas também não deixar mudança sensível sem registro.

## 115. Regra de documentação após rollback

Após rollback, documentar obrigatoriamente:

1. Versão problemática.
2. Versão restaurada.
3. Motivo.
4. Sintoma.
5. Diagnóstico.
6. Comando usado.
7. Resultado.
8. Pendência futura.
9. Backup utilizado.
10. Se Service Worker ou cache foram envolvidos.

Rollback sem registro enfraquece a segurança do projeto.

## 116. Relação entre deploy e nova frente PWA

A frente PWA mexe em pontos sensíveis.

Mesmo que a primeira etapa pareça simples, como adicionar manifest e ícones, o contexto envolve:

1. Instalação.
2. Tela cheia.
3. Cache.
4. Service Worker.
5. Atualização.
6. Ícones.
7. Manifest.
8. iPhone.
9. Mobile.
10. Desktop preservado.

Por isso, o primeiro deploy PWA deve ser tratado como deploy sensível.

Antes dele, criar backup.

Depois dele, testar mais do que em um refinamento comum.

## 117. O que não pode acontecer em um deploy PWA

Um deploy PWA não pode:

1. Alterar visual do desktop sem necessidade.
2. Remover módulo.
3. Quebrar Pré-vendas.
4. Quebrar Cobranças.
5. Quebrar Delivery.
6. Quebrar Vendas.
7. Alterar Supabase sem autorização.
8. Criar segunda base de código.
9. Criar outro domínio.
10. Criar outro banco.
11. Prender versão antiga no app instalado.
12. Causar downgrade.
13. Remover diagnóstico.
14. Impedir rollback.
15. Esconder a versão real.

## 118. Condição para considerar uma versão PWA estável

Uma versão PWA só será estável quando:

1. Desktop estiver igual.
2. Mobile navegador estiver funcional.
3. App instalado estiver funcional.
4. Diagnóstico funcionar nos três contextos.
5. Versão do app bater com versão publicada.
6. `version.json` estiver correto.
7. Supabase estiver conectado.
8. Pré-vendas estiverem carregando.
9. Cobranças estiverem carregando.
10. Delivery estiver carregando.
11. Vendas estiverem carregando.
12. Atualização funcionar após novo deploy.
13. Não houver downgrade.
14. Houver backup pós validação.
15. O usuário aprovar em uso real.

## 119. Conclusão operacional da Parte 3

Deploy, rollback e backup são pilares de segurança do Mini ERP.

O projeto não deve depender de sorte, memória ou tentativa.

Toda publicação precisa seguir um ritual.

Toda reversão precisa partir de versão estável conhecida.

Todo backup precisa ter nome claro e função clara.

A versão 2026.06.24.03 é a base estável atual e deve ser preservada antes da frente PWA.

A próxima parte do manual deve formalizar os protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex.
# MANUAL OFICIAL MINI ERP PWA

## Parte 4: Protocolos de auditoria, refinamento localizado, testes e comandos oficiais do Codex

## 120. Objetivo desta parte

Esta parte define como qualquer análise ou refinamento deve ser conduzido no Mini ERP.

O objetivo é evitar confusão, alteração fora de escopo, regressão e novo incidente de versão.

O Mini ERP deve ser trabalhado sempre com método.

A regra principal é:

Primeiro auditar.
Depois localizar.
Depois propor.
Depois testar.
Só então publicar, se houver autorização.

## 121. Dois modos oficiais de trabalho

O Mini ERP possui dois modos oficiais de trabalho:

1. Auditoria completa.
2. Refinamento localizado.

Esses modos não devem ser misturados.

## 122. Auditoria completa

A auditoria completa deve ser usada quando o assunto envolver risco estrutural.

Usar auditoria completa em casos como:

1. Nova versão recebida por ZIP.
2. Suspeita de downgrade.
3. Problema de atualização.
4. Problema de cache.
5. Problema de Service Worker.
6. Problema de versionamento.
7. Problema de deploy.
8. Problema de Supabase.
9. Problema de banco de dados.
10. Transformação em PWA.
11. Mudança de arquitetura.
12. Tela branca.
13. Sumiço de módulo.
14. Inconsistência entre desktop e mobile.
15. Erro em produção sem causa clara.

Na auditoria completa, o Codex pode percorrer mais arquivos, mas não deve alterar nada sem autorização.

## 123. Refinamento localizado

O refinamento localizado deve ser usado para mudanças pequenas e controladas.

Exemplos:

1. Ajuste visual.
2. Texto de botão.
3. Mensagem.
4. Modal.
5. Filtro.
6. Paginação.
7. Organização de card.
8. Pequena melhoria de UX.
9. Ajuste de cor.
10. Ajuste de espaçamento.
11. Ajuste em lista.
12. Ajuste em formulário.

No refinamento localizado, não se deve percorrer o projeto inteiro.

Não se deve refatorar.

Não se deve mexer em módulos não relacionados.

Não se deve alterar Service Worker, cache, versionamento, Supabase, banco, deploy ou arquitetura.

## 124. Regra de ouro do refinamento localizado

Antes de alterar qualquer coisa, provar onde está o código.

O Codex deve mostrar:

1. O arquivo exato.
2. O trecho atual.
3. O componente ou função envolvida.
4. O comportamento atual.
5. O comportamento desejado.
6. A alteração mínima necessária.
7. O risco da alteração.
8. O teste necessário.

Sem isso, não alterar.

## 125. Áreas protegidas

As áreas abaixo são protegidas e não devem ser alteradas em refinamentos comuns:

1. Service Worker.
2. Cache.
3. Versionamento.
4. Atualização automática.
5. Supabase.
6. Sincronização.
7. Estrutura do banco.
8. Deploy.
9. Vercel.
10. Arquitetura geral.
11. Autenticação, se existir na versão auditada.
12. Dados persistidos.
13. Estratégia offline.
14. Arquivos de configuração sensíveis.

Qualquer alteração nessas áreas exige autorização explícita.

## 126. Módulos sensíveis

Os módulos abaixo são sensíveis porque fazem parte da operação diária:

1. Pré-vendas.
2. Vendas.
3. Delivery.
4. Cobranças.
5. Clientes.
6. Pagamentos.
7. Financeiro.
8. Relatórios.
9. Diagnóstico do Sistema.

Alterações nesses módulos devem ser pequenas, justificadas e testadas.

## 127. Protocolo oficial de auditoria inicial

Quando receber um ZIP ou iniciar uma nova conversa, seguir esta ordem:

1. Confirmar que o projeto é o Mini ERP.
2. Confirmar que não é o Catálogo.
3. Confirmar a versão.
4. Conferir a estrutura de pastas.
5. Conferir arquivos principais.
6. Conferir Service Worker.
7. Conferir cache.
8. Conferir versionamento.
9. Conferir Supabase.
10. Conferir vercel.json.
11. Conferir módulos existentes.
12. Conferir riscos.
13. Não alterar nada.
14. Não gerar código.
15. Não gerar deploy.
16. Não gerar ZIP.
17. Entregar relatório objetivo.

## 128. Arquivos obrigatórios na auditoria inicial

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

O objetivo é entender o estado real do projeto, não alterar arquivos.

## 129. Protocolo de auditoria para PWA

Antes de iniciar qualquer implementação PWA, auditar:

1. Se já existe manifest.
2. Se já existe link para manifest no HTML ou na estrutura do Vite.
3. Se já existem ícones.
4. Se já existe Service Worker ativo.
5. Qual Service Worker está registrado.
6. Qual cache está sendo usado.
7. Se o Service Worker cacheia HTML.
8. Se version.json é cacheado.
9. Se index.html pode ficar preso em cache.
10. Se há cabeçalhos de cache no vercel.json.
11. Se há atualização automática.
12. Se o Diagnóstico mostra Service Worker.
13. Se o desktop depende de alguma lógica mobile.
14. Se o mobile já tem layout próprio.
15. Se há risco de quebrar o desktop.
16. Se há risco de novo downgrade.

Nenhuma implementação PWA deve começar antes dessa auditoria.

## 130. Protocolo de refinamento localizado

Para qualquer refinamento pequeno, seguir:

1. Ler o pedido.
2. Identificar o módulo afetado.
3. Localizar o arquivo exato.
4. Mostrar o trecho atual.
5. Explicar o ajuste mínimo.
6. Confirmar que Service Worker, cache, Supabase, banco e versionamento não serão tocados.
7. Alterar apenas o necessário.
8. Rodar build.
9. Testar o fluxo afetado.
10. Conferir módulos críticos.
11. Não publicar sem autorização.

## 131. Regra para barra inferior mobile

Antes de alterar a barra inferior mobile, é obrigatório:

1. Abrir src/App.jsx.
2. Localizar o trecho exato da barra inferior.
3. Mostrar a composição atual real.
4. Confirmar os botões existentes.
5. Confirmar a ordem atual.
6. Confirmar qual alteração foi pedida.
7. Alterar somente aquele trecho.
8. Testar mobile.
9. Conferir desktop para garantir que não foi afetado.

Essa regra nasceu porque mudanças aparentemente pequenas na navegação mobile podem afetar a operação em campo.

## 132. Regra para Pré-vendas

Antes de alterar Pré-vendas, é obrigatório:

1. Localizar o trecho exato do módulo.
2. Identificar se a alteração envolve listagem, modal, filtro, paginação, resumo, exclusão, edição ou conversão.
3. Confirmar se a alteração afeta dados salvos no Supabase.
4. Confirmar se a alteração afeta apenas visual ou também lógica.
5. Proteger o fluxo de salvar.
6. Proteger o fluxo de editar.
7. Proteger o fluxo de excluir.
8. Proteger o fluxo de converter.
9. Proteger o filtro por data.
10. Proteger a paginação.
11. Rodar build.
12. Testar no mobile.

Pré-vendas é módulo crítico.

Não mexer nele por dedução.

## 133. Regra para Cobranças

Antes de alterar Cobranças, é obrigatório:

1. Localizar o trecho exato.
2. Confirmar se a mudança afeta lista, mensagem, resumo, pagamento ou baixa.
3. Preservar pendências múltiplas.
4. Preservar valores em aberto.
5. Preservar mensagem para WhatsApp.
6. Preservar dados salvos.
7. Testar cliente com uma pendência.
8. Testar cliente com múltiplas pendências.
9. Conferir Financeiro, se houver integração.
10. Rodar build.

Cobranças não deve ser alterado junto com outros módulos sem motivo forte.

## 134. Regra para Delivery

Antes de alterar Delivery, é obrigatório:

1. Localizar o trecho exato.
2. Confirmar se a mudança afeta Nova Entrega.
3. Confirmar se afeta modal.
4. Confirmar se afeta status.
5. Confirmar se afeta cliente.
6. Confirmar se afeta referência.
7. Confirmar se afeta itens.
8. Preservar dados salvos.
9. Testar no mobile.
10. Rodar build.

Delivery é fluxo de campo.

Pequenas quebras podem atrapalhar a entrega real.

## 135. Regra para Vendas

Antes de alterar Vendas, é obrigatório:

1. Localizar o trecho exato.
2. Confirmar se a mudança afeta cliente cadastrado.
3. Confirmar se afeta cliente avulso.
4. Confirmar se afeta itens.
5. Confirmar se afeta forma de pagamento.
6. Confirmar se afeta total.
7. Confirmar se afeta conferência antes de salvar.
8. Confirmar se afeta retorno para Pré-venda.
9. Testar venda simples.
10. Testar venda com pagamento em aberto.
11. Rodar build.

## 136. Regra para reconhecimento por voz

Antes de alterar reconhecimento por voz, é obrigatório:

1. Localizar parser ou função responsável.
2. Preservar cliente.
3. Preservar referência.
4. Preservar itens adquiridos.
5. Preservar forma de pagamento.
6. Preservar valor.
7. Testar frase real.
8. Testar variações de Pix.
9. Testar referência com número e complemento.
10. Testar referência com escola ou local.
11. Testar fala incompleta.
12. Rodar build.

Regra consolidada para referência:

Quando a fala tiver “referência”, capturar tudo que vier depois dela até encontrar “itens adquiridos”, “itens”, “produto”, “produtos”, “forma de pagamento”, “pagamento” ou o fim da frase.

Não cortar número, bloco, apartamento, letra ou complemento.

Exemplos válidos:

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
2. Débito.
3. Crédito.
4. Fiado.
5. Em aberto.

Deve considerar variações reconhecidas incorretamente, como:

1. pics.
2. pixx.
3. pics.
4. piques, se aparecer em teste real.
5. crédito com ruído.
6. débito com ruído.

Não salvar automaticamente sem conferência.

O fluxo preferido é:

Falar.
Conferir.
Salvar.

## 138. Protocolo de teste mínimo após refinamento

Após qualquer refinamento, testar:

1. Sistema abre.
2. Desktop não quebrou.
3. Mobile não quebrou.
4. Módulo alterado funciona.
5. Pré-vendas continuam aparecendo.
6. Vendas continuam aparecendo.
7. Delivery continua aparecendo.
8. Cobranças continuam aparecendo.
9. Clientes carregam.
10. Diagnóstico abre.
11. Supabase não mostra erro.
12. Build passou.

## 139. Protocolo de teste completo

Usar teste completo quando houver mudança sensível.

Testar:

1. Desktop Chrome.
2. Mobile Chrome.
3. Safari iPhone.
4. Wi-Fi.
5. 4G.
6. Diagnóstico.
7. Versionamento.
8. Service Worker.
9. Cache.
10. Supabase.
11. Clientes.
12. Pré-vendas.
13. Vendas.
14. Delivery.
15. Cobranças.
16. Financeiro.
17. Relatórios.
18. Atualização automática.
19. PWA instalado, quando existir.
20. Rollback possível.

## 140. Teste específico para desktop

No desktop, conferir:

1. Layout principal.
2. Menu.
3. Painel.
4. Clientes.
5. Pré-vendas.
6. Vendas.
7. Delivery.
8. Cobranças.
9. Financeiro.
10. Relatórios.
11. Produtos.
12. Diagnóstico.
13. Ausência de tela branca.
14. Ausência de erro visual grave.
15. Desktop preservado.

## 141. Teste específico para mobile

No mobile, conferir:

1. Barra inferior.
2. Botões principais.
3. Leitura dos cards.
4. Modais.
5. Formulários.
6. Rolagem.
7. Ausência de zoom indevido.
8. Pré-vendas.
9. Vendas.
10. Cobranças.
11. Delivery.
12. Diagnóstico.
13. Teclado.
14. Campo de quantidade.
15. Campo de cliente.
16. Campo de referência.
17. Botão voltar.
18. Botão salvar.
19. Botão excluir com confirmação.
20. Uso em tela pequena.

## 142. Teste específico para Pré-vendas

Conferir:

1. Lista aparece.
2. Paginação funciona.
3. Filtro por data funciona.
4. Resumo por data aparece.
5. Conferência consolidada dos produtos funciona.
6. Referência aparece.
7. Horário aparece.
8. Quantidade aparece.
9. Forma de pagamento aparece.
10. Total por cliente aparece.
11. Modal abre.
12. Modal fecha.
13. Edição funciona.
14. Exclusão pede confirmação.
15. Botão “Copiar resumo” continua removido.
16. Dados carregam do Supabase.
17. Mobile não dá zoom indevido.
18. Desktop permanece correto.

## 143. Teste específico para Cobranças

Conferir:

1. Lista de pendências aparece.
2. Cliente com uma cobrança aparece corretamente.
3. Cliente com múltiplas cobranças aparece corretamente.
4. Valor total está correto.
5. Mensagem para WhatsApp está correta.
6. Baixa de pagamento funciona, se aplicável.
7. Resumo aparece.
8. Filtros funcionam, se existirem.
9. Mobile está legível.
10. Supabase não apresenta erro.

## 144. Teste específico para Delivery

Conferir:

1. Lista de entregas aparece.
2. Nova Entrega abre.
3. Modal abre corretamente.
4. Cliente aparece.
5. Referência aparece.
6. Itens aparecem.
7. Status funciona.
8. Edição funciona, se existir.
9. Finalização funciona, se existir.
10. Mobile está utilizável.

## 145. Teste específico para Vendas

Conferir:

1. Nova venda abre.
2. Cliente cadastrado funciona.
3. Cliente avulso funciona.
4. Itens funcionam.
5. Quantidade funciona.
6. Valor funciona.
7. Pix funciona.
8. Débito funciona.
9. Crédito funciona.
10. Em aberto funciona.
11. Conferência antes de salvar funciona.
12. Salvar funciona.
13. Retorno para Pré-venda funciona, quando aplicável.
14. Pagamentos e financeiro não quebraram.

## 146. Teste específico para Diagnóstico do Sistema

Conferir:

1. Diagnóstico abre.
2. Mostra data.
3. Mostra versão do aplicativo.
4. Mostra versão publicada.
5. Mostra maior versão aceita.
6. Mostra status da versão.
7. Mostra Service Worker disponível.
8. Mostra Service Worker controlando.
9. Mostra online ou offline.
10. Mostra ambiente.
11. Mostra URL.
12. Mostra navegador.
13. Mostra sistema.
14. Mostra Supabase.
15. Mostra última atualização de dados.
16. Mostra erro de sincronização, se houver.
17. Mostra clientes carregados.
18. Mostra pré-vendas carregadas.
19. Mostra cobranças carregadas.
20. Mostra delivery carregados.

## 147. Teste específico para PWA

Quando a frente PWA começar, testar:

1. Manifest carregado.
2. Ícone correto.
3. Nome correto do app.
4. Instalação disponível.
5. Abertura em tela cheia.
6. Mesmo domínio.
7. Mesmo Supabase.
8. Mesmo código.
9. Desktop preservado.
10. Mobile preservado.
11. Diagnóstico dentro do app instalado.
12. Versão correta dentro do app instalado.
13. Atualização após deploy.
14. Sem downgrade.
15. Sem cache antigo.
16. Sem HTML antigo.
17. Sem perda de dados.
18. Funcionamento em Wi-Fi.
19. Funcionamento em 4G.
20. Rollback possível.

## 148. Comando oficial para Codex, auditoria inicial

Usar quando abrir uma nova etapa de trabalho:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Projeto: Mini ERP Queijos Serra da Canastra.
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
Domínio oficial: https://mini-erp-canastra.vercel.app
Versão estável de referência: 2026.06.24.03

Objetivo:

Auditar o projeto atual antes de qualquer alteração.

Regras:

Não alterar arquivos.
Não gerar código.
Não gerar deploy.
Não gerar ZIP.
Não modificar Service Worker.
Não modificar cache.
Não modificar versionamento.
Não modificar Supabase.
Não modificar banco.
Não modificar arquitetura.
Não criar novo projeto.
Não criar segunda base de código.

Confirme:

1. Se a pasta é a correta.
2. Se o projeto é o Mini ERP, não o Catálogo.
3. Qual versão local foi encontrada.
4. Se public/version.json existe.
5. Se src/App.jsx contém versão interna.
6. Se src/main.jsx contém referência de versão.
7. Se existem public/sw.js e public/service-worker.js.
8. Se existe vercel.json.
9. Se há arquivos relacionados a PWA.
10. Quais módulos existem.
11. Quais riscos existem.
12. Qual plano seguro para a próxima etapa.
```

## 149. Comando oficial para Codex, refinamento localizado

Usar quando for fazer ajuste pequeno:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Vamos fazer apenas um refinamento localizado no Mini ERP.

Regras:

Não refatorar.
Não percorrer o projeto inteiro sem necessidade.
Não alterar Service Worker.
Não alterar cache.
Não alterar versionamento.
Não alterar Supabase.
Não alterar banco.
Não alterar arquitetura.
Não alterar módulos não relacionados.
Não fazer deploy sem autorização.

Antes de alterar:

1. Identifique o arquivo exato.
2. Mostre o trecho atual.
3. Explique o comportamento atual.
4. Explique a alteração mínima necessária.
5. Informe riscos.
6. Informe como testar.

Depois da alteração, rode npm run build ou npm.cmd run build.
```

## 150. Comando oficial para Codex, auditoria PWA sem alteração

Usar antes de implementar PWA:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Objetivo:

Auditar a base atual do Mini ERP para preparar a transformação em PWA instalável.

Regras:

Não alterar arquivos.
Não gerar código.
Não fazer deploy.
Não criar novo projeto.
Não criar segunda base de código.
Não alterar desktop.
Não alterar Service Worker.
Não alterar cache.
Não alterar versionamento.
Não alterar Supabase.
Não alterar banco.

Confirme:

1. Se existe manifest.
2. Se existem ícones de app.
3. Se existe registro de Service Worker.
4. Qual Service Worker está ativo.
5. Como o cache está configurado.
6. Como version.json é servido.
7. Se vercel.json possui headers relevantes.
8. Se o desktop depende de algo que poderia ser afetado pelo PWA.
9. Quais arquivos precisariam ser tocados em uma futura implementação PWA.
10. Quais riscos existem para downgrade.
11. Qual seria o plano seguro em etapas, sem implementar ainda.
```

## 151. Comando oficial para Codex, implementação PWA autorizada

Usar somente depois de auditoria e autorização:

```text
Implementação PWA autorizada, mas somente em etapas pequenas.

Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Regras absolutas:

Manter o desktop exatamente como está.
Não criar novo projeto.
Não criar segunda base de código.
Não criar outro Supabase.
Não criar outro banco.
Não criar outro domínio.
Não alterar módulos funcionais sem necessidade.
Não mexer em Service Worker além do mínimo necessário e somente se for comprovado.
Não alterar cache sem explicar impacto.
Não alterar versionamento sem autorização específica.
Não fazer deploy sem autorização final.

Primeira etapa:

Propor a menor implementação possível para tornar o Mini ERP instalável como PWA, preservando a versão estável 2026.06.24.03 como referência.

Antes de alterar, mostre:

1. Arquivos que serão tocados.
2. Trechos atuais.
3. Alteração proposta.
4. Risco de cada alteração.
5. Testes necessários.
6. Plano de rollback.
```

## 152. Comando oficial para Codex, teste pós alteração

Usar depois de qualquer alteração:

```text
Faça a validação pós alteração do Mini ERP.

Regras:

Não alterar novos arquivos.
Não fazer deploy.
Não refatorar.
Apenas testar e relatar.

Execute:

1. npm run build ou npm.cmd run build.
2. Confira se não houve erro.
3. Liste os arquivos alterados.
4. Confirme se Service Worker foi ou não alterado.
5. Confirme se cache foi ou não alterado.
6. Confirme se versionamento foi ou não alterado.
7. Confirme se Supabase foi ou não alterado.
8. Confirme se banco foi ou não alterado.
9. Confirme se desktop foi preservado.
10. Informe o checklist manual necessário para o usuário testar.
```

## 153. Comando oficial para Codex, suspeita de downgrade

Usar se aparecer versão antiga:

```text
Suspeita de downgrade no Mini ERP.

Não altere arquivos.
Não publique.
Não gere código.
Não faça rollback ainda.

Investigue e informe:

1. Versão local em public/version.json.
2. Versão interna em src/App.jsx.
3. Referências de versão em src/main.jsx.
4. Existência de public/sw.js.
5. Existência de public/service-worker.js.
6. Estratégia de cache encontrada.
7. Conteúdo de vercel.json.
8. Possível causa para versão antiga.
9. Como conferir version.json online.
10. Como conferir alias da Vercel.
11. Qual diagnóstico pedir ao usuário.
12. Próximos passos seguros.

Lembrete:

O domínio oficial é https://mini-erp-canastra.vercel.app.
A versão estável de referência é 2026.06.24.03.
```

## 154. Comando oficial para Codex, backup antes do PWA

Usar antes de iniciar implementação PWA:

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
10. Demais documentos oficiais necessários

Não incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. dist, salvo justificativa
6. backups antigos
7. zips antigos
8. arquivos temporários

Não alterar o projeto.
Não publicar.
Apenas criar o backup limpo e informar o caminho final.
```

## 155. Comando oficial para Codex, deploy autorizado

Usar apenas se o usuário autorizar:

```text
Deploy autorizado pelo usuário.

Antes de publicar:

1. Confirme que está em C:\Users\Delber\Mini-ERP\projeto.
2. Confirme que o projeto é mini-erp-canastra.
3. Confirme que não é o Catálogo.
4. Rode npm run build ou npm.cmd run build.
5. Confirme que o build passou.
6. Confirme arquivos alterados.
7. Confirme se Service Worker foi alterado.
8. Confirme se cache foi alterado.
9. Confirme se versionamento foi alterado.
10. Confirme se Supabase ou banco foram alterados.

Depois publique em produção:

vercel --prod

Se houver justificativa aprovada para forçar:

vercel --prod --force

Depois do deploy:

1. Confirme o domínio https://mini-erp-canastra.vercel.app.
2. Confira version.json online.
3. Confira alias da Vercel.
4. Informe o checklist para teste em desktop, mobile e iPhone.
```

## 156. Comando oficial para Codex, rollback

Usar em caso de necessidade real:

```text
Avaliar rollback do Mini ERP.

Não alterar arquivos ainda.
Não publicar ainda.

Primeiro informe:

1. Versão atual.
2. Versão publicada.
3. Problema relatado.
4. Módulos afetados.
5. Se há suspeita de cache.
6. Se há suspeita de Service Worker.
7. Qual backup estável será usado.
8. Quais riscos existem.
9. Plano de rollback.
10. Comandos necessários.

Só executar rollback depois de autorização explícita.
```

## 157. Como o usuário deve usar estes comandos

O usuário não precisa colar o manual inteiro no Codex toda vez.

O correto é manter estes arquivos dentro da pasta do projeto:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Depois, no Codex, basta pedir:

Leia os dois arquivos oficiais antes de qualquer ação.

Assim, o Codex usa o manual como referência e evita depender de memória da conversa.

## 158. O que o Codex nunca deve fazer sem autorização

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
11. Criar outro domínio.
12. Misturar Mini ERP com Catálogo.
13. Apagar arquivos críticos.
14. Criar ZIP de produção sem pedido.
15. Tratar PWA como projeto separado.

## 159. O que o Codex pode fazer em segurança

O Codex pode:

1. Ler arquivos.
2. Auditar estrutura.
3. Identificar versão.
4. Localizar trecho de código.
5. Explicar riscos.
6. Propor plano.
7. Rodar build quando autorizado.
8. Listar arquivos alterados.
9. Criar backup limpo quando pedido.
10. Preparar checklist.
11. Validar se a alteração ficou localizada.
12. Alertar sobre risco de regressão.

## 160. Conclusão operacional da Parte 4

O Mini ERP deve evoluir com disciplina.

A auditoria completa serve para cenários estruturais e sensíveis.

O refinamento localizado serve para ajustes pequenos.

Service Worker, cache, versionamento, Supabase, banco e arquitetura são áreas protegidas.

A frente PWA deve começar por auditoria, não por implementação.

O Codex deve ser usado como auxiliar técnico, mas sempre dentro das regras do projeto.

A próxima parte do manual deve registrar refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes.
# MANUAL OFICIAL MINI ERP PWA

## Parte 5: Refinamentos implementados, funcionalidades aprovadas e funcionalidades pendentes

## 161. Objetivo desta parte

Esta parte registra o que já foi implementado, o que está aprovado como direção do projeto e o que ainda está pendente.

O objetivo é evitar retrabalho, evitar mudanças repetidas e impedir que uma funcionalidade estável seja refeita sem necessidade.

O Mini ERP evolui por refinamentos pequenos e controlados.

Cada refinamento precisa respeitar o estado estável atual:

Versão oficial estável: 2026.06.24.03

Essa versão deve ser preservada como base antes da frente PWA.

## 162. Regra para leitura desta parte

As funcionalidades citadas como estáveis não devem ser refeitas do zero.

Se houver novo ajuste, ele deve ser localizado.

As funcionalidades citadas como aprovadas não significam autorização automática para implementar.

Elas indicam direção de projeto já aceita.

As funcionalidades pendentes precisam de auditoria antes de qualquer código.

## 163. Funcionalidades estáveis principais

O LEIA PRIMEIRO confirma como estáveis:

1. Clientes.
2. Pré vendas.
3. Vendas.
4. Delivery.
5. Cobranças.
6. Financeiro.
7. Relatórios.
8. Sincronização Supabase.
9. Atualização automática.
10. Deploy Vercel.

Essas áreas formam o núcleo operacional do Mini ERP.

Qualquer alteração futura deve proteger esses módulos.

## 164. Clientes, estado consolidado

O módulo de Clientes é estável.

Ele serve como base para:

1. Vendas.
2. Pré vendas.
3. Delivery.
4. Cobranças.
5. Referências de entrega.
6. Organização da operação em campo.

A referência do cliente é parte importante do uso real.

Ela pode representar escola, quadra, prédio, setor, bloco, apartamento ou local de entrega.

Exemplos de referências usadas na operação:

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
17. 35ª DP.

A referência não deve ser cortada ou simplificada indevidamente.

## 165. Clientes, cuidados futuros

Antes de mexer em Clientes, conferir:

1. Cadastro.
2. Edição.
3. Busca.
4. Referência.
5. Integração com venda.
6. Integração com pré venda.
7. Integração com delivery.
8. Integração com cobrança.
9. Cliente avulso.
10. Supabase.

Não alterar Clientes apenas para resolver problema em outro módulo.

## 166. Pré vendas, estado consolidado

Pré vendas é um dos módulos mais importantes do Mini ERP.

Ele nasceu de uma necessidade real da operação:

Registrar rapidamente uma intenção de compra em momentos curtos, especialmente em campo, para converter depois em venda.

O módulo está estável na versão 2026.06.24.03.

O LEIA PRIMEIRO confirma os seguintes refinamentos implementados em Pré vendas:

1. Confirmação antes de excluir.
2. Paginação.
3. Filtro por data.
4. Resumo por data.
5. Conferência consolidada dos produtos.
6. Referência do cliente.
7. Horário da pré venda.
8. Quantidade dos itens.
9. Forma de pagamento.
10. Total por cliente.
11. Modal corrigido.
12. Botão “Copiar resumo” removido por decisão de projeto.

Esses pontos devem ser considerados consolidados.

## 167. Pré vendas, confirmação antes de excluir

A exclusão de pré venda deve exigir confirmação.

Essa confirmação evita apagar pedidos por engano durante uso em campo.

Essa regra deve ser preservada.

Não remover confirmação de exclusão sem autorização explícita.

## 168. Pré vendas, paginação

A paginação foi implementada para melhorar organização e leitura.

Ela evita listas longas demais e torna o módulo mais controlável.

A paginação deve continuar funcionando no desktop e no mobile.

Ao testar Pré vendas, conferir:

1. Mudança de página.
2. Quantidade de itens por página.
3. Funcionamento junto com filtro por data.
4. Funcionamento junto com resumo por data.
5. Ausência de quebra visual no mobile.

## 169. Pré vendas, filtro por data

O filtro por data foi implementado para facilitar a conferência de pedidos por dia.

Ele é útil para a rotina de entrega e fechamento.

Deve ser preservado.

Ao testar, conferir:

1. Data atual.
2. Datas anteriores.
3. Lista filtrada.
4. Resumo filtrado.
5. Paginação junto com filtro.
6. Ausência de perda de dados.

## 170. Pré vendas, resumo por data

O resumo por data ajuda a entender o volume de pedidos em determinado dia.

Ele deve considerar corretamente os itens das pré vendas filtradas.

Ao testar, conferir:

1. Produtos listados.
2. Quantidades consolidadas.
3. Totais por cliente.
4. Coerência com a lista visível.
5. Funcionamento no mobile.

## 171. Pré vendas, conferência consolidada dos produtos

A conferência consolidada dos produtos é uma melhoria importante.

Ela permite enxergar os itens de forma agrupada, facilitando preparo, separação e conferência.

Esse recurso deve ser preservado.

Não reintroduzir botão ou resumo removido sem nova decisão de projeto.

## 172. Pré vendas, referência do cliente

A referência do cliente foi incorporada ao fluxo de pré vendas.

Isso é essencial para a operação real, pois muitos pedidos são organizados pelo local.

A referência deve aparecer de forma clara.

Não deve ser escondida no mobile.

Não deve ser cortada indevidamente.

## 173. Pré vendas, horário da pré venda

O horário da pré venda foi implementado para dar contexto operacional.

Ele ajuda a entender quando o pedido foi registrado.

Esse dado pode ajudar em conferência e prioridade de atendimento.

Deve ser preservado.

## 174. Pré vendas, quantidade dos itens

A quantidade dos itens foi ajustada para aparecer corretamente.

Esse campo é essencial para evitar erro de separação e cobrança.

Ao testar, conferir:

1. Produto com uma unidade.
2. Produto com mais de uma unidade.
3. Produto com valor total.
4. Produto em modal.
5. Produto em listagem.

## 175. Pré vendas, forma de pagamento

A forma de pagamento aparece nas pré vendas.

Isso ajuda a separar vendas pagas, em aberto ou por forma de recebimento.

Formas comuns:

1. Pix.
2. Débito.
3. Crédito.
4. Fiado.
5. Em aberto.

Esse dado deve ser preservado no módulo.

## 176. Pré vendas, total por cliente

O total por cliente foi consolidado.

Esse total é importante para cobrança, conferência e conversão.

Ao testar, conferir:

1. Soma correta dos itens.
2. Cliente com um produto.
3. Cliente com vários produtos.
4. Cliente com pagamento em aberto.
5. Cliente convertido, se aplicável.

## 177. Pré vendas, modal corrigido

O modal de pré vendas foi corrigido e deve ser preservado.

O histórico menciona problema de zoom no mobile ao editar pré venda e ao clicar em voltar.

A correção do modal foi relevante porque o uso em campo depende de tela estável.

Cuidados futuros:

1. Não alterar inputs sem testar no iPhone.
2. Não alterar tamanho de fonte sem testar zoom.
3. Não alterar modal junto com outras mudanças.
4. Não alterar comportamento do botão voltar sem teste.
5. Testar abertura e fechamento no mobile.

## 178. Pré vendas, botão “Copiar resumo” removido

O botão “Copiar resumo” foi removido por decisão de projeto.

Essa remoção deve ser respeitada.

Não recolocar esse botão sem nova autorização.

Se houver necessidade futura de copiar informações, deve ser discutido antes, para não voltar com uma função que já foi descartada.

## 179. Pré vendas, funcionalidades já discutidas e aprovadas como direção

Além dos refinamentos implementados, há direções aprovadas ou discutidas para evolução de Pré vendas:

1. Mover convertidas para o final.
2. Dar cor diferente para convertidas.
3. Reduzir card de pré venda convertida.
4. Permitir conversão para Delivery quando não houver estoque.
5. Retornar para Pré vendas após salvar venda.
6. Remover ou reduzir o botão “Converter” da listagem, conforme decisão de UX.
7. Melhorar reconhecimento de referência por voz.
8. Melhorar reconhecimento de forma de pagamento por voz.
9. Preservar fluxo Falar, Conferir, Salvar.

Esses pontos não devem ser implementados todos juntos.

Cada um exige auditoria localizada.

## 180. Vendas, estado consolidado

O módulo de Vendas é estável.

Ele deve permitir lançamento real de venda, com cliente cadastrado ou cliente avulso.

Elementos importantes:

1. Cliente.
2. Referência.
3. Itens adquiridos.
4. Quantidade.
5. Valor.
6. Forma de pagamento.
7. Conferência antes de salvar.
8. Integração com pagamentos e financeiro.
9. Integração com pré venda, quando houver conversão.

O fluxo de venda é central para o Mini ERP.

Não alterar Vendas sem teste completo.

## 181. Vendas, cliente avulso

O cliente avulso é permitido.

Essa função é importante para venda rápida sem cadastro prévio.

O sistema deve preservar o nome informado, mesmo sem cadastro completo.

Não obrigar cadastro antes da venda, salvo decisão futura muito bem justificada.

## 182. Vendas, conferência antes de salvar

O fluxo preferido é sempre:

Falar.
Conferir.
Salvar.

Ou, em uso manual:

Preencher.
Conferir.
Salvar.

Essa conferência evita erro em cliente, referência, item, valor e pagamento.

Não remover etapa de conferência para “ganhar velocidade” sem avaliar risco.

## 183. Vendas, reconhecimento por voz

O reconhecimento por voz foi trabalhado para acelerar o lançamento.

Frase padrão preferida:

cliente [nome], referência [texto], itens adquiridos [lista], forma de pagamento [pix, crédito, débito, fiado ou em aberto]

O parser deve reconhecer:

1. Cliente.
2. Referência.
3. Itens adquiridos.
4. Forma de pagamento.
5. Valor, quando informado.
6. Pix, mesmo quando reconhecido errado.
7. Crédito.
8. Débito.
9. Fiado.
10. Em aberto.

O reconhecimento por voz ainda deve ser refinado com cautela.

## 184. Vendas, reconhecimento de referência por voz

Regra correta já definida:

Quando a fala tiver “referência”, o sistema deve capturar tudo que vier depois dela até encontrar:

1. “itens adquiridos”.
2. “itens”.
3. “produto”.
4. “produtos”.
5. “forma de pagamento”.
6. “pagamento”.
7. Fim da frase.

O parser não deve cortar número, bloco, apartamento, letra ou complemento.

Exemplos válidos:

1. referência EP 314 Sul.
2. referência 314 Sul.
3. referência 210 Norte.
4. referência 306 Norte.
5. referência 210 Sul Bloco A apto 102.
6. referência EC 306 Norte.
7. referência Escola Parque 210 Norte.
8. referência Paulo Freire.
9. referência SEB.
10. referência CHPP.

Essa regra vale como referência oficial para futuro refinamento.

## 185. Vendas, reconhecimento de Pix

O reconhecimento de voz pode transformar Pix em palavras erradas.

Correções futuras aprovadas como direção:

1. “pics” deve virar Pix.
2. “pixx” deve virar Pix.
3. “pics.” deve virar Pix.
4. Outras variações reais podem ser adicionadas depois de teste.

Não salvar automaticamente pagamento errado.

Sempre preservar conferência.

## 186. Delivery, estado consolidado

O módulo Delivery é estável.

Ele apoia a rotina de entregas e deve funcionar bem no mobile.

Fluxo conhecido:

1. Nova Entrega.
2. Modal.
3. Cliente.
4. Referência.
5. Itens.
6. Status.
7. Controle da entrega.
8. Uso em campo.

Delivery é módulo crítico para PWA.

O aplicativo instalado deve melhorar o acesso a esse módulo, não criar risco.

## 187. Delivery, funcionalidades aprovadas como direção

Funcionalidade discutida e aprovada como direção:

Converter pré venda para Delivery quando não houver estoque.

Essa funcionalidade faz sentido porque nem toda intenção de compra vira venda imediata.

Quando faltar produto, pode virar entrega futura.

Essa mudança deve ser feita com cuidado, pois envolve Pré vendas, Delivery e possivelmente Vendas.

Não implementar junto com mudanças de PWA.

## 188. Cobranças, estado consolidado

O módulo Cobranças é estável e crítico.

Ele permite controlar pagamentos em aberto e organizar cobrança de clientes.

Funcionalidades consolidadas no histórico:

1. Múltiplas pendências por cliente.
2. Mensagem final com marcação visual.
3. Resumo de cobranças.
4. Controle de valores em aberto.
5. Apoio ao envio pelo WhatsApp.
6. Uso em campo.

Cobranças não deve ser alterado junto com mudanças de PWA, salvo necessidade comprovada.

## 189. Cobranças, cuidados futuros

Antes de mexer em Cobranças, preservar:

1. Cliente.
2. Pendências múltiplas.
3. Valor individual.
4. Valor total.
5. Mensagem.
6. Baixa de pagamento.
7. Resumo.
8. Integração financeira.
9. Supabase.
10. Mobile.

Erro em Cobranças afeta diretamente recebimento.

## 190. Financeiro, estado consolidado

O Financeiro é estável.

Ele deve acompanhar:

1. Vendas.
2. Pagamentos.
3. Pendências.
4. Taxas.
5. Despesas.
6. Fornecedores.
7. Margem.
8. Resultado.
9. Relatórios.
10. Controle de caixa.

O módulo financeiro deve ser preservado com cuidado.

Não alterar cálculo financeiro sem validação.

## 191. Financeiro, parâmetros operacionais conhecidos

Parâmetros financeiros citados no histórico:

1. Pix: 0%.
2. Débito: 1,09%.
3. Crédito 2x: 5,39%.
4. Crédito 3x: 6,12%.
5. Crédito 4x: 6,85%.
6. Link 1x: 4,99%.
7. Link 2x: 7,50%.
8. Link 3x: 9,20%.

Há também uma referência operacional de margem por produto:

R$ 15,00 a R$ 20,00 de margem operacional como parâmetro de decisão.

Esses dados devem ser conferidos no sistema antes de qualquer automatização nova.

## 192. Relatórios, estado consolidado

Relatórios é funcionalidade estável.

Pode envolver:

1. Vendas.
2. Clientes.
3. Produtos.
4. Financeiro.
5. Cobranças.
6. Delivery.
7. Despesas.
8. Pagamentos.
9. Períodos.
10. Totais.

No desktop, Relatórios pode permanecer mais completo.

No mobile, deve ser tratado como secundário em relação à operação de campo.

## 193. Produtos, estado consolidado

Produtos é funcionalidade estável.

O módulo precisa manter a lista de produtos vendidos pela Queijos Serra da Canastra.

Produtos citados no histórico:

1. Minas Padrão.
2. Minas Frescal.
3. Meia cura zero lactose.
4. Mussarela palito.
5. Mussarela trança.
6. Provolone desidratado com goiabada.
7. Parmesão.
8. Defumado.
9. Requeijão tradicional.
10. Requeijão de búfala.
11. Doce de leite.
12. Goiabada.
13. Figo Ramy.
14. Salame.
15. Café.
16. Mel.
17. Kit quatro queijos.
18. Kit trança.
19. Cocada cremosa.

Não misturar a lógica de produtos do Mini ERP com a lógica visual do Catálogo.

## 194. Sincronização Supabase, estado consolidado

A sincronização com Supabase é funcionalidade estável.

Ela é área protegida.

Não alterar Supabase durante refinamentos comuns.

Não alterar estrutura do banco sem autorização.

Não alterar sincronização sem auditoria completa.

A sincronização deve ser conferida no Diagnóstico do Sistema.

## 195. Atualização automática, estado consolidado

A atualização automática é funcionalidade estável.

Ela está ligada a:

1. Versionamento.
2. version.json.
3. Service Worker.
4. Cache.
5. Diagnóstico.
6. Proteção contra downgrade.
7. Produção Vercel.
8. Futuro PWA.

Não alterar atualização automática durante refinamentos comuns.

Na frente PWA, essa parte deve ser auditada com cuidado antes de qualquer implementação.

## 196. Deploy Vercel, estado consolidado

O deploy pela Vercel é funcionalidade estável.

Projeto oficial:

mini-erp-canastra

Domínio oficial:

https://mini-erp-canastra.vercel.app

Caminho local oficial:

C:\Users\Delber\Mini-ERP\projeto

Deploy exige autorização explícita.

Não publicar sem build e validação.

## 197. Diagnóstico do Sistema, estado consolidado

O Diagnóstico do Sistema é funcionalidade crítica.

Ele deve mostrar:

1. Data.
2. Versão do aplicativo.
3. Versão publicada.
4. Maior versão aceita.
5. Status da versão.
6. Service Worker disponível.
7. Service Worker controlando.
8. Online.
9. Ambiente.
10. URL.
11. Navegador.
12. Sistema.
13. Supabase.
14. Última atualização de dados.
15. Erro de sincronização.
16. Clientes carregados.
17. Pré vendas carregadas.
18. Cobranças carregadas.
19. Delivery carregados.

Esse módulo deve continuar existindo no PWA.

Ele será indispensável para confirmar se o app instalado está usando a versão correta.

## 198. Barra inferior mobile, estado e cuidados

A barra inferior mobile é importante para operação em campo.

Histórico consolidado de ordem discutida:

1. Painel.
2. Pré venda.
3. Vendas.
4. Cobranças.
5. Outros itens conforme versão real do código.

Antes de alterar a barra inferior, é obrigatório auditar o trecho real no App.jsx.

Não assumir composição pela memória da conversa.

Mostrar o antes real.

Só depois alterar.

## 199. Mobile, refinamentos já tratados

O histórico do Mini ERP inclui preocupação com mobile.

Pontos relevantes:

1. Evitar zoom indevido em campos.
2. Corrigir modal de pré venda.
3. Preservar botões principais.
4. Preservar barra inferior.
5. Manter leitura dos cards.
6. Garantir rolagem.
7. Garantir clique em botões.
8. Testar em iPhone.
9. Testar em campo.
10. Preservar desktop.

A frente PWA deve melhorar fluidez mobile sem reescrever o sistema.

## 200. Funcionalidades aprovadas para evolução futura

Funcionalidades aprovadas como direção, mas ainda dependentes de auditoria e autorização:

1. Transformar o Mini ERP em PWA instalável.
2. Manter desktop exatamente como está.
3. Não criar novo projeto.
4. Não criar segunda base de código.
5. Usar mesmo domínio.
6. Usar mesmo Supabase.
7. Usar mesmo banco.
8. Usar mesmo deploy.
9. Criar experiência mais fluida no celular.
10. Ter ícone na tela inicial.
11. Abrir em tela cheia.
12. Preservar Diagnóstico do Sistema.
13. Preservar atualização automática.
14. Preservar proteção contra downgrade.
15. Criar backup antes da frente PWA.

## 201. Funcionalidades pendentes principais

Pendências já discutidas ou naturais para a próxima fase:

1. Auditoria completa antes do PWA.
2. Backup antes do PWA.
3. Verificar existência de manifest.
4. Verificar existência de ícones.
5. Verificar Service Worker atual.
6. Verificar cache atual.
7. Verificar headers no vercel.json.
8. Planejar installability.
9. Testar PWA em iPhone.
10. Testar PWA em Chrome mobile.
11. Testar atualização do app instalado.
12. Testar ausência de downgrade.
13. Documentar nova versão PWA.
14. Criar backup pós PWA estável.

## 202. Pendências em Pré vendas

Pendências possíveis em Pré vendas:

1. Melhorar conversão para Delivery quando não houver estoque.
2. Refinar comportamento de convertidas.
3. Melhorar diferenciação visual de convertidas.
4. Reduzir card de convertidas.
5. Avaliar botão “Converter” na listagem.
6. Preservar retorno para Pré venda depois de salvar.
7. Melhorar reconhecimento de referência por voz.
8. Melhorar reconhecimento de forma de pagamento por voz.
9. Evitar zoom no mobile em qualquer campo novo.
10. Testar em iPhone após cada ajuste.

Essas pendências não devem ser feitas durante a primeira implementação PWA.

## 203. Pendências em reconhecimento por voz

Pendências possíveis:

1. Corrigir variações de Pix.
2. Melhorar captura de referência.
3. Melhorar captura de forma de pagamento.
4. Melhorar captura de itens adquiridos.
5. Preservar cliente avulso.
6. Preservar conferência antes de salvar.
7. Testar frases reais de campo.
8. Evitar salvar informação errada automaticamente.

Exemplo real esperado:

Cliente Sílvio.
Referência EP 314 Sul.
Itens: Grana Padano R$ 49,00 e Figo Ramy R$ 65,00.
Pagamento: Fiado ou Em aberto.

## 204. Pendências em Delivery

Pendências possíveis:

1. Conversão de pré venda para Delivery.
2. Melhor visualização mobile.
3. Melhor organização por status.
4. Teste em campo.
5. Integração segura com vendas e pré vendas.

Não alterar Delivery junto com PWA inicial, salvo se a auditoria mostrar necessidade mínima.

## 205. Pendências em Cobranças

Pendências possíveis:

1. Melhorias de mensagem.
2. Melhorias de resumo.
3. Melhor filtro.
4. Melhor visual mobile.
5. Melhor integração com pagamentos.

Essas pendências devem ser tratadas em frente própria.

Cobranças é módulo financeiro sensível.

## 206. Pendências em Financeiro

Pendências possíveis:

1. Refinar controle de taxas.
2. Refinar controle de frete.
3. Refinar margem por produto.
4. Melhorar relatórios.
5. Melhorar visão de despesas.
6. Melhorar separação entre pago, fiado e em aberto.

Não mexer em cálculo sem conferência.

## 207. Pendências em PWA

Pendências específicas da frente PWA:

1. Confirmar se já existe manifest.
2. Criar ou ajustar manifest, se necessário.
3. Definir nome do aplicativo.
4. Definir nome curto.
5. Definir ícones.
6. Definir cor de tema.
7. Definir modo de exibição em tela cheia ou standalone.
8. Confirmar escopo do app.
9. Confirmar start_url.
10. Confirmar compatibilidade com Vercel.
11. Confirmar compatibilidade com Service Worker atual.
12. Confirmar estratégia de cache.
13. Confirmar que desktop não muda.
14. Confirmar que mobile navegador continua funcionando.
15. Confirmar que app instalado abre corretamente.
16. Confirmar atualização automática.
17. Confirmar version.json.
18. Confirmar Diagnóstico.
19. Confirmar rollback.
20. Criar backup final.

## 208. Nome do PWA

O nome do aplicativo ainda deve ser decidido antes da implementação.

Opções possíveis:

1. Mini ERP Canastra.
2. Mini ERP Queijos Canastra.
3. Queijos Serra da Canastra ERP.
4. Mini ERP.

Essa decisão deve ser feita antes de criar ou ajustar o manifest.

O nome deve ser curto, claro e reconhecível na tela inicial do celular.

## 209. Ícone do PWA

O ícone do PWA ainda deve ser definido.

Ele deve ser simples, legível e adequado para a tela inicial.

Não deve depender de detalhe pequeno demais.

Não deve poluir a identidade visual.

Deve funcionar em tamanhos diferentes.

Antes de implementar, definir se o ícone será:

1. Logo da Queijos Serra da Canastra.
2. Ícone simples de queijo.
3. Ícone com iniciais.
4. Ícone específico do Mini ERP.

A criação do ícone deve ser tratada como parte da frente PWA.

## 210. Tela cheia do PWA

Objetivo aprovado:

O PWA deve abrir em modo mais próximo de aplicativo.

Isso significa reduzir distrações do navegador no celular.

O comportamento esperado é:

1. Abrir pela tela inicial.
2. Usar o mesmo domínio.
3. Usar a mesma base.
4. Manter login ou estado conforme funcionamento atual.
5. Mostrar interface mobile.
6. Preservar diagnóstico.
7. Não criar versão separada.

## 211. Desktop preservado

Essa é uma regra absoluta.

O desktop deve permanecer exatamente como está.

A frente PWA não deve:

1. Alterar layout desktop.
2. Remover módulos desktop.
3. Simplificar desktop por causa do mobile.
4. Criar telas separadas sem necessidade.
5. Mudar navegação desktop.
6. Alterar relatórios desktop.
7. Alterar financeiro desktop.
8. Alterar fluxo administrativo.

Se algum ajuste global for inevitável para PWA, deve ser explicado e aprovado antes.

## 212. O que não deve entrar na primeira implementação PWA

A primeira implementação PWA não deve incluir:

1. Redesenho visual geral.
2. Nova arquitetura.
3. Novo banco.
4. Novo Supabase.
5. Novo domínio.
6. Novo projeto.
7. Refatoração de módulos.
8. Alteração de financeiro.
9. Alteração de cobranças.
10. Alteração de vendas.
11. Alteração de pré vendas.
12. Alteração de delivery.
13. Nova lógica offline complexa.
14. Push notification.
15. Login novo.
16. Reescrita do Service Worker sem necessidade comprovada.

A primeira etapa deve ser mínima e segura.

## 213. Funcionalidades que podem vir depois do PWA básico

Depois que o PWA básico estiver estável, podem ser avaliadas:

1. Melhorias específicas de mobile.
2. Atalhos internos.
3. Tela inicial mobile mais operacional.
4. Melhorias em Pré vendas.
5. Melhorias em Delivery.
6. Melhorias em Cobranças.
7. Operação offline mais robusta.
8. Alertas internos.
9. Melhorias no diagnóstico.
10. Melhor experiência de atualização.

Essas melhorias devem ser feitas uma por vez.

## 214. Funcionalidades que precisam de mais cuidado

Exigem cautela máxima:

1. Operação offline.
2. Sincronização posterior.
3. Alteração de Service Worker.
4. Alteração de cache.
5. Alteração de banco.
6. Alteração em Supabase.
7. Atualização automática.
8. Rollback.
9. PWA instalado.
10. Versionamento.

Essas áreas se relacionam diretamente com o histórico de downgrade.

## 215. Operação offline, estado e direção

A operação offline já foi discutida como objetivo futuro para:

1. Pré vendas.
2. Delivery.
3. Cobranças.

Mas ela não deve ser misturada com o primeiro PWA.

PWA instalável não significa automaticamente operação offline segura.

Offline com sincronização é uma frente própria e mais complexa.

Antes de implementar offline, será necessário definir:

1. Quais dados podem ser salvos offline.
2. Como sincronizar depois.
3. Como evitar duplicidade.
4. Como resolver conflito.
5. Como indicar pendência de sincronização.
6. Como preservar Supabase.
7. Como diagnosticar falha.
8. Como testar em campo.
9. Como fazer rollback.
10. Como evitar perda de dados.

## 216. Recibos e comprovantes bonitos

Foi discutida a possibilidade de o app ajudar a gerar recibos e comprovantes de pagamento mais bonitos.

Essa possibilidade faz sentido como evolução futura.

Mas não deve entrar na primeira etapa PWA.

Primeiro, o app precisa ser instalável e estável.

Depois, pode ser criada uma frente específica para:

1. Recibos.
2. Comprovantes de pagamento.
3. Layout de comprovante.
4. Compartilhamento pelo WhatsApp.
5. PDF ou imagem.
6. Histórico de comprovantes.
7. Integração com vendas.
8. Integração com pagamentos.

Essa frente deve ser planejada separadamente.

## 217. WhatsApp e mensagens

O Mini ERP tem relação com mensagens enviadas ao cliente, principalmente em cobranças, pedidos, pré vendas e registros.

Preferências consolidadas de comunicação:

1. Texto direto.
2. Tom profissional.
3. Sem excesso de formalidade.
4. Sem parecer desesperado para vender.
5. Linguagem próxima e clara.
6. Evitar “fico no aguardo”.
7. Evitar agradecimentos genéricos demais.
8. Preferir mensagens curtas.
9. Manter primeira pessoa quando fizer sentido.
10. Não encher a mensagem com informação desnecessária.

Essas preferências devem ser respeitadas em futuras mensagens geradas pelo sistema.

## 218. Chave Pix e pagamentos

O botão preferido é:

Copiar Chave Pix

Essa preferência deve ser preservada.

Não trocar para texto mais longo sem necessidade.

Em mensagens ao cliente, evitar excesso de detalhes.

Manter clareza sobre valor, forma de pagamento e chave Pix quando aplicável.

## 219. Produtos e registro de compras

O usuário costuma gerar registros de compras para clientes com:

1. Nome do cliente.
2. Referência.
3. Itens adquiridos.
4. Valor.
5. Forma de pagamento.
6. Chave Pix, quando necessário.
7. Observação de pagamento em aberto, quando aplicável.

O Mini ERP deve continuar apoiando essa lógica.

Não complicar o registro com campos desnecessários.

## 220. Funcionalidades já descartadas ou removidas

Funcionalidade removida por decisão de projeto:

1. Botão “Copiar resumo” em Pré vendas.

Essa remoção deve ser respeitada.

Não reintroduzir sem nova análise.

Também deve haver cautela com qualquer recurso que gere excesso de botões ou poluição no mobile.

## 221. Critério para aprovar nova funcionalidade

Uma nova funcionalidade só deve ser aprovada quando responder claramente:

1. Qual problema real resolve?
2. Em qual módulo entra?
3. É para desktop, mobile ou ambos?
4. Afeta dados?
5. Afeta Supabase?
6. Afeta Service Worker?
7. Afeta cache?
8. Afeta versionamento?
9. Afeta módulos estáveis?
10. Qual o teste?
11. Qual o risco?
12. Qual o rollback?

Sem essas respostas, a funcionalidade deve ficar em discussão, não em implementação.

## 222. Critério para recusar ou adiar funcionalidade

Uma funcionalidade deve ser recusada ou adiada quando:

1. Não resolve problema operacional claro.
2. Complica o uso em campo.
3. Aumenta risco de downgrade.
4. Exige mexer em Service Worker sem necessidade.
5. Exige mexer em cache sem necessidade.
6. Afeta desktop indevidamente.
7. Mistura várias mudanças.
8. Não tem teste claro.
9. Não tem rollback claro.
10. Pode ser feita depois sem prejuízo.

## 223. Ordem recomendada das próximas ações

A ordem segura é:

1. Concluir este manual.
2. Salvar o manual na pasta oficial.
3. Criar backup limpo antes do PWA.
4. Pedir auditoria PWA ao Codex.
5. Confirmar arquivos de PWA existentes ou ausentes.
6. Confirmar Service Worker e cache.
7. Planejar implementação mínima.
8. Autorizar primeira etapa PWA, se estiver seguro.
9. Rodar build.
10. Testar local.
11. Publicar somente com autorização.
12. Validar produção.
13. Testar desktop.
14. Testar mobile.
15. Testar iPhone.
16. Testar app instalado.
17. Criar backup pós validação.

## 224. O que não fazer agora

Neste momento, não fazer:

1. Código.
2. Deploy.
3. Novo projeto chamado Aplicativo.
4. Segunda base de código.
5. Novo Supabase.
6. Novo banco.
7. Nova arquitetura.
8. Alteração de Service Worker.
9. Alteração de cache.
10. Alteração de versionamento.
11. Refatoração.
12. PWA sem auditoria.

O momento atual é de documentação e preparação.

## 225. Conclusão operacional da Parte 5

O Mini ERP já possui uma base estável e funcional.

Os principais módulos estão consolidados.

Pré vendas recebeu refinamentos importantes e deve ser protegida.

Vendas, Delivery, Cobranças, Financeiro, Relatórios, Clientes, Produtos, Supabase e atualização automática estão na base estável.

A próxima frente aprovada é transformar o Mini ERP em PWA instalável, mantendo o desktop exatamente como está.

Essa frente deve começar por auditoria e backup, não por código.

A próxima parte do manual deve registrar riscos conhecidos, pontos intocáveis, sintomas de erro e critérios de decisão.
# MANUAL OFICIAL MINI ERP PWA

## Parte 6: Riscos conhecidos, pontos intocáveis, sintomas de erro e critérios de decisão

## 226. Objetivo desta parte

Esta parte registra os riscos conhecidos do Mini ERP, os pontos que não podem ser alterados sem autorização, os sintomas que indicam problema e os critérios para decidir entre investigar, corrigir, publicar, adiar ou fazer rollback.

O Mini ERP está em produção.

Ele é usado diariamente em campo.

Por isso, qualquer decisão técnica deve proteger a estabilidade antes de buscar melhoria.

## 227. Regra central de risco

No Mini ERP, o maior risco não é deixar de implementar uma melhoria.

O maior risco é quebrar uma operação que já funciona.

A prioridade correta é:

1. Preservar a versão estável.
2. Preservar os dados.
3. Preservar o desktop.
4. Preservar o mobile.
5. Preservar Supabase.
6. Preservar atualização automática.
7. Evitar downgrade.
8. Evitar regressões.
9. Implementar melhorias somente com controle.

## 228. Risco principal do projeto

O risco principal do Mini ERP é repetir o incidente de downgrade.

O downgrade foi grave porque uma versão antiga voltou a aparecer em determinados ambientes, mesmo após publicação e validação de versão nova.

Esse histórico obriga cautela especial com:

1. Service Worker.
2. Cache.
3. Versionamento.
4. Atualização automática.
5. Deploy.
6. Vercel.
7. Arquivos públicos.
8. App instalado.
9. PWA.
10. Navegadores mobile.

## 229. Riscos estruturais conhecidos

Riscos estruturais do projeto:

1. Publicar a partir da pasta errada.
2. Misturar Mini ERP com Catálogo.
3. Usar ZIP antigo como base.
4. Publicar projeto Vercel errado.
5. Deixar version.json diferente da versão interna.
6. Alterar Service Worker sem auditoria.
7. Alterar cache sem auditoria.
8. Alterar Supabase sem autorização.
9. Alterar banco sem autorização.
10. Fazer refatoração ampla sem necessidade.
11. Criar segunda base de código.
12. Criar novo projeto chamado Aplicativo.
13. Transformar PWA em sistema separado.
14. Quebrar desktop ao tentar melhorar mobile.
15. Quebrar mobile ao ajustar desktop.

## 230. Riscos operacionais conhecidos

Riscos operacionais:

1. Perder pré vendas.
2. Registrar venda em fluxo errado.
3. Apagar cobrança por engano.
4. Duplicar registro.
5. Salvar cliente incorreto.
6. Cortar referência do cliente.
7. Registrar forma de pagamento errada.
8. Gerar valor total incorreto.
9. Perder controle de pagamento em aberto.
10. Confundir venda com delivery.
11. Confundir pré venda com venda efetivada.
12. Falhar em campo por causa de mobile ruim.
13. Ficar sem acesso durante entrega.
14. Trabalhar em versão antiga sem perceber.
15. Fazer deploy no meio da operação sem necessidade.

## 231. Riscos de dados

Os dados do Mini ERP são parte central da operação.

Riscos de dados:

1. Perda de registros.
2. Duplicidade.
3. Inconsistência entre tela e Supabase.
4. Salvamento parcial.
5. Falha de sincronização.
6. Alteração de estrutura de banco sem migração.
7. Exclusão acidental.
8. Conversão incorreta de pré venda.
9. Baixa incorreta de cobrança.
10. Forma de pagamento incorreta.
11. Referência incorreta.
12. Cliente avulso perdido.
13. Histórico incompleto.

Qualquer alteração que toque dados precisa ser tratada como sensível.

## 232. Riscos de Supabase

Supabase é área protegida.

Riscos relacionados:

1. Alterar tabela sem autorização.
2. Alterar coluna sem revisar código.
3. Alterar política de acesso sem teste.
4. Alterar consulta usada por módulo estável.
5. Quebrar sincronização.
6. Quebrar carregamento de clientes.
7. Quebrar carregamento de pré vendas.
8. Quebrar carregamento de cobranças.
9. Quebrar carregamento de delivery.
10. Criar conflito entre dados locais e remotos.
11. Tratar erro de rede como erro de banco.
12. Fazer mudança sem backup.

Nenhuma mudança em Supabase deve ocorrer durante refinamento comum.

## 233. Riscos de Service Worker

Service Worker é uma das áreas mais sensíveis do Mini ERP.

Riscos:

1. Manter versão antiga em cache.
2. Controlar a página com lógica antiga.
3. Servir HTML antigo.
4. Servir JavaScript antigo.
5. Servir CSS antigo.
6. Impedir atualização automática.
7. Criar loop de atualização.
8. Interferir no app instalado.
9. Diferença entre navegador e PWA.
10. Diferença entre desktop e mobile.
11. Diferença entre Wi Fi e 4G.
12. Dificultar rollback.
13. Registrar arquivo errado.
14. Manter dois Service Workers sem clareza.
15. Apagar Service Worker necessário sem prova.

Service Worker nunca deve ser alterado sem auditoria completa.

## 234. Riscos de cache

Cache pode melhorar velocidade, mas pode quebrar confiança.

Riscos:

1. Cachear index.html indevidamente.
2. Cachear version.json indevidamente.
3. Cachear assets críticos sem renovação.
4. Manter tela antiga após deploy.
5. Manter módulo antigo.
6. Esconder atualização.
7. Fazer o usuário acreditar que está na versão nova quando não está.
8. Afetar apenas alguns dispositivos.
9. Afetar apenas iPhone.
10. Afetar apenas app instalado.
11. Afetar apenas campo.
12. Dificultar diagnóstico.

Cache deve ser tratado como área protegida.

## 235. Riscos de versionamento

Versionamento precisa ser coerente.

Riscos:

1. public/version.json com versão diferente da versão interna.
2. App.jsx com versão antiga.
3. main.jsx com referência antiga.
4. dist/version.json divergente, quando existir.
5. Maior versão aceita incorreta.
6. Diagnóstico mostrando versão errada.
7. Atualização automática comparando versões incorretas.
8. Deploy novo com versão antiga.
9. Rollback com versão mal identificada.
10. Backup sem versão clara.

Não alterar versão sem autorização e sem objetivo claro.

## 236. Riscos de deploy

Deploy é ação sensível.

Riscos:

1. Publicar pasta errada.
2. Publicar Catálogo no lugar do Mini ERP.
3. Publicar Mini ERP no projeto errado.
4. Publicar sem build.
5. Publicar sem teste local.
6. Publicar sem autorização.
7. Publicar com Service Worker alterado sem saber.
8. Publicar com version.json errado.
9. Publicar sem conferir domínio oficial.
10. Publicar sem conferir alias da Vercel.
11. Publicar sem conferir produção.
12. Publicar sem backup.
13. Publicar em horário ruim para a operação.
14. Publicar várias mudanças juntas.

Deploy só deve acontecer com ritual completo.

## 237. Riscos de rollback

Rollback também tem risco.

Riscos:

1. Voltar para backup errado.
2. Misturar arquivos de versões diferentes.
3. Voltar código, mas manter Service Worker novo.
4. Voltar código, mas manter cache antigo.
5. Perder refinamento válido.
6. Reintroduzir bug antigo.
7. Publicar rollback sem testar.
8. Não conferir version.json após rollback.
9. Não documentar motivo.
10. Não confirmar Supabase.

Rollback deve usar versão estável conhecida.

## 238. Riscos da frente PWA

A frente PWA tem risco especial porque envolve instalação e cache.

Riscos:

1. App instalado carregar versão antiga.
2. App instalado não atualizar.
3. App instalado abrir tela branca.
4. App instalado não mostrar diagnóstico.
5. App instalado se comportar diferente do navegador.
6. Service Worker prender versão antiga.
7. Cache prender HTML antigo.
8. Manifest mal configurado.
9. Ícone errado ou ausente.
10. start_url errado.
11. scope errado.
12. Desktop ser alterado sem necessidade.
13. Mobile navegador quebrar.
14. Criar segunda base de código.
15. Criar outro projeto por engano.
16. Confundir PWA com app nativo.
17. Misturar PWA com operação offline complexa cedo demais.

A primeira etapa PWA deve ser mínima e segura.

## 239. Riscos de desktop

Desktop deve permanecer exatamente como está na frente PWA.

Riscos:

1. Alterar layout desktop por causa do mobile.
2. Remover informação administrativa.
3. Simplificar demais relatórios.
4. Quebrar navegação principal.
5. Alterar largura de telas.
6. Alterar estilos globais sem teste.
7. Afetar tabelas.
8. Afetar modais.
9. Afetar financeiro.
10. Afetar relatórios.

Desktop é área de conferência e administração.

Não deve ser sacrificado pela experiência mobile.

## 240. Riscos de mobile

Mobile é área de operação em campo.

Riscos:

1. Botões pequenos.
2. Modal cortado.
3. Tela dando zoom indevido.
4. Teclado atrapalhando.
5. Rolagem travada.
6. Barra inferior errada.
7. Botão principal escondido.
8. Card grande demais.
9. Texto pequeno demais.
10. Campo difícil de tocar.
11. Uso ruim no iPhone.
12. Uso ruim em 4G.
13. Perda de fluidez.
14. App instalado com comportamento diferente do navegador.

Toda mudança visual precisa ser testada no mobile.

## 241. Riscos em Pré vendas

Pré vendas é módulo crítico.

Riscos:

1. Perder registro.
2. Excluir sem confirmação.
3. Quebrar paginação.
4. Quebrar filtro por data.
5. Quebrar resumo por data.
6. Quebrar conferência consolidada.
7. Esconder referência.
8. Esconder horário.
9. Esconder quantidade.
10. Esconder forma de pagamento.
11. Calcular total errado.
12. Quebrar modal.
13. Trazer de volta botão removido sem decisão.
14. Quebrar mobile.
15. Quebrar conversão para venda.
16. Quebrar futura conversão para delivery.

Pré vendas deve ser testado em qualquer alteração relevante.

## 242. Riscos em Vendas

Riscos:

1. Cliente avulso deixar de funcionar.
2. Cliente cadastrado não carregar.
3. Item não ser salvo.
4. Quantidade errada.
5. Valor errado.
6. Forma de pagamento errada.
7. Venda em aberto salva como paga.
8. Venda paga salva como aberta.
9. Conferência antes de salvar removida.
10. Retorno para Pré vendas quebrado.
11. Integração com financeiro quebrada.
12. Integração com pagamentos quebrada.

Vendas deve ser tratado como módulo central.

## 243. Riscos em Cobranças

Riscos:

1. Pendências sumirem.
2. Pendências duplicarem.
3. Cliente com múltiplas pendências calcular errado.
4. Valor em aberto incorreto.
5. Mensagem para WhatsApp errada.
6. Baixa de pagamento incorreta.
7. Cobrança desaparecer sem pagamento.
8. Resumo incorreto.
9. Integração financeira quebrada.
10. Erro no mobile durante cobrança em campo.

Cobranças impacta diretamente recebimento.

## 244. Riscos em Delivery

Riscos:

1. Entrega não aparecer.
2. Nova Entrega não abrir.
3. Modal quebrar.
4. Cliente não carregar.
5. Referência sumir.
6. Itens sumirem.
7. Status errado.
8. Entrega finalizada por engano.
9. Integração com pré venda quebrada.
10. Uso em campo prejudicado.

Delivery deve ser testado no mobile.

## 245. Riscos em Financeiro

Riscos:

1. Taxa incorreta.
2. Total incorreto.
3. Despesa não computada.
4. Fornecedor incorreto.
5. Margem errada.
6. Pagamento duplicado.
7. Pagamento em aberto não aparecer.
8. Relatório divergente.
9. Venda não refletir no financeiro.
10. Baixa de cobrança não refletir.

Financeiro não deve ser alterado sem conferência de cálculo.

## 246. Riscos em Relatórios

Riscos:

1. Período errado.
2. Total errado.
3. Dado ausente.
4. Filtro errado.
5. Relatório carregando lento.
6. Relatório quebrado no desktop.
7. Relatório inútil no mobile.
8. Divergência com Financeiro.
9. Divergência com Vendas.
10. Divergência com Cobranças.

Relatórios devem ser preservados no desktop.

## 247. Pontos intocáveis sem autorização explícita

Não alterar sem autorização explícita:

1. Service Worker.
2. Cache.
3. Versionamento.
4. Atualização automática.
5. Supabase.
6. Estrutura do banco.
7. Sincronização.
8. Deploy.
9. vercel.json.
10. Arquitetura geral.
11. Projeto Vercel.
12. Domínio oficial.
13. Pasta oficial.
14. Fluxo de rollback.
15. Dados persistidos.
16. Módulos não relacionados ao pedido.
17. Desktop durante frente PWA.
18. Lógica de diagnóstico.
19. Publicação em produção.
20. Backups históricos.

## 248. Pontos que exigem auditoria antes de qualquer mudança

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
12. Ícones PWA, se existirem.
13. Código de atualização automática.
14. Código de diagnóstico.
15. Código de sincronização.

## 249. Sinais de alerta imediato

Sinais de alerta:

1. Tela branca.
2. Pré vendas sumiram.
3. Diagnóstico sumiu.
4. Versão do aplicativo diferente da versão publicada.
5. Status da versão não está OK.
6. Service Worker controlando com versão errada.
7. Dados não carregam.
8. Supabase mostra erro.
9. Mobile abre diferente do desktop sem motivo.
10. iPhone abre versão antiga.
11. Campo dá zoom indevido.
12. Botão principal desaparece.
13. Cobranças somem.
14. Delivery some.
15. Venda não salva.
16. Atualização fica em loop.
17. App instalado não atualiza.
18. version.json online mostra versão inesperada.
19. Domínio oficial aponta para deploy errado.
20. Build passa, mas produção quebra.

## 250. Sintoma: tela branca

Tela branca é incidente crítico.

Possíveis causas:

1. Erro de JavaScript.
2. Build com problema.
3. Asset não carregado.
4. Cache antigo.
5. Service Worker servindo arquivo errado.
6. Caminho incorreto.
7. Deploy incompleto.
8. Configuração incorreta na Vercel.
9. Erro em importação.
10. Mudança global quebrada.

Ação correta:

1. Não fazer nova mudança no impulso.
2. Conferir console.
3. Conferir version.json.
4. Conferir build.
5. Conferir Service Worker.
6. Conferir domínio oficial.
7. Avaliar rollback se o sistema estiver inutilizável.

## 251. Sintoma: versão antiga aparece

Possíveis causas:

1. Downgrade real.
2. Cache local.
3. Cache intermediário.
4. Service Worker antigo.
5. Deploy errado.
6. Alias errado.
7. version.json divergente.
8. Pasta errada publicada.
9. Projeto Vercel errado.
10. App instalado preso em versão antiga.

Ação correta:

1. Abrir Diagnóstico.
2. Conferir versão do aplicativo.
3. Conferir versão publicada.
4. Conferir maior versão aceita.
5. Conferir status da versão.
6. Conferir version.json online.
7. Conferir Service Worker.
8. Conferir domínio.
9. Conferir desktop.
10. Conferir mobile.
11. Conferir iPhone.
12. Não mexer em módulos funcionais até entender.

## 252. Sintoma: Pré vendas somem

Possíveis causas:

1. Versão antiga carregada.
2. Erro no módulo.
3. Erro em Supabase.
4. Erro de filtro.
5. Erro de data.
6. Erro de paginação.
7. Erro visual.
8. Problema de permissão.
9. Dados não carregados.
10. Cache antigo.

Ação correta:

1. Suspeitar primeiro de downgrade se o Diagnóstico também sumiu.
2. Conferir versão.
3. Conferir Supabase.
4. Conferir filtro por data.
5. Conferir paginação.
6. Conferir console.
7. Não refazer módulo.
8. Corrigir somente após localizar causa.

## 253. Sintoma: Diagnóstico some

Se o Diagnóstico do Sistema desaparece, há forte suspeita de versão antiga ou quebra séria.

Ação correta:

1. Conferir version.json online.
2. Conferir domínio.
3. Conferir se Pré vendas também sumiu.
4. Conferir navegador.
5. Conferir Service Worker.
6. Conferir cache.
7. Conferir deploy.
8. Não iniciar refinamento.
9. Tratar como incidente de versão.

## 254. Sintoma: Supabase não carrega

Possíveis causas:

1. Rede.
2. Erro de conexão.
3. Chave ou configuração.
4. Política de acesso.
5. Tabela alterada.
6. Consulta quebrada.
7. Erro de sincronização.
8. Versão antiga.
9. Falha temporária.
10. Dados inconsistentes.

Ação correta:

1. Conferir Diagnóstico.
2. Conferir erro de sincronização.
3. Conferir se a versão está correta.
4. Conferir se outros módulos carregam.
5. Conferir rede.
6. Não alterar banco sem autorização.
7. Não alterar Supabase sem auditoria.

## 255. Sintoma: mobile dá zoom indevido

Possíveis causas:

1. Input com fonte pequena.
2. Modal alterado.
3. Campo novo sem ajuste mobile.
4. CSS global alterado.
5. Comportamento específico do iPhone.
6. Foco automático em campo.
7. Tamanho de viewport inadequado.

Ação correta:

1. Localizar campo exato.
2. Testar no iPhone.
3. Corrigir somente CSS ou componente afetado.
4. Não alterar módulo inteiro.
5. Conferir desktop depois.

## 256. Sintoma: botão desaparece no mobile

Possíveis causas:

1. CSS responsivo.
2. Overflow.
3. Modal cortado.
4. Barra inferior sobrepondo conteúdo.
5. Condição de renderização.
6. Mudança em layout global.
7. Tela pequena não testada.

Ação correta:

1. Identificar módulo.
2. Localizar botão.
3. Conferir CSS mobile.
4. Testar rolagem.
5. Corrigir de forma localizada.
6. Conferir desktop.

## 257. Sintoma: venda não salva

Possíveis causas:

1. Erro em formulário.
2. Erro de validação.
3. Erro de Supabase.
4. Cliente não definido.
5. Item não definido.
6. Forma de pagamento inválida.
7. Valor inválido.
8. Falha de rede.
9. Mudança recente no módulo.
10. Versão antiga.

Ação correta:

1. Conferir dados preenchidos.
2. Conferir console.
3. Conferir Diagnóstico.
4. Conferir Supabase.
5. Testar venda simples.
6. Testar cliente avulso.
7. Testar cliente cadastrado.
8. Não alterar financeiro sem prova.

## 258. Sintoma: cobrança errada

Possíveis causas:

1. Pendência duplicada.
2. Valor incorreto.
3. Baixa incorreta.
4. Cliente errado.
5. Mensagem gerada errada.
6. Erro de filtro.
7. Erro em integração com pagamentos.
8. Erro em Supabase.
9. Mudança recente no módulo.

Ação correta:

1. Conferir cliente.
2. Conferir pendências.
3. Conferir valor original.
4. Conferir valor total.
5. Conferir baixa.
6. Conferir Supabase.
7. Não publicar correção sem teste em cliente com múltiplas pendências.

## 259. Sintoma: app instalado não atualiza

Possíveis causas:

1. Service Worker prendendo versão.
2. Cache segurando arquivos.
3. Manifest com start_url inadequado.
4. version.json cacheado.
5. App instalado usando escopo errado.
6. Navegador mantendo estado antigo.
7. Atualização automática incompatível.
8. Deploy não associado ao domínio oficial.

Ação correta:

1. Conferir Diagnóstico dentro do app instalado.
2. Conferir version.json online.
3. Conferir Service Worker.
4. Conferir cache.
5. Conferir domínio.
6. Conferir navegador normal.
7. Conferir desktop.
8. Não mexer em módulos funcionais.

## 260. Sintoma: desktop muda após PWA

Isso não deve acontecer.

Possíveis causas:

1. CSS global alterado.
2. Layout responsivo mal isolado.
3. Mudança em App.jsx sem proteção.
4. Alteração de navegação.
5. Alteração visual ampla.
6. Refatoração desnecessária.

Ação correta:

1. Comparar desktop antes e depois.
2. Identificar arquivo alterado.
3. Reverter alteração visual que afetou desktop.
4. Manter PWA no mínimo necessário.
5. Não aceitar PWA que prejudique desktop.

## 261. Critério para investigar antes de corrigir

Investigar antes de corrigir quando:

1. A causa não está clara.
2. O problema envolve versão.
3. O problema envolve Service Worker.
4. O problema envolve cache.
5. O problema envolve Supabase.
6. O problema envolve produção.
7. O problema aparece só em alguns dispositivos.
8. O problema aparece só em campo.
9. O problema pode ser downgrade.
10. O problema envolve perda de dados.

Nesses casos, agir rápido demais aumenta risco.

## 262. Critério para correção localizada

Correção localizada é adequada quando:

1. O problema está em um trecho claro.
2. O módulo afetado foi identificado.
3. A mudança não toca áreas protegidas.
4. A mudança não altera arquitetura.
5. A mudança não altera banco.
6. A mudança não altera Service Worker.
7. A mudança não altera cache.
8. A mudança tem teste simples.
9. O rollback é fácil.
10. O risco é baixo.

## 263. Critério para auditoria completa

Auditoria completa é obrigatória quando:

1. Há suspeita de downgrade.
2. Há tela branca.
3. Há problema em produção sem causa clara.
4. Há alteração em Service Worker.
5. Há alteração em cache.
6. Há alteração em versionamento.
7. Há alteração em Supabase.
8. Há alteração em banco.
9. Há início de frente PWA.
10. Há mudança de arquitetura.
11. Há sumiço de módulo.
12. Há divergência entre desktop e mobile.
13. Há divergência entre versão local e publicada.

## 264. Critério para adiar funcionalidade

Adiar quando:

1. A funcionalidade não é urgente.
2. A base ainda não foi auditada.
3. Há risco de regressão.
4. A mudança mexe em áreas protegidas.
5. O benefício não está claro.
6. O usuário está em operação de campo.
7. Não há backup.
8. Não há teste definido.
9. Não há rollback claro.
10. A mudança pode ser feita depois.

Adiar não é desistir.

Adiar é preservar estabilidade.

## 265. Critério para aprovar funcionalidade

Aprovar quando:

1. Resolve problema real.
2. Tem escopo pequeno.
3. Tem arquivo localizado.
4. Tem teste claro.
5. Não quebra desktop.
6. Não quebra mobile.
7. Não toca áreas protegidas, ou a alteração sensível foi autorizada.
8. Tem rollback.
9. Tem backup quando necessário.
10. O benefício compensa o risco.

## 266. Critério para publicar

Publicar somente quando:

1. Houve autorização explícita.
2. A pasta correta foi confirmada.
3. O projeto Vercel correto foi confirmado.
4. A versão foi conferida.
5. O build passou.
6. O teste local passou.
7. Os arquivos alterados foram listados.
8. Os riscos foram entendidos.
9. O rollback é possível.
10. A produção será conferida após deploy.

## 267. Critério para não publicar

Não publicar quando:

1. Build falhou.
2. Há dúvida sobre pasta.
3. Há dúvida sobre projeto Vercel.
4. Há divergência de versão.
5. Service Worker foi alterado sem auditoria.
6. Cache foi alterado sem auditoria.
7. Supabase foi alterado sem autorização.
8. Banco foi alterado sem autorização.
9. Desktop quebrou.
10. Mobile quebrou.
11. Teste local não foi feito.
12. Não há autorização.
13. Não há rollback.
14. O usuário ainda está inseguro com a mudança.

## 268. Critério para rollback

Considerar rollback quando:

1. Produção ficou inutilizável.
2. Tela branca em produção.
3. Pré vendas sumiram.
4. Cobranças quebraram.
5. Vendas quebraram.
6. Delivery quebrou.
7. Supabase parou de carregar por alteração recente.
8. Desktop foi afetado indevidamente.
9. Mobile ficou inutilizável.
10. App instalado prendeu versão antiga.
11. Service Worker causou problema grave.
12. Cache causou downgrade.
13. A correção localizada é mais arriscada do que voltar.

## 269. Critério para não fazer rollback ainda

Não fazer rollback imediatamente quando:

1. O problema pode ser cache local.
2. O problema ocorre em apenas um dispositivo.
3. version.json online está correto.
4. Diagnóstico mostra status OK.
5. O erro é pequeno e localizado.
6. Há correção simples.
7. Não foi coletado diagnóstico.
8. Não se sabe qual backup usar.
9. O rollback pode reintroduzir erro antigo.
10. O sistema continua operável.

Primeiro diagnosticar.

Depois decidir.

## 270. Critério para considerar uma versão estável

Uma versão só deve ser considerada estável quando:

1. Build passou.
2. Produção foi publicada corretamente.
3. version.json online está correto.
4. Desktop foi testado.
5. Mobile foi testado.
6. iPhone foi testado, quando aplicável.
7. Diagnóstico mostra status OK.
8. Supabase carrega.
9. Clientes carregam.
10. Pré vendas carregam.
11. Vendas carregam.
12. Delivery carrega.
13. Cobranças carregam.
14. Financeiro carrega.
15. Relatórios carregam.
16. Não há downgrade.
17. Não há regressão conhecida.
18. O usuário validou em uso real ou em campo, quando necessário.
19. Backup foi criado.
20. A documentação foi atualizada, quando necessário.

## 271. Critério para considerar o PWA estável

O PWA só será estável quando:

1. Desktop continuar igual.
2. Navegador mobile continuar funcionando.
3. App instalado abrir corretamente.
4. App instalado mostrar a versão correta.
5. App instalado mostrar Diagnóstico.
6. App instalado usar o mesmo domínio.
7. App instalado usar o mesmo Supabase.
8. App instalado não carregar versão antiga.
9. Atualização automática funcionar.
10. version.json não ficar preso em cache.
11. Service Worker estiver coerente.
12. Cache não prender HTML antigo.
13. Ícone aparecer corretamente.
14. Tela cheia funcionar.
15. Pré vendas funcionarem.
16. Vendas funcionarem.
17. Delivery funcionar.
18. Cobranças funcionarem.
19. Funcionamento em Wi Fi for validado.
20. Funcionamento em 4G for validado.

## 272. Pontos que não podem ser confundidos

Não confundir:

1. PWA com app nativo.
2. App instalado com projeto separado.
3. Ícone na tela inicial com nova arquitetura.
4. Build aprovado com produção validada.
5. Deploy concluído com versão carregada.
6. version.json correto com interface atualizada.
7. Cache comum com Service Worker.
8. Erro de Supabase com downgrade.
9. Problema visual com problema de banco.
10. Problema local com problema geral.

Essas distinções evitam decisões erradas.

## 273. Decisão sobre novo projeto chamado Aplicativo

Não criar novo projeto chamado Aplicativo.

A frente PWA deve acontecer dentro do Mini ERP atual.

Caminho oficial:

C:\Users\Delber\Mini-ERP\projeto

O PWA deve usar:

1. Mesmo projeto.
2. Mesmo código.
3. Mesmo domínio.
4. Mesmo Supabase.
5. Mesmo banco.
6. Mesmo deploy.
7. Mesma versão.
8. Mesma documentação.

O nome Aplicativo pode ser usado apenas como nome informal da frente de trabalho.

## 274. Decisão sobre segunda base de código

Não criar segunda base de código.

Riscos de segunda base:

1. Duplicar manutenção.
2. Divergir funcionalidades.
3. Quebrar Supabase.
4. Criar versões diferentes.
5. Aumentar risco de deploy errado.
6. Dificultar rollback.
7. Dificultar diagnóstico.
8. Confundir desktop e mobile.
9. Aumentar custo operacional.
10. Criar retrabalho permanente.

O PWA deve nascer da base atual.

## 275. Decisão sobre desktop

Desktop é intocável na frente PWA.

Qualquer alteração que afete desktop deve ser considerada risco.

Se for inevitável, precisa ser justificada antes.

A meta é:

Desktop igual.
Mobile mais fluido.
App instalável.
Mesma base.

## 276. Decisão sobre operação offline

Não misturar PWA básico com operação offline complexa.

PWA instalável é uma etapa.

Offline com sincronização é outra etapa.

Offline exige plano próprio para:

1. Dados locais.
2. Sincronização posterior.
3. Conflitos.
4. Duplicidade.
5. Diagnóstico.
6. Falha de rede.
7. Recuperação.
8. Rollback.
9. Teste em campo.
10. Proteção contra perda de dados.

A primeira implementação PWA deve evitar essa complexidade.

## 277. Decisão sobre recibos e comprovantes

Recibos bonitos e comprovantes podem ser uma frente futura.

Não devem entrar na primeira implementação PWA.

Primeiro, estabilizar:

1. Manifest.
2. Ícone.
3. Instalação.
4. Tela cheia.
5. Diagnóstico.
6. Atualização.
7. Ausência de downgrade.

Depois, abrir frente específica para recibos.

## 278. Decisão sobre notificações

Notificações não devem entrar no PWA inicial.

Push notification exige cuidado com permissões, Service Worker, UX e suporte em dispositivos.

Não implementar notificações antes do PWA básico estar estável.

## 279. Decisão sobre login novo

Não criar login novo na primeira etapa PWA.

Se o Mini ERP já tiver lógica de acesso na versão auditada, preservar.

Se não tiver, não adicionar como parte do PWA inicial.

Login novo é frente própria.

## 280. Decisão sobre mudança visual ampla

Não fazer redesign amplo na frente PWA inicial.

A primeira etapa deve ter foco técnico e operacional:

1. Instalar.
2. Abrir bem.
3. Atualizar corretamente.
4. Preservar desktop.
5. Preservar mobile.
6. Evitar downgrade.

A aparência pode ser refinada depois, em partes.

## 281. Decisão sobre arquivos antigos e ZIPs

ZIPs antigos não devem ficar misturados na pasta operacional.

Riscos:

1. Codex auditar arquivo errado.
2. Usuário se confundir.
3. Backup ficar pesado.
4. Versões antigas serem tratadas como atuais.
5. Arquivos mortos parecerem ativos.

A pasta oficial deve ficar limpa.

Backups devem ficar separados e nomeados.

## 282. Decisão sobre documentação

Documentação é parte da segurança do Mini ERP.

Arquivos oficiais:

1. LEIA PRIMEIRO MINI ERP.
2. MANUAL OFICIAL MINI ERP PWA.

O LEIA é guia curto.

O MANUAL é documento mestre.

O Codex deve ler os dois antes de qualquer análise.

## 283. Decisão sobre comandos do Codex

O Codex deve receber comandos claros.

Sempre indicar:

1. Pasta oficial.
2. Domínio oficial.
3. Versão estável.
4. Objetivo da etapa.
5. O que pode fazer.
6. O que não pode fazer.
7. Se pode alterar ou não.
8. Se pode publicar ou não.
9. Se deve apenas auditar.
10. Qual resultado deve entregar.

Comando vago aumenta risco.

## 284. Sintomas que exigem parar tudo

Parar qualquer implementação se ocorrer:

1. Tela branca.
2. Sumiço de Pré vendas.
3. Sumiço de Diagnóstico.
4. version.json divergente.
5. Service Worker inesperado.
6. Cache segurando versão antiga.
7. Supabase com erro geral.
8. Desktop quebrado.
9. Mobile inutilizável.
10. App instalado carregando versão antiga.
11. Build falhando.
12. Pasta errada detectada.
13. Projeto Vercel errado detectado.
14. Dados ausentes.
15. Usuário em dúvida sobre o que foi alterado.

Quando isso acontecer, voltar para diagnóstico.

## 285. Sintomas que permitem continuar com cautela

É possível continuar com cautela quando:

1. O erro é visual e localizado.
2. O módulo afetado foi identificado.
3. O build passa.
4. Desktop está preservado.
5. Mobile está preservado.
6. Supabase está normal.
7. Versionamento está coerente.
8. Service Worker não foi tocado.
9. Cache não foi tocado.
10. Há teste claro.

Mesmo assim, publicar só com autorização.

## 286. Decisão em caso de dúvida

Em caso de dúvida, não implementar.

A ordem correta é:

1. Parar.
2. Auditar.
3. Confirmar versão.
4. Confirmar arquivo.
5. Confirmar risco.
6. Definir teste.
7. Definir rollback.
8. Só depois alterar, se fizer sentido.

No Mini ERP, prudência vale mais que velocidade.

## 287. Matriz simples de decisão

Se o problema é visual e localizado, fazer refinamento localizado.

Se o problema envolve versão, fazer auditoria completa.

Se o problema envolve Service Worker, fazer auditoria completa.

Se o problema envolve cache, fazer auditoria completa.

Se o problema envolve Supabase, fazer auditoria completa.

Se o problema envolve banco, não alterar sem autorização.

Se o problema envolve desktop na frente PWA, parar e revisar.

Se o problema envolve app instalado carregando versão antiga, tratar como incidente de PWA e cache.

Se o problema ocorre só em campo, coletar diagnóstico antes de mexer.

Se o problema causa perda operacional, considerar rollback.

## 288. Prioridade dos riscos

Prioridade máxima:

1. Perda de dados.
2. Downgrade.
3. Tela branca.
4. Supabase quebrado.
5. Pré vendas indisponíveis.
6. Vendas indisponíveis.
7. Cobranças indisponíveis.
8. Delivery indisponível.
9. Desktop quebrado.
10. App instalado preso em versão antiga.

Prioridade média:

1. Erro visual localizado.
2. Modal com problema.
3. Botão desalinhado.
4. Texto confuso.
5. Filtro com comportamento ruim.
6. Paginação com ajuste necessário.

Prioridade baixa:

1. Ajuste estético sem impacto.
2. Nome de botão que não atrapalha uso.
3. Reorganização desejável, mas não urgente.
4. Melhoria que pode esperar.
5. Ideia nova sem necessidade operacional imediata.

## 289. Regra de proteção da versão 2026.06.24.03

A versão 2026.06.24.03 é a base estável de referência para a frente PWA.

Antes de qualquer implementação PWA, criar backup dessa versão.

Nome sugerido:

MINI ERP BACKUP ANTES PWA V2026.06.24.03.zip

Essa versão deve funcionar como ponto de retorno.

Não iniciar PWA sem esse backup.

## 290. Conclusão operacional da Parte 6

O Mini ERP deve evoluir com cautela.

Os principais riscos conhecidos estão ligados a downgrade, Service Worker, cache, versionamento, Supabase, deploy, dados e impacto indevido no desktop.

A frente PWA é possível e coerente, mas deve ser feita dentro do projeto atual, sem nova base e sem novo projeto.

O desktop deve permanecer exatamente como está.

A próxima parte do manual deve tratar da estratégia técnica oficial para transformar o Mini ERP em PWA instalável, com etapas mínimas, seguras e testáveis.
# MANUAL OFICIAL MINI ERP PWA

## Parte 7: Estratégia técnica oficial para transformar o Mini ERP em PWA instalável

## 291. Objetivo desta parte

Esta parte define a estratégia oficial para transformar o Mini ERP em um aplicativo PWA instalável.

A regra principal é:

Transformar o Mini ERP em PWA sem criar outro projeto, sem criar outra base de código, sem alterar o desktop e sem comprometer a versão estável.

A frente PWA deve ser feita em etapas pequenas, auditáveis e reversíveis.

## 292. Definição prática de PWA para este projeto

Para o Mini ERP, PWA significa:

1. O sistema continuar sendo o mesmo Mini ERP.
2. O sistema continuar abrindo pelo navegador.
3. O sistema poder ser instalado na tela inicial do celular.
4. O sistema abrir com aparência mais próxima de aplicativo.
5. O sistema usar o mesmo domínio.
6. O sistema usar o mesmo Supabase.
7. O sistema usar o mesmo banco.
8. O sistema usar o mesmo deploy.
9. O sistema preservar o desktop.
10. O sistema continuar protegido contra downgrade.

PWA não significa criar aplicativo nativo.

PWA não significa publicar em loja.

PWA não significa criar projeto novo.

PWA não significa reescrever o Mini ERP.

## 293. Decisão oficial sobre novo projeto

Não criar novo projeto chamado Aplicativo.

Não criar nova pasta operacional.

Não criar novo domínio.

Não criar novo Supabase.

Não criar novo banco.

Não criar novo projeto Vercel.

O caminho oficial continua sendo:

`C:\Users\Delber\Mini-ERP\projeto`

O projeto oficial continua sendo:

`mini-erp-canastra`

O domínio oficial continua sendo:

`https://mini-erp-canastra.vercel.app`

## 294. Decisão oficial sobre base de código

O PWA deve nascer da base atual do Mini ERP.

Não haverá duas versões:

1. Uma versão desktop.
2. Uma versão aplicativo.

A regra correta é:

Um único código.
Uma única base.
Um único deploy.
Um único Supabase.
Um único banco.
Uma única documentação oficial.

O desktop e o aplicativo instalado devem ser duas formas de acessar o mesmo sistema.

## 295. Decisão oficial sobre desktop

O desktop deve permanecer exatamente como está.

Na frente PWA, o desktop não deve ser redesenhado.

Não deve haver simplificação do desktop por causa do celular.

Não deve haver remoção de relatórios, financeiro, menus, tabelas ou módulos administrativos.

Se qualquer ajuste técnico afetar o desktop, a alteração deve ser parada e revisada.

## 296. Decisão oficial sobre mobile

O mobile é o foco prático da frente PWA.

O objetivo é melhorar o uso em campo, principalmente no celular.

A experiência esperada é:

1. Abrir pela tela inicial.
2. Reduzir distrações do navegador.
3. Dar sensação de app.
4. Manter a barra inferior mobile.
5. Manter Pré vendas acessível.
6. Manter Vendas acessível.
7. Manter Cobranças acessível.
8. Manter Delivery acessível.
9. Manter Diagnóstico acessível.
10. Evitar zoom indevido.
11. Evitar tela cortada.
12. Evitar modais ruins no iPhone.

## 297. Decisão oficial sobre operação offline

A primeira etapa PWA não deve implementar operação offline complexa.

PWA instalável é uma etapa.

Offline com sincronização é outra etapa.

A operação offline exige plano próprio porque envolve:

1. Dados locais.
2. Sincronização posterior.
3. Conflitos.
4. Duplicidade.
5. Falha de rede.
6. Recuperação de dados.
7. Diagnóstico.
8. Supabase.
9. Cache.
10. Service Worker.

Portanto, na primeira etapa, o objetivo é instalar e abrir bem, não criar offline completo.

## 298. Decisão oficial sobre Service Worker

Service Worker é área sensível.

Como o Mini ERP já sofreu incidente de downgrade, nenhuma mudança em Service Worker deve ser feita sem auditoria.

A estratégia para PWA deve ser:

1. Primeiro auditar o Service Worker atual.
2. Entender qual arquivo está registrado.
3. Entender qual arquivo controla a página.
4. Entender se há `public/sw.js`.
5. Entender se há `public/service-worker.js`.
6. Entender a estratégia de cache atual.
7. Entender se `version.json` pode ficar preso em cache.
8. Entender se `index.html` pode ficar preso em cache.
9. Só alterar se for realmente necessário.
10. Testar atualização depois de qualquer mudança.

## 299. Decisão oficial sobre cache

Cache não pode ser tratado como melhoria inocente.

No Mini ERP, cache errado pode causar downgrade.

A estratégia correta é:

1. Não cachear agressivamente o HTML principal.
2. Não prender `version.json` em cache.
3. Não esconder atualização nova.
4. Não manter assets críticos antigos sem controle.
5. Não criar cache novo sem nome e versão claros.
6. Não alterar cache junto com várias mudanças funcionais.
7. Testar cache em desktop.
8. Testar cache em mobile.
9. Testar cache em iPhone.
10. Testar cache no app instalado.

## 300. Decisão oficial sobre versionamento no PWA

O PWA deve continuar respeitando o versionamento oficial.

A versão do aplicativo deve bater com a versão publicada.

O Diagnóstico do Sistema deve continuar mostrando:

1. Versão do aplicativo.
2. Versão publicada.
3. Maior versão aceita.
4. Status da versão.
5. Service Worker disponível.
6. Service Worker controlando.
7. Online ou offline.
8. Ambiente.
9. Supabase.
10. Dados carregados.

O aplicativo instalado não pode esconder a versão real.

## 301. Decisão oficial sobre atualização automática no PWA

A atualização automática deve continuar funcionando.

A transformação em PWA não pode prender o usuário em versão antiga.

O app instalado deve conseguir perceber quando existe versão nova.

Antes de considerar o PWA estável, é obrigatório testar:

1. Abrir versão instalada.
2. Publicar nova versão autorizada no futuro.
3. Conferir se o app instalado percebe a atualização.
4. Conferir se o Diagnóstico muda corretamente.
5. Conferir se não há loop de atualização.
6. Conferir se não há downgrade.

## 302. Etapa zero: concluir documentação

Antes de qualquer implementação PWA, concluir este manual.

Arquivos oficiais obrigatórios dentro do projeto:

1. `LEIA-PRIMEIRO-MINI-ERP.md`
2. `MANUAL-OFICIAL-MINI-ERP-PWA.md`

O Codex deve ler os dois antes de qualquer auditoria.

Sem esses documentos no projeto, não iniciar a frente PWA.

## 303. Etapa um: criar backup antes do PWA

Antes de qualquer alteração, criar backup limpo da versão estável.

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
10. Documentos oficiais necessários

Não incluir:

1. `node_modules`
2. `.git`
3. `.vercel`
4. `.env.local`
5. `dist`, salvo justificativa
6. Backups antigos
7. ZIPs antigos
8. Arquivos temporários

## 304. Etapa dois: auditoria PWA sem alteração

Depois do backup, fazer auditoria PWA sem alterar arquivos.

A auditoria deve responder:

1. Existe manifest?
2. Onde está o manifest?
3. O manifest está linkado?
4. Existem ícones?
5. Quais tamanhos de ícone existem?
6. Existe `public/sw.js`?
7. Existe `public/service-worker.js`?
8. Qual Service Worker está registrado?
9. O Service Worker cacheia HTML?
10. O Service Worker cacheia `version.json`?
11. Existe regra de cache no `vercel.json`?
12. Existe atualização automática?
13. O Diagnóstico mostra Service Worker?
14. O desktop depende de alguma lógica que pode ser afetada?
15. O mobile já está separado por CSS responsivo?
16. Quais arquivos precisam ser tocados para PWA?
17. Quais riscos existem?
18. Qual é a menor implementação possível?

Nenhum código deve ser criado antes dessa auditoria.

## 305. Etapa três: definir nome do aplicativo

Antes de criar ou ajustar o manifest, decidir o nome do app.

Opções possíveis:

1. Mini ERP Canastra.
2. Mini ERP Queijos Canastra.
3. Queijos Serra da Canastra ERP.
4. Mini ERP.

Critério recomendado:

O nome deve ser curto, claro e fácil de reconhecer na tela inicial.

Sugestão preferencial:

Mini ERP Canastra

Motivo:

1. É curto.
2. Identifica o sistema.
3. Identifica o negócio.
4. Fica bem em tela de celular.
5. Evita nome longo demais.

## 306. Etapa quatro: definir nome curto

O nome curto aparece em espaços menores.

Opções possíveis:

1. ERP Canastra.
2. Mini ERP.
3. Canastra ERP.

Sugestão preferencial:

Mini ERP

Motivo:

1. É curto.
2. Cabe melhor abaixo do ícone.
3. Não polui a tela inicial.
4. É fácil de reconhecer.

## 307. Etapa cinco: definir ícone do PWA

O ícone precisa ser simples e legível.

Ele deve funcionar pequeno na tela inicial.

Opções possíveis:

1. Logo da Queijos Serra da Canastra.
2. Ícone simples de queijo.
3. Iniciais do sistema.
4. Marca simplificada do Mini ERP.

Critério recomendado:

1. Evitar muito texto.
2. Evitar detalhe pequeno.
3. Evitar imagem poluída.
4. Usar fundo limpo.
5. Manter identidade do negócio.
6. Testar em tamanho pequeno.
7. Gerar tamanhos necessários para PWA.
8. Preservar boa leitura em iPhone.

A escolha do ícone deve ser feita antes da implementação.

## 308. Etapa seis: definir cores do PWA

O PWA pode usar cor de tema e cor de fundo.

Essas cores influenciam aparência do app instalado e tela de abertura em alguns ambientes.

A decisão deve respeitar o visual atual do Mini ERP.

Não criar identidade visual nova sem necessidade.

Critério recomendado:

1. Usar cor já presente no Mini ERP.
2. Evitar cor chamativa demais.
3. Evitar alterar desktop.
4. Evitar mexer em CSS global sem necessidade.
5. Manter aparência profissional.
6. Validar no celular.

## 309. Etapa sete: revisar manifest

O manifest é o arquivo que informa ao navegador como o aplicativo deve se comportar quando instalado.

A auditoria deve verificar se ele existe.

Se não existir, a futura implementação pode criar um manifest mínimo.

Se existir, a futura implementação deve revisar sem substituir no impulso.

O manifest deve considerar:

1. Nome do aplicativo.
2. Nome curto.
3. Ícones.
4. URL inicial.
5. Escopo.
6. Modo de exibição.
7. Cor de tema.
8. Cor de fundo.
9. Orientação, se necessário.
10. Descrição, se aplicável.

## 310. Regra para start_url

O `start_url` deve abrir o Mini ERP no mesmo domínio oficial.

Ele não deve apontar para outro projeto.

Ele não deve apontar para rota temporária.

Ele não deve apontar para ambiente antigo.

Ele deve respeitar a política de versionamento e atualização.

A decisão sobre parâmetro de versão no `start_url` deve ser tomada com cuidado, porque o histórico do projeto já envolveu URL com versão e cache.

## 311. Regra para scope

O escopo define qual parte do site pertence ao aplicativo instalado.

O escopo deve ser compatível com o domínio oficial do Mini ERP.

Não deve incluir outro projeto.

Não deve misturar Catálogo.

Não deve abrir caminho para rotas fora do Mini ERP.

A auditoria deve confirmar o escopo antes da implementação.

## 312. Regra para display

O modo de exibição desejado é o comportamento mais próximo de app.

Opções comuns incluem navegador, tela independente ou tela cheia, conforme suporte do ambiente.

Para o Mini ERP, a direção preferida é abrir sem a interface normal do navegador, preservando a navegação interna do sistema.

A escolha deve ser testada no iPhone e no Chrome mobile.

Se tela cheia causar problema de usabilidade, usar comportamento mais seguro.

## 313. Regra para orientação de tela

Não travar orientação sem necessidade.

O Mini ERP deve funcionar bem em retrato no celular.

O desktop deve continuar livre.

Se a orientação for definida no manifest, ela deve favorecer o uso mobile em campo, mas sem prejudicar tablets ou desktop.

A recomendação inicial é evitar decisão agressiva sem teste.

## 314. Etapa oito: revisar HTML de entrada

O PWA precisa que o manifest seja referenciado pelo HTML principal.

No projeto Vite, isso geralmente envolve o arquivo de entrada HTML do projeto.

Antes de alterar, o Codex deve:

1. Localizar o HTML real.
2. Mostrar o trecho atual.
3. Confirmar se já existe link para manifest.
4. Confirmar se já existem meta tags relacionadas a PWA.
5. Confirmar se há referências antigas.
6. Propor a menor alteração possível.
7. Explicar risco.
8. Testar build.

Não alterar HTML sem mostrar o antes.

## 315. Etapa nove: revisar ícones no public

Os ícones do PWA devem ficar em local adequado, geralmente na pasta pública.

Antes de criar ícones novos, auditar:

1. Quais imagens já existem.
2. Se existe logo.
3. Se existem ícones antigos.
4. Se existem arquivos duplicados.
5. Se algum ícone pertence ao Catálogo por engano.
6. Se há tamanho adequado.
7. Se o nome dos arquivos é claro.
8. Se os ícones são referenciados pelo manifest.

Não misturar imagens do Catálogo sem decisão.

## 316. Etapa dez: revisar Service Worker existente

A auditoria precisa decidir se a implementação PWA exige mudança no Service Worker.

Cenários possíveis:

1. O Service Worker atual já é suficiente.
2. O Service Worker atual precisa apenas ser preservado.
3. O Service Worker atual precisa de pequeno ajuste.
4. O Service Worker atual tem risco e precisa de plano próprio.
5. Há dois arquivos e é necessário entender qual está ativo.
6. A melhor primeira etapa é não mexer no Service Worker.

Por causa do histórico de downgrade, a opção preferida é não mexer no Service Worker na primeira etapa, se o PWA puder ser instalado com segurança sem isso.

## 317. Etapa onze: revisar política de cache

Antes de alterar cache, responder:

1. O que está sendo cacheado hoje?
2. O HTML principal é cacheado?
3. `version.json` é cacheado?
4. Arquivos JS são cacheados?
5. Arquivos CSS são cacheados?
6. Existe nome de cache por versão?
7. Existe limpeza de cache antigo?
8. Existe risco de downgrade?
9. O app instalado atualizaria corretamente?
10. O rollback continuaria possível?

Sem essas respostas, não alterar cache.

## 318. Etapa doze: revisar vercel.json

O `vercel.json` pode conter regras que afetam cache e publicação.

Antes de implementar PWA, verificar:

1. Headers.
2. Cache de `version.json`.
3. Cache de HTML.
4. Cache de Service Worker.
5. Rotas.
6. Redirecionamentos.
7. Configuração de build.
8. Configuração de arquivos públicos.

Não alterar `vercel.json` sem necessidade.

Se precisar alterar, tratar como mudança sensível.

## 319. Etapa treze: preservar Diagnóstico do Sistema

O Diagnóstico do Sistema deve ser mantido e valorizado na frente PWA.

Ele deve funcionar em:

1. Desktop.
2. Mobile navegador.
3. App instalado.

Ele deve continuar mostrando:

1. Versão do aplicativo.
2. Versão publicada.
3. Maior versão aceita.
4. Status da versão.
5. Service Worker disponível.
6. Service Worker controlando.
7. Ambiente.
8. URL.
9. Navegador.
10. Sistema.
11. Supabase.
12. Dados carregados.

Sem Diagnóstico funcionando no app instalado, o PWA não deve ser considerado estável.

## 320. Etapa quatorze: implementação mínima

A primeira implementação PWA deve ser a menor possível.

Objetivo da primeira implementação:

1. Manifest correto.
2. Ícones corretos.
3. Link correto para manifest.
4. Configuração mínima de aparência.
5. Preservação do Service Worker, se possível.
6. Preservação do cache, se possível.
7. Desktop intacto.
8. Mobile intacto.
9. Build aprovado.
10. Teste local aprovado.

Não incluir melhorias extras.

## 321. O que pode ser tocado na primeira implementação

Somente se a auditoria confirmar necessidade, podem ser tocados:

1. Arquivo de manifest.
2. HTML de entrada para linkar manifest.
3. Ícones dentro de `public`.
4. Metadados visuais mínimos.
5. Documentação.
6. Eventual ajuste mínimo relacionado à instalação.

Service Worker só deve ser tocado se a auditoria provar que é necessário.

Cache só deve ser tocado se a auditoria provar que é necessário.

## 322. O que não pode ser tocado na primeira implementação

Não tocar na primeira implementação PWA:

1. Pré vendas.
2. Vendas.
3. Delivery.
4. Cobranças.
5. Financeiro.
6. Relatórios.
7. Clientes.
8. Produtos.
9. Supabase.
10. Banco.
11. Lógica de vendas.
12. Lógica de pagamentos.
13. Lógica de cobranças.
14. Lógica de delivery.
15. Layout desktop.
16. Arquitetura geral.
17. Operação offline complexa.
18. Notificações.
19. Recibos.
20. Login novo.

## 323. Etapa quinze: build local

Após implementação mínima, rodar build.

Comando oficial:

`npm run build`

Alternativa se necessário:

`npm.cmd run build`

Se o build falhar, não publicar.

Se o build passar, ainda não significa que o PWA está validado.

É necessário testar localmente e depois validar produção com autorização.

## 324. Etapa dezesseis: teste local

Teste local mínimo:

1. Sistema abre.
2. Desktop abre igual.
3. Mobile simulado não quebra.
4. Pré vendas aparecem.
5. Vendas aparecem.
6. Delivery aparece.
7. Cobranças aparecem.
8. Diagnóstico abre.
9. Supabase não apresenta erro.
10. Não há tela branca.
11. Manifest não gera erro visível.
12. Ícones não quebram build.

## 325. Etapa dezessete: teste em produção

Depois de deploy autorizado, testar em produção:

1. Domínio oficial abre.
2. `version.json` online está correto.
3. Diagnóstico mostra versão correta.
4. Status da versão está OK.
5. Desktop está igual.
6. Mobile navegador está funcional.
7. Pré vendas carregam.
8. Vendas carregam.
9. Delivery carrega.
10. Cobranças carregam.
11. Supabase carrega.
12. Não há downgrade.
13. Manifest é reconhecido.
14. Instalação é possível, quando o navegador oferecer.
15. App instalado abre corretamente.

## 326. Etapa dezoito: teste no iPhone

No iPhone, testar:

1. Abrir pelo navegador.
2. Conferir Diagnóstico.
3. Adicionar à tela inicial, se disponível.
4. Abrir pelo ícone.
5. Verificar se parece app.
6. Verificar se usa a versão correta.
7. Verificar se Pré vendas abre.
8. Verificar se Vendas abre.
9. Verificar se Cobranças abre.
10. Verificar se Delivery abre.
11. Verificar se modais funcionam.
12. Verificar se não há zoom indevido.
13. Verificar se não há tela cortada.
14. Verificar se funciona em Wi Fi.
15. Verificar se funciona em 4G.

## 327. Etapa dezenove: teste no Chrome mobile

No Chrome mobile, testar:

1. Abrir o domínio oficial.
2. Conferir Diagnóstico.
3. Verificar possibilidade de instalação.
4. Instalar, se disponível.
5. Abrir pelo ícone.
6. Conferir versão.
7. Conferir Supabase.
8. Conferir Pré vendas.
9. Conferir Vendas.
10. Conferir Cobranças.
11. Conferir Delivery.
12. Conferir atualização.
13. Conferir ausência de downgrade.

## 328. Etapa vinte: teste em campo

O teste em campo é necessário antes de considerar o PWA estável.

Testar em situação real:

1. Abrir fora de casa.
2. Abrir em 4G.
3. Abrir pelo ícone instalado.
4. Abrir pelo navegador.
5. Conferir Diagnóstico.
6. Conferir versão.
7. Registrar ou consultar Pré vendas.
8. Consultar Cobranças.
9. Consultar Delivery.
10. Fazer uso real com cautela.
11. Observar se há retorno de versão antiga.
12. Observar se há erro de sincronização.

## 329. Etapa vinte e um: teste de atualização futura

Depois que o PWA estiver instalado, a atualização precisa ser testada em uma versão futura autorizada.

O teste deve confirmar:

1. App instalado não fica preso na versão anterior.
2. `version.json` mostra versão nova.
3. Diagnóstico percebe versão nova.
4. Atualização automática funciona.
5. Não há loop.
6. Não há tela branca.
7. Não há downgrade.
8. Dados continuam carregando.

Esse teste é essencial por causa do histórico do Mini ERP.

## 330. Etapa vinte e dois: backup pós PWA aprovado

Depois que o PWA estiver validado em desktop, mobile, iPhone e campo, criar backup.

Nome sugerido:

`MINI-ERP-BACKUP-PWA-ESTAVEL-V[VERSAO].zip`

Esse backup só deve ser criado quando a versão for realmente aprovada.

Não chamar de estável apenas porque instalou.

Estável significa testado e aprovado.

## 331. Critério de sucesso da primeira etapa PWA

A primeira etapa PWA será considerada bem sucedida quando:

1. Desktop permanecer igual.
2. Mobile navegador continuar funcionando.
3. App puder ser instalado.
4. Ícone aparecer corretamente.
5. App abrir pelo ícone.
6. App abrir com aparência de aplicativo.
7. Diagnóstico funcionar no app instalado.
8. Versão do app estiver correta.
9. Versão publicada estiver correta.
10. Status da versão estiver OK.
11. Pré vendas carregarem.
12. Vendas carregarem.
13. Delivery carregar.
14. Cobranças carregarem.
15. Supabase carregar.
16. Não houver tela branca.
17. Não houver downgrade.
18. Não houver regressão conhecida.
19. Rollback continuar possível.
20. Backup pós validação for criado.

## 332. Critério de falha da primeira etapa PWA

A primeira etapa PWA falha se:

1. Desktop mudar indevidamente.
2. Mobile navegador quebrar.
3. App instalado abrir versão antiga.
4. Diagnóstico sumir.
5. Pré vendas sumirem.
6. Cobranças sumirem.
7. Delivery sumir.
8. Vendas quebrarem.
9. Supabase não carregar.
10. Tela branca aparecer.
11. Atualização entrar em loop.
12. Cache prender versão antiga.
13. Service Worker causar comportamento inesperado.
14. Rollback ficar confuso.
15. O usuário não conseguir usar em campo.

Se falhar, parar e diagnosticar.

## 333. Plano de rollback do PWA

Antes de implementar, definir o rollback.

Rollback deve voltar para:

`MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip`

O rollback deve conferir:

1. Versão restaurada.
2. Build.
3. Produção.
4. `version.json`.
5. Diagnóstico.
6. Desktop.
7. Mobile.
8. iPhone.
9. Supabase.
10. Service Worker.
11. Cache.
12. App instalado, se ainda existir no aparelho.

Rollback PWA pode exigir atenção ao app instalado, porque ele pode manter estado ou cache anterior.

## 334. Como tratar o app instalado após rollback

Se o PWA já foi instalado e houver rollback, conferir:

1. O app instalado abre a versão restaurada?
2. O Diagnóstico mostra versão correta?
3. O app continua preso na versão problemática?
4. O navegador abre corretamente?
5. O `version.json` está correto?
6. O Service Worker está coerente?
7. O cache está coerente?

Se o app instalado continuar preso, o problema deve ser tratado como cache ou Service Worker, não como erro de módulo.

## 335. Estratégia de menor risco

A estratégia de menor risco é:

1. Não mudar módulos funcionais.
2. Não mexer em Supabase.
3. Não mexer em banco.
4. Não mexer em desktop.
5. Não mexer em Service Worker sem necessidade.
6. Não mexer em cache sem necessidade.
7. Criar manifest mínimo.
8. Criar ícones corretos.
9. Linkar manifest.
10. Testar instalação.
11. Validar diagnóstico.
12. Só depois pensar em melhorias.

## 336. Ordem oficial da frente PWA

A ordem oficial é:

1. Concluir manual.
2. Salvar manual no projeto.
3. Criar backup antes do PWA.
4. Auditar PWA sem alterar.
5. Definir nome do app.
6. Definir nome curto.
7. Definir ícone.
8. Confirmar manifest.
9. Confirmar Service Worker.
10. Confirmar cache.
11. Confirmar `vercel.json`.
12. Planejar implementação mínima.
13. Autorizar alteração.
14. Implementar mínimo.
15. Rodar build.
16. Testar local.
17. Autorizar deploy.
18. Publicar.
19. Testar produção.
20. Testar desktop.
21. Testar mobile.
22. Testar iPhone.
23. Testar app instalado.
24. Testar campo.
25. Criar backup pós validação.

## 337. Comando para Codex iniciar auditoria PWA

Usar este comando quando o manual estiver completo e salvo no projeto:

`Leia obrigatoriamente LEIA-PRIMEIRO-MINI-ERP.md e MANUAL-OFICIAL-MINI-ERP-PWA.md. Estamos iniciando apenas a auditoria da frente PWA do Mini ERP. Não altere arquivos, não gere código, não faça deploy, não crie novo projeto e não crie segunda base de código. Confirme a versão atual, a existência ou ausência de manifest, ícones, Service Worker, cache, versionamento e regras no vercel.json. Informe os riscos e proponha o plano mínimo para tornar o Mini ERP instalável como PWA mantendo o desktop exatamente como está.`

## 338. Comando para Codex criar backup antes do PWA

Usar depois da auditoria inicial ou antes dela, se for o procedimento escolhido:

`Crie um backup limpo do Mini ERP antes da frente PWA. A pasta oficial é C:\Users\Delber\Mini-ERP\projeto. Nome sugerido: MINI-ERP-BACKUP-ANTES-PWA-V2026.06.24.03.zip. Inclua src, public, sql se existir, package.json, package-lock.json, vercel.json, README.md, LEIA-PRIMEIRO-MINI-ERP.md e MANUAL-OFICIAL-MINI-ERP-PWA.md. Não inclua node_modules, .git, .vercel, .env.local, dist salvo justificativa, backups antigos, zips antigos ou arquivos temporários. Não altere o projeto e não publique.`

## 339. Comando para Codex planejar implementação mínima

Usar somente depois da auditoria:

`Com base na auditoria PWA e nos documentos oficiais, proponha a menor implementação possível para tornar o Mini ERP instalável como PWA. Não altere arquivos ainda. Liste exatamente quais arquivos seriam tocados, por que seriam tocados, qual risco existe, como testar, como validar no desktop, como validar no mobile, como validar no iPhone, como validar o app instalado e como fazer rollback para a versão 2026.06.24.03.`

## 340. Comando para Codex implementar PWA mínimo

Usar somente com autorização explícita:

`Implementação PWA mínima autorizada. Siga o plano aprovado. Não altere módulos funcionais. Não altere Supabase. Não altere banco. Não altere desktop. Não altere Service Worker ou cache além do que foi aprovado explicitamente. Faça apenas o necessário para manifest, ícones e instalação. Depois liste arquivos alterados, rode npm run build ou npm.cmd run build e informe o checklist de testes. Não faça deploy sem nova autorização.`

## 341. Comando para Codex testar antes de deploy

Usar após implementação local:

`Valide a implementação PWA antes de deploy. Não altere novos arquivos. Rode npm run build ou npm.cmd run build. Liste arquivos alterados. Confirme se Service Worker foi alterado. Confirme se cache foi alterado. Confirme se versionamento foi alterado. Confirme se Supabase foi alterado. Confirme se banco foi alterado. Confirme se desktop foi preservado. Informe o checklist manual para desktop, mobile, iPhone e app instalado.`

## 342. Comando para Codex publicar PWA autorizado

Usar somente depois de teste e autorização:

`Deploy autorizado da etapa PWA mínima. Confirme que está em C:\Users\Delber\Mini-ERP\projeto. Confirme que o projeto é mini-erp-canastra. Confirme que não é o Catálogo. Rode npm run build ou npm.cmd run build. Publique com vercel --prod. Depois confira o domínio oficial, confira version.json online, confira alias da Vercel e informe o checklist de validação em produção, desktop, mobile, iPhone e app instalado.`

## 343. Comando para Codex investigar problema no PWA instalado

Usar se o app instalado abrir errado:

`Problema no PWA instalado do Mini ERP. Não altere arquivos e não publique. Investigue possível cache, Service Worker, manifest, start_url, scope, version.json e versão carregada. Compare navegador normal, app instalado, desktop e mobile. Informe quais diagnósticos o usuário deve coletar e quais próximos passos são seguros. Não mexa em módulos funcionais.`

## 344. O que não entra na estratégia inicial

Não entra na primeira etapa:

1. Offline completo.
2. Sincronização offline.
3. Notificações.
4. Recibos.
5. Comprovantes.
6. Redesign.
7. Novo login.
8. Nova navegação.
9. Mudança em financeiro.
10. Mudança em cobranças.
11. Mudança em vendas.
12. Mudança em pré vendas.
13. Mudança em delivery.
14. Refatoração.
15. Novo projeto.

Essas frentes podem ser avaliadas depois.

## 345. O que pode vir depois do PWA estável

Depois que o PWA estiver estável, podem ser abertas frentes separadas:

1. Melhorias mobile específicas.
2. Atalhos internos para uso em campo.
3. Recibos e comprovantes bonitos.
4. Conversão de pré venda para delivery.
5. Melhorias em reconhecimento por voz.
6. Melhorias em cobranças.
7. Operação offline controlada.
8. Diagnóstico mais completo.
9. Teste de atualização avançado.
10. Melhorias de performance.

Cada frente deve ter auditoria e backup quando necessário.

## 346. Relação entre PWA e recibos bonitos

O PWA pode facilitar o uso em campo, mas não precisa incluir recibos na primeira etapa.

Recibos e comprovantes devem ser uma frente posterior.

Motivo:

1. Recibo mexe em layout.
2. Recibo mexe em venda.
3. Recibo mexe em pagamento.
4. Recibo pode envolver imagem ou PDF.
5. Recibo pode envolver WhatsApp.
6. Recibo precisa de teste próprio.

Primeiro instalar bem.

Depois melhorar comprovantes.

## 347. Relação entre PWA e fluidez

O PWA deve melhorar a fluidez percebida porque abre como aplicativo instalado.

Mas fluidez não deve ser confundida com refatoração.

A primeira melhoria de fluidez esperada vem de:

1. Acesso pela tela inicial.
2. Menos distração do navegador.
3. Interface em modo aplicativo.
4. Menos passos para abrir.
5. Uso mais natural em campo.

Melhorias profundas de performance devem ser outra etapa.

## 348. Relação entre PWA e segurança operacional

O PWA deve aumentar praticidade sem reduzir segurança.

A segurança operacional depende de:

1. Diagnóstico visível.
2. Versão correta.
3. Atualização confiável.
4. Supabase carregando.
5. Ausência de downgrade.
6. Backup antes da mudança.
7. Rollback possível.
8. Teste em campo.

Se o PWA comprometer qualquer um desses pontos, a implementação deve ser interrompida.

## 349. Versão recomendada para primeira frente PWA

A base recomendada é:

`2026.06.24.03`

Essa é a versão estável validada.

Antes de implementar, confirmar no projeto recebido se a versão continua sendo essa.

Se o ZIP anexado for mais recente, auditar primeiro.

Não assumir versão pela conversa.

## 350. Controle de versão para a primeira entrega PWA

Quando a primeira implementação PWA for autorizada, ela deve receber nova versão.

A nova versão deve ser definida antes da publicação.

Exemplo de lógica:

Versão base: `2026.06.24.03`

Primeira versão PWA autorizada: definir uma nova versão posterior, seguindo padrão do projeto.

Não publicar PWA com versão antiga se houver alteração real.

A nova versão deve aparecer corretamente no Diagnóstico e no `version.json`.

## 351. Cuidado com versionamento na primeira entrega PWA

Alterar versão é área protegida.

Mas uma publicação PWA real provavelmente precisará de nova versão.

Por isso, a mudança de versão deve ser explícita, planejada e validada.

Conferir:

1. `public/version.json`
2. Versão interna do aplicativo.
3. Maior versão aceita.
4. Diagnóstico.
5. `version.json` online.
6. App instalado.
7. Atualização automática.

Não alterar versão sem registrar.

## 352. Checklist antes de iniciar implementação PWA

Antes de implementar, confirmar:

1. Manual concluído.
2. Manual salvo no projeto.
3. LEIA salvo no projeto.
4. Backup criado.
5. Pasta correta.
6. Projeto correto.
7. Versão confirmada.
8. Manifest auditado.
9. Ícones auditados.
10. Service Worker auditado.
11. Cache auditado.
12. `vercel.json` auditado.
13. Desktop preservado como regra.
14. Plano mínimo aprovado.
15. Rollback definido.

## 353. Checklist depois de implementar localmente

Depois de implementar localmente, confirmar:

1. Arquivos alterados listados.
2. Nenhum módulo funcional alterado sem autorização.
3. Service Worker não alterado, ou alteração aprovada.
4. Cache não alterado, ou alteração aprovada.
5. Supabase não alterado.
6. Banco não alterado.
7. Desktop não alterado.
8. Build passou.
9. Teste local passou.
10. Checklist manual foi preparado.

## 354. Checklist depois do deploy PWA

Depois do deploy, confirmar:

1. Domínio oficial correto.
2. Alias correto.
3. `version.json` online correto.
4. Diagnóstico correto.
5. Desktop igual.
6. Mobile navegador funcional.
7. App instalado funcional.
8. Ícone correto.
9. Nome correto.
10. Tela em modo aplicativo.
11. Pré vendas funcionando.
12. Vendas funcionando.
13. Delivery funcionando.
14. Cobranças funcionando.
15. Supabase funcionando.
16. Sem downgrade.
17. Sem tela branca.
18. Sem erro de atualização.
19. Campo validado.
20. Backup pós validação criado.

## 355. Conclusão operacional da Parte 7

A transformação do Mini ERP em PWA é coerente e possível.

A forma correta não é criar outro projeto.

A forma correta é transformar o Mini ERP atual em instalável, mantendo a mesma base, o mesmo domínio, o mesmo Supabase, o mesmo banco e o mesmo deploy.

A primeira etapa deve ser mínima:

1. Backup.
2. Auditoria.
3. Manifest.
4. Ícones.
5. Instalação.
6. Diagnóstico.
7. Testes.
8. Desktop preservado.
9. Ausência de downgrade.

Depois que o PWA básico estiver estável, outras frentes podem ser planejadas.

A próxima parte do manual deve trazer o checklist final de validação, aceite operacional e modelo de retomada para novas conversas.
# MANUAL OFICIAL MINI ERP PWA

## Parte 8: Checklist final, aceite operacional e modelo de retomada para novas conversas

## 356. Objetivo desta parte

Esta parte encerra o manual oficial.

Ela define:

1. Checklist final antes de qualquer ação.
2. Checklist final antes do PWA.
3. Checklist final depois do PWA.
4. Critérios de aceite operacional.
5. Como abrir nova conversa sem perder contexto.
6. Como chamar o Codex sem confusão.
7. O que fazer quando o usuário estiver perdido.
8. O que nunca fazer.
9. O pacote final de comandos oficiais.

O objetivo é dar um caminho claro, simples e seguro.

## 357. Regra final do projeto

O Mini ERP está estável na versão:

`2026.06.24.03`

Essa versão deve ser protegida.

A próxima frente é PWA instalável.

Mas a ordem correta é:

1. Concluir documentação.
2. Salvar documentação no projeto.
3. Criar backup.
4. Auditar.
5. Planejar.
6. Implementar somente o mínimo.
7. Testar.
8. Publicar somente com autorização.
9. Validar em campo.
10. Criar novo backup aprovado.

## 358. Norte operacional simples

Quando houver dúvida, seguir este norte:

1. Não criar projeto novo.
2. Não criar pasta Aplicativo.
3. Não criar outro Supabase.
4. Não criar outro banco.
5. Não criar outro domínio.
6. Não mexer em código antes de backup e auditoria.
7. Não mexer em Service Worker sem auditoria.
8. Não mexer em cache sem auditoria.
9. Não mexer em versionamento sem autorização.
10. Não publicar sem autorização.

O PWA será feito dentro do Mini ERP atual.

Caminho oficial:

`C:\Users\Delber\Mini-ERP\projeto`

## 359. Arquivos oficiais obrigatórios

A pasta oficial do Mini ERP deve conter:

1. `LEIA-PRIMEIRO-MINI-ERP.md`
2. `MANUAL-OFICIAL-MINI-ERP-PWA.md`

O LEIA é o guia curto.

O MANUAL é o documento mestre.

O Codex deve ler os dois antes de qualquer análise.

## 360. O que o usuário deve fazer depois de concluir este manual

Depois que todas as partes forem reunidas, fazer:

1. Criar o arquivo `MANUAL-OFICIAL-MINI-ERP-PWA.md`.
2. Colar nele todas as partes em sequência.
3. Salvar esse arquivo dentro de `C:\Users\Delber\Mini-ERP\projeto`.
4. Garantir que `LEIA-PRIMEIRO-MINI-ERP.md` também esteja na mesma pasta.
5. Não chamar implementação ainda.
6. Primeiro pedir auditoria ao Codex.
7. Depois criar backup limpo.
8. Só depois planejar PWA.

## 361. Ordem correta dos arquivos no manual

Ao juntar o manual, manter a ordem:

1. Parte 1: Estado atual, arquitetura, módulos e regras permanentes.
2. Parte 2: Versionamento, downgrade, Service Worker e cache.
3. Parte 3: Deploy, rollback, backups e conferência de produção.
4. Parte 4: Auditoria, refinamento localizado, testes e comandos do Codex.
5. Parte 5: Refinamentos implementados, funcionalidades aprovadas e pendentes.
6. Parte 6: Riscos conhecidos, pontos intocáveis e critérios de decisão.
7. Parte 7: Estratégia técnica oficial para PWA.
8. Parte 8: Checklist final, aceite operacional e retomada.

Não deixar partes soltas.

Não trocar a ordem.

Não resumir o manual depois de pronto.

## 362. Checklist antes de chamar o Codex

Antes de chamar o Codex, confirmar:

1. O Mini ERP está na pasta oficial.
2. O arquivo `LEIA-PRIMEIRO-MINI-ERP.md` está na pasta.
3. O arquivo `MANUAL-OFICIAL-MINI-ERP-PWA.md` está na pasta.
4. A versão de referência é `2026.06.24.03`.
5. O objetivo é PWA instalável.
6. O desktop deve permanecer exatamente como está.
7. Não será criado novo projeto.
8. Não será criada nova base.
9. Não haverá deploy nesta primeira chamada.
10. O Codex fará apenas auditoria.

## 363. Primeiro comando oficial para o Codex

Usar este comando quando o manual estiver salvo dentro da pasta do Mini ERP:

```text
Leia obrigatoriamente estes dois arquivos antes de qualquer análise:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Projeto: Mini ERP Queijos Serra da Canastra.
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
Domínio oficial: https://mini-erp-canastra.vercel.app
Versão estável de referência: 2026.06.24.03

Objetivo desta etapa:

Auditar o projeto atual para preparar a transformação em PWA instalável.

Regras absolutas:

Não alterar arquivos.
Não gerar código.
Não fazer deploy.
Não criar novo projeto.
Não criar pasta chamada Aplicativo.
Não criar segunda base de código.
Não criar outro Supabase.
Não criar outro banco.
Não criar outro domínio.
Não modificar Service Worker.
Não modificar cache.
Não modificar versionamento.
Não modificar Supabase.
Não modificar banco.
Não modificar arquitetura.
Não alterar desktop.

Confirme:

1. Se a pasta atual é a pasta oficial.
2. Se o projeto é o Mini ERP e não o Catálogo.
3. Qual versão local foi encontrada.
4. Se public/version.json existe.
5. Se src/App.jsx contém versão interna.
6. Se src/main.jsx contém referência de versão.
7. Se existem public/sw.js e public/service-worker.js.
8. Qual Service Worker parece estar ativo.
9. Se existe manifest.
10. Se existem ícones de PWA.
11. Se existe vercel.json.
12. Se há regras de cache.
13. Se há risco de downgrade.
14. Quais arquivos precisariam ser tocados em uma implementação PWA mínima.
15. Qual é o plano seguro em etapas, sem implementar ainda.
```

## 364. Comando para criar backup antes do PWA

Depois da auditoria, ou antes da implementação, pedir:

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
10. Demais documentos oficiais necessários

Não incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. dist, salvo justificativa
6. backups antigos
7. zips antigos
8. arquivos temporários

Não alterar o projeto.
Não publicar.
Apenas criar o backup limpo e informar o caminho final.
```

## 365. Comando para planejar PWA mínimo

Usar somente depois da auditoria:

```text
Com base na auditoria PWA e nos documentos oficiais, proponha a menor implementação possível para tornar o Mini ERP instalável como PWA.

Não altere arquivos ainda.
Não gere código ainda.
Não faça deploy.
Não crie novo projeto.
Não crie segunda base de código.
Não altere desktop.

Liste exatamente:

1. Quais arquivos seriam tocados.
2. Por que cada arquivo seria tocado.
3. Qual trecho atual será afetado.
4. Qual alteração mínima seria feita.
5. Qual risco existe.
6. Como testar no desktop.
7. Como testar no mobile.
8. Como testar no iPhone.
9. Como testar o app instalado.
10. Como conferir version.json.
11. Como conferir Diagnóstico do Sistema.
12. Como fazer rollback para a versão 2026.06.24.03.
```

## 366. Comando para implementar PWA mínimo

Usar somente depois de plano aprovado:

```text
Implementação PWA mínima autorizada.

Siga somente o plano aprovado.

Regras:

Não alterar módulos funcionais.
Não alterar Pré-vendas.
Não alterar Vendas.
Não alterar Delivery.
Não alterar Cobranças.
Não alterar Financeiro.
Não alterar Relatórios.
Não alterar Clientes.
Não alterar Produtos.
Não alterar Supabase.
Não alterar banco.
Não alterar desktop.
Não alterar Service Worker ou cache além do que foi aprovado explicitamente.
Não fazer deploy sem nova autorização.

Faça apenas o necessário para tornar o Mini ERP instalável como PWA.

Depois:

1. Liste arquivos alterados.
2. Explique cada alteração.
3. Rode npm run build ou npm.cmd run build.
4. Informe se o build passou.
5. Informe o checklist de testes.
```

## 367. Comando para validar antes de deploy

Usar depois da implementação local:

```text
Valide a implementação PWA antes de deploy.

Não altere novos arquivos.
Não faça deploy.
Não refatore.

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

Usar somente depois de autorização explícita:

```text
Deploy autorizado da etapa PWA mínima.

Antes de publicar:

1. Confirme que está em C:\Users\Delber\Mini-ERP\projeto.
2. Confirme que o projeto é mini-erp-canastra.
3. Confirme que não é o Catálogo.
4. Rode npm run build ou npm.cmd run build.
5. Confirme que o build passou.
6. Confirme os arquivos alterados.
7. Confirme se Service Worker foi alterado.
8. Confirme se cache foi alterado.
9. Confirme se versionamento foi alterado.
10. Confirme se Supabase ou banco foram alterados.

Depois publique em produção com:

vercel --prod

Depois do deploy:

1. Confira o domínio oficial.
2. Confira version.json online.
3. Confira alias da Vercel.
4. Informe o checklist de validação em produção, desktop, mobile, iPhone e app instalado.
```

## 369. Checklist final antes da implementação PWA

Antes de qualquer código, responder sim para tudo:

1. O manual está concluído.
2. O LEIA está salvo no projeto.
3. O MANUAL está salvo no projeto.
4. A pasta oficial foi confirmada.
5. O projeto correto foi confirmado.
6. A versão atual foi confirmada.
7. O backup antes do PWA foi criado.
8. O manifest foi auditado.
9. Os ícones foram auditados.
10. O Service Worker foi auditado.
11. O cache foi auditado.
12. O vercel.json foi auditado.
13. O risco de downgrade foi avaliado.
14. O desktop será preservado.
15. O plano mínimo foi aprovado.
16. O rollback está claro.

Se qualquer resposta for não, não implementar.

## 370. Checklist final depois da implementação local

Depois de implementar localmente, confirmar:

1. Arquivos alterados foram listados.
2. Alterações foram explicadas.
3. Nenhum módulo funcional foi alterado sem autorização.
4. Pré vendas não foram alteradas.
5. Vendas não foram alteradas.
6. Delivery não foi alterado.
7. Cobranças não foram alteradas.
8. Financeiro não foi alterado.
9. Supabase não foi alterado.
10. Banco não foi alterado.
11. Desktop foi preservado.
12. Service Worker não foi alterado, ou alteração foi aprovada.
13. Cache não foi alterado, ou alteração foi aprovada.
14. Versionamento está coerente.
15. Build passou.
16. Teste local foi feito.
17. Checklist para produção está pronto.

## 371. Checklist final depois do deploy

Depois do deploy, confirmar:

1. Deploy terminou sem erro.
2. Domínio oficial está correto.
3. Alias da Vercel está correto.
4. version.json online mostra versão esperada.
5. Diagnóstico abre.
6. Versão do aplicativo está correta.
7. Versão publicada está correta.
8. Maior versão aceita está correta.
9. Status da versão está OK.
10. Service Worker está coerente.
11. Supabase carrega.
12. Clientes carregam.
13. Pré vendas carregam.
14. Vendas carregam.
15. Delivery carrega.
16. Cobranças carregam.
17. Financeiro carrega.
18. Relatórios carregam.
19. Desktop está igual.
20. Mobile navegador funciona.
21. App instalado abre.
22. App instalado mostra versão correta.
23. App instalado mostra Diagnóstico.
24. Não há downgrade.
25. Não há tela branca.

## 372. Checklist de teste no desktop

No desktop, conferir:

1. Abrir o domínio oficial.
2. Conferir tela inicial.
3. Conferir menu.
4. Conferir Painel.
5. Conferir Clientes.
6. Conferir Pré vendas.
7. Conferir Vendas.
8. Conferir Delivery.
9. Conferir Cobranças.
10. Conferir Financeiro.
11. Conferir Relatórios.
12. Conferir Diagnóstico.
13. Conferir versão.
14. Conferir Supabase.
15. Confirmar que o layout desktop não mudou.

## 373. Checklist de teste no mobile navegador

No celular, pelo navegador, conferir:

1. Abrir o domínio oficial.
2. Conferir barra inferior.
3. Conferir Pré vendas.
4. Conferir Vendas.
5. Conferir Cobranças.
6. Conferir Delivery.
7. Conferir Clientes, se necessário.
8. Conferir Diagnóstico.
9. Conferir versão.
10. Conferir Supabase.
11. Conferir modais.
12. Conferir campos.
13. Conferir se não há zoom indevido.
14. Conferir rolagem.
15. Conferir botões principais.

## 374. Checklist de teste no iPhone

No iPhone, conferir:

1. Abrir no Safari.
2. Conferir Diagnóstico.
3. Conferir versão.
4. Conferir Supabase.
5. Adicionar à tela inicial, quando aplicável.
6. Abrir pelo ícone.
7. Conferir se abre como app.
8. Conferir Pré vendas.
9. Conferir Vendas.
10. Conferir Cobranças.
11. Conferir Delivery.
12. Conferir modais.
13. Conferir teclado.
14. Conferir zoom.
15. Conferir 4G.
16. Conferir Wi Fi.

## 375. Checklist de teste no app instalado

No app instalado, conferir:

1. Ícone aparece corretamente.
2. Nome aparece corretamente.
3. App abre pelo ícone.
4. App abre no domínio correto.
5. App não abre outro projeto.
6. App não abre Catálogo.
7. App mostra Mini ERP.
8. Diagnóstico aparece.
9. Versão do aplicativo está correta.
10. Versão publicada está correta.
11. Status da versão está OK.
12. Supabase carrega.
13. Pré vendas carregam.
14. Vendas carregam.
15. Cobranças carregam.
16. Delivery carrega.
17. Não há tela branca.
18. Não há downgrade.
19. App funciona em Wi Fi.
20. App funciona em 4G.

## 376. Checklist de teste em campo

Em campo, conferir:

1. Abrir app instalado.
2. Abrir navegador, se necessário.
3. Conferir versão.
4. Conferir Diagnóstico.
5. Conferir Supabase.
6. Consultar Pré vendas.
7. Consultar Cobranças.
8. Consultar Delivery.
9. Registrar uma operação simples, se seguro.
10. Observar lentidão.
11. Observar tela branca.
12. Observar retorno para versão antiga.
13. Observar comportamento em 4G.
14. Observar comportamento fora da residência.
15. Registrar qualquer anomalia.

## 377. Critério final de aceite do PWA

O PWA só será aceito quando:

1. Desktop permanecer exatamente como estava.
2. Mobile navegador continuar funcionando.
3. App instalado abrir corretamente.
4. App instalado usar o mesmo domínio.
5. App instalado usar o mesmo Supabase.
6. App instalado mostrar Diagnóstico.
7. App instalado mostrar versão correta.
8. App instalado não carregar versão antiga.
9. Pré vendas funcionarem.
10. Vendas funcionarem.
11. Delivery funcionar.
12. Cobranças funcionarem.
13. Financeiro não for afetado.
14. Relatórios não forem afetados.
15. Supabase carregar sem erro.
16. Atualização automática continuar coerente.
17. Service Worker não causar problema.
18. Cache não causar downgrade.
19. Rollback estiver possível.
20. Backup pós validação for criado.

## 378. Critério de rejeição do PWA

Rejeitar a entrega PWA se:

1. Desktop mudar indevidamente.
2. Pré vendas sumirem.
3. Diagnóstico sumir.
4. App instalado abrir versão antiga.
5. App instalado não atualizar.
6. Supabase não carregar.
7. Cobranças quebrarem.
8. Delivery quebrar.
9. Vendas quebrarem.
10. Mobile ficar pior.
11. iPhone apresentar tela cortada.
12. Campo apresentar downgrade.
13. Service Worker ficar confuso.
14. Cache prender versão antiga.
15. Rollback não estiver claro.

Se isso acontecer, parar e diagnosticar.

## 379. Procedimento se o usuário ficar perdido

Se o usuário ficar perdido, voltar para o norte simples:

1. Estamos no Mini ERP atual.
2. Não existe projeto novo chamado Aplicativo.
3. O PWA será uma forma instalada do mesmo Mini ERP.
4. O desktop fica igual.
5. O celular ganha acesso mais fluido.
6. Antes de qualquer código, precisa ter manual e backup.
7. O Codex primeiro audita.
8. Depois planeja.
9. Depois implementa o mínimo.
10. Deploy só com autorização.

## 380. Resumo ultracurto para o usuário

Quando precisar simplificar, usar este resumo:

```text
Agora o caminho é:

1. Juntar todas as partes do manual.
2. Salvar como MANUAL-OFICIAL-MINI-ERP-PWA.md.
3. Colocar esse arquivo na pasta C:\Users\Delber\Mini-ERP\projeto.
4. Garantir que o LEIA-PRIMEIRO-MINI-ERP.md também está lá.
5. Pedir ao Codex apenas auditoria.
6. Criar backup antes do PWA.
7. Só depois planejar implementação.

Não criar projeto Aplicativo.
Não criar segunda base.
Não mexer no desktop.
Não fazer deploy agora.
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

Preparar a transformação do Mini ERP em PWA instalável.

Regras:

Não gerar código.
Não alterar arquivos.
Não fazer deploy.
Não modificar Service Worker.
Não modificar cache.
Não modificar versionamento.
Não modificar Supabase.
Não modificar banco.
Não modificar arquitetura.
Não criar novo projeto.
Não criar segunda base de código.
Manter o desktop exatamente como está.

Primeira tarefa:

Auditar o ZIP e os documentos oficiais.

Confirmar:

1. Versão atual.
2. Estrutura do projeto.
3. Arquivos de PWA existentes ou ausentes.
4. Service Worker.
5. Cache.
6. version.json.
7. vercel.json.
8. Riscos de downgrade.
9. Plano seguro para PWA mínimo.
```

## 382. Modelo para nova conversa de investigação de downgrade

Usar se voltar a aparecer versão antiga:

```text
MINI ERP, SUSPEITA DE DOWNGRADE

Contexto:

O Mini ERP já teve incidente grave de downgrade envolvendo Service Worker, cache, versionamento e atualização automática.

Versão estável de referência:

2026.06.24.03

Domínio oficial:

https://mini-erp-canastra.vercel.app

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Regras:

Não alterar arquivos.
Não gerar código.
Não fazer deploy.
Não fazer rollback ainda.
Não mexer em módulos funcionais.
Não mexer em Supabase.
Não mexer em banco.

Primeira tarefa:

Auditar evidências e pedir diagnóstico.

Verificar:

1. Versão do aplicativo.
2. Versão publicada.
3. Maior versão aceita.
4. Status da versão.
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

Não refatorar.
Não percorrer o projeto inteiro sem necessidade.
Não alterar Service Worker.
Não alterar cache.
Não alterar versionamento.
Não alterar Supabase.
Não alterar banco.
Não alterar arquitetura.
Não alterar módulos não relacionados.
Não fazer deploy sem autorização.

Antes de alterar:

1. Identifique o arquivo exato.
2. Mostre o trecho atual.
3. Explique o comportamento atual.
4. Explique a alteração mínima.
5. Informe riscos.
6. Informe testes.
```

## 384. Modelo para nova conversa de backup

Usar quando quiser criar backup:

```text
MINI ERP, BACKUP DE SEGURANÇA

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Objetivo:

Criar backup limpo da versão atual.

Regras:

Não alterar arquivos.
Não gerar código.
Não fazer deploy.
Não mexer em Service Worker.
Não mexer em cache.
Não mexer em versionamento.
Não mexer em Supabase.
Não mexer em banco.

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

Não incluir:

1. node_modules
2. .git
3. .vercel
4. .env.local
5. backups antigos
6. zips antigos
7. arquivos temporários
```

## 385. Modelo para nova conversa de deploy

Usar somente quando já estiver autorizado:

```text
MINI ERP, DEPLOY AUTORIZADO

Leia os documentos oficiais antes de agir:

1. LEIA-PRIMEIRO-MINI-ERP.md.
2. MANUAL-OFICIAL-MINI-ERP-PWA.md.

Pasta oficial:

C:\Users\Delber\Mini-ERP\projeto

Projeto Vercel:

mini-erp-canastra

Domínio oficial:

https://mini-erp-canastra.vercel.app

Objetivo:

Publicar a versão validada.

Antes de publicar:

1. Confirmar pasta.
2. Confirmar projeto.
3. Confirmar versão.
4. Rodar npm run build ou npm.cmd run build.
5. Confirmar arquivos alterados.
6. Confirmar que Service Worker, cache, Supabase, banco e desktop não foram alterados indevidamente.

Depois de publicar:

1. Conferir domínio oficial.
2. Conferir version.json online.
3. Conferir alias Vercel.
4. Conferir Diagnóstico.
5. Informar checklist para desktop, mobile e iPhone.
```

## 386. Modelo para nova conversa de rollback

Usar em caso de problema grave:

```text
MINI ERP, AVALIAÇÃO DE ROLLBACK

Não executar rollback ainda.

Primeiro avaliar.

Contexto:

O Mini ERP está em produção e possui versão estável de referência 2026.06.24.03.

Regras:

Não alterar arquivos.
Não publicar.
Não apagar nada.
Não mexer em Service Worker.
Não mexer em cache.
Não mexer em Supabase.
Não mexer em banco.

Primeira tarefa:

Avaliar se rollback é necessário.

Informar:

1. Versão atual.
2. Versão publicada.
3. Sintoma.
4. Módulos afetados.
5. Se há suspeita de cache.
6. Se há suspeita de Service Worker.
7. Se há suspeita de Supabase.
8. Qual backup deve ser usado.
9. Plano de rollback.
10. Riscos.
```

## 387. Lista de coisas que nunca devem ser pedidas ao Codex sem contexto

Nunca pedir de forma vaga:

1. “Transforma em app.”
2. “Faz virar aplicativo.”
3. “Arruma o cache.”
4. “Atualiza o Service Worker.”
5. “Publica aí.”
6. “Refatora o projeto.”
7. “Melhora o mobile todo.”
8. “Organiza o código.”
9. “Faz uma versão separada.”
10. “Cria outro projeto.”

Esses pedidos são perigosos porque abrem margem para alteração ampla.

## 388. Forma correta de pedir ao Codex

A forma correta é sempre específica:

1. Dizer que é Mini ERP.
2. Dizer a pasta oficial.
3. Dizer o domínio oficial.
4. Dizer a versão estável.
5. Dizer o objetivo.
6. Dizer o que não pode fazer.
7. Dizer se é auditoria, refinamento, backup, deploy ou rollback.
8. Exigir que leia LEIA e MANUAL.
9. Pedir lista de arquivos afetados.
10. Pedir riscos e testes.

## 389. Checklist de segurança para qualquer resposta do Codex

Depois que o Codex responder, conferir se ele respeitou:

1. Leu os documentos.
2. Não sugeriu projeto novo.
3. Não sugeriu segunda base.
4. Não confundiu Mini ERP com Catálogo.
5. Não propôs mexer no desktop sem necessidade.
6. Não propôs mexer em Service Worker sem auditoria.
7. Não propôs mexer em cache sem auditoria.
8. Não propôs deploy sem autorização.
9. Não ignorou versionamento.
10. Não ignorou rollback.
11. Não ignorou backup.
12. Não inventou caminho diferente.

Se falhar nisso, parar e corrigir o rumo.

## 390. Checklist de aceite da auditoria do Codex

A auditoria do Codex só será considerada boa se responder:

1. Qual pasta foi auditada.
2. Qual versão encontrou.
3. Quais arquivos principais existem.
4. Se existe manifest.
5. Se existem ícones.
6. Se existe Service Worker.
7. Qual arquivo de Service Worker existe.
8. Se existe cache sensível.
9. Se existe vercel.json.
10. Se version.json está presente.
11. Se App.jsx tem versão.
12. Se main.jsx tem versão.
13. Quais módulos existem.
14. Quais riscos existem.
15. Qual plano mínimo recomenda.
16. O que não deve ser alterado.

## 391. Checklist de aceite do backup

O backup só será aceito se:

1. Tiver nome claro.
2. Tiver versão no nome.
3. Estiver fora de node_modules.
4. Não incluir .env.local.
5. Não incluir .git.
6. Não incluir .vercel.
7. Não incluir backups antigos.
8. Não incluir zips antigos.
9. Incluir src.
10. Incluir public.
11. Incluir package.json.
12. Incluir package-lock.json.
13. Incluir vercel.json.
14. Incluir LEIA.
15. Incluir MANUAL.
16. Incluir sql, se existir.

## 392. Checklist de aceite da implementação PWA mínima

A implementação mínima só será aceita se:

1. Tocar apenas os arquivos aprovados.
2. Não alterar módulos funcionais.
3. Não alterar desktop.
4. Não alterar Supabase.
5. Não alterar banco.
6. Não alterar Service Worker sem aprovação.
7. Não alterar cache sem aprovação.
8. Manifest estiver correto.
9. Ícones estiverem corretos.
10. App puder ser instalado.
11. Build passar.
12. Diagnóstico continuar funcionando.
13. Versionamento continuar coerente.
14. Rollback continuar possível.

## 393. Checklist de aceite em produção

A produção só será aceita se:

1. Domínio oficial abrir.
2. version.json online estiver correto.
3. Diagnóstico mostrar status OK.
4. Desktop funcionar.
5. Mobile funcionar.
6. App instalado funcionar.
7. Supabase carregar.
8. Pré vendas carregar.
9. Vendas carregar.
10. Delivery carregar.
11. Cobranças carregar.
12. Financeiro carregar.
13. Relatórios carregar.
14. Não houver tela branca.
15. Não houver downgrade.

## 394. Checklist de aceite em campo

A versão só será realmente aprovada em campo se:

1. Abrir fora de casa.
2. Abrir em 4G.
3. Abrir no iPhone.
4. Abrir pelo app instalado.
5. Mostrar versão correta.
6. Mostrar Diagnóstico.
7. Carregar dados.
8. Não perder Pré vendas.
9. Não perder Cobranças.
10. Não perder Delivery.
11. Não voltar para versão antiga.
12. Não atrapalhar a operação real.

## 395. Procedimento se a auditoria encontrar problemas

Se a auditoria encontrar problema:

1. Não implementar PWA.
2. Classificar o problema.
3. Confirmar se é versão, cache, Service Worker, Supabase, banco, deploy ou código.
4. Resolver primeiro o risco estrutural.
5. Rodar build.
6. Testar.
7. Atualizar documentação, se necessário.
8. Só depois retomar PWA.

Não construir PWA em cima de base duvidosa.

## 396. Procedimento se o backup falhar

Se o backup falhar:

1. Não implementar.
2. Verificar permissões.
3. Verificar arquivos grandes.
4. Verificar se node_modules foi incluído por engano.
5. Verificar se há zip antigo dentro da pasta.
6. Corrigir a seleção dos arquivos.
7. Gerar novo backup.
8. Conferir nome.
9. Só depois continuar.

Sem backup, não iniciar PWA.

## 397. Procedimento se o build falhar

Se o build falhar:

1. Não publicar.
2. Ler o erro.
3. Identificar arquivo.
4. Verificar se o erro veio da alteração PWA.
5. Corrigir de forma localizada.
6. Rodar build novamente.
7. Não mexer em módulos não relacionados.
8. Não fazer deploy.

Build falhando bloqueia deploy.

## 398. Procedimento se o deploy falhar

Se o deploy falhar:

1. Não tentar várias vezes no impulso.
2. Ler a mensagem.
3. Confirmar pasta.
4. Confirmar projeto Vercel.
5. Confirmar login Vercel.
6. Confirmar build.
7. Confirmar conexão.
8. Confirmar se o problema é temporário.
9. Não alterar código sem motivo.
10. Tentar novamente apenas depois de entender.

## 399. Procedimento se o PWA instalar, mas abrir errado

Se instalar, mas abrir errado:

1. Abrir Diagnóstico dentro do app.
2. Conferir versão do app.
3. Conferir versão publicada.
4. Conferir start_url.
5. Conferir scope.
6. Conferir manifest.
7. Conferir Service Worker.
8. Conferir cache.
9. Conferir navegador normal.
10. Conferir desktop.
11. Não mexer em módulos funcionais.
12. Tratar como problema de PWA, cache ou Service Worker.

## 400. Procedimento se o app instalado prender versão antiga

Se o app instalado prender versão antiga:

1. Suspeitar de Service Worker.
2. Suspeitar de cache.
3. Conferir version.json online.
4. Conferir Diagnóstico no navegador.
5. Conferir Diagnóstico no app instalado.
6. Comparar versões.
7. Conferir se o Service Worker está controlando.
8. Conferir se version.json está cacheado.
9. Conferir se HTML está cacheado.
10. Não alterar Pré vendas, Vendas, Cobranças ou Delivery.
11. Não publicar correção sem auditoria.

## 401. Procedimento se desktop mudar após PWA

Se desktop mudar:

1. Rejeitar a entrega.
2. Identificar arquivo alterado.
3. Confirmar se foi CSS global.
4. Confirmar se foi App.jsx.
5. Confirmar se foi navegação.
6. Reverter alteração que afetou desktop.
7. Testar desktop novamente.
8. Não aceitar PWA com desktop alterado.

Desktop preservado é regra absoluta.

## 402. Procedimento se mobile piorar após PWA

Se mobile piorar:

1. Identificar tela afetada.
2. Conferir se é navegador ou app instalado.
3. Conferir iPhone.
4. Conferir Chrome mobile.
5. Conferir CSS alterado.
6. Conferir manifest, se afetar visual do app.
7. Conferir se há problema de tela cheia.
8. Corrigir apenas o necessário.
9. Não mexer no desktop.
10. Não mexer em módulos não relacionados.

## 403. Procedimento se Supabase falhar após PWA

Se Supabase falhar após PWA:

1. Conferir se Supabase foi alterado.
2. Conferir se banco foi alterado.
3. Conferir Diagnóstico.
4. Conferir erro de sincronização.
5. Conferir rede.
6. Conferir navegador normal.
7. Conferir app instalado.
8. Conferir se é problema de versão.
9. Não alterar banco sem autorização.
10. Não publicar tentativa sem entender.

## 404. Procedimento se Pré vendas falhar após PWA

Se Pré vendas falhar após PWA:

1. Conferir se Pré vendas foi alterado.
2. Se não foi alterado, suspeitar de versão, cache ou Service Worker.
3. Conferir Diagnóstico.
4. Conferir Supabase.
5. Conferir filtro por data.
6. Conferir paginação.
7. Conferir navegador normal.
8. Conferir app instalado.
9. Não refazer o módulo.
10. Corrigir apenas depois de localizar causa.

## 405. Procedimento se Cobranças falhar após PWA

Se Cobranças falhar após PWA:

1. Conferir se Cobranças foi alterado.
2. Conferir versão.
3. Conferir Supabase.
4. Conferir cliente com pendência.
5. Conferir cliente com múltiplas pendências.
6. Conferir app instalado.
7. Conferir navegador normal.
8. Não alterar financeiro sem prova.
9. Corrigir de forma localizada.

## 406. Procedimento se Delivery falhar após PWA

Se Delivery falhar após PWA:

1. Conferir se Delivery foi alterado.
2. Conferir versão.
3. Conferir Supabase.
4. Conferir Nova Entrega.
5. Conferir modal.
6. Conferir status.
7. Conferir app instalado.
8. Conferir navegador normal.
9. Corrigir apenas depois de localizar causa.

## 407. Registro final de versão PWA

Quando a primeira versão PWA for criada, registrar:

1. Versão base.
2. Nova versão.
3. Data.
4. Arquivos alterados.
5. Se manifest foi criado ou alterado.
6. Se ícones foram criados ou alterados.
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
19. Pendências.
20. Riscos remanescentes.

## 408. Modelo de registro pós PWA

Usar este modelo depois de validar o PWA:

```text
REGISTRO PÓS PWA MINI ERP

Data:
Versão base:
Nova versão:
Responsável:
Pasta:
Domínio:

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

Resultado Diagnóstico:

Houve downgrade?

Backup antes do PWA:

Backup pós validação:

Pendências:

Conclusão:
```

## 409. Modelo de relatório de problema

Usar se houver erro:

```text
RELATÓRIO DE PROBLEMA MINI ERP

Data:
Hora:
Local:
Rede:
Dispositivo:
Navegador:
App instalado ou navegador:

Versão do aplicativo:
Versão publicada:
Maior versão aceita:
Status da versão:
Service Worker disponível:
Service Worker controlando:
Supabase:
Última atualização de dados:
Erro de sincronização:

Módulo afetado:

Sintoma:

Acontece no desktop?
Acontece no mobile?
Acontece no app instalado?
Acontece em aba anônima?
Acontece em 4G?
Acontece em Wi Fi?

version.json online confere?

Prints anexados:

Conclusão inicial:
```

## 410. Modelo de comando para analisar problema com print

Usar quando houver print de erro:

```text
Analise os prints anexados do Mini ERP.

Contexto:

Projeto em produção.
Versão estável de referência: 2026.06.24.03.
Frente atual: PWA instalável.
Desktop deve permanecer preservado.

Regras:

Não propor código ainda.
Não propor deploy.
Não mexer em Service Worker.
Não mexer em cache.
Não mexer em versionamento.
Não mexer em Supabase.
Não mexer em banco.

Primeiro identifique:

1. O que o print mostra.
2. Se parece versão antiga.
3. Se parece erro visual.
4. Se parece erro de dados.
5. Se parece problema de cache.
6. Se parece problema de Service Worker.
7. Qual diagnóstico pedir.
8. Qual próximo passo seguro.
```

## 411. Modelo de comando para continuar o manual em outra conversa

Se precisar continuar o manual em outra conversa:

```text
Estou continuando o MANUAL-OFICIAL-MINI-ERP-PWA.md.

Já foram criadas as partes:

1. Estado atual, arquitetura, módulos e regras.
2. Versionamento, downgrade, Service Worker e cache.
3. Deploy, rollback, backups e produção.
4. Auditoria, refinamento localizado, testes e comandos.
5. Refinamentos implementados, aprovados e pendentes.
6. Riscos, pontos intocáveis e critérios de decisão.
7. Estratégia técnica oficial para PWA.
8. Checklist final, aceite e retomada.

Objetivo:

Revisar o manual completo, remover duplicidades graves, preservar conteúdo técnico e preparar uma versão final única para salvar no projeto.

Regras:

Não resumir demais.
Não omitir histórico de downgrade.
Não omitir Service Worker.
Não omitir cache.
Não omitir versionamento.
Não omitir deploy e rollback.
Não alterar decisões do projeto.
```

## 412. O que fazer se houver conflito entre LEIA e MANUAL

Se houver conflito:

1. Não agir no impulso.
2. Comparar os dois documentos.
3. Conferir o ZIP atual.
4. Conferir a versão real.
5. Conferir o código.
6. Atualizar o documento que estiver desatualizado.
7. Registrar a correção.
8. Não implementar antes de resolver.

O LEIA é guia curto.

O MANUAL é documento mestre.

Mas o código auditado e a versão real sempre precisam ser conferidos.

## 413. Regra sobre informações antigas da conversa

Informação de conversa antiga ajuda, mas não substitui auditoria.

Antes de agir, sempre conferir:

1. ZIP atual.
2. Arquivos reais.
3. Versão real.
4. public/version.json.
5. App.jsx.
6. main.jsx.
7. Service Worker.
8. vercel.json.
9. Supabase.
10. Diagnóstico.

Memória não deve mandar mais que evidência.

## 414. Regra sobre anexos

Quando o usuário anexar ZIP:

1. Auditar antes de qualquer coisa.
2. Confirmar versão.
3. Confirmar se é Mini ERP.
4. Confirmar se não é Catálogo.
5. Confirmar estrutura.
6. Confirmar arquivos críticos.
7. Confirmar riscos.
8. Não alterar.
9. Não publicar.
10. Entregar diagnóstico.

## 415. Regra sobre prints

Quando o usuário mandar print:

1. Ler o print com cuidado.
2. Identificar tela.
3. Identificar módulo.
4. Identificar se parece versão antiga.
5. Pedir ou usar Diagnóstico, se necessário.
6. Não concluir sem comparar com versão.
7. Não propor alteração ampla.
8. Relacionar com histórico de downgrade quando fizer sentido.

## 416. Regra sobre mensagens de erro

Quando aparecer erro técnico:

1. Copiar erro completo.
2. Não resumir demais.
3. Identificar arquivo citado.
4. Identificar linha, se houver.
5. Relacionar com última alteração.
6. Rodar build, se aplicável.
7. Não publicar enquanto houver erro.
8. Corrigir de forma localizada.

## 417. Regra sobre ansiedade operacional

Quando houver insegurança, a resposta deve ser simples.

O projeto deve voltar ao básico:

1. Qual é a versão?
2. Qual é a pasta?
3. Qual é o domínio?
4. O diagnóstico está OK?
5. O Supabase carregou?
6. O desktop está igual?
7. O mobile funciona?
8. O backup existe?
9. O rollback é possível?
10. O Codex leu os documentos?

Se essas perguntas estiverem respondidas, o projeto está sob controle.

## 418. Decisão final sobre a frente PWA

A frente PWA está aprovada como direção.

Mas a implementação depende de:

1. Manual concluído.
2. Manual salvo.
3. LEIA salvo.
4. Backup criado.
5. Auditoria do Codex.
6. Plano mínimo aprovado.
7. Autorização explícita.
8. Build aprovado.
9. Testes aprovados.
10. Deploy autorizado.

Sem isso, não implementar.

## 419. Decisão final sobre aplicativo

O aplicativo será um PWA instalado do Mini ERP.

Não será:

1. App nativo.
2. App de loja.
3. Projeto novo.
4. Pasta nova.
5. Banco novo.
6. Supabase novo.
7. Domínio novo.
8. Sistema separado.

Será:

1. Mesmo Mini ERP.
2. Mesmo código.
3. Mesmo domínio.
4. Mesmo Supabase.
5. Mesmo banco.
6. Mesmo deploy.
7. Desktop preservado.
8. Mobile mais fluido.

## 420. Decisão final sobre desktop

O desktop fica como está.

Essa é uma regra de aceite.

Se uma implementação PWA alterar o desktop de forma indevida, a entrega deve ser rejeitada.

## 421. Decisão final sobre mobile

O mobile deve ficar mais prático, mas não pode ficar mais arriscado.

Prioridades do mobile:

1. Abrir rápido.
2. Abrir pelo ícone.
3. Mostrar Pré vendas.
4. Mostrar Vendas.
5. Mostrar Cobranças.
6. Mostrar Delivery.
7. Mostrar Diagnóstico.
8. Não dar zoom indevido.
9. Não cortar modal.
10. Não carregar versão antiga.

## 422. Decisão final sobre Service Worker

Service Worker só será alterado se a auditoria provar necessidade.

Não alterar por suposição.

Não alterar por entusiasmo técnico.

Não alterar junto com várias mudanças.

Qualquer alteração em Service Worker precisa de:

1. Justificativa.
2. Arquivo exato.
3. Trecho atual.
4. Trecho proposto.
5. Risco.
6. Teste.
7. Rollback.
8. Validação em desktop.
9. Validação em mobile.
10. Validação no app instalado.

## 423. Decisão final sobre cache

Cache só será alterado se a auditoria provar necessidade.

O cache não pode prender versão antiga.

O cache não pode prender version.json.

O cache não pode esconder atualização.

O cache não pode causar downgrade.

## 424. Decisão final sobre versionamento

Toda nova versão publicada deve ter versionamento coerente.

Conferir:

1. public/version.json.
2. Versão interna do aplicativo.
3. main.jsx, se houver referência.
4. Maior versão aceita.
5. Diagnóstico.
6. version.json online.
7. App instalado.

Versão errada bloqueia deploy.

## 425. Decisão final sobre Supabase

Supabase não será alterado na frente PWA inicial.

Se algum problema aparecer em dados, investigar antes.

Não alterar tabela.

Não alterar política.

Não alterar sincronização.

Não alterar banco.

## 426. Decisão final sobre operação offline

Offline fica para depois.

A primeira etapa PWA não deve incluir sincronização offline.

Offline será outra frente, com planejamento próprio.

## 427. Decisão final sobre recibos

Recibos e comprovantes ficam para depois.

Eles são uma frente futura.

Não entram na primeira implementação PWA.

## 428. Decisão final sobre notificações

Notificações ficam para depois.

Não entram no PWA inicial.

## 429. Decisão final sobre refinamentos

Refinamentos futuros devem ser feitos um por vez.

Não misturar:

1. PWA com Pré vendas.
2. PWA com Cobranças.
3. PWA com Delivery.
4. PWA com Financeiro.
5. PWA com reconhecimento por voz.
6. PWA com recibos.
7. PWA com offline.

Primeiro estabilizar PWA.

Depois abrir novas frentes.

## 430. Checklist mestre de segurança

Antes de qualquer ação importante, conferir:

1. Pasta correta.
2. Projeto correto.
3. Domínio correto.
4. Versão correta.
5. Backup existente.
6. LEIA presente.
7. MANUAL presente.
8. Codex orientado.
9. Escopo pequeno.
10. Áreas protegidas preservadas.
11. Build possível.
12. Teste definido.
13. Rollback possível.
14. Deploy autorizado.
15. Produção conferida.

## 431. Checklist mestre de áreas protegidas

Áreas protegidas:

1. Service Worker.
2. Cache.
3. Versionamento.
4. Atualização automática.
5. Supabase.
6. Banco.
7. Sincronização.
8. Deploy.
9. vercel.json.
10. Arquitetura.
11. Desktop.
12. Diagnóstico.
13. Dados.
14. Backups.
15. Projeto Vercel.

## 432. Checklist mestre de módulos críticos

Módulos críticos:

1. Clientes.
2. Pré vendas.
3. Vendas.
4. Delivery.
5. Cobranças.
6. Financeiro.
7. Relatórios.
8. Produtos.
9. Pagamentos.
10. Diagnóstico.

Esses módulos precisam continuar funcionando depois de qualquer alteração.

## 433. Checklist mestre do PWA

Para o PWA, confirmar:

1. Manifest.
2. Ícones.
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
14. Diagnóstico preservado.
15. Desktop preservado.
16. Mobile funcional.
17. App instalado funcional.
18. Atualização coerente.
19. Sem downgrade.
20. Backup pós validação.

## 434. Comando final mais seguro para iniciar a próxima etapa

Quando tudo estiver pronto, este é o comando mais seguro para começar:

```text
Leia obrigatoriamente:

1. LEIA-PRIMEIRO-MINI-ERP.md
2. MANUAL-OFICIAL-MINI-ERP-PWA.md

Estamos iniciando a frente PWA do Mini ERP.

Nesta etapa, faça apenas auditoria.

Não altere arquivos.
Não gere código.
Não faça deploy.
Não crie novo projeto.
Não crie segunda base.
Não altere desktop.
Não altere Service Worker.
Não altere cache.
Não altere versionamento.
Não altere Supabase.
Não altere banco.

Confirme a versão atual, os arquivos relacionados a PWA, Service Worker, cache, versionamento e Vercel.

Depois entregue um plano mínimo, seguro e em etapas para transformar o Mini ERP em PWA instalável, mantendo o desktop exatamente como está.
```

## 435. Estado final esperado depois deste manual

Depois deste manual, o projeto deve ter:

1. LEIA curto para retomada.
2. MANUAL completo para referência.
3. Regras claras.
4. Histórico de downgrade registrado.
5. Service Worker tratado como área sensível.
6. Cache tratado como área sensível.
7. Versionamento tratado como área sensível.
8. Deploy controlado.
9. Rollback documentado.
10. Backup obrigatório.
11. PWA planejado com cautela.
12. Desktop preservado.
13. Mobile como foco operacional.
14. Codex orientado.
15. Menos risco de confusão.

## 436. Conclusão final do manual

O Mini ERP Queijos Serra da Canastra é um sistema em produção, usado diariamente em campo.

A versão estável de referência é:

`2026.06.24.03`

O projeto já passou por incidente grave de downgrade.

Por isso, a evolução deve ser cuidadosa.

A transformação em PWA é coerente e útil, especialmente para melhorar a fluidez no celular.

Mas ela deve acontecer dentro do projeto atual.

Não deve haver novo projeto.

Não deve haver segunda base.

Não deve haver novo banco.

Não deve haver novo Supabase.

Não deve haver novo domínio.

O desktop deve permanecer exatamente como está.

A primeira implementação PWA deve ser mínima, segura, testável e reversível.

O caminho correto é:

1. Manual concluído.
2. Backup antes do PWA.
3. Auditoria.
4. Plano mínimo.
5. Implementação autorizada.
6. Build.
7. Teste.
8. Deploy autorizado.
9. Validação em produção.
10. Validação em campo.
11. Backup pós aprovação.

## 437. Fechamento oficial da etapa PWA em producao

Em 28/06/2026, a etapa PWA deixou de ser apenas planejamento e passou a ser estado oficial publicado.

O Mini ERP segue no mesmo projeto, mesma base de codigo, mesmo dominio, mesmo Supabase e mesmo banco.

Nao foi criado novo projeto.

Nao foi criada segunda base de codigo.

Nao foi criado novo dominio.

Nao foi criado novo banco.

Nao foi criado novo Supabase.

### 437.1 Historico resumido da etapa PWA

A frente PWA foi conduzida em etapas controladas:

1. Auditoria e planejamento do PWA minimo.
2. Implementacao do PWA minimo local.
3. Auditoria do PWA minimo.
4. Backup pos PWA local.
5. Preparacao do deploy PWA.
6. Teste operacional da Vercel CLI.
7. Aplicacao da identidade visual oficial do PWA.
8. Implementacao da tela de abertura oficial do PWA.
9. Deploy de producao aprovado.
10. Criacao do relatorio oficial de deploy.
11. Rebase controlado com `origin/main`.
12. Push normal para GitHub.
13. Backup pos producao aprovado fora da pasta do projeto.

### 437.2 Identidade visual oficial aplicada

Nome curto do app:

```text
ERP Canastra
```

Nome completo do app:

```text
ERP Queijos Serra da Canastra
```

Manifest final em producao:

```text
name: ERP Queijos Serra da Canastra
short_name: ERP Canastra
```

Icones oficiais em producao:

```text
/pwa/icon-192.png
/pwa/icon-512.png
/pwa/icon-maskable-512.png
```

Os caminhos antigos de icone podem continuar existindo como diagnostico, mas nao sao a fonte oficial do manifest.

### 437.3 Tela de abertura oficial

A tela de abertura oficial foi implementada em:

```text
src/App.jsx
src/index.css
```

Ela usa:

```text
Logo:  /brand/logo-queijos-serra-da-canastra.png
Fundo: /brand/fundo-madeira-canastra.png
Texto: ERP Canastra
```

Ela e uma tela visual dentro do React.

Ela nao e splash nativa do sistema operacional.

Ela nao deve ser confundida com o icone do PWA.

Ela nao deve usar:

```text
/pwa/icon-192.png
/pwa/icon-512.png
/pwa/icon-maskable-512.png
/pwa-icon-192.png
/pwa-icon-512.png
/pwa-maskable-512.png
```

### 437.4 Validacoes de producao realizadas

Dominio oficial validado:

```text
https://mini-erp-canastra.vercel.app
```

Arquivos validados em producao:

```text
/manifest.json
/pwa/icon-192.png
/pwa/icon-512.png
/pwa/icon-maskable-512.png
/brand/logo-queijos-serra-da-canastra.png
/brand/fundo-madeira-canastra.png
/version.json
/sw.js
/service-worker.js
```

Resultado da validacao:

```text
Deploy aprovado.
Producao funcionando.
```

Versao preservada:

```text
2026.06.24.03
```

### 437.5 Relatorio e backup oficiais

Relatorio oficial de deploy:

```text
RELATORIO_DEPLOY_PWA_IDENTIDADE_SPLASH_PRODUCAO.md
```

Backup oficial pos producao aprovado:

```text
C:\Users\Delber\Mini-ERP\BACKUP-MINI-ERP-2026-06-24-03-PWA-PRODUCAO-APROVADO.zip
```

Esse backup foi criado fora da pasta oficial do projeto.

Nao alterar nem sobrescrever esse backup sem autorizacao explicita.

### 437.6 Rebase e GitHub

Apos o deploy, houve divergencia com `origin/main`.

Foram auditados dois commits remotos de backup SQL:

```text
2c2389f Backup automatico Supabase com limpeza
aabeb74 Backup automatico Supabase com limpeza
```

Eles mexiam apenas em arquivos `.sql` dentro de `backups/`.

Foi feito rebase controlado sobre `origin/main`, sem conflito.

Depois foi feito push normal para `origin/main`.

Nao houve `push --force`.

Estado final do GitHub:

```text
Branch: main
Remoto: origin https://github.com/chatgptplanilhas-cmyk/mini-erp-canastra.git
Sem commits a frente ou atras
```

Ultimos commits relevantes apos rebase e push:

```text
7a2b075 documenta deploy pwa com identidade visual e splash
bbe18bc implementa tela de abertura oficial do pwa
9ee1373 aplica identidade visual oficial do pwa
f801cc5 documenta teste operacional vercel cli
1db7033 documenta diagnostico vercel pre deploy
0a8b094 documenta preparacao deploy pwa
5f964ac documenta backup pos pwa local
f3ca4d6 documenta auditoria pwa minimo
```

### 437.7 Regras para proximas etapas

Antes de qualquer nova etapa:

1. Confirmar `git status --short`.
2. Confirmar `git status -sb`.
3. Confirmar os ultimos commits.
4. Confirmar se ha divergencia com `origin/main`.
5. Rodar build antes de concluir qualquer mudanca.
6. Proteger Service Worker, cache e versionamento.
7. Evitar alterar varios modulos ao mesmo tempo.
8. Nao fazer deploy sem autorizacao explicita.
9. Nao fazer push sem etapa propria.
10. Criar backup/checkpoint quando houver risco operacional.

Areas protegidas continuam sendo:

```text
Service Worker
Cache
Versionamento
Supabase
Banco
Manifest
Icones PWA
vercel.json
public/version.json
public/sw.js
public/service-worker.js
```

### 437.8 Proximas evolucoes recomendadas

As proximas evolucoes devem ser abertas uma por vez:

1. Teste de campo em producao no desktop, Chrome mobile e Safari/iPhone.
2. Seguranca com Face ID, digital ou PIN via Passkey/WebAuthn.
3. Recibos e comprovantes bonitos.
4. Modo offline mais forte.
5. Refinamentos operacionais pequenos e isolados.

Seguranca via Face ID, digital ou PIN deve ser tratada tecnicamente como uma frente de Passkey/WebAuthn, com planejamento proprio e sem improviso.

Modo offline mais forte deve ser outra frente, com desenho claro de sincronizacao, conflitos e protecao de dados.

Recibos e comprovantes bonitos devem ser uma frente propria, sem misturar com Service Worker, cache ou versionamento.

### 437.9 Estado final apos esta atualizacao documental

O Mini ERP PWA esta em producao e aprovado.

O desktop permanece preservado.

O mobile passa a ter experiencia PWA oficial.

A identidade visual oficial esta aplicada.

A tela de abertura oficial esta aplicada.

O GitHub esta sincronizado.

O backup pos producao aprovado existe fora da pasta do projeto.

As proximas conversas devem tratar esse estado como a nova base oficial do projeto.

Fim do MANUAL-OFICIAL-MINI-ERP-PWA.md.
