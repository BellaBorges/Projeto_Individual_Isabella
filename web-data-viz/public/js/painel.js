// Endereço da API (troque se a sua API estiver em outra porta)
const URL_API = 'http://localhost:3333';

// Só entra no painel quem fez login
if (sessionStorage.ID_USUARIO == undefined) {
    window.location = 'login.html';
}

function mostrarMensagem(divMsg, tipo, texto) {
    divMsg.className = tipo;
    divMsg.innerHTML = texto;
}

function sair() {
    sessionStorage.clear();
    window.location = 'login.html';
}

// Preenche as 3 listas de gatos (pesagem, vacina e ração) com os gatos do usuário
function carregarGatos() {
    nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;

    fetch(URL_API + '/gatos/listar/' + sessionStorage.ID_USUARIO)
        .then(function (resposta) {
            resposta.json().then(function (gatos) {
                let opcoes = '<option value="">Escolha o gato</option>';
                let i = 0;

                while (i < gatos.length) {
                    opcoes = opcoes + '<option value="' + gatos[i].idGato + '">' + gatos[i].nome + '</option>';
                    i++;
                }

                sel_peso_gato.innerHTML = opcoes;
                sel_vacina_gato.innerHTML = opcoes;
                sel_compra_gato.innerHTML = opcoes;
            });
        })
        .catch(function () {
            mostrarMensagem(div_msg_gato, 'msg-erro', 'Não consegui carregar seus gatos. A API está ligada?');
        });
}

// Manda os dados para a API e mostra o resultado na mensagem do formulário
function enviar(rota, dados, divMsg, textoSucesso, aoTerminar) {
    fetch(URL_API + rota, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(function (resposta) {
            if (resposta.ok) {
                mostrarMensagem(divMsg, 'msg-sucesso', textoSucesso);
                aoTerminar();
            } else {
                mostrarMensagem(divMsg, 'msg-erro', 'Não foi possível salvar. Tente de novo.');
            }
        })
        .catch(function () {
            mostrarMensagem(divMsg, 'msg-erro', 'Não consegui falar com o servidor. A API está ligada?');
        });
}

// ---------- tabela gato ----------
function cadastrarGato() {
    let nome = ipt_gato_nome.value;
    let raca = ipt_gato_raca.value;
    let nascimento = ipt_gato_nascimento.value;
    let hoje = new Date().toISOString().slice(0, 10);
    let erros = '';

    if (nome.length < 2) {
        erros = erros + 'Digite o nome do gato.<br>';
    }

    if (nascimento != '' && nascimento > hoje) {
        erros = erros + 'A data de nascimento não pode ser no futuro.<br>';
    }

    if (erros != '') {
        mostrarMensagem(div_msg_gato, 'msg-erro', erros);
        return;
    }

    enviar('/gatos/cadastrar', {
        nome: nome,
        raca: raca,
        dtNascimento: nascimento,
        fkUsuario: sessionStorage.ID_USUARIO
    }, div_msg_gato, 'Gato cadastrado!', function () {
        ipt_gato_nome.value = '';
        ipt_gato_raca.value = '';
        ipt_gato_nascimento.value = '';
        carregarGatos();
    });
}

// ---------- tabela pesagem ----------
function registrarPesagem() {
    let fkGato = sel_peso_gato.value;
    let peso = Number(ipt_peso.value);
    let data = ipt_peso_data.value;
    let erros = '';

    if (fkGato == '') {
        erros = erros + 'Escolha o gato.<br>';
    }

    if (peso <= 0) {
        erros = erros + 'O peso precisa ser maior que zero.<br>';
    }

    if (data == '') {
        erros = erros + 'Escolha a data da pesagem.<br>';
    }

    if (erros != '') {
        mostrarMensagem(div_msg_peso, 'msg-erro', erros);
        return;
    }

    enviar('/pesagens/cadastrar', {
        peso: peso,
        dtPesagem: data,
        fkGato: fkGato
    }, div_msg_peso, 'Pesagem registrada!', function () {
        ipt_peso.value = '';
        ipt_peso_data.value = '';
    });
}

// ---------- tabela vacina ----------
function registrarVacina() {
    let fkGato = sel_vacina_gato.value;
    let nome = ipt_vacina_nome.value;
    let aplicacao = ipt_vacina_aplicacao.value;
    let proxima = ipt_vacina_proxima.value;
    let erros = '';

    if (fkGato == '') {
        erros = erros + 'Escolha o gato.<br>';
    }

    if (nome.length < 2) {
        erros = erros + 'Digite o nome da vacina.<br>';
    }

    if (aplicacao == '' || proxima == '') {
        erros = erros + 'Preencha a data da aplicação e a da próxima dose.<br>';
    } else if (proxima < aplicacao) {
        erros = erros + 'A próxima dose não pode ser antes da aplicação.<br>';
    }

    if (erros != '') {
        mostrarMensagem(div_msg_vacina, 'msg-erro', erros);
        return;
    }

    enviar('/vacinas/cadastrar', {
        nome: nome,
        dtAplicacao: aplicacao,
        dtProximaDose: proxima,
        fkGato: fkGato
    }, div_msg_vacina, 'Vacina registrada!', function () {
        ipt_vacina_nome.value = '';
        ipt_vacina_aplicacao.value = '';
        ipt_vacina_proxima.value = '';
    });
}

// ---------- tabela compraRacao ----------
function registrarCompra() {
    let fkGato = sel_compra_gato.value;
    let marca = ipt_compra_marca.value;
    let pesoKg = Number(ipt_compra_pesokg.value);
    let valor = Number(ipt_compra_valor.value);
    let data = ipt_compra_data.value;
    let erros = '';

    if (fkGato == '') {
        erros = erros + 'Escolha o gato.<br>';
    }

    if (pesoKg <= 0) {
        erros = erros + 'O peso do pacote precisa ser maior que zero.<br>';
    }

    if (valor <= 0) {
        erros = erros + 'O valor precisa ser maior que zero.<br>';
    }

    if (data == '') {
        erros = erros + 'Escolha a data da compra.<br>';
    }

    if (erros != '') {
        mostrarMensagem(div_msg_compra, 'msg-erro', erros);
        return;
    }

    enviar('/compras/cadastrar', {
        marca: marca,
        pesoKg: pesoKg,
        valor: valor,
        dtCompra: data,
        fkGato: fkGato
    }, div_msg_compra, 'Compra registrada!', function () {
        ipt_compra_marca.value = '';
        ipt_compra_pesokg.value = '';
        ipt_compra_valor.value = '';
        ipt_compra_data.value = '';
    });
}