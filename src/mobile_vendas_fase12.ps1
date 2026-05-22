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

$backupApp = Join-Path $src ("App-backup-antes-vendas-mobile-fase12-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-vendas-mobile-fase12-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Corrige o menu inferior para ficar sem icones e com Pendencias.
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

# Marca tabela como cards no mobile, se ainda nao estiver marcada.
$appCode = $appCode.Replace('className="mini-data-table', 'className="mini-data-table mini-mobile-card-table')
$appCode = $appCode.Replace('mini-mobile-card-table mini-mobile-card-table', 'mini-mobile-card-table')

# Garante que busca de vendas fique destacada no mobile.
$appCode = $appCode.Replace(
  'placeholder="Buscar venda, cliente, referência ou status"',
  'placeholder="Buscar cliente, venda, referência ou status"'
)

Set-Content -Path $app -Value $appCode -Encoding UTF8

$marker = "/* MINI ERP MOBILE PHASE 12 VENDAS */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase12 = @'

/* MINI ERP MOBILE PHASE 12 VENDAS */
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
  }

  /* Nova venda: evita os cards de taxa embolados */
  .mini-app-main form + div,
  .mini-app-main form {
    max-width: 100% !important;
  }

  .mini-app-main form [class*="col-span"] {
    grid-column: auto !important;
  }

  .mini-app-main form .grid,
  .mini-app-main form {
    grid-template-columns: 1fr !important;
  }

  .mini-app-main form .bg-zinc-950,
  .mini-app-main form .border-zinc-800,
  .mini-app-main form .border-zinc-900 {
    min-width: 0 !important;
    overflow: hidden !important;
  }

  .mini-app-main form p,
  .mini-app-main form span,
  .mini-app-main form strong,
  .mini-app-main form div {
    overflow-wrap: anywhere !important;
  }

  /* Busca de vendas destacada no mobile */
  .mini-vendas-title {
    margin-bottom: 8px !important;
  }

  .mini-vendas-title + p {
    margin-bottom: 10px !important;
  }

  .mini-app-main input[placeholder*="Buscar cliente"],
  .mini-app-main input[placeholder*="Buscar venda"] {
    display: block !important;
    width: 100% !important;
    height: 42px !important;
    margin: 8px 0 10px !important;
    padding: 10px 12px !important;
    border-radius: 15px !important;
    background: #060606 !important;
    border: 1px solid rgba(63, 63, 70, 0.9) !important;
    color: #ffffff !important;
    font-size: 13px !important;
  }

  /* Vendas Recentes como cards reais no celular */
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
    gap: 8px 10px !important;
    width: 100% !important;
    padding: 12px !important;
    border: 1px solid rgba(39, 39, 42, 0.95) !important;
    border-radius: 18px !important;
    background: linear-gradient(180deg, #090909 0%, #030303 100%) !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.24) !important;
  }

  .mini-mobile-card-table td {
    display: grid !important;
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
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mini-mobile-card-table td:nth-child(1)::before { content: "Venda"; }
  .mini-mobile-card-table td:nth-child(2)::before { content: "Data"; }
  .mini-mobile-card-table td:nth-child(3)::before { content: "Cliente"; }
  .mini-mobile-card-table td:nth-child(4)::before { content: "Referência"; }
  .mini-mobile-card-table td:nth-child(5)::before { content: "Valor"; }
  .mini-mobile-card-table td:nth-child(6)::before { content: "Taxa"; }
  .mini-mobile-card-table td:nth-child(7)::before { content: "Líquido"; }
  .mini-mobile-card-table td:nth-child(8)::before { content: "Pagamento"; }
  .mini-mobile-card-table td:nth-child(9)::before { content: "Status"; }
  .mini-mobile-card-table td:nth-child(10)::before { content: "Ações"; }

  .mini-mobile-card-table td:nth-child(3),
  .mini-mobile-card-table td:nth-child(8),
  .mini-mobile-card-table td:nth-child(10) {
    grid-column: 1 / -1 !important;
  }

  .mini-mobile-card-table td:nth-child(3) {
    font-size: 14px !important;
    font-weight: 900 !important;
    color: #ffffff !important;
  }

  .mini-mobile-card-table td:nth-child(5),
  .mini-mobile-card-table td:nth-child(7) {
    font-weight: 900 !important;
    color: #4ade80 !important;
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

  .mini-mobile-card-table td:nth-child(10) {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
  }

  .mini-mobile-card-table td:nth-child(10)::before {
    width: 100% !important;
  }

  .mini-mobile-card-table button {
    min-height: 34px !important;
    padding: 7px 10px !important;
    font-size: 11px !important;
    border-radius: 11px !important;
  }
}
'@
  Add-Content -Path $css -Value $phase12 -Encoding UTF8
}

Write-Host "Fase 12 aplicada com sucesso." -ForegroundColor Green
Write-Host "Menu inferior corrigido: Painel, Vendas, Delivery e Pendencias." -ForegroundColor Green
Write-Host "Vendas mobile refinada: busca destacada, cards e taxa/liquido sem embolar." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
