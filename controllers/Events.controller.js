const {
  fetchEvents,
  addEvent,
  selectEventsByUserId,
  updateEvent,
  deleteEvent,
  fetchEventById,
} = require("../model/Events.model");

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
function getEventByUserId(req, res, next) {
  const { user_id } = req.params;
  selectEventsByUserId(user_id)
    .then((data) => {
      res.status(200).send({ events: data });
    })
    .catch((err) => {
      next(err);
    });
}
function postEvent(req, res, next) {
  const newEvent = req.body;
  addEvent(newEvent)
    .then((data) => {
      res.status(201).send({ event: data });
    })
    .catch((err) => {
      next(err);
    });
}

function patchEvent(req, res, next) {
  const newEvent = req.body;
  updateEvent(newEvent)
    .then((data) => {
      return res.status(200).send({ event: data });
    })
    .catch((err) => {
      next(err);
    });
}
function removeEvent(req, res, next) {
  const { event_id } = req.params;
  deleteEvent(event_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}
function getEventById(req, res, next) {
  const { event_id } = req.params;
  fetchEventById(event_id)
    .then((data) => {
      return res.status(200).send({ event: data });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  getEvents,
  postEvent,
  getEventByUserId,
  patchEvent,
  removeEvent,
  getEventById,
};
