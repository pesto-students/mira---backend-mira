const Project = require("../models/projectModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Users = require("../models/userModel");
const { sendProjectInvite } = require("../utils/sendMail");

exports.setCurrentUserAsAdmin = (req, res, next) => {
  req.body.admins = [req.user._id];
  next();
};

const _sendProjectInvite = async (projectName, users, role) => {
  if (!users.length) {
    return;
  }
  const records = await Users.find().where("_id").in(users).exec();
  records.forEach((ele) =>
    sendProjectInvite({
      to: ele.email,
      userName: ele.firstName,
      projectName: projectName,
      role: role,
    })
  );
};

exports.getProjectAndUserRole = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id || req.params.projectId);
  req.isProjectAdminAccess = project && project.admins.includes(req.user.id);
  req.isProjectUserAccess =
    project &&
    (project.admins.includes(req.user.id) ||
      project.users.includes(req.user.id));
  req.project = project;
  next();
});

exports.filterProjectByUser = (req, res, next) => {
  req.filters = { users: req.user.id };
  next();
};

exports.restrictTo = (role) => {
  return catchAsync(async (req, res, next) => {
    if (
      (role == "projectAdminAccess" && !req.isProjectAdminAccess) ||
      (role == "projectUserAccess" && !req.isProjectUserAccess)
    ) {
      return next(new AppError("You don't have access to this project.", 403));
    }

    next();
  });
};

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, { path: "users" });
exports.createProject = factory.createOne(Project);
exports.updateProject = (req, res, next) => {
  const { project, body } = req;
  if ("admins" in body && !body.admins.length) {
    return next(
      new AppError(
        "Active project should have atlease one admin, please delete the project instead.",
        400
      )
    );
  }
  const usersInPayload = body.users || [];
  const adminsInPayload = body.admins || [];

  const addedUsers =
    usersInPayload?.filter((ele) => !project.users.includes(ele)) || [];
  const addedAdmins =
    adminsInPayload?.filter((ele) => !project.admins.includes(ele)) || [];

  addedAdmins.length && _sendProjectInvite(project.name, addedAdmins, "admin");
  addedUsers.length && _sendProjectInvite(project.name, addedUsers, "user");

  factory.updateOne(Project)(req, res, next);
};
exports.deleteProject = factory.deleteOne(Project);
