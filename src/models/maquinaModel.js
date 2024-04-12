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

module.exports = {
    cadastrar
};