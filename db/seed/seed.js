const format = require("pg-format");
const db = require("../connection.js");

const seed = ({ usersData, eventsData, genraData, attendeesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS attendees;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS genra;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE genra(
            genre_id SERIAL PRIMARY KEY,
            genre_name VARCHAR
            );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            name VARCHAR,
            email TEXT,
            avatar VARCHAR,
            role VARCHAR NOT NULL,
            city VARCHAR NOT NULL,
            country VARCHAR,
            password TEXT NOT NULL

            );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE events(
            event_id SERIAL PRIMARY KEY,
            createdBy INT NOT NULL,
            start_date VARCHAR NOT NULL,
            end_date VARCHAR NOT NULL,
            city VARCHAR NOT NULL,
            country VARCHAR NOT NULL,
            image TEXT,
            price numeric, 
            title VARCHAR NOT NULL,
            description TEXT,
            location TEXT,
            genre_id INT NOT NULL REFERENCES genra(genre_id) ON DELETE CASCADE
            );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE attendees(
            attendee_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT NOT NULL REFERENCES events(event_id) ON DELETE CASCADE
                        );`);
    })
    .then(() => {
      const insertGenra = format(
        "INSERT INTO genra (genre_name) VALUES %L;",
        genraData.map(({ genre_name }) => [genre_name])
      );
      const insertUsers = format(
        "INSERT INTO users (username, name, email,avatar,role,city ,country,password) VALUES %L;",
        usersData.map(
          ({
            username,
            name,
            email,
            avatar,
            role,
            city,
            country,
            password,
          }) => [username, name, email, avatar, role, city, country, password]
        )
      );

      const genraQuery = db.query(insertGenra);
      const usersQuery = db.query(insertUsers);
      return Promise.all([genraQuery, usersQuery]);
    })
    .then(() => {
      const eventsInsert = format(
        `INSERT INTO events (createdBy,start_date, end_date,city,country ,image, price ,title,description,location,genre_id) VALUES %L;`,
        eventsData.map(
          ({
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
          }) => [
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
      );

      return db.query(eventsInsert);
    })
    .then(() => {
      const attendeesInsert = format(
        "INSERT INTO attendees (user_id, event_id) VALUES %L;",
        attendeesData.map(({ user_id, event_id }) => [user_id, event_id])
      );
      return db.query(attendeesInsert);
    });
};

module.exports = seed;
