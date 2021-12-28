// 1. 一個月的時間
// 2. 平日:1副理+1正職+2兼職、假日:1副理+2正職＋4兼職
// 3. 所有人不能連續五天
// 4. 分早班、晚班
// 5. 人員遇排休、故休跳過
// 6. 若有無人可上班日期顯示紅色
// 7. 若有人數不夠日期顯示黃色
//window.ready = function(){
//自動排班系統
//每日應上班人數------------------------
//副理
const manager = 1
//正職
const Normal_Full = 1
const Week_Full = 2
//兼職
const Normal_Part = 2
const Week_Part = 4
//------------------------------------
//員工總人數----------------------------
//副理
const Manager_num = 2
//正職
const Full_num = 4
//兼職
const Part_num = 6
//總人數
const All_num = Manager_num + Full_num + Part_num
//------------------------------------
//連續工作天
const ContinueDay = 5
//年月
const Year = '2022-1'
//月份起始日期
const StartDay = 'Sat'
//日期
const Month = ['1','2','3','4','5','6','7','8','9','10',
            '11','12','13','14','15','16','17','18','19',
            '20','21','22','23','24','25','26','27','28','29','30','31']
//星期
const Week = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
//日曆
const Calender = []
//特殊日：全員請假
var ManagerError = []
var FullTimeError = []
var PartTimeError = []
//特殊日：人手不足
var ManagerhelfError = []
var FullTimehelfError = []
var PartTimehelfError = []
//輸出班表
var Opt = {
  1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],
  11:[],12:[],13:[],14:[],15:[],16:[],17:[],18:[],19:[],20:[],
  21:[],22:[],23:[],24:[],25:[],26:[],27:[],28:[],29:[],30:[],
  31:[]
}
//測資
//------------------------
//Job 職位: 1經理 2正職 3兼職(int)
//ID 員工編號(int)
//Name 員工姓名(string)
//FixedDay 固定休假(string)
//FlexiableDay 請假日期(int)
//WorkDay 工作日期+班別: 格式[1,1](日期int,班別int) 班別:1早 2晚 3早+晚
//------------------------
const Manager = {
  Job: 1,
  ID: [100,101],
  Name: ["Jay","Jason"],
  FixedDay:["Sat,Wed","Tues,Thur"],
  FlexiableDay:['6,7,8','6,7,8'],
  WorkDay:["",""]
}
const FullTime ={
  Job:2,
  ID:[200,201,202,203],
  Name:["Doris","Jerry","Allen","Leo"],
  FixedDay:["Fri,Sat","Sun,Wed","Tues,Thur","Fri,Sun"],
  FlexiableDay:['5,6,10,1','8,7,10,1','10,15,17','10,11'],
  WorkDay:["","","",""]
}
const PartTime = {
  Job:3,
  ID:[300,301,302,303,304,305],
  Name:["Henry","Herry","Bolly","Queenie","Kim","Ruby"],
  FixedDay:["Fri,Sat,Sun","Fri,Sat","Mon,Sat","Tues,Sun","Wed,Thur","Fri,Sat,Sun"],
  FlexiableDay:['1','2','2','2','2','2'],
  WorkDay:["","","","","",""]
}

AutoSchedule()

//-------------------------------------------
//Main Function
function AutoSchedule(){
  //let IsWorking = true
  //$('#block_msg').fadeIn()
  //抓取月份第一天
  GetStartDay()
  //抓取員工休假時間
  MemLeave()
  //自動排班
  for (let i = 1; i <= Month.length; i++) {
    //經理排班
    ManagerSchedule(i)
    //正職排班
    if(IsWeekend(i)) for(let j = 0;j<Week_Full;j++) FullSchedule(i)
    else for(let j = 0;j<Normal_Full;j++) FullSchedule(i)
    //兼職排班
    if(IsWeekend(i)) for(let j = 0;j<Week_Part;j++) PartSchedule(i)
    else for(let j = 0;j<Normal_Part;j++) PartSchedule(i)
  }
  
  //Debug區域-----------
  // for (let i = 0; i < Manager_num; i++) {
  //   console.log(Manager.Name[i] + " 上班:" + Manager.WorkDay[i])
  //   console.log(Manager.Name[i] + " 排休:" + Manager.FlexiableDay[i])
  // }
  // for (let i = 0; i < Full_num; i++) {
  //   console.log(FullTime.Name[i] + " 上班:" + FullTime.WorkDay[i])
  //   console.log(FullTime.Name[i] + " 排休:" + FullTime.FlexiableDay[i])
  // }
  // for (let i = 0; i < Part_num; i++) {
  //   console.log(PartTime.Name[i] + " 上班:" + PartTime.WorkDay[i])
  //   console.log(PartTime.Name[i] + " 排休:" + PartTime.FlexiableDay[i])
  // }
    
  console.log("Manager全請日:"+ManagerError)
  console.log("FullTime全請日:"+FullTimeError)
  console.log("PartTime全請日:"+PartTimeError)
    
  for (let i = 1; i <= Object.keys(Opt).length; i++) {
    console.log(i+"號:"+Opt[i])
  }
  //-------------------
  
  //console.log(Calender);
  //if(!IsWorking) $('#block_msg').fadeOut()
}
//--------------------------------------------

