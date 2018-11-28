const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();

function queryUserIfExist(data) {
    console.log("data:", data);
    var  sql = `SELECT * from admintable WHERE admin_name='${data.userName}' AND admin_pass='${data.passWord}'`;
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

const logout = (ctx, next) => { //管理员登出
    ctx.session.user = '';
    ctx.status = 200;
    ctx.body = { success: false, msg: '登出成功' };
} 
const login = async (ctx, next) => { //登录验证 
    var data = await queryUserIfExist(ctx.request.body);
    console.log("data", data);
    if (data) {
       ctx.status = 200;
       ctx.session.user = data[0].admin_name;
    //    ctx.response.set('Access-Control-Allow-Credentials', true);
       console.log("#####@", ctx.session.user);
       ctx.body = { success: true, msg: '登录成功！' };
        console.log('登陆成功');
   }
   else{ 
       ctx.status = 400;
       ctx.body = { success: false, msg: '账号或密码错误！' };
       console.log('登录失败');
   }
}
const register = (ctx, next) => { //新增管理员
    var data = ctx.request.body;
    var sql = `INSERT INTO admintable( admin_name, admin_pass) values ('${data.userName}', '${data.passWord}')`;
    var invitationCode = 123456;
    if(data.invitationCode != invitationCode) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: "请求",
            data: null
        }
        return;
    }
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
module.exports = {
    logout,
    login,
    register
};



