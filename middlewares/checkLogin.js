module.exports = function () {
    const ignore = [
        '/api/user/login',
        '/api/user/register',
        '/login',
        '/register',
        '/getCaptcha',
    ]
    return async (ctx, next) => {
        if(ignore.includes(ctx.path)) {
            return await next();
        }
        if(ctx.session.userId || ctx.session.userId===0) {
            return await next();
        } else {
            ctx.redirect('/login');
        }
    }
}