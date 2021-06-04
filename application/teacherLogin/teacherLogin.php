<?php
session_start();
header("Content-type:text/html;charset=utf-8");
include("../common/php/com_func.php");

if (!isset($_POST['tel'], $_POST['password'])) {
	$res[] = array('status' => '800');
	exit(json_encode($res));
}
$tel = $_POST['tel'];
$password = $_POST['password'];

$myDatabase = new connect("online_oj");
$table = "teachers";
$sqlSentence = "select id,password from $table where tel='$tel' and isUse='1' limit 1";
//c查询用户是否注册
$obj = $myDatabase->SingleSelect($sqlSentence, 0);
if ($obj === null) {
	$res[] = array('status' => '840', 'msg' => '登录失败，请重试');
	exit(json_encode($res));
}
if ($obj === "841") {
	$res[] = array('status' => '841', 'msg' => '该用户未注册','ss'=>$sqlSentence,'s'=>$obj);
	exit(json_encode($res));
}

//创建加密类
$myEncryption = new encryption($password);
$encryPwd = $myEncryption->GetCipher();

//密码比较
if ($encryPwd === $obj['password']) {
	setcookie("teacherId", $obj['id'], time() + 604800, '/');
	$res[] = array('status' => '900', 'msg' => '登陆成功');
	exit(json_encode($res));
}
else {
	$res[] = array('status' => '843', 'msg' => '密码错误');
	exit(json_encode($res));
}


