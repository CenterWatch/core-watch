var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id_funcionario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].primeiro_nome,
                            sobrenome: resultadoAutenticar[0].sobrenome,
                            usuario: resultadoAutenticar[0].username,
                            empresa: resultadoAutenticar[0].razao_social,
                            id_empresa: resultadoAutenticar[0].id_empresa,
                            cargo: resultadoAutenticar[0].cargo,
                            sessao: resultadoAutenticar[0].sessao
                        });
                        
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarOperadores(req, res){
    var idGerente = req.query.idGerenteServer;

    usuarioModel.listarOperadores(idGerente)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ",error);
            res.status(500).json({error: "Erro interno do servidor"});
        })
}

function cadastrar(req, res){
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var celular = req.body.celularServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;
    var gerente = req.body.gerenteServer;
    var empresa = req.body.empresaServer;
    var cpf = req.body.cpfServer;

    if(nome.length < 4 || usuario.length < 4 || senha.length < 4){
        res.status(400).send("Dados inválidos para cadastro")
    }else{
        usuarioModel.cadastrarFunc(nome,sobrenome,celular,telefone,email,usuario,senha, gerente, empresa,cpf)
        .then(function (cadastroResultado) {
            res.json(cadastroResultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o cadastro! Erro: ",erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    autenticar,
    listarOperadores,
    cadastrar
}