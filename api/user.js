var express = require("express");
var app = express();
var mysql = require("mysql");
var connt =mysql.createConnection({
    host:"localhost",//ip地址
    user:"root",//数据库登录用户
    password:"123456",//登录密码
    port:"3306",//端口号
    database:"wybook"//需要连接的数据库
})
connt.connect();
 
//node 跨域处理
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
 
//登录路由
app.get("/login",function (req,res) {
    // http://127.0.0.1:3001/login?uname=&pwd=
    // 1.获取表单提交的数据
    let uname = req.query.uname;
    let pwd = req.query.pwd;
    // let sql = "select * from liujiaming where uname =? and pwd=?";
//查询
    let sql = "select * from user where userName =?";
    let params = [uname];
    connt.query(sql,params,function (err,rs) {
        if(err) {       //查询失败
            console.log(err)
        }
        console.log(rs)     //打印查询成功
        if(rs.length<1){    //查询成功出来的长度小于1就说明数据库里还没有
            res.send("1")   //然后返回一个1给前端
            var sql = "insert into user(stuld,userName,userPassword) values(null,?,?)";
            var params = [uname,pwd];
            connt.query(sql,params,function (err,rs) {
                if(err) {       //添加失败
                    console.log(err)
                }
                console.log(rs)  //打印添加成功
            })
        }else{          //查询成功出来的长度大于1就说明数据库里面已经有此用户
            res.send("0")   //然后返回一个0给前端
        }
    })
})
//主页路由
app.get("/apps",function (req,res) {
    // http://127.0.0.1:3001/login?uname=&pwd=
    // 1.获取表单提交的数据
    // let uname = req.query.uname;
    // let pwd = req.query.pwd;
    let sql = "select * from user";
    // let params = [null,uname];
    connt.query(sql,function (err,rs) {
        if(err) {
            console.log(err)
        }
        // console.log(rs)
        if (rs.length>0){
            res.send(rs)
        }else {
            res.send("0")
        }
    })
})
 
//删除数据路由
app.get("/dele",function (req,res) {
    // 1.获取表单提交的数据
    let ids = req.query.stuld //数据id名
    let sql = "delete from user where stuld=?"; //删除数据
    let mes = [ids] //用数组保存数据
    connt.query(sql,mes,function (err, rs) {
        if (err) {
            console.log(err)
        }
        res.send("ok")
    })
})
 
//修改路由
app.get("/rabbit",function (req,res) {
    // http://127.0.0.1:3001/login?uname=&pwd=
    // 1.获取表单提交的数据
    let uname = req.query.uname;
    console.log(uname)
    let pwd = req.query.pwd;
    let id = req.query.stuld
    let sql = "update user set userName=?,userPassword=? where stuld=?";
    let params = [uname,pwd,id];
    console.log(params)
    connt.query(sql,params,function (err,rs) {
        if(err) {
            console.log(err)
        }
        res.send("ok")
 
    })
})
 
//添加到输入框
app.get("/bcc",function (req,res) {
    // http://127.0.0.1:3001/login?uname=&pwd=
    // 1.获取表单提交的数据
    let uname = req.query.uname;
    // console.log(uname)
    let pwd = req.query.pwd;
    // console.log(pwd)
    let sql = "select * from user where uname =?";
    // console.log(sql)
    let params = [uname];
    connt.query(sql,params,function (err,rs) {
        if(err) {       //查询失败
            console.log(err)
        }
        console.log(rs)     //打印查询成功
        if(rs.length<1){    //查询成功出来的长度小于1就说明数据库里还没有
            res.send("1")   //然后返回一个1给前端
            var sql = "insert into user(stuld,uname,pwd) values(null,?,?)";
            var params = [uname,pwd];
            connt.query(sql,params,function (err,rs) {
                if(err) {       //添加失败
                    console.log(err)
                }
                console.log(rs)  //打印添加成功
            })
        }else{          //查询成功出来的长度大于1就说明数据库里面已经有此用户
            res.send("0")   //然后返回一个0给前端
        }
    })
})
 
app.listen("3555")
console.log("服务已经开启")
