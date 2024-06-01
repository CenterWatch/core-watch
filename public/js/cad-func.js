const modalCad = `
                    <div class="modal-header">
                        <h2>Cadastrar Funcionário</h2>
                        <button type="button" id="close-modal">Fechar</button>
                    </div>
                    <div class="modal-body">
                        <div class="formulario-cadastro">
                            <div id="formFunc" class="form">
                                <input style="display: none" id="id_func_input">
                                <input style="display: none" id="id_end_input">
                                <div class="input-field">
                                    <label for="nome_input">Nome</label>
                                    <input id="nome_input" class="input_formulario" type="text">
                                    <span id="span_nome"></span>
                                </div>
                                <div class="input-field">
                                    <label for="celular_input">Celular</label>
                                    <input onkeyup="mascararTel(celular_input)" type="text" id="celular_input" class="input_formulario" maxlength="15">
                                    <span id="span_celular"></span>
                                </div>
                                <div class="input-field">
                                    <label for="sobrenome_input">Sobrenome</label>
                                    <input type="text" id="sobrenome_input" class="input_formulario">
                                    <span id="span_sobrenome"></span>
                                </div>
                                <div class="input-field">
                                    <label for="telefone_input">Telefone</label>
                                    <input onkeyup="mascararTel(telefone_input)" type="text" id="telefone_input" class="input_formulario" maxlength="14">
                                    <span id="span_telefone"></span>
                                </div>
                                <div class="input-field">
                                    <label for="dtNasc_input">Data de Nascimento</label>
                                    <input class="input_formulario" type="date" id="dtNasc_input">
                                    <span id="span_dtNascimento"></span>
                                </div>
                                <div class="input-field">
                                    <label for="cpf_input">CPF</label>
                                    <input onkeyup="mascararCpf(cpf_input)" class="input_formulario" type="text" id="cpf_input"
                                        placeholder="000.000.000-00" maxlength="14">
                                    <span id="span_cpf"></span>
                                </div>
                                <div class="input-field">
                                    <label for="email_input">E-mail</label>
                                    <input onkeyup="validarEmail(email_input.value)" class="input_formulario" type="text" id="email_input">
                                    <span id="span_email"></span>
                                </div>
                                <div class="input-field">
                                    <label for="cargo_input">Cargo</label>
                                    <select id="cargo_input" class="input_formulario">
                                        <option value=""></option>
                                        <option value="Operador">Operador</option>
                                        <option value="Suporte">Suporte</option>
                                    </select>
                                    <span id="span_cargo"></span>
                                </div>
                                <div class="input-field">
                                    <label for="usuario_input">Usuário</label>
                                    <input class="input_formulario" type="text" id="usuario_input">
                                    <span id="span_usuario"></span>
                                </div>
                            </div>

                            <div id="formEndFunc" style="display: none;" class="form">
                                <div class="input-field">
                                    <label for="logradouro_input">Logradouro</label>
                                    <input id="logradouro_input" class="input_formulario" type="text">
                                    <span id="span_logradouro"></span>
                                </div>
                                <div class="input-field">
                                    <label for="cep_input">CEP</label>
                                    <input onkeyup="preencherCamposCEP(cep_input.value)" type="text" id="cep_input"
                                        class="input_formulario">
                                    <span id="span_cep"></span>
                                </div>
                                <div class="input-field">
                                    <label for="num_input">Número</label>
                                    <input type="text" id="num_input" class="input_formulario">
                                    <span id="span_num"></span>
                                </div>
                                <div class="input-field">
                                    <label for="bairro_input">Bairro</label>
                                    <input type="text" id="bairro_input" class="input_formulario">
                                    <span id="span_bairro"></span>
                                </div>
                                <div class="input-field">
                                    <label for="compl_input">Complemento (opcional)</label>
                                    <input class="input_formulario" id="compl_input">
                                    <span id="span_complimento"></span>
                                </div>
                                <div class="input-field">
                                    <label for="cidade_input">Cidade</label>
                                    <input class="input_formulario" type="text" id="cidade_input">
                                    <span id="span_cidade"></span>
                                </div>
                                <div class="input-field">
                                    <label for="uf_input">Estado</label>
                                    <input class="input_formulario" type="text" id="uf_input">
                                    <span id="span_uf"></span>
                                </div>
                            </div>
                        </div>
                        <div id="btnContainer" class="btn-container">
                            
                        </div>
                    </div>
`;

const btnCadContent = `<button id="proxEndBtn" class="btn-cadastrar" onclick="navCadastro('avancar')">Próximo</button>
<button id="voltarBtn" style="display: none;" class="btn-cadastrar" onclick="navCadastro('voltar')">Voltar</button>
<button id="cadFuncBtn" style="display: none" class="btn-cadastrar" onclick="cadastrar()">Cadastrar</button>`

const btnUpdContent = `<button id="proxEndBtn" class="btn-cadastrar" onclick="navCadastro('avancar')">Próximo</button>
<button id="voltarBtn" style="display: none;" class="btn-cadastrar" onclick="navCadastro('voltar')">Voltar</button>
<button id="cadFuncBtn" style="display: none" class="btn-cadastrar" onclick="atualizarCad()">Atualizar</button>`

document.getElementById('cadastro-dialog').innerHTML = modalCad;

document.getElementById('btnContainer').innerHTML = btnCadContent;

document.getElementById('btn-abrir-modal').addEventListener('click', function () {
    abrirModal(document.getElementById('cadastro-dialog'));
});

document.getElementById('close-modal').addEventListener('click', function () {
    navCadastro('voltar');
    fecharModal(document.getElementById('cadastro-dialog'));
    document.getElementById('btnContainer').innerHTML = btnCadContent;
});