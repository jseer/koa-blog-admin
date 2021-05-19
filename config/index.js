module.exports = {
  mysql: {
    database: "test",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "999999",
  },
  session: {
    key: "koa.sess",
    maxAge: 86400000,
    rolling: false,
  },
};
