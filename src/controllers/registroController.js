var registroModel = require("../models/registroModel");

function buscarUltimosRegistros(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} registros`);

    registroModel.buscarUltimosRegistros(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimosRegistrosVolume(req, res) {

    const limite_linhas = 7;

    var hostname = req.params.hostname;

    console.log(`Recuperando as ultimas ${limite_linhas} registros`);

    registroModel.buscarUltimosRegistrosVolume(hostname, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarRegistrosEmTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando registros em tempo real`);

    registroModel.buscarRegistrosEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTempoRealVolume(req, res) {

    var uuid = req.params.uuid;

    console.log(`Recuperando registros em tempo real`);

    registroModel.buscarTempoRealVolume(uuid).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimosRegistros,
    buscarUltimosRegistrosVolume,
    buscarRegistrosEmTempoReal,
    buscarTempoRealVolume
}