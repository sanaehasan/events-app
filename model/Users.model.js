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
function postUser({
  username,
  name,
  email,
  avatar,
  role,
  city,
  country,
  password,
}) {
  return db
    .query(
      "insert into users (username,name,email,avatar,role,city,country, password) values ($1, $2, $3, $4, $5, $6, $7, crypt($8, gen_salt('bf', 12))) returning *;",
      [username, name, email, avatar, role, city, country, password]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}
function updateUser({
  user_id,
  username,
  name,
  email,
  avatar,
  role,
  city,
  country,
  password,
}) {
  return db
    .query(
      "UPDATE users SET username=$1 ,name=$2,email=$3,avatar=$4,role=$5,city=$6,country=$7, password=crypt($8, gen_salt('bf', 12)) WHERE user_id=$9 returning *;",
      [username, name, email, avatar, role, city, country, password, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "user info not found" });
      }
      return rows[0];
    });
}
module.exports = { fetchUserById, authenticateUser, postUser, updateUser };
