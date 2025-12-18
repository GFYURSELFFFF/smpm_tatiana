require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/smpm")
  .then(() => console.log("MongoDB conectado ao banco smpm"))
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

// rotas
app.use("/machines", require("./src/routes/machine"));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.use("/maintenance", require("./src/routes/Maintenance"));
