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
        var m_baseUrl = '/accompany?usercode=1010000101160830023804069&amp;user_session=10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-5a6f1d44-e64f-40e8-8ba8-a49e8dc262cb%26websitecode%3D%26navcode%3DCM20160912004%26focusid%3Dtd1%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=59261';
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
            
    <?php echo loadfile('/app/Home/Public/js/mod/accompany/accompany_index','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="list-category-top">
    <div class="list-category-title" id="page-title">
        58-陪护
    </div>
</div>
<div class="list-category-content" id="page_content">
   <div style="margin-top:20px;">
       <img src="/app/Home/Public/img/peihu/index_bg.png" />
   </div>
    <div style="margin-top:-40px;text-align:center">
        <label style="font-size:18px;color:#eeeeee;">提供一站式找保姆、钟点工、月嫂、育婴师、育儿嫂等陪护服务</label>
        <br />
        <label style="font-size:18px;color:#eeeeee;">让我们一起来寻找最合心意的服务吧~</label>
    </div>
    <div style="margin-top:50px;text-align:center">
        <label style="text-align:center;padding:5px;padding-left:20px;padding-right:20px;font-size:22px;" id="btn_next">下一步</label>
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