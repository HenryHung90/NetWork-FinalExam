var express = require('express');
var router = express.Router();
var memberModel = require('../Tool/memberModel.js');

router.post('/addMember', function(req, res) {
    console.log(req.body.IDnum);
    var newMember = new memberModel({
        IDnum: req.body.IDnum,
        Name: req.body.Name,
        Rest: req.body.Rest,
    });

    newMember.save(function(err, data) {
        if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
            console.log("新增失敗");
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
            console.log("新增成功");
        }
    })
});

//登入畫面擷取所有資料
router.get('/getMember', function(req, res) {
    memberModel.find(function(err, data) { //webServer跟DB搜尋資料
        if (err) console.log(err);
        res.json(data); //webS->前端
    });
});

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