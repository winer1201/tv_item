<?php
namespace Home\Controller;
use Think\Controller;
class MyController extends BaseController {
    public function index(){        
        $this -> formatResolution();
        $this -> display('my_info');
    }

    public function history(){
    	$this -> formatResolution();
        $this -> display('my_use_history');
    }

    public function collect(){
    	$this -> formatResolution();
        $this -> display('my_collect_list');
    }

    public function message(){
    	$this -> formatResolution();
        $this -> display('my_message_list');
    }
}