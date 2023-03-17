const router = require("express").Router();
const projectController = require("../controllers/projectController");
const cardRoutes = require("./cardRoutes");

router.use(
  "/:projectId/cards",
  projectController.getProjectAndUserRole,
  projectController.restrictTo("projectUserAccess"),
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
    projectController.getProjectAndUserRole,
    projectController.restrictTo("projectUserAccess"),
    projectController.getProject
  )
  .patch(
    projectController.getProjectAndUserRole,
    projectController.restrictTo("projectAdminAccess"),
    projectController.updateProject
  )
  .delete(
    projectController.getProjectAndUserRole,
    projectController.restrictTo("projectAdminAccess"),
    projectController.deleteProject
  );

module.exports = router;
