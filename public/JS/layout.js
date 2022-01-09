window.onload = function() {
    show();
    var schedulebtn = document.getElementById("schedule");
    var memberRestbtn = document.getElementById("memberRest");
    var memberbtn = document.getElementById("member");
    var aboutUsbtn = document.getElementById("aboutUs");
    var newsbtn = document.getElementById("news");
    var logoutbtn = document.getElementById("logout");



    //click function
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

    //hover function
    $('#schedule').mouseover(function() {
        $("#schedule_icon").fadeOut(100, function() { setTimeout($('#schedule_text').fadeIn(100)), 100 })
    })
    $("#schedule").mouseleave(function() {
        $("#schedule_text").fadeOut(100, function() { setTimeout($('#schedule_icon').fadeIn(100)), 100 })
    });

    $('#memberRest').mouseover(function() {
        $("#memberRest_icon").fadeOut(100, function() { setTimeout($('#memberRest_text').fadeIn(100)), 100 })
    })
    $("#memberRest").mouseleave(function() {
        $("#memberRest_text").fadeOut(100, function() { setTimeout($('#memberRest_icon').fadeIn(100)), 100 })
    });

    $('#member').mouseover(function() {
        $("#member_icon").fadeOut(100, function() { setTimeout($('#member_text').fadeIn(100)), 100 })
    })
    $("#member").mouseleave(function() {
        $("#member_text").fadeOut(100, function() { setTimeout($('#member_icon').fadeIn(100)), 100 })
    });

    $('#aboutUs').mouseover(function() {
        $("#aboutUs_icon").fadeOut(100, function() { setTimeout($('#aboutUs_text').fadeIn(100)), 100 })
    })
    $("#aboutUs").mouseleave(function() {
        $("#aboutUs_text").fadeOut(100, function() { setTimeout($('#aboutUs_icon').fadeIn(100)), 100 })
    });

    $('#news').mouseover(function() {
        $("#news_icon").fadeOut(100, function() { setTimeout($('#news_text').fadeIn(100)), 100 })
    })
    $("#news").mouseleave(function() {
        $("#news_text").fadeOut(100, function() { setTimeout($('#news_icon').fadeIn(100)), 100 })
    });

    $('#logout').mouseover(function() {
        $("#logout_icon").fadeOut(100, function() { setTimeout($('#logout_text').fadeIn(100)), 100 })
    })
    $("#logout").mouseleave(function() {
        $("#logout_text").fadeOut(100, function() { setTimeout($('#logout_icon').fadeIn(100)), 100 })
    });
    //catch hover BUG, Need to solve--------
}

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