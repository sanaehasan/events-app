const db = require("../db/connection");

function addAttendees({ user_id, event_id }) {
  return db
    .query(
      "INSERT INTO attendees (user_id, event_id) VALUES ($1,$2) returning *;",
      [user_id, event_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}
function deleteAttendee(attendee_id) {
  return db
    .query("delete from attendees where attendee_id=$1", [attendee_id])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Attendee not found" });
      }
      return "attendee deleted";
    });
}

module.exports = { addAttendees, deleteAttendee };
