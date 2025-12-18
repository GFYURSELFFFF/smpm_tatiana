const mongoose = require("mongoose");

// Schema define como o documento será salvo no MongoDB
const MaintenanceSchema = new mongoose.Schema({
  // Referência à máquina associada à manutenção
  machine: {
    type: mongoose.Schema.Types.ObjectId, // ID da máquina
    ref: "Machine", // referência ao model Machine
    required: true
  },

  // Tipo da manutenção
  type: {
    type: String,
    enum: ["preventiva", "corretiva"], // valores permitidos
    required: true
  },

  // Descrição do que foi feito ou do problema
  description: {
    type: String,
    required: true
  },

  // Data da manutenção
  date: {
    type: Date,
    default: Date.now // se não passar, usa a data atual
  }
});

// Exporta o model para ser usado nos controllers
module.exports = mongoose.model("Maintenance", MaintenanceSchema);
