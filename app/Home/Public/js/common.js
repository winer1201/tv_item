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
        config.tp_pics_url = m_tp_pics_url;
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
        //工具页面
        config.portal_toolbar_url=siteUrl+"ToolBar/index";
        //列表页
        config.portal_list_url = siteUrl + "list";
        //列表-分类资源列表页
        config.portal_list_category_url = siteUrl + "list/category";        
        //视频详情页
        //config.portal_video_url = siteUrl + "video";
        config.portal_video_url = siteUrl + "video/info";
        //最新热舞
        config.portal_dance_url = siteUrl + "list/dance";
        //视频详情页
        config.portal_vedio_new_url = siteUrl + "video/info";        
        //视频播放页
        config.Portal_video_play_url = siteUrl + "video/player";
        //应用详情页
        config.portal_app_url = siteUrl + "index.php/app";
        //应用启动页
        config.portal_app_start_url = siteUrl + "app/start";//?平台提供
        //个人信息地址
        config.portal_myinfo_url = siteUrl + "my/gai";
        //改版个人信息页
    	//config.portal_myinfo_gai_url = siteUrl + "my/gai",
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
        config.portal_restaurant_food_url = siteUrl + "Restaurant/food_list";
        //老年餐厅-列表页
        config.portal_restaurant_list_url = siteUrl + "list/restaurant";
        //老年餐厅-购物车页
        config.portal_restaurant_cart_url = siteUrl + "restaurant/cart";
        //老年餐厅-订单新增页
        config.portal_restaurant_order_add_url = siteUrl + "restaurant/order_add";
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
        //单栏目页面
        config.portal_column_url = siteUrl + "ColumnPage/index";
        //体检-血糖趋势图页面
        config.portal_exam_bloodsugar_trend_url = siteUrl + "exam/bloodsugar_trend";
        //体检-糖耐趋势图页面
        config.portal_exam_bloodsugar_tolerance_url = siteUrl + "exam/bloodsugar_tolerance";
        //体检-血糖历史数据页面
        config.portal_exam_bloodsugar_data_url = siteUrl + "exam/bloodsugar_data";
        //体检-心电图页面
        config.portal_exam_electrocardiogram_url = siteUrl + "exam/electrocardiogram";
        //体检-心电图 - 历史数据页面
        config.portal_exam_electrocardiogram_data_url = siteUrl + "exam/electrocardiogram_data_new";
        //体检-血氧页面
        config.portal_exam_bloodoxygen_url = siteUrl + "exam/bloodoxygen";
        //体检-血氧 - 血氧趋势图页面
        config.portal_exam_bloodoxygen_trend_url = siteUrl + "exam/bloodoxygen_trend";
        //体检-血氧 - 历史数据页面
        config.portal_exam_bloodoxygen_data_url = siteUrl + "exam/bloodoxygen_data";
        //体检-运动量页面
        config.portal_exam_exercise_url = siteUrl + "exam/exercise";
        //体检-运动量 - 运动量趋势图页面
        config.portal_exam_exercise_trend_url = siteUrl + "exam/exercise_trend";
        //体检-运动量 - 运动量历史数据页面
        config.portal_exam_exercise_data_url = siteUrl + "exam/exercise_data";
        //体检-睡眠页面
        config.portal_exam_sleep_url = siteUrl + "exam/sleep";
        //体检-睡眠 - 睡眠趋势图页面
        config.portal_exam_sleep_trend_url = siteUrl + "exam/sleep_trend";
        //体检-睡眠 - 睡眠历史数据页面
        config.portal_exam_sleep_data_url = siteUrl + "exam/sleep_data";
        //体检-肺功能页面
        config.portal_exam_pulmonary_url = siteUrl + "exam/pulmonary";
        //体检-肺功能 - 肺功能历史数据页面
        //config.portal_exam_pulmonary_data_url = siteUrl + "exam/pulmonary_data";
        //体检-体温页面
        config.portal_exam_temperature_url = siteUrl + "exam/temperature";
        //体检-体温 - 体温趋势图页面
        config.portal_exam_temperature_trend_url = siteUrl + "exam/temperature_trend";
        //体检-体温 - 体温历史数据页面
        config.portal_exam_temperature_data_url = siteUrl + "exam/temperature_data";
        //体检-体重成分页面
        config.portal_exam_weight_url = siteUrl + "exam/weight";
        //体检-体重成分 - 体重成分趋势图页面
        config.portal_exam_weight_trend_url = siteUrl + "exam/weight_trend";
        //体检-体重成分 - 体重成分历史数据页面
        config.portal_exam_weight_data_url = siteUrl + "exam/weight_data";
        //体检-血脂
        config.portal_exam_bloodfat_url = siteUrl + "exam/bloodfat";
        //体检-血脂 - 体温趋势图页面
        config.portal_exam_bloodfat_trend_url = siteUrl + "exam/bloodfat_trend";
        //体检-血脂 - 血脂历史数据页面
        config.portal_exam_bloodfat_data_url = siteUrl + "exam/bloodfat_data";

        //商城-购物车页
        config.portal_goods_cart_url = siteUrl + "goods/cart";
        //商城-商品信息页
        config.portal_goods_info_url = siteUrl + "goods/info";
        //商城-商品下单页
        config.portal_goods_order_url = siteUrl + "goods/order";
        //商城-商品订单新增页
        config.portal_goods_order_add_url = siteUrl + "goods/order_add";
        //商城-商品订单信息页
        config.portal_goods_order_info_url = siteUrl + "goods/order_info";
        //商城-商品订单列表页
        config.portal_goods_order_list_url = siteUrl + "goods/order_list";
        //陪护-首页
        config.portal_accompany_index_url = siteUrl + "accompany";
        //陪护-预定1页
        config.portal_accompany_order1_url = siteUrl + "accompany/order1";
        //陪护-预定2页
        config.portal_accompany_order2_url = siteUrl + "accompany/order2";
        //陪护-预定3页
        config.portal_accompany_order3_url = siteUrl + "accompany/order3";
        //陪护-预定4页
        config.portal_accompany_order4_url = siteUrl + "accompany/order4";
        //陪护-预定结果页
        config.portal_accompany_result_url = siteUrl + "accompany/result";

        //月度之星--------------------------------------------------------
        //带分类筛选的列表页
        config.portal_list_search_url = siteUrl + "list/list_search";
        //月度之星详情页
        config.portal_star_info_url = siteUrl + "info/wu_details";
        //名师详情页
        config.portal_mingteach_info_url + "info/details";

        //TPS地址初始化
        //tps模板列表信息获取地址
        config.tps_getpagedata_url = config.tp_tps_url + "pageconfig/getpagedata";
        //tps内容信息获取地址
        config.tps_content_info_url = config.tp_tps_url + "pageconfig/getcontentinfo";
        //
        config.tps_content_list_url = config.tp_tps_url + "pageconfig/getcontentlist";
        //tps获取分类子分类列表
        config.tps_category_list_url = config.tp_tps_url + "pageconfig/getcategorydetail";
        //工具栏
		config.tps_tool_url = config.tp_tps_url + "pageconfig/gettoollist";
        //CBS地址初始化
        //获取用户信息接口地址
        config.cbs_user_getuserinfo = config.tp_cbs_url + "user/getuserinfo";
        //获取月度之星点赞数量接口
        config.cbs_yuedu_getdianzan=config.tp_cbs_url+"starvote/getvotelist";
        //获取用户点赞列表
        config.cbs_user_getdianzan=config.tp_cbs_url+"starvote/myvote";
        //用户点赞提交接口
        config.cbs_user_setdianzan=config.tp_cbs_url+"starvote/vote";
        //内容收藏或取消接口地址
        config.cbs_user_collect = config.tp_cbs_url + "user/contentcollect";
        //内容收藏列表接口地址
        config.cbs_user_getcollectlist = config.tp_cbs_url + "user/getusercollect";
        //记录用户内容最近使用接口地址
        config.cbs_user_recordcontenthis = config.tp_cbs_url + "user/recordcontentuseinfo";
        //获取用户最近使用列表
        config.cbs_user_getcontentusehis = config.tp_cbs_url + "user/getcontentusehis";
        //用户消息获取列表
        config.cbs_message_querylist = config.tp_cbs_url + "user/messagelist";
        //用户消息读取接口
        config.cbs_message_read = config.tp_cbs_url + "user/readmessage";
        //用户行为日志记录
        config.cbs_action_recordactionlog = config.tp_cbs_url + "ActionLog/record";
        //体检中心-newreach-登陆
        config.cbs_newreach_login = config.tp_cbs_url + "NewReach/login";
        //体检中心-newreach-获取token
        config.cbs_newreach_gettoken = config.tp_cbs_url + "NewReach/gettoken";
        //体检中心-newreach-获取用户数据
        config.cbs_newreach_userinfo = config.tp_cbs_url + "NewReach/userinfo";
        //体检中心-newreach-获取测量趋势图
        config.cbs_newreach_healthtrend = config.tp_cbs_url + "NewReach/healthtrend";
        //体检中心-newreach-获取测量数据
        config.cbs_newreach_healthdata = config.tp_cbs_url + "NewReach/healthdata";
        //体检中心-newreach-获取心电图
        config.cbs_newreach_healthecg = config.tp_cbs_url + "NewReach/healthecg";
        //奇好-获取绑定用户信息
        config.cbs_qihao_getuser = config.tp_cbs_url + "QiHao/getuser";

        //gsm
        config.gsm_report_url = config.tp_gsm_url + "session/report";

        //pics
        config.pics_qrcode_url = config.tp_pics_url + "qrcode";

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
                    case "8"://体重成分
                        url = config.portal_exam_weight_url;
                        break;
                    case "9"://血脂
                        url = config.portal_exam_bloodfat_url;
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
                if (targetcode == "")
                    targetcode = tdCtr.getAttribute("content_code");
                break;
                //应用
            case "1":
                targetcode = tdCtr.getAttribute("appcode");
                if (targetcode == "")
                    targetcode = tdCtr.getAttribute("content_code");
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
        url = tp.util.appendParam(url, "areacode", m_areacode);
       
        var newreach_token = tp.util.getQueryString("newreach_token");
        if (newreach_token && newreach_token != "")
            url = tp.util.appendParam(url, "newreach_token", newreach_token);
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