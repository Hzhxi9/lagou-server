const express = require('express');
const router = express.Router();

const loginControllers = require('../controllers/login')


router.post('/login',  loginControllers.loginController)

router.post('/logout', loginControllers.logoutController)

router.get('/auth', loginControllers.authController)

module.exports = router
