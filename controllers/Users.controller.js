const { fetchUserById } = require("../model/Users.model");

function getUserById(req, res, next) {
  const { user_id } = req.params;
  fetchUserById(user_id)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUserById };
