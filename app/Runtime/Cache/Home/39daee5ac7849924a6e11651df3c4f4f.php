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
        var m_baseUrl = '/my/message?usercode=1010000101161129032949881&amp;areacode=10100001&amp;user_session=10100001-cad63fda-ffdf-4900-98f8-307979591c39&amp;websitecode=WS20160815001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101161129032949881%26user_session%3D10100001-cad63fda-ffdf-4900-98f8-307979591c39%26websitecode%3DWS20160815001%26navcode%3DCM20160815001%26focusid%3Dtd2%26pian%3D110%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=29111';
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
    <!--style="background-image: url(/app/Home/Public/img/BG.png);"-->
    <div class="wp" id="divwp">
        <div class="page">﻿
    <!--<?php echo loadfile('/app/Home/Public/css/deep_blue/layout','css');?>-->
    <!--<?php echo loadfile('/app/Home/Public/demo/css/oldcard','css');?>-->
    <!--<?php echo loadfile('/app/Home/Public/demo/css/css','css');?>-->    
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/base/tableEvent','js');?>
    <!--<?php echo loadfile('/app/Home/Public/js/myinfo','js');?>-->
    <!--<?php echo loadfile('/app/Home/Public/demo/js/oldcard','js');?>-->
    <!--<?php echo loadfile('/app/Home/Public/demo/js/moveoldlist','js');?>-->
    <?php echo loadfile('/app/Home/Public/js/mod/my/mymessagelist','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="page-title-left" style="top:0px;margin-top:0px;height:84px;">
    <div class="list-title" style="margin-top: 27px;margin-left: 80px;width:1100px;" id="page-title">
        <label class="page-title-left-label">我的消息</label>
        <hr />
    </div>
    <div class="page-content" style="margin-top: 94px;">
        <div class="page-col page-message-list">
            <table id="datatable">
                <!--
                <tr>
                    <td id="td0" data-down="td1">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td1" data-down="td2" data-up="td0">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td2" data-down="td3" data-up="td1">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td3" data-down="td4" data-up="td2">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td4" data-down="td5" data-up="td3">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td5" data-down="td6" data-up="td4">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td6" data-down="td7" data-up="td5">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td7" data-down="td8" data-up="td6">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td8" data-down="td9" data-up="td7">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>
                <tr>
                    <td id="td9" data-up="td8">
                        <div class="tile" style="width:410px; height:33px; ">2015-03-28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【系统消息】 XXXX消息</div>
                    </td>
                </tr>

                -->
            </table>
        </div>
        <div class="page-col page-message-info">
            <table >
                <tr>
                    <td class="page-message-info-title" id="td_title">
                        <!--<h1>登陆送鸡蛋</h1>-->
                    </td>
                </tr>
                <tr>
                    <td class="page-message-info-content" id="td_date">
                    <!--<h2 >活动时间：2014年4月1日————2014年6月1日</h2>-->
                    </td>
                </tr>
                <tr>
                    <td class="page-message-info-content" id="td_content">
                        <!--
                        <h2 >活动详情：</h2>
                        <span class="page-message-info-info">1.凭兑换码可以去以下地址领取1枚鸡蛋<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                        -->
                    </td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</div><div class="page-footer">
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