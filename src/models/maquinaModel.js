var database = require("../database/config")

function cadastrar(patrimonioEmpresa, so, cpu, ram, armazenamento, detalhes){
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

function verificarMaquinaOff(idSessao,idMaquina){
    var instrucao = `select time_to_sec(timediff(now(), (select dt_hora from registro join sessao on fk_sessao = ${idSessao} where fk_maquina = ${idMaquina} order by dt_hora desc limit 1))) diferenca;`
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listarMaquinas,
    verificarMaquinaOff
};