var express = require('express');
var router = express.Router();

const { login, getUsersList } = require('../controllers/user');

/**登录&&注册 */
router.post('/login', login);

/**获取用户列表 */
router.get('/list', getUsersList);

module.exports = router;
