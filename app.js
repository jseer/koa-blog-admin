const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa-cors');
const static = require('koa-static');
const path = require('path');
const session = require('koa-session');
const config = require('./config');
const checkLogin = require('./middlewares/checkLogin');

const app = new Koa();
app.keys = ['koa-blog'];

// 加载 mysql validator
require('./db/mysql');
require('./util/validator')(app);

// 中间件
app.use(cors());
['logger', 'catchError'].forEach((name)=> {
    const fnPath = path.resolve(__dirname, 'middlewares', name);
    app.use(require(fnPath)());
})
app.use(session(config.session, app));
app.use(checkLogin());
app.use(static(path.resolve(__dirname, 'public')));
app.use(bodyparser());


// 路由
const router = require('./router');
router(app)

app.listen(3000, ()=> console.log('3000端口已启动'))

