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
        var m_baseUrl = '/goods/cart?usercode=1010000101160830023804069&amp;user_session=10100001-74e9c0ec-cf85-4a90-a61c-1f4915488236&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FColumnPage%2Findex%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-74e9c0ec-cf85-4a90-a61c-1f4915488236%26websitecode%3D%26navcode%3D%26backId%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-74e9c0ec-cf85-4a90-a61c-1f4915488236%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd1%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=29597';
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
            
    <?php echo loadfile('/app/Home/Public/js/mod/goods/goods_cart','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style>
	.label label{
		
		display:inline-block;
		height:44px;
		width:120px;
		line-height:32px;
		text-align: center;
		font-size:18px;
		box-sizing:border-box;
		float:left;
	}
</style>
<div class="goods-top">
    <div class="goods-info-title" id="page-title">
        <label id="lbltitle">购物车</label>
    </div>
</div>
<div class="goods-center" id="page_content">
    <div style="height:45px;text-align:left;"class="label">
        <span style="margin-left:149px;font-size:21px;color:#eeeeee;float:left;">已购1件商品，总计1609元</span>
        <label style="margin-left:320px;color:#eeeeee;padding:5px;background:url(/app/Home/Public/img/goods/empty.png) no-repeat" id="btnclear" data-down="tr_item1" data-right="btnpay">清空购物车</label>
        <label style="margin-left:10px;color:#eeeeee;padding:5px;background:url(/app/Home/Public/img/goods/cal.png) no-repeat" id="btnpay" data-down="tr_item1" data-right="btnadd" data-left="btnclear">去结算</label>
        <label style="margin-left:10px;color:#eeeeee;padding:5px;background:url(/app/Home/Public/img/goods/cal.png) no-repeat" id="btnadd" data-down="tr_item1" data-left="btnpay">继续购物</label>
    </div>
    <div style="margin-top:16px;margin-left:149px;width:983px;height:487px;background-image:url(/app/Home/Public/img/goods/goods_cart_back.png)">
        <table style="border:0px solid ;width:983px;border-collapse:collapse ;" cellpadding="0" cellspacing="0">
            <thead>
                <tr style="height:76px;">
                    <td colspan="5"></td>
                </tr>
            </thead>
            <tbody id="tbody">
                <tr style="height:116px;border:0px solid;" id="tr_item1" data-up="btnpay">
                    <td style="width:115px;vertical-align:central;">
                        <img style="margin-left:21px;" src="/app/Home/Public/img/goods/goods_cart_sel_img.png" id="img_sel" />
                    </td>
                    <td style="width:100px;vertical-align:central;">
                        <img style="margin-left:0px;margin-top:8px;width:100px;height:100px;" src="/app/Home/Public/img/goods/goods_info.png" />
                    </td>
                    <td style="width:420px;vertical-align:central;text-align:left">
                        <label style="font-size:21px;color:#eeeeee;margin-left:20px;">欧姆龙电子血压计</label>
                    </td>
                    <td style="width:140px;text-align:center;vertical-align:central;">
                        <img src="/app/Home/Public/img/goods/goods_order_min.png">
                        <label style="font-size:24px;color:#eeeeee;margin-left:20px;margin-right:20px;" id="num_sub">1</label>
                        <img src="/app/Home/Public/img/goods/goods_order_add.png">
                    </td>
                    <td style="vertical-align:central;text-align:center;border-color:#eeeeee;">
                        <label style="font-size:21px;color:#eeeeee;">￥1609.00</label>
                    </td>
                </tr>
            </tbody>
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