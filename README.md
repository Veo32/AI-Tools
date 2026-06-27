# AI Tools Directory SaaS

Enterprise-grade AI tools directory SaaS inspired by Toolify, Futurepedia, There Is An AI For That, and TopAI.tools.

## Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style components, Framer Motion, TanStack Query, Zustand, Zod, React Hook Form, next-intl.
- Backend: NestJS, PostgreSQL, Prisma ORM, Redis, BullMQ, JWT, Swagger, CSRF, rate limiting, audit logs.
- Monetization: Stripe, PayPal, Paddle, LemonSqueezy adapter structure for subscriptions, sponsored tools, featured placements, API monetization, and invoices.
- Internationalization: English, Arabic, Spanish, Chinese, Hindi with locale routing, Arabic RTL, hreflang metadata, translated UI messages, and translation-ready content models.

## Apps

- `apps/web`: public directory, SEO pages, pricing, blog, developer docs, user dashboard, admin dashboard.
- `apps/api`: REST API, auth, tools, search, billing, analytics, importer, moderation, CMS, developer API, webhooks.
- `packages/database`: Prisma schema and seed data.
- `packages/shared`: shared schemas, locales, roles, and utilities.

## Quick Start

```bash
pnpm install
cp .env.example .env
docker compose up -d postgres redis
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Windows Setup Troubleshooting

If PowerShell says `pnpm` is not recognized, enable it with Corepack:

```powershell
node -v
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm -v
```

If Corepack is not available, install pnpm through npm:

```powershell
npm install -g pnpm@9.15.4
pnpm -v
```

If `docker compose` cannot connect to `dockerDesktopLinuxEngine`, start Docker Desktop first. Wait until Docker says it is running, then retry:

```powershell
docker version
docker compose up -d postgres redis
```

If Docker Desktop is not installed, install it or point `DATABASE_URL` and `REDIS_URL` in `.env` to existing PostgreSQL and Redis services.

If `pnpm install` stops with `EBUSY` or a locked symlink on Windows, the install is partial. Close editors that may be scanning `node_modules`, then run:

```powershell
pnpm clean:install
pnpm install
```

You can preview the frontend without Docker after dependencies install:

```powershell
pnpm dev:web
```

PowerShell-only command reference:

- [docs/powershell-commands.md](docs/powershell-commands.md)
- `.\scripts\windows-commands.ps1 -Task check`
- `.\scripts\windows-commands.ps1 -Task install`
- `.\scripts\windows-commands.ps1 -Task frontend`
- `.\scripts\windows-commands.ps1 -Task full`

Frontend: `http://localhost:3000/en`

API: `http://localhost:4000/v1`

Swagger: `http://localhost:4000/docs`

Seed admin:

```text
admin@aitools.example
Admin123!ChangeMe
```

## Production Notes

- Use managed PostgreSQL with read replicas for public search traffic.
- Use managed Redis for BullMQ, rate-limit coordination, and search cache.
- Put the web app behind a CDN with image optimization and cache tags.
- Move webhook signature verification to raw-body adapters before accepting live payment events.
- Replace placeholder provider URLs with live Stripe, PayPal, Paddle, and LemonSqueezy products.
- Add object storage for logos, screenshots, CSV uploads, and CMS media.
