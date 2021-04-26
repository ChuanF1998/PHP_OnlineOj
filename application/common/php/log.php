<?php


class log extends file_write
{
    public function __construct($filepath) {
        parent::__construct($filepath);
    }
    //注册日志
    public function Register($data) {
        $this->Write($data);
    }
    //登录日志
    public function Login($data) {
        $this->Write($data);
    }
    //修改密码日志
    public function ModifyPwd($data) {
        $this->Write($data);
    }

}