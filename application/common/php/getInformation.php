<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE["user_id"])) {
    $res = array('status' => "800");
    exit(json_encode($res));
}
$UserId = $_COOKIE["user_id"];
include("com_func.php");

$MyDatabase = new connect("online_oj");
$SqlSentence = "select id,tel,username,gender,school,major,class from student where id='$UserId'";
$obj = $MyDatabase->SingleSelect($SqlSentence, 0);

//获取用户图片的路径
$path = "../../src/users/".$obj["tel"]."/Img";
$arr = PregMatchFile($path, "/^userImg/");
if (!empty($arr)) {
    $obj["img_path"] = "http://localhost/PHP_OnlineOj/application/src/users/".$obj["tel"]."/Img/".$arr[0];
}
else {
    $obj['img_path'] = "null";
}
$obj['status'] = "900";

echo json_encode($obj);