const { fetchUserById, authenticateUser } = require("../model/Users.model");

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

function authenticateUserFunction(req, res, next) {
  const { email, password } = req.query;
  authenticateUser(email, password)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = { getUserById, authenticateUserFunction };
