<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_POST["userId"])) {
    $res[] = array('status' => '800', 'msg' => "用户未登录");
    exit(json_encode($res));
}
$userId = $_POST['userId'];

if (!isset($_POST["inviteCode"])) {
    $res[] = array('status' => '831', 'msg' => "未传入班级邀请码");
    exit(json_encode($res));
}
$inviteCode = $_POST["inviteCode"];
/*$inviteCode = "000E";
$userId = 35;*/

$classId = decode($inviteCode);

$myDatabase = new connect("online_oj");
$table1 = "class";
//首先在class表查询用以判断邀请码是否正确
$sqlSentence = "select isUse from $table1 where classId='$classId'";
$obj = $myDatabase->MultitermSelect($sqlSentence, 0);
if ($obj === null) {
    $res[] = array('status' => '840', 'msg' => "数据库查询失败");
    exit(json_encode($res));
}
if ($obj === "841") {
    $res[] = array('status' => '841', 'msg' => "请输入正确的邀请码");
    exit(json_encode($res));
}

$table2 = "classstudent";
$sqlSentence = "select isUse from $table2 where studentId='$userId' and classId='$classId' limit 1";
$obj = $myDatabase->MultitermSelect($sqlSentence, 0);

if ($obj === null) {
    $res[] = array('status' => '840', 'msg' => "数据库查询失败");
    exit(json_encode($res));
}

//判断是否已经加入过
if (isset($obj[0]['isUse'])) {
    if ($obj[0]['isUse'] === "1") {
        $res[] = array('status' => '842', 'msg' => "您已加入该班级");
        exit(json_encode($res));
    }
    if ($obj[0]['isUse'] === "0") {
        $sqlSentence = "update $table2 set isUse='1' where studentId='$userId' and classId='$classId'";
        if (!$myDatabase->Updata($sqlSentence)) {
            $res[] = array('status' => '840', 'msg' => "加入班级失败");
            exit(json_encode($res));
        }
    }
}

if ($obj === "841") {
    $sqlSentence = "insert into $table2(studentId,classId) values('$userId', '$classId')";
    if (!$myDatabase->Insert($sqlSentence)) {
        $res[] = array('status' => '840', 'msg' => "加入班级失败");
        exit(json_encode($res));
    }
}

$res[] = array('status' => '900', 'msg' => "加入班级成功");
echo json_encode($res);