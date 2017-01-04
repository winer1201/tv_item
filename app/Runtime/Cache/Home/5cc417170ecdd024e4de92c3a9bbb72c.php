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
        var m_baseUrl = '/exam/temperature_trend?usercode=1010000101160830023804069&amp;user_session=10100001-78aa0d86-2a98-4827-b742-c32a9e6118e9&amp;websitecode=WS20160912001&amp;newreach_token=7d0faa9090014e9eaadeff48f7b51603&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-78aa0d86-2a98-4827-b742-c32a9e6118e9%26websitecode%3DWS20160912001%26navcode%3DCM20160912001%26focusid%3Dtd7%26newreach_token%3D7d0faa9090014e9eaadeff48f7b51603%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252FColumnPage%252Findex%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-78aa0d86-2a98-4827-b742-c32a9e6118e9%2526websitecode%253D%2526navcode%253D%2526backId%253Dtd4%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15010%25252Findex%25252Fshowpage%25253Fusercode%25253D1010000101160830023804069%252526user_session%25253D10100001-78aa0d86-2a98-4827-b742-c32a9e6118e9%252526websitecode%25253D%252526navcode%25253DCM20160815003%252526focusid%25253Dtd0%252526backUrl%25253Dhttp%2525253A%2525252F%2525252F10.10.20.11%2525253A15008%2525252F%2525253Fexit%2525253D1&amp;_v=11639';
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
            ﻿
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?>
    <?php echo loadfile('/app/Home/Public/js/mod/exam/exam_temperature_trend','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="page-list-title">
    <div class="list-title" id="page-title">
        <label class="exam-form-title" id="lbltitle">健康档案 - 体温趋势图</label>
    </div>
</div>
<div class="page-list" id="page_content">
    <!--
    background:url(/app/Home/Public/img/exam/exam_temperature_trend.png);
        486px
    -->

    <div class="exam-form-bg" id="dimg"  style="padding:0px;height:420px;">

    </div>
    <div class="exam-form-right" style="margin-top:-327px;">
        <img src="../../app/home/Public/img/exam/exam_right.png" />
    </div>
    <div class="exam-form-left" style="margin-top:-327px;">
        <img src="../../app/home/Public/img/exam/exam_left.png" />
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