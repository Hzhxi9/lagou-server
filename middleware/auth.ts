/**用户鉴权 中间件 */
const auth = (req: any, res: any, next: any) => {
    if (req.session.username) {
        console.log('has user')
        next()
    } else {
        res.render('fail', {
            data: JSON.stringify({ message: '请登录' })
        })
    }
}

module.exports = { auth }