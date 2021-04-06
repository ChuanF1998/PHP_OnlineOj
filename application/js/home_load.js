/*
此js文件加载页面所需数据
*/
let QuestionData = new Array(5);
let IsLogin = true;
let UserId = -1;


$(document).ready(function () {
    QuestionData[0] = "123";
    console.log(QuestionData[0]);
    //选择按钮的样式初始化
    $("#a1").css("color", "#48D1CC");
    $("#l0").css("color", "#48D1CC");
    if (IsLogin === true) {
        $("#login_b").css("display", "none");
        $("#hot_login_button").css("display", "none");
        $("#user_img0").css("display", "block");
        $("#user_situation_area").css("display", "block");
    }
    else {
        $("#login_b").css("display", "block");
        $("#hot_login_button").css("display", "block");
        $("#user_img0").css("display", "none");
        $("#user_situation_area").css("display", "none");
    }
    //左侧题目分类布局初始化
    let PageWidth = document.documentElement.clientWidth;
    if (PageWidth < 1500) {
        $("#classes").css("position", "absolute");
    }
    else {
        $("#classes").css("position", "fixed");
    }
})