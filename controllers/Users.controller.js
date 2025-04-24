const {
  fetchUserById,
  authenticateUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../model/Users.model");

const { generateToken } = require("./authenticate");

function getUserById(req, res, next) {
  const { user_id } = req.params;
  fetchUserById(user_id)
    .then((data) => {
      data.token = generateToken(data.user_id, data.email);
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

function addUser(req, res, next) {
  const user = req.body;

  postUser(user)
    .then((data) => {
      return res.status(201).send({ user: data });
    })
    .catch((err) => {
      next(err);
    });
}

function patchUser(req, res, next) {
  const updatedUser = req.body;
  updateUser(updatedUser)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch((err) => {
      next(err);
    });
}
function removeUser(req, res, next) {
  const { user_id } = req.params;
  deleteUser(user_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  getUserById,
  authenticateUserFunction,
  addUser,
  patchUser,
  removeUser,
};
