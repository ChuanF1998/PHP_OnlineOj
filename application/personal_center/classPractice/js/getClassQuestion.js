let getIdUrl = "../../common/php/getUserId.php";
let question = eval('('+localStorage.getItem('classQuestion')+')');
let classData = eval('('+localStorage.getItem('classData')+')');
let useId;

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
                useId = resData['userId'];
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
    a();
    let form = {};
    $("title").text(classData['className']+"-"+question['questionName']);
    $("input[name='language'][value='C++']").prop("checked", true);
    let type = $("input[name='language']:checked").val();
    form['questionId'] = question['classQuestionId'];
    form['filedir'] = question['filedir'];
    form['teacherId'] = question['teacherId'];
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

function getQuestion(form) {

}