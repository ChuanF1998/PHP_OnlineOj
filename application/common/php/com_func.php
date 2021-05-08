<?php
//包含类的函数
spl_autoload_register(function ($class_name) {
    //require_once '../../common/php/'.$class_name . '.php';
    require_once $class_name . '.php';
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
    <link rel="stylesheet" type="text/css" href="../common/css/result_back.css">

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

//创建文件夹
function CreateFolder($file_path = "")
{
    if ($file_path === "") {
        return true;
    }
    /*iconv方法是为了防止中文乱码，保证可以创建识别中文目录，不用iconv方法格式的话，将无法创建中文目录*/
    $dir = iconv("UTF-8", "GBK",$file_path);
    if (!file_exists($dir)) {
        if (mkdir($dir)) {
            return true;
        }
        return false;
    }
    return false;
}

//匹配文件
function PregMatchFile($path = "", $str = "") {
    if ($path == "" || $str == "") {
        return null;
    }
    if (!file_exists($path)) {
        return null;
    }
    $arr = array();
    //打开文件夹
    if ($handle = opendir($path)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                $ImgFile = preg_match($str, $file);// 找出带有php的文件名称
                if ($ImgFile) {
                    array_push($arr, $file);
                }
            }
        }
        closedir($handle);
    }
    return $arr;
}