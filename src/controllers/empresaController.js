    var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var razaoSocial = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var matriz = req.body.matrizServer;

    var logradouro = req.body.logradouroServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;

    if(matriz == ''){
        matriz = null
    }


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Razão social está indefinida!");
    } else {

            empresaModel.cadastrarEndereco(logradouro,cep,numero,complemento,cidade,estado,nome,razaoSocial,cnpj,matriz)
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

function buscarMatriz(req,res){
    empresaModel.buscarMatriz()
    .then(function (buscaResultado){
        res.json(buscaResultado);
    })
    .catch(function (erro){
        console.log(erro);
        console.log("\nHouve um erro ao realizar o select!  Erro: ",erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarFiliais(req, res){
    var idEmpresa = req.query.idEmpresa;
    empresaModel.buscarFiliais(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar select, erro: ${erro}`)
    })
}

function buscarFunc(req, res){
    var idEmpresa = req.query.idEmpresa;
    empresaModel.buscarFunc(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarConfigAtual(req, res){
    var idEmpresa = req.query.id_empresa;
    
    empresaModel.buscarConfigAtual(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarConfig(req, res){
    var idEmpresa = req.query.id_empresa;
    
    empresaModel.buscarConfig(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function atualizarConfigAtualRegistro(req, res){
    var idEmpresa = req.body.id_empresaServer;
    var ram = req.body.ramServer;
    var cpu = req.body.cpuServer;
    var int = req.body.intServer;

    int *= 1000;

    empresaModel.atualizarConfigAtualRegistro(idEmpresa,ram,cpu,int)
    .then(function (resUpdate){
        res.json(resUpdate);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function atualizarConfigAtualVolume(req, res){
    var idEmpresa = req.body.id_empresaServer;
    var vol = req.body.volServer;
    var int = req.body.intVolServer;

    int *= 1000;

    empresaModel.atualizarConfigAtualVolume(idEmpresa,vol,int)
    .then(function (resUpdate){
        res.json(resUpdate);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarTarefasAtrasadas(req, res){
    var idEmpresa = req.query.idEmpresa;

    empresaModel.buscarTarefasAtrasadas(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarOperadoresComMaisTarefasAtrasadas(req, res){
    var idEmpresa = req.query.idEmpresa;

    empresaModel.buscarOperadoresComMaisTarefasAtrasadas(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarSatisfacaoOperadores(req, res){
    var idEmpresa = req.query.idEmpresa;

    empresaModel.buscarSatisfacaoOperadores(idEmpresa)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function cadastrarFeedback(req, res){
    var dtInicio = req.body.dtInicioServer;
    var dtFim = req.body.dtFimServer;
    var idEmpresa = req.body.idEmpresaServer;

    empresaModel.cadastrarFeedback(dtInicio,dtFim,idEmpresa)
    .then(function (resCadastro){
        res.json(resCadastro);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarTempoNoUltimoPeriodo(req, res){
    var idGerente = req.query.idGerente;
    var periodo = req.query.periodo;
    var ordem = req.query.ordem;
    console.log(ordem)

    empresaModel.buscarTempoNoUltimoPeriodo(periodo, idGerente, ordem)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

function buscarUltimasTarefasConcluidas(req, res) {
    var idGerente = req.query.idGerente;

    empresaModel.buscarUltimasTarefasConcluidas(idGerente)
    .then(function (resBuscar){
        res.json(resBuscar);
    })
    .catch(function (erro){
        console.log(erro)
        console.log(`houve um erro ao realizar o select, erro: ${erro}`)
    })
}

module.exports = {
    cadastrar,
    buscarMatriz,
    buscarFiliais,
    buscarFunc,
    buscarConfigAtual,
    atualizarConfigAtualRegistro,
    atualizarConfigAtualVolume,
    buscarTarefasAtrasadas,
    buscarOperadoresComMaisTarefasAtrasadas,
    buscarSatisfacaoOperadores,
    cadastrarFeedback,
    buscarTempoNoUltimoPeriodo,
    buscarUltimasTarefasConcluidas,
    buscarConfig
}