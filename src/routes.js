// Importa do Express pra lidar com rotas
const express = require("express");

// Controlador para lidar com usuários
const userController = require("./controllers/userController");

// Importa o módulo de rotas do Express para lidar com as requisições HTTP
const route = express.Router();

// Rota root
route.get("/", (req, res) => {
  /* string  temporária pra testar a conectividade das rotas.
  Fizemos isto para ajudar no processo de desenvolvimento enquanto testamos
  a integração de devs com o NGROK (script de tunelagem do localhost) para que todos 
  nós possamos testar as rotas com requisições HTTP pelo browser ou pelo Insomnia/Postman

~~SERÁ REMOVIDO EM BREVE E SUBSTITUIDO PELO DEVIDO CODING~~
  */
  res.send("Escrevi e saí correndo");
});

// Rota de registro de usuários que chama o controlador, "userController" pra lidar com cadastros
route.post("/users/register", userController.create);

// Rota de Login
route.post("/login", userController.login);

// exporta as rotas para serem devidamente indexadas no index.js
module.exports = route;
