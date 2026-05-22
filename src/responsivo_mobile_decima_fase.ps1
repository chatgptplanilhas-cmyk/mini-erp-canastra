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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase10-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase10-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Classe auxiliar para permitir visual de cards nas tabelas no celular.
$appCode = $appCode.Replace('className="mini-data-table', 'className="mini-data-table mini-mobile-card-table')
$appCode = $appCode.Replace('mini-mobile-card-table mini-mobile-card-table', 'mini-mobile-card-table')

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 10 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase10 = @'

/* MINI ERP MOBILE PHASE 10 */
@media (max-width: 767px) {
  .mini-table-wrap {
    max-height: none !important;
    overflow: visible !important;
    border: 0 !important;
    background: transparent !important;
  }

  .mini-table-wrap::before,
  .mini-table-wrap::after {
    display: none !important;
  }

  .mini-mobile-card-table {
    width: 100% !important;
    min-width: 0 !important;
    display: block !important;
    border-collapse: separate !important;
  }

  .mini-mobile-card-table thead {
    display: none !important;
  }

  .mini-mobile-card-table tbody {
    display: grid !important;
    gap: 10px !important;
    width: 100% !important;
  }

  .mini-mobile-card-table tr {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 7px 10px !important;
    width: 100% !important;
    padding: 12px !important;
    border: 1px solid rgba(39, 39, 42, 0.9) !important;
    border-radius: 18px !important;
    background: linear-gradient(180deg, #090909 0%, #030303 100%) !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22) !important;
  }

  .mini-mobile-card-table td {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 3px !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    white-space: normal !important;
    font-size: 12px !important;
    line-height: 1.25 !important;
  }

  .mini-mobile-card-table td::before {
    display: block;
    color: #71717a;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mini-mobile-card-table td:nth-child(1)::before { content: "Registro"; }
  .mini-mobile-card-table td:nth-child(2)::before { content: "Data"; }
  .mini-mobile-card-table td:nth-child(3)::before { content: "Cliente"; }
  .mini-mobile-card-table td:nth-child(4)::before { content: "Referência"; }
  .mini-mobile-card-table td:nth-child(5)::before { content: "Valor"; }
  .mini-mobile-card-table td:nth-child(6)::before { content: "Taxa"; }
  .mini-mobile-card-table td:nth-child(7)::before { content: "Líquido"; }
  .mini-mobile-card-table td:nth-child(8)::before { content: "Pagamento"; }
  .mini-mobile-card-table td:nth-child(9)::before { content: "Status"; }
  .mini-mobile-card-table td:nth-child(10)::before { content: "Ações"; }

  .mini-mobile-card-table td:nth-child(1),
  .mini-mobile-card-table td:nth-child(3) {
    font-weight: 800 !important;
    color: #ffffff !important;
  }

  .mini-mobile-card-table td:nth-child(3),
  .mini-mobile-card-table td:nth-child(4),
  .mini-mobile-card-table td:nth-child(8),
  .mini-mobile-card-table td:nth-child(10) {
    grid-column: 1 / -1 !important;
  }

  .mini-mobile-card-table td:nth-child(n+11) {
    display: none !important;
  }

  .mini-mobile-card-table td:first-child {
    position: static !important;
    left: auto !important;
    z-index: auto !important;
    background: transparent !important;
  }

  .mini-mobile-card-table button {
    min-height: 34px !important;
    padding: 7px 10px !important;
    font-size: 11px !important;
    border-radius: 11px !important;
  }

  .mini-mobile-card-table td:nth-child(10) > div,
  .mini-mobile-card-table td:nth-child(10) {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 7px !important;
  }

  .mini-mobile-card-table td:nth-child(10)::before {
    width: 100% !important;
  }

  .mini-app-main .mini-mobile-card-section {
    margin-bottom: 5px !important;
  }

  .mini-app-main section:has(.mini-mobile-card-table) {
    padding: 10px !important;
    border-radius: 20px !important;
  }

  .mini-app-main section:has(.mini-mobile-card-table) input {
    height: 38px !important;
    margin-bottom: 8px !important;
  }
}
'@

  Add-Content -Path $css -Value $phase10 -Encoding UTF8
}

Write-Host "Decima fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
