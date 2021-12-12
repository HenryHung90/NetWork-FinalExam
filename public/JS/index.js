$(document).ready(function(){
    $('#bg').fadeIn(1500)
    $('#login').fadeIn(2000)
    $("#submit").click(function () {
        var checkAccount = $("#memberAccount").val();
        var checkPassword = $("#memberPassword").val();
        console.log(checkAccount);
        console.log(checkPassword);
        document.location.href = "/main/news";
    });
})

