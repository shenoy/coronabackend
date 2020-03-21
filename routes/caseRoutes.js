const express = require('express');
const caseController = require('./../controllers/caseController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/topDeadly')
  .get(caseController.aliasTopCases, caseController.getAllCases);

router.route('/stats').get(caseController.getCaseStats);

router
  .route('/')
  .get(authController.protect, caseController.getAllCases)
  .post(caseController.createCase);

//router.param('id', caseController.checkID);

router
  .route('/:id')
  .get(caseController.getCase)
  .patch(caseController.updateCase)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    caseController.deleteCase
  );

module.exports = router;
