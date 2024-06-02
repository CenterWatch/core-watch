buscarConfig()

function buscarConfig(){
    fetch (`/empresas/buscarConfig?id_empresa=${sessionStorage.ID_EMPRESA_USUARIO}`).then(res => {
    if (!res.ok) {
        throw new Error(`Erro na solicitação: ${res.statusText}`);
    }
    return res.json();
    })
    .then(res => {
        sessionStorage.CONFIG = JSON.stringify(res)
    })      
}