const db = require("../db/connection");

function fetchEvents(genre, city) {
  let queryString =
    "SELECT * FROM events join genra on events.genre_id=genra.genre_id";
  const queryArr = [];
  if (genre) {
    queryArr.push(db.query("select * from genra where genre_name=$1", [genre]));
    queryString += `  WHERE genra.genre_name =  '${genre}'`;
  }
  if (city && genre) {
    queryString += ` AND events.city ='${city}'`;
  }
  if (city && !genre) {
    queryString += ` WHERE events.city='${city}'`;
  }

  queryArr.push(db.query(queryString));
  return Promise.all(queryArr).then((data) => {
    if (data.length === 2 && data[0].rows.length === 0) {
      return Promise.reject({ status: 404, msg: "genre does not exist" });
    }
    return data[data.length - 1].rows;
  });
}

module.exports = { fetchEvents };
