<?php
session_start();
header("Content-type:text/html;charset=utf-8");
//echo $_COOKIE["dd"];
if (!empty($_COOKIE["ggg"])) {
    echo $_COOKIE["ggg"];
}
?>