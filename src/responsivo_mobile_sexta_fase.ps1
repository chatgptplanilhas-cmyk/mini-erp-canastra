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

$backupApp = Join-Path $src ("App-backup-antes-mobile-fase6-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-mobile-fase6-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Marca tabelas e listas para tratamento mobile via CSS, sem alterar regra de negocio.
$appCode = $appCode.Replace(
  'className="overflow-x-auto rounded-2xl border border-zinc-900"',
  'className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900"'
)

$appCode = $appCode.Replace(
  'className="overflow-hidden rounded-2xl border border-zinc-900"',
  'className="mini-table-wrap overflow-x-auto rounded-2xl border border-zinc-900"'
)

$appCode = $appCode.Replace(
  '<table className="w-full min-w-[900px]">',
  '<table className="mini-data-table w-full min-w-[900px]">'
)

$appCode = $appCode.Replace(
  '<table className="w-full">',
  '<table className="mini-data-table w-full">'
)

# Marca tela de Vendas Recentes e busca para visual mobile mais limpo.
$appCode = $appCode.Replace(
  '<h2 className="text-3xl font-bold">Vendas Recentes</h2>',
  '<h2 className="mini-section-title text-3xl font-bold">Vendas Recentes</h2>'
)

$appCode = $appCode.Replace(
  '<h2 className="text-3xl font-bold">Delivery</h2>',
  '<h2 className="mini-section-title text-3xl font-bold">Delivery</h2>'
)

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 6 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase6 = @'

/* MINI ERP MOBILE PHASE 6 */
@media (max-width: 767px) {
  .mini-section-title {
    font-size: 20px !important;
    line-height: 1.1 !important;
  }

  .mini-table-wrap {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    border-radius: 18px !important;
    -webkit-overflow-scrolling: touch;
    background: #030303;
  }

  .mini-table-wrap::after {
    content: "Arraste para ver mais";
    display: block;
    padding: 8px 12px 10px;
    color: #71717a;
    font-size: 10px;
    text-align: center;
    border-top: 1px solid rgba(39, 39, 42, 0.75);
  }

  .mini-data-table {
    width: 760px !important;
    min-width: 760px !important;
    border-collapse: collapse !important;
  }

  .mini-data-table thead {
    background: #09090b !important;
  }

  .mini-data-table th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #09090b !important;
    color: #94a3b8 !important;
    font-size: 10px !important;
    letter-spacing: 0.02em !important;
  }

  .mini-data-table td {
    font-size: 11px !important;
    vertical-align: middle !important;
  }

  .mini-data-table button {
    min-height: 34px !important;
    padding: 8px 10px !important;
    font-size: 11px !important;
    border-radius: 10px !important;
  }

  .mini-app-main form {
    gap: 9px !important;
  }

  .mini-app-main label {
    font-size: 9px !important;
    letter-spacing: 0.02em !important;
  }

  .mini-app-main input,
  .mini-app-main select {
    height: 42px !important;
  }

  .mini-app-main textarea {
    height: 110px !important;
  }

  .mini-app-main .bg-zinc-950,
  .mini-app-main .bg-black {
    background-color: #050505 !important;
  }

  .mini-app-main .border-zinc-900,
  .mini-app-main .border-zinc-800 {
    border-color: rgba(63, 63, 70, 0.75) !important;
  }

  .mini-app-main .text-3xl {
    font-size: 20px !important;
  }

  .mini-app-main .text-2xl {
    font-size: 19px !important;
  }

  .mini-app-main .text-xl {
    font-size: 18px !important;
  }

  .mini-app-main .text-lg {
    font-size: 16px !important;
  }

  .mini-app-main .rounded-2xl {
    border-radius: 14px !important;
  }

  .mini-app-main .rounded-xl {
    border-radius: 11px !important;
  }

  .mini-app-main .px-4 {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .mini-app-main .py-3 {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  .mini-app-main .p-4 {
    padding: 12px !important;
  }

  .mini-app-main .p-5 {
    padding: 12px !important;
  }

  .mini-app-main .p-6 {
    padding: 13px !important;
  }

  .mini-app-main .p-8 {
    padding: 14px !important;
  }

  .mini-app-main .mb-8 {
    margin-bottom: 14px !important;
  }

  .mini-app-main .mb-6 {
    margin-bottom: 12px !important;
  }

  .mini-app-main .mb-5 {
    margin-bottom: 10px !important;
  }

  .mini-app-main .mb-4 {
    margin-bottom: 9px !important;
  }

  .mini-app-main .mt-5 {
    margin-top: 10px !important;
  }

  .mini-app-main .mt-2 {
    margin-top: 5px !important;
  }

  .mini-app-main .gap-5 {
    gap: 10px !important;
  }

  .mini-app-main .gap-4 {
    gap: 9px !important;
  }

  .mini-app-main .gap-3 {
    gap: 8px !important;
  }

  .mini-app-main .gap-2 {
    gap: 7px !important;
  }
}
'@
  Add-Content -Path $css -Value $phase6 -Encoding UTF8
}

Write-Host "Sexta fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
