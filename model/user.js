const { connect } = require('../mysql');

/**
 * 数据模块
 * 负责读取数据，以数据的形式返回给控制器模块
 */

/**
 * 查询总条数
 * @returns
 */
const selectTotal = () => {
  const sql = `SELECT count(*) as total FROM user`;
  return connect('user', sql);
};

/**
 * 检查账户
 * @param {{username: string, id: number}} param
 * @returns
 */
const checkUser = ({ username, id }) => {
  let sql = '';
  if (username) sql = `SELECT * FROM user WHERE username='${username}'`;
  else if (id) sql = `SELECT * FROM user WHERE id='${id}'`;
  return connect('user', sql);
};

/**
 * 获取用户列表
 * @returns
 */
const getUsers = async ({ page, size }) => {
  /**公式: (当前页数 - 1) * 每页条数 */
  const offset = (page - 1) * size;

  /**总条数 */
  const data = await selectTotal();
  const total = data[0].total;

  /**总页数 */
  const pages = Math.ceil(total / size);

  /**
   * limit var1, var
   * var1: 起始点, 查询结果的索引, 从0开始, 代表第一条数据
   * var2: 长度
   */
  const sql = `SELECT * FROM user Order by id desc LIMIT ${offset}, ${size}`;
  return {
    pages,
    total,
    data: await connect('user', sql),
  };
};

/**
 * 注册用户
 * @param {{username: string, password: string}} param
 * @returns
 */
const addUser = async ({ username, password }) => {
  const sql = `INSERT INTO user SET username='${username}', password='${password}'`;
  const result = await checkUser({ username });
  if (result.length) {
    throw new Error('该用户已存在');
  } else {
    return connect('user', sql);
  }
};

/**
 * 删除用户
 * @param {number} id
 * @returns
 */
const deleteUser = async id => {
  const sql = `DELETE FROM user WHERE id='${id}'`;
  return connect('user', sql);
};

/**
 * 修改用户
 * @param {{username: string, password: string, id: number}} param
 * @returns
 */
const updateUser = async ({ username, password, id }) => {
  const has = await checkUser({ id });
  if (has.length) {
    const sql = `UPDATE user SET username='${username}', password='${password}' WHERE id='${id}'`;
    return connect('user', sql);
  } else {
    throw '该用户不存在';
  }
};

module.exports = {
  checkUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
