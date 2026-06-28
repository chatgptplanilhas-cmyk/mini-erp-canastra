# MINI ERP - QUEIJOS SERRA DA CANASTRA

## LEITURA OBRIGATORIA

Este documento deve ser lido integralmente antes de qualquer auditoria, alteracao, correcao, refinamento ou publicacao.

Este projeto esta em producao e e utilizado diariamente em campo.

O objetivo principal e preservar a estabilidade do sistema.

---

# ESTADO ATUAL OFICIAL

O Mini ERP PWA esta publicado em producao e funcionando.

Estado confirmado em 28/06/2026:

- Producao funcionando no dominio oficial.
- Deploy PWA aprovado e documentado.
- Git local limpo apos push.
- GitHub sincronizado com `origin/main`.
- Sem commits a frente ou atras de `origin/main`.
- Push normal concluido com sucesso, sem `push --force`.
- Backup pos producao aprovado criado fora da pasta do projeto.

Ultimo commit conhecido apos rebase e push:

```text
7a2b075 documenta deploy pwa com identidade visual e splash
```

Relatorio oficial de deploy:

```text
RELATORIO_DEPLOY_PWA_IDENTIDADE_SPLASH_PRODUCAO.md
```

Backup oficial pos producao aprovado:

```text
C:\Users\Delber\Mini-ERP\BACKUP-MINI-ERP-2026-06-24-03-PWA-PRODUCAO-APROVADO.zip
```

---

# DADOS PRINCIPAIS

Projeto local oficial:

```text
C:\Users\Delber\Mini-ERP\projeto
```

Dominio oficial:

```text
https://mini-erp-canastra.vercel.app
```

Repositorio remoto:

```text
origin https://github.com/chatgptplanilhas-cmyk/mini-erp-canastra.git
```

Branch oficial:

