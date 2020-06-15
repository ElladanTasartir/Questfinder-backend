const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const ValidationError = require('../errors/ValidationError');

// Schema do usuário para criar o documento no banco
const UserSchema = new mongoose.Schema(
  {
    ra: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, require: true },
  },
  { versionKey: false },
);

// Criado o modelo baseado no schema
const UserModel = mongoose.model('User', UserSchema);

// Classe de usuário responsávle por validar e criar os dados
class User {
  constructor(body) {
    this.body = body;
    this.user = null;
  }

  // Função responsável por registrar o usuário novo no banco de dados
  async register() {
    this.checkBodyKeys();

    this.validate();

    this.body = {
      ra: this.body.ra,
      nome: this.body.nome,
      email: this.body.email,
      senha: this.body.senha,
    };

    await this.userExists();

    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

    this.user = await UserModel.create(this.body);
    return this.user;
  }

  checkBodyKeys() {
    if (!this.body.ra) throw new ValidationError('RA é um dado necessário');
    if (!this.body.nome) throw new ValidationError('Nome é um dado necessário');
    if (!this.body.email)
      throw new ValidationError('Email é um dado necessário');
    if (!this.body.senha)
      throw new ValidationError('Senha é um dado necessário');
  }

  // Função que irá validar os dados do objeto
  validate() {
    if (!validator.isEmail(this.body.email))
      throw new ValidationError('Email inválido');

    if (this.body.senha.length < 6 || this.body.senha.length > 16)
      throw new ValidationError('Dados inválidos');
  }

  async userExists() {
    const userRA = await UserModel.findOne({ ra: this.body.ra });

    if (userRA)
      throw new ValidationError('Já existe um usuário cadastrado com este RA');

    const userEmail = await UserModel.findOne({ email: this.body.email });

    if (userEmail)
      throw new ValidationError(
        'Já existe um usuário cadastrado com este Email',
      );
  }

  async login() {
    this.body = {
      ra: this.body.ra,
      senha: this.body.senha,
    };

    this.user = await UserModel.findOne({ ra: this.body.ra });

    if (!this.user) {
      throw new ValidationError('Usuário não encontrado');
    }

    if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.user = null;
      throw new ValidationError('A senha digitada é inválida');
    }
  }
}

module.exports = User;
