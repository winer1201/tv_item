<?php
namespace Home\Controller;
use Think\Controller;
class ConfigController extends BaseController {
    public function index(){        
       $areacode = I('areacode');
       $configtype = I('configtype');
       $configkey = I('configkey');
       $result = returnJsonData(1,'unknow error');
      header("Access-Control-Allow-Origin:*");
       $request = array(
			"areacode" => $areacode,
			"configtype" => $configtype,
			"configkey" => $configkey
			);
       //\Home\Lib\Utility\LogHelper::Info('ConfigController->index :: $areacode - 【'.$e->getMessage().'】');
       try{
	       if($areacode == null || $areacode == "")
	       {
	       		$result = returnJsonData(1,'areacode can not be null or empty.');
	       }
	       else{
				\Home\Lib\Service\ConfigCacheService::RestConfigList($request);	

				$result = returnJsonData(0,'success');
	       }
       }
       catch(\Think\Exception $e){
       		\Home\Lib\Utility\LogHelper::Error('ConfigController->index :: $message - 【'.$e->getMessage().'】');
       }

       $this->ajaxReturn($result,'json');
    }
}