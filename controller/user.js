const UserModel = require("../db/mysql/models/user");
const bcrypt = require("bcrypt");
const userValidator = require('../util/validator/user')
const svgCaptcha = require('svg-captcha');

exports.register = async function (ctx, next) {
  const body = ctx.request.body;
  await ctx.validate(userValidator.register, body);
  await UserModel.create(body);
  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.login = async function (ctx, next) {
  const body = ctx.request.body;
  const { username, password } = body;
  await ctx.validate(userValidator.login, body);
  const captchaText = ctx.cookies.get('captcha') || '';
  const code = body.code || '';
  if(code.toLowerCase() !== captchaText.toLowerCase()) {
    ctx.body = {
      code: 200,
      data: null,
      message: '验证码错误',
    }
  }
  const user = await UserModel.findOne({
    where: {
      username,
    },
  });
  if (user) {
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      ctx.session.userId = user.id;
      ctx.body = {
        code: 200,
        data: true,
      };
    } else {
      ctx.body = {
        code: 500,
        data: null,
        message: "密码错误",
      };
    }
  } else {
    ctx.body = {
      code: 500,
      data: null,
      message: "用户不存在",
    };
  }
};

exports.getCaptcha = async function(ctx, next){
  const captcha = svgCaptcha.create();
  ctx.cookies.set('captcha', captcha.text);
	ctx.type = 'svg';
	ctx.status = 200;
  ctx.body = captcha.data;
}

exports.query = async function (ctx, next) {
  const body = ctx.request.body;
  const { pageSize = 10, pageNum = 1 } = body;
  const { count, rows } = await UserModel.findAndCountAll({
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

exports.delete = async function (ctx, next) {
  const body = ctx.request.body;
  const { id } = body;
  await UserModel.destroy({
    where: {
      id,
    },
  });
  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.deleteAll = async function (ctx, next) {
  await UserModel.destroy({
    truncate: true,
  });
  ctx.body = {
    code: 200,
    data: true,
  };
};
exports.get = async function (ctx, next) {
  const { id } = ctx.query;
  const data = await UserModel.findOne({
    where: {
      id,
    },
  });
  if (data) {
    ctx.body = {
      code: 200,
      data,
    };
  }
};
