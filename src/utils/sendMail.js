const catchAsync = require("./catchAsync");
const sgMail = require("@sendgrid/mail");

exports.sendProjectInvite = async ({ to, projectName, userName, role }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: process.env.EMAIL_ADMIN,
    templateId: process.env.SENDGRID_PROJECT_INVITE_TEMPLATE,
    dynamic_template_data: {
      projectName,
      userName,
      role,
      websiteUrl: process.env.EMAIL_INVITE_WEBSITE,
    },
  };
  try {
    await sgMail.send(msg);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
