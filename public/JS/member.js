getMember();

let ManagerData = document.getElementById('111')
console.log(ManagerData)

function addMember() {
    var IDnum = $('#IDnum').val();
    var Name = $('#Name').val();
    var Rest = $('#Rest').val();
    console.log(IDnum, Name, Rest);
    if (IDnum == "" || Name == "" || Rest == "") {
        alert("請填寫完整");
    } else {
        var api = "http://127.0.0.1:3000/memberAPI/addMember";
        var data = {
            "IDnum": IDnum,
            "Name": Name,
            "Rest": Rest,
        };
        $.post(api, data, function(res) {
            alert("員工 : " + data.Name + " 已填寫完成")
            newMember(res.data);
            $('#IDnum').val('');
            $('#Name').val('');
            $('#Rest').val('');
        });
    }
}
//取得資料庫物件
function getMember() {
    var api = "http://127.0.0.1:3000/memberAPI/getMember";
    $.get(api, function(data, status) {
        for (var i = 0; i < data.length; i++) {
            newMember(data[i]);
        }
    })
}
//每個物件生成
function newMember(data) {
    console.log(data);
    var status = (data.status) ? "checked" : "";
    var content =
        `<div class="input-group mb-3" id="${data.ID[i]}">
            <input type="text" class="form-control col-sm-3" id="IDNum${data.ID[i]}" Name="${data.IDNum}" readonly>
            <input type="text" class="form-control col-sm-9" id="Name${data.ID[i]}" Name="${data.Name}" readonly>
            <input type="text" class="form-control col-sm-9" id="Rest${data.ID[i]}" Name="${data.Rest}" readonly>
            <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button" id="btnEdit${data.ID[i]}" onclick="editList('${data.ID[i]}')">修改</button>
                <button class="btn btn-outline-secondary d-none" type="button" id="btnUpdate${data.ID[i]}" onclick="updateList('${data.ID[i]}')">更新</button>
                <button class="btn btn-outline-secondary" type="button" id="btnRemove${data.ID[i]}" onclick="removeList('${data.ID[i]}')">刪除</button>
                
            </div>
        </div>`
    $('.container').append(content);
}

//編輯待辦事項
function editMember(id) {
    $('#btnEdit' + id).addClass("d-none");
    $('#btnRemove' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#msg' + id).attr("readonly", false);
}

//更新待辦事項
function updateMember(id) {
    var title = $("#title" + id).val();
    var msg = $("#msg" + id).val();
    var API = "http://127.0.0.1:3000/memberAPI/updateMember";
    var data = {
        "IDnum": IDnum,
        "Name": Name,
        "Rest": Rest,
    };
    $.post(API, data, function(res) {
        console.log(res);
        if (res.status == 0) {
            alert("修改成功");
            $('#btnEdit' + id).removeClass("d-none");
            $('#btnRemove' + id).removeClass("d-none");
            $('#btnUpdate' + id).addClass("d-none");
            $('#title' + id).attr("readonly", true);
            $('#msg' + id).attr("readonly", true);
        };
    });
}

//刪除待辦事項
function removeMember(id) {
    var API = "http://127.0.0.1:3000/memberAPI/removeMember";
    var data = { "id": id };
    $.post(API, data, function(res) {
        if (res.status == 0) {
            $('#' + id).remove();
            alert('success');
        }
    })

}