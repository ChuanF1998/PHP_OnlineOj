let getMyCollectionUrl = "php/getMyCollection.php";
let form = {};
$(document).ready(function () {
    getId();
    $("#user_img0").css("display", "block");
    $("#l0").css({"background-color": "#ffffff","color": "#333333"});
    $("#l1").css({"background-color": "#ffffff","color": "#333333"});
    $("#l2").css({"background-color": "#f6f6f6","color": "#25bb9b"});
    $("#l3").css({"background-color": "#ffffff","color": "#333333"});
    $.when(getUserData()).done(function () {
        form['userId'] = userInfo['id'];
        getMyCollection(form);
    });
})

function getMyCollection(key) {
    return $.ajax({
        type: "post",
        url: getMyCollectionUrl,
        data: key,
        timeout: 5000,
        datatype: 'json',
        success: function (data) {//如果调用php成功,data为执行php文件后的返回值t);
            let resData = eval('('+data+')');
            let queCount = resData.length - 1;
            if (resData[queCount].status === "900") {
                let s = "<tbody data-v-4bedaae3>";
                for (let i = 0; i < queCount; ++i) {
                    s += "<tr data-v-4bedaae3 class=\"js-nc-wrap-link\">" +
                        "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].questionId+"</td>" +
                        "<td data-v-4bedaae3 class=\"t-subject-title\">"+resData[i].questionName+"</td>";
                }
                s += "</tbody>";
                $("#table-collection").append(s);
            }
            console.log(resData[queCount].status);
        },
        error: function () {
            alert("获取失败！");
        }
    });
}