const mysql = require('mysql');

/**
 * 连接数据库
 * @param {*} user 
 * @param {*} sql 
 * @param {*} cb 
 * @returns 
 */
const connect = (user = 'user', sql, cb) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root123456',
      database: user,
    });
    connection.connect();
    if (!sql) reject('请输入sql语句');
    connection.query(sql, (err, result, field) => {
      if (err) reject(err);
      else resolve(result);
    });
    connection.end();
  });
};

module.exports = {
  connect,
};
