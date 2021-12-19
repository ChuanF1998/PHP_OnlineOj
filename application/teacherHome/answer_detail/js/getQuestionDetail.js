let getTeacherIdUrl = "../../common/php/getTeacherId.php";
let getStudentPassUrl = "php/getStudentPass.php";
let getStudentNotPassUrl = "php/getStudentNotPass.php";
let getAllStudentUrl = "php/getAllStudent.php";
let getStudentCodeUrl = "php/getStudentCode.php";
let question;
let allStudent;
let pass;
let notPass;
let allStudentHash = {};

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
                //console.log(question);
                $('title').html(question['questionName']);
                let className = localStorage.getItem('className');
                let classId = localStorage.getItem('classId');
                $('#className').text(className+"--( 题目："+question['questionName']+" )");
                let form = {'classQuestionId':question['classQuestionId'], 'teacherId':teacherId,'classId':classId};
                //console.log(form);
                $.when(getStudentPass(form), getStudentNotPass(form), getAllStudent(form)).then(function () {
                    pass.pop();
                    notPass.pop();
                    allStudent.pop();
                    allStudent = allStudent.sort(function (a, b) {
                        return b.username.localeCompare(a.username, 'zh');
                    });
                    for (let i = 0; i < allStudent.length; ++i) {
                        allStudent[i].isPass = "null";
                        allStudent[i].submitId = -1;
                        allStudentHash[allStudent[i].id] = allStudent[i];
                    }
                    for (let i = 0; i < notPass.length; ++i) {
                        allStudentHash[notPass[i].studentId].isPass = notPass[i].isPass;
                        allStudentHash[notPass[i].studentId].submitId = notPass[i].submitId;
                    }
                    for (let i = 0; i < pass.length; ++i) {
                        allStudentHash[pass[i].studentId].isPass = pass[i].isPass;
                        allStudentHash[pass[i].studentId].submitId = pass[i].submitId;
                    }
                    funAll();
                    console.log(allStudent);
                })

            }
            else {
                window.location.href = '../../teacherLogin/';
            }
        },
        error: function () {
            alert("error");
        }
    });
})

function funAll() {
    $("ul li:eq(3)").css("left", "0");
    $("#table-student").empty("");
    //$("#question_table tr:not(:first)").remove();
    let s = "";
    for (let i = allStudent.length - 1; i >= 0; --i) {
        if (allStudent[i].isPass === "1") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td class=\"td1\"><span><div class=\"td-div td-div-green\"></div></span></td>"
                +"</tr>";
        }
        if (allStudent[i].isPass === "0") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td><div class=\"td-div td-div-red\"></div></td>"
                +"</tr>";
        }
        if (allStudent[i].isPass === "null") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td class=\"td1\"><div class=\"td-div td-div-default\"></div></td>"
                +"</tr>";
        }
    }
    $("#table-student").append(s);
}

function funPass() {
    $("ul li:eq(3)").css("left", "110px");
    $("#table-student").empty("");
    let s = "";
    for (let i = allStudent.length - 1; i >= 0; --i) {
        if (allStudent[i].isPass === "1") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td><div class=\"td-div td-div-green\"></div></td>"
                +"</tr>";
        }
    }
    $("#table-student").append(s);
}

function funNotPass() {
    $("ul li:eq(3)").css("left", "220px");
    $("#table-student").empty("");
    let s = "";
    for (let i = allStudent.length - 1; i >= 0; --i) {
        if (allStudent[i].isPass === "0") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td><div class=\"td-div td-div-red\"></div></td>"
                +"</tr>";
        }
        if (allStudent[i].isPass === "null") {
            s += "<tr onclick='code(this)'>"
                +"<td class=\"td1\"><span>" +allStudent[i].username +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].major +"</span></td>"
                +"<td class=\"td1\"><span>" +allStudent[i].class +"</span></td>"
                +"<td><div class=\"td-div td-div-default\"></div></td>"
                +"</tr>";
        }
    }
    $("#table-student").append(s);
}




function getStudentPass(form) {
    return $.ajax({
        type: "post",
        url: getStudentPassUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            pass = eval('('+data+')');
            //console.log(pass);
            let passCount = pass.length;
            if (pass[passCount - 1]['status'] === "900") {
                //console.log(pass);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function getStudentNotPass(form) {
    return $.ajax({
        type: "post",
        url: getStudentNotPassUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            notPass = eval('('+data+')');
            //console.log(notPass);
            let notPassCount = notPass.length;
            if (notPass[notPassCount - 1]['status'] === "900") {
                //console.log(notPass);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function getAllStudent(form) {
    return $.ajax({
        type: "post",
        url: getAllStudentUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            allStudent = eval('('+data+')');
            console.log(allStudent);
            let studentCount = allStudent.length;
            if (allStudent[studentCount - 1]['status'] === "900") {
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function code(obj) {
    let i = allStudent.length - $(obj).index() - 1;
    let popBox = document.getElementById("pop-box");
    let popLayer = document.getElementById("back-box");
    $("input[name='questionName']").val("");
    popBox.style.display = "block";
    popLayer.style.display = "block";
    let form = {};
    form['questionId'] = question['classQuestionId'];
    form['classId'] = localStorage.getItem('classId');
    form['userId'] = allStudent[i].id;
    form['filedir'] = allStudent[i].submitId;
    console.log(form);
    $.ajax({
        type: "post",
        url: getStudentCodeUrl,
        data: form,
        timeout: 3000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            console.log(resData);
            if (resData['status'] === "900") {
                $("#textarea-box").text(resData['code']);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function closeBox() {
    let popBox = document.getElementById("pop-box");
    let popLayer = document.getElementById("back-box");
    popBox.style.display = "none";
    popLayer.style.display = "none";
    $("textarea-box").text("");
}