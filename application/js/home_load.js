/*
此js文件加载页面所需数据
*/
//获取用户资料的url
let UserUrl = "http://localhost:63342/application/home/get_user.php";
//获取题目数据的url
let DataUrl = "http://localhost:63342/application/home/home.php";
//当前页面的选择情况
let Key = {};
/*
* A---选择
* B---编程
* */
let QuestionType = 'A';
/*
* Z---全部
* A---算法
* B---数据结构
* C---网络
* D---其他
* */
let QuestionClass = 'Z';
let QuestionData;
let User;
let QueCount = 0; //题目数量

//页面初始化
$(document).ready(function () {
    //选择按钮的样式初始化
    $("#a1").css("color", "#48D1CC");
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
    DataApply(DataUrl, UserUrl, Key, "#a1", "choice_que()");
})

function GetData_Ajax(data_url, key) {
    return $.ajax({
            type: "post",
            url: data_url,
            data: key,
            timeout: 2000,
            datatype: 'json',
            success: function (data) {//如果调用php成功,data为执行php文件后的返回值
                console.log(data);
                let j_data = eval('(' + data + ')');
                QuestionData = j_data;
                QueCount = j_data.length;
                let s = "";
                for (let i = 0; i < j_data.length; ++i) {
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
                        s = "<tr class=\"title\"  onclick=\"que_detail()\"> " +
                            "<td class=\"td0\" ><div class=\"td_div0\"></div></td> " +
                            "<td class=\"td1\" >" + j_data[i].id + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].name + "</td> " +
                            "<td class=\"td1\" >" + j_data[i].difficulty + "</td> " +
                            "<td class=\"td1\" >" + pass_rate + "%" + "</td> " +
                            "</tr>";
                        $("#question_table").append(s);
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
        timeout: 2000,
        datatype: 'json',
        success: function (data) {
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

function DataApply(data_url, user_url, key, but, event) {
    $(but).attr("onclick", "");
    $.when(GetData_Ajax(data_url, key), GetUser_Ajax(user_url)).done(function () {
        $(but).attr("onclick", event);
        if (User["result"] === "1") {
            if (User["img_path"] != null) {
                $("#user_img0").attr("src", User['img_path']);
                $("#user_img1").attr("src", User['img_path']);
            }
            $("#user1_name").text(User["username"]);
            $("#has_challenge").text("已挑战：     " + User["submit_times"] + "/" + QueCount + " 题");
            $("#has_pass").text("已通过：     " + User["submit_times"] + " 题");
            $("#has_submit").text("已提交：     " + User["submit_times"] + " 次");
        }
    });
}

