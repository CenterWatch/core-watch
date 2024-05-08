var database = require("../database/config")

function buscarArtigos(idEmpresa) {
    var instrucao = `
        select a.* from empresa e join funcionario f on e.id_empresa = f.fk_empresa join artigo a on a.fk_funcionario = f.id_funcionario;
    `
    console.log("Executando a instrução: "+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarArtigos
};