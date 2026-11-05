function temCaractere(ax_texto, ax_de, ax_ate) {
    let ax_i = 0;
    let ax_achou = false;

    while (ax_i < ax_texto.length) {
        if (ax_texto[ax_i] >= ax_de && ax_texto[ax_i] <= ax_ate) {
            ax_achou = true;
        }
        ax_i++;
    }

    return ax_achou;
}

function cadastrar() {
    let ax_nome = ipt_nome.value;
    let ax_email = ipt_email.value;
    let ax_senha = ipt_senha.value;
    let ax_confirmar = ipt_confirmar.value;
    let ax_erros = '';

    if (ax_nome.length < 3) {
        ax_erros = ax_erros + 'O nome precisa ter pelo menos 3 letras.<br>';
    }

    if (ax_email.includes('@') == false || ax_email.includes('.') == false) {
        ax_erros = ax_erros + 'Digite um e-mail válido, com @ e ponto.<br>';
    }

    if (ax_senha.length < 8) {
        ax_erros = ax_erros + 'A senha precisa ter pelo menos 8 caracteres.<br>';
    }

    if (temCaractere(ax_senha, '0', '9') == false) {
        ax_erros = ax_erros + 'A senha precisa ter pelo menos um número.<br>';
    }

    if (temCaractere(ax_senha.toLowerCase(), 'a', 'z') == false) {
        ax_erros = ax_erros + 'A senha precisa ter pelo menos uma letra.<br>';
    }

    if (ax_senha != ax_confirmar) {
        ax_erros = ax_erros + 'A confirmação da senha não é igual à senha.<br>';
    }

    if (ax_erros == '') {
        div_msg.className = 'msg-sucesso';
        div_msg.innerHTML = 'Cadastro validado! O salvamento no banco será ligado na próxima etapa.';
    } else {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = ax_erros;
    }
}

function entrar() {
    let ax_email = ipt_email.value;
    let ax_senha = ipt_senha.value;
    let ax_erros = '';

    if (ax_email.includes('@') == false) {
        ax_erros = ax_erros + 'Digite o e-mail que você cadastrou.<br>';
    }

    if (ax_senha == '') {
        ax_erros = ax_erros + 'Digite a sua senha.<br>';
    }

    if (ax_erros == '') {
        div_msg.className = 'msg-sucesso';
        div_msg.innerHTML = 'Campos preenchidos! A conferência com o banco será ligada na próxima etapa.';
    } else {
        div_msg.className = 'msg-erro';
        div_msg.innerHTML = ax_erros;
    }
}