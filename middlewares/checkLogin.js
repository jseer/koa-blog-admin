module.exports = function () {
    const ignore = [
        '/api/user/login',
        '/api/user/register',
        '/api/getCaptcha',
    ]
    return async (ctx, next) => {
        if(ignore.includes(ctx.path)) {
            return await next();
        }
        if(ctx.session.userId || ctx.session.userId===0) {
            return await next();
        } else {
            const referer = ctx.get('referer');
            let host = '';
            try {
                host = new URL(referer).origin;
            } catch(e) {
                console.log(`非法请求： ${referer} ${e}`);
            }
            ctx.redirect(`${host}/login`);
        }
    }
}