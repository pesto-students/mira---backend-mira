const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(cardController.filterCardsByProject, cardController.getAllCards)
  .post(cardController.setProjectUserIds, cardController.createCard);

router
  .route("/:id")
  .get(cardController.getCard)
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard);

module.exports = router;
