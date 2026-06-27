# CHECKLIST VALIDACAO PRE-VENDAS PRE PWA

Projeto: Mini ERP Queijos Serra da Canastra
Pasta oficial: C:\Users\Delber\Mini-ERP\projeto
Dominio oficial: https://mini-erp-canastra.vercel.app
Versao estavel de referencia: 2026.06.24.03
Relatorios anteriores:

1. RELATORIO_BASE_OFICIAL_PRE_PWA.md
2. REVISAO_APPJS_PRE_PWA.md

## 1. Objetivo do teste

Validar manualmente se a alteracao atual em `src/App.jsx`, concentrada na tela de Pre-vendas, pode ser aceita como parte da base oficial antes da frente PWA.

O teste deve confirmar se as mudancas de filtro por data, paginacao, resumo do dia, conferencia de produtos, totais por forma de pagamento e confirmacao visual de exclusao funcionam sem prejudicar desktop, mobile e operacao real.

Este roteiro nao implementa PWA. Ele serve apenas para decidir se a base atual pode seguir para backup e checkpoint pre PWA.

## 2. Estado atual esperado antes do teste

Antes de iniciar, confirmar:

- [ ] A pasta usada e `C:\Users\Delber\Mini-ERP\projeto`.
- [ ] A versao de referencia continua sendo `2026.06.24.03`.
- [ ] O Git ainda nao esta limpo.
- [ ] Existe alteracao grande em `src/App.jsx`.
- [ ] A alteracao em `src/App.jsx` continua com aproximadamente `390 insercoes` e `28 exclusoes`.
- [ ] `RELATORIO_BASE_OFICIAL_PRE_PWA.md` existe.
- [ ] `REVISAO_APPJS_PRE_PWA.md` existe.
- [ ] PWA ainda nao foi iniciado.
- [ ] `manifest.json` ainda nao foi implementado.
- [ ] `index.html` ainda nao foi alterado para linkar manifest.
- [ ] Service Worker, cache, versionamento, Supabase e banco nao foram alterados nesta frente.
- [ ] Build ainda nao foi rodado para esta etapa.
- [ ] Deploy ainda nao foi feito para esta etapa.
- [ ] Backup pre PWA ainda nao foi criado.
- [ ] Commit de checkpoint pre PWA ainda nao foi feito.

## 3. Checklist desktop para tela de Pre-vendas

Ambiente sugerido: desktop no Chrome.

### Abertura e leitura inicial

- [ ] Abrir o Mini ERP.
- [ ] Confirmar que o sistema carrega normalmente.
- [ ] Abrir a tela de Pre-vendas.
- [ ] Conferir se a tela continua utilizavel.
- [ ] Conferir se nao ha erro visual evidente.
- [ ] Conferir se os cards de pre-vendas aparecem.
- [ ] Conferir se os cards mantem cliente, referencia, itens, status e total legiveis.

### Busca

- [ ] Usar a busca por cliente.
- [ ] Usar a busca por referencia.
- [ ] Usar a busca por produto ou texto falado, se houver massa de dados.
- [ ] Confirmar que a lista filtra corretamente.
- [ ] Limpar a busca.
- [ ] Confirmar que a lista volta ao estado esperado.

### Filtro por data

- [ ] Selecionar uma data com pre-vendas conhecidas.
- [ ] Conferir se aparecem apenas registros da data selecionada.
- [ ] Selecionar uma data sem pre-vendas.
- [ ] Conferir se a tela mostra estado vazio de forma clara.
- [ ] Clicar em `Limpar data`.
- [ ] Conferir se o filtro de data foi removido.
- [ ] Conferir se a lista volta ao estado esperado.

### Paginacao

Usar quando houver quantidade suficiente de registros.

- [ ] Conferir se a paginacao aparece quando aplicavel.
- [ ] Conferir o texto de resumo da paginacao.
- [ ] Clicar em `Proxima`.
- [ ] Confirmar que a proxima pagina aparece.
- [ ] Clicar em `Anterior`.
- [ ] Confirmar que a pagina anterior aparece.
- [ ] Confirmar que os botoes ficam desabilitados nos limites corretos.
- [ ] Aplicar busca ou filtro de data.
- [ ] Confirmar que a paginacao volta para uma pagina valida.
- [ ] Confirmar que registros nao parecem sumir indevidamente.

### Resumo do dia

- [ ] Clicar em `Resumo do dia`.
- [ ] Confirmar que o modal abre.
- [ ] Conferir se o titulo mostra a data correta.
- [ ] Conferir se a quantidade de registros faz sentido.
- [ ] Conferir se os clientes listados fazem sentido para a data.
- [ ] Conferir se referencias aparecem corretamente.
- [ ] Conferir se itens aparecem corretamente.
- [ ] Conferir se horarios aparecem corretamente.
- [ ] Conferir se valores do resumo fazem sentido.
- [ ] Conferir se a conferencia dos produtos faz sentido.
- [ ] Conferir se a quantidade total de produtos faz sentido.
- [ ] Conferir se o valor total previsto faz sentido.
- [ ] Conferir se totais por forma de pagamento fazem sentido.
- [ ] Conferir se o texto consolidado no campo de texto esta legivel.
- [ ] Fechar o resumo pelo botao de fechar.
- [ ] Abrir novamente e fechar clicando fora, se esse comportamento estiver habilitado.
- [ ] Abrir novamente e fechar com `Esc`.
- [ ] Confirmar que a tela volta ao normal depois de fechar.

