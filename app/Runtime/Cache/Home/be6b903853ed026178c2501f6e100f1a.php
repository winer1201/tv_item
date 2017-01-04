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
        var m_baseUrl = '/restaurant/cart?usercode=1010000101161128063906755&amp;user_session=10100001-4f2ecea8-787f-4dbb-94b5-5a3dc3af121a&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FRestaurant%2Ffood_list%3Fcontent_code%3DCT032016081600133%26usercode%3D1010000101161128063906755%26user_session%3D10100001-4f2ecea8-787f-4dbb-94b5-5a3dc3af121a%26websitecode%3D%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Flist%252Frestaurant%253Fusercode%253D1010000101161128063906755%2526user_session%253D10100001-4f2ecea8-787f-4dbb-94b5-5a3dc3af121a%2526websitecode%253D%2526contentcode%253D%2526pageIndex%253D0%2526focusid%253Dtd0%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15010%25252Findex%25252Fshowpage%25253Fusercode%25253D1010000101161128063906755%252526user_session%25253D10100001-4f2ecea8-787f-4dbb-94b5-5a3dc3af121a%252526websitecode%25253D%252526navcode%25253DCM20160815002%252526focusid%25253Dtd5%252526backUrl%25253Dhttp%2525253A%2525252F%2525252F10.10.20.11%2525253A15008%2525252F%2525253Fexit%2525253D1%26_v%3D75268&amp;food_id=1&amp;_v=74324';
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
            
    <?php echo loadfile('/app/Home/Public/js/mod/restaurant/restaurant_cart','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="goods-top">
    <div class="goods-info-title" id="page-title">
        <label id="lbltitle">购物车</label>
    </div>
</div>
<div class="goods-center" id="page_content">
    <div style="height:30px;margin-top:15px;text-align:left;">
        <label style="margin-left:149px;font-size:21px;color:#eeeeee;">已购1件菜品，配送费：5.00元，总计15.00元</label>
        <label style="margin-left:210px;font-size:21px;color:#eeeeee;padding:5px;" id="btnclear" data-down="tr_item1" data-right="btnpay">清空购物车</label>
        <label style="margin-left:10px;font-size:21px;color:#eeeeee;padding:5px;" id="btnpay" data-down="tr_item1" data-right="btnadd" data-left="btnclear">去结算</label>
        <label style="margin-left:10px;font-size:21px;color:#eeeeee;padding:5px;" id="btnadd" data-down="tr_item1" data-left="btnpay">继续选餐</label>
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
                        <img style="margin-left:0px;margin-top:8px;width:100px;height:100px;" src="/app/Home/Public/img/restaurant/food_list/dan1.png" />
                    </td>
                    <td style="width:420px;vertical-align:central;text-align:left">
                        <label style="font-size:21px;color:#eeeeee;margin-left:20px;">葱炒蛋</label>
                    </td>
                    <td style="width:140px;text-align:center;vertical-align:central;">
                        <img src="/app/Home/Public/img/goods/goods_order_min.png">
                        <label style="font-size:24px;color:#eeeeee;margin-left:20px;margin-right:20px;">1</label>
                        <img src="/app/Home/Public/img/goods/goods_order_add.png">
                    </td>
                    <td style="vertical-align:central;text-align:center;border-color:#eeeeee;">
                        <label style="font-size:21px;color:#eeeeee;">￥10.00/份</label>
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