let getIdUrl = "../../common/php/getUserId.php"; //获取cookie的id值
function getId() {
    return $.ajax({
        async: false,
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            if (resData['status'] === "800") {
                window.location.href = '../../login/h_login.html';
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = '../../login/h_login.html';
        }
    });
}

//l0,l1,l2,l3
function infoOption() {
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../myInformation/');
}

function testOption() {
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../tests/');
}

function favoritaOption() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../favorites/');
}

function myClassOption() {
    $("#l3").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../myClass/');
}