var express = require("express");
var router = express.Router();

var gatoController = require("../controllers/gatoController");

router.get("/racas", function (req, res) {
    gatoController.listarRacas(req, res);
});

router.get("/vacinas", function (req, res) {
    gatoController.listarVacinas(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    gatoController.listarGatos(req, res);
});

router.post("/cadastrar", function (req, res) {
    gatoController.cadastrarGato(req, res);
});

router.post("/pesagem", function (req, res) {
    gatoController.registrarPesagem(req, res);
});

router.post("/vacina", function (req, res) {
    gatoController.registrarVacina(req, res);
});

router.post("/compra", function (req, res) {
    gatoController.registrarCompra(req, res);
});

module.exports = router;