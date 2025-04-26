const customErrosHandle = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
const handleSqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Id should be a number" });
  }
  next(err);
};
const serverErrosHandle = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};
module.exports = { customErrosHandle, handleSqlError, serverErrosHandle };
