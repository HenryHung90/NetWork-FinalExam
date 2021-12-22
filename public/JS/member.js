/*$(document).ready(function() {
    $("#t1").fadeIn(3000)
});*/
function autoCreate() {
    console.log("123");
    var table = document.createElement("table");
    table.setAttribute("border", "1");
    var line = 4;
    var list = 3;
    for (var i = 1; i <= line; i++) {
        //alert(line);
        //建立tr
        console.log("12");
        var tr = document.createElement("tr");
        for (var j = 1; j <= list; j++) {
            console.log("456");
            //alert(list);
            //建立td
            var td = document.createElement("td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("d1").appendChild(table);
}
let str = "1,2"
let temp = str.toString().split(",")
console.log(temp)