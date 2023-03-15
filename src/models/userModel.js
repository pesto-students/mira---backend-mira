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
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["platformUser", "platformAdmin"],
      default: "platformUser",
      select: false,
    },
    imageUrl: { type: String },
    firebaseId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      select: false,
    },
    emailVerified: { type: Boolean, required: true, select: false },
    authTime: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  this.select("-__v -createdAt -updatedAt");
  next();
});

const User = mongoose.model("User6", userSchema);
module.exports = User;
