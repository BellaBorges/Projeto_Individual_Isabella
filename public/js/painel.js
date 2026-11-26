var idUsuario = sessionStorage.ID_USUARIO;

if (!idUsuario) {
    window.location = "login.html";
}

document.getElementById("nome_usuario").textContent = sessionStorage.NOME_USUARIO || "";

function sair() {
    sessionStorage.clear();
    window.location = "login.html";
}

// ---------- Preencher os selects ----------
function preencherSelect(idSelect, lista, campoId) {
    var select = document.getElementById(idSelect);
    select.innerHTML = "";

    if (!Array.isArray(lista) || lista.length == 0) {
        select.appendChild(new Option("Nenhum item cadastrado", ""));
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        select.appendChild(new Option(lista[i].nome, lista[i][campoId]));
    }
}

function carregarGatos() {
    fetch("/gatos/usuario/" + idUsuario)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Rota retornou " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (gatos) {
            preencherSelect("sel_peso_gato", gatos, "id_gato");
            preencherSelect("sel_vacina_gato", gatos, "id_gato");
            preencherSelect("sel_compra_gato", gatos, "id_gato");
        })
        .catch(function (erro) { console.log(erro); });
}

function carregarVacinas() {
    fetch("/gatos/vacinas")
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Rota retornou " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (vacinas) { preencherSelect("sel_vacina", vacinas, "id_vacina"); })
        .catch(function (erro) { console.log(erro); });
}

function carregarRacas() {
    fetch("/gatos/racas")
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Rota retornou " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (racas) { preencherSelect("sel_gato_raca", racas, "id_raca"); })
        .catch(function (erro) { console.log(erro); });
}

// ---------- Enviar para a API ----------
// Manda o corpo para a rota, mostra a mensagem na div e, se deu certo, limpa os campos
function enviar(rota, corpo, idDivMsg, camposParaLimpar, aoTerminar) {
    var div = document.getElementById(idDivMsg);

    fetch(rota, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
    })
        .then(function (resposta) {
            if (resposta.ok) {
                div.textContent = "Salvo com sucesso!";
                for (var i = 0; i < camposParaLimpar.length; i++) {
                    document.getElementById(camposParaLimpar[i]).value = "";
                }
                if (aoTerminar) {
                    aoTerminar();
                }
            } else {
                return resposta.text().then(function (texto) {
                    div.textContent = "Não foi possível salvar. " + texto;
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            div.textContent = "Erro ao falar com o servidor.";
        });
}

function cadastrarGato() {
    var nome = ipt_gato_nome.value;

    if (nome == "") {
        div_msg_gato.textContent = "Digite o nome do gato.";
        return;
    }

    enviar("/gatos/cadastrar", {
        nomeServer: nome,
        idRacaServer: sel_gato_raca.value,
        nascimentoServer: ipt_gato_nascimento.value,
        idUsuarioServer: idUsuario
    }, "div_msg_gato", ["ipt_gato_nome", "ipt_gato_nascimento"], carregarGatos);
}

function registrarPesagem() {
    if (sel_peso_gato.value == "" || ipt_peso.value == "" || ipt_peso_data.value == "") {
        div_msg_peso.textContent = "Escolha o gato e preencha peso e data.";
        return;
    }

    enviar("/gatos/pesagem", {
        idGatoServer: sel_peso_gato.value,
        pesoServer: ipt_peso.value,
        dataServer: ipt_peso_data.value
    }, "div_msg_peso", ["ipt_peso", "ipt_peso_data"]);
}

function registrarVacina() {
    if (sel_vacina_gato.value == "" || sel_vacina.value == "" || ipt_vacina_aplicacao.value == "") {
        div_msg_vacina.textContent = "Escolha o gato, a vacina e a data da aplicação.";
        return;
    }

    enviar("/gatos/vacina", {
        idGatoServer: sel_vacina_gato.value,
        idVacinaServer: sel_vacina.value,
        aplicacaoServer: ipt_vacina_aplicacao.value,
        proximaServer: ipt_vacina_proxima.value
    }, "div_msg_vacina", ["ipt_vacina_aplicacao", "ipt_vacina_proxima"]);
}

function registrarCompra() {
    if (sel_compra_gato.value == "" || ipt_compra_pesokg.value == "" ||
        ipt_compra_valor.value == "" || ipt_compra_data.value == "") {
        div_msg_compra.textContent = "Escolha o gato e preencha peso do pacote, valor e data.";
        return;
    }

    enviar("/gatos/compra", {
        idGatoServer: sel_compra_gato.value,
        marcaServer: ipt_compra_marca.value,
        pesoKgServer: ipt_compra_pesokg.value,
        valorServer: ipt_compra_valor.value,
        dataServer: ipt_compra_data.value
    }, "div_msg_compra", ["ipt_compra_marca", "ipt_compra_pesokg", "ipt_compra_valor", "ipt_compra_data"]);
}