### Confirmacao visual de exclusao

Usar preferencialmente com registro descartavel, conforme secao 5.

- [ ] Abrir o detalhe de uma pre-venda.
- [ ] Clicar em `Excluir`.
- [ ] Confirmar que aparece uma confirmacao visual.
- [ ] Conferir se a mensagem mostra o cliente correto.
- [ ] Conferir se aparece o aviso de que a acao nao podera ser desfeita.
- [ ] Clicar em `Cancelar`.
- [ ] Confirmar que o registro nao foi excluido.
- [ ] Abrir novamente a confirmacao.
- [ ] Clicar em `Excluir` apenas em registro descartavel.
- [ ] Confirmar que somente o registro correto sumiu da lista.
- [ ] Confirmar que outros registros continuam intactos.

## 4. Checklist mobile para tela de Pre-vendas

Ambientes sugeridos: celular Android no Chrome e iPhone/Safari quando possivel.

### Abertura e usabilidade

- [ ] Abrir o Mini ERP no celular.
- [ ] Abrir a tela de Pre-vendas.
- [ ] Conferir se nao da zoom indesejado.
- [ ] Conferir se nenhum botao importante fica cortado.
- [ ] Conferir se os cards continuam legiveis.
- [ ] Conferir se busca e data cabem na largura da tela.
- [ ] Conferir se `Limpar data` fica acessivel.
- [ ] Conferir se nao ha rolagem horizontal indevida.

### Paginacao mobile

- [ ] Conferir se a paginacao e facil de usar com toque.
- [ ] Clicar em `Proxima`.
- [ ] Clicar em `Anterior`.
- [ ] Conferir se os botoes nao ficam pequenos demais.
- [ ] Conferir se o texto `Pagina X de Y` nao quebra de forma confusa.

### Resumo do dia mobile

- [ ] Clicar em `Resumo do dia`.
- [ ] Conferir se o resumo do dia cabe na tela.
- [ ] Conferir se o botao de fechar aparece.
- [ ] Conferir se o botao `Voltar`, quando visivel, funciona.
- [ ] Conferir se o modal nao trava o scroll.
- [ ] Conferir se e possivel rolar o conteudo interno.
- [ ] Conferir se os totais continuam legiveis.
- [ ] Conferir se o campo de texto nao corta conteudo de forma critica.
- [ ] Fechar o modal.
- [ ] Confirmar que a pagina volta a rolar normalmente.

### Exclusao mobile

- [ ] Abrir detalhe de uma pre-venda descartavel.
- [ ] Clicar em `Excluir`.
- [ ] Conferir se a confirmacao visual aparece centralizada.
- [ ] Conferir se os botoes `Cancelar` e `Excluir` aparecem.
- [ ] Conferir se os botoes sao faceis de tocar.
- [ ] Clicar em `Cancelar`.
- [ ] Confirmar que nao excluiu.
- [ ] Abrir novamente e excluir apenas o registro descartavel.
- [ ] Confirmar que somente o registro correto sumiu.

## 5. Testes com registro descartavel

Executar apenas se houver seguranca para criar e remover um registro de teste.

### Criacao do registro de teste

- [ ] Criar uma pre-venda de teste com cliente claramente identificavel.
- [ ] Usar nome como `TESTE PRE PWA`.
- [ ] Informar referencia clara, por exemplo `VALIDACAO PRE PWA`.
- [ ] Incluir pelo menos um item.
- [ ] Informar forma de pagamento conhecida.
- [ ] Salvar a pre-venda.
- [ ] Confirmar que a pre-venda apareceu na lista.

### Filtro e detalhe

- [ ] Filtrar pela data do teste.
- [ ] Confirmar que o registro `TESTE PRE PWA` aparece.
- [ ] Buscar pelo nome do teste.
- [ ] Confirmar que o registro aparece.
- [ ] Abrir o detalhe do registro.
- [ ] Conferir cliente, referencia, itens, pagamento e total.

### Cancelamento da exclusao

- [ ] Clicar em `Excluir`.
- [ ] Confirmar que a confirmacao visual abriu.
- [ ] Clicar em `Cancelar`.
- [ ] Confirmar que o registro continua na lista.
- [ ] Abrir novamente o detalhe do mesmo registro.
- [ ] Confirmar que os dados continuam presentes.

### Exclusao efetiva