//Assist Function-----------------------------
//抓取月份第一天排序-----------------------------
function GetStartDay(){
  let Start
  for(let i = 0;i<Week.length;i++){
    if(StartDay == Week[i]){
      Start = i
      break
    }
  }
  for(let i = 0;i<Month.length;i++){
    if(Start%7==0) Start = 0
    Calender[i] = ''
    Calender[i] += Week[Start]
    Start++
  }
}
//---------------------------------------------

//休假統整"Check"-------------------------------
function MemLeave(){
  for(let i = 0;i<Manager_num;i++){
    let FixedTemp = Manager.FixedDay[i].split(',')

    if(Manager.FlexiableDay[i].length == 0) Manager.FlexiableDay[i] = ""
    else Manager.FlexiableDay[i] += ','

    for(let j = 0;j<Calender.length;j++){
      for(let k = 0;k<FixedTemp.length;k++){
        if(FixedTemp[k] == Calender[j]){
            Manager.FlexiableDay[i]+= (j+1) + ','
            break
        }
      }
    }

    let CompleteLeave = Manager.FlexiableDay[i].split(',');
    Manager.FlexiableDay[i] = "";
    for(let c = 0;c<CompleteLeave.length;c++){
      CompleteLeave[i] = parseInt(CompleteLeave[i],10)
    }
    CompleteLeave.pop()
    CompleteLeave = [...new Set(CompleteLeave)]
    CompleteLeave.sort(compareNumbers)
    
    for(let c = 0;c<CompleteLeave.length;c++){
      Manager.FlexiableDay[i] += CompleteLeave[c] + ',';
    }
    Manager.FlexiableDay[i] = Manager.FlexiableDay[i].substr(0,Manager.FlexiableDay[i].length - 1)
  }
}
//------------------------------------------------

//經理排班-----------------------------------------
function ManagerSchedule(Day){
  let Checkpoint = false
  //建立初始值 排每個人第一天的值班 避免空值
  if(Day<=Manager_num){
    //建立亂數
    let TempNum = RamdomMem(Manager_num,0)
    //如果為空且無排休就繼續
    if(Manager.WorkDay[TempNum].length == 0 && !IsLeave(Manager.Job,TempNum,Day)){
      Manager.WorkDay[TempNum] += Day.toString()
      PushSchedule(Day, Manager.Name[TempNum], Manager.Job)
      Checkpoint = true
    }
    //若亂數產生人已有第一天班，則尋找其他人排第一天班
    else{
      for(let i = 0;i<Manager_num;i++){
        //如果遇到還沒排班的人就繼續
        if(TempNum != i && !IsLeave(Manager.Job,i,Day)){
          Manager.WorkDay[i] += Day.toString()
          PushSchedule(Day, Manager.Name[i], Manager.Job)
          Checkpoint = true;
          break
        }
      }
      if (!Checkpoint) DayErrorCatch(Day,Manager.Job)
    }
    return
  }
  //建立之後之亂數
  let TempNum = RamdomMem(Manager_num,0)
  //若無連續工作五天且無排休就給班
  if(IsMemOverFive(Manager.Job,Manager.ID[TempNum],Manager.WorkDay[TempNum])&& !IsLeave(Manager.Job,TempNum,Day)){
    Manager.WorkDay[TempNum] += ","+Day.toString()
    PushSchedule(Day, Manager.Name[TempNum], Manager.Job)
    Checkpoint = true
  }
  //若亂數產生人不滿足條件則尋找其他人
  else{
    for(let i = 0;i<Manager_num;i++){
      if(TempNum != i && !IsLeave(Manager.Job,i,Day)){
        Manager.WorkDay[i] += ","+Day.toString()
        PushSchedule(Day, Manager.Name[i], Manager.Job)
        Checkpoint = true;
        break
      }
    }
    //若都無人排班則放入Error
    if (!Checkpoint) DayErrorCatch(Day, Manager.Job)
  }
}
//------------------------------------------------

