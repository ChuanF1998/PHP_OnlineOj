<?php
include("../common/com_func.php");

//创建一个mysql类
$MyDatabase = new connect("online_oj");
$Db_con = $MyDatabase->GetSqlConnect();
//获取h_modify页面中form表单的值
$Tel = $_POST["tel"];
$Username = $_POST["username"];
$Password = $_POST["password"];
$ConfirmPwd = $_POST["confirm_pwd"];


$Feedback = array
(
    "message1"=>array
    (
        "该账号未注册",
        "<a href=\"javascript:history.back(-1);\">点击返回</a>"
    ),
    "message2"=>array
    (
        "恭喜你， 修改成功! ",
        "<a href=\"../login/h_login.html\">点击登录</a>"
    ),
    "message3"=>array
    (
        "修改失败",
        "<a href=\"javascript:history.back(-1);\">点击重试</a>"
    )
);


if ($Password !== $ConfirmPwd) {
    $s = EchoHtml($Feedback,'message4');
    exit($s);
}

//向数据库中添加数据
//先查询数据库中电话是否已经注册过
$SqlSentence = "select id from student where tel='$Tel'";
$obj = $MyDatabase->SingleSelect($SqlSentence, 0);
if ($obj == null) {
    $s = EchoHtml($Feedback,'message1');
    exit($s);
}

//创建加密类
$MyEncryption = new encryption($Password);
$EncryPwd = $MyEncryption->GetCipher();
$stu_id = $obj['id'];
$SqlSentence = "update student set password='$EncryPwd' where student.id='$stu_id'";
if ($MyDatabase->Updata($SqlSentence)) {
    $time = (new date())->GetSerDate();
    $data = "Tel[$Tel]  Date[$time] modify password";
    (new log())->ModifyPwd($data);
    $s = EchoHtml($Feedback,'message2');
    exit($s);
}
else {
    $s = EchoHtml($Feedback,'message3');
    exit($s);
}



