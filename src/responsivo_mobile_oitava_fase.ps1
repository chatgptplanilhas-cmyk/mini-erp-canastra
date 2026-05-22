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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase8-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase8-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

if ($appCode -notmatch "mini-bottom-nav") {
  $bottomNav = @'
        <div className="mini-bottom-nav lg:hidden">
          {botaoMenu('painel', '📊', 'Painel')}
          {botaoMenu('vendas', '🧾', 'Vendas')}
          {botaoMenu('delivery', '🚚', 'Delivery')}
          {botaoMenu('pendencias', '💰', 'Pendências')}
        </div>
'@

  $appCode = $appCode.Replace(
    "        <main className=""mini-app-main",
    $bottomNav + "`r`n        <main className=""mini-app-main"
  )
}

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 8 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase8 = @'

/* MINI ERP MOBILE PHASE 8 */
@media (max-width: 767px) {
  .mini-app-main {
    padding-bottom: 82px !important;
  }

  .mini-bottom-nav {
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 90;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    padding: 8px;
    border: 1px solid rgba(124, 45, 18, 0.9);
    border-radius: 22px;
    background: rgba(0, 0, 0, 0.96);
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.62);
    backdrop-filter: blur(14px);
  }

  .mini-bottom-nav button {
    width: 100% !important;
    min-width: 0 !important;
    height: 46px !important;
    min-height: 46px !important;
    padding: 6px 4px !important;
    border-radius: 15px !important;
    font-size: 10px !important;
    line-height: 1.05 !important;
    text-align: center !important;
    white-space: normal !important;
  }

  .mini-bottom-nav button span,
  .mini-bottom-nav button p {
    font-size: 10px !important;
  }

  .mini-mobile-topbar {
    padding-bottom: 9px !important;
  }

  .mini-app-main > section:first-child {
    display: none !important;
  }

  .mobile-summary-grid {
    position: sticky;
    top: 64px;
    z-index: 30;
    padding: 8px 0 8px !important;
    background: #15110f;
  }

  .mobile-summary-grid > div {
    min-height: 66px !important;
  }

  .mobile-summary-grid h3 {
    font-size: 16px !important;
  }

  .mobile-summary-grid p {
    font-size: 9px !important;
  }

  .mini-panel-compact,
  .mobile-panel-card {
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  }

  .mini-app-main section:has(.mini-table-wrap) {
    padding: 10px !important;
  }

  .mini-table-wrap {
    max-height: 520px !important;
    overflow: auto !important;
  }

  .mini-table-wrap::before {
    content: "Arraste para o lado";
    color: #fb923c;
    font-weight: 700;
  }

  .mini-data-table {
    width: 620px !important;
    min-width: 620px !important;
  }

  .mini-data-table th,
  .mini-data-table td {
    padding: 7px !important;
    font-size: 9.5px !important;
  }

  .mini-data-table td:nth-child(n+7),
  .mini-data-table th:nth-child(n+7) {
    display: none;
  }

  .mini-app-main input,
  .mini-app-main select,
  .mini-app-main textarea {
    font-size: 13px !important;
  }

  .mini-app-main label,
  .mini-app-main .uppercase {
    font-size: 8.5px !important;
  }

  .mini-app-main .text-zinc-500 {
    font-size: 10.5px !important;
  }

  .mini-app-main .bg-black.border,
  .mini-app-main .bg-zinc-950.border {
    border-color: rgba(63, 63, 70, 0.72) !important;
  }

  .mini-app-main button.bg-orange-950,
  .mini-app-main button.bg-red-900,
  .mini-app-main button.bg-zinc-800 {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
  }
}
'@

  Add-Content -Path $css -Value $phase8 -Encoding UTF8
}

Write-Host "Oitava fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
