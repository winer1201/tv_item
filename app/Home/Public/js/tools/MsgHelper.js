var TpMsgHelper = {
    MsgObj: null,
    Init: function (options) {
        var that = TpMsgHelper;
        if (!options)
            options = {};
        options.CallBack = that.EscMsg;
        that.MsgObj = new MessageManager(options);
        that.MsgObj.Start();
    },
    EscMsg: function (list) {
        if (!list || list.length <= 0) return;
        var msg = null, msgdata = null;
        var url = "", backUrl = "", isPlayUrl = "", album_code = "";
        for (var i = 0; i < list.length; i++) {
            msg = list[i];
            if (msg.messagetype != 0) {
                continue;
            }
                
            if (!msg.messagedata || msg.messagedata == null || msg.messagedata == "")
                continue;
            msgdata = eval('(' + msg.messagedata + ')');
            if (!msgdata)
                continue;
            isPlayUrl = tp.util.getQueryString("from_play_msg");
            if (isPlayUrl == "1")
                backUrl = tp.util.getQueryString("backUrl");
            else
                backUrl = window.location.href;
            backUrl = encodeURIComponent(backUrl);

            if (msgdata.action == 0) {//页面切换
                if (msgdata.contentcode == "CT012016082601000") {//老年餐厅
                    url = config.portal_restaurant_list_url;
                    url = common.setBaseParam(url);
                    url = tp.util.appendParam(url, "album_code", msgdata.contentcode);
                    //页面点播时，为了防止页面嵌套过多，强制返回至首页
                    backUrl = config.portal_home_url;
                    backUrl = common.setBaseParam(backUrl);
                    backUrl = encodeURIComponent(backUrl);
                }
            }
            else if (msgdata.action == 1) {//视频点播
                url = msgdata.playurl;
                url = common.setBaseParam(url);
                //url = tp.util.appendParam(url, "usercode", m_usercode);
                //url = tp.util.appendParam(url, "user_session", m_user_session);
            }
            else if (msgdata.action == 2) {//游戏启动
                //TODO:代处理，需要调用游戏启动
            }
            else if (msgdata.action == 3) {//专辑列表页
                url = config.portal_album_url;
                url = common.setBaseParam(url);
                url = tp.util.appendParam(url, "album_code", msgdata.contentcode);
                //页面点播时，为了防止页面嵌套过多，强制返回至首页
                backUrl = config.portal_home_url;
                backUrl = common.setBaseParam(backUrl);
                backUrl = encodeURIComponent(backUrl);
            }

            url = tp.util.appendParam(url, "from_play_msg", "1");
            url = tp.util.appendParam(url, "backUrl", backUrl);
            tp.util.redirectUrl(url);
        }
    }
}

var MessageManager = function (options) {
    var that = this;
    var flag = false;
    var exec = function () {
        if (!flag) return;

        getMessage();

        if (!flag) return;
        window.setTimeout(exec, that.ExceInterval);
    }

    var printLog = function (msg) {
        if (that.Print)
            that.Print(msg);
        console.log(msg);
    }

    var getMessage = function () {
        var url = config.gsm_report_url + "?usercode=" + m_usercode + "&usersession="
                                        + m_user_session + "&userstatus=" + that.UserStatus
                                        + "&contentcode=" + that.ContentCode;
        tp.ajax({
            async:false,
            url: url,
            success: function (data) {
                var code = -1;
                var msglist = null;
                printLog("response-data:" + data);
                if (!data)
                {
                    printLog("MessageManager :: response error.");
                    return;
                }                 
                data = eval('(' + data + ')');
                if (data)
                    code = data.retcode;
                if (code != 0) {
                    printLog("MessageManager :: response code - [" + code + "].");
                    if (code == 131011) {//session 失效,则停止轮询
                        printLog("MessageManager :: session check failed,stop report!!");
                        that.Stop();
                    }
                    return;
                }
                else {
                    msglist = data.data;
                    if (msglist && msglist.length > 0) {
                        if (that.CallBack)
                            that.CallBack(msglist);
                    }
                    else
                    {
                        printLog("MessageManager :: message is empty.");
                    }
                }
            },
            error: function (status) {
                printLog("MessageManager :: error - ajax-status - [" + status.readyState + "]");
            },
            loading: function () {
                printLog("MessageManager :: loading - loading");
            }
        });
    }
    this.Print=function(msg){
     
    };
    this.ExceInterval = 1000;
    this.UserStatus = 0;
    this.ContentCode = "";
    this.CallBack = null;
    this.Start = function () {
        if (flag) return;
        flag = true;
        //获取奇好用户信息
        var url = config.cbs_qihao_getuser;
        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);

        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                if (data) {
                    var jsondata = JSON.parse(data);
                    if (jsondata && jsondata.retcode == 0 && jsondata.data && jsondata.data.extid && jsondata.data.extid != "") {
                        window.setTimeout(exec, that.ExceInterval);
                    }
                    else {
                        console.log("data-error");
                    }
                }
                else {
                    console.log("data-error");
                }
            },
            error: function (status) {
                console.log("data-error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
        
    }

    this.Stop = function () {
        flag = false;
    }

    if (options) {
        if (options.UserStatus)
            that.UserStatus = options.UserStatus;
        if (options.ContentCode)
            that.ContentCode = options.ContentCode;
        if (options.ExceInterval)
            that.ExceInterval = options.ExceInterval;
        if (options.CallBack)
            that.CallBack = options.CallBack;
    }
}