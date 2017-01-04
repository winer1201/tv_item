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
        var m_baseUrl = '/list/food?content_code=CT032016081600133&amp;usercode=1010000101160829112523853&amp;user_session=10100001-43bfd3c8-7e28-4967-be12-1c4a8f3fa35e&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Flist%2Frestaurant%3Fusercode%3D1010000101160829112523853%26user_session%3D10100001-43bfd3c8-7e28-4967-be12-1c4a8f3fa35e%26websitecode%3D%26contentcode%3D%26pageIndex%3D0%26focusid%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000101160829112523853%2526user_session%253D10100001-43bfd3c8-7e28-4967-be12-1c4a8f3fa35e%2526websitecode%253D%2526navcode%253DCM20160815003%2526focusid%253Dtd7%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=77060';
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
    <!--style="background-image: url(/app/Home/Public/img/BG.png);"-->
    <div class="wp" id="divwp">
        <div class="page">﻿
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/tableEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/list/list_restaurant_food','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="page-list-title">
    <div class="list-title" id="page-title">
        <label id="lbltitle">餐厅 > 粗粮人家</label>
    </div>
    <div class="list-pageNumber" id="page-number">
        <label>1</label>
        <label style="font-size: 20px;">/1</label>
    </div>
</div>
<div class="page-list" id="page_content">
    <table class="restaurant-table">
        <tbody>
            <tr>
                <td id="td0" style="width: 259px; height: 187px;" jumptype="6" data-left="" data-up="" data-right="td1" data-down="td4" appcode="" videocode="CT032016081600133">
                    <div class="tile wrap">
                        <img style="width: 259px; height: 187px; z-index:1" src="/app/Home/Public/img/canting/food/food1.png">
                    </div>  
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：紫薯山药</label>
                        <label class="restaurant-table-content-money">22</label>
                        <label class="restaurant-table-content-sign">￥</label>
                    </div>                                        
                </td>
                <td id="td1" style="width: 259px; height: 187px;" jumptype="6" data-left="td0" data-up="" data-right="td2" data-down="td5" appcode="" videocode="CT032016081600134">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food2.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：瓦罐松茸汤</label>
                        <label class="restaurant-table-content-money">25</label>
                        <label class="restaurant-table-content-sign">￥</label>     
                    </div>
                </td>
                <td id="td2" style="width: 259px; height: 187px;" jumptype="6" data-left="td1" data-up="" data-right="td3" data-down="td6" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food3.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：翡翠包菜肉卷</label>
                        <label class="restaurant-table-content-money">22</label>
                        <label class="restaurant-table-content-sign">￥</label>   
                    </div>
                </td>
                <td id="td3" style="width: 259px; height: 187px;" jumptype="6" data-left="td2" data-up="" data-right="td4" data-down="td7" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food4.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：菠萝鸡</label>
                        <label class="restaurant-table-content-money">25</label>
                        <label class="restaurant-table-content-sign">￥</label>  
                    </div>
                </td>    
            </tr>
            <tr>
                <td id="td4" style="width: 259px; height: 187px;" jumptype="6" data-left="td3" data-up="td0" data-right="td5" data-down="" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food5.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：豆皮炒青菜</label>
                        <label class="restaurant-table-content-money">14</label>
                        <label class="restaurant-table-content-sign">￥</label> 
                    </div>
                </td>    
                <td id="td5" style="width: 259px; height: 187px;" jumptype="6" data-left="td4" data-up="td1" data-right="td6" data-down="" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food6.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：清炒西葫芦</label>
                        <label class="restaurant-table-content-money">12</label>
                        <label class="restaurant-table-content-sign">￥</label> 
                    </div>
                </td>    
                <td id="td6" style="width: 259px; height: 187px;" jumptype="6" data-left="td5" data-up="td2" data-right="td7" data-down="" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food7.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：鹌鹑蛋煎豆腐</label>
                        <label class="restaurant-table-content-money">12</label>
                        <label class="restaurant-table-content-sign">￥</label> 
                    </div>
                </td>    
                <td id="td7" style="width: 259px; height: 187px;" jumptype="6" data-left="td6" data-up="td3" data-right="" data-down="" appcode="" videocode="CT032016081600136">
                    <div class="tile">
                        <img style="width: 259px; height: 187px;" class="lazy" src="/app/Home/Public/img/canting/food/food8.png">
                    </div>
                    <div class="restaurant-table-content">
                        <label class="restaurant-table-content-name">名称：蛋卷仔</label>
                        <label class="restaurant-table-content-money">20</label>
                        <label class="restaurant-table-content-sign">￥</label> 
                    </div>
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