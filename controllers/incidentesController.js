const db = require("../db");

// 1. LISTAR TODOS OS INCIDENTES
exports.listarIncidentes = (req, res) => {
    const sql = "SELECT * FROM incidentes ORDER BY id DESC";
    db.query(sql, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
};

// 2. CRIAR NOVO INCIDENTE (Com log automático!)
exports.criarIncidente = (req, res) => {
    const { titulo, descricao, criticidade, status, cliente, usuario_id } = req.body;

    const sqlIncidente = `
        INSERT INTO incidentes (titulo, descricao, criticidade, status, cliente, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sqlIncidente, [titulo, descricao, criticidade, status, cliente, usuario_id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);

        const novoId = resultado.insertId;

        // BÔNUS: Criar log automaticamente ao abrir incidente
        const sqlLog = "INSERT INTO logs_incidente (usuario_id, acao, incidente_id) VALUES (?, ?, ?)";
        const acao = `Criou o incidente: ${titulo}`;
        
        db.query(sqlLog, [usuario_id, acao, novoId], (errLog) => {
            if (errLog) console.error("Erro ao gerar log de criação:", errLog);
            res.status(201).json({ mensagem: "Incidente e log criados!", id: novoId });
        });
    });
};

// 3. ATUALIZAR STATUS (Resolver Incidente)
exports.atualizarStatus = (req, res) => {
    const { id } = req.params;
    const { status, usuario_id } = req.body;

    const sql = "UPDATE incidentes SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);

        // Gera log da resolução
        const sqlLog = "INSERT INTO logs_incidente (usuario_id, acao, incidente_id) VALUES (?, ?, ?)";
        const acao = `Alterou status para: ${status}`;

        db.query(sqlLog, [usuario_id || 1, acao, id], () => {
            res.json({ mensagem: "Status atualizado!" });
        });
    });
};

// 4. BUSCAR LOGS DE UM INCIDENTE ESPECÍFICO
exports.buscarLogsIncidente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM logs_incidente WHERE incidente_id = ? ORDER BY data DESC";
    db.query(sql, [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
};

// 5. ESTATÍSTICAS PARA O PAINEL NOC (Gráficos)
exports.estatisticas = (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM incidentes WHERE status = 'aberto') as abertos,
            (SELECT COUNT(*) FROM incidentes WHERE status = 'analise') as analise,
            (SELECT COUNT(*) FROM incidentes WHERE status = 'resolvido') as resolvidos,
            (SELECT COUNT(*) FROM incidentes WHERE criticidade = 'critica') as criticos
        FROM dual
    `;
    db.query(sql, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado[0]);
    });
};