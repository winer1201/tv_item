
function page_init() {
    myInstance.init();
}

var myInstance = {
    areacode: "",
    usercode: "",
    usersession: "",
    backUrl: "",
    data:null,
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.areacode = tp.util.getQueryString('areacode');
        that.usercode = tp.util.getQueryString("usercode");
        that.usersession = tp.util.getQueryString("usersession");
        that.backUrl = tp.util.getQueryString("backUrl");

        var url = config.cbs_user_getuserinfo;
        	url = common.setBaseParam(url);

        that.actionlog("进入", "");

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                formEvent.init({
                    doEsc: that.esc
                });
            }
        });

        tp.ajax({
            url: url,
            success: function (data) {
                //获取用户信息
                //加载数据
                var code = -1;
                var jsonObj = common.getResultObj(data);
                if (jsonObj != -1)
                    code = jsonObj.retcode;

                tp_ui.popup.loading.close();

                if (code != 0)
                    tp.util.showMsg("error(" + code + ")");
                else {
                    that.loadData(jsonObj);
                }              
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        })
    },
    loadData: function (data) {
        if (!data) return;
        var data = data.data;
        if (!data) return;
        //usercode
        var d_usercode = document.all("d_usercode");
        if(d_usercode && data.usercode)
            d_usercode.innerHTML = "<label id='lblUserCode'>" + data.usercode+ "</label>";
        //usermark
        var d_usermark = document.all("d_usermark");
        if(d_usermark && typeof (data.terminalusermark) == "string")
            d_usermark.innerHTML = "<label id='lblDevice'>" + data.terminalusermark + "</label>";
        //username
        var d_username = document.all("d_username");
        if (d_username && typeof (data.username) == "string")
            d_username.innerHTML = "<label id='lblName'>" + data.username + "</label>";
        //phone
        var d_phone = document.all("d_phone");
        if (d_phone && typeof (data.phone) == "string")
            d_phone.innerHTML = "<label id='lblphone'>" + data.phone + "</label>";
        //address
        var d_address = document.all("d_address");
        if (d_address && typeof (data.address) == "string")
            d_address.innerHTML = "<label id='lblphone'>" + data.address + "</label>";
        //qrcode
        var m_qrcode = document.all("myqrcode");
        if (m_qrcode && data.qrcodeurl && data.qrcodeurl != "") {
            var codeurl = data.qrcodeurl, ver = "";
            ver = Guid.NewGuid().ToString();
            codeurl = tp.util.appendParam(codeurl, "_ver", ver);
            m_qrcode.setAttribute("src", codeurl);
            m_qrcode.style.display = "";
        }
    },
    esc: function (key) {
        var that = myInstance;
        formEvent.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    actionlog: function (action, detail) {
        var that = myInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "我的信息页",
            detail: detail
        });
    }
}