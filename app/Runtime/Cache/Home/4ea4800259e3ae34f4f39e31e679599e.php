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
        var m_baseUrl = '/info/wu_details?usercode=1010000116081503235537701&amp;user_session=10100001-e15bd759-6f30-4aa4-8318-15bdb393b03e&amp;websitecode=WS20161215001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15008%2F%3Fwebsitecode%3DWS20161215001%26exit%3D1';
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
            
    <?php echo loadfile('/app/Home/Public/css/details/wu_details','css');?>
    <?php echo loadfile('/app/Home/Public/css/reset','css');?>
    <?php echo loadfile('/app/Home/Public/css/deep_blue/info','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/details/wu_details','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style>
	.page{
		background: url(/app/Home/Public/img/bg1.png) no-repeat;
	}
</style>
<div id="mask"></div>
<div id="tishi" style="background:url(/app/Home/Public/img/wudui/man1.png) no-repeat"></div>
<div id="sao" style="background-image:url(/app/Home/Public/img/wudui/erweinew.png);">
	<span>微信扫一扫<br />转发到朋友圈</span>
	<i style="background:url(/app/Home/Public/img/wudui/friend.png) no-repeat;"></i>
</div>
<div class="sign">
	<h2 id="album"style="background:url(/app/Home/Public/img/wudui/ming.png) no-repeat 0px 20px;"></h2>
</div>
<div class="video_content">
	<div class="video_lt">
		<video src="http://10.10.20.11:15150/video/guanggao/omron_xyj.mp4" id="video" width="462" height="296" controls poster="/app/Home/Public/img/details/poster.png"></video>
	</div>
	<div class="video_rt">
		<ul>
			<li>人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;气：<span id="wu_zan">已有0人点赞</span></li>
			<li>舞&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;队：<span id="dancename"></span></li>
			<li style="height:186px;overflow: hidden;">舞队简介：<span id="abstract">王广成广场舞队带来一支简单好看的广场舞<今生路>，轻盈欢快的舞姿，自由律动的舞步，优雅大方的动作，视频附有详细的动作分解，欢迎大家来学习和欣赏！</span></li>
		</ul>
		<div class="btn">
			<span id="sp1" data-right="sp2"data-down="li1"style="background:url(/app/Home/Public/img/details/btn.png) no-repeat;left:0px;">点赞</span>
			<span id="sp2" data-right="sp3"data-left="sp1"data-down="li1"style="background:url(/app/Home/Public/img/details/btn.png) no-repeat;left:150px;">播放</span>
			<span id="sp3" data-right="sp4"data-left="sp2"data-down="li1"style="background:url(/app/Home/Public/img/details/btn.png) no-repeat;left:300px;">全屏</span>
			<span id="sp4" data-right="li1"data-left="sp3"data-down="li1"style="background:url(/app/Home/Public/img/details/btn.png) no-repeat;left:450px;">转发</span>
		</div>
	</div>
</div>
<div class="video_list">
	<ul style="width:4000px;position:absolute;left:0;top:0;"class="tuo">
		<!--<li id="li1"data-right="li2"data-left="sp3"data-up="sp1"style="background:url(/app/Home/Public/img/details/list.png) no-repeat"></li>
		<li id="li2"data-right="li3"data-left="li1"data-up="sp1"style="background:url(/app/Home/Public/img/details/list.png) no-repeat"></li>
		<li id="li3"data-right="li4"data-left="li2"data-up="sp1"style="background:url(/app/Home/Public/img/details/list.png) no-repeat"></li>
		<li id="li4"data-right="li5"data-left="li3"data-up="sp1"style="background:url(/app/Home/Public/img/details/list.png) no-repeat"></li>
		<li id="li5"data-right="li6"data-left="li4"data-up="sp1"style="background:url(/app/Home/Public/img/details/list.png) no-repeat"></li>
		<li id="li6"data-left="li5"data-up="sp1"style="background:url(/app/Home/Public/img/details/duo.png) no-repeat"></li>-->
	</ul>
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