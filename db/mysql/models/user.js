const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../index');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

const saltRounds = 10;

class User extends Model {

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '用户名称',
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户密码',
        set(value) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        },
    },
    email: {
        type: DataTypes.STRING(128),
        comment: '用户邮箱',
    },
    avator: {
        type: DataTypes.STRING,
        comment: '用户头像地址',
    },
}, {
    sequelize,
})

User.sync({alter: true});

module.exports = User;