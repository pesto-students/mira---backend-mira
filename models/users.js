const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please tell us your name!"] },
    email: {
      type: String,
      require: [true, "Please tell us your email!"],
      unique: true,
    },
    imageUrl: { type: String, require: [true, "Please share a profile pic"] },
    firebaseId: { type: String, require: true, unique: true },
    email_verified: { type: Boolean, require: true },
    auth_time: { type: String, require: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User3", userSchema);
module.exports = User;
