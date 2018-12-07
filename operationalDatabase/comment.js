const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();



function getComment() {
    var  sql = `SELECT * from comment_table`;
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


const searchComment = async (ctx, next) => { 
    var data = await getComment();
   
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:data
    };
}

module.exports = {
    searchComment
};