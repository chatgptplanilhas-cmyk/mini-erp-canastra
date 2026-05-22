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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase4-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase4-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

function Replace-Text {
  param(
    [string]$Old,
    [string]$New
  )

  if ($script:appCode.Contains($Old)) {
    $script:appCode = $script:appCode.Replace($Old, $New)
  }
}

# 1. Introduz controle simples de menu mobile, sem alterar regra de negocio
if ($appCode -notmatch "const \[menuMobileAberto, setMenuMobileAberto\]") {
  $appCode = $appCode.Replace(
    "const [pagina, setPagina] = useState('painel')",
    "const [pagina, setPagina] = useState('painel')`r`n  const [menuMobileAberto, setMenuMobileAberto] = useState(false)"
  )
}

# 2. Melhora o botao do menu para fechar drawer no mobile depois do clique
$appCode = $appCode.Replace(
"onClick={() => setPagina(id)}",
"onClick={() => { setPagina(id); setMenuMobileAberto(false) }}"
)

# 3. Remove nav mobile antigo horizontal, se existir, para evitar duplicidade visual
$oldMobileBlockPattern = '(?s)\s*<div className="lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950 p-3">.*?</div>\s*(?=<aside)'
$appCode = [regex]::Replace($appCode, $oldMobileBlockPattern, "`r`n", 1)

# 4. Insere header mobile e drawer antes do aside
$drawer = @'
        <div className="mobile-topbar lg:hidden">
          <div>
            <p className="mobile-kicker">Sistema</p>
            <h1>Queijos Serra da Canastra</h1>
            <span>Mini ERP Premium</span>
          </div>

          <button
            type="button"
            onClick={() => setMenuMobileAberto(true)}
            className="mobile-menu-button"
          >
            ☰
          </button>
        </div>

        {menuMobileAberto && (
          <div className="mobile-menu-layer lg:hidden">
            <div className="mobile-menu-backdrop" onClick={() => setMenuMobileAberto(false)} />

            <aside className="mobile-menu-drawer">
              <div className="mobile-menu-head">
                <div>
                  <p className="mobile-kicker">Sistema</p>
                  <h2>Queijos Serra da Canastra</h2>
                  <span>Mini ERP Premium</span>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuMobileAberto(false)}
                  className="mobile-menu-close"
                >
                  ×
                </button>
              </div>

              <nav className="mobile-menu-nav">
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

if ($appCode -notmatch "mobile-menu-drawer") {
  $appCode = $appCode.Replace(
    "        <aside className=""hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6"">",
    $drawer + "        <aside className=""hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6"">"
  )
}

# 5. Marca conteudo principal para regras CSS mobile
$appCode = $appCode.Replace(
'className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-8"',
'className="app-main w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-8"'
)

$appCode = $appCode.Replace(
'className="p-4 lg:p-8 w-full max-w-full overflow-x-hidden"',
'className="app-main p-4 lg:p-8 w-full max-w-full overflow-x-hidden"'
)

# 6. Adiciona classes de identificacao mobile nos grandes blocos conhecidos
$appCode = $appCode.Replace(
'<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">',
'<section className="mobile-summary-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">'
)

$appCode = $appCode.Replace(
'<section className="bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">',
'<section className="mobile-panel-card bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">'
)

$appCode = $appCode.Replace(
'<section className="bg-black border border-orange-950 rounded-[28px] p-8">',
'<section className="mobile-panel-card bg-black border border-orange-950 rounded-[28px] p-8">'
)

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 4 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase4 = @'

/* MINI ERP MOBILE PHASE 4 */
@media (max-width: 767px) {
  .mobile-topbar {
    position: sticky;
    top: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    background: rgba(0, 0, 0, 0.96);
    border-bottom: 1px solid rgba(124, 45, 18, 0.8);
    backdrop-filter: blur(14px);
  }

  .mobile-topbar h1 {
    margin: 0;
    font-size: 18px !important;
    line-height: 1.08 !important;
    font-weight: 800;
  }

  .mobile-topbar span,
  .mobile-menu-head span {
    display: block;
    margin-top: 4px;
    color: #71717a;
    font-size: 11px;
  }

  .mobile-kicker {
    margin: 0 0 4px;
    color: #fb923c;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 9px;
    font-weight: 700;
  }

  .mobile-menu-button,
  .mobile-menu-close {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(124, 45, 18, 0.95);
    border-radius: 14px;
    background: #111111;
    color: #ffffff;
    font-size: 22px !important;
    font-weight: 700;
  }

  .mobile-menu-layer {
    position: fixed;
    inset: 0;
    z-index: 100;
  }

  .mobile-menu-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.68);
    backdrop-filter: blur(4px);
  }

  .mobile-menu-drawer {
    position: absolute;
    top: 0;
    left: 0;
    display: block !important;
    width: min(84vw, 330px);
    height: 100dvh;
    padding: 18px 14px;
    overflow-y: auto;
    background: #000000;
    border-right: 1px solid rgba(124, 45, 18, 0.9);
    box-shadow: 24px 0 60px rgba(0, 0, 0, 0.55);
  }

  .mobile-menu-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(39, 39, 42, 0.95);
  }

  .mobile-menu-head h2 {
    margin: 0;
    font-size: 22px !important;
    line-height: 1.05 !important;
    font-weight: 800;
  }

  .mobile-menu-nav {
    display: grid;
    gap: 8px;
  }

  .mobile-menu-nav button {
    width: 100% !important;
    min-width: 0 !important;
    justify-content: flex-start;
    padding: 13px 14px !important;
    border-radius: 16px !important;
    font-size: 14px !important;
  }

  .app-main {
    padding: 12px !important;
  }

  .app-main > section:first-child {
    padding: 16px !important;
    margin-bottom: 12px !important;
  }

  .app-main > section:first-child h2 {
    font-size: 24px !important;
    line-height: 1.1 !important;
  }

  .app-main > section:first-child p {
    font-size: 12px !important;
  }

  .mobile-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  .mobile-summary-grid > div {
    padding: 13px !important;
    min-height: 92px;
  }

  .mobile-summary-grid p {
    font-size: 11px !important;
    line-height: 1.2;
  }

  .mobile-summary-grid h3 {
    font-size: 20px !important;
    line-height: 1.1 !important;
    word-break: break-word;
  }

  .mobile-panel-card {
    padding: 14px !important;
    margin-bottom: 12px !important;
    border-radius: 22px !important;
  }

  .mobile-panel-card > .flex,
  .mobile-panel-card .flex.items-center.justify-between {
    flex-direction: column !important;
    align-items: stretch !important;
  }

  .mobile-panel-card input,
  .mobile-panel-card select,
  .mobile-panel-card textarea {
    width: 100% !important;
    min-width: 0 !important;
  }

  form {
    grid-template-columns: 1fr !important;
  }

  form > * {
    grid-column: auto !important;
  }

  table {
    min-width: 760px !important;
  }

  .mobile-card-list {
    display: grid;
    gap: 10px;
  }
}
'@
  Add-Content -Path $css -Value $phase4 -Encoding UTF8
}

Write-Host "Quarta fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
