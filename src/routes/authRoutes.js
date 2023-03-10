const router = require("express").Router();
const userController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/signup").post(userController.signup);
router.use(authMiddleware).route("/signin").post(userController.signin);

module.exports = router;
