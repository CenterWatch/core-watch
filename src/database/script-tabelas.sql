CREATE DATABASE cwdb;

USE cwdb;

CREATE TABLE endereco (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(45),
    cep CHAR(8),
    numero VARCHAR(5),
    complemento VARCHAR(45),
    cidade VARCHAR(45) NOT NULL,
    uf CHAR(2)
);

CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(45) NOT NULL,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    fk_filial INT,
    CONSTRAINT fk_filial_empresa FOREIGN KEY (fk_filial) REFERENCES empresa(id_empresa)
) AUTO_INCREMENT = 1000;

CREATE TABLE setor (
    id_setor INT,
    fk_empresa INT,
    descricao VARCHAR(45),
    CONSTRAINT fk_empresa_setor FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa),
    PRIMARY KEY (id_setor, fk_empresa)
);

CREATE TABLE funcionario (
    id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    primeiro_nome VARCHAR(45),
    sobrenome VARCHAR(45) NOT NULL,
    celular CHAR(11),
    telefone CHAR(11),
    email VARCHAR(60) NOT NULL,
    dt_nasc DATE,
    cpf CHAR(14) NOT NULL,
    cargo VARCHAR(45), -- Picklist
    senha VARCHAR(45) NOT NULL,
    fk_endereco INT,
    fk_setor INT,
    fk_empresa INT,
    CONSTRAINT fk_endereco_funcionario FOREIGN KEY (fk_endereco) REFERENCES endereco(id_endereco),
    CONSTRAINT fk_setor_funcionario FOREIGN KEY (fk_setor) REFERENCES setor(id_setor),
    CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE artigo (
    id_artigo INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
    descricao VARCHAR(255),
    categoria VARCHAR(45),
    palavra_chave VARCHAR(45),
    fk_funcionario INT,
    CONSTRAINT fk_funcionario_artigo FOREIGN KEY (fk_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE ocorrencia (
    id_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
    descricao VARCHAR(255),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    prioridade VARCHAR(45), -- Picklist
    fk_funcionario INT,
    CONSTRAINT fk_funcionario_ocorrencia FOREIGN KEY (fk_funcionario) REFERENCES funcionario(id_funcionario),
    fk_atribuido INT,
    CONSTRAINT fk_suporte_ocorrencia FOREIGN KEY (fk_atribuido) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE maquina (
    patrimonio CHAR(5) PRIMARY KEY,
    sistema_operacional VARCHAR(45),
    cpu VARCHAR(80),
    ram BIGINT, -- Bytes
    armazenamento BIGINT, -- Bytes
    detalhes VARCHAR(255),
    fk_funcionario INT,
    CONSTRAINT fk_funcionario_maquina FOREIGN KEY (fk_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE registro (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    uso_cpu DECIMAL(3,1), -- Porcentagem
    uso_ram BIGINT, -- Bytes
    disponivel_ram BIGINT, -- Bytes
    ipv4 VARCHAR(15),
    pacotes_recebidos BIGINT,
    fk_maquina CHAR(5),
    CONSTRAINT fk_maquina_registro FOREIGN KEY (fk_maquina) REFERENCES maquina(patrimonio)
);

CREATE TABLE volume (
    id_volume INT PRIMARY KEY AUTO_INCREMENT,
    fk_registro INT,
    nome VARCHAR(45),
    ponto_montagem VARCHAR(45),
    volume_total BIGINT, -- Bytes
    volume_disponivel BIGINT, -- Bytes
    CONSTRAINT fk_registro_volume FOREIGN KEY (fk_registro) REFERENCES registro(id_registro)
) AUTO_INCREMENT = 20000;

CREATE TABLE rede (
    id_rede INT PRIMARY KEY AUTO_INCREMENT,
    fk_registro INT,
    nome VARCHAR(45),
    ipv4 VARCHAR(15),
    bytes_recebidos BIGINT,
    bytes_enviados BIGINT,
    pacotes_recebidos BIGINT,
    pacotes_enviados BIGINT,
    CONSTRAINT fk_registro_rede FOREIGN KEY (fk_registro) REFERENCES registro(id_registro)
) AUTO_INCREMENT = 10000;

