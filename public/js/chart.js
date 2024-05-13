

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

    desenharVolumesPorMaquina(hostname);
    setTimeout(() => atualizarGraficoRam(idMaquina, dadosRam, chartRam), 2000);
    setTimeout(() => atualizarGraficoCpu(idMaquina, dadosCpu, chartCpu), 2000);
}

function desenharVolumesPorMaquina(hostname) {

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
        console.log(ctxDisco)

        new Chart(ctxDisco, {
            type: 'pie',
            data: {
                labels: [
                    'Espaço livre',
                    'Espaço usado'
                ],
                datasets: [{
                    label: '%',
                    data: [70, 30],
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

function obterDadosGrafico(hostname, idMaquina) {

    fetch(`/registros/ultimos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)
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

function atualizarGraficoRam(idMaquina, dados, myChart) {

    fetch(`/registros/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterdados(idMaquina);
                // alertar(novoRegistro, idMaquina);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    const novoDado = formatarDados(novoRegistro);

                    dados.labels.shift();
                    dados.labels.push(novoDado.dtHora[0]);

                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoDado.ram[0]);
                    myChart.update();
                }

                proximaAtualizacao = setTimeout(() => atualizarGraficoRam(idMaquina, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficoRam(idMaquina, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoCpu(idMaquina, dados, myChart) {
    fetch(`/registros/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterdados(idMaquina);
                // alertar(novoRegistro, idMaquina);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
                if (novoRegistro[0].dt_hora == dados.labels[dados.labels.length - 1]) {
                    // console.log("---------------------------------------------------------------")
                    // console.log(dados.labels[dados.labels.length - 1])
                    // console.log("---------------------------------------------------------------")
                } else {
                    const novoDado = formatarDados(novoRegistro);

                    dados.labels.shift();
                    dados.labels.push(novoDado.dtHora[0]);

                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoDado.cpu[0]);
                    myChart.update();
                }

                proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(idMaquina, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(idMaquina, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}