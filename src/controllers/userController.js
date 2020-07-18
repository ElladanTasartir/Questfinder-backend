// Importamos aqui o model para lidar com usuários já com conexão com o banco de dados
const jwt = require('jsonwebtoken');

const User = require('../model/UserModel');

// Já exportamos aqui nosso código como arrow function async
const create = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const userCreated = await user.register();

    return res.status(201).json(userCreated);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const loginUser = new User(req.body);

    const user = await loginUser.login();

    const { ra, email } = user;

    const token = jwt.sign({ ra, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res
      .status(200)
      .json({ token, message: 'Login validado com sucesso!' });
  } catch (err) {
    next(err);
  }
};

const alter = async (req, res, next) => {
  try {
    const { userRA } = req;

    const alterUser = new User(req.body);

    const alteredUser = await alterUser.alter(userRA);

    return res.status(200).json(alteredUser);
  } catch (err) {
    next(err);
  }
};
// Método reponsável pela pesquisa do usuário no banco de dados
const search = async (req, res, next) => {
  try {
    const searchUser = new User(); // Constante que recebe um novo usuário(atributos)

    // Constante que recebe o retorno da busca de um usuário pelo RA
    const found = await searchUser.search(req.params.ra); // Utiliza o params para utilizar o dado

    // Após a busca ser bem sucedida, retorna o status de sucesso e o usuário encontrado
    return res.status(200).json({ user: found });
  } catch (err) {
    next(err); // Retorna mensagem de erro
  }
};

module.exports = { create, login, alter, search };
