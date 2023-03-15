const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.getMe, userController.updateMe);
router.delete("/deleteMe", userController.getMe, userController.deleteMe);

router
  .route("/")
  .get(userController.restrictTo("platformAdmin"), userController.getAllUsers)
  .post(userController.restrictTo("platformAdmin"), userController.createUser);

router.route("/search").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.restrictTo("platformAdmin"), userController.getUser)
  .patch(userController.restrictTo("platformAdmin"), userController.updateUser)
  .delete(
    userController.restrictTo("platformAdmin"),
    userController.deleteUser
  );

module.exports = router;
