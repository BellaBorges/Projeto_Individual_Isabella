var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/gatos/:idUsuario", function (req, res) {
    dashboardController.listarGatos(req, res);
});

router.get("/pesagens/:idGato", function (req, res) {
    dashboardController.listarPesagens(req, res);
});

router.get("/compras/:idGato", function (req, res) {
    dashboardController.listarCompras(req, res);
});

router.get("/vacinas/:idGato", function (req, res) {
    dashboardController.listarVacinas(req, res);
});

module.exports = router;