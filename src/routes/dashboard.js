var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/gatos", function (req, res) {
    dashboardController.listarGatos(req, res);

});