$ErrorActionPreference = "Stop"

$src = $PSScriptRoot
$app = Join-Path $src "App.jsx"
$css = Join-Path $src "index.css"

if (!(Test-Path $app)) {
  Write-Host "ERRO: App.jsx nao encontrado na pasta src." -ForegroundColor Red
  exit 1
}

if (!(Test-Path $css)) {
  Write-Host "ERRO: index.css nao encontrado na pasta src." -ForegroundColor Red
  exit 1
}

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase5-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase5-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Garante que exista controle de menu mobile
if ($appCode -notmatch "const \[menuMobileAberto, setMenuMobileAberto\]") {
  $appCode = $appCode.Replace(
    "const [pagina, setPagina] = useState('painel')",
    "const [pagina, setPagina] = useState('painel')`r`n  const [menuMobileAberto, setMenuMobileAberto] = useState(false)"
  )
}

# Garante que os botoes do menu fechem o drawer no mobile
$appCode = $appCode.Replace(
  "onClick={() => setPagina(id)}",
  "onClick={() => { setPagina(id); setMenuMobileAberto(false) }}"
)

# Remove topbar mobile antigo, se existir
$appCode = [regex]::Replace(
  $appCode,
  '(?s)\s*<div className="lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950 p-3">.*?</div>\s*(?=<aside)',
  "`r`n",
  1
)

$drawer = @'
        <div className="mini-mobile-topbar lg:hidden">
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
        </div>

        {menuMobileAberto && (
          <div className="mini-mobile-layer lg:hidden">
            <div className="mini-mobile-backdrop" onClick={() => setMenuMobileAberto(false)} />

            <aside className="mini-mobile-drawer">
              <div className="mini-mobile-drawer-head">
                <div>
                  <p>Sistema</p>
                  <h2>Queijos Serra da Canastra</h2>
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
                {botaoMenu('painel', '📊', 'Painel')}
                {botaoMenu('clientes', '👤', 'Clientes')}
                {botaoMenu('vendas', '🧾', 'Vendas')}
                {botaoMenu('pendencias', '💰', 'Pendências')}
                {botaoMenu('pagamentos', '💳', 'Pagamentos')}
                {botaoMenu('delivery', '🚚', 'Delivery')}
                {botaoMenu('produtos', '🧀', 'Produtos')}
                {botaoMenu('produtos-controle', '📦', 'Produtos & Controle')}
                {botaoMenu('fornecedores', '🚚', 'Fornecedores')}
                {botaoMenu('despesas', '🧾', 'Despesas')}
                {botaoMenu('taxas', '⚙️', 'Taxas')}
              </nav>
            </aside>
          </div>
        )}

'@

# Remove drawer anterior da fase 4, se existir, para evitar duplicidade
$appCode = [regex]::Replace(
  $appCode,
  '(?s)\s*<div className="mobile-topbar lg:hidden">.*?\{menuMobileAberto && \(\s*<div className="mobile-menu-layer lg:hidden">.*?</div>\s*\)}\s*(?=<aside)',
  "`r`n",
  1
)

# Insere novo drawer antes do aside desktop
if ($appCode -notmatch "mini-mobile-drawer") {
  $appCode = $appCode.Replace(
    '<aside className="hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">',
    $drawer + '<aside className="hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">'
  )
}

# Adiciona classe para telas principais, sem mexer em regra de negocio
$appCode = $appCode.Replace('className="app-main ', 'className="mini-app-main ')
$appCode = $appCode.Replace('className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-8"', 'className="mini-app-main w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-8"')
$appCode = $appCode.Replace('className="p-4 lg:p-8 w-full max-w-full overflow-x-hidden"', 'className="mini-app-main p-4 lg:p-8 w-full max-w-full overflow-x-hidden"')
$appCode = $appCode.Replace('className="p-4 lg:p-8"', 'className="mini-app-main p-4 lg:p-8"')
$appCode = $appCode.Replace('className="p-8"', 'className="mini-app-main p-8"')

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 5 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase5 = @'

