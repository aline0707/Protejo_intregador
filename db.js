const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sentinelaops"
});

conexao.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco:", err);
  } else {
    console.log("Banco conectado!");
  }
});

module.exports = conexao;
