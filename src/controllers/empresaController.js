var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var razaoSocial = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var filial = req.body.filialServer;

    if(filial == false){
        filial = null;
    }else{
        filial = null;
    }

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Razão social está indefinida!");
    } else {

            empresaModel.cadastrar(nome,razaoSocial,cnpj,filial)
            .then(function (cadastroResultado) {
                res.json(cadastroResultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        
    }

}

module.exports = {
    cadastrar
}