var express = require("express");
var router = express.Router();

var artigoController = require("../controllers/artigoController");

router.get("/buscarArtigos", function (req,res){
    artigoController.buscarArtigos(req, res);
})

router.post("/cadastrarArtigo", function (req, res){
    artigoController.cadastrarArtigo(req, res);
})

router.delete("/excluirArtigo", function (req, res){
    artigoController.excluirArtigo(req, res);
})
module.exports = router;