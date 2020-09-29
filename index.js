const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log("Server on PORT " + PORT);
});
//holas
