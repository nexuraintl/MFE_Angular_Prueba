# =========================
# 1️⃣ Build Angular
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Dependencias
COPY package*.json ./
RUN npm ci

# Código fuente
COPY . .

# 🔑 CLAVE: build con rutas RELATIVAS
RUN npm run build -- \
  --configuration production \
  --base-href ./ \
  --deploy-url ./

# =========================
# 2️⃣ Output (artefactos)
# =========================
# Esta imagen solo existe para copiar los archivos
FROM alpine:3.19 AS export

WORKDIR /dist
COPY --from=build /app/dist/angular-microfrontend-app/browser .

# No ENTRYPOINT, no CMD
