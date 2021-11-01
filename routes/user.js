const express = require('express');
const router = express.Router();

const { register, getUsersList, delUser, editUser } = require('../controllers/user');
const { auth } = require('../middleware/auth');

/**
 * 路由模块
 * 只负责分发和监听请求
 */

/**登录&&注册 */
router.post('/login', register);

/**获取用户列表 */
router.get('/', auth, getUsersList);

/**删除用户 */
router.delete('/', auth, delUser);

/**更新用户 */
router.patch('/', auth, editUser);

module.exports = router;
