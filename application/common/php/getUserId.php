<?php
session_start();
header("X-Content-Type-Options: nosniff");
if (!isset($_COOKIE["user_id"])) {
    exit("null");
}
$UserId = $_COOKIE["user_id"];

echo json_encode($UserId);
