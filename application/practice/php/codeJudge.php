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

if ($language === "C++") {
    if (!isset($_POST['submit_times'], $_POST['pass_times'])) {
        $res[] = array('status' => '862');
        exit(json_encode($res));
    }
    $submit_times = $_POST['submit_times'] + 1;
    $pass_times = $_POST['pass_times'] + 1;

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
    $outputFile = $userCodePath."/output.txt";
    $codeFile = fopen($codeFileName, 'w');
    if(!fwrite ($codeFile, $code)) {
        $res[] = array('status' => '864');
        exit(json_encode($res));
    }
    fclose($codeFile);

    $myDatabase = new connect("online_oj");
    $myDatabase->Updata("update titles set submit_times=submit_times+1 where id='$questionId'");

    /*
     * 1-编译失败
     * 2-段错误
     * */
    //调用C++判题模块
    $s = $userCodePath.'/';
    $resCode = shell_exec("./cppCode $s $timeSecond");
    if ($resCode === '1') {
        $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass,submitId)
values('$userId','$questionId','$questionName','$types','$species','编译失败','$language','0',$timeSecond)";
        $myDatabase->Insert($sql);
        $compileRet = (new file_read($errorFile))->Read();
        shell_exec("rm -rf $errorFile");
        $res[] = array('status' => '1001', 'msg'=>'编译失败', 'info'=>$compileRet);
        exit(json_encode($res));
    }
    if ($resCode === '2') {
        $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass,submitId)
values('$userId','$questionId','$questionName','$types','$species','段错误','$language','0',$timeSecond)";
        $myDatabase->Insert($sql);
        shell_exec("rm -rf $errorFile");
        shell_exec("rm -rf $executableFile");
        $res[] = array('status' => '1002', 'msg'=>'段错误');
        exit(json_encode($res));
    }
    if ($resCode === '3') {
        $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass,submitId)
values('$userId','$questionId','$questionName','$types','$species','运行超时','$language','0',$timeSecond)";
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
            $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass,submitId)
values('$userId','$questionId','$questionName','$types','$species','答案正确','$language','1',$timeSecond)";
            $myDatabase->Insert($sql);
            $myDatabase->Updata("update titles set pass_times=pass_times+1 where id='$questionId'");
            $res[] = array('status' => '1005', 'msg'=>'已通过所有测试用例');
            exit(json_encode($res));
        }
        else {
            $sql = "insert into answer_details(user_id,question_id,questionName,types,species,state,prog_language,is_pass,submitId)
values('$userId','$questionId','$questionName','$types','$species','答案错误','$language','0',$timeSecond)";
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
}

$res[] = array('status' => '1007', 'msg'=>$language);
exit(json_encode($res));



