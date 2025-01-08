ARG NODE=node:22.12.0-alpine

FROM $NODE AS builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

FROM $NODE

RUN apk add curl postgresql-client

# RUN apt-get update && apt-get install -y postgresql-client curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000/tcp

HEALTHCHECK CMD curl --fail http://localhost:3000/api/healthcheck || exit 1

CMD ["/app/server/index.mjs"]
