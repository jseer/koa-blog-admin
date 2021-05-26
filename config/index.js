module.exports = {
  mysql: {
    database: "test",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "123456",
  },
  session: {
    key: "koa.sess",
    cookie: {
      maxAge: 86400000,
    },
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
    password: "123456",
  },
};
