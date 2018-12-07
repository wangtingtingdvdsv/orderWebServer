const Router = require('koa-router');
const router = new Router();
const category = require('../../operationalDatabase/categorytable.js');
router.post('/seller/category/save', category.changeCategoryInfo) //修改和新增类目信息
router.get('/seller/category', category.searchCategory)//查询类目

module.exports = router;