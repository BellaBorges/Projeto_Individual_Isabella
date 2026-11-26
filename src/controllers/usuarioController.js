var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (!email || !senha) {
        res.status(400).send("Informe e-mail e senha!");
        return;
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length == 1) {
                res.status(200).json({
                    idUsuario: resultado[0].idUsuario,
                    nome: resultado[0].nome,
                    email: resultado[0].email
                });
            } else {
                res.status(401).send("E-mail ou senha incorretos");
            }
        })
        .catch(function (erro) {
            console.log("Erro: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro no servidor");
        });
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (!nome || !email || !senha) {
        res.status(400).send("Preencha nome, e-mail e senha!");
        return;
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(function (resultado) {
            // insertId é o id_usuario que o MySQL acabou de criar
            res.status(200).json({ idUsuario: resultado.insertId });
        })
        .catch(function (erro) {
            console.log("Erro: ", erro.sqlMessage || erro);

            if (erro.code == "ER_DUP_ENTRY") {
                res.status(409).send("E-mail já cadastrado");
            } else {
                res.status(500).json(erro.sqlMessage || "Erro no servidor");
            }
        });
}

module.exports = {
    autenticar,
    cadastrar
};