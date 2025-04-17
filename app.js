const express = require("express");
const { getUserById } = require("./controllers/Users.controller");

const app = express();

app.get("/api", (req, res) => {
  return res.status(200).send({ msg: "welcom to my api for events" });
});
app.get("/api/users/:user_id", getUserById);
app.get(/(.*)/, (req, res) => {
  return res.status(404).send({ msg: "Endpoint does not exist!" });
});
module.exports = app;
