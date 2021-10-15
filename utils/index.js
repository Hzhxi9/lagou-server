const bcrypt = require('bcrypt');

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
        throw new Error('加密失败')
      }
      resolve(hash);
    });
  });
};

module.exports = {
  hash,
};
