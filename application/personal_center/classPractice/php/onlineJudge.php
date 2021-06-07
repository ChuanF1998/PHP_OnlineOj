<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$userId = $_POST['userId'];

if (!isset($_POST["questionId"])) {
    $res[] = array('status' => '860');
    exit(json_encode($res));
}
$questionId = $_POST['questionId'];

if (!isset($_POST["classId"])) {
    $res[] = array('status' => '876');
    exit(json_encode($res));
}
$classId = $_POST['classId'];

if (!isset($_POST["functionCode"])) {
    $res[] = array('status' => '862');
    exit(json_encode($res));
}
$functionCode = $_POST['functionCode'];

if (!isset($_POST['filedir'], $_POST['questionName'], $_POST['types'], $_POST['language'])) {
    $res[] = array('status' => '862');
    exit(json_encode($res));
}
$filedir = $_POST['filedir'];
$questionName = $_POST['questionName'];
$types = $_POST['types'];
$language = $_POST['language'];

//创建一个保存用户代码的文件夹
$studentCodePath = "../../../src/class/" . $classId . "/studentAnswer/".$userId."/".$questionId;
if (!file_exists($studentCodePath)) {
    if (!CreateFolder($studentCodePath)) {
        $res[] = array('status' => '865');
        exit(json_encode($res));
    }
}

//查找主函数文件是否存在
$questionPath = "../../../src/class/".$classId."/programing/" . $filedir . "/main.txt";
if (!file_exists($questionPath)) {
    $res[] = array('status' => '861', "up" => $uploaderId, 'fi' => $filedir);
    exit(json_encode($res));
}
$mainCode = (new file_read($questionPath))->Read();
$questionPath = "../../../src/class/".$classId."/programing/" . $filedir .  "/head.txt";
if (!file_exists($questionPath)) {
    $res[] = array('status' => '861');
    exit(json_encode($res));
}
$headCode = (new file_read($questionPath))->Read();
$code = $headCode . $functionCode . $mainCode;

//获取当前的时间戳
$timeSecond = time();
$codeFileName = $studentCodePath . "/" . $timeSecond . ".cpp";
$executableFile = $studentCodePath . "/" . $timeSecond;
$errorFile = $studentCodePath . "/error.txt";

$functionFileName = $studentCodePath . "/" . $timeSecond . ".txt";
$functionFile = fopen($functionFileName, 'w');
if (!fwrite($functionFile, $functionCode)) {
    $res[] = array('status' => '878');
    exit(json_encode($res));
}

$codeFile = fopen($codeFileName, 'w');
if (!fwrite($codeFile, $code)) {
    $res[] = array('status' => '864');
    exit(json_encode($res));
}
fclose($codeFile);


$myDatabase = new connect("online_oj");

$res[] = array('status' => '1001', 'sd'=>$sql);
exit(json_encode($res));

//编译
$command = "g++ $codeFileName -o $executableFile -std=c++11 2>$errorFile";
shell_exec($command);
$compileRet = (new file_read($studentCodePath . "/error.txt"))->Read();
if ($compileRet !== null) {
    $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','编译失败','$language','$timeSecond')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1002', 'msg' => '编译失败', 'info' => $compileRet);
    exit(json_encode($res));
}

$command = $executableFile;
$runRet = shell_exec($command);
if ($runRet === "100.0") {
    $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','1','运行通过','$language','$timeSecond')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1000', 'info' => $runRet);
    exit(json_encode($res));
}

$sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','答案错误','$language','$timeSecond')";
$myDatabase->Insert($sql);
shell_exec("rm -rf $errorFile");
shell_exec("rm -rf $executableFile");
$res[] = array('status' => '1001', 'info' => $runRet);
exit(json_encode($res));


