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
