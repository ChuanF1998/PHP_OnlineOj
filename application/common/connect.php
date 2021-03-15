<?php

class connect
{
    //private $Table;
    private $SqlConnect;
    public function __construct($Table = '') {
        $this->SqlConnect = mysqli_connect("localhost", "root", "", "$Table");
        if (!$this->SqlConnect) {
            die("数据库连接失败".mysqli_error());
        }
        mysqli_query($this->SqlConnect,"set names utf8");
    }

    public function GetSqlConnect() {
        return $this->SqlConnect;
    }
}

