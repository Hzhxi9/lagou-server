const mysqlConnect = require('../mysql');

/**
 * 数据模块
 * 负责读取数据，以数据的形式返回给控制器模块
 */


interface UserType {
  username?: string;
  password?: string;
  id?: number;
}
/**
 * 检查账户
 * @param {{username: string, id: number}} param
 * @returns
 */
const checkUser = ({ username, id }: UserType) => {
  let sql = '';
  if (username) sql = `SELECT * FROM user WHERE username='${username}'`;
  else if (id) sql = `SELECT * FROM user WHERE id='${id}'`;
  return mysqlConnect.connect('user', sql);
};

/**
 * 获取用户列表
 * @returns
 */
const getUsers = () => {
  const sql = 'SELECT * FROM user';
  return mysqlConnect.connect('user', sql);
};

/**
 * 注册用户
 * @param {{username: string, password: string}} param
 * @returns
 */
const addUser = async ({ username, password }: UserType) => {
  const sql = `INSERT INTO user SET username='${username}', password='${password}'`;
  const result = await checkUser({ username });
  if (result.length) {
    throw new Error('该用户已存在');
  } else {
    return mysqlConnect.connect('user', sql);
  }
};

/**
 * 删除用户
 * @param {number} id
 * @returns
 */
const deleteUser = async (id: number) => {
  const sql = `DELETE FROM user WHERE id='${id}'`;
  return mysqlConnect.connect('user', sql);
};

/**
 * 修改用户
 * @param {{username: string, password: string, id: number}} param
 * @returns
 */
const updateUser = async ({ username, password, id }: UserType) => {
  const has = await checkUser({ id });
  if (has.length) {
    const sql = `UPDATE user SET username='${username}', password='${password}' WHERE id='${id}'`;
    return mysqlConnect.connect('user', sql);
  } else {
    throw '该用户不存在';
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};