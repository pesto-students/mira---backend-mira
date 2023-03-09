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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));

  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authMiddleware, authRoute);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });
  app.use(globalErrorHandler);
} else {
  const base_url = "/.netlify/functions";
  app.use(`${base_url}/api/v1/users`, userRoute);
  app.use(`${base_url}/api/v1/auth`, authMiddleware, authRoute);
}

module.exports = app;
