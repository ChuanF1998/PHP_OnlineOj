<?php
session_start();
$userId = $_COOKIE['user_id'];
setcookie("user_id", $userId, time() - 1, '/');

$res[] = array('status'=>'900');
echo json_encode($res);