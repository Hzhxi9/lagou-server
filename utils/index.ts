const bcrypt = require('bcrypt');

const hashFun = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err: any, hash: any) => {
      if (err) {
        reject(err);
        throw new Error('加密失败')
      }
      resolve(hash);
    });
  });
};

const compareFun = (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err: any, result: boolean) {
      resolve(result)
    })
  })
}

module.exports = {
  hash: hashFun,
  compare: compareFun,
};
