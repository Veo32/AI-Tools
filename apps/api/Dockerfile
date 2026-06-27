FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --filter @aitools/api... --frozen-lockfile=false

FROM deps AS build
COPY apps/api ./apps/api
RUN pnpm --filter @aitools/database db:generate
RUN pnpm --filter @aitools/api build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/database/prisma ./packages/database/prisma
COPY --from=build /app/package.json ./package.json
EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]

