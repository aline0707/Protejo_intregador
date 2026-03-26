const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// LISTAR TODOS OS USUÁRIOS
// Chamado pelo fetch("http://localhost:3000/usuarios")
router.get("/", usuariosController.listarUsuarios);

// CRIAR NOVO USUÁRIO
// Chamado pelo fetch com método POST
router.post("/", usuariosController.criarUsuario);

// ATUALIZAR USUÁRIO (NOME, EMAIL, PERFIL)
// Chamado pelo fetch("http://localhost:3000/usuarios/ID") com método PUT
router.put("/:id", usuariosController.atualizarUsuario);

// ALTERAR STATUS (ATIVAR/DESATIVAR)
// Você pode usar a mesma rota de atualizar ou uma específica
router.patch("/:id/status", usuariosController.alterarStatus);

module.exports = router;
