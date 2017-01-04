<?php
namespace Home\Controller;
use Think\Controller;
class ListController extends BaseController {
    public function index(){        
        $this -> formatResolution();
        $this -> display('list_Index');
    }

    public function album(){
 		$this -> formatResolution();
        $this -> display('list_album');
    }

    public function restaurant(){
        $this -> formatResolution();
        $this -> display('list_restaurant');
    }

    public function food(){
    	$this -> formatResolution();
        $this -> display('list_restaurant_food');
    }

    public function category(){
        $this -> formatResolution();
        $this -> display('list_category');
    }

    public function goods(){
        $this -> formatResolution();
        $this -> display('list_goods');
    }

    public function list_search(){
        $this -> formatResolution();
        $this -> display('list_search');
    }

    public function dance(){
    	$this -> formatResolution();
        $this -> display('list_dance');
    }
    public function wudui(){
    	$this -> formatResolution();
        $this -> display('list_wudui');
    }
    public function chao(){
    	$this -> formatResolution();
        $this -> display('list_chao');
    }
}