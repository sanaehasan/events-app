const format = require("pg-format");
const db = require("../connection.js");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS events_users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      db.query(`DROP TABLE IF EXISTS genre;`);
    })
    .then(() => {
      db.query(`CREATE TABLE genra(
            genre_id SERIAL PRIMARY KEY,
            genre_name VARCHAR
            );`);
    })
    .then(() => {
      db.query(`CREATE TABLE users(
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
      db.query(`CREATE TABLE events(
            event_id SERIAL PRIMARY KEY,
            createdBy INT NOT NULL,
            start_date VARCHAR NOT NULL,
            end_date VARCHAR NOT NULL,
            city VARCHAR NOT NULL,
            country VARCHAR NOT NULL,
            image TEXT,
            price INT, 
            title VARCHAR NOT NULL,
            description TEXT,
            location TEXT,
            genre_id INT NOT NULL REFERENCES genra(genre_id)
            );`);
    })
    .then(() => {
      db.query(`CREATE TABLE attendees(
            attendee_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(user_id),
            event_id INT NOT NULL REFERENCES events(event_id)
                        );`);
    });
};
