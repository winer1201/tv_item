<?php
namespace Home\Controller;
use Think\Controller;
class AccompanyController extends BaseController {
    public function index()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_index');
    }
    public function order1()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_order1');
    }
    public function order2()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_order2');
    }
    public function order3()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_order3');
    }
    public function order4()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_order4');
    }
    public function result()
    {  
    	$this -> formatResolution();      
        $this -> display('accompany_result');
    }
}


?>