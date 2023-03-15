const Card = require("../models/cardModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.setProjectUserIds = (req, res, next) => {
  req.body.project = req.params.projectId;
  req.body.createdBy = req.user.id;
  next();
};

exports.filterCardsByProject = (req, res, next) => {
  if (req.params.projectId) req.filter = { project: req.params.projectId };
  next();
};

exports.getAllCards = factory.getAll(Card);
exports.getCard = factory.getOne(Card);
exports.createCard = factory.createOne(Card);
exports.updateCard = factory.updateOne(Card);
exports.deleteCard = factory.deleteOne(Card);
