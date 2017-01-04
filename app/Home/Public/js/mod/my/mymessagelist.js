function page_init() {
    messagelist.init();
}
var messagelist = {
    focusid: "",
    datalist:[],
    init: function (options) {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.focusid = "td0";

        //tableEvent.init({
        //    defaultid: that.focusid,
        //    after_selctr: that.after_selctr,
        //    doMoveTD: that.movetd,
        //    doEsc: that.esc
        //});
        that.actionlog("进入", "");
        that.loaddata();
    },
    loaddata: function () {
        var that = messagelist;
        var url = config.cbs_message_querylist;

        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                tableEvent.init({
                    defaultid: that.focusid,
                    after_selctr: that.after_selctr,
                    doMoveTD: that.movetd,
                    doEsc: that.esc
                });
               
            }
        });
        //先加载用户数据
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                var list = null;
                if (data) {
                    list = JSON.parse(data);
                    if (list && list.data )
                        code = list.retcode;
                }
                if (code != 0) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    that.datalist = list.data;
                    that.initdata();
                    tp_ui.popup.loading.close();
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
        });
    },
    initdata:function(){
        var that = messagelist;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var html = "", messagetype = "",sendDate="";
        var table = null, move_down = "", move_up = "";
        var length = that.datalist.length;
        var emptyLength = 0;
        if (length > 10)
            length = 10;

        emptyLength = 10 - length;

        table = document.all("datatable");
        if (!table) return;

        for (var i = 0; i < length; i++) {
            var msg = that.datalist[i];
            if (i == 0)
                move_up = "";
            else
                move_up = ' data-up="td' + (i - 1) +'" ';
            if (i == length - 1)
                move_down = "";
            else
                move_down = ' data-down="td' + (i + 1) + '" ';
            if (msg.msgtype == 0)
                messagetype = "【系统消息】 ";
            //else
            //    messagetype = '普通消息';
            sendDate = new Date(msg.sendtime);
            sendDate = sendDate.toLocaleDateString();
            html += '<tr><td id="td' + i + '" index="' + i + '" ' + move_up + move_down + ' >';
            html += '<div class="tile" style="width:410px; height:33px;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; ">' + sendDate + '&nbsp;&nbsp;&nbsp;' + messagetype + msg.msgtitle + '</div>';
            html += '</td></tr>';
        }
        for (var i = 0; i < emptyLength; i++) {
            html += '<tr><td><div style="width:410px; height:33px;text-align:left; "></div></td></tr>';
        }
        table.innerHTML = html;
    },
    after_selctr: function (ctr) {
        var that = messagelist;
        if (!ctr) return;
        if (!that.datalist) return;

        var title = "", date = "", content = "", msg = null, sendDate = "";
        var tdid = ctr.getAttribute("id");
        var index = ctr.getAttribute("index");

        title = document.all("td_title");
        date = document.all("td_date")
        content = document.all("td_content");

        title.innerHTML = "";
        date.innerHTML = "";
        content.innerHTML = "";

        msg = that.datalist[index];
        if (!msg) {
            tp.util.showMsg("error");
            return;
        }

        sendDate = new Date(msg.sendtime);
        sendDate = sendDate.toLocaleDateString();

        title.innerHTML = "<h1>" + msg.msgtitle + "</h1>";
        date.innerHTML = "<h2>发送日期：" + sendDate + "</h2>";
        content.innerHTML = msg.msgcontent;
        //用户行为上报
        var detail = "";
        //that.actionlog("")

        that.readmsg(msg.msgid);
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
    },
    readmsg: function (msgid) {
        var that = messagelist;
        var url = config.cbs_message_read;
        var response = null;

        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);
        url = tp.util.appendParam(url, "msgid", msgid);

        //先加载用户数据
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                if (data) {
                    response = JSON.parse(data);
                    if (response)
                        code = response.retcode;
                }
                if (code != 0) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("消息读取失败(" + code + ")");
                }
                else {                    
                    tp_ui.popup.loading.close();
                    //tp.util.showMsg("消息读取成功");
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
        });
    }
}