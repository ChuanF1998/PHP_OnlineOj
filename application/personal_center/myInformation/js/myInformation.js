//let userInfoUrl = "http://localhost/PHP_OnlineOj/application/common/php/getInformation.php";
let userInfoUrl = "../../common/php/getInformation.php";
let userDataUploadUrl = "php/dataUpload.php";

let UserInfo;

$(document).ready(function () {
    getId();
    getUserData();
    $("#user_img0").css("display", "block");
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#ffffff","color": "#333333"});
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    $("#info-loading").css("display", "none");
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
    imgFile.outerHTML = imgFile.outerHTML;
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
    $("input[type='radio'][name='myGender']:checked").prop('checked', false);
    let formData = new FormData();
    formData.append('myNickname', myNickname);
    formData.append('mySchool', mySchool);
    formData.append('myMajor', myMajor);
    formData.append('myClass', myClass);
    formData.append('myGender', myGender);
    formData.append('myImgFile', myImgFile);
    formData.append('myTel', UserInfo['tel']);
    $.ajax({
        async:false,
        type: "post",
        url: userDataUploadUrl,
        data: formData,
        timeout: 10000,
        datatype: 'text',
        beforeSend: function() {
            $("#info-show").css("display", "none");
            $("#info-loading").css("display", "flex");
        },
        cache:false,
        processData:false,
        contentType:false,
        success: function (data) {
            console.log(data);
            alert("修改成功");
            window.location.reload();
            $("#info-loading").css("display", "none");
            $("#info-show").css("display", "block");
        },
        error: function () {
            alert("修改失败！");
        }
    });
}

function getUserData() {
    return $.ajax({
        type: "post",
        url: userInfoUrl,
        data: "",
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            UserInfo = eval('('+data+')');
            if (UserInfo['status'] === "900"){
                //UserInfo = eval('('+data+')');
                if (UserInfo['img_path'] !== "null") {
                    $("#user_img0").attr("src", UserInfo['img_path']);
                    $(".portrait").css({"background": "url("+UserInfo['img_path']+")", "background-size":"26px 26px"});
                }
                $("#nickname").append(UserInfo['username']);
                if (UserInfo['gender'] === '0') {
                    $("#gender").attr("class", "female");
                }
                if (UserInfo['gender'] === '1') {
                    $("#gender").attr("class", "male");
                }
                $("#school").append(UserInfo['school']);
                $("#major").append(UserInfo['major']);
                $("#class").append(UserInfo['class']);
            }
        },
        error: function () {
            alert("获取失败！");
        }
    });
}
