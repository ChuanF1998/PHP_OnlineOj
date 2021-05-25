<?php
session_start();
header("X-Content-Type-Options: nosniff");
include("../../common/php/com_func.php");

if (!(isset($_POST['QuestionType']) && isset($_POST['QuestionClass']))) {
    exit("null");
}
$Type = $_POST['QuestionType'];
$Class = $_POST['QuestionClass'];

//连接数据库
$MyDatabase = new connect("online_oj");
if ($Class === 'Z') {
    $SqlSentence = "select id,name,difficulty,types,species,submit_times,pass_times,filedir,uploader 
from titles where is_use=true and types='$Type'";
}
else {
    $SqlSentence = "select id,name,difficulty,types,species,submit_times,pass_times,filedir,uploader 
from titles
where is_use=true and types='$Type' and species='$Class'";
}
$obj = $MyDatabase->MultitermSelect($SqlSentence, 0);
if ($obj === "841") {
    exit("841");
}

echo json_encode($obj);
