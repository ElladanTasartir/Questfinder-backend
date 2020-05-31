/* eslint no-console: ["error", { allow: ["warn", "error", "log"]}] */
require("dotenv").config();
// Importamos o Express para resolver rotas
const express = require("express");
// Importamos o Mongoose para lidar com banco de dados e resolver questões relacionadas ao banco de dados
const mongoose = require("mongoose");

// Criamos de fato nosso app Express
const app = express();

// Configurações do banco de dados, tratamento de erros, configurações adicionais e etc
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[*]Banco de Dados Conectado");
    app.emit("connect");
  })
  .catch((e) => console.error(e));
// Chamamos nosso arquivo local, routes.js, para resolver as rotas aqui no index
const route = require("./routes");

// Define a porta de conexão para o app no browser       Obs: mais sobre a conexão entre devs com NGROK em routes.js
const port = process.env.PORT || 3333;

// Dizemos aqui pro app Express que queremos usar Json
app.use(express.json());

// Dizemos aqui pro app Express que iremos usar Rotas
app.use(route);

// Abre um servidor e começa a escutar na porta definida em local host "const port"
app.on("connect", () => {
  app.listen(port, () => {
    console.log(`[*]Servidor iniciado na porta ${port}`);
    console.log(`[*]Acesso em http://localhost:${port}`);
  });
});
