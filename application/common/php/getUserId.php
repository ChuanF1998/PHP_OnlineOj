<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE["user_id"])) {
    $res = array('status' => "800");
    exit(json_encode($res));
}
$UserId = $_COOKIE["user_id"];

$res = array('status' => "900");
$res['userId'] = $UserId;
echo json_encode($res);
