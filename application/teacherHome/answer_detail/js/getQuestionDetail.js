let getTeacherIdUrl = "../../common/php/getTeacherId.php";
let getStudentAnswerUrl = "getStudentAnswer.php";
let question;

$(document).ready(function () {
    $.ajax({
        type: "post",
        url: getTeacherIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            if (resData[0]['status'] === "900") {
                teacherId = resData[0]['teacherId'];
                question = eval('(' + localStorage.getItem('question') + ')');
                $('title').html(question['questionName']);
                let className = localStorage.getItem('className');
                $('#className').text(className+"--(题目："+question['questionName']+")");
                let form = {};
            }
            else {
                window.location.href = '../../teacherLogin/';
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = '../../teacherLogin/';
        }
    });
})

function getStudentAnswer(form) {
    return $.ajax({
        type: "post",
        url: getStudentAnswerUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            let resData = eval('('+data+')');
            if (resData[0]['status'] === "900") {

            }
        },
        error: function () {
            alert("error");
        }
    });
}