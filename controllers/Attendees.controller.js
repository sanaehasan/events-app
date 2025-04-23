const { addAttendees, deleteAttendee } = require("../model/Attendees.model");

function postAttendees(req, res, next) {
  const attendee = req.body;
  addAttendees(attendee).then((data) => {
    return res.status(201).send({ attendee: data });
  });
}
function removeAttendee(req, res, next) {
  const { attendee_id } = req.params;
  deleteAttendee(attendee_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { postAttendees, removeAttendee };
