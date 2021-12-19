/*
此js文件加载页面所需数据
*/
//获取用户资料的url
let UserUrl = "php/get_user.php";

//获取题目数据的url
let DataUrl = "php/home.php";

//获取做题详情
let DetailUrl = "php/GetAnswerDetail.php";

//当前页面的选择情况
let Key = {};
/*
* A---选择
* B---编程
* */
let QuestionType = 'B';
/*
* Z---全部
* A---算法
* B---数据结构
* C---网络
* D---其他
* */
let QuestionClass = 'Z';

let QuestionData;  //题目
let User;        //用户信息
let UserId = null;       //用户id
let AnswerDetails;   //用户解题详情
let QueCount = 0; //题目数量

//页面初始化
$(document).ready(function () {
    //选择按钮的样式初始化
    //$("#a1").css("color", "#48D1CC");
    $("#l0").css("color", "#48D1CC");
    //左侧题目分类布局初始化
    let PageWidth = document.documentElement.clientWidth;
    if (PageWidth < 1500) {
        $("#classes").css("position", "absolute");
    }
    else {
        $("#classes").css("position", "fixed");
    }
    Key['QuestionType'] = QuestionType;
    Key['QuestionClass'] = QuestionClass;
    DataApply(DataUrl, UserUrl, DetailUrl, Key, "#a1", "choice_que()");
})

function GetData_Ajax(data_url, key) {
    return $.ajax({
            type: "post",
            url: data_url,
            data: key,
            timeout: 5000,
            datatype: 'json',
            success: function (data) {
                //console.log(data);
                if (data !== "null" && data !== "841") {
                    let j_data = eval('(' + data + ')');
                    QuestionData = j_data;
                    QueCount = j_data.length;
                    let s = "";
                    for (let i = j_data.length - 1; i >= 0; --i) {
                        let pass_rate = 0;
                        if (j_data[i].submit_times === "0") {
                            pass_rate = "0.0";
                        } else {
                            if (j_data[i].pass_times === "0") {
                                pass_rate = "0.0";
                            } else {
                                let tmp = j_data[i].pass_times * 100 / j_data[i].submit_times;
                                pass_rate = tmp.toFixed(1);
                            }
                        }
                        s = "<tr class=\"title\"  onclick=\"que_detail(this)\"> " +
                            "<td class=\"td0\" ><div class=\"td_div0\"></div></td> " +
                            "<td class=\"td1\" >" + j_data[i].id + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].name + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].difficulty + "</td> " +
                            "<td class=\"td1\" >" + pass_rate + "%" + "</td> " +
                            "</tr>";
                        $("#question_table").append(s);
                    }
                }
            },
            error: function () {
                alert("获取失败");
            }
        }
    );
}

function GetUser_Ajax(user_url) {
    return $.ajax({
        type: "post",
        url: user_url,
        data: "",
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            //console.log(data);
            User = eval('(' + data + ')');
            if (User["result"] === "0") {
                //未登录时，页面显示情况
                $("#login_b").css("display", "block");
                $("#hot_login_button").css("display", "block");
                $("#user_img0").css("display", "none");
                $("#user_situation_area").css("display", "none");
            } else {
                //登陆时，页面显示情况
                $("#login_b").css("display", "none");
                $("#hot_login_button").css("display", "none");
                $("#user_img0").css("display", "block");
                $("#user_situation_area").css("display", "block");
            }
        },
        error: function () {
            $("#login_b").css("display", "block");
            $("#hot_login_button").css("display", "block");
            $("#user_img0").css("display", "none");
            $("#user_situation_area").css("display", "none");
        }
    });
}

function GetAnswerDetail(DetailUrl, key) {
    return $.ajax({
        type: "post",
        url: DetailUrl,
        data: key,
        timeout: 5000,
        datatype: "json",
        success: function (data) {
            //console.log(data);
            if (data !== "null") {
                let res = data.split(".");
                //用户做题详情
                AnswerDetails = eval('(' + res[1] + ')');
                console.log(AnswerDetails);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function DataApply(data_url, user_url, DetailUrl,key, button, event) {
    $(button).attr("onclick", "");
    $.when(GetData_Ajax(data_url, key), GetUser_Ajax(user_url), GetAnswerDetail(DetailUrl, key)).done(function () {
        $(button).attr("onclick", event);
        if (User["result"] === "1") {
            if (User["img_path"] != null) {
                $("#user_img0").attr("src", User['img_path']);
                $("#user_img1").attr("src", User['img_path']);
            }
            UserId = User['id'];
            $("#user1_name").text(User["username"]);
            $("#has_challenge").text("已挑战：     " + AnswerDetails["submit_questions"] + "/" + QueCount + " 题");
            $("#has_pass").text("已通过：     " + AnswerDetails["pass_questions"] + "/" + QueCount + " 题");
            $("#has_submit").text("已提交：     " + AnswerDetails["submit_times"] + " 次");
        }
    });
}

