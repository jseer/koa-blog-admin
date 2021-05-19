const config = require("../../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  sequelize,
}