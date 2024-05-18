var artigoModel = require("../models/artigoModel");

function buscarArtigos(req, res){
    var idEmpresa = req.query.idEmpresaServer;
    var pesquisa = req.query.pesquisaServer;

    artigoModel.buscarArtigos(idEmpresa, pesquisa)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ",error);
            res.status(500).json({error: "Erro interno do servidor"});
        })
}

function cadastrarArtigo(req, res){
    var idSuporte = req.body.idSuporteServer;
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var categoria =  req.body.categoriaServer;
    var palavras = req.body.palavrasChaveServer;

    artigoModel.cadastrarArtigo(idSuporte, titulo, descricao, categoria, palavras)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ",error);
        res.status(500).json({error: "Erro interno do servidor"});
    })
}

module.exports = {
    buscarArtigos,
    cadastrarArtigo
}