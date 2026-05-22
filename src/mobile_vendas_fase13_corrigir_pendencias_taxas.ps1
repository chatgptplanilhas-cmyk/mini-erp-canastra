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

$backupApp = Join-Path $src ("App-backup-antes-vendas-mobile-fase13-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
$backupCss = Join-Path $src ("index-backup-antes-vendas-mobile-fase13-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".css")

Copy-Item $app $backupApp -Force
Copy-Item $css $backupCss -Force

$appCode = Get-Content $app -Raw -Encoding UTF8
$cssCode = Get-Content $css -Raw -Encoding UTF8

# Corrige acentuacao quebrada.
$appCode = $appCode.Replace("PendÃªncias", "Pendências")
$appCode = $appCode.Replace("PendÃªncia", "Pendência")
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

# Garante menu inferior correto, sem icones.
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

$marker = "/* MINI ERP MOBILE PHASE 13 VENDAS HEADER */"

if ($cssCode -notmatch [regex]::Escape($marker)) {
  $phase13 = @'

/* MINI ERP MOBILE PHASE 13 VENDAS HEADER */
@media (max-width: 767px) {
  /* Corrige o bloco dos indicadores da Nova Venda */
  .mini-app-main section:has(form) {
    overflow: hidden !important;
  }

  .mini-app-main section:has(form) > div,
  .mini-app-main section:has(form) .grid {
    max-width: 100% !important;
  }

  .mini-app-main section:has(form) [class*="grid-cols-3"],
  .mini-app-main section:has(form) [class*="grid-cols-12"] {
    grid-template-columns: 1fr !important;
  }

  /* Mini cards de Taxa, Valor da taxa e Líquido */
  .mini-app-main section:has(form) .bg-zinc-950.border,
  .mini-app-main section:has(form) .bg-black.border {
    min-width: 0 !important;
    max-width: 100% !important;
    overflow: hidden !important;
  }

  .mini-app-main section:has(form) .bg-zinc-950.border p,
  .mini-app-main section:has(form) .bg-black.border p {
    font-size: 9px !important;
    line-height: 1.1 !important;
    letter-spacing: 0.02em !important;
    white-space: normal !important;
  }

  .mini-app-main section:has(form) .bg-zinc-950.border h3,
  .mini-app-main section:has(form) .bg-black.border h3,
  .mini-app-main section:has(form) .text-2xl,
  .mini-app-main section:has(form) .text-3xl {
    font-size: 15px !important;
    line-height: 1.05 !important;
    white-space: nowrap !important;
  }

  /* Quando os 3 indicadores ficarem lado a lado, evita embolar */
  .mini-app-main section:has(form) .grid:has(.text-green-400),
  .mini-app-main section:has(form) .grid:has(.text-red-400),
  .mini-app-main section:has(form) .grid:has(.text-orange-400) {
    gap: 7px !important;
  }

  /* Força cards pequenos a respirarem melhor */
  .mini-app-main section:has(form) [class*="rounded"] {
    word-break: normal !important;
  }

  .mini-bottom-nav button {
    font-family: inherit !important;
    text-rendering: optimizeLegibility;
  }

  .mini-bottom-nav button:nth-child(4) {
    font-size: 10.5px !important;
    letter-spacing: -0.02em !important;
  }
}
'@

  Add-Content -Path $css -Value $phase13 -Encoding UTF8
}

Write-Host "Fase 13 aplicada com sucesso." -ForegroundColor Green
Write-Host "Acentuacao corrigida: Pendencias agora aparece como Pendências." -ForegroundColor Green
Write-Host "Mini-cards de taxa, valor da taxa e liquido refinados no mobile." -ForegroundColor Green
Write-Host "Backup App: $([System.IO.Path]::GetFileName($backupApp))" -ForegroundColor Yellow
Write-Host "Backup CSS: $([System.IO.Path]::GetFileName($backupCss))" -ForegroundColor Yellow
