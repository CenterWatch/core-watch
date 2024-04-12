var maquinaModel = require("../models/maquinaModel");

function cadastrar(req, res){
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
        console.log("Erro: ",erro);
        res.status(500).json(erro.sqlMessage);
    })

}

module.exports = {
    cadastrar
}