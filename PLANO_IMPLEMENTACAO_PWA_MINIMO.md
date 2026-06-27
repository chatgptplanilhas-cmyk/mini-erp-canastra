# PLANO IMPLEMENTACAO PWA MINIMO

Projeto: Mini ERP Queijos Serra da Canastra
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
Dominio oficial: https://mini-erp-canastra.vercel.app
Versao estavel de referencia: 2026.06.24.03

Checkpoint pre PWA:

```text
a09b051 checkpoint pre pwa 2026.06.24.03 prevendas aprovadas
1254bf9 documenta checkpoint pre pwa
```

Estado declarado antes desta frente:

```text
Git limpo
Backup pre PWA criado
Pre-vendas aprovadas
PWA ainda nao iniciado
Sem push
Sem deploy
```

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

## 2. Confirmacao do Git limpo antes da frente PWA

Comando consultado:

```powershell
git status --short
```

Resultado antes da criacao deste plano:

```text

```

Interpretacao: o Git estava limpo antes da criacao de `PLANO_IMPLEMENTACAO_PWA_MINIMO.md`.

Ultimos commits conferidos:

```text
1254bf9 documenta checkpoint pre pwa
a09b051 checkpoint pre pwa 2026.06.24.03 prevendas aprovadas
```

Observacao: apos a criacao deste plano, `PLANO_IMPLEMENTACAO_PWA_MINIMO.md` passa a aparecer como arquivo nao rastreado ate uma decisao futura do usuario.

## 3. Estado atual dos arquivos relacionados ao PWA

### index.html

Arquivo consultado:

```text
index.html
```

