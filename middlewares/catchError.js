module.exports = function () {
    return async (ctx, next) => {
        try {
            await next()
        } catch(e) {
            ctx.body = {
                code: e.status || e.statusCode || 500,
                data: null,
                message: e.message || 'Internal Server Error',
            }
        }
    }
}