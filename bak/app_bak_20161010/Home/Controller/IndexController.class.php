<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends BaseController {
    public function index(){        
        $action = I('action');
        $page = I('page');
        $usercode=I('usercode');
        $user_session=I('user_session');
		$sitecode = I('websitecode');
		$param = I('page_params');
        $backUrl = I('backUrl');
        
		$url='';
        $active=0;
        $active_url='';
        $activetype=0;//0:每次登陆；1：首次登陆
        

        try{
            $this -> formatResolution();
            $url=C('tp_tvportal_url');  

            if($url == null || $url == "")
                $url = "http://127.0.0.1/";

            $areacode = getareacode($user_session);

            if($page != 'appinfo' && $page!='videoinfo')
            	$page = 'home';

            //查找活动配置

            if($action='login'){
            	//查找活动配置类型
                $active_url =C('tp_tps_url')."/pageconfig/getactiveinfo?areacode=".$areacode;
              
            	$activeResult = Http($active_url);
                $activeobj=null;
                if($activeResult)
                    $activeobj=json_decode($activeResult); 

                if($activeobj && $activeobj->recode == 0 && $activeobj->data!=null ){
                    $active_url=$activeobj->data->activeurl;
                    if(strlen($active_url)>0){                   
                        $active_url = add_querystring_var($active_url,"usercode",$usercode);                    
                        $active_url = add_querystring_var($active_url,"user_session",$user_session);
                    }
                  
                    if($activeobj->data->activetype==0)//每次登陆进入活动
                         $active=1;
                     else{//查找用户是否首次登陆

                     }
                }
                else
                {
                    $active_url='';
                }
            }

            switch($page){
            	case 'home': $url.='index/showpage'; break;
            	case 'appinfo':	$url .= 'App/index';	break;
            	case 'videoinfo:':	$url.='Video/index';	break;
            	default:        	
            	case 'home':$url.='index/showpage';break;
            }

            if($param!='')
            {
            	$param = base64_decode($param);
            	$url.='?'.$param;
            }
            else
            {
            	$url.="?usercode=".$usercode."&user_session=".$user_session."&websitecode=".$sitecode;
            }
            
            if($backUrl && $backUrl != ""){
                $backUrl= str_replace('amp;','',$backUrl); 
                \Home\Lib\Utility\LogHelper::Debug('before urlencode - backUrl :: 【'.$backUrl.'】');
                $backUrl= urlencode($backUrl);
                \Home\Lib\Utility\LogHelper::Debug('after urlencode - backUrl :: 【'.$backUrl.'】');
            }

            $url = add_querystring_var($url,"backUrl",$backUrl);

            if($active==1){
                $portalurl = urlencode($url);
                $url = add_querystring_var($active_url,"backUrl",$portalurl);
            }
        }
        catch(\Think\Exception $e)
        {
            \Home\Lib\Utility\LogHelper::Error('IndexController->index :: $message - 【'.$e->getMessage().'】');

            $url.="?usercode=".$usercode."&user_session=".$user_session."&websitecode=".$sitecode;
        }
        \Home\Lib\Utility\LogHelper::Debug('redirecturl - ['.$url.']');
        redirect($url);
    }

     public function showpage(){
    	$this -> formatResolution();
        $this -> display('index_new');
    }
}