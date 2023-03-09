const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");

exports.signup = catchAsync(async (req, res, next) => {
  const { firebaseUser, body } = req;
  const newUser = await User.create({
    name: body.name || firebaseUser.name,
    email: firebaseUser.email,
    imageUrl: body.imageUrl || firebaseUser.picture,
    firebaseId: firebaseUser.user_id,
    email_verified: firebaseUser.email_verified,
    auth_time: firebaseUser.auth_time,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { firebaseUser } = req;
  const user = await User.findOne({ firebaseId: firebaseUser.user_id });
  if (!user) {
    return new AppError("User belonging to the token doesn't not exist!", 401);
  }
  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
