common = {
    getBaseUrl:function(){
        var refUrl = window.location.href;
        var tmpUrl = "",baseUrl="";
        var index=0;
        index = refUrl.indexOf('//');
        if (index && index > 0)
        {
            baseUrl = refUrl.substring(0, index + 2);
            tmpUrl = refUrl.substring(index + 2);
            index = tmpUrl.indexOf('/');
            if (index && index > 0) {
                baseUrl += tmpUrl.substring(0, index + 1);
            } else {
                baseUrl = refUrl;
            }
                
        }
        else {
            index = tmpUrl.indexOf('/');
            if(index && index>0)
            {
                baseUrl = refUrl.substring(0, index + 1);
            }
            else
            {
                baseUrl = refUrl;
            }
        }
        return baseUrl;
    },
    initUrl: function () {
        //var refUrl = window.location.href;
        var baseUrl = "";
        var siteUrl = "";
        //设置模块基地址
        config.tp_tps_url = m_tp_tps_url;
        config.tp_pms_url = m_tp_pms_url;
        config.tp_cbs_url = m_tp_cbs_url;
        config.tp_ls_url = m_tp_ls_url;
        config.tp_tvportal_url = m_tp_tvportal_url;
        config.tp_gsm_url = m_tp_gsm_url;
        //baseUrl = refUrl.substring(0, refUrl.indexOf('/'));
        //baseUrl = refUrl.substring(0, refUrl.indexOf(config.portal_part_url));
        baseUrl = this.getBaseUrl();
        //siteUrl = baseUrl + config.portal_part_url;
        //config.portal_base_url = baseUrl + m_baseUrl;
        config.portal_base_url = baseUrl;
        config.portal_public_url = baseUrl + m_publicUrl + "/";
        siteUrl = baseUrl + m_rootUrl + config.portal_part_url;
        //pms图片跟目录
        config.pms_imgurl = config.tp_pms_url + "Application/";
        //首页
        config.portal_home_url = siteUrl+"index/showpage";
        //列表页
        config.portal_list_url = siteUrl + "list";
        //视频详情页
        config.portal_video_url = siteUrl + "video";
        //视频播放页
        config.Portal_video_play_url = siteUrl + "video/play";
        //应用详情页
        config.portal_app_url = siteUrl + "index.php/app";
        //应用启动页
        config.portal_app_start_url = siteUrl + "app/start";//?平台提供
        //个人信息地址
        config.portal_myinfo_url = siteUrl + "my";
        //老年卡列表地址
        config.portal_oldcard_list_url = siteUrl + "oldcard/list";
        //老年卡绑定地址
        config.portal_oldcard_bind_url = siteUrl + "oldcard/add";
        //老年卡信息地址
        config.portal_oldcard_info_url = siteUrl + "oldcard";
        //消息列表页地址
        config.portal_message_url = siteUrl + "my/message";
        //我的收藏页地址
        config.portal_collect_url = siteUrl + "my/collect";
        //最近使用页地址
        config.portal_history_url = siteUrl + "my/history";
        //专辑内容列表页
        config.portal_album_url = siteUrl + "list/album";
        //图片列表页
        config.portal_img_list_url = siteUrl + "img";
        //老年餐厅-菜品详情页
        config.portal_restaurant_info_url = siteUrl + "info/restaurant";
        //老年餐厅-菜品列表页
        config.portal_restaurant_food_url = siteUrl + "list/food";
        //老年餐厅-列表页
        config.portal_restaurant_list_url = siteUrl + "list/restaurant";
        //体检-血压/心率页面
        config.portal_exam_bloodpress_url = siteUrl + "exam/bloodpress";
        //体检-血压/心率 - 血压趋势图页面
        config.portal_exam_bloodpress_bloodtrends_url = siteUrl + "exam/bloodpress_bloodtrends";
        //体检-血压/心率 - 心率趋势图页面
        config.portal_exam_bloodpress_hearttrends_url = siteUrl + "exam/bloodpress_hearttrends";
        //体检-血压/心率 - 历史数据页面
        config.portal_exam_bloodpress_data_url = siteUrl + "exam/bloodpress_data";
        //体检-血糖页面
        config.portal_exam_bloodsugar_url = siteUrl + "exam/bloodsugar";
        //体检-心电图页面
        config.portal_exam_electrocardiogram_url = siteUrl + "exam/electrocardiogram";
        //体检-血氧页面
        config.portal_exam_bloodoxygen_url = siteUrl + "exam/bloodoxygen";
        //体检-运动量页面
        config.portal_exam_exercise_url = siteUrl + "exam/exercise";
        //体检-睡眠页面
        config.portal_exam_sleep_url = siteUrl + "exam/sleep";
        //体检-肺功能页面
        config.portal_exam_pulmonary_url = siteUrl + "exam/pulmonary";
        //体检-体温页面
        config.portal_exam_temperature_url = siteUrl + "exam/temperature";
        

        //TPS地址初始化
        //tps模板列表信息获取地址
        config.tps_getpagedata_url = config.tp_tps_url + "pageconfig/getpagedata";
        //tps内容信息获取地址
        config.tps_content_info_url = config.tp_tps_url + "pageconfig/getcontentinfo";
        //
        config.tps_content_list_url = config.tp_tps_url + "pageconfig/getcontentlist";

        //CBS地址初始化
        //获取用户信息接口地址
        config.cbs_user_getuserinfo = config.tp_cbs_url + "user/getuserinfo";
        //内容收藏或取消接口地址
        config.cbs_user_collect = config.tp_cbs_url + "user/contentcollect";
        //内容收藏列表接口地址
        config.cbs_user_getcollectlist = config.tp_cbs_url + "user/getusercollect";
        //记录用户内容最近使用接口地址
        config.cbs_user_recordcontenthis = config.tp_cbs_url + "user/recordcontentuseinfo";
        //获取用户最近使用列表
        config.cbs_user_getcontentusehis = config.tp_cbs_url + "user/getcontentusehis";
        //用户行为日志记录
        config.cbs_action_recordactionlog = config.tp_cbs_url + "ActionLog/record";

        //gsm
        config.gsm_report_url = config.tp_gsm_url + "session/report";

        //获取参数
        m_usercode = tp.util.getQueryString('usercode');
        m_user_session = tp.util.getQueryString('user_session');
        m_websitecode = tp.util.getQueryString('websitecode');
        m_areacode = this.getAreaCode(m_usercode);

    },
    getPageUrl: function (pagecode,tdCtr) {
        var url = "";
        var exampage = "0";
        switch (pagecode) {
                //个人信息
            case "0":
                url = config.portal_myinfo_url;
                break;
                //老年卡列表页
            case "1":
                url = config.portal_oldcard_list_url;
                break;
                //消息列表
            case "2":
                url = config.portal_message_url;
                break;
                //我的收藏
            case "3":
                url = config.portal_collect_url;
                break;
                //最近使用
            case "4":
                url = config.portal_history_url;
                break;
                //老年餐厅列表页
            case "5":
                url = config.portal_restaurant_list_url;
                break;
                //体检中心页面
            case "6":
                exampage = tdCtr.getAttribute("exampage");
                switch (exampage) {
                    case "0":
                        url = config.portal_exam_bloodpress_url;
                        break;
                    case "1":
                        url = config.portal_exam_bloodsugar_url;
                        break;
                    case "2":
                        url = config.portal_exam_electrocardiogram_url;
                        break;
                    case "3":
                        url = config.portal_exam_bloodoxygen_url;
                        break;
                    case "4":
                        url = config.portal_exam_exercise_url;
                        break;
                    case "5":
                        url = config.portal_exam_sleep_url;
                        break;
                    case "6":
                        url = config.portal_exam_pulmonary_url;
                        break;
                    case "7":
                        url = config.portal_exam_temperature_url;
                        break;
                    default:
                        break;
                }
                break;
            case "":
                url = "";
                break;
            default: break;
        }
        return url;
    },
    getPageName:function(pagecode){
        switch (pagecode) {
            case "0": return "个人信息页";
            case "1": return "老年卡列表页";
            case "2": return "消息列表";
            case "3": return "我的收藏";
            case "4": return "最近使用";
            default: return "";
        }
    },
    getJumpName: function (jumptype) {
        switch (jumptype) {
            case "0": return "视频";
            case "1": return "应用";
            case "2": return "内容分类";
            case "3": return "图片";
            case "4": return "页面";
            case "5": return "外部页面";
            default: return "";
        }
    },
    getTdTargetUrl: function (tdCtr) {
        if(!tdCtr) return"";
        var targetUrl = "";
        var jumpType = "", content_code = "", category_code = "", imglist = "", pagecode = "";

        jumpType = tdCtr.getAttribute("jumptype");
        switch (jumpType) {
            //视频
            case "0":
                content_code = tdCtr.getAttribute("videocode");
                targetUrl = config.portal_video_url;
                targetUrl = tp.util.appendParam(targetUrl, "content_code", content_code);
                break;
                //应用
            case "1":
                content_code = tdCtr.getAttribute("appcode");
                targetUrl = config.portal_app_url;
                targetUrl = tp.util.appendParam(targetUrl, "content_code", content_code);
                break;
                //内容分类-内容列表
            case "2":
                category_code = tdCtr.getAttribute("categorycode");
                targetUrl = config.portal_list_url;
                targetUrl = tp.util.appendParam(targetUrl, "category_code", category_code);
                break;
                //图片
            case "3":
                imglist = tdCtr.getAttribute("imglist");
                imglist = encodeURIComponent(imglist);
                targetUrl = config.portal_img_list_url;
                targetUrl = tp.util.appendParam(targetUrl, "imglist", imglist);
                break;
                //页面
            case "4":
                pagecode = tdCtr.getAttribute("pagecode");
                targetUrl = common.getPageUrl(pagecode,tdCtr);
                break;
                //外部页面
            case "5":
                targetUrl = tdCtr.getAttribute("pageurl");
                targetUrl = decodeURIComponent(targetUrl);
                break;
                //老年餐厅列表
            //case "6":
            //    content_code = tdCtr.getAttribute("contentcode");
            //    targetUrl = config.portal_restaurant_food_url;
            //    targetUrl = tp.util.appendParam(targetUrl, "content_code", content_code);
            //    break;
            //    //餐厅菜品列表
            //case "7":
            //    content_code = tdCtr.getAttribute("contentcode");
            //    targetUrl = config.portal_restaurant_info_url;
            //    targetUrl = tp.util.appendParam(targetUrl, "content_code", content_code);
            //    break;
            default: break;
        }

        return targetUrl;
    },
    getTargetcode:function(tdCtr){
        if (!tdCtr) return "";
        var targetcode = "";
        var jumpType = tdCtr.getAttribute("jumptype");
        switch (jumpType) {
            //视频
            case "0":
                targetcode = tdCtr.getAttribute("videocode");
                break;
                //应用
            case "1":
                targetcode = tdCtr.getAttribute("appcode");
                break;
                //内容分类-内容列表
            case "2":
                targetcode = tdCtr.getAttribute("categorycode");
                break;
                //图片
            case "3":
                targetcode = tdCtr.getAttribute("imglist");
                break;
                //页面
            case "4":
                targetcode = tdCtr.getAttribute("pagecode");
                break;
                //外部页面
            case "5":
                targetcode = "";
                break;
                //老年餐厅列表
            case "6":
                //餐厅菜品列表
            case "7":
                targetcode = tdCtr.getAttribute("contentcode");
                break;
            default: break;
        }
        return targetcode;
    },
    getActionDetail:function (ctrTd){
        if (ctrTd == null) return "";
        var curtdid = "", jumpType = "", targetcode = "", targeturl = "", jumpName = "", detail = "";
        curtdid = ctrTd.getAttribute("id");
        jumpType = ctrTd.getAttribute("jumptype");
        targetcode = common.getTargetcode(ctrTd);
        targeturl = common.getTdTargetUrl(ctrTd);
        jumpName = common.getJumpName(jumpType);

        if (jumpType == "4") {
            pageName = common.getPageName(targetcode);
            jumpName += "_" + pageName;
        }

        detail = "tilsid[" + curtdid + "]_jumptype[" + jumpType + "_" + jumpName + "]_code[" + targetcode + "]_url[" + targeturl + "]";
        return detail;
    },
    getCodeValue: function (key) {
        switch (key) {
            case 48: return 0;
            case 49: return 1;
            case 50: return 2;
            case 51: return 3;
            case 52: return 4;
            case 53: return 5;
            case 54: return 6;
            case 55: return 7;
            case 56: return 8;
            case 57: return 9;
            default: return "";
        }
    },
    getAreaCode: function (str) {
        if (!str) return "";
        if (str.length < 8) return str;
        return str.substring(0, 8);
    },
    setBaseParam: function (url) {
        if (!url || url == "")
            return "";
        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);
        url = tp.util.appendParam(url, "websitecode", m_websitecode);
        return url;
    },
    getResultObj:function(data){
        var obj = -1;
        if (!data) return obj;
        data = eval('(' + data + ')');
        if (!data) return -1;
        return data;
    },
    getResultCode: function (data) {
        var code = -1;
        if (!data) return code;
        data = eval('(' + data + ')');
        if (data)
            code = data.retcode;
        return code;
    }

}