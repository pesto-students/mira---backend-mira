const router = require("express").Router();
const mailController = require("../controllers/mailController");

router.route("/").get(mailController.sendMail);

module.exports = router;
