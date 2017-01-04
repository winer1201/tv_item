<?php
namespace Home\Controller;
use Think\Controller;
class AppController extends BaseController {
    public function index(){        
        $this -> formatResolution();
      
        $this -> display('app_info');
    }
}


?>