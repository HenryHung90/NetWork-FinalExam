const express = require("express")
const NetWork = express()
const NetWorkRouter = require('./routes/NetWorkRouter')

const bcrypt = require("bcrypt")
const saltRounds = 10; //整數型態，數值越高越安全


NetWork.set("view engine","pug")
NetWork.get('/',(req,res)=>{
    console.log('首頁');
    res.render('index');
});
//test-----------------------
NetWork.get('/main/news',(req,res)=>{
    // const myPassword = document.getElementById("memerAccount").val();
    // bcrypt.hash(myPassword, saltRounds).then(function (hash) {
    //     console.log(hash);
    // });
    console.log('導引至最新消息')
    res.render('/main/news')
})
//--------------------------

//NetWork.use('/main',NetWorkRouter)
NetWork.use(express.static('public'))

const host = "127.0.0.1"
const port = 3000
NetWork.listen(port,host,()=> {
    console.log(`Server running on ${host}:${port}`)
})