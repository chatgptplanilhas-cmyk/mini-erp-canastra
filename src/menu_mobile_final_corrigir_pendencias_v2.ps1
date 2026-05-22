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

$backupApp = Join-Path $src ("App-backup-antes-menu-mobile-final-v2-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-menu-mobile-final-v2-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Limpeza de caracteres quebrados sem usar hashtable, evitando erro de chaves duplicadas.
$appCode = $appCode.Replace("PendÃªncias", "Pendências")
$appCode = $appCode.Replace("PendÃªncia", "Pendência")
$appCode = $appCode.Replace("pendÃªncias", "pendências")
$appCode = $appCode.Replace("referÃªncia", "referência")
$appCode = $appCode.Replace("ReferÃªncia", "Referência")
$appCode = $appCode.Replace("descriÃ§Ã£o", "descrição")
$appCode = $appCode.Replace("DescriÃ§Ã£o", "Descrição")
$appCode = $appCode.Replace("AÃ§Ãµes", "Ações")
$appCode = $appCode.Replace("aÃ§Ãµes", "ações")
$appCode = $appCode.Replace("LÃ­quido", "Líquido")
$appCode = $appCode.Replace("lÃ­quido", "líquido")
$appCode = $appCode.Replace("cartÃµes", "cartões")
$appCode = $appCode.Replace("CartÃµes", "Cartões")
$appCode = $appCode.Replace("ãY”Š", "")
$appCode = $appCode.Replace("ãY§¾", "")
$appCode = $appCode.Replace("ãYšŠ", "")
$appCode = $appCode.Replace("ðŸ“Š", "")
$appCode = $appCode.Replace("ðŸ§¾", "")
$appCode = $appCode.Replace("ðŸšš", "")
$appCode = $appCode.Replace("ðŸ’°", "")

# Remove qualquer menu inferior antigo e recria do zero sem ícones.
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

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE BOTTOM NAV CLEAN FINAL V2 */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $finalCss = @'

/* MINI ERP MOBILE BOTTOM NAV CLEAN FINAL V2 */
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
  }

  .mini-bottom-nav button.mini-bottom-active {
    background: linear-gradient(180deg, #7c2d12 0%, #4a1608 100%) !important;
    color: #ffffff !important;
  }

  .mini-bottom-nav button:nth-child(4) {
    font-size: 9.6px !important;
    letter-spacing: -0.04em !important;
  }

  .mini-app-main {
    padding-bottom: 80px !important;
  }
}
'@

  Add-Content -Path $css -Value $finalCss -Encoding UTF8
}

Write-Host "Menu inferior mobile corrigido com sucesso." -ForegroundColor Green
Write-Host "Itens finais: Painel, Vendas, Delivery e Pendências." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
