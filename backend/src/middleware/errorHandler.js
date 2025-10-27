const errorHandler = (err, req, res, next) => {
  // Check if err is null/undefined, and if so, default to an empty object
  const errorObj = err || {};

  console.error(errorObj);

  // Use the safe errorObj for status and message extraction
  const status = errorObj.status || 500;

  res.status(status).json({
    error: errorObj.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
