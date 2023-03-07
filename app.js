const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const authMiddleware = require("./middlewares/authMiddleware");
const authRoute = require("./routes/authRoutes");

const app = express();
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(authMiddleware);

// 1) Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
