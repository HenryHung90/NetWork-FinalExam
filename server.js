//引入Express
const express = require("express")
const NetWork = express()

//引入body-parser(用於解析json, row, txt, URL-encoded格式)
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//Router
const NetWorkRouter = require('./routes/NetWorkRouter')



//密碼加密----------------
//是否已登入(用於導引)
var IsLogin = false

const bcrypt = require('bcrypt')
const saltRounds = 10 //整數型態，數值越高越安全
//暫存密碼 密碼原型:Hungdodo0427
const storeAccount = "123@g"
const storePassword = "$2b$10$cH0VWkMiTpTBOiLUu3yFmOUDLQ7o1V2L7SQwJdUy3/eZ6DkMZtSqC";

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
NetWork.get('/', (req, res) => {
    console.log('首頁');
    res.render('index');
});
//登入系統檢查-----------------------------------------------------------
NetWork.post("/main/news", urlencodedParser, (req, res) => {
    // console.log(req.body.Account);
    // console.log(req.body.Password);
    //帳號檢查
    var IsAct = false;
    if (req.body.Account == storeAccount) IsAct = true;

    //密碼檢查
    var IsPass = bcrypt.compareSync(req.body.Password, storePassword);

    //結果審查
    console.log("PassResult:" + IsPass);
    console.log("ActResult:" + IsAct);
    if (IsPass && IsAct) {
        IsLogin = true
        console.log('導引至最新消息')
        res.render("main/news")
    } else res.send("帳號或密碼錯誤")
});
//網頁導向-----------------------------------------------------------
NetWork.get('/main/news',(req,res)=>{
    if(IsLogin){
        console.log('導引至最新消息')
        res.render('main/news')
    }else res.send('非法闖入')
})
NetWork.get('/main/edit_news', (req, res) => {
    if(IsLogin){
        console.log('導引至編輯消息')
        res.render('main/edit_news')
    }else res.send('非法闖入')
})
NetWork.get('/main/handjob', (req, res) => {
    if(IsLogin){
        console.log("導引至手動排班");
        res.render("main/handjob");
    }else res.send('非法闖入')    
})
NetWork.get('/main/member', (req, res) => {
    if(IsLogin){
        console.log("導引至員工名單");
        res.render("main/member");
    }else res.send('非法闖入')
})
NetWork.get('/main/memberRest', (req, res) => {
    if (IsLogin) {
        console.log("導引至員工劃休");
        res.render("main/memberRest");
    }else res.send("非法闖入"); 
})
NetWork.get('/main/schedule', (req, res) => {
    if(IsLogin){
    console.log('導引至排班表')
    res.render('main/schedule')
    }
})
//-----------------------------------------------------------------
NetWork.get('/main/aboutUs', (req, res) => {
        // const myPassword = document.getElementById("memerAccount").val();
        // bcrypt.hash(myPassword, saltRounds).then(function (hash) {
        //     console.log(hash);
        // });
    console.log('導引至關於我們')
    res.render('main/aboutUs')
})
//-----------------------------------------------------------------
//NetWork.use('/main',NetWorkRouter)

const host = "127.0.0.1"
const port = 3000
NetWork.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})