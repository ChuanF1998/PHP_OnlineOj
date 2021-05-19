let teacherLoginUrl = "teacherLogin.php";

function login() {
    let tel = $("input[name='tel']").val();
    let password = $("input[name='password']").val();
    if (tel === "" || password === "") {
        alert("密码或用户名不能为空");
        return 0;
    }
    let form = {};
    form['tel'] = tel;
    form['password'] = password;
    $.ajax({
        type: "post",
        url: teacherLoginUrl,
        data: form,
        timeout: 4000,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            let resData = eval('('+data+')');
            console.log(resData);
            if (resData[0]['status'] === "840") {
                alert(resData[0]['msg']);
            }
            if (resData[0]['status'] === "841") {
                alert(resData[0]['msg']);
            }
            if (resData[0]['status'] === "843") {
                alert(resData[0]['msg']);
            }
            if (resData[0]['status'] === "900") {
                alert(resData[0]['msg']);
                window.location.href = "../teacherHome/teacherInfo/";
            }
        },
        error: function () {
            alert("获取失败！");
        }
    });
}