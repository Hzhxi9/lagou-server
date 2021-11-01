const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session')

const app = express();

const usersRouters = require('./routes/user');
const uploadRouters = require('./routes/upload')
const articleRouters = require('./routes/article')
const loginRouters = require('./routes/login')

/**
 * 配置模版引擎需要在注册路由中间件之前
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

/**
 * 注册body-parser 一定要在注册路由中间件之前
 * urlencoded => 不解析url, 只解析请求体里面的数据
 * 
 * { extended: false } => 以前低版本的 body-parser 是需要依赖于另外一个第三方中间价来实现数据的解析
 * express里面已经集成了这个模块, 不需要借助第三方中间价, 也就是说 extended: false 是不使用外部的第三方中间件解析
 * 
 * 注册body-parser之后解析出来的数据就直接在 req.body 上
 */
app.use(express.urlencoded({ extended: false }));

/**解析cookie */
app.use(cookieParser());

/**处理静态资源 */
app.use(express.static(path.join(__dirname, 'public')));

/**设置cookie-session */
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

/**处理跨域 */
app.use(cors())

app.disable('etag');

app.all('*', function (req, res, next) {

  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
  res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, " +
    "Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/**注册user接口 */
app.use('/api/user', usersRouters);


/**注册article接口 */
app.use('/api/article', articleRouters);

/**注册上传文件 */
app.use('/api', uploadRouters)

/**用户登录 */
app.use('/api', loginRouters)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
