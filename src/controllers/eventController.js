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

    const active = req.query.active ? req.query : null;

    const foundEvent = await searchEvent.search(active);

    return res.status(200).json({ event: foundEvent });
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

module.exports = { create, alter, search };
