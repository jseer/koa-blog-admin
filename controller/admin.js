const UserModel = require("../db/mysql/models/user");
const PostModel = require('../db/mysql/models/post');
const userValidator = require("../util/validator/user");
const postValidator = require("../util/validator/post");
const { Op } = require("sequelize");

class AdminController {
  async query(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(userValidator.query, body);
    const { pageSize, pageNum } = body;
    const { count, rows } = await UserModel.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
    });
    ctx.body = {
      code: 200,
      data: {
        list: rows,
        total: count,
      },
    };
  };
  
  async update(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(userValidator.update, body);
    const { id, isAdmin, password } = body;
    const data = {
      isAdmin,
      password: password ? password : undefined,
    };
    await UserModel.update(data, {
      where: {
        id,
      },
    });
    ctx.body = {
      code: 200,
      data: true,
    };
  }
  
  async delete(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(userValidator.delete, body)
    const { ids } = body;
    await UserModel.destroy({
      where: {
        id: {
          [Op.in]: ids,
        }
      },
    });
    if(ids.includes(ctx.session.userId)) {
      ctx.session.userId = null;
    }
    ctx.body = {
      code: 200,
      data: true,
    };
  }

  async logout(ctx, next) {
    ctx.session.userId = null;
    ctx.body = {
      code: 200,
      data: null,
    }
  }
}

module.exports = new AdminController();