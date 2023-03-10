const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please tell us your name!"] },
    email: {
      type: String,
      required: [true, "Please tell us your email!"],
      unique: true,
    },
    imageUrl: { type: String, required: [true, "Please share a profile pic"] },
    firebaseId: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true },
    authTime: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User5", userSchema);
module.exports = User;
