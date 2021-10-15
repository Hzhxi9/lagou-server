const { connect } = require('../mysql');

const checkUser = ({ username, id }) => {
  let sql = '';
  if (username) sql = `SELECT * FROM user WHERE username='${username}'`;
  else if (id) sql = `SELECT * FROM user WHERE id='${id}'`;
  return connect('user', sql);
};

const getUsers = () => {
  const sql = 'SELECT * FROM user';
  return connect('user', sql);
};

const addUser = async ({ username, password }) => {
  const sql = `INSERT INTO user SET username='${username}', password='${password}'`;
  const result = await checkUser({ username });
  if (result.length) {
    throw new Error('该用户已存在');
  } else {
    return connect('user', sql);
  }
};

const deleteUser = async (id) => {
  const has = await checkUser({ id });

  if (has.length) {
    const sql = `DELETE FROM user WHERE id='${id}'`;
    return connect('user', sql);
  } else {
    throw '该用户不存在';
  }
};

const updateUser = async ({ username, password, id }) => {
  const has = await checkUser({ id });
  if(has.length){
    const sql = `UPDATE user SET username='${username}', password='${password}' WHERE id='${id}'`;
    return connect('user', sql);
  } else {
    throw '该用户不存在';
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser
};
