const fbItem = document.getElementById('feedbackItem')
fbItem.style.display = 'none'

buscarFeedbacks()

function buscarFeedbacks() {
    fetch(`/usuarios/buscarFeedbacks?idOperador=${sessionStorage.ID_USUARIO}&idConfig=${sessionStorage.ID_EMPRESA_USUARIO}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro na solicitação: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            exibirFeedback(data)
        })
        .catch(error => {
            console.error('Erro ao buscar feedbacks:', error);
        });
}

function exibirFeedback(data) {
    data.forEach(fb => {
        var inicio = new Date(fb.inicio);
        console.log(inicio)
        console.log(inicio.getTime() < new Date().getTime())

        if (inicio.getTime() < new Date().getTime()) {
            fbItem.style.display = 'block'
            sessionStorage.ID_FEEDBACK = fb.id_quest;
        }
    })
}