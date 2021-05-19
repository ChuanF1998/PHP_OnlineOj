<?php
session_start();
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
if (!isset($_COOKIE["user_id"])) {
    $res = array('status' => '800');
    exit(json_encode($res));
}

if (!isset($_POST['myNickname'], $_POST['mySchool'], $_POST['myMajor'], $_POST['specificClass'], $_POST['myGender'], $_POST['myTel'])) {
    $res = array('status' => '820');
    exit(json_encode($res));
}
$userId = $_COOKIE['user_id'];
//如果未上传图片，那么与图片相关的操作不做
if (isset($_FILES['myImgFile']['name'])) {
    if ($_FILES['myImgFile']['error'] > 0) {
        $res = array('status' => '810');
        exit(json_encode($res));
    }

    //上传的不是图片格式
    if (isImage($_FILES['myImgFile']['tmp_name']) === false) {
        $res = array('status' => '811');
        exit(json_encode($res));
    }

    //上传的文件超过限制，1M
    if ($_FILES['myImgFile']['size'] > 1100000) {
        $res = array('status' => '812');
        exit(json_encode($res));
    }

    $userTel = $_POST['myTel'];
    $imgFileName = "userImg" . $userTel . "." . get_extension($_FILES['myImgFile']['name']);
    $tmpFile = $_FILES["myImgFile"]['tmp_name'];
    $path = "../../../src/users/" . $userTel . "/Img";

    //判断文件夹是否存在，不存在则创建
    if (!is_dir($path)) {
        CreateFolder("../../../src/users/" . $userTel . "/Img");
    }
    //判断是否存在头像，存在则删除
    $arr = PregMatchFile($path, "/^userImg/");
    if (!empty($arr)) {
        //unlink($path."/".$arr[0]);
        rename($path . "/" . $arr[0], $path . "/tmp" . $arr[0]);
    }

    if (!move_uploaded_file($tmpFile, $path . "/" . $imgFileName)) {
        if (!empty($arr)) {
            rename($path . "/tmp" . $arr[0], $path . "/" . $arr[0]);
        }
        $res = array('status' => '813');
        exit(json_encode($res));
    } else {
        if (!empty($arr)) {
            unlink($path . "/tmp" . $arr[0]);
        }
    }
/*    $res = array('status' => '900');
    exit(json_encode($res));*/
}

$MyDatabase = new connect("online_oj");
$Table = "student";
$myNickname = $_POST['myNickname'];
$mySchool = $_POST['mySchool'];
$myMajor = $_POST['myMajor'];
$myClass = $_POST['specificClass'];
$myGender = $_POST['myGender'];

$SqlSentence = "update $Table 
set username='$myNickname',gender='$myGender',school='$mySchool',major='$myMajor',class='$myClass' 
where id='$userId'";
if ($MyDatabase->Updata($SqlSentence)) {
    $res = array('status' => '900');
    echo json_encode($res);
}