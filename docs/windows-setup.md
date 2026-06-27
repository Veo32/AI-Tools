# Windows Setup

## 1. Install or enable pnpm

First check Node.js:

```powershell
node -v
npm -v
```

If Node exists, enable pnpm with Corepack:

```powershell
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm -v
```

If `corepack` is not available:

```powershell
npm install -g pnpm@9.15.4
pnpm -v
```

## 2. Start Docker Desktop

The error about `dockerDesktopLinuxEngine` means Docker Desktop is not running or not installed.

Open Docker Desktop from the Start menu and wait until it says Docker is running.

You can also try starting it from PowerShell:

```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

Then verify:

```powershell
docker version
docker compose up -d postgres redis
```

## 3. Run the project

From `E:\Codex\ai-tools-directory-saas`:

```powershell
pnpm install
Copy-Item .env.example .env -Force
docker compose up -d postgres redis
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

If `pnpm install` fails with `EBUSY` or a locked symlink, clean the partial install and retry:

```powershell
pnpm clean:install
pnpm install
```

If Docker is still unavailable, you can still preview the frontend because it has mock fallback data:

```powershell
pnpm dev:web
```

Open:

- Web: `http://localhost:3000/en`
- API docs: `http://localhost:4000/docs`
