
function page_init() {
    appInfoInstance.init();
}

var appInfoInstance = {
    cyber_AppCode:"",
    content_code: "",
    backUrl: "",
    playUrl: "",
    data: null,
    focusid: "",
    playclick: "",
    playdefault: "",
    collectclick: "",
    collectdefault: "",
    collectCancelClick: "",
    collectCancelDefault: "",
    collected: 0,
    errorCode: 0,
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.playclick = config.portal_public_url + "img/appinfo/app_startclick.png";
        that.playdefault = config.portal_public_url + "img/appinfo/app_startdefault.png";
        that.collectclick = config.portal_public_url + "img/videoinfo/video_collectclick.png";
        that.collectdefault = config.portal_public_url + "img/videoinfo/video_collectdefault.png";
        that.collectCancelClick = config.portal_public_url + "img/videoinfo/video_collect_cancel_click.png";
        that.collectCancelDefault = config.portal_public_url + "img/videoinfo/video_collect_cancel_default.png";

        that.backUrl = tp.util.getQueryString('backUrl');
        that.content_code = tp.util.getQueryString('content_code');
        that.focusid = tp.util.getQueryString('focusid');

        var url = tp.util.appendParam(config.tps_content_info_url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "content_code", that.content_code);

        if (!that.focusid || that.focusid == "")
            that.focusid = "btnStart";

        that.actionlog("进入", "");

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                formEvent.init({
                    defaultid: that.focusid,
                    dosel: that.selCtr,
                    dounsel: that.unSelCtr,
                    doEnter: that.enter,
                    doEsc: that.esc
                });
            }
        });

        //获取数据
        tp.ajax({
            url: url,
            success: function (data) {
                //加载用户数据
                that.loadUserData();
                //数据格式化
                that.initPageData(data);
                //加载页面数据
                that.loadData(that.data);
                //that.changeNav(that.curNavCode, false, true);     

                tp_ui.popup.loading.close();
            },
            error: function (status) {
                console.log(status);
                tp_ui.popup.loading.close();
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    initPageData: function (data) {
        var that = appInfoInstance;
        if (data == null || data == undefined)
            return;
        var response = JSON.parse(data);
        if (!response || response.retcode != 0)
            return;
        if (!response.data)
            return;

        that.data = response.data;
    },
    //加载页面数据
    loadData: function (data) {
        if (!data || data == "") return;
        var that = appInfoInstance;
        //poster
        document.all("poster").setAttribute("src", data.posterurl);
        //name
        document.all("lblAppName").innerHTML = data.contentname; //data.contentname;
        //contentinfo
        document.all("lblAppInfo").innerHTML = data.general;
        //desc
        document.all("lbldesc").innerHTML = data.description;
        //playUrl
        that.playUrl = data.starturl;
        //datacode
        if (data.contentcode == 'code500')
            data.datacode = '55';
        else if (data.contentcode == 'code501')
            data.datacode = '57';
        that.cyber_AppCode = data.datacode;
        //collected 是否已收藏（0：未收藏；1：收藏）
        //that.collected = data.colected;
        //that.collected = 1;
        that.flushCollectImg();
    },
    loadUserData: function () {
        var that = appInfoInstance;
        var url = config.cbs_user_getcollectlist + "?usercode=" + m_usercode + "&user_session=" + m_user_session + "&contentcode=" + that.content_code;
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                if (!data)
                    tp.util.showMsg("error");
                data = eval('(' + data + ')');
                if (data)
                    code = data.retcode;
                if (code != 0) {
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    if (data.data.totalaccount > 0) {//已收藏
                        that.collected = 1;
                    }
                        //未收藏
                    else {
                        that.collected = 0;
                    }
                }
            },
            async: false,
            error: function (status) {
                console.log(status);
                tp.util.showMsg("error");
            },
            loading: function () {
                console.log('loadUserInfo');
            }
        });
    },
    flushCollectImg: function () {
        var that = appInfoInstance;
        var ctr = formEvent.curCtr;
        var id = "";
        if (ctr) {
            id = ctr.getAttribute("id");
        }
        if (that.collected == 1) {
            if (id == "btnCollect")
                document.all("btnCollect").src = that.collectCancelClick;
            else
                document.all("btnCollect").src = that.collectCancelDefault;
        }
        else {
            if (id == "btnCollect")
                document.all("btnCollect").src = that.collectclick;
            else
                document.all("btnCollect").src = that.collectdefault;
        }

    },
    selCtr: function (ctr) {
        if (!ctr) return;
        var that = appInfoInstance;
        var id = ctr.getAttribute("id");
        var imgurl = "";
        if (id == "btnStart") {
            imgurl = that.playclick;
        }
        else {
            if (that.collected)
                imgurl = that.collectCancelClick;
            else
                imgurl = that.collectclick;
        }
        formEvent.unselctr(formEvent.curCtr);
        ctr.src = imgurl;
        formEvent.curCtr = ctr;
    },
    unSelCtr: function (ctr) {
        if (!ctr) return;
        var that = appInfoInstance;
        var id = ctr.getAttribute("id");
        var imgurl = "";
        if (id == "btnStart") {
            imgurl = that.playdefault;
        }
        else {
            if (that.collected)
                imgurl = that.collectCancelDefault;
            else
                imgurl = that.collectdefault;
        }
        ctr.src = imgurl;
        formEvent.curCtr = null;
    },
    enter: function () {
        var that = appInfoInstance;
        var ctr = formEvent.curCtr;
        if (!ctr) return;
        var id = ctr.getAttribute("id");
        if (id == "btnStart") {//应用启动
            that.actionlog("点击", "启动");
            tp_ui.popup.loading.show({
                closeCallBack: function () {
                    //初始化焦点事件
                    formEvent.init({
                        defaultid: that.focusid,
                        dosel: that.selCtr,
                        dounsel: that.unSelCtr,
                        doEnter: that.enter
                    });
                }
            });
            that.recordContentUse(function () {
                that.appstart();
            });
        }
        else {//收藏或取消
            that.collect();
        }
    },
    esc :function(key){
        var that = appInfoInstance;
        var backUrl = tp.util.getQueryString("backUrl");
        if (!backUrl) return;
        tp.util.redirectUrl(backUrl);
        that.actionlog("外设返回", "");
    },
    //记录内容使用信息-最近使用
    recordContentUse: function (callback) {
        var that = appInfoInstance;
        var url = config.cbs_user_recordcontenthis + "?usercode=" + m_usercode + "&user_session=" + m_user_session + "&contentcode=" + that.content_code;
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                if (!data)
                    tp.util.showMsg("error");
                data = eval('(' + data + ')');
                if (data)
                    code = data.retcode;
                if (code != 0) {
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    if (callback)
                        callback();
                }
            },
            async: false,
            error: function (status) {
                console.log(status);
                tp.util.showMsg("error");
            },
            loading: function () {
                console.log('loadUserInfo');
            }
        });
    },
    appstart: function () {
        var that = appInfoInstance;
        var url = "",backParam="";
        var backUrl = config.portal_video_url;
        var retcode=0;
        url = that.playUrl;

        backParam = common.setBaseParam(backParam);
        backParam = tp.util.appendParam(backParam, "content_code", that.content_code);
        backParam = tp.util.appendParam(backParam, "backUrl", encodeURIComponent(that.backUrl));
        backParam = tp.util.base64_encode(backParam);
        backParam = "tp_action=exitapp&tp_page=appinfo&tp_page_params=" + backParam;

        var result = CyberHelper.StartCloudApp(that.cyber_AppCode, backParam);

        if (result)
            retcode = result.retcode;
        else
            retcode = -1;

        if (retcode != 0) {
            tp_ui.popup.loading.close();
            tp.util.showMsg("error(" + retcode + ")");
        }


        //if (!url || url == "") return;
        //tp.util.showMsg("not suppurted.");
        //return;
        //backUrl = common.setBaseParam(backUrl);
        //backUrl = tp.util.appendParam(backUrl, "content_code", that.content_code);
        //backUrl = tp.util.appendParam(backUrl, "backUrl", encodeURIComponent(that.backUrl));
        //backUrl = encodeURIComponent(backUrl);

        //url = tp.util.appendParam(url, "backUrl", backUrl);
        //tp.util.redirectUrl(url);
    },
    collect: function () {
        var that = appInfoInstance;
        tp_ui.popup.loading.show({
            closeCallBack: that.collectCallBack
        });
        var colcode = -1;
        var url = config.cbs_user_collect + "?usercode=" + m_usercode + "&user_session=" + m_user_session + "&contentcode=" + that.content_code + "&collecttype=";
        if (that.collected == 0) {
            url += "0";
            that.actionlog("点击", "收藏");
        }
        else {
            url += "1";
            that.actionlog("点击", "取消收藏");
        }
        that.errorCode = -1;
        tp.ajax({
            url: url,
            success: function (data) {
                tp_ui.popup.loading.close();
                if (data) {
                    data = eval('(' + data + ')');
                    if (data)
                        that.errorCode = data.retcode;
                }
            },
            error: function (status) {
                console.log(status);
                tp_ui.popup.loading.close();
            },
            loading: function () {
                console.log('loadUserInfo');
            }
        });
    },
    collectCallBack: function () {
        var that = appInfoInstance;
        if (that.errorCode != 0) {
            tp.util.showMsg("error(" + code + ")");
        }
        else {
            if (that.collected == 0) {
                tp.util.showMsg("收藏成功！");
                that.collected = 1;
            }
            else {
                tp.util.showMsg("取消成功！");
                that.collected = 0;
            }
            that.flushCollectImg();
        }
    },
    actionlog: function (action, detail) {
        var that = appInfoInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "应用详情页" + "[" + that.content_code + "]",
            detail: detail
        });
    }
}