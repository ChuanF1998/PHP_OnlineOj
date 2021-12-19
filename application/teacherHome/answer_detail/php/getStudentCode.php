<?php
header("X-Content-Type-Options: nosniff");

if (!isset($_POST["questionId"], $_POST['userId'], $_POST['classId'], $_POST['filedir'])) {
    $res[] = array('status' => '860');
    exit(json_encode($res));
}

$questionId = $_POST["questionId"];
$classId = $_POST['classId'];
$userId = $_POST['userId'];
$filedir = $_POST['filedir'];
if ($filedir === -1) {
    $res[] = array('status' => '1100');
    exit(json_encode($res));
}

include("../../../common/php/com_func.php");


$studentCodeFile = "../../../src/class/" . $classId . "/studentAnswer/".$userId."/".$questionId."/".$filedir.".cpp";
if (!file_exists($studentCodeFile)) {
    $res[] = array('status' => '1101');
    exit(json_encode($res));
}

$obj['code'] = (new file_read($studentCodeFile))->Read();
$obj['status'] = "900";

echo json_encode($obj);