# Dockerfile para frontVue
FROM node:20.16.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json, e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "run", "serve"]
