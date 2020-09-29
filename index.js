const express = require("express");
const app = express();

const brain = require("brain.js");
const network = new brain.recurrent.LSTM();
const tdata = require("./data.json");
network.fromJSON(tdata);

app.use(express.static("public"));
app.use(express.json());

app.get("/evaluar/:texto", (req, res) => {
  const texto = req.params.texto;
  const result = network.run(texto.trim());

  res.json({
    input: texto,
    output: result,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server on por" + PORT);
});
//holas
