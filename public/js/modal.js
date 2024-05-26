
var mascara = document.getElementById('mascara');

document.getElementById('btn-abrir-modal').addEventListener('click', function () {
    document.getElementById('cadastro-dialog').style.display = 'block';
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    mascara.style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('cadastro-dialog').style.display = 'none';
    document.getElementsByTagName("body")[0].style.overflow = "scroll";
    mascara.style.display = 'none';
});