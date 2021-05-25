<?php
header("X-Content-Type-Options: nosniff");

if (!isset($_POST["questionId"])) {
    $res[] = array('status' => '860');
    exit(json_encode($res));
}
$questionId = $_POST['questionId'];
//$questionId = 5;

include("../../common/php/com_func.php");

//匹配文件是否存在
$path = "../../src/questions/programing/".$questionId;
$file = PregMatchFile($path, "/^describe/");
if ($file === null) {
    $res[] = array('status'=>'861');
    exit(json_encode($res));
}
$obj['head'] = (new file_read($path."/describe.txt"))->Read();

$file = PregMatchFile($path, "/^function/");
if ($file === null) {
    $res[] = array('status'=>'861');
    exit(json_encode($res));
}
$obj['function'] = (new file_read($path."/function.txt"))->Read();
$obj['status'] = "900";

echo json_encode($obj);