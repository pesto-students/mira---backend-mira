const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your firstName!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please tell us your email!"],
      unique: true,
      immutable: true,
    },
    dob: {
      type: Date,
      required: [
        true,
        "Please tell us your data of birth in yyyy-mm-dd format.",
      ],
    },
    imageUrl: { type: String, required: [true, "Please share a profile pic"] },
    firebaseId: { type: String, required: true, unique: true, immutable: true },
    emailVerified: { type: Boolean, required: true },
    authTime: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User5", userSchema);
module.exports = User;
