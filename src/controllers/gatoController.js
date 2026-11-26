var gatoModel = require("../models/gatoModel");

function responder(promessa, res) {
    promessa
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarRacas(req, res) {
    responder(gatoModel.listarRacas(), res);
}

function listarVacinas(req, res) {
    responder(gatoModel.listarVacinas(), res);
}

function cadastrarGato(req, res) {
    var nome = req.body.nomeServer;
    var idRaca = req.body.idRacaServer;
    var nascimento = req.body.nascimentoServer;
    var idUsuario = req.body.idUsuarioServer;

    if (!nome || !idRaca || !idUsuario) {
        res.status(400).send("Informe o nome e a raça do gato!");
        return;
    }
    responder(gatoModel.cadastrarGato(nome, idRaca, nascimento, idUsuario), res);
}

function registrarPesagem(req, res) {
    var idGato = req.body.idGatoServer;
    var peso = Number(req.body.pesoServer);
    var data = req.body.dataServer;

    if (!idGato || isNaN(peso) || peso <= 0 || !data) {
        res.status(400).send("Informe o gato, um peso maior que zero e a data!");
        return;
    }
    responder(gatoModel.registrarPesagem(idGato, peso, data), res);
}

function registrarVacina(req, res) {
    var idGato = req.body.idGatoServer;
    var idVacina = req.body.idVacinaServer;
    var aplicacao = req.body.aplicacaoServer;
    var proxima = req.body.proximaServer;

    if (!idGato || !idVacina || !aplicacao) {
        res.status(400).send("Informe o gato, a vacina e a data da aplicação!");
        return;
    }
    responder(gatoModel.registrarVacina(idGato, idVacina, aplicacao, proxima), res);
}

function registrarCompra(req, res) {
    var idGato = req.body.idGatoServer;
    var marca = req.body.marcaServer;
    var pesoKg = Number(req.body.pesoKgServer);
    var valor = Number(req.body.valorServer);
    var data = req.body.dataServer;

    if (!idGato || isNaN(pesoKg) || pesoKg <= 0 || isNaN(valor) || valor <= 0 || !data) {
        res.status(400).send("Informe o gato, o peso do pacote, o valor e a data!");
        return;
    }
    responder(gatoModel.registrarCompra(idGato, marca, pesoKg, valor, data), res);
}

module.exports = {
    listarRacas,
    listarVacinas,
    cadastrarGato,
    registrarPesagem,
    registrarVacina,
    registrarCompra
};