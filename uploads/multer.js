//getpath.js
const multer = require('koa-multer')
const path = require('path')

//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/phoneManageSystem/')//path.resolve('public/phoneManageSystem')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({
     storage: storage,
     limits: {
        fileSize: 1024*1024/2 // 限制512KB
      }
});

module.exports={
    upload
}
