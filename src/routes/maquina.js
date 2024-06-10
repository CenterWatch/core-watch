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

router.get("/buscarMaquinasEmAlerta", function (req, res) {
    maquinaController.buscarMaquinasEmAlerta(req, res);
})

router.get("/buscarChamadosRelacionados", function (req, res){
    maquinaController.buscarChamadosRelacionados(req, res);
})

router.get("/buscarListaProcessos", function (req, res) {
    maquinaController.buscarListaProcessos(req, res);
})

router.put("/updateListaProcessos", function (req, res){
    console.log(req)
    maquinaController.updateListaProcessos(req, res);
})

router.get("/buscarAlertaComponentes", function (req, res){
    console.log(req)
    maquinaController.buscarAlertaComponentes(req, res);
})

router.get("/buscarAlertaVolume", function (req, res){
    console.log(req)
    maquinaController.buscarAlertaVolume(req, res);
})
module.exports = router;