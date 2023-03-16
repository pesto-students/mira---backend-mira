const router = require("express").Router();
const projectController = require("../controllers/projectController");
const cardRoutes = require("./cardRoutes");

router.use(
  "/:projectId/cards",
  projectController.getProjectUserRole,
  projectController.restrictTo("projectUser"),
  cardRoutes
);

router
  .route("/")
  .get(projectController.filterProjectByUser, projectController.getAllProjects)
  .post(
    projectController.setCurrentUserAsAdmin,
    projectController.createProject
  );

router
  .route("/:id")
  .get(
    projectController.getProjectUserRole,
    projectController.restrictTo("projectUser"),
    projectController.getProject
  )
  .patch(
    projectController.getProjectUserRole,
    projectController.restrictTo("projectAdmin"),
    projectController.updateProject
  )
  .delete(
    projectController.getProjectUserRole,
    projectController.restrictTo("projectAdmin"),
    projectController.deleteProject
  );

module.exports = router;
