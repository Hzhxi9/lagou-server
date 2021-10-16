const expressRouter = require('express');
const router = expressRouter.Router();

/**
 * 路由模块
 * 只负责分发和监听请求
 */

const userControllers = require('../controllers/user');


/**登录&&注册 */
router.post('/login', userControllers.login);

/**获取用户列表 */
router.get('/list', userControllers.getUsersList);

/**删除用户 */
router.delete('/delete', userControllers.delUser)

/**更新用户 */
router.patch('/edit', userControllers.editUser)

module.exports = router;
