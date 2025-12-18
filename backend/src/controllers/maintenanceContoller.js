// Importa o model Maintenance
const Maintenance = require("../models/maintenance");
// Importa Machine para validar se a máquina existe
const Machine = require("../models/Machine");

/**
 * Cria uma manutenção para uma máquina específica
 * Endpoint: POST /maintenance
 */
exports.createMaintenance = async (req, res) => {
  const { machineId, type, description } = req.body;

  // Valida se o ID da máquina foi enviado
  if (!machineId) {
    return res.status(400).json({ error: "machineId é obrigatório" });
  }

  // Valida tipo da manutenção
  if (!["preventiva", "corretiva"].includes(type)) {
    return res.status(400).json({ error: "Tipo de manutenção inválido" });
  }

  // Valida descrição
  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Descrição é obrigatória" });
  }

  try {
    // Verifica se a máquina existe
    const machineExists = await Machine.findById(machineId);
    if (!machineExists) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    // Cria a manutenção vinculada à máquina
    const maintenance = await Maintenance.create({
      machine: machineId,
      type,
      description
    });

    res.status(201).json(maintenance);
  } catch (err) {
    res.status(400).json({ error: "ID de máquina inválido" });
  }
};

/**
 * Lista todas as manutenções de uma máquina
 * Endpoint: GET /maintenance/:machineId
 */
exports.getMaintenanceByMachine = async (req, res) => {
  const { machineId } = req.params;

  try {
    // Busca manutenções da máquina e traz os dados da máquina junto (populate)
    const maintenances = await Maintenance.find({ machine: machineId })
      .populate("machine", "name sector status");

    res.json(maintenances);
  } catch (err) {
    res.status(400).json({ error: "ID de máquina inválido" });
  }
};

/**
 * Atualiza uma manutenção existente
 * Endpoint: PUT /maintenance/:id
 */
exports.updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const { type, description } = req.body;

  // Valida tipo, se enviado
  if (type && !["preventiva", "corretiva"].includes(type)) {
    return res.status(400).json({ error: "Tipo de manutenção inválido" });
  }

  try {
    // Busca e atualiza a manutenção
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      {
        type,
        description
      },
      {
        new: true,         // retorna o objeto atualizado
        runValidators: true // respeita regras do schema
      }
    );

    // Se não encontrou o ID
    if (!updatedMaintenance) {
      return res.status(404).json({ error: "Manutenção não encontrada" });
    }

    res.json(updatedMaintenance);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
};

/**
 * Remove uma manutenção do sistema
 * Endpoint: DELETE /maintenance/:id
 */
exports.deleteMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    // Se não encontrou o registro
    if (!deletedMaintenance) {
      return res.status(404).json({ error: "Manutenção não encontrada" });
    }

    res.json({ message: "Manutenção removida com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
};
