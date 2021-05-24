const { sequelize } = require("./sequelize");
const UserModel = require("./models/user");
const PostModel = require("./models/post");

module.exports = async function (app) {
  try {
    await sequelize.authenticate();
    UserModel.hasMany(PostModel);
    PostModel.belongsTo(UserModel);
    await Promise.all([
      UserModel.sync(),
      PostModel.sync(),
    ]);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
