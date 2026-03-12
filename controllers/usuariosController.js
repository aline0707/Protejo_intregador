const db = require("../db");

exports.listarUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (erro, resultado) => {

    if (erro) {
      return res.status(500).json(erro);
    }

    res.status(200).json(resultado);

  });
};
exports.criarUsuario = (req, res) => {

  const { nome, email, senha, perfil, ativo } = req.body;

  const sql = `
  INSERT INTO usuarios (nome,email,senha,perfil,ativo)
  VALUES (?,?,?,?,?)
  `;

  db.query(sql, [nome, email, senha, perfil, ativo], (erro, resultado) => {

    if (erro) {
      return res.status(500).json(erro);
    }

    res.status(201).json({
      mensagem: "Usuário criado com sucesso"
    });

  });

};