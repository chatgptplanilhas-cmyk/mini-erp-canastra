$ErrorActionPreference = "Stop"

$path = Join-Path $PSScriptRoot "App.jsx"

if (!(Test-Path $path)) {
  Write-Host "ERRO: App.jsx nao encontrado na pasta src." -ForegroundColor Red
  exit 1
}

$backup = Join-Path $PSScriptRoot ("App-backup-antes-mobile-fase2-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsx")
Copy-Item $path $backup -Force

$code = Get-Content $path -Raw -Encoding UTF8

function Replace-Text {
  param(
    [string]$Old,
    [string]$New
  )

  if ($script:code.Contains($Old)) {
    $script:code = $script:code.Replace($Old, $New)
  }
}

$mobileMenu = @'
        <div className="lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950 p-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-orange-400 uppercase tracking-[6px] text-[10px]">Sistema</p>
              <h1 className="text-xl font-bold leading-tight">Queijos Serra da Canastra</h1>
            </div>
            <span className="text-xs text-zinc-500">Mini ERP</span>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1">
            {botaoMenu('painel', '📊', 'Painel')}
            {botaoMenu('clientes', '👤', 'Clientes')}
            {botaoMenu('vendas', '🧾', 'Vendas')}
            {botaoMenu('pendencias', '💰', 'Pendências')}
            {botaoMenu('pagamentos', '💳', 'Pagamentos')}
            {botaoMenu('delivery', '🚚', 'Delivery')}
            {botaoMenu('produtos', '🧀', 'Produtos')}
            {botaoMenu('produtos-controle', '📦', 'Controle')}
            {botaoMenu('fornecedores', '🚚', 'Fornecedores')}
            {botaoMenu('despesas', '🧾', 'Despesas')}
            {botaoMenu('taxas', '⚙️', 'Taxas')}
          </nav>
        </div>
'@

if ($code -notmatch "lg:hidden sticky top-0 z-50 bg-black border-b border-orange-950") {
  Replace-Text @'
      <div className="grid grid-cols-[280px_1fr]">
'@ @"
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr]">
$mobileMenu
"@

  Replace-Text @'
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr]">
'@ @"
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr]">
$mobileMenu
"@
}

Replace-Text @'
    <div className="min-h-screen bg-[#15110f] text-white">
'@ @'
    <div className="min-h-screen bg-[#15110f] text-white overflow-x-hidden">
'@

Replace-Text @'
        <aside className="min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">
'@ @'
        <aside className="hidden lg:block min-h-screen max-h-screen overflow-y-auto bg-black border-r border-orange-950 p-6">
'@

Replace-Text @'
        <main className="p-8">
'@ @'
        <main className="p-4 lg:p-8 w-full max-w-full overflow-x-hidden">
'@

Replace-Text @'
          <section className="bg-black border border-orange-950 rounded-[28px] p-8 mb-6">
'@ @'
          <section className="bg-black border border-orange-950 rounded-[24px] lg:rounded-[28px] p-5 lg:p-8 mb-6">
'@

Replace-Text @'
            <h2 className="text-5xl font-bold mb-4">Mini ERP Queijos Serra da Canastra</h2>
'@ @'
            <h2 className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">Mini ERP Queijos Serra da Canastra</h2>
'@

Replace-Text @'
        <section className="grid grid-cols-4 gap-4 mb-6">
'@ @'
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
'@

Replace-Text @'
          <div className="grid grid-cols-3 gap-5 mb-5">
'@ @'
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
'@

Replace-Text @'
          <div className="grid grid-cols-3 gap-5">
'@ @'
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
'@

Replace-Text @'
          <div className="grid grid-cols-3 gap-5 mt-5">
'@ @'
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
'@

Replace-Text @'
          <form onSubmit={salvarVenda} className="grid grid-cols-12 gap-3 items-end">
'@ @'
          <form onSubmit={salvarVenda} className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
'@

for ($i = 1; $i -le 12; $i++) {
  $code = $code.Replace("className=""col-span-$i", "className=""lg:col-span-$i")
}

Replace-Text @'
            <input
              value={buscaVendas}
              onChange={(e) => setBuscaVendas(e.target.value)}
              placeholder="Buscar venda, cliente, referência ou status"
              className="w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
'@ @'
            <input
              value={buscaVendas}
              onChange={(e) => setBuscaVendas(e.target.value)}
              placeholder="Buscar venda, cliente, referência ou status"
              className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
            />
'@

$code = $code.Replace('className="w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"', 'className="w-full lg:w-[420px] bg-zinc-950 border border-zinc-800 rounded-2xl p-4"')
$code = $code.Replace('className="overflow-hidden rounded-2xl border border-zinc-900"', 'className="overflow-x-auto rounded-2xl border border-zinc-900"')
$code = $code.Replace('className="w-full">', 'className="w-full min-w-[900px]">')

Set-Content -Path $path -Value $code -Encoding UTF8

Write-Host "Segunda fase mobile aplicada com sucesso." -ForegroundColor Green
Write-Host "Backup criado: $([System.IO.Path]::GetFileName($backup))" -ForegroundColor Yellow
