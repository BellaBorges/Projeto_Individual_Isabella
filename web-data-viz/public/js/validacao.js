// Endereço da API (troque se a sua API estiver em outra porta)
const URL_API = 'http://localhost:3333';


function temCaractere(texto, caractereInicial, caractereFinal) {
    let indice = 0;
    let encontrou = false;

    while (indice < texto.length) {
        if (texto[indice] >= caractereInicial && texto[indice] <= caractereFinal) {
            encontrou = true;
        }
        indice++;
    }

    return encontrou;
}

function cadastrar() {
    let nome = ipt_nome.value;
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let confirmarSenha = ipt_confirmar.value;
    let mensagensErro = '';

    if (nome.length < 3) {
        mensagensErro = mensagensErro + 'O nome precisa ter pelo menos 3 letras.<br>';
    }

    if (email.includes('@') == false || email.includes('.') == false) {
        mensagensErro = mensagensErro + 'Digite um e-mail válido, com @ e ponto.<br>';
    }

    if (senha.length < 8) {
        mensagensErro = mensagensErro + 'A senha precisa ter pelo menos 8 caracteres.<br>';
    }

    if (temCaractere(senha, '0', '9') == false) {
        mensagensErro = mensagensErro + 'A senha precisa ter pelo menos um número.<br>';
    }

    if (temCaractere(senhaServer.toLowerCase(), 'a', 'z') == false) {
        mensagensErro = mensagensErro + 'A senha precisa ter pelo menos uma letra.<br>';
    }

    if (senhaServer != confirmarSenha) {
        mensagensErro = mensagensErro + 'A confirmação da senha não é igual à senha.<br>';
    }

    if (mensagensErro != '') {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = mensagensErro;
        return;
    }

    // Validou: manda para a API gravar na tabela usuario
    fetch(URL_API + '/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                div_msg.className = 'msg-sucesso';
                div_msg.innerHTML = 'Conta criada! Indo para o login...';
                setTimeout(function () {
                    window.location = 'login.html';
                }, 1500);
            } else if (resposta.status == 409) {
                div_msg.className = 'msg-erro';
                div_msg.innerHTML = 'Esse e-mail já está cadastrado.';
            } else {
                div_msg.className = 'msg-erro';
                div_msg.innerHTML = 'Não foi possível criar a conta. Tente de novo.';
            }
        })
        .catch(function () {
            div_msg.className = 'msg-erro';
            console.log('Não consegui falar com o servidor. A API está ligada?');
        });
}

function entrar() {
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let mensagensErro = '';

    if (email.includes('@') == false) {
        mensagensErro = mensagensErro + 'Digite o e-mail que você cadastrou.<br>';
    }

    if (senha == '') {
        mensagensErro = mensagensErro + 'Digite a sua senha.<br>';
    }

    if (mensagensErro != '') {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = mensagensErro;
        return;
    }

    // Confere e-mail e senha no banco (tabela usuario)
    fetch(URL_API + '/usuarios/autenticar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (usuario) {
                    // Guarda quem entrou para usar nas outras páginas
                    sessionStorage.ID_USUARIO = usuario.idUsuario;
                    sessionStorage.NOME_USUARIO = usuario.nome;
                    window.location = 'painel.html';
                });
            } else if (resposta.status == 401) {
                div_msg.className = 'msg-erro';
                div_msg.innerHTML = 'E-mail ou senha incorretos.';
            } else {
                div_msg.className = 'msg-erro';
                div_msg.innerHTML = 'Não foi possível entrar. Tente de novo.';
            }
        })
        .catch(function () {
            div_msg.className = 'msg-erro';
            div_msg.innerHTML = 'Não consegui falar com o servidor. A API está ligada?';
        });
}