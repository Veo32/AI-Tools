$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $projectRoot

Write-Host "Cleaning partial pnpm install in $projectRoot"

$nodeModules = Join-Path $projectRoot "node_modules"
if (Test-Path $nodeModules) {
  Write-Host "Removing node_modules"
  Remove-Item -LiteralPath $nodeModules -Recurse -Force
}

$lockfile = Join-Path $projectRoot "pnpm-lock.yaml"
if (Test-Path $lockfile) {
  Write-Host "Keeping pnpm-lock.yaml"
}

Write-Host "If Windows Defender or an editor locked files, wait a few seconds before running pnpm install again."
Write-Host "Next command: pnpm install"
