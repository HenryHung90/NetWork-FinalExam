window.onload = function(){
    show()
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
