<?php
header("X-Content-Type-Options: nosniff");
include("../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$userId = $_POST['userId'];

if (!isset($_POST['questionId'], $_POST['types'], $_POST['questionName'])) {
    $res[] = array('status' => '880');
    exit(json_encode($res));
}
$questionId = $_POST['questionId'];
$types = $_POST['types'];
$questionName = $_POST['questionName'];

$myDatabase = new connect("online_oj");

//判断是否收藏
$sql = "select isUse from collection where userId='$userId' and questionId='$questionId' limit 1";
$obj = $myDatabase->SingleSelect($sql, 0);

if ($obj === null) {
    $res[] = array('status' => '882');
    exit(json_encode($res));
}
if ($obj === "841") {
    $sql = "insert into collection(userId, questionId, type, questionName) 
values('$userId', '$questionId', '$types', '$questionName')";
    if (!$myDatabase->Insert($sql)) {
        $res[] = array('status'=>'850', 'ss'=>$sql);
        exit(json_encode($res));
    }
    $res[] = array('status' => '900');
    exit(json_encode($res));
}

$res[] = array('status'=>'881');
exit(json_encode($res));
