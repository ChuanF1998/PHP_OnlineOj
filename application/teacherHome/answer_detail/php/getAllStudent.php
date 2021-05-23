<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_POST["teacherId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$teacherId = $_POST['teacherId'];

if (!isset($_POST["classId"])) {
    $res[] = array('status' => '851');
    exit(json_encode($res));
}
$classId = $_POST['classId'];
include("../../../common/php/com_func.php");

$table1 = "student";
$table2 = "classstudent";
$myDatabase = new connect("online_oj");
$sqlSentence = "select id,username,major,class
from $table1
where id in(select studentId from $table2 where classId='$classId')";
$obj = $myDatabase->MultitermSelect($sqlSentence, 0);

if ($obj === null) {
    $res[] = array('status' => '854');
    exit(json_encode($res));
}
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

$obj[] = array("status" => "900");
echo json_encode($obj);