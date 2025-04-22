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

module.exports = { addAttendees };
