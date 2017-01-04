<?php if (!defined('THINK_PATH')) exit();?>﻿<html>
<head>
    <meta name="page-view-size" content="<?php echo ($reso); ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>养老门户</title>
    <?php echo loadfile('/app/Home/Public/css/deep_blue/layout','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/util','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/keyevent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/controlEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/popupEvent','js');?>
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
        var m_baseUrl = '/my/gai?usercode=1010000116081503235537701&amp;user_session=10100001-dc44a897-f73d-416a-b4dc-cf63a62c0f72&amp;websitecode=WS20161215001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FToolBar%2Findex%3Fareacode%3Dundefined%26usercode%3D1010000116081503235537701%26user_session%3D10100001-dc44a897-f73d-416a-b4dc-cf63a62c0f72%26websitecode%3DWS20161215001%26xuan%3Dli2%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000116081503235537701%2526user_session%253D10100001-dc44a897-f73d-416a-b4dc-cf63a62c0f72%2526websitecode%253DWS20161215001%2526navcode%253DCM20161215001%2526focusid%253Dtd1%2526pian%253D110%2526areacode%253D10100001%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fwebsitecode%25253DWS20161215001%252526exit%25253D1&amp;_v=70415';
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
    <!--style="background-image: url(/app/Home/Public/img/BG.png);"-->
    <div class="wp" id="divwp">
        <div class="page">
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?>
    <?php echo loadfile('/app/Home/Public/css/reset','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/my/myinfo_gai','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style>
 .page{
	background:url(/app/Home/Public/img/bg1.png) no-repeat;
 }
 .info_wrap{
 	width:1060px;
 	height:465px;
 	margin:140px 110px 0px 110px; 
 	font-size:34px;
 	position: relative;
 }
 li{
 	width:700px;
 	height:60px;
 	
 }
 span{
 	display: block;
 	height:60px;
 	width:170px;
 	float:left;
 	line-height: 60px;
 	color:#bebdbd;
 	
 }
 p{
 	float:left;
 	height:60px;
 	line-height:60px;
 	color:#fff;
 	width:485px;
 }
 .head_pic{
 	position:absolute;
 	left:350px;
 	top:-25px;
 	height:166px;
 	width:166px;
 	border-radius: 50%;
 	background-size:100% 100% ;
 }
 .erweima{
 	position:absolute;
 	right:60px;
 	top:40px;
 	color:#fff;
 	line-height: 50px;
 }
 i{
 	display: block;
 	width:270px;
 	height:270px;
 	z-index:10;
 
 }
</style>
<div class="info_wrap">
	<div class="head_pic">
		
	</div>
	<div class="erweima">
		<i id="myqrcode"></i>
		<em>微信扫一扫<br/>完善个人信息</em>
	</div>
	<ul style="float:left;">
		<li >
			<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><p id="d_username"></p>
		</li>
		<li>
			<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span><p id="nicheng"></p>
		</li>
		<li>
			<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span><p id="sex"></p>
		</li>
		<li>
			<span>出生年月：</span><p id="birthday"></p>
		</li>
		<li>
			<span>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</span><p class="phone"id="d_phone"></p>
		</li>
		<li>
			<span>所属舞队：</span><p id="team"></p>
		</li>
	</ul>
</div><div class="page-footer">
                <div id="footer" class="tip">
                    <label>按&lt;返回&gt;键返回上一页</label>
                </div>
            </div>
        </div>
    </div>
    <!--<div tabindex="0" style="width: 1280px; height: 720px;" class="tp-popup-backdrop">
        <div tabindex="-1" id="box-title" class="tp-popup-box">
            <div id="sub" class="tp-popup-sub ">
                <div id="box-content" class="tp-popup-content">
                    this is test.
                </div>
            </div>
        </div>
    </div>-->
    <script type="text/javascript">
        common.initUrl();
        TpMsgHelper.Init();
    </script>
</body>
</html>