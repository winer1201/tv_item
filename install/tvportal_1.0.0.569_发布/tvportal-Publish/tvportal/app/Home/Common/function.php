<?php

	function p($data){
		echo '<pre>';
		echo dump($data);
	}

	function loadfile($filepath,$filetype){

		$output="";

		if($filetype=="")
			$filetype = "js";
		if($filetype == "js")
		{
			$output = '<script src="'.$filepath.'.js?_v='.C('Version').'"></script>';
		}
		elseif($filetype == "css"){
			$output = '<link rel="stylesheet" href="'.$filepath.'.css?_v='.C('Version').'"/>';
		}

		echo $output;
	}

	function getareacode($str){
	
		if(!$str)
			return "";
		if(strlen($str)<8)
			return $str;
		return substr($str,0,8);
	}

	function add_querystring_var($url, $key, $value) {
		 $url=preg_replace('/(.*)(?|&)'.$key.'=[^&]+?(&)(.*)/i','$1$2$4',$url.'&');
		 $url=substr($url,0,-1);
		 if(strpos($url,'?') === false){
		  return ($url.'?'.$key.'='.$value);
		 } else {
		  return ($url.'&'.$key.'='.$value);
		 }
	}


	function _Post($url, $data = null,$config=null)
	{
		 $context = array();
		 $time_out = C('http_timeout');
		 $method = 'POST';		 

		 if(!is_array($data))
		 	$data = array();

		 ksort($data);

		 $data = http_build_query($data, '', '&');

		 $head="Content-type: application/x-www-form-urlencoded\r\n".  
               "Content-length:".strlen($data)."\r\n" .   
               "Cookie: foo=bar\r\n" .   
               "\r\n";

		 if(is_array($config)){
		 	if($config["timeout"]!=null)
		 		$time_out = $config["timeout"];
		 	if($config["method"] != null)
		 		$method = $config["method"];
		 	if($config["header"] != null)
		 		$head = $config["header"];
		 }


	     $context['http'] = array
	     (   
	         'timeout'=>$time_out,
	         'method' => $method,
	         'header' =>$head,
	         'content' => http_build_query($data, '', '&'),
	     );		 

		 return file_get_contents($url, false, stream_context_create($context));
	}

	function Http($url,$data=null,$timeout=null,$method='POST'){
		$apt = array(
			'method' => $method,
			'timeout' => $timeout
			);
		return _Post($url,$data,$apt);
	}

	function returnJsonData($errcode,$errdesc){
		$result['status']=$errcode;
		$result['desc']=$errdesc;
		return $result;
	}

	function initConfig($areacode){
		\Home\Lib\Utility\LogHelper::Info('function->initConfig :: $areacode - 【'.$areacode.'】');
		$list = \Home\Lib\Service\ConfigCacheService::getlist($areacode);
		C($list);
	}
?>