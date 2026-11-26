var dashboardModel = require("../models/dashboardModel");

function responder(promessa, res) {
    promessa
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro no servidor");
        });
}

function listarGatos(req, res) {
    var idUsuario = req.params.idUsuario;

    if (isNaN(Number(idUsuario))) {
        res.status(400).send("Usuário inválido!");
        return;
    }
    responder(dashboardModel.listarGatos(idUsuario), res);
}

function listarPesagens(req, res) {
    var idGato = req.params.idGato;

    if (isNaN(Number(idGato))) {
        res.status(400).send("Gato inválido!");
        return;
    }
    responder(dashboardModel.listarPesagens(idGato), res);
}

function listarCompras(req, res) {
    var idGato = req.params.idGato;

    if (isNaN(Number(idGato))) {
        res.status(400).send("Gato inválido!");
        return;
    }
    responder(dashboardModel.listarCompras(idGato), res);
}

function listarVacinas(req, res) {
    var idGato = req.params.idGato;

    if (isNaN(Number(idGato))) {
        res.status(400).send("Gato inválido!");
        return;
    }
    responder(dashboardModel.listarVacinas(idGato), res);
}

module.exports = {
    listarGatos,
    listarPesagens,
    listarCompras,
    listarVacinas
};