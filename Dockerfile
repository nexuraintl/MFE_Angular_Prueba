# Dockerfile - Microfrontend Angular (BUILD ONLY)

FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias de forma reproducible
RUN npm ci

# Copiar código fuente
COPY . .

# Build de Angular en modo producción
RUN npm run build
