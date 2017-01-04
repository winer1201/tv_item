

function page_init() {
    vedioInfo_new.init();
}

var vedioInfo_new = {
    play_content_code:"",
    content_code: "",
    backUrl: "",
    playUrl: "",
    data: null,
    control:null,
    focusid: "",
    playclick: "",
    playdefault: "",
    collectclick: "",
    collectdefault: "",
    collectCancelClick: "",
    collectCancelDefault: "",
    choiceclick: "",
    choicedefault:"",
    collected: 0,
    errorCode: 0,
    defaultid: "",
    isalbum:0,
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.playclick = config.portal_public_url + "img/videoinfo/video_playclick.png";
        that.playdefault = config.portal_public_url + "img/videoinfo/video_playdefault.png";
        that.collectclick = config.portal_public_url + "img/videoinfo/video_collectclick.png";
        that.collectdefault = config.portal_public_url + "img/videoinfo/video_collectdefault.png";
        that.collectCancelClick = config.portal_public_url + "img/videoinfo/video_collect_cancel_click.png";
        that.collectCancelDefault = config.portal_public_url + "img/videoinfo/video_collect_cancel_default.png";
        that.choiceclick = config.portal_public_url + "img/videoinfo/video_choiceclick.png";
        that.choicedefault = config.portal_public_url + "img/videoinfo/video_choicedefault.png";


        that.backUrl = tp.util.getQueryString('backUrl');
        that.content_code = tp.util.getQueryString('content_code');
        that.focusid = tp.util.getQueryString('focusid');

        that.play_content_code = that.content_code;

        that.actionlog("进入", "");

        var url = tp.util.appendParam(config.tps_content_info_url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "content_code", that.content_code);

        if (!that.focusid || that.focusid == "")
            that.focusid = "btnPlay";
        that.defaultid = that.focusid;

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                that.addlisten();
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
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    addlisten: function () {
        var that = vedioInfo_new;
        //初始化焦点事件
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid,
            extEsc: that.esc,
            extEnter:that.enter
        });
        that.control.begin();
        that.flushCollectImg();
    },
    initPageData: function (data) {
        var that = vedioInfo_new;
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
        var that = vedioInfo_new;
        var html = "";
        //poster
        document.all("poster").setAttribute("src", data.posterurl);
        //name
        document.all("lblname").innerHTML = data.contentname; //data.contentname;
        //director
        html = that.getTitleStr(data.lbl_directors, data.directors);
        //document.all("lbldirector").innerHTML = "导演：" + data.directors;
        document.all("lbldirector").innerHTML = html;
        //stars
        html = that.getTitleStr(data.lbl_stars, data.stars);
        document.all("lblstars").innerHTML = html;
        //document.all("lblstars").innerHTML = "演员：" + data.stars;
        //desc
        document.all("lbldesc").innerHTML = data.description;
        //playUrl
        that.playUrl = data.starturl;
        //collected 是否已收藏（0：未收藏；1：收藏）
        //that.collected = data.colected;
        //that.collected = 1;
        //that.flushCollectImg();
        //是否专辑
        if (data.isalbum && data.isalbum == 1) {
            that.formatAlbum();
        }
    },
    getTitleStr:function(lbl,value){
        var that = vedioInfo_new;
        var html = "";
        if (!value || value == "")
            return "";
        if (lbl && lbl != "")
            html = lbl + "：";
        html += value;
        return html;
    },
    formatAlbum:function(){
        var that = vedioInfo_new;
        var dchoice = document.all("dchoice");
        var btnPlay = document.all("btnPlay");
        var btnChoice = document.all("btnChoice");
        var btnCollect = document.all("btnCollect");

        if (!dchoice || !btnChoice)
            return;

        dchoice.style.display = "";
        btnPlay.setAttribute("data-right", "btnChoice");
        btnCollect.setAttribute("data-left", "btnChoice");
        btnChoice.setAttribute("data-left", "btnPlay");
        btnChoice.setAttribute("data-right", "btnCollect");

        if (that.data.detail_list && that.data.detail_list.length > 0) {
            that.play_content_code = that.data.detail_list[0].contentcode;
            that.playUrl = that.data.detail_list[0].starturl;
        }
    },
    loadUserData: function () {
        var that = vedioInfo_new;
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
        var that = vedioInfo_new;
        var ctr = that.control.curCtr;
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
    selid:function(id){
        var that = vedioInfo_new;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        var imgurl = "";
        if (id == "btnPlay") {
            imgurl = that.playclick;
        }
        else if (id == "btnChoice") {
            imgurl = that.choiceclick;
        }
        else {
            if (that.collected)
                imgurl = that.collectCancelClick;
            else
                imgurl = that.collectclick;
        }
        that.unselid(control.curid);

        ctr.src = imgurl;

        control.curCtr = ctr;
        control.curid = id;
    },
    unselid:function(id){
        var that = vedioInfo_new;
        var ctr = document.all(id);
        var control = this;

        if (!id || !ctr) return;

        var imgurl = "";
        if (id == "btnPlay") {
            imgurl = that.playdefault;
        } else if (id == "btnChoice") {
            imgurl = that.choicedefault;
        }
        else {
            if (that.collected)
                imgurl = that.collectCancelDefault;
            else
                imgurl = that.collectdefault;
        }
        ctr.src = imgurl;

        if (id == control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    },
    enter: function () {
        var that = vedioInfo_new;
        var control = this;
        var ctr = control.curCtr;
        if (!ctr) return;
        var id = ctr.getAttribute("id");
        if (id == "btnPlay") {//视频播放
            that.recordContentUse(function () {
                that.videoplay();
            });
        }//选集
        else if (id == "btnChoice") {
            //TODO:

        }
        else {//收藏或取消
            that.collect();
        }
    },
    esc: function (key) {
        var that = vedioInfo_new;
        that.control.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    //记录内容使用信息-最近使用
    recordContentUse: function (callback) {
        var that = vedioInfo_new;
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
    videoplay: function () {
        var that = vedioInfo_new;
        var url = "";
        var backUrl = config.portal_video_url;
        url = that.playUrl;

        if (!url || url == "") return;
        url = common.setBaseParam(url);
        backUrl = common.setBaseParam(backUrl);
        backUrl = tp.util.appendParam(backUrl, "content_code", that.content_code);
        backUrl = tp.util.appendParam(backUrl, "backUrl", encodeURIComponent(that.backUrl));
        backUrl = encodeURIComponent(backUrl);

        url = tp.util.appendParam(url, "backUrl", backUrl);
        tp.util.redirectUrl(url);
        that.actionlog("点击", "播放");
    },
    collect: function () {
        var that = vedioInfo_new;
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
        var that = vedioInfo_new;
        if (that.errorCode != 0) {
            tp.util.showMsg("error(" + code + ")");
        }
        else {
            if (that.collected == 0) {
                tp.util.showMsg("收藏成功");
                that.collected = 1;
            }
            else {
                tp.util.showMsg("取消成功");
                that.collected = 0;
            }
            that.flushCollectImg();
        }
    },
    actionlog: function (action, detail) {
        var that = vedioInfo_new;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "视频详情页new" + "[" + that.content_code + "]",
            detail: detail
        });
    }
}