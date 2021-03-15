<?php
include("../common/com_func.php");

//创建一个mysql类
$MyDatabase = new connect("online_oj");
$Db_con = $MyDatabase->GetSqlConnect();
//获取h_register页面中form表单的值
$Username = $_POST["username"];
$Password = $_POST["password"];
$ConfirmPwd = $_POST["confirm_pwd"];
//$Tel = $_POST["tel"];
$Tel = '4';

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
        "<a href=\"../login/h_login.php\">点击登录</a>"
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
$SqlSentence = "select id from student where tel='$Tel'";
$obj = mysqli_fetch_array(mysqli_query($Db_con, $SqlSentence), MYSQLI_ASSOC);
if ($obj != null) {
    $s = EchoHtml($Feedback,'message1');
    exit($s);
}
//创建加密类
$MyEncryption = new encryption($Password);
$EncryPwd = $MyEncryption->GetCipher();
$SqlSentence = "insert into student(tel, username, password) values('$Tel', '$Username', '$EncryPwd')";
if (mysqli_query($Db_con, $SqlSentence)) {
    $s = EchoHtml($Feedback,'message2');
    exit($s);
}
else {
    $s = EchoHtml($Feedback,'message3');
    exit($s);
}



