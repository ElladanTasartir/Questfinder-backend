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
    const { id } = req.params;

    console.log(id);

    const alterEvent = new Event(req.body);

    const alteredEvent = await alterEvent.alter(id);

    return res.status(200).json(alteredEvent);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, alter };
