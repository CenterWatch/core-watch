var maquinaModel = require("../models/maquinaModel");

function cadastrar(req, res) {
    const patrimonioEmpresa = req.body;
    const so = req.body;
    const cpu = req.body;
    const ram = req.body;
    const armazenamento = req.body;
    const detalhes = req.body;

    maquinaModel.cadastrar(patrimonioEmpresa, so, cpu, ram, armazenamento, detalhes)
        .then(function (cadastroMaquina) {
            res.json(cadastroMaquina);
        })
        .catch(function (erro) {
            console.log("Houve um erro na tentativa de realizar cadastro da máquina");
            console.log("Erro: ", erro);
            res.status(500).json(erro.sqlMessage);
        })

}

function listarMaquinas(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    maquinaModel.listarMaquinas(idEmpresa)
        .then(
            function (resultadoListarMaquinas) {
                console.log(`\nResultados encontrados: ${resultadoListarMaquinas.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoListarMaquinas)}`);

                if (resultadoListarMaquinas.length != 0) {
                    console.log(resultadoListarMaquinas);

                    maquinaModel.buscarVolumesPorEmpresa(idEmpresa).then((resVolumes) => {
                        res.json({
                            maquinas: resultadoListarMaquinas,
                            volumes: resVolumes
                        });
                    }).catch((err) => {
                        
                    });
                    
                    
                } else {
                    res.status(403).send("Máquinas não encontradas!");
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as máquinas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarMaquinasEmAlerta(req,res){

    maquinaModel.buscarMaquinasEmAlerta()
    .then(function(resBuscar){
        res.json(resBuscar);
    })
    .catch(function(erro){
        console.log(erro)
        console.log(`Houve um erro ao realizar o select, erro`)
    })
}

function buscarChamadosRelacionados(req, res){
    var hostname = req.query.hostname;
    var idEmpresa = req.query.idEmpresa;

    maquinaModel.buscarChamadosRelacionados(hostname, idEmpresa)
        .then(function (result){
            res.json(result);
        })
        .catch(function (erro) {
            console.log(erro)
            console.log(`houve um erro ao realizar o select, erro: ${erro}`)
        })
}

module.exports = {
    cadastrar,
    listarMaquinas,
    buscarMaquinasEmAlerta,
    buscarChamadosRelacionados
}