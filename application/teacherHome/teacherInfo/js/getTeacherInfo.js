let getTeacherInfoUrl = "php/getTeacherInfo.php";
let teacherInfo;

$(document).ready(function () {
    getTeacherId();
    getTeacherInfo();
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
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
    $("input[name='myNickname']").val(teacherInfo['userName']);
    $("input[name='myLevel']").val(teacherInfo['level']);
    $("input[name='mySchool']").val(teacherInfo['school']);
    $("input[name='myCollege']").val(teacherInfo['college']);
    $("input[name='myMajor']").val(teacherInfo['major']);
    $("input[name='myGender'][value="+teacherInfo['gender']+"]").prop("checked", true);
}

function cancel() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    $("input[type='radio'][name='myGender']:checked").prop('checked', false);
}

function getTeacherInfo() {
    return $.ajax({
        type: "post",
        url: getTeacherInfoUrl,
        data: "",
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            teacherInfo = eval('('+data+')');
            if (teacherInfo['status'] === "900"){
                $("#nickname").text(teacherInfo['userName']);
                if (teacherInfo['gender'] === '0') {
                    $("#gender").attr("class", "female");
                }
                if (teacherInfo['gender'] === '1') {
                    $("#gender").attr("class", "male");
                }
                $("#level").text(teacherInfo['level']);
                $("#school").text(teacherInfo['school']);
                $("#college").text(teacherInfo['college']);
                $("#major").text(teacherInfo['major']);
            }
        },
        error: function () {
            alert("获取失败！");
        }
    });
}