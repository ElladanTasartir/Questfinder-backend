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

const alter = async (req, res) => {
  return res.status(200).json({ message: 'top' });
};

module.exports = { create, alter };
