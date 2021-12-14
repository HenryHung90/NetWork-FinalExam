window.onload = function() {
    show();
    var schedulebtn = document.getElementById("schedule");
    var memberRestbtn = document.getElementById("memberRest");
    var memberbtn = document.getElementById("member");
    var aboutUsbtn = document.getElementById("aboutUs");
    var newsbtn = document.getElementById("news");
    var logoutbtn = document.getElementById("logout");

    schedulebtn.addEventListener("click", function() {
        document.location.href = "/main/schedule";
    });
    memberRestbtn.addEventListener("click", function() {
        document.location.href = "/main/memberRest";
    });
    memberbtn.addEventListener("click", function() {
        document.location.href = "/main/member";
    });
    aboutUsbtn.addEventListener("click", function() {
        document.location.href = "/main/aboutUs";
    });
    newsbtn.addEventListener("click", function() {
        document.location.href = "/main/news";
    });
    logoutbtn.addEventListener("click", function() {
        document.location.href = "/";
    });
};

function show() {
    var date = new Date();
    var now = "";
    now = date.getFullYear() + "年";
    now = now + (date.getMonth() + 1) + "月";
    now = now + date.getDate() + "日";
    now = now + date.getHours() + "時";
    now = now + date.getMinutes() + "分";
    now = now + date.getSeconds() + "秒";
    document.getElementById("Time").innerHTML = now;
    setTimeout("show()", 1000);
}