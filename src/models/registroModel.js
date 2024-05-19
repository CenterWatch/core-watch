var database = require("../database/config");

function buscarUltimosRegistros(idMaquina, limite_linhas) {

    var instrucaoSql = `select r.*, s.*, m.ram_total from registro r join sessao s on fk_sessao = id_sessao join maquina m on fk_maquina = id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc limit ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimosRegistrosVolume(hostname, limite_linhas) {

    var instrucaoSql = `select r.*, v.volume_total from registro_volume r join sessao s on r.fk_sessao = s.id_sessao join volume v on r.fk_volume = v.uuid join maquina m on m.id_maquina = s.fk_maquina where hostname = "${hostname}" order by dt_hora desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistrosEmTempoReal(idMaquina) {

    var instrucaoSql = `select r.*, s.*, m.ram_total from registro r join sessao s on fk_sessao = id_sessao join maquina m on fk_maquina = id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal,
    buscarUltimosRegistrosVolume
}
