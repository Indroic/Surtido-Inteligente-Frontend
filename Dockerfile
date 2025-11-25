# Multi-stage Dockerfile optimized for Railway deployments
# Stage 0: Define the base image and working directory
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Stage 1: Install dependencies using pnpm
FROM base AS deps
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the Next.js application
FROM base AS builder
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Stage 3: Prepare the runtime image
FROM base AS runner
RUN corepack enable
# Copy the Next.js build output and required assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# Reuse the dependencies from the deps stage and prune dev packages
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm prune --prod

EXPOSE 3000
CMD ["pnpm", "start"]
