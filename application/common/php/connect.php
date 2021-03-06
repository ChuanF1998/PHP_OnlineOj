<?php

class connect
{
    //private $Table;
    private $SqlConnect;
    public function __construct($Table = '') {
        $this->SqlConnect = mysqli_connect("localhost", "root", "123456", "$Table");
        if (!$this->SqlConnect) {
            die("数据库连接失败".mysqli_error($this->SqlConnect));
        }
        mysqli_query($this->SqlConnect,"set names utf8");
    }

    private function Mysqli_fetch_all($result, $way) {
        $posts = array();
        if ($way === 0) {
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $posts[] = $row;
            }
        }
        if ($way === 1) {
            while($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
                $posts[] = $row;
            }
        }
        if ($way === 2) {
            while($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
                $posts[] = $row;
            }
        }
        return $posts;
    }

    //获取一个数据库连接句柄
    public function GetSqlConnect() {
        return $this->SqlConnect;
    }

    //执行数据库插入
    public function Insert($SqlSentence = "") {
        if ($SqlSentence === "") {
            return true;
        }
        return mysqli_query($this->SqlConnect, $SqlSentence);
    }

    /*数据库查询，返回一个结果集
     * way 0 => MYSQLI_ASSOC
           1 => MYSQLI_NUM
           2 => MYSQLI_BOTH
     */
    public function SingleSelect($SqlSentence = "", $way = 0) {
        if ($SqlSentence == "") {
            return null;
        }
        $obj = mysqli_query($this->SqlConnect, $SqlSentence);
        if (mysqli_num_rows($obj) < 1) {
            return "841";
        }
        if ($way == 0) {
            //return mysqli_fetch_array(mysqli_query($this->SqlConnect, $SqlSentence), MYSQLI_ASSOC);
            return mysqli_fetch_array($obj, MYSQLI_ASSOC);
        }
        else if ($way == 1) {
            return mysqli_fetch_array(mysqli_query($this->SqlConnect, $SqlSentence), MYSQLI_NUM);
        }
        else if ($way == 2) {
            return mysqli_fetch_array(mysqli_query($this->SqlConnect, $SqlSentence), MYSQLI_BOTH);
        }
        else {
            return null;
        }
    }

    public function MultitermSelect($SqlSentence = "", $way = 0) {
        if ($SqlSentence == "") {
            return null;
        }
        $obj = mysqli_query($this->SqlConnect, $SqlSentence);
        if (mysqli_num_rows($obj) < 1) {
            return "841";
        }
        if ($way === 0) {
            //return mysqli_fetch_all($obj, MYSQLI_ASSOC);
            return $this->Mysqli_fetch_all($obj, 0);
        }
        else if ($way === 1) {
            //return mysqli_fetch_all(mysqli_query($this->SqlConnect, $SqlSentence), MYSQLI_NUM);
            return $this->Mysqli_fetch_all($obj, 1);
        }
        else if ($way === 2) {
            //return mysqli_fetch_all(mysqli_query($this->SqlConnect, $SqlSentence), MYSQLI_BOTH);
            return $this->Mysqli_fetch_all($obj, 2);
        }
        else {
            return null;
        }
    }

    public function Updata($SqlSentence = '') {
        if ($SqlSentence === '') {
            return false;
        }
        return mysqli_query($this->SqlConnect, $SqlSentence);
    }

    public function __destruct() {
        if ($this->SqlConnect) {
            mysqli_close($this->SqlConnect);
        }
        // TODO: Implement __destruct() method.
    }
}

