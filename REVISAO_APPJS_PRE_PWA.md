# REVISAO APPJS PRE PWA

Data da auditoria: 2026-06-27
Projeto: Mini ERP Queijos Serra da Canastra
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
Dominio oficial: https://mini-erp-canastra.vercel.app
Versao estavel de referencia: 2026.06.24.03
Relatorio anterior: RELATORIO_BASE_OFICIAL_PRE_PWA.md

## 1. Confirmacao da pasta atual

Comando consultado:

```powershell
Get-Location
```

Resultado:

```text
C:\Users\Delber\Mini-ERP\projeto
```

Conclusao: a auditoria foi feita na pasta oficial do Mini ERP.

## 2. Confirmacao do estado Git atual

Comando consultado:

```powershell
git status --short
```

Resultado antes da criacao deste relatorio:

```text
 M src/App.jsx
?? INCIDENTE-DOWNGRADE-2026-06-24.md
?? LEIA-PRIMEIRO-MINI-ERP.md
?? MANUAL-OFICIAL-MINI-ERP-PWA.md
?? RELATORIO_BASE_OFICIAL_PRE_PWA.md
```

Comando consultado:

```powershell
git status
```

Resultado:

```text
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   src/App.jsx

Untracked files:
  INCIDENTE-DOWNGRADE-2026-06-24.md
  LEIA-PRIMEIRO-MINI-ERP.md
  MANUAL-OFICIAL-MINI-ERP-PWA.md
  RELATORIO_BASE_OFICIAL_PRE_PWA.md

no changes added to commit
```

Observacao: apos esta etapa, `REVISAO_APPJS_PRE_PWA.md` tambem passa a aparecer como arquivo nao rastreado, pois foi criado por esta auditoria.

## 3. Resumo tecnico do diff de src/App.jsx

Comandos consultados:

```powershell
git diff --stat -- src/App.jsx
git diff --numstat -- src/App.jsx
git diff --unified=0 -- src/App.jsx
```

Resultado numerico:

```text
src/App.jsx | 418 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++----
1 file changed, 390 insertions(+), 28 deletions(-)
```

Contagem:

```text
390 insercoes
28 exclusoes
```

### Principais blocos alterados

1. Estados novos para filtro, paginacao, resumo do dia e confirmacao de exclusao de pre-vendas.
2. Efeito para resetar pagina quando busca ou data mudam.
3. Efeito para fechar modal de resumo do dia com tecla Escape.
4. Filtro de pre-vendas por data.
5. Calculo de paginacao de pre-vendas.
6. Calculo do resumo do dia.
7. Calculo da conferencia de produtos do dia.
8. Calculo de totais por forma de pagamento.
9. Helpers internos de formatacao e montagem do texto do resumo.
10. Botao "Resumo do dia".
11. Campo de data e botao "Limpar data".
12. Controles "Anterior", "Pagina X de Y" e "Proxima".
13. Modal grande de resumo do dia.
14. Modal visual para confirmar exclusao de pre-venda.
15. Pequeno ajuste de `key={id}` em item de navegacao/menu.

### Funcoes alteradas

Funcoes diretamente alteradas ou com comportamento afetado:

```text
excluirPreVenda(id)
preVendasFiltradas()
TelaPreVendas()
renderLinhaPreVenda(item)
abrirDetalhePreVenda(preVenda)
fecharDetalhePreVenda()
```

Funcoes internas adicionadas dentro de `TelaPreVendas()`:

```text
formatarQuantidadeResumoPreVenda(qtd)
chavePreVendaResumo(preVenda, indice)
pagamentoResumoPreVenda(preVenda)
moedaResumoPreVenda(valor)
linhasItensResumoPreVenda(preVenda)
montarTextoResumoDiaPreVendas()
```

### Estados adicionados

Trechos representativos do diff:

```jsx
const [dataFiltroPreVendas, setDataFiltroPreVendas] = useState('')
const [paginaPreVendas, setPaginaPreVendas] = useState(1)
const [resumoDiaPreVendasAberto, setResumoDiaPreVendasAberto] = useState(false)
const [confirmDeletePreVenda, setConfirmDeletePreVenda] = useState(false)
```

