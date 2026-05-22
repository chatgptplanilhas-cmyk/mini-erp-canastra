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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase7-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase7-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Marcação leve para melhorar Delivery, Vendas e tabelas no mobile, sem alterar regra de negócio.
$appCode = $appCode.Replace(
  '<h2 className="mini-section-title text-3xl font-bold">Delivery</h2>',
  '<h2 className="mini-section-title mini-delivery-title text-3xl font-bold">Delivery</h2>'
)

$appCode = $appCode.Replace(
  '<h2 className="mini-section-title text-3xl font-bold">Vendas Recentes</h2>',
  '<h2 className="mini-section-title mini-vendas-title text-3xl font-bold">Vendas Recentes</h2>'
)

# Evita duplicar classes se já tiver rodado.
$appCode = $appCode.Replace('mini-delivery-title mini-delivery-title', 'mini-delivery-title')
$appCode = $appCode.Replace('mini-vendas-title mini-vendas-title', 'mini-vendas-title')

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 7 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase7 = @'

/* MINI ERP MOBILE PHASE 7 */
@media (max-width: 767px) {
  .mini-mobile-topbar {
    padding: 10px 12px !important;
  }

  .mini-mobile-brand h1 {
    font-size: 16px !important;
    max-width: 245px;
  }

  .mini-mobile-menu-button {
    width: 39px !important;
    height: 39px !important;
    border-radius: 13px !important;
  }

  .mini-app-main {
    padding: 8px !important;
  }

  .mini-app-main > section:first-child {
    padding: 12px !important;
    border-radius: 18px !important;
  }

  .mini-app-main > section:first-child h2 {
    font-size: 20px !important;
  }

  .mobile-summary-grid {
    gap: 8px !important;
  }

  .mobile-summary-grid > div {
    min-height: 74px !important;
    padding: 10px !important;
  }

  .mobile-summary-grid h3 {
    font-size: 17px !important;
  }

  .mobile-summary-grid p {
    font-size: 9.5px !important;
  }

  .mobile-panel-card {
    padding: 10px !important;
    border-radius: 18px !important;
  }

  .mini-delivery-title::after,
  .mini-vendas-title::after {
    content: "";
    display: block;
    width: 46px;
    height: 3px;
    margin-top: 7px;
    border-radius: 999px;
    background: linear-gradient(90deg, #7c2d12, #fb923c);
  }

  .mini-app-main form {
    padding: 0 !important;
  }

  .mini-app-main form input,
  .mini-app-main form select,
  .mini-app-main form textarea {
    background: #070707 !important;
    border-color: rgba(63, 63, 70, 0.82) !important;
  }

  .mini-app-main form input:focus,
  .mini-app-main form select:focus,
  .mini-app-main form textarea:focus {
    outline: none !important;
    border-color: rgba(251, 146, 60, 0.75) !important;
    box-shadow: 0 0 0 1px rgba(251, 146, 60, 0.18) !important;
  }

  .mini-app-main button {
    font-weight: 700 !important;
  }

  .mini-table-wrap {
    margin-top: 8px !important;
    border-radius: 16px !important;
  }

  .mini-table-wrap::before {
    content: "Tabela com rolagem lateral";
    display: block;
    padding: 8px 12px 0;
    color: #a1a1aa;
    font-size: 10px;
    text-align: left;
  }

  .mini-table-wrap::after {
    padding: 7px 12px !important;
    font-size: 9.5px !important;
  }

  .mini-data-table {
    width: 680px !important;
    min-width: 680px !important;
  }

  .mini-data-table th,
  .mini-data-table td {
    padding: 8px !important;
    font-size: 10px !important;
  }

  .mini-data-table th:first-child,
  .mini-data-table td:first-child {
    position: sticky;
    left: 0;
    z-index: 3;
    background: #050505 !important;
  }

  .mini-data-table th:first-child {
    background: #09090b !important;
  }

  .mini-data-table button {
    min-height: 30px !important;
    padding: 6px 8px !important;
    font-size: 10px !important;
  }

  .mini-app-main .bg-green-950,
  .mini-app-main .bg-orange-950,
  .mini-app-main .bg-red-950,
  .mini-app-main .bg-zinc-800 {
    border: 1px solid rgba(63, 63, 70, 0.55) !important;
  }

  .mini-app-main .text-green-400 {
    text-shadow: 0 0 18px rgba(74, 222, 128, 0.12);
  }

  .mini-app-main .text-orange-400 {
    text-shadow: 0 0 18px rgba(251, 146, 60, 0.12);
  }

  .mini-app-main .text-red-400 {
    text-shadow: 0 0 18px rgba(248, 113, 113, 0.12);
  }

  .mini-app-main .grid {
    max-width: 100%;
  }

  .mini-app-main .flex {
    max-width: 100%;
  }
}
'@
  Add-Content -Path $css -Value $phase7 -Encoding UTF8
}

Write-Host "Setima fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