Trechos relevantes:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>mini-erp-canastra</title>
<script src="/mini-erp-boot-blackbox.js"></script>
<script type="module" src="/src/main.jsx"></script>
```

Estado atual:

- Existe favicon.
- Existe viewport.
- Nao existe `link rel="manifest"`.
- Nao existe `meta name="theme-color"`.
- Nao existe meta tag Apple/mobile especifica.
- Nao ha implementacao PWA no HTML de entrada.

### public

Arquivos encontrados em `public`:

```text
diagnostico-emergencia.html
favicon.svg
icons.svg
mini-erp-boot-blackbox.js
service-worker.js
sw.js
version.json
```

Estado atual:

- `public` contem arquivos sensiveis de diagnostico, versionamento e Service Worker.
- `public` nao contem `manifest.json`.
- `public` nao contem conjunto claro de icones PWA 192x192 e 512x512.

### public/favicon.svg

Arquivo encontrado:

```text
public/favicon.svg
```

Metadados observados:

```text
width="48"
height="46"
viewBox="0 0 48 46"
```

Hash SHA256:

```text
61BC9A161DE58248288E6905425D7180F0624C2865007B97D763FDAC12043A66
```

Analise:

O arquivo serve como favicon atual, mas nao deve ser tratado automaticamente como pacote completo de icones PWA. Para instalacao, normalmente e mais seguro ter icones dedicados em tamanhos como 192x192 e 512x512, preferencialmente com versao maskable quando adequado.

### public/icons.svg

Arquivo encontrado:

```text
public/icons.svg
```

Metadados observados:

```text
<svg xmlns="http://www.w3.org/2000/svg">
<symbol id="bluesky-icon" viewBox="0 0 16 17">
<symbol id="discord-icon" viewBox="0 0 20 19">
<symbol id="documentation-icon" ...>
<symbol id="github-icon" ...>
```

Hash SHA256:

```text
B45FA506195CFCDEF406BA9F0C77B36DDC1A7C224040926EC70ABC2FDEA7B93A
```

Analise:

O arquivo parece ser um sprite de icones/simbolos, nao um icone PWA instalavel. Nao deve ser usado automaticamente como icone de app sem validacao visual.

### public/manifest.json

Resultado:

```text
Nao existe.
```

### dist/manifest.json

Resultado:

```text
Nao existe.
```

Observacao: `dist` nao deve orientar a implementacao sem novo build autorizado. Nesta etapa nao foi rodado build.

### vercel.json

Arquivo consultado:

```text
vercel.json
```

Trechos relevantes:

```json
{
  "source": "/manifest.json",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    }
  ]
}
```

Tambem existem regras `no-store` para:

```text
/sw.js
/service-worker.js
/version.json
/index.html
/
```

E regra longa para:

```text
/assets/(.*) -> public, max-age=31536000, immutable
```

Estado atual:

- `vercel.json` ja contempla `/manifest.json`.
- Isso reduz a necessidade de alterar `vercel.json` na primeira implementacao.
- Qualquer alteracao futura em `vercel.json` deve exigir justificativa forte.

### public/sw.js

Arquivo encontrado:

```text
public/sw.js
```

Hash SHA256:

```text
8D6D7F5312ECF3153F167E86E81880060C60F1F8FB27C43ED2AD154A97BFEC63
```

Estado atual:

- Service Worker ativo e sensivel.
- Nao deve ser alterado na implementacao PWA minima.

### public/service-worker.js

Arquivo encontrado:

```text
public/service-worker.js
```

Hash SHA256:

```text
8D6D7F5312ECF3153F167E86E81880060C60F1F8FB27C43ED2AD154A97BFEC63
```

Estado atual:

- Conteudo tem o mesmo hash de `public/sw.js`.
- Nao deve ser alterado na implementacao PWA minima.

### src/main.jsx

Arquivo consultado:

```text
src/main.jsx
```

Trechos relevantes:

```jsx
const MINI_ERP_BOOT_VERSION = '2026.06.24.03'
const MINI_ERP_HIGHEST_VERSION_KEY = 'miniErpHighestAcceptedVersion'
```

```jsx
await navigator.serviceWorker.register('/sw.js?v=' + encodeURIComponent(MINI_ERP_BOOT_VERSION), {
  scope: '/',
  updateViaCache: 'none',
})
```

```jsx
window.localStorage.setItem('miniErpCacheShieldVersion', MINI_ERP_BOOT_VERSION)
```

Hash SHA256:

```text
636DD6CD3BC4B8F568E17C5B905014683EBC02D5361B6030BBD8895F0E3BBE42
```

Estado atual:

- `src/main.jsx` registra o Service Worker atual.
- Tambem participa da protecao contra downgrade.
- Nao deve ser alterado na implementacao PWA minima.

## 4. O que falta para o Mini ERP ser instalavel como PWA

Itens minimos ausentes ou incompletos:

1. `public/manifest.json`.
2. `link rel="manifest"` no `index.html`.
3. Icones PWA compativeis.
4. `theme_color`.
5. `background_color`.
6. `display: "standalone"`.
7. `name`.
8. `short_name`.
9. `start_url`.
10. `scope`.

Campos recomendados para o futuro `manifest.json`:

```json
{
  "name": "Mini ERP Canastra",
  "short_name": "Mini ERP",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "theme_color": "#15110f",
  "background_color": "#15110f",
  "icons": []
}
```

Observacao: o exemplo acima e apenas direcao tecnica para planejamento. Nao foi criado arquivo nesta etapa.

## 5. Proposta de implementacao minima segura

Proposta para etapa futura, somente apos autorizacao explicita:

1. Criar `public/manifest.json`.
2. Linkar o manifest no `index.html`.
3. Adicionar `meta name="theme-color"` no `index.html`, se aprovado.
4. Avaliar os icones existentes:
   - `favicon.svg` pode continuar como favicon.
   - `icons.svg` nao parece adequado como icone PWA principal.
5. Criar icones PWA dedicados em `public`, sem apagar ou substituir os atuais.
6. Preservar identidade visual do Mini ERP, sem usar imagens do Catalogo.
7. Manter `start_url` e `scope` em `/` para o mesmo dominio.
8. Manter `display` como `standalone`.
9. Nao alterar Service Worker, cache ou versionamento.
10. Nao alterar desktop funcional.

Escopo minimo recomendado:

```text
public/manifest.json
index.html
public/icon-192.png ou equivalente aprovado
public/icon-512.png ou equivalente aprovado
public/icon-maskable-512.png se aprovado
```

## 6. Arquivos que poderiam ser alterados numa futura etapa

Arquivos candidatos para implementacao minima PWA:

```text
public/manifest.json
index.html
public/<icone-pwa-192>
public/<icone-pwa-512>
public/<icone-pwa-maskable>
```

Observacao:

Se os icones forem gerados em PNG, a alteracao deve ficar limitada a novos arquivos dentro de `public`. Evitar substituir `favicon.svg` ou `icons.svg` sem necessidade.

## 7. Arquivos que nao podem ser alterados nesta primeira implementacao

Nao alterar na primeira implementacao PWA:

```text
public/sw.js
public/service-worker.js
src/main.jsx
public/version.json
src/App.jsx
src/index.css
src/lib/supabase.js
package.json
package-lock.json
vite.config.js
Supabase
banco
```

`vercel.json`:

```text
Nao alterar, salvo justificativa muito forte.
```

Justificativa:

`vercel.json` ja possui regra de headers para `/manifest.json`, entao a implementacao minima provavelmente nao precisa mexer nele.

## 8. Riscos tecnicos

### Risco de cache

Mesmo sem alterar cache, PWA envolve instalacao e manifest. Se o navegador ou app instalado mantiver estado antigo, pode parecer que a implementacao falhou.

Mitigacao:

- Manter `manifest.json` com `no-store`, ja previsto no `vercel.json`.
- Validar em aba comum e, quando possivel, em contexto limpo.
- Nao alterar regras de cache na primeira implementacao.

### Risco de Service Worker

O Service Worker atual ja participa de cache, atualizacao e protecao contra downgrade.

Mitigacao:

- Nao alterar `public/sw.js`.
- Nao alterar `public/service-worker.js`.
- Nao alterar registro em `src/main.jsx`.

### Risco de downgrade

Historico do projeto exige cuidado com versao, cache e SW.

Mitigacao:

- Nao alterar `public/version.json`.
- Nao alterar constantes de versao.
- Conferir Diagnostico depois da implementacao futura.

### Risco de afetar desktop

Adicionar manifest em si nao deveria mudar desktop, mas alterar `index.html` sempre afeta a entrada do app.

Mitigacao:

- Alterar apenas metadados no `head`.
- Nao alterar estrutura do `body`.
- Nao alterar CSS ou React.
- Comparar desktop antes/depois.

### Risco de icones ruins

Icones pequenos, cortados, com fundo ruim ou sem area segura podem prejudicar a instalacao e a aparencia do app.

Mitigacao:

- Criar icones dedicados.
- Conferir visual em 192x192 e 512x512.
- Usar fundo coerente com a identidade do Mini ERP.

### Risco de instalacao nao aparecer no iPhone

iOS/Safari pode ter criterios e comportamento diferentes de Chrome. O fluxo pode depender de "Adicionar a Tela de Inicio" e nao exibir prompt automatico.

Mitigacao:

- Validar em Safari/iPhone.
- Confirmar abertura em tela cheia apos adicionar a tela inicial.
- Nao concluir falha apenas por ausencia de prompt automatico.

### Risco de instalacao nao aparecer no Chrome

Chrome pode nao exibir instalacao se manifest, icones, escopo ou SW estiverem inconsistentes.

Mitigacao:

- Validar manifest em DevTools/Application.
- Confirmar `start_url`, `scope`, `display` e icones.
- Confirmar que o Service Worker existente segue registrado.

## 9. Estrategia de validacao apos implementacao futura

Quando a implementacao minima for autorizada e aplicada, validar:

1. Rodar `npm run build` ou `cmd /c npm.cmd run build` se o PowerShell bloquear.
2. Testar local desktop.
3. Testar local mobile ou viewport mobile.
4. Abrir Diagnostico do Sistema.
5. Confirmar versao `2026.06.24.03` se versionamento nao for alterado.
6. Confirmar que Service Worker continua disponivel.
7. Confirmar que Service Worker continua controlando quando aplicavel.
8. Verificar que `public/sw.js` e `public/service-worker.js` nao mudaram.
9. Verificar que `public/version.json` nao mudou.
10. Verificar manifest no navegador.
11. Confirmar `name`, `short_name`, `start_url`, `scope`, `display`, `theme_color` e icones.
12. Confirmar que desktop continua igual visual e funcionalmente.
13. Confirmar que Pre-vendas continua funcionando.
14. Confirmar que Supabase continua carregando dados.
15. Confirmar que instalacao aparece ou que o navegador reconhece o app como instalavel.
16. Testar iPhone/Safari quando possivel.
17. Testar Chrome mobile quando possivel.
18. Somente depois discutir deploy.

## 10. Conclusao

A implementacao minima PWA pode ser feita com seguranca?

Resposta: depende.

Justificativa:

Sim, a implementacao minima parece tecnicamente viavel e de baixo impacto se ficar limitada a:

```text
public/manifest.json
index.html
novos arquivos de icone dentro de public
```

Porem, a seguranca depende de manter os limites:

```text
Nao alterar Service Worker.
Nao alterar cache.
Nao alterar versionamento.
Nao alterar Supabase.
Nao alterar banco.
Nao alterar src/App.jsx.
Nao alterar src/main.jsx.
Nao alterar desktop funcional.
```

Como `vercel.json` ja tem regra para `/manifest.json`, a primeira implementacao nao parece exigir mudanca nele.

## 11. Proximo passo recomendado, sem executar

Proximo passo recomendado:

```text
Gerar comando de implementacao minima somente depois da aprovacao do usuario.
```

O comando futuro deve autorizar explicitamente:

1. Criar `public/manifest.json`.
2. Adicionar link do manifest no `index.html`.
3. Criar ou adicionar icones PWA dedicados dentro de `public`.
4. Rodar build.
5. Validar localmente.

E deve continuar proibindo:

1. Alterar Service Worker.
2. Alterar cache.
3. Alterar versionamento.
4. Alterar Supabase.
5. Alterar banco.
6. Alterar desktop funcional.
7. Fazer deploy sem nova autorizacao.
8. Fazer push sem nova autorizacao.

## 12. Confirmacao explicita de escopo

Nesta etapa:

```text
Nada foi alterado alem da criacao deste arquivo PLANO_IMPLEMENTACAO_PWA_MINIMO.md.
```

Nao foi feito:

```text
codigo de aplicacao
alteracao em index.html
criacao de manifest.json
criacao de icones
alteracao em src/App.jsx
alteracao em src/main.jsx
alteracao em public/version.json
alteracao em public/sw.js
alteracao em public/service-worker.js
alteracao de cache
alteracao de versionamento
alteracao de Supabase
alteracao de banco
build
deploy
push
novo projeto
segunda base de codigo
implementacao PWA
alteracao de desktop
```
