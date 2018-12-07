const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();

function getProductById(id) {
    var  sql = `SELECT * from dishes WHERE product_id=${id}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })    
    })
}

const changeProductInfo = (ctx, next) => {
    var data = ctx.request.body;
    console.log(ctx.request.body);
    var sql;
   
    if(data.productId) { //修改类目信息
        console.log('###########');
        sql = `UPDATE dishes SET product_name='${data.productName}'  , product_price='${data.productPrice}', product_description='${data.productDescription}', seller_phone='${data.sellerPhone}', product_icon='${data.productIcon}', category_type='${data.categoryType}'
        WHERE product_id='${data.productId}'`;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
        })
    } else { //新增类目
        sql = `INSERT INTO dishes(product_name, product_price, product_description, seller_phone, product_icon, category_type) values ('${data.productName}', '${data.productPrice}', '${data.productDescription}', '${data.sellerPhone}', '${data.productIcon}', '${data.categoryType}')`;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
           
        })
    }
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
}

//通过商品ID查询商品
const searchProductById = async (ctx, next) => {
    console.log(ctx.params);
    if(isNaN(ctx.params.productId)){
        return; //不是数字
    }
    const id = ctx.params.productId;
   var data = await getProductById(id);
    
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
};


const productOffSale = (ctx, next) => { //商品下架
    var data = ctx.request.body;
    const id = ctx.params.productId;
    if(!id) {
        return;
    }
    var sql = `UPDATE dishes SET product_status='${data.productStatus}'
    WHERE product_id='${id}'`;
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
}

const productOnSale = (ctx, next) => { //商品上架
    var data = ctx.request.body;
    const id = ctx.params.productId;
    if(!id) {
        return;
    }
    var sql = `UPDATE dishes SET product_status='${data.productStatus}'
    WHERE product_id='${id}'`;
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
}

function getProductByPageAndSize() {
    var  sql = `SELECT * from product`; 
    return new Promise((resolve, reject) => {
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })    
    })
}

const productPagingQuery = async (ctx, next) => { //分页查询
  //通过query获取get方式中data里面的数据，通过body获取post方式中data里面的数据
    var data = await getProductByPageAndSize();
     
     ctx.status = 200;
     ctx.body = {
         code: 0,
         msg: "请求成功",
         data:data
     };
}

module.exports = {
    changeProductInfo,
    searchProductById,
    productOffSale,
    productOnSale,
    productPagingQuery
};