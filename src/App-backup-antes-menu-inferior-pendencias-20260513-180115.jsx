import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [pagina, setPagina] = useState('painel')
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  const [clientes, setClientes] = useState([])
  const [vendas, setVendas] = useState([])
  const [taxas, setTaxas] = useState([])
  const [pendencias, setPendencias] = useState([])
  const [produtos, setProdutos] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [movimentacoesProdutos, setMovimentacoesProdutos] = useState([])
  const [despesas, setDespesas] = useState([])
  const [deliveries, setDeliveries] = useState([])

  const [buscaClientes, setBuscaClientes] = useState('')
  const [buscaVendas, setBuscaVendas] = useState('')
  const [buscaPendencias, setBuscaPendencias] = useState('')
  const [buscaPagamentos, setBuscaPagamentos] = useState('')
  const [buscaProdutos, setBuscaProdutos] = useState('')
  const [buscaProdutosControle, setBuscaProdutosControle] = useState('')
  const [buscaDespesas, setBuscaDespesas] = useState('')
  const [buscaDelivery, setBuscaDelivery] = useState('')

  const [clienteId, setClienteId] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [dataVenda, setDataVenda] = useState(new Date().toISOString().slice(0, 10))
  const [taxaSelecionadaId, setTaxaSelecionadaId] = useState('')
  const [status, setStatus] = useState('EM ABERTO')
  const [vencimento, setVencimento] = useState('')

  const [editandoVendaId, setEditandoVendaId] = useState(null)
  const [editandoClienteId, setEditandoClienteId] = useState(null)
  const [editandoProdutoId, setEditandoProdutoId] = useState(null)
  const [editandoTaxaId, setEditandoTaxaId] = useState(null)
  const [editandoFornecedorId, setEditandoFornecedorId] = useState(null)
  const [editandoMovimentacaoProdutoId, setEditandoMovimentacaoProdutoId] = useState(null)
  const [editandoDespesaId, setEditandoDespesaId] = useState(null)
  const [editandoDeliveryId, setEditandoDeliveryId] = useState(null)

  const [formCliente, setFormCliente] = useState({
    nome: '',
    referencia: '',
    telefone: '',
  })

  const [formProduto, setFormProduto] = useState({
    nome: '',
    fornecedor_id: '',
    preco_custo: '',
    preco_venda: '',
    estoque: '',
    ativo: true,
  })

  const [formTaxa, setFormTaxa] = useState({
    forma_pagamento: '',
    taxa_percentual: '',
  })

  const [formFornecedor, setFormFornecedor] = useState({
    nome: '',
    contato: '',
    telefone: '',
    cidade: '',
    observacao: '',
    ativo: true,
  })

  const [formMovimentacaoProduto, setFormMovimentacaoProduto] = useState({
    venda_id: '',
    produto_id: '',
    quantidade: '',
    observacao: '',
  })

  const [formDespesa, setFormDespesa] = useState({
    data_despesa: new Date().toISOString().slice(0, 10),
    categoria: 'Abastecimento',
    descricao: '',
    valor: '',
    observacao: '',
  })

  const [formDelivery, setFormDelivery] = useState({
    venda_id: '',
    data_pedido: new Date().toISOString().slice(0, 10),
    data_entrega: '',
    cliente_id: '',
    referencia: '',
    local_entrega: '',
    descricao: '',
    valor_total: '',
    status: 'Programado',
  })

  useEffect(() => {
    buscarTudo()
  }, [])

  async function buscarTudo() {
    await Promise.all([
      buscarClientes(),
      buscarTaxas(),
      buscarVendas(),
      buscarPendencias(),
      buscarProdutos(),
      buscarPagamentos(),
      buscarFornecedores(),
      buscarMovimentacoesProdutos(),
      buscarDespesas(),
      buscarDelivery(),
    ])
  }

  function numero(valor) {
    return Number(String(valor || 0).replace(',', '.')) || 0
  }

  function dataHoje() {
    return new Date().toISOString().slice(0, 10)
  }

  function abrirCalendario(event) {
    try {
      event.currentTarget.showPicker?.()
    } catch (erro) {
      return null
    }
  }

  function limparTelefone(telefone) {
    return String(telefone || '').replace(/\D/g, '')
  }

  function normalizarTexto(valor) {
    return String(valor || '').toLowerCase().trim()
  }

  function normalizarStatus(valor) {
    if (valor === 'PENDENTE') return 'EM ABERTO'
    if (valor === 'EM ABERTO') return 'EM ABERTO'
    if (valor === 'PARCIAL') return 'PARCIAL'
    if (valor === 'PAGO') return 'PAGO'
    return 'EM ABERTO'
  }

  function moeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function percentual(valor) {
    return `${Number(valor || 0).toFixed(2).replace('.', ',')}%`
  }

  function dataBR(data) {
    if (!data) return 'Sem data'

    const partes = String(data).split('-')

    if (partes.length !== 3) return data

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  const taxaSelecionada = taxas.find((taxa) => String(taxa.id) === String(taxaSelecionadaId))

  const valorNumerico = numero(valorTotal)
  const percentualTaxa = Number(taxaSelecionada?.taxa_percentual || 0)
  const valorTaxa = valorNumerico * (percentualTaxa / 100)
  const valorLiquido = valorNumerico - valorTaxa

  async function buscarClientes() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome', { ascending: true })

    if (error) console.error(error)
    setClientes(data || [])
  }

  async function buscarTaxas() {
    const { data, error } = await supabase
      .from('taxas')
      .select('*')
      .order('forma_pagamento', { ascending: true })

    if (error) console.error(error)

    const listaOriginal = data || []

    const fiadoExiste = listaOriginal.some(
      (item) => item.forma_pagamento === 'Fiado / Em aberto'
    )

    let listaComFiado = listaOriginal

    if (!fiadoExiste) {
      listaComFiado = [
        {
          id: 'fiado-local',
          forma_pagamento: 'Fiado / Em aberto',
          taxa_percentual: 0,
        },
        ...listaOriginal,
      ]
    }

    const listaUnica = listaComFiado.filter((taxa, index, self) => {
      return (
        index ===
        self.findIndex(
          (item) =>
            item.forma_pagamento === taxa.forma_pagamento &&
            Number(item.taxa_percentual) === Number(taxa.taxa_percentual)
        )
      )
    })

    setTaxas(listaUnica)

    if (!taxaSelecionadaId && listaUnica.length > 0) {
      const fiado = listaUnica.find((item) => item.forma_pagamento === 'Fiado / Em aberto')
      const pix = listaUnica.find((item) => item.forma_pagamento === 'Pix')
      setTaxaSelecionadaId(fiado?.id || pix?.id || listaUnica[0].id)
    }
  }

  async function buscarProdutos() {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        fornecedores (
          id,
          nome
        )
      `)
      .order('nome', { ascending: true })

    if (error) console.error(error)
    setProdutos(data || [])
  }

  async function buscarFornecedores() {
    const { data, error } = await supabase
      .from('fornecedores')
      .select('*')
      .order('nome', { ascending: true })

    if (error) console.error(error)
    setFornecedores(data || [])
  }

  async function buscarVendas() {
    const { data, error } = await supabase
      .from('vendas')
      .select(`
        *,
        clientes (
          nome,
          referencia,
          telefone
        )
      `)
      .order('numero_venda', { ascending: false })

    if (error) console.error(error)
    setVendas(data || [])
  }

  async function buscarPendencias() {
    const { data, error } = await supabase
      .from('pendencias')
      .select(`
        *,
        vendas (
          numero_venda,
          data_venda,
          valor_total,
          clientes (
            nome,
            referencia,
            telefone
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    setPendencias(data || [])
  }

  async function buscarPagamentos() {
    const { data, error } = await supabase
      .from('pagamentos')
      .select(`
        *,
        vendas (
          numero_venda,
          clientes (
            nome,
            referencia
          )
        )
      `)
      .order('data_pagamento', { ascending: false })

    if (error) console.error(error)
    setPagamentos(data || [])
  }

  async function buscarMovimentacoesProdutos() {
    const { data, error } = await supabase
      .from('itens_venda')
      .select(`
        *,
        produtos (
          nome
        ),
        fornecedores (
          nome
        ),
        vendas (
          numero_venda,
          data_venda,
          valor_total,
          clientes (
            nome,
            referencia
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    setMovimentacoesProdutos(data || [])
  }


  async function buscarDespesas() {
    const { data, error } = await supabase
      .from('despesas')
      .select('*')
      .order('data_despesa', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    setDespesas(data || [])
  }

  async function buscarDelivery() {
    const { data, error } = await supabase
      .from('delivery')
      .select(`
        *,
        clientes (
          nome,
          referencia,
          telefone
        ),
        vendas (
          numero_venda,
          data_venda,
          valor_total
        )
      `)
      .order('data_entrega', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setDeliveries([])
      return
    }

    setDeliveries(data || [])
  }

  async function salvarVenda(e) {
    e.preventDefault()

    if (!clienteId) {
      alert('Selecione um cliente.')
      return
    }

    if (!valorNumerico) {
      alert('Informe o valor total da venda.')
      return
    }

    const statusFinal = normalizarStatus(status)

    const dadosVenda = {
      cliente_id: clienteId,
      data_venda: dataVenda || dataHoje(),
      valor_total: valorNumerico,
      valor_liquido: valorLiquido,
      forma_pagamento: taxaSelecionada?.forma_pagamento || 'Fiado / Em aberto',
      taxa_percentual: percentualTaxa,
      valor_taxa: valorTaxa,
      status: statusFinal,
    }

    if (editandoVendaId) {
      const { error } = await supabase
        .from('vendas')
        .update(dadosVenda)
        .eq('id', editandoVendaId)

      if (error) {
        alert('Erro ao editar venda.')
        console.error(error)
        return
      }

      await ajustarPendencia(editandoVendaId, valorNumerico, statusFinal)
      limparVenda()
      buscarTudo()
      return
    }

    const { data: ultimaVenda } = await supabase
      .from('vendas')
      .select('numero_venda')
      .order('numero_venda', { ascending: false })
      .limit(1)

    const proximoNumero =
      ultimaVenda && ultimaVenda.length > 0
        ? Number(ultimaVenda[0].numero_venda || 0) + 1
        : 1

    const { data: vendaCriada, error } = await supabase
      .from('vendas')
      .insert({
        numero_venda: proximoNumero,
        ...dadosVenda,
      })
      .select()
      .single()

    if (error) {
      alert('Erro ao salvar venda.')
      console.error(error)
      return
    }

    await ajustarPendencia(vendaCriada.id, valorNumerico, statusFinal)

    limparVenda()
    buscarTudo()
    setPagina('vendas')
  }

  async function ajustarPendencia(vendaId, valor, statusVenda) {
    const statusFinal = normalizarStatus(statusVenda)

    const { data: pendenciaExistente } = await supabase
      .from('pendencias')
      .select('*')
      .eq('venda_id', vendaId)
      .maybeSingle()

    if (statusFinal === 'EM ABERTO' || statusFinal === 'PARCIAL') {
      if (pendenciaExistente) {
        await supabase
          .from('pendencias')
          .update({
            vencimento: vencimento || null,
            saldo_restante: valor,
            status: statusFinal,
          })
          .eq('venda_id', vendaId)
      } else {
        await supabase.from('pendencias').insert({
          venda_id: vendaId,
          vencimento: vencimento || null,
          saldo_restante: valor,
          status: statusFinal,
          dias_atraso: 0,
        })
      }
    }

    if (statusFinal === 'PAGO' && pendenciaExistente) {
      await supabase
        .from('pendencias')
        .update({
          saldo_restante: 0,
          status: 'PAGO',
        })
        .eq('venda_id', vendaId)
    }
  }

  function editarVenda(venda) {
    const statusNormalizado = normalizarStatus(venda.status)

    const taxa = taxas.find(
      (item) =>
        item.forma_pagamento === venda.forma_pagamento &&
        Number(item.taxa_percentual) === Number(venda.taxa_percentual)
    )

    const taxaFiado = taxas.find((item) => item.forma_pagamento === 'Fiado / Em aberto')

    setEditandoVendaId(venda.id)
    setClienteId(venda.cliente_id)
    setValorTotal(String(venda.valor_total || ''))
    setDataVenda(venda.data_venda || dataHoje())
    setTaxaSelecionadaId(taxa?.id || taxaFiado?.id || '')
    setStatus(statusNormalizado)

    const pendencia = pendencias.find((item) => item.venda_id === venda.id)
    setVencimento(pendencia?.vencimento || '')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function limparVenda() {
    setEditandoVendaId(null)
    setClienteId('')
    setValorTotal('')
    setDataVenda(dataHoje())
    setStatus('EM ABERTO')
    setVencimento('')

    const fiado = taxas.find((item) => item.forma_pagamento === 'Fiado / Em aberto')
    if (fiado) setTaxaSelecionadaId(fiado.id)
  }

  async function registrarPagamento(vendaId, saldoAtual) {
    const valor = prompt('Digite o valor pago:')

    if (!valor) return

    const valorPago = numero(valor)

    if (valorPago <= 0) {
      alert('Valor inválido.')
      return
    }

    await supabase.from('pagamentos').insert({
      venda_id: vendaId,
      data_pagamento: dataHoje(),
      valor_pago: valorPago,
      forma_pagamento: 'Pix',
      observacao: 'Pagamento registrado pelo Mini ERP',
    })

    const novoSaldo = Number(saldoAtual || 0) - valorPago
    const novoStatus = novoSaldo <= 0 ? 'PAGO' : 'PARCIAL'

    await supabase
      .from('pendencias')
      .update({
        saldo_restante: novoSaldo <= 0 ? 0 : novoSaldo,
        status: novoStatus,
      })
      .eq('venda_id', vendaId)

    await supabase
      .from('vendas')
      .update({
        status: novoStatus,
      })
      .eq('id', vendaId)

    buscarTudo()
  }

  async function excluirVenda(venda) {
    const confirmar = window.confirm(
      `Deseja realmente excluir a venda #${venda.numero_venda}?\n\nTodos os registros vinculados também serão removidos.`
    )

    if (!confirmar) return

    try {
      await supabase
        .from('itens_venda')
        .delete()
        .eq('venda_id', venda.id)

      await supabase
        .from('pagamentos')
        .delete()
        .eq('venda_id', venda.id)

      await supabase
        .from('pendencias')
        .delete()
        .eq('venda_id', venda.id)

      const { error } = await supabase
        .from('vendas')
        .delete()
        .eq('id', venda.id)

      if (error) {
        alert('Erro ao excluir venda.')
        console.error(error)
        return
      }

      limparVenda()
      buscarTudo()
      alert('Venda excluída com sucesso.')
    } catch (erro) {
      alert('Erro ao excluir venda.')
      console.error(erro)
    }
  }

  function cobrarWhatsApp(pendencia) {
    const telefone = limparTelefone(pendencia.vendas?.clientes?.telefone)
    const nomeCliente = pendencia.vendas?.clientes?.nome || 'cliente'
    const valor = moeda(pendencia.saldo_restante)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const mensagem = `Olá, ${nomeCliente}. Tudo bem?

Conforme combinado, seguem os dados para o pagamento via Pix da sua compra:

Chave Pix (e-mail):

queijosserradacanastra@hotmail.com

Dados para conferência:
Delber Juliano Vilaça
Stone Pagamentos S.A.

Valor: ${valor}

Assim que realizar a transferência, peço a gentileza de enviar o comprovante para registro.

Atenciosamente,
Delber Vilaça | Queijos Serra da Canastra`

    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
    window.open(link, '_blank')
  }

  function confirmarPagamentoWhatsApp(pendencia) {
    const telefone = limparTelefone(pendencia.vendas?.clientes?.telefone)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const mensagem = `✅ Pagamento confirmado.

Muito obrigado pela confiança nos produtos da Queijos Serra da Canastra 🇧🇷.

Se precisar fazer um novo pedido ou tiver alguma dúvida, basta entrar em contato. 🤝

Atenciosamente,
Delber Vilaça`

    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
    window.open(link, '_blank')
  }

  async function salvarCliente(e) {
    e.preventDefault()

    if (!formCliente.nome.trim()) {
      alert('Informe o nome do cliente.')
      return
    }

    const telefoneLimpo = limparTelefone(formCliente.telefone)

    const clienteDuplicado = clientes.find((cliente) => {
      const mesmoNome = normalizarTexto(cliente.nome) === normalizarTexto(formCliente.nome)
      const mesmoTelefone = telefoneLimpo && limparTelefone(cliente.telefone) === telefoneLimpo
      const clienteDiferente = String(cliente.id) !== String(editandoClienteId)

      return clienteDiferente && (mesmoNome || mesmoTelefone)
    })

    if (clienteDuplicado) {
      alert('Já existe um cliente cadastrado com este nome ou telefone.')
      return
    }

    const dados = {
      nome: formCliente.nome,
      referencia: formCliente.referencia,
      telefone: telefoneLimpo,
    }

    if (editandoClienteId) {
      const { error } = await supabase.from('clientes').update(dados).eq('id', editandoClienteId)

      if (error) {
        alert('Erro ao editar cliente.')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase.from('clientes').insert({
        ...dados,
        ativo: true,
      })

      if (error) {
        alert('Erro ao cadastrar cliente.')
        console.error(error)
        return
      }
    }

    setFormCliente({ nome: '', referencia: '', telefone: '' })
    setEditandoClienteId(null)
    buscarClientes()
  }

  async function alternarStatusCliente(cliente) {
    const novoStatus = !Boolean(cliente.ativo)
    const acao = novoStatus ? 'reativar' : 'inativar'

    const confirmar = window.confirm(`Deseja ${acao} o cliente ${cliente.nome}?`)

    if (!confirmar) return

    const { error } = await supabase
      .from('clientes')
      .update({ ativo: novoStatus })
      .eq('id', cliente.id)

    if (error) {
      alert('Erro ao alterar status do cliente.')
      console.error(error)
      return
    }

    buscarTudo()
  }

  async function excluirCliente(cliente) {
    const { count, error: erroContagem } = await supabase
      .from('vendas')
      .select('id', { count: 'exact', head: true })
      .eq('cliente_id', cliente.id)

    if (erroContagem) {
      alert('Erro ao verificar histórico do cliente.')
      console.error(erroContagem)
      return
    }

    if (Number(count || 0) > 0) {
      alert('Este cliente possui vendas vinculadas. Para preservar o histórico financeiro, use a opção Inativar.')
      return
    }

    const confirmar = window.confirm(`Deseja excluir definitivamente o cliente ${cliente.nome}?`)

    if (!confirmar) return

    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', cliente.id)

    if (error) {
      alert('Erro ao excluir cliente.')
      console.error(error)
      return
    }

    buscarClientes()
  }

  function editarCliente(cliente) {
    setEditandoClienteId(cliente.id)
    setFormCliente({
      nome: cliente.nome || '',
      referencia: cliente.referencia || '',
      telefone: cliente.telefone || '',
    })
  }

  async function salvarProduto(e) {
    e.preventDefault()

    if (!formProduto.nome.trim()) {
      alert('Informe o nome do produto.')
      return
    }

    const dados = {
      nome: formProduto.nome,
      fornecedor_id: formProduto.fornecedor_id ? Number(formProduto.fornecedor_id) : null,
      preco_custo: numero(formProduto.preco_custo),
      preco_venda: numero(formProduto.preco_venda),
      estoque: Number(formProduto.estoque || 0),
      ativo: Boolean(formProduto.ativo),
    }

    if (editandoProdutoId) {
      const { error } = await supabase.from('produtos').update(dados).eq('id', editandoProdutoId)

      if (error) {
        alert('Erro ao editar produto.')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase.from('produtos').insert(dados)

      if (error) {
        alert('Erro ao cadastrar produto.')
        console.error(error)
        return
      }
    }

    limparProduto()
    buscarProdutos()
  }

  function editarProduto(produto) {
    setEditandoProdutoId(produto.id)
    setFormProduto({
      nome: produto.nome || '',
      fornecedor_id: produto.fornecedor_id ? String(produto.fornecedor_id) : '',
      preco_custo: String(produto.preco_custo || ''),
      preco_venda: String(produto.preco_venda || ''),
      estoque: String(produto.estoque || ''),
      ativo: Boolean(produto.ativo),
    })
  }

  function limparProduto() {
    setEditandoProdutoId(null)
    setFormProduto({
      nome: '',
      fornecedor_id: '',
      preco_custo: '',
      preco_venda: '',
      estoque: '',
      ativo: true,
    })
  }

  async function excluirProduto(produto) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o produto "${produto.nome}"?\n\nEssa ação deve ser usada apenas para produtos cadastrados por engano ou duplicados.`
    )

    if (!confirmar) return

    const { data: itensVinculados, error: erroConsulta } = await supabase
      .from('itens_venda')
      .select('id')
      .eq('produto_id', produto.id)
      .limit(1)

    if (erroConsulta) {
      alert('Erro ao verificar se o produto possui lançamentos.')
      console.error(erroConsulta)
      return
    }

    if (itensVinculados && itensVinculados.length > 0) {
      alert(
        'Este produto já possui itens lançados em vendas. Para preservar o histórico financeiro, ele não pode ser excluído. Edite o produto e marque como inativo.'
      )
      return
    }

    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', produto.id)

    if (error) {
      alert('Erro ao excluir produto.')
      console.error(error)
      return
    }

    limparProduto()
    buscarTudo()
    alert('Produto excluído com sucesso.')
  }

  async function salvarTaxa(e) {
    e.preventDefault()

    if (!formTaxa.forma_pagamento.trim()) {
      alert('Informe a forma de pagamento.')
      return
    }

    const dados = {
      forma_pagamento: formTaxa.forma_pagamento,
      taxa_percentual: numero(formTaxa.taxa_percentual),
    }

    if (editandoTaxaId) {
      await supabase.from('taxas').update(dados).eq('id', editandoTaxaId)
    } else {
      await supabase.from('taxas').insert(dados)
    }

    setFormTaxa({ forma_pagamento: '', taxa_percentual: '' })
    setEditandoTaxaId(null)
    buscarTaxas()
  }

  function editarTaxa(taxa) {
    setEditandoTaxaId(taxa.id)
    setFormTaxa({
      forma_pagamento: taxa.forma_pagamento || '',
      taxa_percentual: String(taxa.taxa_percentual || ''),
    })
  }

  async function salvarFornecedor(e) {
    e.preventDefault()

    if (!formFornecedor.nome.trim()) {
      alert('Informe o nome do fornecedor.')
      return
    }

    const dados = {
      nome: formFornecedor.nome,
      contato: formFornecedor.contato || null,
      telefone: limparTelefone(formFornecedor.telefone),
      cidade: formFornecedor.cidade || null,
      observacao: formFornecedor.observacao || null,
      ativo: Boolean(formFornecedor.ativo),
    }

    if (editandoFornecedorId) {
      const { error } = await supabase
        .from('fornecedores')
        .update(dados)
        .eq('id', editandoFornecedorId)

      if (error) {
        alert('Erro ao editar fornecedor.')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase.from('fornecedores').insert(dados)

      if (error) {
        alert('Erro ao cadastrar fornecedor.')
        console.error(error)
        return
      }
    }

    limparFornecedor()
    buscarFornecedores()
  }

  function editarFornecedor(fornecedor) {
    setEditandoFornecedorId(fornecedor.id)
    setFormFornecedor({
      nome: fornecedor.nome || '',
      contato: fornecedor.contato || '',
      telefone: fornecedor.telefone || '',
      cidade: fornecedor.cidade || '',
      observacao: fornecedor.observacao || '',
      ativo: Boolean(fornecedor.ativo),
    })
  }

  function limparFornecedor() {
    setEditandoFornecedorId(null)
    setFormFornecedor({
      nome: '',
      contato: '',
      telefone: '',
      cidade: '',
      observacao: '',
      ativo: true,
    })
  }

  async function salvarMovimentacaoProduto(e) {
    e.preventDefault()

    const vendaIdFinal = formMovimentacaoProduto.venda_id || vendas[0]?.id

    if (!vendaIdFinal) {
      alert('Cadastre uma venda antes de lançar os itens.')
      return
    }

    if (!formMovimentacaoProduto.produto_id) {
      alert('Selecione o produto.')
      return
    }

    const quantidade = Number(formMovimentacaoProduto.quantidade || 0)

    if (quantidade <= 0) {
      alert('Informe a quantidade vendida.')
      return
    }

    const venda = vendas.find((item) => String(item.id) === String(vendaIdFinal))
    const produto = produtos.find((item) => String(item.id) === String(formMovimentacaoProduto.produto_id))

    if (!venda || !produto) {
      alert('Venda ou produto não encontrado.')
      return
    }

    const precoCusto = Number(produto.preco_custo || 0)
    const precoVenda = Number(produto.preco_venda || 0)
    const valorTotalProduto = precoVenda * quantidade
    const custoTotalProduto = precoCusto * quantidade
    const lucroTotalProduto = valorTotalProduto - custoTotalProduto

    const dados = {
      venda_id: venda.id,
      produto_id: produto.id,
      fornecedor_id: produto.fornecedor_id || null,
      quantidade,
      preco_custo: precoCusto,
      preco_venda: precoVenda,
      subtotal_venda: valorTotalProduto,
      subtotal_custo: custoTotalProduto,
      lucro: lucroTotalProduto,
    }

    if (editandoMovimentacaoProdutoId) {
      const { error } = await supabase
        .from('itens_venda')
        .update(dados)
        .eq('id', editandoMovimentacaoProdutoId)

      if (error) {
        alert(`Erro ao editar item lançado. ${error.message || ''}`)
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase.from('itens_venda').insert(dados)

      if (error) {
        alert(`Erro ao lançar produto vendido. ${error.message || ''}`)
        console.error(error)
        return
      }
    }

    limparMovimentacaoProduto()
    buscarTudo()
  }

  function editarMovimentacaoProduto(item) {
    setEditandoMovimentacaoProdutoId(item.id)

    setFormMovimentacaoProduto({
      venda_id: item.venda_id || '',
      produto_id: item.produto_id || '',
      quantidade: String(item.quantidade || ''),
      observacao: item.observacao || '',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function limparMovimentacaoProduto() {
    setEditandoMovimentacaoProdutoId(null)

    setFormMovimentacaoProduto({
      venda_id: '',
      produto_id: '',
      quantidade: '',
      observacao: '',
    })
  }

  async function excluirMovimentacaoProduto(item) {
    const confirmar = window.confirm(
      `Deseja excluir o item ${item.produtos?.nome || ''} da venda #${item.vendas?.numero_venda}?`
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('itens_venda')
      .delete()
      .eq('id', item.id)

    if (error) {
      alert('Erro ao excluir item lançado.')
      console.error(error)
      return
    }

    limparMovimentacaoProduto()
    buscarTudo()
  }


  async function salvarDespesa(e) {
    e.preventDefault()

    if (!formDespesa.descricao.trim()) {
      alert('Informe a descrição da despesa.')
      return
    }

    const valorDespesa = numero(formDespesa.valor)

    if (valorDespesa <= 0) {
      alert('Informe o valor da despesa.')
      return
    }

    const dados = {
      data_despesa: formDespesa.data_despesa || dataHoje(),
      categoria: formDespesa.categoria || 'Outros custos',
      descricao: formDespesa.descricao,
      valor: valorDespesa,
      observacao: formDespesa.observacao || null,
    }

    if (editandoDespesaId) {
      const { error } = await supabase
        .from('despesas')
        .update(dados)
        .eq('id', editandoDespesaId)

      if (error) {
        alert('Erro ao editar despesa.')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase
        .from('despesas')
        .insert(dados)

      if (error) {
        alert('Erro ao cadastrar despesa.')
        console.error(error)
        return
      }
    }

    limparDespesa()
    buscarDespesas()
  }

  function editarDespesa(despesa) {
    setEditandoDespesaId(despesa.id)
    setFormDespesa({
      data_despesa: despesa.data_despesa || '',
      categoria: despesa.categoria || 'Outros custos',
      descricao: despesa.descricao || '',
      valor: String(despesa.valor || ''),
      observacao: despesa.observacao || '',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function limparDespesa() {
    setEditandoDespesaId(null)
    setFormDespesa({
      data_despesa: dataHoje(),
      categoria: 'Abastecimento',
      descricao: '',
      valor: '',
      observacao: '',
    })
  }

  async function excluirDespesa(despesa) {
    const confirmar = window.confirm(
      `Deseja realmente excluir a despesa "${despesa.descricao}"?`
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('despesas')
      .delete()
      .eq('id', despesa.id)

    if (error) {
      alert('Erro ao excluir despesa.')
      console.error(error)
      return
    }

    limparDespesa()
    buscarDespesas()
  }


  function preencherDeliveryPorVenda(vendaId) {
    if (!vendaId) {
      setFormDelivery({
        ...formDelivery,
        venda_id: '',
        cliente_id: '',
        referencia: '',
        valor_total: '',
        descricao: '',
      })
      return
    }

    const venda = vendas.find((item) => String(item.id) === String(vendaId))

    if (!venda) return

    setFormDelivery({
      ...formDelivery,
      venda_id: venda.id,
      cliente_id: venda.cliente_id || '',
      referencia: venda.clientes?.referencia || '',
      valor_total: String(venda.valor_total || ''),
      descricao: `Venda #${venda.numero_venda}`,
    })
  }

  async function salvarDelivery(e) {
    e.preventDefault()

    if (!formDelivery.cliente_id) {
      alert('Selecione um cliente para a entrega.')
      return
    }

    if (!formDelivery.data_entrega) {
      alert('Informe a data da entrega.')
      return
    }

    const dados = {
      venda_id: formDelivery.venda_id || null,
      data_pedido: formDelivery.data_pedido || dataHoje(),
      data_entrega: formDelivery.data_entrega || null,
      cliente_id: formDelivery.cliente_id,
      referencia: formDelivery.referencia || null,
      local_entrega: formDelivery.local_entrega || null,
      descricao: formDelivery.descricao || null,
      valor_total: numero(formDelivery.valor_total),
      status: formDelivery.status || 'Programado',
    }

    if (editandoDeliveryId) {
      const { error } = await supabase
        .from('delivery')
        .update(dados)
        .eq('id', editandoDeliveryId)

      if (error) {
        alert(`Erro ao editar entrega. ${error.message || ''}`)
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase
        .from('delivery')
        .insert(dados)

      if (error) {
        alert(`Erro ao cadastrar entrega. ${error.message || ''}`)
        console.error(error)
        return
      }
    }

    limparDelivery()
    buscarDelivery()
  }

  function editarDelivery(item) {
    setEditandoDeliveryId(item.id)

    setFormDelivery({
      venda_id: item.venda_id || '',
      data_pedido: item.data_pedido || dataHoje(),
      data_entrega: item.data_entrega || '',
      cliente_id: item.cliente_id || '',
      referencia: item.referencia || item.clientes?.referencia || '',
      local_entrega: item.local_entrega || '',
      descricao: item.descricao || '',
      valor_total: String(item.valor_total || ''),
      status: item.status || 'Programado',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function limparDelivery() {
    setEditandoDeliveryId(null)
    setFormDelivery({
      venda_id: '',
      data_pedido: dataHoje(),
      data_entrega: '',
      cliente_id: '',
      referencia: '',
      local_entrega: '',
      descricao: '',
      valor_total: '',
      status: 'Programado',
    })
  }

  async function excluirDelivery(item) {
    const confirmar = window.confirm(
      `Deseja excluir a entrega de ${item.clientes?.nome || 'cliente'}?`
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('delivery')
      .delete()
      .eq('id', item.id)

    if (error) {
      alert('Erro ao excluir entrega.')
      console.error(error)
      return
    }

    limparDelivery()
    buscarDelivery()
  }

  function botaoMenu(id, icone, texto) {
    const ativo = pagina === id

    return (
      <button
        onClick={() => { setPagina(id); setMenuMobileAberto(false) }}
        className={`shrink-0 rounded-2xl px-4 py-3 text-left transition lg:w-full lg:p-4 ${
          ativo ? 'bg-orange-950 text-white' : 'hover:bg-zinc-900 text-zinc-300'
        }`}
      >
        {icone} {texto}
      </button>
    )
  }

  function CardResumo({ titulo, valor, classe }) {
    return (
      <div className="bg-black border border-orange-950 rounded-[28px] p-6">
        <p className="text-zinc-500 mb-3">{titulo}</p>
        <h3 className={`text-3xl font-bold ${classe}`}>{valor}</h3>
      </div>
    )
  }

  function TelaPainel() {
    const totalBruto = vendas.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const totalLiquido = vendas.reduce((acc, venda) => acc + Number(venda.valor_liquido || 0), 0)
    const totalTaxas = vendas.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const totalPendencias = pendencias.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)
    const totalRecebido = pagamentos.reduce((acc, pagamento) => acc + Number(pagamento.valor_pago || 0), 0)
    const totalCustoProdutos = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const lucroProdutos = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.lucro || 0), 0)
    const totalDespesas = despesas.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalAbastecimentos = despesas.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoes = despesas.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustos = despesas.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const lucroLiquidoReal = lucroProdutos - totalDespesas
    const pecasVendidas = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const numeroVendas = vendas.length
    const clientesAtendidos = new Set(vendas.map((venda) => venda.cliente_id).filter(Boolean)).size

    const pecasPagas = movimentacoesProdutos.reduce((acc, item) => {
      const venda = vendas.find((registro) => registro.id === item.venda_id)
      return normalizarStatus(venda?.status) === 'PAGO'
        ? acc + Number(item.quantidade || 0)
        : acc
    }, 0)

    const pecasFiadas = movimentacoesProdutos.reduce((acc, item) => {
      const venda = vendas.find((registro) => registro.id === item.venda_id)
      return normalizarStatus(venda?.status) !== 'PAGO'
        ? acc + Number(item.quantidade || 0)
        : acc
    }, 0)

    const amostras = movimentacoesProdutos.reduce((acc, item) => {
      const observacao = normalizarTexto(item.observacao)
      return observacao.includes('amostra') || observacao.includes('degust')
        ? acc + Number(item.quantidade || 0)
        : acc
    }, 0)

    const ticketMedio = numeroVendas > 0 ? totalBruto / numeroVendas : 0
    const lucroPorPeca = pecasVendidas > 0 ? lucroProdutos / pecasVendidas : 0
    const mediaPecasPorCliente = clientesAtendidos > 0 ? pecasVendidas / clientesAtendidos : 0
    const mediaPecasPorVenda = numeroVendas > 0 ? pecasVendidas / numeroVendas : 0
    const margemLiquida = totalBruto > 0 ? (lucroProdutos / totalBruto) * 100 : 0
    const margemLiquidaReal = totalBruto > 0 ? (lucroLiquidoReal / totalBruto) * 100 : 0

    const semanas = [1, 2, 3, 4, 5]

    function semanaDoMes(data) {
      if (!data) return 1
      const dia = Number(String(data).slice(8, 10)) || 1
      return Math.min(Math.ceil(dia / 7), 5)
    }

    const liquidoPorSemana = semanas.map((semana) => {
      return vendas
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .reduce((acc, venda) => acc + Number(venda.valor_liquido || 0), 0)
    })

    const clientesPorSemana = semanas.map((semana) => {
      const clientesSemana = vendas
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .map((venda) => venda.cliente_id)
        .filter(Boolean)

      return new Set(clientesSemana).size
    })

    const pecasPorSemana = semanas.map((semana) => {
      return movimentacoesProdutos
        .filter((item) => semanaDoMes(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)) === semana)
        .reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    })

    function LinhaRelatorio({ rotulo, valor, destaque }) {
      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <span className="text-zinc-400">{rotulo}</span>
          <span className={`font-semibold ${destaque || 'text-white'}`}>{valor}</span>
        </div>
      )
    }

    function BlocoRelatorio({ titulo, children }) {
      return (
        <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30">
          <div className="bg-[#111827] px-4 py-3 text-center font-bold text-white">
            {titulo}
          </div>

          <div className="text-sm">
            {children}
          </div>
        </div>
      )
    }

    return (
      <>
        <section className="mobile-summary-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <CardResumo titulo="Total bruto" valor={moeda(totalBruto)} classe="text-green-300" />
          <CardResumo titulo="Lucro líquido real" valor={moeda(lucroLiquidoReal)} classe={lucroLiquidoReal >= 0 ? 'text-green-400' : 'text-red-300'} />
          <CardResumo titulo="Despesas" valor={moeda(totalDespesas)} classe="text-red-300" />
          <CardResumo titulo="Em aberto" valor={moeda(totalPendencias)} classe="text-orange-300" />
        </section>

        <section className="mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Relatório Geral</h2>
              <p className="text-zinc-500 mt-2">Visão executiva do mês, baseada nas vendas, pagamentos e produtos lançados.</p>
            </div>

            <span className="bg-green-950 text-green-300 px-4 py-2 rounded-2xl text-sm font-semibold">
              Painel Executivo
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
            <BlocoRelatorio titulo="Lançamentos">
              <LinhaRelatorio rotulo="Vendas brutas" valor={moeda(totalBruto)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Vendas líquidas" valor={moeda(totalLiquido)} destaque="text-green-400" />
              <LinhaRelatorio rotulo="Taxas de cartões e links" valor={moeda(totalTaxas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Pagamentos recebidos" valor={moeda(totalRecebido)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Fiados em aberto" valor={moeda(totalPendencias)} destaque="text-orange-300" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Peças e atendimento">
              <LinhaRelatorio rotulo="Peças vendidas" valor={pecasVendidas} destaque="text-white" />
              <LinhaRelatorio rotulo="Peças pagas" valor={pecasPagas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Peças em aberto" valor={pecasFiadas} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Amostras e degustações" valor={amostras} destaque="text-zinc-300" />
              <LinhaRelatorio rotulo="Clientes atendidos" valor={clientesAtendidos} destaque="text-white" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Médias">
              <LinhaRelatorio rotulo="Ticket médio" valor={moeda(ticketMedio)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Lucro por peça" valor={moeda(lucroPorPeca)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Margem bruta dos produtos" valor={percentual(margemLiquida)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Margem líquida real" valor={percentual(margemLiquidaReal)} destaque={margemLiquidaReal >= 0 ? 'text-green-300' : 'text-red-300'} />
              <LinhaRelatorio rotulo="Média peças por cliente" valor={mediaPecasPorCliente.toFixed(1).replace('.', ',')} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por venda" valor={mediaPecasPorVenda.toFixed(1).replace('.', ',')} destaque="text-white" />
            </BlocoRelatorio>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <BlocoRelatorio titulo="Valor líquido semanal">
              {semanas.map((semana, index) => (
                <LinhaRelatorio key={semana} rotulo={`Semana ${semana}`} valor={moeda(liquidoPorSemana[index])} destaque="text-green-300" />
              ))}
              <LinhaRelatorio rotulo="Total do período" valor={moeda(totalLiquido)} destaque="text-green-400" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Clientes por semana">
              {semanas.map((semana, index) => (
                <LinhaRelatorio key={semana} rotulo={`Semana ${semana}`} valor={clientesPorSemana[index]} destaque="text-white" />
              ))}
              <LinhaRelatorio rotulo="Total do mês" valor={clientesAtendidos} destaque="text-green-300" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Resumo de peças">
              <LinhaRelatorio rotulo="Peças vendidas" valor={pecasVendidas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Peças pagas" valor={pecasPagas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Peças em aberto" valor={pecasFiadas} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Amostras e degustações" valor={amostras} destaque="text-zinc-300" />
              <LinhaRelatorio rotulo="Média peças por venda" valor={mediaPecasPorVenda.toFixed(1).replace('.', ',')} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por cliente" valor={mediaPecasPorCliente.toFixed(1).replace('.', ',')} destaque="text-white" />
            </BlocoRelatorio>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
            <BlocoRelatorio titulo="Fornecedores">
              <LinhaRelatorio rotulo="Total a pagar por produtos" valor={moeda(totalCustoProdutos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Lucro bruto dos produtos" valor={moeda(lucroProdutos)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Despesas operacionais" valor={moeda(totalDespesas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Lucro líquido real" valor={moeda(lucroLiquidoReal)} destaque={lucroLiquidoReal >= 0 ? 'text-green-300' : 'text-red-300'} />
              <LinhaRelatorio rotulo="Produtos com fornecedor" valor={produtos.filter((produto) => produto.fornecedor_id).length} destaque="text-white" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Status comercial">
              <LinhaRelatorio rotulo="Número de vendas" valor={numeroVendas} destaque="text-white" />
              <LinhaRelatorio rotulo="Vendas pagas" valor={vendas.filter((venda) => normalizarStatus(venda.status) === 'PAGO').length} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Vendas em aberto" valor={vendas.filter((venda) => normalizarStatus(venda.status) !== 'PAGO').length} destaque="text-orange-300" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Despesas">
              <LinhaRelatorio rotulo="Abastecimentos" valor={moeda(totalAbastecimentos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Degustações" valor={moeda(totalDegustacoes)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Outros custos" valor={moeda(totalOutrosCustos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Total de despesas" valor={moeda(totalDespesas)} destaque="text-red-300" />
            </BlocoRelatorio>
          </div>
        </section>

        {TelaVendas()}
      </>
    )
  }

  function TelaVendas() {
    const termo = normalizarTexto(buscaVendas)

    const vendasFiltradas = vendas.filter((venda) => {
      const texto = normalizarTexto(`
        ${venda.numero_venda}
        ${venda.clientes?.nome}
        ${venda.clientes?.referencia}
        ${venda.forma_pagamento}
        ${normalizarStatus(venda.status)}
      `)

      return texto.includes(termo)
    })

    return (
      <>
        <section className="sticky top-0 z-40 bg-[#15110f]/95 backdrop-blur border border-orange-950 rounded-[28px] p-5 mb-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {editandoVendaId ? 'Editar Venda' : 'Nova Venda'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Barra fixa de lançamento. Role a lista sem perder o formulário de venda.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 min-w-[520px]">
              <div className="bg-black border border-zinc-800 rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase text-zinc-500 mb-1">Taxa</p>
                <p className="text-lg font-bold text-orange-300">{percentual(percentualTaxa)}</p>
              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase text-zinc-500 mb-1">Valor da taxa</p>
                <p className="text-lg font-bold text-red-300">{moeda(valorTaxa)}</p>
              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase text-zinc-500 mb-1">Líquido</p>
                <p className="text-lg font-bold text-green-300">{moeda(valorLiquido)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={salvarVenda} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-end">
            <div className="lg:col-span-1 xl:col-span-3">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Cliente
              </label>

              <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              >
                <option value="">Selecionar cliente</option>
                {clientes
                  .filter((cliente) => cliente.ativo !== false || String(cliente.id) === String(clienteId))
                  .map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} | {cliente.referencia} {cliente.ativo === false ? '| Inativo' : ''}
                    </option>
                  ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Valor
              </label>

              <input
                type="text"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
                placeholder="0,00"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              />
            </div>

            <div className="lg:col-span-1 xl:col-span-2">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Data
              </label>

              <input
                type="date"
                onClick={abrirCalendario}
                onFocus={abrirCalendario}
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              />
            </div>

            <div className="lg:col-span-1 xl:col-span-2">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Pagamento
              </label>

              <select
                value={taxaSelecionadaId}
                onChange={(e) => setTaxaSelecionadaId(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              >
                {taxas.map((taxa) => (
                  <option key={taxa.id} value={taxa.id}>
                    {taxa.forma_pagamento} | {percentual(taxa.taxa_percentual)}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              >
                <option value="EM ABERTO">Em aberto</option>
                <option value="PARCIAL">Parcial</option>
                <option value="PAGO">Pago</option>
              </select>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Vencimento
              </label>

              <input
                type="date"
                onClick={abrirCalendario}
                onFocus={abrirCalendario}
                value={vencimento}
                onChange={(e) => setVencimento(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              />
            </div>

            <button type="submit" className="lg:col-span-1 bg-orange-950 hover:bg-orange-900 rounded-2xl px-4 py-3 text-sm font-semibold transition">
              {editandoVendaId ? 'Salvar' : 'Lançar'}
            </button>

            <button type="button" onClick={limparVenda} className="lg:col-span-1 bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-4 py-3 text-sm font-semibold transition">
              Limpar
            </button>
          </form>
        </section>

        <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
          <div className="sticky top-[158px] z-30 bg-black/95 backdrop-blur flex items-center justify-between gap-4 mb-6 py-3">
            <div>
              <h2 className="mini-section-title mini-vendas-title mini-mobile-card-section text-3xl font-bold">Vendas Recentes</h2>
              <p className="text-zinc-500 text-sm mt-1">A lista rola normalmente, mantendo o lançamento sempre acessível no topo.</p>
            </div>

            <input
              value={buscaVendas}
              onChange={(e) => setBuscaVendas(e.target.value)}
              placeholder="Buscar venda, cliente, referência ou status"
              className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
          </div>

          <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
            <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
              <thead className="sticky top-[244px] z-20 bg-zinc-950">
                <tr className="text-left text-zinc-500 uppercase text-xs">
                  <th className="p-5">Venda</th>
                  <th className="p-5">Data</th>
                  <th className="p-5">Cliente</th>
                  <th className="p-5">Referência</th>
                  <th className="p-5">Valor</th>
                  <th className="p-5">Taxa</th>
                  <th className="p-5">Líquido</th>
                  <th className="p-5">Pagamento</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Ação</th>
                </tr>
              </thead>

              <tbody>
                {vendasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="10" className="p-5 text-zinc-500">
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                )}

                {vendasFiltradas.map((venda) => (
                  <tr key={venda.id} className="border-t border-zinc-900">
                    <td className="p-5">#{venda.numero_venda}</td>
                    <td className="p-5 text-zinc-400">{dataBR(venda.data_venda)}</td>
                    <td className="p-5 font-semibold">{venda.clientes?.nome}</td>
                    <td className="p-5 text-zinc-400">{venda.clientes?.referencia || 'Sem referência'}</td>
                    <td className="p-5">{moeda(venda.valor_total)}</td>
                    <td className="p-5 text-red-300">{moeda(venda.valor_taxa)}</td>
                    <td className="p-5 text-green-300">{moeda(venda.valor_liquido)}</td>
                    <td className="p-5">{venda.forma_pagamento}</td>
                    <td className="p-5">
                      <span className="bg-orange-950 text-orange-300 px-4 py-2 rounded-xl text-sm">
                        {normalizarStatus(venda.status)}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-2">
                        <button onClick={() => editarVenda(venda)} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl">
                          Editar
                        </button>

                        <button onClick={() => excluirVenda(venda)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-xl">
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
      </>
    )
  }


  function TelaClientes() {
    const termo = normalizarTexto(buscaClientes)

    const clientesFiltrados = clientes.filter((cliente) => {
      const texto = normalizarTexto(`
        ${cliente.nome}
        ${cliente.referencia}
        ${cliente.telefone}
        ${cliente.ativo === false ? 'inativo' : 'ativo'}
      `)

      return texto.includes(termo)
    })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Clientes</h2>

          <input
            value={buscaClientes}
            onChange={(e) => setBuscaClientes(e.target.value)}
            placeholder="Buscar cliente, referência ou telefone"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <form onSubmit={salvarCliente} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <input value={formCliente.nome} onChange={(e) => setFormCliente({ ...formCliente, nome: e.target.value })} placeholder="Nome do cliente" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formCliente.referencia} onChange={(e) => setFormCliente({ ...formCliente, referencia: e.target.value })} placeholder="Referência" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formCliente.telefone} onChange={(e) => setFormCliente({ ...formCliente, telefone: e.target.value })} placeholder="Telefone com DDI. Ex: 5561993020000" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoClienteId ? 'Salvar edição' : 'Cadastrar cliente'}
          </button>
        </form>

        <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Cliente</th>
                <th className="p-4">Referência</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-5 text-zinc-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}

              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-t border-zinc-900">
                  <td className="p-4 font-semibold">{cliente.nome}</td>
                  <td className="p-4 text-zinc-400">{cliente.referencia || 'Sem referência'}</td>
                  <td className="p-4 text-zinc-400">{cliente.telefone || 'Sem telefone'}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                        cliente.ativo === false
                          ? 'bg-red-950 text-red-300'
                          : 'bg-green-950 text-green-300'
                      }`}
                    >
                      {cliente.ativo === false ? 'Inativo' : 'Ativo'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => editarCliente(cliente)} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl">
                        Editar
                      </button>

                      <button onClick={() => alternarStatusCliente(cliente)} className="bg-orange-950 hover:bg-orange-900 px-4 py-2 rounded-xl">
                        {cliente.ativo === false ? 'Reativar' : 'Inativar'}
                      </button>

                      <button onClick={() => excluirCliente(cliente)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-xl">
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

  function TelaPendencias() {
    const termo = normalizarTexto(buscaPendencias)

    const listaPendencias = pendencias
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((pendencia) => {
        const texto = normalizarTexto(`
          ${pendencia.vendas?.numero_venda}
          ${pendencia.vendas?.clientes?.nome}
          ${pendencia.vendas?.clientes?.referencia}
          ${pendencia.vendas?.clientes?.telefone}
          ${normalizarStatus(pendencia.status)}
        `)

        return texto.includes(termo)
      })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Pendências</h2>

          <input
            value={buscaPendencias}
            onChange={(e) => setBuscaPendencias(e.target.value)}
            placeholder="Buscar cliente, referência, telefone ou venda"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Cliente</th>
                <th className="p-4">Referência</th>
                <th className="p-4">Venda</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Vencimento</th>
                <th className="p-4">Status</th>
                <th className="p-4">Saldo</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {listaPendencias.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-5 text-zinc-500">
                    Nenhuma pendência encontrada.
                  </td>
                </tr>
              )}

              {listaPendencias.map((pendencia) => (
                <tr key={pendencia.id} className="border-t border-zinc-900">
                  <td className="p-4 font-semibold">{pendencia.vendas?.clientes?.nome}</td>
                  <td className="p-4 text-zinc-400">{pendencia.vendas?.clientes?.referencia || 'Sem referência'}</td>
                  <td className="p-4">#{pendencia.vendas?.numero_venda}</td>
                  <td className="p-4 text-zinc-400">{pendencia.vendas?.clientes?.telefone || 'Sem telefone'}</td>
                  <td className="p-4">{pendencia.vencimento || 'Sem vencimento'}</td>
                  <td className="p-4">
                    <span className="bg-orange-950 text-orange-300 px-3 py-1 rounded-xl text-xs">
                      {normalizarStatus(pendencia.status)}
                    </span>
                  </td>
                  <td className="p-4 text-orange-300 font-bold">{moeda(pendencia.saldo_restante)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => cobrarWhatsApp(pendencia)} className="bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded-xl text-sm">
                        Cobrar
                      </button>

                      <button onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante)} className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-xl text-sm">
                        Registrar
                      </button>

                      <button onClick={() => confirmarPagamentoWhatsApp(pendencia)} className="bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-xl text-sm">
                        Confirmar pagamento
                      </button>

                      <button
                        onClick={() =>
                          excluirVenda({
                            id: pendencia.venda_id,
                            numero_venda: pendencia.vendas?.numero_venda,
                          })
                        }
                        className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-xl text-sm"
                      >
                        Excluir venda
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

  function TelaPagamentos() {
    const termo = normalizarTexto(buscaPagamentos)

    const pagamentosFiltrados = pagamentos.filter((pagamento) => {
      const texto = normalizarTexto(`
        ${pagamento.data_pagamento}
        ${pagamento.vendas?.clientes?.nome}
        ${pagamento.vendas?.clientes?.referencia}
        ${pagamento.vendas?.numero_venda}
        ${pagamento.valor_pago}
        ${pagamento.forma_pagamento}
        ${pagamento.observacao}
      `)

      return texto.includes(termo)
    })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Pagamentos</h2>

          <input
            value={buscaPagamentos}
            onChange={(e) => setBuscaPagamentos(e.target.value)}
            placeholder="Buscar pagamento, cliente, venda ou forma"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-5">Data</th>
                <th className="p-5">Cliente</th>
                <th className="p-5">Venda</th>
                <th className="p-5">Valor pago</th>
                <th className="p-5">Forma</th>
                <th className="p-5">Observação</th>
              </tr>
            </thead>

            <tbody>
              {pagamentosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-5 text-zinc-500">
                    Nenhum pagamento encontrado.
                  </td>
                </tr>
              )}

              {pagamentosFiltrados.map((pagamento) => (
                <tr key={pagamento.id} className="border-t border-zinc-900">
                  <td className="p-5">{pagamento.data_pagamento}</td>
                  <td className="p-5">{pagamento.vendas?.clientes?.nome}</td>
                  <td className="p-5">#{pagamento.vendas?.numero_venda}</td>
                  <td className="p-5 text-green-300">{moeda(pagamento.valor_pago)}</td>
                  <td className="p-5">{pagamento.forma_pagamento}</td>
                  <td className="p-5 text-zinc-500">{pagamento.observacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  function TelaProdutosControle() {
    const termo = normalizarTexto(buscaProdutosControle)

    const totalPecas = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const totalVendido = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.subtotal_venda || 0), 0)
    const totalCusto = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalLucro = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.lucro || 0), 0)

    const resumoProdutos = produtos.map((produto) => {
      const movimentosProduto = movimentacoesProdutos.filter((item) => item.produto_id === produto.id)

      const quantidade = movimentosProduto.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
      const valorTotal = movimentosProduto.reduce((acc, item) => acc + Number(item.subtotal_venda || 0), 0)
      const custoTotal = movimentosProduto.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
      const lucroTotal = movimentosProduto.reduce((acc, item) => acc + Number(item.lucro || 0), 0)

      const precoCusto = Number(produto.preco_custo || 0)
      const precoVenda = Number(produto.preco_venda || 0)
      const lucroBruto = precoVenda - precoCusto
      const margem = precoVenda > 0 ? (lucroBruto / precoVenda) * 100 : 0
      const markup = precoCusto > 0 ? precoVenda / precoCusto : 0

      return {
        ...produto,
        quantidade,
        valorTotal,
        custoTotal,
        lucroTotal,
        lucroBruto,
        margem,
        markup,
      }
    })

    const resumoProdutosFiltrados = resumoProdutos.filter((produto) => {
      const texto = normalizarTexto(`
        ${produto.nome}
        ${produto.fornecedores?.nome}
        ${produto.preco_custo}
        ${produto.preco_venda}
        ${produto.quantidade}
      `)

      return texto.includes(termo)
    })

    const movimentacoesProdutosFiltradas = movimentacoesProdutos.filter((item) => {
      const texto = normalizarTexto(`
        ${item.vendas?.numero_venda}
        ${item.vendas?.clientes?.nome}
        ${item.vendas?.clientes?.referencia}
        ${item.produtos?.nome}
        ${item.fornecedores?.nome}
        ${item.quantidade}
        ${item.subtotal_venda}
        ${item.subtotal_custo}
        ${item.lucro}
      `)

      return texto.includes(termo)
    })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Produtos & Controle</h2>

          <input
            value={buscaProdutosControle}
            onChange={(e) => setBuscaProdutosControle(e.target.value)}
            placeholder="Buscar produto, fornecedor, cliente, referência ou venda"
            className="w-[460px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <CardResumo titulo="Peças vendidas" valor={totalPecas} classe="text-white" />
          <CardResumo titulo="Total vendido" valor={moeda(totalVendido)} classe="text-green-300" />
          <CardResumo titulo="Total a pagar" valor={moeda(totalCusto)} classe="text-red-300" />
          <CardResumo titulo="Lucro total" valor={moeda(totalLucro)} classe="text-orange-300" />
        </section>

        <form onSubmit={salvarMovimentacaoProduto} className="grid grid-cols-3 gap-4 mb-4">
          <select
            value={formMovimentacaoProduto.produto_id}
            onChange={(e) =>
              setFormMovimentacaoProduto({
                ...formMovimentacaoProduto,
                produto_id: e.target.value,
              })
            }
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <option value="">Selecionar produto</option>
            {produtos
              .filter((produto) => produto.ativo !== false || String(produto.id) === String(formMovimentacaoProduto.produto_id))
              .map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} | {produto.fornecedores?.nome || 'Sem fornecedor'}
                </option>
              ))}
          </select>

          <input
            value={formMovimentacaoProduto.quantidade}
            onChange={(e) =>
              setFormMovimentacaoProduto({
                ...formMovimentacaoProduto,
                quantidade: e.target.value,
              })
            }
            placeholder="Quantidade"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoMovimentacaoProdutoId ? 'Salvar edição' : 'Lançar item'}
          </button>
        </form>

        {editandoMovimentacaoProdutoId && (
          <button
            type="button"
            onClick={limparMovimentacaoProduto}
            className="w-full mb-8 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold"
          >
            Cancelar edição do item vendido
          </button>
        )}

        <div className="overflow-hidden rounded-2xl border border-zinc-900 mb-8">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Produto</th>
                <th className="p-4">Fornecedor</th>
                <th className="p-4">Custo</th>
                <th className="p-4">Venda</th>
                <th className="p-4">%</th>
                <th className="p-4">Lucro bruto</th>
                <th className="p-4">Markup</th>
                <th className="p-4">Total peças</th>
                <th className="p-4">Total a pagar</th>
                <th className="p-4">Lucro total</th>
                <th className="p-4">Ação</th>
              </tr>
            </thead>

            <tbody>
              {resumoProdutosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="11" className="p-4 text-zinc-500">
                    Nenhum produto encontrado no controle.
                  </td>
                </tr>
              )}

              {resumoProdutosFiltrados.map((produto) => (
                <tr key={produto.id} className="border-t border-zinc-900">
                  <td className="p-4">{produto.nome}</td>
                  <td className="p-4">{produto.fornecedores?.nome || 'Sem fornecedor'}</td>
                  <td className="p-4">{moeda(produto.preco_custo)}</td>
                  <td className="p-4 text-green-300">{moeda(produto.preco_venda)}</td>
                  <td className="p-4 text-orange-300">{percentual(produto.margem)}</td>
                  <td className="p-4">{moeda(produto.lucroBruto)}</td>
                  <td className="p-4">{Number(produto.markup || 0).toFixed(2).replace('.', ',')}</td>
                  <td className="p-4">{produto.quantidade}</td>
                  <td className="p-4 text-red-300">{moeda(produto.custoTotal)}</td>
                  <td className="p-4 text-green-300">{moeda(produto.lucroTotal)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setPagina('produtos')
                        editarProduto(produto)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
                    >
                      Editar produto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold mb-4">Itens lançados</h3>

        <div className="overflow-auto rounded-2xl border border-zinc-900">
          <table className="w-full min-w-[1300px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-3">Data</th>
                <th className="p-3">Venda</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Referência</th>
                <th className="p-3">Valor da venda</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Fornecedor</th>
                <th className="p-3">Qtd</th>
                <th className="p-3">Custo item</th>
                <th className="p-3">Venda item</th>
                <th className="p-3">Lucro</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {movimentacoesProdutosFiltradas.length === 0 && (
                <tr>
                  <td colSpan="12" className="p-4 text-zinc-500">
                    Nenhum item lançado.
                  </td>
                </tr>
              )}

              {movimentacoesProdutosFiltradas.map((item) => (
                <tr key={item.id} className="border-t border-zinc-900 text-sm">
                  <td className="p-3 text-zinc-400">{dataBR(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10))}</td>
                  <td className="p-3">#{item.vendas?.numero_venda}</td>
                  <td className="p-3 font-semibold">{item.vendas?.clientes?.nome}</td>
                  <td className="p-3 text-zinc-400">{item.vendas?.clientes?.referencia || 'Sem referência'}</td>
                  <td className="p-3 text-green-300">{moeda(item.vendas?.valor_total)}</td>
                  <td className="p-3">{item.produtos?.nome}</td>
                  <td className="p-3 text-zinc-400">{item.fornecedores?.nome || 'Sem fornecedor'}</td>
                  <td className="p-3">{item.quantidade}</td>
                  <td className="p-3 text-red-300">{moeda(item.subtotal_custo)}</td>
                  <td className="p-3 text-green-300">{moeda(item.subtotal_venda)}</td>
                  <td className="p-3 text-orange-300 font-semibold">{moeda(item.lucro)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editarMovimentacaoProduto(item)}
                        className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl text-xs"
                      >
                        Editar item vendido
                      </button>

                      <button
                        onClick={() => excluirMovimentacaoProduto(item)}
                        className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-xl text-xs"
                      >
                        Excluir item
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

  function TelaProdutos() {
    const termo = normalizarTexto(buscaProdutos)

    const produtosFiltrados = produtos.filter((produto) => {
      const texto = normalizarTexto(`
        ${produto.nome}
        ${produto.fornecedores?.nome}
        ${produto.preco_custo}
        ${produto.preco_venda}
        ${produto.estoque}
        ${produto.ativo ? 'ativo' : 'inativo'}
      `)

      return texto.includes(termo)
    })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Produtos</h2>

          <input
            value={buscaProdutos}
            onChange={(e) => setBuscaProdutos(e.target.value)}
            placeholder="Buscar produto, fornecedor ou status"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <form onSubmit={salvarProduto} className="grid grid-cols-6 gap-4 mb-8">
          <input value={formProduto.nome} onChange={(e) => setFormProduto({ ...formProduto, nome: e.target.value })} placeholder="Produto" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />

          <select value={formProduto.fornecedor_id} onChange={(e) => setFormProduto({ ...formProduto, fornecedor_id: e.target.value })} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
            <option value="">Fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>

          <input value={formProduto.preco_custo} onChange={(e) => setFormProduto({ ...formProduto, preco_custo: e.target.value })} placeholder="Custo" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formProduto.preco_venda} onChange={(e) => setFormProduto({ ...formProduto, preco_venda: e.target.value })} placeholder="Venda" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formProduto.estoque} onChange={(e) => setFormProduto({ ...formProduto, estoque: e.target.value })} placeholder="Estoque" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />

          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoProdutoId ? 'Salvar edição' : 'Cadastrar'}
          </button>

          {editandoProdutoId && (
            <button type="button" onClick={limparProduto} className="lg:col-span-6 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold">
              Cancelar edição
            </button>
          )}
        </form>

        <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-5">Produto</th>
                <th className="p-5">Fornecedor</th>
                <th className="p-5">Custo</th>
                <th className="p-5">Venda</th>
                <th className="p-5">Estoque</th>
                <th className="p-5">Ativo</th>
                <th className="p-5">Ação</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-5 text-zinc-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}

              {produtosFiltrados.map((produto) => (
                <tr key={produto.id} className="border-t border-zinc-900">
                  <td className="p-5">{produto.nome}</td>
                  <td className="p-5">{produto.fornecedores?.nome || 'Sem fornecedor'}</td>
                  <td className="p-5">{moeda(produto.preco_custo)}</td>
                  <td className="p-5 text-green-300">{moeda(produto.preco_venda)}</td>
                  <td className="p-5">{produto.estoque}</td>
                  <td className="p-5">{produto.ativo ? 'Sim' : 'Não'}</td>
                  <td className="p-5">
                    <div className="flex gap-2">
                      <button onClick={() => editarProduto(produto)} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl">
                        Editar
                      </button>

                      <button onClick={() => excluirProduto(produto)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-xl">
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

  function TelaFornecedores() {
    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <h2 className="text-3xl font-bold mb-6">Fornecedores</h2>

        <form onSubmit={salvarFornecedor} className="grid grid-cols-6 gap-4 mb-8">
          <input value={formFornecedor.nome} onChange={(e) => setFormFornecedor({ ...formFornecedor, nome: e.target.value })} placeholder="Fornecedor" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formFornecedor.contato} onChange={(e) => setFormFornecedor({ ...formFornecedor, contato: e.target.value })} placeholder="Contato" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formFornecedor.telefone} onChange={(e) => setFormFornecedor({ ...formFornecedor, telefone: e.target.value })} placeholder="Telefone" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formFornecedor.cidade} onChange={(e) => setFormFornecedor({ ...formFornecedor, cidade: e.target.value })} placeholder="Cidade" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formFornecedor.observacao} onChange={(e) => setFormFornecedor({ ...formFornecedor, observacao: e.target.value })} placeholder="Observação" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />

          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoFornecedorId ? 'Salvar edição' : 'Cadastrar'}
          </button>

          {editandoFornecedorId && (
            <button type="button" onClick={limparFornecedor} className="lg:col-span-6 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold">
              Cancelar edição
            </button>
          )}
        </form>

        <div className="grid gap-4">
          {fornecedores.map((fornecedor) => (
            <div key={fornecedor.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">{fornecedor.nome}</p>
                <p className="text-zinc-500 mt-1">Contato: {fornecedor.contato || 'Não informado'}</p>
                <p className="text-zinc-500 mt-1">Telefone: {fornecedor.telefone || 'Não informado'}</p>
                <p className="text-zinc-500 mt-1">Cidade: {fornecedor.cidade || 'Não informada'}</p>
                <p className="text-zinc-500 mt-1">Observação: {fornecedor.observacao || 'Sem observação'}</p>
              </div>

              <button onClick={() => editarFornecedor(fornecedor)} className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-2xl">
                Editar
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  }


  function TelaDespesas() {
    const termo = normalizarTexto(buscaDespesas)

    const despesasFiltradas = despesas.filter((despesa) => {
      const texto = normalizarTexto(`
        ${despesa.data_despesa}
        ${despesa.categoria}
        ${despesa.descricao}
        ${despesa.valor}
        ${despesa.observacao}
      `)

      return texto.includes(termo)
    })

    const totalDespesas = despesasFiltradas.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalAbastecimentos = despesasFiltradas.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoes = despesasFiltradas.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustos = despesasFiltradas.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Despesas</h2>
            <p className="text-zinc-500 mt-2">Controle de abastecimentos, degustações e outros custos.</p>
          </div>

          <input
            value={buscaDespesas}
            onChange={(e) => setBuscaDespesas(e.target.value)}
            placeholder="Buscar despesa, categoria ou observação"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <section className="mobile-summary-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <CardResumo titulo="Total despesas" valor={moeda(totalDespesas)} classe="text-red-300" />
          <CardResumo titulo="Abastecimentos" valor={moeda(totalAbastecimentos)} classe="text-orange-300" />
          <CardResumo titulo="Degustações" valor={moeda(totalDegustacoes)} classe="text-orange-300" />
          <CardResumo titulo="Outros custos" valor={moeda(totalOutrosCustos)} classe="text-zinc-300" />
        </section>

        <form onSubmit={salvarDespesa} className="grid grid-cols-6 gap-4 mb-8">
          <input
            type="date"
            onClick={abrirCalendario}
            onFocus={abrirCalendario}
            value={formDespesa.data_despesa}
            onChange={(e) => setFormDespesa({ ...formDespesa, data_despesa: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <select
            value={formDespesa.categoria}
            onChange={(e) => setFormDespesa({ ...formDespesa, categoria: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <option value="Abastecimento">Abastecimento</option>
            <option value="Degustação">Degustações</option>
            <option value="Outros custos">Outros custos</option>
          </select>

          <input
            value={formDespesa.descricao}
            onChange={(e) => setFormDespesa({ ...formDespesa, descricao: e.target.value })}
            placeholder="Descrição"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <input
            value={formDespesa.valor}
            onChange={(e) => setFormDespesa({ ...formDespesa, valor: e.target.value })}
            placeholder="Valor"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <input
            value={formDespesa.observacao}
            onChange={(e) => setFormDespesa({ ...formDespesa, observacao: e.target.value })}
            placeholder="Observação"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoDespesaId ? 'Salvar edição' : 'Cadastrar'}
          </button>

          {editandoDespesaId && (
            <button
              type="button"
              onClick={limparDespesa}
              className="lg:col-span-6 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold"
            >
              Cancelar edição
            </button>
          )}
        </form>

        <div className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Data</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Itens / descrição</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Observação</th>
                <th className="p-4">Ação</th>
              </tr>
            </thead>

            <tbody>
              {despesasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-5 text-zinc-500">
                    Nenhuma despesa encontrada.
                  </td>
                </tr>
              )}

              {despesasFiltradas.map((despesa) => (
                <tr key={despesa.id} className="border-t border-zinc-900">
                  <td className="p-4 text-zinc-400">{dataBR(despesa.data_despesa)}</td>
                  <td className="p-4 font-semibold">{despesa.categoria}</td>
                  <td className="p-4">{despesa.descricao}</td>
                  <td className="p-4 text-red-300 font-semibold">{moeda(despesa.valor)}</td>
                  <td className="p-4 text-zinc-400">{despesa.observacao || 'Sem observação'}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editarDespesa(despesa)}
                        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => excluirDespesa(despesa)}
                        className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-xl"
                      >
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
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="mini-section-title mini-delivery-title mini-mobile-card-section text-3xl font-bold">Delivery</h2>
            <p className="text-zinc-500 mt-2">Controle de entregas programadas e rotas de atendimento.</p>
          </div>

          <input
            value={buscaDelivery}
            onChange={(e) => setBuscaDelivery(e.target.value)}
            placeholder="Buscar cliente, venda, local ou status"
            className="w-full lg:w-[440px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <CardResumo titulo="Programadas" valor={totalProgramadas} classe="text-orange-300" />
          <CardResumo titulo="Entregues" valor={totalEntregues} classe="text-green-300" />
          <CardResumo titulo="Canceladas" valor={totalCanceladas} classe="text-red-300" />
          <CardResumo titulo="Valor programado" valor={moeda(totalValorProgramado)} classe="text-green-300" />
        </section>

        <form onSubmit={salvarDelivery} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <select
            value={formDelivery.venda_id}
            onChange={(e) => preencherDeliveryPorVenda(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <option value="">Vincular venda, opcional</option>
            {vendas.map((venda) => (
              <option key={venda.id} value={venda.id}>
                Venda #{venda.numero_venda} | {venda.clientes?.nome} | {moeda(venda.valor_total)}
              </option>
            ))}
          </select>

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
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
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

          <div>
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

          <div>
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

          <input
            value={formDelivery.referencia}
            onChange={(e) => setFormDelivery({ ...formDelivery, referencia: e.target.value })}
            placeholder="Referência"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <input
            value={formDelivery.local_entrega}
            onChange={(e) => setFormDelivery({ ...formDelivery, local_entrega: e.target.value })}
            placeholder="Local de entrega"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <textarea
            value={formDelivery.descricao}
            onChange={(e) => setFormDelivery({ ...formDelivery, descricao: e.target.value })}
            placeholder={`Itens do pedido, um por linha:
01 Queijo Vila Caipira
02 Provolone desidratado
01 Doce de leite`}
            rows={5}
            className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[140px] leading-relaxed"
          />

          <input
            value={formDelivery.valor_total}
            onChange={(e) => setFormDelivery({ ...formDelivery, valor_total: e.target.value })}
            placeholder="Valor total"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

          <select
            value={formDelivery.status}
            onChange={(e) => setFormDelivery({ ...formDelivery, status: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <option value="Programado">Programado</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <button className="lg:col-span-1 sm:col-span-2 xl:col-span-3 bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoDeliveryId ? 'Salvar edição' : 'Cadastrar entrega'}
          </button>

          {editandoDeliveryId && (
            <button
              type="button"
              onClick={limparDelivery}
              className="lg:col-span-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold"
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

  function TelaTaxas() {
    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <h2 className="text-3xl font-bold mb-6">Taxas</h2>

        <form onSubmit={salvarTaxa} className="grid grid-cols-3 gap-4 mb-8">
          <input value={formTaxa.forma_pagamento} onChange={(e) => setFormTaxa({ ...formTaxa, forma_pagamento: e.target.value })} placeholder="Forma de pagamento" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formTaxa.taxa_percentual} onChange={(e) => setFormTaxa({ ...formTaxa, taxa_percentual: e.target.value })} placeholder="Taxa percentual" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoTaxaId ? 'Salvar edição' : 'Cadastrar taxa'}
          </button>
        </form>

        <div className="grid gap-4">
          {taxas.map((taxa) => (
            <div key={taxa.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">{taxa.forma_pagamento}</p>
                <p className="text-orange-300 text-xl font-bold">{percentual(taxa.taxa_percentual)}</p>
              </div>

              {taxa.id !== 'fiado-local' && (
                <button onClick={() => editarTaxa(taxa)} className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-2xl">
                  Editar
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  function Conteudo() {
    if (pagina === 'painel') return TelaPainel()
    if (pagina === 'clientes') return TelaClientes()
    if (pagina === 'vendas') return TelaVendas()
    if (pagina === 'pendencias') return TelaPendencias()
    if (pagina === 'pagamentos') return TelaPagamentos()
    if (pagina === 'produtos') return TelaProdutos()
    if (pagina === 'produtos-controle') return TelaProdutosControle()
    if (pagina === 'fornecedores') return TelaFornecedores()
    if (pagina === 'despesas') return TelaDespesas()
    if (pagina === 'delivery') return TelaDelivery()
    if (pagina === 'taxas') return TelaTaxas()

    return TelaPainel()
  }

  return (
    <div className="min-h-screen bg-[#15110f] text-white overflow-x-hidden">
      <div className="w-full max-w-full overflow-x-hidden flex flex-col lg:grid lg:grid-cols-[280px_1fr]">
<aside className="bg-black border-b lg:border-b-0 lg:border-r border-orange-950 p-4 lg:p-6 lg:min-h-screen lg:max-h-screen lg:overflow-y-auto">
          <div className="mb-10">
            <p className="text-orange-400 uppercase tracking-[6px] text-xs mb-4">Sistema</p>

            <h1 className="text-4xl font-bold leading-tight">
              Queijos
              <br />
              Serra
              <br />
              da Canastra
            </h1>

            <p className="text-zinc-500 mt-6">Mini ERP Premium</p>
          </div>

          <nav className="space-y-3 overflow-y-auto max-h-[75vh] pr-2">
            {botaoMenu('painel', '📊', 'Painel')}
            {botaoMenu('clientes', '👤', 'Clientes')}
            {botaoMenu('vendas', '🧾', 'Vendas')}
            {botaoMenu('pendencias', '💰', 'Pendências')}
            {botaoMenu('pagamentos', '💳', 'Pagamentos')}
            {botaoMenu('delivery', '🚚', 'Delivery')}
            {botaoMenu('produtos', '🧀', 'Produtos')}
            {botaoMenu('produtos-controle', '📦', 'Produtos & Controle')}
            {botaoMenu('fornecedores', '🚚', 'Fornecedores')}
            {botaoMenu('despesas', '⛽', 'Despesas')}
            {botaoMenu('taxas', '⚙️', 'Taxas')}
          </nav>
        </aside>

        <div className="mini-bottom-nav lg:hidden">
          {botaoMenu('painel', 'ðŸ“Š', 'Painel')}
          {botaoMenu('vendas', 'ðŸ§¾', 'Vendas')}
          {botaoMenu('delivery', 'ðŸšš', 'Delivery')}
          {botaoMenu('pendencias', 'ðŸ’°', 'PendÃªncias')}
        </div>
        <main className="mini-app-main p-4 lg:p-8">
          <section className="mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">Mini ERP Queijos Serra da Canastra</h2>
            <p className="text-zinc-500">Sistema profissional conectado ao Supabase.</p>
          </section>

          {Conteudo()}
        </main>
      </div>
    </div>
  )
}









