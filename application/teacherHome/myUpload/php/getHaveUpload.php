<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["teacherId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}

$teacherId = $_POST['teacherId'];

$table = "titles";
$myDatabase = new connect("online_oj");

//编程题
$sqlSentence = "select id,name,types,species,difficulty,upload_time,filedir
from $table where uploader='$teacherId' and is_use='1'";

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
