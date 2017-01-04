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
        var m_baseUrl = '/ToolBar/index?areacode=undefined&amp;usercode=1010000116081503235537701&amp;user_session=10100001-dc44a897-f73d-416a-b4dc-cf63a62c0f72&amp;websitecode=WS20161215001&amp;xuan=li2&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000116081503235537701%26user_session%3D10100001-dc44a897-f73d-416a-b4dc-cf63a62c0f72%26websitecode%3DWS20161215001%26navcode%3DCM20161215001%26focusid%3Dtd1%26pian%3D110%26areacode%3D10100001%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fwebsitecode%253DWS20161215001%2526exit%253D1&amp;_v=55639';
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
            
	<?php echo loadfile('/app/Home/Public/css/reset','css');?>
	<?php echo loadfile('/app/Home/Public/js/base/new2.0/tableEvent','js');?>
	<?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>  
	<?php echo loadfile('/app/Home/Public/css/toolBar/toolBar','css');?>    
	<?php echo loadfile('/app/Home/Public/js/mod/toolBar/toolBar','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div id="content_tool"style="background:url(/app/Home/Public/img/bg1.png) no-repeat;">
	<div class="wrap_tool">
		<ul class="tool_load">
			<!--<li data-right='li2' id="li1" style="background:url(/app/Home/Public/img/ToolBar/my12.png) no-repeat;"></li>
			<li data-right='li3' data-left='li1' id="li2" style="background:url(/app/Home/Public/img/ToolBar/xi21.png) no-repeat;"></li>
			<li data-right='li4' data-left='li2' id="li3" style="background:url(/app/Home/Public/img/ToolBar/shou31.png) no-repeat;"></li>
			<li data-left='li3' id="li4" style="background:url(/app/Home/Public/img/ToolBar/zui41.png) no-repeat;"></li>-->
		</ul>
	</div>
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