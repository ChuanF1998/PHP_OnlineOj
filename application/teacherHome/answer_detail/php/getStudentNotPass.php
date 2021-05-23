<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_POST["teacherId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$teacherId = $_POST['teacherId'];

if (!isset($_POST["classQuestionId"])) {
    $res[] = array('status' => '852');
    exit(json_encode($res));
}
$classQuestionId = $_POST['classQuestionId'];

if (!isset($_POST["classId"])) {
    $res[] = array('status' => '851');
    exit(json_encode($res));
}
$classId = $_POST['classId'];
include("../../../common/php/com_func.php");

$table = "class_que_answer";
$myDatabase = new connect("online_oj");
$sqlSentence = "select distinct studentId,classQuestionId,studentName,types,submitTime,isPass
from $table
where classId='$classId' and classQuestionId='$classQuestionId' and isPass='0'";
$obj = $myDatabase->MultitermSelect($sqlSentence, 0);

if ($obj === null) {
    $res[] = array('status' => '853');
    exit(json_encode($res));
}
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array("status" => "900");
echo json_encode($obj);