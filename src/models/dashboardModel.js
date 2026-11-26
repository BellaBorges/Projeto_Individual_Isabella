var database = require("../database/config");

function listarGatos(idUsuario) {
    var instrucaoSql = `
        SELECT id_gato, nome FROM gato WHERE fk_usuario = ${idUsuario} ORDER BY nome ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPesagens(idGato) {
    var instrucaoSql = `
        SELECT peso, dt_pesagem FROM pesagem WHERE fk_gato = ${idGato} ORDER BY dt_pesagem ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCompras(idGato) {
    var instrucaoSql = `
        SELECT marca, pesoKg, valor, dt_compra FROM CompraRacao WHERE fk_gato = ${idGato} ORDER BY dt_compra ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarVacinas(idGato) {
    var instrucaoSql = `
        SELECT vacina.nome, aplicacao_vacina.dt_aplicacao, aplicacao_vacina.dt_proxima_dose
        FROM aplicacao_vacina
        JOIN vacina ON aplicacao_vacina.fk_vacina = vacina.id_vacina
        WHERE aplicacao_vacina.fk_gato = ${idGato}
        ORDER BY aplicacao_vacina.dt_aplicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarGatos,
    listarPesagens,
    listarCompras,
    listarVacinas
};