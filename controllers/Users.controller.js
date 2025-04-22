const {
  fetchUserById,
  authenticateUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../model/Users.model");

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
  deleteUser(user_id).then((data) => {
    res.status(204).send({ msg: data });
  });
}
module.exports = {
  getUserById,
  authenticateUserFunction,
  addUser,
  patchUser,
  removeUser,
};
