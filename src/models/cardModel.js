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
    status: {
      type: String,
      enum: ["backlog", "ready2deploy", "in progress", "done"],
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    estimatedDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return (
            v && // check that there is a date object
            v.getTime() > Date.now()
          );
        },
        message: "Estimated date should be higher than current date.",
      },
    },
    reporter: {
      type: mongoose.Schema.ObjectId,
      ref: "User6",
    },
    assignee: {
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
    path: "reporter",
    select: "firstName email imageUrl",
  });
  this.select("-__v -createdAt -updatedAt");
  next();
});

const Project = mongoose.model("Card2", projectSchema);
module.exports = Project;
