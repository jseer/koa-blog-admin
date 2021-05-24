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
    maxAge: 86400000,
  },
};
