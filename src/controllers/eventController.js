const Event = require('../model/EventModel');

exports.create = async (req, res, next) => {
  try {
    const event = new Event(req.body);

    const createdEvent = await event.register();

    return res.status(201).json(createdEvent);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchEvent = new Event();

    const active = req.query.active ? req.query : null;

    const search = await searchEvent.search(active);

    return res.status(200).json({ event: search });
  } catch (err) {
    next(err);
  }
};
