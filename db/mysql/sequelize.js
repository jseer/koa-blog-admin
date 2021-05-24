const config = require("../../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mariadb",
  ...config.mysql,
  sync: {
    force: true,
  },
  timezone: '+08:00',
  define: {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});

module.exports = {
  sequelize,
}