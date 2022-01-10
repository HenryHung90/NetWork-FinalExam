var express = require('express');
var router = express.Router();
//引入Mongodb
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb+srv://Henry:12345@schedeulemode.4vfu7.mongodb.net/Network?retryWrites=true";
//------Global Var---------
var Manager;
var FullTime;
var PartTime;
//-------------------------
router.get('/addMember', function(req, res) {
    MongoClient.connect(url, function(err, Client) {
        const dbMember = Client.db('Network').collection('Member')
        let _ID = req.query.id
        let _Name = req.query.name
        let _FixedDay = req.query.fixedday.toString()
        let empty = " "
        let FindJob = _ID.split('')

        if (FindJob[0] == 1) {
            console.log("Enter 1")
            dbMember.updateOne({ Job: 1 }, { $push: { ID: parseInt(_ID), Name: _Name, 'FixedDay': _FixedDay.toString(), FlexiableDay: empty, WorkDay: empty } }, function(err, res) {
                if (err) throw err
                console.log('ID新增成功')
            })
        } else if (FindJob[0] == 2) {
            console.log("Enter 2")
            dbMember.updateOne({ Job: 2 }, { $push: { ID: parseInt(_ID), 'Name': _Name, 'FixedDay': _FixedDay.toString(), FlexiableDay: empty, WorkDay: empty } }, function(err, res) {
                if (err) throw err
                console.log('ID新增成功')
            })
        } else {
            console.log("Enter 3")
            dbMember.updateOne({ Job: 3 }, { $push: { 'ID': parseInt(_ID), 'Name': _Name, 'FixedDay': _FixedDay.toString(), 'FlexiableDay': empty, 'WorkDay': empty } }, function(err, res) {
                if (err) throw err
                console.log('ID新增成功')
            })
        }
        dbMember.find({}).toArray(function(err, result) {
            if (err) throw err
            res.json(result)
        })

    })

});

//登入畫面擷取所有資料
router.get('/getMember', function(req, res) {
    MongoClient.connect(url, function(err, Client) { //webServer跟DB搜尋資料
        const dbMember = Client.db("Network").collection("Member");
        dbMember.find({}).toArray(function(err, result) {
            if (err) throw err
            Manager = JSON.parse(JSON.stringify(result[0]));
            FullTime = JSON.parse(JSON.stringify(result[1]));
            PartTime = JSON.parse(JSON.stringify(result[2]));
            if (err) console.log(err);
            res.json(result); //webS->前端
        })


    });
});
/*
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
*/
//修改與更新待辦事項
router.post('/updateMember', function(req, res) {
    var id = req.body.id;
    memberModel.findById(id, function(err, data) {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            data.title = req.body.title;
            data.msg = req.body.msg;
            data.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json({
                        "status": 1,
                        "msg": "error",
                    })
                } else {
                    res.json({
                        "status": 0,
                        "msg": "修改成功",
                    });
                }
            });
        };
    });
});

//刪除待辦事項
router.post('/removeMember', function(req, res) {
    var id = req.body.id;
    memberModel.remove({
        _id: id
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            console.log("刪除成功");
            res.json({
                "status": 0,
                "msg": "success"
            });
        }
    });
});

module.exports = router;