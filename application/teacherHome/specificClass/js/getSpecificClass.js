let getTeacherIdUrl = "../../common/php/getTeacherId.php";
let getClassQuestionUrl = "php/getClassQuestion.php";
let classQuestionUploadUrl = "php/classQuestionUpload.php";
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
                console.log(classData);
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
                    + "</tr>";
                }
                $("#question-table").append(s);
            }
        },
        error: function () {
            alert("未知错误！");
        }
    });
}

function openBox() {
    let popBox = document.getElementById("pop-box");
    let popLayer = document.getElementById("back-box");
    $("input[name='questionName']").val("");
    popBox.style.display = "block";
    popLayer.style.display = "block";
}

function closeBox() {
    let popBox = document.getElementById("pop-box");
    let popLayer = document.getElementById("back-box");
    popBox.style.display = "none";
    popLayer.style.display = "none";
    $("input[type='radio'][name='level']:checked").prop('checked', false);
    $("input[type='radio'][name='species']:checked").prop('checked', false);
}

function questionUpload() {
    let questionName = $("input[name='questionName']").val();
    if (questionName === "") {
        alert("请输入题目名称");
    }
    let level = $("input[name='level']:checked").val();
    let species = $("input[name='species']:checked").val();
    let describe = $("input[name='describe']")[0].files[0];
    let head = $("input[name='head']")[0].files[0];
    let func = $("input[name='function']")[0].files[0];
    let main = $("input[name='main']")[0].files[0];
    let form = new FormData();
    if ( typeof(describe) === "undefined" ||  typeof(head) === "undefined" ||  typeof(func) === "undefined"
        ||  typeof(main)==="undefined" || typeof(species) === "undefined" ||typeof(level) === "undefined") {
        alert("请检查输入项是否正确");
    }
    else {
        $("#pop-box").css('display', 'none');
        $("#back-box").css('display', 'none');
        $("input[type='radio'][name='level']:checked").prop('checked', false);
        $("input[type='radio'][name='species']:checked").prop('checked', false);
        form.append('classId', classData['classId']);
        form.append('uploaderId', teacherId);
        form.append('difficulty', level);
        form.append('species', species);
        form.append('questionName', questionName);
        form.append('head', head);
        form.append('describe', describe);
        form.append('func', func);
        form.append('main', main);
        $.ajax({
            type: "post",
            url: classQuestionUploadUrl,
            data: form,
            timeout: 5000,
            datatype: 'json',
            cache:false,
            processData:false,
            contentType:false,
            success: function (data) {
                console.log(data);
                let resData = eval('('+data+')');
                console.log(resData);
                if (resData[resData.length - 1]['status'] === "900") {
                    alert("上传成功");
                    window.location.reload();
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}
