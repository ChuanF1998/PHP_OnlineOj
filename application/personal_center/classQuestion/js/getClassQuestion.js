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