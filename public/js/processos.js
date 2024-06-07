function buscarListaProcessos(){
    fetch(`/maquina/buscarListaProcessos?idEmpresa=${sessionStorage.ID_EMPRESA_USUARIO}`).then(res => {
        if (!res.ok) {
            throw new Error(`Erro na solicitação: ${res.statusText}`);
        }
	return res.json();
    })
    .then(res => {
	mapearProcessos(res)
    })
}

var mapProcessos = new Map();

function mapearProcessos(processos) {
    mapProcessos = new Map();

    processos.forEach(p => {

        var opt = '';

        if (p.permitido === null) opt = 'Q'
        else if (p.permitido === true) opt = 'Y'
        else opt = 'N'

        if (!mapProcessos.has(opt)) {
            mapProcessos.set(opt, []);
        }

        mapProcessos.get(opt).push(p);
    })
}

function listarProcessos() {
    permitidoList.innerHTML = '';
    bloqueadoList.innerHTML = '';

    if (mapProcessos.get('Y') !== undefined) mapProcessos.get('Y').forEach(p => {
        permitidoList.innerHTML += `<li id="p${p.nome}" class="battle-item">${p.nome}</li>`;
    })

    if (mapProcessos.get('N') !== undefined) mapProcessos.get('N').forEach(p => {
        bloqueadoList.innerHTML += `<li id="p${p.nome}" class="battle-item">${p.nome}</li>`;
    })
    
    processos = document.getElementsByClassName('battle-item');

    for (const p of processos) {
        p.addEventListener('click', () => {
            if (p.classList.contains('on-focus')) {
                p.classList.remove('on-focus')
            } else {
                p.classList.add('on-focus')
            }
        })
    }
}

function updateListaProcessos(processo, perm) {''
    console.log(processo, perm)
    fetch("/maquina/updateListaProcessos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "nome": processo,
            "perm": perm,
            "idEmpresa": sessionStorage.ID_EMPRESA_USUARIO
        })
    }).then(function (res) {
        console.log("Resposta: ", res);

        if (res.ok) {
            buscarListaProcessos();
        } else {
            console.log("Erro")
        }
    })
        .catch(function (erro) {
            console.log("Erro: ", erro);
        });

        return false;
}


buscarListaProcessos()
setInterval(() => {
    // buscarListaProcessos()
}, 5000);