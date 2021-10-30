const loginRouter = require('express').Router()
const loginControllers = require('../controllers/login')


loginRouter.post('/login',  loginControllers.loginController)

loginRouter.post('/logout', loginControllers.logoutController)

module.exports = loginRouter