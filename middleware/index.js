const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  } else {
    return res.status(401).json({
      error: { message: "User is not authorized!" },
    });
  }
};

module.exports = { isAuthenticated };
