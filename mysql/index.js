const mysql = require('mysql');

module.exports = {
  getData(cb) {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root123456',
      database: 'user',
    });

    connection.connect();

    const sql = 'SELECT * FROM user';

    connection.query(sql, (err, result, field) => {
      if (err) console.log(err)
      console.log(result, '==result==');
      cb(result)
    });

    connection.end()
  },
};
