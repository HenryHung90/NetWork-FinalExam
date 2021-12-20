// 1. 一個月的時間
// 2. 平日:1副理+1正職+2兼職、假日:1副理+2正職＋4兼職
// 3. 所有人不能連續五天
// 4. 分早班、晚班
// 5. 人員遇排休、故休跳過
// 6. 若有無人可上班日期顯示紅色
// 7. 若有人數不夠日期顯示黃色
window.ready = function(){
    //自動排班系統
    //副理
    const manager = 1
    //正職
    const NFull = 1
    const WFull = 2
    //兼職
    const NPart = 2
    const WPart = 4
    //連續工作天
    const ContinueDay = 5
    //日期
    const Month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    //星期
    const Week = ["Mon","Tues","Wed","Thur","Fri","Sat","Sun"]
    //測資
    const Manager_1 = {
        job: 1,
        ID: 001,
        Name: "Jay",
        FixedDay: ["Mon", "Wed"],
        FlexiableDay: [],
    };
    const Manager_2 = {
        job: 1,
        ID: 002,
        Name: "Jason",
        FixedDay: ["Tues","Thur"],
        FlexiableDay: [],
    };
    const FullTime_1 = {
        job: 2,
        ID: 001,
        Name: "Doris",
        FixedDay: ["Fri","Sat"],
        FlexiableDay: [],
    };
    const FullTime_2 = {
        job: 2,
        ID: 002,
        Name: "Jerry",
        FixedDay: ["Sun", "Wed"],
        FlexiableDay: [],
    };
    const FullTime_3 = {
        job: 2,
        ID: 003,
        Name: "Allen",
        FixedDay: ["Tues", "Thur"],
        FlexiableDay: [],
    };
    const FullTime_4 = {
        job: 2,
        ID: 004,
        Name: "Leo",
        FixedDay: ["Fri", "Sun"],
        FlexiableDay: [],
    };
    const PartTime_1 = {
        job: 3,
        ID: 001,
        Name: "Henry",
        FixedDay: ["Fri","Sat","Sun"],
        FlexiableDay: [],
    };
    const PartTime_2 = {
        job: 3,
        ID: 002,
        Name: "Herry",
        FixedDay: ["Fri","Sat"],
        FlexiableDay: [],
    };
    const PartTime_3 = {
        job: 3,
        ID: 003,
        Name: "Bolly",
        FixedDay: ["Mon","Sat"],
        FlexiableDay: [],
    };
    const PartTime_4 = {
        job: 3,
        ID: 004,
        Name: "Qnnine",
        FixedDay: ["Tues","Sun"],
        FlexiableDay: [],
    };
    const PartTime_5 = {
        job: 3,
        ID: 005,
        Name: "Kim",
        FixedDay: ["wed","Thur"],
        FlexiableDay: [],
    };
    const PartTime_6 = {
        job: 3,
        ID: 006,
        Name: "Henry",
        FixedDay: ["Fri","Sat","Sun"],
        FlexiableDay: [],
    };
    //-------------------------------------------
    
}