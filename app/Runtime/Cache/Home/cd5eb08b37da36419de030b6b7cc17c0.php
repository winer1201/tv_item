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
        var m_baseUrl = '/goods/order_add?usercode=1010000101160830023804069&amp;user_session=10100001-e66696ed-ad13-4a5e-a86b-17ecd1ebfa4e&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FColumnPage%2Findex%3Fcolumncode%3DCM20161014001%26usercode%3D1010000101160830023804069%26user_session%3D10100001-e66696ed-ad13-4a5e-a86b-17ecd1ebfa4e%26websitecode%3D%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-e66696ed-ad13-4a5e-a86b-17ecd1ebfa4e%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd1%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1%26_v%3D95205&amp;_v=59148';
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
    <?php echo loadfile('/app/Home/Public/js/mod/goods/goods_order_add','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style>
    label {
        font-size: 18px;
        color: #eeeeee;
    }

    .title {
        font-size: 21px;
    }
</style>
<div class="goods-top">
    <div class="goods-info-title" id="page-title">
        <label id="lbltitle">我的订单</label>
    </div>
</div>
<div class="goods-center" id="page_content">
    <div style="margin-top:56px;margin-left:149px;">
        <table border="0" cellpadding="0" cellspacing="0" style="width:983px;height:91px;">
            <tr style="height:40px;">
                <td style="width:172px;">
                    <label>支付方式</label>
                </td>
                <td style="width:708px;vertical-align:central;">
                    <div style="float:left;width:93px;height:31px;padding-top:5px;text-align:center;background-image:url(/app/Home/Public/img/goods/goods_order_add_pay_bg.png)" id="d_pay_oldcard" data-right="d_pay_tvcard" data-down="l_pay">
                        <label>老年卡</label>
                    </div>
                    <div style="float:left;width:93px;height:31px;padding-top:5px;text-align:center;margin-left:30px;" id="d_pay_tvcard" data-right="l_pay" data-left="d_pay_oldcard" data-down="l_pay">
                        <label>智能卡</label>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr style="height:51px;">
                <td><label>共1件商品</label></td>
                <td><label>总计：1609元&nbsp;优惠：0元&nbsp;运费：0元</label></td>
                <td><label class="title" style="padding:5px;background:url(/app/Home/Public/img/goods/cal.png) no-repeat;background-size: 100% 100%;" id="l_pay" data-up="d_pay_oldcard" data-left="d_pay_tvcard">立即支付</label></td>
            </tr>
        </table>
        <div style="width:983px;height:395px;margin:0px;background-image:url(/app/Home/Public/img/goods/goods_order_form_bg.png)">
            <table border="0" cellpadding="0" cellspacing="0" style="width:983px;">
                <thead>
                    <tr style="height:70px;">
                        <td style="width:500px;"></td>
                        <td style="width:100px;"></td>
                        <td style="width:183px;"></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr style="height:87px;">
                        <td style="text-align:center;vertical-align:middle;"><label>欧姆龙电子血压计</label></td>
                        <td style="text-align:center;vertical-align:middle;"><label>1</label></td>
                        <td style="text-align:center;vertical-align:middle;"><label>￥0</label></td>
                        <td style="text-align:center;vertical-align:middle;"><label>￥1609.00</label></td>
                    </tr>
                </tbody>
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
    <script type="text/javascript">
        common.initUrl();
        TpMsgHelper.Init();
    </script>
</body>
</html>