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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase9-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase9-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Marca telas principais para permitir cards mobile por CSS, sem mudar regra de negocio.
$appCode = $appCode.Replace(
  '<h2 className="mini-section-title mini-vendas-title text-3xl font-bold">Vendas Recentes</h2>',
  '<h2 className="mini-section-title mini-vendas-title mini-mobile-card-section text-3xl font-bold">Vendas Recentes</h2>'
)

$appCode = $appCode.Replace(
  '<h2 className="mini-section-title mini-delivery-title text-3xl font-bold">Delivery</h2>',
  '<h2 className="mini-section-title mini-delivery-title mini-mobile-card-section text-3xl font-bold">Delivery</h2>'
)

$appCode = $appCode.Replace('mini-mobile-card-section mini-mobile-card-section', 'mini-mobile-card-section')

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 9 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase9 = @'

/* MINI ERP MOBILE PHASE 9 */
@media (max-width: 767px) {
  .mini-bottom-nav {
    left: 8px !important;
    right: 8px !important;
    bottom: 8px !important;
    padding: 7px !important;
    border-radius: 20px !important;
  }

  .mini-bottom-nav button {
    height: 43px !important;
    min-height: 43px !important;
    font-size: 9.5px !important;
  }

  .mini-app-main {
    padding: 7px !important;
    padding-bottom: 76px !important;
  }

  .mobile-summary-grid {
    top: 58px !important;
    gap: 7px !important;
  }

  .mobile-summary-grid > div {
    min-height: 62px !important;
    padding: 9px !important;
  }

  .mobile-summary-grid h3 {
    font-size: 15.5px !important;
  }

  .mobile-summary-grid p {
    font-size: 8.8px !important;
  }

  .mini-app-main section {
    margin-bottom: 9px !important;
  }

  .mobile-panel-card {
    padding: 9px !important;
    border-radius: 17px !important;
  }

  .mini-app-main .text-5xl,
  .mini-app-main .text-4xl,
  .mini-app-main .text-3xl {
    font-size: 19px !important;
    line-height: 1.12 !important;
  }

  .mini-app-main .text-2xl {
    font-size: 17px !important;
  }

  .mini-app-main .text-xl {
    font-size: 16px !important;
  }

  .mini-app-main p {
    line-height: 1.35 !important;
  }

  .mini-app-main input,
  .mini-app-main select {
    height: 39px !important;
    min-height: 39px !important;
    padding: 9px 10px !important;
    border-radius: 12px !important;
  }

  .mini-app-main textarea {
    min-height: 96px !important;
    height: 96px !important;
    padding: 10px !important;
    border-radius: 12px !important;
  }

  .mini-app-main button {
    min-height: 39px !important;
    border-radius: 12px !important;
  }

  .mini-table-wrap {
    max-height: 430px !important;
    border-radius: 15px !important;
  }

  .mini-table-wrap::before {
    padding: 7px 10px 0 !important;
    font-size: 9px !important;
  }

  .mini-table-wrap::after {
    content: "Deslize lateralmente";
    padding: 6px 10px !important;
    font-size: 9px !important;
  }

  .mini-data-table {
    width: 560px !important;
    min-width: 560px !important;
  }

  .mini-data-table th,
  .mini-data-table td {
    padding: 6px !important;
    font-size: 9px !important;
  }

  .mini-data-table th:nth-child(n+6),
  .mini-data-table td:nth-child(n+6) {
    display: none;
  }

  .mini-data-table button {
    min-height: 28px !important;
    padding: 5px 7px !important;
    font-size: 9px !important;
  }

  .mini-mobile-drawer {
    width: min(88vw, 320px) !important;
  }

  .mini-mobile-nav button {
    padding: 12px 13px !important;
  }

  .mini-app-main .bg-zinc-950 {
    background-color: #060606 !important;
  }

  .mini-app-main .border-orange-950 {
    border-color: rgba(124, 45, 18, 0.72) !important;
  }

  .mini-app-main .border-zinc-900 {
    border-color: rgba(39, 39, 42, 0.82) !important;
  }

  .mini-app-main .shadow,
  .mini-app-main .shadow-lg,
  .mini-app-main .shadow-xl {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28) !important;
  }

  .mini-app-main .overflow-x-auto {
    scrollbar-width: thin;
  }
}
'@

  Add-Content -Path $css -Value $phase9 -Encoding UTF8
}

Write-Host "Nona fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