/* MINI ERP MOBILE PHASE 5 */
@media (max-width: 767px) {
  body {
    background: #15110f !important;
  }

  .mini-mobile-topbar {
    position: sticky;
    top: 0;
    z-index: 80;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(0, 0, 0, 0.98);
    border-bottom: 1px solid rgba(124, 45, 18, 0.9);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36);
  }

  .mini-mobile-brand p,
  .mini-mobile-drawer-head p {
    margin: 0 0 4px;
    color: #fb923c;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 5px;
    text-transform: uppercase;
  }

  .mini-mobile-brand h1 {
    margin: 0;
    color: #fff;
    font-size: 17px !important;
    line-height: 1.05 !important;
    font-weight: 900;
  }

  .mini-mobile-brand span,
  .mini-mobile-drawer-head span {
    display: block;
    margin-top: 4px;
    color: #71717a;
    font-size: 11px;
  }

  .mini-mobile-menu-button,
  .mini-mobile-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(124, 45, 18, 0.95);
    border-radius: 14px;
    background: #0b0b0b;
    color: #fff;
    font-size: 23px !important;
    font-weight: 900;
  }

  .mini-mobile-layer {
    position: fixed;
    inset: 0;
    z-index: 120;
  }

  .mini-mobile-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px);
  }

  .mini-mobile-drawer {
    position: absolute;
    inset: 0 auto 0 0;
    display: block !important;
    width: min(86vw, 340px);
    height: 100dvh;
    padding: 16px 14px;
    overflow-y: auto;
    background: #000;
    border-right: 1px solid rgba(124, 45, 18, 0.95);
    box-shadow: 28px 0 70px rgba(0, 0, 0, 0.62);
  }

  .mini-mobile-drawer-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 14px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(39, 39, 42, 0.95);
  }

  .mini-mobile-drawer-head h2 {
    margin: 0;
    color: #fff;
    font-size: 22px !important;
    line-height: 1.05 !important;
    font-weight: 900;
  }

  .mini-mobile-nav {
    display: grid !important;
    gap: 8px !important;
    overflow: visible !important;
  }

  .mini-mobile-nav button {
    width: 100% !important;
    min-width: 0 !important;
    display: block !important;
    padding: 13px 14px !important;
    border-radius: 16px !important;
    text-align: left !important;
    font-size: 14px !important;
  }

  .mini-app-main {
    width: 100% !important;
    max-width: 100vw !important;
    padding: 10px !important;
    overflow-x: hidden !important;
  }

  .mini-app-main > section:first-child {
    padding: 14px !important;
    margin-bottom: 10px !important;
    border-radius: 20px !important;
  }

  .mini-app-main > section:first-child h2 {
    font-size: 22px !important;
    line-height: 1.08 !important;
    margin-bottom: 6px !important;
  }

  .mini-app-main > section:first-child p {
    font-size: 11px !important;
  }

  .mini-app-main section {
    max-width: 100% !important;
  }

  .mini-app-main input,
  .mini-app-main select,
  .mini-app-main textarea {
    width: 100% !important;
    min-width: 0 !important;
    min-height: 42px !important;
    padding: 11px 12px !important;
    border-radius: 14px !important;
  }

  .mini-app-main textarea {
    min-height: 112px !important;
  }

  .mini-app-main button {
    min-height: 42px !important;
    border-radius: 14px !important;
  }

  .mobile-summary-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 9px !important;
    margin-bottom: 10px !important;
  }

  .mobile-summary-grid > div {
    padding: 12px !important;
    min-height: 82px !important;
    border-radius: 18px !important;
  }

  .mobile-summary-grid p {
    margin-bottom: 7px !important;
    font-size: 10px !important;
  }

  .mobile-summary-grid h3 {
    font-size: 18px !important;
    line-height: 1.1 !important;
  }

  .mobile-panel-card {
    padding: 12px !important;
    margin-bottom: 10px !important;
    border-radius: 20px !important;
  }

  .mobile-panel-card h2 {
    font-size: 21px !important;
  }

  .mobile-panel-card h3 {
    font-size: 18px !important;
  }

  .mobile-panel-card .grid {
    gap: 10px !important;
  }

  .mobile-panel-card .flex {
    gap: 10px !important;
  }

  table {
    min-width: 720px !important;
  }

  th,
  td {
    padding: 10px !important;
    font-size: 11px !important;
  }

  .sticky {
    position: relative !important;
    top: auto !important;
  }
}
'@
  Add-Content -Path $css -Value $phase5 -Encoding UTF8
}

Write-Host "Quinta fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
