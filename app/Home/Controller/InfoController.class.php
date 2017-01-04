<?php
namespace Home\Controller;
use Think\Controller;
class InfoController extends BaseController {
    public function restaurant(){        
        $this -> formatResolution();
      
        $this -> display('info_restaurant');
    }
    public function details(){        
        $this -> formatResolution();
      
        $this -> display('video_details');
    }
    public function wu_details(){        
        $this -> formatResolution();
      
        $this -> display('wudui_details');
    }
}