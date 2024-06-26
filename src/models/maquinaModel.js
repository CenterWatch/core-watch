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

function buscarListaProcessos(idEmpresa) {
    var instrucao = `select * from perm_processo where fk_config = ${idEmpresa};`;

    return database.executar(instrucao);
}

function updateListaProcessos(idEmpresa, nome, permitido) {
    var instrucao = `update perm_processo set permitido = '${permitido}' where nome = '${nome}' and fk_config = ${idEmpresa};`;

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

function buscarAlertaComponentes(idEmpresa){
    var instrucao =`select count(id_registro) as qtd from maquina join sessao on fk_maquina = id_maquina join registro on fk_sessao = id_sessao 
    where ((uso_cpu > (select max_cpu from config where id_config = ${idEmpresa})) 
    or (CAST((uso_ram * 100.0) / (uso_ram + disponivel_ram) AS DECIMAL(5, 2)) > (select max_ram from config where id_config = ${idEmpresa}))) 
    and (select DATEADD(ms, -(select intervalo_registro_ms from config where id_config = ${idEmpresa}), GETDATE())) < dt_hora;`
    return database.executar(instrucao);
}

function buscarAlertaVolume(idEmpresa){
    var instrucao =`select count(*) as qtd, fk_maquina from volume v join registro_volume rv on v.uuid = rv.fk_volume 
    where cast(((v.volume_total - rv.volume_disponivel) * 100.0) / v.volume_total as decimal(5, 2)) > (select max_volume from config where id_config = ${idEmpresa}) 
    and rv.dt_hora > dateadd(ms, -(select intervalo_volume_ms from config where id_config = ${idEmpresa}), getdate()) group by fk_maquina;`
    return database.executar(instrucao);
}

function buscarChamadosRelacionados(hostname,idEmpresa){
    var instrucao = `
    select * from ocorrencia join sessao on fk_sessao = id_sessao join maquina on fk_maquina = id_maquina where tipo not like '%SISTEMA%' and hostname = '${hostname}' and fk_empresa = ${idEmpresa};
    `

    console.log(instrucao)
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listarMaquinas,
    buscarVolumesPorMaquina,
    buscarVolumesPorEmpresa,
    buscarChamadosRelacionados,
    buscarMaquinasEmAlerta,
    buscarListaProcessos,
    updateListaProcessos,
    buscarAlertaComponentes,
    buscarAlertaVolume
};