const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);
router.get('/', authController.protect, viewController.getOverview);
router.get('/case/:id', viewController.getDetail);
router.get('/total', authController.protect, viewController.getTotal);
router.get('/deaths', authController.protect, viewController.getDeaths);
router.get('/signup', viewController.getSignupForm);
router.get('/login', viewController.getLoginForm);
router.get('/chat', authController.protect, viewController.getChat);

module.exports = router;
