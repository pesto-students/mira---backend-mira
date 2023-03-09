const catchAsync = require("../utils/catchAsync");
const firebaseAdmin = require("../config/firebase.config");

const firebaseAuthorize = catchAsync(async (req, res, next) => {
  //   1) Get token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    firebaseToken = req.headers.authorization.split(" ")[1];
  }
  if (!firebaseToken) {
    next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  //   2) Verify token
  const firebaseUser = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
  if (!firebaseUser) {
    return next(new AppError("Invalid token!", 401));
  }
  req.firebaseUser = firebaseUser;
  next();
});

module.exports = firebaseAuthorize;
