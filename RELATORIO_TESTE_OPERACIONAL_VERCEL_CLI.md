# Relatorio de Teste Operacional do Vercel CLI

## 1. Data e hora

2026-06-27 16:05:24 -03:00

## 2. Pasta auditada

`C:\Users\Delber\Mini-ERP\projeto`

Topo Git confirmado:

`C:/Users/Delber/Mini-ERP/projeto`

## 3. Estado do Git

Antes da criacao deste relatorio, `git status --short` nao retornou arquivos pendentes.

Estado: limpo.

## 4. Ultimos oito commits

```text
9466805 documenta diagnostico vercel pre deploy
917faff documenta preparacao deploy pwa
c4524bd documenta backup pos pwa local
9dad8a6 documenta auditoria pwa minimo
3674478 implementa pwa minimo local
dc568f5 documenta plano pwa minimo
1254bf9 documenta checkpoint pre pwa
a09b051 checkpoint pre pwa 2026.06.24.03 prevendas aprovadas
```

## 5. Resultado de `node --version`

```text
v24.15.0
```

## 6. Resultado de `cmd /c npm.cmd --version`

```text
11.12.1
```

## 7. Resultado de `cmd /c npx.cmd --version`

```text
11.12.1
```

## 8. Resultado de `cmd /c npx.cmd --yes vercel@latest --version`

Primeira tentativa dentro do sandbox:

```text
npm error code EACCES
npm error FetchError: request to https://registry.npmjs.org/vercel failed
npm error Log files were not written due to an error writing to the directory: C:\Users\Delber\AppData\Local\npm-cache\_logs
```

Segunda tentativa com permissao elevada, usando o mesmo comando autorizado:

```text
54.18.0
npm warn deprecated stream-to-promise@2.2.0: Deprecated. Use node:stream/promises and node:stream/consumers instead.
npm warn deprecated tar@7.5.7: Old versions of tar are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version.
Vercel CLI 54.18.0
```

Resultado: Vercel CLI respondeu via `npx.cmd`.

Versao confirmada: `54.18.0`

## 9. Conteudo seguro de `.vercel\repo.json`

A pasta `.vercel` existe e contem:

```text
README.txt
repo.json
```

Conteudo de `.vercel\repo.json`:

```json
{
  "remoteName": "origin",
  "projects": [
    {
      "id": "prj_R2s3ysVNaj8y7XD3YWylpPz76reF",
      "name": "mini-erp-canastra",
      "directory": ".",
      "orgId": "team_b0BHlVTwK5g5eVTPTwPCx9gb"
    }
  ]
}
```

Resumo: a configuracao local aponta para o projeto Vercel `mini-erp-canastra`, no diretorio raiz `.`.

## 10. Conclusao

Resultado: Vercel CLI operacional via npx.

Justificativa: `node`, `npm.cmd` e `npx.cmd` responderam corretamente. O comando `cmd /c npx.cmd --yes vercel@latest --version` confirmou o Vercel CLI `54.18.0` quando executado com permissao suficiente para acessar registry/cache. Nenhum comando de deploy foi executado.

## 11. Proximo passo recomendado

Se autorizado em etapa separada, preparar comando de deploy com aprovacao explicita do usuario, mantendo a validacao de Git limpo antes da publicacao e sem alterar Service Worker, cache, versionamento, Supabase ou banco.

## 12. Confirmacao de deploy

Nao houve deploy.

Nao foram executados:

- `vercel --prod`
- `vercel deploy`
- `vercel`
- `npx vercel`
- `cmd /c npx vercel`
- `vercel alias`
- `vercel link`

Foi executado apenas o comando de versao autorizado:

`cmd /c npx.cmd --yes vercel@latest --version`

## 13. Confirmacao de push

Nao houve push.

## 14. Confirmacao final

Nada foi alterado no projeto alem da criacao deste relatorio.
