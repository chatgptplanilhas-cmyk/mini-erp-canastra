
$ErrorActionPreference = "Stop"

if (Test-Path ".\App.jsx") {
  $appPath = ".\App.jsx"
} elseif (Test-Path ".\src\App.jsx") {
  $appPath = ".\src\App.jsx"
} else {
  throw "Não encontrei o App.jsx. Rode este script dentro da pasta mini-erp-canastra ou mini-erp-canastra\src."
}

$backupPath = "$appPath.backup-delivery-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item $appPath $backupPath -Force

$codigo = Get-Content $appPath -Raw -Encoding UTF8

$novaTelaDelivery = @'
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
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-orange-300 text-xs uppercase tracking-[0.35em] mb-2">Logística</p>
            <h2 className="text-3xl font-bold">Delivery Premium</h2>
            <p className="text-zinc-500 mt-2">
              Entregas organizadas por cliente, referência, local, itens e status.
            </p>
          </div>

          <input
            value={buscaDelivery}
            onChange={(e) => setBuscaDelivery(e.target.value)}
            placeholder="Buscar cliente, venda, local ou status"
            className="w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
          />
        </div>

        <section className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-950 border border-orange-950 rounded-2xl p-5">
            <p className="text-zinc-500 mb-2">Programadas</p>
            <p className="text-3xl font-bold text-orange-300">{totalProgramadas}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-500 mb-2">Entregues</p>
            <p className="text-3xl font-bold text-green-300">{totalEntregues}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-500 mb-2">Canceladas</p>
            <p className="text-3xl font-bold text-red-300">{totalCanceladas}</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-500 mb-2">Valor programado</p>
            <p className="text-3xl font-bold text-green-300">{moeda(totalValorProgramado)}</p>
          </div>
        </section>

        <form onSubmit={salvarDelivery} className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-4">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Venda vinculada</label>
            <select
              value={formDelivery.venda_id}
              onChange={(e) => preencherDeliveryPorVenda(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
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
            <label className="block text-xs uppercase text-zinc-500 mb-2">Cliente</label>
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
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            >
              <option value="">Selecionar cliente</option>
              {clientes
                .filter((cliente) => cliente.ativo !== false || String(cliente.id) === String(formDelivery.cliente_id))
                .map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} | {cliente.referencia || 'Sem referência'}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Pedido</label>
            <input
              type="date"
              onClick={abrirCalendario}
              onFocus={abrirCalendario}
              value={formDelivery.data_pedido}
              onChange={(e) => setFormDelivery({ ...formDelivery, data_pedido: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Entrega</label>
            <input
              type="date"
              onClick={abrirCalendario}
              onFocus={abrirCalendario}
              value={formDelivery.data_entrega}
              onChange={(e) => setFormDelivery({ ...formDelivery, data_entrega: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Referência</label>
            <input
              value={formDelivery.referencia}
              onChange={(e) => setFormDelivery({ ...formDelivery, referencia: e.target.value })}
              placeholder="Ex: EC 304 Norte, CEDLAN, 703 Norte"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Local de entrega</label>
            <input
              value={formDelivery.local_entrega}
              onChange={(e) => setFormDelivery({ ...formDelivery, local_entrega: e.target.value })}
              placeholder="Ex: Sala dos professores, portaria, direção"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Valor total</label>
            <input
              value={formDelivery.valor_total}
              onChange={(e) => setFormDelivery({ ...formDelivery, valor_total: e.target.value })}
              placeholder="R$ 0,00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs uppercase text-zinc-500 mb-2">Status</label>
            <select
              value={formDelivery.status}
              onChange={(e) => setFormDelivery({ ...formDelivery, status: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
            >
              <option value="Programado">Programado</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col-span-2 flex items-end">
            <button className="w-full bg-orange-950 hover:bg-orange-900 rounded-2xl px-4 py-3 font-semibold">
              {editandoDeliveryId ? 'Salvar edição' : 'Cadastrar entrega'}
            </button>
          </div>

          <div className="col-span-12">
            <label className="block text-xs uppercase text-zinc-500 mb-2">
              Digite item ou descrição
            </label>
            <textarea
              value={formDelivery.descricao}
              onChange={(e) => setFormDelivery({ ...formDelivery, descricao: e.target.value })}
              placeholder={`Digite item ou descrição, um por linha:
01 Queijo Vila Caipira
02 Provolone desidratado
01 Doce de leite`}
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 resize-y min-h-[120px] leading-relaxed"
            />
          </div>

          {editandoDeliveryId && (
            <button
              type="button"
              onClick={limparDelivery}
              className="col-span-12 bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-4 py-3 font-semibold"
            >
              Cancelar edição
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
                <th className="p-4">Referência</th>
                <th className="p-4">Local</th>
                <th className="p-4">Itens / descrição</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
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
                  <td className="p-4 text-zinc-400">{item.referencia || item.clientes?.referencia || 'Sem referência'}</td>
                  <td className="p-4 text-zinc-300">{item.local_entrega || 'Sem local'}</td>
                  <td className="p-4 text-zinc-300 max-w-[320px] whitespace-pre-line leading-relaxed">{item.descricao || 'Sem descrição'}</td>
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

$padrao = '(?s)  function TelaDelivery\(\) \{.*?\r?\n  function TelaTaxas\(\) \{'

if ($codigo -notmatch $padrao) {
  throw "Não consegui localizar o bloco entre TelaDelivery e TelaTaxas. Nenhuma alteração foi feita."
}

$codigoNovo = [regex]::Replace($codigo, $padrao, $novaTelaDelivery + "`r`n`r`n  function TelaTaxas() {", 1)

Set-Content -Path $appPath -Value $codigoNovo -Encoding UTF8

Write-Host "TelaDelivery substituida com sucesso." -ForegroundColor Green
Write-Host "Backup criado em: $backupPath" -ForegroundColor Yellow
Write-Host "Agora rode: npm run build" -ForegroundColor Cyan
