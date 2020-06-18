const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { versionKey: false },
);

const EventModel = mongoose.model('Event', EventSchema);

class Event {
  constructor(body) {
    this.body = body;
    this.event = null;
  }

  checkBodyKeys() {
    if (!this.body.name)
      throw new ValidationError('Nome do Evento é um atributo obrigatório');
    if (!this.body.description)
      throw new ValidationError(
        'Descrição do Evento é um atributo obrigatório',
      );
    if (!this.body.date)
      throw new ValidationError('Data do Evento é um atributo obrigatório');
    if (!this.body.latitude || !this.body.longitude)
      throw new ValidationError('Posição do Evento é um atributo obrigatório');
  }

  validate() {
    if (this.body.name.length === 0)
      throw new ValidationError('O nome do evento precisa existir');

    const currentDate = new Date(Date.now()).toLocaleDateString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
    const eventDate = new Date(this.body.date).toLocaleDateString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
    if (currentDate >= eventDate)
      throw new ValidationError(
        'A data do evento precisa ser posterior ao dia atual',
      );

    if (this.body.description.length < 10)
      throw new ValidationError(
        'A descrição do evento precisa ter mais de 10 caracteres',
      );
  }

  async register() {
    this.checkBodyKeys();
    this.validate();

    this.body = {
      name: this.body.name,
      description: this.body.description,
      date: this.body.date,
      latitude: this.body.latitude,
      longitude: this.body.longitude,
      active: this.body.active,
    };

    this.event = await EventModel.create(this.body);
    return this.event;
  }

  async search(filter) {
    this.event = await EventModel.find(filter);

    return this.event;
  }

  async alter(id) {
    this.checkBodyKeys();
    this.validate();

    this.body = {
      name: this.body.name,
      description: this.body.description,
      date: this.body.date,
      latitude: this.body.latitude,
      longitude: this.body.longitude,
      active: this.body.active || true,
    };

    if (!(await this.eventExists(id)))
      throw new ValidationError('Este evento não existe');

    this.event = await EventModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });

    return this.event;
  }

  async eventExists(id) {
    try {
      const eventId = await EventModel.findById(id);

      return eventId;
    } catch (err) {
      return;
    }
  }

  async inativate(id) {
    // FUnção que verifica se o evento existe
    this.eventExists(id);

    // Erro caso o evento não exista
    if (!(await this.eventExists(id)))
      throw new ValidationError('O evento não existe');

    // Objeto que recebe o atributo ativo como false
    const eventInative = {
      active: false,
    };

    // Aguarda a atualização do status de ativo para inativo (false)
    this.event = await EventModel.findByIdAndUpdate(id, eventInative, {
      new: true,
    });

    return this.event;
  }
}

module.exports = Event;
