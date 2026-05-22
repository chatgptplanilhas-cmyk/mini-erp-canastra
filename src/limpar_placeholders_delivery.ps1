$path = "App.jsx"

if (!(Test-Path $path)) {
  Write-Host "ERRO: App.jsx nao encontrado nesta pasta." -ForegroundColor Red
  exit 1
}

$backup = "App-backup-antes-limpar-placeholders-delivery.jsx"
Copy-Item $path $backup -Force

$content = Get-Content $path -Raw -Encoding UTF8

$content = $content.Replace('placeholder="Ex: EC 304 Norte, CEDLAN, 703 Norte"', 'placeholder=""')
$content = $content.Replace('placeholder="Ex: Sala dos professores, portaria, direcao"', 'placeholder=""')
$content = $content.Replace('placeholder="Ex: Sala dos professores, portaria, direção"', 'placeholder=""')

Set-Content $path $content -Encoding UTF8

Write-Host "Placeholders do Delivery removidos com sucesso." -ForegroundColor Green
Write-Host "Backup criado: $backup" -ForegroundColor Yellow
