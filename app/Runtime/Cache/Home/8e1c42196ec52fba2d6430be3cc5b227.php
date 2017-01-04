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
        var m_baseUrl = '/oldcard/add?usercode=1010000101160830023804069&amp;user_session=10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Foldcard%2Flist%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%26websitecode%3D%26focusid%3Dtd2%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252FColumnPage%252Findex%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%2526websitecode%253D%2526navcode%253D%2526columncode%253DCM20160815002%2526backId%253Dtd3%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15010%25252Findex%25252Fshowpage%25253Fusercode%25253D1010000101160830023804069%252526user_session%25253D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%252526websitecode%25253D%252526navcode%25253DCM20160815003%252526focusid%25253Dtd0%252526backUrl%25253Dhttp%2525253A%2525252F%2525252F10.10.20.11%2525253A15008%2525252F%2525253Fexit%2525253D1&amp;_v=32119';
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
    <?php echo loadfile('/app/Home/Public/css/deep_blue/addcard','css');?>
    <?php echo loadfile('/app/Home/Public/js/mod/oldcard/oldcard_add','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>

<div class="oldcard-page-list-title">
    <div class="oldcard-list-title " >
        <label >老年卡绑定页</label>
        <hr style="height:1px;border:none;border-top:1px solid #555555;" />
    </div>
</div>
<div class="page-addcard">
    <div class="form-item">
        <div class="item-1">
            <div>
                <label>请输入卡号：</label>
            </div>
        </div>
        <div class="item-2">
            <input type="text" class="item-text " value="卡号" readonly="readonly" maxLength="23" id="txtcardno" data-down="txtphoneno" />
        </div>
    </div>
    <div class="form-item">
        <div class="item-1"><label>手机号：</label></div>
        <div class="item-2">
            <input type="text" class="item-text" value="银行预留手机号" readonly="readonly" maxLength="11" id="txtphoneno" data-down="txtveritycode" data-right="btnverity" data-up="txtcardno" />
        </div>
        <div class="item-2">
            <img type="button" class="item-button btnval" src="/app/Home/Public/img/add_oldcard/vcode.png" id="btnverity" data-up="txtcardno" data-left="txtphoneno" data-down="txtveritycode" />
            <label id="lblnum" class="lblval">60</label>
        </div>
    </div>
    <div class="form-item">
        <div class="item-1">
            <label>验证码：</label>
        </div>
        <div class="item-2">
            <input type="text" class="item-text" value="验证码" readonly="readonly" maxLength="6" id="txtveritycode" data-up="txtphoneno" data-down="btnsubmit" />
        </div>

    </div>
    <div class="form-item">
        <div class="item-1"></div>
        <div class="item-2">
            <img type="button" class="item-button bg" src="/app/Home/Public/img/add_oldcard/tjd.png" id="btnsubmit" data-up="txtveritycode" />
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