getMember()

function addMember() {
    let IDnum = $('#IDnum').val();
    let Name = $('#Name').val();
    let Rest = $('#Rest').val();
    if (IDnum == "" || Name == "" || Rest == "") {
        alert("請填寫完整");
    } else {
        let api = "http://127.0.0.1:3000/memberAPI/addMember";
        let data = {
            'id': IDnum,
            'name': Name,
            'fixedday': Rest
        }
        $.get(api, data, function(data, status) {
            alert("已填寫完成")
            $('#IDnum').val('');
            $('#Name').val('');
            $('#Rest').val('');
        });
    }
}
//取得資料庫物件
function getMember() {
    let api = "http://127.0.0.1:3000/memberAPI/getMember"
    $.get(api, function(data, status) {
        newMember(data);
    })
}

//每個物件生成
function newMember(data) {
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].ID.length; y++) {
            let content =
                `<div class="input-group mb-3" id="${data[x].ID[y]}" style="color:blue">
            <input type="text" class="form-control col-md-3" id="IDNum${data[x].ID[y]}" value="${data[x].ID[y]}" readonly> 
            <input type="text" class="form-control col-sm-9" id="Name${data[x].ID[y]}" value="${data[x].Name[y]}" readonly>
            <input type="text" class="form-control col-sm-9" id="FixedDay${data[x].ID[y]}" value="${data[x].FixedDay[y]}" readonly>
            <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button" id="btnEdit${data[x].ID[y]}" onclick="editMember('${data[x].ID[y]}')">修改</button>
                <button class="btn btn-outline-secondary d-none" type="button" id="btnUpdate${data[x].ID[y]}" onclick="updateMember('${data[x].ID[y]}')">更新</button>
                <button class="btn btn-outline-secondary" type="button" id="btnRemove${data[x].ID[y]}" onclick="removeMember('${data[x].ID[y]}')">刪除</button>
            </div>
        </div>
            </div>
           `
            $('.container').append(content);
        }
    }
}

//編輯待辦事項
function editMember(id) {
    $('#btnEdit' + id).addClass("d-none");
    $('#btnRemove' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#Name' + id).attr("readonly", false);
    $('#FixedDay' + id).attr("readonly", false);
    let api = "http://127.0.0.1:3000/memberAPI/EditMember"
    let data = {
        "name": $('#Name' + id).val(),
        "fixedday": $('#FixedDay' + id).val()
    }
    $.get(api, data, function(data, status) {

    })
}

//更新待辦事項
function updateMember(id) {
    let Name = $("#Name" + id).val();
    let Rest = $("#FixedDay" + id).val();
    let API = "http://127.0.0.1:3000/memberAPI/updateMember";
    let data = {
        "editID": id,
        "name": Name,
        "fixedday": Rest
    };
    $.get(API, data, function(data, status) {
        alert("修改成功");
        $('#btnEdit' + id).removeClass("d-none");
        $('#btnRemove' + id).removeClass("d-none");
        $('#btnUpdate' + id).addClass("d-none");
        $("#Name" + id).attr("readonly", true);
        $("#FixedDay" + id).attr("readonly", true);
    });
}

//刪除待辦事項
function removeMember(id) {
    var API = "http://127.0.0.1:3000/memberAPI/removeMember";
    var data = {
        "id": id,
        "name": $('#Name' + id).val(),
        "fixedday": $('#FixedDay' + id).val()
    };
    $.get(API, data, function(res) {
        alert('刪除成功')
    })

}