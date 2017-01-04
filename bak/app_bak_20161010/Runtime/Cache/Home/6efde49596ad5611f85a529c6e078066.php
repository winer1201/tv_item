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
        var m_baseUrl = '/oldcard/list?usercode=1010000101160922042001323&amp;user_session=10100001-c329d089-165f-4493-a82a-943b21ac459e&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160922042001323%26user_session%3D10100001-c329d089-165f-4493-a82a-943b21ac459e%26websitecode%3D%26navcode%3DCM20160815002%26focusid%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=44942';
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
    <div class="wp" id="divwp" >
        <div class="page">
            ﻿
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?> 
    <?php echo loadfile('/app/Home/Public/css/deep_blue/addcard','css');?> 
    <?php echo loadfile('/app/Home/Public/js/base/new2.0/tableevent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/oldcard/oldcard_list_new','js');?>
    <!--<?php echo loadfile('/app/Home/Public/js/base/tableEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/oldcard/oldcard_list','js');?>-->
<!--<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>-->

<style type="text/css">
    .tile img {
        width: 195px;
        height: 204px;
    }
</style>

<div class="oldcard-page-list-title">
    <div class="oldcard-list-title ">
        <label>老年卡列表页</label>
        <hr />
    </div>
</div>
<div class="oldcard-page-list oldcard-page-list-oldcard">
    <table  width="560" class="layout">
        <tbody>
            <tr>
                <td id="td0" cardid="1" style="width: 195px; height: 204px;" jump-url="oldcardinfo.html" data-down="" data-right="td1">
                    <div class="tile">
                        <img class="lazy" src="/app/Home/Public/img/list_oldcard/card001.png" data-src="/app/Home/Public/img/list_oldcard/card001.png">
                    </div>
                </td>
                <td id="td1" cardid="2" style="width: 195px; height: 204px;" jump-url="oldcardinfo.html" data-down="" data-right="td2" data-left="td0">
                    <div class="tile">
                        <img class="lazy" src="/app/Home/Public/img/list_oldcard/card002.png" data-src="/app/Home/Public/img/list_oldcard/card002.png">
                    </div>
                </td>
                <td id="td2" cardid="3" style="width: 195px; height: 204px;" jump-url="oldcardinfo.html" data-down="" data-right="td3" data-left="td1">
                    <div class="tile">
                        <img class="lazy" src="/app/Home/Public/img/list_oldcard/card003.png" data-src="/app/Home/Public/img/list_oldcard/card003.png">
                    </div>
                </td>
                <td id="td3" styletileoldcardwidth: 195px; height: 204px;" jump-url="addoldcard.html" data-down="" data-right="" data-left="td2">
                    <div class="tile">
                        <img class="lazy" src="/app/Home/Public/img/list_oldcard/addoldcard.png" data-src="/app/Home/Public/img/list_oldcard/addoldcard.png">
                    </div>
                </td>
                <td id="td4" style="width: 195px; height: 204px;" >
                    
                </td>
            </tr>
        </tbody>
    </table>
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