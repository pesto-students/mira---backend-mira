const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const morgan = require("morgan");

const app = express();
const cors = require("cors");

app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there");
});

// User authentication route
const userRoute = require("./router/user");

app.use("/api/v1/users/", userRoute);

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
