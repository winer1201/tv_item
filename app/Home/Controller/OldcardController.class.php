<?php
namespace Home\Controller;
use Think\Controller;
class OldcardController extends BaseController {
    public function index(){        
        $this -> formatResolution();
        $this -> display('oldcard_info_new');//
    }

    public function list(){
    	$this -> formatResolution();
        $this -> display('oldcard_list');
    }

    public function add(){
    	$this -> formatResolution();
        $this -> display('oldcard_add');
    }
}