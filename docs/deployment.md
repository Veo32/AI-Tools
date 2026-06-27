# Deployment

## Required Environment Variables

Use `.env.example` as the source of truth. At minimum:

- `APP_URL`
- `API_URL`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `COOKIE_SECRET`
- `CORS_ORIGINS`

Payment providers:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PADDLE_API_KEY`
- `PADDLE_WEBHOOK_SECRET`
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_WEBHOOK_SECRET`

## Docker

```bash
cp .env.example .env
docker compose up --build
```

Services:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## CI/CD

The GitHub Actions workflow runs install, Prisma generation, type checks, linting, tests, and builds for all workspaces.

Recommended production sequence:

1. Build images.
2. Run `pnpm --filter @aitools/database db:deploy`.
3. Start API, worker, and web containers.
4. Run smoke checks for `/en`, `/v1/tools`, and `/docs`.

