param(
  [ValidateSet(
    "check",
    "fix-pnpm",
    "clean",
    "clean-web",
    "install",
    "frontend",
    "frontend-3001",
    "frontend-3002",
    "port-3000",
    "port-3001",
    "port-3002",
    "kill-3000",
    "kill-3001",
    "kill-3002",
    "start-docker",
    "db-up",
    "db-setup",
    "api",
    "full",
    "stop-db"
  )]
  [string]$Task = "check"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $ProjectRoot

function Invoke-Step {
  param(
    [string]$Title,
    [scriptblock]$Command
  )

  Write-Host ""
  Write-Host "==> $Title" -ForegroundColor Cyan
  & $Command
}

function Assert-Pnpm {
  if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm was not found. Installing pnpm@9.15.4 with npm..." -ForegroundColor Yellow
    npm install -g pnpm@9.15.4
  }
}

function Assert-Docker {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker was not found. Install Docker Desktop first."
  }

  docker version | Out-Null
}

function Clean-Install {
  $nodeModules = Join-Path $ProjectRoot "node_modules"
  $resolvedNodeModules = $null

  if (Test-Path $nodeModules) {
    $resolvedNodeModules = Resolve-Path $nodeModules
    if (-not $resolvedNodeModules.Path.StartsWith($ProjectRoot.Path)) {
      throw "Refusing to remove node_modules outside the project root."
    }

    Write-Host "Removing $($resolvedNodeModules.Path)"
    Remove-Item -LiteralPath $resolvedNodeModules.Path -Recurse -Force
  }
}

function Show-Port {
  param([int]$Port)

  $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
  if (-not $connections) {
    Write-Host "Port $Port is free."
    return
  }

  $connections | Select-Object LocalAddress, LocalPort, State, OwningProcess
  $connections |
    Select-Object -ExpandProperty OwningProcess -Unique |
    ForEach-Object {
      Get-Process -Id $_ -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, Path
    }
}

function Stop-Port {
  param([int]$Port)

  $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
  if (-not $connections) {
    Write-Host "Port $Port is already free."
    return
  }

  $connections |
    Select-Object -ExpandProperty OwningProcess -Unique |
    ForEach-Object {
      Write-Host "Stopping process $_ on port $Port"
      Stop-Process -Id $_ -Force
    }
}

switch ($Task) {
  "check" {
    Invoke-Step "Node" { node -v }
    Invoke-Step "npm" { npm -v }
    Invoke-Step "pnpm" {
      if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        pnpm -v
      } else {
        Write-Host "pnpm is missing. Run: .\scripts\windows-commands.ps1 -Task fix-pnpm" -ForegroundColor Yellow
      }
    }
    Invoke-Step "Docker" {
      if (Get-Command docker -ErrorAction SilentlyContinue) {
        docker version
      } else {
        Write-Host "Docker is missing." -ForegroundColor Yellow
      }
    }
  }

  "fix-pnpm" {
    Invoke-Step "Install pnpm" { npm install -g pnpm@9.15.4 }
    Invoke-Step "Verify pnpm" { pnpm -v }
  }

  "clean" {
    Invoke-Step "Clean partial node_modules" { Clean-Install }
  }

  "clean-web" {
    Invoke-Step "Clean Next.js cache" { pnpm clean:web }
  }

  "install" {
    Invoke-Step "Ensure pnpm" { Assert-Pnpm }
    Invoke-Step "Install dependencies" { pnpm install }
  }

  "frontend" {
    Invoke-Step "Ensure pnpm" { Assert-Pnpm }
    Invoke-Step "Run frontend" { pnpm dev:web }
  }

  "frontend-3001" {
    Invoke-Step "Ensure pnpm" { Assert-Pnpm }
    Invoke-Step "Run frontend on port 3001" { pnpm dev:web:3001 }
  }

  "frontend-3002" {
    Invoke-Step "Ensure pnpm" { Assert-Pnpm }
    Invoke-Step "Run frontend on port 3002" { pnpm dev:web:3002 }
  }

  "port-3000" {
    Invoke-Step "Show process using port 3000" { Show-Port 3000 }
  }

  "port-3001" {
    Invoke-Step "Show process using port 3001" { Show-Port 3001 }
  }

  "port-3002" {
    Invoke-Step "Show process using port 3002" { Show-Port 3002 }
  }

  "kill-3000" {
    Invoke-Step "Stop process using port 3000" { Stop-Port 3000 }
  }

  "kill-3001" {
    Invoke-Step "Stop process using port 3001" { Stop-Port 3001 }
  }

  "kill-3002" {
    Invoke-Step "Stop process using port 3002" { Stop-Port 3002 }
  }

  "start-docker" {
    Invoke-Step "Start Docker Desktop" {
      Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
      Write-Host "Wait until Docker Desktop says it is running, then run: .\scripts\windows-commands.ps1 -Task db-up"
    }
  }

  "db-up" {
    Invoke-Step "Check Docker" { Assert-Docker }
    Invoke-Step "Start PostgreSQL and Redis" { docker compose up -d postgres redis }
  }

  "db-setup" {
    Invoke-Step "Generate Prisma client" { pnpm db:generate }
    Invoke-Step "Run migrations" { pnpm db:migrate }
    Invoke-Step "Seed database" { pnpm db:seed }
  }

  "api" {
    Invoke-Step "Run API" { pnpm dev:api }
  }

  "full" {
    Invoke-Step "Ensure pnpm" { Assert-Pnpm }
    Invoke-Step "Install dependencies" { pnpm install }
    Invoke-Step "Check Docker" { Assert-Docker }
    Invoke-Step "Start PostgreSQL and Redis" { docker compose up -d postgres redis }
    Invoke-Step "Generate Prisma client" { pnpm db:generate }
    Invoke-Step "Run migrations" { pnpm db:migrate }
    Invoke-Step "Seed database" { pnpm db:seed }
    Invoke-Step "Run full platform" { pnpm dev }
  }

  "stop-db" {
    Invoke-Step "Stop Docker services" { docker compose down }
  }
}
