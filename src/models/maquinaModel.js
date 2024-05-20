var database = require("../database/config")

function cadastrar(patrimonioEmpresa, so, cpu, ram, armazenamento, detalhes) {
    console.log("Acessei o model maquina");
    var instrucao = `
    insert into maquina (patrimonio, sistema_operacional, cpu, ram, armazenamento, detalhes) 
    values (${patrimonioEmpresa},"${so}","${cpu}", "${ram}","${armazenamento}","${detalhes}");
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(idEmpresa) {
    var instrucao = `select * from maquina where fk_empresa = ${idEmpresa}`;

    return database.executar(instrucao);
}

function buscarVolumesPorMaquina(idMaquina) {
    var instrucao = `select * from volume where fk_maquina = ${idMaquina}`;

    return database.executar(instrucao);
}

function buscarVolumesPorEmpresa(idEmpresa) {
    var instrucao = `select v.*, hostname from volume v join maquina on fk_maquina = id_maquina where fk_empresa = ${idEmpresa} order by hostname`;

    return database.executar(instrucao);
}

function verificarMaquinaOff(idSessao, idMaquina) {
    var instrucao = `select time_to_sec(timediff(now(), (select dt_hora from registro join sessao on fk_sessao = ${idSessao} where fk_maquina = ${idMaquina} order by dt_hora desc limit 1))) diferenca;`
    return database.executar(instrucao);
}

function buscarDadosRam(idMaquina) {
    var instrucao = `select ROUND((r.uso_ram/m.ram_total)*100,0) as porcentagem_uso,DATE_FORMAT(dt_hora,'%H:%i:%s') as hora from registro as r join sessao as s on r.fk_sessao = s.id_sessao join maquina as m on s.fk_maquina = m.id_maquina where fk_maquina = ${idMaquina} order by dt_hora desc limit 1;`
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listarMaquinas,
    buscarVolumesPorMaquina,
    buscarVolumesPorEmpresa,
    buscarDadosRam,
    verificarMaquinaOff
};