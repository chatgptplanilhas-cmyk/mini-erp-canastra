import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'

const APP_VERSION = '2026.06.24.03'
const APP_VERSION_LABEL = `Mini ERP v${APP_VERSION}`
const PWA_SPLASH_DURATION_MS = 1600
const TIME_ZONE_BRASIL = 'America/Sao_Paulo'

const MINI_ERP_HIGHEST_VERSION_KEY = 'miniErpHighestAcceptedVersion'
const MINI_ERP_DOWNGRADE_BLOCK_KEY = 'miniErpDowngradeBlocked'
const MINI_ERP_DIAGNOSTICO_KEY = 'miniErpDiagnosticoHistorico'
const MENUS_ACOES_SELECTOR = [
  'details.delivery-menu-grid-final',
  'details.mini-delivery-acoes-menu',
  'details.mini-cobrancas-menu',
  'details.mini-clientes-menu',
  'details.produto-acoes-menu',
].join(',')

function normalizarVersao(valor) {
  return String(valor || '')
    .trim()
    .replace(/[^0-9.]/g, '')
}

function compararVersoes(a, b) {
  const partesA = normalizarVersao(a).split('.').map((parte) => Number(parte) || 0)
  const partesB = normalizarVersao(b).split('.').map((parte) => Number(parte) || 0)
  const tamanho = Math.max(partesA.length, partesB.length)

  for (let indice = 0; indice < tamanho; indice += 1) {
    const numeroA = partesA[indice] || 0
    const numeroB = partesB[indice] || 0

    if (numeroA > numeroB) return 1
    if (numeroA < numeroB) return -1
  }

  return 0
}

function lerMaiorVersaoAceita() {
  try {
    return window.localStorage.getItem(MINI_ERP_HIGHEST_VERSION_KEY) || APP_VERSION
  } catch (erro) {
    return APP_VERSION
  }
}

function registrarMaiorVersaoAceita(versao) {
  try {
    const versaoLimpa = normalizarVersao(versao)
    const maiorAtual = lerMaiorVersaoAceita()

    if (!versaoLimpa) return maiorAtual

    if (compararVersoes(versaoLimpa, maiorAtual) >= 0) {
      window.localStorage.setItem(MINI_ERP_HIGHEST_VERSION_KEY, versaoLimpa)
      window.localStorage.removeItem(MINI_ERP_DOWNGRADE_BLOCK_KEY)
      return versaoLimpa
    }

    return maiorAtual
  } catch (erro) {
    return APP_VERSION
  }
}

function registrarTentativaDowngrade({ versaoAtual, versaoPublicada, maiorVersao }) {
  try {
    window.localStorage.setItem(
      MINI_ERP_DOWNGRADE_BLOCK_KEY,
      JSON.stringify({
        versaoAtual,
        versaoPublicada,
        maiorVersao,
        bloqueadoEm: new Date().toISOString(),
      }),
    )
  } catch (erro) {
    console.warn('Não foi possível registrar tentativa de downgrade.', erro)
  }
}

function existeDowngrade({ versaoAtual, versaoPublicada, maiorVersao }) {
  if (compararVersoes(versaoAtual, maiorVersao) < 0) return true
  if (compararVersoes(versaoPublicada, maiorVersao) < 0) return true
  return false
}


function dataHoraDiagnostico(valor = new Date()) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE_BRASIL,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(valor))
  } catch (erro) {
    return new Date(valor).toLocaleString('pt-BR')
  }
}

function lerHistoricoDiagnostico() {
  try {
    const bruto = window.localStorage.getItem(MINI_ERP_DIAGNOSTICO_KEY)
    const lista = JSON.parse(bruto || '[]')
    return Array.isArray(lista) ? lista.slice(0, 10) : []
  } catch (erro) {
    return []
  }
}

function salvarHistoricoDiagnostico(registro) {
  try {
    const lista = [registro, ...lerHistoricoDiagnostico()].slice(0, 10)
    window.localStorage.setItem(MINI_ERP_DIAGNOSTICO_KEY, JSON.stringify(lista))
    return lista
  } catch (erro) {
    return [registro]
  }
}

function detectarAmbienteMiniErp() {
  try {
    const host = window.location.hostname || ''
    if (host.includes('localhost') || host.includes('127.0.0.1')) return 'local'
    if (host.includes('vercel.app') || host.includes('mini-erp-canastra')) return 'produção'
    return host || 'desconhecido'
  } catch (erro) {
    return 'desconhecido'
  }
}

