const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");
const firebaseAdmin = require("../config/firebase.config");

exports.signup = catchAsync(async (req, res, next) => {
  const { body } = req;
  // Create temp user to validate with the model before creating the account.
  const temp_user = {
    name: body.name,
    email: body.email,
    password: body.password,
    firebaseId: "tempString",
    authTime: 0,
    imageUrl: "tempUrl",
    emailVerified: false,
  };
  // Validate fields with the user model
  await User.validate(temp_user);

  // Firebase create user
  const firebaseUser = await firebaseAdmin.auth().createUser(temp_user);

  // Populate temp user object with userid and other responses from firebase.
  temp_user.firebaseId = firebaseUser.uid;
  temp_user.emailVerified = firebaseUser.emailVerified;

  // Create new user
  const newUser = await User.create(temp_user);

  return res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

// Just for development purpose.
exports.signin = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { firebaseId: req.firebaseUser.user_id },
    { authTime: req.firebaseUser.auth_time }
  );
  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
