const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/auth/loginLimiter')

const {
    addUserValidator,
    addUserValidatorHandler
} = require('../middleware/users/usersValidator')

router.route('/')
    .post(authController.signin)

router.route('/signup')
    .post(
        //addUserValidator,
        //addUserValidatorHandler,
        authController.signup)

router.route('/refresh')
    .get(authController.refreshToken)

router.route('/logout')
    .post(authController.logout)

module.exports = router
