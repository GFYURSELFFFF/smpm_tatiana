const express = require("express");
const router = express.Router();
const controller = require("../controllers/machineController");

router.post("/", controller.createMachine);
router.get("/", controller.getMachines);

module.exports = router;
