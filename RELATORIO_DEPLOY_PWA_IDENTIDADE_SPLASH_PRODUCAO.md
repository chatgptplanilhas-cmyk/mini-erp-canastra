# Relatorio de deploy PWA com identidade visual e tela de abertura oficial

## 1. Data e hora

2026-06-28 03:54:10 -03:00

## 2. Pasta usada

`C:\Users\Delber\Mini-ERP\projeto`

## 3. Estado do Git antes do deploy

`git status --short` nao retornou arquivos modificados ou nao rastreados.

## 4. Ultimos dez commits

```text
b92fca0 implementa tela de abertura oficial do pwa
a5d28a4 aplica identidade visual oficial do pwa
1398eab documenta teste operacional vercel cli
9466805 documenta diagnostico vercel pre deploy
917faff documenta preparacao deploy pwa
c4524bd documenta backup pos pwa local
9dad8a6 documenta auditoria pwa minimo
3674478 implementa pwa minimo local
dc568f5 documenta plano pwa minimo
1254bf9 documenta checkpoint pre pwa
```

## 5. Confirmacao do commit mais recente

Commit mais recente confirmado: `b92fca0 implementa tela de abertura oficial do pwa`.

## 6. Resultado do build final

Comando executado:

```text
cmd /c npm.cmd run build
```

Resultado: aprovado.

Arquivos gerados pelo build local:

```text
dist/index.html
dist/assets/index-CMUYd9Z-.css
dist/assets/index-Dnfqv2XD.js
```

Observacao: Vite emitiu apenas o aviso conhecido de chunk maior que 500 kB.

## 7. Comando de deploy executado

```text
cmd /c npx.cmd --yes vercel@latest --prod
```

## 8. URL do deploy gerado

```text
https://mini-erp-canastra-acyhqgef0-delbervilaca-3693s-projects.vercel.app
```

Inspect URL exibida pela Vercel:

```text
https://vercel.com/delbervilaca-3693s-projects/mini-erp-canastra/Hagz4ruJ2Rvx4WarG6QzeiVhkCg5
```

Deployment id confirmado por `vercel inspect`:

```text
dpl_Hagz4ruJ2Rvx4WarG6QzeiVhkCg5
```

Status confirmado:

```text
Ready
```

## 9. Confirmacao do dominio oficial

Dominio oficial validado:

```text
https://mini-erp-canastra.vercel.app
```

`vercel inspect` confirmou o alias oficial apontando para:

```text
https://mini-erp-canastra-acyhqgef0-delbervilaca-3693s-projects.vercel.app
```

## 10. Resultado da validacao da pagina principal

```text
/           200 text/html; charset=utf-8
/index.html 200 text/html; charset=utf-8
```

Bundles ativos no `index.html` de producao:

```text
/assets/index-BKw7DSCC.js
/assets/index-C37Upil5.css
/mini-erp-boot-blackbox.js
```

## 11. Resultado da validacao de /manifest.json

```text
/manifest.json 200 application/json; charset=utf-8
```

## 12. Confirmacao de name e short_name em producao

Manifest de producao contem:

```json
{
  "name": "ERP Queijos Serra da Canastra",
  "short_name": "ERP Canastra"
}
```

## 13. Resultado da validacao dos tres icones oficiais novos em /pwa/

```text
/pwa/icon-192.png          200 image/png
/pwa/icon-512.png          200 image/png
/pwa/icon-maskable-512.png 200 image/png
```

Manifest de producao aponta para:

```text
/pwa/icon-192.png
/pwa/icon-512.png
/pwa/icon-maskable-512.png
```

## 14. Resultado da validacao dos assets da tela de abertura em /brand/

```text
/brand/logo-queijos-serra-da-canastra.png  200 image/png
/brand/fundo-madeira-canastra.png          200 image/png
```

Validacao de conteudo dos bundles ativos:

```text
/assets/index-BKw7DSCC.js  contem /brand/logo-queijos-serra-da-canastra.png, mini-pwa-splash e ERP Canastra
/assets/index-C37Upil5.css contem /brand/fundo-madeira-canastra.png e mini-pwa-splash
```

## 15. Resultado diagnostico dos tres caminhos antigos de icone

```text
/pwa-icon-192.png       200 image/png
/pwa-icon-512.png       200 image/png
/pwa-maskable-512.png   200 image/png
```

Observacao: esses caminhos antigos ainda carregarem nao e erro, pois o manifest final nao aponta para eles.

## 16. Resultado da validacao de /version.json

```text
/version.json 200 application/json; charset=utf-8
```

Conteudo validado:

```json
{
  "version": "2026.06.24.03",
  "label": "Mini ERP v2026.06.24.03"
}
```

## 17. Resultado da validacao de /sw.js

```text
/sw.js 200 application/javascript; charset=utf-8
```

Marcadores validados:

```text
const MINI_ERP_VERSION = '2026.06.24.03'
const MINI_ERP_CACHE_NAME = `mini-erp-app-${MINI_ERP_VERSION}`
const MINI_ERP_CACHE_PREFIX = 'mini-erp-app-'
```

## 18. Resultado da validacao de /service-worker.js

```text
/service-worker.js 200 application/javascript; charset=utf-8
```

Marcadores validados:

```text
const MINI_ERP_VERSION = '2026.06.24.03'
const MINI_ERP_CACHE_NAME = `mini-erp-app-${MINI_ERP_VERSION}`
const MINI_ERP_CACHE_PREFIX = 'mini-erp-app-'
```

## 19. Confirmacao de que Service Worker nao foi alterado localmente

Confirmado. Nenhum arquivo de Service Worker foi alterado nesta etapa.

Arquivos preservados:

```text
public/sw.js
public/service-worker.js
```

## 20. Confirmacao de que cache nao foi alterado localmente

Confirmado. Nenhuma regra de cache foi alterada localmente nesta etapa.

## 21. Confirmacao de que versionamento nao foi alterado localmente

Confirmado. O versionamento permaneceu `2026.06.24.03`.

Arquivo preservado:

```text
public/version.json
```

## 22. Confirmacao de que Supabase nao foi alterado

Confirmado. Nenhuma configuracao ou chamada de Supabase foi alterada nesta etapa.

## 23. Confirmacao de que banco nao foi alterado

Confirmado. Nenhuma operacao de banco foi executada nesta etapa.

## 24. Confirmacao de que nao houve git push

Confirmado. Nao foi executado `git push`.

## 25. Estado do Git apos o deploy

Antes da criacao deste relatorio, `git status --short` estava limpo.

Apos a criacao deste relatorio, o estado esperado e:

```text
?? RELATORIO_DEPLOY_PWA_IDENTIDADE_SPLASH_PRODUCAO.md
```

## 26. Conclusao

Deploy aprovado.

Ressalva operacional: recomenda-se teste manual em navegadores reais para validar instalacao PWA, splash visual e atualizacao local de cache/Service Worker em dispositivos ja instalados.

## 27. Proximo passo recomendado

Teste manual em producao no desktop, Chrome mobile e Safari/iPhone:

```text
https://mini-erp-canastra.vercel.app
```

