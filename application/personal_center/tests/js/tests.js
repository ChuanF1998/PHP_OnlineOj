let getTestsUrl = "php/getTests.php";
let data = {};

$(document).ready(function () {
    getId();
    //getUserData();
    $("#user_img0").css("display", "block");
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#ffffff","color": "#333333"});
    $("#button1").css("background", "#25bb9b").attr("onclick", "");
    $("#button2").css("background", "#bbb").attr("onclick", "");
    $("#tab-choice").css("display", "table");
    $("#tab-programing").css("display", "none");
    $.when(getUserData()).done(function () {
        $("#button1").attr("onclick", "choice()");
        $("#button2").attr("onclick", "programing()");
        //console.log(userInfo);
        data['userId'] = userInfo['id'];
        data['type'] = 'A';
        getTests(data, "#button1", "choice()");
    });
})

function getTests(key, btn, event) {
    $(btn).attr("onclick", "");
    return $.ajax({
        type: "post",
        url: getTestsUrl,
        data: key,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值
            $(btn).attr("onclick", event);
            let resData = eval('('+data+')');
            let queCount = resData.length - 1;
            if (resData[queCount].status === "900") {
                let s = "<tbody data-v-4bedaae3>";
                let date;
                if (btn === "#button1") {
                    for (let i = 0; i < queCount; ++i) {
                        date = resData[i].submit_time.split(" ", 1);
                        s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\">" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].question_id+"</td>" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].questionName+"</td>" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+date[0]+"</td>";
                        if (resData[i].is_pass === "1") {
                            s += "<td data-v-4bedaae3 class=\"t-subject-title color-green\">通过</td>";
                        }
                        else {
                            s += "<td data-v-4bedaae3 class=\"t-subject-title color-red\">未通过</td>";
                        }
                        s += "</tr>";
                    }
                    s += "</tbody>";
                    $("#tab-choice").append(s);
                }
                if (btn === "#button2") {
                    for (let i = 0; i < queCount; ++i) {
                        date = resData[i].submit_time.split(" ", 1);
                        s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\">" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].question_id+"</td>" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].questionName+"</td>" +
                            "<td data-v-4bedaae3 class=\"t-subject-title\">"+date[0]+"</td>";
                        if (resData[i].is_pass === "1") {
                            s += "<td data-v-4bedaae3 class=\"t-subject-title color-green\">通过</td>";
                        }
                        else {
                            s += "<td data-v-4bedaae3 class=\"t-subject-title color-red\">未通过</td>";
                        }
                        s += "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].prog_language+"</td>" + "</tr>";
                    }
                    s += "</tbody>";
                    $("#tab-programing").append(s);
                }
            }
            console.log(resData[queCount].status)
        },
        error: function () {
            $(btn).attr("onclick", event);
            alert("获取失败！");
        }
    });
}

function choice() {
    $("#tab-choice tr:not(:first)").remove();
    $("#button1").css("background", "#25bb9b");
    $("#button2").css("background", "#bbb");
    $("#tab-choice").css("display", "table");
    $("#tab-programing").css("display", "none");
    data['type'] = 'A';
    getTests(data, "#button1", "choice()");
}

function programing() {
    $("#tab-programing tr:not(:first)").remove();
    $("#button1").css("background", "#bbb");
    $("#button2").css("background", "#25bb9b");
    $("#tab-choice").css("display", "none");
    $("#tab-programing").css("display", "table");
    data['type'] = 'B';
    getTests(data, "#button2", "programing()");
}