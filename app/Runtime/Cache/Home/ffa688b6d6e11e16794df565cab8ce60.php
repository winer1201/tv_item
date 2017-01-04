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
        var m_baseUrl = '/Restaurant/food_list?content_code=CT032016081600133&amp;usercode=1010000101160830023804069&amp;user_session=10100001-3c48e34e-f91d-4bea-b4da-81f547b02cc7&amp;websitecode=WS20161215001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Flist%2Frestaurant%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-3c48e34e-f91d-4bea-b4da-81f547b02cc7%26websitecode%3DWS20161215001%26contentcode%3D%26pageIndex%3D0%26focusid%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-3c48e34e-f91d-4bea-b4da-81f547b02cc7%2526websitecode%253D%2526navcode%253DCM20160912004%2526focusid%253Dtd0%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=2887';
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
    <?php echo loadfile('/app/Home/Public/css/reset','css');?>   
    <?php echo loadfile('/app/Home/Public/css/restaurant/food_list','css');?>
    <?php echo loadfile('/app/Home/Public/data/tp_foodlist','js');?>	
	<?php echo loadfile('/app/Home/Public/js/jquery.min','js');?>	
    <?php echo loadfile('/app/Home/Public/js/mod/restaurant/restaurant_food_list','js');?>
   
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>

	<div id="wrap">
			<div class="header">
				<h2>粗粮人家</h2>
			</div>
			<div class="content">
				<div class="con_wrap">
					<div class="mask_con"><img src="/app/Home/Public/img/restaurant/food_list/2_03.png" alt="jianbing"></div>
					<div class="mask wrap">
						<img src="/app/Home/Public/img/restaurant/food_list/select.png" alt="jianbing">		
					</div>
					<div id="foodlist">
						<!--dl class="clear">
							<dt><img src="/app/Home/Public/img/restaurant/food_list/jianbing.png" alt="jianbing" /></dt>
							<dd class="food_name clear">
								<span>煎饼大王</span>
								<i>￥10</i>
							</dd>
							<dd class="shicai">食材：玉米面、鸡蛋、葱花、豆瓣酱、香菜、辣椒酱、麻叶</dd>
						</dl>
						<dl class="clear">
							<dt><img src="/app/Home/Public/img/restaurant/food_list/noodles.png" alt="jianbing" /></dt>
							<dd class="food_name clear">
								<span>牛肉面</span>
								<i>￥25</i>
							</dd>
							<dd class="shicai">食材：面、牛肉、香菜、酸菜</dd>
						</dl>
						<dl class="clear">
							<dt><img src="/app/Home/Public/img/restaurant/food_list/fruit.png" alt="jianbing" /></dt>
							<dd class="food_name clear">
								<span>水果沙拉</span>
								<i>￥30</i>
							</dd>
							<dd class="shicai">食材：草莓、芒果、火龙果、圣女果、沙拉</dd>
						</dl>-->
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