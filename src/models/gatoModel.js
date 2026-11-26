var database = require("../database/config");

function listarRacas() {
    var instrucaoSql = `SELECT id_raca, nome FROM raca ORDER BY nome ASC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarVacinas() {
    var instrucaoSql = `SELECT id_vacina, nome FROM vacina ORDER BY nome ASC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarGatos(idUsuario) {
    var instrucaoSql = `SELECT id_gato, nome FROM gato WHERE fk_usuario = ${idUsuario} ORDER BY nome ASC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarGato(nome, idRaca, nascimento, idUsuario) {
    // data opcional: se vier vazia, grava NULL
    var nascimentoSql = nascimento ? `'${nascimento}'` : "NULL";

    var instrucaoSql = `
        INSERT INTO gato (nome, dtNascimento, fk_usuario, fk_raca)
        VALUES ('${nome}', ${nascimentoSql}, ${idUsuario}, ${idRaca});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarPesagem(idGato, peso, data) {
    var instrucaoSql = `
        INSERT INTO pesagem (peso, dt_pesagem, fk_Gato) VALUES (${peso}, '${data}', ${idGato});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function registrarVacina(idGato, idVacina, aplicacao, proxima) {
    var proximaSql = proxima ? `'${proxima}'` : "NULL";

    var instrucaoSql = `
        INSERT INTO aplicacao_vacina (dt_aplicacao, dt_proxima_dose, fk_vacina, fk_gato)
        VALUES ('${aplicacao}', ${proximaSql}, ${idVacina}, ${idGato});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarCompra(idGato, marca, pesoKg, valor, data) {
    var marcaSql = marca ? `'${marca}'` : "NULL";

    var instrucaoSql = `
        INSERT INTO CompraRacao (marca, pesoKg, valor, dt_compra, fk_gato)
        VALUES (${marcaSql}, ${pesoKg}, ${valor}, '${data}', ${idGato});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarRacas,
    listarVacinas,
    listarGatos,
    cadastrarGato,
    registrarPesagem,
    registrarVacina,
    registrarCompra
};