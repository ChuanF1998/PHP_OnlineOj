let userInfoUrl = "http://localhost/PHP_OnlineOj/application/common/php/getInformation.php";
let userInfo;

function getUserData() {
    return $.ajax({
        type: "post",
        url: userInfoUrl,
        data: "",
        timeout: 5000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值
            userInfo = eval('('+data+')');
            if (userInfo['img_path'] !== "null") {
                $("#user_img0").attr("src", userInfo['img_path']);
            }
        },
        error: function () {
            alert("获取失败！");
        }
    });
}