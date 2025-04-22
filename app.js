const express = require("express");
const cors = require("cors");
const {
  getUserById,
  authenticateUserFunction,
  addUser,
  patchUser,
} = require("./controllers/Users.controller");
const {
  customErrosHandle,
  handleSqlError,
  serverErrosHandle,
} = require("./controllers/ErrorsHandle");
const {
  getEvents,
  postEvent,
  getEventByUserId,
  patchEvent,
} = require("./controllers/Events.controller");
const { getGenre } = require("./controllers/Genre.controller");
const { postAttendees } = require("./controllers/Attendees.controller");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api", (req, res) => {
  return res.status(200).send({ msg: "welcom to my api for events" });
});
app.get("/api/users/:user_id", getUserById);
app.get("/api/users", authenticateUserFunction);
app.post("/api/users", addUser);
app.patch("/api/users", patchUser);
app.get("/api/events", getEvents);
app.get("/api/events/:user_id", getEventByUserId);
app.post("/api/events", postEvent);
app.patch("/api/events", patchEvent);
app.get("/api/genre", getGenre);
app.post("/api/attendees", postAttendees);
app.get(/(.*)/, (req, res) => {
  return res.status(404).send({ msg: "Endpoint does not exist!" });
});

app.use(handleSqlError);
app.use(customErrosHandle);
app.use(serverErrosHandle);

module.exports = app;
