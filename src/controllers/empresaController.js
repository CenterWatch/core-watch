var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var razaoSocial = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var filial = req.body.filialServer;

    var logradouro = req.body.logradouroServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;

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

            empresaModel.cadastrarEndereco(logradouro,cep,numero,complemento,cidade,estado,nome,razaoSocial,cnpj,filial)
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

function buscarEmpresas(req,res){
    empresaModel.buscarEmpresas()
    .then(function (buscaResultado){
        res.json(buscaResultado);
    })
    .catch(function (erro){
        console.log(erro);
        console.log("\nHouve um erro ao realizar o select!  Erro: ",erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar,
    buscarEmpresas
}