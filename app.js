// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 80;

var app = express();

var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresas");
var usuarioRouter = require("./src/routes/usuarios");
var maquinaRouter = require("./src/routes/maquina");
var artigoRouter = require("./src/routes/artigos");
var registrosRouter = require("./src/routes/registros");
var javaRouter = require("./src/routes/java");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresaRouter);
app.use("/maquina", maquinaRouter);
app.use("/artigos", artigoRouter);
app.use("/registros", registrosRouter);
app.use("/java", javaRouter);

app.listen(PORTA, function () {
    console.log(`
    $$$$$$\                       $$\                         $$\      $$\            $$\               $$\       
    $$  __$$\                      $$ |                        $$ | $\  $$ |           $$ |              $$ |      
    $$ /  \__| $$$$$$\  $$$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\  $$ |$$$\ $$ | $$$$$$\ $$$$$$\    $$$$$$$\ $$$$$$$\  
    $$ |      $$  __$$\ $$  __$$\\_$$  _|  $$  __$$\ $$  __$$\ $$ $$ $$\$$ | \____$$\\_$$  _|  $$  _____|$$  __$$\ 
    $$ |      $$$$$$$$ |$$ |  $$ | $$ |    $$$$$$$$ |$$ |  \__|$$$$  _$$$$ | $$$$$$$ | $$ |    $$ /      $$ |  $$ |
    $$ |  $$\ $$   ____|$$ |  $$ | $$ |$$\ $$   ____|$$ |      $$$  / \$$$ |$$  __$$ | $$ |$$\ $$ |      $$ |  $$ |
    \$$$$$$  |\$$$$$$$\ $$ |  $$ | \$$$$  |\$$$$$$$\ $$ |      $$  /   \$$ |\$$$$$$$ | \$$$$  |\$$$$$$$\ $$ |  $$ |
     \______/  \_______|\__|  \__|  \____/  \_______|\__|      \__/     \__| \_______|  \____/  \_______|\__|  \__|
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://localhost:${PORTA} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
