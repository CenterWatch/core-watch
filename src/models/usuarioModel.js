var database = require("../database/config")

function autenticar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha)
    var instrucao = `
    SELECT * FROM usuario join funcionario join empresa WHERE fk_empresa = id_empresa and username = '${usuario}' AND senha = '${senha}' and id_usuario = id_funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

function buscarSessao(idUsuario){
    var  instrucao = `select * from sessao where fk_usuario = ${idUsuario} order by dt_hora_sessao desc limit 1;`
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

function cadastrarFunc(nome, sobrenome, celular, telefone, email, usuario, senha, gerente, empresa, cpf, cargo){
    var instrucao = `
        insert into funcionario (primeiro_nome, sobrenome, celular, telefone, email, fk_gerente, fk_empresa,cpf,cargo)
        values ('${nome}','${sobrenome}','${celular}','${telefone}','${email}',${gerente},${empresa},'${cpf}','${cargo}')
    `

    return database.executar(instrucao)
    .then(function (funcResultado) {
        var id_funcionario = funcResultado.insertId;
        cadastrarUser(usuario, senha, id_funcionario);
    })
}

function cadastrarUser(usuario, senha, id_funcionario){
    var instrucao  = `
        insert into usuario (username, senha, id_usuario)
        values ('${usuario}', '${senha}', ${id_funcionario});
    `
    return database.executar(instrucao);
}

function listarOperadores(idGerente){
    var instrucao = `select f.* from funcionario f join funcionario g on g.id_funcionario = f.fk_gerente where g.id_funcionario = ${idGerente} and f.cargo = 'Operador';`
    return database.executar(instrucao);
}

function cadastrarChamado(titulo, descricao, tipo, fk_sessao){
    var instrucao =`insert into ocorrencia (titulo, descricao, tipo, fk_sessao)
                    values ('${titulo}','${descricao}', '${tipo}', ${fk_sessao});
    `
    return database.executar(instrucao);
}

function listarChamados(){
    var instrucao = `select o.titulo, o.descricao, o.dt_hora, o.tipo, o.fk_atribuido 
    from ocorrencia as o join sessao as s on o.fk_sessao = s.id_sessao join usuario as u on s.fk_usuario = u.id_usuario join funcionario as f on u.id_usuario = f.id_funcionario; 
    `
    return database.executar(instrucao);
}
function buscarChamadosPorFuncionario(idFuncionario){
    var instrucao=`select * from ocorrencia where idFuncionario = ${idFuncionario}; 
    `
    return database.executar(instrucao);
    
}
module.exports = {
    autenticar,
    listar,
    cadastrarFunc,
    cadastrarUser,
    listarOperadores,
    cadastrarChamado,
    listarChamados,
    buscarSessao,
    buscarChamadosPorFuncionario
};