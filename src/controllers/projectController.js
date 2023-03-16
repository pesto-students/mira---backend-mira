const Project = require("../models/projectModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.setCurrentUserAsAdmin = (req, res, next) => {
  req.body.users = req.body.admins = [req.user._id];
  next();
};

exports.getProjectUserRole = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id || req.params.projectId);
  req.isProjectAdmin = project && project.admins.includes(req.user.id);
  req.isProjectUser = project && project.users.includes(req.user.id);
  next();
});

exports.filterProjectByUser = (req, res, next) => {
  req.filter = { users: req.user.id };
  next();
};

exports.restrictTo = (role) => {
  return catchAsync(async (req, res, next) => {
    if (
      (role == "projectAdmin" && !req.isProjectAdmin) ||
      (role == "projectUser" && !req.isProjectUser)
    ) {
      return next(new AppError("You don't have access to this project.", 403));
    }

    next();
  });
};

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, { path: "users" });
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
