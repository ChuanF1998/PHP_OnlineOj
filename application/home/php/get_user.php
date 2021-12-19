<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE["user_id"])) {
    exit("{\"result\":\"0\"}");
}
$UserId = $_COOKIE["user_id"];
include("../../common/php/com_func.php");

$MyDatabase = new connect("online_oj");
$SqlSentence = "select id,tel,username,submit_times,pass_times from student where id=$UserId";
$obj = $MyDatabase->SingleSelect($SqlSentence, 0);
$obj["result"] = "1";

//获取用户图片的路径
$path = "../../src/users/".$obj["tel"]."/Img";
$arr = PregMatchFile($path, "/^userImg/");
if (!empty($arr)) {
    $obj["img_path"] = "../src/users/".$obj["tel"]."/Img/".$arr[0];
}
else {
    $obj['img_path'] = null;
}

echo json_encode($obj);
