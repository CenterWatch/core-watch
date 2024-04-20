var database = require("../database/config")

function cadastrarEndereco(logradouro,cep,numero,complemento,cidade,estado,nomeFantasia,razaoSocial,cnpj,matriz){
    var instrucaoSelect = `
        insert into endereco (logradouro,cep,numero,complemento,cidade,uf) values 
        ("${logradouro}","${cep}","${numero}","${complemento}","${cidade}","${estado}")
    ` 
    console.log("Executando a instrucao SQL (insert): \n "+instrucaoSelect);

    return database.executar(instrucaoSelect)
        .then(function (enderecoResultado) {
            var enderecoId = enderecoResultado.insertId;
            cadastrar(nomeFantasia,razaoSocial,cnpj,matriz,enderecoId)
        })
}


function cadastrar(nomeFantasia,razaoSocial,cnpj,matriz,enderecoId){
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    insert into empresa (nome_fantasia,razao_social,cnpj,fk_matriz,fk_endereco) values 
    ("${nomeFantasia}","${razaoSocial}","${cnpj}",${matriz},${enderecoId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMatriz(){
    var instrucao = `
        select nome_fantasia,id_empresa from empresa where fk_matriz is null;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEndereco,
    cadastrar,
    buscarMatriz
};