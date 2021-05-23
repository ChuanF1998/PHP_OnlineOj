let getTeacherIdUrl = "../../common/php/getTeacherId.php";
let getClassQuestionUrl = "php/getClassQuestion.php";
let classQuestion;
let classData;

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
                classData = eval('(' + localStorage.getItem('specificClassData') + ')');
                //console.log(classData);
                $('title').html(classData['className']);
                $('#className').text(classData['className']);
                let form = {'classId': classData['classId'], 'teacherId': resData[0]['teacherId']};
                getClassQuestion(form);
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

function scapeToQuestion(obj) {
    if (window.localStorage) {
        console.log(classQuestion);
        let i = $(obj).index();
        localStorage.setItem('question', JSON.stringify(classQuestion[classQuestion.length - i - 1]));
        localStorage.setItem('className', classData['className']);
        console.log(classData);
        localStorage.setItem('classId', classData['classId']);
        console.log(localStorage.getItem('question'));
        window.open("../answer_detail/");
    }
    else {
        alert("该浏览器不支持，请使用高版本浏览器");
    }
}

function getClassQuestion(form) {
    return $.ajax({
        type: "post",
        url: getClassQuestionUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            classQuestion  = eval('('+data+')');
            let resCount = classQuestion.length;
            if (classQuestion[resCount - 1]['status'] === "900") {
                classQuestion.pop();
                //console.log(classQuestion);
                let s = "";
                for (let i = resCount - 2; i >= 0; --i) {
                    s += "<tr onclick=\"scapeToQuestion(this)\">"
                    + "<td class=\"td1\"><span>"+classQuestion[i].questionName+"</span></td>"
                    + "</td>";
                }
                $("#question-table").append(s);
            }
        },
        error: function () {
            alert("未知错误！");
        }
    });
}

function questionUpload() {
    console.log(11);
}