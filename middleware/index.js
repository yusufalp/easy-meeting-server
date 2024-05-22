const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  } else {
    return res.status(401).json({
      error: { message: "User is not authorized!" },
    });
  }
};

const authenticateJWT = (req, res, next) => {
  const JWT_SECRET =
    process.env.JWT_SECRET_KEY || "i-hope-i-will-not-need-this";
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { isAuthenticated, authenticateJWT };
