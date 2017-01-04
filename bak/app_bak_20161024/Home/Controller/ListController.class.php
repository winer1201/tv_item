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
}