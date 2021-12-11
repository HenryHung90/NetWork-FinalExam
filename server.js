const express = require("express")
const NetWork = express()
const NetWorkRouter = require('./routes/NetWorkRouter')

NetWork.set("view engine","pug")
NetWork.get('/',(req,res)=>{
    console.log('首頁');
    res.render('index');
});
NetWork.route('/main',NetWorkRouter)

const host = "127.0.0.1"
const port = 3000
NetWork.listen(port,host,()=> {
    console.log(`Server running on ${host}:${port}`)
})