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
        var m_baseUrl = '/list/dance?usercode=1010000101160922042001323&amp;user_session=10100001-1a08e0a0-2f01-432f-9386-15cb2f796a0f&amp;websitecode=WS20160815001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15008%2F%3Fexit%3D1';
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
            
    <?php echo loadfile('/app/Home/Public/css/dance/dance','css');?>
    <?php echo loadfile('/app/Home/Public/css/reset','css');?>
    <?php echo loadfile('/app/Home/Public/css/deep_blue/info','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/dance/dance','js');?>
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
<div id="header">
	<h2 id="category_name"style="background:url(/app/Home/Public/img/list/dance/sign.png) no-repeat 118px 11px;">最新热舞</h2>
</div>
<div class="list">
	<div class="dance_load clear">
		<div class="tui_wrap"></div>
		<!--<dl id="dl1" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl id="dl2" data-right="dl3" data-down="dl6" data-left="dl1">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>
		<dl>
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>舞曲：<span><<马兰花>></span></dd>
			<dd>作者：<span>张春丽</span></dd>
			<dd style="position:relative;padding-left:23px;padding-bottom:6px;"><span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i>3.46万</span></dd>
		</dl>-->
	</div>
</div><div class="page-footer">
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