const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();


const usersRouter = require('./routes/user');

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

/**处理跨域 */
app.use(cors())

/**注册user接口 */
app.use('/api/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: (arg0: any) => void) {
  next(createError(404));
});

// error handler
app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
