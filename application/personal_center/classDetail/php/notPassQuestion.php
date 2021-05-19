<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"], $_POST['classId'])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}

$userId = $_POST['userId'];
$classId = $_POST['classId'];


$myDatabase = new connect("online_oj");
$table = "class_que_answer";

$sqlSentence = "select distinct classQuestionId,questionName,types,isPass
from $table
where studentId='$userId' and classId='$classId' and isPass='0'";

$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $obj[] = array('status' => '840');
    exit(json_encode($res));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array('status' => '900');
echo json_encode($obj);