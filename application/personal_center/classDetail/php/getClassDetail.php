<?php
header("X-Content-Type-Options: nosniff");
include("../../../common/php/com_func.php");
$a = "5";
$b = createCode($a);
$c = decode("000E");

echo $a;
echo "</br>";
echo $b;
echo "</br>";
echo $c;
echo "</br>";