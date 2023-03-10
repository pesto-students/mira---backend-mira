const catchAsync = require("../utils/catchAsync");
const firebaseAdmin = require("../config/firebase.config");
const User = require("../models/users");

const firebaseAuthorize = catchAsync(async (req, res, next) => {
  //  1) Get token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    firebaseToken = req.headers.authorization.split(" ")[1];
  }
  if (!firebaseToken) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  //  2) Verify token
  const firebaseUser = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
  if (!firebaseUser) {
    return next(new AppError("Invalid token!", 401));
  }
  req.firebaseUser = firebaseUser;

  //  3) Get user from mongodb
  const user = await User.findOne({ firebaseId: firebaseUser.user_id });
  if (!user) {
    return new AppError("User belonging to the token doesn't not exist!", 401);
  }
  req.user = user;
  next();
});

module.exports = firebaseAuthorize;
