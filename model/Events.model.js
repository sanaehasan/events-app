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
function selectEventsByUserId(id) {
  return db
    .query(
      "select * from events join attendees on events.event_id = attendees.event_id where user_id=$1 ;",
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
}
function addEvent({
  createdBy,
  start_date,
  end_date,
  city,
  country,
  image,
  price,
  title,
  description,
  location,
  genre_id,
}) {
  return db
    .query(
      "insert into events (createdBy,start_date, end_date, city, country, image, price,title, description,location,genre_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *;",
      [
        createdBy,
        start_date,
        end_date,
        city,
        country,
        image,
        price,
        title,
        description,
        location,
        genre_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}
function updateEvent({
  event_id,
  createdBy,
  start_date,
  end_date,
  city,
  country,
  image,
  price,
  title,
  description,
  location,
  genre_id,
}) {
  return db
    .query(
      "UPDATE events SET createdBy=$2,start_date=$3, end_date=$4, city=$5, country=$6, image=$7, price=$8,title=$9, description=$10,location=$11,genre_id=$12 where event_id=$1 returning*;",
      [
        event_id,
        createdBy,
        start_date,
        end_date,
        city,
        country,
        image,
        price,
        title,
        description,
        location,
        genre_id,
      ]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }
      return rows[0];
    });
}
module.exports = { fetchEvents, addEvent, selectEventsByUserId, updateEvent };
