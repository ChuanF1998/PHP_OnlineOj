<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$userId = $_POST['userId'];

$table1 = "classstudent";
$table2 = "class";
$myDatabase = new connect("online_oj");
$sqlSentence = "select classId,className,classDescribe,teacherName
from $table2 where classId in(select classId from $table1 where studentId='$userId')";

$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $res[] = array("status" => "840");
    exit(json_encode($res));
}

$obj[] = array("status" => "900");
echo json_encode($obj);