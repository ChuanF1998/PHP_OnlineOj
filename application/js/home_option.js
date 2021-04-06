let li_all = new Array(5);  //取左边分类框5个选项初始值
for (let i = 0; i < 5; ++i) {
    let str = "l" + i;
    li_all[i] = document.getElementById(str);
}
/*
当窗口大小变化时左侧分类框的样式
*/
$(window).resize(function () {
    let PageWidth = document.documentElement.clientWidth;
    if (PageWidth < 1500) {
        $("#classes").css("position", "absolute");
    }
    else {
        $("#classes").css("position", "fixed");
    }
})
/*
选择题按钮
*/
function choice_que() {
    document.getElementById("a1").style.color = "#48D1CC";
    document.getElementById("a2").style.color = "#808080";
    console.log("选择题");
}
/*
编程题按钮
*/
function programing_que() {
    document.getElementById("a1").style.color = "#808080";
    document.getElementById("a2").style.color = "#48D1CC";
    console.log("编程题");
}
/*
左边分类框5个选项
 */
function con(k) {
    for (let i = 0; i < 5; ++i) {
        if (i === k) {
            li_all[i].style.color = "#48D1CC";
        }
        else {
            li_all[i].style.color = "#808080";
        }
    }
}
//全部题
function c_all() {
    con(0);
}
//算法题
function c_algorithm() {
    con(1);
}
//数据结构题
function c_data_structure() {
    con(2);
}
//网络题
function c_network() {
    con(3);
}
//其他分类题目
function c_other() {
    con(4);
}

/*
点击单个题目
 */
function que_detail() {

}
