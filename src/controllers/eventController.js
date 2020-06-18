const Event = require('../model/EventModel');

const create = async (req, res, next) => {
  try {
    const event = new Event(req.body);

    const createdEvent = await event.register();

    return res.status(201).json(createdEvent);
  } catch (err) {
    next(err);
  }
};

const alter = async (req, res, next) => {
  try {
    const alterEvent = new Event(req.body);
    return alterEvent;
  } catch (err) {
    next(err);
  }
};

// Método para inativar o evento
const inativate = async (req, res, next) => {
  try {
    const event = new Event();

    // Variável que recebe o retorno da chamada à função de inativação do evento
    const inativated = await event.inativate(req.params.id);

    // Após alteração, retorna o status de sucesso com o evento alterado
    return res.status(200).json({ event: inativated });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, alter, inativate };
