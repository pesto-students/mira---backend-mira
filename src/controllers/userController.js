const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.list = catchAsync(async (req, res, next) => {
  const user = await User.find({});
  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.patch = catchAsync(async (req, res, next) => {
  const { user, body } = req;
  const updatedUser = await User.findOneAndUpdate({ _id: user._id }, body, {
    new: true,
    runValidators: true,
  });
  return res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
