<?php


class file_write
{
    private $handle;
    public function __construct($filename) {
        $this->handle = fopen($filename, "a");
    }
    public function Write($data) {
        do{
            usleep(100);
        }while (!flock($this->handle, LOCK_EX));  //LOCK_EX 取得独占锁定（写入的程序）进行排它型锁定 获取锁　有锁就写入，没锁就得
        $res = fwrite($this->handle, $data."\n");
        if (!$res) {
            return 'failed';
        }
        flock($this->handle, LOCK_UN);    //LOCK_UN 释放锁定（无论共享或独占）。
        return $res;
    }

    public function __destruct()
    {
        fclose($this->handle);
        // TODO: Implement __destruct() method.
    }
}