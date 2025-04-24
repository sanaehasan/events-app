const endpoint = require("../endPoints.json");
function getEndPoints(req, res, next) {
  res
    .status(200)
    .send({ msg: "welcom to my api for events", endpoint: endpoint });
}

module.exports = getEndPoints;
