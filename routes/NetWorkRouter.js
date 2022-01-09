const express = require('express')
const router = express.Router()
const NetWork = express()
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
        res.render("main/member");
    } else res.send('非法闖入')
})
NetWork.get('/memberRest', (req, res) => {
    if (IsLogin) {
        console.log("導引至員工劃休");
        res.render("main/memberRest");
    } else res.send("非法闖入");
})
NetWork.get('/schedule', (req, res) => {
    if (IsLogin) {
        console.log('導引至排班表')
        res.render('main/schedule')
    } else res.send("非法闖入")
})
NetWork.get('/aboutUs', (req, res) => {
    console.log('導引至關於我們')
    res.render('main/aboutUs')
})


module.exports = router