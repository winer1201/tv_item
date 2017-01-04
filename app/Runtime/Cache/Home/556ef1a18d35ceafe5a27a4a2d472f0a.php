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
        var m_baseUrl = '/goods/info?usercode=1010000101160830023804069&amp;user_session=10100001-351c565b-9a1a-465e-8569-6649fefa52ed&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FColumnPage%2Findex%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-351c565b-9a1a-465e-8569-6649fefa52ed%26websitecode%3D%26navcode%3D%26columncode%3DCM20161014001%26backId%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-351c565b-9a1a-465e-8569-6649fefa52ed%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd1%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=58598&amp;_v=85792';
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
            
    <?php echo loadfile('/app/Home/Public/js/mod/goods/goods_info','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
    var img_sel = "/app/Home/Public/img/goods/sel_select.png";
    var img_unsel = "/app/Home/Public/img/goods/sel_unselect.png";
</script>
<div class="goods-top">
    <div class="goods-info-title" id="page-title">
        <label id="lbltitle">欧姆龙电子血压计</label>
    </div>
</div>
<div class="goods-center" id="page_content">
	<div class="arrow" style="position:absolute;left:152px;bottom:14px;">
		<img src="../../app/home/Public/img/goods/arrow_down.png" alt="" />
	</div>
    <div style="height:30px;">
        <label style="margin-left:700px;font-size:32px;color:#ff0000;">1609</label>
        <label style="margin-left:0px;font-size:21px;color:#eeeeee;">元起</label>
        <label style="margin-left:50px;font-size:21px;color:#eeeeee;display:inline-block;height:45px;width:126px;line-height:45px;background:url(../../app/home/Public/img/goods/shop.png) no-repeat" class="goods-item-focus">立即购买</label>
    </div>
    <div class="goods-info-form" id="dform">
        <!--<img src="/app/Home/Public/img/goods/goods_xyj_1.png" />-->
    </div>
    <div class="goods-info-sel" id="dsel">
        <!--<img src="/app/Home/Public/img/goods/sel_select.png" />
        <img src="/app/Home/Public/img/goods/sel_unselect.png" />
        <img src="/app/Home/Public/img/goods/sel_unselect.png" />-->
    </div>
    <div class="goods-form-right" style="margin-top:-327px;" id="d_right">
        <img src="../../app/home/Public/img/exam/exam_right.png" />
    </div>
    <div class="goods-form-left" style="margin-top:-327px;" id="d_left">
        <img src="../../app/home/Public/img/exam/exam_left.png" />
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