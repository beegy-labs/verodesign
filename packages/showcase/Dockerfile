# syntax=docker/dockerfile:1.6
# Multi-stage Dockerfile for the verodesign showcase site (Astro static).
# Builder stage compiles all workspace deps; runtime stage is nginx serving
# pre-built HTML.

FROM node:20-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /repo
# Copy minimum needed to install workspace
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY .changeset ./.changeset
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm --filter '@verobee/showcase^...' build
RUN pnpm --filter @verobee/showcase build

FROM nginx:1.27-alpine AS runtime
COPY --from=builder /repo/packages/showcase/dist /usr/share/nginx/html

# Astro outputs static files; the default nginx config is sufficient.
# SPA-style fallback not needed because we use file-based routing.

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
