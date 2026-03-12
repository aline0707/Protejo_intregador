const db = require("../db");

exports.listarIncidentes = (req, res) => {

  db.query("SELECT * FROM incidentes", (erro, resultado) => {

    if (erro) {
      console.log(erro)
      return res.status(500).json(erro)
    }

    res.json(resultado)

  })

}


exports.criarIncidente = (req, res) => {

  const { titulo, descricao, criticidade, status, cliente, usuario_id, turno_id } = req.body

  const sql = `
  INSERT INTO incidentes
  (titulo, descricao, criticidade, status, cliente, usuario_id, turno_id)
  VALUES (?,?,?,?,?,?,?)
  `

  db.query(sql,
  [titulo, descricao, criticidade, status, cliente, usuario_id, turno_id],

  (erro, resultado) => {

    if (erro) {
      console.log(erro)
      return res.status(500).json(erro)
    }

    res.status(201).json({
      mensagem: "Incidente criado com sucesso"
    })

  })

}

exports.atualizarStatus = (req, res) => {

const { id } = req.params
const { status } = req.body

const sql = "UPDATE incidentes SET status = ? WHERE id = ?"

db.query(sql,[status,id],(erro,resultado)=>{

if(erro){
console.log(erro)
return res.status(500).json(erro)
}

res.json({
mensagem:"Status atualizado"
})

})

}