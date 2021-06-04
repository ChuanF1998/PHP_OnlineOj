<?php
header("X-Content-Type-Options: nosniff");
if (!isset($_POST["teacherId"])) {
    $res[] = array('status' => '800');
    exit(json_encode($res));
}
$teacherId = $_POST['teacherId'];
include("../../../common/php/com_func.php");

$table = "class";
$myDatabase = new connect("online_oj");
$sqlSentence = "select classId,className,classDescribe from $table where teacherId='$teacherId' and isUse='1'";
$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $obj[] = array("status" => "844");
    exit(json_encode($obj));
}

//未查询到数据，但查询成功
if ($obj === "841") {
    $res[] = array('status' => '841');
    exit(json_encode($res));
}

//生成邀请码
for ($i = 0; $i < count($obj); ++$i) {
    $obj[$i]['invCode'] = createCode($obj[$i]['classId']);
}

$table2 = "classstudent";
$sqlSentence = "select classId,count(*) as numbers from $table2 group by classId having classId in(
select classId from $table where teacherId='$teacherId' and isUse='1')";
$obj2 = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj2 === null) {
    $res[] = array('status' => '845');
    exit(json_encode($res));
}
if ($obj2 === "841") {
    $tmp['numbers'] = 0;
    $obj[] = $tmp;
    $obj[] = array('status' => '900');
    exit(json_encode($obj));
}

$obj[] = $obj2;
$obj[] = array("status" => "900");
echo json_encode($obj);

//SELECT classId,count(*) FROM `classstudent` group by classId HAVING classId in('1', '2');
