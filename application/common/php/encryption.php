<?php
//加密类
class encryption {
    private $cipher;
    public function __construct($clear = '') {
        $this->cipher = md5(sha1($clear));
    }

    public function GetCipher() {
        return $this->cipher;
    }
}