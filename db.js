const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com", // EXEMPLO: Use o host do TiDB
  user: "seu_usuario.root",                         // Usuário do TiDB
  password: " ",                    // Senha do TiDB
  database: "sentinelaops",                         // Nome do banco
  port: 4000,                                       // O TiDB geralmente usa a porta 4000 (e não 3306)
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true                       // TiDB exige conexão segura SSL
  }
});


conexao.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco:", err);
  } else {
    console.log("Banco conectado!");
  }
});

module.exports = conexao;
