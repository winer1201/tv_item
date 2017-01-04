<?php
namespace Home\Controller;
use Think\Controller;
class ColumnPageController extends BaseController {
    public function index(){ 
    	$this -> formatResolution();      
        $this -> display("column_index");
    }
}


?>