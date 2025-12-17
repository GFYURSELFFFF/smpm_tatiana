const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["operando", "parada", "manutenção"],
    default: "operando"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Machine", MachineSchema);
