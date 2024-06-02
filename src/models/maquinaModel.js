var database = require('../database/config')

function cadastrar(patrimonioEmpresa, so, cpu, ram, armazenamento, detalhes) {
    console.log('Acessei o model maquina');
    var instrucao = `
    insert into maquina (patrimonio, sistema_operacional, cpu, ram, armazenamento, detalhes) 
    values (${patrimonioEmpresa},'${so}','${cpu}', '${ram}','${armazenamento}','${detalhes}');
    `
    console.log('Executando a instrução SQL: \n' + instrucao);
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

function buscarMaquinasEmAlerta(){
    var instrucao =`SELECT maquina.hostname,alerta.tipo, registro.dt_hora
    FROM maquina
    JOIN sessao ON maquina.id_maquina = sessao.fk_maquina
    JOIN registro ON sessao.id_sessao = registro.fk_sessao
    JOIN alerta ON registro.id_registro = alerta.fk_registro
    WHERE registro.dt_hora = (
        SELECT MAX(registro.dt_hora)
        FROM registro 
        JOIN alerta ON registro.id_registro = alerta.fk_registro
    )
    ORDER BY registro.dt_hora DESC;`
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listarMaquinas,
    buscarVolumesPorMaquina,
    buscarVolumesPorEmpresa,
    buscarMaquinasEmAlerta
};