//正職排班-----------------------------------------
function FullSchedule(Day){
  let Checkpoint = false
  //建立初始值 排每個人第一天的值班 避免空值
  if(Day<=Full_num){
    //建立亂數
    let TempNum = RamdomMem(Full_num,0)
    //如果為空且無排休就繼續
    if(FullTime.WorkDay[TempNum].length == 0 && !IsLeave(FullTime.Job,TempNum,Day)){
      FullTime.WorkDay[TempNum] += Day.toString()
      PushSchedule(Day, FullTime.Name[TempNum], FullTime.Job)
      Checkpoint = true
    }
    //若亂數產生人已有第一天班，則尋找其他人排第一天班
    else{
      for(let i = 0;i<Full_num;i++){
        //如果遇到還沒排班的人就繼續
        if(TempNum != i && FullTime.WorkDay[i].length == 0 && !IsLeave(FullTime.Job,i,Day)){
          FullTime.WorkDay[i] += Day.toString()
          PushSchedule(Day, FullTime.Name[i], FullTime.Job)
          Checkpoint = true;
          break
        }
      }
      //若都無人排班則放入Error
      if (!Checkpoint) DayErrorCatch(Day, FullTime.Job)
    }
    //避免繼續往下跑 直接回傳
    return
  }
  //建立之後之亂數
  let TempNum = RamdomMem(Full_num,0)
  //若無連續工作五天且無排休就給班
  if(IsMemOverFive(FullTime.Job,FullTime.ID[TempNum],FullTime.WorkDay[TempNum])&& !IsLeave(FullTime.Job,TempNum,Day)){
    FullTime.WorkDay[TempNum] += ","+Day.toString()
    PushSchedule(Day, FullTime.Name[TempNum], FullTime.Job);
    Checkpoint = true
  }
  //若亂數產生人不滿足條件則尋找其他人
  else{
    for(let i = 0;i<Full_num;i++){
      if(TempNum != i && !IsLeave(FullTime.Job,i,Day)){
        FullTime.WorkDay[i] += ","+Day.toString()
        PushSchedule(Day, FullTime.Name[i], FullTime.Job);
        Checkpoint = true;
        break
      }
    }
    //若都無人排班則放入Error
    if (!Checkpoint) DayErrorCatch(Day, FullTime.Job)
  }
}
//------------------------------------------------

//兼職排班-----------------------------------------
function PartSchedule(Day){
  let Checkpoint = false
  //建立初始值 排每個人第一天的值班 避免空值
  if(Day<=Part_num){
    //建立亂數
    let TempNum = RamdomMem(Part_num,0)
    //如果為空且無排休就繼續
    if(PartTime.WorkDay[TempNum].length == 0 && !IsLeave(PartTime.Job,TempNum,Day)){
      PartTime.WorkDay[TempNum] += Day.toString()
      PushSchedule(Day, PartTime.Name[TempNum], PartTime.Job)
      Checkpoint = true
    }
    //若亂數產生人已有第一天班，則尋找其他人排第一天班
    else{
      for(let i = 0;i<Part_num;i++){
        //如果遇到還沒排班的人就繼續
        if(TempNum != i && PartTime.WorkDay[i].length == 0 && !IsLeave(PartTime.Job,i,Day)){
          PartTime.WorkDay[i] += Day.toString()
          PushSchedule(Day, PartTime.Name[i], PartTime.Job)
          Checkpoint = true;
          break
        }
      }
      //若都無人排班則放入Error
      if (!Checkpoint) DayErrorCatch(Day, PartTime.Job)
    }
    //避免繼續往下跑 直接回傳
    return
  }
  //建立之後之亂數
  let TempNum = RamdomMem(Part_num,0)
  //若無連續工作五天且無排休就給班
  if(IsMemOverFive(PartTime.Job,PartTime.ID[TempNum],PartTime.WorkDay[TempNum])&& !IsLeave(PartTime.Job,TempNum,Day)){
    PartTime.WorkDay[TempNum] += ","+Day.toString()
    PushSchedule(Day, PartTime.Name[TempNum], PartTime.Job)
    Checkpoint = true
  }
  //若亂數產生人不滿足條件則尋找其他人
  else{
    for(let i = 0;i<Part_num;i++){
      if(TempNum != i && !IsLeave(PartTime.Job,i,Day)){
        PartTime.WorkDay[i] += ","+Day.toString()
        PushSchedule(Day, PartTime.Name[i], PartTime.Job)
        Checkpoint = true;
        break
      }
    }
    //若都無人排班則放入Error
    if (!Checkpoint) DayErrorCatch(Day, PartTime.Job)
  }
}
//------------------------------------------------

