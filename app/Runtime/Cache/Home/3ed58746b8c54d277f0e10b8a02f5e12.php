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
        var m_baseUrl = '/accompany/order4?usercode=1010000101160830023804069&amp;user_session=10100001-31fa5163-442b-4391-a4e7-fe1e60b0e2c7&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-31fa5163-442b-4391-a4e7-fe1e60b0e2c7%26websitecode%3D%26navcode%3DCM20160912004%26focusid%3Dtd1%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15008%252F%253Fexit%253D1&amp;_v=91961';
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
            
<?php echo loadfile('/app/Home/Public/css/deep_blue/addcard','css');?>
    <?php echo loadfile('/app/Home/Public/js/mod/accompany/accompany_order4','js');?>

<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style type="text/css">
    label{
        font-size:20px;
        color:#eeeeee;
    }
    .text{
        font-size:20px;
        color:#eeeeee;
        padding:5px;
        line-height: 1.428571429;
    }
</style>
<div class="list-category-top">
    <div class="list-category-title" id="page-title">
        58-陪护
    </div>
</div>
<div class="list-category-content" id="page_content">
    <div style="margin-left:201px;margin-top:56px;">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td style="width:100px;">
                    <label>地址：</label>
                </td>
                <td style="width:336px;">
                    <textarea class="text" style="height:109px;width:294px;background-image:url(/app/Home/Public/img/peihu/order4_input_lm.png);border:none;" readonly="readonly" maxLength="11" id="txtaddr">北京市朝阳区三里屯优衣库2单元305室</textarea>
                </td>
                <td style="width:150px;"></td>
            </tr>
            <tr>
                <td>
                    <label>姓名：</label>
                </td>
                <td>
                    <input class="text" type="text" style="height:45px;width:294px;margin-top:10px;background-image:url(/app/Home/Public/img/peihu/order4_input_sm.png);border:none;" onclick="return false;"  value="" readonly="readonly" maxLength="11" id="txtname" data-down="txtphone" />
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <label>电话：</label>
                </td>
                <td>
                    <input class="text" type="text" style="height:45px;width:294px;margin-top:10px;background-image:url(/app/Home/Public/img/peihu/order4_input_sm.png);border:none;"  value="" readonly="readonly" maxLength="11" id="txtphone" data-down="txtcode" data-up="txtname" data-right="btn_vercode" />
                </td>
                <td>
                    <div style="margin-top:10px;background-image:url(/app/Home/Public/img/peihu/order_btn.png);width:146px;height:37px;text-align:center;padding-top:8px;" id="btn_vercode" data-down="txtcode" data-up="txtname" data-left="txtphone">
                        <label style="font-size:22px;">获取验证码</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label>验证码：</label>
                </td>
                <td>
                    <input class="text" type="text" style="height:45px;width:294px;margin-top:10px;background-image:url(/app/Home/Public/img/peihu/order4_input_sm.png);border:none;" value="" readonly="readonly" maxLength="11" id="txtcode" data-down="btn_submit" data-up="txtphone" />
                </td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div style="background-image:url(/app/Home/Public/img/peihu/order_btn.png);margin-top:75px;margin-left:70px; width :146px;height:37px;text-align:center;padding-top:8px;" id="btn_submit" data-up="txtcode">
                        <label style="font-size:22px;">提  交</label>
                    </div>
                </td>
                <td></td>
            </tr>
        </table>
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