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
        var m_baseUrl = '/list/list_search?usercode=1010000101160922042001323&amp;user_session=10100001-baf11d3c-dcf1-4382-ab49-45109b0a9672&amp;websitecode=WS20160815001&amp;areacode=10100001&amp;category_code=DG0000005003&amp;position=1&amp;focusid=td_250&amp;cur_categorycode=DG0000005003001&amp;times=3&amp;cr=25&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15008%2F%3Fexit%3D1&amp;_v=72761';
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
    <?php echo loadfile('/app/Home/Public/js/mod/list/list_search','js');?>
<?php echo loadfile('/app/Home/Public/js/tools/titleRollTool','js');?>

<style>
    .filter_bg{
        background-image:url(/app/Home/Public/img/list_search/filter_bg.png);
        margin-bottom:10px;
    }
     .filter_bg_select{
        background-image:url(/app/Home/Public/img/list_search/filter_bg_select.png);
        margin-bottom:10px;
    }
    .colname{
        white-space:nowrap;text-overflow:ellipsis;overflow:hidden;
    }
</style>
<div class="page-list-title" style="margin-left:110px;">
    <div class="list-title" style="margin-left:10px;" id="page-title">
      
            <label id="lbltitle"></label>
        </div>        
</div>

<div class="page-list" id="page_content">
    <div class="list-page-left" >
        <div style="margin-bottom:10px;display:none;" id="dv_up">
            <div class="list-page-left-container"  style="height:39px;">
                <img src="/app/Home/Public/img/list_search/filter_pre.png" />
            </div>
        </div>
        <div id="dvCategoryList" style="height:440px;overflow:hidden;">
            <div id="dv_offset">
            </div>
        </div>       
        <div style="margin-top:10px;display:none;" id="dv_down">
            <div class="list-page-left-container" style="height:39px;">
            <img src="/app/Home/Public/img/list_search/filter_next.png" />
            </div>
        </div>
    </div>
    <div style="margin-left:310px;margin-top:0px;overflow:hidden">
        <div id="tbcontainer">
            <table class="layout" id="dtlist">
               
            </table>
        </div>
    </div>
</div>

    <?php echo loadfile('/app/Home/Public/js/mod/list/list_search_yuestart','js');?>
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