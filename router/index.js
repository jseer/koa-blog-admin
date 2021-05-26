const Router = require('koa-router');
const adminRouter = require('./admin');

const router = new Router();
const checkIsAdmin = require('../middlewares/checkIsAdmin')
const userController = require('../controller/user');
const postController = require('../controller/post');

module.exports = function (app) {
    // 用户路由
    router.get('/api/getCaptcha', userController.getCaptcha);
    router.post('/api/user/register', userController.register);
    router.post('/api/user/login', userController.login);
    router.post('/api/user/logout', userController.logout);
    router.get('/api/user/get', userController.get);

    // 文章路由
    router.post('/api/post/create', postController.create);
    router.get('/api/post/get', postController.get);
    router.post('/api/post/query', postController.query);
    router.post('/api/post/update', postController.update);
    router.post('/api/post/delete', postController.delete);
    router.post('/api/post/publish', postController.publish);

    router.use('/api/admin', checkIsAdmin(), adminRouter.routes());
    app.use(router.routes());
}