const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Import routes
const mailRoute = require("./routes/mailRoutes");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const projectRoute = require("./routes/projectRoutes");

// Import middleware
const restrictToLoggedInUser = require("./middlewares/authMiddleware");

const app = express();
const cors = require("cors");

let base_url;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  base_url = "";
} else {
  base_url = "/.netlify/functions";
}

const limiter = rateLimit({
  max: 10000, // Limit to 100 request per IP per hour.
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 1hr.",
});

// 1. Global middlewares.

// Set security http headers
app.use(helmet());

// Limit requests from same IP.
app.use(`${base_url}/api`, limiter);

// Body parser, reading data from body into req.body.
app.use(express.json({ limit: "50kb" }));

// Data sanitization against NoSQL query injection.
app.use(mongoSanitize());

// Data sanitization against XSS.
app.use(xss());

// Precent parameter pollution
app.use(hpp());

app.use(cors({ origin: true }));

// 2.Routes

app.use(`${base_url}/api/v1/users`, restrictToLoggedInUser, userRoute);
app.use(`${base_url}/api/v1/projects`, restrictToLoggedInUser, projectRoute);
app.use(`${base_url}/api/v1/auth`, authRoute);
app.use(`${base_url}/api/v1/mail`, mailRoute);

// TODO: Improve the code to catch unhandled paths in netlify functions.
if (process.env.NODE_ENV === "development") {
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });
}

app.use(globalErrorHandler);

module.exports = app;
