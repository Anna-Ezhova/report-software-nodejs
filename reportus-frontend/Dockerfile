# === BASE ===
FROM node:24.4.1-alpine3.22 AS base

# === STAGE 1: Build ===
FROM base AS builder

WORKDIR /app

# Dependencies installieren
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Projektdateien kopieren
COPY . .

# Next.js + server.ts kompilieren
RUN npm run build

# === STAGE 2: Runtime ===
FROM base AS runner

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Output & Source übernehmen
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV PORT=3001
ENV NEXT_BUILD=false

EXPOSE 3001

CMD ["node", "dist/server.cjs"]