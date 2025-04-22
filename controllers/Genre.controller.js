const { fetchGenre } = require("../model/Genre.model");

function getGenre(req, res, next) {
  console.log("hello from conctroller");
  fetchGenre()
    .then((data) => {
      return res.status(200).send({ genre: data });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getGenre };
