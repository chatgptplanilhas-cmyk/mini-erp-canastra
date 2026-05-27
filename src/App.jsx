import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [pagina, setPagina] = useState('painel')
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [clienteExpandidoId, setClienteExpandidoId] = useState(null)
  const [deliveryExpandidoId, setDeliveryExpandidoId] = useState(null)
  const [vendaExpandidaId, setVendaExpandidaId] = useState(null)
  const [modalConferenciaProdutosAberto, setModalConferenciaProdutosAberto] = useState(false)
  const [conferenciaProdutoExpandido, setConferenciaProdutoExpandido] = useState(null)

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
  const [pedidosFornecedor, setPedidosFornecedor] = useState([])
  const [pedidosFornecedorGrupos, setPedidosFornecedorGrupos] = useState([])
  const [pedidoFornecedorGrupoAberto, setPedidoFornecedorGrupoAberto] = useState(null)
  const [roteirosVendas, setRoteirosVendas] = useState([])

  const [buscaClientes, setBuscaClientes] = useState('')
  const [filtroClientes, setFiltroClientes] = useState('ativos')
  const [buscaVendas, setBuscaVendas] = useState('')
  const [buscaClienteVenda, setBuscaClienteVenda] = useState('')
  const [buscaPendencias, setBuscaPendencias] = useState('')
  const [buscaPagamentos, setBuscaPagamentos] = useState('')
  const [buscaProdutos, setBuscaProdutos] = useState('')
  const [mostrarProdutosArquivados, setMostrarProdutosArquivados] = useState(false)
  const [buscaProdutosControle, setBuscaProdutosControle] = useState('')
  const [buscaProdutoLancamento, setBuscaProdutoLancamento] = useState('')
  const [dataControleProdutos, setDataControleProdutos] = useState(dataHoje())
  const [buscaDespesas, setBuscaDespesas] = useState('')
  const [buscaDelivery, setBuscaDelivery] = useState('')
  const [buscaCobrancas, setBuscaCobrancas] = useState('')
  const [localCobrancaAberto, setLocalCobrancaAberto] = useState('')
  const [cobrancaExpandidaId, setCobrancaExpandidaId] = useState(null)
  const [pendenciaLocalAberto, setPendenciaLocalAberto] = useState('')
  const [pendenciaClienteAberto, setPendenciaClienteAberto] = useState(null)
  const [filtroDelivery, setFiltroDelivery] = useState('Programado')
  const [listaPecasEntreguesAberta, setListaPecasEntreguesAberta] = useState(false)
  const [dataPecasEntregues, setDataPecasEntregues] = useState(dataHoje())
  const [buscaPedidosFornecedor, setBuscaPedidosFornecedor] = useState('')
  const [buscaRoteiroVendas, setBuscaRoteiroVendas] = useState('')
  const [listaPedidosFornecedorAberta, setListaPedidosFornecedorAberta] = useState(false)
  const pagamentoDeliveryInicial = { forma_pagamento: 'Pix', valor: '' }

  const [modalDeliveryVenda, setModalDeliveryVenda] = useState({
    aberto: false,
    item: null,
    pagamentos: [pagamentoDeliveryInicial],
    vencimento: '',
  })


  const [clienteId, setClienteId] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [valorPagoVenda, setValorPagoVenda] = useState('')
  const [dataVenda, setDataVenda] = useState(new Date().toISOString().slice(0, 10))
  const [taxaSelecionadaId, setTaxaSelecionadaId] = useState('')
  const [status, setStatus] = useState('EM ABERTO')
  const [vencimento, setVencimento] = useState('')

  const [dataRelatorioInicio, setDataRelatorioInicio] = useState(inicioMesAtual())
  const [dataRelatorioFim, setDataRelatorioFim] = useState(dataHoje())
  const [dataPontoInicio, setDataPontoInicio] = useState(inicioMesAtual())
  const [dataPontoFim, setDataPontoFim] = useState(dataHoje())
  const [filtroVendasInicio, setFiltroVendasInicio] = useState(inicioMesAtual())
  const [filtroVendasFim, setFiltroVendasFim] = useState(dataHoje())
  const [filtroPagamentosInicio, setFiltroPagamentosInicio] = useState(inicioMesAtual())
  const [filtroPagamentosFim, setFiltroPagamentosFim] = useState(dataHoje())
  const [filtroPendenciasInicio, setFiltroPendenciasInicio] = useState('')
  const [filtroPendenciasFim, setFiltroPendenciasFim] = useState('')

  const [formSaldoAnterior, setFormSaldoAnterior] = useState({
    cliente_id: '',
    valor: '',
    vencimento: '',
    observacao: 'Saldo herdado de planilha antiga',
  })

  const [editandoVendaId, setEditandoVendaId] = useState(null)
  const [editandoClienteId, setEditandoClienteId] = useState(null)
  const [editandoProdutoId, setEditandoProdutoId] = useState(null)
  const [editandoTaxaId, setEditandoTaxaId] = useState(null)
  const [editandoFornecedorId, setEditandoFornecedorId] = useState(null)
  const [editandoMovimentacaoProdutoId, setEditandoMovimentacaoProdutoId] = useState(null)
  const [editandoDespesaId, setEditandoDespesaId] = useState(null)
  const [editandoDeliveryId, setEditandoDeliveryId] = useState(null)
  const [editandoPedidoFornecedorId, setEditandoPedidoFornecedorId] = useState(null)

  const [formCliente, setFormCliente] = useState({
    nome: '',
    referencia: '',
    observacao: '',
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

  const [formPrecoAtual, setFormPrecoAtual] = useState({
    produto_id: '',
    custo_anterior: '',
    preco_atual: '',
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

  const [formPedidoFornecedor, setFormPedidoFornecedor] = useState({
    produto_id: '',
    quantidade: '',
    observacao: '',
    status: 'Pendente',
  })

  const [formRoteiroVendas, setFormRoteiroVendas] = useState({
    categoria: 'LOCAL',
    local: '',
    referencia: '',
    horario: '',
    observacao: '',
  })
  const [editandoRoteiroVendasId, setEditandoRoteiroVendasId] = useState(null)

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
      buscarPedidosFornecedor(),
      buscarPedidosFornecedorGrupos(),
      buscarRoteiroVendas(),
    ])
  }

  function numero(valor) {
    const texto = String(valor ?? '').trim()

    if (!texto) return 0

    const limpo = texto
      .replace(/[^0-9,.-]/g, '')
      .replace(/\.(?=\d{3}(\D|$))/g, '')
      .replace(',', '.')

    return Number(limpo) || 0
  }

  function dataHoje() {
    return new Date().toISOString().slice(0, 10)
  }

  function inicioMesAtual() {
    const hoje = new Date()
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().slice(0, 10)
  }

  function dataISO(data) {
    return data.toISOString().slice(0, 10)
  }

  function periodoMesAnterior() {
    const hoje = new Date()
    const primeiroDiaMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const ultimoDiaMesAnterior = new Date(primeiroDiaMesAtual)
    ultimoDiaMesAnterior.setDate(0)
    const primeiroDiaMesAnterior = new Date(ultimoDiaMesAnterior.getFullYear(), ultimoDiaMesAnterior.getMonth(), 1)

    return {
      inicio: dataISO(primeiroDiaMesAnterior),
      fim: dataISO(ultimoDiaMesAnterior),
    }
  }

  function dentroPeriodoFiltro(data, inicio, fim) {
    if (!data) return false
    const valor = String(data).slice(0, 10)
    if (inicio && valor < inicio) return false
    if (fim && valor > fim) return false
    return true
  }

  function aplicarPeriodoLista(tipo, setInicio, setFim) {
    const hoje = new Date()

    if (tipo === 'hoje') {
      const hojeTexto = dataISO(hoje)
      setInicio(hojeTexto)
      setFim(hojeTexto)
      return
    }

    if (tipo === 'semana') {
      const data = new Date(hoje)
      const dia = data.getDay() || 7
      data.setDate(data.getDate() - dia + 1)
      setInicio(dataISO(data))
      setFim(dataISO(hoje))
      return
    }

    if (tipo === 'mes') {
      setInicio(inicioMesAtual())
      setFim(dataISO(hoje))
      return
    }

    if (tipo === 'mesAnterior') {
      const periodo = periodoMesAnterior()
      setInicio(periodo.inicio)
      setFim(periodo.fim)
      return
    }

    if (tipo === 'todos') {
      setInicio('')
      setFim('')
    }
  }

  function RotuloPeriodo({ inicio, fim }) {
    if (!inicio && !fim) return <span>Todos os registros</span>
    if (inicio && fim) return <span>{dataBR(inicio)} a {dataBR(fim)}</span>
    if (inicio) return <span>A partir de {dataBR(inicio)}</span>
    return <span>Até {dataBR(fim)}</span>
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

  function abrirWhatsApp({ telefone = '', mensagem = '' } = {}) {
    const telefoneLimpo = limparTelefone(telefone)
    const texto = encodeURIComponent(mensagem || '')
    const parametros = telefoneLimpo
      ? `phone=${telefoneLimpo}&text=${texto}`
      : `text=${texto}`

    const linkDiretoApp = `whatsapp://send?${parametros}`

    window.location.href = linkDiretoApp
  }

  function normalizarTexto(valor) {
    return String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }



  function ordenarPedidosFornecedorLista(lista) {
    return (lista || []).slice().sort((a, b) => {
      const produtoA = normalizarTexto(a.produto_nome || '')
      const produtoB = normalizarTexto(b.produto_nome || '')
      const comparaProduto = produtoA.localeCompare(produtoB, 'pt-BR')

      if (comparaProduto !== 0) return comparaProduto

      const fornecedorA = normalizarTexto(a.fornecedor || 'Sem fornecedor')
      const fornecedorB = normalizarTexto(b.fornecedor || 'Sem fornecedor')
      return fornecedorA.localeCompare(fornecedorB, 'pt-BR')
    })
  }

  function contemTermos(textoBase, termoBusca) {
    const texto = normalizarTexto(textoBase)
    const termos = normalizarTexto(termoBusca).split(/\s+/).filter(Boolean)

    if (termos.length === 0) return true

    return termos.every((termo) => texto.includes(termo))
  }

  function clientesParaVendaFiltrados() {
    const termo = normalizarTexto(buscaClienteVenda)

    return (clientes || [])
      .filter((cliente) => cliente.ativo !== false || String(cliente.id) === String(clienteId))
      .filter((cliente) => {
        if (!termo) return true

        const texto = normalizarTexto(`
          ${cliente.nome || ''}
          ${cliente.referencia || ''}
          ${cliente.observacao || ''}
          ${cliente.telefone || ''}
          ${limparTelefone(cliente.telefone || '')}
        `)

        return termo.split(/\s+/).filter(Boolean).every((parte) => texto.includes(parte))
      })
      .sort((a, b) => {
        if (!termo) {
          return normalizarTexto(a.nome).localeCompare(normalizarTexto(b.nome), 'pt-BR')
        }

        const textoA = normalizarTexto(`${a.nome || ''} ${a.referencia || ''} ${a.observacao || ''} ${a.telefone || ''}`)
        const textoB = normalizarTexto(`${b.nome || ''} ${b.referencia || ''} ${b.observacao || ''} ${b.telefone || ''}`)
        const nomeA = normalizarTexto(a.nome || '')
        const nomeB = normalizarTexto(b.nome || '')
        const refA = normalizarTexto(a.referencia || '')
        const refB = normalizarTexto(b.referencia || '')

        const score = (texto, nome, ref) => {
          if (nome === termo) return 0
          if (nome.startsWith(termo)) return 1
          if (ref.startsWith(termo)) return 2
          if (texto.includes(termo)) return 3
          return 4
        }

        const scoreA = score(textoA, nomeA, refA)
        const scoreB = score(textoB, nomeB, refB)

        if (scoreA !== scoreB) return scoreA - scoreB

        return nomeA.localeCompare(nomeB, 'pt-BR')
      })
  }

  function normalizarStatus(valor) {
    const status = String(valor || '').trim().toUpperCase()

    if (status === 'ESTORNADO') return 'ESTORNADO'
    if (status === 'CONFIRMADO') return 'CONFIRMADO'
    if (status === 'PENDENTE') return 'EM ABERTO'
    if (status === 'EM ABERTO') return 'EM ABERTO'
    if (status === 'PARCIAL') return 'PARCIAL'
    if (status === 'PAGO') return 'PAGO'

    return 'EM ABERTO'
  }

  function moeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function moedaInput(valor) {
    const numeroValor = numero(valor)

    if (!numeroValor) return ''

    return moeda(numeroValor)
  }

  function percentual(valor) {
    return `${Number(valor || 0).toFixed(2).replace('.', ',')}%`
  }


  function chaveFormaPagamento(valor) {
    return normalizarTexto(valor).replace(/[^a-z0-9]/g, '')
  }

  function formasPagamentoDelivery() {
    const formasBase = [
      'Pix',
      'Dinheiro',
      'Débito Master | Visa',
      'Débito American | Cielo',
      'Crédito Master | Visa',
      'Crédito American | Elo',
      'Link de pagamento',
      'Em aberto / Fiado',
    ]

    const formasTaxas = (taxas || [])
      .map((taxa) => taxa.forma_pagamento)
      .filter(Boolean)
      .filter((forma) => !chaveFormaPagamento(forma).includes('fiado') && !chaveFormaPagamento(forma).includes('emaberto'))

    return [...formasBase, ...formasTaxas].filter((forma, index, lista) =>
      lista.findIndex((item) => chaveFormaPagamento(item) === chaveFormaPagamento(forma)) === index
    )
  }

  function buscarTaxaPorFormaPagamento(formaPagamento) {
    const chaveSelecionada = chaveFormaPagamento(formaPagamento)

    return (taxas || []).find((taxa) => chaveFormaPagamento(taxa.forma_pagamento) === chaveSelecionada)
      || (taxas || []).find((taxa) => chaveSelecionada.includes(chaveFormaPagamento(taxa.forma_pagamento)) || chaveFormaPagamento(taxa.forma_pagamento).includes(chaveSelecionada))
      || null
  }

  function calcularResumoPagamentosDelivery(pagamentosModal = [], valorTotal = 0) {
    const existePagamentoEmAberto = (pagamentosModal || []).some((pagamento) => {
      const chave = chaveFormaPagamento(pagamento.forma_pagamento || '')
      return chave.includes('emaberto') || chave.includes('fiado')
    })

    const pagamentosValidos = existePagamentoEmAberto
      ? []
      : (pagamentosModal || [])
        .map((pagamento) => {
          const forma = pagamento.forma_pagamento || 'Pix'
          const valor = numero(pagamento.valor)
          const taxa = buscarTaxaPorFormaPagamento(forma)
          const percentualTaxa = Number(taxa?.taxa_percentual || 0)
          const valorTaxa = valor * (percentualTaxa / 100)

          return {
            forma_pagamento: forma,
            valor_pago: valor,
            taxa_percentual: percentualTaxa,
            valor_taxa: valorTaxa,
            valor_liquido: valor - valorTaxa,
          }
        })
        .filter((pagamento) => pagamento.valor_pago > 0)

    const totalRecebido = existePagamentoEmAberto ? 0 : pagamentosValidos.reduce((soma, pagamento) => soma + pagamento.valor_pago, 0)
    const taxaTotal = pagamentosValidos.reduce((soma, pagamento) => soma + pagamento.valor_taxa, 0)
    const liquidoRecebido = Math.max(totalRecebido - taxaTotal, 0)
    const saldoRestante = Math.max(Number(valorTotal || 0) - totalRecebido, 0)
    const percentualEfetivoTaxa = Number(valorTotal || 0) > 0 ? (taxaTotal / Number(valorTotal || 0)) * 100 : 0
    const statusFinal = totalRecebido <= 0 ? 'EM ABERTO' : saldoRestante <= 0.005 ? 'PAGO' : 'PARCIAL'
    const formas = pagamentosValidos.map((pagamento) => pagamento.forma_pagamento)
    const formaResumo = pagamentosValidos.length === 0
      ? 'Fiado / Em aberto'
      : pagamentosValidos.length === 1
        ? pagamentosValidos[0].forma_pagamento
        : `Múltiplo: ${formas.join(' + ')}`

    return {
      pagamentosValidos,
      totalRecebido,
      taxaTotal,
      liquidoRecebido,
      saldoRestante,
      percentualEfetivoTaxa,
      statusFinal,
      formaResumo,
    }
  }


  function destinoFinanceiroDelivery(item) {
    if (!item || item.status !== 'Entregue' || !item.venda_id) return null

    const statusVenda = normalizarStatus(item.vendas?.status || '')
    const numeroVenda = item.vendas?.numero_venda ? `#${item.vendas.numero_venda}` : 'venda registrada'
    const forma = item.vendas?.forma_pagamento || 'Forma não informada'

    if (statusVenda === 'PAGO') {
      return {
        titulo: 'Financeiro',
        texto: `Pago, lançado em Vendas ${numeroVenda}`,
        detalhe: forma,
        classe: 'mini-destino-pago',
      }
    }

    if (statusVenda === 'PARCIAL') {
      return {
        titulo: 'Financeiro',
        texto: `Parcial, venda ${numeroVenda}`,
        detalhe: 'Saldo enviado para Pendências e Cobranças',
        classe: 'mini-destino-parcial',
      }
    }

    return {
      titulo: 'Financeiro',
      texto: `Em aberto, venda ${numeroVenda}`,
      detalhe: 'Valor enviado para Pendências e Cobranças',
      classe: 'mini-destino-aberto',
    }
  }

  function calcularIndicadoresProduto(produto) {
    const custo = Number(produto?.preco_custo || 0)
    const venda = Number(produto?.preco_venda || 0)
    const lucroBruto = venda - custo
    const margem = venda > 0 ? (lucroBruto / venda) * 100 : 0
    const markup = custo > 0 ? venda / custo : 0

    return { custo, venda, lucroBruto, margem, markup }
  }

  function primeiroNome(nome) {
    return String(nome || '').trim().split(/\s+/)[0] || 'Cliente'
  }

  function dataBR(data) {
    if (!data) return 'Sem data'

    const texto = String(data)
    const apenasData = texto.includes('T') ? texto.split('T')[0] : texto.slice(0, 10)
    const partes = apenasData.split('-')

    if (partes.length !== 3) return texto

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  function dataHoraBR(data) {
    if (!data) return 'Sem data'

    const texto = String(data)
    const dataFormatada = dataBR(texto)

    if (!texto.includes('T')) return dataFormatada

    const hora = texto.split('T')[1]?.slice(0, 5)
    return hora ? `${dataFormatada} às ${hora}` : dataFormatada
  }

  function diasDesdeData(data) {
    if (!data) return null

    const base = new Date(`${String(data).slice(0, 10)}T00:00:00`)
    if (Number.isNaN(base.getTime())) return null

    const hoje = new Date(`${dataHoje()}T00:00:00`)
    const diff = hoje.getTime() - base.getTime()
    return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0)
  }

  function statusRoteiro(data) {
    const dias = diasDesdeData(data)

    if (dias === null) {
      return { texto: 'Sem data', classe: 'bg-zinc-900 text-zinc-300 border-zinc-800', prioridade: 0 }
    }

    if (dias >= 30) {
      return { texto: 'Retornar', classe: 'bg-red-950 text-red-300 border-red-900', prioridade: 3 }
    }

    return { texto: 'Em dia', classe: 'bg-green-950 text-green-300 border-green-900', prioridade: 1 }
  }

  function textoRetornoRoteiro(data) {
    const dias = diasDesdeData(data)

    if (dias === null) return 'Sem data'

    if (dias >= 30) {
      return `${dias} dias, retornar`
    }

    const faltam = 30 - dias
    return `Faltam ${faltam} dias`
  }


  const taxaSelecionada = taxas.find((taxa) => String(taxa.id) === String(taxaSelecionadaId))

  const valorNumerico = numero(valorTotal)
  const valorPagoVendaNumerico = numero(valorPagoVenda)
  const saldoParcialVenda = Math.max(valorNumerico - valorPagoVendaNumerico, 0)
  const percentualTaxa = Number(taxaSelecionada?.taxa_percentual || 0)
  const statusVendaAtual = normalizarStatus(status)
  const baseTaxaVenda = statusVendaAtual === 'PARCIAL'
    ? Math.min(valorPagoVendaNumerico, valorNumerico)
    : statusVendaAtual === 'PAGO'
      ? valorNumerico
      : 0
  const valorTaxa = baseTaxaVenda * (percentualTaxa / 100)
  const valorLiquido = valorNumerico - valorTaxa
  const valorLiquidoRecebidoAgora = Math.max(baseTaxaVenda - valorTaxa, 0)

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
          observacao,
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
            observacao,
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
            referencia,
            observacao
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
            referencia,
            observacao
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
          observacao,
          telefone
        ),
        vendas (
          numero_venda,
          data_venda,
          valor_total,
          valor_liquido,
          valor_taxa,
          forma_pagamento,
          status
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


  async function buscarPedidosFornecedor() {
    const { data, error } = await supabase
      .from('pedidos_fornecedor')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setPedidosFornecedor([])
      return
    }

    setPedidosFornecedor(ordenarPedidosFornecedorLista(data || []))
  }

  async function buscarPedidosFornecedorGrupos() {
    const { data, error } = await supabase
      .from('pedidos_fornecedor_grupos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setPedidosFornecedorGrupos([])
      return
    }

    setPedidosFornecedorGrupos(data || [])
  }

  async function buscarRoteiroVendas() {
    const { data, error } = await supabase
      .from('roteiro_vendas_v2')
      .select('*')
      .order('categoria', { ascending: true })
      .order('local', { ascending: true })

    if (error) {
      console.error(error)
      setRoteirosVendas([])
      return
    }

    const listaOrdenada = (data || [])
      .filter((item) => item.ativo !== false)
      .slice()
      .sort((a, b) => {
        const categoriaA = String(a.categoria || 'LOCAL')
        const categoriaB = String(b.categoria || 'LOCAL')
        if (categoriaA !== categoriaB) return categoriaA.localeCompare(categoriaB, 'pt-BR')
        if (Boolean(a.concluido) !== Boolean(b.concluido)) return Number(a.concluido) - Number(b.concluido)
        return normalizarTexto(a.local).localeCompare(normalizarTexto(b.local), 'pt-BR')
      })

    setRoteirosVendas(listaOrdenada)
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

    let statusFinal = normalizarStatus(status)
    let valorRecebidoAgora = 0
    let saldoPendencia = valorNumerico

    if (statusFinal === 'PARCIAL') {
      if (valorPagoVendaNumerico <= 0) {
        alert('Informe o valor pago agora para venda parcial.')
        return
      }

      if (valorPagoVendaNumerico >= valorNumerico) {
        const confirmarPago = window.confirm(
          'O valor pago agora é igual ou maior que o valor total da venda. Deseja marcar esta venda como PAGO?'
        )

        if (!confirmarPago) return

        statusFinal = 'PAGO'
        valorRecebidoAgora = valorNumerico
        saldoPendencia = 0
      } else {
        valorRecebidoAgora = valorPagoVendaNumerico
        saldoPendencia = valorNumerico - valorPagoVendaNumerico
      }
    }

    if (statusFinal === 'PAGO') {
      valorRecebidoAgora = valorNumerico
      saldoPendencia = 0
    }

    if (statusFinal === 'EM ABERTO') {
      valorRecebidoAgora = 0
      saldoPendencia = valorNumerico
    }

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

      if (valorRecebidoAgora > 0) {
        await supabase.from('pagamentos').insert({
          venda_id: editandoVendaId,
          status: 'CONFIRMADO',
          data_pagamento: dataVenda || dataHoje(),
          valor_pago: valorRecebidoAgora,
          forma_pagamento: taxaSelecionada?.forma_pagamento || 'Pix',
          observacao: statusFinal === 'PARCIAL'
            ? 'Pagamento parcial registrado no lançamento da venda'
            : 'Pagamento integral registrado no lançamento da venda',
        })
      }

      await ajustarPendencia(editandoVendaId, saldoPendencia, statusFinal)
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

    if (valorRecebidoAgora > 0) {
      const { error: erroPagamento } = await supabase.from('pagamentos').insert({
        venda_id: vendaCriada.id,
        status: 'CONFIRMADO',
        data_pagamento: dataVenda || dataHoje(),
        valor_pago: valorRecebidoAgora,
        forma_pagamento: taxaSelecionada?.forma_pagamento || 'Pix',
        observacao: statusFinal === 'PARCIAL'
          ? 'Pagamento parcial registrado no lançamento da venda'
          : 'Pagamento integral registrado no lançamento da venda',
      })

      if (erroPagamento) {
        alert('Venda criada, mas houve erro ao registrar o pagamento recebido.')
        console.error(erroPagamento)
      }
    }

    await ajustarPendencia(vendaCriada.id, saldoPendencia, statusFinal)

    limparVenda()
    buscarTudo()
    setPagina('vendas')
  }

  async function ajustarPendencia(vendaId, valor, statusVenda) {
    const statusFinal = normalizarStatus(statusVenda)
    const saldoRestante = Number(valor || 0)

    const { data: pendenciaExistente } = await supabase
      .from('pendencias')
      .select('*')
      .eq('venda_id', vendaId)
      .maybeSingle()

    if ((statusFinal === 'EM ABERTO' || statusFinal === 'PARCIAL') && saldoRestante > 0) {
      if (pendenciaExistente) {
        await supabase
          .from('pendencias')
          .update({
            vencimento: vencimento || null,
            saldo_restante: saldoRestante,
            status: statusFinal,
          })
          .eq('venda_id', vendaId)
      } else {
        await supabase.from('pendencias').insert({
          venda_id: vendaId,
          vencimento: vencimento || null,
          saldo_restante: saldoRestante,
          status: statusFinal,
          dias_atraso: 0,
        })
      }
    }

    if ((statusFinal === 'PAGO' || saldoRestante <= 0) && pendenciaExistente) {
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
    setValorPagoVenda('')
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
    setBuscaClienteVenda('')
    setValorTotal('')
    setValorPagoVenda('')
    setDataVenda(dataHoje())
    setStatus('EM ABERTO')
    setVencimento('')

    const fiado = taxas.find((item) => item.forma_pagamento === 'Fiado / Em aberto')
    if (fiado) setTaxaSelecionadaId(fiado.id)
  }

  function clienteDaPendencia(pendencia) {
    if (pendencia?.vendas?.clientes) return pendencia.vendas.clientes
    return clientes.find((cliente) => cliente.id === pendencia?.cliente_id) || {}
  }

  function pendenciaEhHerdada(pendencia) {
    return String(pendencia?.origem || '').toUpperCase() === 'SALDO_ANTERIOR' || !pendencia?.venda_id
  }

  function dataBaseDaPendencia(pendencia) {
    if (pendenciaEhHerdada(pendencia)) return pendencia?.created_at || pendencia?.vencimento || ''
    return pendencia?.vendas?.data_venda || pendencia?.created_at || ''
  }

  async function cadastrarSaldoAnterior(e) {
    e.preventDefault()

    if (!formSaldoAnterior.cliente_id) {
      alert('Selecione o cliente.')
      return
    }

    const valor = numero(formSaldoAnterior.valor)

    if (valor <= 0) {
      alert('Informe um valor válido para o saldo anterior.')
      return
    }

    const { error } = await supabase.from('pendencias').insert({
      venda_id: null,
      cliente_id: formSaldoAnterior.cliente_id,
      vencimento: formSaldoAnterior.vencimento || null,
      saldo_restante: valor,
      status: 'EM ABERTO',
      dias_atraso: 0,
      origem: 'SALDO_ANTERIOR',
      observacao_manual: formSaldoAnterior.observacao || 'Saldo herdado de planilha antiga',
    })

    if (error) {
      alert('Erro ao cadastrar saldo anterior. Verifique se o SQL de preparação foi executado no Supabase.')
      console.error(error)
      return
    }

    setFormSaldoAnterior({
      cliente_id: '',
      valor: '',
      vencimento: '',
      observacao: 'Saldo herdado de planilha antiga',
    })

    buscarTudo()
    alert('Saldo anterior cadastrado com sucesso.')
  }

  async function registrarPagamento(vendaId, saldoAtual, pendencia = null) {
    const valor = prompt('Digite o valor pago:')

    if (!valor) return

    const valorPago = numero(valor)

    if (valorPago <= 0) {
      alert('Valor inválido.')
      return
    }

    const saldoAnterior = Number(saldoAtual || 0)
    const novoSaldo = saldoAnterior - valorPago
    const saldoFinal = novoSaldo <= 0 ? 0 : novoSaldo
    const novoStatus = saldoFinal <= 0 ? 'PAGO' : 'PARCIAL'

    if (pendenciaEhHerdada(pendencia) || !vendaId) {
      const { error: erroPendenciaHerdada } = await supabase
        .from('pendencias')
        .update({
          saldo_restante: saldoFinal,
          status: novoStatus,
        })
        .eq('id', pendencia.id)

      if (erroPendenciaHerdada) {
        alert('Erro ao registrar pagamento do saldo anterior.')
        console.error(erroPendenciaHerdada)
        return
      }

      if (pendencia) {
        enviarConfirmacaoPagamentoWhatsApp(pendencia, saldoAnterior, valorPago, saldoFinal)
      }

      buscarTudo()
      return
    }

    const { error: erroPagamento } = await supabase.from('pagamentos').insert({
      venda_id: vendaId,
      data_pagamento: dataHoje(),
      valor_pago: valorPago,
      forma_pagamento: 'Pix',
      observacao: 'Pagamento registrado pelo Mini ERP',
      status: 'CONFIRMADO',
    })

    if (erroPagamento) {
      alert('Erro ao registrar pagamento.')
      console.error(erroPagamento)
      return
    }

    await supabase
      .from('pendencias')
      .update({
        saldo_restante: saldoFinal,
        status: novoStatus,
      })
      .eq('venda_id', vendaId)

    await supabase
      .from('vendas')
      .update({
        status: novoStatus,
      })
      .eq('id', vendaId)

    if (pendencia) {
      enviarConfirmacaoPagamentoWhatsApp(pendencia, saldoAnterior, valorPago, saldoFinal)
    }

    buscarTudo()
  }

  async function recalcularVendaAposMovimento(vendaId) {
    if (!vendaId) {
      throw new Error('Venda não informada para recálculo.')
    }

    const { data: vendaAtual, error: erroVenda } = await supabase
      .from('vendas')
      .select('*')
      .eq('id', vendaId)
      .maybeSingle()

    if (erroVenda || !vendaAtual) {
      throw erroVenda || new Error('Venda não localizada.')
    }

    const { data: pagamentosDaVenda, error: erroPagamentos } = await supabase
      .from('pagamentos')
      .select('valor_pago, status')
      .eq('venda_id', vendaId)

    if (erroPagamentos) {
      throw erroPagamentos
    }

    const totalPagoConfirmado = (pagamentosDaVenda || [])
      .filter((item) => normalizarStatus(item.status || 'CONFIRMADO') !== 'ESTORNADO')
      .reduce((acc, item) => acc + Number(item.valor_pago || 0), 0)

    const valorTotalVenda = Number(vendaAtual.valor_total || 0)
    const saldoRestante = Math.max(valorTotalVenda - totalPagoConfirmado, 0)
    const novoStatus = saldoRestante <= 0 ? 'PAGO' : totalPagoConfirmado > 0 ? 'PARCIAL' : 'EM ABERTO'

    const { error: erroAtualizarVenda } = await supabase
      .from('vendas')
      .update({ status: novoStatus })
      .eq('id', vendaId)

    if (erroAtualizarVenda) {
      throw erroAtualizarVenda
    }

    const { data: pendenciaExistente, error: erroPendenciaBusca } = await supabase
      .from('pendencias')
      .select('*')
      .eq('venda_id', vendaId)
      .maybeSingle()

    if (erroPendenciaBusca) {
      throw erroPendenciaBusca
    }

    if (novoStatus === 'PAGO') {
      if (pendenciaExistente) {
        const { error } = await supabase
          .from('pendencias')
          .update({ saldo_restante: 0, status: 'PAGO' })
          .eq('venda_id', vendaId)

        if (error) throw error
      }
    } else if (pendenciaExistente) {
      const { error } = await supabase
        .from('pendencias')
        .update({ saldo_restante: saldoRestante, status: novoStatus })
        .eq('venda_id', vendaId)

      if (error) throw error
    } else {
      const { error } = await supabase.from('pendencias').insert({
        venda_id: vendaId,
        vencimento: null,
        saldo_restante: saldoRestante,
        status: novoStatus,
        dias_atraso: 0,
      })

      if (error) throw error
    }

    return { totalPagoConfirmado, saldoRestante, novoStatus }
  }

  async function estornarPagamento(pagamento) {
    const statusPagamento = normalizarStatus(pagamento.status || 'CONFIRMADO')

    if (statusPagamento === 'ESTORNADO') {
      alert('Este pagamento já está estornado.')
      return
    }

    const cliente = pagamento.vendas?.clientes?.nome || 'cliente não informado'
    const numeroVenda = pagamento.vendas?.numero_venda ? `#${pagamento.vendas.numero_venda}` : 'sem número'
    const confirmar = window.confirm(
      `Deseja estornar o pagamento de ${moeda(pagamento.valor_pago)} do cliente ${cliente}, venda ${numeroVenda}?\n\nO pagamento ficará no histórico como ESTORNADO, sairá do total recebido e a venda será recalculada.`
    )

    if (!confirmar) return

    const motivo = prompt('Motivo do estorno:', 'Pagamento lançado no cliente errado')
    if (motivo === null) return

    const { data: pagamentoAtualizado, error: erroEstorno } = await supabase
      .from('pagamentos')
      .update({
        status: 'ESTORNADO',
        estornado_em: new Date().toISOString(),
        observacao_estorno: motivo || 'Estorno registrado pelo Mini ERP',
      })
      .eq('id', pagamento.id)
      .select('id, status, estornado_em, observacao_estorno')
      .maybeSingle()

    if (erroEstorno) {
      alert('Erro ao estornar pagamento.')
      console.error(erroEstorno)
      return
    }

    if (normalizarStatus(pagamentoAtualizado?.status || '') !== 'ESTORNADO') {
      alert('O Supabase gravou a observação, mas não confirmou o status ESTORNADO. Vou recarregar os dados. Se continuar como CONFIRMADO, use o botão Forçar estorno nesta mesma linha.')
      buscarTudo()
      return
    }

    try {
      await recalcularVendaAposMovimento(pagamento.venda_id)
      alert('Pagamento estornado e venda recalculada com sucesso.')
      buscarTudo()
    } catch (erro) {
      alert('Pagamento estornado, mas houve erro ao recalcular venda ou pendência. Verifique a aba Pendências.')
      console.error(erro)
      buscarTudo()
    }
  }

  async function forcarEstornoPagamento(pagamento) {
    const confirmar = window.confirm('Forçar este pagamento como ESTORNADO e recalcular a venda vinculada?')
    if (!confirmar) return

    const { error } = await supabase
      .from('pagamentos')
      .update({
        status: 'ESTORNADO',
        estornado_em: pagamento.estornado_em || new Date().toISOString(),
        observacao_estorno: pagamento.observacao_estorno || 'Estorno corrigido pelo Mini ERP',
      })
      .eq('id', pagamento.id)

    if (error) {
      alert('Erro ao forçar estorno.')
      console.error(error)
      return
    }

    try {
      await recalcularVendaAposMovimento(pagamento.venda_id)
      alert('Estorno corrigido e venda recalculada.')
      buscarTudo()
    } catch (erro) {
      alert('Estorno corrigido, mas houve erro ao recalcular venda ou pendência.')
      console.error(erro)
      buscarTudo()
    }
  }

  async function reativarPagamento(pagamento) {
    const confirmar = window.confirm('Reativar este pagamento como CONFIRMADO e recalcular a venda vinculada?')
    if (!confirmar) return

    const { error } = await supabase
      .from('pagamentos')
      .update({
        status: 'CONFIRMADO',
        estornado_em: null,
        observacao_estorno: null,
      })
      .eq('id', pagamento.id)

    if (error) {
      alert('Erro ao reativar pagamento.')
      console.error(error)
      return
    }

    try {
      await recalcularVendaAposMovimento(pagamento.venda_id)
      alert('Pagamento reativado e venda recalculada.')
      buscarTudo()
    } catch (erro) {
      alert('Pagamento reativado, mas houve erro ao recalcular venda ou pendência.')
      console.error(erro)
      buscarTudo()
    }
  }

  async function ajustarStatusFinanceiroVenda(pagamento) {
    const vendaId = pagamento.venda_id
    if (!vendaId) {
      alert('Este pagamento não possui venda vinculada.')
      return
    }

    const statusInformado = prompt('Status da venda: EM ABERTO, PARCIAL ou PAGO', 'EM ABERTO')
    if (statusInformado === null) return

    const novoStatus = normalizarStatus(statusInformado)
    if (!['EM ABERTO', 'PARCIAL', 'PAGO'].includes(novoStatus)) {
      alert('Status inválido. Use EM ABERTO, PARCIAL ou PAGO.')
      return
    }

    const saldoInformado = prompt('Saldo restante em aberto:', novoStatus === 'PAGO' ? '0' : String(Number(pagamento.valor_pago || 0)).replace('.', ','))
    if (saldoInformado === null) return

    const saldoRestante = novoStatus === 'PAGO' ? 0 : Math.max(numero(saldoInformado), 0)

    const { error: erroVenda } = await supabase
      .from('vendas')
      .update({ status: novoStatus })
      .eq('id', vendaId)

    if (erroVenda) {
      alert('Erro ao atualizar status da venda.')
      console.error(erroVenda)
      return
    }

    const { data: pendenciaExistente, error: erroBuscaPendencia } = await supabase
      .from('pendencias')
      .select('id')
      .eq('venda_id', vendaId)
      .maybeSingle()

    if (erroBuscaPendencia) {
      alert('Venda atualizada, mas houve erro ao localizar a pendência.')
      console.error(erroBuscaPendencia)
      buscarTudo()
      return
    }

    if (pendenciaExistente) {
      const { error } = await supabase
        .from('pendencias')
        .update({ saldo_restante: saldoRestante, status: novoStatus })
        .eq('venda_id', vendaId)

      if (error) {
        alert('Venda atualizada, mas houve erro ao atualizar a pendência.')
        console.error(error)
        buscarTudo()
        return
      }
    } else if (novoStatus !== 'PAGO') {
      const { error } = await supabase.from('pendencias').insert({
        venda_id: vendaId,
        vencimento: null,
        saldo_restante: saldoRestante,
        status: novoStatus,
        dias_atraso: 0,
      })

      if (error) {
        alert('Venda atualizada, mas houve erro ao criar a pendência.')
        console.error(error)
        buscarTudo()
        return
      }
    }

    alert('Status financeiro ajustado com sucesso.')
    buscarTudo()
  }

  async function editarPendenciaFinanceira(pendencia) {
    const saldoAtual = Number(pendencia.saldo_restante || 0)
    const saldoInformado = prompt(
      'Digite o novo saldo em aberto:',
      String(saldoAtual).replace('.', ',')
    )

    if (saldoInformado === null) return

    const novoSaldoDigitado = numero(saldoInformado)

    if (novoSaldoDigitado < 0) {
      alert('Saldo inválido.')
      return
    }

    const vencimentoInformado = prompt(
      'Digite o novo vencimento no formato AAAA-MM-DD. Deixe em branco se não houver vencimento:',
      pendencia.vencimento || ''
    )

    if (vencimentoInformado === null) return

    const statusSugerido = novoSaldoDigitado <= 0
      ? 'PAGO'
      : normalizarStatus(pendencia.status) === 'PAGO'
        ? 'EM ABERTO'
        : normalizarStatus(pendencia.status)

    const statusInformado = prompt(
      'Digite o novo status: EM ABERTO, PARCIAL ou PAGO',
      statusSugerido
    )

    if (statusInformado === null) return

    let novoStatus = String(statusInformado || statusSugerido).toUpperCase().trim()

    if (!['EM ABERTO', 'PARCIAL', 'PAGO'].includes(novoStatus)) {
      alert('Status inválido. Use EM ABERTO, PARCIAL ou PAGO.')
      return
    }

    const saldoFinal = novoStatus === 'PAGO' || novoSaldoDigitado <= 0 ? 0 : novoSaldoDigitado

    if (saldoFinal === 0) {
      novoStatus = 'PAGO'
    }

    const { error: erroPendencia } = await supabase
      .from('pendencias')
      .update({
        saldo_restante: saldoFinal,
        vencimento: vencimentoInformado || null,
        status: novoStatus,
      })
      .eq('id', pendencia.id)

    if (erroPendencia) {
      alert('Erro ao editar pendência.')
      console.error(erroPendencia)
      return
    }

    if (!pendenciaEhHerdada(pendencia) && pendencia.venda_id) {
      await supabase
        .from('vendas')
        .update({ status: novoStatus })
        .eq('id', pendencia.venda_id)
    }

    buscarTudo()
    alert('Pendência atualizada com sucesso.')
  }

  async function excluirSaldoAnterior(pendencia) {
    const cliente = clienteDaPendencia(pendencia)
    const descricao = pendenciaEhHerdada(pendencia) ? 'saldo anterior herdado' : 'pendência de mês anterior'
    const confirmar = window.confirm(
      `Deseja realmente excluir este ${descricao} de ${cliente.nome || 'cliente não informado'} no valor de ${moeda(pendencia.saldo_restante)}?\n\nUse esta opção somente para lançamento incorreto.`
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('pendencias')
      .delete()
      .eq('id', pendencia.id)

    if (error) {
      alert('Erro ao excluir saldo anterior.')
      console.error(error)
      return
    }

    buscarTudo()
    alert('Saldo anterior excluído com sucesso.')
  }

  function enviarConfirmacaoPagamentoWhatsApp(pendencia, saldoAnterior, valorPago, saldoFinal) {
    const cliente = clienteDaPendencia(pendencia)
    const telefone = limparTelefone(cliente.telefone)

    if (!telefone) {
      alert('Pagamento registrado, mas este cliente não possui telefone cadastrado para envio da confirmação.')
      return
    }

    const mensagemParcial = `Pagamento registrado.

Recebi o pagamento de ${moeda(valorPago)} referente à sua compra de produtos dos Queijos Serra da Canastra.

Saldo restante em aberto: ${moeda(saldoFinal)}.

Agradeço pela confiança.

Atenciosamente,

Delber Vilaça
Queijos Serra da Canastra`

    const mensagemQuitada = `Pagamento confirmado.

Recebi o pagamento de ${moeda(valorPago)} referente à sua compra de produtos dos Queijos Serra da Canastra.

Agradeço pela confiança.

Atenciosamente,

Delber Vilaça
Queijos Serra da Canastra`

    const mensagem = saldoFinal > 0 ? mensagemParcial : mensagemQuitada
    abrirWhatsApp({ telefone, mensagem })
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

  function pendenciaContaComoSaldoAnterior(pendencia) {
    if (pendenciaEhHerdada(pendencia)) return true
    const dataVenda = String(pendencia?.vendas?.data_venda || '').slice(0, 10)
    return Boolean(dataVenda && dataVenda < inicioMesAtual())
  }

  function montarMensagemCobranca({ cliente, valor, detalhe = '', titulo = 'da sua compra', mostrarValorFinal = true }) {
    const nomeCliente = cliente.nome || 'cliente'
    const detalheTexto = detalhe ? `
${detalhe}
` : ''
    const valorTexto = mostrarValorFinal ? `
Valor: ${valor}
` : ''

    return `Olá, ${nomeCliente}. Tudo bem?

Conforme combinado, seguem os dados para o pagamento via Pix ${titulo}:${detalheTexto}
Chave Pix:
queijosserradacanastra@hotmail.com

Dados para conferência:
Delber Juliano Vilaça
Stone Pagamentos S.A.
${valorTexto}
Assim que realizar a transferência, peço a gentileza de enviar o comprovante para registro.

Atenciosamente,
Delber Vilaça | Queijos Serra da Canastra`
  }

  function cobrarWhatsApp(pendencia) {
    const cliente = clienteDaPendencia(pendencia)
    const telefone = limparTelefone(cliente.telefone)
    const valor = moeda(pendencia.saldo_restante)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const detalhe = pendenciaEhHerdada(pendencia)
      ? `Referente ao saldo anterior em aberto.\nVencimento: ${dataBR(pendencia.vencimento)}`
      : `Referente à pendência selecionada.\nVencimento: ${dataBR(pendencia.vencimento)}`

    abrirWhatsApp({
      telefone,
      mensagem: montarMensagemCobranca({ cliente, valor, detalhe }),
    })
  }

  function cobrarWhatsAppConsolidado(cliente, itens, somenteVencidos = true) {
    const telefone = limparTelefone(cliente.telefone)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const hoje = dataHoje()
    const itensEmAberto = (itens || [])
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)

    if (itensEmAberto.length === 0) {
      alert('Este cliente não possui pendências em aberto para cobrança.')
      return
    }

    const itensVencidos = itensEmAberto.filter((item) => !item.vencimento || item.vencimento <= hoje)
    const itensValidos = somenteVencidos && itensVencidos.length > 0 ? itensVencidos : itensEmAberto
    const cobrancaAntecipada = somenteVencidos && itensVencidos.length === 0

    const total = itensValidos.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)
    const linhasDetalhadas = itensValidos.map((item) => {
      const valorItem = moeda(item.saldo_restante)
      const vencimentoItem = dataBR(item.vencimento)
      const estaVencido = !item.vencimento || item.vencimento <= hoje
      const textoVencimento = estaVencido ? 'vencido em' : 'com vencimento em'

      if (pendenciaContaComoSaldoAnterior(item)) {
        return `• Saldo anterior${vencimentoItem ? `, ${textoVencimento} ${vencimentoItem}` : ''}: ${valorItem}`
      }

      return `• Compra ${textoVencimento} ${vencimentoItem}: ${valorItem}`
    })

    const detalhe = `${linhasDetalhadas.join('\n')}\n\nTotal para pagamento: ${moeda(total)}`

    abrirWhatsApp({
      telefone,
      mensagem: montarMensagemCobranca({
        cliente,
        valor: moeda(total),
        detalhe,
        titulo: cobrancaAntecipada ? 'das pendências em aberto' : (somenteVencidos ? 'das pendências vencidas' : 'do total em aberto'),
        mostrarValorFinal: false,
      }),
    })
  }

  function confirmarPagamentoWhatsApp(pendencia) {
    const cliente = clienteDaPendencia(pendencia)
    const telefone = limparTelefone(cliente.telefone)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const mensagem = `✅ Pagamento confirmado.

Muito obrigado pela confiança nos produtos da Queijos Serra da Canastra 🇧🇷.

Se precisar fazer um novo pedido ou tiver alguma dúvida, basta entrar em contato. 🤝

Atenciosamente,
Delber Vilaça`

    abrirWhatsApp({ telefone, mensagem })
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
      const mesmaReferencia = normalizarTexto(cliente.referencia) === normalizarTexto(formCliente.referencia)
      const mesmaObservacao = normalizarTexto(cliente.observacao) === normalizarTexto(formCliente.observacao)
      const clienteDiferente = String(cliente.id) !== String(editandoClienteId)

      return clienteDiferente && mesmoNome && mesmaReferencia && mesmaObservacao
    })

    if (clienteDuplicado) {
      alert('Já existe um cliente cadastrado com este nome, referência e observação.')
      return
    }

    const dados = {
      nome: formCliente.nome,
      referencia: formCliente.referencia,
      observacao: formCliente.observacao,
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

    setFormCliente({ nome: '', referencia: '', observacao: '', telefone: '' })
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
    const [vendasHistorico, deliveriesHistorico] = await Promise.all([
      supabase
        .from('vendas')
        .select('id', { count: 'exact', head: true })
        .eq('cliente_id', cliente.id),
      supabase
        .from('deliveries')
        .select('id', { count: 'exact', head: true })
        .eq('cliente_id', cliente.id),
    ])

    if (vendasHistorico.error || deliveriesHistorico.error) {
      alert('Erro ao verificar histórico do cliente.')
      console.error(vendasHistorico.error || deliveriesHistorico.error)
      return
    }

    const possuiHistorico = Number(vendasHistorico.count || 0) > 0 || Number(deliveriesHistorico.count || 0) > 0

    if (possuiHistorico) {
      alert('Este cliente possui histórico financeiro ou operacional. Para preservar os registros, use a opção Inativar.')
      return
    }

    const confirmar = window.confirm(`Deseja excluir definitivamente o cliente ${cliente.nome}? Esta ação deve ser usada apenas para cadastro duplicado ou lançado por engano.`)

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

    setClienteExpandidoId(null)
    buscarClientes()
  }

  function subirParaTopoFormulario() {
    setTimeout(() => {
      const opcoes = { top: 0, left: 0, behavior: 'smooth' }

      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(opcoes)
      }

      const containersRolaveis = document.querySelectorAll(
        'main, .app-main, .mini-app-main, .app, .layout, .content, [data-scroll-container]'
      )

      containersRolaveis.forEach((container) => {
        if (container && typeof container.scrollTo === 'function') {
          container.scrollTo(opcoes)
        }
      })
    }, 80)
  }

  function editarCliente(cliente) {
    setClienteExpandidoId(null)
    setEditandoClienteId(cliente.id)
    setFormCliente({
      nome: cliente.nome || '',
      referencia: cliente.referencia || '',
      observacao: cliente.observacao || '',
      telefone: cliente.telefone || '',
    })
    subirParaTopoFormulario()
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
    subirParaTopoFormulario()
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

  function lerCustosAnterioresProdutos() {
    try {
      return JSON.parse(localStorage.getItem('mini_erp_custos_anteriores_produtos') || '{}')
    } catch {
      return {}
    }
  }

  function salvarCustoAnteriorProduto(produtoId, custoAnterior) {
    const historico = lerCustosAnterioresProdutos()
    localStorage.setItem(
      'mini_erp_custos_anteriores_produtos',
      JSON.stringify({
        ...historico,
        [String(produtoId)]: Number(custoAnterior || 0),
      })
    )
  }

  function custoAnteriorProduto(produto) {
    const historico = lerCustosAnterioresProdutos()
    const custoSalvo = historico[String(produto?.id || '')]
    const custoAtual = Number(produto?.preco_custo || 0)
    const custoSalvoNumero = Number(custoSalvo || 0)
    const custoBancoNumero = Number(produto?.preco_custo_anterior ?? produto?.custo_anterior ?? 0)

    // Prioriza o histórico local gravado antes do reajuste.
    // Isso corrige o caso em que a coluna do banco foi sobrescrita e passou a repetir o custo atual.
    if (custoSalvoNumero > 0 && custoSalvoNumero !== custoAtual) return custoSalvoNumero
    if (custoBancoNumero > 0 && custoBancoNumero !== custoAtual) return custoBancoNumero

    return custoAtual
  }

  function selecionarProdutoPrecoAtual(produtoId) {
    const produtoSelecionado = produtos.find((item) => String(item.id) === String(produtoId))
    const custoAnterior = produtoSelecionado ? custoAnteriorProduto(produtoSelecionado) : 0

    setFormPrecoAtual({
      produto_id: produtoId,
      custo_anterior: custoAnterior > 0 ? String(custoAnterior).replace('.', ',') : '',
      preco_atual: '',
    })
  }

  async function atualizarPrecoAtual(e) {
    e.preventDefault()

    if (!formPrecoAtual.produto_id) {
      alert('Selecione o produto que terá o custo atual atualizado.')
      return
    }

    const novoPreco = numero(formPrecoAtual.preco_atual)

    if (novoPreco <= 0) {
      alert('Informe um novo custo válido.')
      return
    }

    const produto = produtos.find((item) => String(item.id) === String(formPrecoAtual.produto_id))

    if (!produto) {
      alert('Produto não encontrado.')
      return
    }

    const confirmar = window.confirm(
      `Atualizar o custo atual de "${produto.nome}" para ${moeda(novoPreco)}?\n\nAs próximas vendas usarão este novo custo para cálculo de lucro, margem e markup. As vendas já lançadas continuam preservadas com os valores originais.`
    )

    if (!confirmar) return

    const custoAnteriorInformado = numero(formPrecoAtual.custo_anterior)
    const custoAnterior = custoAnteriorInformado > 0 ? custoAnteriorInformado : Number(produto.preco_custo || 0)
    salvarCustoAnteriorProduto(produto.id, custoAnterior)

    let { error } = await supabase
      .from('produtos')
      .update({ preco_custo: novoPreco, preco_custo_anterior: custoAnterior })
      .eq('id', produto.id)

    if (error) {
      const tentativaBasica = await supabase
        .from('produtos')
        .update({ preco_custo: novoPreco })
        .eq('id', produto.id)

      error = tentativaBasica.error
    }

    if (error) {
      alert('Erro ao atualizar custo atual do produto.')
      console.error(error)
      return
    }

    setFormPrecoAtual({
      produto_id: '',
      custo_anterior: '',
      preco_atual: '',
    })

    buscarTudo()
    alert('Custo atual atualizado com sucesso. Lucro bruto, margem e markup já foram recalculados.')
  }

  async function alternarStatusProduto(produto) {
    const novoStatus = !Boolean(produto.ativo)
    const acao = novoStatus ? 'reativar' : 'inativar'

    const confirmar = window.confirm(`Deseja ${acao} o produto "${produto.nome}"?`)

    if (!confirmar) return

    const { error } = await supabase
      .from('produtos')
      .update({ ativo: novoStatus })
      .eq('id', produto.id)

    if (error) {
      alert('Erro ao alterar status do produto.')
      console.error(error)
      return
    }

    limparProduto()
    buscarTudo()
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
        'Este produto já possui itens lançados em vendas. Para preservar o histórico financeiro, ele não pode ser excluído. Use Arquivar ou Inativar.'
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

  async function arquivarProduto(produto) {
    if (!produto.ativo) {
      alert('Este produto já está arquivado/inativo.')
      return
    }

    const confirmar = window.confirm(
      `Deseja arquivar o produto "${produto.nome}"?\n\nEle não será excluído. Apenas ficará inativo para preservar o histórico.`
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('produtos')
      .update({ ativo: false })
      .eq('id', produto.id)

    if (error) {
      alert('Erro ao arquivar produto.')
      console.error(error)
      return
    }

    limparProduto()
    buscarTudo()
    alert('Produto arquivado com sucesso.')
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
      status: editandoDeliveryId ? formDelivery.status || 'Programado' : 'Programado',
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

  async function alterarStatusDelivery(item, novoStatus) {
    const confirmar = window.confirm(
      `Alterar a entrega de ${item.clientes?.nome || 'cliente'} para ${novoStatus}?`
    )

    if (!confirmar) return

    const dadosAtualizacaoDelivery = {
      status: novoStatus,
      data_confirmacao_entrega: novoStatus === 'Entregue' ? dataHoje() : null,
    }

    const { error } = await supabase
      .from('delivery')
      .update(dadosAtualizacaoDelivery)
      .eq('id', item.id)

    if (error) {
      alert('Erro ao atualizar status da entrega.')
      console.error(error)
      return
    }

    buscarDelivery()
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

  function abrirModalDeliveryVenda(item) {
    if (item.venda_id) {
      alert('Esta entrega já está vinculada a uma venda.')
      return
    }

    if (!item.cliente_id) {
      alert('Esta entrega não possui cliente vinculado.')
      return
    }

    const valorTotalDelivery = Number(item.valor_total || 0)

    if (valorTotalDelivery <= 0) {
      alert('Informe um valor total válido no Delivery antes de converter em venda.')
      return
    }

    setModalDeliveryVenda({
      aberto: true,
      item,
      pagamentos: [{ forma_pagamento: 'Pix', valor: moeda(valorTotalDelivery) }],
      vencimento: '',
    })
  }

  function fecharModalDeliveryVenda() {
    setModalDeliveryVenda({
      aberto: false,
      item: null,
      pagamentos: [pagamentoDeliveryInicial],
      vencimento: '',
    })
  }

  async function converterDeliveryEmVenda() {
    const item = modalDeliveryVenda.item

    if (!item) return

    const valorTotalDelivery = Number(item.valor_total || 0)
    const vencimentoPendencia = String(modalDeliveryVenda.vencimento || '').trim() || null
    const resumo = calcularResumoPagamentosDelivery(modalDeliveryVenda.pagamentos, valorTotalDelivery)

    if (resumo.totalRecebido > valorTotalDelivery + 0.005) {
      alert('O valor recebido ficou maior que o valor total da entrega. Ajuste os pagamentos antes de confirmar.')
      return
    }

    if (vencimentoPendencia && !/^\d{4}-\d{2}-\d{2}$/.test(vencimentoPendencia)) {
      alert('Data inválida. Use o calendário ou o formato AAAA-MM-DD.')
      return
    }

    const confirmar = window.confirm(
      `Confirmar entrega e criar venda ${resumo.statusFinal} para ${item.clientes?.nome || 'cliente'}?`
    )

    if (!confirmar) return

    const { data: ultimaVenda } = await supabase
      .from('vendas')
      .select('numero_venda')
      .order('numero_venda', { ascending: false })
      .limit(1)

    const proximoNumero =
      ultimaVenda && ultimaVenda.length > 0
        ? Number(ultimaVenda[0].numero_venda || 0) + 1
        : 1

    const valorLiquidoVenda = valorTotalDelivery - resumo.taxaTotal
    const dataConfirmacaoEntrega = dataHoje()

    const { data: vendaCriada, error: erroVenda } = await supabase
      .from('vendas')
      .insert({
        numero_venda: proximoNumero,
        cliente_id: item.cliente_id,
        data_venda: dataConfirmacaoEntrega,
        valor_total: valorTotalDelivery,
        valor_liquido: valorLiquidoVenda,
        forma_pagamento: resumo.formaResumo,
        taxa_percentual: resumo.percentualEfetivoTaxa,
        valor_taxa: resumo.taxaTotal,
        status: resumo.statusFinal,
      })
      .select()
      .single()

    if (erroVenda) {
      alert('Erro ao criar venda a partir do Delivery.')
      console.error(erroVenda)
      return
    }

    if (resumo.pagamentosValidos.length > 0) {
      const pagamentosParaInserir = resumo.pagamentosValidos.map((pagamento) => ({
        venda_id: vendaCriada.id,
        status: 'CONFIRMADO',
        data_pagamento: dataConfirmacaoEntrega,
        valor_pago: pagamento.valor_pago,
        forma_pagamento: pagamento.forma_pagamento,
        observacao: resumo.statusFinal === 'PARCIAL'
          ? `Pagamento parcial registrado a partir do Delivery. Taxa: ${percentual(pagamento.taxa_percentual)}.`
          : `Pagamento integral registrado a partir do Delivery. Taxa: ${percentual(pagamento.taxa_percentual)}.`,
      }))

      const { error: erroPagamento } = await supabase.from('pagamentos').insert(pagamentosParaInserir)

      if (erroPagamento) {
        alert('Venda criada, mas houve erro ao registrar o pagamento.')
        console.error(erroPagamento)
      }
    }

    if ((resumo.statusFinal === 'EM ABERTO' || resumo.statusFinal === 'PARCIAL') && resumo.saldoRestante > 0) {
      const { error: erroPendencia } = await supabase.from('pendencias').insert({
        venda_id: vendaCriada.id,
        vencimento: vencimentoPendencia,
        saldo_restante: resumo.saldoRestante,
        status: resumo.statusFinal,
        dias_atraso: 0,
      })

      if (erroPendencia) {
        alert('Venda criada, mas houve erro ao criar pendência.')
        console.error(erroPendencia)
      }
    }

    const { error: erroDelivery } = await supabase
      .from('delivery')
      .update({
        venda_id: vendaCriada.id,
        status: 'Entregue',
        data_confirmacao_entrega: dataConfirmacaoEntrega,
      })
      .eq('id', item.id)

    if (erroDelivery) {
      alert('Venda criada, mas houve erro ao atualizar o Delivery.')
      console.error(erroDelivery)
    }

    setFiltroDelivery('Programado')
    setDeliveryExpandidoId(null)
    fecharModalDeliveryVenda()
    await buscarTudo()
    alert(`Entrega concluída e venda #${proximoNumero} criada com sucesso.`)
  }


  async function salvarPedidoFornecedor(e) {
    e.preventDefault()

    if (!formPedidoFornecedor.produto_id) {
      alert('Selecione um produto para o pedido.')
      return
    }

    const quantidade = Number(formPedidoFornecedor.quantidade || 0)

    if (quantidade <= 0) {
      alert('Informe a quantidade desejada.')
      return
    }

    const produto = produtos.find((item) => String(item.id) === String(formPedidoFornecedor.produto_id))

    if (!produto) {
      alert('Produto não encontrado.')
      return
    }

    const indicadores = calcularIndicadoresProduto(produto)

    const dadosBase = {
      produto_id: produto.id,
      produto_nome: produto.nome || 'Produto sem nome',
      fornecedor: produto.fornecedores?.nome || 'Sem fornecedor',
      quantidade,
      ultimo_custo: indicadores.custo,
      venda_atual: indicadores.venda,
      margem: indicadores.margem,
      markup: indicadores.markup,
      observacao: formPedidoFornecedor.observacao || null,
      status: formPedidoFornecedor.status || 'Pendente',
    }

    if (editandoPedidoFornecedorId) {
      const { error } = await supabase
        .from('pedidos_fornecedor')
        .update(dadosBase)
        .eq('id', editandoPedidoFornecedorId)

      if (error) {
        alert(`Erro ao editar pedido fornecedor. ${error.message || ''}`)
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase
        .from('pedidos_fornecedor')
        .insert({ ...dadosBase, pedido_grupo_id: null })

      if (error) {
        alert(`Erro ao cadastrar pedido fornecedor. ${error.message || ''}`)
        console.error(error)
        return
      }
    }

    limparPedidoFornecedor()
    await buscarPedidosFornecedor()
  }

  async function salvarListaAtualPedidoFornecedor() {
    const itensAtuais = pedidosFornecedor.filter((pedido) => {
      const statusPedido = String(pedido.status || '').toLowerCase()
      return !pedido.pedido_grupo_id && statusPedido !== 'cancelado'
    })

    if (itensAtuais.length === 0) {
      alert('Nenhum item em aberto para salvar como pedido.')
      return
    }

    const totalItens = itensAtuais.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0), 0)
    const totalEstimado = itensAtuais.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0) * Number(pedido.ultimo_custo || 0), 0)
    const fornecedoresUnicos = new Set(itensAtuais.map((pedido) => pedido.fornecedor || 'Sem fornecedor'))

    const confirmar = window.confirm(`Salvar pedido com ${totalItens} peças, ${fornecedoresUnicos.size} fornecedor(es) e total estimado de ${moeda(totalEstimado)}?`)

    if (!confirmar) return

    const { data: grupoCriado, error: erroGrupo } = await supabase
      .from('pedidos_fornecedor_grupos')
      .insert({
        data_pedido: dataHoje(),
        status: 'Salvo',
        total_itens: totalItens,
        total_estimado: totalEstimado,
        fornecedores_count: fornecedoresUnicos.size,
      })
      .select()
      .single()

    if (erroGrupo) {
      alert(`Erro ao salvar pedido. ${erroGrupo.message || ''}`)
      console.error(erroGrupo)
      return
    }

    const ids = itensAtuais.map((pedido) => pedido.id)
    const { error: erroItens } = await supabase
      .from('pedidos_fornecedor')
      .update({ pedido_grupo_id: grupoCriado.id })
      .in('id', ids)

    if (erroItens) {
      alert(`Pedido criado, mas houve erro ao vincular os itens. ${erroItens.message || ''}`)
      console.error(erroItens)
      return
    }

    await Promise.all([buscarPedidosFornecedor(), buscarPedidosFornecedorGrupos()])
    setPedidoFornecedorGrupoAberto(grupoCriado)
    alert('Pedido salvo no histórico com sucesso.')
  }

  function editarPedidoFornecedor(pedido) {
    setEditandoPedidoFornecedorId(pedido.id)
    setFormPedidoFornecedor({
      produto_id: pedido.produto_id ? String(pedido.produto_id) : '',
      quantidade: String(pedido.quantidade || ''),
      observacao: pedido.observacao || '',
      status: pedido.status || 'Pendente',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function limparPedidoFornecedor() {
    setEditandoPedidoFornecedorId(null)
    setFormPedidoFornecedor({
      produto_id: '',
      quantidade: '',
      observacao: '',
      status: 'Pendente',
    })
  }

  async function atualizarStatusPedidoFornecedor(pedido, statusFinal) {
    const { error } = await supabase
      .from('pedidos_fornecedor')
      .update({ status: statusFinal })
      .eq('id', pedido.id)

    if (error) {
      alert(`Erro ao atualizar pedido fornecedor. ${error.message || ''}`)
      console.error(error)
      return
    }

    buscarPedidosFornecedor()
  }

  async function removerPedidoFornecedor(pedido) {
    const confirmar = window.confirm(`Deseja remover o pedido de ${pedido.produto_nome || 'produto'}?`)

    if (!confirmar) return

    const { error } = await supabase
      .from('pedidos_fornecedor')
      .delete()
      .eq('id', pedido.id)

    if (error) {
      alert('Erro ao remover pedido fornecedor.')
      console.error(error)
      return
    }

    buscarPedidosFornecedor()
  }


  async function salvarRoteiroVendas(e) {
    e.preventDefault()

    if (!formRoteiroVendas.local.trim()) {
      alert(formRoteiroVendas.categoria === 'CLIENTE' ? 'Informe o nome do cliente.' : 'Informe o local.')
      return
    }

    const payload = {
      categoria: formRoteiroVendas.categoria || 'LOCAL',
      local: formRoteiroVendas.local.trim(),
      referencia: formRoteiroVendas.referencia || '',
      horario: formRoteiroVendas.horario || '',
      observacao: formRoteiroVendas.observacao || '',
      tipo: formRoteiroVendas.categoria === 'CLIENTE' ? 'Cliente' : 'Local',
      data_visita: dataHoje(),
      pecas_vendidas: 0,
      ativo: true,
      updated_at: new Date().toISOString(),
    }

    let error

    if (editandoRoteiroVendasId) {
      const resposta = await supabase
        .from('roteiro_vendas_v2')
        .update(payload)
        .eq('id', editandoRoteiroVendasId)
      error = resposta.error
    } else {
      const resposta = await supabase
        .from('roteiro_vendas_v2')
        .insert([{ ...payload, concluido: false }])
      error = resposta.error
    }

    if (error) {
      alert('Erro ao salvar o controle operacional.')
      console.error(error)
      return
    }

    limparRoteiroVendas()
    buscarRoteiroVendas()
  }

  function editarRoteiroVendas(item) {
    setEditandoRoteiroVendasId(item.id)
    setFormRoteiroVendas({
      categoria: item.categoria || (item.tipo === 'Cliente' ? 'CLIENTE' : 'LOCAL'),
      local: item.local || '',
      referencia: item.referencia || '',
      horario: item.horario || '',
      observacao: item.observacao || '',
    })
    subirParaTopoFormulario()
  }

  function limparRoteiroVendas() {
    setEditandoRoteiroVendasId(null)
    setFormRoteiroVendas({
      categoria: 'LOCAL',
      local: '',
      referencia: '',
      horario: '',
      observacao: '',
    })
  }

  async function alternarConcluidoRoteiroVendas(item) {
    const { error } = await supabase
      .from('roteiro_vendas_v2')
      .update({ concluido: !item.concluido, updated_at: new Date().toISOString() })
      .eq('id', item.id)

    if (error) {
      alert('Erro ao atualizar o check.')
      console.error(error)
      return
    }

    buscarRoteiroVendas()
  }

  async function resetarChecksRoteiroVendas() {
    const confirmar = window.confirm('Deseja limpar todos os checks para começar um novo mês?')
    if (!confirmar) return

    const { error } = await supabase
      .from('roteiro_vendas_v2')
      .update({ concluido: false, updated_at: new Date().toISOString() })
      .eq('ativo', true)

    if (error) {
      alert('Erro ao resetar os checks.')
      console.error(error)
      return
    }

    buscarRoteiroVendas()
  }

  async function excluirRoteiroVendas(item) {
    const confirmar = window.confirm(`Deseja remover ${item.local}?`)
    if (!confirmar) return

    const { error } = await supabase
      .from('roteiro_vendas_v2')
      .delete()
      .eq('id', item.id)

    if (error) {
      alert('Erro ao remover item do controle.')
      console.error(error)
      return
    }

    buscarRoteiroVendas()
  }

  function roteirosVendasFiltrados(categoria = '') {
    return (roteirosVendas || []).filter((item) => {
      if (categoria && String(item.categoria || '').toUpperCase() !== categoria) return false
      const texto = `${item.local || ''} ${item.referencia || ''} ${item.horario || ''} ${item.observacao || ''} ${item.tipo || ''} ${item.concluido ? 'marcado concluido' : 'pendente'}`
      return contemTermos(texto, buscaRoteiroVendas)
    })
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


  const itensMenu = [
    { id: 'painel', icone: '📊', texto: 'Painel' },
    { id: 'vendas', icone: '🧾', texto: 'Vendas' },
    { id: 'clientes', icone: '👤', texto: 'Cadastro de Clientes' },
    { id: 'produtos', icone: '🧀', texto: 'Cadastro de Produtos' },
    { id: 'produtos-controle', icone: '📦', texto: 'Lançamentos de Produtos' },
    { id: 'delivery', icone: '🚚', texto: 'Delivery' },
    { id: 'roteiro-vendas', icone: '📍', texto: 'Locais e Clientes' },
    { id: 'pendencias', icone: '💰', texto: 'Pendências' },
    { id: 'cobrancas', icone: '🧾', texto: 'Cobranças' },
    { id: 'pagamentos', icone: '💳', texto: 'Pagamentos' },
    { id: 'pedidos-fornecedor', icone: '📝', texto: 'Pedidos Fornecedor' },
    { id: 'fornecedores', icone: '🚚', texto: 'Fornecedores' },
    { id: 'despesas', icone: '⛽', texto: 'Despesas' },
    { id: 'taxas', icone: '⚙️', texto: 'Taxas' },
    { id: 'ponto-equilibrio', icone: '⚖️', texto: 'Ponto de Equilíbrio' },
    { id: 'relatorios', icone: '📈', texto: 'Relatórios' },
  ]

  function botaoMenuMobile(item) {
    const ativo = pagina === item.id

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          setPagina(item.id)
          setMenuMobileAberto(false)
        }}
        className={ativo ? 'bg-orange-950 text-white' : 'bg-zinc-950 text-zinc-300'}
      >
        {item.icone} {item.texto}
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
    const inicioMesPainel = inicioMesAtual()

    function dataBasePainel(item, campoPrincipal = 'data_venda') {
      return String(item?.[campoPrincipal] || item?.vendas?.data_venda || item?.created_at || '').slice(0, 10)
    }

    function pertenceAoMesAtualPainel(item, campoPrincipal = 'data_venda') {
      const data = dataBasePainel(item, campoPrincipal)
      return data && data >= inicioMesPainel
    }

    const vendasMesPainel = vendas.filter((venda) => pertenceAoMesAtualPainel(venda, 'data_venda'))
    const pagamentosMesPainel = pagamentos.filter((pagamento) => pertenceAoMesAtualPainel(pagamento, 'data_pagamento'))
    const movimentacoesMesPainel = movimentacoesProdutos.filter((item) => pertenceAoMesAtualPainel(item, 'data_venda'))
    const despesasMesPainel = despesas.filter((item) => pertenceAoMesAtualPainel(item, 'data_despesa'))

    const totalBruto = vendasMesPainel.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const totalLiquidoVendas = vendasMesPainel.reduce((acc, venda) => acc + Number(venda.valor_liquido || 0), 0)
    const totalTaxas = vendasMesPainel.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const totalPendencias = pendencias
      .filter((item) => {
        if (pendenciaEhHerdada(item)) return false
        const dataVenda = String(item.vendas?.data_venda || '').slice(0, 10)
        return dataVenda && dataVenda >= inicioMesPainel
      })
      .reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)
    const saldoAnteriorEmAberto = pendencias
      .filter((item) => {
        if (pendenciaEhHerdada(item)) return true
        const dataVenda = String(item.vendas?.data_venda || '').slice(0, 10)
        return dataVenda && dataVenda < inicioMesPainel
      })
      .reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)
    const totalRecebido = pagamentosMesPainel.reduce((acc, pagamento) => acc + Number(pagamento.valor_pago || 0), 0)
    const totalCustoProdutos = movimentacoesMesPainel.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalDespesas = despesasMesPainel.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalAbastecimentos = despesasMesPainel.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoes = despesasMesPainel.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustos = despesasMesPainel.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalEmDelivery = deliveries
      .filter((item) => item.status === 'Programado')
      .reduce((acc, item) => acc + Number(item.valor_total || 0), 0)

    const totalLiquidoAtual = totalBruto - totalCustoProdutos - totalTaxas - totalDespesas - totalPendencias
    const totalProjetadoFinal = totalLiquidoAtual + totalPendencias
    const subtotalOperacional = totalProjetadoFinal

    const pecasVendidas = movimentacoesMesPainel.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const numeroVendas = vendasMesPainel.length
    const clientesAtendidos = new Set(vendasMesPainel.map((venda) => venda.cliente_id).filter(Boolean)).size

    const amostras = movimentacoesMesPainel.reduce((acc, item) => {
      const observacao = normalizarTexto(item.observacao)
      return observacao.includes('amostra') || observacao.includes('degust')
        ? acc + Number(item.quantidade || 0)
        : acc
    }, 0)

    const ticketMedio = numeroVendas > 0 ? totalBruto / numeroVendas : 0
    const mediaLiquidaPorPeca = pecasVendidas > 0 ? totalProjetadoFinal / pecasVendidas : 0
    const mediaPecasPorCliente = clientesAtendidos > 0 ? pecasVendidas / clientesAtendidos : 0
    const mediaPecasPorVenda = numeroVendas > 0 ? pecasVendidas / numeroVendas : 0
    const margemOperacionalProjetada = totalBruto > 0 ? (totalProjetadoFinal / totalBruto) * 100 : 0

    const semanas = [1, 2, 3, 4, 5]

    function semanaDoMes(data) {
      if (!data) return 1
      const dia = Number(String(data).slice(8, 10)) || 1
      return Math.min(Math.ceil(dia / 7), 5)
    }

    const brutoPorSemana = semanas.map((semana) => {
      return vendasMesPainel
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    })

    const clientesPorSemana = semanas.map((semana) => {
      const clientesSemana = vendasMesPainel
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .map((venda) => venda.cliente_id)
        .filter(Boolean)

      return new Set(clientesSemana).size
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
        <section className="mobile-summary-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-8 gap-4 mb-6">
          <CardResumo titulo="Total bruto vendido" valor={moeda(totalBruto)} classe="text-green-300" />
          <CardResumo titulo="Pagamentos fornecedores" valor={moeda(totalCustoProdutos)} classe="text-red-300" />
          <CardResumo titulo="Total despesas" valor={moeda(totalDespesas)} classe="text-red-300" />
          <CardResumo titulo="Total taxas" valor={moeda(totalTaxas)} classe="text-red-300" />
          <CardResumo titulo="Em aberto, mês atual" valor={moeda(totalPendencias)} classe="text-orange-300" />
          <CardResumo titulo="Em Delivery" valor={moeda(totalEmDelivery)} classe="text-yellow-300" />
          <CardResumo titulo="Saldo anterior em aberto" valor={moeda(saldoAnteriorEmAberto)} classe="text-yellow-300" />
          <CardResumo titulo="Total projetado final" valor={moeda(totalProjetadoFinal)} classe={totalProjetadoFinal >= 0 ? 'text-green-400' : 'text-red-300'} />
        </section>

        <section className="mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Resumo Geral</h2>
              <p className="text-zinc-500 mt-2">Visão financeira operacional baseada no modelo de controle da planilha.</p>
            </div>

            <span className="bg-green-950 text-green-300 px-4 py-2 rounded-2xl text-sm font-semibold">
              Painel Executivo
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
            <BlocoRelatorio titulo="Resumo financeiro">
              <LinhaRelatorio rotulo="Total bruto vendas" valor={moeda(totalBruto)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Total líquido cartões / Pix / dinheiro / link" valor={moeda(totalLiquidoVendas)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Taxas cartões / link" valor={moeda(totalTaxas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Fiados em aberto, mês atual" valor={moeda(totalPendencias)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Saldo anterior em aberto" valor={moeda(saldoAnteriorEmAberto)} destaque="text-yellow-300" />
              <LinhaRelatorio rotulo="Pagamentos fornecedores" valor={moeda(totalCustoProdutos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Total de despesas" valor={moeda(totalDespesas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Subtotal operacional" valor={moeda(subtotalOperacional)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Total projetado final" valor={moeda(totalProjetadoFinal)} destaque={totalProjetadoFinal >= 0 ? 'text-green-400' : 'text-red-300'} />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Peças e atendimento">
              <LinhaRelatorio rotulo="Peças vendidas" valor={pecasVendidas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Clientes atendidos" valor={clientesAtendidos} destaque="text-white" />
              <LinhaRelatorio rotulo="Vendas lançadas" valor={numeroVendas} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por venda" valor={mediaPecasPorVenda.toFixed(1).replace('.', ',')} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por cliente" valor={mediaPecasPorCliente.toFixed(1).replace('.', ',')} destaque="text-white" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Indicadores">
              <LinhaRelatorio rotulo="Ticket médio" valor={moeda(ticketMedio)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Média líquida por peça" valor={moeda(mediaLiquidaPorPeca)} destaque="text-green-400" />
              <LinhaRelatorio rotulo="Margem operacional projetada" valor={percentual(margemOperacionalProjetada)} destaque={margemOperacionalProjetada >= 0 ? 'text-green-300' : 'text-red-300'} />
              <LinhaRelatorio rotulo="Total projetado final" valor={moeda(totalProjetadoFinal)} destaque={totalProjetadoFinal >= 0 ? 'text-green-400' : 'text-red-300'} />
            </BlocoRelatorio>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <BlocoRelatorio titulo="Vendas por semana">
              {semanas.map((semana, index) => (
                <LinhaRelatorio key={semana} rotulo={`Semana ${semana}`} valor={moeda(brutoPorSemana[index])} destaque="text-green-300" />
              ))}
              <LinhaRelatorio rotulo="Total do período" valor={moeda(totalBruto)} destaque="text-green-400" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Clientes por semana">
              {semanas.map((semana, index) => (
                <LinhaRelatorio key={semana} rotulo={`Semana ${semana}`} valor={clientesPorSemana[index]} destaque="text-white" />
              ))}
              <LinhaRelatorio rotulo="Total do mês" valor={clientesAtendidos} destaque="text-green-300" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Resumo de peças">
              <LinhaRelatorio rotulo="Peças vendidas" valor={pecasVendidas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Média líquida por peça" valor={moeda(mediaLiquidaPorPeca)} destaque="text-green-400" />
              <LinhaRelatorio rotulo="Média peças por venda" valor={mediaPecasPorVenda.toFixed(1).replace('.', ',')} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por cliente" valor={mediaPecasPorCliente.toFixed(1).replace('.', ',')} destaque="text-white" />
            </BlocoRelatorio>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
            <BlocoRelatorio titulo="Custos operacionais">
              <LinhaRelatorio rotulo="Pagamentos fornecedores" valor={moeda(totalCustoProdutos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Taxas" valor={moeda(totalTaxas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Abastecimentos" valor={moeda(totalAbastecimentos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Degustações" valor={moeda(totalDegustacoes)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Outros custos" valor={moeda(totalOutrosCustos)} destaque="text-red-300" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Status comercial">
              <LinhaRelatorio rotulo="Número de vendas" valor={numeroVendas} destaque="text-white" />
              <LinhaRelatorio rotulo="Vendas pagas" valor={vendas.filter((venda) => normalizarStatus(venda.status) === 'PAGO').length} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Vendas em aberto" valor={vendas.filter((venda) => normalizarStatus(venda.status) !== 'PAGO').length} destaque="text-orange-300" />
            </BlocoRelatorio>
          </div>
        </section>
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
        ${venda.clientes?.telefone}
        ${venda.forma_pagamento}
        ${normalizarStatus(venda.status)}
        ${moeda(venda.valor_total)}
        ${dataBR(venda.data_venda)}
      `)

      return contemTermos(texto, termo) && dentroPeriodoFiltro(venda.data_venda, filtroVendasInicio, filtroVendasFim)
    })

    return (
      <>
        <section className="mini-venda-rapida sticky top-0 z-40 bg-[#15110f]/95 backdrop-blur border border-orange-950 rounded-[28px] p-5 mb-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {editandoVendaId ? 'Editar Venda' : 'Nova Venda'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Barra fixa de lançamento. Role a lista sem perder o formulário de venda.
              </p>
            </div>

            <div className="mini-venda-resumo grid grid-cols-3 gap-3 min-w-[520px]">
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
                <p className="text-lg font-bold text-green-300">{statusVendaAtual === 'PARCIAL' ? moeda(valorLiquidoRecebidoAgora) : moeda(valorLiquido)}</p>
                {statusVendaAtual === 'PARCIAL' && (
                  <p className="text-[10px] text-orange-300 mt-1">Taxa aplicada só sobre o valor pago</p>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={salvarVenda} className="mini-venda-form grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-end">
            <div className="lg:col-span-1 xl:col-span-3">
              <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                Selecionar cliente
              </label>

              <div className="grid gap-2">
                <input
                  type="text"
                  value={buscaClienteVenda}
                  onChange={(e) => setBuscaClienteVenda(e.target.value)}
                  placeholder="Pesquisar por nome, referência ou observação"
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                />

                <select
                  value={clienteId}
                  onChange={(e) => {
                    setClienteId(e.target.value)
                    const clienteSelecionado = clientes.find((cliente) => String(cliente.id) === String(e.target.value))
                    if (clienteSelecionado) {
                      setBuscaClienteVenda('')
                    }
                  }}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
                >
                  <option value="">Selecionar cliente</option>
                  {clientesParaVendaFiltrados().map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} | {cliente.referencia || 'Sem referência'} {cliente.ativo === false ? '| Inativo' : ''}
                    </option>
                  ))}
                </select>

                {buscaClienteVenda && clientesParaVendaFiltrados().length === 0 && (
                  <p className="text-[11px] text-orange-300">
                    Nenhum cliente encontrado com esse termo.
                  </p>
                )}
              </div>
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
                onChange={(e) => {
                  setStatus(e.target.value)
                  if (normalizarStatus(e.target.value) !== 'PARCIAL') {
                    setValorPagoVenda('')
                  }
                }}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
              >
                <option value="EM ABERTO">Em aberto</option>
                <option value="PARCIAL">Parcial</option>
                <option value="PAGO">Pago</option>
              </select>
            </div>

            {normalizarStatus(status) === 'PARCIAL' && (
              <div className="lg:col-span-1">
                <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                  Valor pago agora
                </label>

                <input
                  type="text"
                  value={valorPagoVenda}
                  onChange={(e) => setValorPagoVenda(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-black border border-orange-900 rounded-2xl px-4 py-3 text-sm"
                />

                <p className="text-[10px] text-orange-300 mt-1">
                  Saldo: {moeda(saldoParcialVenda)}
                </p>
              </div>
            )}

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

          <div className="mb-5 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-4">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Período das vendas</p>
                <p className="text-sm text-zinc-300 mt-1"><RotuloPeriodo inicio={filtroVendasInicio} fim={filtroVendasFim} /></p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => aplicarPeriodoLista('hoje', setFiltroVendasInicio, setFiltroVendasFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Hoje</button>
                <button type="button" onClick={() => aplicarPeriodoLista('semana', setFiltroVendasInicio, setFiltroVendasFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Semana</button>
                <button type="button" onClick={() => aplicarPeriodoLista('mes', setFiltroVendasInicio, setFiltroVendasFim)} className="bg-orange-950 hover:bg-orange-900 px-3 py-2 rounded-xl text-xs font-semibold">Mês atual</button>
                <button type="button" onClick={() => aplicarPeriodoLista('mesAnterior', setFiltroVendasInicio, setFiltroVendasFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Mês anterior</button>
                <button type="button" onClick={() => aplicarPeriodoLista('todos', setFiltroVendasInicio, setFiltroVendasFim)} className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl text-xs font-semibold">Ver todos</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
                Data inicial
                <input type="date" value={filtroVendasInicio} onClick={abrirCalendario} onChange={(e) => setFiltroVendasInicio(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
              </label>

              <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
                Data final
                <input type="date" value={filtroVendasFim} onClick={abrirCalendario} onChange={(e) => setFiltroVendasFim(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
              </label>
            </div>
          </div>

          <div className="mini-vendas-mobile-list">
            {vendasFiltradas.length === 0 && (
              <div className="mini-venda-list-card mini-venda-empty">Nenhuma venda encontrada.</div>
            )}

            {vendasFiltradas.map((venda) => {
              const aberto = String(vendaExpandidaId) === String(venda.id)
              const statusVenda = normalizarStatus(venda.status)

              return (
                <div key={venda.id} className={`mini-venda-list-card ${aberto ? 'aberto' : ''} ${statusVenda.toLowerCase().replace(/\s+/g, '-')}`}>
                  <button
                    type="button"
                    className="mini-venda-list-resumo"
                    onClick={() => setVendaExpandidaId(aberto ? null : venda.id)}
                  >
                    <div className="mini-venda-list-main">
                      <strong>#{venda.numero_venda}</strong>
                      <span>{primeiroNome(venda.clientes?.nome)} • {venda.clientes?.referencia || 'Sem referência'}</span>
                    </div>

                    <div className="mini-venda-list-meta">
                      <strong>{moeda(venda.valor_total)}</strong>
                      <span>{dataBR(venda.data_venda)}</span>
                    </div>

                    <em aria-hidden="true">{aberto ? '⌃' : '›'}</em>
                  </button>

                  {aberto && (
                    <div className="mini-venda-list-detalhes">
                      <div>
                        <small>Cliente</small>
                        <p>{venda.clientes?.nome || 'Cliente sem nome'}</p>
                      </div>

                      <div>
                        <small>Pagamento</small>
                        <p>{venda.forma_pagamento || 'Sem forma informada'}</p>
                      </div>

                      <div>
                        <small>Taxa</small>
                        <p className="text-red-300">{moeda(venda.valor_taxa)}</p>
                      </div>

                      <div>
                        <small>Líquido</small>
                        <p className="text-green-300">{moeda(venda.valor_liquido)}</p>
                      </div>

                      <div>
                        <small>Status</small>
                        <span className={`mini-status ${statusVenda === 'PAGO' ? 'ativo' : 'inativo'}`}>
                          {statusVenda}
                        </span>
                      </div>

                      <div className="mini-venda-list-acoes">
                        <button type="button" onClick={() => editarVenda(venda)} className="bg-zinc-800 hover:bg-zinc-700">
                          Editar
                        </button>
                        <button type="button" onClick={() => excluirVenda(venda)} className="bg-red-900 hover:bg-red-800">
                          Excluir
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mini-vendas-desktop-table mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
            <table className="mini-data-table mini-mobile-card-table mini-vendas-compactas w-full min-w-[900px]">
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
    const totalClientesAtivos = clientes.filter((cliente) => cliente.ativo !== false).length
    const totalClientesInativos = clientes.filter((cliente) => cliente.ativo === false).length

    const clientesFiltrados = clientes.filter((cliente) => {
      const clienteInativo = cliente.ativo === false

      if (filtroClientes === 'ativos' && clienteInativo) return false
      if (filtroClientes === 'inativos' && !clienteInativo) return false

      const texto = normalizarTexto(`
        ${cliente.nome}
        ${cliente.referencia}
        ${cliente.observacao}
        ${cliente.telefone}
        ${clienteInativo ? 'inativo' : 'ativo'}
      `)

      return contemTermos(texto, termo)
    })

    const botaoFiltroCliente = (id, texto, total) => (
      <button
        type="button"
        onClick={() => {
          setFiltroClientes(id)
          setClienteExpandidoId(null)
        }}
        className={`px-4 py-3 rounded-2xl font-bold border transition ${
          filtroClientes === id
            ? 'bg-orange-950 border-orange-800 text-white'
            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
        }`}
      >
        {texto} <span className="text-xs text-zinc-500">{total}</span>
      </button>
    )

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Clientes</h2>
            <p className="text-zinc-500 text-sm mt-1">Lista principal com clientes ativos. Inativos ficam preservados e ocultos por padrão.</p>
          </div>

          <input
            value={buscaClientes}
            onChange={(e) => setBuscaClientes(e.target.value)}
            placeholder="Buscar cliente, referência, observação ou status"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-5 mini-clientes-filtros">
          {botaoFiltroCliente('ativos', 'Ativos', totalClientesAtivos)}
          {botaoFiltroCliente('inativos', 'Inativos', totalClientesInativos)}
          {botaoFiltroCliente('todos', 'Todos', clientes.length)}
        </div>

        <form onSubmit={salvarCliente} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          <input value={formCliente.nome} onChange={(e) => setFormCliente({ ...formCliente, nome: e.target.value })} placeholder="Cliente" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formCliente.referencia} onChange={(e) => setFormCliente({ ...formCliente, referencia: e.target.value })} placeholder="Ref.:" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formCliente.observacao} onChange={(e) => setFormCliente({ ...formCliente, observacao: e.target.value })} placeholder="Obs.:" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <input value={formCliente.telefone} onChange={(e) => setFormCliente({ ...formCliente, telefone: e.target.value })} placeholder="Contato" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold">
            {editandoClienteId ? 'Salvar edição' : 'Cadastrar cliente'}
          </button>
        </form>

        <div className="mini-clientes-mobile-list">
          {clientesFiltrados.length === 0 && (
            <div className="mini-cliente-card mini-cliente-empty">Nenhum cliente encontrado.</div>
          )}

          {clientesFiltrados.map((cliente) => {
            const aberto = String(clienteExpandidoId) === String(cliente.id)

            return (
              <div key={cliente.id} className={`mini-cliente-card ${aberto ? 'aberto' : ''} ${cliente.ativo === false ? 'inativo' : ''}`}>
                <button
                  type="button"
                  className="mini-cliente-resumo"
                  onClick={() => setClienteExpandidoId(aberto ? null : cliente.id)}
                >
                  <div>
                    <strong>{primeiroNome(cliente.nome)}</strong>
                    <span>{cliente.referencia || 'Sem referência'}</span>
                  </div>
                  <em aria-hidden="true">{aberto ? '⌃' : '›'}</em>
                </button>

                {aberto && (
                  <div className="mini-cliente-detalhes">
                    <div>
                      <small>Nome completo</small>
                      <p>{cliente.nome || 'Sem nome'}</p>
                    </div>

                    <div>
                      <small>Telefone</small>
                      <p>{cliente.telefone || 'Sem telefone'}</p>
                    </div>

                    <div>
                      <small>Observação</small>
                      <p>{cliente.observacao || 'Sem observação'}</p>
                    </div>

                    <div>
                      <small>Status</small>
                      <span className={cliente.ativo === false ? 'mini-status inativo' : 'mini-status ativo'}>
                        {cliente.ativo === false ? 'Inativo' : 'Ativo'}
                      </span>
                    </div>

                    <div className="mini-cliente-acoes">
                      <button type="button" onClick={() => editarCliente(cliente)} className="bg-zinc-800 hover:bg-zinc-700">
                        Editar
                      </button>
                      <button type="button" onClick={() => alternarStatusCliente(cliente)} className="bg-orange-950 hover:bg-orange-900">
                        {cliente.ativo === false ? 'Reativar' : 'Inativar'}
                      </button>
                      <button type="button" onClick={() => excluirCliente(cliente)} className="bg-red-900 hover:bg-red-800">
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mini-clientes-desktop-table mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table mini-mobile-card-table mini-clientes-card-table w-full min-w-[1040px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Cliente</th>
                <th className="p-4">Referência</th>
                <th className="p-4">Observação</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-5 text-zinc-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}

              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-t border-zinc-900">
                  <td className="p-4 font-semibold">{cliente.nome}</td>
                  <td className="p-4 text-zinc-400">{cliente.referencia || 'Sem referência'}</td>
                  <td className="p-4 text-zinc-400">{cliente.observacao || 'Sem observação'}</td>
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
                  <td className="p-4 mini-clientes-acoes-td">
                    <div className="mini-clientes-acoes-inline">
                      <button
                        type="button"
                        onClick={() => editarCliente(cliente)}
                        className="mini-clientes-btn mini-clientes-btn-primary"
                      >
                        Editar
                      </button>

                      <details className="mini-clientes-menu">
                        <summary aria-label="Mais ações">⋮</summary>
                        <div className="mini-clientes-menu-list">
                          <button type="button" onClick={() => alternarStatusCliente(cliente)}>
                            {cliente.ativo === false ? 'Reativar' : 'Inativar'}
                          </button>
                          <button type="button" onClick={() => excluirCliente(cliente)} className="danger">
                            Excluir
                          </button>
                        </div>
                      </details>
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


  function TelaCobrancas() {
    const termo = normalizarTexto(buscaCobrancas)
    const hoje = dataHoje()
    const inicioMesCobrancas = inicioMesAtual()

    function pendenciaEhSaldoAnterior(pendencia) {
      if (pendenciaEhHerdada(pendencia)) return true
      const dataVenda = String(pendencia.vendas?.data_venda || '').slice(0, 10)
      return Boolean(dataVenda && dataVenda < inicioMesCobrancas)
    }

    function saldosPorPeriodo(lista) {
      return (lista || []).reduce((acc, item) => {
        const valor = Number(item.saldo_restante || 0)
        if (pendenciaEhSaldoAnterior(item)) {
          acc.anterior += valor
        } else {
          acc.atual += valor
        }
        acc.total += valor
        return acc
      }, { atual: 0, anterior: 0, total: 0 })
    }

    function chaveClienteCobranca(pendencia) {
      const cliente = clienteDaPendencia(pendencia)
      return normalizarTexto(`${cliente.nome || ''}|${cliente.telefone || ''}|${cliente.referencia || ''}`) || String(pendencia.venda_id || pendencia.id)
    }

    function saldosClienteNoLocal(itens, pendenciaBase) {
      const chave = chaveClienteCobranca(pendenciaBase)
      return saldosPorPeriodo((itens || []).filter((item) => chaveClienteCobranca(item) === chave))
    }

    const listaPendencias = pendencias
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((pendencia) => {
        const texto = normalizarTexto(`
          ${pendencia.vendas?.numero_venda}
          ${clienteDaPendencia(pendencia).nome}
          ${clienteDaPendencia(pendencia).referencia}
          ${clienteDaPendencia(pendencia).telefone}
          ${pendencia.observacao_manual}
          ${pendenciaEhHerdada(pendencia) ? 'saldo anterior herdado planilha antiga' : ''}
          ${pendencia.vencimento}
          ${normalizarStatus(pendencia.status)}
        `)

        return contemTermos(texto, termo)
      })

    const grupos = listaPendencias.reduce((acc, pendencia) => {
      const referencia = clienteDaPendencia(pendencia).referencia || 'Sem referência'
      const chave = String(referencia).trim() || 'Sem referência'

      if (!acc[chave]) acc[chave] = []
      acc[chave].push(pendencia)
      return acc
    }, {})

    const locais = Object.entries(grupos)
      .map(([local, itens]) => {
        const clientesUnicos = new Set(
          itens.map((item) => clienteDaPendencia(item).nome || item.cliente_id || item.venda_id).filter(Boolean)
        ).size

        const saldosGrupo = saldosPorPeriodo(itens)
        const total = saldosGrupo.total
        const atrasados = itens.filter((item) => item.vencimento && item.vencimento < hoje).length
        const vencemHoje = itens.filter((item) => item.vencimento === hoje).length
        const menorVencimento = itens
          .map((item) => item.vencimento)
          .filter(Boolean)
          .sort()[0]

        return {
          local,
          itens: [...itens].sort((a, b) =>
            String(clienteDaPendencia(a).nome || '').localeCompare(String(clienteDaPendencia(b).nome || ''), 'pt-BR')
          ),
          clientesUnicos,
          total,
          totalAtual: saldosGrupo.atual,
          totalAnterior: saldosGrupo.anterior,
          atrasados,
          vencemHoje,
          menorVencimento,
        }
      })
      .sort((a, b) => a.local.localeCompare(b.local, 'pt-BR'))

    const saldosCobrancas = saldosPorPeriodo(listaPendencias)
    const totalGeral = saldosCobrancas.total
    const totalMesAtualCobrancas = saldosCobrancas.atual
    const totalSaldoAnteriorCobrancas = saldosCobrancas.anterior
    const totalClientes = new Set(
      listaPendencias.map((item) => clienteDaPendencia(item).nome || item.venda_id || item.id).filter(Boolean)
    ).size
    const totalAtrasados = listaPendencias.filter((item) => item.vencimento && item.vencimento < hoje).length
    const totalHoje = listaPendencias.filter((item) => item.vencimento === hoje).length

    function statusCobranca(pendencia) {
      if (!pendencia.vencimento) return { texto: 'Sem vencimento', classe: 'text-zinc-400', badge: 'bg-zinc-900 text-zinc-300' }
      if (pendencia.vencimento < hoje) return { texto: 'Atrasado', classe: 'text-red-300', badge: 'bg-red-950 text-red-300' }
      if (pendencia.vencimento === hoje) return { texto: 'Vence hoje', classe: 'text-yellow-300', badge: 'bg-yellow-950 text-yellow-300' }
      return { texto: 'Em dia', classe: 'text-green-300', badge: 'bg-green-950 text-green-300' }
    }

    function abrirLocal(local) {
      setLocalCobrancaAberto(localCobrancaAberto === local ? '' : local)
      setCobrancaExpandidaId(null)
    }

    const localSelecionado = locais.find((grupo) => grupo.local === localCobrancaAberto) || locais[0]

    return (
      <section className="mobile-panel-card mini-cobrancas-refinada bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="mini-section-title text-3xl font-bold">Cobranças</h2>
            <p className="text-zinc-500 text-sm mt-1">Resumo por referência, local ou escola, com cobrança individual por cliente.</p>
          </div>

          <input
            value={buscaCobrancas}
            onChange={(e) => setBuscaCobrancas(e.target.value)}
            placeholder="Buscar cliente, referência, observação ou status"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 mb-6 mini-cobrancas-resumo">
          <CardResumo titulo="Total consolidado" valor={moeda(totalGeral)} classe="text-orange-300" />
          <CardResumo titulo="Mês atual" valor={moeda(totalMesAtualCobrancas)} classe="text-green-300" />
          <CardResumo titulo="Saldo anterior" valor={moeda(totalSaldoAnteriorCobrancas)} classe="text-yellow-300" />
          <CardResumo titulo="Clientes" valor={totalClientes} classe="text-white" />
          <CardResumo titulo="Atrasados" valor={totalAtrasados} classe="text-red-300" />
          <CardResumo titulo="Vence hoje" valor={totalHoje} classe="text-yellow-300" />
        </div>

        {locais.length === 0 && (
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-5 text-zinc-500">
            Nenhuma cobrança encontrada.
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[390px_1fr] gap-5 mini-cobrancas-layout">
          <div className="grid gap-3 content-start mini-cobrancas-locais">
            {locais.map((grupo, index) => {
              const aberto = localCobrancaAberto ? localCobrancaAberto === grupo.local : index === 0
              return (
                <button
                  key={grupo.local}
                  type="button"
                  onClick={() => abrirLocal(grupo.local)}
                  className={`mini-cobrancas-local-card text-left rounded-2xl border p-4 transition ${aberto ? 'border-orange-900 bg-orange-950/25' : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-lg font-black text-white truncate">📍 {grupo.local}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {grupo.clientesUnicos} cliente{grupo.clientesUnicos === 1 ? '' : 's'}
                        {grupo.menorVencimento ? ` • próximo ${dataBR(grupo.menorVencimento)}` : ''}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-orange-300 font-black">{moeda(grupo.total)}</p>
                      <p className="text-[11px] text-zinc-500">{aberto ? 'Aberto' : 'Ver'}</p>
                      <p className="text-[10px] text-green-300 mt-1">Atual: {moeda(grupo.totalAtual)}</p>
                      <p className="text-[10px] text-yellow-300">Anterior: {moeda(grupo.totalAnterior)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 text-[11px]">
                    {grupo.atrasados > 0 && <span className="bg-red-950 text-red-300 px-2 py-1 rounded-lg">{grupo.atrasados} atrasado{grupo.atrasados === 1 ? '' : 's'}</span>}
                    {grupo.vencemHoje > 0 && <span className="bg-yellow-950 text-yellow-300 px-2 py-1 rounded-lg">{grupo.vencemHoje} hoje</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {localSelecionado && (
            <div className="mini-cobrancas-local-detalhe rounded-2xl border border-zinc-900 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-zinc-900 p-5">
                <div>
                  <h3 className="text-2xl font-black">📍 {localSelecionado.local}</h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    {localSelecionado.clientesUnicos} cliente{localSelecionado.clientesUnicos === 1 ? '' : 's'} em aberto
                  </p>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-zinc-500 text-xs uppercase tracking-[0.18em]">Total do local</p>
                  <p className="text-2xl font-black text-orange-300">{moeda(localSelecionado.total)}</p>
                  <div className="mt-2 grid gap-1 text-xs font-bold">
                    <span className="text-green-300">Mês atual: {moeda(localSelecionado.totalAtual)}</span>
                    <span className="text-yellow-300">Saldo anterior: {moeda(localSelecionado.totalAnterior)}</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block overflow-hidden mini-cobrancas-desktop-wrap">
                <table className="w-full mini-cobrancas-desktop-table">
                  <thead className="bg-black text-left text-xs uppercase text-zinc-500">
                    <tr>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Data venda</th>
                      <th className="p-4">Vencimento</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Saldo atual</th>
                      <th className="p-4">Saldo anterior</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localSelecionado.itens.map((pendencia) => {
                      const statusAtual = statusCobranca(pendencia)
                      const clientePendencia = clienteDaPendencia(pendencia)
                      const ehSaldoAnterior = pendenciaEhSaldoAnterior(pendencia)
                      const itensCliente = localSelecionado.itens.filter((item) => chaveClienteCobranca(item) === chaveClienteCobranca(pendencia))
                      const valorLinha = Number(pendencia.saldo_restante || 0)
                      const valorAtualLinha = ehSaldoAnterior ? 0 : valorLinha
                      const valorAnteriorLinha = ehSaldoAnterior ? valorLinha : 0
                      return (
                        <tr key={pendencia.id} className="border-t border-zinc-900">
                          <td className="p-4 font-bold">{clientePendencia.nome || 'Cliente não informado'}</td>
                          <td className="p-4 text-zinc-300 font-semibold">{ehSaldoAnterior ? 'Saldo anterior' : dataBR(pendencia.vendas?.data_venda)}</td>
                          <td className={`p-4 font-semibold ${statusAtual.classe}`}>{dataBR(pendencia.vencimento)}</td>
                          <td className="p-4"><span className={`px-3 py-1 rounded-xl text-xs font-bold ${statusAtual.badge}`}>{statusAtual.texto}</span></td>
                          <td className="p-4 font-black text-green-300">{moeda(valorAtualLinha)}</td>
                          <td className="p-4 font-black text-yellow-300">{moeda(valorAnteriorLinha)}</td>
                          <td className="p-4 font-black text-orange-300">{moeda(valorLinha)}</td>
                          <td className="p-4 mini-cobrancas-acoes-td">
                            <div className="mini-cobrancas-acoes-inline">
                              <button
                                onClick={() => cobrarWhatsAppConsolidado(clientePendencia, itensCliente, true)}
                                className="mini-cobrancas-btn mini-cobrancas-btn-primary"
                              >
                                Cobrar
                              </button>
                              <button
                                onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante, pendencia)}
                                className="mini-cobrancas-btn mini-cobrancas-btn-secondary"
                              >
                                Confirmar
                              </button>
                              <details className="mini-cobrancas-menu">
                                <summary aria-label="Mais ações">⋮</summary>
                                <div className="mini-cobrancas-menu-list">
                                  <button onClick={() => cobrarWhatsApp(pendencia)}>Só este item</button>
                                  <button onClick={() => editarPendenciaFinanceira(pendencia)}>Editar</button>
                                </div>
                              </details>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden grid gap-3 p-4 mini-cobrancas-clientes-abertos">
                {(() => {
                  const gruposClientes = localSelecionado.itens.reduce((acc, pendencia) => {
                    const cliente = clienteDaPendencia(pendencia)
                    const key = chaveClienteCobranca(pendencia)
                    const valor = Number(pendencia.saldo_restante || 0)

                    if (!acc[key]) {
                      acc[key] = {
                        key,
                        cliente,
                        itens: [],
                        total: 0,
                        totalVencido: 0,
                        totalSaldoAnterior: 0,
                        proximoVencimento: '',
                        atrasadas: 0,
                      }
                    }

                    acc[key].itens.push(pendencia)
                    acc[key].total += valor

                    if (!pendencia.vencimento || pendencia.vencimento <= hoje) {
                      acc[key].totalVencido += valor
                      acc[key].atrasadas += 1
                    }

                    if (pendenciaEhSaldoAnterior(pendencia)) {
                      acc[key].totalSaldoAnterior += valor
                    }

                    if (pendencia.vencimento && (!acc[key].proximoVencimento || pendencia.vencimento < acc[key].proximoVencimento)) {
                      acc[key].proximoVencimento = pendencia.vencimento
                    }

                    return acc
                  }, {})

                  return Object.values(gruposClientes)
                    .sort((a, b) => {
                      if (b.totalVencido !== a.totalVencido) return b.totalVencido - a.totalVencido
                      return String(a.cliente.nome || '').localeCompare(String(b.cliente.nome || ''), 'pt-BR')
                    })
                    .map((grupoCliente) => {
                      const clienteAberto = cobrancaExpandidaId === grupoCliente.key
                      const itensOrdenados = [...grupoCliente.itens].sort((a, b) => String(a.vencimento || '').localeCompare(String(b.vencimento || '')))

                      return (
                        <div key={grupoCliente.key} className={`mini-pend-cliente-card mini-cobranca-cliente-card ${clienteAberto ? 'aberto' : ''}`}>
                          <button
                            type="button"
                            className="mini-pend-cliente-head mini-cobranca-cliente-head"
                            onClick={() => setCobrancaExpandidaId(clienteAberto ? null : grupoCliente.key)}
                          >
                            <div className="mini-pend-cliente-main">
                              <strong>{grupoCliente.cliente.nome || 'Cliente não informado'}</strong>
                              <span>{grupoCliente.itens.length} pendência{grupoCliente.itens.length === 1 ? '' : 's'} • próximo {dataBR(grupoCliente.proximoVencimento)}</span>
                              {grupoCliente.atrasadas > 0 && <em>{grupoCliente.atrasadas} atraso{grupoCliente.atrasadas === 1 ? '' : 's'}</em>}
                            </div>

                            <div className="mini-pend-cliente-valor">
                              <strong>{moeda(grupoCliente.total)}</strong>
                              {grupoCliente.totalVencido > 0 ? <span>Vencido: {moeda(grupoCliente.totalVencido)}</span> : <span>Em dia</span>}
                              {grupoCliente.totalSaldoAnterior > 0 && <small>Anterior: {moeda(grupoCliente.totalSaldoAnterior)}</small>}
                            </div>

                            <i>{clienteAberto ? '⌄' : '›'}</i>
                          </button>

                          {clienteAberto && (
                            <div className="mini-pend-itens-lista mini-cobranca-itens-lista">
                              {itensOrdenados.map((pendencia) => {
                                const statusAtual = statusCobranca(pendencia)
                                const ehSaldoAnterior = pendenciaEhSaldoAnterior(pendencia)
                                const valorLinha = Number(pendencia.saldo_restante || 0)
                                const valorAtualLinha = ehSaldoAnterior ? 0 : valorLinha
                                const valorAnteriorLinha = ehSaldoAnterior ? valorLinha : 0

                                return (
                                  <article key={pendencia.id} className="mini-pend-item-detalhe mini-cobranca-item-detalhe">
                                    <div className="mini-pend-item-topo">
                                      <div>
                                        <span>{ehSaldoAnterior ? 'Origem' : 'Data da venda'}</span>
                                        <strong>{ehSaldoAnterior ? 'Saldo anterior' : dataBR(pendencia.vendas?.data_venda)}</strong>
                                      </div>

                                      <div>
                                        <span>Vencimento</span>
                                        <strong className={statusAtual.classe}>{dataBR(pendencia.vencimento)}</strong>
                                        <em className={`mini-cobranca-status-pill ${statusAtual.badge}`}>{statusAtual.texto}</em>
                                      </div>
                                    </div>

                                    <div className="mini-pend-item-grid">
                                      <div>
                                        <span>Saldo atual</span>
                                        <strong className="text-green-300">{moeda(valorAtualLinha)}</strong>
                                      </div>

                                      <div>
                                        <span>Saldo anterior</span>
                                        <strong className="text-yellow-300">{moeda(valorAnteriorLinha)}</strong>
                                      </div>

                                      <div>
                                        <span>Total da pendência</span>
                                        <strong className="text-orange-300">{moeda(valorLinha)}</strong>
                                      </div>

                                      <div>
                                        <span>Status</span>
                                        <strong className={statusAtual.texto === 'Atrasado' ? 'mini-pend-status atrasado' : 'mini-pend-status em-dia'}>{statusAtual.texto}</strong>
                                      </div>
                                    </div>

                                    <div className="mini-pend-item-acoes">
                                      <button onClick={() => cobrarWhatsAppConsolidado(grupoCliente.cliente, grupoCliente.itens, true)} className="bg-emerald-700 hover:bg-emerald-600">
                                        Cobrar cliente
                                      </button>

                                      <button onClick={() => cobrarWhatsApp(pendencia)} className="bg-zinc-700 hover:bg-zinc-600">
                                        Só este item
                                      </button>

                                      <button onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante, pendencia)} className="bg-zinc-700 hover:bg-zinc-600 mini-pend-wide">
                                        Confirmar pagamento
                                      </button>

                                      <button onClick={() => editarPendenciaFinanceira(pendencia)} className="bg-orange-950 hover:bg-orange-900 mini-pend-wide">
                                        Editar pendência
                                      </button>
                                    </div>
                                  </article>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })
                })()}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  function TelaPendencias() {
    const termo = normalizarTexto(buscaPendencias)

    const listaPendencias = pendencias
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((pendencia) => {
        const cliente = clienteDaPendencia(pendencia)
        const texto = normalizarTexto(`
          ${pendencia.vendas?.numero_venda}
          ${cliente.nome}
          ${cliente.referencia}
          ${cliente.telefone}
          ${pendencia.observacao_manual}
          ${pendenciaEhHerdada(pendencia) ? 'saldo anterior herdado planilha antiga' : ''}
          ${normalizarStatus(pendencia.status)}
        `)

        const dataBase = pendencia.vencimento || dataBaseDaPendencia(pendencia)
        const periodoOk = (!filtroPendenciasInicio && !filtroPendenciasFim) || dentroPeriodoFiltro(dataBase, filtroPendenciasInicio, filtroPendenciasFim)

        return contemTermos(texto, termo) && periodoOk
      })

    const saldosAnterioresDetalhados = pendencias
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((item) => pendenciaContaComoSaldoAnterior(item))
      .sort((a, b) => String(a.vencimento || '').localeCompare(String(b.vencimento || '')))

    const totalSaldosAnterioresDetalhados = saldosAnterioresDetalhados
      .reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">{'Pend\u00eancias'}</h2>

          <input
            value={buscaPendencias}
            onChange={(e) => setBuscaPendencias(e.target.value)}
            placeholder="Buscar cliente, referência ou status"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <form onSubmit={cadastrarSaldoAnterior} className="mb-5 rounded-2xl border border-yellow-900/70 bg-yellow-950/10 p-4 grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.6fr_auto] gap-3 items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-yellow-500 font-bold mb-2">Saldos anteriores</p>
            <select
              value={formSaldoAnterior.cliente_id}
              onChange={(e) => setFormSaldoAnterior({ ...formSaldoAnterior, cliente_id: e.target.value })}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white"
            >
              <option value="">Selecionar cliente</option>
              {clientes.filter((cliente) => cliente.ativo !== false).map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}{cliente.referencia ? ` | ${cliente.referencia}` : ''}
                </option>
              ))}
            </select>
          </div>

          <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
            Valor
            <input
              value={formSaldoAnterior.valor}
              onChange={(e) => setFormSaldoAnterior({ ...formSaldoAnterior, valor: e.target.value })}
              placeholder="R$ 0,00"
              className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal"
            />
          </label>

          <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
            Vencimento
            <input
              type="date"
              value={formSaldoAnterior.vencimento}
              onClick={abrirCalendario}
              onChange={(e) => setFormSaldoAnterior({ ...formSaldoAnterior, vencimento: e.target.value })}
              className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal"
            />
          </label>

          <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
            Observação
            <input
              value={formSaldoAnterior.observacao}
              onChange={(e) => setFormSaldoAnterior({ ...formSaldoAnterior, observacao: e.target.value })}
              placeholder="Saldo herdado de planilha antiga"
              className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal"
            />
          </label>

          <button type="submit" className="bg-yellow-800 hover:bg-yellow-700 px-4 py-3 rounded-xl font-bold text-sm text-white">
            + Adicionar saldo anterior
          </button>
        </form>

        <div className="mb-5 rounded-2xl border border-yellow-900/70 bg-yellow-950/10 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-yellow-500 font-bold">Detalhamento do saldo anterior</p>
              <p className="text-sm text-zinc-400 mt-1">Conferência dos valores que aparecem no card Saldo anterior em aberto.</p>
            </div>

            <div className="rounded-2xl border border-yellow-900/70 bg-black px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Total conferido</p>
              <h3 className="text-2xl font-black text-yellow-300 mt-1">{moeda(totalSaldosAnterioresDetalhados)}</h3>
            </div>
          </div>

          {saldosAnterioresDetalhados.length === 0 ? (
            <div className="rounded-2xl border border-zinc-900 bg-black p-4 text-zinc-500 text-sm">
              Nenhum saldo anterior em aberto encontrado.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-900 bg-black">
              <table className="w-full min-w-[900px]">
                <thead className="bg-zinc-950">
                  <tr className="text-left text-zinc-500 uppercase text-xs">
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Referência</th>
                    <th className="p-3">Origem</th>
                    <th className="p-3">Vencimento</th>
                    <th className="p-3">Observação</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Valor</th>
                    <th className="p-3">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {saldosAnterioresDetalhados.map((pendencia) => {
                    const clientePendencia = clienteDaPendencia(pendencia)
                    const ehHerdada = pendenciaEhHerdada(pendencia)

                    return (
                      <tr key={pendencia.id} className="border-t border-zinc-900">
                        <td className="p-3 font-bold text-white">{clientePendencia.nome || 'Cliente não informado'}</td>
                        <td className="p-3 text-zinc-400">{clientePendencia.referencia || 'Sem referência'}</td>
                        <td className="p-3 text-zinc-300">{ehHerdada ? 'Saldo herdado' : 'Venda de mês anterior'}</td>
                        <td className="p-3 text-zinc-300">{dataBR(pendencia.vencimento)}</td>
                        <td className="p-3 text-zinc-500">{pendencia.observacao_manual || (ehHerdada ? 'Saldo herdado de planilha antiga' : `Venda #${pendencia.vendas?.numero_venda || ''}`)}</td>
                        <td className="p-3">
                          <span className="bg-orange-950 text-orange-300 px-3 py-1 rounded-xl text-xs">
                            {normalizarStatus(pendencia.status)}
                          </span>
                        </td>
                        <td className="p-3 text-right text-yellow-300 font-black">{moeda(pendencia.saldo_restante)}</td>
                        <td className="p-3">
                          <div className="grid grid-cols-2 gap-2 min-w-[240px]">
                            <button type="button" onClick={() => cobrarWhatsApp(pendencia)} className="bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded-xl text-xs font-bold">
                              Cobrar
                            </button>

                            <button type="button" onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante, pendencia)} className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-xl text-xs font-bold">
                              Registrar
                            </button>

                            <button type="button" onClick={() => editarPendenciaFinanceira(pendencia)} className="bg-orange-950 hover:bg-orange-900 px-3 py-2 rounded-xl text-xs font-bold">
                              Editar
                            </button>

                            {ehHerdada ? (
                              <button type="button" onClick={() => excluirSaldoAnterior(pendencia)} className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-xl text-xs font-bold">
                                Excluir
                              </button>
                            ) : (
                              <button type="button" disabled className="bg-zinc-900 text-zinc-600 px-3 py-2 rounded-xl text-xs font-bold cursor-not-allowed">
                                Histórico
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mb-5 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-4">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Filtro de pendências</p>
              <p className="text-sm text-zinc-300 mt-1">Mostrando valores em aberto. Período: <RotuloPeriodo inicio={filtroPendenciasInicio} fim={filtroPendenciasFim} /></p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => aplicarPeriodoLista('mes', setFiltroPendenciasInicio, setFiltroPendenciasFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Mês atual</button>
              <button type="button" onClick={() => aplicarPeriodoLista('mesAnterior', setFiltroPendenciasInicio, setFiltroPendenciasFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Mês anterior</button>
              <button type="button" onClick={() => aplicarPeriodoLista('todos', setFiltroPendenciasInicio, setFiltroPendenciasFim)} className="bg-orange-950 hover:bg-orange-900 px-3 py-2 rounded-xl text-xs font-semibold">Todas em aberto</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
              Data inicial
              <input type="date" value={filtroPendenciasInicio} onClick={abrirCalendario} onChange={(e) => setFiltroPendenciasInicio(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
            </label>

            <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
              Data final
              <input type="date" value={filtroPendenciasFim} onClick={abrirCalendario} onChange={(e) => setFiltroPendenciasFim(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
            </label>
          </div>
        </div>

        <div className="lg:hidden grid gap-3 mini-pendencias-sanfona">
          {listaPendencias.length === 0 && (
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-zinc-500">
              Nenhuma pendência encontrada.
            </div>
          )}

          {(() => {
            const hoje = dataHoje()
            const gruposLocais = listaPendencias.reduce((acc, pendencia) => {
              const cliente = clienteDaPendencia(pendencia)
              const local = cliente.referencia || 'Sem referência'

              if (!acc[local]) {
                acc[local] = {
                  local,
                  itens: [],
                  clientes: {},
                  total: 0,
                  totalVencido: 0,
                  totalSaldoAnterior: 0,
                  proximoVencimento: '',
                }
              }

              const valor = Number(pendencia.saldo_restante || 0)
              const clienteKey = String(pendencia.cliente_id || pendencia.vendas?.cliente_id || cliente.nome || pendencia.id)

              acc[local].itens.push(pendencia)
              acc[local].total += valor

              if (!pendencia.vencimento || pendencia.vencimento <= hoje) {
                acc[local].totalVencido += valor
              }

              if (pendenciaContaComoSaldoAnterior(pendencia)) {
                acc[local].totalSaldoAnterior += valor
              }

              if (pendencia.vencimento && (!acc[local].proximoVencimento || pendencia.vencimento < acc[local].proximoVencimento)) {
                acc[local].proximoVencimento = pendencia.vencimento
              }

              if (!acc[local].clientes[clienteKey]) {
                acc[local].clientes[clienteKey] = {
                  key: clienteKey,
                  cliente,
                  itens: [],
                  total: 0,
                  totalVencido: 0,
                  totalSaldoAnterior: 0,
                  proximoVencimento: '',
                  atrasadas: 0,
                }
              }

              acc[local].clientes[clienteKey].itens.push(pendencia)
              acc[local].clientes[clienteKey].total += valor

              if (!pendencia.vencimento || pendencia.vencimento <= hoje) {
                acc[local].clientes[clienteKey].totalVencido += valor
                acc[local].clientes[clienteKey].atrasadas += 1
              }

              if (pendenciaContaComoSaldoAnterior(pendencia)) {
                acc[local].clientes[clienteKey].totalSaldoAnterior += valor
              }

              if (pendencia.vencimento && (!acc[local].clientes[clienteKey].proximoVencimento || pendencia.vencimento < acc[local].clientes[clienteKey].proximoVencimento)) {
                acc[local].clientes[clienteKey].proximoVencimento = pendencia.vencimento
              }

              return acc
            }, {})

            return Object.values(gruposLocais)
              .sort((a, b) => a.local.localeCompare(b.local))
              .map((grupo) => {
                const localAberto = pendenciaLocalAberto === grupo.local
                const clientesDoLocal = Object.values(grupo.clientes).sort((a, b) => {
                  if (b.totalVencido !== a.totalVencido) return b.totalVencido - a.totalVencido
                  return (a.cliente.nome || '').localeCompare(b.cliente.nome || '')
                })

                return (
                  <article key={grupo.local} className={`mini-pend-local-card ${localAberto ? 'aberto' : ''}`}>
                    <button
                      type="button"
                      className="mini-pend-local-head"
                      onClick={() => {
                        setPendenciaLocalAberto(localAberto ? '' : grupo.local)
                        setPendenciaClienteAberto(null)
                      }}
                    >
                      <div className="mini-pend-local-main">
                        <strong>📍 {grupo.local}</strong>
                        <span>{clientesDoLocal.length} cliente{clientesDoLocal.length === 1 ? '' : 's'} • próximo {dataBR(grupo.proximoVencimento)}</span>
                        {grupo.totalVencido > 0 && <em>{clientesDoLocal.reduce((acc, cliente) => acc + cliente.atrasadas, 0)} atraso{clientesDoLocal.reduce((acc, cliente) => acc + cliente.atrasadas, 0) === 1 ? '' : 's'}</em>}
                      </div>

                      <div className="mini-pend-local-total">
                        <span>Total do local</span>
                        <strong>{moeda(grupo.total)}</strong>
                        <small>Anterior: {moeda(grupo.totalSaldoAnterior)}</small>
                      </div>

                      <i>{localAberto ? '⌄' : '›'}</i>
                    </button>

                    {localAberto && (
                      <div className="mini-pend-clientes-lista">
                        {clientesDoLocal.map((grupoCliente) => {
                          const clienteAberto = pendenciaClienteAberto === grupoCliente.key
                          const itensOrdenados = [...grupoCliente.itens].sort((a, b) => String(a.vencimento || '').localeCompare(String(b.vencimento || '')))

                          return (
                            <div key={grupoCliente.key} className={`mini-pend-cliente-card ${clienteAberto ? 'aberto' : ''}`}>
                              <button
                                type="button"
                                className="mini-pend-cliente-head"
                                onClick={() => setPendenciaClienteAberto(clienteAberto ? null : grupoCliente.key)}
                              >
                                <div className="mini-pend-cliente-main">
                                  <strong>{grupoCliente.cliente.nome || 'Cliente não informado'}</strong>
                                  <span>{grupoCliente.itens.length} pendência{grupoCliente.itens.length === 1 ? '' : 's'} • {dataBR(grupoCliente.proximoVencimento)}</span>
                                </div>

                                <div className="mini-pend-cliente-valor">
                                  <strong>{moeda(grupoCliente.total)}</strong>
                                  {grupoCliente.totalVencido > 0 ? <span>Vencido: {moeda(grupoCliente.totalVencido)}</span> : <span>Em dia</span>}
                                </div>

                                <i>{clienteAberto ? '⌄' : '›'}</i>
                              </button>

                              {clienteAberto && (
                                <div className="mini-pend-itens-lista">
                                  {itensOrdenados.map((pendencia) => {
                                    const ehHerdada = pendenciaEhHerdada(pendencia)
                                    const vencida = !pendencia.vencimento || pendencia.vencimento <= hoje

                                    return (
                                      <article key={pendencia.id} className="mini-pend-item-detalhe">
                                        <div className="mini-pend-item-topo">
                                          <div>
                                            <span>{ehHerdada ? 'Origem' : 'Data da venda'}</span>
                                            <strong>{ehHerdada ? 'Saldo anterior' : dataBR(pendencia.vendas?.data_venda)}</strong>
                                          </div>

                                          <div>
                                            <span>Vencimento</span>
                                            <strong className={vencida ? 'text-red-300' : 'text-green-300'}>{dataBR(pendencia.vencimento)}</strong>
                                          </div>
                                        </div>

                                        <div className="mini-pend-item-grid">
                                          <div>
                                            <span>Saldo atual</span>
                                            <strong className="text-green-300">{ehHerdada ? moeda(0) : moeda(pendencia.saldo_restante)}</strong>
                                          </div>

                                          <div>
                                            <span>Saldo anterior</span>
                                            <strong className="text-yellow-300">{ehHerdada ? moeda(pendencia.saldo_restante) : moeda(0)}</strong>
                                          </div>

                                          <div>
                                            <span>Total</span>
                                            <strong className="text-orange-300">{moeda(pendencia.saldo_restante)}</strong>
                                          </div>

                                          <div>
                                            <span>Status</span>
                                            <strong className={vencida ? 'mini-pend-status atrasado' : 'mini-pend-status em-dia'}>{vencida ? 'Atrasado' : 'Em dia'}</strong>
                                          </div>
                                        </div>

                                        <div className="mini-pend-item-acoes">
                                          <button onClick={() => cobrarWhatsAppConsolidado(grupoCliente.cliente, grupoCliente.itens, true)} className="bg-emerald-700 hover:bg-emerald-600">
                                            Cobrar cliente
                                          </button>

                                          <button onClick={() => cobrarWhatsApp(pendencia)} className="bg-zinc-700 hover:bg-zinc-600">
                                            Só este item
                                          </button>

                                          <button onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante, pendencia)} className="bg-zinc-700 hover:bg-zinc-600 mini-pend-wide">
                                            Confirmar pagamento
                                          </button>

                                          <button onClick={() => editarPendenciaFinanceira(pendencia)} className="bg-orange-950 hover:bg-orange-900 mini-pend-wide">
                                            Editar pendência
                                          </button>

                                          {!ehHerdada && (
                                            <button
                                              onClick={() =>
                                                excluirVenda({
                                                  id: pendencia.venda_id,
                                                  numero_venda: pendencia.vendas?.numero_venda,
                                                })
                                              }
                                              className="bg-red-900 hover:bg-red-800 mini-pend-wide"
                                            >
                                              Excluir venda
                                            </button>
                                          )}
                                        </div>
                                      </article>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </article>
                )
              })
          })()}
        </div>

        <div className="hidden lg:block mini-pendencias-desktop-premium">
          {listaPendencias.length === 0 ? (
            <div className="mini-pend-desktop-empty">
              Nenhuma pendência encontrada.
            </div>
          ) : (() => {
            const hoje = dataHoje()
            const gruposClientes = listaPendencias.reduce((acc, pendencia) => {
              const cliente = clienteDaPendencia(pendencia)
              const chave = String(pendencia.cliente_id || pendencia.vendas?.cliente_id || `${cliente.nome}-${cliente.referencia}` || pendencia.id)
              const valor = Number(pendencia.saldo_restante || 0)
              const vencida = !pendencia.vencimento || pendencia.vencimento <= hoje

              if (!acc[chave]) {
                acc[chave] = {
                  key: chave,
                  cliente,
                  itens: [],
                  total: 0,
                  totalVencido: 0,
                  totalSaldoAnterior: 0,
                  proximoVencimento: '',
                  atrasadas: 0,
                }
              }

              acc[chave].itens.push(pendencia)
              acc[chave].total += valor

              if (vencida) {
                acc[chave].totalVencido += valor
                acc[chave].atrasadas += 1
              }

              if (pendenciaContaComoSaldoAnterior(pendencia)) {
                acc[chave].totalSaldoAnterior += valor
              }

              if (pendencia.vencimento && (!acc[chave].proximoVencimento || pendencia.vencimento < acc[chave].proximoVencimento)) {
                acc[chave].proximoVencimento = pendencia.vencimento
              }

              return acc
            }, {})

            const listaClientesAgrupados = Object.values(gruposClientes).sort((a, b) => {
              if (b.totalVencido !== a.totalVencido) return b.totalVencido - a.totalVencido
              if (String(a.proximoVencimento || '') !== String(b.proximoVencimento || '')) {
                return String(a.proximoVencimento || '9999-12-31').localeCompare(String(b.proximoVencimento || '9999-12-31'))
              }
              return (a.cliente.nome || '').localeCompare(b.cliente.nome || '')
            })

            return (
              <div className="mini-pend-desktop-lista">
                {listaClientesAgrupados.map((grupoCliente) => {
                  const aberto = pendenciaClienteAberto === grupoCliente.key
                  const itensOrdenados = [...grupoCliente.itens].sort((a, b) => String(a.vencimento || '').localeCompare(String(b.vencimento || '')))
                  const statusGeral = grupoCliente.atrasadas > 0 ? 'Atrasado' : 'Em dia'

                  return (
                    <article key={grupoCliente.key} className={`mini-pend-desktop-card ${aberto ? 'aberto' : ''}`}>
                      <button
                        type="button"
                        className="mini-pend-desktop-head"
                        onClick={() => setPendenciaClienteAberto(aberto ? null : grupoCliente.key)}
                      >
                        <div className="mini-pend-avatar" aria-hidden="true">
                          {(grupoCliente.cliente.nome || '?').slice(0, 1).toUpperCase()}
                        </div>

                        <div className="mini-pend-desktop-cliente">
                          <strong>{grupoCliente.cliente.nome || 'Cliente não informado'}</strong>
                          <span>{grupoCliente.cliente.referencia || 'Sem referência'}</span>
                        </div>

                        <div className="mini-pend-desktop-status-wrap">
                          <span className={statusGeral === 'Atrasado' ? 'mini-pend-badge atrasado' : 'mini-pend-badge em-dia'}>
                            {statusGeral}
                          </span>
                        </div>

                        <div className="mini-pend-desktop-meta">
                          <strong>{grupoCliente.itens.length} pendência{grupoCliente.itens.length === 1 ? '' : 's'}</strong>
                          <span>Próximo venc.: {dataBR(grupoCliente.proximoVencimento)}</span>
                        </div>

                        <div className="mini-pend-desktop-total">
                          <span>Total em aberto</span>
                          <strong>{moeda(grupoCliente.total)}</strong>
                          {grupoCliente.totalSaldoAnterior > 0 && <small>Saldo anterior: {moeda(grupoCliente.totalSaldoAnterior)}</small>}
                        </div>

                        <span className="mini-pend-desktop-seta">{aberto ? '⌃' : '⌄'}</span>
                      </button>

                      {aberto && (
                        <div className="mini-pend-desktop-detalhes">
                          <div className="mini-pend-desktop-table-head">
                            <span>Tipo / referência</span>
                            <span>Data venda</span>
                            <span>Vencimento</span>
                            <span>Status</span>
                            <span>Saldo</span>
                            <span>Ações</span>
                          </div>

                          {itensOrdenados.map((pendencia) => {
                            const ehHerdada = pendenciaEhHerdada(pendencia)
                            const vencida = !pendencia.vencimento || pendencia.vencimento <= hoje
                            const statusLinha = vencida ? 'Atrasado' : 'Em dia'

                            return (
                              <div key={pendencia.id} className="mini-pend-desktop-row">
                                <div className="mini-pend-tipo">
                                  <span className={ehHerdada ? 'mini-pend-icone saldo' : 'mini-pend-icone venda'}>{ehHerdada ? '◷' : '▣'}</span>
                                  <div>
                                    <strong>{ehHerdada ? 'Saldo anterior' : `Venda #${pendencia.vendas?.numero_venda || ''}`}</strong>
                                    <small>{pendencia.observacao_manual || (ehHerdada ? 'Saldo herdado de planilha antiga' : 'Venda realizada')}</small>
                                  </div>
                                </div>

                                <div className="mini-pend-cell">{ehHerdada ? '—' : dataBR(pendencia.vendas?.data_venda)}</div>
                                <div className={vencida ? 'mini-pend-cell vencido' : 'mini-pend-cell em-dia'}>{dataBR(pendencia.vencimento)}</div>
                                <div><span className={vencida ? 'mini-pend-badge atrasado' : 'mini-pend-badge em-dia'}>{statusLinha}</span></div>
                                <div className="mini-pend-saldo">{moeda(pendencia.saldo_restante)}</div>

                                <div className="mini-pend-acoes-desktop">
                                  <button type="button" onClick={() => cobrarWhatsApp(pendencia)} className="acao-cobrar">Cobrar</button>
                                  <button type="button" onClick={() => registrarPagamento(pendencia.venda_id, pendencia.saldo_restante, pendencia)} className="acao-confirmar">Confirmar</button>
                                  <button type="button" onClick={() => editarPendenciaFinanceira(pendencia)} className="acao-mais">Editar</button>
                                  {ehHerdada ? (
                                    <button type="button" onClick={() => excluirSaldoAnterior(pendencia)} className="acao-excluir">Excluir</button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        excluirVenda({
                                          id: pendencia.venda_id,
                                          numero_venda: pendencia.vendas?.numero_venda,
                                        })
                                      }
                                      className="acao-excluir"
                                    >
                                      Excluir venda
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          })}

                          {grupoCliente.totalSaldoAnterior > 0 && (
                            <div className="mini-pend-desktop-nota">
                              Saldo anterior identificado no grupo. Confira origem e vencimento antes de confirmar baixa definitiva.
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            )
          })()}
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
        ${pagamento.status}
        ${pagamento.observacao}
        ${pagamento.observacao_estorno}
      `)

      return contemTermos(texto, termo) && dentroPeriodoFiltro(pagamento.data_pagamento, filtroPagamentosInicio, filtroPagamentosFim)
    })

    const pagamentosConfirmadosFiltrados = pagamentosFiltrados.filter(
      (pagamento) => normalizarStatus(pagamento.status || 'CONFIRMADO') !== 'ESTORNADO'
    )

    const totalRecebidoFiltrado = pagamentosConfirmadosFiltrados.reduce(
      (acc, pagamento) => acc + Number(pagamento.valor_pago || 0),
      0
    )

    const ultimoPagamento = pagamentosConfirmadosFiltrados[0]

    return (
      <section className="mobile-panel-card mini-pagamentos-panel bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="mini-pagamentos-head flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold mini-section-title">Pagamentos</h2>
            <p className="mini-pagamentos-subtitle text-zinc-500 mt-2">
              Extrato compacto dos valores recebidos.
            </p>
          </div>

          <input
            value={buscaPagamentos}
            onChange={(e) => setBuscaPagamentos(e.target.value)}
            placeholder="Buscar pagamento, cliente, venda ou forma"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        <div className="mb-5 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-4">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Período dos pagamentos</p>
              <p className="text-sm text-zinc-300 mt-1"><RotuloPeriodo inicio={filtroPagamentosInicio} fim={filtroPagamentosFim} /></p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => aplicarPeriodoLista('hoje', setFiltroPagamentosInicio, setFiltroPagamentosFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Hoje</button>
              <button type="button" onClick={() => aplicarPeriodoLista('semana', setFiltroPagamentosInicio, setFiltroPagamentosFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Semana</button>
              <button type="button" onClick={() => aplicarPeriodoLista('mes', setFiltroPagamentosInicio, setFiltroPagamentosFim)} className="bg-orange-950 hover:bg-orange-900 px-3 py-2 rounded-xl text-xs font-semibold">Mês atual</button>
              <button type="button" onClick={() => aplicarPeriodoLista('mesAnterior', setFiltroPagamentosInicio, setFiltroPagamentosFim)} className="bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl text-xs font-semibold">Mês anterior</button>
              <button type="button" onClick={() => aplicarPeriodoLista('todos', setFiltroPagamentosInicio, setFiltroPagamentosFim)} className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl text-xs font-semibold">Ver todos</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
              Data inicial
              <input type="date" value={filtroPagamentosInicio} onClick={abrirCalendario} onChange={(e) => setFiltroPagamentosInicio(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
            </label>

            <label className="grid gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">
              Data final
              <input type="date" value={filtroPagamentosFim} onClick={abrirCalendario} onChange={(e) => setFiltroPagamentosFim(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-white normal-case tracking-normal" />
            </label>
          </div>
        </div>

        <div className="mini-pagamentos-resumo grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
            <p className="text-zinc-500 uppercase text-xs font-bold tracking-[0.2em]">Recebido</p>
            <h3 className="text-2xl font-bold text-green-300 mt-2">{moeda(totalRecebidoFiltrado)}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
            <p className="text-zinc-500 uppercase text-xs font-bold tracking-[0.2em]">Registros</p>
            <h3 className="text-2xl font-bold mt-2">{pagamentosConfirmadosFiltrados.length}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
            <p className="text-zinc-500 uppercase text-xs font-bold tracking-[0.2em]">Último</p>
            <h3 className="text-xl font-bold mt-2">
              {ultimoPagamento ? dataBR(ultimoPagamento.data_pagamento) : 'Sem registro'}
            </h3>
          </div>
        </div>

        <div className="mini-pagamentos-lista-mobile">
          {pagamentosFiltrados.length === 0 && (
            <div className="mini-pagamento-vazio">Nenhum pagamento encontrado.</div>
          )}

          {pagamentosFiltrados.map((pagamento) => {
            const pagamentoEstornado = normalizarStatus(pagamento.status || 'CONFIRMADO') === 'ESTORNADO'

            return (
              <article key={pagamento.id} className={`mini-pagamento-card ${pagamentoEstornado ? 'border-red-900 bg-red-950/20 opacity-80' : ''}`}>
                <div className="mini-pagamento-card-topo">
                  <div>
                    <strong className={pagamentoEstornado ? 'text-red-300 line-through' : ''}>{moeda(pagamento.valor_pago)}</strong>
                    <span>{pagamento.forma_pagamento || 'Forma não informada'}</span>
                  </div>
                  <div className="grid justify-items-end gap-2">
                    <time>{dataBR(pagamento.data_pagamento)}</time>
                    {pagamentoEstornado && <span className="inline-flex rounded-full bg-red-950 px-3 py-1 text-[10px] font-bold text-red-200">ESTORNADO</span>}
                  </div>
                </div>

                <div className="mini-pagamento-card-corpo">
                  <p>
                    {pagamento.vendas?.clientes?.nome || 'Cliente não informado'}
                    {pagamento.vendas?.clientes?.referencia
                      ? ` • ${pagamento.vendas.clientes.referencia}`
                      : ''}
                  </p>
                  <small>Venda #{pagamento.vendas?.numero_venda || 'sem número'}</small>
                </div>

                {(pagamento.observacao || pagamento.observacao_estorno) && (
                  <details className="mini-pagamento-detalhes">
                    <summary>Ver observação</summary>
                    {pagamento.observacao && <p>{pagamento.observacao}</p>}
                    {pagamento.observacao_estorno && <p className="text-red-300">Estorno: {pagamento.observacao_estorno}</p>}
                  </details>
                )}

                <div className="mt-3 grid grid-cols-1 gap-2">
                  {!pagamentoEstornado ? (
                    <button
                      type="button"
                      onClick={() => estornarPagamento(pagamento)}
                      className="w-full rounded-xl bg-red-950 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-900"
                    >
                      Estornar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => reativarPagamento(pagamento)}
                      className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700"
                    >
                      Reativar pagamento
                    </button>
                  )}

                  {!pagamentoEstornado && pagamento.observacao_estorno && (
                    <button
                      type="button"
                      onClick={() => forcarEstornoPagamento(pagamento)}
                      className="w-full rounded-xl bg-orange-950 px-3 py-2 text-xs font-bold text-orange-100 hover:bg-orange-900"
                    >
                      Forçar estorno
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => ajustarStatusFinanceiroVenda(pagamento)}
                    className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-xs font-bold text-zinc-100 hover:bg-zinc-800"
                  >
                    Ajustar venda
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mini-pagamentos-tabela-desktop mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table w-full min-w-[900px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-5">Data</th>
                <th className="p-5">Cliente</th>
                <th className="p-5">Venda</th>
                <th className="p-5">Valor pago</th>
                <th className="p-5">Forma</th>
                <th className="p-5">Observação</th>
                <th className="p-5">Status</th>
                <th className="p-5">Ação</th>
              </tr>
            </thead>

            <tbody>
              {pagamentosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-5 text-zinc-500">
                    Nenhum pagamento encontrado.
                  </td>
                </tr>
              )}

              {pagamentosFiltrados.map((pagamento) => {
                const pagamentoEstornado = normalizarStatus(pagamento.status || 'CONFIRMADO') === 'ESTORNADO'

                return (
                  <tr key={pagamento.id} className={`border-t border-zinc-900 ${pagamentoEstornado ? 'bg-red-950/20 opacity-80' : ''}`}>
                    <td className="p-5">{dataBR(pagamento.data_pagamento)}</td>
                    <td className="p-5">{pagamento.vendas?.clientes?.nome}</td>
                    <td className="p-5">#{pagamento.vendas?.numero_venda}</td>
                    <td className={`p-5 ${pagamentoEstornado ? 'text-red-300 line-through' : 'text-green-300'}`}>{moeda(pagamento.valor_pago)}</td>
                    <td className="p-5">{pagamento.forma_pagamento}</td>
                    <td className="p-5 text-zinc-500">
                      <div className="grid gap-1">
                        <span>{pagamento.observacao}</span>
                        {pagamento.observacao_estorno && <span className="text-red-300">Estorno: {pagamento.observacao_estorno}</span>}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${pagamentoEstornado ? 'bg-red-950 text-red-200' : 'bg-green-950 text-green-200'}`}>
                        {pagamentoEstornado ? 'ESTORNADO' : 'CONFIRMADO'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="grid gap-2">
                        {!pagamentoEstornado ? (
                          <button
                            type="button"
                            onClick={() => estornarPagamento(pagamento)}
                            className="rounded-xl bg-red-950 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-900"
                          >
                            Estornar
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => reativarPagamento(pagamento)}
                            className="rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700"
                          >
                            Reativar
                          </button>
                        )}

                        {!pagamentoEstornado && pagamento.observacao_estorno && (
                          <button
                            type="button"
                            onClick={() => forcarEstornoPagamento(pagamento)}
                            className="rounded-xl bg-orange-950 px-3 py-2 text-xs font-bold text-orange-100 hover:bg-orange-900"
                          >
                            Forçar estorno
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => ajustarStatusFinanceiroVenda(pagamento)}
                          className="rounded-xl bg-zinc-900 px-3 py-2 text-xs font-bold text-zinc-100 hover:bg-zinc-800"
                        >
                          Ajustar venda
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  async function editarPecasResumoProduto(produtoResumo) {
    const movimentosProduto = movimentacoesProdutos
      .filter((item) => String(item.produto_id) === String(produtoResumo.id))
      .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))

    if (movimentosProduto.length === 0) {
      setFormMovimentacaoProduto({
        venda_id: vendas[0]?.id || '',
        produto_id: produtoResumo.id,
        quantidade: '',
        observacao: '',
      })
      setBuscaProdutoLancamento(produtoResumo.nome || '')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      alert('Este produto ainda não possui item lançado. Carreguei o produto no formulário para lançamento.')
      return
    }

    const quantidadeAtual = movimentosProduto.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const quantidadeInformada = prompt(
      `Digite a quantidade total correta de peças para ${produtoResumo.nome}:`,
      String(quantidadeAtual || '').replace('.', ',')
    )

    if (quantidadeInformada === null) return

    const novaQuantidadeTotal = numero(quantidadeInformada)

    if (novaQuantidadeTotal < 0) {
      alert('Quantidade inválida.')
      return
    }

    const diferenca = novaQuantidadeTotal - quantidadeAtual

    if (diferenca === 0) {
      alert('A quantidade informada já é igual ao total atual.')
      return
    }

    const itemBase = movimentosProduto[0]
    const novaQuantidadeItem = Number(itemBase.quantidade || 0) + diferenca

    if (novaQuantidadeItem < 0) {
      alert('Este produto possui vários lançamentos e a redução informada é maior que o último lançamento. Use a tabela Itens lançados e edite o item correto.')
      return
    }

    const produto = produtos.find((p) => String(p.id) === String(itemBase.produto_id))

    if (!produto) {
      alert('Produto não encontrado.')
      return
    }

    const precoCusto = Number(produto.preco_custo || 0)
    const precoVenda = Number(produto.preco_venda || 0)
    const subtotalCusto = precoCusto * novaQuantidadeItem
    const subtotalVenda = precoVenda * novaQuantidadeItem
    const lucro = subtotalVenda - subtotalCusto

    const { error } = await supabase
      .from('itens_venda')
      .update({
        quantidade: novaQuantidadeItem,
        subtotal_custo: subtotalCusto,
        subtotal_venda: subtotalVenda,
        lucro,
      })
      .eq('id', itemBase.id)

    if (error) {
      alert('Erro ao editar quantidade.')
      console.error(error)
      return
    }

    buscarTudo()
    alert('Quantidade atualizada com sucesso.')
  }

  function TelaProdutosControle() {
    const termo = normalizarTexto(buscaProdutosControle)

    const totalPecas = movimentacoesProdutos.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const pecasVendidasNaData = movimentacoesProdutos
      .filter((item) => {
        const dataItem = item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)
        return dataItem === dataControleProdutos
      })
      .reduce((acc, item) => acc + Number(item.quantidade || 0), 0)

    const itensLancadosNaData = movimentacoesProdutos.filter((item) => {
      const dataItem = item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)
      return dataItem === dataControleProdutos
    })

    const conferenciaProdutosDoDia = Object.values(
      itensLancadosNaData.reduce((acc, item) => {
        const nomeProduto = item.produtos?.nome || 'Produto não informado'
        const chave = String(item.produto_id || nomeProduto)

        if (!acc[chave]) {
          acc[chave] = {
            chave,
            produto: nomeProduto,
            quantidade: 0,
            lancamentos: [],
          }
        }

        acc[chave].quantidade += Number(item.quantidade || 0)
        acc[chave].lancamentos.push(item)
        return acc
      }, {})
    ).sort((a, b) => a.produto.localeCompare(b.produto, 'pt-BR'))

    const totalPecasConferencia = conferenciaProdutosDoDia.reduce(
      (acc, item) => acc + Number(item.quantidade || 0),
      0
    )


    async function editarQuantidadeConferencia(item) {
      const valor = prompt(
        `Digite a nova quantidade para ${item.produtos?.nome || 'este item'}:`,
        String(item.quantidade || '')
      )

      if (valor === null) return

      const quantidade = Number(String(valor || '').replace(',', '.'))

      if (!quantidade || quantidade <= 0) {
        alert('Quantidade inválida.')
        return
      }

      const produto = produtos.find((produtoItem) => String(produtoItem.id) === String(item.produto_id))
      const precoCusto = Number(produto?.preco_custo || item.preco_custo || 0)
      const precoVenda = Number(produto?.preco_venda || item.preco_venda || 0)
      const subtotalVenda = precoVenda * quantidade
      const subtotalCusto = precoCusto * quantidade
      const lucro = subtotalVenda - subtotalCusto

      const { error } = await supabase
        .from('itens_venda')
        .update({
          quantidade,
          preco_custo: precoCusto,
          preco_venda: precoVenda,
          subtotal_venda: subtotalVenda,
          subtotal_custo: subtotalCusto,
          lucro,
        })
        .eq('id', item.id)

      if (error) {
        alert('Erro ao editar a quantidade.')
        console.error(error)
        return
      }

      await buscarTudo()
    }

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
        ${produto.valorTotal}
        ${produto.custoTotal}
        ${produto.lucroTotal}
      `)

      return contemTermos(texto, termo)
    })

    const termoProdutoLancamento = normalizarTexto(buscaProdutoLancamento)

    const produtosParaLancamento = produtos.filter((produto) => {
      const texto = normalizarTexto(`
        ${produto.nome}
        ${produto.fornecedores?.nome}
        ${produto.preco_custo}
        ${produto.preco_venda}
      `)

      const produtoSelecionado = String(produto.id) === String(formMovimentacaoProduto.produto_id)
      const produtoAtivo = produto.ativo !== false

      return (produtoAtivo || produtoSelecionado) && contemTermos(texto, termoProdutoLancamento)
    })

    const movimentacoesProdutosFiltradas = movimentacoesProdutos.filter((item) => {
      const texto = normalizarTexto(`
        ${item.vendas?.numero_venda}
        ${item.vendas?.clientes?.nome}
        ${item.vendas?.clientes?.referencia}
        ${item.vendas?.clientes?.observacao}
        ${item.produtos?.nome}
        ${item.fornecedores?.nome}
        ${item.quantidade}
        ${item.subtotal_venda}
        ${item.subtotal_custo}
        ${item.lucro}
      `)

      return contemTermos(texto, termo)
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
          <CardResumo titulo="Peças vendidas no período" valor={totalPecas} classe="text-white" />
          <div className="bg-black border border-orange-950 rounded-[24px] p-5">
            <p className="text-zinc-500 text-sm mb-3">Data de controle</p>
            <input
              type="date"
              onClick={abrirCalendario}
              onFocus={abrirCalendario}
              value={dataControleProdutos}
              onChange={(e) => setDataControleProdutos(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
            />
          </div>
          <CardResumo titulo="Peças vendidas na data" valor={pecasVendidasNaData} classe="text-orange-300" />
          <CardResumo titulo="Total a pagar" valor={moeda(totalCusto)} classe="text-red-300" />
        </section>

        <form onSubmit={salvarMovimentacaoProduto} className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <input
            value={buscaProdutoLancamento}
            onChange={(e) => setBuscaProdutoLancamento(e.target.value)}
            placeholder="Buscar produto por nome ou fornecedor"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />

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
            <option value="">
              {termoProdutoLancamento ? 'Selecionar produto filtrado' : 'Selecionar produto'}
            </option>
            {produtosParaLancamento.map((produto) => (
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

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <p className="text-xs text-zinc-500">
            Dica: digite apenas parte do nome, como leite, tropical, zero, cachaça ou o nome do fornecedor.
          </p>

          <button
            type="button"
            onClick={() => setModalConferenciaProdutosAberto(true)}
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-5 py-3 rounded-2xl text-sm font-semibold"
          >
            Conferir lançamentos do dia
          </button>
        </div>

        {editandoMovimentacaoProdutoId && (
          <button
            type="button"
            onClick={limparMovimentacaoProduto}
            className="w-full mb-8 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-4 font-semibold"
          >
            Cancelar edição do item vendido
          </button>
        )}

        <div className="mini-produtos-resumo-desktop overflow-hidden rounded-2xl border border-zinc-900 mb-8">
          <table className="mini-data-table w-full min-w-[780px]">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Produto</th>
                <th className="p-4">Fornecedor</th>
                <th className="p-4">Custo unitário</th>
                <th className="p-4">Peças</th>
                <th className="p-4">Total a pagar</th>
                <th className="p-4">Ação</th>
              </tr>
            </thead>

            <tbody>
              {resumoProdutosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-zinc-500">
                    Nenhum produto encontrado no controle.
                  </td>
                </tr>
              )}

              {resumoProdutosFiltrados.map((produto) => (
                <tr key={produto.id} className="border-t border-zinc-900">
                  <td className="p-4">{produto.nome}</td>
                  <td className="p-4">{produto.fornecedores?.nome || 'Sem fornecedor'}</td>
                  <td className="p-4">{moeda(produto.preco_custo)}</td>
                  <td className="p-4">{produto.quantidade}</td>
                  <td className="p-4 text-red-300">{moeda(produto.custoTotal)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => editarPecasResumoProduto(produto)}
                      className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-xs"
                    >
                      Editar peças
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mini-produtos-resumo-mobile">
          {resumoProdutosFiltrados.length === 0 && (
            <div className="mini-produto-empty-card">Nenhum produto encontrado no controle.</div>
          )}

          {resumoProdutosFiltrados.map((produto) => (
            <div key={produto.id} className="mini-produto-controle-card">
              <div className="mini-produto-card-topo">
                <div>
                  <span>Produto</span>
                  <strong>{produto.nome}</strong>
                </div>
                <button type="button" onClick={() => editarPecasResumoProduto(produto)}>
                  Editar peças
                </button>
              </div>

              <div className="mini-produto-card-fornecedor">
                <span>Fornecedor</span>
                <strong>{produto.fornecedores?.nome || 'Sem fornecedor'}</strong>
              </div>

              <div className="mini-produto-card-metricas">
                <div>
                  <span>Custo unitário</span>
                  <strong>{moeda(produto.preco_custo)}</strong>
                </div>
                <div>
                  <span>Peças</span>
                  <strong>{produto.quantidade}</strong>
                </div>
                <div>
                  <span>Total a pagar</span>
                  <strong className="text-red-300">{moeda(produto.custoTotal)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-2xl font-bold">Itens lançados</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Para corrigir uma quantidade lançada por engano, use o botão Editar item nesta tabela.
            </p>
          </div>
        </div>

        <div className="mini-itens-lancados-desktop overflow-auto rounded-2xl border border-zinc-900">
          <table className="mini-data-table w-full min-w-[1300px]">
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
                        Editar item
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

        <div className="mini-itens-lancados-mobile">
          {movimentacoesProdutosFiltradas.length === 0 && (
            <div className="mini-produto-empty-card">Nenhum item lançado.</div>
          )}

          {movimentacoesProdutosFiltradas.map((item) => (
            <div key={item.id} className="mini-item-lancado-card">
              <div className="mini-item-card-topo">
                <div>
                  <span>Produto</span>
                  <strong>{item.produtos?.nome || 'Produto sem nome'}</strong>
                </div>
                <span className="mini-item-qtd">Qtd {item.quantidade}</span>
              </div>

              <div className="mini-item-card-info">
                <span>{dataBR(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10))}</span>
                <span>Venda #{item.vendas?.numero_venda}</span>
                <span>{item.vendas?.clientes?.nome || 'Cliente não informado'}</span>
                <span>{item.vendas?.clientes?.referencia || 'Sem referência'}</span>
              </div>

              <div className="mini-item-card-metricas">
                <div>
                  <span>Custo</span>
                  <strong className="text-red-300">{moeda(item.subtotal_custo)}</strong>
                </div>
                <div>
                  <span>Venda</span>
                  <strong className="text-green-300">{moeda(item.subtotal_venda)}</strong>
                </div>
                <div>
                  <span>Lucro</span>
                  <strong className="text-orange-300">{moeda(item.lucro)}</strong>
                </div>
              </div>

              <div className="mini-item-card-fornecedor">
                <span>Fornecedor</span>
                <strong>{item.fornecedores?.nome || 'Sem fornecedor'}</strong>
              </div>

              <div className="mini-item-card-acoes">
                <button type="button" onClick={() => editarMovimentacaoProduto(item)}>Editar item</button>
                <button type="button" onClick={() => excluirMovimentacaoProduto(item)}>Excluir item</button>
              </div>
            </div>
          ))}
        </div>

        {modalConferenciaProdutosAberto && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-xl rounded-[28px] border border-orange-950 bg-black shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-zinc-900 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-orange-400">Conferência</p>
                  <h3 className="mt-2 text-2xl font-bold">Lançamentos do dia</h3>
                  <p className="mt-1 text-sm text-zinc-500">{dataBR(dataControleProdutos)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalConferenciaProdutosAberto(false)}
                  className="h-10 w-10 rounded-2xl bg-zinc-900 text-xl font-bold text-white hover:bg-zinc-800"
                >
                  ×
                </button>
              </div>

              <div className="max-h-[60vh] overflow-auto p-5">
                {conferenciaProdutosDoDia.length === 0 ? (
                  <p className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-zinc-500">
                    Nenhum item lançado nesta data.
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {conferenciaProdutosDoDia.map((item) => (
                      <div
                        key={item.chave}
                        className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <strong className="text-sm sm:text-base">{item.produto}</strong>

                          <div className="flex items-center gap-2">
                            <span className="rounded-xl bg-orange-950 px-4 py-2 text-lg font-bold text-orange-200">
                              {item.quantidade}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.lancamentos.length === 1) {
                                  editarQuantidadeConferencia(item.lancamentos[0])
                                } else {
                                  setConferenciaProdutoExpandido(
                                    conferenciaProdutoExpandido === item.chave ? null : item.chave
                                  )
                                }
                              }}
                              className="rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700"
                            >
                              Editar
                            </button>
                          </div>
                        </div>

                        {conferenciaProdutoExpandido === item.chave && item.lancamentos.length > 1 && (
                          <div className="mt-3 grid gap-2 border-t border-zinc-900 pt-3">
                            {item.lancamentos.map((lancamento) => (
                              <div
                                key={lancamento.id}
                                className="flex items-center justify-between gap-3 rounded-xl bg-black px-3 py-2"
                              >
                                <div>
                                  <p className="text-xs font-bold text-zinc-200">
                                    Venda #{lancamento.vendas?.numero_venda || 'sem nº'}
                                  </p>
                                  <p className="text-[11px] text-zinc-500">
                                    Quantidade atual: {lancamento.quantidade}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => editarQuantidadeConferencia(lancamento)}
                                  className="rounded-xl bg-orange-950 px-3 py-2 text-xs font-bold text-orange-100 hover:bg-orange-900"
                                >
                                  Alterar qtd.
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-zinc-900 p-5">
                <span className="text-sm uppercase tracking-[0.25em] text-zinc-500">Total de peças</span>
                <strong className="text-3xl text-green-300">{totalPecasConferencia}</strong>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  function TelaProdutos() {
    const termo = normalizarTexto(buscaProdutos)

    function indicadoresProduto(produto) {
      const custo = Number(produto.preco_custo || 0)
      const venda = Number(produto.preco_venda || 0)
      const lucroBruto = venda - custo
      const margem = venda > 0 ? (lucroBruto / venda) * 100 : 0
      const markup = custo > 0 ? venda / custo : 0

      return {
        custo,
        venda,
        lucroBruto,
        margem,
        markup,
      }
    }

    function statusMargemProduto(margem) {
      if (margem >= 50) {
        return {
          texto: 'Saudável',
          classe: 'bg-green-950/60 border-green-800/70 text-green-300',
        }
      }

      if (margem >= 35) {
        return {
          texto: 'Atenção',
          classe: 'bg-orange-950/60 border-orange-800/70 text-orange-300',
        }
      }

      if (margem > 0) {
        return {
          texto: 'Crítica',
          classe: 'bg-red-950/60 border-red-800/70 text-red-300',
        }
      }

      return {
        texto: 'Sem margem',
        classe: 'bg-zinc-900 border-zinc-800 text-zinc-400',
      }
    }

    const produtosFiltrados = produtos.filter((produto) => {
      if (produto.ativo === false && !mostrarProdutosArquivados) return false

      const indicadores = indicadoresProduto(produto)
      const texto = normalizarTexto(`
        ${produto.nome}
        ${produto.fornecedores?.nome}
        ${produto.preco_custo}
        ${produto.preco_venda}
        ${produto.estoque}
        ${produto.ativo ? 'ativo' : 'inativo arquivado'}
        ${indicadores.lucroBruto}
        ${indicadores.margem}
        ${indicadores.markup}
      `)

      return contemTermos(texto, termo)
    })

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Cadastro Produtos | Precificação</h2>
            <p className="text-zinc-500 mt-2">Controle de cadastro, custo atual, lucro bruto, margem e markup por item.</p>
          </div>

          <div className="produto-filtro-arquivados flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
            <input
              value={buscaProdutos}
              onChange={(e) => setBuscaProdutos(e.target.value)}
              placeholder="Buscar produto, fornecedor, margem ou status"
              className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
            <button
              type="button"
              onClick={() => setMostrarProdutosArquivados(!mostrarProdutosArquivados)}
              className={mostrarProdutosArquivados
                ? 'bg-orange-950 hover:bg-orange-900 border border-orange-900 rounded-2xl px-4 py-3 font-semibold text-sm whitespace-nowrap'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl px-4 py-3 font-semibold text-sm whitespace-nowrap'}
            >
              {mostrarProdutosArquivados ? 'Ocultar arquivados' : 'Mostrar arquivados'}
            </button>
          </div>
        </div>

        <form onSubmit={atualizarPrecoAtual} className="mini-preco-atual-card grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-4">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.22em] text-orange-300 font-bold">Atualizar custo atual</p>
            <p className="text-zinc-500 text-sm mt-1">Informe o custo anterior e o novo custo. As vendas antigas permanecem intactas.</p>
          </div>

          <select value={formPrecoAtual.produto_id} onChange={(e) => selecionarProdutoPrecoAtual(e.target.value)} className="bg-black border border-zinc-800 rounded-2xl p-4">
            <option value="">Selecionar produto</option>
            {produtos.filter((produto) => produto.ativo !== false).map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>

          <input value={formPrecoAtual.custo_anterior} onChange={(e) => setFormPrecoAtual({ ...formPrecoAtual, custo_anterior: e.target.value })} placeholder="Custo anterior" className="bg-black border border-zinc-800 rounded-2xl p-4" />

          <input value={formPrecoAtual.preco_atual} onChange={(e) => setFormPrecoAtual({ ...formPrecoAtual, preco_atual: e.target.value })} placeholder="Novo custo de hoje" className="bg-black border border-zinc-800 rounded-2xl p-4" />

          <button className="bg-green-900 hover:bg-green-800 rounded-2xl p-4 font-semibold">
            Atualizar custo
          </button>
        </form>

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
          <input value={formProduto.preco_venda} onChange={(e) => setFormProduto({ ...formProduto, preco_venda: e.target.value })} placeholder="Preço de venda" className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4" />
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
          <table className="mini-data-table mini-mobile-card-table mini-produtos-cadastro-table mini-produtos-tabela-limpa w-full">
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-3">Produto</th>
                <th className="p-3">Fornecedor</th>
                <th className="p-3">Custo anterior</th>
                <th className="p-3">Custo atual</th>
                <th className="p-3">Venda</th>
                <th className="p-3">Lucro bruto</th>
                <th className="p-3">Margem</th>
                <th className="p-3">Markup</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-4 text-zinc-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}

              {produtosFiltrados.map((produto) => {
                const indicadores = indicadoresProduto(produto)
                const margemClasse = indicadores.margem >= 50
                  ? 'text-green-300'
                  : indicadores.margem >= 35
                    ? 'text-orange-300'
                    : indicadores.margem > 0
                      ? 'text-red-300'
                      : 'text-zinc-500'
                const statusMargem = statusMargemProduto(indicadores.margem)

                return (
                  <tr key={produto.id} className="border-t border-zinc-900">
                    <td className="p-3 font-semibold align-middle produto-celula-nome">
                      <div className="produto-nome-wrap">
                        <span className="produto-nome-principal">{produto.nome}</span>
                        {!produto.ativo && <span className="produto-status-arquivado">Arquivado</span>}
                      </div>
                    </td>
                    <td className="p-3 align-middle text-zinc-300">{produto.fornecedores?.nome || 'Sem fornecedor'}</td>
                    <td className="p-3 align-middle text-zinc-400 text-center font-semibold">{moeda(custoAnteriorProduto(produto))}</td>
                    <td className="p-3 align-middle text-center">
                      <strong className="preco-atual-valor">{moeda(indicadores.custo)}</strong>
                    </td>
                    <td className="p-3 align-middle text-green-300">{moeda(indicadores.venda)}</td>
                    <td className={indicadores.lucroBruto >= 0 ? 'p-3 align-middle text-green-300 font-semibold' : 'p-3 align-middle text-red-300 font-semibold'}>
                      {moeda(indicadores.lucroBruto)}
                    </td>
                    <td className={`p-3 align-middle font-semibold ${margemClasse}`}>
                      <div className="flex flex-col items-start gap-1">
                        <span>{percentual(indicadores.margem)}</span>
                        <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-bold leading-none ${statusMargem.classe}`}>
                          {statusMargem.texto}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 align-middle text-orange-300 font-semibold">
                      {indicadores.markup > 0 ? indicadores.markup.toFixed(2).replace('.', ',') : '0,00'}
                    </td>
                    <td className="p-3 align-middle">
                      <div className="produto-acoes-inline">
                        <button type="button" onClick={() => editarProduto(produto)} className="produto-acao produto-acao-secundaria">
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => alternarStatusProduto(produto)}
                          className={produto.ativo ? 'produto-acao produto-acao-alerta' : 'produto-acao produto-acao-sucesso'}
                        >
                          {produto.ativo ? 'Inativar' : 'Ativar'}
                        </button>

                        <details className="produto-acoes-menu">
                          <summary aria-label="Mais ações">⋮</summary>
                          <div className="produto-acoes-menu-list">
                            {produto.ativo && (
                              <button type="button" onClick={() => arquivarProduto(produto)}>
                                Arquivar
                              </button>
                            )}

                            <button type="button" onClick={() => excluirProduto(produto)} className="danger">
                              Excluir
                            </button>
                          </div>
                        </details>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    )
  }


  function TelaPedidosFornecedor() {
    const produtoSelecionado = produtos.find((produto) => String(produto.id) === String(formPedidoFornecedor.produto_id))
    const indicadoresSelecionado = calcularIndicadoresProduto(produtoSelecionado)
    const termo = buscaPedidosFornecedor

    function ordenarPedidosFornecedor(lista) {
      return ordenarPedidosFornecedorLista(lista)
    }

    const pedidosAtuais = ordenarPedidosFornecedor(pedidosFornecedor.filter((pedido) => !pedido.pedido_grupo_id))
    const pedidosFiltrados = ordenarPedidosFornecedor(pedidosAtuais.filter((pedido) => {
      const texto = `
        ${pedido.produto_nome}
        ${pedido.fornecedor}
        ${pedido.status}
        ${pedido.observacao}
        ${pedido.quantidade}
        ${pedido.created_at}
      `

      return contemTermos(texto, termo)
    }))

    const pedidosPendentes = ordenarPedidosFornecedor(pedidosFiltrados.filter((pedido) => String(pedido.status || '').toLowerCase() !== 'cancelado'))

    const pedidosSalvosOrdenados = pedidosFornecedorGrupos.slice().sort((a, b) => new Date(b.created_at || b.data_pedido || 0) - new Date(a.created_at || a.data_pedido || 0))

    function itensDoGrupoSalvo(grupoId) {
      return pedidosFornecedor.filter((pedido) => String(pedido.pedido_grupo_id || '') === String(grupoId || ''))
    }

    function montarGruposPorFornecedor(listaItens) {
      const resumo = listaItens.reduce((acc, pedido) => {
        const fornecedor = pedido.fornecedor || 'Sem fornecedor'

        if (!acc[fornecedor]) {
          acc[fornecedor] = {
            fornecedor,
            itens: [],
            quantidade: 0,
            total: 0,
          }
        }

        const quantidade = Number(pedido.quantidade || 0)
        const custo = Number(pedido.ultimo_custo || 0)

        acc[fornecedor].itens.push(pedido)
        acc[fornecedor].quantidade += quantidade
        acc[fornecedor].total += quantidade * custo

        return acc
      }, {})

      return Object.values(resumo)
        .map((grupo) => ({
          ...grupo,
          itens: ordenarPedidosFornecedor(grupo.itens),
        }))
        .sort((a, b) => normalizarTexto(a.fornecedor).localeCompare(normalizarTexto(b.fornecedor), 'pt-BR'))
    }

    const resumoPorFornecedor = pedidosPendentes.reduce((acc, pedido) => {
      const fornecedor = pedido.fornecedor || 'Sem fornecedor'

      if (!acc[fornecedor]) {
        acc[fornecedor] = {
          fornecedor,
          itens: [],
          quantidade: 0,
          total: 0,
        }
      }

      const quantidade = Number(pedido.quantidade || 0)
      const custo = Number(pedido.ultimo_custo || 0)

      acc[fornecedor].itens.push(pedido)
      acc[fornecedor].quantidade += quantidade
      acc[fornecedor].total += quantidade * custo

      return acc
    }, {})

    const gruposFornecedor = Object.values(resumoPorFornecedor)
      .map((grupo) => ({
        ...grupo,
        itens: ordenarPedidosFornecedor(grupo.itens),
      }))
      .sort((a, b) => normalizarTexto(a.fornecedor).localeCompare(normalizarTexto(b.fornecedor), 'pt-BR'))
    const itensModalPedidosFornecedor = pedidoFornecedorGrupoAberto ? itensDoGrupoSalvo(pedidoFornecedorGrupoAberto.id) : pedidosPendentes
    const gruposFornecedorModal = montarGruposPorFornecedor(itensModalPedidosFornecedor.filter((pedido) => String(pedido.status || '').toLowerCase() !== 'cancelado'))

    function formatarGrupoPedidoFornecedor(grupo) {
      const linhasItens = grupo.itens.flatMap((pedido) => {
        const quantidade = Number(pedido.quantidade || 0)
        const custo = Number(pedido.ultimo_custo || 0)
        const subtotal = quantidade * custo
        const observacao = pedido.observacao ? [`Obs.: ${pedido.observacao}`] : []

        return [
          `• ${pedido.produto_nome || 'Produto removido'}`,
          `${quantidade} × ${moeda(custo)} = ${moeda(subtotal)}`,
          ...observacao,
        ]
      })

      return [
        String(grupo.fornecedor || 'Sem fornecedor').toUpperCase(),
        ...linhasItens,
        `Total peças: ${grupo.quantidade}`,
        `Total estimado: ${moeda(grupo.total)}`,
      ].join('\n')
    }

    function mensagemGeralPedidosFornecedor(grupos = gruposFornecedor) {
      if (grupos.length === 0) return ''

      const blocosFornecedor = grupos.map((grupo) => formatarGrupoPedidoFornecedor(grupo)).join('\n\n')

      return [
        'Olá, tudo bem?',
        '',
        'Segue meu pedido de reposição:',
        '',
        'PEDIDO FORNECEDOR',
        '',
        blocosFornecedor,
        '',
        'Obrigado.',
        'Delber Vilaça | Queijos Serra da Canastra',
      ].join('\n')
    }

    function mensagemIndividualFornecedor(grupo) {
      if (!grupo) return ''

      return [
        'Olá, tudo bem?',
        '',
        'Segue meu pedido de reposição:',
        '',
        formatarGrupoPedidoFornecedor(grupo),
        '',
        'Obrigado.',
        'Delber Vilaça | Queijos Serra da Canastra',
      ].join('\n')
    }

    function enviarWhatsAppPedidosFornecedor(grupo = null) {
      const gruposBase = pedidoFornecedorGrupoAberto ? gruposFornecedorModal : gruposFornecedor
      const mensagem = grupo ? mensagemIndividualFornecedor(grupo) : mensagemGeralPedidosFornecedor(gruposBase)

      if (!mensagem) {
        alert('Nenhum item pendente para enviar.')
        return
      }

      abrirWhatsApp({ mensagem })
    }

    async function copiarListaPedidosFornecedor() {
      const gruposBase = pedidoFornecedorGrupoAberto ? gruposFornecedorModal : gruposFornecedor
      const mensagem = mensagemGeralPedidosFornecedor(gruposBase)

      if (!mensagem) {
        alert('Nenhum item pendente para copiar.')
        return
      }

      try {
        await navigator.clipboard.writeText(mensagem)
        alert('Lista copiada para a área de transferência.')
      } catch (erro) {
        alert('Não foi possível copiar automaticamente. Use a opção Enviar WhatsApp.')
      }
    }

    async function resgatarPedidoFornecedorGrupo(grupo) {
      if (!grupo?.id) {
        alert('Pedido salvo não encontrado.')
        return
      }

      const itensGrupo = itensDoGrupoSalvo(grupo.id).filter((pedido) => String(pedido.status || '').toLowerCase() !== 'cancelado')

      if (itensGrupo.length === 0) {
        alert('Este pedido salvo não possui itens válidos para resgatar.')
        return
      }

      const itensAbertos = pedidosFornecedor.filter((pedido) => !pedido.pedido_grupo_id)
      const totalPecas = itensGrupo.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0), 0)
      const totalEstimadoGrupo = itensGrupo.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0) * Number(pedido.ultimo_custo || 0), 0)

      const mensagemConfirmacao = itensAbertos.length > 0
        ? `Você já possui ${itensAbertos.length} item(ns) na lista atual. Deseja copiar este pedido salvo para a lista atual, mantendo os itens existentes?`
        : `Deseja resgatar este pedido salvo com ${totalPecas} peça(s) e total estimado de ${moeda(totalEstimadoGrupo)} para a lista atual?`

      if (!window.confirm(mensagemConfirmacao)) return

      const itensParaInserir = itensGrupo.map((pedido) => ({
        produto_id: pedido.produto_id || null,
        produto_nome: pedido.produto_nome || 'Produto removido',
        fornecedor: pedido.fornecedor || 'Sem fornecedor',
        quantidade: Number(pedido.quantidade || 0),
        ultimo_custo: Number(pedido.ultimo_custo || 0),
        venda_atual: Number(pedido.venda_atual || 0),
        margem: Number(pedido.margem || 0),
        markup: Number(pedido.markup || 0),
        observacao: pedido.observacao || null,
        status: 'Pendente',
        pedido_grupo_id: null,
      }))

      const { error } = await supabase
        .from('pedidos_fornecedor')
        .insert(itensParaInserir)

      if (error) {
        alert(`Erro ao resgatar pedido salvo. ${error.message || ''}`)
        console.error(error)
        return
      }

      setListaPedidosFornecedorAberta(false)
      setPedidoFornecedorGrupoAberto(null)
      await buscarPedidosFornecedor()
      alert('Pedido resgatado para a lista atual com sucesso.')
    }

    async function excluirPedidoFornecedorGrupo(grupo) {
      if (!grupo?.id) {
        alert('Pedido salvo não encontrado.')
        return
      }

      const itensGrupo = itensDoGrupoSalvo(grupo.id)
      const totalPecasGrupo = itensGrupo.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0), 0)
      const confirmar = window.confirm(`Excluir este pedido salvo com ${totalPecasGrupo} peça(s)? Essa ação remove o histórico deste pedido.`)

      if (!confirmar) return

      const { error: erroItens } = await supabase
        .from('pedidos_fornecedor')
        .delete()
        .eq('pedido_grupo_id', grupo.id)

      if (erroItens) {
        alert(`Erro ao excluir itens do pedido. ${erroItens.message || ''}`)
        console.error(erroItens)
        return
      }

      const { error: erroGrupo } = await supabase
        .from('pedidos_fornecedor_grupos')
        .delete()
        .eq('id', grupo.id)

      if (erroGrupo) {
        alert(`Erro ao excluir pedido salvo. ${erroGrupo.message || ''}`)
        console.error(erroGrupo)
        return
      }

      if (String(pedidoFornecedorGrupoAberto?.id || '') === String(grupo.id)) {
        setListaPedidosFornecedorAberta(false)
        setPedidoFornecedorGrupoAberto(null)
      }

      await Promise.all([buscarPedidosFornecedor(), buscarPedidosFornecedorGrupos()])
      alert('Pedido salvo excluído com sucesso.')
    }

    const totalItens = pedidosPendentes.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0), 0)
    const totalEstimado = pedidosPendentes.reduce((acc, pedido) => {
      const custo = Number(pedido.ultimo_custo || 0)
      return acc + Number(pedido.quantidade || 0) * custo
    }, 0)

    function classeStatusPedido(statusPedido) {
      const statusFinal = String(statusPedido || '').toLowerCase()

      if (statusFinal === 'comprado') return 'text-green-300 bg-green-950/40 border-green-900'
      if (statusFinal === 'cancelado') return 'text-red-300 bg-red-950/40 border-red-900'
      return 'text-orange-300 bg-orange-950/40 border-orange-900'
    }

    return (
      <section className="pedidos-fornecedor-screen mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-6 lg:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-3xl font-bold">Pedidos Fornecedor</h2>
            <p className="text-zinc-500 mt-1">Lista de reposição vinculada ao cadastro de produtos, com custo de referência e resumo por fornecedor.</p>
          </div>

          <div className="flex flex-wrap gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={salvarListaAtualPedidoFornecedor}
              className="bg-green-900 hover:bg-green-800 rounded-2xl px-5 py-3 font-semibold"
            >
              Salvar pedido
            </button>
            <button
              type="button"
              onClick={() => { setPedidoFornecedorGrupoAberto(null); setListaPedidosFornecedorAberta(true) }}
              className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-5 py-3 font-semibold"
            >
              Gerar lista
            </button>
          </div>
        </div>

        <div className="pedidos-fornecedor-resumo grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs">Itens pedidos</p>
            <h3 className="text-2xl font-bold text-orange-300 mt-1">{totalItens}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs">Fornecedores</p>
            <h3 className="text-2xl font-bold text-white mt-1">{gruposFornecedor.length}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs">Total estimado</p>
            <h3 className="text-2xl font-bold text-green-300 mt-1">{moeda(totalEstimado)}</h3>
          </div>
        </div>

        <form onSubmit={salvarPedidoFornecedor} className="pedidos-fornecedor-form grid grid-cols-1 lg:grid-cols-[2fr_0.7fr_0.9fr_1.6fr_auto] gap-3 mb-4">
          <select
            value={formPedidoFornecedor.produto_id}
            onChange={(e) => setFormPedidoFornecedor({ ...formPedidoFornecedor, produto_id: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
          >
            <option value="">Produto</option>
            {produtos.filter((produto) => produto.ativo !== false).map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>

          <input
            value={formPedidoFornecedor.quantidade}
            onChange={(e) => setFormPedidoFornecedor({ ...formPedidoFornecedor, quantidade: e.target.value })}
            placeholder="Qtd."
            className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
          />

          <select
            value={formPedidoFornecedor.status}
            onChange={(e) => setFormPedidoFornecedor({ ...formPedidoFornecedor, status: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
          >
            <option value="Pendente">Pendente</option>
            <option value="Comprado">Comprado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <input
            value={formPedidoFornecedor.observacao}
            onChange={(e) => setFormPedidoFornecedor({ ...formPedidoFornecedor, observacao: e.target.value })}
            placeholder="Observação"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"
          />

          <button className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-5 py-3 font-semibold">
            {editandoPedidoFornecedorId ? 'Salvar edição' : 'Adicionar item'}
          </button>

          {editandoPedidoFornecedorId && (
            <button type="button" onClick={limparPedidoFornecedor} className="lg:col-span-5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-4 py-3 font-semibold">
              Cancelar edição
            </button>
          )}
        </form>

        {produtoSelecionado && (
          <div className="pedidos-fornecedor-preview grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Fornecedor</p>
              <strong className="text-white text-sm">{produtoSelecionado.fornecedores?.nome || 'Sem fornecedor'}</strong>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Último custo</p>
              <strong className="text-red-300 text-sm">{moeda(indicadoresSelecionado.custo)}</strong>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Venda atual</p>
              <strong className="text-green-300 text-sm">{moeda(indicadoresSelecionado.venda)}</strong>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Margem</p>
              <strong className="text-orange-300 text-sm">{percentual(indicadoresSelecionado.margem)}</strong>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Markup</p>
              <strong className="text-orange-300 text-sm">{indicadoresSelecionado.markup > 0 ? indicadoresSelecionado.markup.toFixed(2).replace('.', ',') : '0,00'}</strong>
            </div>
          </div>
        )}

        <input
          value={buscaPedidosFornecedor}
          onChange={(e) => setBuscaPedidosFornecedor(e.target.value)}
          placeholder="Pesquisar por produto, fornecedor, status, data ou observação"
          className="pedidos-fornecedor-busca w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 mb-4"
        />

        <div className="pedidos-fornecedor-lista rounded-2xl border border-zinc-900 overflow-hidden bg-zinc-950/40">
          <div className="hidden lg:grid grid-cols-[1.55fr_0.55fr_0.7fr_0.4fr_0.7fr_0.55fr_1.25fr] gap-4 px-5 py-4 bg-zinc-950 text-zinc-500 text-xs uppercase font-bold tracking-widest">
            <span>Produto / fornecedor</span>
            <span>Data</span>
            <span>Último custo</span>
            <span>Qtd.</span>
            <span>Total estimado</span>
            <span>Status</span>
            <span>Ações</span>
          </div>

          {pedidosFiltrados.length === 0 && (
            <div className="p-5 text-zinc-500">
              Nenhum pedido fornecedor encontrado.
            </div>
          )}

          <div className="divide-y divide-zinc-900">
            {pedidosFiltrados.map((pedido) => {
              const custo = Number(pedido.ultimo_custo || 0)
              const quantidade = Number(pedido.quantidade || 0)
              const total = custo * quantidade

              return (
                <div key={pedido.id} className="pedido-fornecedor-item grid grid-cols-1 lg:grid-cols-[1.55fr_0.55fr_0.7fr_0.4fr_0.7fr_0.55fr_1.25fr] gap-4 items-center p-4 lg:p-5">
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-white leading-tight">{pedido.produto_nome || 'Produto removido'}</h3>
                    <p className="text-zinc-500 text-sm mt-1">{pedido.fornecedor || 'Sem fornecedor'}</p>
                    {pedido.observacao && <p className="text-zinc-400 text-sm mt-1">Obs.: {pedido.observacao}</p>}
                  </div>

                  <div>
                    <p className="lg:hidden text-zinc-500 text-xs uppercase">Data</p>
                    <strong className="text-zinc-300">{dataBR(String(pedido.created_at || '').slice(0, 10))}</strong>
                  </div>

                  <div>
                    <p className="lg:hidden text-zinc-500 text-xs uppercase">Último custo</p>
                    <strong className="text-red-300">{moeda(custo)}</strong>
                  </div>

                  <div>
                    <p className="lg:hidden text-zinc-500 text-xs uppercase">Qtd.</p>
                    <strong className="text-white">{quantidade} un.</strong>
                  </div>

                  <div>
                    <p className="lg:hidden text-zinc-500 text-xs uppercase">Total</p>
                    <strong className="text-green-300">{moeda(total)}</strong>
                  </div>

                  <div>
                    <span className={`inline-flex rounded-full border px-3 py-2 text-xs font-bold ${classeStatusPedido(pedido.status)}`}>
                      {pedido.status || 'Pendente'}
                    </span>
                  </div>

                  <div className="pedido-fornecedor-acoes grid grid-cols-2 lg:grid-cols-2 gap-2 lg:justify-end">
                    <button onClick={() => editarPedidoFornecedor(pedido)} className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl font-semibold text-sm min-w-[86px] text-center">
                      Editar
                    </button>
                    <button onClick={() => atualizarStatusPedidoFornecedor(pedido, 'Comprado')} className="bg-green-900 hover:bg-green-800 px-3 py-2 rounded-xl font-semibold text-sm min-w-[86px] text-center">
                      Comprado
                    </button>
                    <button onClick={() => atualizarStatusPedidoFornecedor(pedido, 'Cancelado')} className="bg-orange-950 hover:bg-orange-900 px-3 py-2 rounded-xl font-semibold text-sm min-w-[86px] text-center">
                      Cancelar
                    </button>
                    <button onClick={() => removerPedidoFornecedor(pedido)} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl font-semibold text-sm min-w-[86px] text-center">
                      Remover
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


        <div className="mt-6 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl font-bold">Pedidos salvos</h3>
              <p className="text-zinc-500 text-sm mt-1">Histórico dos pedidos fechados para conferência futura.</p>
            </div>
          </div>

          {pedidosSalvosOrdenados.length === 0 && (
            <div className="text-zinc-500 text-sm py-3">Nenhum pedido salvo ainda.</div>
          )}

          <div className="grid gap-3">
            {pedidosSalvosOrdenados.slice(0, 12).map((grupo) => {
              const itensGrupo = itensDoGrupoSalvo(grupo.id)
              const fornecedoresGrupo = new Set(itensGrupo.map((pedido) => pedido.fornecedor || 'Sem fornecedor'))
              const totalItensGrupo = itensGrupo.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0), 0)
              const totalGrupo = itensGrupo.reduce((acc, pedido) => acc + Number(pedido.quantidade || 0) * Number(pedido.ultimo_custo || 0), 0)

              return (
                <div key={grupo.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 rounded-2xl border border-zinc-900 bg-black p-4">
                  <div>
                    <p className="text-white font-bold">Pedido salvo</p>
                    <p className="text-zinc-400 text-sm mt-1">Salvo em {dataHoraBR(grupo.data_pedido || grupo.created_at)}</p>
                    <p className="text-zinc-500 text-sm mt-1">{totalItensGrupo} peças • {fornecedoresGrupo.size} fornecedor(es) • {moeda(totalGrupo)}</p>
                  </div>

                  <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => { setPedidoFornecedorGrupoAberto(grupo); setListaPedidosFornecedorAberta(true) }}
                      className="bg-zinc-800 hover:bg-zinc-700 rounded-xl px-4 py-2 font-semibold text-sm"
                    >
                      Abrir
                    </button>
                    <button
                      type="button"
                      onClick={() => resgatarPedidoFornecedorGrupo(grupo)}
                      className="bg-orange-950 hover:bg-orange-900 rounded-xl px-4 py-2 font-semibold text-sm"
                    >
                      Resgatar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const grupos = montarGruposPorFornecedor(itensGrupo.filter((pedido) => String(pedido.status || '').toLowerCase() !== 'cancelado'))
                        const mensagem = mensagemGeralPedidosFornecedor(grupos)
                        if (!mensagem) return alert('Pedido salvo sem itens para enviar.')
                        abrirWhatsApp({ mensagem })
                      }}
                      className="bg-green-900 hover:bg-green-800 rounded-xl px-4 py-2 font-semibold text-sm"
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => excluirPedidoFornecedorGrupo(grupo)}
                      className="bg-red-950 hover:bg-red-900 border border-red-900/70 rounded-xl px-4 py-2 font-semibold text-sm"
                    >
                      Excluir pedido
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {listaPedidosFornecedorAberta && (
          <div
            className="pedido-fornecedor-modal-backdrop fixed inset-0 z-[999] bg-black/90 p-0 lg:p-4 lg:flex lg:items-center lg:justify-center"
            style={{ overflowY: 'scroll', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="pedido-fornecedor-modal w-full min-h-full lg:min-h-0 lg:max-w-3xl bg-black border-0 lg:border lg:border-orange-950 rounded-none lg:rounded-[28px] p-4 lg:p-6 shadow-2xl lg:max-h-[88vh] lg:overflow-y-auto">
              <div className="sticky top-0 z-10 bg-black pb-4 flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-4 mb-4 lg:mb-5 border-b border-zinc-900 lg:border-b-0">
                <div>
                  <p className="text-orange-400 uppercase tracking-[0.35em] text-xs font-bold">Lista de compra</p>
                  <h3 className="text-2xl font-bold mt-2">{pedidoFornecedorGrupoAberto ? 'Pedido salvo' : 'Resumo por fornecedor'}</h3>
                  <p className="text-zinc-500 mt-1">{pedidoFornecedorGrupoAberto ? `Salvo em ${dataHoraBR(pedidoFornecedorGrupoAberto.data_pedido || pedidoFornecedorGrupoAberto.created_at)}` : 'Itens pendentes agrupados automaticamente.'}</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                  <button onClick={copiarListaPedidosFornecedor} className="bg-zinc-900 hover:bg-zinc-800 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 font-bold text-sm lg:text-base">
                    Copiar geral
                  </button>
                  <button onClick={() => enviarWhatsAppPedidosFornecedor()} className="bg-green-900 hover:bg-green-800 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 font-bold text-sm lg:text-base">
                    WhatsApp geral
                  </button>
                  {pedidoFornecedorGrupoAberto && (
                    <button onClick={() => resgatarPedidoFornecedorGrupo(pedidoFornecedorGrupoAberto)} className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 font-bold text-sm lg:text-base">
                      Resgatar pedido
                    </button>
                  )}
                  {pedidoFornecedorGrupoAberto && (
                    <button onClick={() => excluirPedidoFornecedorGrupo(pedidoFornecedorGrupoAberto)} className="bg-red-950 hover:bg-red-900 border border-red-900/70 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 font-bold text-sm lg:text-base">
                      Excluir pedido
                    </button>
                  )}
                  <button onClick={() => { setListaPedidosFornecedorAberta(false); setPedidoFornecedorGrupoAberto(null) }} className="bg-zinc-900 hover:bg-zinc-800 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 font-bold text-sm lg:text-base">
                    Fechar
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {gruposFornecedorModal.length === 0 && (
                  <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 text-zinc-500">
                    Nenhum item para listar.
                  </div>
                )}

                {gruposFornecedorModal.map((grupo) => (
                  <div key={grupo.fornecedor} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 lg:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-lg lg:text-xl font-bold text-white">{grupo.fornecedor}</h4>
                        <strong className="text-green-300">{moeda(grupo.total)}</strong>
                      </div>

                      <button onClick={() => enviarWhatsAppPedidosFornecedor(grupo)} className="bg-green-900 hover:bg-green-800 rounded-xl px-3 py-2 lg:px-4 font-bold text-sm lg:text-base">
                        Enviar WhatsApp
                      </button>
                    </div>

                    <div className="grid gap-2">
                      {grupo.itens.map((pedido) => {
                        const quantidade = Number(pedido.quantidade || 0)
                        const custo = Number(pedido.ultimo_custo || 0)
                        const subtotal = quantidade * custo

                        return (
                          <div key={pedido.id} className="pedido-modal-item border-t border-zinc-900 py-3">
                            <div className="pedido-modal-item-header flex items-start justify-between gap-3">
                              <div className="min-w-0 pr-3 flex-1">
                                <h3
                                  data-pedido-produto-nome="true"
                                  className="pedido-modal-item-title"
                                >
                                  {pedido.produto_nome || 'Produto removido'}
                                </h3>
                                {pedido.observacao && <p className="text-zinc-400 text-[14px] sm:text-sm mt-1 leading-5">{pedido.observacao}</p>}
                              </div>
                              <span className="text-orange-300 font-bold text-right whitespace-nowrap">Qtd. {quantidade}</span>
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-black/40 border border-zinc-900 rounded-xl px-3 py-2">
                                <span className="block text-zinc-500 text-[11px] uppercase tracking-[0.16em]">Unitário</span>
                                <strong className="text-white">{moeda(custo)}</strong>
                              </div>
                              <div className="bg-black/40 border border-zinc-900 rounded-xl px-3 py-2 text-right">
                                <span className="block text-zinc-500 text-[11px] uppercase tracking-[0.16em]">Subtotal</span>
                                <strong className="text-green-300">{moeda(subtotal)}</strong>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-900 text-sm">
                      <span className="text-zinc-500">Total de peças</span>
                      <strong className="text-white">{grupo.quantidade}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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

      return contemTermos(texto, termo)
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
          <table className="mini-data-table mini-mobile-card-table mini-despesas-card-table w-full min-w-[900px]">
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

      const passaBusca = texto.includes(termo)
      const passaFiltro = item.status === filtroDelivery

      return passaBusca && passaFiltro
    })

    const totalProgramadas = deliveries.filter((item) => item.status === 'Programado').length
    const totalEntregues = deliveries.filter((item) => item.status === 'Entregue').length
    const totalCanceladas = deliveries.filter((item) => item.status === 'Cancelado').length
    const totalValorProgramado = deliveries
      .filter((item) => item.status === 'Programado')
      .reduce((acc, item) => acc + Number(item.valor_total || 0), 0)

    const itensEntreguesConsolidados = Object.values(
      deliveries
        .filter((item) => String(item.data_confirmacao_entrega || '').slice(0, 10) === dataPecasEntregues)
        .flatMap((item) => String(item.descricao || '')
          .split(/\n+/g)
          .map((linha) => linha.trim())
          .filter(Boolean))
        .reduce((acc, linha) => {
          const encontrado = linha.match(/^(\d+(?:[,.]\d+)?)\s+(.+)$/)
          const quantidade = encontrado ? numero(encontrado[1]) : 1
          const nome = (encontrado ? encontrado[2] : linha).trim()
          const chave = normalizarTexto(nome)

          if (!chave) return acc

          if (!acc[chave]) {
            acc[chave] = { nome, quantidade: 0 }
          }

          acc[chave].quantidade += quantidade
          return acc
        }, {})
    ).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

    const totalPecasEntregues = itensEntreguesConsolidados.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)

    return (
      <section className="mobile-panel-card delivery-refino-final bg-black border border-orange-950 rounded-[28px] p-5">
        <div className="mini-delivery-head flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="mini-section-title mini-delivery-title mini-mobile-card-section text-3xl font-bold">Delivery</h2>
            <p className="text-zinc-400 mt-1 delivery-subtitle">Bloco operacional para programar entregas. Depois de entregar, use Entregar + venda.</p>
          </div>

          <input
            value={buscaDelivery}
            onChange={(e) => setBuscaDelivery(e.target.value)}
            placeholder="Buscar cliente, venda, local ou status"
            className="mini-delivery-search w-full lg:w-[440px] bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
          />
        </div>

        <section className="mini-delivery-kpis delivery-kpis-compact grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          <CardResumo titulo="Programadas" valor={totalProgramadas} classe="text-orange-300" />
          <CardResumo titulo="Entregues" valor={totalEntregues} classe="text-green-300" />
          <CardResumo titulo="Canceladas" valor={totalCanceladas} classe="text-red-300" />
          <CardResumo titulo="Valor programado" valor={moeda(totalValorProgramado)} classe="text-green-300" />
        </section>

        <form onSubmit={salvarDelivery} className="mini-delivery-form delivery-form-compact grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          <select
            value={formDelivery.venda_id}
            onChange={(e) => preencherDeliveryPorVenda(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
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
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
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
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
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
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
            />
          </div>

          <input
            value={formDelivery.referencia}
            onChange={(e) => setFormDelivery({ ...formDelivery, referencia: e.target.value })}
            placeholder="Referência"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
          />

          <input
            value={formDelivery.local_entrega}
            onChange={(e) => setFormDelivery({ ...formDelivery, local_entrega: e.target.value })}
            placeholder="Local de entrega"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
          />

          <textarea
            value={formDelivery.descricao}
            onChange={(e) => setFormDelivery({ ...formDelivery, descricao: e.target.value })}
            placeholder="Itens do pedido" 
            rows={3}
            className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[74px] leading-relaxed"
          />

          <input
            value={formDelivery.valor_total}
            onChange={(e) => setFormDelivery({ ...formDelivery, valor_total: e.target.value })}
            placeholder="Valor total"
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
          />

          <button className="lg:col-span-4 bg-orange-950 hover:bg-orange-900 rounded-2xl p-3 font-semibold">
            {editandoDeliveryId ? 'Salvar edição' : 'Cadastrar entrega'}
          </button>

          {editandoDeliveryId && (
            <button
              type="button"
              onClick={limparDelivery}
              className="lg:col-span-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-3 font-semibold"
            >
              Cancelar edição
            </button>
          )}
        </form>


        <div className="mini-delivery-filters flex flex-wrap gap-2 mb-4">
          {[
            { label: 'Pendentes', value: 'Programado', classe: 'bg-orange-950 text-orange-200' },
            { label: 'Entregues', value: 'Entregue', classe: 'bg-green-950 text-green-200' },
            { label: 'Cancelados', value: 'Cancelado', classe: 'bg-red-950 text-red-200' },
          ].map((filtro) => (
            <button
              key={filtro.value}
              type="button"
              onClick={() => setFiltroDelivery(filtro.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                filtroDelivery === filtro.value
                  ? filtro.classe
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {filtro.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setListaPecasEntreguesAberta(!listaPecasEntreguesAberta)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              listaPecasEntreguesAberta
                ? 'bg-green-950 text-green-200'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Peças Entregues: {totalPecasEntregues}
          </button>
        </div>

        {listaPecasEntreguesAberta && (
          <div className="mb-4 max-w-2xl rounded-2xl border border-zinc-800 bg-black p-4 shadow-xl">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-orange-300">Conferência</p>
                <h3 className="mt-1 text-lg font-bold text-white">Itens entregues do dia</h3>
              </div>

              <div className="w-full sm:w-48">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Data</label>
                <input
                  type="date"
                  value={dataPecasEntregues}
                  onChange={(e) => setDataPecasEntregues(e.target.value)}
                  onClick={abrirCalendario}
                  onFocus={abrirCalendario}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            {itensEntreguesConsolidados.length === 0 ? (
              <p className="rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3 text-sm text-zinc-500">
                Nenhum item entregue nesta data.
              </p>
            ) : (
              <div className="grid gap-2">
                {itensEntreguesConsolidados.map((item) => (
                  <div
                    key={normalizarTexto(item.nome)}
                    className="flex items-center justify-between gap-4 rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-white">{item.nome}</span>
                    <span className="text-sm font-bold text-green-300">{item.quantidade} unidades</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mini-delivery-list-header" aria-hidden="true">
          <span>Cliente</span>
          <span>Referência</span>
          <span>Itens</span>
          <span>Entrega</span>
          <span>Valor</span>
          <span>Status</span>
        </div>

        <div className="mini-delivery-mobile-cards">
          {deliveriesFiltrados.length === 0 && (
            <div className="mini-delivery-empty-card">
              Nenhuma entrega encontrada.
            </div>
          )}

          {deliveriesFiltrados.map((item) => {
            const deliveryAberto = deliveryExpandidoId === item.id
            const referenciaDelivery = item.referencia || item.clientes?.referencia || 'Sem referência'
            const descricaoDelivery = item.descricao || 'Sem descrição'
            const itensDelivery = descricaoDelivery
              .split(/\n|(?=\b\d{1,2}\s)/g)
              .map((linha) => linha.trim())
              .filter(Boolean)
            const hojeComparacao = new Date()
            hojeComparacao.setHours(0, 0, 0, 0)
            const dataEntregaComparacao = item.data_entrega ? new Date(`${item.data_entrega}T00:00:00`) : null
            const estaAtrasado = item.status !== 'Entregue' && item.status !== 'Cancelado' && dataEntregaComparacao && dataEntregaComparacao < hojeComparacao
            const statusVisual = estaAtrasado ? 'Atrasado' : item.status
            const statusClasse = statusVisual === 'Entregue'
              ? 'mini-delivery-status-entregue'
              : statusVisual === 'Cancelado'
                ? 'mini-delivery-status-cancelado'
                : statusVisual === 'Atrasado'
                  ? 'mini-delivery-status-atrasado'
                  : 'mini-delivery-status-programado'
            const destinoFinanceiro = destinoFinanceiroDelivery(item)

            return (
              <article key={item.id} className={`mini-delivery-card mini-delivery-card-compact ${deliveryAberto ? 'mini-delivery-card-open' : ''}`}>
                <button
                  type="button"
                  onClick={() => setDeliveryExpandidoId(deliveryAberto ? null : item.id)}
                  className="mini-delivery-compact-button"
                >
                  <div className="mini-delivery-compact-main">
                    <p>{item.clientes?.nome || 'Cliente não informado'}</p>
                    <span>{referenciaDelivery}</span>
                  </div>

                  <div className="mini-delivery-compact-desc">
                    {itensDelivery.map((linha, index) => (
                      <span key={`${item.id}-item-${index}`}>{linha}</span>
                    ))}
                  </div>

                  <div className="mini-delivery-compact-meta">
                    <strong>{dataBR(item.data_entrega)}</strong>
                    <span>{moeda(item.valor_total)}</span>
                  </div>

                  <span className={`mini-delivery-status ${statusClasse}`}>
                    {statusVisual}
                  </span>

                  {destinoFinanceiro && (
                    <span className={`mini-delivery-finance-chip ${destinoFinanceiro.classe}`}>
                      {normalizarStatus(item.vendas?.status || '') === 'PAGO' ? 'Vendas' : 'Pendências'}
                    </span>
                  )}

                  <span className="mini-delivery-compact-arrow">
                    {deliveryAberto ? '⌄' : '›'}
                  </span>
                </button>

                {deliveryAberto && (
                  <div className="mini-delivery-expanded">
                    <div className="mini-delivery-card-grid">
                      <div>
                        <p className="mini-delivery-label">Pedido</p>
                        <strong>{dataBR(item.data_pedido)}</strong>
                      </div>

                      <div>
                        <p className="mini-delivery-label">Entrega</p>
                        <strong>{dataBR(item.data_entrega)}</strong>
                      </div>

                      <div>
                        <p className="mini-delivery-label">Venda</p>
                        <strong>{item.vendas?.numero_venda ? `#${item.vendas.numero_venda}` : 'Avulsa'}</strong>
                      </div>

                      <div>
                        <p className="mini-delivery-label">Valor</p>
                        <strong className="mini-delivery-money">{moeda(item.valor_total)}</strong>
                      </div>
                    </div>

                    {destinoFinanceiro && (
                      <div className={`mini-delivery-card-line mini-delivery-finance-destination ${destinoFinanceiro.classe}`}>
                        <p className="mini-delivery-label">Destino financeiro</p>
                        <strong>{destinoFinanceiro.texto}</strong>
                        <span>{destinoFinanceiro.detalhe}</span>
                      </div>
                    )}

                    <div className="mini-delivery-card-line">
                      <p className="mini-delivery-label">Local</p>
                      <p>{item.local_entrega || 'Sem local'}</p>
                    </div>

                    <div className="mini-delivery-card-line mini-delivery-description">
                      <p className="mini-delivery-label">Itens / descrição</p>
                      <p>{item.descricao || 'Sem descrição'}</p>
                    </div>

                    <div className="mini-delivery-actions">
                      {item.status !== 'Cancelado' && (
                        <button
                          type="button"
                          onClick={() => alterarStatusDelivery(item, 'Cancelado')}
                          className="mini-delivery-action mini-delivery-action-red"
                        >
                          Cancelar
                        </button>
                      )}

                      {item.status !== 'Programado' && (
                        <button
                          type="button"
                          onClick={() => alterarStatusDelivery(item, 'Programado')}
                          className="mini-delivery-action mini-delivery-action-orange"
                        >
                          Programar
                        </button>
                      )}

                      {!item.venda_id && item.status !== 'Cancelado' && (
                        <button
                          type="button"
                          onClick={() => abrirModalDeliveryVenda(item)}
                          className="mini-delivery-action mini-delivery-action-green"
                        >
                          Entregar + venda
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => editarDelivery(item)}
                        className="mini-delivery-action mini-delivery-action-dark"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirDelivery(item)}
                        className="mini-delivery-action mini-delivery-action-red"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="mini-delivery-table-desktop delivery-table-refino overflow-auto rounded-2xl border border-zinc-900">
          <table className="w-full min-w-[1120px] delivery-table-refino-final">
            <colgroup>
              <col className="col-pedido" />
              <col className="col-entrega" />
              <col className="col-cliente" />
              <col className="col-referencia" />
              <col className="col-itens" />
              <col className="col-valor" />
              <col className="col-status" />
              <col className="col-acoes" />
            </colgroup>
            <thead className="bg-zinc-950">
              <tr className="text-left text-zinc-500 uppercase text-xs">
                <th className="p-4">Pedido</th>
                <th className="p-4">Entrega</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Referência</th>
                <th className="p-4">Itens / descrição</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {deliveriesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-5 text-zinc-500">
                    Nenhuma entrega encontrada.
                  </td>
                </tr>
              )}

              {deliveriesFiltrados.map((item) => (
                <tr key={item.id} className="border-t border-zinc-900">
                  <td className="p-4 text-zinc-400">{dataBR(item.data_pedido)}</td>
                  <td className="p-4 text-white font-semibold">{dataBR(item.data_entrega)}</td>
                  <td className="p-4 font-semibold">{item.clientes?.nome}</td>
                  <td className="p-4 text-zinc-400">{item.referencia || item.clientes?.referencia || 'Sem referência'}</td>
                  <td className="p-4 text-zinc-300 max-w-[320px] whitespace-pre-line leading-relaxed">{item.descricao || 'Sem descrição'}</td>
                  <td className="p-4 text-green-300">{moeda(item.valor_total)}</td>
                  <td className="p-4 delivery-status-td">
                    <span
                      className={`delivery-status-chip px-3 py-1 rounded-xl text-xs font-semibold ${
                        item.status === 'Entregue'
                          ? 'bg-green-950 text-green-300'
                          : item.status === 'Cancelado'
                            ? 'bg-red-950 text-red-300'
                            : 'bg-orange-950 text-orange-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    {destinoFinanceiroDelivery(item) && (
                      <div className={`delivery-finance-destino mt-2 ${destinoFinanceiroDelivery(item).classe}`}>
                        {destinoFinanceiroDelivery(item).texto}
                      </div>
                    )}
                  </td>
                  <td className="p-4 delivery-actions-td delivery-actions-grid-cell">
                    <div className="delivery-actions-grid-final delivery-actions-grid-simple">
                      {item.status !== 'Cancelado' ? (
                        <button
                          type="button"
                          onClick={() => alterarStatusDelivery(item, 'Cancelado')}
                          className="delivery-acao delivery-acao-alerta"
                        >
                          Cancelar
                        </button>
                      ) : (
                        <span className="delivery-action-placeholder" aria-hidden="true" />
                      )}

                      {!item.venda_id && item.status !== 'Cancelado' ? (
                        <button
                          type="button"
                          onClick={() => abrirModalDeliveryVenda(item)}
                          className="delivery-acao delivery-acao-sucesso"
                        >
                          Entregar + venda
                        </button>
                      ) : (
                        <span className="delivery-action-placeholder" aria-hidden="true" />
                      )}

                      <button
                        type="button"
                        onClick={() => editarDelivery(item)}
                        className="delivery-acao delivery-acao-editar"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirDelivery(item)}
                        className="delivery-acao delivery-acao-excluir"
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


  function TelaRoteiroVendas() {
    const locais = roteirosVendasFiltrados('LOCAL')
    const clientesLembrar = roteirosVendasFiltrados('CLIENTE')
    const totalItens = locais.length + clientesLembrar.length
    const totalMarcados = [...locais, ...clientesLembrar].filter((item) => item.concluido).length
    const totalPendentes = Math.max(totalItens - totalMarcados, 0)

    function ListaControle({ titulo, subtitulo, itens, vazio }) {
      return (
        <div className="rounded-[28px] border border-zinc-900 bg-zinc-950 p-5">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">{titulo}</h3>
              <p className="text-sm text-zinc-500">{subtitulo}</p>
            </div>
            <span className="rounded-full border border-orange-950 bg-black px-4 py-2 text-sm font-bold text-orange-300">
              {itens.filter((item) => item.concluido).length}/{itens.length} marcados
            </span>
          </div>

          <div className="grid gap-3">
            {itens.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-black p-5 text-zinc-500">
                {vazio}
              </div>
            )}

            {itens.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 transition ${item.concluido ? 'border-green-900 bg-green-950/20' : 'border-zinc-800 bg-black'}`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={() => alternarConcluidoRoteiroVendas(item)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm font-black ${item.concluido ? 'border-green-500 bg-green-700 text-white' : 'border-zinc-600 bg-zinc-950 text-transparent'}`}>
                      ✓
                    </span>

                    <span className="min-w-0">
                      <span className={`block text-lg font-bold ${item.concluido ? 'text-zinc-400 line-through' : 'text-white'}`}>{item.local}</span>
                      <span className="mt-1 flex flex-wrap gap-2 text-sm text-zinc-500">
                        {item.referencia && <span>{item.referencia}</span>}
                        {item.horario && <span>{item.horario}</span>}
                        {item.observacao && <span>{item.observacao}</span>}
                      </span>
                    </span>
                  </button>

                  <div className="flex gap-2 md:justify-end">
                    <button onClick={() => editarRoteiroVendas(item)} className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700">
                      Editar
                    </button>
                    <button onClick={() => excluirRoteiroVendas(item)} className="rounded-xl bg-red-950 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-900">
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <section className="rounded-[28px] border border-orange-950 bg-black p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.4em] text-orange-400">Controle mensal</p>
              <h2 className="text-4xl font-bold">Locais e Clientes</h2>
              <p className="mt-2 text-zinc-500">Lista simples para controlar locais de visita e clientes para lembrar durante o mês.</p>
            </div>
            <button
              type="button"
              onClick={resetarChecksRoteiroVendas}
              className="rounded-2xl bg-zinc-800 px-5 py-3 font-semibold text-white hover:bg-zinc-700"
            >
              Resetar checks do mês
            </button>
          </div>
        </section>

        <section className="mobile-summary-grid grid gap-4 md:grid-cols-3">
          <CardResumo titulo="Itens cadastrados" valor={totalItens} classe="text-white" />
          <CardResumo titulo="Pendentes" valor={totalPendentes} classe="text-orange-300" />
          <CardResumo titulo="Marcados" valor={totalMarcados} classe="text-green-300" />
        </section>

        <section className="mobile-panel-card rounded-[28px] border border-zinc-900 bg-black p-6">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">{editandoRoteiroVendasId ? 'Editar item' : 'Adicionar local ou cliente'}</h3>
              <p className="text-sm text-zinc-500">Cadastre apenas o que precisa lembrar. O controle é manual e mensal.</p>
            </div>
          </div>

          <form onSubmit={salvarRoteiroVendas} className="grid gap-4 md:grid-cols-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Tipo</label>
              <select
                value={formRoteiroVendas.categoria}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, categoria: e.target.value })}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              >
                <option value="LOCAL">Local de visita</option>
                <option value="CLIENTE">Cliente para lembrar</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">
                {formRoteiroVendas.categoria === 'CLIENTE' ? 'Cliente' : 'Local'}
              </label>
              <input
                value={formRoteiroVendas.local}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, local: e.target.value })}
                placeholder={formRoteiroVendas.categoria === 'CLIENTE' ? 'Ex: Jane Oliveira' : 'Ex: Parque 304 Norte'}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Referência</label>
              <input
                value={formRoteiroVendas.referencia}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, referencia: e.target.value })}
                placeholder="Ex: 314 Sul"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Horário</label>
              <input
                value={formRoteiroVendas.horario}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, horario: e.target.value })}
                placeholder="Ex: 9h40"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div className="md:col-span-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Observação</label>
              <input
                value={formRoteiroVendas.observacao}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, observacao: e.target.value })}
                placeholder="Opcional"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div className="flex flex-col gap-3 md:col-span-5 md:flex-row">
              <button type="submit" className="rounded-2xl bg-orange-950 px-6 py-3 font-semibold text-white hover:bg-orange-900">
                {editandoRoteiroVendasId ? 'Salvar alterações' : 'Adicionar'}
              </button>
              {editandoRoteiroVendasId && (
                <button type="button" onClick={limparRoteiroVendas} className="rounded-2xl bg-zinc-800 px-6 py-3 font-semibold text-white hover:bg-zinc-700">
                  Cancelar edição
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="mobile-panel-card rounded-[28px] border border-zinc-900 bg-black p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Conferência do mês</h3>
              <p className="text-sm text-zinc-500">Marque quando já visitou o local, entrou em contato ou o cliente entrou em contato com você.</p>
            </div>
            <input
              value={buscaRoteiroVendas}
              onChange={(e) => setBuscaRoteiroVendas(e.target.value)}
              placeholder="Buscar local, cliente, referência ou observação"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700 md:max-w-md"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ListaControle
              titulo="Locais de visita"
              subtitulo="Para não esquecer onde precisa passar."
              itens={locais}
              vazio="Nenhum local cadastrado ainda."
            />
            <ListaControle
              titulo="Clientes para lembrar"
              subtitulo="Clientes antigos ou aposentados que você acompanha manualmente."
              itens={clientesLembrar}
              vazio="Nenhum cliente para lembrar cadastrado ainda."
            />
          </div>
        </section>
      </div>
    )
  }

  function TelaRelatorios() {
    const inicio = dataRelatorioInicio || inicioMesAtual()
    const fim = dataRelatorioFim || dataHoje()

    function dentroDoPeriodo(data) {
      if (!data) return false
      const valor = String(data).slice(0, 10)
      return valor >= inicio && valor <= fim
    }

    function aplicarPeriodoRapido(tipo) {
      const hoje = new Date()
      const yyyyMmDd = (data) => data.toISOString().slice(0, 10)

      if (tipo === 'hoje') {
        const hojeTexto = yyyyMmDd(hoje)
        setDataRelatorioInicio(hojeTexto)
        setDataRelatorioFim(hojeTexto)
        return
      }

      if (tipo === 'semana') {
        const data = new Date(hoje)
        const dia = data.getDay() || 7
        data.setDate(data.getDate() - dia + 1)
        setDataRelatorioInicio(yyyyMmDd(data))
        setDataRelatorioFim(yyyyMmDd(hoje))
        return
      }

      if (tipo === 'mes') {
        setDataRelatorioInicio(inicioMesAtual())
        setDataRelatorioFim(yyyyMmDd(hoje))
        return
      }

      if (tipo === 'mesAnterior') {
        const primeiroDiaMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
        const ultimoDiaMesAnterior = new Date(primeiroDiaMesAtual)
        ultimoDiaMesAnterior.setDate(0)
        const primeiroDiaMesAnterior = new Date(ultimoDiaMesAnterior.getFullYear(), ultimoDiaMesAnterior.getMonth(), 1)
        setDataRelatorioInicio(yyyyMmDd(primeiroDiaMesAnterior))
        setDataRelatorioFim(yyyyMmDd(ultimoDiaMesAnterior))
      }
    }

    const vendasPeriodo = vendas.filter((venda) => dentroDoPeriodo(venda.data_venda))
    const despesasPeriodo = despesas.filter((despesa) => dentroDoPeriodo(despesa.data_despesa || despesa.created_at))
    const itensPeriodo = movimentacoesProdutos.filter((item) => dentroDoPeriodo(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)))
    const pendenciasPeriodo = pendencias.filter((pendencia) => dentroDoPeriodo(pendencia.vendas?.data_venda || pendencia.created_at))

    const totalBrutoPeriodo = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const totalLiquidoCartoesPeriodo = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_liquido || 0), 0)
    const totalTaxasPeriodo = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const totalEmAbertoPeriodo = pendenciasPeriodo.reduce((acc, pendencia) => acc + Number(pendencia.saldo_restante || 0), 0)
    const saldoAnteriorEmAbertoPeriodo = pendencias
      .filter((pendencia) => {
        const dataVenda = String(pendencia.vendas?.data_venda || pendencia.created_at || '').slice(0, 10)
        return dataVenda && dataVenda < inicio && pendencia.status !== 'PAGO' && Number(pendencia.saldo_restante || 0) > 0
      })
      .reduce((acc, pendencia) => acc + Number(pendencia.saldo_restante || 0), 0)
    const totalFornecedoresPeriodo = itensPeriodo.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalDespesasPeriodo = despesasPeriodo.reduce((acc, despesa) => acc + Number(despesa.valor || 0), 0)
    const totalAbastecimentosPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoesPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustosPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)

    const subtotalOperacionalPeriodo = totalBrutoPeriodo - totalFornecedoresPeriodo - totalTaxasPeriodo - totalDespesasPeriodo
    const totalProjetadoFinalPeriodo = subtotalOperacionalPeriodo
    const pecasPeriodo = itensPeriodo.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const clientesAtendidosPeriodo = new Set(vendasPeriodo.map((venda) => venda.cliente_id).filter(Boolean)).size
    const ticketMedioPeriodo = vendasPeriodo.length > 0 ? totalBrutoPeriodo / vendasPeriodo.length : 0
    const mediaLiquidaPecaPeriodo = pecasPeriodo > 0 ? totalProjetadoFinalPeriodo / pecasPeriodo : 0
    const mediaPecasPorVendaPeriodo = vendasPeriodo.length > 0 ? pecasPeriodo / vendasPeriodo.length : 0
    const mediaPecasPorClientePeriodo = clientesAtendidosPeriodo > 0 ? pecasPeriodo / clientesAtendidosPeriodo : 0
    const margemProjetadaPeriodo = totalBrutoPeriodo > 0 ? (totalProjetadoFinalPeriodo / totalBrutoPeriodo) * 100 : 0

    const semanas = [1, 2, 3, 4, 5]

    function semanaDoMes(data) {
      if (!data) return 1
      const dia = Number(String(data).slice(8, 10)) || 1
      return Math.min(Math.ceil(dia / 7), 5)
    }

    const brutoPorSemana = semanas.map((semana) => {
      return vendasPeriodo
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    })

    const clientesPorSemana = semanas.map((semana) => {
      const clientesSemana = vendasPeriodo
        .filter((venda) => semanaDoMes(venda.data_venda) === semana)
        .map((venda) => venda.cliente_id)
        .filter(Boolean)

      return new Set(clientesSemana).size
    })

    const produtosResumo = Object.values(
      itensPeriodo.reduce((acc, item) => {
        const nome = item.produtos?.nome || 'Produto sem nome'
        if (!acc[nome]) {
          acc[nome] = { nome, quantidade: 0, venda: 0, custo: 0, lucro: 0 }
        }
        acc[nome].quantidade += Number(item.quantidade || 0)
        acc[nome].venda += Number(item.subtotal_venda || 0)
        acc[nome].custo += Number(item.subtotal_custo || 0)
        acc[nome].lucro += Number(item.lucro || 0)
        return acc
      }, {})
    ).sort((a, b) => b.quantidade - a.quantidade)

    const clientesResumo = Object.values(
      vendasPeriodo.reduce((acc, venda) => {
        const nome = venda.clientes?.nome || 'Cliente sem nome'
        const referencia = venda.clientes?.referencia || 'Sem referência'
        const observacao = venda.clientes?.observacao || ''
        const chave = `${nome}-${referencia}-${observacao}`
        if (!acc[chave]) {
          acc[chave] = { nome, referencia, observacao, vendas: 0, total: 0 }
        }
        acc[chave].vendas += 1
        acc[chave].total += Number(venda.valor_total || 0)
        return acc
      }, {})
    ).sort((a, b) => b.total - a.total)

    const formasResumo = Object.values(
      vendasPeriodo.reduce((acc, venda) => {
        const forma = venda.forma_pagamento || 'Sem forma de pagamento'
        if (!acc[forma]) {
          acc[forma] = { forma, vendas: 0, total: 0, taxas: 0 }
        }
        acc[forma].vendas += 1
        acc[forma].total += Number(venda.valor_total || 0)
        acc[forma].taxas += Number(venda.valor_taxa || 0)
        return acc
      }, {})
    ).sort((a, b) => b.total - a.total)

    function CardIndicadorRelatorio({ titulo, valor, detalhe, classe }) {
      return (
        <div className="relatorio-card bg-black border border-orange-950 rounded-[24px] p-5">
          <p className="text-zinc-500 text-sm mb-2">{titulo}</p>
          <h3 className={`text-2xl font-bold ${classe || 'text-white'}`}>{valor}</h3>
          {detalhe && <p className="text-zinc-600 text-xs mt-2">{detalhe}</p>}
        </div>
      )
    }

    function LinhaRelatorioPeriodo({ rotulo, valor, destaque }) {
      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <span className="text-zinc-400">{rotulo}</span>
          <span className={`font-semibold ${destaque || 'text-white'}`}>{valor}</span>
        </div>
      )
    }

    function BlocoRelatorioPeriodo({ titulo, children }) {
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

    function LinhaResumoRelatorio({ nome, detalhe, valor, extra }) {
      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{nome}</p>
            {detalhe && <p className="text-xs text-zinc-500 mt-1 truncate">{detalhe}</p>}
          </div>
          <div className="text-right">
            <p className="font-bold text-orange-300 whitespace-nowrap">{valor}</p>
            {extra && <p className="text-xs text-zinc-500 mt-1 whitespace-nowrap">{extra}</p>}
          </div>
        </div>
      )
    }

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8">
          <div>
            <p className="text-orange-400 uppercase tracking-[5px] text-xs mb-3">Gestão financeira</p>
            <h2 className="text-4xl font-bold">Relatórios</h2>
            <p className="text-zinc-500 mt-2">Versão filtrável do painel, com o mesmo raciocínio financeiro por período.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => aplicarPeriodoRapido('hoje')} className="bg-zinc-900 hover:bg-zinc-800 px-4 py-3 rounded-2xl text-sm font-semibold">Hoje</button>
            <button type="button" onClick={() => aplicarPeriodoRapido('semana')} className="bg-zinc-900 hover:bg-zinc-800 px-4 py-3 rounded-2xl text-sm font-semibold">Semana</button>
            <button type="button" onClick={() => aplicarPeriodoRapido('mes')} className="bg-orange-950 hover:bg-orange-900 px-4 py-3 rounded-2xl text-sm font-semibold">Mês atual</button>
            <button type="button" onClick={() => aplicarPeriodoRapido('mesAnterior')} className="bg-zinc-900 hover:bg-zinc-800 px-4 py-3 rounded-2xl text-sm font-semibold">Mês anterior</button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-5 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Período personalizado</p>
              <p className="text-sm text-zinc-400 mt-1">Escolha qualquer data inicial e final. O relatório recalcula automaticamente.</p>
            </div>

            <button type="button" onClick={() => aplicarPeriodoRapido('mes')} className="hidden md:inline-flex bg-orange-950 hover:bg-orange-900 px-4 py-3 rounded-2xl text-sm font-semibold">Gerar mês atual</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <label className="grid gap-2 text-xs uppercase tracking-[2px] text-zinc-500">
              Data inicial
            <input type="date" value={dataRelatorioInicio} onClick={abrirCalendario} onChange={(e) => setDataRelatorioInicio(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white normal-case tracking-normal" />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[2px] text-zinc-500">
            Data final
            <input type="date" value={dataRelatorioFim} onClick={abrirCalendario} onChange={(e) => setDataRelatorioFim(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white normal-case tracking-normal" />
          </label>

            <CardIndicadorRelatorio titulo="Período analisado" valor={`${dataBR(inicio)} a ${dataBR(fim)}`} detalhe="Filtro aplicado em vendas, itens, pendências e despesas." classe="text-white" />
            <CardIndicadorRelatorio titulo="Vendas no período" valor={vendasPeriodo.length} detalhe={`${pecasPeriodo} peças lançadas`} classe="text-orange-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-7 gap-4 mb-8">
          <CardIndicadorRelatorio titulo="Total bruto vendido" valor={moeda(totalBrutoPeriodo)} detalhe="Soma das vendas lançadas" classe="text-green-300" />
          <CardIndicadorRelatorio titulo="Pagamentos fornecedores" valor={moeda(totalFornecedoresPeriodo)} detalhe="Custo dos produtos vendidos" classe="text-red-300" />
          <CardIndicadorRelatorio titulo="Total despesas" valor={moeda(totalDespesasPeriodo)} detalhe="Despesas cadastradas no período" classe="text-red-300" />
          <CardIndicadorRelatorio titulo="Total taxas" valor={moeda(totalTaxasPeriodo)} detalhe="Taxas de cartões, links e meios de pagamento" classe="text-red-300" />
          <CardIndicadorRelatorio titulo="Em aberto no período" valor={moeda(totalEmAbertoPeriodo)} detalhe="Pendências ligadas ao período" classe="text-orange-300" />
          <CardIndicadorRelatorio titulo="Saldo anterior em aberto" valor={moeda(saldoAnteriorEmAbertoPeriodo)} detalhe="Pendências anteriores à data inicial" classe="text-yellow-300" />
          <CardIndicadorRelatorio titulo="Total projetado final" valor={moeda(totalProjetadoFinalPeriodo)} detalhe="Bruto menos fornecedores, taxas e despesas" classe={totalProjetadoFinalPeriodo >= 0 ? 'text-green-300' : 'text-red-300'} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <BlocoRelatorioPeriodo titulo="Resumo financeiro">
            <LinhaRelatorioPeriodo rotulo="Total bruto vendas" valor={moeda(totalBrutoPeriodo)} destaque="text-green-300" />
            <LinhaRelatorioPeriodo rotulo="Total líquido cartões / Pix / dinheiro / link" valor={moeda(totalLiquidoCartoesPeriodo)} destaque="text-green-300" />
            <LinhaRelatorioPeriodo rotulo="Taxas cartões / link" valor={moeda(totalTaxasPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Fiados em aberto no período" valor={moeda(totalEmAbertoPeriodo)} destaque="text-orange-300" />
            <LinhaRelatorioPeriodo rotulo="Saldo anterior em aberto" valor={moeda(saldoAnteriorEmAbertoPeriodo)} destaque="text-yellow-300" />
            <LinhaRelatorioPeriodo rotulo="Pagamentos fornecedores" valor={moeda(totalFornecedoresPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Total de despesas" valor={moeda(totalDespesasPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Subtotal operacional" valor={moeda(subtotalOperacionalPeriodo)} destaque="text-orange-300" />
            <LinhaRelatorioPeriodo rotulo="Total projetado final" valor={moeda(totalProjetadoFinalPeriodo)} destaque={totalProjetadoFinalPeriodo >= 0 ? 'text-green-400' : 'text-red-300'} />
          </BlocoRelatorioPeriodo>

          <BlocoRelatorioPeriodo titulo="Peças e atendimento">
            <LinhaRelatorioPeriodo rotulo="Peças vendidas" valor={pecasPeriodo} destaque="text-green-300" />
            <LinhaRelatorioPeriodo rotulo="Clientes atendidos" valor={clientesAtendidosPeriodo} destaque="text-white" />
            <LinhaRelatorioPeriodo rotulo="Vendas lançadas" valor={vendasPeriodo.length} destaque="text-white" />
            <LinhaRelatorioPeriodo rotulo="Média peças por venda" valor={mediaPecasPorVendaPeriodo.toFixed(1).replace('.', ',')} destaque="text-white" />
            <LinhaRelatorioPeriodo rotulo="Média peças por cliente" valor={mediaPecasPorClientePeriodo.toFixed(1).replace('.', ',')} destaque="text-white" />
          </BlocoRelatorioPeriodo>

          <BlocoRelatorioPeriodo titulo="Indicadores">
            <LinhaRelatorioPeriodo rotulo="Ticket médio" valor={moeda(ticketMedioPeriodo)} destaque="text-green-300" />
            <LinhaRelatorioPeriodo rotulo="Média líquida por peça" valor={moeda(mediaLiquidaPecaPeriodo)} destaque="text-green-400" />
            <LinhaRelatorioPeriodo rotulo="Margem operacional projetada" valor={percentual(margemProjetadaPeriodo)} destaque={margemProjetadaPeriodo >= 0 ? 'text-green-300' : 'text-red-300'} />
            <LinhaRelatorioPeriodo rotulo="Total projetado final" valor={moeda(totalProjetadoFinalPeriodo)} destaque={totalProjetadoFinalPeriodo >= 0 ? 'text-green-400' : 'text-red-300'} />
          </BlocoRelatorioPeriodo>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <BlocoRelatorioPeriodo titulo="Vendas por semana">
            {semanas.map((semana, index) => (
              <LinhaRelatorioPeriodo key={semana} rotulo={`Semana ${semana}`} valor={moeda(brutoPorSemana[index])} destaque="text-green-300" />
            ))}
            <LinhaRelatorioPeriodo rotulo="Total do período" valor={moeda(totalBrutoPeriodo)} destaque="text-green-400" />
          </BlocoRelatorioPeriodo>

          <BlocoRelatorioPeriodo titulo="Clientes por semana">
            {semanas.map((semana, index) => (
              <LinhaRelatorioPeriodo key={semana} rotulo={`Semana ${semana}`} valor={clientesPorSemana[index]} destaque="text-white" />
            ))}
            <LinhaRelatorioPeriodo rotulo="Total do período" valor={clientesAtendidosPeriodo} destaque="text-green-300" />
          </BlocoRelatorioPeriodo>

          <BlocoRelatorioPeriodo titulo="Custos operacionais">
            <LinhaRelatorioPeriodo rotulo="Pagamentos fornecedores" valor={moeda(totalFornecedoresPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Taxas" valor={moeda(totalTaxasPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Abastecimentos" valor={moeda(totalAbastecimentosPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Degustações" valor={moeda(totalDegustacoesPeriodo)} destaque="text-red-300" />
            <LinhaRelatorioPeriodo rotulo="Outros custos" valor={moeda(totalOutrosCustosPeriodo)} destaque="text-red-300" />
          </BlocoRelatorioPeriodo>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="relatorio-bloco rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden">
            <div className="bg-[#111827] px-4 py-3 font-bold">Produtos mais vendidos</div>
            {produtosResumo.slice(0, 10).length > 0 ? produtosResumo.slice(0, 10).map((produto) => (
              <LinhaResumoRelatorio key={produto.nome} nome={produto.nome} detalhe={`${produto.quantidade} peças • lucro ${moeda(produto.lucro)}`} valor={moeda(produto.venda)} extra={`custo ${moeda(produto.custo)}`} />
            )) : <p className="p-4 text-zinc-500">Nenhum produto lançado nesse período.</p>}
          </div>

          <div className="relatorio-bloco rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden">
            <div className="bg-[#111827] px-4 py-3 font-bold">Clientes que mais compraram</div>
            {clientesResumo.slice(0, 10).length > 0 ? clientesResumo.slice(0, 10).map((cliente) => (
              <LinhaResumoRelatorio key={`${cliente.nome}-${cliente.referencia}-${cliente.observacao}`} nome={cliente.nome} detalhe={`${cliente.referencia}${cliente.observacao ? ` • ${cliente.observacao}` : ''} • ${cliente.vendas} venda(s)`} valor={moeda(cliente.total)} />
            )) : <p className="p-4 text-zinc-500">Nenhum cliente no período selecionado.</p>}
          </div>

          <div className="relatorio-bloco rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden">
            <div className="bg-[#111827] px-4 py-3 font-bold">Formas de pagamento</div>
            {formasResumo.length > 0 ? formasResumo.map((forma) => (
              <LinhaResumoRelatorio key={forma.forma} nome={forma.forma} detalhe={`${forma.vendas} venda(s) • taxas ${moeda(forma.taxas)}`} valor={moeda(forma.total)} />
            )) : <p className="p-4 text-zinc-500">Nenhuma venda no período selecionado.</p>}
          </div>
        </div>
      </section>
    )
  }


  function TelaPontoEquilibrio() {
    const inicio = dataPontoInicio || inicioMesAtual()
    const fim = dataPontoFim || dataHoje()

    function dentroDoPeriodoPonto(data) {
      if (!data) return false
      const valor = String(data).slice(0, 10)
      return valor >= inicio && valor <= fim
    }

    function aplicarPeriodoPonto(tipo) {
      const hoje = new Date()
      const yyyyMmDd = (data) => data.toISOString().slice(0, 10)

      if (tipo === 'hoje') {
        const hojeTexto = yyyyMmDd(hoje)
        setDataPontoInicio(hojeTexto)
        setDataPontoFim(hojeTexto)
        return
      }

      if (tipo === 'semana') {
        const data = new Date(hoje)
        const dia = data.getDay() || 7
        data.setDate(data.getDate() - dia + 1)
        setDataPontoInicio(yyyyMmDd(data))
        setDataPontoFim(yyyyMmDd(hoje))
        return
      }

      if (tipo === 'mes') {
        setDataPontoInicio(inicioMesAtual())
        setDataPontoFim(yyyyMmDd(hoje))
        return
      }

      if (tipo === 'mesAnterior') {
        const periodo = periodoMesAnterior()
        setDataPontoInicio(periodo.inicio)
        setDataPontoFim(periodo.fim)
      }
    }

    const vendasPeriodo = vendas.filter((venda) => dentroDoPeriodoPonto(venda.data_venda))
    const despesasPeriodo = despesas.filter((despesa) => dentroDoPeriodoPonto(despesa.data_despesa || despesa.created_at))
    const itensPeriodo = movimentacoesProdutos.filter((item) => dentroDoPeriodoPonto(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)))

    const totalBrutoPeriodo = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const totalTaxasPeriodo = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const totalFornecedoresPeriodo = itensPeriodo.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalDespesasPeriodo = despesasPeriodo.reduce((acc, despesa) => acc + Number(despesa.valor || 0), 0)
    const totalAbastecimentosPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoesPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustosPeriodo = despesasPeriodo.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)

    const margemContribuicaoValor = totalBrutoPeriodo - totalFornecedoresPeriodo - totalTaxasPeriodo
    const margemContribuicaoPercentual = totalBrutoPeriodo > 0 ? (margemContribuicaoValor / totalBrutoPeriodo) * 100 : 0
    const margemContribuicaoDecimal = margemContribuicaoPercentual / 100
    const pontoEquilibrio = margemContribuicaoDecimal > 0 ? totalDespesasPeriodo / margemContribuicaoDecimal : 0
    const faltaParaEmpatar = Math.max(pontoEquilibrio - totalBrutoPeriodo, 0)
    const excedenteEquilibrio = Math.max(totalBrutoPeriodo - pontoEquilibrio, 0)
    const percentualAtingido = pontoEquilibrio > 0 ? Math.min((totalBrutoPeriodo / pontoEquilibrio) * 100, 999) : totalBrutoPeriodo > 0 ? 100 : 0
    const resultadoOperacional = totalBrutoPeriodo - totalFornecedoresPeriodo - totalTaxasPeriodo - totalDespesasPeriodo
    const ticketMedioPeriodo = vendasPeriodo.length > 0 ? totalBrutoPeriodo / vendasPeriodo.length : 0
    const pecasPeriodo = itensPeriodo.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const mediaPorPecaPeriodo = pecasPeriodo > 0 ? totalBrutoPeriodo / pecasPeriodo : 0

    function primeiroDiaMes(dataTexto) {
      if (!dataTexto) return inicioMesAtual()
      return `${String(dataTexto).slice(0, 7)}-01`
    }

    function ultimoDiaMes(dataTexto) {
      const [ano, mes] = String(dataTexto || dataHoje()).slice(0, 7).split('-').map(Number)
      return new Date(ano, mes, 0).toISOString().slice(0, 10)
    }

    function diasEntre(inicioTexto, fimTexto) {
      const dataInicial = new Date(`${inicioTexto}T00:00:00`)
      const dataFinal = new Date(`${fimTexto}T00:00:00`)
      return Math.max(Math.floor((dataFinal - dataInicial) / 86400000) + 1, 1)
    }

    function diasUteisEntre(inicioTexto, fimTexto) {
      const dataInicial = new Date(`${inicioTexto}T00:00:00`)
      const dataFinal = new Date(`${fimTexto}T00:00:00`)
      if (dataFinal < dataInicial) return 1

      let total = 0
      const cursor = new Date(dataInicial)

      while (cursor <= dataFinal) {
        const diaSemana = cursor.getDay()
        if (diaSemana >= 1 && diaSemana <= 5) total += 1
        cursor.setDate(cursor.getDate() + 1)
      }

      return Math.max(total, 1)
    }

    function maiorDataTexto(dataA, dataB) {
      return dataA > dataB ? dataA : dataB
    }

    const inicioMesProjecao = primeiroDiaMes(inicio)
    const fimMesProjecao = ultimoDiaMes(inicio)
    const hojeTextoProjecao = dataHoje()
    const limiteBaseProjecao = hojeTextoProjecao < fimMesProjecao ? hojeTextoProjecao : fimMesProjecao
    const limiteSeguroProjecao = limiteBaseProjecao < inicioMesProjecao ? fimMesProjecao : limiteBaseProjecao

    function dentroDoMesProjetado(data) {
      if (!data) return false
      const valor = String(data).slice(0, 10)
      return valor >= inicioMesProjecao && valor <= limiteSeguroProjecao
    }

    const vendasMesProjecao = vendas.filter((venda) => dentroDoMesProjetado(venda.data_venda))
    const despesasMesProjecao = despesas.filter((despesa) => dentroDoMesProjetado(despesa.data_despesa || despesa.created_at))
    const itensMesProjecao = movimentacoesProdutos.filter((item) => dentroDoMesProjetado(item.vendas?.data_venda || String(item.created_at || '').slice(0, 10)))

    const brutoMesBase = vendasMesProjecao.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const taxasMesBase = vendasMesProjecao.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const fornecedoresMesBase = itensMesProjecao.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const despesasMesBase = despesasMesProjecao.reduce((acc, despesa) => acc + Number(despesa.valor || 0), 0)
    const vendasMesBaseQuantidade = vendasMesProjecao.length

    const diasBaseProjecao = diasUteisEntre(inicioMesProjecao, limiteSeguroProjecao)
    const diasTotaisMesProjecao = diasUteisEntre(inicioMesProjecao, fimMesProjecao)
    const mesEmAndamento = hojeTextoProjecao >= inicioMesProjecao && hojeTextoProjecao <= fimMesProjecao
    const fatorProjecao = mesEmAndamento ? diasTotaisMesProjecao / diasBaseProjecao : 1

    const brutoProjetadoMes = brutoMesBase * fatorProjecao
    const taxasProjetadasMes = taxasMesBase * fatorProjecao
    const fornecedoresProjetadosMes = fornecedoresMesBase * fatorProjecao
    const despesasProjetadasMes = despesasMesBase * fatorProjecao
    const margemProjetadaValor = brutoProjetadoMes - fornecedoresProjetadosMes - taxasProjetadasMes
    const margemProjetadaPercentual = brutoProjetadoMes > 0 ? (margemProjetadaValor / brutoProjetadoMes) * 100 : 0
    const margemProjetadaDecimal = margemProjetadaPercentual / 100
    const pontoEquilibrioProjetado = margemProjetadaDecimal > 0 ? despesasProjetadasMes / margemProjetadaDecimal : 0
    const lucroOperacionalProjetado = brutoProjetadoMes - fornecedoresProjetadosMes - taxasProjetadasMes - despesasProjetadasMes
    const mediaDiariaProjetada = brutoMesBase / diasBaseProjecao
    const diasRestantesMesProjetado = mesEmAndamento ? Math.max(diasTotaisMesProjecao - diasBaseProjecao, 0) : 0
    const faltaParaEquilibrioProjetado = Math.max(pontoEquilibrioProjetado - brutoMesBase, 0)
    const vendaDiariaNecessariaProjetada = diasRestantesMesProjetado > 0 ? faltaParaEquilibrioProjetado / diasRestantesMesProjetado : 0
    const percentualEquilibrioProjetado = pontoEquilibrioProjetado > 0 ? Math.min((brutoMesBase / pontoEquilibrioProjetado) * 100, 999) : brutoMesBase > 0 ? 100 : 0

    const dataInicio = new Date(`${inicio}T00:00:00`)
    const dataFim = new Date(`${fim}T00:00:00`)
    const hoje = new Date(`${dataHoje()}T00:00:00`)
    const diasPeriodo = diasUteisEntre(inicio, fim)
    const inicioRestante = maiorDataTexto(dataHoje(), inicio)
    const diasRestantes = dataFim >= hoje ? diasUteisEntre(inicioRestante, fim) : 1
    const mediaDiariaAtual = totalBrutoPeriodo / diasPeriodo
    const metaDiariaRestante = faltaParaEmpatar > 0 ? faltaParaEmpatar / diasRestantes : 0

    const statusEquilibrio = faltaParaEmpatar <= 0
      ? { texto: 'Ponto de equilíbrio atingido', classe: 'bg-green-950 text-green-300 border-green-900' }
      : { texto: 'Ainda falta vender para empatar', classe: 'bg-orange-950 text-orange-300 border-orange-900' }

    function LinhaPonto({ rotulo, valor, destaque, detalhe }) {
      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <div>
            <span className="text-zinc-400">{rotulo}</span>
            {detalhe && <p className="mt-1 text-xs text-zinc-600">{detalhe}</p>}
          </div>
          <span className={`font-semibold ${destaque || 'text-white'}`}>{valor}</span>
        </div>
      )
    }

    function BlocoPonto({ titulo, children }) {
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

    function CardPonto({ titulo, valor, detalhe, classe }) {
      return (
        <div className="rounded-[26px] border border-orange-950 bg-black p-5">
          <p className="mb-3 text-sm text-zinc-500">{titulo}</p>
          <h3 className={`text-3xl font-bold ${classe || 'text-white'}`}>{valor}</h3>
          {detalhe && <p className="mt-2 text-xs text-zinc-600">{detalhe}</p>}
        </div>
      )
    }

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between mb-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-orange-400">Gestão financeira</p>
            <h2 className="text-4xl font-bold">Ponto de Equilíbrio</h2>
            <p className="text-zinc-500 mt-2 max-w-3xl">
              Calcula quanto precisa vender no período para cobrir fornecedores, taxas e despesas operacionais, sem terminar no prejuízo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => aplicarPeriodoPonto('hoje')} className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold hover:bg-zinc-800">Hoje</button>
            <button onClick={() => aplicarPeriodoPonto('semana')} className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold hover:bg-zinc-800">Semana</button>
            <button onClick={() => aplicarPeriodoPonto('mes')} className="rounded-2xl bg-orange-950 px-4 py-3 text-sm font-semibold hover:bg-orange-900">Mês atual</button>
            <button onClick={() => aplicarPeriodoPonto('mesAnterior')} className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold hover:bg-zinc-800">Mês anterior</button>
          </div>
        </div>

        <div className="rounded-[24px] border border-zinc-900 bg-zinc-950/30 p-5 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Data inicial</label>
              <input type="date" value={dataPontoInicio} onChange={(e) => setDataPontoInicio(e.target.value)} className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Data final</label>
              <input type="date" value={dataPontoFim} onChange={(e) => setDataPontoFim(e.target.value)} className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white" />
            </div>
            <div className="rounded-2xl border border-orange-950 bg-black p-4">
              <p className="text-xs text-zinc-500">Período analisado</p>
              <p className="mt-2 text-xl font-bold text-white">{dataBR(inicio)} a {dataBR(fim)}</p>
            </div>
            <div className={`rounded-2xl border p-4 ${statusEquilibrio.classe}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Status</p>
              <p className="mt-2 text-lg font-bold">{statusEquilibrio.texto}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <CardPonto titulo="Ponto de equilíbrio" valor={moeda(pontoEquilibrio)} detalhe="Venda mínima para não ter prejuízo" classe="text-yellow-300" />
          <CardPonto titulo="Vendido no período" valor={moeda(totalBrutoPeriodo)} detalhe={`${vendasPeriodo.length} venda(s) lançada(s)`} classe="text-green-300" />
          <CardPonto titulo="Falta para empatar" valor={moeda(faltaParaEmpatar)} detalhe={faltaParaEmpatar > 0 ? 'Valor ainda necessário' : `Sobra sobre o equilíbrio: ${moeda(excedenteEquilibrio)}`} classe={faltaParaEmpatar > 0 ? 'text-orange-300' : 'text-green-400'} />
          <CardPonto titulo="Meta diária restante" valor={moeda(metaDiariaRestante)} detalhe={`${diasRestantes} dia(s) restante(s) no período`} classe={metaDiariaRestante > 0 ? 'text-orange-300' : 'text-green-400'} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <BlocoPonto titulo="Cálculo do equilíbrio">
            <LinhaPonto rotulo="Receita bruta" valor={moeda(totalBrutoPeriodo)} destaque="text-green-300" />
            <LinhaPonto rotulo="Custo dos fornecedores" valor={moeda(totalFornecedoresPeriodo)} destaque="text-red-300" detalhe="Custo dos produtos vendidos no período" />
            <LinhaPonto rotulo="Taxas financeiras" valor={moeda(totalTaxasPeriodo)} destaque="text-red-300" />
            <LinhaPonto rotulo="Margem de contribuição" valor={moeda(margemContribuicaoValor)} destaque={margemContribuicaoValor >= 0 ? 'text-green-300' : 'text-red-300'} detalhe="Receita menos fornecedor e taxas" />
            <LinhaPonto rotulo="Margem de contribuição %" valor={percentual(margemContribuicaoPercentual)} destaque={margemContribuicaoPercentual > 0 ? 'text-green-300' : 'text-red-300'} />
            <LinhaPonto rotulo="Despesas operacionais" valor={moeda(totalDespesasPeriodo)} destaque="text-red-300" detalhe="Abastecimento, degustações e outros custos" />
            <LinhaPonto rotulo="Ponto de equilíbrio" valor={moeda(pontoEquilibrio)} destaque="text-yellow-300" />
          </BlocoPonto>

          <BlocoPonto titulo="Leitura executiva">
            <LinhaPonto rotulo="Percentual atingido" valor={percentual(percentualAtingido)} destaque={percentualAtingido >= 100 ? 'text-green-300' : 'text-orange-300'} />
            <LinhaPonto rotulo="Resultado operacional" valor={moeda(resultadoOperacional)} destaque={resultadoOperacional >= 0 ? 'text-green-400' : 'text-red-300'} detalhe="Receita menos fornecedores, taxas e despesas" />
            <LinhaPonto rotulo="Média diária atual" valor={moeda(mediaDiariaAtual)} destaque="text-white" />
            <LinhaPonto rotulo="Ticket médio" valor={moeda(ticketMedioPeriodo)} destaque="text-green-300" />
            <LinhaPonto rotulo="Peças vendidas" valor={pecasPeriodo} destaque="text-white" />
            <LinhaPonto rotulo="Média bruta por peça" valor={moeda(mediaPorPecaPeriodo)} destaque="text-green-300" />
          </BlocoPonto>

          <BlocoPonto titulo="Despesas consideradas">
            <LinhaPonto rotulo="Abastecimentos" valor={moeda(totalAbastecimentosPeriodo)} destaque="text-red-300" />
            <LinhaPonto rotulo="Degustações" valor={moeda(totalDegustacoesPeriodo)} destaque="text-red-300" />
            <LinhaPonto rotulo="Outros custos" valor={moeda(totalOutrosCustosPeriodo)} destaque="text-red-300" />
            <LinhaPonto rotulo="Total despesas" valor={moeda(totalDespesasPeriodo)} destaque="text-red-300" />
            <LinhaPonto rotulo="Observação" valor="Fornecedor não entra como despesa fixa" destaque="text-zinc-300" detalhe="Ele já entra no cálculo da margem de contribuição." />
          </BlocoPonto>
        </div>

        <div className="rounded-[24px] border border-orange-950 bg-gradient-to-br from-[#120b06] to-black p-5 mb-5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between mb-5">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-orange-300 font-bold">Inteligência preditiva</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Projeção até o fim do mês</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Base mensal: {dataBR(inicioMesProjecao)} a {dataBR(fimMesProjecao)}. A projeção usa a média dos dias úteis já realizados, de segunda a sexta, e recalcula automaticamente conforme novas vendas, despesas, taxas e custos são lançados.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
              Base analisada: <span className="font-bold text-white">{diasBaseProjecao}</span> de <span className="font-bold text-white">{diasTotaisMesProjecao}</span> dia(s) útil(eis)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            <CardPonto titulo="Venda projetada no mês" valor={moeda(brutoProjetadoMes)} detalhe={`Média atual: ${moeda(mediaDiariaProjetada)} por dia útil`} classe="text-green-300" />
            <CardPonto titulo="Lucro operacional projetado" valor={moeda(lucroOperacionalProjetado)} detalhe="Após fornecedores, taxas e despesas projetadas" classe={lucroOperacionalProjetado >= 0 ? 'text-green-400' : 'text-red-300'} />
            <CardPonto titulo="Equilíbrio projetado" valor={moeda(pontoEquilibrioProjetado)} detalhe="Estimativa do mínimo necessário no mês" classe="text-yellow-300" />
            <CardPonto titulo="Venda diária necessária" valor={moeda(vendaDiariaNecessariaProjetada)} detalhe={diasRestantesMesProjetado > 0 ? `${diasRestantesMesProjetado} dia(s) útil(eis) restante(s) no mês` : 'Mês fechado ou sem dias úteis restantes'} classe={vendaDiariaNecessariaProjetada > 0 ? 'text-orange-300' : 'text-green-400'} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <BlocoPonto titulo="Projeção de fechamento">
              <LinhaPonto rotulo="Receita projetada" valor={moeda(brutoProjetadoMes)} destaque="text-green-300" />
              <LinhaPonto rotulo="Fornecedores projetados" valor={moeda(fornecedoresProjetadosMes)} destaque="text-red-300" />
              <LinhaPonto rotulo="Taxas projetadas" valor={moeda(taxasProjetadasMes)} destaque="text-red-300" />
              <LinhaPonto rotulo="Despesas projetadas" valor={moeda(despesasProjetadasMes)} destaque="text-red-300" />
              <LinhaPonto rotulo="Resultado projetado" valor={moeda(lucroOperacionalProjetado)} destaque={lucroOperacionalProjetado >= 0 ? 'text-green-400' : 'text-red-300'} />
            </BlocoPonto>

            <BlocoPonto titulo="Ritmo do mês">
              <LinhaPonto rotulo="Vendido até agora no mês" valor={moeda(brutoMesBase)} destaque="text-green-300" detalhe={`${vendasMesBaseQuantidade} venda(s) na base da projeção`} />
              <LinhaPonto rotulo="Média por dia útil" valor={moeda(mediaDiariaProjetada)} destaque="text-white" />
              <LinhaPonto rotulo="Percentual do equilíbrio projetado" valor={percentual(percentualEquilibrioProjetado)} destaque={percentualEquilibrioProjetado >= 100 ? 'text-green-300' : 'text-orange-300'} />
              <LinhaPonto rotulo="Falta para o equilíbrio projetado" valor={moeda(faltaParaEquilibrioProjetado)} destaque={faltaParaEquilibrioProjetado > 0 ? 'text-orange-300' : 'text-green-400'} />
              <LinhaPonto rotulo="Dias úteis restantes no mês" valor={diasRestantesMesProjetado} destaque="text-white" />
            </BlocoPonto>

            <BlocoPonto titulo="Leitura profissional">
              <LinhaPonto rotulo="Margem projetada" valor={percentual(margemProjetadaPercentual)} destaque={margemProjetadaPercentual > 0 ? 'text-green-300' : 'text-red-300'} />
              <LinhaPonto rotulo="Margem em valor" valor={moeda(margemProjetadaValor)} destaque={margemProjetadaValor >= 0 ? 'text-green-300' : 'text-red-300'} detalhe="Receita projetada menos fornecedores e taxas projetadas" />
              <LinhaPonto rotulo="Fator de projeção" valor={`${fatorProjecao.toFixed(2)}x`} destaque="text-zinc-300" detalhe={mesEmAndamento ? 'Mês em andamento' : 'Mês fechado ou histórico'} />
              <LinhaPonto rotulo="Observação" valor="Projeção, não fechamento" destaque="text-yellow-300" detalhe="O resultado considera dias úteis de venda. Ele muda conforme você lança novas vendas, fretes, combustíveis, despesas e custos do período." />
            </BlocoPonto>
          </div>
        </div>

        <div className="rounded-[24px] border border-orange-950 bg-gradient-to-br from-zinc-950 to-black p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-orange-300 font-bold">Regra usada</p>
          <p className="mt-3 text-zinc-300 leading-relaxed">
            Ponto de equilíbrio = despesas operacionais divididas pela margem de contribuição. A margem de contribuição considera receita bruta menos pagamentos de fornecedores e taxas financeiras. Assim, o fornecedor não é contado duas vezes. A inteligência preditiva projeta o mês usando dias úteis de venda, de segunda a sexta.
          </p>
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
    if (pagina === 'relatorios') return TelaRelatorios()
    if (pagina === 'ponto-equilibrio') return TelaPontoEquilibrio()
    if (pagina === 'clientes') return TelaClientes()
    if (pagina === 'vendas') return TelaVendas()
    if (pagina === 'pendencias') return TelaPendencias()
    if (pagina === 'cobrancas') return TelaCobrancas()
    if (pagina === 'pagamentos') return TelaPagamentos()
    if (pagina === 'produtos') return TelaProdutos()
    if (pagina === 'produtos-controle') return TelaProdutosControle()
    if (pagina === 'fornecedores') return TelaFornecedores()
    if (pagina === 'pedidos-fornecedor') return TelaPedidosFornecedor()
    if (pagina === 'despesas') return TelaDespesas()
    if (pagina === 'delivery') return TelaDelivery()
    if (pagina === 'roteiro-vendas') return TelaRoteiroVendas()
    if (pagina === 'taxas') return TelaTaxas()

    return TelaPainel()
  }

  return (
    <div className="min-h-screen bg-[#15110f] text-white overflow-x-hidden">
      <header className="mini-mobile-topbar lg:hidden">
        <div className="mini-mobile-brand">
          <p>Sistema</p>
          <h1>Queijos Serra da Canastra</h1>
          <span>Mini ERP Premium</span>
        </div>

        <button
          type="button"
          onClick={() => setMenuMobileAberto(true)}
          className="mini-mobile-menu-button"
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>

      {menuMobileAberto && (
        <div className="mini-mobile-layer lg:hidden">
          <button
            type="button"
            className="mini-mobile-backdrop"
            onClick={() => setMenuMobileAberto(false)}
            aria-label="Fechar menu"
          />

          <aside className="mini-mobile-drawer">
            <div className="mini-mobile-drawer-head">
              <div>
                <p>Sistema</p>
                <h2>Menu</h2>
                <span>Mini ERP Premium</span>
              </div>

              <button
                type="button"
                onClick={() => setMenuMobileAberto(false)}
                className="mini-mobile-close"
                aria-label="Fechar menu"
              >
                ×
              </button>
            </div>

            <nav className="mini-mobile-nav">
              {itensMenu
                .filter((item) => item.id !== 'roteiro-vendas')
                .flatMap((item) => {
                  const botaoAtual = botaoMenuMobile(item)
                  if (item.id !== 'delivery') return [botaoAtual]

                  return [
                    botaoAtual,
                    botaoMenuMobile({
                      id: 'roteiro-vendas',
                      icone: '📍',
                      texto: 'Locais e Clientes',
                    }),
                  ]
                })}
            </nav>
          </aside>
        </div>
      )}

      {modalDeliveryVenda.aberto && (() => {
        const valorTotalModal = Number(modalDeliveryVenda.item?.valor_total || 0)
        const resumoModal = calcularResumoPagamentosDelivery(modalDeliveryVenda.pagamentos, valorTotalModal)
        const saldoEmAberto = resumoModal.saldoRestante > 0.005

        return (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4">
            <div className="delivery-finance-modal w-full max-w-[680px] rounded-[28px] border border-orange-950 bg-[#120f0d] p-6 shadow-2xl">
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[4px] text-orange-400 mb-2">Delivery</p>
                <h2 className="text-2xl font-bold">Entregar e fechar venda</h2>
                <p className="text-sm text-zinc-500 mt-2">
                  Cliente: {modalDeliveryVenda.item?.clientes?.nome || 'Cliente não informado'}
                </p>
                <p className="text-sm text-green-300 mt-1">
                  Valor da entrega: {moeda(valorTotalModal)}
                </p>
              </div>

              <div className="delivery-finance-summary grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
                <div>
                  <span>Recebido</span>
                  <strong className="text-green-300">{moeda(resumoModal.totalRecebido)}</strong>
                </div>
                <div>
                  <span>Saldo</span>
                  <strong className={resumoModal.saldoRestante > 0.005 ? 'text-orange-300' : 'text-green-300'}>
                    {moeda(resumoModal.saldoRestante)}
                  </strong>
                </div>
                <div>
                  <span>Taxas</span>
                  <strong className="text-red-300">{moeda(resumoModal.taxaTotal)}</strong>
                </div>
                <div>
                  <span>Líquido</span>
                  <strong className="text-green-300">{moeda(valorTotalModal - resumoModal.taxaTotal)}</strong>
                </div>
                <div>
                  <span>Resultado</span>
                  <strong className={resumoModal.statusFinal === 'PAGO' ? 'text-green-300' : resumoModal.statusFinal === 'PARCIAL' ? 'text-orange-300' : 'text-red-300'}>
                    {resumoModal.statusFinal}
                  </strong>
                </div>
              </div>

              <div className="delivery-payments-box mb-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold">Pagamentos recebidos</h3>
                    <p className="text-xs text-zinc-500 mt-1">Deixe zerado para lançar tudo como Em aberto.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setModalDeliveryVenda({
                        ...modalDeliveryVenda,
                        pagamentos: [
                          ...(modalDeliveryVenda.pagamentos || []),
                          { forma_pagamento: 'Pix', valor: '' },
                        ],
                      })
                    }
                    className="delivery-add-payment-button rounded-2xl bg-zinc-800 px-4 py-3 text-sm font-semibold hover:bg-zinc-700"
                  >
                    + Pagamento
                  </button>
                </div>

                <div className="grid gap-3">
                  {(modalDeliveryVenda.pagamentos || []).map((pagamento, index) => {
                    const taxaPagamento = buscarTaxaPorFormaPagamento(pagamento.forma_pagamento)
                    const valorPagamento = numero(pagamento.valor)
                    const percentualPagamento = Number(taxaPagamento?.taxa_percentual || 0)
                    const valorTaxaPagamento = valorPagamento * (percentualPagamento / 100)
                    const pagamentoEmAberto = chaveFormaPagamento(pagamento.forma_pagamento || '').includes('emaberto') || chaveFormaPagamento(pagamento.forma_pagamento || '').includes('fiado')

                    return (
                      <div key={`pagamento-delivery-${index}`} className="delivery-payment-row grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr_auto] gap-3">
                        <select
                          value={pagamento.forma_pagamento}
                          onChange={(e) => {
                            const proximosPagamentos = [...(modalDeliveryVenda.pagamentos || [])]
                            const chaveNovaForma = chaveFormaPagamento(e.target.value)
                            proximosPagamentos[index] = {
                              ...proximosPagamentos[index],
                              forma_pagamento: e.target.value,
                              valor: chaveNovaForma.includes('emaberto') || chaveNovaForma.includes('fiado') ? '' : proximosPagamentos[index].valor,
                            }
                            setModalDeliveryVenda({
                              ...modalDeliveryVenda,
                              pagamentos: chaveNovaForma.includes('emaberto') || chaveNovaForma.includes('fiado')
                                ? [proximosPagamentos[index]]
                                : proximosPagamentos,
                            })
                          }}
                          className="rounded-2xl border border-zinc-800 bg-black p-4"
                        >
                          {formasPagamentoDelivery().map((forma) => (
                            <option key={forma} value={forma}>{forma}</option>
                          ))}
                        </select>

                        <input
                          type="text"
                          inputMode="decimal"
                          value={pagamentoEmAberto ? 'R$ 0,00' : pagamento.valor}
                          disabled={pagamentoEmAberto}
                          onChange={(e) => {
                            const proximosPagamentos = [...(modalDeliveryVenda.pagamentos || [])]
                            const valorDigitado = String(e.target.value || '')
                              .replace(/R\$\s?/g, '')
                              .replace(/[^0-9,]/g, '')
                              .replace(/(,.*),/g, '$1')

                            proximosPagamentos[index] = {
                              ...proximosPagamentos[index],
                              valor: valorDigitado,
                            }
                            setModalDeliveryVenda({ ...modalDeliveryVenda, pagamentos: proximosPagamentos })
                          }}
                          onBlur={(e) => {
                            const proximosPagamentos = [...(modalDeliveryVenda.pagamentos || [])]
                            proximosPagamentos[index] = {
                              ...proximosPagamentos[index],
                              valor: moedaInput(e.target.value),
                            }
                            setModalDeliveryVenda({ ...modalDeliveryVenda, pagamentos: proximosPagamentos })
                          }}
                          onFocus={(e) => {
                            const proximosPagamentos = [...(modalDeliveryVenda.pagamentos || [])]
                            const valorAtual = numero(proximosPagamentos[index]?.valor)

                            proximosPagamentos[index] = {
                              ...proximosPagamentos[index],
                              valor: valorAtual > 0 ? valorAtual.toFixed(2).replace('.', ',') : '',
                            }
                            setModalDeliveryVenda({ ...modalDeliveryVenda, pagamentos: proximosPagamentos })
                            setTimeout(() => e.target.select(), 0)
                          }}
                          placeholder="R$ 0,00"
                          className="rounded-2xl border border-zinc-800 bg-black p-4 disabled:cursor-not-allowed disabled:opacity-70"
                        />

                        <div className="delivery-payment-actions flex items-center gap-2">
                          <span className="delivery-payment-tax text-xs text-zinc-500">
                            {pagamentoEmAberto ? (
                              <>
                                <small>Fiado</small>
                                <strong>{moeda(0)}</strong>
                              </>
                            ) : (
                              <>
                                <small>Taxa {percentual(percentualPagamento)}</small>
                                <strong>{moeda(valorTaxaPagamento)}</strong>
                              </>
                            )}
                          </span>
                          {(modalDeliveryVenda.pagamentos || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const proximosPagamentos = (modalDeliveryVenda.pagamentos || []).filter((_, indice) => indice !== index)
                                setModalDeliveryVenda({ ...modalDeliveryVenda, pagamentos: proximosPagamentos })
                              }}
                              className="rounded-xl bg-red-900 px-3 py-2 text-xs font-semibold hover:bg-red-800"
                            >
                              Remover
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {saldoEmAberto && (
                <div className="mb-5 rounded-2xl border border-orange-950 bg-black p-4">
                  <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                    <div className="flex-1">
                      <label className="block text-xs uppercase text-zinc-500 mb-2">
                        Data de cobrança, opcional
                      </label>

                      <input
                        type="date"
                        onClick={abrirCalendario}
                        onFocus={abrirCalendario}
                        value={modalDeliveryVenda.vencimento}
                        onChange={(e) =>
                          setModalDeliveryVenda({
                            ...modalDeliveryVenda,
                            vencimento: e.target.value,
                          })
                        }
                        className="w-full rounded-2xl border border-zinc-800 bg-black p-4"
                      />
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 lg:min-w-[190px]">
                      <p className="text-xs uppercase text-zinc-500">Saldo para cobrança</p>
                      <p className="mt-1 text-xl font-bold text-orange-300">{moeda(resumoModal.saldoRestante)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    Este saldo será enviado automaticamente para Pendências e Cobranças.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={converterDeliveryEmVenda}
                  className="flex-1 rounded-2xl bg-green-800 p-4 font-semibold hover:bg-green-700"
                >
                  Confirmar e criar venda
                </button>

                <button
                  type="button"
                  onClick={fecharModalDeliveryVenda}
                  className="flex-1 rounded-2xl bg-zinc-800 p-4 font-semibold hover:bg-zinc-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )
      })()}


      <div className="mini-shell w-full max-w-full overflow-x-hidden flex flex-col lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="mini-desktop-sidebar bg-black border-b lg:border-b-0 lg:border-r border-orange-950 p-4 lg:p-6 lg:min-h-screen lg:max-h-screen lg:overflow-y-auto">
          <div className="mb-10">
            <p className="text-orange-400 uppercase tracking-[6px] text-xs mb-4">Sistema</p>

            <h1 className="mini-sidebar-brand-title text-4xl font-bold leading-tight">
              Queijos Serra
              <br />
              da Canastra
            </h1>

            <p className="text-zinc-500 mt-6">Mini ERP Premium</p>
          </div>

          <nav className="space-y-3 overflow-y-auto max-h-[75vh] pr-2">
            {itensMenu.map((item) => botaoMenu(item.id, item.icone, item.texto))}
          </nav>
        </aside>

        <div className="mini-bottom-nav lg:hidden">
          <button
            type="button"
            onClick={() => setPagina('painel')}
            className={pagina === 'painel' ? 'mini-bottom-active' : ''}
          >
            Painel
          </button>

          <button
            type="button"
            onClick={() => setPagina('vendas')}
            className={pagina === 'vendas' ? 'mini-bottom-active' : ''}
          >
            Vendas
          </button>

          <button
            type="button"
            onClick={() => setPagina('delivery')}
            className={pagina === 'delivery' ? 'mini-bottom-active' : ''}
          >
            Delivery
          </button>

          <button
            type="button"
            onClick={() => setPagina('cobrancas')}
            className={pagina === 'cobrancas' ? 'mini-bottom-active' : ''}
          >
            Cobranças
          </button>
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










