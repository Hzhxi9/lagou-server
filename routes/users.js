var express = require('express');
var router = express.Router();

const loginController = require('../controllers/user')

/**登录&&注册 */
router.post('/login', loginController);

module.exports = router;
