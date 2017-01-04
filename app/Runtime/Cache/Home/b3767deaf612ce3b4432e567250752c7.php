<?php if (!defined('THINK_PATH')) exit();?>﻿<html>
<head>
    <meta name="page-view-size" content="<?php echo ($reso); ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>养老门户</title>
    <?php echo loadfile('/app/Home/Public/css/deep_blue/layout','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/util','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/keyevent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/controlEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/formevent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/popupEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/enumCollection','js');?>
    <?php echo loadfile('/app/Home/Public/js/tools/guid','js');?>
    <?php echo loadfile('/app/Home/Public/js/tools/loadimg','js');?>
    <?php echo loadfile('/app/Home/Public/js/tools/useraction','js');?>
    <?php echo loadfile('/app/Home/Public/js/tools/CyberHelper','js');?>
    <?php echo loadfile('/app/Home/Public/js/tools/MsgHelper','js');?>
    <?php echo loadfile('/app/Home/Public/js/globalconfig','js');?>
    <?php echo loadfile('/app/Home/Public/js/common','js');?>
    <script type="text/javascript">
        var m_reso = '<?php echo ($reso); ?>';
        var m_publicUrl = '/app/Home/Public';
        var m_baseUrl = '/index/showpage?usercode=1010000116081503235537701&amp;user_session=10100001-e15bd759-6f30-4aa4-8318-15bdb393b03e&amp;websitecode=WS20161215001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15008%2F%3Fwebsitecode%3DWS20161215001%26exit%3D1';
        var m_rootUrl = '';
        var m_usercode = '';
        var m_user_session = '';
        var m_areacode = '';
        var m_websitecode = '';
        var m_tp_tps_url = "<?php echo ($tp_tps_url); ?>";
        var m_tp_pms_url = "<?php echo ($tp_pms_url); ?>";
        var m_tp_cbs_url = "<?php echo ($tp_cbs_url); ?>";
        var m_tp_ls_url = "<?php echo ($tp_ls_url); ?>";
        var m_tp_tvportal_url = "<?php echo ($tp_tvportal_url); ?>";
        var m_tp_gsm_url = "<?php echo ($tp_gsm_url); ?>";
        var m_tp_pics_url = "<?php echo ($tp_pics_url); ?>";
        var m_cyber_tvportal_id = "<?php echo ($cyber_tvportal_id); ?>";
        var m_cyber_tenantid = "<?php echo ($cyber_tenantid); ?>";
        var m_cyber_epg_id = "<?php echo ($cyber_epg_id); ?>";
    </script>
</head>
<body onload="init()">
    <div class="wp" id="divwp" >
        <div class="page">
            
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/tableEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/navevent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/index/index','js');?>
    <?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
            
    }
    
</script>
<style>
	table{
		position:absolute;
		left:110px;
		top:3px;
	}
</style>
<div class="message"style="position:absolute;left:746px;top:15px;height:50px;width:260px;display:none;">
	<span style="position:absolute;left:120px;top:10px;display:block;width:1px;height:20px;background:url(/app/Home/Public/img/ToolBar/xian.png) no-repeat;"></span>
	<span style="position:absolute;left:252px;top:10px;display:block;width:1px;height:20px;background:url(/app/Home/Public/img/ToolBar/xian.png) no-repeat;"></span>
	<span style="display:block;position:absolute;left:260px;top:3px;height:34px;width:40px;background:url(/app/Home/Public/img/ToolBar/hong.png) no-repeat;">
		<i style="position:absolute;left:43px;top:-1px;font-size:20px;font-style: normal;color:red;">(3)</i>
	</span>
	<span style="display:block;height:42px;width:146px;position:absolute;left:130px;top:0px;">
		<i  id="weather"style="display:block;height:29px;width:38px;margin-right:5px;float:left;">	
		</i>
		<em id="tian_num"style="font-size:9px;float:left;font-style: normal;line-height:42px;font-size:18px;">晴转多云</em>
	</span>
	<span style="display:block;position:absolute;left:0px;top:0;height:40px;width:118px;line-height:40px;font-size:24px;letter-spacing: 2px;" id="show">	
	</span>
</div>
<script>
	 var show = document.getElementById("show");
	  setInterval(function() {
	   var time = new Date();
	   var second=time.getSeconds();
	   var hours=time.getHours();
	   var minutes=time.getMinutes();
	   if(second<10){
	   	second="0"+second;
	   }
       if(hours<10){
	   	hours="0"+hours;
	   }
	   if(minutes<10){
	   	minutes="0"+minutes;
	   }
	   var t =  hours + ":"
	     + minutes + ":" + second;
	   show.innerHTML = t;
	  }, 1000);
</script>
<div id="page_navbar" style="padding-left:128px;padding-top:30px;" class="page-navbar">
</div>
<div id="page_content" style="height:511px;padding-left:110px;margin-top:130px;position:relative;" class="page-content">
</div>

<div class="page-footer">
                <div id="footer" class="tip">
                    <label>按&lt;返回&gt;键返回上一页</label>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        common.initUrl();
        TpMsgHelper.Init();
    </script>
</body>
</html>