<?php
//包含类的函数
spl_autoload_register(function ($class_name) {
    require_once '../common/'.$class_name . '.php';
});

//消息输出，用于登录和注册后的提示信息
function EchoHtml(&$Feedback, $key) {
    return $Html = <<<"EOF"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--<meta http-equiv="Content-Type" content="text/html" />-->
    <title>提示</title>
    <link rel="stylesheet" type="text/css" href="../css/result_back.css">

</head>
<body>
<!--<div style="height: 100%; width: 100%; background-color: red">-->
<div class="result_box1">
<div class="result_box2">
{$Feedback[$key][0]}
</div>
<div class="result_box3">
{$Feedback[$key][1]}
</div>
</div>
<!--</div>-->
</body>
</html>
EOF;
}