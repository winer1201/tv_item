<?php
namespace Home\Controller;
use Think\Controller;
class BaseController extends Controller {
    public function formatResolution (){  
        $user_session = I('user_session');
        $usercode = I('usercode');
        $areacode= getareacode($user_session);
        \Home\Lib\Utility\LogHelper::Info('BaseController->formatResolution :: user_session - 【'.$user_session.'】 $areacode - 【'.$areacode.'】');
        initConfig($areacode);

        $this -> user_session = $user_session;
        $this -> usercode = $usercode;
        $this -> areacode = $areacode;
    	$this -> tp_tps_url = C("tp_tps_url");
    	$this -> tp_pms_url = C("tp_pms_url");
    	$this -> tp_cbs_url = C("tp_cbs_url");
    	$this -> tp_ls_url = C("tp_ls_url");
    	$this -> tp_tvportal_url = C("tp_tvportal_url");
        $this -> tp_gsm_url = C("tp_gsm_url");
        $this -> tp_pics_url = C("tp_pics_url");
    	$this -> cyber_tvportal_id = C("cyber_tvportal_id");
        $this -> cyber_tenantid = C("cyber_tenantid");
        $this -> cyber_epg_id = C("cyber_epg_id");
        $this -> reso = "1280*720";
    }
}


?>