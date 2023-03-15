const router = require("express").Router();
const userController = require("../controllers/authController");
const restrictToLoggedInUser = require("../middlewares/authMiddleware");

router.route("/signup").post(userController.signup);
router.use(restrictToLoggedInUser).route("/signin").post(userController.signin);

module.exports = router;
