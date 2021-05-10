let getIdUrl = "http://localhost/PHP_OnlineOj/application/common/php/getUserId.php"; //获取cookie的id值
function getId() {
    return $.ajax({
        //async: false,
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值
            let resData = eval('('+data+')');
            if (resData['status'] === "800") {
                window.location.href = 'http://localhost/PHP_OnlineOj/application/login/h_login.html';
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = 'http://localhost/PHP_OnlineOj/application/login/h_login.html';
        }
    });
}

//l0,l1,l2,l3
function infoOption() {
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    //$(location).attr('href', 'http://localhost:63342/application/personal_center/myInformation/');
    $(location).attr('href', 'http://localhost/PHP_OnlineOj/application/personal_center/myInformation/');
}

function testOption() {
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    //$(location).attr('href', 'http://localhost:63342/application/personal_center/tests/');
    $(location).attr('href', 'http://localhost/PHP_OnlineOj/application/personal_center/tests/');
}

function favoritaOption() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    //$(location).attr('href', 'http://localhost:63342/application/personal_center/favorites/');
    $(location).attr('href', 'http://localhost/PHP_OnlineOj/application/personal_center/favorites/');
}

function myClassOption() {
    $("#l3").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    //$(location).attr('href', 'http://localhost:63342/application/personal_center/myClass/');
    $(location).attr('href', 'http://localhost/PHP_OnlineOj/application/personal_center/myClass/');
}