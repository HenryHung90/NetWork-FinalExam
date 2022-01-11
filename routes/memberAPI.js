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
var EditName;
var EditFixedDay;
//-------------------------
router.get('/addMember', function(req, res) {
    MongoClient.connect(url, function(err, Client) {
        const dbMember = Client.db('Network').collection('Member')
        let _ID = req.query.id
        let _Name = req.query.name
        let _FixedDay = req.query.fixedday.toString()
        let empty = " "
        let FindJob = _ID.split('')

        dbMember.updateOne({ Job: parseInt(FindJob[0]) }, { $push: { ID: parseInt(_ID), Name: _Name, FixedDay: _FixedDay.toString(), FlexiableDay: empty, WorkDay: empty } }, function(err, result) {
            if (err) throw err
            console.log('ID新增成功')
            console.log(result)
        })
        dbMember.find({}).toArray(function(err, result) {
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
router.get('/EditMember', function(req, res) {
    EditName = req.query.name
    EditFixedDay = req.query.fixedday
    res.json(EditName)
})

router.get('/updateMember', function(req, res) {
    MongoClient.connect(url, function(err, Client) {
        const dbMember = Client.db('Network').collection('Member')
        let _editID = req.query.editID
        let _Name = req.query.name
        let _FixedDay = req.query.fixedday.toString()
        let FindJob = _editID.split('')
        let FindId
        if (FindJob[1] == '0') FindId = FindJob[2]
        else FindId = FindJob[1] + FindJob[2]

        dbMember.updateMany({ Job: parseInt(FindJob[0]) }, { $pull: { ID: parseInt(_editID), Name: EditName, FixedDay: EditFixedDay } }, function(err, result) {
            if (err) throw err
            console.log("刪除")
            console.log(result)
        })
        dbMember.updateMany({ Job: parseInt(FindJob[0]) }, { $push: { ID: parseInt(_editID), Name: _Name, FixedDay: _FixedDay } }, function(err, result) {
            if (err) throw err
            console.log("修改成功")
            console.log(result)
            res.json(result)
        })

    })
});

//刪除待辦事項
router.get('/removeMember', function(req, res) {
    MongoClient.connect(url, function(err, Client) {
        const dbMember = Client.db('Network').collection('Member')
        let _ID = req.query.id
        let _Name = req.query.name
        let _FixedDay = req.query.fixedday
        let FindJob = _ID.split('')
        let FindId
        if (FindJob[1] == "0") FindId = FindJob[2]
        else FindId = FindJob[1] + FindJob[2]

        dbMember.updateMany({ Job: parseInt(FindJob[0]) }, { $pull: { ID: parseInt(_ID), Name: _Name, FixedDay: _FixedDay } }, { $multi: true }, function(err, result) {
            if (err) throw err
            console.log("刪除")
            console.log(result)
        })
        dbMember.updateMany({ Job: parseInt(FindJob[0]) }, { $pop: { FlexiableDay: 1, WorkDay: 1 } }, { $multi: true }, function(err, result) {
            if (err) throw err
            console.log("刪除成功")
            console.log(result)
            res.json(result)
        })

    })
});

router.get('/autoSchedule', function(req, res) {
    MongoClient.connect(url, function(err, client) {
        //Main Function
        const dbMember = client.db('Network').collection('Member')
        dbMember.find({}).toArray(function(err, result) {
            if (err) throw err;
            Manager = JSON.parse(JSON.stringify(result[0]));
            FullTime = JSON.parse(JSON.stringify(result[1]));
            PartTime = JSON.parse(JSON.stringify(result[2]));
            //待解決（雲端抓下來順序錯誤會導致報錯）
            if (err) console.log(err);
            res.json(result); //webS->前端
        })

        // dbSchedule.insertOne(Opt, function(err, res) {
        //     if (err) throw err
        //     console.log("新增成功!!")
        // })
    });
})

router.get('/_sendToDB', function(req, res) {
    MongoClient.connect(url, function(err, client) {
        //Main Function
        const dbSchedule = client.db('Network').collection('Schedule')
        console.log(req.query);
        dbSchedule.insertOne(req.query, function(err, res) {
            if (err) throw err
            console.log("新增成功!!")
        })
    });
})

router.get('/showSchedule', function(req, res) {
    MongoClient.connect(url, function(err, client) {
        //Main Function
        const dbSchedule = client.db('Network').collection('Schedule')
        dbSchedule.find({}).toArray(function(err, result) {
            if (err) throw err
            if (err) console.log(err);
            res.json(result); //webS->前端
        })

    })
});

module.exports = router;