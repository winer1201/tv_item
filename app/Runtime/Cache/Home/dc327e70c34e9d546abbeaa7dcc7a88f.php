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
        var m_baseUrl = '/video/player?usercode=1010000101160830023804069&amp;user_session=10100001-351c565b-9a1a-465e-8569-6649fefa52ed&amp;websitecode=&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Fgoods%2Finfo%3Fusercode%3D1010000101160830023804069%26user_session%3D10100001-351c565b-9a1a-465e-8569-6649fefa52ed%26websitecode%3D%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252FColumnPage%252Findex%253Fusercode%253D1010000101160830023804069%2526user_session%253D10100001-351c565b-9a1a-465e-8569-6649fefa52ed%2526websitecode%253D%2526navcode%253D%2526columncode%253DCM20161014001%2526backId%253Dtd0%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15010%25252Findex%25252Fshowpage%25253Fusercode%25253D1010000101160830023804069%252526user_session%25253D10100001-351c565b-9a1a-465e-8569-6649fefa52ed%252526websitecode%25253D%252526navcode%25253DCM20160815002%252526focusid%25253Dtd1%252526backUrl%25253Dhttp%2525253A%2525252F%2525252F10.10.20.11%2525253A15008%2525252F%2525253Fexit%2525253D1%26_v%3D58598%26_v%3D85792&amp;file=http://10.10.20.11:15150/video/guanggao/omron_xyj.mp4&amp;_v=63085';
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
	 <?php echo loadfile('/app/Home/Public/js/mod/goods/myvideo','js');?>
<link href="//vjs.zencdn.net/5.4.6/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/5.4.6/video.min.js"></script>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
    init();
</script>
<style>
	#footer{display:none;}
</style>
    <!-- controls -->
    <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered" poster="/app/Home/Public/img/goods/poster.png" controls preload="none" width="1280" height="720"
           data-setup="{}"style="left:0;top:-20px;">
        <source src="" type='video/mp4' />
        <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
        <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
    </video>
    <script type="text/javascript">
    function page_init(){
    	player.init();
    }
    var myPlayer = videojs('example_video_1');
     	myPlayer.play();
        //console.log(file)
        var player={
        	init: function () {
        		var that = this;
		        that.addlisten();
   			},
   			control:null,
   			addlisten: function () {
		        var that = player;
		        that.control = new controlevent({
		            extMove: that.move,
	        	});
		        that.control.begin();
		    },
   			move:function(key){
   				var that = player;
		        var backUrl = "",
		        backUrl = tp.util.getQueryString("backUrl");
		        
		        if (key == tp_move_key.up) {
		            //console.log(backUrl)
		            tp.util.redirectUrl(backUrl);
		        }
   			}
        }
    videojs("example_video_1").ready(function(){
        var myPlayer = this;
        myvideoHelper.init(myPlayer);
        var file = "";
        file = tp.util.getQueryString("file");
        //console.log(file)
       // file = "video/" + file;
        myvideoHelper.play(file);
        //myPlayer.enterFullScreen();
        //设置播放文件路径
        //var source = document.getElementsByTagName("source");
        
        //myPlayer.src(file);
        //source.setAttribute("src", "video/按摩三阴交穴可以减缓衰老.mp4")
        //myPlayer.play();
    });
        TpMsgHelper.Init();
    </script>


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