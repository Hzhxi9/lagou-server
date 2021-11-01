const { loginModel } = require('../model/login');
const randomString = require('randomString');

const loginController = async (req, res, next) => {
  res.set('content-type', 'application/x-www-form-urlencoded;chart=utf-8');
  try {
    const { username, password } = req.body;
    const data = await loginModel({ username, password });
    const sessionId = randomString.generate();
    req.session.username = sessionId;
    res.render('success', {
      data,
    });
  } catch (error) {
    res.render('fail', {
      data: error,
    });
  }
};

const logoutController = async (req, res, next) => {
  res.set('content-type', 'application/json');
  try {
    if (req.session.username) req.session.username = null;
    res.render('success', { data: '登出成功' });
  } catch (error) {
    res.render('fail', {
      data: error,
    });
  }
};

const authController = async (req, res, next) => {
  // res.set('content-type', 'application/json');
  try {
    if (req.session.username) await res.render('success', { data: JSON.stringify(req.session.username) });
    else await res.render('fail', { data: '请登录' });
  } catch (error) {
    res.render('fail', {
      data: '请登录',
    });
  }
};

module.exports = { loginController, logoutController, authController };
