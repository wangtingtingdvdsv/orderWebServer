const Koa = require('koa');
const koaBody = require('koa-body') 
var cors = require('koa2-cors');
const category = require('./interface/seller/category');
const product = require('./interface/seller/product');
const order = require('./interface/seller/order');
const admin = require('./interface/admin/admin');
const comment = require('./interface/seller/comment');
const session=require('koa-session');
const convert = require('koa-convert');
// var multer = require('multer')
// const upload = multer({ dest: 'uploads/' });

  
const app = new Koa();
app.keys = ['this is my secret and fuck you all'];


app.use(cors({
  credentials: true,
  maxAge: '1728000'
}))
// app.use(upload.single('file'));
app.use(koaBody());
app.use(convert(session({
  key: 'loginAuthentication', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  // overwrite: true, /** (boolean) can overwrite or not (default true) */
  // httpOnly: true, /** (boolean) httpOnly or not (default true) */
  // signed: true, /** (boolean) signed or not (default true) */
},app)));

app.use(admin.routes()).use(admin.allowedMethods());
app.use(category.routes()).use(category.allowedMethods());
app.use(product.routes()).use(product.allowedMethods());
app.use(order.routes()).use(order.allowedMethods());
app.use(comment.routes()).use(comment.allowedMethods());

app.listen(3004, function() {
  console.log('启动成功 3004');
});


 