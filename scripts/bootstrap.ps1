$ErrorActionPreference = "Stop"

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "pnpm was not found. Trying to enable it with Corepack..."
  if (Get-Command corepack -ErrorAction SilentlyContinue) {
    corepack enable
    corepack prepare pnpm@9.15.4 --activate
  } else {
    Write-Host "Corepack was not found. Install pnpm with: npm install -g pnpm@9.15.4"
    exit 1
  }
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "Docker was not found. Install and start Docker Desktop, then run this script again."
  exit 1
}

try {
  docker version | Out-Null
} catch {
  Write-Host "Docker is installed but not running. Start Docker Desktop, wait until it is ready, then run this script again."
  exit 1
}

Write-Host "Installing dependencies"
pnpm install

Write-Host "Generating Prisma client"
pnpm db:generate

Write-Host "Starting PostgreSQL and Redis"
docker compose up -d postgres redis

Write-Host "Applying database migration"
pnpm db:migrate

Write-Host "Seeding database"
pnpm db:seed

Write-Host "Starting development servers"
pnpm dev
