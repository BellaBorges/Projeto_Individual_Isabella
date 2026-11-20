CREATE DATABASE diariogatos;
USE diariogatos;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE raca (
    id_raca INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE gato (
    id_gato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dtNascimento DATE,
    fk_usuario INT NOT NULL,
    fk_raca INT NOT NULL,
    CONSTRAINT fk_gato_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_gato_raca FOREIGN KEY (fk_raca) REFERENCES raca(id_raca)
);

CREATE TABLE pesagem (
    id_pesagem INT PRIMARY KEY AUTO_INCREMENT,
    peso DECIMAL(4,2) NOT NULL,
    dt_pesagem DATE NOT NULL,
    fk_Gato INT NOT NULL,
    CONSTRAINT fk_pesagem_gato FOREIGN KEY (fk_Gato) REFERENCES gato(id_gato),
    CONSTRAINT chk_peso CHECK (peso > 0)
);

CREATE TABLE CompraRacao (
    id_Compra INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50),
    pesoKg DECIMAL(5,2) NOT NULL,
    valor DECIMAL(7,2) NOT NULL,
    dt_compra DATE NOT NULL,
    fk_gato INT NOT NULL,
    CONSTRAINT fk_compra_gato FOREIGN KEY (fk_gato) REFERENCES gato(id_gato),
    CONSTRAINT chk_compra CHECK (pesoKg > 0 AND valor > 0)
);

-- Vacinas
CREATE TABLE vacina (
    id_vacina INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE aplicacao_vacina (
    id_aplicacao INT PRIMARY KEY AUTO_INCREMENT,
    dt_aplicacao DATE NOT NULL,
    dt_proxima_dose DATE,
    fk_vacina INT NOT NULL,
    fk_gato INT NOT NULL,
    CONSTRAINT fk_aplicacao_vacina FOREIGN KEY (fk_vacina) REFERENCES vacina(id_vacina),
    CONSTRAINT fk_aplicacao_gato FOREIGN KEY (fk_gato) REFERENCES gato(id_gato),
    CONSTRAINT chk_doses CHECK (dt_proxima_dose IS NULL OR dt_proxima_dose >= dt_aplicacao)
);

-- INSERTS
INSERT INTO raca (nome) VALUES
('SRD (Sem Raça Definida)'),
('Siamês'),
('Persa'),
('Maine Coon'),
('Angorá'),
('Sphynx'),
('Ragdoll'),
('Bengal');

INSERT INTO vacina (nome) VALUES
('V3 (Tríplice felina)'),
('V4 (Quádrupla felina)'),
('V5 (Quíntupla felina)'),
('Antirrábica'),
('Giárdia'),
('Leucemia felina (FeLV)');

INSERT INTO usuario (nome, email, senha) VALUES
('Usuária Teste', 'teste@email.com', '123456');

INSERT INTO gato (nome, dtNascimento, fk_usuario, fk_raca) VALUES
('Gato 1', '2019-03-10', 1, 1),
('Gato 2', '2020-07-22', 1, 1);

INSERT INTO pesagem (peso, dt_pesagem, fk_Gato) VALUES
(4.10, '2026-09-01', 1),
(4.25, '2026-10-01', 1),
(3.80, '2026-10-05', 2);

INSERT INTO CompraRacao (marca, pesoKg, valor, dt_compra, fk_gato) VALUES
('Premier', 10.10, 189.90, '2026-10-15', 1),
('Golden', 10.10, 159.90, '2026-10-20', 2);

INSERT INTO aplicacao_vacina (dt_aplicacao, dt_proxima_dose, fk_vacina, fk_gato) VALUES
('2026-01-10', '2027-01-10', 2, 1),
('2026-01-10', '2027-01-10', 2, 2),
('2026-02-05', NULL, 4, 1),
('2026-02-05', '2027-02-05', 4, 2);

-- CONSULTAS Histórico de vacinas por gato
SELECT 
    g.nome AS gato, 
    v.nome AS vacina, 
    a.dt_aplicacao, 
    a.dt_proxima_dose
FROM aplicacao_vacina a
JOIN gato g ON a.fk_gato = g.id_gato
JOIN vacina v ON a.fk_vacina = v.id_vacina
ORDER BY g.nome, a.dt_aplicacao;

-- Quantos gatos tomaram cada vacina
SELECT 
    v.nome AS vacina, 
    COUNT(a.id_aplicacao) AS total_aplicacoes
FROM vacina v
LEFT JOIN aplicacao_vacina a ON a.fk_vacina = v.id_vacina
GROUP BY v.nome;

-- Peso médio de cada gato
SELECT 
    g.nome, 
    AVG(p.peso) AS peso_medio
FROM gato g
JOIN pesagem p ON p.fk_Gato = g.id_gato
GROUP BY g.nome;

-- Vacinas com próxima dose a partir de uma data
SELECT 
    g.nome AS gato, 
    v.nome AS vacina, 
    a.dt_proxima_dose
FROM aplicacao_vacina a
JOIN gato g ON a.fk_gato = g.id_gato
JOIN vacina v ON a.fk_vacina = v.id_vacina
WHERE a.dt_proxima_dose >= '2026-12-01'
ORDER BY a.dt_proxima_dose ASC;

-- Listar gatos com suas respectivas raças
SELECT 
    g.nome AS gato,
    r.nome AS raca,
    g.dtNascimento
FROM gato g
JOIN raca r ON g.fk_raca = r.id_raca;
