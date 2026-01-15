# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor web con Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/angular-mfe/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]