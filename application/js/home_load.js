/*
此js文件加载页面所需数据
*/
let QuestionData;
let IsLogin = true;
let UserId = -1;

$(document).ready(function () {
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
    GetData();
})

function GetData() {
    $.ajax( {
            type:"post",
            url :"http://localhost:63342/application/home/home.php",
            data:"",
            datatype:'json',
            success:function(data){//如果调用php成功,data为执行php文件后的返回值
                let j_data = eval('(' + data + ')');
                let s = "";
                for (let i = 0; i < j_data.length; ++i) {
                    s += "<tr class=\"title\"  onclick=\"que_detail()\"> " +
                        "<td class=\"td0\" ><div class=\"td_div0\"></div></td> " +
                        "<td class=\"td1\" >"+j_data[i].id+"</td> " +
                        "<td class=\"td1\" >"+j_data[i].name+"</td> " +
                        "<td class=\"td1\" >"+j_data[i].difficulty+"</td> " +
                        "<td class=\"td1\" >"+"j_data[i].pass_times \/ j_data[i].submit_times"+"%"+"</td> " +
                        "</tr>";

                }
                $("#question_table").append(s);
                QuestionData = j_data;
            },
            error: function () {
                console.log("获取失败");
            }
        }
    );
}