```text
main
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

Manifest em producao aprovado:

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

Assets da tela de abertura em producao:

```text
/brand/logo-queijos-serra-da-canastra.png
/brand/fundo-madeira-canastra.png
```

Tela de abertura oficial:

- Implementada em `src/App.jsx` e `src/index.css`.
- Usa o logo completo Queijos Serra da Canastra sobre fundo de madeira.
- Texto discreto: `ERP Canastra`.
- E uma tela visual dentro do React, nao uma splash nativa do sistema operacional.

---

# OBJETIVO DO PROJETO

O Mini ERP e um sistema proprio utilizado para administrar a operacao da Queijos Serra da Canastra.

Ele concentra:

- Clientes
- Pre-vendas
- Vendas
- Delivery
- Cobrancas
- Financeiro
- Relatorios
- Produtos

O sistema possui sincronizacao com Supabase, e publicado na Vercel e agora tambem funciona como PWA instalavel dentro do mesmo projeto.

O projeto evolui por refinamentos pequenos e controlados.

Nunca realizar grandes alteracoes sem autorizacao.

---

# FUNCIONALIDADES ESTAVEIS

- Clientes
- Pre-vendas
- Vendas
- Delivery
- Cobrancas
- Financeiro
- Relatorios
- Produtos
- Sincronizacao Supabase
- Atualizacao automatica
- Deploy Vercel
- PWA instalavel
- Identidade visual oficial do PWA
- Tela de abertura oficial do PWA

---

# REFINAMENTOS JA IMPLEMENTADOS

Pre-vendas:

- confirmacao antes de excluir;
- paginacao;
- filtro por data;
- resumo por data;
- conferencia consolidada dos produtos;
- referencia do cliente;
- horario da pre-venda;
- quantidade dos itens;
- forma de pagamento;
- total por cliente;
- modal corrigido;
- botao "Copiar resumo" removido por decisao de projeto.

PWA:

- PWA minimo implementado;
- manifest aprovado;
- icones oficiais aplicados;
- nome do app aprovado;
- tela de abertura oficial aplicada;
- deploy de producao aprovado;
- relatorio de deploy criado;
- backup pos producao aprovado criado fora da pasta do projeto;
- rebase controlado com `origin/main` concluido;
- push normal para GitHub concluido.

---

# REGRAS PERMANENTES

Nunca alterar sem autorizacao explicita:

- Service Worker
- Cache
- Versionamento
- Supabase
- Sincronizacao
- Estrutura do banco
- Deploy
- Arquitetura geral
- Manifest PWA
- Icones oficiais do PWA
- `public/version.json`
- `public/sw.js`
- `public/service-worker.js`
- `vercel.json`

---

# PRINCIPAL LICAO DO PROJETO

O Mini ERP sofreu um incidente grave de downgrade.

A causa envolveu:

- Service Worker
- Cache
- Versionamento
- Atualizacao da aplicacao

Por isso:

Nunca modificar essas areas durante refinamentos comuns.

Antes de qualquer novo refinamento:

1. Auditar o estado atual.
2. Confirmar `git status --short`.
3. Confirmar os ultimos commits.
4. Rodar build.
5. Preservar checkpoint ou backup quando a mudanca tiver risco.
6. So entao alterar o menor conjunto possivel de arquivos.

---

# PROCEDIMENTO OFICIAL DE TRABALHO

1. Confirmar a pasta oficial do projeto.
2. Confirmar estado do Git.
3. Auditar somente o necessario.
4. Implementar apenas o refinamento solicitado.
5. Rodar build.
6. Validar localmente.
7. Somente depois realizar deploy, se houver autorizacao explicita.
8. Apos validacao em producao, criar backup quando aplicavel.
9. Documentar a etapa.

---

# MODOS DE TRABALHO

## Auditoria Completa

Usar apenas quando houver:

- nova versao;
- problema de atualizacao;
- problema de cache;
- problema de Service Worker;
- mudanca estrutural;
- nova arquitetura;
- suspeita de divergencia entre local, GitHub e producao.

## Refinamento Localizado

Utilizar para:

- ajustes visuais;
- melhorias de UX;
- novos botoes;
- paginacao;
- filtros;
- modais;
- mensagens;
- pequenos recursos.

Nao percorrer o projeto inteiro.

Nao refatorar.

---

# BUILD

Sempre executar:

```text
npm run build
```

ou, no Windows quando necessario:

```text
cmd /c npm.cmd run build
```

---

# DEPLOY

Somente apos:

1. Build aprovado.
2. Testes aprovados.
3. Validacao concluida.
4. Autorizacao explicita.
5. Confirmacao do projeto Vercel oficial.

Nao executar `vercel --prod` sem autorizacao expressa.

---

# BACKUPS

Sempre manter:

- ultima versao estavel;
- versao imediatamente anterior;
- backup aprovado em campo;
- backup pos producao aprovado.

Nunca sobrescrever backups historicos.

---

# PROXIMAS EVOLUCOES RECOMENDADAS

Abrir uma frente por vez:

1. Teste de campo do PWA em desktop, Chrome mobile e Safari/iPhone.
2. Seguranca com Face ID, digital ou PIN via Passkey/WebAuthn.
3. Recibos e comprovantes bonitos.
4. Modo offline mais forte.
5. Refinamentos operacionais pequenos e isolados.

---

# O QUE NUNCA FAZER

Nunca iniciar alteracoes diretamente.

Nunca publicar sem validacao.

Nunca modificar Service Worker sem necessidade.

Nunca alterar cache durante refinamentos simples.

Nunca alterar versao sem autorizacao.

Nunca refatorar fora do escopo.

Nunca alterar modulos nao relacionados.

Nunca criar novo projeto para o Mini ERP.

Nunca criar segunda base de codigo.

---

# COMO INICIAR UMA NOVA CONVERSA

Enviar:

1. Este arquivo:

```text
LEIA-PRIMEIRO-MINI-ERP.md
```

2. Este arquivo:

```text
MANUAL-OFICIAL-MINI-ERP-PWA.md
```

3. Objetivo da nova conversa.

A nova conversa deve utilizar esses documentos como referencia oficial antes de qualquer analise.

---

# DOCUMENTO MESTRE

Este arquivo e apenas um guia de inicializacao.

Toda a documentacao tecnica detalhada encontra-se em:

```text
MANUAL-OFICIAL-MINI-ERP-PWA.md
```

A leitura deste documento e obrigatoria antes de qualquer alteracao estrutural no projeto.
