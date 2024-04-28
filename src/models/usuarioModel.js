var database = require("../database/config")

function autenticar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha)
    var instrucao = `
    SELECT id_funcionario,username, primeiro_nome, sobrenome, razao_social, id_empresa, cargo  FROM usuario join funcionario join empresa WHERE fk_empresa = id_empresa and username = '${usuario}' AND senha = '${senha}' and id_usuario = id_funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(){
    var instrucao = `
        select primeiro_nome, sobrenome, email, cargo from funcionario;
    `
    console.log("Executando a instrução: "+instrucao);
    return database.executar(instrucao);
}

function cadastrarFunc(nome,sobrenome,celular,telefone,email,usuario,senha, gerente, empresa,cpf){
    var instrucao = `
        insert into funcionario (primeiro_nome, sobrenome, celular, telefone, email, fk_gerente, fk_empresa,cpf)
        values ('${nome}','${sobrenome}','${celular}','${telefone}','${email}',${gerente},${empresa},'${cpf}')
    `

    return database.executar(instrucao)
    .then(function (funcResultado) {
        var id_funcionario = funcResultado.insertId;
        cadastrarUser(usuario, senha, id_funcionario);
    })
}

function cadastrarUser(usuario, senha, id_funcionario){
    var instrucao  = `
        insert into usuario (usuario, senha, id_usuario)
        values ('${usuario}', '${senha}', ${id_funcionario});
    `
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    listar,
    cadastrarFunc,
    cadastrarUser
};