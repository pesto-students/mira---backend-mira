const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(userController.list);
router.use(authMiddleware).route("/").patch(userController.patch);

module.exports = router;
