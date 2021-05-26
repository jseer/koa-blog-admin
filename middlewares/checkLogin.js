module.exports = function () {
    const ignore = [
        '/api/user/login',
        '/api/user/register',
        '/api/getCaptcha',
    ]
    return async (ctx, next) => {
        if(ignore.includes(ctx.path)) {
            return next();
        }
        console.log(ctx.session);
        if(ctx.session.userId || ctx.session.userId===0) {
            return next();
        } else {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                data: null,
                message: '登录态无效',
            }
        }
    }
}