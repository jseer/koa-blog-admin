module.exports = function() {
    return async (ctx, next) => {
        if(ctx.session.isAdmin) {
            return next();
        }
        ctx.throw(403, '无权限')
    }
}