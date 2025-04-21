const db = require("../db/connection");

function fetchGenre() {
  return db.query("SELECT * FROM genra").then(({ rows }) => {
    return rows;
  });
}

module.exports = { fetchGenre };
