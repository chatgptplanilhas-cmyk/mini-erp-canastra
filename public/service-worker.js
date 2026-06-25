const MINI_ERP_VERSION = '2026.06.24.03'
const MINI_ERP_CACHE_NAME = `mini-erp-app-${MINI_ERP_VERSION}`
const MINI_ERP_CACHE_PREFIX = 'mini-erp-app-'
const MINI_ERP_ESSENTIAL_URLS = ['/', '/index.html', '/version.json', '/diagnostico-emergencia.html', '/mini-erp-boot-blackbox.js']

function normalizarVersao(valor) {
  return String(valor || '').trim().replace(/[^0-9.]/g, '')
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

async function abrirCacheAtual() {
  return caches.open(MINI_ERP_CACHE_NAME)
}

async function lerVersaoPublicada() {
  try {
    const resposta = await fetch(`/version.json?sw=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })

    if (!resposta.ok) return MINI_ERP_VERSION

    const dados = await resposta.clone().json()
    return normalizarVersao(dados?.version || MINI_ERP_VERSION)
  } catch (erro) {
    return MINI_ERP_VERSION
  }
}

async function respostaVersaoProtegida() {
  const versaoPublicada = await lerVersaoPublicada()

  if (compararVersoes(versaoPublicada, MINI_ERP_VERSION) < 0) {
    return new Response(
      JSON.stringify({
        version: MINI_ERP_VERSION,
        label: `Mini ERP v${MINI_ERP_VERSION}`,
        protected: true,
        blockedPublishedVersion: versaoPublicada,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    )
  }

  return fetch(`/version.json?sw=${Date.now()}`, { cache: 'no-store' })
}

async function responderNavegacao(request) {
  const cache = await abrirCacheAtual()
  const versaoPublicada = await lerVersaoPublicada()
  const precisaBloquearDowngrade = compararVersoes(versaoPublicada, MINI_ERP_VERSION) < 0

  if (precisaBloquearDowngrade) {
    const respostaCache = await cache.match('/') || await cache.match('/index.html')
    if (respostaCache) return respostaCache
  }

  try {
    const respostaRede = await fetch(request, { cache: 'no-store' })

    if (respostaRede && respostaRede.ok) {
      cache.put('/', respostaRede.clone())
      cache.put('/index.html', respostaRede.clone())
    }

    return respostaRede
  } catch (erro) {
    const respostaCache = await cache.match('/') || await cache.match('/index.html')
    if (respostaCache) return respostaCache
    throw erro
  }
}

async function responderAsset(request) {
  const cache = await abrirCacheAtual()
  const respostaCache = await cache.match(request)

  if (respostaCache) return respostaCache

  const respostaRede = await fetch(request)

  if (respostaRede && respostaRede.ok) {
    cache.put(request, respostaRede.clone())
  }

  return respostaRede
}

async function responderDiagnosticoAtualizado(request) {
  const cache = await abrirCacheAtual()

  try {
    const respostaRede = await fetch(request, { cache: 'no-store' })

    if (respostaRede && respostaRede.ok) {
      cache.put(request, respostaRede.clone())
    }

    return respostaRede
  } catch (erro) {
    const respostaCache = await cache.match(request)
    if (respostaCache) return respostaCache
    throw erro
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    abrirCacheAtual()
      .then((cache) => cache.addAll(MINI_ERP_ESSENTIAL_URLS))
      .catch(() => null)
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((nomes) =>
        Promise.all(
          nomes.map((nome) => {
            if (nome.startsWith(MINI_ERP_CACHE_PREFIX) && nome !== MINI_ERP_CACHE_NAME) {
              return caches.delete(nome)
            }
            return Promise.resolve(false)
          }),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  if (url.pathname === '/version.json') {
    event.respondWith(respostaVersaoProtegida())
    return
  }

  if (url.pathname === '/diagnostico-emergencia.html' || url.pathname === '/mini-erp-boot-blackbox.js') {
    event.respondWith(responderDiagnosticoAtualizado(request))
    return
  }

  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(responderNavegacao(request))
    return
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(responderAsset(request))
  }
})
