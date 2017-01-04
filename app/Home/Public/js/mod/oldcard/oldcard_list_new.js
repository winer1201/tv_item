//document.body.onload = function () {
//    oldcard_list_instance.init();
//}

function page_init() {
    oldcard_list_instance.init();
}

var oldcard_list_instance = {
    control: null,
    focusid: "",
    backUrl: "",
    defaultid: "td0",
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();

        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");

        if (that.focusid && that.focusid != "")
            that.defaultid = that.focusid;

        that.actionlog("进入", "");
        //监听外设消息
        that.addlisten();
    },
    addlisten: function () {
        var that = oldcard_list_instance;
        that.control = new tableevent({
            extEsc: that.esc,
            extEnter: that.enter,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    esc:function(key){
        var that = oldcard_list_instance;
        var backUrl = tp.util.getQueryString("backUrl");
        tp.util.redirectUrl(backUrl);

        that.actionlog("外设返回", "");
    },
    enter:function(key){
        var that = oldcard_list_instance;
        var ctr = that.control.curCtr;
        if (!ctr) return;

        var id = ctr.getAttribute("id");
        var callback = "", url = "";

        callback = config.portal_oldcard_list_url;
        callback = common.setBaseParam(callback);
        //callback = tp.util.appendParam(callback, "areacode", that.areacode);
        callback = tp.util.appendParam(callback, "focusid", id);
        callback = tp.util.appendParam(callback, "backUrl", encodeURIComponent(that.backUrl));
        callback = encodeURIComponent(callback);

        if (id == "td2")//新增绑定
            url = config.portal_oldcard_bind_url;
        else //查看绑定
            url = config.portal_oldcard_info_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", callback);

        tp.util.redirectUrl(url);

        var detail = "";
        if (id == "td2")
            detail = "新增绑定";
        else
            detail = "老年卡[" + id + "]";
        that.actionlog("点击", detail);
    },
    actionlog: function (action, detail) {
        var that = oldcard_list_instance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "老年卡列表页",
            detail: detail
        });
    }
}