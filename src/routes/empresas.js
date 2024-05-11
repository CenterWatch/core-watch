var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
});
router.get("/buscarMatriz", function (req,res){
    empresaController.buscarMatriz(req, res);
})
router.get("/buscarFiliais", function (req, res){
    empresaController.buscarFiliais(req, res);
})
router.get("/buscarConfig", function (req, res) {
    empresaController.buscarConfigAtual(req, res);
})
router.post("/atualizarConfigAtualRegistro", function (req, res) {
    empresaController.atualizarConfigAtualRegistro(req, res);
})
module.exports = router;