### Componentes ou modais adicionados

1. Modal de resumo do dia de pre-vendas.
2. Modal de confirmacao visual para excluir pre-venda.
3. Area de paginacao da lista.
4. Area de filtro por data.

Trechos representativos:

```jsx
Resumo do dia
Limpar data
Anterior
Pagina {paginaAtualPreVendas} de {totalPaginasPreVendas}
Proxima
Excluir pre-venda de {detalhe.cliente || 'cliente'}?
Essa acao nao podera ser desfeita.
Cancelar
```

### Trechos removidos

O diff removeu a confirmacao nativa dentro de `excluirPreVenda(id)`:

```jsx
if (!window.confirm('Excluir esta pre-venda?')) return
```

O diff tambem substituiu a chamada direta de exclusao no botao do detalhe por abertura do estado de confirmacao visual:

```jsx
onClick={() => setConfirmDeletePreVenda(true)}
```

A chamada real de exclusao permanece sendo feita depois da confirmacao visual:

```jsx
setConfirmDeletePreVenda(false)
excluirPreVenda(detalhe.id)
fecharDetalhePreVenda()
```

## 4. Classificacao das alteracoes por area

### Pre-vendas

Classificacao: alteracao principal.

O diff esta concentrado na tela e fluxo de pre-vendas. Ele adiciona filtro, paginacao, resumo do dia e confirmacao visual de exclusao.

### Paginacao

Classificacao: alteracao funcional relevante.

Trechos identificados:

```jsx
const preVendasPorPagina = 30
const totalPaginasPreVendas = Math.max(1, Math.ceil(lista.length / preVendasPorPagina))
const listaPaginada = lista.slice(indiceInicialPreVendas, indiceFinalPreVendas)
```

Risco associado: se o calculo de pagina atual, total de paginas ou reset de pagina falhar, registros podem parecer ausentes mesmo estando carregados.

### Filtro por data

Classificacao: alteracao funcional relevante.

Trecho identificado:

```jsx
if (dataFiltroPreVendas && dataISO(item.criadoEm || item.created_at) !== dataFiltroPreVendas) return false
```

Risco associado: depende da consistencia de `criadoEm`, `created_at` e `dataISO`. Se os formatos divergirem, a lista pode filtrar registros indevidamente.

### Resumo do dia

Classificacao: alteracao funcional nova.

Inclui:

1. Registros do dia.
2. Conferencia de produtos.
3. Quantidade total de produtos.
4. Valor total previsto.
5. Totais por forma de pagamento.
6. Texto consolidado em `textarea`.

Risco associado: calculos podem divergir se itens estiverem incompletos, se `quantidade` vier vazia, ou se forma de pagamento depender de transcricao por voz.

### Exclusao de pre-venda

Classificacao: alteracao sensivel.

O fluxo remove a confirmacao nativa `window.confirm` e coloca confirmacao visual no modal. A funcao `excluirPreVenda(id)` continua sendo chamada depois da confirmacao.

Risco associado: se o estado `confirmDeletePreVenda` ou o modal de detalhe fechar em ordem inesperada, a exclusao pode nao ocorrer, ocorrer sem clareza visual, ou a interface pode fechar antes de o usuario perceber o resultado.

### Navegacao

Classificacao: alteracao pequena.

Foi identificado um pequeno ajuste:

```jsx
key={id}
```

Esse ajuste parece relacionado a item de navegacao/menu e nao parece ser a alteracao principal.

### Outras areas

Nao foram identificadas alteracoes diretas em Service Worker, cache, versionamento, Supabase, banco, `index.html`, `src/main.jsx`, `public/version.json`, `public/sw.js` ou `public/service-worker.js`.

## 5. Avaliacao de risco

Classificacao geral: risco alto antes de checkpoint.

Justificativa:

1. O diff e grande para uma tela operacional critica.
2. A area afetada e Pre-vendas, um fluxo usado em campo.
3. Ha novas regras de exibicao, filtro, paginacao e modal.
4. Ha remocao de uma confirmacao nativa de exclusao e substituicao por fluxo visual.
5. Nao foi executado build nesta etapa.
6. Nao foi feito teste manual nesta etapa.
7. A mudanca pode afetar a leitura e operacao tanto em mobile quanto em desktop dentro da tela de Pre-vendas.

