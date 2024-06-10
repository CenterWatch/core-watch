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

    exibirProcessos();
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

            if (p.parentNode.classList.contains('bloqueado')) {
                if (p.classList.contains('on-focus', 'bloq')) {
                    p.classList.remove('on-focus', 'bloq')
                } else {
                    p.classList.add('on-focus', 'bloq')
                }

                const pers = [];

                for (const p1 of document.getElementsByClassName('per')) {
                   pers.push(p1)
                }

                pers.forEach(p1 => {
                    p1.classList.remove('per', 'on-focus')
                })
            } else {
                if (p.classList.contains('on-focus', 'per')) {
                    p.classList.remove('on-focus', 'per')
                } else {
                    p.classList.add('on-focus', 'per')
                }

                const bloqs = [];

                for (const p1 of document.getElementsByClassName('bloq')) {
                   bloqs.push(p1)
                }

                bloqs.forEach(p1 => {
                    p1.classList.remove('bloq', 'on-focus')
                })
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