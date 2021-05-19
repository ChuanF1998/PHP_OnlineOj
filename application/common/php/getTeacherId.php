<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE["teacherId"])) {
    $res[] = array('status' => "800");
    exit(json_encode($res));
}
$teacherId = $_COOKIE["teacherId"];

$res[] = array('status' => "900", 'teacherId' => $teacherId);
echo json_encode($res);