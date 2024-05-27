async function buscarOperadores(){
    await fetch(`/usuarios/listarOperadores?idUsuario=${sessionStorage.ID_USUARIO}`).then(res => {
        if (!res.ok) {
            throw new Error(`Erro na solicitação: ${res.statusText}`);
        }
        return res.json();
    })
        .then(data => {
            sessionStorage.FUNCIONARIOS = JSON.stringify(data);
        })
        .catch(erro => {
            console.log(erro);
            console.log("Não foi  possivel realizar o select: ", erro);
        })
    
}

function exibirNomeUsuario(){
    document.getElementById('nome-usuario').innerHTML = `${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}`
}