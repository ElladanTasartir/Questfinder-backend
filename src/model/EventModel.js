const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
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

  async alter() {
    this.checkBodyKeys();
    this.validate();

    this.body = {
      name: this.body.name,
      description: this.body.description,
      date: this.body.date,
      latitude: this.body.latitude,
      longitude: this.body.longitude,
      active: this.body.active || false,
    };
  }

  async eventExists(id) {
    const eventId = await EventModel.findOne({ id });

    return !eventId ? true : null;
  }
}

module.exports = Event;
