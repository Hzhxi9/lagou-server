const loginModels = require('../model/login')
const randomString = require('randomString')

const loginController = async (req: any, res: any, next: any) => {
    try {
        const { username, password } = req.body;
        const data = await loginModels.loginModel({ username, password })
        const sessionId = randomString.generate()
        // res.set('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly`)
        req.session.username = sessionId
        res.render('success', {
            data
        })
    } catch (error) {
        res.render('fail', {
            data: error
        })
    }
}

const logoutController = async (req: any, res: any, next: any) => {
    try {
        if (req.session.username) req.session.username = null
        res.render('success', {
            data: '登出成功'
        })
    } catch (error) {
        res.render('fail', {
            data: error
        })
    }
}

module.exports = {
    loginController,
    logoutController
}