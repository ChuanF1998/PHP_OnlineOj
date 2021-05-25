<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"], $_POST['classId'])) {
    $res = array('status' => '800');
    exit(json_encode($res));
}

$userId = $_POST['userId'];
$classId = $_POST['classId'];

//$classId = "1";

$MyDatabase = new connect("online_oj");
$Table = "class_question";
$sqlSentence = "select classQuestionId,questionName,types
from $Table
where classId='$classId' and isUse='1'";

$obj = $MyDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $res[] = array('status' => '840');
    exit(json_encode($res));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array('status' => '900');
echo json_encode($obj);