const express = require("express");
const router = express.Router();
const controller = require("../controllers/machineController");

router.post("/", controller.createMachine);
router.get("/", controller.getMachines);
router.put("/:id", controller.updateMachine);
router.delete("/:id", controller.deleteMachine);

module.exports = router;
