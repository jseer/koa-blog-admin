const UserModel = require("../db/mysql/models/user");
const bcrypt = require("bcrypt");
const userValidator = require('../util/validator/user')
const svgCaptcha = require('svg-captcha');
class UserController {
  async register(ctx, next) {
    const body = ctx.request.body;
    await ctx.validate(userValidator.register, body);
    await UserModel.create(body);
    ctx.body = {
      code: 200,
      data: true,
    };
  };
  
  async login(ctx, next) {
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
        ctx.session.isAdmin = user.isAdmin;
        ctx.session.username = user.username;
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
  }
  
  async getCaptcha(ctx, next){
    const captcha = svgCaptcha.create();
    ctx.cookies.set('captcha', captcha.text);
    ctx.type = 'svg';
    ctx.status = 200;
    ctx.body = captcha.data;
  }
  
  async get(ctx, next) {
    const id = ctx.session.userId;
    const data = await UserModel.findOne({
      attributes: {
        exclude: ['password'],
      },
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
}

module.exports = new UserController();
