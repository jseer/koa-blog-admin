const { Op } = require("sequelize");
const PostModel = require("../db/mysql/models/post");
const UserModel = require("../db/mysql/models/user");
const postValidator = require("../util/validator/post");

class PostController {
  async create(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(postValidator.create, body);
    const { title, description } = body;
    const { userId, username } = ctx.session;
    await PostModel.create({
      title,
      description,
      author: username,
      userId,
    });
    ctx.body = {
      code: 200,
      data: true,
    };
  }
  async get(ctx, next) {
    await ctx.validate(postValidator.get, ctx.query);
    const { id } = ctx.query;
    const userId = ctx.session.userId;
    const postInfo = await PostModel.findOne({
        where: {
            id,
            userId,
        },
    });
    ctx.body = {
        code: 200,
        data: postInfo,
    }
  }

  async update(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(postValidator.update, body);
    const userId = ctx.session.userId;
    const { title, description, content, id } = body;
    const postInfo = await PostModel.update({
      title,
      description,
      content,
      status: 0,
    },{
        where: {
            id,
            userId,
        },
    });
    ctx.body = {
        code: 200,
        data: postInfo,
    }
  }

  async query(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(postValidator.query, body);
    const { pageSize, pageNum, keyword } = body;
    const userId = ctx.session.userId;
    const { count, rows } = await PostModel.findAndCountAll({
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      attributes: {
        exclude: ['userId'],
      },
      where: {
          userId,
          title: {
            [Op.like]: `%${keyword || ''}%`,
          }
      }
    });

    ctx.body = {
      code: 200,
      data: {
        list: rows,
        total: count,
      },
    };
  }

  async delete(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(postValidator.delete, body);
    const { ids } = body;
    const userId = ctx.session.userId;
    await PostModel.destroy({
      where: {
        userId,
        id: {
          [Op.in]: ids,
        }
      }
    })
    ctx.body = {
      code: 200,
      data: true,
    }
  }

  async publish(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(postValidator.publish, body);
    const { ids } = body;
    const userId = ctx.session.userId;
    await PostModel.update({
      status: 1,
    },{
      where: {
        userId,
        id: {
          [Op.in]: ids,
        }
      }
    })
    ctx.body = {
      code: 200,
      data: true,
    }
  }
}

module.exports = new PostController();
