# Dockerfile para express
FROM node:20.16.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json, e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
