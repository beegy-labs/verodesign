FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/design/package.json ./packages/design/
COPY packages/design-elements/package.json ./packages/design-elements/
COPY packages/design-react/package.json ./packages/design-react/
COPY packages/showcase/package.json ./packages/showcase/

RUN pnpm install --frozen-lockfile

COPY packages/design ./packages/design
COPY packages/design-elements ./packages/design-elements
COPY packages/design-react ./packages/design-react
COPY packages/showcase ./packages/showcase

RUN pnpm --filter @verobee/showcase build

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY --from=builder /app/packages/showcase/dist /usr/share/nginx/html

COPY packages/showcase/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
