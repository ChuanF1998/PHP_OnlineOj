let getTeacherInfoUrl = "php/getTeacherInfo.php";
let updataTeacherInfo = "php/infoUpdata.php";
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

function save() {
    $("#spanA1").show();
    $("#spanA2").hide();
    $("#spanA3").hide();
    $("#info-show").css("display", "block");
    $("#info-modify").css("display", "none");
    let formData = {};
    formData['myNickname'] = $("input[name='myNickname']").val();
    formData['myLevel'] = $("input[name='myLevel']").val();
    formData['mySchool'] = $("input[name='mySchool']").val();
    formData['myCollege'] = $("input[name='myCollege']").val();
    formData['myMajor'] = $("input[name='myMajor']").val();
    formData['myGender'] = $("input[name='myGender']:checked").val();
    $("input[type='radio'][name='myGender']:checked").prop('checked', false);
    teacherInfoUpdata(formData);
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

//修改用户资料
function teacherInfoUpdata(formData) {
    return $.ajax({
        //async:false,
        type: "post",
        url: updataTeacherInfo,
        data: formData,
        timeout: 5000,
        datatype: 'json',
        beforeSend: function() {
            $("#info-show").css("display", "none");
            $("#info-loading").css("display", "flex");
        },
        success: function (data) {
            console.log(data);
            let resData = eval('('+data+')');
            if (resData['status'] === "900") {
                //alert("修改成功");
            }
            else {
                alert("修改失败");
            }
            window.location.reload();
            $("#info-loading").css("display", "none");
            $("#info-show").css("display", "block");
        },
        error: function () {
            alert("error");
        }
    });
}