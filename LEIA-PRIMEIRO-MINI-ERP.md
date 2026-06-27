# MINI ERP – QUEIJOS SERRA DA CANASTRA

## LEITURA OBRIGATÓRIA

Este documento deve ser lido integralmente antes de qualquer auditoria, alteração, correção, refinamento ou publicação.

Este projeto está em produção e é utilizado diariamente em campo.

O objetivo principal é preservar a estabilidade do sistema.

---

# OBJETIVO DO PROJETO

O Mini ERP é um sistema próprio utilizado para administrar a operação da Queijos Serra da Canastra.

Ele concentra:

• Clientes
• Pré-vendas
• Vendas
• Delivery
• Cobranças
• Financeiro
• Relatórios
• Produtos

O sistema possui sincronização com Supabase e é publicado na Vercel.

O projeto evolui por refinamentos pequenos e controlados.

Nunca realizar grandes alterações sem autorização.

---

# CAMINHO OFICIAL

Projeto local:

C:\Users\Delber\Mini-ERP\projeto

Domínio oficial:

https://mini-erp-canastra.vercel.app

---

# ESTADO ATUAL

Projeto estável.

Versão publicada:

2026.06.24.03

A versão foi utilizada em produção.

Validada em desktop.

Validada em iPhone.

Validada em campo.

Sem regressões conhecidas.

---

# FUNCIONALIDADES ESTÁVEIS

Clientes

Pré-vendas

Vendas

Delivery

Cobranças

Financeiro

Relatórios

Sincronização Supabase

Atualização automática

Deploy Vercel

---

# REFINAMENTOS JÁ IMPLEMENTADOS

Pré-vendas:

• confirmação antes de excluir;
• paginação;
• filtro por data;
• resumo por data;
• conferência consolidada dos produtos;
• referência do cliente;
• horário da pré-venda;
• quantidade dos itens;
• forma de pagamento;
• total por cliente;
• modal corrigido;
• botão "Copiar resumo" removido por decisão de projeto.

---

# REGRAS PERMANENTES

Nunca alterar sem autorização:

Service Worker

Cache

Versionamento

Supabase

Sincronização

Estrutura do banco

Deploy

Arquitetura geral

---

# PRINCIPAL LIÇÃO DO PROJETO

O Mini ERP sofreu um incidente grave de downgrade.

A causa envolveu:

Service Worker

Cache

Versionamento

Atualização da aplicação

Por isso:

Nunca modificar essas áreas durante refinamentos comuns.

---

# PROCEDIMENTO OFICIAL DE TRABALHO

1. Receber o projeto.

2. Auditar somente o necessário.

3. Implementar apenas o refinamento solicitado.

4. Rodar build.

5. Validar.

6. Somente depois realizar deploy.

7. Após validação em produção, criar backup.

---

# MODOS DE TRABALHO

## Auditoria Completa

Usar apenas quando:

Nova versão.

Problemas de atualização.

Problemas de cache.

Problemas de Service Worker.

Mudanças estruturais.

Nova arquitetura.

---

## Refinamento Localizado

Utilizar para:

Ajustes visuais.

Melhorias de UX.

Novos botões.

Paginação.

Filtros.

Modais.

Mensagens.

Pequenos recursos.

Não percorrer o projeto inteiro.

Não refatorar.

---

# BUILD

Sempre executar:

npm run build

ou

npm.cmd run build

Caso PowerShell bloqueie scripts.

---

# DEPLOY

Somente após:

Build aprovado.

Testes aprovados.

Validação concluída.

Autorização explícita.

---

# BACKUPS

Sempre manter:

Última versão estável.

Versão imediatamente anterior.

Backup aprovado em campo.

Nunca sobrescrever backups históricos.

---

# OBJETIVO DA PRÓXIMA ETAPA

Iniciar uma nova frente para transformar o Mini ERP em um aplicativo PWA instalável.

Importante:

O desktop deve permanecer exatamente como está.

Não criar um projeto separado.

Não criar uma segunda base de código.

Desktop e aplicativo devem compartilhar exatamente o mesmo código.

---

# OBJETIVOS DO PWA

Aplicativo instalável.

Ícone na tela inicial.

Execução em tela cheia.

Melhor experiência mobile.

Mesmo banco.

Mesmo Supabase.

Mesmo deploy.

Mesmo código.

Desktop preservado.

---

# O QUE NUNCA FAZER

Nunca iniciar alterações diretamente.

Nunca publicar sem validação.

Nunca modificar Service Worker sem necessidade.

Nunca alterar cache durante refinamentos simples.

Nunca alterar versão sem autorização.

Nunca refatorar fora do escopo.

Nunca alterar módulos não relacionados.

---

# COMO INICIAR UMA NOVA CONVERSA

Enviar:

1. ZIP atualizado.

2. Este arquivo:

LEIA-PRIMEIRO-MINI-ERP.md

3. MANUAL-OFICIAL-MINI-ERP-PWA.md

Objetivo da nova conversa.

A nova conversa deve utilizar esses documentos como referência oficial antes de qualquer análise.

---

# DOCUMENTO MESTRE

Este arquivo é apenas um guia de inicialização.

Toda a documentação técnica detalhada encontra-se em:

MANUAL-OFICIAL-MINI-ERP-PWA.md

A leitura deste documento é obrigatória antes de qualquer alteração estrutural no projeto.
