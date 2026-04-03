const express = require("express");
const cors = require("cors");

// Importando as rotas
const usuarios = require("./rotas/usuarios");
const incidentes = require("./rotas/incidentes");
const login = require("./rotas/login");
const logs = require("./rotas/logs"); // Adicionei a rota de logs aqui

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve os arquivos da pasta 'public' (onde estão os HTMLs)
app.use(express.static("public"));

// Configuração das Rotas
app.use("/usuarios", usuarios);
app.use("/incidentes", incidentes);
app.use("/logs", logs); // Rota de logs configurada
app.use("/login", login);

// Rota padrão para verificar se o servidor está online
app.get("/status", (req, res) => {
    res.json({ mensagem: "Servidor SentinelaOps online!" });
});

module.exports = app;