<?php
header("X-Content-Type-Options: nosniff");
include("../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$userId = $_POST['userId'];

if (!isset($_POST["tel"])) {
    $res[] = array('status' => '863');
    exit(json_encode($res));
}
$tel = $_POST['tel'];

if (!isset($_POST["questionId"])) {
    $res[] = array('status' => '860');
    exit(json_encode($res));
}
$questionId = $_POST['questionId'];


if (!isset($_POST["functionCode"])) {
    $res[] = array('status' => '862');
    exit(json_encode($res));
}
$functionCode = $_POST['functionCode'];

if (!isset($_POST["uploaderId"], $_POST['filedir'],$_POST['questionName'], $_POST['types'], $_POST['species'], $_POST['language'])) {
    $res[] = array('status' => '862');
    exit(json_encode($res));
}
$uploaderId = $_POST['uploaderId'];
$filedir = $_POST['filedir'];
$questionName = $_POST['questionName'];
$types = $_POST['types'];
$species = $_POST['species'];
$language = $_POST['language'];

//创建一个保存用户代码的文件夹
$userCodePath = "../../src/users/".$tel."/code";
if (!file_exists($userCodePath)) {
    if(!CreateFolder($userCodePath)) {
        $res[] = array('status' => '865');
        exit(json_encode($res));
    }
}

//查找主函数文件是否存在
$questionPath = "../../src/questions/programing/".$uploaderId."/".$filedir."/main.txt";
if (!file_exists($questionPath)) {
    $res[] = array('status' => '861',"up"=>$uploaderId,'fi'=>$filedir);
    exit(json_encode($res));
}
$mainCode = (new file_read($questionPath))->Read();
$questionPath = "../../src/questions/programing/".$uploaderId."/".$filedir."/head.txt";
if (!file_exists($questionPath)) {
    $res[] = array('status' => '861');
    exit(json_encode($res));
}
$headCode = (new file_read($questionPath))->Read();
$code = $headCode.$functionCode.$mainCode;

//获取当前的时间戳
$timeSecond = time();
$codeFileName = $userCodePath."/".$timeSecond.".cpp";
$executableFile = $userCodePath."/".$timeSecond;
$errorFile = $userCodePath."/error.txt";
$codeFile = fopen($codeFileName, 'w');
if(!fwrite ($codeFile, $code)) {
    $res[] = array('status' => '864');
    exit(json_encode($res));
}
fclose($codeFile);

$myDatabase = new connect("online_oj");

//编译
$command = "g++ $codeFileName -o $executableFile -std=c++11 2>$errorFile";
shell_exec($command);
$compileRet = (new file_read($userCodePath."/error.txt"))->Read();
if ($compileRet !== null) {
    $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass)
values('$userId','$questionId','$questionName','$types','$species','编译失败','$language','0')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1002', 'msg'=>'编译失败', 'info'=>$compileRet);
    exit(json_encode($res));
}

$command = $executableFile;
$runRet = shell_exec($command);
if ($runRet === "100.0") {
    $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass)
values('$userId','$questionId','$questionName','$types','$species','答案正确','$language','1')";
    $myDatabase->Insert($sql);
    shell_exec("rm -rf $errorFile");
    shell_exec("rm -rf $executableFile");
    $res[] = array('status' => '1000', 'info'=>$runRet);
    exit(json_encode($res));
}

$sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass)
values('$userId','$questionId','$questionName','$types','$species','答案错误','$language','0')";
$myDatabase->Insert($sql);
shell_exec("rm -rf $errorFile");
shell_exec("rm -rf $executableFile");
$res[] = array('status' => '1001', 'info'=>$runRet);
exit(json_encode($res));


