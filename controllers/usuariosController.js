const db = require("../db");

// LISTAR TODOS OS USUÁRIOS
exports.listarUsuarios = (req, res) => {
    db.query("SELECT id, nome, email, perfil, ativo FROM usuarios", (erro, resultado) => {
        if (erro) {
            console.error("Erro ao listar:", erro);
            return res.status(500).json({ mensagem: "Erro no servidor" });
        }
        res.status(200).json(resultado);
    });
};

// CRIAR NOVO USUÁRIO
exports.criarUsuario = (req, res) => {
    const { nome, email, senha, perfil, ativo } = req.body;

    const sql = `
        INSERT INTO usuarios (nome, email, senha, perfil, ativo)
        VALUES (?, ?, ?, ?, ?)
    `;

    // O uso de [?] protege contra SQL Injection - Parabéns!
    db.query(sql, [nome, email, senha, perfil, ativo], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao criar:", erro);
            return res.status(500).json(erro);
        }
        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    });
};

// ATUALIZAR USUÁRIO (OU ALTERAR STATUS)
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, email, perfil, ativo } = req.body;

    // COALESCE mantém o valor antigo caso o novo seja nulo
    const sql = `
        UPDATE usuarios 
        SET nome = IFNULL(?, nome), 
            email = IFNULL(?, email), 
            perfil = IFNULL(?, perfil), 
            ativo = IFNULL(?, ativo)
        WHERE id = ?
    `;

    db.query(sql, [nome, email, perfil, ativo, id], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao atualizar:", erro);
            return res.status(500).json(erro);
        }
        res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
    });
};

// ALTERAR STATUS (ATIVAR/DESATIVAR)
exports.alterarStatus = (req, res) => {
    const { id } = req.params;
    const { ativo } = req.body;

    const sql = `
        UPDATE usuarios 
        SET ativo = ?
        WHERE id = ?
    `;

    db.query(sql, [ativo, id], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao alterar status:", erro);
            return res.status(500).json(erro);
        }
        res.status(200).json({ mensagem: "Status do usuário atualizado com sucesso" });
    });
};