var javaModel = require("../models/javaModel");

function loginJava(req, res){
    var user = req.body;

    javaModel.loginJava(user)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ",error);
            res.status(500).json({error: "Erro interno do servidor"});
        })
}

function logout(req, res){
    javaModel.logout()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ",error);
            res.status(500).json({error: "Erro interno do servidor"});
        })
}

module.exports = {
    loginJava,
    logout
}