Observacao: o risco alto aqui nao significa que a alteracao esteja errada. Significa que ela nao deve virar base oficial pre PWA sem validacao manual e decisao explicita.

## 6. Verificacao sobre desktop

Resposta: afeta desktop.

Justificativa por leitura:

O diff adiciona elementos visiveis na propria `TelaPreVendas()`, com classes responsivas como `lg:`, `md:` e `sm:`. Isso indica que a tela de Pre-vendas tera novos controles e modais tambem em desktop, nao apenas em mobile.

Exemplos identificados:

```jsx
lg:grid-cols-[1fr_auto]
md:max-h-[90vh]
md:w-[80vw]
lg:grid-cols-[1.35fr_0.65fr]
```

Conclusao: a alteracao parece afetar a experiencia desktop na tela de Pre-vendas. Nao ha indicio de alteracao geral em todo o desktop, mas a tela especifica de Pre-vendas muda visual e funcionalmente.

## 7. Verificacao sobre Service Worker, cache, versionamento, Supabase e banco

### Service Worker

Resposta: nao afeta Service Worker pelo diff de `src/App.jsx`.

Nao foram encontrados sinais de alteracao em:

```text
serviceWorker
sw.js
service-worker
```

### Cache

Resposta: nao afeta cache pelo diff de `src/App.jsx`.

Nao foram encontrados sinais de alteracao em:

```text
caches.open
caches.delete
Cache-Control
```

### Versionamento

Resposta: nao afeta versionamento pelo diff de `src/App.jsx`.

Nao foram encontrados sinais de alteracao em:

```text
APP_VERSION
MINI_ERP_VERSION
version.json
public/version
```

### Supabase

Resposta: nao altera configuracao de Supabase pelo diff de `src/App.jsx`.

Nao foram encontrados sinais de novas chamadas `supabase.from` ou alteracao de cliente Supabase no diff. Foi identificado apenas um falso positivo de busca por `from(` em:

```jsx
Array.from(preVendasDoDia.reduce(...))
```

Observacao: a funcao existente `excluirPreVenda(id)` continua sendo chamada, entao o fluxo operacional de exclusao ainda depende do comportamento Supabase ja existente, mas o diff nao cria nova tabela, nova query Supabase ou nova configuracao.

### Banco

Resposta: nao afeta banco pelo diff de `src/App.jsx`.

Nao ha SQL, migracao, schema, tabela nova ou alteracao estrutural de banco no diff auditado.

## 8. Sinais de implementacao PWA no diff

Resposta: nao ha sinais de implementacao PWA no diff de `src/App.jsx`.

Foram buscados sinais como:

```text
manifest
link rel manifest
theme_color
theme-color
display standalone
serviceWorker
sw.js
service-worker
cache novo
version.json
APP_VERSION
MINI_ERP_VERSION
```

Resultado: nenhum desses sinais apareceu como alteracao real no diff.

Conclusao: a alteracao local em `src/App.jsx` parece ser uma frente funcional de Pre-vendas, nao uma implementacao PWA.

## 9. Pontos de atencao sem correcao

### Risco de regressao

Pre-vendas e uma area critica. Como a alteracao adiciona controles, filtros, resumo e confirmacao visual, precisa ser validada com dados reais ou registros descartaveis antes de checkpoint.

### Risco de estado duplicado

Foram adicionados estados novos:

```text
dataFiltroPreVendas
paginaPreVendas
resumoDiaPreVendasAberto
confirmDeletePreVenda
```

O risco e baixo a medio, mas existe: estados de modal e paginacao precisam ser resetados no momento certo para nao deixar tela presa ou lista em pagina invalida.

### Risco de paginacao quebrar lista

Existe risco se:

1. A pagina atual ficar acima do total depois de filtro.
2. A lista filtrada ficar vazia.
3. O usuario mudar busca/data rapidamente.

O diff tenta mitigar parte disso com reset de pagina e `Math.min`, mas isso precisa de teste manual.

