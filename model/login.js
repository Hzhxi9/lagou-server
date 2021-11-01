const { checkUser } = require('./user');
const { compare } = require('../utils')


const loginModel = async ({ username, password }) => {
    const has = await checkUser({ username })
    if (has.length) {
        const { password: pwd } = has[0];
        const checkPwd = await compare(password, pwd)
        if (checkPwd) {
            return '登录成功'
        } else {
            throw '密码或用户名错误'
        }
    } else {
        throw '密码或用户名错误'
    }
}


module.exports = { loginModel }