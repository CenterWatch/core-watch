var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/ultimos/:idMaquina", function (req, res) {
    registroController.buscarUltimosRegistros(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    registroController.buscarRegistrosEmTempoReal(req, res);
})

module.exports = router;