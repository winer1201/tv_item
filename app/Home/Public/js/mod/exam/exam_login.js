function page_init() {
    exam_login.init();
}

function tp_extend_setparam() {
    exam_login.setParam();
}

var exam_login = {
    websitecode: "",
    backUrl: "",
    newreach_token: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.websitecode = tp.util.getQueryString("websitecode");
        that.backUrl = tp.util.getQueryString("backUrl");

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                that.location();
            }
        });

        that.getToken(function () {
            that.login();
        });        
    },
    login: function () {
        var that = this;
        var url = config.cbs_newreach_login + "?usercode=" + m_usercode + "&user_session=" + m_user_session;
        url = tp.util.appendParam(url, "username", tpconfig.newreach_username);
        url = tp.util.appendParam(url, "password", tpconfig.newreach_password);
        url = tp.util.appendParam(url, "record", 1);
        url = tp.util.appendParam(url, "devicetype", "1");
        url = tp.util.appendParam(url, "logintype", "1");

        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                var jsondata = that.initData(data);
                tp_ui.popup.loading.close();
                if (jsondata && jsondata.retcode == 0 && jsondata.data && jsondata.data.token && jsondata.data.token != "") {
                    that.newreach_token = jsondata.data.token;
                    tp_ui.popup.loading.close();
                }
                else {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("登陆失败");
                }                
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("登陆失败");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });

    },
    getToken:function(dologin)
    {
        var that = this;
        var url = config.cbs_newreach_gettoken + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        tp.ajax({
            url: url,
            success: function (data) {
                var jsondata = that.initData(data);                
                if (jsondata && jsondata.retcode == 0) {
                    if (jsondata.data && jsondata.data.token && jsondata.data.token != "") {
                        that.newreach_token = jsondata.data.token;
                        tp_ui.popup.loading.close();
                    }
                    else
                    {
                        tp_ui.popup.loading.close();
                        dologin();
                    }                        
                }
                else
                {
                    tp_ui.popup.loading.close();
                    dologin();
                }
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("登陆失败");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    location: function () {
        var that = this;
        var backUrl = "";
        var url = config.tp_tvportal_url + "index/showpage?websitecode=" + that.websitecode;
        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);
        url = tp.util.appendParam(url, "newreach_token", that.newreach_token);

        backUrl = encodeURIComponent(that.backUrl);
        url = tp.util.appendParam(url, "backUrl", backUrl);

        tp.util.redirectUrl(url);
    },
    initData: function (json) {
        var that = this;
        if (!json) return;
        var data = JSON.parse(json);
        return data;
    },
    setParam: function (url) {
        var that = this;
        url = tp.util.appendParam(url, "newreach_token", that.newreach_token);
        return url;
    }
}

