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
        var m_baseUrl = '/exam/sleep_data?usercode=1010000101160830023804069&amp;user_session=10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb&amp;websitecode=WS20160912001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%26websitecode%3DWS20160912001%26navcode%3DCM20160912001%26focusid%3Dtd5%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%2526websitecode%253D%2526navcode%253DCM20160912002%2526focusid%253Dtd1%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=79815';
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
    <?php echo loadfile('/app/Home/Public/js/mod/exam/exam_sleep_data','js');?>

<script type="text/javascript">
    var arrowurl = "/app/Home/Public/img/exam/exam_arrow.png";
    var arrow_down_url = "/app/Home/Public/img/exam/exam_arrow_down.png";
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style type="text/css">
    table {
        border-collapse: collapse;
        border: none;
        width: 200px;
    }

    td {
        border: solid #000 1px;
        border-color: #555555;
    }

    th {
        border: solid #000 1px;
        border-color: #555555;
    }
</style>
<div class="page-list-title">
    <div class="list-title" id="page-title">
        <label class="exam-form-title" id="lbltitle">健康档案 - 睡眠历史数据</label>
    </div>
</div>
<div class="page-list" id="page_content">
    <div class="exam-form-bg" style="background:url(/app/Home/Public/img/exam/exam_bg.png);padding:0px;">
        <table class="exam-form-table">
            <thead style="background-color:#132037;">
                <tr>
                    <th >
                        <label>日期</label>
                    </th>
                    <th >
                        <label>入睡时间</label>                      
                    </th>
                    <th >
                        <label>醒来时间</label>
                    </th>
                    <th >
                        <label>醒的次数</label>
                    </th>
                    <th>
                        <label>总睡眠</label>
                        <br />
                        <label>时间</label>
                    </th>
                    <th>
                        <label>浅睡眠</label>
                        <br />
                        <label>时间</label>
                    </th>
                    <th>
                        <label>深度睡眠</label>
                        <br />
                        <label>时间</label>
                    </th>
                    <th>
                        <label>清醒时间</label>
                    </th>
                    <!--<th>
                        <label>卧床时间</label>
                    </th>-->
                    <th>
                        <label>测量设备</label>
                    </th>
                </tr>
            </thead>
            <tbody id="tbbody" class="exam-form-table"></tbody>
        </table>
    </div>
    <div class="exam-form-left">
        <img src="../../app/home/Public/img/exam/exam_left.png" />
    </div>
    <div class="exam-form-up" id="upctr">
        <img src="../../app/home/Public/img/exam/exam_up.png" />
    </div>
    <div class="exam-form-down" id="downctr">
        <img src="../../app/home/Public/img/exam/exam_down.png" />
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