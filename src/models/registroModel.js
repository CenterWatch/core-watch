var database = require("../database/config");

function buscarUltimosRegistros(idMaquina, limite_linhas) {

    var instrucaoSql = `select top ${limite_linhas} r.*, s.*, m.ram_total from registro r join sessao s on fk_sessao = id_sessao join maquina m on fk_maquina = id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistrosEmTempoReal(idMaquina) {

    var instrucaoSql = `select top 1 r.*, s.*, m.ram_total from registro r join sessao s on fk_sessao = id_sessao join maquina m on fk_maquina = id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal
}
