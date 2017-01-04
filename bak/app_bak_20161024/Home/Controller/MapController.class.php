<?php
namespace Home\Controller;
use Think\Controller;
class MapController extends BaseController {
    public function MapInfo(){        
        $this -> formatResolution();
      
        $this -> display('MapInfo');
    }
}


?>