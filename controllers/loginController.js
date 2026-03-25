const db = require("../db")

exports.login = (req,res)=>{

const { usuario, senha } = req.body

const sql = `
SELECT id,nome,email,perfil
FROM usuarios
WHERE email = ? AND senha = ?
`

db.query(sql,[usuario,senha],(erro,resultado)=>{

if(erro){
console.log(erro)
return res.status(500).json(erro)
}

if(resultado.length > 0){

res.json({
autenticado:true,
usuario:resultado[0]
})

}else{

res.json({
autenticado:false
})

}

})

}