const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);


const cancelOrder = (ctx, next) => {//取消订单
    let orderId = ctx.params.orderId;
    sql = `UPDATE orderSummary SET order_status=2
    WHERE order_id=${orderId}`;
   
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
        data: null
    }
} 

const finishOrder = (ctx, next) => {//接单
    let orderId = ctx.params.orderId;
    sql = `UPDATE orderSummary SET order_status=1
    WHERE order_id=${orderId}`;
   
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
        data: null
    }
} 

const orderPageQuery = async (ctx, next) => { //订单概要分页查询
    var data = await getProductByPageAndSize();
    //console.log("request", data);
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:data
    };
} 

const searchOrderById = async (ctx, next) => { //通过订单ID查询某订单
    let orderId = ctx.params.orderId;
    //console.log("orderId", orderId);
    var order = await getOrderById(orderId);
    var orderDetail = await getOrderDetailListByOrderId(order);

     console.log('orderDetail', orderDetail);
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            orderDetail
        }
    };
}

function getProductByPageAndSize() {
    var  sql = `SELECT * from orderSummary`; //从start+1条到第end条， 一共size条。
    console.log('sql', sql);
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

function  getOrderDetailListByOrderId(order) {
        var  sql = `SELECT * from orderdetails WHERE order_id=${order[0].order_id}`;
        order[0].orderDetailList = [];
        return new Promise((resolve, reject) => {
           
            connection.query(sql, ( err, orderDetailList) => {
                if ( err ) {
                    reject( err )
                } else {
                   order[0].orderDetailList = orderDetailList;
                   resolve(order);
                }
            })  
            
        })
}

function getOrderById(orderId) {
    var  sql = `SELECT * from orderSummary WHERE order_id=${orderId}`;
    return new Promise((resolve, reject) => {
       
        connection.query(sql, ( err, result) => {
            if ( err ) {
                console.log("+++++++++++");
              reject( err )
            } else {
              resolve( result )
            }
        })    
        
    })
}

module.exports = {
    cancelOrder,
    finishOrder,
    orderPageQuery,
    searchOrderById
};