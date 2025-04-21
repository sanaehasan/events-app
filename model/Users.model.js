const db = require("../db/connection");

function fetchUserById(user_id) {
  return db
    .query(`SELECT * FROM users where user_id=$1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
      return rows[0];
    });
}

function authenticateUser(email, pass) {
  return db
    .query(
      `SELECT  crypt($2, password) as password_hash,* FROM users where email=$1`,
      [email, pass]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "email or password is incorrect",
        });
      }
      if (rows[0].password_hash === rows[0].password) {
        return rows[0];
      } else {
        return Promise.reject({
          status: 404,
          msg: "email or password is incorrect",
        });
      }
    });
}
module.exports = { fetchUserById, authenticateUser };
