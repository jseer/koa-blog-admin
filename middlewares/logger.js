module.exports = () => {
    return async (ctx, next) => {
        const { path, method } = ctx;
        const start = Date.now();
        console.log(`path: ${path} method: ${method} start`);
        await next();
        const end = Date.now();
        console.log(`path: ${path} method: ${method} end in ${end-start}ms`);
    }
}