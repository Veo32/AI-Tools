# PowerShell Commands

Run these commands from PowerShell.

## 1. Go To Project

```powershell
cd E:\Codex\ai-tools-directory-saas
```

## 2. Check Tools

```powershell
node -v
npm -v
pnpm -v
docker version
```

## 3. Install pnpm If Missing

```powershell
npm install -g pnpm@9.15.4
pnpm -v
```

## 4. Clean Partial Install

Use this after `EBUSY`, locked symlink, or incomplete `node_modules`.

```powershell
pnpm clean:install
```

## 5. Install Dependencies

```powershell
pnpm install
```

## 6. Run Frontend Only

This works without Docker because the frontend has mock fallback data.

```powershell
pnpm dev:web
```

Open:

```text
http://localhost:3000/en
```

If port 3000 is busy:

```powershell
pnpm dev:web:3001
```

If you changed code and Next keeps showing an old middleware error:

```powershell
pnpm clean:web
pnpm dev:web:3001
```

Open:

```text
http://localhost:3001/en
```

To see what is using port 3000:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object LocalAddress,LocalPort,OwningProcess
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

To stop the process using port 3000:

```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```

If port 3001 is busy:

```powershell
.\scripts\windows-commands.ps1 -Task port-3001
.\scripts\windows-commands.ps1 -Task kill-3001
pnpm dev:web:3001
```

## 7. Start Docker Desktop

```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

Wait until Docker Desktop says it is running, then:

```powershell
docker version
```

## 8. Start PostgreSQL And Redis

```powershell
docker compose up -d postgres redis
```

## 9. Setup Database

```powershell
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## 10. Run Full Platform

```powershell
pnpm dev
```

Open:

```text
http://localhost:3000/en
http://localhost:4000/docs
```

## 11. Stop Database Services

```powershell
docker compose down
```

## One-Shot Frontend Setup

```powershell
cd E:\Codex\ai-tools-directory-saas
pnpm clean:install
pnpm install
pnpm dev:web
```

## One-Shot Full Setup

```powershell
cd E:\Codex\ai-tools-directory-saas
pnpm clean:install
pnpm install
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
docker compose up -d postgres redis
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```
