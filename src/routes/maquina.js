var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
});

router.post("/listarMaquinas", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});

module.exports = router;