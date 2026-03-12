const express = require("express");
const router = express.Router();
const incidentesController = require("../controllers/incidentesController");

router.get("/", incidentesController.listarIncidentes);
router.post("/", incidentesController.criarIncidente);
router.put("/:id", incidentesController.atualizarStatus)

module.exports = router;