let getIdUrl = "http://localhost/PHP_OnlineOj/application/common/php/getUserId.php"; //获取cookie的id值
let userInfoUrl = "http://localhost/PHP_OnlineOj/application/personal_center/myInformation/php/getInformation.php";

let UserInfo;


$(document).ready(function () {
/*    let thisURL = document.URL;
    let val = thisURL.split('?')[1];
    let id = val.split("=")[1];
    console.log(id);
    if (id === '-1') {
        window.location.href = 'http://localhost/PHP_OnlineOj/application/login/h_login.html';
    }*/
    $.ajax({
        //async: false,
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值
            //console.log(data);
            if (data === "null") {
                window.location.href = 'http://localhost/PHP_OnlineOj/application/login/h_login.html';
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = 'http://localhost/PHP_OnlineOj/application/login/h_login.html';
        }
    })
    getUserData();
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#ffffff","color": "#333333"});
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
})

function edit() {
    $("#spanA1").hide();
    $("#spanA2").show();
    $("#spanA3").show();
    $("#info-show").css("display", "none");
    $("#info-modify").css("display", "block");
    $("input[name='myNickname']").val(UserInfo['username']);
    $("input[name='mySchool']").val(UserInfo['school']);
    $("input[name='myMajor']").val(UserInfo['major']);
    $("input[name='myClass']").val(UserInfo['class']);
    $("input[name='myGender'][value="+UserInfo['gender']+"]").prop("checked", true);
}

function cancel() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    $("input[type='radio'][name='myGender']:checked").prop('checked', false);
    let imgFile = $("input[name='myImgFile']")[0];
    let tmp = imgFile.outerHTML;
    imgFile.outerHTML = tmp;
}

function save() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    let myNickname = $("input[name='myNickname']").val();
    let mySchool = $("input[name='mySchool']").val();
    let myMajor = $("input[name='myMajor']").val();
    let myClass = $("input[name='myClass']").val();
    let myGender = $("input[name='myGender']:checked").val();
    let myImgFile = $("input[name='myImgFile']")[0].files[0];
    //let myImgFile = $("#myNickname")[0].files[0];
    $("input[type='radio'][name='myGender']:checked").prop('checked', false);
    console.log(myImgFile.name,myImgFile.size,myImgFile.type);
}

function getUserData() {
    return $.ajax({
        type: "post",
        url: userInfoUrl,
        data: "",
        timeout: 5000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值
            if (data !== "null"){
                UserInfo = eval('('+data+')');
                $("#user_img0").css("display", "block").attr("src", UserInfo['img_path']);
                $(".portrait").css({"background": "url("+UserInfo['img_path']+")", "background-size":"26px 26px"});
                $("#nickname").text(UserInfo['username']);
                if (UserInfo['gender'] === '0') {
                    $("#gender").attr("class", "female");
                }
                else {
                    $("#gender").attr("class", "male");
                }
                $("#school").text(UserInfo['school']);
                $("#major").text(UserInfo['major']);
                $("#class").text(UserInfo['class']);
                console.log(UserInfo);
            }
        },
        error: function () {
            alert("获取失败！");
        }
    });
}
