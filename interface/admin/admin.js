const Router = require('koa-router');
const router = new Router();
const admin = require('../../operationalDatabase/admin.js');

router.post('/admin/logout', admin.logout) //管理员登出
 router.post('/admin/login', admin.login)//登录验证
 router.post('/admin/register', admin.register) //新增管理员


module.exports = router;
