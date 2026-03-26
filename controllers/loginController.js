const db = require("../db");

// Esta função é chamada pela rota router.post("/") em rotas/login.js
exports.login = (req, res) => {
    // Pegamos o usuário (que no seu HTML é o e-mail) e a senha do corpo da requisição
    const { usuario, senha } = req.body;

    // SQL que busca o usuário pelo e-mail e verifica se ele está ativo
    const sql = `
        SELECT id, nome, email, perfil, ativo 
        FROM usuarios 
        WHERE email = ? AND senha = ?
    `;

    db.query(sql, [usuario, senha], (erro, resultado) => {
        if (erro) {
            console.error("Erro interno no banco de dados:", erro);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Se o banco retornar alguma linha, as credenciais estão corretas
        if (resultado.length > 0) {
            const user = resultado[0];

            // Verificação de segurança: o usuário está ativo?
            if (user.ativo === 0) {
                return res.status(403).json({
                    autenticado: false,
                    mensagem: "Usuário desativado. Contate o administrador."
                });
            }

            // Se chegou aqui, login deu certo!
            // Retornamos os dados que o seu frontend espera (autenticado: true)
            res.json({
                autenticado: true,
                usuario: {
                    id: user.id,
                    nome: user.nome,
                    perfil: user.perfil
                }
            });
        } else {
            // Se o array de resultado estiver vazio, o e-mail ou senha não batem
            res.status(401).json({
                autenticado: false,
                mensagem: "E-mail ou senha incorretos."
            });
        }
    });
};