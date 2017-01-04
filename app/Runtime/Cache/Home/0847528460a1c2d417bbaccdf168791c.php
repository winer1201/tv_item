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
        var m_baseUrl = '/exam/bloodoxygen?newreach_token=d003e0b7c62e43f7bb9e82c14d133154&amp;usercode=1010000101160922042001323&amp;areacode=10100001&amp;user_session=10100001-7e5313e3-cd45-4cfc-bb0f-917801c47ac4&amp;websitecode=WS20160912001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160922042001323%26user_session%3D10100001-7e5313e3-cd45-4cfc-bb0f-917801c47ac4%26websitecode%3DWS20160912001%26navcode%3DCM20160912001%26focusid%3Dtd3%26pian%3D110%26newreach_token%3Dd003e0b7c62e43f7bb9e82c14d133154%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160922042001323%2526user_session%253D10100001-7e5313e3-cd45-4cfc-bb0f-917801c47ac4%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd4%2526pian%253D110%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=86533';
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
    <?php echo loadfile('/app/Home/Public/js/mod/exam/exam_bloodoxygen','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="page-list-title">
    <div class="list-title" id="page-title">
        <label id="lbltitle">健康档案 - 血氧</label>
    </div>
</div>
<div class="page-list" id="page_content">
    <div class="exam-form-bg" style="background:url(/app/Home/Public/img/exam/exam_bg.png);padding:0px;">
        <div class="exam-from-col">
            <label class="exam-from-col-label">本段时间内，您总共测量了180次血氧，其中：</label>
        </div>
        <div class="exam-from-col">
            <label class="exam-from-col-label">血氧正常：</label>
            <label class="exam-form-label-green">173次</label>
            <label class="exam-from-col-label">，偏低：</label>
            <label class="exam-form-label-red">6次</label>
            <label class="exam-from-col-label">，过低：</label>
            <label class="exam-form-label-red">1次</label>
        </div>
        <div class="exam-from-col">
            <label class="exam-from-col-label">如果您对数据报告有任何疑问，请及时咨询私人医生。</label>
        </div>
    </div>
    <div class="exam-form-right">
        <img src="../../app/home/Public/img/exam/exam_right.png" />
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