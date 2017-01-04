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
        var m_baseUrl = '/list/wudui?';
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
            
    <?php echo loadfile('/app/Home/Public/css/dance/wudui','css');?>
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
	<h2 style="background:url(/app/Home/Public/img/list/wudui/sign_wu.png) no-repeat 118px 23px;">酷炫舞队</h2>
</div>
<div class="list">
	<div class="dance_load">
		<dl id="dl1" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl2" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl3" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl4" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl5" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl6" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl7" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
		<dl id="dl8" data-right="dl2" data-down="dl5">
			<dt><img src="/app/Home/Public/img/list/dance/dance.png" alt="" /></dt>
			<dd>人气：<span>9630个</span><i style="background:url(/app/Home/Public/img/list/wudui/zan.png) no-repeat;"></i></dd>
			<dd>舞队：<span>张春丽</span></dd>	
		</dl>
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