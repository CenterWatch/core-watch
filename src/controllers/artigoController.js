var artigoModel = require("../models/artigoModel");

function buscarArtigos(req, res){
    var idEmpresa = req.query.idEmpresaServer;

    artigoModel.buscarArtigos(idEmpresa)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ",error);
            res.status(500).json({error: "Erro interno do servidor"});
        })
}

module.exports = {
    buscarArtigos
}