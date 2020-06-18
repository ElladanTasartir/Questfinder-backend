const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const ValidationError = require('../errors/ValidationError');

// Schema do usuário para criar o documento no banco
const UserSchema = new mongoose.Schema(
  {
    ra: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
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

  encryptPassword() {
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
  }

  // Função responsável por registrar o usuário novo no banco de dados
  async register() {
    this.checkBodyKeys();

    this.validate();

    this.body = {
      ra: this.body.ra,
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };

    if (!(await this.userExists(this.body.ra)))
      throw new ValidationError('Já existe um usuário cadastrado com este RA');

    if (!(await this.emailExists(this.body.email)))
      throw new ValidationError(
        'Já existe um usuário cadastrado com este email',
      );

    this.encryptPassword();

    this.user = await UserModel.create(this.body);
    return this.user;
  }

  checkBodyKeys() {
    if (!this.body.ra) throw new ValidationError('RA é um dado necessário');
    if (!this.body.name) throw new ValidationError('Nome é um dado necessário');
    if (!this.body.email)
      throw new ValidationError('Email é um dado necessário');
    if (!this.body.password)
      throw new ValidationError('Senha é um dado necessário');
  }

  // Função que irá validar os dados do objeto
  validate() {
    if (!validator.isEmail(this.body.email))
      throw new ValidationError('Email inválido');

    if (this.body.password.length < 6 || this.body.password.length > 16)
      throw new ValidationError('Dados inválidos');
  }

  async userExists(ra) {
    const userRA = await UserModel.findOne({ ra });

    return !userRA ? true : null;
  }

  async emailExists(email) {
    const userEmail = await UserModel.findOne({ email });

    return !userEmail ? true : null;
  }

  async login() {
    this.body = {
      ra: this.body.ra,
      password: this.body.password,
    };

    this.user = await UserModel.findOne({ ra: this.body.ra });

    if (!this.user) {
      throw new ValidationError('Usuário não encontrado');
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.user = null;
      throw new ValidationError('A senha digitada é inválida');
    }
  }

  async alter(ra) {
    this.checkBodyKeys();

    this.validate();

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };

    this.encryptPassword();

    if (await this.userExists(ra))
      throw new ValidationError('Este usuário não existe!');

    await UserModel.updateOne({ ra }, this.body);

    this.user = await UserModel.findOne({ ra });

    return this.user;
  }

  // Função que faz a busca por usuário registrado, pelo RA
  async search(ra) {
    // Pesquisa primeira ocorrência do usuário com o RA no banco (no caso, a única ocorrência)
    this.user = await UserModel.findOne({ ra });

    // Se não for usuário válido, retorna a mensagem abaixo
    if (!this.user) {
      throw new ValidationError('Usuário não encontrado');
    }

    // Retorna o usuário caso a busca seja bem sucedida
    return this.user;
  }
}

module.exports = User;
