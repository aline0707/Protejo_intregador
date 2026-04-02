const db = require("../db"); 
// Importação ajustada para o caminho onde sua pasta utils se encontra na imagem
const sugerirSolucao = require("../rotas/utils/iaSugestao");

// 1. LISTAR TODOS OS INCIDENTES
exports.listarIncidentes = (req, res) => {
    const sql = "SELECT * FROM incidentes ORDER BY id DESC";
    db.query(sql, (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao listar incidentes", detalhe: erro });
        res.json(resultado);
    });
};

// 2. CRIAR NOVO INCIDENTE (Com IA + Log Automático)
exports.criarIncidente = (req, res) => {
    const { titulo, descricao, criticidade, status, cliente, usuario_id } = req.body;

    // Gerar sugestão da IA antes de salvar
    const textoParaIA = `${titulo} ${descricao}`;
    const sugestaoIA = sugerirSolucao(textoParaIA);

    // Logs para verificar no terminal do VS Code se a IA está processando
    console.log("DEBUG - Texto enviado:", textoParaIA);
    console.log("DEBUG - Resposta da IA:", sugestaoIA);

    const sqlIncidente = `
        INSERT INTO incidentes (titulo, descricao, criticidade, status, cliente, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sqlIncidente, [titulo, descricao, criticidade, status, cliente, usuario_id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao criar incidente", detalhe: erro });

        const novoId = resultado.insertId;

        // Registro de Log automático
        const sqlLog = "INSERT INTO logs_incidente (usuario_id, acao, incidente_id) VALUES (?, ?, ?)";
        const acao = `Incidente criado: ${titulo}`;
        
        db.query(sqlLog, [usuario_id, acao, novoId], (errLog) => {
            if (errLog) console.error("Erro ao gerar log de criação:", errLog);
            
            // Retorna o sucesso com a sugestão da IA inclusa
            res.status(201).json({ 
                mensagem: "Incidente e log criados!", 
                id: novoId,
                sugestaoIA 
            });
        });
    });
};

// 3. ATUALIZAR STATUS (Com Log)
exports.atualizarStatus = (req, res) => {
    const { id } = req.params;
    const { status, usuario_id } = req.body;

    const sql = "UPDATE incidentes SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: "Erro ao atualizar status", detalhe: erro });

        const sqlLog = "INSERT INTO logs_incidente (usuario_id, acao, incidente_id) VALUES (?, ?, ?)";
        const acao = `Alterou status para: ${status}`;

        db.query(sqlLog, [usuario_id || 1, acao, id], (errLog) => {
            if (errLog) console.error("Erro ao gerar log de status:", errLog);
            res.json({ mensagem: "Status atualizado com sucesso!" });
        });
    });
};

// 4. BUSCAR LOGS DE UM INCIDENTE
exports.buscarLogsIncidente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM logs_incidente WHERE incidente_id = ? ORDER BY data DESC";
    db.query(sql, [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
};

// 5. ESTATÍSTICAS (Painel NOC)
exports.estatisticas = (req, res) => {
    const sql = `
        SELECT 
            SUM(CASE WHEN status = 'aberto' THEN 1 ELSE 0 END) as abertos,
            SUM(CASE WHEN status = 'analise' THEN 1 ELSE 0 END) as analise,
            SUM(CASE WHEN status = 'resolvido' THEN 1 ELSE 0 END) as resolvidos,
            SUM(CASE WHEN criticidade = 'critica' THEN 1 ELSE 0 END) as criticos
        FROM incidentes
    `;
    db.query(sql, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado[0]);
    });
};
// backend/controllers/incidentesController.js

