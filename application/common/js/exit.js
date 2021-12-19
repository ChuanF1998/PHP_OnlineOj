let exitUrl = "../../common/php/exit.php";

function exit() {
    return $.ajax({
            type: "post",
            url: exitUrl,
            data: "",
            timeout: 3000,
            datatype: 'json',
            success: function (data) {
                let resData = eval('('+data+')');
                if (resData[0]['status'] === "900") {
                    window.location = '../../login/h_login.html';
                }
            },
            error: function () {
                alert("获取失败");
            }
        }
    );
}

(function(){
    let btn = document.getElementById('user_img0');
    let box = document.getElementById('login-box');
    let timer = null;
    box.onmouseover = btn.onmouseover = function(){
        if(timer) clearTimeout(timer)
        box.style.display = 'block';
    }
    box.onmouseout = btn.onmouseout = function(){
        timer = setTimeout(function(){
            box.style.display = 'none';
        },400);

    }
})();