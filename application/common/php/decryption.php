<?php
//解密类
class decryption {
    private $clear;
    public function __construct($cipher = '') {
        $this->clear = md5(sha1($cipher));
    }

    public function GetClear() {
        return $this->clear;
    }
}