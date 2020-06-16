// Importamos aqui o model para lidar com usuários já com conexão com o banco de dados
const User = require('../model/UserModel');

// Já exportamos aqui nosso código como arrow function async
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const userCreated = await user.register();

    return res.status(201).json(userCreated);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const login = new User(req.body);

    await login.login();

    return res.status(200).json({ message: 'Login validado com sucesso!' });
  } catch (err) {
    next(err);
  }
};
