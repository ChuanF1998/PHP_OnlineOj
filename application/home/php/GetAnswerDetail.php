<?php
session_start();
header("X-Content-Type-Options: nosniff");

//未传入用户id
if (!isset($_COOKIE["user_id"])) {
    exit("null");
}
if (!(isset($_POST['QuestionType']) && isset($_POST['QuestionClass']))) {
    exit("null");
}

$UserId = $_COOKIE["user_id"];
include("../../common/php/com_func.php");

$Type = $_POST['QuestionType'];
$Class = $_POST['QuestionClass'];

//连接数据库
$MyDatabase = new connect("online_oj");
$Table = "answer_details";

$SqlSentence = "";
//获取某用户答题次数
if ($Class === 'Z') {
    $SqlSentence = "select Count(*) as submit_times from $Table where user_id='$UserId' and types='$Type'";
}
else {
    $SqlSentence = "select Count(*) as submit_times from $Table where user_id='$UserId' and types='$Type' and species='$Class'";
}
$A = $MyDatabase->SingleSelect($SqlSentence, 0);

//已挑战数目(通过和未通过)
if ($Class === 'Z') {
    $SqlSentence = "select Count(*) as submit_questions
from (select distinct user_id,question_id,types,species from $Table 
where user_id='$UserId' and types='$Type') A";
}
else {
    $SqlSentence = "select Count(*) as submit_questions
from (select distinct user_id,question_id,types,species from $Table 
where user_id='$UserId' and types='$Type' and species='$Class') A";
}
$B = $MyDatabase->SingleSelect($SqlSentence, 0);
$s = $SqlSentence;

//通过题目数
if ($Class === 'Z') {
    $SqlSentence = "select Count(*) as pass_questions
from (select distinct question_id,is_pass from $Table where user_id='$UserId' and types='$Type') A 
where is_pass=true";
}
else {
    $SqlSentence = "select Count(*) as pass_questions
from (select distinct question_id,is_pass from $Table where user_id='$UserId' and types='$Type' and species='$Class') A 
where is_pass=true";
}
$C = $MyDatabase->SingleSelect($SqlSentence, 0);

//已通过题目
if ($Class === 'Z') {
    $SqlSentence = "select distinct question_id,is_pass from $Table 
where user_id='$UserId' and types='$Type'";
}
else {
    $SqlSentence = "select distinct question_id,is_pass from $Table 
where user_id='$UserId' and types='$Type' and species='$Class'";
}
$res1 = $MyDatabase->MultitermSelect($SqlSentence, 0);

//结果输出
$res2['submit_times'] = $A['submit_times'];
$res2['submit_questions'] = $B['submit_questions'];
$res2['pass_questions'] = $C['pass_questions'];
$res2['s'] = $s;

/*print_r($A);
print_r($B);
print_r($C);*/
//print_r($obj);
//print_r($obj2);

echo json_encode($res1).'.'.json_encode($res2);
