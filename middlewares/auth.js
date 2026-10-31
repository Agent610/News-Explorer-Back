const jwt = require("jsonwebtoken");
const { ApiError, ERROR_CODES } = require("../utils/errors.js");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new ApiError(
        ERROR_CODES.UNAUTHORIZED,
        "Error, Authentication is required.",
      ),
    );
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(
      new ApiError(
        ERROR_CODES.UNAUTHORIZED,
        "Error, Invalid or expired token.",
      ),
    );
  }
};

module.exports = auth;
