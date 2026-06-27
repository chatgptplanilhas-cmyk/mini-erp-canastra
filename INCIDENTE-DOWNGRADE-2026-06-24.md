# INCIDENTE DOWNGRADE 2026 06 24

## Projeto

Mini ERP Queijos Serra da Canastra

Domínio oficial:

https://mini-erp-canastra.vercel.app

Versão correta validada:

2026.06.24.03

## Sintoma

Em determinadas condições de uso no iPhone em 4G, o sistema abriu uma interface antiga.

A interface antiga exibia a navegação:

Painel | Vendas | Delivery | Pendências

A interface correta deveria exibir:

Pré-venda | Clientes | Cobranças | Delivery

Também foi observado que a página diagnostico-emergencia.html retornava 404, enquanto version.json continuava apontando a versão nova.

## Causa raiz confirmada

A Vercel estava publicando a aplicação a partir de um commit remoto antigo do GitHub.

Os arquivos corretos existiam na máquina local, mas não estavam no commit remoto usado pela Vercel.

Arquivos críticos que não estavam publicados no commit remoto antigo:

public/version.json
public/sw.js
public/service-worker.js
public/diagnostico-emergencia.html
public/mini-erp-boot-blackbox.js
vercel.json

## Correção aplicada

Foi feito commit controlado apenas dos arquivos necessários, depois rebase sobre origin/main e push simples para o GitHub.

Commit final enviado:

a1b6edb Corrige publicacao da versao 2026.06.24.03

A Vercel publicou automaticamente o novo deploy a partir do GitHub.

## Validação final

Produção validada com sucesso.

Arquivos públicos retornaram 200:

/
index.html
version.json
sw.js
service-worker.js
diagnostico-emergencia.html
mini-erp-boot-blackbox.js

version.json confirmou:

2026.06.24.03

diagnostico-emergencia.html abriu corretamente no iPhone em 4G e confirmou:

Versão esperada: 2026.06.24.03
Versão publicada: 2026.06.24.03

O sistema normal abriu com a barra inferior correta:

Pré-venda | Clientes | Cobranças | Delivery

## Regra para próximos incidentes

Não corrigir por intuição.

Primeiro provar a divergência entre local, dist, GitHub, Vercel e domínio final.

Antes de publicar, confirmar que os arquivos críticos estão rastreados pelo Git, commitados e enviados ao GitHub.

Não fazer deploy manual para contornar problema de GitHub.

O fluxo correto é:

alteração local conferida
commit seletivo
push para GitHub
deploy automático da Vercel
validação em produção
teste real no iPhone em 4G
