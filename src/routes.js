// Importa do Express pra lidar com rotas
const express = require('express');

// Controlador para lidar com usuários
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');

// Importa o módulo de rotas do Express para lidar com as requisições HTTP
const route = express.Router();

// Rota de registro de usuários que chama o controlador, "userController" pra lidar com cadastros
route.post('/users/register', userController.create);

// Rota de Login
route.post('/login', userController.login);

// Rota de Procurar Usuário
route.get('/users/:ra', userController.search);

route.post('/events', eventController.create);
// exporta as rotas para serem devidamente indexadas no index.js
module.exports = route;
