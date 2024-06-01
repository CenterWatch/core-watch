function buscarUltimoRegistro(){
    contador = 1
    for (let [key, value] of mapMaquinas) {

        fetch(`/registros/tempo-real/${value.id_maquina}`).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    listaMaquinas = JSON.stringify(resposta)
                    console.log(listaMaquinas)
                    atualizarStatusMaquina(listaMaquinas,key)
                    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }
}

function atualizarStatusMaquina(res,hostname){
    registroMaquina = JSON.parse(res)[0]
    maxRam = JSON.parse(sessionStorage.CONFIG)[0].max_ram
    maxCpu = JSON.parse(sessionStorage.CONFIG)[0].max_cpu
    intervalo = JSON.parse(sessionStorage.CONFIG)[0].intervalo_registro_ms

    usoRam = (registroMaquina.uso_ram / registroMaquina.ram_total * 100).toFixed(1)

    console.log(registroMaquina)
    timeRegistro = new Date(registroMaquina.dt_hora).getTime()
    timeAtual = Date.now()
    console.log(new Date(intervalo).getTime())

    if (timeAtual > (timeRegistro + intervalo + 1000)) {
        console.log("Máquina inoperante")
        document.getElementById(`status${hostname}`).innerHTML = `<i class="fa-solid fa-power-off"></i>`
        document.getElementById(`status${hostname}`).classList.add('power-off')
        
    } else {
        console.log("Máquina operante")
        document.getElementById(`status${hostname}`).classList.remove('power-off')
        if (parseInt(usoRam) > parseInt(maxRam)) {
            console.log(usoRam)
            console.log(maxRam)
            console.log("Alerta de ram")
            document.getElementById(`status${hostname}`).innerHTML = `<i class="fa-solid fa-memory"></i>`
            document.getElementById(`status${hostname}`).classList.add('power-off')
        } 
        if (parseInt(registroMaquina.uso_cpu) > parseInt(maxCpu)) {
            console.log(registroMaquina.uso_cpu)
            console.log(maxCpu)
            console.log("Alerta de cpu")
            document.getElementById(`status${hostname}`).innerHTML = `<i class="fa-solid fa-microchip"></i>`
            document.getElementById(`status${hostname}`).classList.add('power-off')
        }

        if (!(parseInt(usoRam) > parseInt(maxRam)) && !(parseInt(registroMaquina.uso_cpu) > parseInt(maxCpu))) {
            document.getElementById(`status${hostname}`).classList.remove('power-off')
            document.getElementById(`status${hostname}`).innerHTML = `<i class="fa-solid fa-check"></i>`
        }
    }
    
}


setTimeout(() => {
    buscarUltimoRegistro()
}, 100);

setInterval(() => {
    buscarUltimoRegistro();
}, 2000);