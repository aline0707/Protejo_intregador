const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const usuariosRotas = require("./rotas/usuarios");
app.use("/usuarios", usuariosRotas);

const incidentesRotas = require("./rotas/incidentes");
app.use("/incidentes", incidentesRotas);


module.exports = app;
