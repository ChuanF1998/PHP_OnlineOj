let getIdUrl = "../../common/php/getUserId.php";
let getClassQuestionUrl = "php/getClassQuestion.php";
let submitUrl = "php/onlineJudge.php";
let question = eval('('+localStorage.getItem('classQuestion')+')');
let classData = eval('('+localStorage.getItem('classData')+')');
let userId;

$(document).ready(function () {
    $.ajax({
        type: "post",
        url: getIdUrl,
        data: "",
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            if (resData['status'] === "900") {
                userId = resData['userId'];
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
    console.log(question);
    console.log(classData);
    a();
    let form = {};
    $("title").text(classData['className']+"-"+question['questionName']);
    $("input[name='language'][value='C++']").prop("checked", true);
    let type = $("input[name='language']:checked").val();
    form['classId'] = classData['classId'];
    form['filedir'] = question['filedir'];
    form['teacherId'] = question['teacherId'];
    form['language'] = type;
    console.log(form);
    getQuestion(form);
})

$(window).resize(function() {
    a();
});

function a() {
    let screenWidth = $(window).width();
    let screenHeight = $(window).height();
    $(".first-box").css('width', screenWidth);
    $(".middle-box").css('height', screenHeight);
    let w = screenWidth * 0.45;
    let h = screenHeight * 0.65;
    $("#textarea-box").css({'width':w, "height":h});
}

function getQuestion(form) {
    return $.ajax({
        type: "post",
        url: getClassQuestionUrl,
        data: form,
        timeout: 3000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            //console.log(resData);
            if (resData['status'] === "900") {
                $("#title-content").text(resData['head']);
                $("#textarea-box").text(resData['function']);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function submit() {
    let language = $("input[name='language']:checked").val();
    let s = $("#textarea-box").val();
    let form = {};
    form['functionCode'] = s;
    form['userId'] = userId;
    form['classId'] = classData['classId'];
    form['filedir'] = question['filedir'];
    form['questionId'] = question['classQuestionId'];
    //form['teacherId'] = question['teacherId'];
    //form['tel'] = tel;
    form['questionName'] = question['questionName'];
    form['types'] = question['types'];
    form['language'] = language;
    console.log(form);
    submitCode(form);
}

function submitCode(form) {
    return $.ajax({
        type: "post",
        url: submitUrl,
        data: form,
        beforeSend: function(){
            $("#submit-button").attr('onclick', '').text("正在判题");
        },
        timeout: 8000,
        datatype: 'json',
        success: function (data) {
            $("#submit-button").attr('onclick', 'submit()').text("点击提交");
            let resData = eval('('+data+')');
            let curIndex = resData.length - 1;
            console.log(resData);
            if (resData[curIndex]['status'] === "1001") {
                $("#prompt").css('color', '#ea0e07').text(resData[curIndex]['msg']+"\r\n"+resData[curIndex]['info']);
            }
            if (resData[curIndex]['status'] === "1002") {
                $("#prompt").css('color', '#ea0e07').text(resData[curIndex]['msg']);
            }
            if (resData[curIndex]['status'] === "1003") {
                $("#prompt").css('color', '#ea0e07').text(resData[curIndex]['msg']);
            }
            if (resData[curIndex]['status'] === "1004") {
                $("#prompt").css('color', '#ea0e07').text(resData[curIndex]['msg']+"\r\n"+resData[curIndex]['info']);
            }
            if (resData[curIndex]['status'] === "1005") {
                $("#prompt").css('color', '#25bb9b').text(resData[curIndex]['msg']);
            }
            if (resData[curIndex]['status'] === "1006") {
                $("#prompt").css('color', '#ea0e07').text(resData[curIndex]['msg']);
            }
        },
        error: function () {
            alert("error");
            $("#submit-button").attr('onclick', 'submit()').text("点击提交");
        }
    });
}
