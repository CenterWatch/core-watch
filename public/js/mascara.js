function mascararCpf(inp){
    v = inp.value;
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    inp.value = v;
}

function mascararTel(inp){
    v = inp.value;
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    inp.value = v;
}

function validarEmail(email) {
   return /\S+@\S+\.\S+/.test(email)
}