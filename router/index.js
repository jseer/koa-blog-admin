const Router = require('koa-router');

const userController = require('../controller/user');

const router = new Router({
    prefix: '/api',
});

const commonRouter = new Router()

module.exports = function (app) {
    commonRouter.get('/getCaptcha', userController.getCaptcha);

    router.post('/user/register', userController.register);
    router.post('/user/login', userController.login);
    router.post('/user/query', userController.query);
    router.post('/user/delete', userController.delete);
    router.post('/user/deleteAll', userController.deleteAll);
    router.get('/user/get', userController.get);

    app.use(router.routes());
    app.use(commonRouter.routes());
}