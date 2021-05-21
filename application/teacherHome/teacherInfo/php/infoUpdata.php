<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE['teacherId'])) {
    $res = array('status' => "800");
    exit(json_encode($res));
}
$teacherId = $_COOKIE["teacherId"];
include("../../../common/php/com_func.php");

if (!isset($_POST['myNickname'], $_POST['myLevel'], $_POST['mySchool'], $_POST['myCollege'], $_POST['myMajor'], $_POST['myGender'])) {
    $res = array('status' => '820');
    exit(json_encode($res));
}

$myDatabase = new connect("online_oj");
$table = "teachers";
$myNickname = $_POST['myNickname'];
$myLevel = $_POST['myLevel'];
$mySchool = $_POST['mySchool'];
$myCollege = $_POST['myCollege'];
$myMajor = $_POST['myMajor'];
$myGender = $_POST['myGender'];

$myGender = $_POST['myGender'];
$sqlSentence = "update $table 
set userName='$myNickname',level='$myLevel',school='$mySchool',college='$myCollege', major='$myMajor',gender='$myGender' 
where id='$teacherId'";
if ($myDatabase->Updata($sqlSentence)) {
    $res = array('status' => '900');
    echo json_encode($res);
}
else {
    $res = array('status' => '840');
    echo json_encode($res);
}
