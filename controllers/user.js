const { getUsers, addUser } = require('../model/user');

const { hash } = require('../utils');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await hash(password)
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

module.exports = {
  login,
  getUsersList,
};
