 <?php
namespace Home\Controller;
use Think\Controller;
class HomemakingController extends BaseController {
    public function rcbj()
    {  
    	$this -> formatResolution();      
        $this -> display('homemarking_rcbj');
    }

    public function yyjql()
    {  
    	$this -> formatResolution();      
        $this -> display('homemarking_yyjql');
    }

    public function xyjql()
    {  
    	$this -> formatResolution();      
        $this -> display('homemarking_xyjql');
    }

    public function cccm()
    {  
    	$this -> formatResolution();      
        $this -> display('homemarking_cccm');
    }
}


?>