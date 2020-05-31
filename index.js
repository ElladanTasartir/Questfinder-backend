/* eslint no-console: ["error", { allow: ["warn", "error", "log"]}] */
const express = require("express");

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello Questfinder!</h1>");
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
  console.log(`Acesso em http://localhost:${port}`);
});
