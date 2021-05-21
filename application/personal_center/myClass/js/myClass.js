let getMyclassUrl = "http://localhost/PHP_OnlineOj/application/personal_center/myClass/php/getMyClass.php";
let joinClassUrl = "http://localhost/PHP_OnlineOj/application/personal_center/myClass/php/joinClass.php";
let form = {};
let Data;
$(document).ready(function () {
    $("#a-join").attr("onclick", "");
    getId();
    getUserData();
    $("#user_img0").css("display", "block");
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#ffffff","color": "#333333"});
    $("#l3").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $.when(getUserData()).done(function () {
        $("#a-join").attr("onclick", "join()");
        form['userId'] = userInfo['id'];
        //console.log(userInfo);
        getMyClass(form);
    });
})

function join() {
    let inviteCode = prompt("请输入班级邀请码！");
    if (inviteCode !== null && inviteCode !== "") {
        let form = {'userId':userInfo['id'], 'inviteCode':inviteCode};
        $.ajax({
            type: "post",
            url: joinClassUrl,
            data: form,
            timeout: 5000,
            datatype: 'json',
            success: function (data) {
                console.log(data);
                let resData = eval('('+data+')');
                let queCount = resData.length - 1;
                if (resData[queCount].status === "900") {
                    alert("加入成功");
                    window.location.reload();
                }
                if (resData[queCount].status === "841") {
                    alert(resData[queCount].msg);
                }
                if (resData[queCount].status === "842") {
                    alert(resData[queCount].msg);
                }
            },
            error: function () {
                alert("获取失败！");
            }
        });
    }
}

function scapeToClass(obj) {
    if (window.localStorage) {
        let i = $(obj).index();
        //localStorage.setItem('useId', userInfo['id']);
        localStorage.setItem('classData', JSON.stringify(Data[i]));
        console.log(localStorage.getItem('classData'));
        window.open("../classDetail/");
    }
    else {
        alert("该浏览器不支持，请使用高版本浏览器");
    }
}

function getMyClass(key) {
    return $.ajax({
        type: "post",
        url: getMyclassUrl,
        data: key,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {
            let resData = eval('('+data+')');
            Data = resData;
            //console.log(resData);
            let queCount = resData.length - 1;
            if (resData[queCount].status === "900") {
                let s = "<tbody data-v-4bedaae3>";
                for (let i = 0; i < queCount; ++i) {
                    s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\"  onclick=\"scapeToClass(this)\">" +
                        "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].className+"</td>" +
                        "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].classDescribe+"</td>" +
                        "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].teacherName+"</td>" +
                        "</tr>";
                }
                s += "</tbody>";
                $("#table-my-class").append(s);
            }
            //console.log(resData[queCount].status);
        },
        error: function () {
            alert("获取失败！");
        }
    });
}