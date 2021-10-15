const { getUsers, addUser, deleteUser, updateUser } = require('../model/user');
const { hash } = require('../utils');

const login = async (req, res, next) => {
  try {
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

const delUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    await deleteUser(id);
    res.render('success', {
      data: '删除成功',
    });
  } catch (error) {
    console.log(error);
    res.render('fail', {
      data: error,
    });
  }
};

const editUser = async (req, res, next) => {
  try {
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
