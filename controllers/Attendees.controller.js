const { addAttendees } = require("../model/Attendees.model");

function postAttendees(req, res, next) {
  const attendee = req.body;
  addAttendees(attendee).then((data) => {
    return res.status(201).send({ attendee: data });
  });
}

module.exports = { postAttendees };
