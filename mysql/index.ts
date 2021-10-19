const mysql = require('mysql');

/**
 * 连接数据库
 * @param {*} user 
 * @param {*} sql 
 * @param {*} cb 
 * @returns 
 */
const connect = (database: string = 'user', sql: string, cb: any) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root123456',
      database: database,
    });
    connection.connect();
    if (!sql) reject('请输入sql语句');
    connection.query(sql, (err: any, result: unknown, field: any) => {
      if (err) reject(err);
      else resolve(result);
    });
    connection.end();
  });
};

module.exports = {
  connect,
};
