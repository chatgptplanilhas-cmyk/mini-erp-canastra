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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase3-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase3-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Ajustes seguros no App.jsx, sem mexer em regras de negocio
$appCode = $appCode.Replace('className="flex flex-col lg:grid lg:grid-cols-[280px_1fr]"', 'className="w-full max-w-full overflow-x-hidden flex flex-col lg:grid lg:grid-cols-[280px_1fr]"')
$appCode = $appCode.Replace('className="min-h-screen bg-[#15110f] text-white"', 'className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#15110f] text-white"')
$appCode = $appCode.Replace('className="p-4 lg:p-8 w-full max-w-full overflow-x-hidden"', 'className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-8"')
$appCode = $appCode.Replace('className="p-8"', 'className="p-3 sm:p-4 lg:p-8"')

# Ajusta cards principais que ainda possam estar com 4 colunas fixas
$appCode = $appCode.Replace('className="grid grid-cols-4 gap-4 mb-6"', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"')
$appCode = $appCode.Replace('className="grid grid-cols-3 gap-5 mb-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5"')
$appCode = $appCode.Replace('className="grid grid-cols-3 gap-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5"')
$appCode = $appCode.Replace('className="grid grid-cols-3 gap-5 mt-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5"')

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 3 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $mobileCss = @'

/* MINI ERP MOBILE PHASE 3 */
@media (max-width: 767px) {
  html,
  body,
  #root {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    background: #15110f;
  }

  body {
    margin: 0;
    min-width: 0;
  }

  #root > div {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  aside {
    display: none !important;
  }

  main {
    width: 100% !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    padding: 12px !important;
    overflow-x: hidden !important;
  }

  section {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    border-radius: 22px !important;
  }

  input,
  select,
  textarea,
  button {
    max-width: 100% !important;
    font-size: 14px !important;
  }

  h1 {
    font-size: 24px !important;
    line-height: 1.08 !important;
  }

  h2 {
    font-size: 22px !important;
    line-height: 1.15 !important;
  }

  h3 {
    font-size: 20px !important;
    line-height: 1.15 !important;
  }

  .overflow-x-auto,
  .overflow-hidden {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  table {
    width: 820px !important;
    min-width: 820px !important;
    table-layout: auto !important;
  }

  th,
  td {
    white-space: nowrap;
    padding: 12px !important;
    font-size: 12px !important;
  }

  nav.flex {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  nav.flex button {
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: max-content !important;
    padding: 10px 12px !important;
    border-radius: 14px !important;
    font-size: 13px !important;
  }

  .rounded-\[28px\] {
    border-radius: 22px !important;
  }

  .p-8 {
    padding: 16px !important;
  }

  .p-6 {
    padding: 14px !important;
  }

  .p-5 {
    padding: 12px !important;
  }

  .mb-6 {
    margin-bottom: 16px !important;
  }

  .gap-5 {
    gap: 14px !important;
  }

  .gap-4 {
    gap: 12px !important;
  }

  [class*="w-[420px]"],
  [class*="min-w-[520px]"] {
    width: 100% !important;
    min-width: 0 !important;
  }
}
'@
  Add-Content -Path $css -Value $mobileCss -Encoding UTF8
}

Write-Host "Terceira fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
