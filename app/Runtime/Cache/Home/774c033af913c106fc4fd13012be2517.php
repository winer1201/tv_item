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
        var m_baseUrl = '/goods/order?usercode=1010000101160830023804069&amp;user_session=10100001-2d43bac1-3909-4e62-9c8a-7249c2b34f1b&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2FColumnPage%2Findex%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-2d43bac1-3909-4e62-9c8a-7249c2b34f1b%26websitecode%3D%26navcode%3D%26columncode%3DCM20161014001%26backId%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-2d43bac1-3909-4e62-9c8a-7249c2b34f1b%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd1%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=65374';
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
            
    <?php echo loadfile('/app/Home/Public/js/mod/goods/goods_order','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<style>
	ul{
		margin:0;
		padding:0;
		position:absolute;
		top:-277px;
		left:-558px;
		display:none;
		} 
	li{
		width:830px;
		height:80px;
		font-size:28px;
		color:#fff;
		text-align:center;
		list-style:none;
		line-height:80px;
		letter-spacing: 4;
		padding-left:45px;
		opacity: 0.9;
		background:url(/app/Home/Public/img/goods/yu.png) no-repeat;
	}
	.blue{
		background:url(/app/Home/Public/img/goods/dao.png) no-repeat;
	}
</style>
<div class="goods-top">
    <div class="goods-info-title" id="page-title">
        <label id="lbltitle">订单详情</label>
    </div>
</div>
<div class="goods-center" id="page_content">
    <div class="goods-order-form">
        <div class="goods-order-form-left">
            <img src="/app/Home/Public/img/goods/goods_info.png" />
        </div>
        <div class="goods-order-form-right" style="height:500px;">
            <div>
                <label >欧姆龙血压计</label>
                <label style="margin-left:20px;">分类汇总</label>
            </div>
            <div style="margin-top:25px;">
                <div class="goods-order-form-right-item" style="padding-top: 5px;">
                    <label>送货地址：</label>
                </div>
                <div class="goods-order-form-right-item " style="width:274px;height:89px;padding:10px;background-image:url(/app/Home/Public/img/goods/goods_order_input1.png)" id="address"data-down="telephone">
                    <label style="font-size:21px;color:#eeeeee;">北京市朝阳区三里屯优衣库2单元305室</label>
                </div>
            </div>
            <br><br>

            <div style="margin-top:85px;">
                <div class="goods-order-form-right-item" style="padding-top: 5px;">
                    <label style="font-size:21px;color:#eeeeee;">联系电话：</label>
                </div>
                <div class="goods-order-form-right-item" style="width:294px;height:45px;background-image:url(/app/Home/Public/img/goods/goods_order_input2.png);"data-down="goodstime" data-up="address" id="telephone">
                    <input type="text" id="txtphone2" style="width:282px;border:none;height:42px;color:#fff;font-size:18px;padding-left:20px;" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else if(this.value.length<=11){this.value=this.value.replace(/\D/g,'')}else{this.value=this.value.substring(0,11)}">
                </div>
            </div>
            <br>
            <div style="margin-top:40px;">
                <div class="goods-order-form-right-item" style="padding-top: 5px;">
                    <label >送货时间：</label>
                </div>
                <div class="goods-order-form-right-item" style="width:294px;height:45px;background-image:url(/app/Home/Public/img/goods/goods_order_input2.png);position:relative;" id="goodstime" data-down="d_number" data-up="telephone">
                   <!--<span id="sp">按向下键选择时间</span>-->
                   <ul id="time_ul">
                    	<li id="li_one"data-down="li_two"class='blue'>上午08:00——10:00(立即送达)</li>
                    	<li id="li_two"data-up="li_one"data-down="li_three">上午10:00——12:00(立即预约)</li>
                    	<li id="li_three"data-up="li_two"data-down="li_four">中午12:00——14:00(立即预约)</li>
                    	<li id="li_four"data-up="li_three"data-down="li_five">下午14:00——16:00(立即预约)</li>
                    	<li id="li_five"data-up="li_four"data-down="li_six">下午16:00——18:00(立即预约)</li>
                    	<li id="li_six"data-up="li_five">下午18:00——20:00(立即预约)</li>
                    </ul>
                    <input type="text" id="txtphone" style="width:284px;padding-left:20px;margin-top:10px;border:none; font-size: 21px;color: #eeeeee;letter-spacing:3;background:url(/app/Home/Public/img/goods/time.png) no-repeat 246px 0px;"placeholder="请选择送货时间段">
                </div>
            </div>
            <div style="margin-top:100px;">
                <div class="goods-order-form-right-item" style="padding-top:5px;">
                    <label >数量：</label>
                </div>
                <div class="goods-order-form-right-item" style="padding-top:5px;" id="d_number" data-down="btnAdd"data-up="goodstime";>
                    <img src="/app/Home/Public/img/goods/goods_order_min.png">
                    <label id="num_sub"style="font-size:24px;color:#eeeeee;margin-left:10px;margin-right:10px;display:inline-block;width:30px;padding-bottom:5px;height:25px;text-align: center;">1</label>
                    <img src="/app/Home/Public/img/goods/goods_order_add.png">
                </div>
            </div>
            <div style="margin-top:180px;">

                <div style="float:left;text-align:left;margin-left:108px;">
                    <div>
                        <label style="font-size:21px;padding:10px;background:url(/app/Home/Public/img/goods/shop.png) no-repeat;background-size:100% 100%;height:30px;display:inline-block;" id="btnAdd" data-up="d_number" data-right="btnBack">加入购物车</label>
                        <label style="font-size:21px;margin-left:30px;background:url(/app/Home/Public/img/goods/back.png) no-repeat;background-size: 100% 100%;height:49px;display:inline-block;float:right;line-height:49px;width:122px;text-align:center;" id="btnBack" data-up="d_number" data-left="btnAdd">返&nbsp;回</label>
                    </div>
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
    <script type="text/javascript">
        common.initUrl();
        TpMsgHelper.Init();
    </script>
</body>
</html>