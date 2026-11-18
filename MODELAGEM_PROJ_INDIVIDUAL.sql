CREATE DATABASE diarioGatos;
USE diarioGatos;

-- TABELAS

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE gato (
    idGato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    raca VARCHAR(50),
    dtNascimento DATE,
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE pesagem (
    idPesagem INT PRIMARY KEY AUTO_INCREMENT,
    peso DECIMAL(4,2) NOT NULL,
    dtPesagem DATE NOT NULL,
    fkGato INT NOT NULL,
    FOREIGN KEY (fkGato) REFERENCES gato(idGato),
    CONSTRAINT chkPeso CHECK (peso > 0)
);

CREATE TABLE vacina (
    idVacina INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dtAplicacao DATE NOT NULL,
    dtProximaDose DATE NOT NULL,
    fkGato INT NOT NULL,
    FOREIGN KEY (fkGato) REFERENCES gato(idGato),
    CONSTRAINT chkDoses CHECK (dtProximaDose >= dtAplicacao)
);

CREATE TABLE compraRacao (
    idCompra INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50),
    pesoKg DECIMAL(5,2) NOT NULL,
    valor DECIMAL(7,2) NOT NULL,
    dtCompra DATE NOT NULL,
    fkGato INT NOT NULL,
    FOREIGN KEY (fkGato) REFERENCES gato(idGato),
    CONSTRAINT chkCompra CHECK (pesoKg > 0 AND valor > 0)
);

-- 2. INSERTS

INSERT INTO usuario (nome, email, senha) VALUES
('Ana', 'ana@email.com', 'abc123');

INSERT INTO gato (nome, raca, dtNascimento, fkUsuario) VALUES
('Paçoca', 'SRD', '2019-03-10', 1),    -- id 1
('Heloísa', 'Angorá', '2019-05-22', 1),   -- id 2
('Neno', 'Angorá', '2021-07-15', 1),   -- id 3
('Miga', 'Angorá', '2022-01-08', 1),      -- id 4
('Pitoco', 'SRD', '2024-01-15', 1);    -- id 5 (sem pesagem e sem vacina, serve para o LEFT JOIN)

INSERT INTO pesagem (peso, dtPesagem, fkGato) VALUES
(4.10, '2026-08-01', 1),
(4.25, '2026-09-01', 1),
(4.60, '2026-10-01', 1),
(3.40, '2026-08-01', 2),
(3.45, '2026-09-01', 2),
(3.50, '2026-10-01', 2),
(5.00, '2026-08-01', 3),
(5.20, '2026-09-01', 3),
(5.10, '2026-10-01', 3),
(3.00, '2026-09-01', 4),
(3.15, '2026-10-01', 4);

INSERT INTO vacina (nome, dtAplicacao, dtProximaDose, fkGato) VALUES
('V4', '2025-10-15', '2026-10-15', 1),          -- atrasada
('Antirrábica', '2026-06-01', '2027-06-01', 1), -- em dia
('V4', '2025-09-20', '2026-09-20', 2),          -- atrasada
('V4', '2026-03-01', '2027-03-01', 3),          -- em dia
('Antirrábica', '2026-03-01', '2027-03-01', 3), -- em dia
('V4', '2026-05-10', '2027-05-10', 4);          -- em dia

INSERT INTO compraRacao (marca, pesoKg, valor, dtCompra, fkGato) VALUES
('Premier', 10.00, 190.00, '2026-09-05', 1),
('Golden', 15.00, 210.00, '2026-09-12', 2),
('Premier', 10.00, 185.00, '2026-10-02', 3),
('Golden', 15.00, 215.00, '2026-10-20', 1),
('Premier', 10.00, 190.00, '2026-10-25', 4),
('Golden', 10.00, 150.00, '2026-11-03', 5);

SELECT * FROM usuario;
SELECT * FROM gato;
SELECT * FROM pesagem;
SELECT * FROM vacina;
SELECT * FROM compraRacao;


-- 3. SELECTS

-- WHERE: pesagens da Paçoca (gato 1)
SELECT * FROM pesagem WHERE fkGato = 1;

-- WHERE com AND: pesagens da Paçoca acima de 4.2 kg
SELECT * FROM pesagem WHERE fkGato = 1 AND peso > 4.2;

-- LIKE: gatos cujo nome começa com P (Paçoca e Pitoco)
SELECT * FROM gato WHERE nome LIKE 'P%';

-- LIKE: compras de ração de marca que contém "rem"
SELECT * FROM compraRacao WHERE marca LIKE '%rem%';

