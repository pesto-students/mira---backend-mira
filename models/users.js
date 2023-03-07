const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    imageUrl: { type: String, require: true },
    userId: { type: String, require: true },
    email_verified: { type: Boolean, require: true },
    auth_time: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
