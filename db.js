const conexao = mysql.createConnection({
  host:     process.env.DB_HOST     || "gateway01.us-east-1.prod.aws.tidbcloud.com",
  user:     process.env.DB_USER     || "3vAvdd9HPLCJQ5d.root",
  password: process.env.DB_PASS     || "",
  database: process.env.DB_NAME     || "SentinelaOps",
  port:     process.env.DB_PORT     || 4000,
  ssl: {
    minVersion: "TLSv1.2",
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