# Configuração do MySQL
FROM mysql:latest AS bd
ENV MYSQL_ROOT_PASSWORD="root"
COPY script-tabelas.sql /docker-entrypoint-initdb.d/

