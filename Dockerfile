# Imagem do mysql para o container do banco
FROM mysql:latest 
ENV MYSQL_ROOT_PASSWORD="root"

# Rodar o script de criação das tabelas. OBS: Ao subir o container, o docker roda automaticamente o script
COPY ./src/database/script-tabelas.sql /docker-entrypoint-initdb.d/

# Imagem do nodejs para container do servidor
FROM node:20
COPY . /app 
WORKDIR /app
RUN npm install
