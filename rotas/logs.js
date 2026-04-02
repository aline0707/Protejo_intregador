const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    // aqui alterei 'L.data' para 'L.criado_em', que é o nome real da coluna na tabela logs_incidente
    const sql = `
        SELECT 
            L.id, 
            IFNULL(U.nome, 'Sistema') AS usuario, 
            L.acao, 
            L.incidente_id, 
            L.criado_em AS data 
        FROM logs_incidente L
        LEFT JOIN usuarios U ON U.id = L.usuario_id
        ORDER BY L.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro no SQL:", err);
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

module.exports = router;