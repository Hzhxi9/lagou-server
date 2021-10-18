const userRouter = require('express').Router();

/**
 * 路由模块
 * 只负责分发和监听请求
 */

const userControllers = require('../controllers/user');


/**登录&&注册 */
userRouter.post('/login', userControllers.login);

/**获取用户列表 */
userRouter.get('/list', userControllers.getUsersList);

/**删除用户 */
userRouter.delete('/delete', userControllers.delUser)

/**更新用户 */
userRouter.patch('/edit', userControllers.editUser)

module.exports = userRouter;
