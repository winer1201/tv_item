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
        var m_baseUrl = '/map/mapinfo?usercode=1010000116081503235537701&amp;areacode=10100001&amp;user_session=10100001-51aec3ff-f978-46c4-8c20-7da13517da16&amp;websitecode=WS20161014003&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Findex%2Fshowpage%3Fusercode%3D1010000116081503235537701%26user_session%3D10100001-51aec3ff-f978-46c4-8c20-7da13517da16%26websitecode%3DWS20161014003%26navcode%3DCM20161014003%26focusid%3Dtd0%26pian%3D118%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000116081503235537701%2526user_session%253D10100001-51aec3ff-f978-46c4-8c20-7da13517da16%2526websitecode%253DWS20160815001%2526navcode%253DCM20160815001%2526focusid%253Dtd0%2526pian%253D118%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fwebsitecode%25253DWS20160815001%252526exit%25253D1&amp;_v=22170';
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
    <?php echo loadfile('/app/Home/Public/css/deep_blue/info','css');?>
    <?php echo loadfile('/app/Home/Public/js/base/formEvent','js');?>
    <?php echo loadfile('/app/Home/Public/js/mod/map/mapinfo','js');?>
    <?php echo loadfile('/app/Home/Public/data/tp_maplist','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>

<div class="mapinfo-left">
    <div class="mapinfo-left-title">
        <label id="map_name"></label>
    </div>
    <div class="mapinfo-left-map" id="mapctr">
        <iframe src="" id="mappage" style="width:100%;height:100%;display:none;" frameborder="0" scrolling="no"></iframe>
        <img id="magimg" style="width:100%;height:100%" />
    </div>
</div>
<div class="mapinfo-right">
    <div class="mapinfo-left-content">
        <div class="mapinfo-left-content-top" id="content-top">

        </div>
        <div class="mapinfo-left-content-center" id="content-center">
            <!--<div class="mapinfo-right-item" id="map1" url="http://10.10.20.11:15150/map/rccf/rccf1.html" data-down="map2">
                <label>荣畅厨房</label>
                <br />
                <label>参考价: ￥30</label>
                <br />
                <label>北京市朝阳区呼家楼西里南街2号</label>
                <br />
                <label>电话：18515826520</label>
            </div>
            <div class="mapinfo-right-item" id="map2" url="http://10.10.20.11:15150/map/rccf/rccf2.html" data-up="map1">
                <label>幸福彩虹荣畅便利店(利泽西园店)</label>
                <br />
                <label>参考价: ￥30</label>
                <br />
                <label>望京广顺北大街利泽西园小区西门往来阁西10米</label>
                <br />
                <label>电话：18515826520</label>
            </div>-->
        </div>
        <div class="mapinfo-left-content-bottom" id="content-bottom">

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