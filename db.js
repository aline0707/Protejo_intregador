const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com",
  user: "3vAvdd9HPLCJQ5d.root",
  password: " ",
  database: "SentinelaOps",
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