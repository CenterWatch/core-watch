
var mascara = document.getElementById('mascara');

function abrirModal(modal) {
    modal.style.display = 'block';
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    mascara.style.display = 'block';
}

function fecharModal(modal) {
    modal.style.display = 'none';

    document.querySelectorAll('.visao-geral input').forEach(input => {
        input.value = '';
    });

    document.getElementsByTagName("body")[0].style.overflow = "scroll";
    mascara.style.display = 'none';
}