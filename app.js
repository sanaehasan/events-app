const express = require("express");

const app = express();

app.get("/api", (req, res, next) => {
  return res.status(200).send({ msg: "welcom to my api for events" });
});
app.get("/api/genre", () => {});

module.exports = app;
