<?php
session_start();
header("X-Content-Type-Options: nosniff");
include("../common/com_func.php");

//$Type = $_POST['QuestionType'];
//$Class = $_POST['QuestionClass'];
$Type = 'A';
$Class = 'Z';

//连接数据库
$MyDatabase = new connect("online_oj");
if ($Class === 'Z') {
    $SqlSentence = "select titles.id,titles.name,difficulty,kind.name as kind,species.name as species,submit_times,pass_times 
from titles,kind,species 
where titles.first_class=kind.id and titles.second_class=species.id and is_use!=false and first_class='$Type'";
}
else {
    $SqlSentence = "select titles.id,titles.name,difficulty,kind.name as kind,species.name as species,submit_times,pass_times 
from titles,kind,species 
where titles.first_class=kind.id and titles.second_class=species.id and is_use!=false and first_class='$Type' and second_class='$Class'";
}
$obj = $MyDatabase->MultitermSelect($SqlSentence, 0);

echo json_encode($obj);
