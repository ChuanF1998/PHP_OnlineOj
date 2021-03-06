let getIdUrl = "../../common/php/getUserId.php";
let getClassQuestionUrl = "php/getClassDetail.php";
let completeQuestionUrl = "php/getCompleteQuestion.php";
let notPassQuestionUrl = "php/notPassQuestion.php";
let useId;      //用户id
let classData;  //班级相关数据
let classQuestion; //班级题目
let completeQueData; //已通过班级题目
let notPassQuestion; //未通过班级题目
let allQuestionData = {}; //汇总
let form = {};  //

$(document).ready(function () {
    $.ajax({
        async: false,
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            if (resData['status'] === "900") {
                useId = resData['userId'];
                classData = eval('('+localStorage.getItem('classData')+')');
                //console.log(classData);
                $('title').html(classData['className']);
                $("#className").text(classData['className']);
                $("#classTeacher").text(classData['teacherName']+" 老师");
                form['userId'] = useId;
                form['classId'] = classData['classId'];
                $.when(getClassQuestion(form),  completeQuestion(form),notPass(form)).done(function () {
                    classQuestion.pop();
                    notPassQuestion.pop();
                    completeQueData.pop();
                    for(let i = 0; i < classQuestion.length; ++i) {
                        classQuestion[i].isPass = "null";
                        allQuestionData[classQuestion[i].classQuestionId] = classQuestion[i];
                    }
                    for (let i = 0; i < notPassQuestion.length; ++i) {
                        allQuestionData[notPassQuestion[i].classQuestionId].isPass = notPassQuestion[i].isPass;
                    }
                    for (let i = 0; i < completeQueData.length; ++i) {
                        allQuestionData[completeQueData[i].classQuestionId].isPass = completeQueData[i].isPass;
                    }
                    funAll();
                    console.log(allQuestionData);
                })
            }
            else {
                window.location.href = '../../login/h_login.html';
            }
        },
        error: function () {
            alert("未知错误！");
            window.location.href = '../../login/h_login.html';
        }
    });

})
function funAll() {
    $("ul li:eq(3)").css("left", "0");
    $("#class-question").empty("");
    let s = "";
    for (let i = classQuestion.length - 1; i >= 0; --i) {
        if (classQuestion[i].isPass === "1") {
            s += "<tr onclick='scapeToClassQue(this)'>"
                +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
                +"<td class=\"td1\"><span>" +classQuestion[i].questionName +"</span></td>"
                +"<td><div class=\"td-div td-div-green\"></div></td>"
                +"</tr>";
        }
        if (classQuestion[i].isPass === "0") {
            s += "<tr onclick='scapeToClassQue(this)'>"
                +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
                +"<td class=\"td1\"><span>" +classQuestion[i].questionName +"</span></td>"
                +"<td><div class=\"td-div td-div-red\"></div></td>"
                +"</tr>";
        }
        if (classQuestion[i].isPass === "null") {
            s += "<tr onclick='scapeToClassQue(this)'>"
                +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
                +"<td class=\"td1\"><span>" +classQuestion[i].questionName +"</span></td>"
                +"<td><div class=\"td-div td-div-default\"></div></td>"
                +"</tr>";
        }
    }
    $("#class-question").append(s);
}

function funPass() {
    $("ul li:eq(3)").css("left", "110px");
    $("#class-question").empty("");
    let s = "";
    let queCount = completeQueData.length;
    for (let i = queCount - 1; i >= 0; --i) {
        s += "<tr onclick='scapeToClassQue(this)'>"
            +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
            +"<td class=\"td1\"><span>" +completeQueData[i].questionName +"</span></td>"
            +"<td><div class=\"td-div td-div-green\"></div></td>"
            +"</tr>";
    }
    $("#class-question").append(s);
}

function funNoPass() {
    $("ul li:eq(3)").css("left", "220px");
    $("#class-question").empty("");
    let s = "";
    for (let i = classQuestion.length - 1; i >= 0; --i) {
        if (classQuestion[i].isPass === "null") {
            s += "<tr onclick='scapeToClassQue(this)'>"
                +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
                +"<td class=\"td1\"><span>" +classQuestion[i].questionName +"</span></td>"
                +"<td><div class=\"td-div td-div-default\"></div></td>"
                +"</tr>";
        }
        if (classQuestion[i].isPass === "0") {
            s += "<tr onclick='scapeToClassQue(this)'>"
                +"<td class=\"td1\"><span>" +classQuestion[i].classQuestionId +"</span></td>"
                +"<td class=\"td1\"><span>" +classQuestion[i].questionName +"</span></td>"
                +"<td><div class=\"td-div td-div-red\"></div></td>"
                +"</tr>";
        }
    }
    $("#class-question").append(s);
}

//获取所有
function getClassQuestion(form) {
    return  $.ajax({
        type: "post",
        url: getClassQuestionUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            //console.log(data);
            classQuestion = eval('('+data+')');
            let queCount = classQuestion.length - 1;
            console.log(classQuestion);
            if (classQuestion[queCount].status === "900") {

            }
            //console.log(classQuestion[queCount].status);
        },
        error: function () {
            alert("未知错误！");
        }
    });
}


//获取通过
function completeQuestion(form) {
    return $.ajax({
        type: "post",
        url: completeQuestionUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            //console.log(data);
            completeQueData = eval('('+data+')');

            //console.log(completeQueData);
        },
        error: function () {
            alert("未知错误！");
        }
    });
}

//获取未通过
function notPass(form) {
    return $.ajax({
        type: "post",
        url: notPassQuestionUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            //console.log(data);
            notPassQuestion = eval('('+data+')');

            //console.log(notPassQuestion);
        },
        error: function () {
            alert("未知错误！");
        }
    });
}

function scapeToClassQue(obj) {
    if (window.localStorage) {
        let classQuestionId = $("#class-question tr").eq($(obj).index()).find("td:first").find("span").html();
        localStorage.setItem('classQuestion', JSON.stringify(allQuestionData[classQuestionId]));
        console.log(localStorage.getItem('classQuestion'));
        window.open('../classPractice/');
    }
    else {
        alert("该浏览器不支持，请使用高版本浏览器");
    }
}

