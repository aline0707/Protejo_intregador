const db = require("../db");

// LISTAR INCIDENTES
exports.listarIncidentes = (req, res) => {

  db.query("SELECT * FROM incidentes", (erro, resultado) => {

    if (erro) {
      console.log(erro)
      return res.status(500).json(erro)
    }

    res.json(resultado)

  })

}


// CRIAR INCIDENTE
exports.criarIncidente = (req, res) => {

  const { titulo, descricao, criticidade, status, cliente, usuario_id, turno_id } = req.body

  const sql = `
  INSERT INTO incidentes
  (titulo, descricao, criticidade, status, cliente, usuario_id, turno_id)
  VALUES (?,?,?,?,?,?,?)
  `

  db.query(
    sql,
    [titulo, descricao, criticidade, status, cliente, usuario_id, turno_id],
    (erro) => {

      if (erro) {
        console.log(erro)
        return res.status(500).json(erro)
      }

      res.status(201).json({
        mensagem: "Incidente criado com sucesso"
      })

    }
  )

}


// ATUALIZAR STATUS DO INCIDENTE
exports.atualizarStatus = (req, res) => {

  const { id } = req.params
  const { status, usuario_id } = req.body

  const sqlUpdate = `
  UPDATE incidentes
  SET status = ?, fechado_em = NOW()
  WHERE id = ?
  `

  db.query(sqlUpdate, [status, id], (erro) => {

    if (erro) {
      console.log(erro)
      return res.status(500).json(erro)
    }

    // CRIA LOG AUTOMÁTICO
    const sqlLog = `
    INSERT INTO logs_incidente
    (incidente_id, usuario_id, comentario, status_novo)
    VALUES (?,?,?,?)
    `

    db.query(sqlLog, [
      id,
      usuario_id,
      "Status alterado",
      status
    ])

    res.json({
      mensagem: "Status atualizado e log registrado"
    })

  })

}


// BUSCAR LOGS DO INCIDENTE
exports.buscarLogsIncidente = (req, res) => {

  const { id } = req.params

  const sql = `
  SELECT 
  logs_incidente.id,
  logs_incidente.comentario,
  logs_incidente.status_novo,
  logs_incidente.criado_em,
  usuarios.nome AS usuario
  FROM logs_incidente
  JOIN usuarios ON usuarios.id = logs_incidente.usuario_id
  WHERE incidente_id = ?
  ORDER BY criado_em DESC
  `

  db.query(sql, [id], (erro, resultado) => {

    if (erro) {
      console.log(erro)
      return res.status(500).json(erro)
    }

    res.json(resultado)

  })

}
exports.estatisticas = (req, res) => {

const sql = `
SELECT
SUM(status = 'aberto') AS abertos,
SUM(status = 'analise') AS analise,
SUM(status = 'resolvido') AS resolvidos,
SUM(criticidade = 'alta') AS criticos
FROM incidentes
`

db.query(sql,(erro,resultado)=>{

if(erro){
console.log(erro)
return res.status(500).json(erro)
}

res.json(resultado[0])

})

}