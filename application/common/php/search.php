<?php
header("X-Content-Type-Options: nosniff");
include("../../common/php/com_func.php");

if (!(isset($_POST['keywords']))) {
    exit("null");
}
$keywords = $_POST['keywords'];

$Type = 'B';
//连接数据库
$MyDatabase = new connect("online_oj");
$SqlSentence = "select id,name,difficulty,types,species,submit_times,pass_times,filedir,uploader 
from titles
where is_use=true and types='$Type' and name like '%$keywords%'";
$obj = $MyDatabase->MultitermSelect($SqlSentence, 0);
if ($obj === "841") {
    exit("841");
}

echo json_encode($obj);