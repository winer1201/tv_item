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
        var m_baseUrl = '/oldcard?usercode=1010000116081503235537701&amp;user_session=10100001-6c0b0d5b-d1ee-49d0-8b7d-4d4f3635c837&amp;websitecode=&amp;areacode=10100001&amp;backUrl=http%3A%2F%2F10.10.20.11%3A15010%2Foldcard%2Flist%3Fusercode%3D1010000116081503235537701%26user_session%3D10100001-6c0b0d5b-d1ee-49d0-8b7d-4d4f3635c837%26websitecode%3D%26areacode%3D10100001%26focusid%3Dtd0%26backUrl%3Dhttp%253A%252F%252F10.10.20.11%253A15010%252Findex%252Fshowpage%253Fusercode%253D1010000116081503235537701%2526user_session%253D10100001-6c0b0d5b-d1ee-49d0-8b7d-4d4f3635c837%2526websitecode%253D%2526navcode%253DCM20160815002%2526focusid%253Dtd3%2526pian%253D110%2526backUrl%253Dhttp%25253A%25252F%25252F10.10.20.11%25253A15008%25252F%25253Fexit%25253D1&amp;_v=89072';
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
    <?php echo loadfile('/app/Home/Public/css/deep_blue/list','css');?>
    <?php echo loadfile('/app/Home/Public/css/deep_blue/addcard','css');?>

    <?php echo loadfile('/app/Home/Public/js/mod/oldcard/oldcard_info','js');?>
<script type="text/javascript">
    function init() {
        if (typeof (page_init) == "function")
            page_init();
    }
</script>
<div class="oldcard-page-list-title">
    <div class="oldcard-list-title ">
        <label>老年卡信息页</label>
        <hr />
    </div>
</div>
<div class="page-addcard">
    <div class="form-item oldcardinfo" style="height:100%">
        <div class="item-1" style="width:490px; " >
            <table class="oldcard-left"  >
                <tr>
                    <td class="td">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>
                    <td class="tdes">张国玉</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="tdes">
                        <table>
                            <tr>
                                <td id="td0" data-right="td1" data-down="td2">
                                    <div class="tile oldcard-info-rad" >
                                        <input type="radio" style="margin:2px;" id="rdyl" name="rdyl" checked="checked" />
                                        养老卡
                                    </div>
                                </td>
                                <td id="td1" data-right="td3" data-down="td2" data-left="td0">
                                    <div class="tile oldcard-info-rad oldcard-info-noborder" >
                                        <input type="radio" id="rdzc" style="margin:2px;" name="rdzc" />
                                        助残卡
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="td">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</td>
                    <td class="tdes">119397293728617</td>
                </tr>
                <tr>
                    <td class="td">卡内余额：</td>
                    <td class="tdes">103.30元</td>
                </tr>
                <tr>
                    <td class="td">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</td>
                    <td class="tdes phone">13704836423</td>
                    <script type="text/javascript">
                    	var number=document.getElementsByClassName('phone')[0];
    					number.innerHTML=number.innerHTML.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3');
                    </script>
                </tr>
                <tr style="visibility: hidden;">
                    <td class="td">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td>
                    <td class="tdes">北京市朝阳区三里屯优衣库2单元305</td>
                </tr>
                <tr>
                    <td></td>
                    <td id="td2" data-up="td0" data-right="td3" style="height:138px;">
                        <div class="tile" style="width:168px; height:48px;">
                            <img style="width:168px; height:48px;" src="/app/Home/Public/img/oldcard/relieve.png" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="item-2">
            <table class="oldcard-right"  style="border:solid#000 1px;border-color:darkgrey;">
                <thead>
                    <tr>
                        <th id="td3" data-right="td4" data-down="td2" data-left="td1" style="width:260px; height:70px;">
                            <div class="tile oldcard-info-rad oldcard-info-noborder" style="width:170px; height:40px; margin-left:40px; line-height:40px;text-align:center;">消费记录</div>
                        </th>
                        <th id="td4" data-right="td5" data-down="td2" data-left="td3" style="width:192px;">
                            <div class="tile oldcard-info-rad oldcard-info-noborder" style="width:170px; height:40px; line-height:40px;">发放记录</div>
                        </th>
                        <th id="td5" data-left="td4" data-down="td2" style="width:187px;">
                            <div class="tile oldcard-info-rad oldcard-info-noborder" style="width:170px; height:40px; line-height:40px">打折信息</div>
                        </th>
                    </tr>
                    <tr id="trtitle" style="border:solid#000 1px;border-color:darkgrey;">
                        <td >消费时间</td>
                        <td>消费内容</td>
                        <td>消费金额</td>
                    </tr>
                </thead>
                <tbody id="tblist">
                    <!--
                    <tr id="xiao2">
                        <td >2016.02.16&nbsp;&nbsp;11:08:22</td>
                        <td>庆丰包子</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td ></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    -->
                </tbody>
                <tbody>
                    <tr>
                        <td id="td6" colspan="3" align="center" style="text-align:center;height:50px;" data-up="td3" data-left="td2">
                            <div class="tile oldcard-info-rad oldcard-info-noborder" style="margin-left:267px;width:110px; height:33px;display:none;">
                                <img style="width:110px; height:33px;" src="/app/Home/Public/img/oldcard/向下按钮默认.png" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--<table style="width:100px; height:35px;  float:right; margin-right:355px;">
                <tr id="text">
                    <td id="td6" data-up="td3">
                        <div class="tile" style="width:110px; height:33px;">
                            <img style="width:110px; height:33px;" src="/app/Home/Public/img/oldcard/向下按钮默认.png" />
                        </div>
                    </td>
                </tr>
            </table>-->
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