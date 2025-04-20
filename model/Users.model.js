const db = require("../db/connection");

function fetchUserById(user_id) {
  return db
    .query(`SELECT * FROM users where user_id=$1`, [user_id])
    .then(({ rows }) => {
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
      return rows[0];
    });
}

module.exports = { fetchUserById };
