const Router = require('koa-router');
const router = new Router();
const comment = require('../../operationalDatabase/comment.js');

router.get('/seller/comment', comment.searchComment)


module.exports = router;
