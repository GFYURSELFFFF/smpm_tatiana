const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceController");

// Cria manutenção
router.post("/", controller.createMaintenance);

// Lista manutenções de uma máquina
router.get("/:machineId", controller.getMaintenanceByMachine);

// Atualiza uma manutenção existente
router.put("/:id", controller.updateMaintenance);

// Deleta uma manutenção
router.delete("/:id", controller.deleteMaintenance);


module.exports = router;