- [ ] Abrir novamente a confirmacao de exclusao.
- [ ] Clicar em `Excluir`.
- [ ] Confirmar que o registro sumiu da lista.
- [ ] Limpar busca e filtro.
- [ ] Confirmar que o registro descartavel nao aparece mais.
- [ ] Confirmar que outros registros continuam intactos.
- [ ] Confirmar que nao houve mensagem de erro.

## 6. Criterios de aprovacao

### Aprovado para checkpoint

Marcar somente se todos os pontos forem verdadeiros:

- [ ] Desktop de Pre-vendas ficou utilizavel.
- [ ] Mobile de Pre-vendas ficou utilizavel.
- [ ] Busca funciona.
- [ ] Filtro por data funciona.
- [ ] `Limpar data` funciona.
- [ ] Paginacao funciona quando aplicavel.
- [ ] Resumo do dia abre e fecha corretamente.
- [ ] Resumo do dia apresenta numeros coerentes.
- [ ] Confirmacao visual de exclusao aparece corretamente.
- [ ] Cancelar nao exclui.
- [ ] Excluir remove somente o registro descartavel correto.
- [ ] Nenhum registro real foi afetado por engano.
- [ ] Nao houve regressao visivel relevante.

Decisao: a alteracao pode entrar no checkpoint pre PWA.

### Aprovado com ressalvas

Usar se a tela funciona, mas ha problema pequeno ou ajuste necessario antes do PWA.

Exemplos:

- [ ] Algum texto quebra de forma ruim, mas nao impede uso.
- [ ] Algum espacamento incomoda, mas nao impede operacao.
- [ ] Resumo precisa de pequena correcao de exibicao.
- [ ] Paginacao funciona, mas a leitura pode melhorar.
- [ ] Mobile precisa de ajuste pontual.

Decisao: corrigir a frente de Pre-vendas antes do PWA.

### Reprovado para checkpoint

Usar se qualquer ponto critico falhar:

- [ ] Tela de Pre-vendas ficou dificil de usar.
- [ ] Busca falha.
- [ ] Filtro por data esconde registros indevidamente.
- [ ] Paginacao impede acesso a registros.
- [ ] Resumo do dia calcula errado de forma relevante.
- [ ] Modal trava a tela.
- [ ] Cancelar exclui ou parece excluir.
- [ ] Excluir remove registro errado.
- [ ] Mobile fica inseguro para operacao em campo.
- [ ] Desktop foi prejudicado de forma relevante.

Decisao: nao iniciar PWA.

## 7. Campos para preenchimento manual

Preencher durante ou depois dos testes.

```text
Data do teste:

Responsavel pelo teste:

Dispositivo desktop usado:

Navegador desktop usado:

Resultado desktop:

Dispositivo mobile usado:

Navegador mobile usado:

Resultado mobile:

Registro descartavel criado?

Nome do registro descartavel:

Exclusao cancelada com sucesso?

Exclusao final removeu somente o registro correto?

Problemas encontrados:

Prints ou observacoes:

Decisao final do usuario:

[ ] Aprovado para checkpoint
[ ] Aprovado com ressalvas
[ ] Reprovado para checkpoint
```

## 8. Proximo passo recomendado conforme resultado

### Se aprovado

1. Criar backup pre PWA.
2. Revisar `git status`.
3. Definir exatamente quais arquivos entram no checkpoint.
4. Criar commit de checkpoint pre PWA, se autorizado.
5. Somente depois iniciar a implementacao PWA minima.

### Se aprovado com ressalvas

1. Nao iniciar PWA ainda.
2. Corrigir primeiro a frente de Pre-vendas.
3. Validar novamente desktop e mobile.
4. Depois criar backup pre PWA.
5. Depois decidir checkpoint.

### Se reprovado

1. Nao iniciar PWA.
2. Nao criar checkpoint com esta alteracao.
3. Revisar a frente de Pre-vendas antes de qualquer backup oficial.
4. Separar claramente a correcao de Pre-vendas da futura frente PWA.

## 9. Confirmacao explicita de escopo

Nesta etapa:

1. Nao foi gerado codigo de aplicacao.
2. Nao foi alterado `src/App.jsx`.
3. Nao foi alterado `index.html`.
4. Nao foi alterado `public/version.json`.
5. Nao foi alterado `src/main.jsx`.
6. Nao foi alterado `public/sw.js`.
7. Nao foi alterado `public/service-worker.js`.
8. Nao foi alterado cache.
9. Nao foi alterado versionamento.
10. Nao foi alterado Supabase.
11. Nao foi alterado banco.
12. Nao foi executado build.
13. Nao foi feito deploy.
14. Nao foi criado novo projeto.
15. Nao foi criada segunda base de codigo.
16. Nao foi implementado PWA.
17. Nao foi alterado desktop.
18. Nao foi feito commit.
19. Nao foi criado backup.
20. Nao foi implementado `manifest.json`.
21. Nao foi linkado manifest no `index.html`.
22. Nao foram alterados icones.

Confirmacao explicita: nada foi alterado alem da criacao deste arquivo `CHECKLIST_VALIDACAO_PREVENDAS_PRE_PWA.md`.
