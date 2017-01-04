<?php
namespace Home\Controller;
use Think\Controller;
class InfoController extends BaseController {
    public function restaurant(){        
        $this -> formatResolution();
      
        $this -> display('info_restaurant');
    }
}