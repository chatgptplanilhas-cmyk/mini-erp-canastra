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

$backupApp = Join-Path $src ("App-backup-antes-menu-mobile-final-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-menu-mobile-final-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Limpeza ampla de caracteres quebrados.
$replaces = @{
  "PendÃªncias" = "Pendências"
  "PendÃªncia" = "Pendência"
  "pendÃªncias" = "pendências"
  "referÃªncia" = "referência"
  "ReferÃªncia" = "Referência"
  "descriÃ§Ã£o" = "descrição"
  "DescriÃ§Ã£o" = "Descrição"
  "AÃ§Ãµes" = "Ações"
  "aÃ§Ãµes" = "ações"
  "LÃ­quido" = "Líquido"
  "lÃ­quido" = "líquido"
  "cartÃµes" = "cartões"
  "CartÃµes" = "Cartões"
  "ãY”Š" = ""
  "ãY§¾" = ""
  "ãYšŠ" = ""
  "ðŸ“Š" = ""
  "ðŸ§¾" = ""
  "ðŸšš" = ""
  "ðŸ’°" = ""
}

foreach ($key in $replaces.Keys) {
  $appCode = $appCode.Replace($key, $replaces[$key])
}

# Remove qualquer menu inferior antigo e recria do zero sem icones.
$bottomNavPattern = '(?s)<div className="mini-bottom-nav lg:hidden">.*?</div>\s*(?=\s*<main className="mini-app-main)'
$appCode = [regex]::Replace($appCode, $bottomNavPattern, "", 1)

$bottomNavNovo = @'
        <div className="mini-bottom-nav lg:hidden">
          <button
            type="button"
            onClick={() => setPagina('painel')}
            className={pagina === 'painel' ? 'mini-bottom-active' : ''}
          >
            Painel
          </button>

          <button
            type="button"
            onClick={() => setPagina('vendas')}
            className={pagina === 'vendas' ? 'mini-bottom-active' : ''}
          >
            Vendas
          </button>

          <button
            type="button"
            onClick={() => setPagina('delivery')}
            className={pagina === 'delivery' ? 'mini-bottom-active' : ''}
          >
            Delivery
          </button>

          <button
            type="button"
            onClick={() => setPagina('pendencias')}
            className={pagina === 'pendencias' ? 'mini-bottom-active' : ''}
          >
            Pendências
          </button>
        </div>

'@

$appCode = $appCode.Replace(
  '<main className="mini-app-main',
  $bottomNavNovo + '        <main className="mini-app-main'
)

# Garante que o arquivo seja salvo em UTF-8.
Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE BOTTOM NAV CLEAN FINAL */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $finalCss = @'

/* MINI ERP MOBILE BOTTOM NAV CLEAN FINAL */
@media (max-width: 767px) {
  .mini-bottom-nav {
    position: fixed !important;
    left: 10px !important;
    right: 10px !important;
    bottom: 9px !important;
    z-index: 100 !important;
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 7px !important;
    padding: 7px !important;
    border-radius: 22px !important;
    background: rgba(0, 0, 0, 0.98) !important;
    border: 1px solid rgba(124, 45, 18, 0.85) !important;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.68) !important;
    backdrop-filter: blur(16px) !important;
  }

  .mini-bottom-nav button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 44px !important;
    min-height: 44px !important;
    padding: 0 3px !important;
    border: 0 !important;
    border-radius: 15px !important;
    background: transparent !important;
    color: #f4f4f5 !important;
    font-size: 10.5px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    text-align: center !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: clip !important;
  }

  .mini-bottom-nav button.mini-bottom-active {
    background: linear-gradient(180deg, #7c2d12 0%, #4a1608 100%) !important;
    color: #ffffff !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 22px rgba(0, 0, 0, 0.38) !important;
  }

  .mini-bottom-nav button:nth-child(4) {
    font-size: 9.8px !important;
    letter-spacing: -0.04em !important;
  }

  .mini-app-main {
    padding-bottom: 80px !important;
  }
}
'@

  Add-Content -Path $css -Value $finalCss -Encoding UTF8
}

Write-Host "Menu inferior mobile recriado com sucesso." -ForegroundColor Green
Write-Host "Itens finais: Painel, Vendas, Delivery e Pendências." -ForegroundColor Green
Write-Host "Acentuacao corrigida e arquivo salvo em UTF-8." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
