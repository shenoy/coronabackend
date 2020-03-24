const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/case/:id', viewController.getDetail);
router.get('/total', viewController.getTotal);
router.get('/deaths', viewController.getDeaths);
router.get('/deathChart', viewController.getDeathChart);

module.exports = router;
