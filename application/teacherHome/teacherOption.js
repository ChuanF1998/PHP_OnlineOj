let getIdUrl = "../../common/php/getTeacherId.php"; //获取cookie的id值
let teacherId;
function getTeacherId() {
    return $.ajax({
        async: false,
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            let resCount = resData.length;
            if (resData[resCount - 1]['status'] === "800") {
                window.location.href = '../../teacherLogin/';
            }
            if (resData[resCount - 1]['status'] === "900") {
                teacherId = resData[resCount - 1]['teacherId'];
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = '../../teacherLogin/';
        }
    });
}

//l0,l1,l2,l3
function infoOption() {
    $("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../teacherInfo/');
}

function classManage() {
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../teacher_class/');
}

function questionUpload() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', '../myUpload/');
}