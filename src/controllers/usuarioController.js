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

                    if (resultadoAutenticar.length >= 1) {
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
                            sessao: resultadoAutenticar[0].id_sessao
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

function buscarSessao(req, res) {
    var idFuncionario = req.query.idFuncionarioServer;

    usuarioModel.buscarSessao(idFuncionario)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        })
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var celular = req.body.celularServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var dtNascimento = req.body.dtNascimentoServer;
    var usuario = req.body.usuarioServer;
    var gerente = req.body.gerenteServer;
    var empresa = req.body.empresaServer;
    var cpf = req.body.cpfServer;
    var cargo = req.body.cargoServer;
    var logradouro = req.body.logradouroServer;
    var cep = req.body.cepServer;
    var num = req.body.numServer;
    var bairro = req.body.bairroServer;
    var compl = req.body.complServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;

    if (nome.length < 4 || usuario.length < 4) {
        res.status(400).send("Dados inválidos para cadastro")
    } else {
        usuarioModel.cadastrarEndereco(nome, sobrenome, celular, telefone, email, dtNascimento, usuario, gerente, empresa, cpf, cargo, logradouro, cep, num, bairro, compl, cidade, uf)
            .then(function (cadastroResultado) {
                res.json(cadastroResultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarChamado(req, res) {
    var titulo = req.body.assuntoServer;
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoProblemaServer;
    var fkSessao = req.body.sessaoServer;


    console.log(req.body.tituloServer)

    usuarioModel.cadastrarChamado(titulo, descricao, tipo, fkSessao)
        .then(function (cadastroResultado) {
            res.json(cadastroResultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao cadastrar o chamado! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
}

function listarChamados(req, res) {
    var idFuncionario = req.query.idFuncionarioServer;

    usuarioModel.listarChamados()
        .then(function (resultadoListarChamados) {
            console.log(`\nResultados encontrados: ${resultadoListarChamados.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoListarChamados)}`);
            if (resultadoListarChamados.length != 0) {
                console.log(resultadoListarChamados);
                maquinaModel.buscarChamadosPorFuncionario(idFuncionario).then((resFuncionario) => {
                    res.json({
                        chamadosFuncionarios: resultadoListarChamados
                    });
                }).catch((err) => {

                });
            }
        }

        ).catch(error => {
            console.error("Erro ao processar a solicitação: ", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        })
}

function listarOperadores(req, res) {
    var idGerente = req.query.idUsuario;

    usuarioModel.listarOperadores(idGerente)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação: ", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        })
}

function atribuirTarefa(req, res){
    var idFuncionario = req.body.idOperadorServer;
    var idGerente = req.body.idGerenteServer;
    var tarefa = req.body.tarefaServer;
    var dataEstimada = req.body.dataEstimadaServer;
    var prioridade = req.body.prioridadeServer;
    console.log(prioridade)

    usuarioModel.atribuirTarefa(idFuncionario, idGerente, tarefa, dataEstimada, prioridade)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })

}

function realizarFeedback(req, res){
    var idOperador = req.body.idOperadorServer;
    var nota = req.body.notaServer;
    var descricao = req.body.descricaoServer;
    var fkQuest = req.body.fkQuestServer;

    usuarioModel.realizarFeedback(nota, descricao, idOperador, fkQuest)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function  buscarTarefas(req, res){
    var idOperador = req.query.id_usuario;

    usuarioModel.buscarTarefas(idOperador)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function buscarChamadosOperador(req, res){
    var idOperador = req.query.id_usuario;

    usuarioModel.buscarChamadosOperador(idOperador)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function concluirTarefa(req, res) {
    var idTarefa = req.body.idTarefa;

    usuarioModel.concluirTarefa(idTarefa)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function editarFunc(req, res) {
    var func = req.body;

    var idFunc = func.idFunc;
    var idEnd = func.idEnd;
    var nome = func.nome;
    var sobrenome = func.sobrenome;
    var celular = func.celular;
    var telefone = func.telefone;
    var email = func.email;
    var cpf = func.cpf;
    var cargo = func.cargo;
    var usuario = func.usuario;
    var dtNascimento = func.dtNascimento;
    var logradouro = func.logradouro;
    var cep = func.cep;
    var num = func.num;
    var bairro = func.bairro;
    var compl = func.compl;
    var cidade = func.cidade;
    var uf = func.uf;

    usuarioModel.editarFunc(idFunc, idEnd, nome, sobrenome, celular, telefone, email, cpf, cargo, usuario, dtNascimento, logradouro, cep, num, bairro, compl, cidade, uf)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function atribuirChamado(req, res) {
    var idFuncionario = req.body.idFuncionario;
    var idOcorrencia = req.body.idOcorrencia;

    usuarioModel.atribuirChamado(idFuncionario, idOcorrencia)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function concluirChamado(req, res) {
    var idOcorrencia = req.body.idOcorrencia;

    usuarioModel.concluirChamado(idOcorrencia)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function verificaFb(req, res){
    var idFunc = req.query.idOperador;

    usuarioModel.verificaFb(idFunc)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function buscarFeedbacks(req, res){
    var idFunc = req.query.idOperador;
    var idConfig = req.query.idConfig;

    usuarioModel.buscarFeedbacks(idFunc, idConfig)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function buscarChamadosSuporte(req, res){
    var idEmpresa = req.query.idEmpresa;
    var idFuncionario = req.query.idFuncionario;

    usuarioModel.buscarChamadosSuporte(idEmpresa, idFuncionario)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

function buscarUltimaOciosidade(req, res) {
    var idFuncionario = req.query.idFuncionario;

    usuarioModel.buscarUltimaOciosidade(idFuncionario)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error("Erro ao processar a solicitação: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    })
}

module.exports = {
    autenticar,
    listarOperadores,
    cadastrar,
    cadastrarChamado,
    buscarSessao,
    listarChamados,
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
}