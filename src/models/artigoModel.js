var database = require("../database/config")

function buscarArtigos(idEmpresa, pesquisa) {
    var instrucao = `
    select a.*,f.* from empresa e join funcionario f on e.id_empresa = f.fk_empresa join artigo a on a.fk_funcionario = f.id_funcionario where fk_empresa = ${idEmpresa} and (titulo like "%${pesquisa}%" or descricao like "%${pesquisa}%" or categoria like "%${pesquisa}%" or palavra_chave like "%${pesquisa}%");
    `
    console.log("Executando a instrução: "+instrucao);
    return database.executar(instrucao);
}

function cadastrarArtigo(idSuporte, titulo, descricao, categoria, palavras){
    var instrucao = `
    insert into artigo (titulo, descricao, categoria, fk_funcionario, palavra_chave)  values  ('${titulo}','${descricao}','${categoria}',${idSuporte},'${palavras}');
    `
    return database.executar(instrucao);
}

function excluirArtigo(idArtigo) {
    var instrucao = `
    delete from artigo where id_artigo=${idArtigo};
    `
    console.log("Executando a instrução: "+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarArtigos,
    cadastrarArtigo,
    excluirArtigo
};