//引入Express
const express = require("express");
//設定網頁分頁路由
const memberAPI = require('./routes/memberAPI');
const NetWork = express();

//引入Mongodb
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert")

// Connection URL
const url = "mongodb+srv://Henry:12345@schedeulemode.4vfu7.mongodb.net/Network?retryWrites=true";

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log("connect to " + url)
});

//引入body-parser(用於解析json, row, txt, URL-encoded格式)
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//Router
//const NetWorkRouter = require('./routes/NetWorkRouter')

//密碼加密----------------
//是否已登入(用於導引)
var IsLogin = false
const bcrypt = require('bcrypt')
const saltRounds = 10 //整數型態，數值越高越安全
    //暫存密碼 密碼原型:Hungdodo0427
    //const storeAccount = "123@g"
    //const storePassword = "$2b$10$cH0VWkMiTpTBOiLUu3yFmOUDLQ7o1V2L7SQwJdUy3/eZ6DkMZtSqC";
    //雜湊
    // bcrypt.hash(req.body.Password, saltRounds).then(function (hash) {
    //   console.log("hash=" + hash);
    //   storePassword = hash;
    // });
    //比對
    // bcrypt.compare(myPassword, myHash).then(function (res) {
    //     console.log(res); // true
    // });
    //-----------------------
NetWork.use(express.static("public"))
NetWork.use(express.json())
NetWork.set("view engine", "pug")
NetWork.use('/memberAPI', memberAPI)
NetWork.get('/', (req, res) => {
    if (!IsLogin) {
        console.log("首頁");
        res.render("index");
    } else {
        console.log("導引至最新消息")
        res.render('main/news')
    }

});
//登入系統檢查-----------------------------------------------------------
NetWork.post("/main/news", urlencodedParser, (req, res) => {
    //帳號檢查
    let IptAccount = req.body.Account
    let IptPassword = req.body.Password
        // bcrypt.hash(req.body.Password, saltRounds).then(function (hash) {
        //     console.log("hash=" + hash)
        //     IptPassword = hash
        // });
    MongoClient.connect(url, function(err, Client) {
        const dbAdmin = Client.db("Network").collection("Admin");
        dbAdmin.find({ Account: IptAccount }).toArray(function(err, doc) {
            if (err) throw err
            bcrypt.compare(IptPassword, doc[0].Key).then(function(gate) {
                if (gate) {
                    res.render("main/news")
                    IsLogin = true
                } else res.send("帳號或密碼錯誤")
            });
        });
    })
});
//網頁導向-----------------------------------------------------------
NetWork.get('/main/news', (req, res) => {
    if (IsLogin) {
        console.log('導引至最新消息')
        res.render('main/news')
    } else res.send('非法闖入')
})
NetWork.get('/main/edit_news', (req, res) => {
    if (IsLogin) {
        console.log('導引至編輯消息')
        res.render('main/edit_news')
    } else res.send('非法闖入')
})
NetWork.get('/main/handjob', (req, res) => {
    if (IsLogin) {
        console.log("導引至手動排班");
        res.render("main/handjob");
    } else res.send('非法闖入')
})
NetWork.get('/main/member', (req, res) => {
    if (IsLogin) {
        console.log("導引至員工名單");
        // MongoClient.connect(url, function(err, client) {
        //     const dbMember = client.db("Network").collection("Member");
        //     dbMember.find({}).toArray(function(err, result) {
        //         if (err) throw err
        //         Manager = JSON.parse(JSON.stringify(result[0]));
        //         FullTime = JSON.parse(JSON.stringify(result[1]));
        //         PartTime = JSON.parse(JSON.stringify(result[2]));
        //     })
        // });
        res.render("main/member");
    } else res.send('非法闖入')
})
NetWork.get('/main/memberRest', (req, res) => {
    if (IsLogin) {
        console.log("導引至員工劃休");
        res.render("main/memberRest");
    } else res.send("非法闖入");
})
NetWork.get('/main/schedule', (req, res) => {
    if (IsLogin) {
        console.log('導引至排班表')
        res.render('main/schedule')
    } else res.send("非法闖入")
})
NetWork.get('/main/aboutUs', (req, res) => {
    console.log('導引至關於我們')
    res.render('main/aboutUs')
})

NetWork.get('/Logout', (req, res) => {
    IsLogin = false
    console.log('已登出')
    res.render('index')
});
//-----------------------------------------------------------------
//NetWork.use('/main',NetWorkRouter)


const host = "127.0.0.1"
const port = 3000
NetWork.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})