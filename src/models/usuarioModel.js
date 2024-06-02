var database = require('../database/config')

function autenticar(usuario, senha) {
    var instrucao = `
    SELECT * FROM usuario join funcionario ON id_funcionario = id_usuario join empresa ON fk_empresa = id_empresa WHERE username = '${usuario}' AND senha = '${senha}';
    `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao)
}

function buscarSessao(idUsuario){
    var instrucao = `select top 1 * from sessao where fk_usuario = ${idUsuario} order by dt_hora_sessao desc;`
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
}

function listar() {
    var instrucao = `
        select primeiro_nome, sobrenome, email, cargo from funcionario;
    `
    console.log('Executando a instrução: '+instrucao);
    return database.executar(instrucao);
}

function cadastrarEndereco(nome, sobrenome, celular, telefone, email, nasc, usuario, gerente, empresa, cpf, cargo, logradouro, cep, num, bairro, compl, cidade, uf) {
    var instrucao = `
        insert into endereco (logradouro, cep, numero, bairro, complemento, cidade, uf)
        values ('${logradouro}','${cep}','${num}','${bairro}','${compl}','${cidade}','${uf}')
    `

    return database.executar(instrucao)
    .then(function (funcResultado) {
        var id_endereco = funcResultado.insertId;
        cadastrarFunc(nome, sobrenome, celular, telefone, email, nasc, usuario, gerente, empresa, cpf, cargo, id_endereco);
    })
}

function cadastrarFunc(nome, sobrenome, celular, telefone, email, nasc, usuario, gerente, empresa, cpf, cargo, id_endereco){
    var instrucao = `
        insert into funcionario (primeiro_nome, sobrenome, celular, telefone, email, dt_nasc, cpf, cargo, fk_gerente, fk_endereco, fk_empresa)
        values ('${nome}', '${sobrenome}', '${celular}', '${telefone}', '${email}', '${nasc}', '${cpf}', '${cargo}', ${gerente}, ${id_endereco}, ${empresa})
    `

    return database.executar(instrucao)
    .then(function (funcResultado) {
        var id_funcionario = funcResultado.insertId;
        cadastrarUser(usuario, id_funcionario);
    })
}

function cadastrarUser(usuario, id_funcionario){
    var instrucao  = `
        insert into usuario (username, id_usuario)
        values ('${usuario}', ${id_funcionario});
    `
    return database.executar(instrucao);
}

function listarOperadores(idGerente){
    var instrucao = `select f.*, e.*, u.username from funcionario f join usuario u on u.id_usuario = f.id_funcionario join endereco e on f.fk_endereco = e.id_endereco join funcionario g on g.id_funcionario = f.fk_gerente where g.id_funcionario = ${idGerente} and f.cargo = 'Operador';`
    return database.executar(instrucao);
}

function cadastrarChamado(titulo, descricao, tipo, fk_sessao){
    var instrucao =`insert into ocorrencia (titulo, descricao, tipo, fk_sessao)
                    values ('${titulo}','${descricao}', '${tipo}', ${fk_sessao});
    `
    return database.executar(instrucao);
}

function listarChamados(){
    var instrucao = `select o.titulo, o.descricao, o.criado_em, o.tipo, o.fk_atribuido 
    from ocorrencia as o join sessao as s on o.fk_sessao = s.id_sessao join usuario as u on s.fk_usuario = u.id_usuario join funcionario as f on u.id_usuario = f.id_funcionario; 
    `
    return database.executar(instrucao);
}
function buscarChamadosPorFuncionario(idFuncionario){
    var instrucao=`select * from ocorrencia where idFuncionario = ${idFuncionario}; 
    `
    return database.executar(instrucao);
}

function atribuirTarefa(idOperador, idGerente, tarefa, dtEstimada, prioridade){
    var instrucao=`insert into tarefa (descricao, dt_fim, dt_inicio,fk_funcionario,fk_gerente,prioridade)
                    values ('${tarefa}','${dtEstimada}',getdate(),${idOperador},${idGerente},'${prioridade}');
    `
    return database.executar(instrucao);
}

function realizarFeedback(nota, detalhe, idOperador, fkQuest){
    var instrucao = `
                    insert into questionario (nota, detalhe, fk_funcionario, fk_quest)  values (${nota},'${detalhe}',${idOperador},${fkQuest});
                    `
    console.log('Executando a instrução: '+instrucao);
    return database.executar(instrucao);
}

function buscarTarefas(idOperador){
    var instrucao = `
    select id_tarefa, format(dt_inicio, 'dd/MM/yyyy') as dt_inicio, format(dt_fim, 'dd/MM/yyyy') as dt_fim, descricao, prioridade, concluida from tarefa where fk_funcionario = ${idOperador};
    `
    return database.executar(instrucao);
}

