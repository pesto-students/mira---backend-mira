const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the project name!"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please project description!"],
    },
    logo: { type: String },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User6",
      },
    ],
    admins: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User6",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// projectSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "users",
//   }).populate({
//     path: "admins",
//   });
//   next();
// });

const Project = mongoose.model("Project1", projectSchema);
module.exports = Project;
