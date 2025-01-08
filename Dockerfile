ARG NODE=node:22.12.0-alpine

FROM $NODE as builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . /app

RUN pnpm run build

FROM $NODE

RUN apk add --no-cache curl

WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000/tcp

HEALTHCHECK CMD curl --fail http://localhost:3000/api/healthcheck || exit 1

CMD ["/app/server/index.mjs"]
