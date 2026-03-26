const express = require("express");
const router = express.Router();
// Altere de authController para loginController
const authController = require("../controllers/loginController");

// Esta rota processa o login enviado pelo seu HTML
// O "/" aqui completa o "/login" que você definiu no app.js
router.post("/", authController.login);

module.exports = router;