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
        var m_baseUrl = '/video/info?content_code=CT032016081600029&amp;usercode=1010000101160922042001323&amp;user_session=10100001-baf11d3c-dcf1-4382-ab49-45109b0a9672&amp;websitecode=WS20160815001&amp;areacode=10100001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Flist%2Flist_search%3Fusercode%3D1010000101160922042001323%26user_session%3D10100001-baf11d3c-dcf1-4382-ab49-45109b0a9672%26websitecode%3DWS20160815001%26areacode%3D10100001%26category_code%3DDG0000005003%26position%3D1%26focusid%3Dtd_250%26cur_categorycode%3DDG0000005003001%26times%3D3%26cr%3D25%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=74641';
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
    <?php echo loadfile('/app/Home/Public/css/deep_blue/info','css');?>
    <?php echo loadfile('/app/Home/Public/js/mod/video/vedioinfo_new','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>

<div class="info-left-pic">
    <img id="poster" class="lazy" src="" data-src="">
</div>
<div class="info-right-content">
    <div class="info-title">
        <label id="lblname"></label>
    </div>
    <div class="info-line">
        <img class="lazy" src="/app/Home/Public/img/videoinfo/video_line.png" data-src="/app/Home/Public/img/videoinfo/video_line.png">
    </div>
    <div class="app-desc-title">
        <label id="lbldirector">导演：</label>
    </div>
    <div class="app-useinfo">
        <label id="lblstars">演员：</label>
    </div>
    <div class="app-useinfo">
        <label></label>
    </div>
    <div class="app-desc">
        <label id="lbldesc"></label>
    </div>
    <div class="info-buttons">
        <div>
            <img class="lazy" id="btnPlay" data-right="btnCollect" data-left="btnCollect" src="/app/Home/Public/img/videoinfo/video_playdefault.png" data-src="/app/Home/Public/img/videoinfo/video_playdefault.png">
        </div>
        <div id="dchoice" style="display:none;">
            <img class="lazy" id="btnChoice" src="/app/Home/Public/img/videoinfo/video_choicedefault.png" data-src="/app/Home/Public/img/videoinfo/video_choicedefault.png">
        </div>
        <div>
            <img class="lazy" id="btnCollect" data-right="btnPlay" data-left="btnPlay" src="/app/Home/Public/img/videoinfo/video_collectdefault.png" data-src="/app/Home/Public/img/videoinfo/video_collectdefault.png">
        </div>
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