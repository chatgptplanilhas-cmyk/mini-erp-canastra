$ErrorActionPreference = "Stop"

$arquivo = "App.jsx"
$backup = "App-backup-antes-delivery-limpo.jsx"

Copy-Item $arquivo $backup -Force

$conteudo = Get-Content $arquivo -Raw -Encoding UTF8

$novoBloco = @'
  function TelaDelivery() {
    const termo = normalizarTexto(buscaDelivery)

    const deliveriesFiltrados = deliveries.filter((item) => {
      const texto = normalizarTexto(`
        ${item.vendas?.numero_venda}
        ${item.clientes?.nome}
        ${item.clientes?.referencia}
        ${item.referencia}
        ${item.local_entrega}
        ${item.descricao}
        ${item.valor_total}
        ${item.status}
      `)

      return texto.includes(termo)
    })

    const totalProgramadas = deliveries.filter((item) => item.status === 'Programado').length
    const totalEntregues = deliveries.filter((item) => item.status === 'Entregue').length
    const totalCanceladas = deliveries.filter((item) => item.status === 'Cancelado').length
    const totalValorProgramado = deliveries
      .filter((item) => item.status === 'Programado')
      .reduce((acc, item) => acc + Number(item.valor_total || 0), 0)

    return (
      <section className="bg-black border border-orange-950 rounded-[28px] p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Delivery</h2>
            <p className="text-zinc-500 mt-2">
              Controle de entregas programadas e rotas de atendimento.
            </p>
          </div>

          <input
            value={buscaDelivery}
            onChange={(e) => setBuscaDelivery(e.target.value)}
            placeholder="Buscar cliente, venda, local ou status"
            className="w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <section className="grid grid-cols-4 gap-4 mb-6">
          <CardResumo titulo="Programadas" valor={totalProgramadas} classe="text-orange-300" />
          <CardResumo titulo="Entregues" valor={totalEntregues} classe="text-green-300" />
          <CardResumo titulo="Canceladas" valor={totalCanceladas} classe="text-red-300" />
          <CardResumo titulo="Valor programado" valor={moeda(totalValorProgramado)} classe="text-green-300" />
        </section>

        <form onSubmit={salvarDelivery} className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-4">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Venda vinculada
            </label>

            <select
              value={formDelivery.venda_id}
              onChange={(e) => preencherDeliveryPorVenda(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            >
              <option value="">Entrega avulsa, sem vincular venda</option>
              {vendas.map((venda) => (
                <option key={venda.id} value={venda.id}>
                  Venda #{venda.numero_venda} | {venda.clientes?.nome} | {moeda(venda.valor_total)}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Cliente
            </label>

            <select
              value={formDelivery.cliente_id}
              onChange={(e) => {
                const cliente = clientes.find((item) => String(item.id) === String(e.target.value))
                setFormDelivery({
                  ...formDelivery,
                  cliente_id: e.target.value,
                  referencia: cliente?.referencia || formDelivery.referencia,
                })
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            >
              <option value="">Selecionar cliente</option>
              {clientes
                .filter((cliente) => cliente.ativo !== false || String(cliente.id) === String(formDelivery.cliente_id))
                .map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} | {cliente.referencia || 'Sem referencia'}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Data do pedido
            </label>

            <input
              type="date"
              onClick={abrirCalendario}
              onFocus={abrirCalendario}
              value={formDelivery.data_pedido}
              onChange={(e) => setFormDelivery({ ...formDelivery, data_pedido: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Data da entrega
            </label>

            <input
              type="date"
              onClick={abrirCalendario}
              onFocus={abrirCalendario}
              value={formDelivery.data_entrega}
              onChange={(e) => setFormDelivery({ ...formDelivery, data_entrega: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Referencia
            </label>

            <input
              value={formDelivery.referencia}
              onChange={(e) => setFormDelivery({ ...formDelivery, referencia: e.target.value })}
              placeholder="Ex: EC 304 Norte, CEDLAN, 703 Norte"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Local de entrega
            </label>

            <input
              value={formDelivery.local_entrega}
              onChange={(e) => setFormDelivery({ ...formDelivery, local_entrega: e.target.value })}
              placeholder="Ex: Sala dos professores, portaria, direcao"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Valor total
            </label>

            <input
              value={formDelivery.valor_total}
              onChange={(e) => setFormDelivery({ ...formDelivery, valor_total: e.target.value })}
              placeholder="R$ 0,00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Status
            </label>

            <select
              value={formDelivery.status}
              onChange={(e) => setFormDelivery({ ...formDelivery, status: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            >
              <option value="Programado">Programado</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col-span-12">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Itens / Descricao
            </label>

            <textarea
              value={formDelivery.descricao}
              onChange={(e) => setFormDelivery({ ...formDelivery, descricao: e.target.value })}
              rows={5}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[120px] leading-relaxed"
            />
          </div>

          <button className="col-span-10 bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoDeliveryId ? 'Salvar edicao' : 'Cadastrar entrega'}
          </button>

          {editandoDeliveryId && (
            <button
              type="button"
              onClick={limparDelivery}
              className="col-span-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold"
            >
              Cancelar
            </button>
          )}
        </form>

        <div className="overflow-auto rounded-2xl border border-zinc-900">
          <table className="w-full min-w-[1250px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Pedido</th>
                <th className="p-4">Entrega</th>
                <th className="p-4">Venda</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Referencia</th>
                <th className="p-4">Local</th>
                <th className="p-4">Itens / Descricao</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
                <th className="p-4">Acoes</th>
              </tr>
            </thead>

            <tbody>
              {deliveriesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="10" className="p-5 text-zinc-500">
                    Nenhuma entrega encontrada.
                  </td>
                </tr>
              )}

              {deliveriesFiltrados.map((item) => (
                <tr key={item.id} className="border-t border-zinc-900">
                  <td className="p-4 text-zinc-400">{dataBR(item.data_pedido)}</td>
                  <td className="p-4 text-white font-semibold">{dataBR(item.data_entrega)}</td>
                  <td className="p-4">{item.vendas?.numero_venda ? `#${item.vendas.numero_venda}` : 'Avulsa'}</td>
                  <td className="p-4 font-semibold">{item.clientes?.nome}</td>
                  <td className="p-4 text-zinc-400">{item.referencia || item.clientes?.referencia || 'Sem referencia'}</td>
                  <td className="p-4 text-zinc-300">{item.local_entrega || 'Sem local'}</td>
                  <td className="p-4 text-zinc-300 max-w-[320px] whitespace-pre-line leading-relaxed">{item.descricao || 'Sem descricao'}</td>
                  <td className="p-4 text-green-300">{moeda(item.valor_total)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                        item.status === 'Entregue'
                          ? 'bg-green-950 text-green-300'
                          : item.status === 'Cancelado'
                            ? 'bg-red-950 text-red-300'
                            : 'bg-orange-950 text-orange-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => editarDelivery(item)} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl">
                        Editar
                      </button>

                      <button onClick={() => excluirDelivery(item)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-xl">
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
'@

$padrao = '(?s)  function TelaDelivery\(\) \{.*?(?=  function TelaTaxas\(\) \{)'

if ($conteudo -notmatch 'function TelaDelivery') {
  throw "Funcao TelaDelivery nao encontrada."
}

$conteudoNovo = [regex]::Replace($conteudo, $padrao, $novoBloco + "`r`n`r`n", 1)

Set-Content $arquivo $conteudoNovo -Encoding UTF8

Write-Host "TelaDelivery substituida com sucesso." -ForegroundColor Green
Write-Host "Backup criado: $backup" -ForegroundColor Yellow
