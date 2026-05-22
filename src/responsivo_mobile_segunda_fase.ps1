$ErrorActionPreference = "Stop"
$path = "App.jsx"

if (!(Test-Path $path)) {
  Write-Host "Erro: App.jsx nao encontrado nesta pasta." -ForegroundColor Red
  exit 1
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = "App-backup-antes-responsivo-fase2-$timestamp.jsx"
Copy-Item $path $backup -Force

$code = Get-Content $path -Raw -Encoding UTF8

# Corrige a estrutura principal para mobile, sem remover a experiencia desktop.
$code = $code -replace '<div className="grid grid-cols-\[280px_1fr\]">', '<div className="lg:grid lg:grid-cols-[280px_1fr]">'

# Insere um menu mobile simples no topo, antes da sidebar desktop.
$mobileMenu = @'
        <div className="lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950 p-4">
          <div className="mb-3">
            <p className="text-orange-400 uppercase tracking-[6px] text-[10px] mb-1">Sistema</p>
            <h1 className="text-xl font-bold leading-tight">Queijos Serra da Canastra</h1>
            <p className="text-zinc-500 text-xs mt-1">Mini ERP Premium</p>
          </div>

          <select
            value={pagina}
            onChange={(e) => setPagina(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white"
          >
            <option value="painel">Painel</option>
            <option value="clientes">Clientes</option>
            <option value="vendas">Vendas</option>
            <option value="pendencias">Pendencias</option>
            <option value="pagamentos">Pagamentos</option>
            <option value="delivery">Delivery</option>
            <option value="produtos">Produtos</option>
            <option value="produtos-controle">Produtos & Controle</option>
            <option value="fornecedores">Fornecedores</option>
            <option value="despesas">Despesas</option>
            <option value="taxas">Taxas</option>
          </select>
        </div>

'@

if ($code -notmatch 'lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950') {
  $code = $code -replace '(\s*)<aside className="', "$mobileMenu`$1<aside className=\""
}

# Esconde a sidebar fixa no celular e conserva no desktop.
$code = $code -replace '<aside className="min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">', '<aside className="hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">'
$code = $code -replace '<aside className="min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6 ', '<aside className="hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6 '

# Main fluido no celular.
$code = $code -replace '<main className="p-8">', '<main className="w-full min-w-0 p-3 sm:p-5 lg:p-8">'

# Header principal responsivo.
$code = $code -replace 'className="bg-black border border-orange-950 rounded-\[28px\] p-8 mb-6"', 'className="bg-black border border-orange-950 rounded-2xl lg:rounded-[28px] p-4 lg:p-8 mb-4 lg:mb-6"'
$code = $code -replace 'className="text-5xl font-bold mb-4"', 'className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 lg:mb-4"'

# Cards e grids principais responsivos.
$code = $code -replace 'className="grid grid-cols-4 gap-4 mb-6"', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"'
$code = $code -replace 'className="grid grid-cols-3 gap-5 mb-5"', 'className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5"'
$code = $code -replace 'className="grid grid-cols-3 gap-5"', 'className="grid grid-cols-1 lg:grid-cols-3 gap-5"'
$code = $code -replace 'className="grid grid-cols-3 gap-5 mt-5"', 'className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5"'
$code = $code -replace 'className="grid grid-cols-4 gap-4', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'
$code = $code -replace 'className="grid grid-cols-3 gap-4', 'className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
$code = $code -replace 'className="grid grid-cols-2 gap-4', 'className="grid grid-cols-1 lg:grid-cols-2 gap-4'

# Formularios desktop com 12 colunas passam a empilhar no mobile.
$code = $code -replace 'className="grid grid-cols-12 gap-3', 'className="grid grid-cols-1 xl:grid-cols-12 gap-3'
$code = $code -replace 'className="grid grid-cols-12 gap-4', 'className="grid grid-cols-1 xl:grid-cols-12 gap-4'

# Reduz paddings e arredondamentos gerais em telas pequenas.
$code = $code -replace 'rounded-\[28px\] p-8', 'rounded-2xl lg:rounded-[28px] p-4 lg:p-8'
$code = $code -replace 'rounded-\[28px\] p-6', 'rounded-2xl lg:rounded-[28px] p-4 lg:p-6'

# Tabelas deixam de esmagar colunas no celular.
$code = $code -replace 'className="overflow-hidden rounded-2xl border border-zinc-900"', 'className="overflow-x-auto rounded-2xl border border-zinc-900"'
$code = $code -replace '<table className="w-full">', '<table className="min-w-[900px] w-full">'

# Inputs de busca com largura fixa passam a ser responsivos.
$code = $code -replace 'className="w-\[420px\] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"', 'className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"'
$code = $code -replace 'className="w-\[350px\] bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"', 'className="w-full lg:w-[350px] bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3"'

# Cabecalhos com flex horizontal passam a quebrar melhor no celular.
$code = $code -replace 'className="flex items-center justify-between gap-4 mb-6"', 'className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"'
$code = $code -replace 'className="flex items-center justify-between gap-4 mb-4"', 'className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4"'

# Evita estouro visual no painel de vendas fixo.
$code = $code -replace 'className="grid grid-cols-3 gap-3 min-w-\[520px\]"', 'className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:min-w-[520px]"'
$code = $code -replace 'top-\[158px\]', 'top-0 lg:top-[158px]'
$code = $code -replace 'top-\[244px\]', 'top-0 lg:top-[244px]'

Set-Content $path $code -Encoding UTF8

Write-Host "Responsivo mobile fase 2 aplicado com sucesso." -ForegroundColor Green
Write-Host "Backup criado: $backup" -ForegroundColor Yellow
