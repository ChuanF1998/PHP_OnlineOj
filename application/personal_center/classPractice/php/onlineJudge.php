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
$outputFile = $studentCodePath."/output.txt";

$functionFileName = $studentCodePath . "/" . $timeSecond . ".txt";
$functionFile = fopen($functionFileName, 'w');
if (!fwrite($functionFile, $functionCode)) {
    $res[] = array('status' => '878');
    exit(json_encode($res));
}
fclose($functionFile);

$codeFile = fopen($codeFileName, 'w');
if (!fwrite($codeFile, $code)) {
    $res[] = array('status' => '864');
    exit(json_encode($res));
}
fclose($codeFile);

$myDatabase = new connect("online_oj");

//编译
$s = $studentCodePath.'/';
$resCode = shell_exec("./cppCode $s $timeSecond");
if ($resCode === '1') {
    $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','编译失败','$language','$timeSecond')";
    $myDatabase->Insert($sql);
    $compileRet = (new file_read($errorFile))->Read();
    shell_exec("rm -rf $errorFile");
    $res[] = array('status' => '1001', 'msg'=>'编译失败', 'info'=>$compileRet);
    exit(json_encode($res));
}
if ($resCode === '2') {
    $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','段错误','$language','$timeSecond')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1002', 'msg'=>'段错误');
    exit(json_encode($res));
}
if ($resCode === '3') {
    $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','运行超时','$language','$timeSecond')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1003', 'msg'=>'运行超时');
    exit(json_encode($res));
}
if ($resCode === '0') {
    $runRet = (new file_read($outputFile))->Read();
    //切割
    $str = explode("\n", $runRet);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $outputFile");
    shell_exec("rm -rf $executableFile");
    if ($str[0] === "100.0") {
        $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','1','答案正确','$language','$timeSecond')";
        $myDatabase->Insert($sql);
        $res[] = array('status' => '1005', 'msg'=>'已通过所有测试用例');
        exit(json_encode($res));
    }
    else {
        $sql = "insert into 
class_que_answer(studentId,classId,classQuestionId,questionName,types,IsPass,state,prog_language,submitId)
values('$userId','$classId','$questionId','$questionName','$types','0','答案错误','$language','$timeSecond')";
        $myDatabase->Insert($sql);
        $info = "";
        for ($i = 1; $i < count($str); $i++) {
            $info .= $str[$i]."\r\n";
        }
        $res[] = array('status' => '1004', 'msg'=>'未通过所有测试用例', 'info'=>$info);
        exit(json_encode($res));
    }
}
if ($resCode === '6') {
    $res[] = array('status' => '1006', 'msg'=>'系统内部错误');
    exit(json_encode($res));
}


