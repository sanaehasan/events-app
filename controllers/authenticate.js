const jwt = require("jsonwebtoken");

function generateToken(user_id, email) {
  const payload = {
    id: user_id,
    email: email,
  };
  const secret = getSecret();
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
}

function getSecret() {
  const ENV = process.env.NODE_ENV || "development";

  require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
  });

  return process.env.SECRET_KEY;
}

function verifyAccessToken(token) {
  const secret = getSecret();

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

module.exports = { authenticateToken, generateToken };
