const { getUsers, addUser, deleteUser, updateUser } = require('../model/user');
const { hash } = require('../utils');

/**
 * controllers模块
 * 负责处理业务
 **/

/**
 * 登录注册
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    /**设置请求头 */
    res.set('content-type', 'application/json;chart=utf-8');

    /**设置cookie */
    res.cookie('code', 1, { maxAge: 60 * 1000, httpOnly: true });

    const { username, password } = req.body;
    const hashPassword = await hash(password);
    await addUser({ username, password: hashPassword });
    res.render('success', {
      data: '注册成功',
    });
  } catch (error) {
    res.render('fail', {
      data: error,
    });
  }
};

/**
 * 获取用户列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUsersList = async (req, res, next) => {
  try {
    const result = await getUsers();
    res.render('success', {
      data: JSON.stringify(result),
    });
  } catch (error) {
    res.render('fail', {
      data: 'error',
    });
  }
};

/**
 * 删除用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const delUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await deleteUser(id);
    /**通过受影响行数判断删除是否成功 */
    if (result.affectedRows) {
      res.render('success', {
        data: '删除成功',
      });
    } else {
      res.render('success', {
        data: '删除失败',
      });
    }
  } catch (error) {
    console.log(error);
    res.render('fail', {
      data: error,
    });
  }
};

/**
 * 修改账户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const editUser = async (req, res, next) => {
  try {
    /**设置请求头 */
    res.set('content-type', 'application/json;chart=utf-8');
    const { id, username, password } = req.body;
    const hashPassword = await hash(password);
    await updateUser({ username, id, password: hashPassword });
    res.render('success', {
      data: '修改成功',
    });
  } catch (error) {
    res.render('fail', {
      data: error,
    });
  }
};

module.exports = {
  login,
  getUsersList,
  delUser,
  editUser,
};
