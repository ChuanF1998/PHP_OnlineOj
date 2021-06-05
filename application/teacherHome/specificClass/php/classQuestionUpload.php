<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["uploaderId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$uploaderId = $_POST['uploaderId'];

if (!isset($_POST["classId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$classId = $_POST['classId'];

if (!isset($_POST['questionName'], $_POST['difficulty'], $_POST['species'])) {
    $res[] = array('status' => '866');
    exit(json_encode($res));
}
$questionName = $_POST['questionName'];
$difficulty = $_POST['difficulty'];
$types = 'B';
$species = $_POST['species'];

if (!isset($_FILES['describe']['name'], $_FILES['head']['name'], $_FILES['func']['name'], $_FILES['main']['name'])) {
    $res[] = array('status' => '867');
    exit(json_encode($res));
}

if ($_FILES['describe']['error'] > 0) {
    $res[] = array('status' => '868');
    exit(json_encode($res));
}
if ($_FILES['head']['error'] > 0) {
    $res[] = array('status' => '868');
    exit(json_encode($res));
}
if ($_FILES['func']['error'] > 0) {
    $res[] = array('status' => '868');
    exit(json_encode($res));
}
if ($_FILES['main']['error'] > 0) {
    $res[] = array('status' => '868');
    exit(json_encode($res));
}

$timeStamp = time();
$myDatabase = new connect("online_oj");
$sqlSentence = "insert into class_question(classId,teacherId,questionName,types, filedir) 
values('$classId','$uploaderId','$questionName','$types','$timeStamp')";
if (!$myDatabase->Insert($sqlSentence)) {
    $res[] = array('status' => '850');
    exit(json_encode($res));
}

$questionPath = "../../../src/class/".$classId."/programing/".$timeStamp;
if (!CreateFolder($questionPath)) {
    $res[] = array('status' => '865');
    exit(json_encode($res));
}

$tmpFile = $_FILES["describe"]['tmp_name'];
if (!move_uploaded_file($tmpFile, $questionPath."/"."describe.txt")) {
    $res[] = array('status' => '813');
    exit(json_encode($res));
}
//rename($questionPath."/".$tmpFile, $questionPath."/"."describe.txt");

$tmpFile = $_FILES["head"]['tmp_name'];
if (!move_uploaded_file($tmpFile, $questionPath."/"."head.txt")) {
    $res[] = array('status' => '813');
    exit(json_encode($res));
}
//rename($questionPath."/".$tmpFile, $questionPath."/"."head.txt");

$tmpFile = $_FILES["func"]['tmp_name'];
if (!move_uploaded_file($tmpFile, $questionPath."/"."function.txt")) {
    $res[] = array('status' => '813');
    exit(json_encode($res));
}
//rename($questionPath."/".$tmpFile, $questionPath."/"."function.txt");

$tmpFile = $_FILES["main"]['tmp_name'];
if (!move_uploaded_file($tmpFile, $questionPath."/"."main.txt")) {
    $res[] = array('status' => '813');
    exit(json_encode($res));
}
//rename($questionPath."/".$tmpFile, $questionPath."/"."main.txt");

$res[] = array('status' => '900');
exit(json_encode($res));