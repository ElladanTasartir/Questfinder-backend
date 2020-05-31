// Importamos aqui o model para lidar com usuários já com conexão com o banco de dados
const User = require("../model/UserModel");

// Já exportamos aqui nosso código como arrow function async
exports.create = async (req, res) => {
  // Instância nosso model já pegando o corpo da requisição
  const user = new User(req.body);
  // Usamos o model para validar e registrar no banco de dados o usuário criado
  const userCreated = await user.register();

  // caso a nossa const userCreated não retorne como esperado,  lançamos como response o metodo do Model, User, chamado errors e aqui chamado como user.errors
  if (!userCreated) return res.json(user.errors);

  // Se tudo correr bem e o if acima não for acionado, retornamos o usuário criado à rota
  return res.json(userCreated);
};

exports.login = async (req, res) => {
  // Declaração da instância de User
  const login = new User(req.body);
  // Chamamos o model com a função de login para a validação
  await login.login();
  // Se o usuário não existir, retornamos o método do model com o erro
  if (!login.user) return res.json(login.errors);

  return res.send("Login validado com sucesso!");
};
