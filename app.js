const express = require("express");

const app = express();

app.get("/api", (req, res, next) => {
  return res.status(200).send({ message: "welcom to my api for events" });
});

module.exports = app;
