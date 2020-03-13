const express = require("express");
const caseController = require("./../controllers/caseController");

const router = express.Router();

router
  .route("/topDeadly")
  .get(caseController.aliasTopCases, caseController.getAllCases);

router.route("/stats").get(caseController.getCaseStats);

router
  .route("/")
  .get(caseController.getAllCases)
  .post(caseController.createCase);

//router.param('id', caseController.checkID);

router
  .route("/:id")
  .get(caseController.getCase)
  .patch(caseController.updateCase)
  .delete(caseController.deleteCase);

module.exports = router;
