<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="../css/LoginAndRegister.css">
</head>
<body>
<div class="page">
    <div class="img_background">
        <img src="../img/login01.jpg" class="img_style"/>
        <div class="window">
            <h3 height="50px">登录</h3>
            <form action="login_check.php" method="post" class="form_style">
                <div class="box1_space">
                    <input placeholder="请输入手机号" name="tel" class="input1_style"/>
                </div>
                <div class="box1_space">
                    <input type="password" placeholder="请输入密码" name="password" class="input1_style"/>
                </div>
                <div class="box2_space">
                    <input type="submit" value="立即登录" name="submit" class="input2_style"/>
                    <div>
                        <a href="../register/h_register.php" class="a_style">用户注册</a>
                        <a href="../register/h_register.php" class="a_style">忘记密码</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>