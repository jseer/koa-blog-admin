const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

class Post extends Model {

}

Post.init({
  title: {
    type: DataTypes.CHAR(20),
    allowNull: false,
    comment: "文章标题",
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    comment: "文章内容",
  },
  description: {
    type: DataTypes.CHAR(100),
    comment: "文章描述",
  },
  status: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[0, 1]],
    },
    defaultValue: 0,
    comment: "文章状态",
  },
  count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: "文章浏览数",
  },
  author: {
    type: DataTypes.CHAR,
    comment: '文章作者',
    allowNull: false,
  }
},
{
  tableName: "posts",
  modelName: "post",
  sequelize,
});

module.exports = Post;
