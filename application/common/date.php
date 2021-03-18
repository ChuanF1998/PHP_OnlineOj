<?php

class date
{
    public function GetSerDate() {
        date_default_timezone_set("PRC");
        return date("Y-m-d l H:i:s A");
    }
}