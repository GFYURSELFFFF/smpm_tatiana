const Machine = require("../models/Machine");

exports.createMachine = async (req, res) => {
  const { name, sector, status } = req.body;

  // validações básicas
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Nome da máquina inválido" });
  }

  if (!sector || typeof sector !== "string" || sector.trim() === "") {
    return res.status(400).json({ error: "Setor inválido" });
  }

  if (status && !["operando", "parada", "manutenção"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    const machine = await Machine.create({ name, sector, status });
    res.status(201).json(machine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMachine = async (req, res) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!machine) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.json(machine);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
};

exports.deleteMachine = async (req, res) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findByIdAndDelete(id);

    if (!machine) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.json({ message: "Máquina removida com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
};
