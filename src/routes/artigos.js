var express = require("express");
var router = express.Router();

var artigoController = require("../controllers/artigoController");

router.get("/buscarArtigos", function (req,res){
    artigoController.buscarArtigos(req, res);
})

module.exports = router;