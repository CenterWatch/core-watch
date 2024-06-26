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
router.get("/buscarConfigAtual", function (req, res) {
    empresaController.buscarConfigAtual(req, res);
})
router.get("/buscarConfig", function (req, res) {
    empresaController.buscarConfig(req, res);
})
router.post("/atualizarConfigAtualRegistro", function (req, res) {
    empresaController.atualizarConfigAtualRegistro(req, res);
})
router.post("/atualizarConfigAtualVolume", function (req, res) {
    empresaController.atualizarConfigAtualVolume(req, res);
})
router.get("/buscarFunc", function (req, res){
    empresaController.buscarFunc(req, res);
})
router.get("/buscarTarefasAtrasadas", function (req, res){
    empresaController.buscarTarefasAtrasadas(req, res);
})
router.get("/buscarOperadoresComMaisTarefasAtrasadas", function (req, res){
    empresaController.buscarOperadoresComMaisTarefasAtrasadas(req, res);
})
router.get("/buscarSatisfacaoOperadores", function (req, res){
    empresaController.buscarSatisfacaoOperadores(req, res);
})
router.post("/cadastrarFeedback", function (req, res){
    empresaController.cadastrarFeedback(req, res);
})
router.get("/buscarTempoNoUltimoPeriodo", function (req, res){
    empresaController.buscarTempoNoUltimoPeriodo(req, res);
})
router.get("/buscarUltimasTarefasConcluidas", function (req, res){
    empresaController.buscarUltimasTarefasConcluidas(req, res);
})
router.get("/buscarSessoes", function (req, res){
    empresaController.buscarSessoes(req, res);
})
module.exports = router;