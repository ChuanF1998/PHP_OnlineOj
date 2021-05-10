
$(document).ready(function () {
    getId();
    getUserData();
    $("#user_img0").css("display", "block");
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#f6f6f6","color": "#25bb9b"});
})

function join() {
    let classId = prompt("请输入班级邀请码！");
    if (classId !== null && classId !== "") {
        console.log(classId);
    }
}

function scapeToClass() {
    window.open("../classDetail/");
}