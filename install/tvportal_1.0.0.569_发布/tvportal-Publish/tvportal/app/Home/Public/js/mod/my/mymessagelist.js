function page_init() {
    messagelist.init();
}
var messagelist = {
    focusid: "",
    init: function (options) {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.focusid = "td0";

        tableEvent.init({
            defaultid: that.focusid,
            //noMove: that.noMove,
            //doEnter: that.enter,
            after_selctr: that.after_selctr,
            doMoveTD: that.movetd,
            doEsc: that.esc
            //after_unselctr: that.after_unselctr
            //doEsc:that.esc
        });
        that.actionlog("进入", "");
    },
    after_selctr: function (ctr) {
        var that = messagelist;
        if (!ctr) return;
        var tdid = ctr.getAttribute("id");

        var title = document.all("td_title");
        var date = document.all("td_date")
        var content = document.all("td_content");

        if (tdid == "td0") {
            title.innerHTML = "<h1>登陆送鸡蛋</h1>";
        } else if (tdid == "td1") {
            title.innerHTML = "<h1>扫码送油</h1>";
        } else if (tdid == "td2") {
            title.innerHTML = "<h1>鸡蛋免费</h1>";
        } else if (tdid == "td3") {
            title.innerHTML = "<h1>瓜子免费</h1>";
        } else if (tdid == "td4") {
            title.innerHTML = "<h1>免费体检</h1>";
        } else if (tdid == "td5") {
            title.innerHTML = "<h1>周末旅游</h1>";
        } else if (tdid == "td6") {
            title.innerHTML = "<h1>横扫夏日</h1>";
        } else if (tdid == "td7") {
            title.innerHTML = "<h1>夕阳红</h1>";
        } else if (tdid == "td8") {
            title.innerHTML = "<h1>健康讲堂</h1>";
        } else if (tdid == "td9") {
            title.innerHTML = "<h1>献爱心活动</h1>";
        }
        //用户行为上报
        var detail = "";
        //that.actionlog("")
    },
    movetd:function(attr){
        var that = messagelist;
        var action = "", detail = "";
        var ctr = null;
        if(attr == tp_enum_moveData.up)
            action = "上移";
        else if(attr == tp_enum_moveData.down)
            action = "下移";
        else if(attr == tp_enum_moveData.left)
            action = "左移";
        else if(attr == tp_enum_moveData.right)
            action = "右移";

        ctr = tableEvent.curCtr;
        if (ctr != null) {
            var tdid = ctr.getAttribute("id");
            var title = document.all("td_title");
            detail = "tdid[" + tdid + "]_title[" + title + "]";
        }
        that.actionlog(action, detail);

        tableEvent.baseMoveTD(attr);
    },
    esc: function (key) {
        var that = messagelist;
        tableEvent.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    actionlog: function (action, detail) {
        var that = messagelist;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "消息列表页",
            detail: detail
        });
    }
}