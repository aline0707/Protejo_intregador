const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const usuarios = require("./rotas/usuarios")
const incidentes = require("./rotas/incidentes")
const login = require("./rotas/login")

app.use("/usuarios", usuarios)
app.use("/incidentes", incidentes)
app.use(login)

module.exports = app