### Risco de exclusao nao funcionar

O risco existe porque a confirmacao saiu de dentro de `excluirPreVenda(id)` e foi movida para a interface. A exclusao ainda chama `excluirPreVenda(detalhe.id)`, mas precisa validar:

1. Cancelar nao exclui.
2. Excluir confirma e remove.
3. Erro do Supabase restaura lista.
4. Modal fecha corretamente.

### Risco de resumo calcular errado

O resumo soma itens, quantidades, pagamentos e valores. Pontos sensiveis:

1. Quantidade vazia vira minimo 1.
2. Produto sem nome vira "Produto".
3. Pagamento pode vir de `pagamento` ou de transcricao por voz.
4. Data usa `criadoEm || created_at`.

Esses pontos precisam de amostras reais para validar.

### Risco mobile

Ha modal de tela cheia, `fixed inset-0`, `z-[999]` e `z-[1000]`. Isso pode melhorar mobile, mas tambem pode gerar risco de scroll preso, botao fora da tela ou sobreposicao em iPhone se nao for testado.

### Risco desktop

A tela de Pre-vendas muda tambem em desktop. O risco nao e necessariamente global, mas existe alteracao visual e operacional na experiencia desktop dessa tela.

## 10. Conclusao objetiva

Essa alteracao em `src/App.jsx` pode ser considerada candidata a entrar no checkpoint pre PWA?

Resposta: depende.

Justificativa:

A alteracao parece coerente com uma melhoria localizada em Pre-vendas e nao mostra sinais de PWA, Service Worker, cache, versionamento, Supabase ou banco. Porem, ela e grande, toca fluxo critico e altera a experiencia desktop e mobile da tela de Pre-vendas.

Ela pode ser candidata ao checkpoint pre PWA somente se:

1. O usuario confirmar que essa frente de Pre-vendas e intencional.
2. A tela for testada manualmente.
3. A exclusao for validada com registro descartavel ou ambiente seguro.
4. A paginacao e filtro por data forem validados com volume real.
5. O resumo do dia for conferido contra dados conhecidos.
6. A decisao de incluir essa mudanca no checkpoint for explicita.

Sem esses passos, nao recomendo tratar essa alteracao como base oficial pre PWA.

## 11. Proximo passo recomendado, sem executar

Proximo passo recomendado: teste manual antes de backup e commit.

Sequencia sugerida, sem executar nesta etapa:

1. Testar Pre-vendas em desktop.
2. Testar Pre-vendas em mobile.
3. Conferir filtro por data.
4. Conferir paginacao com mais de 30 registros, se houver massa de dados.
5. Conferir resumo do dia com dados conhecidos.
6. Validar confirmacao de exclusao usando registro descartavel.
7. Se aprovado, fazer backup da base.
8. Depois do backup, criar commit de checkpoint pre PWA com escopo claro.
9. Somente depois iniciar a implementacao PWA minima.

Nao recomendo iniciar PWA antes da decisao sobre esta alteracao em `src/App.jsx`.

## 12. Confirmacao explicita de escopo

Nesta etapa:

1. Nao foi gerado codigo de aplicacao.
2. Nao foi corrigido codigo.
3. Nao foi formatado codigo.
4. Nao foi alterado `src/App.jsx`.
5. Nao foi alterado `index.html`.
6. Nao foi alterado `public/version.json`.
7. Nao foi alterado `src/main.jsx`.
8. Nao foi alterado `public/sw.js`.
9. Nao foi alterado `public/service-worker.js`.
10. Nao foi alterado cache.
11. Nao foi alterado versionamento.
12. Nao foi alterado Supabase.
13. Nao foi alterado banco.
14. Nao foi executado build.
15. Nao foi feito deploy.
16. Nao foi criado novo projeto.
17. Nao foi criada segunda base de codigo.
18. Nao foi implementado PWA.
19. Nao foi alterado desktop por esta etapa.
20. Nao foi implementado `manifest.json`.
21. Nao foi linkado manifest no `index.html`.
22. Nao foram alterados icones.

Confirmacao explicita: nada foi alterado alem da criacao deste arquivo `REVISAO_APPJS_PRE_PWA.md`.
