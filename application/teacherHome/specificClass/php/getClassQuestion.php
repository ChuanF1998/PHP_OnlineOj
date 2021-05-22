<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_POST["teacherId"])) {
    $res[] = array('status' => "800");
    exit(json_encode($res));
}
$teacherId = $_POST["teacherId"];

if (!isset($_POST["classId"])) {
    $res[] = array('status' => "851");
    exit(json_encode($res));
}
$classId = $_POST["classId"];
include("../../../common/php/com_func.php");

$myDatabase = new connect("online_oj");
$table = "class_question";
$sqlSentence = "select classQuestionId,questionName,types
from $table
where classId='$classId' and isUse='1'";

$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $res = array('status' => '840');
    exit(json_encode($res));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array('status' => '900');
echo json_encode($obj);
