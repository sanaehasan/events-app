const { fetchEvents } = require("../model/Events.model");

function getEvents(req, res, next) {
  const { genre, city } = req.query;

  fetchEvents(genre, city)
    .then((data) => {
      res.status(200).send({ events: data });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getEvents };
