var express = require('express');
var router = express.Router();

const { login, getUsersList, delUser } = require('../controllers/user');

/**登录&&注册 */
router.post('/login', login);

/**获取用户列表 */
router.get('/list', getUsersList);

/**删除用户 */
router.delete('/delete', delUser)

module.exports = router;
