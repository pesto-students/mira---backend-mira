const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your firstName!"],
      trim: true,
      maxlength: [15, "A first name must have max 15 characters"],
      minlength: [1, "A first name must have min 1 characters"],
      validate: [validator.isAlpha, "First name must only contain characters"],
    },
    lastName: {
      type: String,
      maxlength: [15, "A last name must have max 15 characters"],
      minlength: [1, "A last name must have min 1 characters"],
      validate: [validator.isAlpha, "Last name must only contain characters"],
    },
    email: {
      type: String,
      required: [true, "Please tell us your email!"],
      unique: true,
      immutable: true,
      validate: [validator.isEmail, "Please provide a valid email"],
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
