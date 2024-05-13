var database = require("../database/config");

function buscarUltimosRegistros(idMaquina, limite_linhas) {

    var instrucaoSql = `select r.*, s.*, m.ram_total from registro r join sessao s on fk_sessao = id_sessao join maquina m on fk_maquina = id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc limit ${limite_linhas}`;

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
    buscarRegistrosEmTempoReal
}
