
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

    if (temCaractere(senha.toLowerCase(), 'a', 'z') == false) {
        mensagensErro = mensagensErro + 'A senha precisa ter pelo menos uma letra.<br>';
    }

    if (senha != confirmarSenha) {
        mensagensErro = mensagensErro + 'A confirmação da senha não é igual à senha.<br>';
    }

    if (mensagensErro == '') {
        div_msg.className = 'msg-sucesso';
        div_msg.innerHTML = 'Cadastro validado! O salvamento no banco será ligado na próxima etapa.';
    } else {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = mensagensErro;
    }
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

    if (mensagensErro == '') {
        div_msg.className = 'msg-sucesso';
        div_msg.innerHTML = 'Campos preenchidos! A conferência com o banco será ligada na próxima etapa.';
    } else {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = mensagensErro;
    }
}
