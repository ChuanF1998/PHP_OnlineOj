<?php
session_start();
include("../common/com_func.php");

//连接数据库
$MyDatabase = new connect("online_oj");
$SqlSentence = "select titles.id,titles.name,difficulty,kind.name as kind,species.name as species,submit_times,pass_times 
from titles,kind,species 
where titles.first_class=kind.id and titles.second_class=species.id and is_use!=false";
$obj = $MyDatabase->MultitermSelect($SqlSentence, 0);

echo json_encode($obj);