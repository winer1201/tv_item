<?php
namespace Home\Controller;
use Think\Controller;
class ImgController extends BaseController {
    public function index(){        
        $this -> formatResolution();
        $this -> display('Img_index');
    }
}