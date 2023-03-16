const catchAsync = require("../utils/catchAsync");
const { sendProjectInvite } = require("../utils/sendMail");

exports.sendMail = catchAsync(async (req, res, next) => {
  const mailSent = await sendProjectInvite({
    to: "boaloysius@gmail.com",
    projectName: "Miiira",
    userName: "varghese",
    role: "admin",
  });

  return res.status(201).json({
    status: "success",
    data: {
      data: `${mailSent}`,
    },
  });
});
