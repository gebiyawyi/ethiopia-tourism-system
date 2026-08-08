const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 400;
    message = "Duplicate entry. Please use unique values.";
  }

  console.error("Error:", err);

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
