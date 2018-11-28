const Router = require('koa-router');
const router = new Router();
const order = require('../../operationalDatabase/order.js');

router.get('/seller/order/detail/:orderId', order.searchOrderById) //通过订单ID查询某订单
router.post('/seller/order/cancel/:orderId', order.cancelOrder) //取消订单
 router.post('/seller/order/finish/:orderId', order.finishOrder)//接单
 router.get('/seller/order/list', order.orderPageQuery) //订单概要分页查询


module.exports = router;
