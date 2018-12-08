const Router = require('koa-router');
const router = new Router();
const product = require('../../operationalDatabase/product.js');

const upload = require('../../uploads/multer.js');


router.post('/seller/product/save', product.changeProductInfo) //商品信息修改和添加

 router.get('/seller/product/list/:productId', product.searchProductById)//通过商品ID查询商品
 router.post('/seller/product/offSale/:productId', product.productOffSale) //商品下架
 router.post('/seller/product/onSale/:productId', product.productOnSale) //商品上架
 router.get('/seller/product/list', product.productPagingQuery) //商品分页查询


 
 router.post('/uploadImg', upload.upload.single('file'), async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        filename: ctx.req.file.filename
    } 
 })
 


module.exports = router;