const router = require("express").Router();
const admin = require("../config/firebase.config");
const User = require("../models/users");

const newUserData = async (decodedValue, req, res) => {
  const newUser = new User({
    name: decodedValue.name,
    email: decodedValue.email,
    imageUrl: decodedValue.picture,
    userId: decodedValue.user_id,
    email_verified: decodedValue.email_verified,
    auth_time: decodedValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json({ status: "success", data: { user: { savedUser } } });
  } catch (e) {
    res.status(500).json({ status: "fail", message: e });
  }
};

const updateUserData = async (decodedValue, req, res) => {
  const filter = { userId: decodedValue.user_id };
  const options = { upsert: true, new: true };
  try {
    const result = await User.findOneAndUpdate(
      filter,
      {
        auth_time: decodedValue.auth_time,
      },
      options
    );
    return res.status(200).json({ status: "success", data: { user: result } });
  } catch (e) {
    return res.status(400).json({ status: "fail", message: e });
  }
};

router.post("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send("Invalid token");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ status: "fail", message: "Unauthorized user" });
    }

    // Check if the user exists.
    const userExists = await User.findOne({ userId: decodedValue.user_id });
    if (!userExists) {
      return newUserData(decodedValue, req, res);
    } else {
      return updateUserData(decodedValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "fail", message: error });
  }
});

module.exports = router;
