const { ERROR_CODES } = require("../utils/errors.js");

const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR;

  const message =
    statusCode === ERROR_CODES.INTERNAL_SERVER_ERROR
      ? "An error occurred on the server."
      : err.message;

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({ message });
};

module.exports = {
  handleError,
};
