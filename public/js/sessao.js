function validarSessao(){
    var nome = sessionStorage.NOME_USUARIO;
    var sobrenome = sessionStorage.SOBRENOME_USUARIO;
    var usuario = sessionStorage.USERNAME_USUARIO;
    var cargo = sessionStorage.CARGO_USUARIO;
    var empresa = sessionStorage.EMPRESA_USUARIO;
    var idEmpresa = sessionStorage.ID_EMPRESA_USUARIO;
}

function sair() {
    sessionStorage.clear();
    window.location = '../login.html'

    logout();
}

function logout() {
    fetch("/java/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
        } else {
            console.log("Houve um erro ao tentar realizar o login!");   
            console.log("Erro")
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}