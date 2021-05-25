let GetQuestionUrl = "php/getQuestion.php";
let submitUrl = "php/codeJudge.php";
let userId = localStorage.getItem('userId');
let tel = localStorage.getItem('tel');
let question = eval('('+localStorage.getItem('question')+')');

$(document).ready(function () {
    if (userId === null) {
        window.location.href = "../login/h_login.html";
    }
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
            $("#submit-button").attr('onclick', '').text("提交中");
        },
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            $("submit-button").attr('onclick', 'submit()').text("点击提交");
            let resData = eval('('+data+')');
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