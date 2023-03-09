const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

// Check if development server

if (process.env.NODE_ENV == "development") {
  const port = process.env.PORT || 8000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
} else {
  const handler = serverless(app);
  module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
  };
}
