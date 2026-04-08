const express = require("express");
const router = express.Router();
const incidentesController = require("../controllers/incidentesController");

// ROTAS

router.get("/", incidentesController.listarIncidentes);

router.post("/", incidentesController.criarIncidente);

router.put("/:id", incidentesController.atualizarStatus);

router.get("/estatisticas", incidentesController.estatisticas);

router.get("/:id/logs", incidentesController.buscarLogsIncidente);



module.exports = router;