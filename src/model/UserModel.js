const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

// Schema do usuário para criar o documento no banco
const UserSchema = new mongoose.Schema({
  ra: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, require: true },
});

// Criado o modelo baseado no schema
const UserModel = mongoose.model("User", UserSchema);

// Classe de usuário responsávle por validar e criar os dados
class User {
  constructor(body) {
    this.body = body;
    this.user = null;
    this.errors = [];
  }

  // Função responsável por registrar o usuário novo no banco de dados
  async register() {
    try {
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
      if (this.errors.length > 0) throw new Error();

      this.user = await UserModel.create(this.body);
      return this.user;
    } catch (err) {
      return false;
    }
  }

  // Função que irá validar os dados do objeto
  validate() {
    try {
      if (!validator.isEmail(this.body.email)) throw new Error();

      if (this.body.senha.length < 6 || this.body.senha.length > 16)
        throw new Error();
    } catch (err) {
      this.errors.push("Dados inválidos");
    }
  }

  async userExists() {
    const userRA = await UserModel.findOne({ ra: this.body.ra });

    if (userRA) this.errors.push("Já existe um usuário cadastrado com este RA");

    const userEmail = await UserModel.findOne({ email: this.body.email });

    if (userEmail)
      this.errors.push("Já existe um usuário cadastrado com este Email");
  }

  // eslint-disable-next-line consistent-return
  async login() {
    try {
      this.body = {
        ra: this.body.ra,
        senha: this.body.senha,
      };

      if (this.errors.length > 0) throw new Error();

      this.user = await UserModel.findOne({ ra: this.body.ra });

      if (!this.user) {
        this.errors.push("Usuário não encontrado");
        throw new Error();
      }

      if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
        this.errors.push("A senha digitada é inválida");
        this.user = null;
        throw new Error();
      }
    } catch (err) {
      return false;
    }
  }
}

module.exports = User;
