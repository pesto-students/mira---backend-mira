const router = require("express").Router();
const userController = require("../controllers/authController");

router.route("/signin").post(userController.signin);
router.route("/signup").post(userController.signup);

module.exports = router;
