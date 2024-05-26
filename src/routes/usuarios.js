var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.get("/listar", function(req, res){
    usuarioController.listar(req, res);
})
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
router.get("/listarOperadores",  function (req, res){
    usuarioController.listarOperadores(req, res);
})

router.get("/buscarSessao",  function (req, res){
    usuarioController.buscarSessao(req, res);
})

router.post("/cadastrarChamado", function (req, res){
    usuarioController.cadastrarChamado(req, res);
})

router.get("/listarChamados", function (req, res){
    usuarioController.listarChamados(req,res);
})

router.post("/atribuirTarefa", function (req, res){
    usuarioController.atribuirTarefa(req,res);
})

router.post("/realizarFeedback", function (req, res){
    usuarioController.realizarFeedback(req,res);
})

router.get("/buscarTarefas", function (req, res){
    usuarioController.buscarTarefas(req, res);
})

router.get("/buscarChamadosOperador", function (req, res){
    usuarioController.buscarChamadosOperador(req, res);
})

router.post("/concluirTarefa", function (req, res){
    usuarioController.concluirTarefa(req, res);
})

module.exports = router;