function buscarChamadosOperador(idOperador){
    var instrucao = `
    select * from ocorrencia join sessao on fk_sessao = id_sessao join usuario on id_sessao = fk_sessao join funcionario on id_usuario = id_funcionario  where id_funcionario = ${idOperador} and tipo not like '%SISTEMA%';
    `
    return database.executar(instrucao);
}

function concluirTarefa(idTarefa) {
    var instrucao = `
    update tarefa set concluida=true, dt_hora_concluida=getdate() where id_tarefa=${idTarefa};
    `
    return database.executar(instrucao);
}

function editarFunc(idFunc, idEnd, nome, sobrenome, celular, telefone, email, cpf, cargo, usuario, dtNascimento, logradouro, cep, num, bairro, compl, cidade, uf) {
    var instrucao = `
    update endereco set logradouro='${logradouro}', cep='${cep}', numero='${num}', bairro='${bairro}', complemento='${compl}', cidade='${cidade}', uf='${uf}' where id_endereco=${idEnd};
    `
    return database.executar(instrucao)
    .then(function () {
        var instrucao = `
        update funcionario set primeiro_nome='${nome}', sobrenome='${sobrenome}', celular='${celular}', telefone='${telefone}', email='${email}', cpf='${cpf}', cargo='${cargo}', dt_nasc='${dtNascimento}' where id_funcionario=${idFunc};
        `
        return database.executar(instrucao)
        .then(function () {
            var instrucao = `
            update usuario set username='${usuario}' where id_usuario=${idFunc};
            `
            return database.executar(instrucao)
        })
    })
}

function verificaFb(idFunc){
    var instrucao = `
    select * from questionario join funcionario on id_funcionario = fk_funcionario where id_funcionario = ${idFunc} and respondido_em > (select top 1 inicio from agendamento_quest order by inicio desc) and respondido_em < (select top 1 fim from agendamento_quest order by inicio desc) and (select top 1 inicio from agendamento_quest order by inicio desc) > getdate();
    `
    return database.executar(instrucao);
}

function buscarFeedbacks(idFunc, idConfig){
    var instrucao = `
    select * from agendamento_quest where (inicio < getdate()) and (fim > getdate()) and fk_config =  ${idConfig} and (select count(*) from questionario where fk_quest = (select id_quest from agendamento_quest where (inicio < getdate()) and (fim > getdate())) and fk_funcionario = ${idFunc}) = 0 order by inicio;
    `
    console.log('Executando a instrução: '+instrucao);
    return database.executar(instrucao);
}

function buscarChamadosSuporte(idEmpresa, idFuncionario){
    var instrucao = `
    select * from ocorrencia join sessao on fk_sessao = id_sessao join usuario on fk_usuario = id_usuario join funcionario on id_usuario = id_funcionario where fk_empresa = ${idEmpresa} and (fk_atribuido is null or fk_atribuido = ${idFuncionario}) and tipo not like '%SISTEMA%';
    ` // Busca todos os chamados, vamos filtrar pelo front para não fazer 3 requisicoes para cada status do chamado
    return database.executar(instrucao);
}

function buscarUltimaOciosidade(idFuncionario) {
    var instrucao = `
    select top 1 round(tempo_registro_ms/1000, 0, 2) ocioso_a, datediff(second, dt_hora_registro, getdate()) tempo from tempo_ociosidade where fk_usuario = ${idFuncionario} order by dt_hora_registro desc;
    `
    return database.executar(instrucao);
}

function atribuirChamado(idFuncionario, idOcorrencia) {
    var instrucao = `
    update ocorrencia set fk_atribuido = ${idFuncionario} where id_ocorrencia = ${idOcorrencia};
    `
    return database.executar(instrucao);
}

function concluirChamado(idOcorrencia) {
    var instrucao = `
    update ocorrencia set resolvido=true, resolvido_em=getdate() where id_ocorrencia = ${idOcorrencia};
    `
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    listar,
    cadastrarEndereco,
    cadastrarFunc,
    cadastrarUser,
    listarOperadores,
    cadastrarChamado,
    listarChamados,
    buscarSessao,
    buscarChamadosPorFuncionario,
    atribuirTarefa,
    realizarFeedback,
    buscarTarefas,
    buscarChamadosOperador,
    concluirTarefa,
    editarFunc,
    verificaFb,
    buscarFeedbacks,
    buscarChamadosSuporte,
    buscarUltimaOciosidade,
    atribuirChamado,
    concluirChamado
};