const db = require("../db/connection");

function fetchUserById(user_id) {
  return db
    .query(`SELECT * FROM users where user_id=$1`, [user_id])
    .then(({ rows }) => {
      if (rows.length == 0) {
        Promise.reject({ status: 404, msg: "user not found" });
      } else {
        return rows[0];
      }
    });
}

module.exports = { fetchUserById };