function detectarNavegadorMiniErp() {
  try {
    const agente = navigator.userAgent || ''
    if (/Edg\//.test(agente)) return 'Microsoft Edge'
    if (/Chrome\//.test(agente) && /Android/.test(agente)) return 'Chrome Android'
    if (/Chrome\//.test(agente)) return 'Chrome'
    if (/Safari\//.test(agente) && /Mobile/.test(agente)) return 'Safari Mobile'
    if (/Safari\//.test(agente)) return 'Safari'
    return agente.slice(0, 80) || 'não identificado'
  } catch (erro) {
    return 'não identificado'
  }
}

function detectarSistemaMiniErp() {
  try {
    const agente = navigator.userAgent || ''
    if (/Android/.test(agente)) return 'Android'
    if (/iPhone|iPad|iPod/.test(agente)) return 'iOS'
    if (/Windows/.test(agente)) return 'Windows'
    if (/Mac OS/.test(agente)) return 'macOS'
    return navigator.platform || 'não identificado'
  } catch (erro) {
    return 'não identificado'
  }
}

const CHAVE_CONFIG_PIX_RAPIDO = 'miniErpPixRapidoConfigV1'
const CONFIG_PIX_RAPIDO_INICIAL = {
  tipoChave: 'Aleatoria',
  chave: '4e84083c-370d-4cf1-8c39-fcdf0562bcbd',
  instituicao: 'CloudWalk IP LTDA',
}
const DESCRICAO_PIX_RAPIDO_PADRAO = 'QUEIJOS CANASTRA'

function normalizarConfigPixRapido(config = {}) {
  return {
    tipoChave: String(config.tipoChave || CONFIG_PIX_RAPIDO_INICIAL.tipoChave).trim() || CONFIG_PIX_RAPIDO_INICIAL.tipoChave,
    chave: String(config.chave || CONFIG_PIX_RAPIDO_INICIAL.chave).trim() || CONFIG_PIX_RAPIDO_INICIAL.chave,
    instituicao: String(config.instituicao || '').trim(),
  }
}

function carregarConfigPixRapidoInicial() {
  try {
    const salvo = window.localStorage.getItem(CHAVE_CONFIG_PIX_RAPIDO)
    return normalizarConfigPixRapido(salvo ? JSON.parse(salvo) : CONFIG_PIX_RAPIDO_INICIAL)
  } catch (erro) {
    return { ...CONFIG_PIX_RAPIDO_INICIAL }
  }
}

function removerAcentosPix(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function limitarTextoPix(texto, tamanho) {
  return removerAcentosPix(texto)
    .toUpperCase()
    .replace(/[^A-Z0-9 $%*+\-./:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, tamanho)
}

function campoPix(id, valor) {
  const texto = String(valor ?? '')
  return `${id}${String(texto.length).padStart(2, '0')}${texto}`
}

function crc16Pix(payload) {
  let crc = 0xffff

  for (let indice = 0; indice < payload.length; indice += 1) {
    crc ^= payload.charCodeAt(indice) << 8

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function montarCodigoPixCopiaCola({ chave, valor, recebedor = 'Delber Vilaca', instituicao = '' }) {
  const valorPix = Number(valor || 0).toFixed(2)
  const nomeRecebedor = limitarTextoPix(recebedor, 25) || 'DELBERVILACA'
  const cidade = limitarTextoPix('CANASTRA', 15)
  const descricao = limitarTextoPix(DESCRICAO_PIX_RAPIDO_PADRAO, 25) || DESCRICAO_PIX_RAPIDO_PADRAO
  const infoConta = [
    campoPix('00', 'br.gov.bcb.pix'),
    campoPix('01', String(chave || '').trim()),
    campoPix('02', descricao),
  ].join('')
  const dadosAdicionais = campoPix('05', 'PIXERP')
  const payloadSemCrc = [
    campoPix('00', '01'),
    campoPix('26', infoConta),
    campoPix('52', '0000'),
    campoPix('53', '986'),
    campoPix('54', valorPix),
    campoPix('58', 'BR'),
    campoPix('59', nomeRecebedor),
    campoPix('60', cidade),
    campoPix('62', dadosAdicionais),
    '6304',
  ].join('')

  return `${payloadSemCrc}${crc16Pix(payloadSemCrc)}`
}

function urlQrCodePix(codigoPix) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(codigoPix)}`
}


export default function App() {
  const [mostrarAberturaPwa, setMostrarAberturaPwa] = useState(true)
  const [pagina, setPagina] = useState('painel')
  const [resumoDiaAberto, setResumoDiaAberto] = useState(false)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [clienteExpandidoId, setClienteExpandidoId] = useState(null)
  const [deliveryExpandidoId, setDeliveryExpandidoId] = useState(null)
  const [vendaExpandidaId, setVendaExpandidaId] = useState(null)
  const [modalVendaAberto, setModalVendaAberto] = useState(false)
  const buscaClienteVendaInputRef = useRef(null)
  const clienteNomeInputRef = useRef(null)
  const reconhecimentoClienteRef = useRef(null)
  const textoClienteAcumuladoRef = useRef('')
  const deveAplicarClienteNoFimRef = useRef(false)
  const [modalConferenciaProdutosAberto, setModalConferenciaProdutosAberto] = useState(false)
  const [conferenciaProdutoExpandido, setConferenciaProdutoExpandido] = useState(null)
  const resolverFormaPagamentoRef = useRef(null)
  const toastTimerRef = useRef(null)
  const [modalFormaPagamento, setModalFormaPagamento] = useState({
    aberto: false,
    opcoes: [],
    busca: '',
    padrao: 'Pix',
    selecionada: 'Pix',
    valor: '',
  })

  const [modalSelecaoCobrancas, setModalSelecaoCobrancas] = useState({
    aberto: false,
    cliente: null,
    itens: [],
    selecionados: [],
  })
  const [configPixRapido, setConfigPixRapido] = useState(() => carregarConfigPixRapidoInicial())
  const [valorPixRapido, setValorPixRapido] = useState('')
  const [pixRapidoGerado, setPixRapidoGerado] = useState(null)
  const [modalPixRapidoQrAberto, setModalPixRapidoQrAberto] = useState(false)
  const [modalPixRapidoPreVenda, setModalPixRapidoPreVenda] = useState({
    aberto: false,
    cliente: '',
    referencia: '',
    observacao: '',
  })

  const [novaVersaoDisponivel, setNovaVersaoDisponivel] = useState(false)
  const [versaoPublicada, setVersaoPublicada] = useState(APP_VERSION)
  const [downgradeBloqueado, setDowngradeBloqueado] = useState(false)
  const [sincronizandoDados, setSincronizandoDados] = useState(false)
  const [ultimaAtualizacaoDados, setUltimaAtualizacaoDados] = useState(null)
  const [erroSincronizacaoDados, setErroSincronizacaoDados] = useState('')
  const sincronizacaoDadosRef = useRef(false)
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))
  const [filaOffline, setFilaOffline] = useState([])
  const [sincronizandoOffline, setSincronizandoOffline] = useState(false)
  const [ultimaAtualizacaoOffline, setUltimaAtualizacaoOffline] = useState(null)
  const [formOfflineRapido, setFormOfflineRapido] = useState({
    tipo: 'prevenda',
    cliente: '',
    referencia: '',
    itens: '',
    valor: '',
    observacao: '',
  })
  const [historicoDiagnostico, setHistoricoDiagnostico] = useState(() => lerHistoricoDiagnostico())
  const [diagnosticoAtual, setDiagnosticoAtual] = useState(null)
  const [diagnosticoCopiado, setDiagnosticoCopiado] = useState(false)

  useEffect(() => {
    const tempo = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ? 900
      : PWA_SPLASH_DURATION_MS
    const timer = window.setTimeout(() => setMostrarAberturaPwa(false), tempo)
    return () => window.clearTimeout(timer)
  }, [])

  function registrarDiagnosticoSistema({ versaoRemota = versaoPublicada, status = 'OK', erro = '' } = {}) {
    const maiorVersao = lerMaiorVersaoAceita()
    const registro = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      dataIso: new Date().toISOString(),
      dataLocal: dataHoraDiagnostico(),
      versaoAplicativo: APP_VERSION,
      versaoPublicada: versaoRemota || versaoPublicada || APP_VERSION,
      maiorVersaoAceita: maiorVersao,
      status,
      erro,
      online: typeof navigator === 'undefined' ? true : navigator.onLine,
      serviceWorker: typeof navigator !== 'undefined' && !!navigator.serviceWorker ? 'disponível' : 'indisponível',
      serviceWorkerControlando: typeof navigator !== 'undefined' && !!navigator.serviceWorker?.controller,
      url: typeof window === 'undefined' ? '' : window.location.href,
      ambiente: detectarAmbienteMiniErp(),
      navegador: detectarNavegadorMiniErp(),
      sistema: detectarSistemaMiniErp(),
    }

    const lista = salvarHistoricoDiagnostico(registro)
    setHistoricoDiagnostico(lista)
    setDiagnosticoAtual(registro)
    return registro
  }

  useEffect(() => {
    const maiorVersao = registrarMaiorVersaoAceita(APP_VERSION)
    const precisaBloquear = compararVersoes(APP_VERSION, maiorVersao) < 0
    setDowngradeBloqueado(precisaBloquear)

    if (precisaBloquear) {
      registrarTentativaDowngrade({
        versaoAtual: APP_VERSION,
        versaoPublicada: versaoPublicada || APP_VERSION,
        maiorVersao,
      })
    }
  }, [versaoPublicada])

  function fecharTecladoMobile() {
    try {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur()
      }
    } catch (erro) {
      console.error(erro)
    }
  }

  async function verificarVersaoPublicada() {
    try {
      const resposta = await fetch(`/version.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      })

      if (!resposta.ok) return

      const dados = await resposta.json()
      const versaoRemota = String(dados?.version || '').trim()

      if (!versaoRemota) return

      const maiorVersao = registrarMaiorVersaoAceita(APP_VERSION)
      const tentativaDowngrade = existeDowngrade({
        versaoAtual: APP_VERSION,
        versaoPublicada: versaoRemota,
        maiorVersao,
      })

      setVersaoPublicada(versaoRemota)
      window.localStorage.setItem('miniErpVersionRemote', versaoRemota)
      registrarDiagnosticoSistema({
        versaoRemota,
        status: tentativaDowngrade ? 'DIVERGÊNCIA' : 'OK',
      })

      if (tentativaDowngrade) {
        registrarTentativaDowngrade({
          versaoAtual: APP_VERSION,
          versaoPublicada: versaoRemota,
          maiorVersao,
        })
        setDowngradeBloqueado(true)
        setNovaVersaoDisponivel(false)
        return
      }

      setDowngradeBloqueado(false)

      if (compararVersoes(versaoRemota, APP_VERSION) > 0) {
        registrarMaiorVersaoAceita(versaoRemota)
        setNovaVersaoDisponivel(true)
      } else {
        setNovaVersaoDisponivel(false)
      }
    } catch (erro) {
      registrarDiagnosticoSistema({
        versaoRemota: versaoPublicada || APP_VERSION,
        status: 'ERRO',
        erro: erro?.message || 'Não foi possível verificar a versão publicada.',
      })
      console.error('Não foi possível verificar a versão publicada.', erro)
    }
  }

  async function atualizarSistema() {
    try {
      window.localStorage.setItem('miniErpLastManualRefresh', new Date().toISOString())

      if ('serviceWorker' in navigator) {
        const registros = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registros.map((registro) => registro.unregister()))
      }

      if ('caches' in window) {
        const nomes = await window.caches.keys()
        await Promise.all(nomes.map((nome) => window.caches.delete(nome)))
      }
    } catch (erro) {
      console.error('Falha ao limpar cache local.', erro)
    } finally {
      const url = new URL(window.location.href)
      url.searchParams.set('v', `${versaoPublicada || APP_VERSION}-${Date.now()}`)
      window.location.replace(url.toString())
    }
  }

  useEffect(() => {
    verificarVersaoPublicada()

    const intervalo = window.setInterval(verificarVersaoPublicada, 30000)

    function verificarAoVoltarParaTela() {
      if (!document.hidden) {
        verificarVersaoPublicada()
      }
    }

    window.addEventListener('focus', verificarVersaoPublicada)
    document.addEventListener('visibilitychange', verificarAoVoltarParaTela)
    window.addEventListener('online', verificarVersaoPublicada)

    return () => {
      window.clearInterval(intervalo)
      window.removeEventListener('focus', verificarVersaoPublicada)
      document.removeEventListener('visibilitychange', verificarAoVoltarParaTela)
      window.removeEventListener('online', verificarVersaoPublicada)
    }
  }, [])

  useEffect(() => {
    carregarCacheOffline()
    setFilaOffline(lerJsonLocal(CHAVE_FILA_OFFLINE, []) || [])

    function atualizarStatusOnline() {
      const conectado = navigator.onLine
      setOnline(conectado)
      if (conectado) {
        sincronizarFilaOffline()
      }
    }

    window.addEventListener('online', atualizarStatusOnline)
    window.addEventListener('offline', atualizarStatusOnline)

    return () => {
      window.removeEventListener('online', atualizarStatusOnline)
      window.removeEventListener('offline', atualizarStatusOnline)
    }
  }, [])

  const [toast, setToast] = useState({
    visivel: false,
    tipo: 'sucesso',
    mensagem: '',
  })

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
  const [paginaClientes, setPaginaClientes] = useState(1)
  const [buscaVendas, setBuscaVendas] = useState('')
  const [paginaVendas, setPaginaVendas] = useState(1)
  const [buscaClienteVenda, setBuscaClienteVenda] = useState('')
  const [buscaPendencias, setBuscaPendencias] = useState('')
  const [buscaPagamentos, setBuscaPagamentos] = useState('')
  const [paginaPagamentos, setPaginaPagamentos] = useState(1)
  const [buscaProdutos, setBuscaProdutos] = useState('')
  const [mostrarProdutosArquivados, setMostrarProdutosArquivados] = useState(false)
  const [buscaProdutosControle, setBuscaProdutosControle] = useState('')
  const [paginaResumoProdutosControle, setPaginaResumoProdutosControle] = useState(1)
  const [paginaItensProdutosControle, setPaginaItensProdutosControle] = useState(1)
  const [buscaProdutoLancamento, setBuscaProdutoLancamento] = useState('')
  const [dataControleProdutos, setDataControleProdutos] = useState(dataHoje())
  const [periodoLancamentosProdutos, setPeriodoLancamentosProdutos] = useState('mesAtual')
  const [buscaDespesas, setBuscaDespesas] = useState('')
  const [periodoCardsDespesas, setPeriodoCardsDespesas] = useState('mesAtual')
  const [periodoCardsPainel, setPeriodoCardsPainel] = useState('mesAtual')
  const [paginaDespesas, setPaginaDespesas] = useState(1)
  const [buscaDelivery, setBuscaDelivery] = useState('')
  const [buscaCobrancas, setBuscaCobrancas] = useState('')
  const [filtroDeliveryData, setFiltroDeliveryData] = useState('')
  const [filtroCobrancasAlerta, setFiltroCobrancasAlerta] = useState('todos')
  const [filtroPeriodoCobrancas, setFiltroPeriodoCobrancas] = useState('todos')
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

  const [caixaAtual, setCaixaAtual] = useState(0)

  const [formCaixa, setFormCaixa] = useState({
    tipo: 'Entrada',
    valor: '',
    observacao: '',
  })

  const [historicoCaixa, setHistoricoCaixa] = useState(() => {
    try {
      const salvo = window.localStorage.getItem('miniErpHistoricoCaixa')
      return salvo ? JSON.parse(salvo) : []
    } catch (erro) {
      return []
    }
  })

  const [modalDeliveryVenda, setModalDeliveryVenda] = useState({
    aberto: false,
    item: null,
    pagamentos: [pagamentoDeliveryInicial],
    vencimento: '',
  })
  const [modalEdicaoDelivery, setModalEdicaoDelivery] = useState({ aberto: false, item: null })


  const [modalEdicaoPendencia, setModalEdicaoPendencia] = useState({
    aberto: false,
    pendencia: null,
    saldo: '',
    vencimento: '',
    status: 'EM ABERTO',
  })

  const [modalEdicaoCliente, setModalEdicaoCliente] = useState({
    aberto: false,
    cliente: null,
    nome: '',
    referencia: '',
    observacao: '',
    telefone: '',
    ativo: true,
  })
  const [ouvindoClienteVoz, setOuvindoClienteVoz] = useState(false)
  const [textoClienteVoz, setTextoClienteVoz] = useState('')
  const [avisoClienteVoz, setAvisoClienteVoz] = useState('')

  const [clienteModalOrigemVenda, setClienteModalOrigemVenda] = useState(false)
  const [clienteModalOrigemDelivery, setClienteModalOrigemDelivery] = useState(false)

  const [modalEdicaoProduto, setModalEdicaoProduto] = useState({
    aberto: false,
    produto: null,
    nome: '',
    fornecedor_id: '',
    preco_custo: '',
    preco_venda: '',
    estoque: '',
    ativo: true,
  })

  function exibirToast(mensagem, tipo = 'sucesso') {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }

    setToast({
      visivel: true,
      tipo,
      mensagem,
    })

    toastTimerRef.current = setTimeout(() => {
      setToast((atual) => ({ ...atual, visivel: false }))
      toastTimerRef.current = null
    }, 2800)
  }



  const CHAVE_CACHE_OFFLINE = 'miniErpOfflineCacheV1'
  const CHAVE_FILA_OFFLINE = 'miniErpOfflineQueueV1'

  function lerJsonLocal(chave, fallback) {
    try {
      const bruto = window.localStorage.getItem(chave)
      return bruto ? JSON.parse(bruto) : fallback
    } catch (erro) {
      console.error(erro)
      return fallback
    }
  }

  function salvarJsonLocal(chave, valor) {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor))
    } catch (erro) {
      console.error('Falha ao salvar cache local.', erro)
    }
  }

  function atualizarCacheOffline(parcial) {
    const cacheAtual = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
    const proximo = {
      ...cacheAtual,
      ...parcial,
      atualizadoEm: new Date().toISOString(),
    }
    salvarJsonLocal(CHAVE_CACHE_OFFLINE, proximo)
    setUltimaAtualizacaoOffline(proximo.atualizadoEm)
    return proximo
  }

  function carregarCacheOffline() {
    const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
    if (Array.isArray(cache.clientes)) setClientes(cache.clientes)
    if (Array.isArray(cache.produtos)) setProdutos(cache.produtos)
    if (Array.isArray(cache.preVendas)) setPreVendas(cache.preVendas)
    if (Array.isArray(cache.deliveries)) setDeliveries(cache.deliveries)
    if (Array.isArray(cache.pendencias)) setPendencias(cache.pendencias)
    if (cache.atualizadoEm) setUltimaAtualizacaoOffline(cache.atualizadoEm)
  }

  function salvarFilaOffline(proximaFila) {
    salvarJsonLocal(CHAVE_FILA_OFFLINE, proximaFila)
    setFilaOffline(proximaFila)
  }

  function adicionarFilaOffline(item) {
    const filaAtual = lerJsonLocal(CHAVE_FILA_OFFLINE, []) || []
    const proximoItem = {
      idLocal: `offline-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      criadoEm: new Date().toISOString(),
      status: 'Pendente',
      ...item,
    }
    const proximaFila = [proximoItem, ...filaAtual]
    salvarFilaOffline(proximaFila)
    return proximoItem
  }

  function textoStatusConexao() {
    if (!online) return 'Offline, usando dados salvos neste aparelho'
    if (sincronizandoOffline) return 'Sincronizando registros offline...'
    if (filaOffline.length > 0) return `${filaOffline.length} registro${filaOffline.length === 1 ? '' : 's'} offline pendente${filaOffline.length === 1 ? '' : 's'}`
    return 'Online, dados sincronizados'
  }

  function textoCacheOffline() {
    if (!ultimaAtualizacaoOffline) return 'Cache offline ainda não preparado'
    return `Dados offline preparados em ${formatarDataHoraBrasil(ultimaAtualizacaoOffline)}`
  }

  function registrarOfflineRapido(e) {
    e?.preventDefault?.()

    const cliente = String(formOfflineRapido.cliente || '').trim()
    const valor = numero(formOfflineRapido.valor)

    if (!cliente) {
      exibirToast('Informe o cliente para salvar offline.', 'erro')
      return
    }

    const registro = adicionarFilaOffline({
      tipo: formOfflineRapido.tipo,
      payload: {
        cliente,
        referencia: String(formOfflineRapido.referencia || '').trim(),
        itensTexto: String(formOfflineRapido.itens || '').trim(),
        valor,
        observacao: String(formOfflineRapido.observacao || '').trim(),
      },
    })

    if (formOfflineRapido.tipo === 'prevenda') {
      const preVendaLocal = {
        id: registro.idLocal,
        cliente,
        referencia: formOfflineRapido.referencia || '',
        itens: formOfflineRapido.itens ? [{ nome: formOfflineRapido.itens, quantidade: 1, valorUnitario: valor, valor }] : [],
        total: valor,
        transcricao: formOfflineRapido.observacao || formOfflineRapido.itens || '',
        status: 'Pendente',
        criadoEm: registro.criadoEm,
        offline: true,
      }
      setPreVendas((lista) => [preVendaLocal, ...(lista || [])])
      atualizarCacheOffline({ preVendas: [preVendaLocal, ...(preVendas || [])] })
    }

    setFormOfflineRapido({ tipo: 'prevenda', cliente: '', referencia: '', itens: '', valor: '', observacao: '' })
    exibirToast('Registro salvo no modo offline.')
  }

  async function sincronizarFilaOffline() {
    if (sincronizandoOffline) return

    if (!navigator.onLine) {
      exibirToast('Sem internet para sincronizar agora.', 'erro')
      return
    }

    const filaAtual = lerJsonLocal(CHAVE_FILA_OFFLINE, []) || []
    if (filaAtual.length === 0) {
      exibirToast('Não há registros offline pendentes.')
      return
    }

    setSincronizandoOffline(true)
    const pendentes = []
    let sincronizados = 0

    for (const item of filaAtual.slice().reverse()) {
      try {
        if (item.tipo === 'prevenda') {
          const payload = {
            cliente_nome: item.payload?.cliente || 'Cliente não informado',
            referencia: item.payload?.referencia || null,
            itens: item.payload?.itensTexto
              ? [{ nome: item.payload.itensTexto, quantidade: 1, valorUnitario: Number(item.payload?.valor || 0), valor: Number(item.payload?.valor || 0) }]
              : [],
            total: Number(item.payload?.valor || 0),
            transcricao: item.payload?.observacao || item.payload?.itensTexto || '',
            status: 'Pendente',
            mensagem_gerada: false,
          }
          const { error } = await supabase.from('prevendas').insert(payload)
          if (error) throw error
          sincronizados += 1
          continue
        }

        if (item.tipo === 'delivery-status' && item.payload?.id) {
          const { error } = await supabase.from('delivery').update({ status: item.payload.status || 'Entregue' }).eq('id', item.payload.id)
          if (error) throw error
          sincronizados += 1
          continue
        }

        if (item.tipo === 'cobranca-paga' && item.payload?.id) {
          const { error } = await supabase.from('pendencias').update({ saldo_restante: 0, status: 'PAGO' }).eq('id', item.payload.id)
          if (error) throw error
          sincronizados += 1
          continue
        }

        pendentes.push(item)
      } catch (erro) {
        console.error('Falha ao sincronizar item offline.', erro)
        pendentes.push(item)
      }
    }

    salvarFilaOffline(pendentes.reverse())
    setSincronizandoOffline(false)

    if (sincronizados > 0) {
      await sincronizarDados({ manual: true })
      exibirToast(`${sincronizados} registro${sincronizados === 1 ? '' : 's'} offline sincronizado${sincronizados === 1 ? '' : 's'}.`)
    } else {
      exibirToast('Nenhum registro offline foi sincronizado.', 'erro')
    }
  }

  function registrarEntregaOffline(item, status = 'Entregue') {
    if (!item?.id) return
    adicionarFilaOffline({ tipo: 'delivery-status', payload: { id: item.id, cliente: item.clientes?.nome || '', status } })
    setDeliveries((lista) => (lista || []).map((delivery) => String(delivery.id) === String(item.id) ? { ...delivery, status, offlinePendente: true } : delivery))
    exibirToast('Entrega marcada offline. Sincronize quando a internet voltar.')
  }

  function registrarCobrancaPagaOffline(pendencia) {
    if (!pendencia?.id) return
    adicionarFilaOffline({
      tipo: 'cobranca-paga',
      payload: {
        id: pendencia.id,
        cliente: pendencia.vendas?.clientes?.nome || 'Cliente não informado',
        valor: Number(pendencia.saldo_restante || 0),
      },
    })
    setPendencias((lista) => (lista || []).map((item) => String(item.id) === String(pendencia.id) ? { ...item, status: 'PAGO', saldo_restante: 0, offlinePendente: true } : item))
    exibirToast('Cobrança marcada offline. Sincronize quando a internet voltar.')
  }

  const [clienteId, setClienteId] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [valorPagoVenda, setValorPagoVenda] = useState('')
  const [dataVenda, setDataVenda] = useState(dataHoje())
  const [taxaSelecionadaId, setTaxaSelecionadaId] = useState('')
  const [status, setStatus] = useState('EM ABERTO')
  const [vencimento, setVencimento] = useState('')
  const [ouvindoVendaVoz, setOuvindoVendaVoz] = useState(false)
  const [textoVendaVoz, setTextoVendaVoz] = useState('')
  const [avisoVendaVoz, setAvisoVendaVoz] = useState('')
  const [clienteAvulsoVendaNome, setClienteAvulsoVendaNome] = useState('')
  const [clienteVozPendente, setClienteVozPendente] = useState({
    aberto: false,
    etapa: 'escolha',
    nome: '',
    candidatos: [],
  })
  const [speechVendaDisponivel] = useState(() => (
    typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  ))
  const reconhecimentoVendaRef = useRef(null)
  const [preVendas, setPreVendas] = useState([])
  const [buscaPreVendas, setBuscaPreVendas] = useState('')
  const [dataFiltroPreVendas, setDataFiltroPreVendas] = useState('')
  const [paginaPreVendas, setPaginaPreVendas] = useState(1)
  const [ouvindoPreVendaVoz, setOuvindoPreVendaVoz] = useState(false)
  const [textoPreVendaVoz, setTextoPreVendaVoz] = useState('')
  const [avisoPreVenda, setAvisoPreVenda] = useState('')
  const [mensagemPreVendaModal, setMensagemPreVendaModal] = useState({ aberto: false, preVendaId: '', texto: '' })
  const [resumoDiaPreVendasAberto, setResumoDiaPreVendasAberto] = useState(false)
  const [preVendaEdicaoModal, setPreVendaEdicaoModal] = useState({ aberto: false, preVenda: null })
  const [preVendaDetalheModal, setPreVendaDetalheModal] = useState({ aberto: false, preVenda: null })
  const [confirmDeletePreVenda, setConfirmDeletePreVenda] = useState(false)
  const [preVendaConvertendoId, setPreVendaConvertendoId] = useState('')
  const [preVendaDeliveryOrigemId, setPreVendaDeliveryOrigemId] = useState('')
  const reconhecimentoPreVendaRef = useRef(null)
  const textoPreVendaAcumuladoRef = useRef('')
  const deveSalvarPreVendaNoFimRef = useRef(false)


  const [dataRelatorioInicio, setDataRelatorioInicio] = useState(inicioMesAtual())
  const [dataRelatorioFim, setDataRelatorioFim] = useState(dataHoje())
  const [dataPontoInicio, setDataPontoInicio] = useState(inicioMesAtual())
  const [dataPontoFim, setDataPontoFim] = useState(dataHoje())
  const [filtroVendasInicio, setFiltroVendasInicio] = useState(inicioMesAtual())
  const [filtroVendasFim, setFiltroVendasFim] = useState(dataHoje())
  const [filtroPagamentosInicio, setFiltroPagamentosInicio] = useState(inicioMesAtual())
  const [filtroPagamentosFim, setFiltroPagamentosFim] = useState(dataHoje())

  useEffect(() => {
    setPaginaPagamentos(1)
  }, [buscaPagamentos, filtroPagamentosInicio, filtroPagamentosFim])

  useEffect(() => {
    setPaginaPreVendas(1)
  }, [buscaPreVendas, dataFiltroPreVendas])

  useEffect(() => {
    if (!resumoDiaPreVendasAberto) return undefined

    const fecharComEsc = (evento) => {
      if (evento.key === 'Escape') setResumoDiaPreVendasAberto(false)
    }

    window.addEventListener('keydown', fecharComEsc)
    return () => window.removeEventListener('keydown', fecharComEsc)
  }, [resumoDiaPreVendasAberto])

  useEffect(() => {
    return () => {
      try {
        reconhecimentoVendaRef.current?.abort?.()
      } catch (erro) {
        console.error(erro)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      try {
        reconhecimentoPreVendaRef.current?.abort?.()
      } catch (erro) {
        console.error(erro)
      }
    }
  }, [])

  useEffect(() => {
    const modalAberto = modalFormaPagamento.aberto || modalSelecaoCobrancas.aberto
    if (!modalAberto) return undefined

    const scrollY = window.scrollY || window.pageYOffset || 0
    const body = document.body
    const html = document.documentElement
    const estiloBodyAnterior = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    }
    const estiloHtmlAnterior = {
      overflow: html.style.overflow,
    }

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    html.style.overflow = 'hidden'

    return () => {
      body.style.overflow = estiloBodyAnterior.overflow
      body.style.position = estiloBodyAnterior.position
      body.style.top = estiloBodyAnterior.top
      body.style.left = estiloBodyAnterior.left
      body.style.right = estiloBodyAnterior.right
      body.style.width = estiloBodyAnterior.width
      html.style.overflow = estiloHtmlAnterior.overflow
      window.scrollTo(0, scrollY)
    }
  }, [modalFormaPagamento.aberto, modalSelecaoCobrancas.aberto])

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
    data_despesa: dataHoje(),
    categoria: 'Abastecimento',
    descricao: '',
    valor: '',
    observacao: '',
  })

  const [formDelivery, setFormDelivery] = useState({
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
  const [clienteDeliveryNomeSugerido, setClienteDeliveryNomeSugerido] = useState('')
  const [buscaClienteDelivery, setBuscaClienteDelivery] = useState('')
  const buscaClienteDeliveryInputRef = useRef(null)
  const [dropdownClienteDeliveryPosicao, setDropdownClienteDeliveryPosicao] = useState(null)

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
    data_visita: dataHoje(),
  })
  const [editandoRoteiroVendasId, setEditandoRoteiroVendasId] = useState(null)

  useEffect(() => {
    sincronizarDados({ manual: true })
  }, [])

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      sincronizarDados({ manual: false })
    }, 60000)

    function sincronizarAoVoltar() {
      if (!document.hidden) {
        sincronizarDados({ manual: false })
      }
    }

    window.addEventListener('focus', sincronizarAoVoltar)
    document.addEventListener('visibilitychange', sincronizarAoVoltar)
    window.addEventListener('online', sincronizarAoVoltar)

    return () => {
      window.clearInterval(intervalo)
      window.removeEventListener('focus', sincronizarAoVoltar)
      document.removeEventListener('visibilitychange', sincronizarAoVoltar)
      window.removeEventListener('online', sincronizarAoVoltar)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('miniErpHistoricoCaixa', JSON.stringify(historicoCaixa))
    } catch (erro) {
      console.error(erro)
    }
  }, [historicoCaixa])

  useEffect(() => {
    setPaginaVendas(1)
  }, [buscaVendas, filtroVendasInicio, filtroVendasFim])

  useEffect(() => {
    setPaginaClientes(1)
  }, [buscaClientes, filtroClientes])

  useEffect(() => {
    setPaginaResumoProdutosControle(1)
    setPaginaItensProdutosControle(1)
  }, [buscaProdutosControle, periodoLancamentosProdutos])

  useEffect(() => {
    setPaginaDespesas(1)
  }, [buscaDespesas])

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
      buscarPreVendas(),
    ])
  }


  function existeEdicaoAtivaDados() {
    try {
      const ativo = document.activeElement
      const tag = String(ativo?.tagName || '').toLowerCase()
      const digitando = tag === 'input' || tag === 'textarea' || tag === 'select' || Boolean(ativo?.isContentEditable)

      if (digitando) return true

      return Boolean(
        modalVendaAberto ||
        modalFormaPagamento.aberto ||
        modalSelecaoCobrancas.aberto ||
        modalDeliveryVenda.aberto ||
        modalEdicaoDelivery.aberto ||
        modalEdicaoPendencia.aberto ||
        modalConferenciaProdutosAberto ||
        modalEdicaoProduto.aberto ||
        preVendaEdicaoModal.aberto ||
        preVendaDetalheModal.aberto ||
        mensagemPreVendaModal.aberto ||
        editandoVendaId ||
        editandoClienteId ||
        editandoProdutoId ||
        editandoFornecedorId ||
        editandoDespesaId ||
        editandoPedidoFornecedorId ||
        editandoRoteiroVendasId
      )
    } catch (erro) {
      console.error(erro)
      return true
    }
  }

  async function sincronizarDados({ manual = false } = {}) {
    if (sincronizacaoDadosRef.current) return

    if (!manual && existeEdicaoAtivaDados()) return

    sincronizacaoDadosRef.current = true
    setSincronizandoDados(true)
    setErroSincronizacaoDados('')

    try {
      await buscarTudo()
      setUltimaAtualizacaoDados(new Date())
    } catch (erro) {
      console.error('Falha ao sincronizar dados.', erro)
      setErroSincronizacaoDados('Falha ao atualizar dados')
    } finally {
      sincronizacaoDadosRef.current = false
      setSincronizandoDados(false)
    }
  }

  function textoUltimaAtualizacaoDados() {
    if (sincronizandoDados) return 'Sincronizando...'
    if (erroSincronizacaoDados) return erroSincronizacaoDados
    if (!ultimaAtualizacaoDados) return 'Aguardando sincronização'

    return `Última atualização: ${formatarHoraBrasil(ultimaAtualizacaoDados)}`
  }


  const REFERENCIAS_PRE_VENDA_VOZ = [
    'EP 210 Norte',
    'EP 210 Sul',
    'CEAN',
    'Paulo Freire',
    'Objetivo',
    'SEB',
    'CHPP',
    'Contato Pro',
    '113 Norte',
    '304 Norte',
    '306 Norte',
    'EC 114 Sul',
    'Regional',
  ]

  function regexReferenciaPreVenda(referencia) {
    const partes = String(referencia || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((parte) => parte.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

    return new RegExp(`\\b${partes.join('\\s+')}\\b`, 'i')
  }

  function extrairTrechoMarcadoPreVenda(texto, marcadoresInicio, marcadoresFim = []) {
    const original = String(texto || '')
    if (!original.trim()) return ''

    const marcadorRegex = (marcador) => String(marcador || '')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/a/g, '[aáàâã]')
      .replace(/e/g, '[eéê]')
      .replace(/i/g, '[ií]')
      .replace(/o/g, '[oóôõ]')
      .replace(/u/g, '[uú]')
      .replace(/c/g, '[cç]')
      .replace(/\s+/g, '\\s+')

    const inicios = (marcadoresInicio || []).filter(Boolean)
    const fins = (marcadoresFim || []).filter(Boolean)

    let inicioEncontrado = -1
    let marcadorEncontrado = ''

    inicios.forEach((marcador) => {
      const regex = new RegExp(`(^|\\s|[,.;:])(${marcadorRegex(marcador)})(?=\\s|[,.;:]|$)`, 'i')
      const match = original.match(regex)
      if (match?.index >= 0) {
        const indiceReal = match.index + (match[1] || '').length
        if (inicioEncontrado < 0 || indiceReal < inicioEncontrado) {
          inicioEncontrado = indiceReal
          marcadorEncontrado = match[2]
        }
      }
    })

    if (inicioEncontrado < 0) return ''

    const inicioConteudo = inicioEncontrado + marcadorEncontrado.length
    let fimConteudo = original.length
    const depois = original.slice(inicioConteudo)

    fins.forEach((marcador) => {
      const regexFim = new RegExp(`(^|\\s|[,.;:])(${marcadorRegex(marcador)})(?=\\s|[,.;:]|$)`, 'i')
      const matchFim = depois.match(regexFim)
      if (matchFim?.index >= 0) {
        fimConteudo = Math.min(fimConteudo, inicioConteudo + matchFim.index + (matchFim[1] || '').length)
      }
    })

    return original
      .slice(inicioConteudo, fimConteudo)
      .replace(/^[\s:：,.;-]+|[\s:：,.;-]+$/g, '')
      .trim()
  }

  function formatarReferenciaPreVendaPorVoz(referencia) {
    const siglasMaiusculas = new Set(['ep', 'ec', 'sc', 'chpp', 'seb', 'cean', 'dna', 'dpe', 'deam', 'dp'])
    const palavrasMinusculas = new Set(['de', 'da', 'do', 'das', 'dos', 'e'])

    return String(referencia || '')
      .replace(/[,:;]+$/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((parte, indice) => {
        const limpa = parte.replace(/^[.\-]+|[.\-]+$/g, '')
        const chave = normalizarTexto(limpa)

        if (!limpa) return ''
        if (/^\d+[a-z]?$/i.test(limpa)) return limpa.toUpperCase()
        if (siglasMaiusculas.has(chave)) return chave.toUpperCase()
        if (indice > 0 && palavrasMinusculas.has(chave)) return chave

        return limpa.charAt(0).toUpperCase() + limpa.slice(1).toLowerCase()
      })
      .filter(Boolean)
      .join(' ')
  }

  function extrairReferenciaPreVendaPorVoz(texto) {
    const original = String(texto || '')
    const porMarcador = extrairTrechoMarcadoPreVenda(
      original,
      ['referência', 'referencia', 'ref', 'local'],
      ['itens adquiridos', 'itens', 'forma de pagamento', 'pagamento', 'comprou', 'pegou', 'levou']
    )

    if (porMarcador) {
      const referenciaCadastrada = REFERENCIAS_PRE_VENDA_VOZ.find((referencia) => regexReferenciaPreVenda(referencia).test(porMarcador))
      return referenciaCadastrada || formatarReferenciaPreVendaPorVoz(porMarcador)
    }

    const encontrada = REFERENCIAS_PRE_VENDA_VOZ.find((referencia) => regexReferenciaPreVenda(referencia).test(original))
    return encontrada || ''
  }

  function normalizarFormaPagamentoPreVenda(valor) {
    const normalizado = limparPontuacaoTexto(valor || '')

    if (/\bfiado\b|em aberto|pagamento fiado|prazo/.test(normalizado)) return 'Fiado / Em aberto'
    if (/\bpix\b|pagamento pix|pagou no pix|\bpics\b|\bpic\b/.test(normalizado)) return 'Pix'
    if (/debito|pagamento debito|pagou no debito|cartao de debito/.test(normalizado)) return 'Débito'
    if (/credito|pagamento credito|pagou no credito|cartao de credito/.test(normalizado)) return 'Crédito'
    if (/dinheiro|pagamento dinheiro|pagou em dinheiro|especie/.test(normalizado)) return 'Dinheiro'

    return ''
  }

  function extrairPagamentoPreVendaPorVoz(texto) {
    const original = String(texto || '')
    const porMarcador = extrairTrechoMarcadoPreVenda(
      original,
      ['forma de pagamento', 'pagamento', 'pagou no', 'pagou em'],
      []
    )

    return normalizarFormaPagamentoPreVenda(porMarcador) || normalizarFormaPagamentoPreVenda(original)
  }

  function removerMetadadosPreVendaPorVoz(texto) {
    let limpo = String(texto || '')

    const itensMarcados = extrairTrechoMarcadoPreVenda(limpo, ['itens adquiridos', 'itens'], ['forma de pagamento', 'pagamento'])
    if (itensMarcados) return itensMarcados

    REFERENCIAS_PRE_VENDA_VOZ.forEach((referencia) => {
      limpo = limpo.replace(regexReferenciaPreVenda(referencia), ' ')
    })

    limpo = limpo
      .replace(/\bcliente\s*[:：-]?\s*/gi, ' ')
      .replace(/\b(?:refer[eê]ncia|referencia|ref|local)\s*[:：-]?\s*[^,;.\n]+/gi, ' ')
      .replace(/\b(?:forma\s+de\s+pagamento|pagamento|pagou\s+no|pagou\s+em)\s*[:：-]?\s*(?:pix|pics|pic|d[eé]bito|cr[eé]dito|dinheiro|fiado|em\s+aberto)\b/gi, ' ')
      .replace(/\b(?:pix|pics|pic|d[eé]bito|cr[eé]dito|dinheiro|fiado|em\s+aberto)\b\s*$/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    return limpo
  }

  function normalizarPreVendaBanco(registro) {
    if (!registro) return null

    return {
      id: registro.id,
      cliente: registro.cliente_nome || registro.cliente || 'Cliente não informado',
      referencia: registro.referencia || extrairReferenciaPreVendaPorVoz(registro.transcricao || ''),
      pagamento: registro.forma_pagamento || registro.pagamento || extrairPagamentoPreVendaPorVoz(registro.transcricao || ''),
      itens: Array.isArray(registro.itens) ? registro.itens : [],
      total: Number(registro.total || 0),
      transcricao: registro.transcricao || '',
      status: registro.status || 'Pendente',
      mensagemGerada: Boolean(registro.mensagem_gerada),
      criadoEm: registro.created_at || registro.criadoEm || new Date().toISOString(),
      atualizadoEm: registro.updated_at || registro.atualizadoEm || null,
    }
  }

  function montarPayloadPreVenda(preVenda, opcoes = {}) {
    const payload = {
      cliente_nome: preVenda?.cliente || preVenda?.cliente_nome || 'Cliente não informado',
      referencia: preVenda?.referencia || extrairReferenciaPreVendaPorVoz(preVenda?.transcricao || ''),
      forma_pagamento: preVenda?.pagamento || preVenda?.forma_pagamento || extrairPagamentoPreVendaPorVoz(preVenda?.transcricao || ''),
      itens: Array.isArray(preVenda?.itens) ? preVenda.itens : [],
      total: Number(preVenda?.total || 0),
      transcricao: preVenda?.transcricao || '',
      status: preVenda?.status || 'Pendente',
      mensagem_gerada: preVenda?.status === 'Mensagem gerada' || Boolean(preVenda?.mensagemGerada),
      updated_at: new Date().toISOString(),
    }

    const dataPreVenda = preVenda?.criadoEm || preVenda?.created_at
    if (opcoes.incluirDataCriacao && dataPreVenda) payload.created_at = dataPreVenda
    return payload
  }

  function erroColunaFormaPagamentoPreVenda(error) {
    const mensagem = String(error?.message || error?.details || error?.hint || '')
    return mensagem.includes('forma_pagamento') || mensagem.includes('Could not find')
  }

  function payloadPreVendaSemFormaPagamento(payload) {
    const { forma_pagamento, ...restante } = payload || {}
    return restante
  }

  async function buscarPreVendas() {
    const { data, error } = await supabase
      .from('prevendas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar pré-vendas:', error)
      setAvisoPreVenda('Não consegui carregar as pré-vendas do Supabase. Usando dados offline, se disponíveis.')
      const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
      if (Array.isArray(cache.preVendas)) setPreVendas(cache.preVendas)
      return
    }

    const lista = (data || []).map(normalizarPreVendaBanco).filter(Boolean)
    setPreVendas(lista)
    atualizarCacheOffline({ preVendas: lista })
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

  function salvarMovimentoCaixa() {
    const campoValor = document.getElementById('campo-ajuste-caixa-valor')
    const campoObservacao = document.getElementById('campo-ajuste-caixa-observacao')
    const valorDigitado = campoValor?.value ?? ''
    const observacaoDigitada = campoObservacao?.value ?? ''
    const valor = numero(valorDigitado)

    if (valor <= 0) {
      alert('Informe um valor válido para atualizar o caixa.')
      return
    }

    const tipo = formCaixa.tipo || 'Entrada'
    const caixaAnterior = Number(caixaAtual || 0)
    const caixaNovo = tipo === 'Saída'
      ? caixaAnterior - valor
      : tipo === 'Ajuste'
        ? valor
        : caixaAnterior + valor

    const movimento = {
      id: Date.now(),
      data: new Date().toISOString(),
      tipo,
      valor,
      caixaAnterior,
      caixaNovo,
      observacao: observacaoDigitada || '',
    }

    setCaixaAtual(caixaNovo)
    setHistoricoCaixa((lista) => [movimento, ...(lista || [])].slice(0, 20))
    setFormCaixa({ tipo: 'Entrada', valor: '', observacao: '' })

    if (campoValor) campoValor.value = ''
    if (campoObservacao) campoObservacao.value = ''
  }

  function removerMovimentoCaixa(id) {
    const confirmar = window.confirm('Deseja remover este lançamento do histórico? O caixa atual não será recalculado automaticamente.')
    if (!confirmar) return

    setHistoricoCaixa((lista) => (lista || []).filter((item) => item.id !== id))
  }


  function calcularLiquidoPagamentoCaixa(valorBruto, formaPagamento = 'Pix') {
    const valor = Number(valorBruto || 0)
    const taxa = buscarTaxaPorFormaPagamento(formaPagamento)
    const percentual = Number(taxa?.taxa_percentual || 0)
    const valorTaxa = valor * (percentual / 100)
    const valorLiquido = Math.max(valor - valorTaxa, 0)

    return {
      valorBruto: valor,
      valorTaxa,
      valorLiquido,
      percentual,
      formaPagamento: formaPagamento || 'Pix',
    }
  }

  function registrarEntradaCaixaAutomatica({ pagamentoId, vendaId, valorBruto, formaPagamento, cliente = '', origem = '', observacao = '' }) {
    const calculo = calcularLiquidoPagamentoCaixa(valorBruto, formaPagamento)

    if (calculo.valorLiquido <= 0) return

    const jaEntrouNoCaixa = (historicoCaixa || []).some((item) =>
      item.pagamentoId
      && pagamentoId
      && String(item.pagamentoId) === String(pagamentoId)
      && String(item.tipo || '').toLowerCase().includes('entrada automática')
    )

    if (jaEntrouNoCaixa) {
      console.warn('Este pagamento já possui entrada automática registrada no caixa. O caixa não foi alterado novamente.', pagamentoId)
      return
    }

    setCaixaAtual((valorAtual) => {
      const caixaAnterior = Number(valorAtual || 0)
      const caixaNovo = caixaAnterior + calculo.valorLiquido

      const movimento = {
        id: Date.now() + Math.random(),
        data: new Date().toISOString(),
        tipo: 'Entrada automática',
        origem,
        pagamentoId: pagamentoId || null,
        vendaId: vendaId || null,
        cliente,
        formaPagamento: calculo.formaPagamento,
        valorBruto: calculo.valorBruto,
        valorTaxa: calculo.valorTaxa,
        valor: calculo.valorLiquido,
        caixaAnterior,
        caixaNovo,
        observacao,
      }

      setHistoricoCaixa((lista) => [movimento, ...(lista || [])].slice(0, 60))
      return caixaNovo
    })
  }

  function registrarSaidaCaixaAutomatica({ pagamentoId, vendaId, valorBruto, formaPagamento, cliente = '', origem = '', observacao = '' }) {
    const calculo = calcularLiquidoPagamentoCaixa(valorBruto, formaPagamento)

    if (calculo.valorLiquido <= 0) return

    const jaSaiuDoCaixa = (historicoCaixa || []).some((item) =>
      item.pagamentoId
      && pagamentoId
      && String(item.pagamentoId) === String(pagamentoId)
      && String(item.tipo || '').toLowerCase().includes('saída automática')
    )

    if (jaSaiuDoCaixa) {
      console.warn('Este estorno já possui saída automática registrada no caixa. O caixa não foi alterado novamente.', pagamentoId)
      return
    }

    setCaixaAtual((valorAtual) => {
      const caixaAnterior = Number(valorAtual || 0)
      const caixaNovo = caixaAnterior - calculo.valorLiquido

      const movimento = {
        id: Date.now() + Math.random(),
        data: new Date().toISOString(),
        tipo: 'Saída automática',
        origem,
        pagamentoId: pagamentoId || null,
        vendaId: vendaId || null,
        cliente,
        formaPagamento: calculo.formaPagamento,
        valorBruto: calculo.valorBruto,
        valorTaxa: calculo.valorTaxa,
        valor: calculo.valorLiquido,
        caixaAnterior,
        caixaNovo,
        observacao,
      }

      setHistoricoCaixa((lista) => [movimento, ...(lista || [])].slice(0, 60))
      return caixaNovo
    })
  }

  function opcoesFormaPagamentoRecebimento() {
    return formasPagamentoDelivery()
      .filter((forma) => {
        const chave = chaveFormaPagamento(forma)
        return !chave.includes('fiado') && !chave.includes('emaberto')
      })
      .filter((forma, index, lista) => lista.findIndex((item) => chaveFormaPagamento(item) === chaveFormaPagamento(forma)) === index)
  }

  function escolherFormaPagamentoRecebimento(padrao = 'Pix', valorPadrao = '') {
    const opcoes = opcoesFormaPagamentoRecebimento()
    const formaInicial = padrao || 'Pix'

    return new Promise((resolve) => {
      resolverFormaPagamentoRef.current = resolve
      setModalFormaPagamento({
        aberto: true,
        opcoes,
        busca: '',
        padrao: formaInicial,
        selecionada: formaInicial,
        valor: valorPadrao !== null && valorPadrao !== undefined ? String(valorPadrao).replace('.', ',') : '',
      })
    })
  }

  function fecharModalFormaPagamento() {
    fecharTecladoMobile()

    if (resolverFormaPagamentoRef.current) {
      resolverFormaPagamentoRef.current(null)
      resolverFormaPagamentoRef.current = null
    }

    setModalFormaPagamento({
      aberto: false,
      opcoes: [],
      busca: '',
      padrao: 'Pix',
      selecionada: 'Pix',
      valor: '',
    })
  }

  function selecionarFormaPagamentoRecebimento(forma) {
    setModalFormaPagamento((atual) => ({
      ...atual,
      selecionada: forma,
      busca: '',
    }))
  }

  function confirmarBuscaFormaPagamento() {
    fecharTecladoMobile()

    const opcoes = modalFormaPagamento.opcoes || []
    const texto = String(modalFormaPagamento.busca || '').trim()
    let formaEscolhida = modalFormaPagamento.selecionada || modalFormaPagamento.padrao || 'Pix'

    if (texto) {
      const indice = Number(texto)

      if (indice > 0 && opcoes[indice - 1]) {
        formaEscolhida = opcoes[indice - 1]
      } else {
        const encontrada = opcoes.find((forma) => chaveFormaPagamento(forma) === chaveFormaPagamento(texto))
          || opcoes.find((forma) => chaveFormaPagamento(forma).includes(chaveFormaPagamento(texto)) || chaveFormaPagamento(texto).includes(chaveFormaPagamento(forma)))
        if (encontrada) formaEscolhida = encontrada
      }
    }

    const valorRecebido = numero(modalFormaPagamento.valor)

    if (valorRecebido <= 0) {
      alert('Informe o valor recebido.')
      return
    }

    if (resolverFormaPagamentoRef.current) {
      resolverFormaPagamentoRef.current({
        forma: formaEscolhida,
        valor: valorRecebido,
      })
      resolverFormaPagamentoRef.current = null
    }

    setModalFormaPagamento({
      aberto: false,
      opcoes: [],
      busca: '',
      padrao: 'Pix',
      selecionada: 'Pix',
      valor: '',
    })
  }

  function partesDataBrasil(data = new Date()) {
    const partes = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE_BRASIL,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(data)

    return {
      ano: partes.find((parte) => parte.type === 'year')?.value || '1970',
      mes: partes.find((parte) => parte.type === 'month')?.value || '01',
      dia: partes.find((parte) => parte.type === 'day')?.value || '01',
    }
  }

  function dataHoje() {
    const { ano, mes, dia } = partesDataBrasil()
    return `${ano}-${mes}-${dia}`
  }

  function inicioMesAtual() {
    const { ano, mes } = partesDataBrasil()
    return `${ano}-${mes}-01`
  }

  function dataISO(data) {
    const dataObj = data instanceof Date ? data : new Date(data)
    if (Number.isNaN(dataObj.getTime())) return dataHoje()
    const { ano, mes, dia } = partesDataBrasil(dataObj)
    return `${ano}-${mes}-${dia}`
  }

  function ajustarDataPreVenda(dataSelecionada, dataAtual) {
    if (!dataSelecionada) return dataAtual || new Date().toISOString()
    const partes = String(dataSelecionada).split('-').map(Number)
    if (partes.length !== 3 || partes.some((parte) => !Number.isFinite(parte))) {
      return dataAtual || new Date().toISOString()
    }

    const [ano, mes, dia] = partes
    const base = new Date(dataAtual || new Date().toISOString())
    const dataBase = Number.isNaN(base.getTime()) ? new Date() : base
    dataBase.setFullYear(ano, mes - 1, dia)
    return dataBase.toISOString()
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



  function limparPontuacaoTexto(texto) {
    return normalizarTexto(texto).replace(/[^a-z0-9\s,./-]/g, ' ')
  }

  function capitalizarNomeVendaAvulsa(nome) {
    const ajustes = {
      claudio: 'Cláudio',
      claudia: 'Cláudia',
      jose: 'José',
      joao: 'João',
      marcia: 'Márcia',
      lucia: 'Lúcia',
      lucio: 'Lúcio',
      antonio: 'Antônio',
      antonia: 'Antônia',
      debora: 'Débora',
      fabio: 'Fábio',
      lucas: 'Lucas',
      maria: 'Maria',
    }

    const palavrasPequenas = new Set(['da', 'de', 'do', 'das', 'dos', 'e'])

    return String(nome || '')
      .toLowerCase()
      .replace(/[^a-záàâãéêíóôõúçñ\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((parte, indice) => {
        const chave = normalizarTexto(parte)
        if (ajustes[chave]) return ajustes[chave]
        if (indice > 0 && palavrasPequenas.has(chave)) return chave
        return parte.charAt(0).toUpperCase() + parte.slice(1)
      })
      .join(' ')
  }

  function nomeClienteVenda(venda) {
    return venda?.cliente_nome_avulso || venda?.clientes?.nome || 'Cliente sem nome'
  }

  function referenciaClienteVenda(venda) {
    if (venda?.cliente_nome_avulso) return 'Venda avulsa'
    return venda?.clientes?.referencia || 'Sem referência'
  }

  function nomeClientePagamento(pagamento) {
    return pagamento?.vendas?.cliente_nome_avulso || pagamento?.vendas?.clientes?.nome || 'Cliente não informado'
  }

  function referenciaClientePagamento(pagamento) {
    if (pagamento?.vendas?.cliente_nome_avulso) return 'Venda avulsa'
    return pagamento?.vendas?.clientes?.referencia || ''
  }

  function textoNumeroPortuguesParaNumero(texto) {
    const normalizado = limparPontuacaoTexto(texto).replace(/\be\b/g, ' ')
    const palavras = normalizado.split(/\s+/).filter(Boolean)

    const unidades = {
      zero: 0,
      um: 1,
      uma: 1,
      dois: 2,
      duas: 2,
      tres: 3,
      quatro: 4,
      cinco: 5,
      seis: 6,
      sete: 7,
      oito: 8,
      nove: 9,
      dez: 10,
      onze: 11,
      doze: 12,
      treze: 13,
      catorze: 14,
      quatorze: 14,
      quinze: 15,
      dezesseis: 16,
      dezasseis: 16,
      dezessete: 17,
      dezassete: 17,
      dezoito: 18,
      dezenove: 19,
      dezanove: 19,
      vinte: 20,
      trinta: 30,
      quarenta: 40,
      cinquenta: 50,
      sessenta: 60,
      setenta: 70,
      oitenta: 80,
      noventa: 90,
      cem: 100,
      cento: 100,
      duzentos: 200,
      trezentos: 300,
      quatrocentos: 400,
      quinhentos: 500,
      seiscentos: 600,
      setecentos: 700,
      oitocentos: 800,
      novecentos: 900,
    }

    let total = 0
    let encontrou = false

    palavras.forEach((palavra) => {
      if (Object.prototype.hasOwnProperty.call(unidades, palavra)) {
        total += unidades[palavra]
        encontrou = true
      }
    })

    return encontrou ? total : null
  }

  function extrairValorVendaPorVoz(texto) {
    const normalizado = limparPontuacaoTexto(texto)
    const comNumero = normalizado.match(/(?:valor|total|deu|venda|r\$)\s*(?:de\s*)?(\d+(?:[.,]\d{1,2})?)/i)
    if (comNumero?.[1]) return moedaInput(comNumero[1])

    const numeroSoltoComReais = normalizado.match(/\b(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|real)\b/i)
    if (numeroSoltoComReais?.[1]) return moedaInput(numeroSoltoComReais[1])

    const numeroSolto = normalizado.match(/\b(\d{2,5}(?:[.,]\d{1,2})?)\b/i)
    if (numeroSolto?.[1]) return moedaInput(numeroSolto[1])

    const porExtenso = normalizado.match(/(?:valor|total|deu|venda)?\s*(?:de\s*)?([a-z\s]+?)(?:\s+reais?|\s+real|\s+pagamento|\s+status|\s+vencimento|\s+cliente|$)/i)
    const numeroExtenso = porExtenso?.[1] ? textoNumeroPortuguesParaNumero(porExtenso[1]) : null

    return numeroExtenso !== null ? moedaInput(numeroExtenso) : ''
  }

  function localizarClienteAvulsoVenda() {
    return clientes.find((cliente) => {
      const nome = normalizarTexto(cliente.nome || '')
      return nome === 'cliente avulso' || nome === 'avulso' || nome.includes('cliente avulso')
    })
  }

  function normalizarBuscaClienteDelivery(valor) {
    return normalizarTexto(valor).replace(/\s+/g, ' ')
  }

  function palavrasBuscaClienteDelivery(valor) {
    return normalizarBuscaClienteDelivery(valor).split(' ').filter(Boolean)
  }

  function campoCombinaBuscaClienteDelivery(campo, termosBusca) {
    const palavrasCampo = palavrasBuscaClienteDelivery(campo)
    if (!palavrasCampo.length) return false

    if (termosBusca.length === 1) {
      const [termo] = termosBusca
      if (termo.length < 2) return false
      if (termo.length === 2) return palavrasCampo[0]?.startsWith(termo)

      return palavrasCampo.some((palavra) => palavra.startsWith(termo))
    }

    let indicePalavra = 0
    return termosBusca.every((termo) => {
      for (let index = indicePalavra; index < palavrasCampo.length; index += 1) {
        if (palavrasCampo[index].startsWith(termo)) {
          indicePalavra = index + 1
          return true
        }
      }

      return false
    })
  }

  function pontuarCampoBuscaClienteDelivery(campo, termosBusca) {
    const palavrasCampo = palavrasBuscaClienteDelivery(campo)
    if (!palavrasCampo.length) return 0

    if (termosBusca.length === 1) {
      const [termo] = termosBusca
      if (termo.length < 2) return 0
      if (palavrasCampo[0]?.startsWith(termo)) return 3
      if (termo.length === 2) return 0
      if (palavrasCampo.some((palavra) => palavra.startsWith(termo))) return 2
      return 0
    }

    return campoCombinaBuscaClienteDelivery(campo, termosBusca) ? 3 : 0
  }

  function camposBuscaClienteDelivery(cliente) {
    return [
      cliente?.nome,
      cliente?.referencia,
      cliente?.local,
      cliente?.local_entrega,
      cliente?.cidade,
      cliente?.observacao,
    ]
  }

  function pontuarClienteBuscaDelivery(cliente, termosBusca) {
    return Math.max(...camposBuscaClienteDelivery(cliente).map((campo) => pontuarCampoBuscaClienteDelivery(campo, termosBusca)))
  }

  function clientesEncontradosDelivery() {
    const termo = normalizarBuscaClienteDelivery(buscaClienteDelivery)
    if (termo.length < 2) return []

    const termosBusca = termo.split(' ').filter(Boolean)
    if (!termosBusca.length) return []
    if (termosBusca[0].length < 2) return []

    return clientes
      .filter((cliente) => cliente.ativo !== false || String(cliente.id) === String(formDelivery.cliente_id))
      .map((cliente, indice) => ({
        cliente,
        indice,
        pontuacao: pontuarClienteBuscaDelivery(cliente, termosBusca),
      }))
      .filter((resultado) => resultado.pontuacao > 0)
      .sort((a, b) => b.pontuacao - a.pontuacao || a.indice - b.indice)
      .map((resultado) => resultado.cliente)
      .slice(0, 8)
  }

  function atualizarPosicaoDropdownClienteDelivery() {
    const input = buscaClienteDeliveryInputRef.current
    const termo = normalizarBuscaClienteDelivery(buscaClienteDelivery)

    if (!input || termo.length < 2) {
      setDropdownClienteDeliveryPosicao(null)
      return
    }

    const retangulo = input.getBoundingClientRect()
    const largura = retangulo.width
    const margemTela = 12
    const esquerda = Math.min(Math.max(retangulo.left, margemTela), Math.max(margemTela, window.innerWidth - largura - margemTela))

    setDropdownClienteDeliveryPosicao({
      top: retangulo.bottom + 8,
      left: esquerda,
      width: largura,
    })
  }

  useEffect(() => {
    if (normalizarBuscaClienteDelivery(buscaClienteDelivery).length < 2) {
      setDropdownClienteDeliveryPosicao(null)
      return undefined
    }

    atualizarPosicaoDropdownClienteDelivery()

    window.addEventListener('resize', atualizarPosicaoDropdownClienteDelivery)
    window.addEventListener('scroll', atualizarPosicaoDropdownClienteDelivery, true)

    return () => {
      window.removeEventListener('resize', atualizarPosicaoDropdownClienteDelivery)
      window.removeEventListener('scroll', atualizarPosicaoDropdownClienteDelivery, true)
    }
  }, [buscaClienteDelivery, pagina, modalEdicaoDelivery.aberto])

  function selecionarClienteDelivery(cliente) {
    if (!cliente?.id) return

    setFormDelivery((deliveryAtual) => ({
      ...deliveryAtual,
      cliente_id: cliente.id,
      referencia: cliente.referencia || deliveryAtual.referencia,
    }))
    setBuscaClienteDelivery(cliente.nome || '')
    setClienteDeliveryNomeSugerido('')
  }

  function localizarClienteAvulsoDelivery() {
    return clientes.find((cliente) => {
      const nome = normalizarTexto(cliente.nome || '')
      return cliente.ativo !== false && (nome === 'cliente avulso' || nome === 'avulso' || nome.includes('cliente avulso'))
    })
  }

  function usarClienteAvulsoDelivery() {
    const nomeAvulso = capitalizarNomeVendaAvulsa(buscaClienteDelivery || clienteDeliveryNomeSugerido || '')
    const clienteAvulso = localizarClienteAvulsoDelivery()

    if (!nomeAvulso) return

    if (!clienteAvulso) {
      exibirToast('Cadastre ou ative um cliente chamado Cliente Avulso para usar esta opção.', 'erro')
      return
    }

    setFormDelivery((deliveryAtual) => ({
      ...deliveryAtual,
      cliente_id: clienteAvulso.id,
      referencia: deliveryAtual.referencia || nomeAvulso,
      local_entrega: deliveryAtual.local_entrega || nomeAvulso,
    }))
    setBuscaClienteDelivery(nomeAvulso)
    setClienteDeliveryNomeSugerido(nomeAvulso)
  }

  function extrairTextoClienteVendaPorVoz(texto) {
    const normalizado = limparPontuacaoTexto(texto)
    const encontrado = normalizado.match(/cliente\s+(.+?)(?:\s+referencia|\s+valor|\s+total|\s+pagamento|\s+status|\s+vencimento|\s+data|$)/i)
    if (encontrado?.[1]) return encontrado[1].trim()

    let textoLivre = normalizado
      .replace(/\b(valor|total|deu|venda|pagamento|status|vencimento|vence|data|dia|reais|real|r)\b/g, ' ')
      .replace(/\b(pix|pics|pic|dinheiro|debito|credito|cartao|cartao de credito|visa|master|mastercard|elo|fiado|aberto|em aberto|prazo|pago|pagou|recebido|quitado|parcial|entrada)\b/g, ' ')
      .replace(/\b\d{1,5}(?:[.,]\d{1,2})?\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    return textoLivre
  }

  function candidatosClienteVendaPorVoz(textoCliente) {
    const termoCliente = normalizarTexto(textoCliente)
    if (!termoCliente) return []

    const palavrasTermo = termoCliente.split(/\s+/).filter(Boolean)

    return clientes
      .filter((cliente) => {
        const nome = normalizarTexto(cliente.nome || '')
        const referencia = normalizarTexto(cliente.referencia || '')
        const observacao = normalizarTexto(cliente.observacao || '')
        const textoClienteCadastrado = `${nome} ${referencia} ${observacao}`.trim()
        const primeiroNome = nome.split(/\s+/)[0] || ''

        return (
          nome.includes(termoCliente) ||
          termoCliente.includes(nome) ||
          primeiroNome === palavrasTermo[0] ||
          textoClienteCadastrado.includes(termoCliente)
        )
      })
      .slice(0, 12)
  }

  function aplicarClienteAvulsoVendaPorVoz(nome) {
    const clienteAvulso = localizarClienteAvulsoVenda()
    const nomeAvulsoCapitalizado = capitalizarNomeVendaAvulsa(nome)

    if (clienteAvulso) {
      setClienteId(clienteAvulso.id)
      setBuscaClienteVenda(nomeAvulsoCapitalizado)
      setClienteAvulsoVendaNome(nomeAvulsoCapitalizado)
      setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
      setAvisoVendaVoz(`Cliente avulso aplicado: ${nomeAvulsoCapitalizado}. Confira os campos antes de salvar.`)
      return true
    }

    setClienteId('')
    setBuscaClienteVenda(nomeAvulsoCapitalizado)
    setClienteAvulsoVendaNome(nomeAvulsoCapitalizado)
    setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
    setAvisoVendaVoz(`Nome avulso preenchido: ${nomeAvulsoCapitalizado}. Cadastre ou selecione o cliente avulso antes de salvar.`)
    return false
  }

  function aplicarClienteCadastradoVendaPorVoz(cliente) {
    if (!cliente?.id) return

    setClienteId(cliente.id)
    setBuscaClienteVenda('')
    setClienteAvulsoVendaNome('')
    setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
    setAvisoVendaVoz(`Cliente cadastrado selecionado: ${cliente.nome || 'cliente'}. Confira os campos antes de salvar.`)
  }

  function selecionarClienteVendaPorVoz(textoCliente) {
    if (!textoCliente) return false

    const nomeAvulsoCapitalizado = capitalizarNomeVendaAvulsa(textoCliente)
    const candidatos = candidatosClienteVendaPorVoz(textoCliente)

    setBuscaClienteVenda(nomeAvulsoCapitalizado)
    setClienteId('')
    setClienteAvulsoVendaNome('')

    if (candidatos.length > 0) {
      setClienteVozPendente({
        aberto: true,
        etapa: 'escolha',
        nome: nomeAvulsoCapitalizado,
        candidatos,
      })
      return 'PENDENTE_ESCOLHA'
    }

    return aplicarClienteAvulsoVendaPorVoz(nomeAvulsoCapitalizado) ? 'AVULSO_NOMEADO' : false
  }


  function numeroQuantidadePreVendaPorVoz(palavra) {
    const normalizada = normalizarTexto(palavra || '')
    const mapa = {
      um: 1,
      uma: 1,
      hum: 1,
      primeiro: 1,
      dois: 2,
      duas: 2,
      tres: 3,
      três: 3,
      quatro: 4,
      cinco: 5,
      seis: 6,
      sete: 7,
      oito: 8,
      nove: 9,
      dez: 10,
      onze: 11,
      doze: 12,
    }

    if (/^\d+$/.test(normalizada)) return Number(normalizada)
    return mapa[normalizada] || 0
  }

  function formatarQuantidadePreVenda(qtd) {
    const quantidade = Math.max(1, Number(qtd || 1))
    return String(quantidade).padStart(2, '0')
  }

  function limparNomeItemPreVenda(texto) {
    return capitalizarNomeVendaAvulsa(
      String(texto || '')
        .replace(/^\s*(?:e\s+)?(?:um|uma|dois|duas)\s+/i, ' ')
        .replace(/\b(comprou|pegou|levou|ficou com|ficou|compras?|cliente|itens?)\b/gi, ' ')
        .replace(/\b(o|a|e|por|valor|reais|real|r\$)\b/gi, ' ')
        .replace(/\b(cada|unidade|unit[aá]rio)\b/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    ).replace(/\b(De|Do|Da|Dos|Das)\b/g, (parte) => parte.toLowerCase())
  }

  function interpretarItemPreVendaPorVoz(textoItem, valorInformado) {
    let textoLimpo = String(textoItem || '')
      .replace(/^\s*e\s+/i, ' ')
      .replace(/\b(comprou|pegou|levou|ficou com|ficou|compras?|cliente|itens?)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const palavras = textoLimpo.split(/\s+/).filter(Boolean)
    let quantidade = 1

    if (palavras.length > 0) {
      const qtdFalada = numeroQuantidadePreVendaPorVoz(palavras[0])
      if (qtdFalada > 0) {
        quantidade = qtdFalada
        palavras.shift()
      }
    }

    const nome = limparNomeItemPreVenda(palavras.join(' '))
    const valorUnitario = numero(valorInformado)
    const subtotal = quantidade * valorUnitario

    return {
      nome,
      quantidade,
      valorUnitario,
      subtotal,
      valor: subtotal,
    }
  }

  useEffect(() => {
    function aoClicarForaMenuAcoes(event) {
      if (event.target?.closest?.(MENUS_ACOES_SELECTOR)) return
      fecharMenusAcoesAbertos()
    }

    function aoPressionarTeclaMenuAcoes(event) {
      if (event.key === 'Escape') fecharMenusAcoesAbertos()
    }

    document.addEventListener('pointerdown', aoClicarForaMenuAcoes)
    document.addEventListener('keydown', aoPressionarTeclaMenuAcoes)

    return () => {
      document.removeEventListener('pointerdown', aoClicarForaMenuAcoes)
      document.removeEventListener('keydown', aoPressionarTeclaMenuAcoes)
    }
  }, [])

  function separarTrechosItensPreVendaPorVoz(texto) {
    return String(texto || '')
      .replace(/(\d+(?:[,.]\d{1,2})?\s*(?:reais?|real|cada|unidade|unit[aá]rio)?)\s+(?=(?:um|uma|dois|duas|tres|três|\d+)\b)/gi, '$1; ')
      .replace(/\s+(?:e|é)\s+(?=(?:um|uma|dois|duas|tres|três|\d+)\b)/gi, '; ')
      .split(/[,;\n]+/g)
      .map((parte) => parte.replace(/[.]+$/g, '').trim())
      .filter(Boolean)
  }

  function extrairClientePreVendaPorVoz(texto) {
    const original = String(texto || '').trim()
    const porMarcador = extrairTrechoMarcadoPreVenda(
      original,
      ['cliente'],
      ['referência', 'referencia', 'itens adquiridos', 'itens', 'forma de pagamento', 'pagamento', 'comprou', 'pegou', 'levou', 'ficou com']
    )

    if (porMarcador) return capitalizarNomeVendaAvulsa(porMarcador.replace(/^cliente\s+/i, ''))

    const encontrado = original.match(/^(.+?)(?:\s+(?:comprou|pegou|levou|ficou\s+com|ficou|compras?)\b|\s*[:：])/i)
    if (encontrado?.[1]) return capitalizarNomeVendaAvulsa(encontrado[1])

    const palavras = original
      .replace(/[.,;:]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)

    const parada = palavras.findIndex((palavra) => /^(refer[eê]ncia|referencia|itens|comprou|pegou|levou|ficou|um|uma|dois|duas|tres|três|quatro|cinco|seis|sete|oito|nove|dez|valor|total|r\$|\d)/i.test(palavra))
    const nome = parada > 0 ? palavras.slice(0, parada).join(' ') : palavras.slice(0, 2).join(' ')
    return capitalizarNomeVendaAvulsa(nome.replace(/^cliente\s+/i, ''))
  }

  function extrairTextoItensPreVendaPorVoz(texto) {
    const original = String(texto || '')
    const porMarcador = extrairTrechoMarcadoPreVenda(
      original,
      ['itens adquiridos', 'itens'],
      ['forma de pagamento', 'pagamento']
    )

    if (porMarcador) return porMarcador
    return removerMetadadosPreVendaPorVoz(original)
  }

  function extrairItensPreVendaPorVoz(texto, cliente) {
    const original = String(texto || '')
    const partes = []
    const trechos = separarTrechosItensPreVendaPorVoz(original)
    const regexItem = /(.+?)\s+(?:r\$\s*)?(\d+(?:[,.]\d{1,2})?)\s*(?:reais?|real|cada|unidade|unit[aá]rio)?(?=\s*(?:[,;.]|\s+(?:(?:e|é)\s+)?(?:um|uma|dois|duas|tres|três|\d+)\b|$))/gi
    const clienteNormalizado = normalizarTexto(cliente || '')

    trechos.forEach((trecho) => {
      let match

      while ((match = regexItem.exec(trecho)) !== null) {
        let textoItem = match[1] || ''
        if (clienteNormalizado && normalizarTexto(textoItem).startsWith(clienteNormalizado)) {
          textoItem = textoItem.slice(String(cliente || '').length)
        }

        const itemInterpretado = interpretarItemPreVendaPorVoz(textoItem, match[2])

        if (itemInterpretado.nome && itemInterpretado.valorUnitario > 0) {
          partes.push(itemInterpretado)
        }
      }
    })

    return partes
  }

  function interpretarPreVendaPorVoz(texto) {
    const transcricao = String(texto || '').trim()
    const referencia = extrairReferenciaPreVendaPorVoz(transcricao)
    const pagamento = extrairPagamentoPreVendaPorVoz(transcricao)
    const textoOperacional = removerMetadadosPreVendaPorVoz(transcricao)
    const cliente = extrairClientePreVendaPorVoz(transcricao)
    const textoItens = extrairTextoItensPreVendaPorVoz(transcricao)
    const itens = extrairItensPreVendaPorVoz(textoItens || textoOperacional, cliente)
    const totalItens = itens.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalFallback = numero(extrairValorVendaPorVoz(textoItens || textoOperacional))
    const total = totalItens > 0 ? totalItens : totalFallback

    return {
      id: `pv-${Date.now()}`,
      cliente: cliente || 'Cliente não informado',
      referencia,
      pagamento,
      itens,
      total,
      transcricao,
      status: 'Pendente',
      criadoEm: new Date().toISOString(),
    }
  }

  async function salvarPreVendaPorTexto(texto) {
    const interpretada = interpretarPreVendaPorVoz(texto)

    if (!interpretada.transcricao) {
      setAvisoPreVenda('Não ouvi nenhuma informação. Tente novamente.')
      return
    }

    const payload = montarPayloadPreVenda(interpretada)
    delete payload.updated_at

    let { data, error } = await supabase
      .from('prevendas')
      .insert(payload)
      .select('*')
      .single()

    if (error && erroColunaFormaPagamentoPreVenda(error)) {
      const tentativa = await supabase
        .from('prevendas')
        .insert(payloadPreVendaSemFormaPagamento(payload))
        .select('*')
        .single()
      data = tentativa.data
      error = tentativa.error
    }

    if (error) {
      console.error('Erro ao salvar pré-venda:', error)
      if (!navigator.onLine) {
        const registroOffline = adicionarFilaOffline({
          tipo: 'prevenda',
          payload: {
            cliente: interpretada.cliente,
            referencia: interpretada.referencia || '',
            itensTexto: interpretada.itens?.map((item) => item.nome).join(', ') || interpretada.transcricao,
            valor: interpretada.total,
            observacao: interpretada.transcricao,
          },
        })
        const local = { ...interpretada, id: registroOffline.idLocal, offline: true }
        setPreVendas((listaAtual) => [local, ...listaAtual])
        atualizarCacheOffline({ preVendas: [local, ...(preVendas || [])] })
        setAvisoPreVenda('Sem internet. Pré-venda salva no modo offline.')
        exibirToast('Pré-venda salva offline.')
        return
      }
      setAvisoPreVenda(`Erro ao salvar pré-venda: ${error.message || 'verifique as permissões do Supabase.'}`)
      exibirToast('Erro ao salvar pré-venda.', 'erro')
      return
    }

    const novaPreVenda = normalizarPreVendaBanco(data)
    setPreVendas((listaAtual) => [novaPreVenda, ...listaAtual.filter((item) => item.id !== novaPreVenda.id)])
    setTextoPreVendaVoz(novaPreVenda.transcricao)
    setAvisoPreVenda(`Pré-venda registrada para ${novaPreVenda.cliente}.`)
    exibirToast('Pré-venda registrada.')
  }

  function atualizarConfigPixRapido(campo, valor) {
    setConfigPixRapido((atual) => ({
      ...atual,
      [campo]: valor,
    }))
  }

  function gravarConfigPixRapido(config) {
    const normalizada = normalizarConfigPixRapido(config)
    window.localStorage.setItem(CHAVE_CONFIG_PIX_RAPIDO, JSON.stringify(normalizada))
    setConfigPixRapido(normalizada)
    return normalizada
  }

  function salvarConfigPixRapido() {
    try {
      gravarConfigPixRapido(configPixRapido)
      exibirToast('Configuracao Pix salva.')
    } catch (erro) {
      console.error('Falha ao salvar configuracao Pix Rapido.', erro)
      exibirToast('Nao foi possivel salvar a configuracao Pix.', 'erro')
    }
  }

  function restaurarConfigPixRapidoPadrao() {
    try {
      gravarConfigPixRapido(CONFIG_PIX_RAPIDO_INICIAL)
      exibirToast('Configuracao Pix restaurada.')
    } catch (erro) {
      console.error('Falha ao restaurar configuracao Pix Rapido.', erro)
      setConfigPixRapido(normalizarConfigPixRapido(CONFIG_PIX_RAPIDO_INICIAL))
      exibirToast('Padrao restaurado nesta sessao.', 'erro')
    }
  }

  function gerarPixRapido(e) {
    e?.preventDefault?.()

    const valor = numero(valorPixRapido)
    const config = normalizarConfigPixRapido(configPixRapido)

    if (valor <= 0) {
      exibirToast('Informe um valor valido para o Pix.', 'erro')
      return
    }

    if (!config.chave) {
      exibirToast('Informe a chave Pix para gerar o QR Code.', 'erro')
      return
    }

    const codigo = montarCodigoPixCopiaCola({
      chave: config.chave,
      valor,
      recebedor: 'Delber Vilaca',
      instituicao: config.instituicao,
    })

    setConfigPixRapido(config)
    setPixRapidoGerado({
      id: `pix-rapido-${Date.now()}`,
      codigo,
      qrCodeUrl: urlQrCodePix(codigo),
      valor,
      criadoEm: new Date().toISOString(),
      status: 'Aguardando pagamento',
      tipoChave: config.tipoChave,
      chave: config.chave,
      instituicao: config.instituicao,
    })
    setModalPixRapidoQrAberto(true)
    setModalPixRapidoPreVenda({ aberto: false, cliente: '', referencia: '', observacao: '' })
    exibirToast('QR Code Pix gerado.')
  }

  async function copiarCodigoPixRapido() {
    if (!pixRapidoGerado?.codigo) return

    try {
      await navigator.clipboard.writeText(pixRapidoGerado.codigo)
      exibirToast('Codigo Pix copiado.')
    } catch (erro) {
      console.error('Erro ao copiar codigo Pix:', erro)
      exibirToast('Nao consegui copiar automaticamente.', 'erro')
    }
  }

  function cancelarPixRapido() {
    setPixRapidoGerado((atual) => atual ? { ...atual, status: 'Cancelado' } : atual)
    setModalPixRapidoPreVenda({ aberto: false, cliente: '', referencia: '', observacao: '' })
    exibirToast('Pix cancelado.')
  }

  function gerarNovaCobrancaPixRapido() {
    setValorPixRapido('')
    setPixRapidoGerado(null)
    setModalPixRapidoQrAberto(false)
    setModalPixRapidoPreVenda({ aberto: false, cliente: '', referencia: '', observacao: '' })
  }

  function abrirModalPixRapidoQr() {
    if (!pixRapidoGerado) return
    setModalPixRapidoQrAberto(true)
  }

  function fecharModalPixRapidoQr() {
    setModalPixRapidoQrAberto(false)
  }

  function abrirModalPixRapidoPreVenda() {
    if (!pixRapidoGerado || pixRapidoGerado.status === 'Cancelado') return
    setModalPixRapidoQrAberto(false)
    setModalPixRapidoPreVenda({ aberto: true, cliente: '', referencia: '', observacao: '' })
  }

  function fecharModalPixRapidoPreVenda() {
    setModalPixRapidoPreVenda({ aberto: false, cliente: '', referencia: '', observacao: '' })
  }

  async function salvarPixRapidoEmPreVenda(e) {
    e?.preventDefault?.()

    if (!pixRapidoGerado) return

    const cliente = modalPixRapidoPreVenda.cliente.trim()
    const referencia = modalPixRapidoPreVenda.referencia.trim()
    const observacao = modalPixRapidoPreVenda.observacao.trim()
    const valor = Number(pixRapidoGerado.valor || 0)
    const textoOrigem = observacao
      ? `Origem Pix Rapido. ${observacao}`
      : 'Origem Pix Rapido. Completar itens depois na Pre-venda.'
    const preVendaPix = {
      cliente: cliente || 'Cliente nao informado',
      referencia,
      pagamento: 'Pix',
      itens: observacao ? [{ nome: observacao, quantidade: 1, valorUnitario: valor, valor }] : [],
      total: valor,
      transcricao: textoOrigem,
      status: 'Aguardando lancamento',
      mensagemGerada: false,
      criadoEm: new Date().toISOString(),
    }
    const payload = montarPayloadPreVenda(preVendaPix, { incluirDataCriacao: true })
    delete payload.updated_at

    let { data, error } = await supabase
      .from('prevendas')
      .insert(payload)
      .select('*')
      .single()

    if (error && erroColunaFormaPagamentoPreVenda(error)) {
      const tentativa = await supabase
        .from('prevendas')
        .insert(payloadPreVendaSemFormaPagamento(payload))
        .select('*')
        .single()
      data = tentativa.data
      error = tentativa.error
    }

    if (error) {
      console.error('Erro ao salvar Pix Rapido em Pre-vendas:', error)
      exibirToast('Erro ao salvar em Pre-vendas.', 'erro')
      return
    }

    const novaPreVenda = normalizarPreVendaBanco(data)
    setPreVendas((listaAtual) => [novaPreVenda, ...listaAtual.filter((item) => item.id !== novaPreVenda.id)])
    atualizarCacheOffline({ preVendas: [novaPreVenda, ...(preVendas || []).filter((item) => item.id !== novaPreVenda.id)] })
    setPixRapidoGerado((atual) => atual ? { ...atual, status: 'Pagamento recebido' } : atual)
    fecharModalPixRapidoPreVenda()
    setPagina('pre-vendas')
    exibirToast('Pre-venda criada pelo Pix Rapido.')
  }

  function iniciarPreVendaPorVoz() {
    if (!speechVendaDisponivel) {
      setAvisoPreVenda('Microfone por voz não disponível neste navegador. Use Chrome ou Edge.')
      return
    }

    try {
      reconhecimentoPreVendaRef.current?.abort?.()
    } catch (erro) {
      console.error(erro)
    }

    textoPreVendaAcumuladoRef.current = ''
    deveSalvarPreVendaNoFimRef.current = true
    setTextoPreVendaVoz('')

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setOuvindoPreVendaVoz(true)
      setAvisoPreVenda('Ouvindo pré-venda. Fale com calma e clique em parar quando terminar este cliente.')
    }

    recognition.onresult = (event) => {
      const texto = Array.from(event.results || [])
        .map((resultado) => resultado?.[0]?.transcript || '')
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

      textoPreVendaAcumuladoRef.current = texto
      if (texto) setTextoPreVendaVoz(texto)
    }

    recognition.onerror = (event) => {
      const mensagem = event?.error === 'not-allowed'
        ? 'Permita o uso do microfone no navegador para registrar pré-vendas.'
        : 'Não consegui ouvir a pré-venda. Tente novamente e clique em parar ao terminar.'
      deveSalvarPreVendaNoFimRef.current = false
      setAvisoPreVenda(mensagem)
      setOuvindoPreVendaVoz(false)
    }

    recognition.onend = () => {
      const textoFinal = textoPreVendaAcumuladoRef.current.trim()
      if (deveSalvarPreVendaNoFimRef.current && textoFinal) {
        salvarPreVendaPorTexto(textoFinal)
      } else if (deveSalvarPreVendaNoFimRef.current && !textoFinal) {
        setAvisoPreVenda('Não ouvi nenhuma informação. Tente novamente.')
      }
      deveSalvarPreVendaNoFimRef.current = false
      setOuvindoPreVendaVoz(false)
    }

    reconhecimentoPreVendaRef.current = recognition

    try {
      recognition.start()
    } catch (erro) {
      console.error(erro)
      setAvisoPreVenda('Não foi possível iniciar o microfone neste navegador.')
      setOuvindoPreVendaVoz(false)
    }
  }

  function pararPreVendaPorVoz() {
    try {
      reconhecimentoPreVendaRef.current?.stop?.()
    } catch (erro) {
      console.error(erro)
    }
    setOuvindoPreVendaVoz(false)
  }

  async function atualizarReferenciaPreVenda(id, referencia) {
    setPreVendas((listaAtual) => listaAtual.map((item) => (
      item.id === id ? { ...item, referencia } : item
    )))

    const { error } = await supabase
      .from('prevendas')
      .update({ referencia, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar referência da pré-venda:', error)
      exibirToast('Erro ao salvar referência.')
    }
  }

  async function atualizarStatusPreVenda(id, statusNovo) {
    setPreVendas((listaAtual) => listaAtual.map((item) => (
      item.id === id ? { ...item, status: statusNovo, mensagemGerada: statusNovo === 'Mensagem gerada' || item.mensagemGerada } : item
    )))

    const { error } = await supabase
      .from('prevendas')
      .update({
        status: statusNovo,
        mensagem_gerada: statusNovo === 'Mensagem gerada',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar status da pré-venda:', error)
      exibirToast('Erro ao salvar status.')
    }
  }

  function abrirEdicaoPreVenda(preVenda) {
    const copia = {
      ...preVenda,
      itens: (preVenda?.itens || []).map((item) => ({ ...item })),
    }
    setPreVendaEdicaoModal({ aberto: true, preVenda: copia })
  }

  function fecharEdicaoPreVenda() {
    setPreVendaEdicaoModal({ aberto: false, preVenda: null })
  }

  function atualizarCampoEdicaoPreVenda(campo, valor) {
    setPreVendaEdicaoModal((atual) => ({
      ...atual,
      preVenda: {
        ...(atual.preVenda || {}),
        [campo]: valor,
      },
    }))
  }

  function atualizarItemEdicaoPreVenda(index, campo, valor) {
    setPreVendaEdicaoModal((atual) => {
      const itens = [...(atual.preVenda?.itens || [])]
      itens[index] = { ...(itens[index] || {}), [campo]: valor }
      return {
        ...atual,
        preVenda: {
          ...(atual.preVenda || {}),
          itens,
        },
      }
    })
  }

  function adicionarItemEdicaoPreVenda() {
    setPreVendaEdicaoModal((atual) => ({
      ...atual,
      preVenda: {
        ...(atual.preVenda || {}),
        itens: [
          ...(atual.preVenda?.itens || []),
          { nome: '', quantidade: 1, valorUnitario: 0, subtotal: 0, valor: 0 },
        ],
      },
    }))
  }

  function removerItemEdicaoPreVenda(index) {
    setPreVendaEdicaoModal((atual) => ({
      ...atual,
      preVenda: {
        ...(atual.preVenda || {}),
        itens: (atual.preVenda?.itens || []).filter((_, itemIndex) => itemIndex !== index),
      },
    }))
  }

  async function salvarEdicaoPreVenda() {
    const editada = preVendaEdicaoModal.preVenda
    if (!editada?.id) return

    const itensTratados = (editada.itens || []).map((item) => {
      const quantidade = Math.max(1, Number(item.quantidade || 1))
      const valorUnitario = numero(item.valorUnitario || item.valor || 0)
      const subtotal = quantidade * valorUnitario
      return {
        ...item,
        nome: capitalizarNomeVendaAvulsa(item.nome || 'Produto'),
        quantidade,
        valorUnitario,
        subtotal,
        valor: subtotal,
      }
    }).filter((item) => item.nome && item.valorUnitario > 0)

    const total = itensTratados.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)
    const atualizada = {
      ...editada,
      cliente: capitalizarNomeVendaAvulsa(editada.cliente || 'Cliente não informado'),
      referencia: editada.referencia || '',
      pagamento: editada.pagamento || extrairPagamentoPreVendaPorVoz(editada.transcricao || ''),
      itens: itensTratados,
      total,
      transcricao: editada.transcricao || '',
      status: editada.status || 'Pendente',
    }

    const payloadAtualizacaoPreVenda = montarPayloadPreVenda(atualizada, { incluirDataCriacao: true })
    let { data, error } = await supabase
      .from('prevendas')
      .update(payloadAtualizacaoPreVenda)
      .eq('id', editada.id)
      .select('*')
      .single()

    if (error && erroColunaFormaPagamentoPreVenda(error)) {
      const tentativa = await supabase
        .from('prevendas')
        .update(payloadPreVendaSemFormaPagamento(payloadAtualizacaoPreVenda))
        .eq('id', editada.id)
        .select('*')
        .single()
      data = tentativa.data
      error = tentativa.error
    }

    if (error) {
      console.error('Erro ao editar pré-venda:', error)
      exibirToast('Erro ao salvar edição da pré-venda.')
      return
    }

    const normalizada = normalizarPreVendaBanco(data)
    setPreVendas((listaAtual) => listaAtual.map((item) => (
      item.id === normalizada.id ? normalizada : item
    )))

    fecharEdicaoPreVenda()
    exibirToast('Pré-venda atualizada.')
  }

  function textoMensagemRegistroPreVenda(preVenda) {
    const data = preVenda?.criadoEm ? dataBR(preVenda.criadoEm) : dataBR(dataHoje())
    const itens = (preVenda?.itens || []).length > 0
      ? (preVenda.itens || []).map((produto) => {
          const quantidade = formatarQuantidadePreVenda(produto.quantidade || 1)
          const nome = produto.nome || 'Produto'
          const valorUnitario = Number(produto.valorUnitario || produto.valor || 0)
          const subtotal = Number(produto.subtotal || produto.valor || valorUnitario)
          return `• ${quantidade} ${nome} — ${moeda(subtotal)}`
        }).join('\n')
      : `• ${preVenda?.transcricao || 'Itens não informados'}`

    return `📌 Registro de Compra – Queijos Serra da Canastra 🇧🇷

👤 Cliente: ${preVenda?.cliente || 'Cliente'}
📍 Referência: ${preVenda?.referencia || 'Não informada'}
📅 ${data}

🛒 Itens adquiridos:
${itens}

💰 Valor total: ${moeda(preVenda?.total || 0)}
📌 Status: Em aberto

📲 Conforme combinado, no dia do pagamento enviarei uma mensagem para a realização da transferência via Pix.

Se preferir, o pagamento pode ser realizado a qualquer momento via Pix:

queijosserradacanastra@hotmail.com

Delber Vilaça
Queijos Serra da Canastra 🇧🇷`
  }

  function abrirMensagemPreVenda(preVenda) {
    const texto = textoMensagemRegistroPreVenda(preVenda)
    setMensagemPreVendaModal({ aberto: true, preVendaId: preVenda?.id || '', texto })
  }

  async function copiarMensagemPreVenda() {
    try {
      await navigator.clipboard.writeText(mensagemPreVendaModal.texto || '')
      exibirToast('Mensagem copiada.')
    } catch (erro) {
      console.error(erro)
      exibirToast('Não consegui copiar automaticamente. Selecione o texto e copie manualmente.')
    }
  }

  async function excluirPreVenda(id) {
    const listaAnterior = preVendas
    setPreVendas((listaAtual) => listaAtual.filter((item) => item.id !== id))

    const { error } = await supabase
      .from('prevendas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao excluir pré-venda:', error)
      setPreVendas(listaAnterior)
      exibirToast('Erro ao excluir pré-venda.')
      return
    }

    exibirToast('Pré-venda excluída.')
  }

  function converterPreVendaEmVenda(preVenda) {
    limparVenda()
    const nomeCliente = capitalizarNomeVendaAvulsa(preVenda?.cliente || '')
    const candidatos = candidatosClienteVendaPorVoz(nomeCliente)
    const pagamentoInformado = preVenda?.pagamento || extrairPagamentoPreVendaPorVoz(preVenda?.transcricao || '')

    setModalVendaAberto(true)
    setValorTotal(preVenda?.total ? moedaInput(preVenda.total) : '')
    const dataOriginalPreVenda = dataISO(preVenda?.criadoEm || preVenda?.created_at || dataHoje())

    setDataVenda(dataOriginalPreVenda)
    setTextoVendaVoz(preVenda?.transcricao || '')
    setAvisoVendaVoz('Pré-venda carregada. Escolha cliente cadastrado, cliente avulso ou cadastre um novo cliente antes de salvar.')
    setBuscaClienteVenda(nomeCliente)
    setClienteId('')
    setClienteAvulsoVendaNome('')
    setClienteVozPendente({
      aberto: true,
      etapa: 'escolha',
      nome: nomeCliente,
      candidatos,
    })

    if (pagamentoInformado) selecionarPagamentoVendaPorVoz(pagamentoInformado, dataOriginalPreVenda)

    setPreVendaConvertendoId(preVenda.id || '')
    atualizarStatusPreVenda(preVenda.id, 'Em lançamento')
    setPreVendaDetalheModal({ aberto: false, preVenda: null })
    setPagina('vendas')
    setTimeout(() => buscaClienteVendaInputRef.current?.focus(), 100)
  }


  function montarDescricaoDeliveryPorPreVenda(preVenda) {
    const itens = Array.isArray(preVenda?.itens) ? preVenda.itens : []
    const linhasItens = itens.map((produto) => {
      const quantidade = Number(produto.quantidade || 1)
      const valorUnitario = Number(produto.valorUnitario ?? produto.valor_unitario ?? produto.valor ?? 0)
      return `${formatarQuantidadePreVenda(quantidade)} ${produto.nome || 'Item'} • ${moeda(valorUnitario)}`
    })

    return linhasItens.join('\n')
  }

  function encontrarClienteParaDeliveryPorPreVenda(nomeCliente) {
    const nomeNormalizado = normalizarTexto(nomeCliente || '')
    if (!nomeNormalizado) return null

    return (clientes || []).find((cliente) => {
      if (cliente.ativo === false) return false
      return normalizarTexto(cliente.nome || '') === nomeNormalizado
    }) || (clientes || []).find((cliente) => {
      if (cliente.ativo === false) return false
      const clienteNormalizado = normalizarTexto(cliente.nome || '')
      return clienteNormalizado.includes(nomeNormalizado) || nomeNormalizado.includes(clienteNormalizado)
    }) || null
  }

  function criarDeliveryAPartirPreVenda(preVenda) {
    if (!preVenda) return

    const clienteEncontrado = encontrarClienteParaDeliveryPorPreVenda(preVenda.cliente)
    const descricao = montarDescricaoDeliveryPorPreVenda(preVenda)

    setEditandoDeliveryId(null)
    setClienteDeliveryNomeSugerido(preVenda.cliente || '')
    setBuscaClienteDelivery(clienteEncontrado?.nome || preVenda.cliente || '')
    setFormDelivery({
      venda_id: '',
      data_pedido: dataISO(preVenda.criadoEm || preVenda.created_at || dataHoje()),
      data_entrega: '',
      cliente_id: clienteEncontrado?.id || '',
      referencia: preVenda.referencia || clienteEncontrado?.referencia || '',
      local_entrega: preVenda.referencia || clienteEncontrado?.referencia || '',
      descricao,
      valor_total: preVenda.total ? moedaInput(preVenda.total) : '',
      status: 'Programado',
    })

    setPreVendaDeliveryOrigemId(preVenda.id || '')
    setPreVendaDetalheModal({ aberto: false, preVenda: null })
    setPagina('delivery')
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80)

    if (!clienteEncontrado) {
      exibirToast('Delivery aberto. Selecione ou cadastre o cliente antes de salvar.')
    } else {
      exibirToast('Delivery aberto com os dados da pré-venda.')
    }
  }

  function preVendasFiltradas() {
    const termo = normalizarTexto(buscaPreVendas)
    const prioridadeStatus = (statusItem) => {
      const statusNormalizado = normalizarTexto(statusItem || 'Pendente')
      if (statusNormalizado.includes('convertida') || statusNormalizado.includes('convertido') || statusNormalizado.includes('delivery programado')) return 3
      if (statusNormalizado.includes('delivery') || statusNormalizado.includes('lancamento') || statusNormalizado.includes('lançamento')) return 2
      if (statusNormalizado.includes('mensagem')) return 1
      return 0
    }

    return preVendas
      .filter((item) => {
        if (dataFiltroPreVendas && dataISO(item.criadoEm || item.created_at) !== dataFiltroPreVendas) return false
        if (!termo) return true
        const texto = [
          item.cliente,
          item.referencia,
          item.pagamento,
          item.status,
          item.transcricao,
          ...(item.itens || []).map((produto) => produto.nome),
        ].join(' ')
        return normalizarTexto(texto).includes(termo)
      })
      .sort((a, b) => {
        const prioridadeA = prioridadeStatus(a.status)
        const prioridadeB = prioridadeStatus(b.status)
        if (prioridadeA !== prioridadeB) return prioridadeA - prioridadeB
        return new Date(b.criadoEm || b.created_at || 0).getTime() - new Date(a.criadoEm || a.created_at || 0).getTime()
      })
  }

  function extrairDataVendaPorVoz(texto, usarHojeComoBase = true) {
    const normalizado = limparPontuacaoTexto(texto)
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const meses = {
      janeiro: 1,
      fevereiro: 2,
      marco: 3,
      abril: 4,
      maio: 5,
      junho: 6,
      julho: 7,
      agosto: 8,
      setembro: 9,
      outubro: 10,
      novembro: 11,
      dezembro: 12,
    }

    const dataNumerica = normalizado.match(/(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?/)
    if (dataNumerica) {
      const dia = String(dataNumerica[1]).padStart(2, '0')
      const mes = String(dataNumerica[2]).padStart(2, '0')
      const ano = dataNumerica[3]
        ? String(dataNumerica[3].length === 2 ? `20${dataNumerica[3]}` : dataNumerica[3])
        : String(anoAtual)
      return `${ano}-${mes}-${dia}`
    }

    const dataComMes = normalizado.match(/(?:dia\s*)?(\d{1,2})\s*(?:de\s*)?(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/)
    if (dataComMes) {
      const dia = String(dataComMes[1]).padStart(2, '0')
      const mes = String(meses[dataComMes[2]]).padStart(2, '0')
      return `${anoAtual}-${mes}-${dia}`
    }

    const apenasDia = normalizado.match(/(?:vencimento|vence|vencer|dia)\s*(?:dia\s*)?(\d{1,2})\b/)
    if (apenasDia && usarHojeComoBase) {
      const diaInformado = Number(apenasDia[1])
      const dataBase = new Date(hoje.getFullYear(), hoje.getMonth(), diaInformado)
      if (diaInformado < hoje.getDate() - 3) dataBase.setMonth(dataBase.getMonth() + 1)
      return dataISO(dataBase)
    }

    return ''
  }

  function selecionarPagamentoVendaPorVoz(texto, dataBaseVenda = dataVenda) {
    const normalizado = limparPontuacaoTexto(texto)

    let formaPreferida = ''
    if (/\bfiado\b|em aberto|aberto|prazo/.test(normalizado)) formaPreferida = 'Fiado / Em aberto'
    else if (/\bpix\b|\bpics\b|\bpic\b|\bpiques\b|\bpixx\b/.test(normalizado)) formaPreferida = 'Pix'
    else if (/debito|cartao de debito/.test(normalizado)) formaPreferida = 'Débito'
    else if (/mastercard|master card|master/.test(normalizado)) formaPreferida = 'Mastercard'
    else if (/visa/.test(normalizado)) formaPreferida = 'Visa'
    else if (/credito|cartao/.test(normalizado)) formaPreferida = 'Crédito'
    else if (/dinheiro|especie/.test(normalizado)) formaPreferida = 'Dinheiro'

    if (!formaPreferida) return

    const taxaEncontrada = taxas.find((taxa) => normalizarTexto(taxa.forma_pagamento).includes(normalizarTexto(formaPreferida)))
    if (taxaEncontrada) setTaxaSelecionadaId(taxaEncontrada.id)
    aplicarStatusPorFormaPagamentoVenda(taxaEncontrada?.forma_pagamento || formaPreferida, dataBaseVenda)
  }

  function selecionarStatusVendaPorVoz(texto, dataBaseVenda = dataVenda) {
    const normalizado = limparPontuacaoTexto(texto)

    if (/\bpago\b|pagou|recebido|quitado|\bpix\b|\bpics\b|\bpic\b|dinheiro|debito|credito|cartao|visa|master/.test(normalizado) && !/fiado|em aberto|aberto|prazo/.test(normalizado)) {
      setStatus('PAGO')
      setVencimento(dataBaseVenda || dataVenda || dataHoje())
      return
    }

    if (/parcial|parte|entrada/.test(normalizado)) {
      setStatus('PARCIAL')
      return
    }

    if (/fiado|em aberto|aberto|prazo|vencimento|vence/.test(normalizado)) {
      setStatus('EM ABERTO')
    }
  }

  function aplicarTextoVendaPorVoz(texto) {
    const textoLimpo = String(texto || '').trim()
    if (!textoLimpo) return

    const clienteTexto = extrairTextoClienteVendaPorVoz(textoLimpo)
    const clienteSelecionado = selecionarClienteVendaPorVoz(clienteTexto, textoLimpo)
    const valorExtraido = extrairValorVendaPorVoz(textoLimpo)
    const vencimentoExtraido = extrairDataVendaPorVoz(textoLimpo, true)
    const textoNormalizado = limparPontuacaoTexto(textoLimpo)
    const pagamentoPagoInformado = /\bpago\b|pagou|recebido|quitado|\bpix\b|\bpics\b|\bpic\b|dinheiro|debito|credito|cartao|visa|master/.test(textoNormalizado) && !/fiado|em aberto|aberto|prazo/.test(textoNormalizado)

    if (valorExtraido) setValorTotal(valorExtraido)
    selecionarPagamentoVendaPorVoz(textoLimpo, dataVenda)
    selecionarStatusVendaPorVoz(textoLimpo, dataVenda)
    if (vencimentoExtraido && !pagamentoPagoInformado && /vencimento|vence|vencer|fiado|em aberto|aberto|prazo/.test(textoNormalizado)) {
      setVencimento(vencimentoExtraido)
    }

    const resumo = []
    if (clienteTexto) {
      if (clienteSelecionado === 'PENDENTE_ESCOLHA') resumo.push(`cliente ${capitalizarNomeVendaAvulsa(clienteTexto)} aguardando escolha: avulso ou cadastrado`)
      else if (clienteSelecionado === 'AVULSO_NOMEADO') resumo.push(`cliente ${capitalizarNomeVendaAvulsa(clienteTexto)} registrado como venda avulsa`)
      else resumo.push(clienteSelecionado ? 'cliente selecionado' : 'cliente pesquisado')
    }
    if (valorExtraido) resumo.push(`valor ${valorExtraido}`)
    if (vencimentoExtraido) resumo.push('vencimento identificado')

    setAvisoVendaVoz(resumo.length > 0
      ? `Voz aplicada: ${resumo.join(', ')}. Confira os campos antes de salvar.`
      : 'Não consegui identificar dados suficientes. Tente falar cliente, valor e pagamento. Exemplo: Ana Paula, 120, Pix.')
  }

  function iniciarLancamentoVendaPorVoz() {
    if (!speechVendaDisponivel) {
      setAvisoVendaVoz('Microfone por voz não disponível neste navegador. Use Chrome ou Edge.')
      return
    }

    try {
      const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition
      const reconhecimento = new Reconhecimento()
      reconhecimentoVendaRef.current = reconhecimento
      reconhecimento.lang = 'pt-BR'
      reconhecimento.interimResults = false
      reconhecimento.continuous = false
      reconhecimento.maxAlternatives = 1

      reconhecimento.onstart = () => {
        setOuvindoVendaVoz(true)
        setAvisoVendaVoz('Ouvindo. Pode falar curto: cliente, valor e pagamento. Exemplo: Ana Paula, 120, Pix.')
      }

      reconhecimento.onerror = (evento) => {
        setOuvindoVendaVoz(false)
        setAvisoVendaVoz(evento?.error === 'not-allowed'
          ? 'Permita o uso do microfone no navegador para lançar por voz.'
          : 'Não consegui ouvir com clareza. Tente novamente em um ambiente mais silencioso.')
      }

      reconhecimento.onend = () => {
        setOuvindoVendaVoz(false)
      }

      reconhecimento.onresult = (evento) => {
        const textoFalado = Array.from(evento.results || [])
          .map((resultado) => resultado?.[0]?.transcript || '')
          .join(' ')
          .trim()

        setTextoVendaVoz(textoFalado)
        aplicarTextoVendaPorVoz(textoFalado)
      }

      reconhecimento.start()
    } catch (erro) {
      console.error(erro)
      setOuvindoVendaVoz(false)
      setAvisoVendaVoz('Não foi possível iniciar o microfone neste navegador.')
    }
  }

  function pararLancamentoVendaPorVoz() {
    try {
      reconhecimentoVendaRef.current?.stop?.()
    } catch (erro) {
      console.error(erro)
    } finally {
      setOuvindoVendaVoz(false)
    }
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

  function moedaInputCentavos(valor) {
    const digitos = String(valor || '').replace(/\D/g, '')

    if (!digitos) return ''

    return moeda(Number(digitos) / 100)
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

  function statusPorFormaPagamentoVenda(formaPagamento) {
    const chave = chaveFormaPagamento(formaPagamento)

    if (chave.includes('fiado') || chave.includes('emaberto')) return 'EM ABERTO'
    if (
      chave.includes('pix') ||
      chave.includes('debito') ||
      chave.includes('credito') ||
      chave.includes('dinheiro') ||
      chave.includes('cartao') ||
      chave.includes('master') ||
      chave.includes('visa')
    ) return 'PAGO'

    return ''
  }

  function aplicarStatusPorFormaPagamentoVenda(formaPagamento, dataBaseVenda = dataVenda) {
    const statusSugerido = statusPorFormaPagamentoVenda(formaPagamento)

    if (!statusSugerido) return

    setStatus(statusSugerido)
    setValorPagoVenda('')

    if (statusSugerido === 'PAGO') {
      setVencimento(dataBaseVenda || dataVenda || dataHoje())
    }
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

  function statusMargemCalculada(margem) {
    if (margem >= 50) {
      return {
        texto: 'Saudável',
        classe: 'mini-indicador-saudavel',
      }
    }

    if (margem >= 35) {
      return {
        texto: 'Atenção',
        classe: 'mini-indicador-atencao',
      }
    }

    if (margem > 0) {
      return {
        texto: 'Crítica',
        classe: 'mini-indicador-critica',
      }
    }

    return {
      texto: 'Sem margem',
      classe: 'mini-indicador-neutro',
    }
  }

  function primeiroNome(nome) {
    return String(nome || '').trim().split(/\s+/)[0] || 'Cliente'
  }

  function criarDataSegura(data) {
    if (!data) return null
    if (data instanceof Date) return Number.isNaN(data.getTime()) ? null : data

    const texto = String(data).trim()
    if (!texto) return null

    if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
      const [ano, mes, dia] = texto.split('-').map(Number)
      return new Date(ano, mes - 1, dia, 12, 0, 0)
    }

    const dataObj = new Date(texto)
    return Number.isNaN(dataObj.getTime()) ? null : dataObj
  }

  function formatarDataBrasil(data) {
    const dataObj = criarDataSegura(data)
    if (!dataObj) return 'Sem data'

    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE_BRASIL,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(dataObj)
  }

  function formatarHoraBrasil(data) {
    const dataObj = criarDataSegura(data)
    if (!dataObj) return '--:--'

    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE_BRASIL,
      hour: '2-digit',
      minute: '2-digit',
    }).format(dataObj)
  }

  function formatarDataHoraBrasil(data) {
    const dataObj = criarDataSegura(data)
    if (!dataObj) return 'Sem data'
    return `${formatarDataBrasil(dataObj)} às ${formatarHoraBrasil(dataObj)}`
  }

  function dataBR(data) {
    return formatarDataBrasil(data)
  }

  function dataHoraBR(data) {
    return formatarDataHoraBrasil(data)
  }

  function horaBR(data) {
    return formatarHoraBrasil(data)
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
      return {
        emoji: '⚪',
        texto: 'Informe a última visita',
        detalhe: 'Sem data registrada',
        classe: 'border-zinc-800 bg-zinc-900/60 text-zinc-300',
        prioridade: 0,
      }
    }

    const faltam = 30 - dias

    if (faltam < 0) {
      const atraso = Math.abs(faltam)
      return {
        emoji: '🔴',
        texto: `Atrasado há ${atraso} ${atraso === 1 ? 'dia' : 'dias'}`,
        detalhe: `Última visita em ${dataBR(data)}`,
        classe: 'border-red-900 bg-red-950/35 text-red-200',
        prioridade: 3,
      }
    }

    if (faltam <= 7) {
      return {
        emoji: '🟡',
        texto: faltam === 0 ? 'Próxima visita hoje' : `Próxima visita em ${faltam} ${faltam === 1 ? 'dia' : 'dias'}`,
        detalhe: `Última visita em ${dataBR(data)}`,
        classe: 'border-yellow-800 bg-yellow-950/25 text-yellow-200',
        prioridade: 2,
      }
    }

    return {
      emoji: '🟢',
      texto: `Próxima visita em ${faltam} dias`,
      detalhe: `Última visita em ${dataBR(data)}`,
      classe: 'border-green-900 bg-green-950/25 text-green-200',
      prioridade: 1,
    }
  }

  function textoRetornoRoteiro(data) {
    return statusRoteiro(data).texto
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

    if (error) {
      console.error(error)
      const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
      if (Array.isArray(cache.clientes)) setClientes(cache.clientes)
      return
    }
    setClientes(data || [])
    atualizarCacheOffline({ clientes: data || [] })
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

    if (error) {
      console.error(error)
      const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
      if (Array.isArray(cache.produtos)) setProdutos(cache.produtos)
      return
    }
    setProdutos(data || [])
    atualizarCacheOffline({ produtos: data || [] })
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

    if (error) {
      console.error(error)
      const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
      if (Array.isArray(cache.pendencias)) setPendencias(cache.pendencias)
      return
    }
    setPendencias(data || [])
    atualizarCacheOffline({ pendencias: data || [] })
  }

  async function buscarPagamentos() {
    const { data, error } = await supabase
      .from('pagamentos')
      .select(`
        *,
        vendas (
          numero_venda,
          cliente_nome_avulso,
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
      const cache = lerJsonLocal(CHAVE_CACHE_OFFLINE, {}) || {}
      if (Array.isArray(cache.deliveries)) setDeliveries(cache.deliveries)
      return
    }

    setDeliveries(data || [])
    atualizarCacheOffline({ deliveries: data || [] })
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

    const clienteSelecionadoVenda = clientes.find((cliente) => String(cliente.id) === String(clienteId))
    const clienteSelecionadoEhAvulso = normalizarTexto(clienteSelecionadoVenda?.nome || '').includes('cliente avulso') || normalizarTexto(clienteSelecionadoVenda?.nome || '') === 'avulso'
    const nomeAvulsoParaSalvar = capitalizarNomeVendaAvulsa(clienteAvulsoVendaNome || (clienteSelecionadoEhAvulso ? buscaClienteVenda : ''))

    if (nomeAvulsoParaSalvar && normalizarTexto(nomeAvulsoParaSalvar) !== 'cliente avulso') {
      dadosVenda.cliente_nome_avulso = nomeAvulsoParaSalvar
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
      setModalVendaAberto(false)
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

    const origemPreVendaId = preVendaConvertendoId
    if (origemPreVendaId) {
      await atualizarStatusPreVenda(origemPreVendaId, 'Venda convertida')
      setPreVendaConvertendoId('')
    }

    limparVenda()
    setModalVendaAberto(false)
    await buscarTudo()
    setPagina(origemPreVendaId ? 'pre-vendas' : 'vendas')
    exibirToast(origemPreVendaId ? 'Venda lançada e pré-venda convertida.' : 'Venda lançada com sucesso.')
    if (!origemPreVendaId) setTimeout(() => buscaClienteVendaInputRef.current?.focus(), 80)
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

  function abrirModalNovaVenda() {
    limparVenda()
    setModalVendaAberto(true)
    setTimeout(() => buscaClienteVendaInputRef.current?.focus(), 80)
  }

  function fecharModalVenda() {
    setModalVendaAberto(false)
    limparVenda()
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
    setClienteAvulsoVendaNome(venda.cliente_nome_avulso || '')
    setBuscaClienteVenda(venda.cliente_nome_avulso || '')
    setValorTotal(String(venda.valor_total || ''))
    setValorPagoVenda('')
    setDataVenda(venda.data_venda || dataHoje())
    setTaxaSelecionadaId(taxa?.id || taxaFiado?.id || '')
    setStatus(statusNormalizado)

    const pendencia = pendencias.find((item) => item.venda_id === venda.id)
    setVencimento(pendencia?.vencimento || '')
    setModalVendaAberto(true)
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
    setTextoVendaVoz('')
    setAvisoVendaVoz('')
    setClienteAvulsoVendaNome('')
    setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
    setOuvindoVendaVoz(false)

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

  function chaveClienteParaSelecaoCobrancas(pendencia) {
    const cliente = clienteDaPendencia(pendencia)
    const clienteChave = pendencia?.cliente_id || cliente?.id || cliente?.nome || ''
    const referenciaChave = cliente?.referencia || ''
    return normalizarTexto(`${clienteChave}|${referenciaChave}`) || String(pendencia?.venda_id || pendencia?.id || '')
  }

  function abrirSelecaoCobrancasCliente(pendenciaBase, itensCliente = []) {
    const chaveBase = chaveClienteParaSelecaoCobrancas(pendenciaBase)
    const origemItens = Array.isArray(itensCliente) && itensCliente.length > 0 ? itensCliente : pendencias

    let itensEmAberto = (origemItens || [])
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((item) => chaveClienteParaSelecaoCobrancas(item) === chaveBase)

    if (itensEmAberto.length <= 1 && Array.isArray(itensCliente) && itensCliente.length > 0) {
      itensEmAberto = (pendencias || [])
        .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
        .filter((item) => chaveClienteParaSelecaoCobrancas(item) === chaveBase)
    }

    itensEmAberto = itensEmAberto
      .sort((a, b) => String(a.vencimento || '').localeCompare(String(b.vencimento || '')))

    if (itensEmAberto.length <= 1) {
      registrarPagamento(pendenciaBase.venda_id, pendenciaBase.saldo_restante, pendenciaBase)
      return
    }

    setModalSelecaoCobrancas({
      aberto: true,
      cliente: clienteDaPendencia(pendenciaBase),
      itens: itensEmAberto,
      selecionados: [pendenciaBase.id],
    })
  }

  function fecharModalSelecaoCobrancas() {
    fecharTecladoMobile()

    setModalSelecaoCobrancas({
      aberto: false,
      cliente: null,
      itens: [],
      selecionados: [],
    })
  }

  function alternarCobrancaSelecionada(pendenciaId) {
    setModalSelecaoCobrancas((atual) => {
      const selecionados = atual.selecionados || []
      const jaSelecionada = selecionados.includes(pendenciaId)

      return {
        ...atual,
        selecionados: jaSelecionada
          ? selecionados.filter((id) => id !== pendenciaId)
          : [...selecionados, pendenciaId],
      }
    })
  }

  async function confirmarSelecaoCobrancasCliente() {
    fecharTecladoMobile()

    const itensSelecionados = (modalSelecaoCobrancas.itens || [])
      .filter((item) => (modalSelecaoCobrancas.selecionados || []).includes(item.id))

    if (itensSelecionados.length === 0) {
      alert('Selecione pelo menos uma cobrança para confirmar.')
      return
    }

    const totalSelecionado = itensSelecionados.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)

    fecharModalSelecaoCobrancas()
    await registrarPagamentoMultiplasCobrancas(itensSelecionados, totalSelecionado)
  }

  async function registrarPagamento(vendaId, saldoAtual, pendencia = null) {
    const saldoAnterior = Number(saldoAtual || 0)
    const recebimento = await escolherFormaPagamentoRecebimento('Pix', saldoAnterior)
    if (!recebimento) return

    const valorPago = numero(recebimento.valor)
    const formaPagamentoRecebido = recebimento.forma || 'Pix'

    if (valorPago <= 0) {
      alert('Valor inválido.')
      return
    }

    if (valorPago > saldoAnterior) {
      alert('O valor recebido não pode ser maior que o saldo em aberto.')
      return
    }
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
        registrarEntradaCaixaAutomatica({
          pagamentoId: `saldo-anterior-${pendencia.id}-${Date.now()}`,
          vendaId: null,
          valorBruto: valorPago,
          formaPagamento: formaPagamentoRecebido,
          cliente: clienteDaPendencia(pendencia)?.nome || '',
          origem: 'Saldo anterior',
          observacao: 'Entrada automática de recebimento de saldo anterior.',
        })

        enviarConfirmacaoPagamentoWhatsApp(pendencia, saldoAnterior, valorPago, saldoFinal)
      }

      buscarTudo()
      return
    }

    const { data: pagamentoCriado, error: erroPagamento } = await supabase
      .from('pagamentos')
      .insert({
        venda_id: vendaId,
        data_pagamento: dataHoje(),
        valor_pago: valorPago,
        forma_pagamento: formaPagamentoRecebido,
        observacao: 'Pagamento registrado pelo Mini ERP',
        status: 'CONFIRMADO',
      })
      .select()
      .single()

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
      registrarEntradaCaixaAutomatica({
        pagamentoId: pagamentoCriado?.id,
        vendaId,
        valorBruto: valorPago,
        formaPagamento: formaPagamentoRecebido,
        cliente: clienteDaPendencia(pendencia)?.nome || '',
        origem: 'Pendência',
        observacao: 'Entrada automática de recebimento de pendência.',
      })

      enviarConfirmacaoPagamentoWhatsApp(pendencia, saldoAnterior, valorPago, saldoFinal)
    }

    buscarTudo()
  }

  async function registrarPagamentoMultiplasCobrancas(itensSelecionados = [], totalSelecionado = 0) {
    const total = Number(totalSelecionado || 0)

    if (!Array.isArray(itensSelecionados) || itensSelecionados.length === 0 || total <= 0) {
      alert('Nenhuma cobrança selecionada para confirmação.')
      return
    }

    const recebimento = await escolherFormaPagamentoRecebimento('Pix', total)
    if (!recebimento) return

    const valorRecebido = numero(recebimento.valor)
    const formaPagamentoRecebido = recebimento.forma || 'Pix'

    if (Math.abs(valorRecebido - total) > 0.009) {
      alert(`Para confirmar várias cobranças, o valor recebido deve ser exatamente ${moeda(total)}.`)
      return
    }

    try {
      for (const pendencia of itensSelecionados) {
        const valorPendencia = Number(pendencia.saldo_restante || 0)
        const vendaId = pendencia.venda_id

        if (valorPendencia <= 0) continue

        if (pendenciaEhHerdada(pendencia) || !vendaId) {
          const { error } = await supabase
            .from('pendencias')
            .update({
              saldo_restante: 0,
              status: 'PAGO',
            })
            .eq('id', pendencia.id)

          if (error) throw error

          registrarEntradaCaixaAutomatica({
            pagamentoId: `saldo-anterior-${pendencia.id}-${Date.now()}`,
            vendaId: null,
            valorBruto: valorPendencia,
            formaPagamento: formaPagamentoRecebido,
            cliente: clienteDaPendencia(pendencia)?.nome || '',
            origem: 'Saldo anterior',
            observacao: 'Entrada automática de recebimento de saldo anterior.',
          })
        } else {
          const { data: pagamentoCriado, error: erroPagamento } = await supabase
            .from('pagamentos')
            .insert({
              venda_id: vendaId,
              data_pagamento: dataHoje(),
              valor_pago: valorPendencia,
              forma_pagamento: formaPagamentoRecebido,
              observacao: 'Pagamento registrado pelo Mini ERP',
              status: 'CONFIRMADO',
            })
            .select()
            .single()

          if (erroPagamento) throw erroPagamento

          const { error: erroPendencia } = await supabase
            .from('pendencias')
            .update({
              saldo_restante: 0,
              status: 'PAGO',
            })
            .eq('id', pendencia.id)

          if (erroPendencia) throw erroPendencia

          const { error: erroVenda } = await supabase
            .from('vendas')
            .update({
              status: 'PAGO',
            })
            .eq('id', vendaId)

          if (erroVenda) throw erroVenda

          registrarEntradaCaixaAutomatica({
            pagamentoId: pagamentoCriado?.id,
            vendaId,
            valorBruto: valorPendencia,
            formaPagamento: formaPagamentoRecebido,
            cliente: clienteDaPendencia(pendencia)?.nome || '',
            origem: 'Pendência',
            observacao: 'Entrada automática de recebimento de pendência.',
          })
        }
      }

      enviarConfirmacaoPagamentoWhatsAppMultiplas(itensSelecionados, total)
      buscarTudo()
    } catch (erro) {
      alert('Erro ao registrar as cobranças selecionadas.')
      console.error(erro)
    }
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

    const cliente = nomeClientePagamento(pagamento)
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
      registrarSaidaCaixaAutomatica({
        pagamentoId: pagamento.id,
        vendaId: pagamento.venda_id,
        valorBruto: pagamento.valor_pago,
        formaPagamento: pagamento.forma_pagamento,
        cliente,
        origem: 'Estorno',
        observacao: motivo || 'Saída automática por estorno de pagamento.',
      })
      alert('Pagamento estornado, caixa abatido e venda recalculada com sucesso.')
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
      registrarSaidaCaixaAutomatica({
        pagamentoId: pagamento.id,
        vendaId: pagamento.venda_id,
        valorBruto: pagamento.valor_pago,
        formaPagamento: pagamento.forma_pagamento,
        cliente: nomeClientePagamento(pagamento),
        origem: 'Estorno forçado',
        observacao: pagamento.observacao_estorno || 'Saída automática por estorno forçado.',
      })
      alert('Estorno corrigido, caixa abatido e venda recalculada.')
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
      registrarEntradaCaixaAutomatica({
        pagamentoId: pagamento.id,
        vendaId: pagamento.venda_id,
        valorBruto: pagamento.valor_pago,
        formaPagamento: pagamento.forma_pagamento,
        cliente: nomeClientePagamento(pagamento),
        origem: 'Reativação de pagamento',
        observacao: 'Entrada automática por reativação de pagamento.',
      })
      alert('Pagamento reativado, caixa atualizado e venda recalculada.')
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

  function editarPendenciaFinanceira(pendencia) {
    const saldoAtual = Number(pendencia.saldo_restante || 0)
    const statusAtual = normalizarStatus(pendencia.status) || 'EM ABERTO'

    setModalEdicaoPendencia({
      aberto: true,
      pendencia,
      saldo: saldoAtual.toFixed(2).replace('.', ','),
      vencimento: pendencia.vencimento || '',
      status: ['EM ABERTO', 'PARCIAL', 'PAGO'].includes(statusAtual) ? statusAtual : 'EM ABERTO',
    })
  }

  function fecharModalEdicaoPendencia() {
    setModalEdicaoPendencia({
      aberto: false,
      pendencia: null,
      saldo: '',
      vencimento: '',
      status: 'EM ABERTO',
    })
  }

  async function salvarEdicaoPendenciaFinanceira() {
    const pendencia = modalEdicaoPendencia.pendencia

    if (!pendencia) return

    const novoSaldoDigitado = numero(modalEdicaoPendencia.saldo)

    if (novoSaldoDigitado < 0) {
      alert('Saldo inválido.')
      return
    }

    let novoStatus = String(modalEdicaoPendencia.status || 'EM ABERTO').toUpperCase().trim()

    if (!['EM ABERTO', 'PARCIAL', 'PAGO'].includes(novoStatus)) {
      alert('Status inválido. Use EM ABERTO, PARCIAL ou PAGO.')
      return
    }

    const saldoFinal = novoStatus === 'PAGO' || novoSaldoDigitado <= 0 ? 0 : novoSaldoDigitado

    if (saldoFinal === 0) {
      novoStatus = 'PAGO'
    }

    const vencimentoFinal = modalEdicaoPendencia.vencimento || null

    const { error: erroPendencia } = await supabase
      .from('pendencias')
      .update({
        saldo_restante: saldoFinal,
        vencimento: vencimentoFinal,
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

    fecharModalEdicaoPendencia()
    buscarTudo()
    exibirToast('Pendência atualizada com sucesso.')
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

    const mensagemQuitada = `✅ PAGAMENTO CONFIRMADO.

Recebi o pagamento de ${moeda(valorPago)} referente à sua compra dos produtos da Queijos Serra da Canastra.

Muito obrigado e até breve.

Delber Vilaça
Queijos Serra da Canastra 🇧🇷`

    const mensagem = saldoFinal > 0 ? mensagemParcial : mensagemQuitada
    abrirWhatsApp({ telefone, mensagem })
  }

  function enviarConfirmacaoPagamentoWhatsAppMultiplas(itensSelecionados = [], valorTotal = 0) {
    const primeiraPendencia = itensSelecionados[0]
    const cliente = clienteDaPendencia(primeiraPendencia || {})
    const telefone = limparTelefone(cliente.telefone)

    if (!telefone) {
      alert('Pagamentos registrados, mas este cliente não possui telefone cadastrado para envio da confirmação.')
      return
    }

    const mensagem = `✅ PAGAMENTO CONFIRMADO.

Recebi o pagamento de ${moeda(valorTotal)} referente às suas compras dos produtos da Queijos Serra da Canastra.

Muito obrigado e até breve.

Delber Vilaça
Queijos Serra da Canastra 🇧🇷`

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

  function montarMensagemCobranca({ cliente, valor }) {
    const nomeCliente = cliente.nome || 'cliente'

    return `Olá, ${nomeCliente}. Tudo bem?

Conforme combinado, seguem os dados para o pagamento via Pix da sua compra:

💰 Valor: ${valor}

🔑 Chave Pix:
queijosserradacanastra@hotmail.com

Dados para conferência:
Delber Juliano Vilaça
Stone Pagamentos S.A.

Assim que realizar a transferência, peço a gentileza de enviar o comprovante para registro.

Atenciosamente,
Delber Vilaça | Queijos Serra da Canastra`
  }

  function montarMensagemResumoPix({ valor }) {
    return `📌 Pagamento via Pix – Queijos Serra da Canastra 🇧🇷

Para realizar o pagamento, utilize a chave Pix abaixo:

🔑 Chave Pix (e-mail):

queijosserradacanastra@hotmail.com

Dados do destinatário para conferência:
Nome: Delber Juliano Vilaça
Instituição: Stone Pagamentos S.A.

💰 Valor da compra: ${valor}

Após realizar a transferência, peço que envie o comprovante para que eu possa registrar o pagamento no sistema.

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

    abrirWhatsApp({
      telefone,
      mensagem: montarMensagemCobranca({ cliente, valor }),
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
      alert('Este cliente não possui valores em aberto para cobrança.')
      return
    }

    const itensVencidos = itensEmAberto.filter((item) => !item.vencimento || item.vencimento <= hoje)
    const itensValidos = somenteVencidos && itensVencidos.length > 0 ? itensVencidos : itensEmAberto
    const total = itensValidos.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)

    abrirWhatsApp({
      telefone,
      mensagem: montarMensagemCobranca({ cliente, valor: moeda(total) }),
    })
  }

  function resumoPixWhatsAppConsolidado(cliente, itens) {
    const telefone = limparTelefone(cliente.telefone)

    if (!telefone) {
      alert('Este cliente não possui telefone cadastrado.')
      return
    }

    const itensEmAberto = (itens || [])
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)

    if (itensEmAberto.length === 0) {
      alert('Este cliente não possui valores em aberto para resumo.')
      return
    }

    const total = itensEmAberto.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)

    abrirWhatsApp({
      telefone,
      mensagem: montarMensagemResumoPix({ valor: moeda(total) }),
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
      exibirToast('Informe o nome do cliente.', 'erro')
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
      exibirToast('Já existe um cliente cadastrado com este nome, referência e observação.', 'erro')
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
        exibirToast('Erro ao editar cliente.', 'erro')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase.from('clientes').insert({
        ...dados,
        ativo: true,
      })

      if (error) {
        exibirToast('Erro ao cadastrar cliente.', 'erro')
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

  function extrairCampoClientePorVoz(texto, marcadores, paradas) {
    const fonte = String(texto || '').replace(/\s+/g, ' ').trim()
    if (!fonte) return ''

    const marcador = marcadores.join('|')
    const parada = paradas.join('|')
    if (!parada) {
      const regexAteOFim = new RegExp(`(?:^|[\\s,;.])(?:${marcador})\\s*[:\\-]?\\s*(.+)$`, 'i')
      const encontradoAteOFim = fonte.match(regexAteOFim)
      return encontradoAteOFim?.[1]?.trim() || ''
    }

    const regex = new RegExp(`(?:^|[\\s,;.])(?:${marcador})\\s*[:\\-]?\\s*(.+?)(?=\\s+(?:${parada})\\b|[,;.]|$)`, 'i')
    const encontrado = fonte.match(regex)

    return encontrado?.[1]?.trim() || ''
  }

  function interpretarClientePorVoz(texto) {
    const nome = extrairCampoClientePorVoz(
      texto,
      ['nome', 'cliente'],
      ['refer[eê]ncia', 'referencia', 'ref', 'telefone', 'tel', 'fone', 'contato', 'observa[cç][aã]o', 'observacao', 'obs']
    )
    const referencia = extrairCampoClientePorVoz(
      texto,
      ['refer[eê]ncia', 'referencia', 'ref'],
      ['nome', 'cliente', 'telefone', 'tel', 'fone', 'contato', 'observa[cç][aã]o', 'observacao', 'obs']
    )
    const telefone = limparTelefone(extrairCampoClientePorVoz(
      texto,
      ['telefone', 'tel', 'fone', 'contato'],
      ['nome', 'cliente', 'refer[eê]ncia', 'referencia', 'ref', 'observa[cç][aã]o', 'observacao', 'obs']
    ))
    const observacao = extrairCampoClientePorVoz(
      texto,
      ['observa[cç][aã]o', 'observacao', 'obs'],
      []
    )

    return { nome, referencia, telefone, observacao }
  }

  function aplicarTextoClientePorVoz(texto) {
    const dadosCliente = interpretarClientePorVoz(texto)
    const temDados = dadosCliente.nome || dadosCliente.referencia || dadosCliente.telefone || dadosCliente.observacao

    if (!temDados) {
      setAvisoClienteVoz('Não identifiquei nome, referência, telefone ou observação. Fale usando esses marcadores.')
      return
    }

    setModalEdicaoCliente((atual) => ({
      ...atual,
      nome: dadosCliente.nome || atual.nome,
      referencia: dadosCliente.referencia || atual.referencia,
      telefone: dadosCliente.telefone || atual.telefone,
      observacao: dadosCliente.observacao || '',
    }))
    setAvisoClienteVoz('Dados preenchidos por voz. Confira e clique em Cadastrar cliente.')
  }

  function pararClientePorVoz({ aplicar = true } = {}) {
    deveAplicarClienteNoFimRef.current = aplicar

    if (!ouvindoClienteVoz) {
      setOuvindoClienteVoz(false)
      return
    }

    try {
      reconhecimentoClienteRef.current?.stop()
    } catch (erro) {
      console.error(erro)
    }
    setOuvindoClienteVoz(false)
  }

  function cadastrarClientePorVoz() {
    if (ouvindoClienteVoz) {
      pararClientePorVoz({ aplicar: true })
      return
    }

    if (typeof window === 'undefined' || !(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setAvisoClienteVoz('Microfone por voz não disponível neste navegador. Use Chrome ou Edge.')
      return
    }

    try {
      const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition
      const reconhecimento = new Reconhecimento()
      reconhecimentoClienteRef.current = reconhecimento
      reconhecimento.lang = 'pt-BR'
      reconhecimento.interimResults = true
      reconhecimento.continuous = true
      reconhecimento.maxAlternatives = 1

      textoClienteAcumuladoRef.current = ''
      deveAplicarClienteNoFimRef.current = false
      setTextoClienteVoz('')

      reconhecimento.onstart = () => {
        setOuvindoClienteVoz(true)
        setAvisoClienteVoz('Ouvindo cliente. Exemplo: nome Ana, referência CEAN, telefone 61 99999 0000, observação entregar parte da manhã.')
      }

      reconhecimento.onerror = (evento) => {
        deveAplicarClienteNoFimRef.current = false
        setOuvindoClienteVoz(false)
        reconhecimentoClienteRef.current = null
        setAvisoClienteVoz(evento?.error === 'not-allowed'
          ? 'Permita o uso do microfone no navegador para cadastrar cliente por voz.'
          : 'Não consegui ouvir com clareza. Tente novamente em um ambiente mais silencioso.')
      }

      reconhecimento.onend = () => {
        const textoFinal = textoClienteAcumuladoRef.current.trim()
        if (deveAplicarClienteNoFimRef.current && textoFinal) {
          aplicarTextoClientePorVoz(textoFinal)
        } else if (deveAplicarClienteNoFimRef.current && !textoFinal) {
          setAvisoClienteVoz('Não ouvi nenhuma informação. Tente novamente.')
        }
        deveAplicarClienteNoFimRef.current = false
        setOuvindoClienteVoz(false)
        reconhecimentoClienteRef.current = null
      }

      reconhecimento.onresult = (evento) => {
        const textoFalado = Array.from(evento.results || [])
          .map((resultado) => resultado?.[0]?.transcript || '')
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()

        textoClienteAcumuladoRef.current = textoFalado
        if (textoFalado) setTextoClienteVoz(textoFalado)
      }

      reconhecimento.start()
    } catch (erro) {
      console.error(erro)
      deveAplicarClienteNoFimRef.current = false
      setOuvindoClienteVoz(false)
      setAvisoClienteVoz('Não foi possível iniciar o microfone neste navegador.')
    }
  }

  function abrirModalNovoCliente() {
    setClienteModalOrigemVenda(false)
    setClienteModalOrigemDelivery(false)
    setAvisoClienteVoz('')
    setTextoClienteVoz('')
    setClienteExpandidoId(null)
    setEditandoClienteId(null)
    setFormCliente({ nome: '', referencia: '', observacao: '', telefone: '' })
    setModalEdicaoCliente({
      aberto: true,
      cliente: null,
      nome: '',
      referencia: '',
      observacao: '',
      telefone: '',
      ativo: true,
    })
  }

  function abrirModalNovoClientePelaVenda() {
    const nomeSugerido = capitalizarNomeVendaAvulsa(clienteAvulsoVendaNome || buscaClienteVenda || '')

    setClienteModalOrigemVenda(true)
    setClienteModalOrigemDelivery(false)
    setAvisoClienteVoz('')
    setTextoClienteVoz('')
    setClienteExpandidoId(null)
    setEditandoClienteId(null)
    setFormCliente({ nome: '', referencia: '', observacao: '', telefone: '' })
    setModalEdicaoCliente({
      aberto: true,
      cliente: null,
      nome: nomeSugerido,
      referencia: '',
      observacao: '',
      telefone: '',
      ativo: true,
    })
  }

  function abrirModalNovoClientePeloDelivery() {
    const nomeSugerido = capitalizarNomeVendaAvulsa(buscaClienteDelivery || clienteDeliveryNomeSugerido || '')
    const referenciaSugerida = formDelivery.local_entrega || formDelivery.referencia || ''

    setClienteModalOrigemVenda(false)
    setClienteModalOrigemDelivery(true)
    setClienteDeliveryNomeSugerido(nomeSugerido)
    setAvisoClienteVoz('')
    setTextoClienteVoz('')
    setClienteExpandidoId(null)
    setEditandoClienteId(null)
    setFormCliente({ nome: '', referencia: '', observacao: '', telefone: '' })
    setPagina('clientes')
    setModalEdicaoCliente({
      aberto: true,
      cliente: null,
      nome: nomeSugerido,
      referencia: referenciaSugerida,
      observacao: '',
      telefone: '',
      ativo: true,
    })
  }

  function editarCliente(cliente) {
    setClienteModalOrigemVenda(false)
    setClienteModalOrigemDelivery(false)
    setAvisoClienteVoz('')
    setTextoClienteVoz('')
    setClienteExpandidoId(null)
    setModalEdicaoCliente({
      aberto: true,
      cliente,
      nome: cliente.nome || '',
      referencia: cliente.referencia || '',
      observacao: cliente.observacao || '',
      telefone: cliente.telefone || '',
      ativo: cliente.ativo !== false,
    })
  }

  function fecharModalEdicaoCliente() {
    const voltarParaDelivery = clienteModalOrigemDelivery
    pararClientePorVoz({ aplicar: false })
    setAvisoClienteVoz('')
    setTextoClienteVoz('')
    setClienteModalOrigemVenda(false)
    setClienteModalOrigemDelivery(false)
    setModalEdicaoCliente({
      aberto: false,
      cliente: null,
      nome: '',
      referencia: '',
      observacao: '',
      telefone: '',
      ativo: true,
    })
    if (voltarParaDelivery) setPagina('delivery')
  }

  async function salvarEdicaoClienteModal() {
    const clienteAtual = modalEdicaoCliente.cliente
    const nomeCliente = modalEdicaoCliente.nome.trim()

    if (!nomeCliente) {
      exibirToast('Informe o nome do cliente.', 'erro')
      return
    }

    const telefoneLimpo = limparTelefone(modalEdicaoCliente.telefone)

    const clienteDuplicado = clientes.find((cliente) => {
      const mesmoNome = normalizarTexto(cliente.nome) === normalizarTexto(nomeCliente)
      const mesmaReferencia = normalizarTexto(cliente.referencia) === normalizarTexto(modalEdicaoCliente.referencia)
      const mesmaObservacao = normalizarTexto(cliente.observacao) === normalizarTexto(modalEdicaoCliente.observacao)
      const clienteDiferente = !clienteAtual || String(cliente.id) !== String(clienteAtual.id)

      return clienteDiferente && mesmoNome && mesmaReferencia && mesmaObservacao
    })

    if (clienteDuplicado) {
      exibirToast('Já existe um cliente cadastrado com este nome, referência e observação.', 'erro')
      return
    }

    const dadosCliente = {
      nome: nomeCliente,
      referencia: modalEdicaoCliente.referencia.trim(),
      observacao: modalEdicaoCliente.observacao.trim(),
      telefone: telefoneLimpo,
      ativo: Boolean(modalEdicaoCliente.ativo),
    }

    if (clienteAtual) {
      const { error } = await supabase
        .from('clientes')
        .update(dadosCliente)
        .eq('id', clienteAtual.id)

      if (error) {
        console.error(error)
        exibirToast('Erro ao editar cliente.', 'erro')
        return
      }

      fecharModalEdicaoCliente()
      buscarTudo()
      exibirToast('Cliente atualizado com sucesso.')
      return
    }

    const { data: clienteCriado, error } = await supabase
      .from('clientes')
      .insert(dadosCliente)
      .select('*')
      .single()

    if (error) {
      console.error(error)
      exibirToast('Erro ao cadastrar cliente.', 'erro')
      return
    }

    if (clienteModalOrigemVenda && clienteCriado?.id) {
      setClientes((listaAtual) => {
        const jaExiste = listaAtual.some((cliente) => String(cliente.id) === String(clienteCriado.id))
        return jaExiste ? listaAtual : [clienteCriado, ...listaAtual]
      })
      setClienteId(clienteCriado.id)
      setBuscaClienteVenda('')
      setClienteAvulsoVendaNome('')
      setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
      setClienteModalOrigemVenda(false)
      fecharModalEdicaoCliente()
      buscarTudo()
      exibirToast('Cliente cadastrado e selecionado na venda.')
      return
    }

    if (clienteModalOrigemDelivery && clienteCriado?.id) {
      setClientes((listaAtual) => {
        const jaExiste = listaAtual.some((cliente) => String(cliente.id) === String(clienteCriado.id))
        return jaExiste ? listaAtual : [clienteCriado, ...listaAtual]
      })
      setFormDelivery((deliveryAtual) => ({
        ...deliveryAtual,
        cliente_id: clienteCriado.id,
        referencia: deliveryAtual.referencia || clienteCriado.referencia || '',
        local_entrega: deliveryAtual.local_entrega || deliveryAtual.referencia || clienteCriado.referencia || '',
      }))
      setBuscaClienteDelivery(clienteCriado.nome || '')
      setClienteModalOrigemDelivery(false)
      setPagina('delivery')
      fecharModalEdicaoCliente()
      buscarTudo()
      exibirToast('Cliente cadastrado e vinculado ao Delivery.')
      return
    }

    setModalEdicaoCliente({
      aberto: true,
      cliente: null,
      nome: '',
      referencia: '',
      observacao: '',
      telefone: '',
      ativo: true,
    })
    buscarTudo()
    exibirToast('Cliente cadastrado com sucesso.')

    setTimeout(() => {
      clienteNomeInputRef.current?.focus()
    }, 80)
  }

  async function salvarProduto(e) {
    e.preventDefault()

    if (!formProduto.nome.trim()) {
      exibirToast('Informe o nome do produto.', 'erro')
      return
    }

    const dados = {
      nome: formProduto.nome.trim(),
      fornecedor_id: formProduto.fornecedor_id ? Number(formProduto.fornecedor_id) : null,
      preco_custo: numero(formProduto.preco_custo),
      preco_venda: numero(formProduto.preco_venda),
      estoque: Number(formProduto.estoque || 0),
      ativo: Boolean(formProduto.ativo),
    }

    const { error } = await supabase.from('produtos').insert(dados)

    if (error) {
      exibirToast('Erro ao cadastrar produto.', 'erro')
      console.error(error)
      return
    }

    limparProduto()
    buscarProdutos()
    exibirToast('Produto cadastrado com sucesso.')
  }

  function editarProduto(produto) {
    setEditandoProdutoId(produto.id)
    setModalEdicaoProduto({
      aberto: true,
      produto,
      nome: produto.nome || '',
      fornecedor_id: produto.fornecedor_id ? String(produto.fornecedor_id) : '',
      preco_custo: String(produto.preco_custo || ''),
      preco_venda: String(produto.preco_venda || ''),
      estoque: String(produto.estoque || ''),
      ativo: produto.ativo !== false,
    })
  }

  function abrirModalCadastroProduto() {
    setEditandoProdutoId(null)
    setModalEdicaoProduto({
      aberto: true,
      produto: null,
      nome: '',
      fornecedor_id: '',
      preco_custo: '',
      preco_venda: '',
      estoque: '',
      ativo: true,
    })
  }

  function fecharModalEdicaoProduto() {
    setEditandoProdutoId(null)
    setModalEdicaoProduto({
      aberto: false,
      produto: null,
      nome: '',
      fornecedor_id: '',
      preco_custo: '',
      preco_venda: '',
      estoque: '',
      ativo: true,
    })
  }

  async function salvarEdicaoProdutoModal() {
    const produtoAtual = modalEdicaoProduto.produto

    if (!modalEdicaoProduto.nome.trim()) {
      exibirToast('Informe o nome do produto.', 'erro')
      return
    }

    const dados = {
      nome: modalEdicaoProduto.nome.trim(),
      fornecedor_id: modalEdicaoProduto.fornecedor_id ? Number(modalEdicaoProduto.fornecedor_id) : null,
      preco_custo: numero(modalEdicaoProduto.preco_custo),
      preco_venda: numero(modalEdicaoProduto.preco_venda),
      estoque: Number(modalEdicaoProduto.estoque || 0),
      ativo: Boolean(modalEdicaoProduto.ativo),
    }

    const operacao = produtoAtual?.id
      ? supabase.from('produtos').update(dados).eq('id', produtoAtual.id)
      : supabase.from('produtos').insert(dados)

    const { error } = await operacao

    if (error) {
      exibirToast(produtoAtual?.id ? 'Erro ao editar produto.' : 'Erro ao cadastrar produto.', 'erro')
      console.error(error)
      return
    }

    fecharModalEdicaoProduto()
    buscarProdutos()
    exibirToast(produtoAtual?.id ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.')
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
      setBuscaClienteDelivery('')
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
    setBuscaClienteDelivery(venda.clientes?.nome || '')
  }

  async function salvarDelivery(e) {
    e.preventDefault()
    const estavaEditandoDelivery = Boolean(editandoDeliveryId)

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

    const origemPreVendaId = preVendaDeliveryOrigemId

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

    if (origemPreVendaId && !editandoDeliveryId) {
      const statusDelivery = dados.data_entrega
        ? `Delivery programado ${dados.data_entrega}`
        : 'Delivery programado'
      await atualizarStatusPreVenda(origemPreVendaId, statusDelivery)
      setPreVendaDeliveryOrigemId('')
      setClienteDeliveryNomeSugerido('')
    }

    limparDelivery()
    if (estavaEditandoDelivery) {
      setModalEdicaoDelivery({ aberto: false, item: null })
    }
    buscarDelivery()
  }

  function fecharMenusAcoesAbertos(menuAtual = null) {
    if (typeof document === 'undefined') return

    document
      .querySelectorAll(MENUS_ACOES_SELECTOR)
      .forEach((menu) => {
        if (menu !== menuAtual) menu.open = false
      })
  }

  function aoAlternarMenuAcoes(event) {
    const menuAtual = event.currentTarget
    if (menuAtual.open) fecharMenusAcoesAbertos(menuAtual)
  }

  function editarDelivery(item) {
    fecharMenusAcoesAbertos()
    setDeliveryExpandidoId(null)
    setEditandoDeliveryId(item.id)
    setClienteDeliveryNomeSugerido('')
    setBuscaClienteDelivery(item.clientes?.nome || '')
    setModalEdicaoDelivery({ aberto: true, item })

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
  }

  function fecharModalEdicaoDelivery() {
    setModalEdicaoDelivery({ aberto: false, item: null })
    limparDelivery()
  }

  function limparDelivery() {
    setEditandoDeliveryId(null)
    setClienteDeliveryNomeSugerido('')
    setBuscaClienteDelivery('')
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

  function cancelarDeliveryPreVenda() {
    limparDelivery()
    setPreVendaDeliveryOrigemId('')
    setClienteDeliveryNomeSugerido('')
    setPagina('pre-vendas')
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80)
    exibirToast('Delivery cancelado. A pre-venda original foi preservada.')
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

    const clienteNomeDelivery = item.clientes?.nome || 'cliente'
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
      `Confirmar entrega e criar venda ${resumo.statusFinal} para ${clienteNomeDelivery}?`
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

      const { data: pagamentosCriados, error: erroPagamento } = await supabase
        .from('pagamentos')
        .insert(pagamentosParaInserir)
        .select('id, venda_id, valor_pago, forma_pagamento')

      if (erroPagamento) {
        alert('Venda criada, mas houve erro ao registrar o pagamento.')
        console.error(erroPagamento)
      } else {
        ;(pagamentosCriados || []).forEach((pagamentoCriado) => {
          registrarEntradaCaixaAutomatica({
            pagamentoId: pagamentoCriado.id,
            vendaId: vendaCriada.id,
            valorBruto: pagamentoCriado.valor_pago,
            formaPagamento: pagamentoCriado.forma_pagamento,
            cliente: clienteNomeDelivery,
            origem: 'Delivery',
            observacao: resumo.statusFinal === 'PARCIAL'
              ? 'Entrada automática por pagamento parcial criado a partir do Delivery.'
              : 'Entrada automática por pagamento integral criado a partir do Delivery.',
          })
        })
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
      data_visita: formRoteiroVendas.data_visita || dataHoje(),
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
      data_visita: item.data_visita ? String(item.data_visita).slice(0, 10) : dataHoje(),
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
      data_visita: dataHoje(),
    })
  }

  async function alternarConcluidoRoteiroVendas(item) {
    const novoConcluido = !item.concluido
    const payload = novoConcluido
      ? { concluido: true, data_visita: dataHoje(), updated_at: new Date().toISOString() }
      : { concluido: false, updated_at: new Date().toISOString() }

    const { error } = await supabase
      .from('roteiro_vendas_v2')
      .update(payload)
      .eq('id', item.id)

    if (error) {
      alert('Erro ao atualizar o check.')
      console.error(error)
      return
    }

    buscarRoteiroVendas()
  }

  async function ajustarDataVisitaRoteiro(item, novaData) {
    if (!item?.id || !novaData) return

    const { error } = await supabase
      .from('roteiro_vendas_v2')
      .update({ data_visita: novaData, updated_at: new Date().toISOString() })
      .eq('id', item.id)

    if (error) {
      alert('Erro ao ajustar a data da visita.')
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
    return (roteirosVendas || [])
      .filter((item) => {
        if (categoria && String(item.categoria || '').toUpperCase() !== categoria) return false
        const status = statusRoteiro(item.data_visita)
        const texto = `${item.local || ''} ${item.referencia || ''} ${item.horario || ''} ${item.observacao || ''} ${item.tipo || ''} ${item.data_visita || ''} ${status.texto || ''} ${item.concluido ? 'marcado concluido' : 'pendente'}`
        return contemTermos(texto, buscaRoteiroVendas)
      })
      .sort((a, b) => {
        const statusA = statusRoteiro(a.data_visita)
        const statusB = statusRoteiro(b.data_visita)

        if (statusA.prioridade !== statusB.prioridade) return statusB.prioridade - statusA.prioridade

        const diasA = diasDesdeData(a.data_visita) ?? -999
        const diasB = diasDesdeData(b.data_visita) ?? -999
        return diasB - diasA
      })
  }

  function botaoMenu(id, icone, texto) {
    const ativo = pagina === id

    return (
      <button
        key={id}
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
    { id: 'pre-vendas', icone: '🎙️', texto: 'Pré-vendas' },
    { id: 'pix-rapido', icone: 'QR', texto: 'Pix Rápido / QR Code' },
    { id: 'vendas', icone: '🧾', texto: 'Vendas' },
    { id: 'clientes', icone: '👤', texto: 'Cadastro de Clientes' },
    { id: 'produtos', icone: '🧀', texto: 'Cadastro de Produtos' },
    { id: 'produtos-controle', icone: '📦', texto: 'Lançamentos de Produtos' },
    { id: 'delivery', icone: '🚚', texto: 'Delivery' },
    { id: 'offline', icone: '🛡️', texto: 'Operação Offline' },
    { id: 'diagnostico', icone: '🩺', texto: 'Diagnóstico do Sistema' },
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

  function CardResumo({ titulo, valor, classe, onClick, ativo = false }) {
    const clicavel = typeof onClick === 'function'

    return (
      <div
        role={clicavel ? 'button' : undefined}
        tabIndex={clicavel ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (!clicavel) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        className={`bg-black border rounded-[28px] p-6 transition ${
          ativo
            ? 'border-orange-600 bg-orange-950/35'
            : 'border-orange-950'
        } ${clicavel ? 'cursor-pointer hover:border-orange-700 hover:bg-orange-950/20' : ''}`}
      >
        <p className="text-zinc-500 mb-3">{titulo}</p>
        <h3 className={`text-3xl font-bold ${classe}`}>{valor}</h3>
      </div>
    )
  }

  function TelaPainel() {
    const inicioMesPainel = inicioMesAtual()
    const saldoCaixaAtualInformado = Number(caixaAtual || 0)
    const periodoAnterior = periodoMesAnterior()

    function dataBasePainel(item, campoPrincipal = 'data_venda') {
      return String(item?.[campoPrincipal] || item?.vendas?.data_venda || item?.created_at || '').slice(0, 10)
    }

    function pertenceAoMesAtualPainel(item, campoPrincipal = 'data_venda') {
      const data = dataBasePainel(item, campoPrincipal)
      return data && data >= inicioMesPainel
    }

    function pertenceAoPeriodoPainel(item, campoPrincipal, inicio, fim) {
      const data = dataBasePainel(item, campoPrincipal)
      return data && data >= inicio && data <= fim
    }

    function calcularPeriodoPainel({ inicio, fim }) {
      const vendasPeriodo = vendas.filter((venda) => pertenceAoPeriodoPainel(venda, 'data_venda', inicio, fim))
      const movimentacoesPeriodo = movimentacoesProdutos.filter((item) => pertenceAoPeriodoPainel(item, 'data_venda', inicio, fim))
      const despesasPeriodo = despesas.filter((item) => pertenceAoPeriodoPainel(item, 'data_despesa', inicio, fim))
      const pagamentosPeriodo = pagamentos.filter((pagamento) => pertenceAoPeriodoPainel(pagamento, 'data_pagamento', inicio, fim))

      const bruto = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
      const taxas = vendasPeriodo.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
      const custoProdutos = movimentacoesPeriodo.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
      const despesasTotal = despesasPeriodo.reduce((acc, item) => acc + Number(item.valor || 0), 0)
      const resultadoProjetado = bruto - custoProdutos - taxas - despesasTotal
      const pecas = movimentacoesPeriodo.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
      const numeroVendasPeriodo = vendasPeriodo.length
      const clientesPeriodo = new Set(vendasPeriodo.map((venda) => venda.cliente_id).filter(Boolean)).size
      const recebido = pagamentosPeriodo.reduce((acc, pagamento) => acc + Number(pagamento.valor_pago || 0), 0)

      return {
        bruto,
        taxas,
        custoProdutos,
        despesasTotal,
        resultadoProjetado,
        pecas,
        numeroVendas: numeroVendasPeriodo,
        clientes: clientesPeriodo,
        recebido,
        ticketMedio: numeroVendasPeriodo > 0 ? bruto / numeroVendasPeriodo : 0,
        mediaLiquidaPorPeca: pecas > 0 ? resultadoProjetado / pecas : 0,
        margemOperacional: bruto > 0 ? (resultadoProjetado / bruto) * 100 : 0,
      }
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

    const lucroOperacionalProjetado = totalBruto - totalCustoProdutos - totalTaxas - totalDespesas
    const totalProjetadoFinal = lucroOperacionalProjetado
    const totalValoresAReceber = totalPendencias + saldoAnteriorEmAberto
    const recursosTotaisConservador = saldoCaixaAtualInformado + totalValoresAReceber
    const percentualRecebidoSobreVendido = totalBruto > 0 ? (totalRecebido / totalBruto) * 100 : 0
    const caixaLiquidoRealizado = saldoCaixaAtualInformado

    const periodoCardsPainelSelecionado = (() => {
      if (periodoCardsPainel === 'mesAnterior') return periodoAnterior
      if (periodoCardsPainel === 'todos') return { inicio: '0000-01-01', fim: '9999-12-31' }
      return { inicio: inicioMesPainel, fim: dataHoje() }
    })()

    const vendasCardsPainel = vendas.filter((venda) => pertenceAoPeriodoPainel(venda, 'data_venda', periodoCardsPainelSelecionado.inicio, periodoCardsPainelSelecionado.fim))
    const pagamentosCardsPainel = pagamentos.filter((pagamento) => pertenceAoPeriodoPainel(pagamento, 'data_pagamento', periodoCardsPainelSelecionado.inicio, periodoCardsPainelSelecionado.fim))
    const movimentacoesCardsPainel = movimentacoesProdutos.filter((item) => pertenceAoPeriodoPainel(item, 'data_venda', periodoCardsPainelSelecionado.inicio, periodoCardsPainelSelecionado.fim))
    const despesasCardsPainel = despesas.filter((item) => pertenceAoPeriodoPainel(item, 'data_despesa', periodoCardsPainelSelecionado.inicio, periodoCardsPainelSelecionado.fim))

    const totalBrutoCardsPainel = vendasCardsPainel.reduce((acc, venda) => acc + Number(venda.valor_total || 0), 0)
    const totalTaxasCardsPainel = vendasCardsPainel.reduce((acc, venda) => acc + Number(venda.valor_taxa || 0), 0)
    const totalRecebidoCardsPainel = pagamentosCardsPainel.reduce((acc, pagamento) => acc + Number(pagamento.valor_pago || 0), 0)
    const totalCustoProdutosCardsPainel = movimentacoesCardsPainel.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalDespesasCardsPainel = despesasCardsPainel.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const lucroLiquidoCardsPainel = totalBrutoCardsPainel - totalCustoProdutosCardsPainel - totalTaxasCardsPainel - totalDespesasCardsPainel
    const percentualRecebidoCardsPainel = totalBrutoCardsPainel > 0 ? (totalRecebidoCardsPainel / totalBrutoCardsPainel) * 100 : 0
    const totalPendenciasCardsPainel = pendencias
      .filter((item) => {
        if (Number(item.saldo_restante || 0) <= 0 || item.status === 'PAGO') return false
        if (periodoCardsPainel === 'todos') return true
        const dataVenda = String(item.vendas?.data_venda || item.created_at || '').slice(0, 10)
        return dataVenda && dataVenda >= periodoCardsPainelSelecionado.inicio && dataVenda <= periodoCardsPainelSelecionado.fim
      })
      .reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)
    const totalEmDeliveryCardsPainel = deliveries
      .filter((item) => {
        if (item.status !== 'Programado') return false
        if (periodoCardsPainel === 'todos') return true
        const dataEntrega = String(item.data_entrega || item.data_pedido || item.created_at || '').slice(0, 10)
        return dataEntrega && dataEntrega >= periodoCardsPainelSelecionado.inicio && dataEntrega <= periodoCardsPainelSelecionado.fim
      })
      .reduce((acc, item) => acc + Number(item.valor_total || 0), 0)
    const totalValoresAReceberCardsPainel = totalPendenciasCardsPainel

    const pecasVendidas = movimentacoesMesPainel.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const numeroVendas = vendasMesPainel.length
    const clientesAtendidos = new Set(vendasMesPainel.map((venda) => venda.cliente_id).filter(Boolean)).size

    const ticketMedio = numeroVendas > 0 ? totalBruto / numeroVendas : 0
    const mediaLiquidaPorPeca = pecasVendidas > 0 ? lucroOperacionalProjetado / pecasVendidas : 0
    const mediaPecasPorCliente = clientesAtendidos > 0 ? pecasVendidas / clientesAtendidos : 0
    const mediaPecasPorVenda = numeroVendas > 0 ? pecasVendidas / numeroVendas : 0
    const margemOperacionalProjetada = totalBruto > 0 ? (lucroOperacionalProjetado / totalBruto) * 100 : 0

    const mesAtualComparativo = calcularPeriodoPainel({ inicio: inicioMesPainel, fim: dataHoje() })
    const mesAnteriorComparativo = calcularPeriodoPainel(periodoAnterior)

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

    function diferencaPercentual(atual, anterior) {
      const valorAtual = Number(atual || 0)
      const valorAnterior = Number(anterior || 0)

      if (valorAnterior === 0 && valorAtual === 0) return { percentual: 0, direcao: 'estavel', texto: '0,0%' }
      if (valorAnterior === 0) return { percentual: 100, direcao: 'alta', texto: '+100,0%' }

      const diferenca = ((valorAtual - valorAnterior) / Math.abs(valorAnterior)) * 100
      return {
        percentual: diferenca,
        direcao: diferenca > 0.5 ? 'alta' : diferenca < -0.5 ? 'baixa' : 'estavel',
        texto: `${diferenca >= 0 ? '+' : ''}${diferenca.toFixed(1).replace('.', ',')}%`,
      }
    }

    function classeComparativo(direcao, positivoAlta = true) {
      if (direcao === 'estavel') return 'text-zinc-300'
      if (direcao === 'alta') return positivoAlta ? 'text-green-300' : 'text-red-300'
      return positivoAlta ? 'text-red-300' : 'text-green-300'
    }

    function setaComparativo(direcao) {
      if (direcao === 'alta') return '↑'
      if (direcao === 'baixa') return '↓'
      return '→'
    }

    function LinhaRelatorio({ rotulo, valor, destaque }) {
      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <span className="text-zinc-400">{rotulo}</span>
          <span className={`font-semibold ${destaque || 'text-white'}`}>{valor}</span>
        </div>
      )
    }

    function LinhaComparativo({ rotulo, atual, anterior, formato = 'moeda', positivoAlta = true }) {
      const variacao = diferencaPercentual(atual, anterior)
      const classe = classeComparativo(variacao.direcao, positivoAlta)
      const valorAtual = formato === 'percentual'
        ? percentual(atual)
        : formato === 'numero'
          ? Number(atual || 0).toLocaleString('pt-BR')
          : moeda(atual)
      const valorAnterior = formato === 'percentual'
        ? percentual(anterior)
        : formato === 'numero'
          ? Number(anterior || 0).toLocaleString('pt-BR')
          : moeda(anterior)

      return (
        <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-zinc-900 px-4 py-3 first:border-t-0">
          <div>
            <span className="block text-zinc-300 font-semibold">{rotulo}</span>
            <span className="block text-[11px] text-zinc-600 mt-1">Mês anterior: {valorAnterior}</span>
          </div>
          <div className="text-right">
            <span className="block text-white font-bold">{valorAtual}</span>
            <span className={`block text-xs font-bold mt-1 ${classe}`}>{setaComparativo(variacao.direcao)} {variacao.texto}</span>
          </div>
        </div>
      )
    }

    function BlocoRelatorio({ titulo, children, subtitulo }) {
      return (
        <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30">
          <div className="bg-[#111827] px-4 py-3 text-center font-bold text-white">
            {titulo}
            {subtitulo ? <span className="block text-[11px] text-zinc-500 font-medium mt-1">{subtitulo}</span> : null}
          </div>

          <div className="text-sm">
            {children}
          </div>
        </div>
      )
    }

    const hojePainel = dataHoje()
    const entregasHojePainel = deliveries.filter((item) => item.status === 'Programado' && String(item.data_entrega || '').slice(0, 10) === hojePainel)
    const cobrancasHojePainel = pendencias.filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0 && item.vencimento === hojePainel)
    const cobrancasAtrasadasPainel = pendencias.filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0 && item.vencimento && item.vencimento < hojePainel)

    function abrirAlertaDeliveryHoje() {
      setPagina('delivery')
      setFiltroDelivery('Programado')
      setFiltroDeliveryData('hoje')
      setBuscaDelivery('')
      setDeliveryExpandidoId(null)
      setMenuMobileAberto(false)
      setResumoDiaAberto(false)
    }

    function abrirAlertaCobrancasHoje() {
      setPagina('cobrancas')
      setFiltroCobrancasAlerta('hoje')
      setBuscaCobrancas('')
      setLocalCobrancaAberto('')
      setCobrancaExpandidaId(null)
      setMenuMobileAberto(false)
      setResumoDiaAberto(false)
    }

    function abrirAlertaCobrancasAtrasadas() {
      setPagina('cobrancas')
      setFiltroCobrancasAlerta('atrasadas')
      setBuscaCobrancas('')
      setLocalCobrancaAberto('')
      setCobrancaExpandidaId(null)
      setMenuMobileAberto(false)
      setResumoDiaAberto(false)
    }

    const totalAlertasDia = entregasHojePainel.length + cobrancasHojePainel.length + cobrancasAtrasadasPainel.length

    function CardAlertaHoje({ icone, titulo, valor, detalhe, classe, onClick }) {
      const vazio = Number(valor || 0) === 0

      return (
        <button
          type="button"
          onClick={onClick}
          className={`text-left rounded-2xl border p-4 transition ${vazio ? 'border-zinc-900 bg-zinc-950/40 text-zinc-500' : 'border-orange-950 bg-zinc-950 hover:bg-zinc-900 text-white'} ${classe || ''}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{titulo}</p>
              <h3 className="mt-2 text-2xl font-black">{icone} {valor}</h3>
            </div>
            <span className="text-zinc-600 text-2xl">›</span>
          </div>
          <p className="mt-2 text-xs text-zinc-500">{detalhe}</p>
        </button>
      )
    }

    return (
      <>
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-bold mb-2">Período dos cards</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPeriodoCardsPainel('mesAtual')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsPainel === 'mesAtual' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês atual
            </button>

            <button
              type="button"
              onClick={() => setPeriodoCardsPainel('mesAnterior')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsPainel === 'mesAnterior' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês anterior
            </button>

            <button
              type="button"
              onClick={() => setPeriodoCardsPainel('todos')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsPainel === 'todos' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Todos
            </button>
          </div>
        </div>

        <section className="mobile-summary-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-8 gap-4 mb-6">
          <CardResumo titulo="Faturamento bruto" valor={moeda(totalBrutoCardsPainel)} classe="text-green-300" />
          <CardResumo titulo="Lucro líquido" valor={moeda(lucroLiquidoCardsPainel)} classe={lucroLiquidoCardsPainel >= 0 ? 'text-green-400' : 'text-red-300'} />
          <CardResumo titulo="Caixa atual" valor={moeda(caixaLiquidoRealizado)} classe="text-green-300" />
          <CardResumo titulo="Valores a receber" valor={moeda(totalValoresAReceberCardsPainel)} classe="text-orange-300" />
          <CardResumo titulo="Recebido sobre vendido" valor={percentual(percentualRecebidoCardsPainel)} classe={percentualRecebidoCardsPainel >= 60 ? 'text-green-300' : 'text-yellow-300'} />
          <CardResumo titulo="Fornecedores pagos" valor={moeda(totalCustoProdutosCardsPainel)} classe="text-red-300" />
          <CardResumo titulo="Despesas e taxas" valor={moeda(totalDespesasCardsPainel + totalTaxasCardsPainel)} classe="text-red-300" />
          <CardResumo titulo="Caixa + recebíveis" valor={moeda(recursosTotaisConservador)} classe="text-yellow-300" />
        </section>

        <section className="mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Painel Executivo</h2>
              <p className="text-zinc-500 mt-2">Visão operacional, caixa, carteira em aberto e evolução mensal.</p>
            </div>

            <div className="relative resumo-dia-wrap">
              <button
                type="button"
                onClick={() => setResumoDiaAberto((aberto) => !aberto)}
                className={`resumo-dia-trigger ${totalAlertasDia > 0 ? 'tem-alertas' : 'sem-alertas'}`}
                title="Abrir resumo operacional do dia"
              >
                <span>{totalAlertasDia > 0 ? '🔔' : '🟢'}</span>
                <strong>{totalAlertasDia > 0 ? `Resumo do Dia (${totalAlertasDia})` : 'Tudo em dia'}</strong>
              </button>

              {resumoDiaAberto && (
                <div className="resumo-dia-dropdown">
                  <div className="resumo-dia-head">
                    <div>
                      <p>Hoje</p>
                      <h3>Resumo do Dia</h3>
                    </div>
                    <span>{dataBR(hojePainel)}</span>
                  </div>

                  <button type="button" onClick={abrirAlertaDeliveryHoje} className="resumo-dia-item">
                    <span>🚚</span>
                    <div>
                      <strong>{entregasHojePainel.length} entregas programadas</strong>
                      <small>Abre Delivery filtrado para hoje.</small>
                    </div>
                  </button>

                  <button type="button" onClick={abrirAlertaCobrancasHoje} className="resumo-dia-item">
                    <span>💰</span>
                    <div>
                      <strong>{cobrancasHojePainel.length} cobrança{cobrancasHojePainel.length === 1 ? '' : 's'} vence{cobrancasHojePainel.length === 1 ? '' : 'm'} hoje</strong>
                      <small>Abre Cobranças com vencimento de hoje.</small>
                    </div>
                  </button>

                  <button type="button" onClick={abrirAlertaCobrancasAtrasadas} className={`resumo-dia-item ${cobrancasAtrasadasPainel.length > 0 ? 'critico' : ''}`}>
                    <span>{cobrancasAtrasadasPainel.length > 0 ? '🔴' : '✅'}</span>
                    <div>
                      <strong>{cobrancasAtrasadasPainel.length > 0 ? `${cobrancasAtrasadasPainel.length} cobrança${cobrancasAtrasadasPainel.length === 1 ? '' : 's'} atrasada${cobrancasAtrasadasPainel.length === 1 ? '' : 's'}` : 'Nenhuma cobrança atrasada'}</strong>
                      <small>Abre Cobranças filtrado apenas nos atrasos.</small>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
            <BlocoRelatorio titulo="Operação do mês" subtitulo="Competência atual">
              <LinhaRelatorio rotulo="Faturamento bruto" valor={moeda(totalBruto)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Fornecedores pagos" valor={moeda(totalCustoProdutos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Taxas" valor={moeda(totalTaxas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Despesas" valor={moeda(totalDespesas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Resultado previsto do mês" valor={moeda(lucroOperacionalProjetado)} destaque={lucroOperacionalProjetado >= 0 ? 'text-green-400' : 'text-red-300'} />
              <LinhaRelatorio rotulo="Margem operacional projetada" valor={percentual(margemOperacionalProjetada)} destaque={margemOperacionalProjetada >= 0 ? 'text-green-300' : 'text-red-300'} />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Caixa realizado" subtitulo="Dinheiro disponível e entradas confirmadas">
              <LinhaRelatorio rotulo="Caixa atual informado" valor={moeda(caixaLiquidoRealizado)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Recebido no período" valor={moeda(totalRecebido)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Total líquido lançado nas vendas" valor={moeda(totalLiquidoVendas)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Recebido sobre vendido" valor={percentual(percentualRecebidoSobreVendido)} destaque={percentualRecebidoSobreVendido >= 60 ? 'text-green-300' : 'text-yellow-300'} />
              <LinhaRelatorio rotulo="Despesas e taxas" valor={moeda(totalDespesas + totalTaxas)} destaque="text-red-300" />

              <div className="border-t border-zinc-900 p-4 grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={formCaixa?.tipo ?? 'Entrada'}
                    onChange={(e) => setFormCaixa((atual) => ({ ...atual, tipo: e.target?.value ?? 'Entrada' }))}
                    className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-sm"
                  >
                    <option>Entrada</option>
                    <option>Saída</option>
                    <option>Ajuste</option>
                  </select>

                  <input
                    id="campo-ajuste-caixa-valor"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder={(formCaixa?.tipo ?? 'Entrada') === 'Ajuste' ? 'Novo saldo do caixa' : 'Valor'}
                    className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-sm"
                  />

                  <button type="button" onClick={salvarMovimentoCaixa} className="bg-orange-950 hover:bg-orange-900 border border-orange-800 rounded-xl px-3 py-2 text-sm font-bold">
                    Ajustar caixa
                  </button>
                </div>

                <input
                  id="campo-ajuste-caixa-observacao"
                  placeholder="Observação, exemplo: venda em dinheiro, bonificação de cliente, retirada ou ajuste manual"
                  className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-sm"
                />

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Entrada soma ao caixa, inclusive bonificações e vendas em dinheiro. Saída reduz o caixa. Ajuste define o saldo exato informado.
                </p>
              </div>
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Carteira em aberto" subtitulo="Recebíveis ainda não convertidos em caixa">
              <LinhaRelatorio rotulo="Fiados em aberto, mês atual" valor={moeda(totalPendencias)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Delivery programado" valor={moeda(totalEmDelivery)} destaque="text-yellow-300" />
              <LinhaRelatorio rotulo="Saldo anterior em aberto" valor={moeda(saldoAnteriorEmAberto)} destaque="text-yellow-300" />
              <LinhaRelatorio rotulo="Total de valores a receber" valor={moeda(totalValoresAReceber)} destaque="text-orange-300" />
              <LinhaRelatorio rotulo="Caixa + recebíveis" valor={moeda(recursosTotaisConservador)} destaque="text-yellow-300" />
            </BlocoRelatorio>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
            <BlocoRelatorio titulo="Indicadores comerciais" subtitulo="Qualidade da venda">
              <LinhaRelatorio rotulo="Ticket médio" valor={moeda(ticketMedio)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Média líquida por peça" valor={moeda(mediaLiquidaPorPeca)} destaque="text-green-400" />
              <LinhaRelatorio rotulo="Peças vendidas" valor={pecasVendidas} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Clientes atendidos" valor={clientesAtendidos} destaque="text-white" />
              <LinhaRelatorio rotulo="Vendas lançadas" valor={numeroVendas} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por venda" valor={mediaPecasPorVenda.toFixed(1).replace('.', ',')} destaque="text-white" />
              <LinhaRelatorio rotulo="Média peças por cliente" valor={mediaPecasPorCliente.toFixed(1).replace('.', ',')} destaque="text-white" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Comparativo mensal" subtitulo="Mês atual contra mês anterior">
              <LinhaComparativo rotulo="Faturamento bruto" atual={mesAtualComparativo.bruto} anterior={mesAnteriorComparativo.bruto} />
              <LinhaComparativo rotulo="Resultado do mês" atual={mesAtualComparativo.resultadoProjetado} anterior={mesAnteriorComparativo.resultadoProjetado} />
              <LinhaComparativo rotulo="Ticket médio" atual={mesAtualComparativo.ticketMedio} anterior={mesAnteriorComparativo.ticketMedio} />
              <LinhaComparativo rotulo="Margem operacional" atual={mesAtualComparativo.margemOperacional} anterior={mesAnteriorComparativo.margemOperacional} formato="percentual" />
              <LinhaComparativo rotulo="Peças vendidas" atual={mesAtualComparativo.pecas} anterior={mesAnteriorComparativo.pecas} formato="numero" />
              <LinhaComparativo rotulo="Clientes atendidos" atual={mesAtualComparativo.clientes} anterior={mesAnteriorComparativo.clientes} formato="numero" />
            </BlocoRelatorio>

            <BlocoRelatorio titulo="Controle conservador" subtitulo="Leitura de segurança">
              <LinhaComparativo rotulo="Recebido no período" atual={mesAtualComparativo.recebido} anterior={mesAnteriorComparativo.recebido} />
              <LinhaComparativo rotulo="Taxas" atual={mesAtualComparativo.taxas} anterior={mesAnteriorComparativo.taxas} positivoAlta={false} />
              <LinhaComparativo rotulo="Despesas" atual={mesAtualComparativo.despesasTotal} anterior={mesAnteriorComparativo.despesasTotal} positivoAlta={false} />
              <LinhaRelatorio rotulo="Caixa atual" valor={moeda(caixaLiquidoRealizado)} destaque="text-green-300" />
              <LinhaRelatorio rotulo="Valores a receber" valor={moeda(totalValoresAReceber)} destaque="text-orange-300" />

              <div className="border-t border-zinc-900 p-4">
                <p className="text-xs font-bold text-zinc-300 mb-3">Últimos movimentos de caixa</p>
                <div className="grid gap-2">
                  {(historicoCaixa || []).slice(0, 4).length === 0 ? (
                    <p className="text-xs text-zinc-600">Nenhum movimento registrado.</p>
                  ) : (historicoCaixa || []).slice(0, 4).map((movimento) => (
                    <div key={movimento.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-zinc-900 bg-black px-3 py-2">
                      <div>
                        <p className="text-xs text-white font-semibold">{movimento.tipo} · {moeda(movimento.valor)}</p>
                        <p className="text-[10px] text-zinc-500">{dataHoraBR(movimento.data)} · Caixa: {moeda(movimento.caixaNovo)}</p>
                        {movimento.observacao ? <p className="text-[10px] text-zinc-600 mt-1">{movimento.observacao}</p> : null}
                      </div>
                      <button type="button" onClick={() => removerMovimentoCaixa(movimento.id)} className="text-[10px] text-red-300">Remover</button>
                    </div>
                  ))}
                </div>
              </div>
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

            <BlocoRelatorio titulo="Custos operacionais">
              <LinhaRelatorio rotulo="Pagamentos fornecedores" valor={moeda(totalCustoProdutos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Taxas" valor={moeda(totalTaxas)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Abastecimentos" valor={moeda(totalAbastecimentos)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Degustações" valor={moeda(totalDegustacoes)} destaque="text-red-300" />
              <LinhaRelatorio rotulo="Outros custos" valor={moeda(totalOutrosCustos)} destaque="text-red-300" />
            </BlocoRelatorio>
          </div>

          <div className="mt-5 rounded-2xl border border-zinc-900 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-500 leading-relaxed">
            O comparativo mensal usa os registros existentes no Supabase. Se as vendas antigas forem apagadas no fechamento do mês, será necessário criar futuramente uma tabela de fechamento mensal para guardar o histórico consolidado.
          </div>
        </section>
      </>
    )
  }


  function renderPixRapidoGerado({ modal = false } = {}) {
    if (!pixRapidoGerado) {
      return (
        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-black/50 p-6 text-center text-sm text-zinc-500">
          Nenhum QR Code gerado.
        </div>
      )
    }

    const pixCancelado = pixRapidoGerado?.status === 'Cancelado'
    const pixRecebido = pixRapidoGerado?.status === 'Pagamento recebido'
    const configAtual = normalizarConfigPixRapido(configPixRapido)
    const classeStatus = pixCancelado ? 'text-red-300' : pixRecebido ? 'text-green-300' : 'text-yellow-300'
    const classeQr = modal
      ? 'mx-auto h-[min(72vw,320px)] w-[min(72vw,320px)] rounded-xl bg-white md:h-[360px] md:w-[360px]'
      : 'mx-auto h-[280px] w-[280px] max-w-full rounded-xl bg-white'

    return (
      <div className={modal ? 'grid gap-4' : 'grid gap-4'}>
        <div className={modal ? 'grid gap-4 lg:grid-cols-[390px_1fr] lg:items-start' : 'grid gap-4 lg:grid-cols-[320px_1fr]'}>
          <div className="rounded-3xl border border-zinc-800 bg-white p-3 md:p-4">
            <img
              src={pixRapidoGerado.qrCodeUrl}
              alt="QR Code Pix"
              className={classeQr}
            />
          </div>

          <div className="grid gap-3 rounded-2xl border border-zinc-800 bg-black p-4">
            <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Valor</span>
              <strong className="text-orange-200">{moeda(pixRapidoGerado.valor)}</strong>
            </p>
            <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Status</span>
              <strong className={classeStatus}>
                {pixRapidoGerado.status}
              </strong>
            </p>
            <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Tipo de chave</span>
              <strong className="text-white">{pixRapidoGerado.tipoChave || configAtual.tipoChave}</strong>
            </p>
            {pixRapidoGerado.instituicao && (
              <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2">
                <span className="text-zinc-500">Institui&ccedil;&atilde;o</span>
                <strong className="text-white">{pixRapidoGerado.instituicao}</strong>
              </p>
            )}
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Pix Copia e Cola</span>
          <textarea
            value={pixRapidoGerado.codigo}
            readOnly
            rows={modal ? 3 : 5}
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-xs leading-relaxed text-zinc-200 outline-none"
          />
        </label>

        <div className={modal ? 'grid gap-2 sm:grid-cols-2 xl:grid-cols-5' : 'grid gap-2 sm:grid-cols-2 xl:grid-cols-5'}>
          {!modal && (
            <button
              type="button"
              onClick={abrirModalPixRapidoQr}
              className="rounded-2xl border border-orange-900 bg-orange-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-900"
            >
              Abrir QR Code
            </button>
          )}
          <button
            type="button"
            onClick={copiarCodigoPixRapido}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-orange-900"
          >
            Copiar c&oacute;digo Pix
          </button>
          <button
            type="button"
            onClick={abrirModalPixRapidoPreVenda}
            disabled={pixCancelado || pixRecebido}
            className="rounded-2xl bg-green-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Pagamento recebido
          </button>
          <button
            type="button"
            onClick={cancelarPixRapido}
            disabled={pixCancelado || pixRecebido}
            className="rounded-2xl bg-red-950 px-4 py-3 text-sm font-bold text-red-100 transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar Pix
          </button>
          <button
            type="button"
            onClick={gerarNovaCobrancaPixRapido}
            className="rounded-2xl border border-orange-900 bg-orange-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-900"
          >
            Gerar nova cobran&ccedil;a
          </button>
          {modal && (
            <button
              type="button"
              onClick={fecharModalPixRapidoQr}
              className="rounded-2xl bg-zinc-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-zinc-700"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    )
  }

  function TelaPixRapido() {
    return (
      <section className={`mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-5 lg:p-8 ${classePrioridadePixConteudo}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <p className="text-orange-400 uppercase tracking-[5px] text-xs mb-3">QR Code</p>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Pix R&aacute;pido</h2>
            <p className="text-zinc-500 mt-3 max-w-2xl">
              Gere uma cobran&ccedil;a Pix por valor e envie para Pr&eacute;-vendas quando confirmar o recebimento.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Status</p>
            <p className="text-xl font-bold text-orange-300">{pixRapidoGerado?.status || 'Sem QR Code'}</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            <form onSubmit={gerarPixRapido} className="rounded-[26px] border border-orange-950/70 bg-[#15110f]/80 p-4">
              <h3 className="text-lg font-black text-white mb-4">Nova cobran&ccedil;a</h3>

              <label className="block mb-4">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Valor do Pix</span>
                <input
                  value={valorPixRapido}
                  onChange={(e) => setValorPixRapido(moedaInputCentavos(e.target.value))}
                  placeholder="R$ 0,00"
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-lg font-bold text-white outline-none focus:border-orange-700"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-orange-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-orange-800"
              >
                Gerar QR Code
              </button>
            </form>

            <div className="rounded-[26px] border border-zinc-900 bg-zinc-950/70 p-4">
              <h3 className="text-lg font-black text-white mb-4">Configura&ccedil;&atilde;o Pix</h3>

              <div className="grid gap-3">
                <label className="block">
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Tipo de chave Pix</span>
                  <select
                    value={configPixRapido.tipoChave}
                    onChange={(e) => atualizarConfigPixRapido('tipoChave', e.target.value)}
                    className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                  >
                    <option value="Aleatoria">Aleat&oacute;ria</option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="Telefone">Telefone</option>
                    <option value="E-mail">E-mail</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Chave Pix</span>
                  <input
                    value={configPixRapido.chave}
                    onChange={(e) => atualizarConfigPixRapido('chave', e.target.value)}
                    placeholder={CONFIG_PIX_RAPIDO_INICIAL.chave}
                    className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Institui&ccedil;&atilde;o</span>
                  <input
                    value={configPixRapido.instituicao}
                    onChange={(e) => atualizarConfigPixRapido('instituicao', e.target.value)}
                    placeholder="Institui&ccedil;&atilde;o"
                    className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                  />
                </label>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={salvarConfigPixRapido}
                    className="rounded-2xl bg-orange-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-800"
                  >
                    Salvar configura&ccedil;&atilde;o Pix
                  </button>
                  <button
                    type="button"
                    onClick={restaurarConfigPixRapidoPadrao}
                    className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-orange-900"
                  >
                    Restaurar padr&atilde;o
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-zinc-900 bg-[#15110f]/80 p-4">
            {renderPixRapidoGerado()}
          </div>
        </div>
      </section>
    )
  }

  function TelaPreVendas() {
    const lista = preVendasFiltradas()
    const preVendasPorPagina = 30
    const totalPaginasPreVendas = Math.max(1, Math.ceil(lista.length / preVendasPorPagina))
    const paginaAtualPreVendas = Math.min(paginaPreVendas, totalPaginasPreVendas)
    const indiceInicialPreVendas = (paginaAtualPreVendas - 1) * preVendasPorPagina
    const indiceFinalPreVendas = indiceInicialPreVendas + preVendasPorPagina
    const listaPaginada = lista.slice(indiceInicialPreVendas, indiceFinalPreVendas)
    const textoResumoPaginacaoPreVendas = lista.length === 0
      ? 'Nenhuma pré-venda encontrada.'
      : `Mostrando ${indiceInicialPreVendas + 1} a ${Math.min(indiceFinalPreVendas, lista.length)} de ${lista.length} pré-vendas.`
    const dataResumoPreVendas = dataFiltroPreVendas || dataHoje()
    const resumoPreVendasEhHoje = dataResumoPreVendas === dataHoje()
    const tituloDataResumoPreVendas = resumoPreVendasEhHoje ? `hoje, ${dataBR(dataResumoPreVendas)}` : dataBR(dataResumoPreVendas)
    const preVendasDoDia = preVendas.filter((item) => {
      if (!item?.criadoEm && !item?.created_at) return false
      return dataISO(item.criadoEm || item.created_at) === dataResumoPreVendas
    })
    const conferenciaProdutosPreVendas = Array.from(preVendasDoDia.reduce((mapa, preVenda) => {
      ;(preVenda.itens || []).forEach((produto) => {
        const nome = String(produto.nome || 'Produto').trim() || 'Produto'
        const chave = normalizarTexto(nome)
        const quantidade = Math.max(1, Number(produto.quantidade || 1))
        const atual = mapa.get(chave) || { nome, quantidade: 0 }
        atual.quantidade += quantidade
        mapa.set(chave, atual)
      })
      return mapa
    }, new Map()).values())
    const quantidadeTotalProdutosPreVendas = conferenciaProdutosPreVendas.reduce((total, produto) => total + Number(produto.quantidade || 0), 0)
    const valorTotalPrevistoPreVendas = preVendasDoDia.reduce((total, item) => total + Number(item.total || 0), 0)
    const totaisPagamentoPreVendas = preVendasDoDia.reduce((totais, item) => {
      const pagamento = item.pagamento || extrairPagamentoPreVendaPorVoz(item.transcricao || '')
      const chave = normalizarTexto(pagamento)
      if (chave.includes('pix')) totais.Pix += 1
      else if (chave.includes('fiado') || chave.includes('em aberto')) totais['Fiado / Em aberto'] += 1
      else if (chave.includes('credito')) totais['Crédito'] += 1
      else if (chave.includes('debito')) totais['Débito'] += 1
      else totais.Outros += 1
      return totais
    }, { Pix: 0, 'Fiado / Em aberto': 0, Crédito: 0, Débito: 0, Outros: 0 })
    const totalPendente = preVendas.filter((item) => {
      const st = normalizarTexto(item.status || '')
      return !st.includes('convertida') && !st.includes('convertido') && !st.includes('delivery programado')
    }).length
    const detalhe = preVendaDetalheModal.preVenda

    function formatarQuantidadeResumoPreVenda(qtd) {
      const quantidade = Math.max(0, Number(qtd || 0))
      return Number.isInteger(quantidade)
        ? String(quantidade)
        : quantidade.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
    }

    function chavePreVendaResumo(preVenda, indice = 0) {
      return [
        preVenda?.id || 'sem-id',
        preVenda?.criadoEm || preVenda?.created_at || 'sem-data',
        preVenda?.cliente || 'sem-cliente',
        indice,
      ].join('-')
    }

    function pagamentoResumoPreVenda(preVenda) {
      return preVenda.pagamento || extrairPagamentoPreVendaPorVoz(preVenda.transcricao || '') || 'Não informado'
    }

    function dataEntregaStatusPreVenda(statusItem) {
      const encontrada = String(statusItem || '').match(/\b(\d{4}-\d{2}-\d{2})\b/)
      return encontrada?.[1] || ''
    }

    function moedaResumoPreVenda(valor) {
      return moeda(valor).replace(/\s/g, ' ')
    }

    function linhasItensResumoPreVenda(preVenda) {
      const itens = preVenda.itens || []
      if (itens.length === 0) return [`- ${preVenda.transcricao || 'Itens não informados'}`]
      return itens.map((produto) => `- ${formatarQuantidadeResumoPreVenda(produto.quantidade || 1)} ${produto.nome || 'Produto'}`)
    }

    function montarTextoResumoDiaPreVendas() {
      const linhas = [
        `RESUMO DO DIA - PRÉ-VENDAS`,
        dataBR(dataResumoPreVendas),
        '',
      ]

      if (preVendasDoDia.length === 0) {
        linhas.push('Nenhuma pré-venda registrada na data do resumo.')
      } else {
        preVendasDoDia.forEach((preVenda, indice) => {
          if (indice > 0) linhas.push('----------------------------------------')
          linhas.push(preVenda.cliente || 'Cliente não informado')
          linhas.push(horaBR(preVenda.criadoEm || preVenda.created_at))
          linhas.push('')
          linhas.push('Referência:')
          linhas.push(preVenda.referencia || 'Não informada')
          linhas.push('')
          linhas.push(...linhasItensResumoPreVenda(preVenda))
          linhas.push('')
          linhas.push('Pagamento:')
          linhas.push(pagamentoResumoPreVenda(preVenda))
          linhas.push('')
          linhas.push('Total:')
          linhas.push(moedaResumoPreVenda(preVenda.total || 0))
          linhas.push('')
        })
      }

      linhas.push('----------------------------------------')
      linhas.push('CONFERÊNCIA DOS PRODUTOS')
      if (conferenciaProdutosPreVendas.length === 0) {
        linhas.push('Nenhum produto capturado.')
      } else {
        conferenciaProdutosPreVendas.forEach((produto) => {
          linhas.push(`${formatarQuantidadeResumoPreVenda(produto.quantidade)} ${produto.nome}`)
        })
      }
      linhas.push('')
      linhas.push('TOTAIS')
      linhas.push(`Quantidade de pré-vendas: ${preVendasDoDia.length}`)
      linhas.push(`Quantidade total de produtos: ${formatarQuantidadeResumoPreVenda(quantidadeTotalProdutosPreVendas)}`)
      linhas.push(`Valor total previsto: ${moedaResumoPreVenda(valorTotalPrevistoPreVendas)}`)
      linhas.push('')
      linhas.push('Formas de pagamento:')
      Object.entries(totaisPagamentoPreVendas).forEach(([forma, total]) => {
        linhas.push(`${forma}: ${total}`)
      })

      return linhas.join('\n')
    }

    const textoResumoDiaPreVendas = montarTextoResumoDiaPreVendas()

    function abrirDetalhePreVenda(preVenda) {
      setConfirmDeletePreVenda(false)
      setPreVendaDetalheModal({ aberto: true, preVenda })
    }

    function fecharDetalhePreVenda() {
      setConfirmDeletePreVenda(false)
      setPreVendaDetalheModal({ aberto: false, preVenda: null })
    }

    function renderLinhaPreVenda(item, indice = 0) {
      const itens = item.itens || []
      const referencia = item.referencia || 'Sem referência'
      const dataPreVenda = dataBR(item.criadoEm || item.created_at)
      const quantidadeItens = itens.length === 1 ? '1 item' : `${itens.length} itens`
      const statusTexto = item.status || 'Pendente'
      const statusNormalizado = normalizarTexto(statusTexto)
      const estaConvertida = statusNormalizado.includes('convertida') || statusNormalizado.includes('convertido')
      const estaDeliveryProgramado = statusNormalizado.includes('delivery programado')
      const estaEmLancamento = statusNormalizado.includes('lancamento')
      const cardClass = estaConvertida
        ? 'w-full rounded-xl border border-emerald-950/70 bg-emerald-950/10 hover:border-emerald-800/80 hover:bg-emerald-950/20 px-3 py-2 text-left transition opacity-85'
        : estaDeliveryProgramado
          ? 'w-full rounded-xl border border-sky-950/70 bg-[#111821] hover:border-sky-800/60 hover:bg-[#142031] px-3 py-2 text-left transition'
        : estaEmLancamento
          ? 'w-full rounded-xl border border-amber-900/45 bg-[#181511] hover:border-amber-800/55 hover:bg-[#1d1812] px-3 py-2 text-left transition'
          : 'w-full rounded-xl border border-amber-900/35 bg-[#171613] hover:border-amber-800/45 hover:bg-[#1b1813] px-3 py-2 text-left transition'
      return (
        <button
          key={`linha-prevenda-${chavePreVendaResumo(item, indice)}`}
          type="button"
          onClick={() => abrirDetalhePreVenda(item)}
          aria-label={`Abrir detalhes da pré-venda de ${item.cliente || 'cliente'}`}
          className={`${cardClass} min-w-0 max-w-full box-border overflow-hidden`}
        >
          <div
            className={`grid w-full max-w-full items-start gap-x-1.5 overflow-hidden ${estaConvertida ? 'opacity-90' : ''}`}
            style={{ gridTemplateColumns: 'minmax(0, 1fr) auto' }}
          >
            <div className="min-w-0 flex-1 text-left">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <h3 className={`${estaConvertida ? 'text-[14px]' : 'text-[15px]'} min-w-0 font-black text-white leading-tight truncate`}>
                  {item.cliente}
                </h3>
                <span className="shrink-0 text-[12px] font-semibold leading-tight text-zinc-400">
                  |
                </span>
                <span className="min-w-0 truncate text-[12px] font-semibold leading-tight text-zinc-300">
                  {referencia}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] font-semibold leading-tight text-zinc-500">
                {quantidadeItens}
              </p>
              {estaConvertida ? (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-emerald-900/70 bg-emerald-950/35 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-200">
                  <span className="text-[11px] leading-none text-emerald-300" aria-hidden="true">{'\u2713'}</span>
                  Venda j&aacute; lan&ccedil;ada
                </span>
              ) : estaDeliveryProgramado ? (
                <span className="mt-1 inline-flex rounded-full border border-sky-800/55 bg-sky-950/35 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-sky-200">
                  {'\uD83D\uDCE6 No Delivery'}
                </span>
              ) : (
                <span className="mt-1 inline-flex rounded-full border border-amber-800/45 bg-amber-950/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-amber-200">
                  Aguardando lan&ccedil;amento
                </span>
              )}
            </div>

            <div className="shrink-0 justify-self-end pl-1 text-right">
              <p className="text-[12px] font-semibold leading-tight text-zinc-500 whitespace-nowrap">
                {dataPreVenda}
              </p>
              <span className="mt-0.5 block text-[13px] sm:text-[14px] font-black leading-tight text-amber-300 whitespace-nowrap">
                {moeda(item.total)}
              </span>
            </div>
          </div>
        </button>
      )
    }

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-5 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-orange-400 uppercase tracking-[5px] text-xs mb-3">Pré-vendas</p>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Pré-vendas</h2>
            <p className="text-zinc-500 mt-3 max-w-2xl">
              Registre pedidos por voz durante o recreio. Cada gravação vira um registro compacto. Clique para conferir, gerar mensagem ou converter em venda.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Pendentes</p>
            <p className="text-3xl font-bold text-orange-300">{totalPendente}</p>
          </div>
        </div>

        <div className="rounded-[26px] border border-orange-950/70 bg-[#15110f]/80 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-orange-400 font-bold">Nova pré-venda por voz</p>
              <p className="text-xs text-zinc-500 mt-1">
                Fale um cliente por vez. Pode pausar naturalmente e clique em parar para criar o registro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={ouvindoPreVendaVoz ? pararPreVendaPorVoz : iniciarPreVendaPorVoz}
                disabled={!speechVendaDisponivel}
                className={`rounded-2xl px-5 py-4 text-sm font-bold transition ${
                  ouvindoPreVendaVoz
                    ? 'bg-red-950 hover:bg-red-900 text-red-100'
                    : 'bg-green-800 hover:bg-green-700 text-white'
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {ouvindoPreVendaVoz ? '■ Parar e criar registro' : '🎙️ Nova pré-venda'}
              </button>

              <button
                type="button"
                onClick={() => setResumoDiaPreVendasAberto(true)}
                className="rounded-2xl border border-orange-800 bg-orange-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-orange-900"
              >
                Resumo do dia
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-xs">
            <p className="text-zinc-400">
              Exemplo: <span className="text-zinc-200">Rosângela EP 210 Norte, um Vila Caipira 79, uma cocada 49, pagamento crédito.</span>
            </p>

            {textoPreVendaVoz && (
              <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
                Último registro ouvido: {textoPreVendaVoz}
              </p>
            )}

            {avisoPreVenda && (
              <p className="rounded-xl border border-orange-950 bg-orange-950/20 px-3 py-2 text-orange-200">
                {avisoPreVenda}
              </p>
            )}

            {!speechVendaDisponivel && (
              <p className="text-red-300">Este navegador não liberou o microfone. No celular, teste preferencialmente no Chrome.</p>
            )}
          </div>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Buscar</span>
            <input
              value={buscaPreVendas}
              onChange={(e) => setBuscaPreVendas(e.target.value)}
              placeholder="Buscar por cliente, referência, produto ou texto falado"
              className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(180px,220px)_auto] gap-2">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Data</span>
              <input
                type="date"
                value={dataFiltroPreVendas}
                onChange={(e) => setDataFiltroPreVendas(e.target.value)}
                onInput={(e) => setDataFiltroPreVendas(e.currentTarget.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
              />
            </label>

            <button
              type="button"
              onClick={() => setDataFiltroPreVendas('')}
              disabled={!dataFiltroPreVendas}
              className="self-end rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold text-zinc-200 transition hover:border-orange-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Limpar data
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          {lista.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-6 text-sm text-zinc-500">
              Nenhuma pré-venda encontrada.
            </div>
          )}

          {listaPaginada.map(renderLinhaPreVenda)}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-300">
          <span className="text-xs text-zinc-500">{textoResumoPaginacaoPreVendas}</span>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => setPaginaPreVendas(Math.max(1, paginaAtualPreVendas - 1))}
              disabled={paginaAtualPreVendas <= 1}
              className="rounded-xl border border-zinc-800 bg-black px-4 py-2 text-xs font-bold text-zinc-200 transition hover:border-orange-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="min-w-[110px] text-center text-xs font-bold text-zinc-400">
              Página {paginaAtualPreVendas} de {totalPaginasPreVendas}
            </span>

            <button
              type="button"
              onClick={() => setPaginaPreVendas(Math.min(totalPaginasPreVendas, paginaAtualPreVendas + 1))}
              disabled={paginaAtualPreVendas >= totalPaginasPreVendas}
              className="rounded-xl border border-zinc-800 bg-black px-4 py-2 text-xs font-bold text-zinc-200 transition hover:border-orange-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        </div>

        {resumoDiaPreVendasAberto && (
          <div
            className="fixed inset-0 z-[999] flex items-stretch justify-center bg-black/85 p-0 backdrop-blur-sm md:items-center md:p-4"
            onClick={() => setResumoDiaPreVendasAberto(false)}
          >
            <div
              className="flex h-full w-full flex-col overflow-hidden bg-[#15110f] shadow-2xl md:h-auto md:max-h-[90vh] md:w-[80vw] md:max-w-6xl md:rounded-[26px] md:border md:border-orange-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-orange-950/60 p-4 md:p-6">
                <div>
                  <button
                    type="button"
                    onClick={() => setResumoDiaPreVendasAberto(false)}
                    className="mb-3 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm font-bold text-zinc-100 hover:border-orange-900 md:hidden"
                  >
                    ← Voltar
                  </button>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-orange-400 font-bold">Resumo do dia</p>
                  <h3 className="mt-1 text-2xl font-black text-white leading-tight">Resumo do dia, {tituloDataResumoPreVendas}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{preVendasDoDia.length} registro{preVendasDoDia.length === 1 ? '' : 's'} na data do resumo</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setResumoDiaPreVendasAberto(false)}
                    className="w-12 h-12 rounded-2xl bg-zinc-900 text-2xl font-black text-white hover:bg-zinc-800"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 md:p-6 lg:grid-cols-[1.35fr_0.65fr]">
                <div className="grid gap-3">
                  {preVendasDoDia.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-zinc-800 bg-black/60 p-6 text-sm text-zinc-500">
                      Nenhuma pré-venda registrada na data do resumo.
                    </div>
                  )}

                  {preVendasDoDia.map((preVenda, indice) => {
                    const chavePreVenda = chavePreVendaResumo(preVenda, indice)
                    return (
                    <div key={`resumo-dia-prevenda-${chavePreVenda}`} className="rounded-2xl border border-zinc-900 bg-black/70 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-black text-white">{preVenda.cliente || 'Cliente não informado'}</h4>
                          <p className="text-sm font-bold text-orange-200">{horaBR(preVenda.criadoEm || preVenda.created_at)}</p>
                        </div>
                        <p className="text-lg font-black text-orange-300">{moedaResumoPreVenda(preVenda.total || 0)}</p>
                      </div>

                      <div className="mt-3 grid gap-3 text-sm">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Referência</p>
                          <p className="mt-1 text-zinc-100">{preVenda.referencia || 'Não informada'}</p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Itens</p>
                          <div className="mt-1 grid gap-1 text-zinc-200">
                            {linhasItensResumoPreVenda(preVenda).map((linha, idx) => (
                              <p key={`resumo-dia-item-${chavePreVenda}-${idx}`}>{linha}</p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Pagamento</p>
                          <p className="mt-1 text-zinc-100">{pagamentoResumoPreVenda(preVenda)}</p>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>

                <aside className="grid gap-3">
                  <div className="rounded-2xl border border-zinc-900 bg-black/70 p-4">
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-300">Conferência dos produtos</h4>
                    <div className="mt-3 grid gap-2 text-sm text-zinc-200">
                      {conferenciaProdutosPreVendas.length === 0 ? (
                        <p className="text-zinc-500">Nenhum produto capturado.</p>
                      ) : conferenciaProdutosPreVendas.map((produto, indice) => (
                        <p key={`conferencia-prevenda-${normalizarTexto(produto.nome)}-${indice}`} className="flex justify-between gap-3 border-b border-zinc-900 pb-2 last:border-b-0 last:pb-0">
                          <span>{produto.nome}</span>
                          <strong className="text-white">{formatarQuantidadeResumoPreVenda(produto.quantidade)}</strong>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-900 bg-black/70 p-4">
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-300">Totais</h4>
                    <div className="mt-3 grid gap-2 text-sm">
                      <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Pré-vendas</span><strong className="text-white">{preVendasDoDia.length}</strong></p>
                      <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Produtos</span><strong className="text-white">{formatarQuantidadeResumoPreVenda(quantidadeTotalProdutosPreVendas)}</strong></p>
                      <p className="flex justify-between gap-3 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Valor previsto</span><strong className="text-orange-200">{moedaResumoPreVenda(valorTotalPrevistoPreVendas)}</strong></p>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm">
                      {Object.entries(totaisPagamentoPreVendas).map(([forma, total]) => (
                        <p key={`pagamento-prevenda-${forma}`} className="flex justify-between gap-3 text-zinc-300">
                          <span>{forma}</span>
                          <strong className="text-white">{total}</strong>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-900 bg-black/70 p-4">
                    <textarea
                      value={textoResumoDiaPreVendas}
                      readOnly
                      rows={10}
                      className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-200 outline-none"
                    />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        )}

        {preVendaDetalheModal.aberto && detalhe && (
          (() => {
            const detalheStatusNormalizado = normalizarTexto(detalhe.status || '')
            const detalheNoDelivery = detalheStatusNormalizado.includes('delivery programado')
            const detalheEntregaPrevista = dataEntregaStatusPreVenda(detalhe.status)
            return (
          <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/85 p-3 pt-6 pb-[140px] backdrop-blur-sm md:items-center md:p-4">
            <div className="w-full max-w-4xl rounded-[26px] border border-orange-950 bg-[#15110f] p-4 shadow-2xl md:p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-orange-400 font-bold">Detalhe da pré-venda</p>
                  <h3 className="mt-1 text-2xl font-black text-white leading-tight">{detalhe.cliente}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{dataBR(detalhe.criadoEm)}, {horaBR(detalhe.criadoEm)}</p>
                </div>
                <button
                  type="button"
                  onClick={fecharDetalhePreVenda}
                  className="w-12 h-12 rounded-2xl bg-zinc-900 text-2xl font-black text-white hover:bg-zinc-800 shrink-0"
                >
                  ×
                </button>
              </div>

              {detalheNoDelivery && (
                <div className="mb-4 rounded-2xl border border-emerald-950/80 bg-emerald-950/20 px-4 py-3">
                  <p className="text-sm font-black text-emerald-100">📦 Programada para Delivery</p>
                  {detalheEntregaPrevista && (
                    <p className="mt-1 text-xs font-semibold text-emerald-200">
                      Entrega prevista: {dataBR(detalheEntregaPrevista)}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                <div className="rounded-2xl border border-zinc-800 bg-black px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Referência</p>
                  <p className="mt-1 text-base font-bold text-white">{detalhe.referencia || 'Não informada'}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-black px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold">Pagamento</p>
                  <p className="mt-1 text-base font-bold text-white">{detalhe.pagamento || extrairPagamentoPreVendaPorVoz(detalhe.transcricao || '') || 'Não informado'}</p>
                </div>
                <div className="rounded-2xl border border-orange-950 bg-orange-950/20 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-orange-300 font-bold">Total</p>
                  <p className="mt-1 text-xl font-black text-orange-200">{moeda(detalhe.total)}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-900 bg-black/70 p-4 mb-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-bold mb-3">Itens capturados</p>
                <div className="grid gap-2">
                  {(detalhe.itens || []).length > 0 ? (detalhe.itens || []).map((produto, idx) => {
                    const quantidade = Number(produto.quantidade || 1)
                    const valorUnitario = Number(produto.valorUnitario ?? produto.valor_unitario ?? produto.valor ?? 0)
                    const subtotal = Number(produto.subtotal ?? produto.total ?? produto.valor ?? (quantidade * valorUnitario))
                    return (
                      <div key={`detalhe-prevenda-${idx}`} className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-200">
                        <span className="font-bold text-white">{formatarQuantidadePreVenda(quantidade)} {produto.nome}</span>
                        <span className="text-zinc-500"> • </span>
                        <span className="text-orange-200">{moeda(valorUnitario)} und.</span>
                        <span className="text-zinc-500"> • </span>
                        <strong className="text-orange-100">Total {moeda(subtotal)}</strong>
                      </div>
                    )
                  }) : (
                    <p className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-300">
                      {detalhe.transcricao || 'Itens não informados'}
                    </p>
                  )}
                </div>
              </div>

              {detalhe.transcricao && (
                <details className="mb-4 text-sm text-zinc-400">
                  <summary className="cursor-pointer font-semibold text-zinc-300">Ver transcrição original</summary>
                  <p className="mt-2 rounded-xl border border-zinc-800 bg-black p-3 text-zinc-300">{detalhe.transcricao}</p>
                </details>
              )}

              <div className="grid gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => abrirMensagemPreVenda(detalhe)}
                    className="rounded-2xl bg-green-800 hover:bg-green-700 px-5 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(22,101,52,0.24)]"
                  >
                    📲 Gerar mensagem
                  </button>

                  <button
                    type="button"
                    onClick={() => converterPreVendaEmVenda(detalhe)}
                    className="rounded-2xl bg-orange-900 hover:bg-orange-800 px-5 py-4 text-sm font-black text-white border border-orange-700/70"
                  >
                    Converter em venda
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      abrirEdicaoPreVenda(detalhe)
                      fecharDetalhePreVenda()
                    }}
                    className="inline-flex min-h-[40px] h-auto items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-4 py-2 text-sm font-bold leading-normal text-white"
                  >
                    ✏️ Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => criarDeliveryAPartirPreVenda(detalhe)}
                    className="inline-flex min-h-[40px] h-auto items-center justify-center rounded-lg bg-amber-900/80 hover:bg-amber-800 px-4 py-2 text-sm font-bold leading-normal text-white"
                  >
                    Adicionar ao delivery
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmDeletePreVenda(true)}
                    className="inline-flex min-h-[40px] h-auto items-center justify-center rounded-lg border border-red-950 bg-red-950/20 hover:bg-red-950/40 px-4 py-2 text-sm font-semibold leading-normal text-red-100"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              {confirmDeletePreVenda && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                  <div className="w-full max-w-md rounded-2xl border border-red-950 bg-[#15110f] p-5 shadow-2xl">
                    <h3 className="text-xl font-black text-white leading-tight">
                      Excluir pré-venda de {detalhe.cliente || 'cliente'}?
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300">Essa ação não poderá ser desfeita.</p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmDeletePreVenda(false)}
                        className="rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-4 py-3 text-sm font-bold text-white"
                      >
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDeletePreVenda(false)
                          excluirPreVenda(detalhe.id)
                          fecharDetalhePreVenda()
                        }}
                        className="rounded-xl border border-red-700 bg-red-700 hover:bg-red-600 px-4 py-3 text-sm font-bold text-white"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
            )
          })()
        )}

        {preVendaEdicaoModal.aberto && preVendaEdicaoModal.preVenda && (
          <div className="mini-prevenda-edit-backdrop fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="mini-prevenda-edit-modal w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[28px] border border-orange-950 bg-[#15110f] p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Editar pré-venda</h3>
                  <p className="text-xs text-zinc-500 mt-1">Corrija cliente, referência, itens, valores e transcrição antes de gerar mensagem ou converter.</p>
                </div>
                <button
                  type="button"
                  onClick={fecharEdicaoPreVenda}
                  className="w-10 h-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <label className="block">
                  <span className="block text-[11px] uppercase text-zinc-500 mb-2">Cliente</span>
                  <input
                    value={preVendaEdicaoModal.preVenda.cliente || ''}
                    onChange={(e) => atualizarCampoEdicaoPreVenda('cliente', e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                  />
                </label>

                <label className="block">
                  <span className="block text-[11px] uppercase text-zinc-500 mb-2">Data da pr&eacute;-venda</span>
                  <input
                    type="date"
                    value={dataISO(preVendaEdicaoModal.preVenda.criadoEm || preVendaEdicaoModal.preVenda.created_at || dataHoje())}
                    onClick={abrirCalendario}
                    onFocus={abrirCalendario}
                    onChange={(e) => atualizarCampoEdicaoPreVenda(
                      'criadoEm',
                      ajustarDataPreVenda(e.target.value, preVendaEdicaoModal.preVenda.criadoEm || preVendaEdicaoModal.preVenda.created_at),
                    )}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                  />
                </label>

                <label className="block">
                  <span className="block text-[11px] uppercase text-zinc-500 mb-2">Referência</span>
                  <input
                    value={preVendaEdicaoModal.preVenda.referencia || ''}
                    onChange={(e) => atualizarCampoEdicaoPreVenda('referencia', e.target.value)}
                    placeholder="CEAN, Paulo Freire, Objetivo, SEB..."
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="block text-[11px] uppercase text-zinc-500 mb-2">Forma de pagamento</span>
                  <select
                    value={preVendaEdicaoModal.preVenda.pagamento || ''}
                    onChange={(e) => atualizarCampoEdicaoPreVenda('pagamento', e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                  >
                    <option value="">Não informado</option>
                    <option value="Pix">Pix</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Fiado / Em aberto">Fiado / Em aberto</option>
                  </select>
                </label>
              </div>

              <div className="rounded-2xl border border-zinc-900 bg-black/50 p-4 mb-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-[11px] uppercase text-zinc-500">Itens</p>
                  <button
                    type="button"
                    onClick={adicionarItemEdicaoPreVenda}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-3 py-2 text-xs font-bold text-zinc-100"
                  >
                    + Adicionar item
                  </button>
                </div>

                <div className="grid gap-3">
                  {(preVendaEdicaoModal.preVenda.itens || []).map((produto, idx) => (
                    <div key={`editar-prevenda-${idx}`} className="grid grid-cols-1 md:grid-cols-[80px_1fr_140px_44px] gap-2 items-end">
                      <label className="block">
                        <span className="block text-[10px] uppercase text-zinc-600 mb-1">Qtd.</span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={produto.quantidade ?? ''}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => {
                            const somenteNumeros = e.target.value.replace(/\D/g, '')
                            atualizarItemEdicaoPreVenda(idx, 'quantidade', somenteNumeros)
                          }}
                          onBlur={(e) => {
                            if (!e.target.value) atualizarItemEdicaoPreVenda(idx, 'quantidade', '1')
                          }}
                          className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-orange-700"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-[10px] uppercase text-zinc-600 mb-1">Produto</span>
                        <input
                          value={produto.nome || ''}
                          onChange={(e) => atualizarItemEdicaoPreVenda(idx, 'nome', e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-orange-700"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-[10px] uppercase text-zinc-600 mb-1">Valor und.</span>
                        <input
                          value={produto.valorUnitario || ''}
                          onChange={(e) => atualizarItemEdicaoPreVenda(idx, 'valorUnitario', e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-3 text-sm outline-none focus:border-orange-700"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => removerItemEdicaoPreVenda(idx)}
                        className="h-[46px] rounded-xl border border-red-950 bg-red-950/20 hover:bg-red-950/40 text-red-100 font-bold"
                        title="Remover item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <label className="block mb-4">
                <span className="block text-[11px] uppercase text-zinc-500 mb-2">Transcrição original</span>
                <textarea
                  value={preVendaEdicaoModal.preVenda.transcricao || ''}
                  onChange={(e) => atualizarCampoEdicaoPreVenda('transcricao', e.target.value)}
                  rows={4}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700 text-zinc-200"
                />
              </label>

              <div className="mini-prevenda-edit-actions flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={salvarEdicaoPreVenda}
                  className="flex-1 rounded-xl bg-orange-900 hover:bg-orange-800 px-4 py-3 text-sm font-bold text-white"
                >
                  Salvar alterações
                </button>
                <button
                  type="button"
                  onClick={fecharEdicaoPreVenda}
                  className="flex-1 rounded-xl border border-zinc-800 bg-black hover:bg-zinc-950 px-4 py-3 text-sm font-bold text-white"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {mensagemPreVendaModal.aberto && (
          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-[28px] border border-orange-950 bg-[#15110f] p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Mensagem para cliente</h3>
                  <p className="text-xs text-zinc-500 mt-1">Confira, copie e envie pelo WhatsApp. Depois converta a pré-venda com calma.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMensagemPreVendaModal({ aberto: false, preVendaId: '', texto: '' })}
                  className="rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-300 hover:text-white"
                >
                  ×
                </button>
              </div>

              <textarea
                value={mensagemPreVendaModal.texto}
                onChange={(e) => setMensagemPreVendaModal((atual) => ({ ...atual, texto: e.target.value }))}
                rows={16}
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-sm leading-relaxed text-zinc-100 outline-none focus:border-orange-700"
              />

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copiarMensagemPreVenda}
                  className="rounded-xl bg-orange-950 hover:bg-orange-900 px-4 py-3 text-sm font-bold text-white"
                >
                  Copiar mensagem
                </button>
                <button
                  type="button"
                  onClick={() => setMensagemPreVendaModal({ aberto: false, preVendaId: '', texto: '' })}
                  className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm font-semibold text-zinc-200 hover:text-white"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  function TelaVendas() {
    const termo = normalizarTexto(buscaVendas)

    const vendasFiltradas = vendas.filter((venda) => {
      const texto = normalizarTexto(`
        ${venda.numero_venda}
        ${nomeClienteVenda(venda)}
        ${referenciaClienteVenda(venda)}
        ${venda.clientes?.telefone}
        ${venda.forma_pagamento}
        ${normalizarStatus(venda.status)}
        ${moeda(venda.valor_total)}
        ${dataBR(venda.data_venda)}
      `)

      return contemTermos(texto, termo) && dentroPeriodoFiltro(venda.data_venda, filtroVendasInicio, filtroVendasFim)
    })

    const vendasPorPagina = 50
    const totalPaginasVendas = Math.max(1, Math.ceil(vendasFiltradas.length / vendasPorPagina))
    const paginaAtualVendas = Math.min(paginaVendas, totalPaginasVendas)
    const indiceInicialVendas = (paginaAtualVendas - 1) * vendasPorPagina
    const indiceFinalVendas = indiceInicialVendas + vendasPorPagina
    const vendasPaginadas = vendasFiltradas.slice(indiceInicialVendas, indiceFinalVendas)
    const textoResumoPaginacaoVendas = vendasFiltradas.length === 0
      ? 'Nenhuma venda encontrada.'
      : `Mostrando ${indiceInicialVendas + 1} a ${Math.min(indiceFinalVendas, vendasFiltradas.length)} de ${vendasFiltradas.length} vendas.`

    return (
      <>
        <section className="mini-venda-rapida bg-[#15110f]/95 backdrop-blur border border-orange-950 rounded-[28px] p-5 mb-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">Vendas</h2>
              <p className="text-zinc-500 text-sm mt-1">
                Lance uma nova venda em janela dedicada, mantendo a lista limpa para consulta.
              </p>
            </div>

            <button type="button" onClick={abrirModalNovaVenda} className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-5 py-3 text-sm font-semibold transition">
              Nova venda
            </button>
          </div>

          <div className="mini-venda-resumo grid grid-cols-1 md:grid-cols-3 gap-3">
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
        </section>

        {modalVendaAberto && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="mini-venda-modal-card w-full max-h-[92vh] overflow-y-auto bg-[#15110f] border border-orange-950 rounded-[28px] shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-orange-950/70 p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400 font-bold mb-2">Venda</p>
                  <h2 className="text-3xl font-bold">{editandoVendaId ? 'Editar venda' : 'Nova venda'}</h2>
                  <p className="text-zinc-500 text-sm mt-2">
                    Informe cliente, valor, pagamento, status e vencimento com leitura mais confortável.
                  </p>
                </div>

                <button type="button" onClick={fecharModalVenda} className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xl font-bold flex items-center justify-center">
                  ×
                </button>
              </div>

              <div className="p-6">
                <div className="mini-venda-modal-resumo grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
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

                {!editandoVendaId && (
                  <div className="mb-5 rounded-2xl border border-orange-950/70 bg-black/40 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-orange-400 font-bold">Lançamento por voz</p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Fale curto: cliente, valor e pagamento. Para fiado, fale também o vencimento.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={ouvindoVendaVoz ? pararLancamentoVendaPorVoz : iniciarLancamentoVendaPorVoz}
                        disabled={!speechVendaDisponivel}
                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          ouvindoVendaVoz
                            ? 'bg-red-950 hover:bg-red-900 text-red-100'
                            : 'bg-orange-950 hover:bg-orange-900 text-white'
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        {ouvindoVendaVoz ? '■ Parar escuta' : '🎙️ Lançar por voz'}
                      </button>
                    </div>

                    <div className="mt-3 grid gap-2 text-xs">
                      <p className="text-zinc-400">
                        Exemplo à vista: <span className="text-zinc-200">Ana Paula, 120, Pix.</span> Exemplo fiado: <span className="text-zinc-200">Cliente Ana Paula, 120, fiado, vence dia 20.</span>
                      </p>

                      {textoVendaVoz && (
                        <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
                          Ouvido: {textoVendaVoz}
                        </p>
                      )}

                      {avisoVendaVoz && (
                        <p className="rounded-xl border border-orange-950 bg-orange-950/20 px-3 py-2 text-orange-200">
                          {avisoVendaVoz}
                        </p>
                      )}

                      {clienteVozPendente.aberto && (
                        <div className="rounded-2xl border border-orange-900/70 bg-zinc-950/90 p-3 text-zinc-200">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-orange-300 font-bold">
                            Como deseja registrar este cliente?
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {clienteVozPendente.nome}
                          </p>

                          {clienteVozPendente.etapa === 'escolha' && (
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <button
                                type="button"
                                onClick={() => aplicarClienteAvulsoVendaPorVoz(clienteVozPendente.nome)}
                                className="rounded-xl border border-green-900 bg-green-950/40 px-3 py-3 text-left text-sm font-semibold text-green-100 hover:bg-green-900/50"
                              >
                                Registrar como avulso
                              </button>

                              <button
                                type="button"
                                onClick={() => setClienteVozPendente((atual) => ({ ...atual, etapa: 'cadastro' }))}
                                className="rounded-xl border border-orange-900 bg-orange-950/40 px-3 py-3 text-left text-sm font-semibold text-orange-100 hover:bg-orange-900/50"
                              >
                                Escolher cliente cadastrado
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setBuscaClienteVenda(clienteVozPendente.nome)
                                  setClienteAvulsoVendaNome('')
                                  setClienteVozPendente({ aberto: false, etapa: 'escolha', nome: '', candidatos: [] })
                                  abrirModalNovoClientePelaVenda()
                                }}
                                className="rounded-xl border border-blue-900 bg-blue-950/40 px-3 py-3 text-left text-sm font-semibold text-blue-100 hover:bg-blue-900/50"
                              >
                                Cadastrar novo cliente
                              </button>
                            </div>
                          )}

                          {clienteVozPendente.etapa === 'cadastro' && (
                            <div className="mt-3 grid gap-2">
                              {clienteVozPendente.candidatos.length === 0 && (
                                <p className="rounded-xl border border-zinc-800 bg-black px-3 py-3 text-sm text-zinc-400">
                                  Nenhum cliente cadastrado encontrado com esse nome. Volte e escolha avulso ou cadastre novo cliente.
                                </p>
                              )}

                              {clienteVozPendente.candidatos.map((cliente) => (
                                <button
                                  key={cliente.id}
                                  type="button"
                                  onClick={() => aplicarClienteCadastradoVendaPorVoz(cliente)}
                                  className="rounded-xl border border-zinc-800 bg-black px-3 py-2 text-left text-sm hover:border-orange-700"
                                >
                                  <span className="font-semibold text-white">{cliente.nome}</span>
                                  <span className="text-zinc-400"> {' | '} {cliente.referencia || 'Sem referência'}</span>
                                </button>
                              ))}

                              <button
                                type="button"
                                onClick={() => setClienteVozPendente((atual) => ({ ...atual, etapa: 'escolha' }))}
                                className="rounded-xl border border-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 hover:border-zinc-600"
                              >
                                Voltar para as opções
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {!speechVendaDisponivel && (
                        <p className="text-red-300">
                          Este navegador não liberou a Web Speech API. No celular, teste preferencialmente no Chrome.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={salvarVenda} className="mini-venda-modal-form grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">
                      Selecionar cliente
                    </label>

                    <div className="grid gap-2">
                      <input
                        ref={buscaClienteVendaInputRef}
                        type="text"
                        value={buscaClienteVenda}
                        onChange={(e) => {
                          const valorDigitado = e.target.value
                          setBuscaClienteVenda(valorDigitado)
                          if (clienteAvulsoVendaNome) setClienteAvulsoVendaNome(capitalizarNomeVendaAvulsa(valorDigitado))
                        }}
                        onBlur={(e) => {
                          if (clienteAvulsoVendaNome) setBuscaClienteVenda(capitalizarNomeVendaAvulsa(e.target.value))
                        }}
                        placeholder="Pesquisar por nome, referência ou observação"
                        className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-700"
                      />

                      <select
                        value={clienteId}
                        onChange={(e) => {
                          setClienteId(e.target.value)
                          const clienteSelecionado = clientes.find((cliente) => String(cliente.id) === String(e.target.value))
                          if (clienteSelecionado) {
                            const nomeSelecionado = normalizarTexto(clienteSelecionado.nome || '')
                            const selecionouClienteAvulso = nomeSelecionado === 'avulso' || nomeSelecionado.includes('cliente avulso')
                            if (selecionouClienteAvulso) {
                              const nomeBase = clienteAvulsoVendaNome || buscaClienteVenda || clienteVozPendente.nome || ''
                              const nomeAvulsoCapitalizado = capitalizarNomeVendaAvulsa(nomeBase)
                              setBuscaClienteVenda(nomeAvulsoCapitalizado)
                              setClienteAvulsoVendaNome(nomeAvulsoCapitalizado)
                            } else {
                              setBuscaClienteVenda('')
                              setClienteAvulsoVendaNome('')
                            }
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

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-zinc-900 bg-zinc-950/55 px-3 py-3">
                        <p className="text-xs text-zinc-500">
                          Cliente novo para fiado ou controle recorrente? Cadastre sem sair da venda.
                        </p>
                        <button
                          type="button"
                          onClick={abrirModalNovoClientePelaVenda}
                          className="rounded-xl border border-orange-900 bg-orange-950/40 px-4 py-2 text-xs font-bold text-orange-100 hover:bg-orange-900/50"
                        >
                          + Cadastrar cliente
                        </button>
                      </div>

                      {buscaClienteVenda && clientesParaVendaFiltrados().length === 0 && (
                        <p className="text-[11px] text-orange-300">
                          Nenhum cliente cadastrado encontrado. Você pode cadastrar agora, ou manter como venda avulsa quando for à vista.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">Valor</label>
                    <input
                      type="text"
                      value={valorTotal}
                      onChange={(e) => setValorTotal(e.target.value)}
                      placeholder="0,00"
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">Data</label>
                    <input
                      type="date"
                      onClick={abrirCalendario}
                      onFocus={abrirCalendario}
                      value={dataVenda}
                      onChange={(e) => setDataVenda(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">Pagamento</label>
                    <select
                      value={taxaSelecionadaId}
                      onChange={(e) => {
                        const novaTaxaId = e.target.value
                        const taxaSelecionada = taxas.find((taxa) => String(taxa.id) === String(novaTaxaId))

                        setTaxaSelecionadaId(novaTaxaId)
                        aplicarStatusPorFormaPagamentoVenda(taxaSelecionada?.forma_pagamento || '', dataVenda)
                      }}
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
                    >
                      {taxas.map((taxa) => (
                        <option key={taxa.id} value={taxa.id}>
                          {taxa.forma_pagamento} | {percentual(taxa.taxa_percentual)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">Status</label>
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
                    <div>
                      <label className="block text-[11px] uppercase text-zinc-500 mb-2">Valor pago agora</label>
                      <input
                        type="text"
                        value={valorPagoVenda}
                        onChange={(e) => setValorPagoVenda(e.target.value)}
                        placeholder="0,00"
                        className="w-full bg-black border border-orange-900 rounded-2xl px-4 py-3 text-sm"
                      />
                      <p className="text-[10px] text-orange-300 mt-1">Saldo: {moeda(saldoParcialVenda)}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase text-zinc-500 mb-2">Vencimento</label>
                    <input
                      type="date"
                      onClick={abrirCalendario}
                      onFocus={abrirCalendario}
                      value={vencimento}
                      onChange={(e) => setVencimento(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm"
                    />
                  </div>

                  {editandoVendaId ? (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      <button type="button" onClick={fecharModalVenda} className="bg-zinc-800 hover:bg-zinc-700 rounded-2xl px-4 py-3 text-sm font-semibold transition">
                        Cancelar
                      </button>

                      <button type="submit" className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-4 py-3 text-sm font-semibold transition">
                        Salvar venda
                      </button>
                    </div>
                  ) : (
                    <div className="md:col-span-2 grid grid-cols-1 gap-3 mt-2">
                      <button type="submit" className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-4 py-3 text-sm font-semibold transition">
                        Salvar e continuar
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

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

          <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/60 px-4 py-3">
            <p className="text-sm text-zinc-400">
              {textoResumoPaginacaoVendas}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={paginaAtualVendas <= 1}
                onClick={() => setPaginaVendas((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Anterior
              </button>

              <span className="text-xs text-zinc-500 font-bold px-2">
                Página {paginaAtualVendas} de {totalPaginasVendas}
              </span>

              <button
                type="button"
                disabled={paginaAtualVendas >= totalPaginasVendas}
                onClick={() => setPaginaVendas((paginaAtual) => Math.min(totalPaginasVendas, paginaAtual + 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Próxima
              </button>
            </div>
          </div>

          <div className="mini-vendas-mobile-list">
            {vendasFiltradas.length === 0 && (
              <div className="mini-venda-list-card mini-venda-empty">Nenhuma venda encontrada.</div>
            )}

            {vendasPaginadas.map((venda) => {
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
                      <span>{primeiroNome(nomeClienteVenda(venda))} • {referenciaClienteVenda(venda)}</span>
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
                        <p>{nomeClienteVenda(venda)}</p>
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

                {vendasPaginadas.map((venda) => (
                  <tr key={venda.id} className="border-t border-zinc-900">
                    <td className="p-5">#{venda.numero_venda}</td>
                    <td className="p-5 text-zinc-400">{dataBR(venda.data_venda)}</td>
                    <td className="p-5 font-semibold">{nomeClienteVenda(venda)}</td>
                    <td className="p-5 text-zinc-400">{referenciaClienteVenda(venda)}</td>
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

    const clientesPorPagina = 50
    const totalPaginasClientes = Math.max(1, Math.ceil(clientesFiltrados.length / clientesPorPagina))
    const paginaAtualClientes = Math.min(paginaClientes, totalPaginasClientes)
    const indiceInicialClientes = (paginaAtualClientes - 1) * clientesPorPagina
    const indiceFinalClientes = indiceInicialClientes + clientesPorPagina
    const clientesPagina = clientesFiltrados.slice(indiceInicialClientes, indiceFinalClientes)

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

        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={abrirModalNovoCliente}
            className="bg-orange-950 hover:bg-orange-900 rounded-2xl px-6 py-4 font-semibold"
          >
            Cadastrar cliente
          </button>
        </div>

        <div className="mini-clientes-mobile-list">
          {clientesFiltrados.length === 0 && (
            <div className="mini-cliente-card mini-cliente-empty">Nenhum cliente encontrado.</div>
          )}

          {clientesPagina.map((cliente) => {
            const aberto = String(clienteExpandidoId) === String(cliente.id)

            return (
              <div key={cliente.id} className={`mini-cliente-card ${aberto ? 'aberto' : ''} ${cliente.ativo === false ? 'inativo' : ''}`}>
                <button
                  type="button"
                  className="mini-cliente-resumo"
                  onClick={() => setClienteExpandidoId(aberto ? null : cliente.id)}
                >
                  <div>
                    <strong>{cliente.nome || 'Sem nome'}</strong>
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

                    {cliente.created_at && (
                      <div>
                        <small>Cadastro</small>
                        <p>{dataBR(cliente.created_at)}</p>
                      </div>
                    )}

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

              {clientesPagina.map((cliente) => (
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

                      <details className="mini-clientes-menu" onToggle={aoAlternarMenuAcoes}>
                        <summary aria-label="Mais ações">⋮</summary>
                        <div className="mini-clientes-menu-list" onClick={() => fecharMenusAcoesAbertos()}>
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

        {clientesFiltrados.length > clientesPorPagina && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-sm text-zinc-400">
            <p>
              Mostrando {indiceInicialClientes + 1} a {Math.min(indiceFinalClientes, clientesFiltrados.length)} de {clientesFiltrados.length} clientes
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={paginaAtualClientes <= 1}
                onClick={() => setPaginaClientes((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <span className="px-3 text-zinc-500">
                Página {paginaAtualClientes} de {totalPaginasClientes}
              </span>

              <button
                type="button"
                disabled={paginaAtualClientes >= totalPaginasClientes}
                onClick={() => setPaginaClientes((paginaAtual) => Math.min(totalPaginasClientes, paginaAtual + 1))}
                className="px-4 py-2 rounded-xl bg-orange-950 border border-orange-800 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
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

    const listaPendenciasBase = pendencias
      .filter((item) => item.status !== 'PAGO' && Number(item.saldo_restante || 0) > 0)
      .filter((item) => {
        if (filtroCobrancasAlerta === 'hoje') return item.vencimento === hoje
        if (filtroCobrancasAlerta === 'atrasadas') return item.vencimento && item.vencimento < hoje
        return true
      })
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

    const listaPendencias = listaPendenciasBase.filter((item) => {
      if (filtroPeriodoCobrancas === 'atual') return !pendenciaEhSaldoAnterior(item)
      if (filtroPeriodoCobrancas === 'anterior') return pendenciaEhSaldoAnterior(item)
      return true
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

    const saldosCobrancas = saldosPorPeriodo(listaPendenciasBase)
    const totalGeral = saldosCobrancas.total
    const totalMesAtualCobrancas = saldosCobrancas.atual
    const totalSaldoAnteriorCobrancas = saldosCobrancas.anterior
    const totalClientes = new Set(
      listaPendenciasBase.map((item) => clienteDaPendencia(item).nome || item.venda_id || item.id).filter(Boolean)
    ).size
    const totalAtrasados = listaPendenciasBase.filter((item) => item.vencimento && item.vencimento < hoje).length
    const totalHoje = listaPendenciasBase.filter((item) => item.vencimento === hoje).length

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
            onChange={(e) => {
              setBuscaCobrancas(e.target.value)
              setFiltroCobrancasAlerta('todos')
              setFiltroPeriodoCobrancas('todos')
            }}
            placeholder="Buscar cliente, referência, observação ou status"
            className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          />
        </div>

        {filtroCobrancasAlerta !== 'todos' && (
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-orange-950 bg-orange-950/15 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-orange-300">Filtro automático ativo</p>
              <p className="mt-1 font-bold text-white">
                {filtroCobrancasAlerta === 'hoje' ? 'Mostrando cobranças que vencem hoje.' : 'Mostrando cobranças atrasadas.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFiltroCobrancasAlerta('todos')
                setFiltroPeriodoCobrancas('todos')
              }}
              className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-700"
            >
              Ver todas
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 mb-6 mini-cobrancas-resumo">
          <CardResumo
            titulo="Total consolidado"
            valor={moeda(totalGeral)}
            classe="text-orange-300"
            ativo={filtroPeriodoCobrancas === 'todos'}
            onClick={() => {
              setFiltroPeriodoCobrancas('todos')
              setLocalCobrancaAberto('')
              setCobrancaExpandidaId(null)
            }}
          />
          <CardResumo
            titulo="Mês atual"
            valor={moeda(totalMesAtualCobrancas)}
            classe="text-green-300"
            ativo={filtroPeriodoCobrancas === 'atual'}
            onClick={() => {
              setFiltroPeriodoCobrancas('atual')
              setLocalCobrancaAberto('')
              setCobrancaExpandidaId(null)
            }}
          />
          <CardResumo
            titulo="Saldo anterior"
            valor={moeda(totalSaldoAnteriorCobrancas)}
            classe="text-yellow-300"
            ativo={filtroPeriodoCobrancas === 'anterior'}
            onClick={() => {
              setFiltroPeriodoCobrancas('anterior')
              setLocalCobrancaAberto('')
              setCobrancaExpandidaId(null)
            }}
          />
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
                                onClick={() => abrirSelecaoCobrancasCliente(pendencia, itensCliente)}
                                className="mini-cobrancas-btn mini-cobrancas-btn-secondary"
                              >
                                Confirmar
                              </button>
                              <details className="mini-cobrancas-menu" onToggle={aoAlternarMenuAcoes}>
                                <summary aria-label="Mais ações">⋮</summary>
                                <div className="mini-cobrancas-menu-list" onClick={() => fecharMenusAcoesAbertos()}>
                                  <button onClick={() => resumoPixWhatsAppConsolidado(clientePendencia, itensCliente)}>Resumo</button>
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

                                      <button onClick={() => abrirSelecaoCobrancasCliente(pendencia, grupoCliente.itens)} className="bg-zinc-700 hover:bg-zinc-600 mini-pend-wide">
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

                            <button type="button" onClick={() => abrirSelecaoCobrancasCliente(pendencia)} className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-xl text-xs font-bold">
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

                                          <button onClick={() => abrirSelecaoCobrancasCliente(pendencia, grupoCliente.itens)} className="bg-zinc-700 hover:bg-zinc-600 mini-pend-wide">
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
                                  <button type="button" onClick={() => abrirSelecaoCobrancasCliente(pendencia, grupoCliente.itens)} className="acao-confirmar">Confirmar</button>
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

    const pagamentosPorPagina = 25
    const totalPaginasPagamentos = Math.max(1, Math.ceil(pagamentosFiltrados.length / pagamentosPorPagina))
    const paginaAtualPagamentos = Math.min(paginaPagamentos, totalPaginasPagamentos)
    const indiceInicialPagamentos = (paginaAtualPagamentos - 1) * pagamentosPorPagina
    const indiceFinalPagamentos = indiceInicialPagamentos + pagamentosPorPagina
    const pagamentosPaginados = pagamentosFiltrados.slice(indiceInicialPagamentos, indiceFinalPagamentos)
    const textoResumoPaginacaoPagamentos = pagamentosFiltrados.length === 0
      ? 'Nenhum pagamento encontrado.'
      : `Mostrando ${indiceInicialPagamentos + 1} a ${Math.min(indiceFinalPagamentos, pagamentosFiltrados.length)} de ${pagamentosFiltrados.length} pagamentos.`

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

        {pagamentosFiltrados.length > pagamentosPorPagina && (
          <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/60 px-4 py-3">
            <p className="text-sm text-zinc-400">
              {textoResumoPaginacaoPagamentos}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={paginaAtualPagamentos <= 1}
                onClick={() => setPaginaPagamentos((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Anterior
              </button>

              <span className="text-xs text-zinc-500 font-bold px-2">
                Página {paginaAtualPagamentos} de {totalPaginasPagamentos}
              </span>

              <button
                type="button"
                disabled={paginaAtualPagamentos >= totalPaginasPagamentos}
                onClick={() => setPaginaPagamentos((paginaAtual) => Math.min(totalPaginasPagamentos, paginaAtual + 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Próxima
              </button>
            </div>
          </div>
        )}

        <div className="mini-pagamentos-lista-mobile">
          {pagamentosFiltrados.length === 0 && (
            <div className="mini-pagamento-vazio">Nenhum pagamento encontrado.</div>
          )}

          {pagamentosPaginados.map((pagamento) => {
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
                    {nomeClientePagamento(pagamento)}
                    {referenciaClientePagamento(pagamento)
                      ? ` • ${referenciaClientePagamento(pagamento)}`
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

              {pagamentosPaginados.map((pagamento) => {
                const pagamentoEstornado = normalizarStatus(pagamento.status || 'CONFIRMADO') === 'ESTORNADO'

                return (
                  <tr key={pagamento.id} className={`border-t border-zinc-900 ${pagamentoEstornado ? 'bg-red-950/20 opacity-80' : ''}`}>
                    <td className="p-5">{dataBR(pagamento.data_pagamento)}</td>
                    <td className="p-5">{nomeClientePagamento(pagamento)}</td>
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

        {pagamentosFiltrados.length > pagamentosPorPagina && (
          <div className="mt-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/60 px-4 py-3">
            <p className="text-sm text-zinc-400">
              {textoResumoPaginacaoPagamentos}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={paginaAtualPagamentos <= 1}
                onClick={() => setPaginaPagamentos((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Anterior
              </button>

              <span className="text-xs text-zinc-500 font-bold px-2">
                Página {paginaAtualPagamentos} de {totalPaginasPagamentos}
              </span>

              <button
                type="button"
                disabled={paginaAtualPagamentos >= totalPaginasPagamentos}
                onClick={() => setPaginaPagamentos((paginaAtual) => Math.min(totalPaginasPagamentos, paginaAtual + 1))}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
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

    if (novaQuantidadeItem === 0) {
      const confirmarExclusao = window.confirm(
        `A quantidade final ficou zero. Deseja remover o último lançamento de ${produtoResumo.nome}?`
      )

      if (!confirmarExclusao) return

      const { error } = await supabase
        .from('itens_venda')
        .delete()
        .eq('id', itemBase.id)

      if (error) {
        alert('Erro ao remover o lançamento.')
        console.error(error)
        return
      }

      await buscarTudo()
      alert('Lançamento removido com sucesso.')
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
    const itensPorPaginaProdutosControle = 50

    const termo = normalizarTexto(buscaProdutosControle)

    const inicioMesProdutosControle = inicioMesAtual()
    const periodoAnteriorProdutosControle = periodoMesAnterior()

    function dataMovimentacaoProduto(item) {
      return String(item?.vendas?.data_venda || item?.data_venda || item?.created_at || '').slice(0, 10)
    }

    const periodoLancamentosProdutosSelecionado = (() => {
      if (periodoLancamentosProdutos === 'mesAnterior') return periodoAnteriorProdutosControle
      if (periodoLancamentosProdutos === 'todos') return null
      return { inicio: inicioMesProdutosControle, fim: dataHoje() }
    })()

    const lancamentosProdutosFiltrados = movimentacoesProdutos.filter((item) => {
      if (!periodoLancamentosProdutosSelecionado) return true
      const dataItem = dataMovimentacaoProduto(item)
      return dataItem &&
        dataItem >= periodoLancamentosProdutosSelecionado.inicio &&
        dataItem <= periodoLancamentosProdutosSelecionado.fim
    })

    const totalPecas = lancamentosProdutosFiltrados.reduce((acc, item) => acc + Number(item.quantidade || 0), 0)
    const pecasVendidasNaData = lancamentosProdutosFiltrados
      .filter((item) => dataMovimentacaoProduto(item) === dataControleProdutos)
      .reduce((acc, item) => acc + Number(item.quantidade || 0), 0)

    const itensLancadosNaData = lancamentosProdutosFiltrados.filter((item) => dataMovimentacaoProduto(item) === dataControleProdutos)

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

      if (Number.isNaN(quantidade)) {
        alert('Quantidade inválida.')
        return
      }

      if (quantidade < 0) {
        alert('Quantidade inválida.')
        return
      }

      if (quantidade === 0) {
        const confirmarExclusao = window.confirm(
          `Quantidade zero. Deseja remover este lançamento de ${item.produtos?.nome || 'este item'}?`
        )

        if (!confirmarExclusao) return

        const { error } = await supabase
          .from('itens_venda')
          .delete()
          .eq('id', item.id)

        if (error) {
          alert('Erro ao remover o lançamento.')
          console.error(error)
          return
        }

        await buscarTudo()
        alert('Lançamento removido com sucesso.')
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

    const totalVendido = lancamentosProdutosFiltrados.reduce((acc, item) => acc + Number(item.subtotal_venda || 0), 0)
    const totalCusto = lancamentosProdutosFiltrados.reduce((acc, item) => acc + Number(item.subtotal_custo || 0), 0)
    const totalLucro = lancamentosProdutosFiltrados.reduce((acc, item) => acc + Number(item.lucro || 0), 0)

    const resumoProdutos = produtos.map((produto) => {
      const movimentosProduto = lancamentosProdutosFiltrados.filter((item) => item.produto_id === produto.id)

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

    const movimentacoesProdutosFiltradas = lancamentosProdutosFiltrados.filter((item) => {
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

    const totalPaginasResumoProdutosControle = Math.max(1, Math.ceil(resumoProdutosFiltrados.length / itensPorPaginaProdutosControle))
    const paginaResumoProdutosControleSegura = Math.min(paginaResumoProdutosControle, totalPaginasResumoProdutosControle)
    const indiceInicialResumoProdutosControle = (paginaResumoProdutosControleSegura - 1) * itensPorPaginaProdutosControle
    const indiceFinalResumoProdutosControle = indiceInicialResumoProdutosControle + itensPorPaginaProdutosControle
    const resumoProdutosPagina = resumoProdutosFiltrados.slice(indiceInicialResumoProdutosControle, indiceFinalResumoProdutosControle)

    const totalPaginasItensProdutosControle = Math.max(1, Math.ceil(movimentacoesProdutosFiltradas.length / itensPorPaginaProdutosControle))
    const paginaItensProdutosControleSegura = Math.min(paginaItensProdutosControle, totalPaginasItensProdutosControle)
    const indiceInicialItensProdutosControle = (paginaItensProdutosControleSegura - 1) * itensPorPaginaProdutosControle
    const indiceFinalItensProdutosControle = indiceInicialItensProdutosControle + itensPorPaginaProdutosControle
    const movimentacoesProdutosPagina = movimentacoesProdutosFiltradas.slice(indiceInicialItensProdutosControle, indiceFinalItensProdutosControle)

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

        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-bold mb-2">Período dos lançamentos</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPeriodoLancamentosProdutos('mesAtual')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoLancamentosProdutos === 'mesAtual' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês atual
            </button>

            <button
              type="button"
              onClick={() => setPeriodoLancamentosProdutos('mesAnterior')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoLancamentosProdutos === 'mesAnterior' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês anterior
            </button>

            <button
              type="button"
              onClick={() => setPeriodoLancamentosProdutos('todos')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoLancamentosProdutos === 'todos' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Todos
            </button>
          </div>
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

              {resumoProdutosPagina.map((produto) => (
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

          {resumoProdutosPagina.map((produto) => (
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

        {resumoProdutosFiltrados.length > itensPorPaginaProdutosControle && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-3">
            <p className="text-xs text-zinc-500">
              Mostrando {indiceInicialResumoProdutosControle + 1} a {Math.min(indiceFinalResumoProdutosControle, resumoProdutosFiltrados.length)} de {resumoProdutosFiltrados.length} produtos
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={paginaResumoProdutosControleSegura <= 1}
                onClick={() => setPaginaResumoProdutosControle((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={paginaResumoProdutosControleSegura >= totalPaginasResumoProdutosControle}
                onClick={() => setPaginaResumoProdutosControle((paginaAtual) => Math.min(totalPaginasResumoProdutosControle, paginaAtual + 1))}
                className="rounded-xl bg-orange-950 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
              </button>
            </div>
          </div>
        )}

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

              {movimentacoesProdutosPagina.map((item) => (
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

          {movimentacoesProdutosPagina.map((item) => (
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

        {movimentacoesProdutosFiltradas.length > itensPorPaginaProdutosControle && (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-3">
            <p className="text-xs text-zinc-500">
              Mostrando {indiceInicialItensProdutosControle + 1} a {Math.min(indiceFinalItensProdutosControle, movimentacoesProdutosFiltradas.length)} de {movimentacoesProdutosFiltradas.length} itens lançados
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={paginaItensProdutosControleSegura <= 1}
                onClick={() => setPaginaItensProdutosControle((paginaAtual) => Math.max(1, paginaAtual - 1))}
                className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={paginaItensProdutosControleSegura >= totalPaginasItensProdutosControle}
                onClick={() => setPaginaItensProdutosControle((paginaAtual) => Math.min(totalPaginasItensProdutosControle, paginaAtual + 1))}
                className="rounded-xl bg-orange-950 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
              </button>
            </div>
          </div>
        )}

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

        <div className="mini-produtos-cadastro-acao mb-8">
          <div>
            <p>Cadastrar produto</p>
            <span>Abra a janela para informar produto, fornecedor, custo, venda, estoque e status.</span>
          </div>
          <button type="button" onClick={abrirModalCadastroProduto}>
            Cadastrar produto
          </button>
        </div>

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

                        <details className="produto-acoes-menu" onToggle={aoAlternarMenuAcoes}>
                          <summary aria-label="Mais ações">⋮</summary>
                          <div className="produto-acoes-menu-list" onClick={() => fecharMenusAcoesAbertos()}>
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

    const mesAtualDespesas = dataHoje().slice(0, 7)
    const [anoAtualDespesas, mesAtualNumeroDespesas] = mesAtualDespesas.split('-').map(Number)
    const dataMesAnteriorDespesas = new Date(anoAtualDespesas, mesAtualNumeroDespesas - 2, 1)
    const mesAnteriorDespesas = `${dataMesAnteriorDespesas.getFullYear()}-${String(dataMesAnteriorDespesas.getMonth() + 1).padStart(2, '0')}`

    const despesasDosCards = despesasFiltradas.filter((item) => {
      if (periodoCardsDespesas === 'todos') return true
      const mesDaDespesa = String(item.data_despesa || '').slice(0, 7)
      if (periodoCardsDespesas === 'mesAnterior') return mesDaDespesa === mesAnteriorDespesas
      return mesDaDespesa === mesAtualDespesas
    })

    const itensPorPaginaDespesas = 20
    const totalPaginasDespesas = Math.max(1, Math.ceil(despesasFiltradas.length / itensPorPaginaDespesas))
    const paginaAtualDespesas = Math.min(paginaDespesas, totalPaginasDespesas)
    const inicioDespesas = (paginaAtualDespesas - 1) * itensPorPaginaDespesas
    const despesasPaginadas = despesasFiltradas.slice(inicioDespesas, inicioDespesas + itensPorPaginaDespesas)

    const totalDespesas = despesasDosCards.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalAbastecimentos = despesasDosCards.filter((item) => item.categoria === 'Abastecimento').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalDegustacoes = despesasDosCards.filter((item) => item.categoria === 'Degustação' || item.categoria === 'Degustações').reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalOutrosCustos = despesasDosCards.filter((item) => item.categoria === 'Outros custos').reduce((acc, item) => acc + Number(item.valor || 0), 0)

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

        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-bold mb-2">Período dos cards</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPeriodoCardsDespesas('mesAtual')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsDespesas === 'mesAtual' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês atual
            </button>

            <button
              type="button"
              onClick={() => setPeriodoCardsDespesas('mesAnterior')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsDespesas === 'mesAnterior' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Mês anterior
            </button>

            <button
              type="button"
              onClick={() => setPeriodoCardsDespesas('todos')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${periodoCardsDespesas === 'todos' ? 'bg-orange-950 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
            >
              Todos
            </button>
          </div>
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
            <option value="Pró-labore / Retirada">Pró-labore / Retirada</option>
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

              {despesasPaginadas.map((despesa) => (
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


  function renderCampoBuscaClienteDelivery() {
    const termoBuscaClienteDelivery = normalizarBuscaClienteDelivery(buscaClienteDelivery)
    const termoClienteDeliveryExibicao = buscaClienteDelivery.trim()
    const resultados = clientesEncontradosDelivery()
    const clienteSelecionado = clientes.find((cliente) => String(cliente.id) === String(formDelivery.cliente_id))

    return (
      <div>
        <div className="relative">
          <input
            ref={buscaClienteDeliveryInputRef}
            value={buscaClienteDelivery}
            onChange={(e) => {
              const valor = e.target.value
              setBuscaClienteDelivery(valor)
            }}
            onFocus={atualizarPosicaoDropdownClienteDelivery}
            placeholder="Digite nome, referência ou local"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
          />

          {termoBuscaClienteDelivery.length >= 2 && dropdownClienteDeliveryPosicao && (
            <div
              className="fixed z-[1000] rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl"
              style={{
                top: `${dropdownClienteDeliveryPosicao.top}px`,
                left: `${dropdownClienteDeliveryPosicao.left}px`,
                width: `${dropdownClienteDeliveryPosicao.width}px`,
              }}
            >
              {resultados.length > 0 ? (
                <div className="grid max-h-60 gap-1 overflow-y-auto overscroll-contain pr-1">
                  {resultados.map((cliente) => (
                    <button
                      key={`cliente-delivery-${cliente.id}`}
                      type="button"
                      onClick={() => selecionarClienteDelivery(cliente)}
                      className="cursor-pointer rounded-xl px-3 py-2 text-left text-sm transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:bg-zinc-900"
                    >
                      <span className="block truncate font-bold leading-tight text-white">{cliente.nome}</span>
                      <span className="mt-0.5 block truncate text-xs leading-tight text-zinc-400">
                        {cliente.referencia || cliente.local || cliente.local_entrega || cliente.cidade || cliente.observacao || 'Sem referência'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-900/60 bg-zinc-950 p-4 shadow-inner shadow-amber-950/20">
                  <div className="mb-4">
                    <p className="text-sm font-bold text-amber-100">Cliente não encontrado</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      "{termoClienteDeliveryExibicao}" não está no cadastro.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={abrirModalNovoClientePeloDelivery}
                      className="flex min-h-11 items-center justify-center rounded-xl border border-green-800/70 bg-green-950 px-3 py-2 text-center text-xs font-bold text-green-100 transition hover:bg-green-900"
                    >
                      Cadastrar cliente
                    </button>
                    <button
                      type="button"
                      onClick={usarClienteAvulsoDelivery}
                      className="flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-center text-xs font-bold text-zinc-100 transition hover:border-amber-800/70 hover:bg-zinc-800"
                    >
                      Usar como cliente avulso
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {clienteSelecionado && (
          <p className="mt-1 text-[11px] font-semibold text-green-300">
            Selecionado: {clienteSelecionado.nome}
          </p>
        )}
      </div>
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
      const passaFiltroData = filtroDeliveryData === 'hoje'
        ? String(item.data_entrega || '').slice(0, 10) === dataHoje()
        : true

      return passaBusca && passaFiltro && passaFiltroData
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
            onChange={(e) => {
              setBuscaDelivery(e.target.value)
              setFiltroDeliveryData('')
            }}
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

          {renderCampoBuscaClienteDelivery()}

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
            className="delivery-itens-textarea lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[74px] leading-relaxed"
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

          {preVendaDeliveryOrigemId && !editandoDeliveryId && (
            <button
              type="button"
              onClick={cancelarDeliveryPreVenda}
              className="lg:col-span-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-3 font-semibold"
            >
              Cancelar e voltar para pré-venda
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
              onClick={() => {
                setFiltroDelivery(filtro.value)
                setFiltroDeliveryData('')
              }}
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

        {filtroDeliveryData === 'hoje' && (
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-orange-950 bg-orange-950/15 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-orange-300">Filtro automático ativo</p>
              <p className="mt-1 font-bold text-white">Mostrando entregas programadas para hoje.</p>
            </div>
            <button
              type="button"
              onClick={() => setFiltroDeliveryData('')}
              className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-700"
            >
              Ver todas
            </button>
          </div>
        )}

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
        <div className="rounded-[22px] border border-zinc-900 bg-zinc-950 p-4">
          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{titulo}</h3>
              <p className="text-xs text-zinc-500">{subtitulo}</p>
            </div>
            <span className="w-fit rounded-full border border-orange-950 bg-black px-3 py-1 text-xs font-bold text-orange-300">
              {itens.filter((item) => item.concluido).length}/{itens.length}
            </span>
          </div>

          <div className="mini-roteiro-lista grid gap-2">
            {itens.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-black p-4 text-sm text-zinc-500">
                {vazio}
              </div>
            )}

            {itens.map((item) => {
              const status = statusRoteiro(item.data_visita)

              return (
                <div
                  key={item.id}
                  className={`mini-roteiro-item rounded-2xl border p-3 transition ${item.concluido ? 'mini-roteiro-item-ok border-green-900 bg-green-950/20' : 'border-zinc-800 bg-black'}`}
                >
                  <div className="mini-roteiro-row flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <button
                      type="button"
                      onClick={() => alternarConcluidoRoteiroVendas(item)}
                      className="mini-roteiro-check-area flex min-w-0 flex-1 items-start gap-2 text-left"
                    >
                      <span className={`mini-roteiro-check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-black ${item.concluido ? 'border-green-500 bg-green-700 text-white' : 'border-zinc-600 bg-zinc-950 text-transparent'}`}>
                        ✓
                      </span>

                      <span className="mini-roteiro-texto min-w-0">
                        <span className={`mini-roteiro-nome block text-base font-bold leading-tight ${item.concluido ? 'text-zinc-400 line-through' : 'text-white'}`}>{item.local}</span>
                        <span className="mini-roteiro-detalhes mt-1 flex flex-wrap gap-1.5 text-xs text-zinc-500">
                          {item.referencia && <span>{item.referencia}</span>}
                          {item.horario && <span>{item.horario}</span>}
                          {item.observacao && <span>{item.observacao}</span>}
                        </span>
                        <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${status.classe}`}>
                          {status.emoji} {status.texto}
                        </span>
                      </span>
                    </button>

                    <div className="mini-roteiro-acoes flex flex-wrap items-center gap-2 md:justify-end">
                      <label className="mini-roteiro-data flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                        Última
                        <input
                          type="date"
                          value={item.data_visita ? String(item.data_visita).slice(0, 10) : ''}
                          onChange={(e) => ajustarDataVisitaRoteiro(item, e.target.value)}
                          className="h-8 rounded-md border border-zinc-800 bg-black px-2 text-xs font-bold text-white outline-none focus:border-orange-700"
                        />
                      </label>
                      <button onClick={() => editarRoteiroVendas(item)} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700">
                        Editar
                      </button>
                      <button onClick={() => excluirRoteiroVendas(item)} className="rounded-lg bg-red-950 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-900">
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
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
              <p className="mt-2 text-zinc-500">Controle de visitas com retorno automático em 30 dias.</p>
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
              <p className="text-sm text-zinc-500">Informe a última visita. O sistema calcula automaticamente o próximo retorno em 30 dias.</p>
            </div>
          </div>

          <form onSubmit={salvarRoteiroVendas} className="grid gap-4 md:grid-cols-6">
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

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Última visita</label>
              <input
                type="date"
                value={formRoteiroVendas.data_visita}
                onClick={abrirCalendario}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, data_visita: e.target.value })}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div className="md:col-span-6">
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">Observação</label>
              <input
                value={formRoteiroVendas.observacao}
                onChange={(e) => setFormRoteiroVendas({ ...formRoteiroVendas, observacao: e.target.value })}
                placeholder="Opcional"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-orange-700"
              />
            </div>

            <div className="flex flex-col gap-3 md:col-span-6 md:flex-row">
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
            <CardPonto titulo="Resultado previsto do mês" valor={moeda(lucroOperacionalProjetado)} detalhe="Após fornecedores, taxas e despesas projetadas" classe={lucroOperacionalProjetado >= 0 ? 'text-green-400' : 'text-red-300'} />
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


  function TelaOperacaoOffline() {
    const pendenciasAbertas = (pendencias || []).filter((item) => Number(item.saldo_restante || 0) > 0 && String(item.status || '').toUpperCase() !== 'PAGO')
    const deliveriesAbertos = (deliveries || []).filter((item) => !['Entregue', 'Cancelado'].includes(item.status))

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-5 lg:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <p className="text-orange-400 uppercase tracking-[5px] text-xs mb-3">Continuidade operacional</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Modo Operação Offline</h2>
            <p className="text-zinc-500 mt-2">Pré-vendas, Delivery e Cobranças continuam consultáveis com os dados salvos neste aparelho.</p>
          </div>
          <button type="button" onClick={sincronizarFilaOffline} disabled={sincronizandoOffline || filaOffline.length === 0} className="rounded-2xl bg-orange-950 px-5 py-3 font-bold text-white disabled:opacity-50">
            {sincronizandoOffline ? 'Sincronizando...' : 'Sincronizar agora'}
          </button>
        </div>

        <div className="mini-offline-grid mb-6">
          <div className="mini-offline-card">
            <span>Status</span>
            <strong>{online ? 'Online' : 'Offline'}</strong>
            <p>{textoStatusConexao()}</p>
          </div>
          <div className="mini-offline-card">
            <span>Pré-vendas</span>
            <strong>{preVendas.length}</strong>
            <p>Disponíveis para consulta e registro rápido.</p>
          </div>
          <div className="mini-offline-card">
            <span>Delivery</span>
            <strong>{deliveriesAbertos.length}</strong>
            <p>Entregas programadas salvas no aparelho.</p>
          </div>
          <div className="mini-offline-card">
            <span>Cobranças</span>
            <strong>{pendenciasAbertas.length}</strong>
            <p>Pendências disponíveis para consulta.</p>
          </div>
        </div>

        <form onSubmit={registrarOfflineRapido} className="mini-offline-form mb-8">
          <div className="mini-offline-form-head">
            <div>
              <h3>Registro rápido offline</h3>
              <p>Use quando a internet cair ou quando quiser garantir a anotação no aparelho.</p>
            </div>
          </div>

          <label>
            <span>Tipo</span>
            <select value={formOfflineRapido.tipo} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, tipo: e.target.value })}>
              <option value="prevenda">Pré-venda</option>
              <option value="delivery-anotacao">Delivery, anotação</option>
              <option value="cobranca-anotacao">Cobrança, anotação</option>
            </select>
          </label>

          <label>
            <span>Cliente</span>
            <input value={formOfflineRapido.cliente} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, cliente: e.target.value })} placeholder="Nome do cliente" />
          </label>

          <label>
            <span>Referência</span>
            <input value={formOfflineRapido.referencia} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, referencia: e.target.value })} placeholder="EP 210 Norte, CEAN, SEB..." />
          </label>

          <label>
            <span>Itens ou resumo</span>
            <textarea value={formOfflineRapido.itens} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, itens: e.target.value })} placeholder="Ex.: 1 Vila Caipira 79, 1 Cocada 49" />
          </label>

          <label>
            <span>Valor</span>
            <input value={formOfflineRapido.valor} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, valor: e.target.value })} placeholder="0,00" inputMode="decimal" />
          </label>

          <label>
            <span>Observação</span>
            <textarea value={formOfflineRapido.observacao} onChange={(e) => setFormOfflineRapido({ ...formOfflineRapido, observacao: e.target.value })} placeholder="Observação interna" />
          </label>

          <button type="submit">Salvar offline</button>
        </form>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="mini-offline-list">
            <h3>Fila offline</h3>
            {filaOffline.length === 0 ? <p>Nenhum registro pendente.</p> : filaOffline.map((item) => (
              <article key={item.idLocal}>
                <strong>{item.tipo}</strong>
                <span>{item.payload?.cliente || 'Sem cliente'} · {moeda(item.payload?.valor || 0)}</span>
                <small>{dataHoraBR(item.criadoEm)}</small>
              </article>
            ))}
          </div>

          <div className="mini-offline-list">
            <h3>Delivery offline</h3>
            {deliveriesAbertos.slice(0, 8).map((item) => (
              <article key={item.id}>
                <strong>{item.clientes?.nome || 'Cliente não informado'}</strong>
                <span>{dataBR(item.data_entrega)} · {item.local_entrega || item.referencia || 'Sem local'}</span>
                <small>{item.descricao || item.status}</small>
                <button type="button" onClick={() => registrarEntregaOffline(item, 'Entregue')}>Marcar entregue offline</button>
              </article>
            ))}
            {deliveriesAbertos.length === 0 && <p>Nenhuma entrega aberta no cache.</p>}
          </div>

          <div className="mini-offline-list">
            <h3>Cobranças offline</h3>
            {pendenciasAbertas.slice(0, 8).map((item) => (
              <article key={item.id}>
                <strong>{item.vendas?.clientes?.nome || 'Cliente não informado'}</strong>
                <span>{moeda(item.saldo_restante)} · venc. {dataBR(item.vencimento)}</span>
                <small>{item.vendas?.clientes?.referencia || 'Sem referência'}</small>
                <button type="button" onClick={() => registrarCobrancaPagaOffline(item)}>Marcar paga offline</button>
              </article>
            ))}
            {pendenciasAbertas.length === 0 && <p>Nenhuma cobrança aberta no cache.</p>}
          </div>
        </div>
      </section>
    )
  }


  function montarTextoDiagnostico() {
    const atual = diagnosticoAtual || historicoDiagnostico[0] || registrarDiagnosticoSistema({ status: 'MANUAL' })
    const historicoTexto = (historicoDiagnostico || [])
      .slice(0, 10)
      .map((item) => `${item.dataLocal} | local ${item.versaoAplicativo} | publicada ${item.versaoPublicada} | maior aceita ${item.maiorVersaoAceita} | ${item.status}`)
      .join('\n')

    return [
      'MINI ERP, DIAGNÓSTICO DO SISTEMA',
      '',
      `Data: ${dataHoraDiagnostico()}`,
      `Versão do aplicativo: ${APP_VERSION}`,
      `Versão publicada: ${versaoPublicada || atual.versaoPublicada || APP_VERSION}`,
      `Maior versão aceita: ${lerMaiorVersaoAceita()}`,
      `Status da versão: ${downgradeBloqueado ? 'DIVERGÊNCIA, downgrade bloqueado' : novaVersaoDisponivel ? 'NOVA VERSÃO DISPONÍVEL' : 'OK'}`,
      '',
      `Service Worker disponível: ${typeof navigator !== 'undefined' && !!navigator.serviceWorker ? 'sim' : 'não'}`,
      `Service Worker controlando a página: ${typeof navigator !== 'undefined' && !!navigator.serviceWorker?.controller ? 'sim' : 'não'}`,
      `Online: ${online ? 'sim' : 'não'}`,
      `Ambiente: ${detectarAmbienteMiniErp()}`,
      `URL: ${typeof window === 'undefined' ? '' : window.location.href}`,
      `Navegador: ${detectarNavegadorMiniErp()}`,
      `Sistema: ${detectarSistemaMiniErp()}`,
      '',
      `Supabase: ${erroSincronizacaoDados ? 'erro' : 'conectado ou sem erro registrado'}`,
      `Última atualização de dados: ${ultimaAtualizacaoDados ? dataHoraDiagnostico(ultimaAtualizacaoDados) : 'não registrada'}`,
      `Erro de sincronização: ${erroSincronizacaoDados || 'nenhum erro registrado'}`,
      '',
      `Clientes carregados: ${clientes.length}`,
      `Pré-vendas carregadas: ${preVendas.length}`,
      `Cobranças carregadas: ${pendencias.length}`,
      `Delivery carregados: ${deliveries.length}`,
      `Vendas carregadas: ${vendas.length}`,
      '',
      'Últimas verificações:',
      historicoTexto || 'Nenhuma verificação registrada.',
    ].join('\n')
  }

  async function copiarDiagnosticoSistema() {
    const texto = montarTextoDiagnostico()

    try {
      await navigator.clipboard.writeText(texto)
      setDiagnosticoCopiado(true)
      setTimeout(() => setDiagnosticoCopiado(false), 2500)
    } catch (erro) {
      console.error('Não foi possível copiar o diagnóstico.', erro)
      alert(texto)
    }
  }

  function TelaDiagnosticoSistema() {
    const maiorVersao = lerMaiorVersaoAceita()
    const versaoStatus = downgradeBloqueado
      ? 'DIVERGÊNCIA, downgrade bloqueado'
      : novaVersaoDisponivel
        ? 'NOVA VERSÃO DISPONÍVEL'
        : 'OK'

    return (
      <section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-5 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-orange-400 uppercase tracking-[5px] text-xs mb-3">Diagnóstico</p>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Diagnóstico do Sistema</h2>
            <p className="text-zinc-500 mt-3 max-w-3xl">
              Área técnica para conferir versão, atualização, Service Worker, conexão e sincronização.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => verificarVersaoPublicada()}
              className="rounded-2xl bg-orange-950 hover:bg-orange-900 px-5 py-3 text-sm font-bold text-white"
            >
              Forçar verificação
            </button>
            <button
              type="button"
              onClick={copiarDiagnosticoSistema}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-5 py-3 text-sm font-bold text-white"
            >
              {diagnosticoCopiado ? 'Diagnóstico copiado' : 'Copiar diagnóstico'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-2">Versão do aplicativo</p>
            <strong className="text-2xl text-white">{APP_VERSION}</strong>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-2">Versão publicada</p>
            <strong className="text-2xl text-white">{versaoPublicada || APP_VERSION}</strong>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-2">Maior versão aceita</p>
            <strong className="text-2xl text-white">{maiorVersao}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-zinc-900 bg-black/60 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Estado técnico atual</h3>
            <div className="grid gap-3 text-sm">
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Status da versão</span><strong className="text-orange-200">{versaoStatus}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Online</span><strong>{online ? 'Sim' : 'Não'}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Service Worker disponível</span><strong>{typeof navigator !== 'undefined' && !!navigator.serviceWorker ? 'Sim' : 'Não'}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Service Worker controlando</span><strong>{typeof navigator !== 'undefined' && !!navigator.serviceWorker?.controller ? 'Sim' : 'Não'}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Ambiente</span><strong>{detectarAmbienteMiniErp()}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Navegador</span><strong>{detectarNavegadorMiniErp()}</strong></p>
              <p className="flex justify-between gap-4"><span className="text-zinc-500">Sistema</span><strong>{detectarSistemaMiniErp()}</strong></p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-900 bg-black/60 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Supabase e dados carregados</h3>
            <div className="grid gap-3 text-sm">
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Supabase</span><strong>{erroSincronizacaoDados ? 'Erro' : 'Conectado ou sem erro'}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Última atualização</span><strong>{ultimaAtualizacaoDados ? dataHoraDiagnostico(ultimaAtualizacaoDados) : 'Não registrada'}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Clientes</span><strong>{clientes.length}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Pré-vendas</span><strong>{preVendas.length}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Cobranças</span><strong>{pendencias.length}</strong></p>
              <p className="flex justify-between gap-4 border-b border-zinc-900 pb-2"><span className="text-zinc-500">Delivery</span><strong>{deliveries.length}</strong></p>
              <p className="flex justify-between gap-4"><span className="text-zinc-500">Vendas</span><strong>{vendas.length}</strong></p>
            </div>
            {erroSincronizacaoDados && (
              <p className="mt-4 rounded-xl border border-red-950 bg-red-950/20 p-3 text-sm text-red-200">
                {erroSincronizacaoDados}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-900 bg-black/60 p-4">
          <h3 className="text-lg font-bold text-white mb-4">Últimas verificações de versão</h3>
          <div className="grid gap-2">
            {(historicoDiagnostico || []).length === 0 && (
              <p className="text-sm text-zinc-500">Nenhuma verificação registrada ainda.</p>
            )}
            {(historicoDiagnostico || []).slice(0, 10).map((item) => (
              <article key={item.id} className="rounded-xl border border-zinc-900 bg-zinc-950/50 px-4 py-3 text-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                  <strong className="text-white">{item.dataLocal}</strong>
                  <span className={item.status === 'OK' ? 'text-green-300' : item.status === 'ERRO' ? 'text-red-300' : 'text-orange-300'}>
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-zinc-400">
                  Local {item.versaoAplicativo} · Publicada {item.versaoPublicada} · Maior aceita {item.maiorVersaoAceita}
                </p>
                <p className="mt-1 text-zinc-600">
                  {item.online ? 'Online' : 'Offline'} · SW {item.serviceWorkerControlando ? 'controlando' : 'não controlando'} · {item.navegador} · {item.sistema}
                </p>
                {item.erro && <p className="mt-2 text-red-300">{item.erro}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function Conteudo() {
    if (pagina === 'painel') return TelaPainel()
    if (pagina === 'relatorios') return TelaRelatorios()
    if (pagina === 'ponto-equilibrio') return TelaPontoEquilibrio()
    if (pagina === 'clientes') return TelaClientes()
    if (pagina === 'pre-vendas') return TelaPreVendas()
    if (pagina === 'pix-rapido') return TelaPixRapido()
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
    if (pagina === 'offline') return TelaOperacaoOffline()
    if (pagina === 'diagnostico') return TelaDiagnosticoSistema()
    if (pagina === 'roteiro-vendas') return TelaRoteiroVendas()
    if (pagina === 'taxas') return TelaTaxas()

    return TelaPainel()
  }

  const formasPagamentoModalFiltradas = (modalFormaPagamento.opcoes || []).filter((forma) => {
    const busca = chaveFormaPagamento(modalFormaPagamento.busca || '')
    if (!busca) return true
    return chaveFormaPagamento(forma).includes(busca)
  })

  const iconeFormaPagamento = (forma) => {
    const chave = chaveFormaPagamento(forma)
    if (chave.includes('pix')) return '◆'
    if (chave.includes('dinheiro')) return 'R$'
    if (chave.includes('debito')) return 'DB'
    if (chave.includes('credito')) return 'CR'
    if (chave.includes('link')) return '🔗'
    return '•'
  }

  const pixRapidoMobilePrioritario = pagina === 'pix-rapido'
  const classePrioridadePixConteudo = pixRapidoMobilePrioritario ? 'order-1 lg:order-none' : ''
  const classePrioridadePixCabecalho = pixRapidoMobilePrioritario ? 'order-2 lg:order-none mt-4 lg:mt-0' : ''
  const classePrioridadePixOperacional = pixRapidoMobilePrioritario ? 'order-2 lg:order-none' : ''

  return (
    <div className="min-h-screen bg-[#15110f] text-white overflow-x-hidden">
      {mostrarAberturaPwa && (
        <div className="mini-pwa-splash" aria-hidden="true">
          <div className="mini-pwa-splash-content">
            <img
              src="/brand/logo-queijos-serra-da-canastra.png"
              alt=""
              className="mini-pwa-splash-logo"
              draggable="false"
            />
            <span>ERP Canastra</span>
          </div>
        </div>
      )}

      {toast.visivel && (
        <div className={`mini-toast mini-toast-${toast.tipo}`} role="status" aria-live="polite">
          <span>{toast.tipo === 'sucesso' ? '✓' : '!'}</span>
          <p>{toast.mensagem}</p>
        </div>
      )}

      {modalPixRapidoQrAberto && pixRapidoGerado && (
        <div className="fixed inset-0 z-[1000] flex h-dvh items-stretch justify-center overflow-hidden bg-black/90 p-2 backdrop-blur-sm md:items-center md:p-4" role="dialog" aria-modal="true">
          <div className="flex h-full w-full max-w-5xl flex-col overflow-y-auto rounded-[28px] border border-orange-950 bg-[#15110f] p-4 shadow-2xl md:h-auto md:max-h-[92vh] md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-orange-400 font-bold">Pix R&aacute;pido</p>
                <h3 className="mt-1 text-2xl font-black text-white leading-tight">QR Code</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
                  <span className="rounded-2xl border border-zinc-800 bg-black px-3 py-2 text-orange-200">
                    Valor: {moeda(pixRapidoGerado.valor)}
                  </span>
                  <span className="rounded-2xl border border-zinc-800 bg-black px-3 py-2 text-yellow-300">
                    Status: {pixRapidoGerado.status}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={fecharModalPixRapidoQr}
                className="h-12 w-12 shrink-0 rounded-2xl bg-zinc-900 text-2xl font-black text-white hover:bg-zinc-800"
                aria-label="Fechar QR Code"
              >
                &times;
              </button>
            </div>

            {renderPixRapidoGerado({ modal: true })}
          </div>
        </div>
      )}

      {modalPixRapidoPreVenda.aberto && pixRapidoGerado && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/85 p-3 pt-6 pb-[140px] backdrop-blur-sm md:items-center md:p-4">
          <form
            onSubmit={salvarPixRapidoEmPreVenda}
            className="w-full max-w-2xl rounded-[26px] border border-orange-950 bg-[#15110f] p-4 shadow-2xl md:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-orange-400 font-bold">Pix R&aacute;pido</p>
                <h3 className="mt-1 text-2xl font-black text-white leading-tight">Salvar em Pr&eacute;-vendas</h3>
                <p className="mt-2 text-sm font-bold text-orange-200">{moeda(pixRapidoGerado.valor)}</p>
              </div>
              <button
                type="button"
                onClick={fecharModalPixRapidoPreVenda}
                className="h-12 w-12 shrink-0 rounded-2xl bg-zinc-900 text-2xl font-black text-white hover:bg-zinc-800"
                aria-label="Fechar"
              >
                &times;
              </button>
            </div>

            <div className="grid gap-3">
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Cliente, opcional</span>
                <input
                  value={modalPixRapidoPreVenda.cliente}
                  onChange={(e) => setModalPixRapidoPreVenda({ ...modalPixRapidoPreVenda, cliente: e.target.value })}
                  placeholder="Cliente"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Refer&ecirc;ncia, opcional</span>
                <input
                  value={modalPixRapidoPreVenda.referencia}
                  onChange={(e) => setModalPixRapidoPreVenda({ ...modalPixRapidoPreVenda, referencia: e.target.value })}
                  placeholder="Refer&ecirc;ncia"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-zinc-500">Itens ou observa&ccedil;&atilde;o, opcional</span>
                <textarea
                  value={modalPixRapidoPreVenda.observacao}
                  onChange={(e) => setModalPixRapidoPreVenda({ ...modalPixRapidoPreVenda, observacao: e.target.value })}
                  placeholder="Itens ou observa&ccedil;&atilde;o"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-orange-700"
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm font-bold text-zinc-200">
                <input type="checkbox" checked readOnly className="h-4 w-4 accent-orange-600" />
                Lan&ccedil;ar depois
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={fecharModalPixRapidoPreVenda}
                className="rounded-2xl bg-zinc-800 px-5 py-3 font-bold text-white hover:bg-zinc-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-orange-900 px-5 py-3 font-bold text-white hover:bg-orange-800"
              >
                Salvar em Pr&eacute;-vendas
              </button>
            </div>
          </form>
        </div>
      )}

      {modalSelecaoCobrancas.aberto && (() => {
        const itensSelecionados = (modalSelecaoCobrancas.itens || [])
          .filter((item) => (modalSelecaoCobrancas.selecionados || []).includes(item.id))
        const totalSelecionado = itensSelecionados.reduce((acc, item) => acc + Number(item.saldo_restante || 0), 0)

        return (
          <div className="fixed inset-0 z-[999] flex h-dvh items-center justify-center overflow-y-auto overscroll-contain bg-black/80 p-4">
            <div className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-[28px] border border-orange-950 bg-[#120f0d] p-6 shadow-2xl" role="dialog" aria-modal="true">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[4px] text-orange-400">Cobranças</p>
                  <h2 className="text-2xl font-bold">Selecionar cobranças recebidas</h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Cliente: <strong className="text-white">{modalSelecaoCobrancas.cliente?.nome || 'Cliente não informado'}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onPointerDown={fecharTecladoMobile}
                  onClick={fecharModalSelecaoCobrancas}
                  className="rounded-2xl bg-zinc-800 px-4 py-2 text-xl font-black text-white hover:bg-zinc-700"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <div className="grid gap-3">
                {(modalSelecaoCobrancas.itens || []).map((pendencia) => {
                  const selecionada = (modalSelecaoCobrancas.selecionados || []).includes(pendencia.id)
                  const ehSaldoAnterior = pendenciaEhHerdada(pendencia) || !pendencia.venda_id

                  return (
                    <button
                      key={pendencia.id}
                      type="button"
                      onPointerDown={fecharTecladoMobile}
                      onClick={() => alternarCobrancaSelecionada(pendencia.id)}
                      className={`rounded-2xl border p-4 text-left transition ${selecionada ? 'border-orange-500 bg-orange-950/35' : 'border-zinc-800 bg-zinc-950 hover:border-orange-700'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 flex h-6 w-6 items-center justify-center rounded-lg border text-xs font-black ${selecionada ? 'border-orange-400 bg-orange-500 text-black' : 'border-zinc-600 text-zinc-500'}`}>
                            {selecionada ? '✓' : ''}
                          </span>
                          <div>
                            <strong className="block text-white">
                              {ehSaldoAnterior ? 'Saldo anterior' : `Venda ${pendencia.vendas?.numero_venda ? `#${pendencia.vendas.numero_venda}` : ''}`}
                            </strong>
                            <span className="mt-1 block text-sm text-zinc-400">
                              Vencimento: {dataBR(pendencia.vencimento)}
                            </span>
                          </div>
                        </div>
                        <strong className="text-lg text-orange-300">{moeda(pendencia.saldo_restante)}</strong>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Total selecionado</p>
                <strong className="mt-1 block text-2xl text-green-300">{moeda(totalSelecionado)}</strong>
                <span className="mt-1 block text-sm text-zinc-500">
                  {itensSelecionados.length} cobrança{itensSelecionados.length === 1 ? '' : 's'} selecionada{itensSelecionados.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onPointerDown={fecharTecladoMobile}
                  onClick={fecharModalSelecaoCobrancas}
                  className="rounded-2xl bg-zinc-800 px-5 py-3 font-bold text-white hover:bg-zinc-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onPointerDown={fecharTecladoMobile}
                  onClick={confirmarSelecaoCobrancasCliente}
                  className="rounded-2xl bg-orange-900 px-5 py-3 font-bold text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={itensSelecionados.length === 0}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {modalEdicaoCliente.aberto && (
        <div className="mini-modal-overlay">
          <div className="mini-cliente-modal" role="dialog" aria-modal="true" aria-labelledby="titulo-editar-cliente">
            <div className="mini-modal-head">
              <div>
                <p>Cliente</p>
                <h3 id="titulo-editar-cliente">{modalEdicaoCliente.cliente ? 'Editar cliente' : 'Cadastrar cliente'}</h3>
                <span>{modalEdicaoCliente.cliente ? 'Atualize os dados com leitura limpa e segura.' : 'Cadastre o cliente com leitura limpa e segura.'}</span>
                {modalEdicaoCliente.cliente?.created_at && (
                  <span>{dataBR(modalEdicaoCliente.cliente.created_at)}</span>
                )}
              </div>
              <button type="button" onClick={fecharModalEdicaoCliente} aria-label="Fechar">×</button>
            </div>

            {!modalEdicaoCliente.cliente && (
              <div className="px-6 pt-4">
                <button
                  type="button"
                  onClick={cadastrarClientePorVoz}
                  className="w-full rounded-2xl border border-orange-900 bg-orange-950 px-4 py-3 text-sm font-bold text-orange-100 hover:bg-orange-900"
                >
                  {ouvindoClienteVoz ? 'Parar cadastro' : 'Cadastrar por voz'}
                </button>
                {textoClienteVoz && (
                  <p className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300">
                    {textoClienteVoz}
                  </p>
                )}
                {avisoClienteVoz && (
                  <p className="mt-2 text-xs text-zinc-400">{avisoClienteVoz}</p>
                )}
              </div>
            )}

            <div className="mini-cliente-modal-form">
              <label>
                <span>Nome</span>
                <input
                  ref={clienteNomeInputRef}
                  value={modalEdicaoCliente.nome}
                  onChange={(e) => setModalEdicaoCliente({ ...modalEdicaoCliente, nome: e.target.value })}
                  placeholder="Nome do cliente"
                  autoFocus
                />
              </label>

              <label>
                <span>Referência</span>
                <input
                  value={modalEdicaoCliente.referencia}
                  onChange={(e) => setModalEdicaoCliente({ ...modalEdicaoCliente, referencia: e.target.value })}
                  placeholder="Local, escola ou referência"
                />
              </label>

              <label>
                <span>Telefone</span>
                <input
                  value={modalEdicaoCliente.telefone}
                  onChange={(e) => setModalEdicaoCliente({ ...modalEdicaoCliente, telefone: e.target.value })}
                  placeholder="Contato do cliente"
                  inputMode="tel"
                />
              </label>

              <label>
                <span>Status</span>
                <select
                  value={modalEdicaoCliente.ativo ? 'ativo' : 'inativo'}
                  onChange={(e) => setModalEdicaoCliente({ ...modalEdicaoCliente, ativo: e.target.value === 'ativo' })}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </label>

              <label className="mini-cliente-modal-full">
                <span>Observação</span>
                <textarea
                  value={modalEdicaoCliente.observacao}
                  onChange={(e) => setModalEdicaoCliente({ ...modalEdicaoCliente, observacao: e.target.value })}
                  placeholder="Observação interna"
                />
              </label>
            </div>

            <div className="mini-modal-actions">
              <button type="button" onClick={fecharModalEdicaoCliente}>Cancelar</button>
              <button type="button" onClick={salvarEdicaoClienteModal}>{modalEdicaoCliente.cliente ? 'Salvar alterações' : 'Cadastrar cliente'}</button>
            </div>
          </div>
        </div>
      )}

      {modalEdicaoProduto.aberto && (() => {
        const indicadores = calcularIndicadoresProduto({
          preco_custo: numero(modalEdicaoProduto.preco_custo),
          preco_venda: numero(modalEdicaoProduto.preco_venda),
        })
        const statusIndicador = statusMargemCalculada(indicadores.margem)

        return (
          <div className="mini-modal-overlay">
            <div className="mini-produto-modal" role="dialog" aria-modal="true" aria-labelledby="titulo-editar-produto">
              <div className="mini-modal-head">
                <div>
                  <p>Produto</p>
                  <h3 id="titulo-editar-produto">{modalEdicaoProduto.produto ? 'Editar produto' : 'Cadastrar produto'}</h3>
                  <span>{modalEdicaoProduto.produto ? 'Ajuste cadastro, custo e venda com os indicadores calculados em tempo real.' : 'Informe produto, fornecedor, custo, venda, estoque e status.'}</span>
                </div>
                <button type="button" onClick={fecharModalEdicaoProduto} aria-label="Fechar">×</button>
              </div>

              <div className="mini-produto-modal-form">
                <label className="mini-produto-modal-full">
                  <span>Produto</span>
                  <input
                    value={modalEdicaoProduto.nome}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, nome: e.target.value })}
                    placeholder="Nome do produto"
                    autoFocus
                  />
                </label>

                <label>
                  <span>Fornecedor</span>
                  <select
                    value={modalEdicaoProduto.fornecedor_id}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, fornecedor_id: e.target.value })}
                  >
                    <option value="">Sem fornecedor</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Custo atual</span>
                  <input
                    value={modalEdicaoProduto.preco_custo}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, preco_custo: e.target.value })}
                    placeholder="Custo"
                    inputMode="decimal"
                  />
                </label>

                <label>
                  <span>Preço de venda</span>
                  <input
                    value={modalEdicaoProduto.preco_venda}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, preco_venda: e.target.value })}
                    placeholder="Preço de venda"
                    inputMode="decimal"
                  />
                </label>

                <label>
                  <span>Estoque</span>
                  <input
                    value={modalEdicaoProduto.estoque}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, estoque: e.target.value })}
                    placeholder="Estoque"
                    inputMode="numeric"
                  />
                </label>

                <label>
                  <span>Status</span>
                  <select
                    value={modalEdicaoProduto.ativo ? 'ativo' : 'inativo'}
                    onChange={(e) => setModalEdicaoProduto({ ...modalEdicaoProduto, ativo: e.target.value === 'ativo' })}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </label>
              </div>

              <div className="mini-produto-indicadores">
                <div>
                  <span>Lucro bruto</span>
                  <strong className={indicadores.lucroBruto >= 0 ? 'texto-verde' : 'texto-vermelho'}>{moeda(indicadores.lucroBruto)}</strong>
                </div>
                <div>
                  <span>Margem</span>
                  <strong>{indicadores.margem.toFixed(2).replace('.', ',')}%</strong>
                </div>
                <div>
                  <span>Markup</span>
                  <strong>{indicadores.markup > 0 ? indicadores.markup.toFixed(2).replace('.', ',') : '0,00'}</strong>
                </div>
                <div>
                  <span>Classificação</span>
                  <strong className={`mini-indicador-pill ${statusIndicador.classe}`}>{statusIndicador.texto}</strong>
                </div>
              </div>

              <div className="mini-modal-actions">
                <button type="button" onClick={fecharModalEdicaoProduto}>Cancelar</button>
                <button type="button" onClick={salvarEdicaoProdutoModal}>{modalEdicaoProduto.produto ? 'Salvar alterações' : 'Cadastrar produto'}</button>
              </div>
            </div>
          </div>
        )
      })()}
      <header className="mini-mobile-topbar lg:hidden">
        <div className="mini-mobile-brand">
          <p>Sistema</p>
          <h1>Queijos Serra da Canastra</h1>
          <span>Mini ERP Premium</span>
          <small className="mini-version-pill">{APP_VERSION_LABEL}</small>
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

      {modalFormaPagamento.aberto && (
        <div className="mini-payment-modal-backdrop fixed inset-0 z-[220] flex h-dvh items-center justify-center overflow-y-auto overscroll-contain bg-black/75 p-4 backdrop-blur-sm">
          <div className="mini-payment-modal w-full max-w-[520px] max-h-[92dvh] overflow-y-auto overscroll-contain rounded-[26px] border border-zinc-700 bg-gradient-to-b from-zinc-900 to-black p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Selecionar forma de pagamento</h3>
                <p className="mt-2 text-sm text-zinc-400">Selecione a forma, confira o valor recebido e confirme.</p>
              </div>
              <button
                type="button"
                onPointerDown={fecharTecladoMobile}
                onClick={fecharModalFormaPagamento}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-800 text-xl font-black text-zinc-300 hover:bg-zinc-700"
              >
                ×
              </button>
            </div>

            <input
              autoFocus
              value={modalFormaPagamento.busca}
              onChange={(e) => setModalFormaPagamento((atual) => ({ ...atual, busca: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmarBuscaFormaPagamento()
                if (e.key === 'Escape') fecharModalFormaPagamento()
              }}
              placeholder="Buscar por nome ou número"
              className="mb-4 w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-orange-500"
            />

            <div className="grid gap-2">
              {formasPagamentoModalFiltradas.map((forma) => {
                const indice = (modalFormaPagamento.opcoes || []).findIndex((item) => item === forma) + 1
                return (
                  <button
                    key={forma}
                    type="button"
                    onPointerDown={fecharTecladoMobile}
                    onClick={() => selecionarFormaPagamentoRecebimento(forma)}
                    className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left ${modalFormaPagamento.selecionada === forma ? 'border-orange-500 bg-orange-950/35' : 'border-zinc-700 bg-zinc-950 hover:border-orange-500 hover:bg-zinc-900'}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-950 text-xs font-black text-orange-200">{indice}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 text-xs font-black text-white">{iconeFormaPagamento(forma)}</span>
                      <span className="font-bold text-white">{forma}</span>
                    </span>
                    <span className="text-sm font-black text-orange-300">{modalFormaPagamento.selecionada === forma ? 'Selecionado' : 'Selecionar'}</span>
                  </button>
                )
              })}

              {formasPagamentoModalFiltradas.length === 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
                  Nenhuma forma encontrada.
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 rounded-2xl border border-zinc-800 bg-black/40 p-4">
              <label className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Valor recebido</label>
              <input
                value={modalFormaPagamento.valor}
                onChange={(e) => setModalFormaPagamento((atual) => ({ ...atual, valor: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmarBuscaFormaPagamento()
                  if (e.key === 'Escape') fecharModalFormaPagamento()
                }}
                placeholder="0,00"
                inputMode="decimal"
                className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-lg font-black text-white outline-none focus:border-orange-500"
              />

              {(() => {
                const formaSelecionada = modalFormaPagamento.selecionada || modalFormaPagamento.padrao || 'Pix'
                const valorInformado = numero(modalFormaPagamento.valor)
                const resumo = calcularLiquidoPagamentoCaixa(valorInformado, formaSelecionada)

                return (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-zinc-950 p-3">
                      <p className="text-[10px] font-black uppercase tracking-wide text-zinc-500">Forma</p>
                      <p className="mt-1 text-xs font-black text-white">{formaSelecionada}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-950 p-3">
                      <p className="text-[10px] font-black uppercase tracking-wide text-zinc-500">Taxa</p>
                      <p className="mt-1 text-xs font-black text-orange-300">{moeda(resumo.valorTaxa)}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-950 p-3">
                      <p className="text-[10px] font-black uppercase tracking-wide text-zinc-500">Caixa</p>
                      <p className="mt-1 text-xs font-black text-green-300">{moeda(resumo.valorLiquido)}</p>
                    </div>
                  </div>
                )
              })()}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onPointerDown={fecharTecladoMobile}
                onClick={fecharModalFormaPagamento}
                className="rounded-2xl bg-zinc-800 px-5 py-3 font-bold text-white hover:bg-zinc-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onPointerDown={fecharTecladoMobile}
                onClick={confirmarBuscaFormaPagamento}
                className="rounded-2xl bg-orange-900 px-5 py-3 font-bold text-white hover:bg-orange-800"
              >
                Confirmar recebimento
              </button>
            </div>
          </div>
        </div>
      )}

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
                <small className="mini-version-pill">{APP_VERSION_LABEL}</small>
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
              {itensMenu.map((item) => botaoMenuMobile(item))}
            </nav>

            <div className="mini-version-box">
              <span>{APP_VERSION_LABEL}</span>
              <button type="button" onClick={atualizarSistema}>Atualizar sistema</button>
            </div>
          </aside>
        </div>
      )}

      {modalEdicaoDelivery.aberto && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4">
          <form
            onSubmit={salvarDelivery}
            className="w-full max-w-[760px] max-h-[92vh] overflow-y-auto rounded-[28px] border border-orange-950 bg-[#120f0d] p-6 shadow-2xl"
          >
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[4px] text-orange-400 mb-2">Delivery</p>
              <h2 className="text-2xl font-bold">Editar entrega</h2>
              <p className="text-sm text-zinc-500 mt-2">
                Atualize os dados da entrega e salve as alterações.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              {renderCampoBuscaClienteDelivery()}

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
                className="sm:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[74px] leading-relaxed"
              />

              <input
                value={formDelivery.valor_total}
                onChange={(e) => setFormDelivery({ ...formDelivery, valor_total: e.target.value })}
                placeholder="Valor total"
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3"
              />
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={fecharModalEdicaoDelivery}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-2xl p-3 font-semibold"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-orange-950 hover:bg-orange-900 rounded-2xl p-3 font-semibold"
              >
                Salvar alterações
              </button>
            </div>
          </form>
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


      {modalEdicaoPendencia.aberto && (
        <div className="mini-modal-backdrop fixed inset-0 z-[220] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="mini-modal-card w-full max-w-lg rounded-[28px] border border-orange-950 bg-black p-5 shadow-2xl lg:p-6">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-zinc-900 pb-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-orange-400">Cobrança</p>
                <h3 className="text-2xl font-bold text-white">Editar vencimento</h3>
                <p className="mt-2 text-sm text-zinc-500">Ajuste a data pelo calendário, no padrão dia, mês e ano.</p>
              </div>
              <button
                type="button"
                onClick={fecharModalEdicaoPendencia}
                className="h-10 w-10 rounded-2xl bg-zinc-900 text-xl font-bold text-zinc-300 hover:bg-zinc-800"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
                <p className="text-xs uppercase tracking-[2px] text-zinc-500">Cliente</p>
                <p className="mt-1 text-lg font-bold text-white">{clienteDaPendencia(modalEdicaoPendencia.pendencia || {}).nome || 'Cliente não informado'}</p>
                <p className="mt-1 text-sm text-zinc-500">{clienteDaPendencia(modalEdicaoPendencia.pendencia || {}).referencia || 'Sem referência'}</p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[2px] text-zinc-500">Saldo em aberto</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={modalEdicaoPendencia.saldo}
                  onChange={(e) => setModalEdicaoPendencia({ ...modalEdicaoPendencia, saldo: e.target.value })}
                  onBlur={(e) => setModalEdicaoPendencia({ ...modalEdicaoPendencia, saldo: moedaInput(e.target.value) })}
                  className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white"
                  placeholder="R$ 0,00"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[2px] text-zinc-500">Data de vencimento</label>
                <input
                  type="date"
                  value={modalEdicaoPendencia.vencimento}
                  onClick={abrirCalendario}
                  onFocus={abrirCalendario}
                  onChange={(e) => setModalEdicaoPendencia({ ...modalEdicaoPendencia, vencimento: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white"
                />
                <p className="mt-2 text-xs text-zinc-500">No navegador, a escolha aparece como calendário e a leitura segue o padrão brasileiro.</p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[2px] text-zinc-500">Status</label>
                <select
                  value={modalEdicaoPendencia.status}
                  onChange={(e) => setModalEdicaoPendencia({ ...modalEdicaoPendencia, status: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white"
                >
                  <option value="EM ABERTO">EM ABERTO</option>
                  <option value="PARCIAL">PARCIAL</option>
                  <option value="PAGO">PAGO</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={fecharModalEdicaoPendencia}
                className="rounded-2xl bg-zinc-800 p-4 font-semibold text-white hover:bg-zinc-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvarEdicaoPendenciaFinanceira}
                className="rounded-2xl bg-orange-950 p-4 font-semibold text-white hover:bg-orange-900"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}


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
            <div className="mini-version-box mt-4">
              <span>{APP_VERSION_LABEL}</span>
              <button type="button" onClick={atualizarSistema}>Atualizar sistema</button>
            </div>
          </div>

          <nav className="space-y-3 overflow-y-auto max-h-[75vh] pr-2">
            {itensMenu.map((item) => botaoMenu(item.id, item.icone, item.texto))}
          </nav>
        </aside>

        <div className="mini-bottom-nav lg:hidden">
          <button
            type="button"
            onClick={() => setPagina('pre-vendas')}
            className={pagina === 'pre-vendas' ? 'mini-bottom-active' : ''}
          >
            Pré-venda
          </button>

          <button
            type="button"
            onClick={() => setPagina('pix-rapido')}
            className={pagina === 'pix-rapido' ? 'mini-bottom-active' : ''}
          >
            QR Code
          </button>

          <button
            type="button"
            onClick={() => setPagina('cobrancas')}
            className={pagina === 'cobrancas' ? 'mini-bottom-active' : ''}
          >
            Cobranças
          </button>

          <button
            type="button"
            onClick={() => setPagina('delivery')}
            className={pagina === 'delivery' ? 'mini-bottom-active' : ''}
          >
            Delivery
          </button>
        </div>

        <main className={`mini-app-main p-4 lg:p-8${pixRapidoMobilePrioritario ? ' flex flex-col lg:block' : ''}`}>
          <section className={`mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6 ${classePrioridadePixCabecalho}`}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">Mini ERP Queijos Serra da Canastra</h2>
                <p className="text-zinc-500">Sistema profissional conectado ao Supabase.</p>
              </div>
              <div className="mini-version-box mini-version-box-inline">
                <span>{APP_VERSION_LABEL}</span>
                <button type="button" onClick={atualizarSistema}>Atualizar sistema</button>
              </div>
            </div>
          </section>

          {downgradeBloqueado && (
            <section className={`mini-update-alert mini-update-alert-danger ${classePrioridadePixOperacional}`}>
              <div>
                <strong>Versão anterior bloqueada</strong>
                <span>
                  O sistema detectou uma versão publicada ou carregada anterior à última versão aceita. Não lance vendas até atualizar.
                </span>
              </div>
              <button type="button" onClick={atualizarSistema}>Atualizar agora</button>
            </section>
          )}

          {novaVersaoDisponivel && (
            <section className={`mini-update-alert ${classePrioridadePixOperacional}`}>
              <div>
                <strong>Nova versão disponível</strong>
                <span>Versão publicada: {versaoPublicada}. Atualize antes de continuar o atendimento.</span>
              </div>
              <button type="button" onClick={atualizarSistema}>Atualizar agora</button>
            </section>
          )}

          <section className={`mini-sync-bar ${erroSincronizacaoDados ? 'mini-sync-bar-error' : ''} ${classePrioridadePixOperacional}`}>
            <div>
              <strong>{sincronizandoDados ? 'Atualizando dados' : 'Sincronização automática'}</strong>
              <span>{textoUltimaAtualizacaoDados()}</span>
            </div>
            <button type="button" onClick={() => sincronizarDados({ manual: true })} disabled={sincronizandoDados}>
              {sincronizandoDados ? 'Atualizando...' : 'Atualizar dados'}
            </button>
          </section>

          <section className={`mini-offline-bar ${online ? 'mini-offline-bar-online' : 'mini-offline-bar-offline'} ${classePrioridadePixOperacional}`}>
            <div>
              <strong>{online ? 'Operação online' : 'Modo offline ativo'}</strong>
              <span>{textoStatusConexao()} · {textoCacheOffline()}</span>
            </div>
            <button type="button" onClick={sincronizarFilaOffline} disabled={sincronizandoOffline || filaOffline.length === 0}>
              {sincronizandoOffline ? 'Sincronizando...' : 'Sincronizar offline'}
            </button>
          </section>

          {Conteudo()}
        </main>
      </div>
    </div>
  )
}







