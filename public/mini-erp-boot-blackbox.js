(() => {
  const APP_VERSION_ESPERADA = '2026.06.24.03'
  const STORAGE_KEY = 'miniErpBootBlackBox'
  const MAX_REGISTROS = 30

  function textoErro(erro) {
    return erro instanceof Error ? erro.message : String(erro || 'Erro desconhecido')
  }

  function detectarNavegador() {
    const agente = navigator.userAgent || ''
    if (/Edg\//.test(agente)) return 'Microsoft Edge'
    if (/Chrome|CriOS/.test(agente)) return 'Chrome'
    if (/Safari/.test(agente)) return 'Safari'
    return 'Não identificado'
  }

  function recursosCarregados(seletor, atributo) {
    try {
      return Array.from(document.querySelectorAll(seletor))
        .map((elemento) => elemento[atributo] || elemento.getAttribute(atributo) || '')
        .filter(Boolean)
    } catch (erro) {
      return []
    }
  }

  function lerRegistrosAnteriores() {
    try {
      const bruto = window.localStorage.getItem(STORAGE_KEY)
      const registros = JSON.parse(bruto || '[]')
      return Array.isArray(registros) ? registros : []
    } catch (erro) {
      return []
    }
  }

  function salvarRegistros(registros) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registros.slice(0, MAX_REGISTROS)))
    } catch (erro) {
      // A Caixa Preta não pode impedir o carregamento caso o armazenamento esteja indisponível.
    }
  }

  function salvarRegistro(registro) {
    salvarRegistros([registro, ...lerRegistrosAnteriores()])
  }

  function atualizarRegistro(id, obterAtualizacao) {
    try {
      const registros = lerRegistrosAnteriores()
      const indice = registros.findIndex((item) => item.id === id)
      if (indice < 0) return
      const atual = registros[indice]
      registros[indice] = { ...atual, ...obterAtualizacao(atual) }
      salvarRegistros(registros)
    } catch (erro) {
      // A atualização de diagnóstico permanece isolada do app.
    }
  }

  function combinarErros(...erros) {
    return erros.filter(Boolean).join(' | ')
  }

  async function coletarEstadoDinamico() {
    const erros = []
    const adicionarErro = (origem, erro) => erros.push(`${origem}: ${textoErro(erro)}`)
    const controller = navigator.serviceWorker?.controller || null
    const estado = {
      publishedVersion: '',
      serviceWorkerController: Boolean(controller),
      serviceWorkerControllerScriptURL: controller?.scriptURL || '',
      serviceWorkerRegistrations: [],
      cacheNames: [],
      erro: '',
    }

    try {
      const resposta = await fetch(`/version.json?blackbox=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      })
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
      const dados = await resposta.json()
      estado.publishedVersion = String(dados?.version || '')
    } catch (erro) {
      adicionarErro('version.json', erro)
    }

    if ('serviceWorker' in navigator) {
      try {
        const registros = await navigator.serviceWorker.getRegistrations()
        estado.serviceWorkerRegistrations = registros.map((item) => ({
          scope: item.scope || '',
          active: item.active?.scriptURL || '',
          waiting: item.waiting?.scriptURL || '',
          installing: item.installing?.scriptURL || '',
        }))
      } catch (erro) {
        adicionarErro('serviceWorker', erro)
      }
    }

    try {
      if ('caches' in window) estado.cacheNames = await window.caches.keys()
    } catch (erro) {
      adicionarErro('caches', erro)
    }

    estado.erro = erros.join(' | ')
    return estado
  }

  async function registrarBoot() {
    const data = new Date()
    const controller = navigator.serviceWorker?.controller || null
    const id = `${data.getTime()}-${Math.random().toString(16).slice(2)}`
    const registro = {
      id,
      fase: 'early',
      dataHoraIso: data.toISOString(),
      timestamp: data.getTime(),
      url: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      userAgent: navigator.userAgent || '',
      navegador: detectarNavegador(),
      platform: navigator.platform || '',
      language: navigator.language || '',
      online: navigator.onLine,
      visibilityState: document.visibilityState || '',
      appVersionEsperada: APP_VERSION_ESPERADA,
      publishedVersion: '',
      serviceWorkerSupported: 'serviceWorker' in navigator,
      serviceWorkerController: Boolean(controller),
      serviceWorkerControllerScriptURL: controller?.scriptURL || '',
      serviceWorkerRegistrations: [],
      cacheNames: [],
      performanceNavigationType: '',
      scriptsCarregados: recursosCarregados('script[src]', 'src'),
      cssCarregados: recursosCarregados('link[rel="stylesheet"]', 'href'),
      afterLoadCapturado: false,
      afterLoadDataHoraIso: '',
      scriptsCarregadosAfterLoad: [],
      cssCarregadosAfterLoad: [],
      erro: '',
    }

    try {
      const navegacao = performance.getEntriesByType?.('navigation')?.[0]
      registro.performanceNavigationType = navegacao?.type || performance.navigation?.type || ''
    } catch (erro) {
      registro.erro = combinarErros(registro.erro, `performance: ${textoErro(erro)}`)
    }

    salvarRegistro(registro)

    let afterLoadExecutado = false
    const capturarAfterLoad = async () => {
      if (afterLoadExecutado) return
      afterLoadExecutado = true
      try {
        const estadoAfterLoad = await coletarEstadoDinamico()
        atualizarRegistro(id, (atual) => ({
          ...estadoAfterLoad,
          afterLoadCapturado: true,
          afterLoadDataHoraIso: new Date().toISOString(),
          scriptsCarregadosAfterLoad: recursosCarregados('script[src]', 'src'),
          cssCarregadosAfterLoad: recursosCarregados('link[rel="stylesheet"]', 'href'),
          erro: combinarErros(atual.erro, estadoAfterLoad.erro),
        }))
      } catch (erro) {
        atualizarRegistro(id, (atual) => ({
          afterLoadCapturado: true,
          afterLoadDataHoraIso: new Date().toISOString(),
          erro: combinarErros(atual.erro, `after-load: ${textoErro(erro)}`),
        }))
      }
    }

    if (document.readyState === 'complete') {
      void capturarAfterLoad()
    } else {
      window.addEventListener('load', () => void capturarAfterLoad(), { once: true })
    }
    window.setTimeout(() => void capturarAfterLoad(), 1500)

    try {
      const estadoInicial = await coletarEstadoDinamico()
      atualizarRegistro(id, (atual) => ({ ...estadoInicial, erro: combinarErros(atual.erro, estadoInicial.erro) }))
    } catch (erro) {
      atualizarRegistro(id, (atual) => ({ erro: combinarErros(atual.erro, `estado inicial: ${textoErro(erro)}`) }))
    }
  }

  try {
    void registrarBoot()
  } catch (erro) {
    // Falhas inesperadas permanecem isoladas do boot do Mini ERP.
  }
})()
