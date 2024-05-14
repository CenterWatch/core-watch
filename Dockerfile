# Configuração do Node.js
FROM node:20 AS build 
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

# Definir a imagem final para a aplicação Node.js
FROM build AS app
WORKDIR /app

# Expor a porta da aplicação Node.js (se necessário)
EXPOSE 3000

# Comando de inicialização da aplicação Node.js
CMD ["npm", "start"]
