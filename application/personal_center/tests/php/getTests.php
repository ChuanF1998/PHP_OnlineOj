<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}

if (!isset($_POST["type"])) {
    $res[] = array('status' => '830');
    exit(json_encode($res));
}

$userId = $_POST['userId'];
$type = $_POST['type'];
//$userId = 35;
//$type = 'B';
$table = "answer_details";
$myDatabase = new connect("online_oj");
//选择题
if ($type === 'A') {
    $sqlSentence = "select question_id,questionName,submit_time,is_pass
from $table where user_id='$userId' and types='$type'";
}

//编程题
if ($type === 'B') {
    $sqlSentence = "select question_id,questionName,submit_time,state,is_pass,prog_language
from $table where user_id='$userId' and types='$type'";
}

$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $obj[] = array("status" => "840");
    exit(json_encode($obj));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array("status" => "900");
echo json_encode($obj);