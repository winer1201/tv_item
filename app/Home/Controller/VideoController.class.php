<?php
namespace Home\Controller;
use Think\Controller;
class VideoController extends BaseController {
    public function index(){        
        $this -> formatResolution();
        $this -> display('video_info');
    }

    public function info(){
 		$this -> formatResolution();
        $this -> display('vedio_info_new');
    }

    public function player(){
    	 $this -> formatResolution();
        $this -> display('video_player');
    }
}