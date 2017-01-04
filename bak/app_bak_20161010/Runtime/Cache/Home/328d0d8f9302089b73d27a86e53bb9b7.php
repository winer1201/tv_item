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
        var m_baseUrl = '/video?content_code=CT032016082400021&amp;usercode=1010000101160922042001323&amp;user_session=10100001-c329d089-165f-4493-a82a-943b21ac459e&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160922042001323%26user_session%3D10100001-c329d089-165f-4493-a82a-943b21ac459e%26websitecode%3D%26navcode%3DCM20160815002%26focusid%3Dtd3%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=3819';
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
        var m_cyber_tvportal_id = "<?php echo ($cyber_tvportal_id); ?>";
        var m_cyber_tenantid = "<?php echo ($cyber_tenantid); ?>";
        var m_cyber_epg_id = "<?php echo ($cyber_epg_id); ?>";
    </script>
</head>
<body onload="init()">
    <!--style="background-image: url(/app/Home/Public/img/BG.png);"-->
    <div class="wp" id="divwp">
        <div class="page">﻿
    <?php echo loadfile('/app/Home/Public/css/deep_blue/info','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/video/videoinfo','js');?>
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