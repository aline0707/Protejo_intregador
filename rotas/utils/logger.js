const db = require("../db");

/**
 * Função global para registrar logs de auditoria no sistema
 * @param {number} usuario_id - ID do usuário que realizou a ação
 * @param {string} acao - Descrição da ação (ex: "Criou incidente")
 * @param {number|null} incidente_id - ID do incidente relacionado (opcional)
 */
function criarLog(usuario_id, acao, incidente_id = null) {
    const sql = `
        INSERT INTO logs_incidente (usuario_id, acao, incidente_id)
        VALUES (?, ?, ?)
    `;

    // Usamos || null para garantir que o banco aceite caso o ID não seja enviado
    db.query(sql, [usuario_id, acao, incidente_id], (err) => {
        if (err) {
            console.error("❌ Erro ao gravar log no banco de dados:", err);
        } else {
            console.log("✅ Log registrado com sucesso:", acao);
        }
    });
}

module.exports = criarLog;