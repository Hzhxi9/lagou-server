const { connect } = require('../mysql');

const checkUser = (username) => {
  const sql = `SELECT * FROM user WHERE username='${username}'`;
  return connect('user', sql);
};

const getUsers = () => {
  const sql = 'SELECT * FROM user';
  return connect('user', sql);
};

const addUser = async ({ username, password }) => {
  const sql = `INSERT INTO user SET username='${username}', password='${password}'`;
  const result = await checkUser(username);
  if (result.length) {
    throw new Error('该用户已存在');
  } else {
    return connect('user', sql)
  }
};

module.exports = {
  getUsers,
  addUser,
};
