$(document).ready(function () {
    //$("#l0").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
})

function classManage() {
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $(location).attr('href', 'http://localhost:63342/application/teacher_home/teacher_class/');
}