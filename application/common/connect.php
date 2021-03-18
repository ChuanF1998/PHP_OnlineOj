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
    //获取一个数据库连接句柄
    public function GetSqlConnect() {
        return $this->SqlConnect;
    }

    //执行数据库插入
    public function Insert($SqlSentence = "") {
        if ($SqlSentence == "") {
            return true;
        }
        return mysqli_query($this->SqlConnect, $SqlSentence);
    }
    //数据库查询
    /*
     * way 1 =>
     */
    public function Select($SqlSentence = "", $way = 0) {
        if ($SqlSentence == "") {
            return true;
        }

    }

    public function __destruct() {
        if ($this->SqlConnect) {
            mysqli_close($this->SqlConnect);
        }
        // TODO: Implement __destruct() method.
    }
}

