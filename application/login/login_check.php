<?php
include("../common/com_func.php");

//创建一个mysql类
$MyDatabase = new connect("online_oj");
//获取h_login页面中form表单的值
//$Username = $_POST["username"];
$Tel = $_POST["tel"];
$Password = $_POST["password"];


$Feedback = array(
    "message1"=>array(
        "该账号未注册",
        "<a href=\"javascript:history.back(-1);\">点击返回</a> <a href=\"../register/h_register.html\">点击注册</a>"
    ),
    "message2"=>array(
        "密码错误",
        "<a href=\"javascript:history.back(-1);\">点击返回</a>"
    )
);

//先查询数据库中电话是否已经注册过
$SqlSentence = "select id,password from student where tel='$Tel'";
$obj = $MyDatabase->SingleSelect($SqlSentence, 0);
if ($obj == null) {
    $s = EchoHtml($Feedback,'message1');
    exit($s);
}

//创建加密类
$MyEncryption = new encryption($Password);
$EncryPwd = $MyEncryption->GetCipher();

//密码比较
if ($EncryPwd == $obj['password']) {
    $stu_id = $obj['id'];
    $SqlSentence = "update student set is_online='1' where student.id='$stu_id'";
    if($MyDatabase->Updata($SqlSentence)) {
        //写入日志
        $time = (new date())->GetSerDate();
        $data = "Tel[$Tel] Date[$time] login in";
        (new log("../src/login.txt"))->Login($data);
        $SqlSentence = "update student set is_online='0' where student.id='$stu_id'";
        $MyDatabase->Updata($SqlSentence);
        Header("Location: http://localhost:63342/application/home/home.html?id=".$obj['id']."");
        exit('登录成功');
    }
    else {
        echo 'ads';
    }
}
else {
    $s = EchoHtml($Feedback,'message2');
    exit($s);
}