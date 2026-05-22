$ErrorActionPreference = "Stop"

$arquivo = "App.jsx"

if (!(Test-Path $arquivo)) {
  Write-Host "Erro: App.jsx nao encontrado. Rode este script dentro da pasta src." -ForegroundColor Red
  exit 1
}

$backup = "App-backup-antes-mobile-$(Get-Date -Format 'yyyyMMdd-HHmmss').jsx"
Copy-Item $arquivo $backup -Force

$conteudo = Get-Content $arquivo -Raw

# Layout principal, desktop e mobile
$conteudo = $conteudo.Replace('className="grid grid-cols-[280px_1fr]"', 'className="flex flex-col lg:grid lg:grid-cols-[280px_1fr]"')
$conteudo = $conteudo.Replace('className="min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6"', 'className="bg-black border-b lg:border-b-0 lg:border-r border-orange-950 p-4 lg:p-6 lg:min-h-screen lg:max-h-screen lg:overflow-y-auto"')
$conteudo = $conteudo.Replace('className="p-8"', 'className="p-4 lg:p-8"')

# Cabeçalho principal
$conteudo = $conteudo.Replace('className="bg-black border border-orange-950 rounded-[28px] p-8 mb-6"', 'className="bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6"')
$conteudo = $conteudo.Replace('className="text-5xl font-bold mb-4"', 'className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight"')

# Menu lateral no mobile
$conteudo = $conteudo.Replace('className="space-y-3"', 'className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-3"')
$conteudo = $conteudo.Replace('className={`w-full rounded-2xl p-4 text-left transition ${', 'className={`shrink-0 rounded-2xl px-4 py-3 text-left transition lg:w-full lg:p-4 ${')

# Grids de cards e relatórios
$conteudo = $conteudo.Replace('className="grid grid-cols-4 gap-4 mb-6"', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"')
$conteudo = $conteudo.Replace('className="grid grid-cols-4 gap-4 mb-8"', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"')
$conteudo = $conteudo.Replace('className="grid grid-cols-3 gap-5 mb-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5"')
$conteudo = $conteudo.Replace('className="grid grid-cols-3 gap-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5"')
$conteudo = $conteudo.Replace('className="grid grid-cols-3 gap-5 mt-5"', 'className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5"')

# Formulários principais, evita estouro no celular
$conteudo = $conteudo.Replace('className="grid grid-cols-4 gap-4 mb-8"', 'className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"')
$conteudo = $conteudo.Replace('className="grid grid-cols-12 gap-3 items-end"', 'className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-end"')

# Colunas fixas do formulario de vendas, no mobile ocupam largura total
$conteudo = $conteudo.Replace('className="col-span-3"', 'className="col-span-1 xl:col-span-3"')
$conteudo = $conteudo.Replace('className="col-span-2"', 'className="col-span-1 xl:col-span-2"')
$conteudo = $conteudo.Replace('className="col-span-1"', 'className="col-span-1"')

# Caixas de busca com largura fixa, no mobile ocupam 100%
$conteudo = $conteudo.Replace('className="w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"', 'className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"')
$conteudo = $conteudo.Replace('className="w-[440px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"', 'className="w-full lg:w-[440px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"')

# Tabelas com rolagem horizontal no celular
$conteudo = $conteudo.Replace('className="overflow-hidden rounded-2xl border border-zinc-900"', 'className="overflow-x-auto rounded-2xl border border-zinc-900"')
$conteudo = $conteudo.Replace('className="w-full">', 'className="w-full min-w-[900px]">')

# Delivery, forma segura sem alterar logica
$conteudo = $conteudo.Replace('className="grid grid-cols-4 gap-4 mb-8"', 'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"')
$conteudo = $conteudo.Replace('className="col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[140px] leading-relaxed"', 'className="col-span-1 sm:col-span-2 xl:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 resize-y min-h-[140px] leading-relaxed"')
$conteudo = $conteudo.Replace('className="col-span-3 bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold"', 'className="col-span-1 sm:col-span-2 xl:col-span-3 bg-orange-950 hover:bg-orange-900 rounded-2xl p-4 font-semibold"')

Set-Content -Path $arquivo -Value $conteudo -Encoding UTF8

Write-Host "Responsividade mobile fase 1 aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup criado: $backup" -ForegroundColor Yellow
