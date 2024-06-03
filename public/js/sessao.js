



function validarSessao(){
    var nome = sessionStorage.NOME_USUARIO;
    var sobrenome = sessionStorage.SOBRENOME_USUARIO;
    var usuario = sessionStorage.USERNAME_USUARIO;
    var cargo = sessionStorage.CARGO_USUARIO;
    var empresa = sessionStorage.EMPRESA_USUARIO;
    var idEmpresa = sessionStorage.ID_EMPRESA_USUARIO;

    if(sessionStorage.ID_USUARIO == null) {
        sessionStorage.clear();
        window.location = '../login.html'
    }
}

function sair() {
    
    if (sessionStorage.CARGO_USUARIO == "Operador") {
        logout()
    }

    setTimeout(() => {
        sessionStorage.clear();
        window.location = '../login.html'
    }, 500);
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