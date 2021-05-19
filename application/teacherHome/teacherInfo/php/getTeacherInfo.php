<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE['teacherId'])) {
    $res = array('status' => "800");
    exit(json_encode($res));
}
$teacherId = $_COOKIE["teacherId"];
//$teacherId = 1;
include("../../../common/php/com_func.php");

$myDatabase = new connect("online_oj");
$table = "teachers";
$sqlSentence = "select id,tel,userName,level,school,college,major,gender from $table where id='$teacherId' limit 1";
$obj = $myDatabase->SingleSelect($sqlSentence, 0);
if ($obj === null)  {
    $res = array('status' => "840");
    exit(json_encode($res));
}
if ($obj === "841") {
    $res = array('status' => "841");
    exit(json_encode($res));
}

$obj['status'] = "900";
echo json_encode($obj);