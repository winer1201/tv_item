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
        var m_baseUrl = '/my?usercode=1010000101160922042001323&amp;user_session=10100001-c329d089-165f-4493-a82a-943b21ac459e&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160922042001323%26user_session%3D10100001-c329d089-165f-4493-a82a-943b21ac459e%26websitecode%3D%26navcode%3DCM20160815002%26focusid%3Dtd1%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=5172';
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
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?>
    <!--<?php echo loadfile('/app/Home/Public/css/list_oldcard','css');?>-->
    <?php echo loadfile('/app/Home/Public/css/deep_blue/addcard','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/my/myinfo','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>

<div class="page-list-title">
    <div class="list-title ">
        <label>个人信息</label>
        <hr  />
    </div>
</div>
<div class="page-addcard">
    <div class="form-item" style="height:100%">
        <div class="item-1" style="width:355px;height:100%;margin-top:55px;">
            <div style="margin-right:55px">
                <img src="/app/Home/Public/img/myinfo/avatar.png" />
            </div>
        </div>
        <div class="item-2" style="margin-top:55px;">
            <div class="form-item form1">
                <div class="item-1 title1" >
                    <label>用户ID：</label>
                </div>
                <div class="item-2" id="d_usercode">
                    
                </div>
            </div>
            <div class="form-item form1">
                <div class="item-1 title1">
                    <label>设备ID：</label>
                </div>
                <div class="item-2" id="d_usermark">
                    
                </div>
            </div>
            <div class="form-item form1">
                <div class="item-1 title1">
                    <label>姓&nbsp&nbsp&nbsp&nbsp名：</label>
                </div>
                <div class="item-2" id="d_username">
                    
                </div>
            </div>
            <div class="form-item form1">
                <div class="item-1 title1">
                    <label>电&nbsp&nbsp&nbsp&nbsp话：</label>
                </div>
                <div class="item-2" id="d_phone">
                    
                </div>
            </div>
            <div class="form-item form1">
                <div class="item-1 title1">
                    <label>家庭住址：</label>
                </div>
                <div class="item-2" id="d_address">
                    
                </div>
            </div>
            <div class="form-item form1">
                <div class="item-1 title1">

                </div>
                <div class="item-2">
                    <!--<div style="background-image:url(img/myinfo/saved.png);width:192px;height:74px;"></div>-->
                </div>
            </div>
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