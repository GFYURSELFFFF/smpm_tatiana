// Importa o model Machine (estrutura da coleção no MongoDB)
const Machine = require("../models/Machine");

/**
 * Cria uma nova máquina no banco de dados
 * Endpoint: POST /machines
 */
exports.createMachine = async (req, res) => {
  // Extrai os dados enviados no corpo da requisição
  const { name, sector, status } = req.body;

  // === VALIDAÇÕES ===
  // Verifica se o nome existe, é string e não está vazio
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Nome da máquina inválido" });
  }

  // Verifica se o setor existe e é string válida
  if (!sector || typeof sector !== "string" || sector.trim() === "") {
    return res.status(400).json({ error: "Setor inválido" });
  }

  // Se status for enviado, ele precisa estar dentro dos valores permitidos
  if (status && !["operando", "parada", "manutenção"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    // Cria o documento no MongoDB
    const machine = await Machine.create({ name, sector, status });

    // Retorna o objeto criado com status HTTP 201 (Created)
    res.status(201).json(machine);
  } catch (err) {
    // Erro inesperado (ex: falha de conexão com o banco)
    res.status(500).json({ error: err.message });
  }
};

/**
 * Lista todas as máquinas cadastradas
 * Endpoint: GET /machines
 */
exports.getMachines = async (req, res) => {
  try {
    // Busca todas as máquinas na coleção
    const machines = await Machine.find();

    // Retorna o array de máquinas
    res.json(machines);
  } catch (err) {
    // Erro genérico de servidor
    res.status(500).json({ error: err.message });
  }
};

/**
 * Atualiza uma máquina existente pelo ID
 * Endpoint: PUT /machines/:id
 */
exports.updateMachine = async (req, res) => {
  // ID vem da URL (params)
  const { id } = req.params;

  try {
    // Atualiza a máquina e retorna o novo valor ({ new: true })
    const machine = await Machine.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // Se não encontrou a máquina
    if (!machine) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    // Retorna a máquina atualizada
    res.json(machine);
  } catch (err) {
    // Geralmente erro de ID malformado
    res.status(400).json({ error: "ID inválido" });
  }
};

/**
 * Remove uma máquina do banco pelo ID
 * Endpoint: DELETE /machines/:id
 */
exports.deleteMachine = async (req, res) => {
  const { id } = req.params;

  try {
    // Remove a máquina do banco
    const machine = await Machine.findByIdAndDelete(id);

    // Caso o ID exista mas não tenha registro
    if (!machine) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    // Confirma remoção
    res.json({ message: "Máquina removida com sucesso" });
  } catch (err) {
    // Erro de ID inválido
    res.status(400).json({ error: "ID inválido" });
  }
};
