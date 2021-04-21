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
    $("#question_table tr:not(:first)").remove();
    QuestionType = 'A';
    document.getElementById("a1").style.color = "#48D1CC";
    document.getElementById("a2").style.color = "#808080";
    console.log("选择题");
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "#a1", "choice_que()");
}
/*
编程题按钮
*/
function programing_que() {
    $("#question_table tr:not(:first)").remove();
    QuestionType = 'B';
    document.getElementById("a1").style.color = "#808080";
    document.getElementById("a2").style.color = "#48D1CC";
    console.log("编程题");
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    console.log(Key);
    DataApply(DataUrl, UserUrl, Key, "a2", "programing_que()");
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
    $("#question_table tr:not(:first)").remove();
    QuestionClass = 'Z';
    con(0);
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "l0","c_all()");
}
//算法题
function c_algorithm() {
    $("#question_table tr:not(:first)").remove();
    QuestionClass = 'A';
    con(1);
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "l1", "c_algorithm()");
}
//数据结构题
function c_data_structure() {
    $("#question_table tr:not(:first)").remove();
    QuestionClass = 'B';
    con(2);
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "l2", "c_data_structure()");
}
//网络题
function c_network() {
    $("#question_table tr:not(:first)").remove();
    QuestionClass = 'C';
    con(3);
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "l3", "c_network()");
}
//其他分类题目
function c_other() {
    $("#question_table tr:not(:first)").remove();
    QuestionClass = 'D';
    con(4);
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, Key, "l4", "c_other()");
}

/*
点击单个题目
 */
function que_detail() {

}