-- ORDER BY ASC: pesagens da mais antiga para a mais recente
SELECT * FROM pesagem WHERE fkGato = 1 ORDER BY dtPesagem ASC;

-- ORDER BY DESC: compras de ração da mais cara para a mais barata
SELECT * FROM compraRacao ORDER BY valor DESC;



-- JOIN: nome do gato junto com cada peso
SELECT gato.nome, pesagem.peso, pesagem.dtPesagem
FROM gato JOIN pesagem ON pesagem.fkGato = gato.idGato;

-- COUNT: quantas pesagens existem no total
SELECT COUNT(*) FROM pesagem;

-- AVG: peso médio da Paçoca
SELECT AVG(peso) FROM pesagem WHERE fkGato = 1;

-- MAX e MIN: maior e menor peso da Paçoca
SELECT MAX(peso), MIN(peso) FROM pesagem WHERE fkGato = 1;

-- SUM: gasto total com ração
SELECT SUM(valor) FROM compraRacao;

-- JOIN + função + WHERE: peso médio do Neno
SELECT AVG(pesagem.peso)
FROM gato JOIN pesagem ON pesagem.fkGato = gato.idGato
WHERE gato.nome = 'Neno';



-- GROUP BY: peso médio de cada gato
SELECT gato.nome, AVG(pesagem.peso) AS pesoMedio
FROM gato JOIN pesagem ON pesagem.fkGato = gato.idGato
GROUP BY gato.nome;

-- GROUP BY: gasto com ração de cada gato
SELECT gato.nome, SUM(compraRacao.valor) AS gastoTotal
FROM gato JOIN compraRacao ON compraRacao.fkGato = gato.idGato
GROUP BY gato.nome;

-- Mais de 1 JOIN: tutor, gato e peso na mesma consulta
SELECT usuario.nome AS tutor, gato.nome AS gato, pesagem.peso, pesagem.dtPesagem
FROM usuario
JOIN gato ON gato.fkUsuario = usuario.idUsuario
JOIN pesagem ON pesagem.fkGato = gato.idGato
ORDER BY gato.nome, pesagem.dtPesagem;

-- LEFT JOIN: todos os gatos, mesmo os sem vacina (Pitoco aparece com NULL)
SELECT gato.nome, vacina.nome AS vacina
FROM gato LEFT JOIN vacina ON vacina.fkGato = gato.idGato;

-- LEFT JOIN + WHERE: gatos que nunca foram pesados (Pitoco)
SELECT gato.nome
FROM gato LEFT JOIN pesagem ON pesagem.fkGato = gato.idGato
WHERE pesagem.idPesagem IS NULL;

-- RIGHT JOIN: mesmo resultado do LEFT JOIN, com as tabelas invertidas
SELECT gato.nome, vacina.nome AS vacina
FROM vacina RIGHT JOIN gato ON vacina.fkGato = gato.idGato;

-- SUBQUERY: pesagens acima do peso médio de todas as pesagens
SELECT * FROM pesagem
WHERE peso > (SELECT AVG(peso) FROM pesagem);

-- SUBQUERY: a compra de ração mais cara, com todos os dados
SELECT * FROM compraRacao
WHERE valor = (SELECT MAX(valor) FROM compraRacao);



-- 6. SELECTS DO DASHBOARD

-- Vacinas atrasadas
SELECT gato.nome, vacina.nome AS vacina, vacina.dtProximaDose
FROM vacina JOIN gato ON vacina.fkGato = gato.idGato
WHERE vacina.dtProximaDose < CURDATE();

-- Vacinas em dia
SELECT gato.nome, vacina.nome AS vacina, vacina.dtProximaDose
FROM vacina JOIN gato ON vacina.fkGato = gato.idGato
WHERE vacina.dtProximaDose >= CURDATE();

-- Quantidade de vacinas atrasadas por gato
SELECT gato.nome, COUNT(vacina.idVacina) AS atrasadas
FROM gato JOIN vacina ON vacina.fkGato = gato.idGato
WHERE vacina.dtProximaDose < CURDATE()
GROUP BY gato.nome;

-- Evolução de peso de cada gato (gráfico de linha)
SELECT gato.nome, pesagem.dtPesagem, pesagem.peso
FROM gato JOIN pesagem ON pesagem.fkGato = gato.idGato
ORDER BY gato.nome, pesagem.dtPesagem;

-- Gasto com ração por gato (gráfico de barras)
SELECT gato.nome, SUM(compraRacao.valor) AS gastoTotal
FROM gato JOIN compraRacao ON compraRacao.fkGato = gato.idGato
GROUP BY gato.nome
ORDER BY gastoTotal DESC;