let proximaAtualizacao;
const ATUALIZACAO_MS = 1000;
const config = JSON.parse(sessionStorage.CONFIG)[0];

function desenharGraficos(hostname, resposta, idMaquina) {

    var dadosRam = {
        labels: resposta.dtHora,
        datasets: [{
            label: '',
            data: resposta.ram,
            fill: true,
            backgroundColor: '#3D3D3D30',
            borderColor: '#3D3D3D',
            borderWidth: 1
        }]
    };

    var configRam = {
        type: 'line',
        data: dadosRam,
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100,
                        callback: function (value, index, values) {
                            return (value == 0 || value == 100) ? value + '%' : '';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Uso da Memória RAM',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    };

    var chartRam = new Chart(
        document.getElementById(`chartRam${hostname}`),
        configRam
    );

    // CHART CPU

    var dadosCpu = {
        labels: resposta.dtHora,
        datasets: [{
            label: '',
            data: resposta.cpu,
            fill: true,
            backgroundColor: '#52C3E350',
            borderColor: '#52C3E3',
            borderWidth: 1
        }]
    };

    var configCpu = {
        type: 'line',
        data: dadosCpu,
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100,
                        callback: (value) => { return (value == 0 || value == 100) ? value + '%' : ''; }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Uso da CPU',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    };

    var chartCpu = new Chart(
        document.getElementById(`chartCpu${hostname}`),
        configCpu
    );

    obterDadosVolumes(hostname);
    setTimeout(() => atualizarGraficos(idMaquina, dadosRam, dadosCpu, chartRam, chartCpu, hostname), ATUALIZACAO_MS);
}

function obterDadosVolumes(hostname) {
    fetch(`/registros/ultimosVolume/${hostname}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                
                desenharVolumesPorMaquina(hostname, resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function desenharVolumesPorMaquina(hostname, dados) {

    var volumes = mapVolumes.get(hostname);
    
    document.getElementById(`volumesContainer${hostname}`).innerHTML = '';

    for (let i = 0; i < volumes.length; i++) {
        document.getElementById(`volumesContainer${hostname}`).innerHTML += `
        <div class="disco-chart chart-disco">
            <canvas id="chart${hostname}Volume${i}"></canvas>
        </div>
        `;
    }

    for (let i = 0; i < volumes.length; i++) {
        const ctxDisco = document.getElementById(`chart${hostname}Volume${i}`);

        var per = calcularPorcentagem(dados[i].volume_total, dados[i].volume_disponivel);
        

        new Chart(ctxDisco, {
            type: 'pie',
            data: {
                labels: [
                    'Espaço livre',
                    'Espaço usado'
                ],
                datasets: [{
                    label: '%',
                    data: [per.disp, per.emUso],
                    backgroundColor: [
                        '#52C3E3',
                        '#3D3D3D'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: volumes[i].nome
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

function calcularPorcentagem(total, disponivel) {
    console.log(total, disponivel)
    perDisp = (disponivel/total*100);
    return {
        "emUso": 100-perDisp,
        "disp": perDisp
    }
}

function obterDadosGrafico(hostname, idMaquina) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/registros/ultimos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)
                atualizarUptime(hostname, resposta[0].uptime)
                desenharGraficos(hostname, formatarDados(resposta), idMaquina)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function formatarDados(dados) {
    const ramVetor = [];
    const cpuVetor = [];
    const dtHoraVetor = [];

    dados.forEach(item => {
        ramVetor.push(Math.round(item.uso_ram / item.ram_total * 100));
        cpuVetor.push(item.uso_cpu);
        dtHoraVetor.push(converterHorario(item.dt_hora));
    });

    return {
        ram: ramVetor,
        cpu: cpuVetor,
        dtHora: dtHoraVetor
    };
}

function converterHorario(dtHora) {
    var dt = new Date(dtHora);

    var hora = dt.getHours();
    var min = dt.getMinutes();
    var seg = dt.getSeconds();

    hora = (hora < 10 ? '0' : '') + hora;
    min = (min < 10 ? '0' : '') + min;
    seg = (seg < 10 ? '0' : '') + seg;

    return hora + ":" + min + ":" + seg;
}

function atualizarGraficos(idMaquina, dadosRam, dadosCpu, chartRam, chartCpu, hostname) {
    fetch(`/registros/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterdados(idMaquina);
                // alertar(novoRegistro, idMaquina);
                // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                // console.log(`Dados atuais do gráfico:`);
                atualizarUptime(hostname, novoRegistro[0].uptime);

                const novoDado = formatarDados(novoRegistro);

                var horario = novoDado.dtHora[0];
                var ultimaLabel = dadosCpu.labels[dadosCpu.labels.length - 1];

                if (ultimaLabel != horario) {

                    // console.log(novoDado.cpu[0], config.max_cpu, verificarAlerta(novoDado.cpu, config.max_cpu))
                    // chartRam.classList.add("card-error");
                    const ramParent = chartRam.canvas.parentNode
                    const cpuParent = chartCpu.canvas.parentNode

                    var cpuDado = parseFloat(novoDado.ram[0])
                    var ramDado = parseFloat(novoDado.cpu[0])

                    if (verificarAlerta(cpuDado, config.max_ram)) ramParent.classList.add("card-error")
                    else ramParent.classList.remove("card-error")
                        
                    if (verificarAlerta(ramDado, config.max_cpu)) cpuParent.classList.add("card-error")
                    else cpuParent.classList.remove("card-error")

                    dadosRam.labels.shift()
                    dadosRam.labels.push(horario)

                    dadosCpu.datasets[0].data.shift();
                    dadosCpu.datasets[0].data.push(novoDado.cpu[0]);

                    dadosRam.datasets[0].data.shift();
                    dadosRam.datasets[0].data.push(novoDado.ram[0]);

                    chartRam.update()
                    chartCpu.update()
                }

                proximaAtualizacao = setTimeout(() => atualizarGraficos(idMaquina, dadosRam, dadosCpu, chartRam, chartCpu, hostname), ATUALIZACAO_MS);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficos(idMaquina, dadosRam, dadosCpu, chartRam, chartCpu, hostname), ATUALIZACAO_MS);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarUptime(hostname, uptime) {
    var spanUptime = document.getElementById('uptime' + hostname);

    var msg = "";

    if (uptime < 60) {
        msg = uptime + " seg";
    } else if (uptime < 3600) {
        msg = Math.trunc((uptime/60)*10)/10 + " min";
    } else {
        msg = Math.trunc((uptime/3600)*10)/10 + " h";
    }

    spanUptime.innerHTML = msg.replace('.', ',');
}

function verificarAlerta(metrica, parametro) {
    return metrica > parametro;
}