<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_POST['teacherId'])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$teacherId = $_POST['teacherId'];

if (!isset($_POST["className"], $_POST['classDescribe'])) {
    $res[] = array('status' => '845');
    exit(json_encode($res));
}
$className = $_POST['className'];
$classDescribe = $_POST['classDescribe'];

include("../../../common/php/com_func.php");

$myDatabase = new connect("online_oj");
$sqlSentence = "select userName from teachers where id='$teacherId' limit 1";
$teacherName = $myDatabase->SingleSelect($sqlSentence, 0);
if ($teacherName === null) {
    $res[] = array('status' => '840');
    exit(json_encode($res));
}
if ($teacherName === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}
$name = $teacherName['userName'];

$sqlSentence = "insert into class(teacherId, teacherName, className, classDescribe)
values('$teacherId', '$name', '$className', '$classDescribe')";

if ($myDatabase->Insert($sqlSentence)) {
    $res[] = array('status' => '900');
    exit(json_encode($res));
}
else {
    $res[] = array('status' => '850');
    exit(json_encode($res));
}