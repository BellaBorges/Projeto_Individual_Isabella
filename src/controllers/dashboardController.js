var dashboardModel = require("../models/dashboardModel");

// Função auxiliar: envia o resultado do banco (ou o erro) para o navegador
function responder(promessa, res) {
    promessa
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no dashboard: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarGatos(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario)) {
        res.status(400).send("idUsuario inválido!");
        return;
    }
    responder(dashboardModel.listarGatos(idUsuario), res);
}

function buscarPesagens(req, res) {
    var idGato = Number(req.params.idGato);

    if (isNaN(idGato)) {
        res.status(400).send("idGato inválido!");
        return;
    }
    responder(dashboardModel.buscarPesagens(idGato), res);
}

function buscarCompras(req, res) {
    var idGato = Number(req.params.idGato);

    if (isNaN(idGato)) {
        res.status(400).send("idGato inválido!");
        return;
    }
    responder(dashboardModel.buscarCompras(idGato), res);
}

function buscarVacinas(req, res) {
    var idGato = Number(req.params.idGato);

    if (isNaN(idGato)) {
        res.status(400).send("idGato inválido!");
        return;
    }
    responder(dashboardModel.buscarVacinas(idGato), res);
}

module.exports = {
    listarGatos,
    buscarPesagens,
    buscarCompras,
    buscarVacinas
};