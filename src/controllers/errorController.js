const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
  const message = `Duplicate fields value:x . Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, please login again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please login again.", 401);

const handleFirebaseAuthUserAlreadyExists = () =>
  new AppError("The email address is already in use by another account.", 400);

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown errors: don't leak to the client
  } else {
    // 1.  Log error
    console.error("ERROR ", err);

    // 2. Send error
    res.status(500).json({
      status: "error",
      message: "Something went wrong!!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message };
  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) {
    error = handleDuplicateFieldsErrorDB(error);
  }
  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
  }
  if (error.name === "TokenExpiredError") {
    error = handleJWTExpiredError();
  }
  if (error.codePrefix == "auth") {
    const { code } = error.errorInfo;
    switch (code) {
      case "auth/argument-error":
        error = handleJWTError();
        break;
      case "auth/email-already-exists":
        error = handleFirebaseAuthUserAlreadyExists();
        break;
      case "auth/id-token-expired":
        error = handleJWTExpiredError();
        break;
    }
  }
  sendErrorProd(error, res);
};
