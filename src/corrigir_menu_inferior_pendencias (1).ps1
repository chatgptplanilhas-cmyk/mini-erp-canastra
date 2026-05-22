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

$backupApp = Join-Path $src ("App-backup-antes-menu-inferior-pendencias-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-menu-inferior-pendencias-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

$bottomNavPattern = '(?s)<div className="mini-bottom-nav lg:hidden">.*?</div>\s*(?=\s*<main className="mini-app-main)'

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

if ([regex]::IsMatch($appCode, $bottomNavPattern)) {
  $appCode = [regex]::Replace($appCode, $bottomNavPattern, $bottomNavNovo, 1)
} else {
  $appCode = $appCode.Replace(
    '<main className="mini-app-main',
    $bottomNavNovo + '        <main className="mini-app-main'
  )
}

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE BOTTOM NAV FINAL */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase = @'

/* MINI ERP MOBILE BOTTOM NAV FINAL */
@media (max-width: 767px) {
  .mini-bottom-nav {
    left: 10px !important;
    right: 10px !important;
    bottom: 9px !important;
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 7px !important;
    padding: 7px !important;
    border-radius: 22px !important;
    background: rgba(0, 0, 0, 0.97) !important;
    border: 1px solid rgba(124, 45, 18, 0.85) !important;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.65) !important;
    backdrop-filter: blur(16px);
  }

  .mini-bottom-nav button {
    height: 44px !important;
    min-height: 44px !important;
    padding: 0 4px !important;
    border: 0 !important;
    border-radius: 15px !important;
    background: transparent !important;
    color: #e4e4e7 !important;
    font-size: 11px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    text-align: center !important;
    white-space: nowrap !important;
  }

  .mini-bottom-nav button.mini-bottom-active {
    background: linear-gradient(180deg, #7c2d12 0%, #4a1608 100%) !important;
    color: #ffffff !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 22px rgba(0, 0, 0, 0.35) !important;
  }

  .mini-app-main {
    padding-bottom: 78px !important;
  }
}
'@
  Add-Content -Path $css -Value $phase -Encoding UTF8
}

Write-Host "Menu inferior mobile corrigido com sucesso." -ForegroundColor Green
Write-Host "Itens: Painel, Vendas, Delivery e Pendencias." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
