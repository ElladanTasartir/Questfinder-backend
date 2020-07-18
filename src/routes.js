// Importa do Express pra lidar com rotas
const express = require('express');

// Controlador para lidar com usuários
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const loginRequired = require('./middlewares/loginRequired');

// Importa o módulo de rotas do Express para lidar com as requisições HTTP
const route = express.Router();

// Rota de registro de usuários que chama o controlador, "userController" pra lidar com cadastros
route.post('/users/', userController.create);

// Rota de Login
route.post('/signin', userController.login);

route.put('/users/', loginRequired, userController.alter);

// Rota de Procurar Usuário
route.get('/users/:ra', loginRequired, userController.search);

route.post('/events', loginRequired, eventController.create);

route.get('/events', loginRequired, eventController.search);

route.patch('/events/:id', loginRequired, eventController.inativate);

route.put('/events/:id', loginRequired, eventController.alter);
// exporta as rotas para serem devidamente indexadas no index.js
module.exports = route;
