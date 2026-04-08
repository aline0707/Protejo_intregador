const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "SEU_HOST_DO_TIDB",
  user: "SEU_USUARIO",
  password: "SUA_SENHA",
  database: "sentinelaops",
  port: 4000, // Porta padrão TiDB
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});

conexao.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no TiDB:", err.message);
  } else {
    console.log("Conectado com sucesso ao TiDB!");
  }
});

module.exports = conexao;