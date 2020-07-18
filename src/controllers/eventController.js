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

const search = async (req, res, next) => {
  try {
    const searchEvent = new Event();

    const active = {};

    if (req.query.active) active.active = req.query.active;

    const foundEvent = await searchEvent.search(active);

    return res.status(200).json({ event: foundEvent });
  } catch (err) {
    next(err);
  }
};

const alter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alterEvent = new Event(req.body);

    const alteredEvent = await alterEvent.alter(id);

    return res.status(200).json(alteredEvent);
  } catch (err) {
    next(err);
  }
};

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

module.exports = { create, alter, inativate, search };
