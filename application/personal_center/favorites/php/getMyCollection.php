<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}

$userId = $_POST['userId'];
$table = "collection";
$myDatabase = new connect("online_oj");
$sqlSentence = "select questionId,type,questionName
from $table where userId='$userId'";

$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $res[] = array("status" => "840");
    exit(json_encode($res));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array("status" => "900");
echo json_encode($obj);