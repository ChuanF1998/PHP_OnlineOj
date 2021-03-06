<?php
include("../common/php/com_func.php");
if (!isset($_POST['submit'])) {
    exit('非法访问');
}
//创建一个mysql类
$MyDatabase = new connect("online_oj");
//获取h_register页面中form表单的值
$Username = $_POST["username"];
$Password = $_POST["password"];
$ConfirmPwd = $_POST["confirm_pwd"];
$Tel = $_POST["tel"];

$Feedback = array
(
    "message1"=>array
    (
        "该账号已注册",
        "<a href=\"javascript:history.back(-1);\">点击返回</a>"
    ),
    "message2"=>array
    (
        "恭喜你， 注册成功! ",
        "<a href=\"../login/h_login.html\">点击登录</a>"
    ),
    "message3"=>array
    (
        "注册失败",
        "<a href=\"javascript:history.back(-1);\">点击重试</a>"
    ),
    "message4"=>array
    (
        "错误，两次密码输入不一致",
        "<a href=\"javascript:history.back(-1);\">返回</a>"
    )
);


if ($Password !== $ConfirmPwd) {
    $s = EchoHtml($Feedback,'message4');
    exit($s);
}

//向数据库中添加数据
//先查询数据库中电话是否已经注册过
$SqlSentence = "select id from student where tel='$Tel' limit 1";
$obj = $MyDatabase->SingleSelect($SqlSentence, 0);

if ($obj === null) {
    $s = EchoHtml($Feedback,'message3');
    exit($s);
}

if ($obj === "841") {
    //创建加密类，对密码进行加密
    $MyEncryption = new encryption($Password);
    $EncryPwd = $MyEncryption->GetCipher();
    $SqlSentence = "insert into student(tel, username, password) values('$Tel', '$Username', '$EncryPwd')";
    if ($MyDatabase->Insert($SqlSentence)) {
        //写入日志
        $time = (new date())->GetSerDate();
        $data = "Tel[$Tel]  Date[$time] register";
        (new log("../src/log/register.txt"))->Register($data);
        //创建文件夹
        CreateFolder("../src/users/".$Tel); 
        //返回信息
        $s = EchoHtml($Feedback,'message2');
        exit($s);
    }
    else {
        $s = EchoHtml($Feedback,'message3');
        exit($s);
    }
}
else {
    $s = EchoHtml($Feedback,'message1');
    exit($s);
}



