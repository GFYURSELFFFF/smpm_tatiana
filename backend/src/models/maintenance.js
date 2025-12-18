const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true
  },
  type: {
    type: String,
    enum: ["preventiva", "corretiva"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
