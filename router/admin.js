const Router = require("koa-router");
const router = new Router();
const adminController = require("../controller/admin");

// 用户路由
router.post("/user/query", adminController.query);
router.post("/user/update", adminController.update);
router.post("/user/delete", adminController.delete);


//文章路由


module.exports = router;
