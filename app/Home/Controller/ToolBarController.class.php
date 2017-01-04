<?php
namespace Home\Controller;
use Think\Controller;
class ToolBarController extends BaseController {
    public function index(){  
    	$this -> formatResolution();
        $this -> display('toolbar_list');
	}
}

?>