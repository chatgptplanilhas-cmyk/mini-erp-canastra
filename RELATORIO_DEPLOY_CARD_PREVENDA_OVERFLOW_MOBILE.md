# Relatorio de deploy - Card pre-venda overflow mobile

Data local: 2026-06-28 22:19 BRT

## Escopo

- Projeto Vercel: `mini-erp-canastra`
- Ajuste publicado: correcao de overflow horizontal real no card compacto mobile de pre-venda.
- Arquivo commitado: `src/App.jsx`

## Arquivos movidos para backup

Destino:

```text
C:\Users\Delber\Mini-ERP\backups\relatorios-pendentes
```

Itens movidos para fora do projeto antes do commit:

```text
RELATORIO_DEPLOY_CARD_COMPACTO_PREVENDA_MOBILE.md
RELATORIO_DEPLOY_CARD_PREVENDA_DUAS_COLUNAS.md
RELATORIO_DEPLOY_CARD_PREVENDA_FINAL_MOBILE.md
referencias/
```

## Estado inicial conferido

```text
 M src/App.jsx
?? RELATORIO_DEPLOY_CARD_COMPACTO_PREVENDA_MOBILE.md
?? RELATORIO_DEPLOY_CARD_PREVENDA_DUAS_COLUNAS.md
?? RELATORIO_DEPLOY_CARD_PREVENDA_FINAL_MOBILE.md
?? referencias/
```

Ultimos commits antes do novo commit:

```text
5b51d3e ajusta valor do card pre venda mobile
65d4e84 corrige card pre venda em duas colunas mobile
c6a8902 ajusta card compacto da pre venda mobile
271cde4 ajusta layout compacto da pre venda mobile
dfc44bb corrige logo transparente da tela de abertura
```

Depois de mover os nao rastreados:

```text
 M src/App.jsx
```

## Commit

- Hash curto: `0698e2e`
- Mensagem: `corrige overflow do card pre venda mobile`
- Arquivo commitado: `src/App.jsx`

Diff commitado:

```text
M src/App.jsx
```

## Build local

Comando:

```text
cmd /c npm.cmd run build
```

Resultado:

```text
vite v8.0.11 building client environment for production...
58 modules transformed.
dist/index.html                   0.99 kB
dist/assets/index-BF2-C6wu.css  354.03 kB
dist/assets/index-BjQFbL0o.js   755.11 kB
built in 1.96s
```

Observacao: houve apenas o aviso padrao do Vite sobre chunk acima de 500 kB.

## Deploy de producao

Comando:

```text
cmd /c npx.cmd --yes vercel@latest --prod
```

Resultado:

```text
Deployment ready
id: dpl_5iWpbSriDqC3DudK15JgjV6XVDmK
production: https://mini-erp-canastra-g0bisy9y7-delbervilaca-3693s-projects.vercel.app
alias: https://mini-erp-canastra.vercel.app
```

## Confirmacao Vercel

`vercel inspect`:

```text
id     dpl_5iWpbSriDqC3DudK15JgjV6XVDmK
name   mini-erp-canastra
target production
status Ready
url    https://mini-erp-canastra-g0bisy9y7-delbervilaca-3693s-projects.vercel.app
alias  https://mini-erp-canastra.vercel.app
```

## Validacao de producao

URL oficial:

```text
https://mini-erp-canastra.vercel.app
```

Resposta HTTP:

```text
HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0
Content-Type: text/html; charset=utf-8
Server: Vercel
X-Vercel-Cache: HIT
```

HTML oficial publicado:

```text
/assets/index-Cxm0bPuL.js
/assets/index-BhHKbhGz.css
/mini-erp-boot-blackbox.js
```

`version.json`:

```json
{
  "version": "2026.06.24.03",
  "label": "Mini ERP v2026.06.24.03"
}
```

Trecho validado no bundle de producao:

```text
className:`${d} min-w-0 max-w-full box-border overflow-hidden`
className:`grid w-full max-w-full items-start gap-x-1.5 overflow-hidden ${l?`opacity-90`:``}`
style:{gridTemplateColumns:`minmax(0, 1fr) auto`}
children:J(e.total)
```

Confirmacao funcional do card:

- Card limitado a 100% da largura disponivel.
- Grid interno usa duas colunas reais: esquerda flexivel e direita automatica.
- Coluna esquerda permanece `min-w-0` para truncar quando necessario.
- Coluna direita permanece alinhada a direita, sem pagamento e sem botoes.
- Valor permanece sem a palavra `Total`.
- Toque no card continua chamando o mesmo detalhe da pre-venda.

## Garantias

- Relatorios antigos foram movidos para backup antes do commit.
- `referencias/` foi movida para backup antes do commit.
- Apenas `src/App.jsx` foi commitado.
- Nao houve alteracao de Supabase, banco, parser, manifest, Service Worker, cache ou versionamento.
- Nao houve `git push`.

