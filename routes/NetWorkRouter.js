const express = require('express')
const router = express.Router()

router.get("/edit_news", (res, req) => {
  res.send("edit_news");
  console.log("導引至編輯最新消息");
});
router.get("/handjob", (res, req) => {
  res.send("handjob");
  console.log("導引至手動排班");
});
router.get("/member", (res, req) => {
  res.send("member");
  console.log("導引至員工名單");
});
router.get("/memberRest", (res, req) => {
  res.send("memberRest");
  console.log("導引至員工劃休");
});
router.get("/news", (res, req) => {
  res.send("news");
  console.log("導引至最新消息");
});
router.get("/schedule", (res, req) => {
  res.send("schedule");
  console.log("導引至排班表");
});
module.exports = router