const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const static = require("koa-static");
const path = require("path");
const session = require('koa-generic-session');
const config = require("./config");
const checkLogin = require("./middlewares/checkLogin");
const redisStore = require("koa-redis");
// const redisClient = require('./db/redis');

const app = new Koa();
app.keys = ["koa-blog"];

// 加载 mysql validator
require("./db/mysql")(app);
require("./util/validator")(app);

// 中间件
app.use(static(path.resolve(__dirname, "public")));
["logger", "catchError"].forEach((name) => {
  const fnPath = path.resolve(__dirname, "middlewares", name);
  app.use(require(fnPath)());
});
app.use(session({
  ...config.session,
  store: redisStore({
    // client: redisClient,
    host: '127.0.0.1',
    port: 6379,
    password: 123456,
  })
}));
app.use(checkLogin());
app.use(bodyparser());

// 路由
const router = require("./router");
router(app);

app.listen(3000, () => console.log("3000端口已启动"));
