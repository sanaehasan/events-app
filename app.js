const express = require("express");
const {
  getUserById,
  authenticateUserFunction,
} = require("./controllers/Users.controller");
const {
  customErrosHandle,
  handleSqlError,
  serverErrosHandle,
} = require("./controllers/ErrorsHandle");
const { getEvents } = require("./controllers/Events.controller");
const { getGenre } = require("./controllers/Genre.controller");

const app = express();

app.get("/api", (req, res) => {
  return res.status(200).send({ msg: "welcom to my api for events" });
});
app.get("/api/users/:user_id", getUserById);
app.get("/api/users", authenticateUserFunction);
app.get("/api/events", getEvents);
app.get("/api/genre", getGenre);
app.get(/(.*)/, (req, res) => {
  return res.status(404).send({ msg: "Endpoint does not exist!" });
});

app.use(handleSqlError);
app.use(customErrosHandle);
app.use(serverErrosHandle);

module.exports = app;
