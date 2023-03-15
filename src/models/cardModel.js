const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a card title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description!"],
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project1",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User6",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "firstName email imageUrl",
  }).populate({
    path: "project",
    select: "name logo",
  });
  next();
});

const Project = mongoose.model("Card2", projectSchema);
module.exports = Project;
