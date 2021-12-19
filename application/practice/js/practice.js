let GetQuestionUrl = "php/getQuestion.php";
let submitUrl = "php/codeJudge.php";
let collectionUrl = "php/collection.php";
let userId = localStorage.getItem('userId');
let tel = localStorage.getItem('tel');
let question = eval('('+localStorage.getItem('question')+')');

$(document).ready(function () {
    if (userId === null) {
        window.location.href = "../login/h_login.html";
    }
    console.log(question);
    a();
    let form = {};
    $("title").text(question['name']);
    $("input[name='language'][value='C++']").prop("checked", true);
    let type = $("input[name='language']:checked").val();
    form['questionId'] = question['id'];
    form['filedir'] = question['filedir'];
    form['uploaderId'] = question['uploader'];
    form['language'] = type;
    //console.log(form);
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

function submit() {
    let language = $("input[name='language']:checked").val();
    let s = $("#textarea-box").val();
    let form = {};
    form['functionCode'] = s;
    form['userId'] = userId;
    form['filedir'] = question['filedir'];
    form['questionId'] = question['id'];
    form['uploaderId'] = question['uploader'];
    form['tel'] = tel;
    form['questionName'] = question['name'];
    form['types'] = question['types'];
    form['species'] = question['species'];
    form['language'] = language;
    form['submit_times'] = question['submit_times'];
    form['pass_times'] = question['pass_times'];
    console.log(form);
    submitCode(form);
}

function getQuestion(form) {
    return $.ajax({
        type: "post",
        url: GetQuestionUrl,
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

$("input[name=language]").click(function(){
    let language = $(this).val();
    console.log(language);
});

function collection() {
    let form = {};
    form['userId'] = userId;
    form['questionId'] = question['id'];
    form['questionName'] = question['name'];
    form['types'] = question['types'];
    return $.ajax({
        type: "post",
        url: collectionUrl,
        data: form,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            let resData = eval('('+data+')');
            console.log(resData);
            if (resData[0]['status'] === "900") {
                alert("收藏成功");
            }
            if (resData[0]['status'] === "881") {
                alert("您已收藏该题目");
            }
        },
        error: function () {
            alert("error");
        }
    });
}