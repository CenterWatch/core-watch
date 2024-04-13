var database = require("../database/config")

function cadastrar(nomeFantasia,razaoSocial,cnpj,filial){
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    insert into empresa values (default,"${nomeFantasia}","${razaoSocial}","${cnpj}",${filial});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarEmpresas(){
    var instrucao = `
        select nome_fantasia,id_empresa from  empresa;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    buscarEmpresas
};