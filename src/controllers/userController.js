const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");

exports.list = catchAsync(async (req, res, next) => {
  const user = await User.find({});
  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
