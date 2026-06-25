import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const MINI_ERP_BOOT_VERSION = '2026.06.24.03'
const MINI_ERP_HIGHEST_VERSION_KEY = 'miniErpHighestAcceptedVersion'

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

async function limparServiceWorkersAntigos() {
  if (!('serviceWorker' in navigator)) return

  const registros = await navigator.serviceWorker.getRegistrations()
  await Promise.all(
    registros.map(async (registro) => {
      const url = registro.active?.scriptURL || registro.waiting?.scriptURL || registro.installing?.scriptURL || ''
      const caminhoScript = url ? new URL(url).pathname : ''
      const nomeValido = caminhoScript === '/sw.js' || caminhoScript === '/service-worker.js'

      if (!nomeValido) {
        await registro.unregister()
      }
    }),
  )
}

function registrarMaiorVersaoLocal() {
  try {
    const maiorVersao = window.localStorage.getItem(MINI_ERP_HIGHEST_VERSION_KEY) || MINI_ERP_BOOT_VERSION

    if (compararVersoes(MINI_ERP_BOOT_VERSION, maiorVersao) >= 0) {
      window.localStorage.setItem(MINI_ERP_HIGHEST_VERSION_KEY, MINI_ERP_BOOT_VERSION)
      return MINI_ERP_BOOT_VERSION
    }

    window.localStorage.setItem(
      'miniErpDowngradeBlocked',
      JSON.stringify({
        versaoAtual: MINI_ERP_BOOT_VERSION,
        maiorVersao,
        bloqueadoEm: new Date().toISOString(),
        origem: 'boot',
      }),
    )

    return maiorVersao
  } catch (erro) {
    console.warn('Não foi possível registrar a maior versão local.', erro)
    return MINI_ERP_BOOT_VERSION
  }
}

async function registrarServiceWorkerBlindado() {
  if (!('serviceWorker' in navigator)) return

  try {
    await navigator.serviceWorker.register('/sw.js?v=' + encodeURIComponent(MINI_ERP_BOOT_VERSION), {
      scope: '/',
      updateViaCache: 'none',
    })
  } catch (erro) {
    console.warn('Não foi possível registrar o service worker blindado.', erro)
  }
}

async function blindarContraVersaoAntiga() {
  try {
    window.__MINI_ERP_BOOT_VERSION__ = MINI_ERP_BOOT_VERSION
    registrarMaiorVersaoLocal()
    await limparServiceWorkersAntigos()
    await registrarServiceWorkerBlindado()

    try {
      window.localStorage.setItem('miniErpCacheShieldVersion', MINI_ERP_BOOT_VERSION)
      window.localStorage.setItem('miniErpLastCacheShieldRun', new Date().toISOString())
    } catch (erro) {
      console.warn('Não foi possível registrar a blindagem local.', erro)
    }
  } catch (erro) {
    console.warn('Blindagem inicial contra versão antiga não concluída.', erro)
  }
}

blindarContraVersaoAntiga().finally(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
