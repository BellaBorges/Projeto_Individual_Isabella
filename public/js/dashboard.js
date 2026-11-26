var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// GET /dashboard/gatos/1      -> gatos da usuária 1
router.get("/gatos/:idUsuario", function (req, res) {
    dashboardController.listarGatos(req, res);
});

// GET /dashboard/pesagens/3   -> pesagens do gato 3
router.get("/pesagens/:idGato", function (req, res) {
    dashboardController.buscarPesagens(req, res);
});

// GET /dashboard/compras/3    -> compras de ração do gato 3
router.get("/compras/:idGato", function (req, res) {
    dashboardController.buscarCompras(req, res);
});

// GET /dashboard/vacinas/3    -> vacinas do gato 3
router.get("/vacinas/:idGato", function (req, res) {
    dashboardController.buscarVacinas(req, res);
});

module.exports = router;