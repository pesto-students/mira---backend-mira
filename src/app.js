const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Import routes
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");

// Import middleware
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(express.json());

let base_url;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  base_url = "";
} else {
  base_url = "/.netlify/functions";
}

app.use(`${base_url}/api/v1/users`, userRoute);
app.use(`${base_url}/api/v1/auth`, authRoute);

// TODO: Improve the code to catch unhandled paths in netlify functions.
if (process.env.NODE_ENV === "development") {
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });
  app.use(globalErrorHandler);
}

module.exports = app;
