const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User extends Model {
  author() {
    return this.getDataValue('user').username;
  }
}

User.init(
  {
    username: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "用户名称",
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户密码",
      set(value) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    email: {
      type: DataTypes.STRING(128),
      comment: "用户邮箱",
    },
    avator: {
      type: DataTypes.STRING,
      comment: "用户头像地址",
      defaultValue: "/images/avator.jpg",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      get() {
        const rawValue = this.getDataValue("isAdmin");
        return rawValue ? true : false;
      },
      set(val) {
        this.setDataValue("isAdmin", val ? 1 : 0);
      },
    },
  },
  {
    tableName: "users",
    modelName: "user",
    sequelize,
  }
);

module.exports = User;