//兼職是否早+晚-------------------------------------
function IsPartDayNight(ID,WorkDay,WorkTime){
    //WorkDay 日期 / WorkTime 班別
}
//------------------------------------------------

//是否連續五天"Check"-------------------------------
function IsMemOverFive(Job,ID,WorkDay){
  //ID初始值校正
  let JobNum = 0
  //存取工作天存入陣列
  let Temp = WorkDay.split(",")
  //存取已編排工作天數
  let TempLength = Temp.length
  //校正排班的第一天位置
  let TempStart = parseInt(Temp[0],10) - 1
  //是否符合規定
  let IsOk = false
  //員工ID校正
  switch(Job){
    case 1:
      JobNum = 100
      break
    case 2:
      JobNum = 200
      break
    case 3:
      JobNum = 300
      break
  }
  JobNum = ID - JobNum
  //Main Function
  for(let i=0;i<TempLength;i+=6){
    //若還未排超過5天則直接回覆符合規定
    if (TempLength < ContinueDay - 1) return true
    //若超出範圍直接跳出迴圈
    if (
      Temp[i]==undefined || 
      Temp[i+1]==undefined ||
      Temp[i+2]==undefined || 
      Temp[i+3]==undefined) break
    //判斷是否為連續五天
    else if (
      Temp[i] == Month[i + TempStart] &&
      Temp[i + 1] == Month[i + 1 + TempStart] &&
      Temp[i + 2] == Month[i + 2 + TempStart] &&
      Temp[i + 3] == Month[i + 3 + TempStart] &&
      Temp[i + 4] == Month[i + 4 + TempStart]
    ) return false;
    else IsOk = true;
  }
  return IsOk
}
//--------------------------------------------------

//是否排休-------------------------------------------
function IsLeave(Job,Worker,Day){
  switch (Job) {
    case 1:
      let ManagerTemp = Manager.FlexiableDay[Worker].split(',')
      for(let i = 0;i<ManagerTemp.length;i++){
        if(Day == ManagerTemp[i]) return true
      }
      return false
    case 2:
      let FullTimeTemp = FullTime.FlexiableDay[Worker].split(',')
      for(let i = 0;i<FullTimeTemp.length;i++){
        if(Day == FullTimeTemp[i]) return true
      }
      return false
    case 3:
      let PartTimeTemp = PartTime.FlexiableDay[Worker].split(',')
      for(let i = 0;i<PartTimeTemp.length;i++){
        if(Day == PartTimeTemp[i]) return true
      }
      return false
  }
    
}
//--------------------------------------------

//匯入排班表------------------------------------
function PushSchedule(Day,Name,Job){
  switch (Job) {
    case 1:
      Opt[Day].push('L-'+Name);
      break;
    case 2:
      Opt[Day].push('F-'+Name);
      break;
    case 3:
      Opt[Day].push('P-'+Name);
      break;
  }
}
//--------------------------------------------

//是否排滿--------------------------------------
function IsFull(Day){

}

//整理全請日and人不足日------------------------------------
function DayErrorCatch(Day,Job){
  switch(Job){
    case 1:
      ManagerError[ManagerError.length] = Day.toString()
      Opt[Day].push("NoneManager")
      break
    case 2:
      FullTimeError[FullTimeError.length] = Day.toString()
      Opt[Day].push("NoneFull")
      break
    case 3:
      PartTimeError[PartTimeError.length] = Day.toString()
      Opt[Day].push("NonePart")
      break
  }
  //ManagerError = ManagerError.substr(0,ManagerError - 1)
}
//--------------------------------------------
function IsWeekend(Day){
  if(Calender[Day] == 'Sat' || Calender[Day] == 'Sun') return true
  return false
}
//math function
function RamdomMem(max,min){
  return parseInt(Math.floor(Math.random() * max) + min, 10);
}
function compareNumbers(a, b) {
  return a - b;
}
