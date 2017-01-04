function page_init() {
    historyInstance.init();
}

var historyInstance = {
    list: null,
    focusid: "",
    backUrl: "",
    pageIndex: 0,
    itemTotal: 0,
    pageNumber: 0,
    maxRow: 2,
    maxCol: 6,
    pageName: "",
    defaultid: "td0",
    init: function () {
        var that = historyInstance;
        var index = 1;
        that.pageName = "最近使用";
        //加载背景图片
        loadingHelper.loadbg();

        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");

        index = tp.util.getQueryString("pageIndex");
        if (!index || index == "" || index < 1)
            index = 1;


        if (that.focusid && that.focusid != "")
            that.defaultid = that.focusid;

        that.loadData(index);
    },
    loadData: function (index) {
        var that = historyInstance;

        var count = 12, offset = 0;
        var url = config.cbs_user_getcontentusehis;

        index = parseInt(index);
        count = that.maxCol * that.maxRow;
        offset = (index - 1) * count;

        url = tp.util.appendParam(url, "usercode", m_usercode);
        url = tp.util.appendParam(url, "user_session", m_user_session);
        url = tp.util.appendParam(url, "count", count);
        url = tp.util.appendParam(url, "offset", offset);

        if (that.focusid && that.focusid != "")
            that.defaultid = that.focusid;

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                tableEvent.init({
                    defaultid: that.defaultid,
                    doEnter: that.enter,
                    noMove: that.noMove,
                    after_selctr: that.after_selctr,
                    after_unselctr: that.after_unselctr,
                    doEsc: that.esc
                });
                //记录用户行为
                var detail = that.getActionDetail();
                that.actionlog("进入", detail);
            }
        });
        //先加载用户数据
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                if (data) {
                    var list = JSON.parse(data);
                    if (list && list.data && list.data.contentlist)
                        code = list.retcode;
                }
                if (code != 0) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    that.pageIndex = index;
                    that.loadContentList(list.data);
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
    loadContentList: function (datalist) {
        var that = historyInstance;
        //数据格式化
        var code_array = "";
        that.itemTotal = datalist.totalaccount;
        for (var i = 0; i < datalist.contentlist.length; i++) {
            if (i > 0)
                code_array += ",";
            code_array += datalist.contentlist[i].contentcode;
        }
        var url = config.tps_content_list_url;
        url = tp.util.appendParam(url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "content_scope", "list");
        url = tp.util.appendParam(url, "content_code_array", code_array);

        //获取内容UI信息
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                var list = null;
                if (data) {
                    list = JSON.parse(data);
                    if (list && list.data)
                        code = list.retcode;
                }
                if (code != 0) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    that.initData(list);
                    loadingHelper.loadimg();
                    tp_ui.popup.loading.close();
                }
            },
            async: false,
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
    initData: function (list) {
        var that = historyInstance;
        //that.itemTotal = list.totalcount;
        that.list = list;
        that.pageNumber = Math.ceil(that.itemTotal / (that.maxCol * that.maxRow));
        if (that.pageNumber < that.pageIndex)
            that.pageIndex = that.pageNumber;
        //初始化标题
        that.formatTitle();
        //初始化页码
        that.formatNumber();
        //初始化列表
        that.formatTableData(that.list.data);
    },
    //格式化标题
    formatTitle: function () {
        var that = historyInstance;
        var title = that.list.category_name;
        title = that.pageName;
        var divTitle = document.all("page-title");
        if (!divTitle) return;
        divTitle.innerHTML = "<label id='lbltitle'>" + title + "</label>";
    },
    //格式化页码
    formatNumber: function () {
        var that = historyInstance;
        var divNumber = document.all("page-number");
        if (!divNumber) return;
        divNumber.innerHTML = "<label>" + that.pageIndex + "</label><label style='font-size: 20px;'>/" + that.pageNumber + "</label>";
    },
    //格式化数据列表
    formatTableData: function (datalist) {
        var that = historyInstance;
        var html = "", img = "", name = "", smname = "", jumptype = "", data_left = "", data_up = "", data_right = "", data_down = "", guid = "";
        var num = 0, account = 0;
        var dimgurl = "", appcode = "", videocode = "";
        var contentInfo = null;
        dimgurl = config.portal_public_url + "img/default/default_list.png";
        //dimgurl = "";
        guid = Guid.NewGuid().ToString();
        html += "<table id=" + guid + " class='layout'>";
        account = datalist.length;
        for (var row = 0; row < 2; row++) {
            html += "<tr>"
            for (col = 0; col < 6; col++) {

                if (account > num) {
                    contentInfo = datalist[num];
                    img = contentInfo.smimgurl;
                    if (img == null || img == undefined || img == "undefined")
                        img = "";
                    name = contentInfo.contentname;

                    if (name.length > 7) {
                        smname = name.substring(0, 7);
                        smname += "..";
                    }
                    else {
                        smname = name;
                    }

                    img = "<img class='lazy' data-src='" + img + "' src = '" + dimgurl + "'>";
                    //data_left
                    if (row == 0 && col == 0)
                        data_left = "";
                    else
                        data_left = "td" + (num - 1);
                    //data_right
                    if (num >= account - 1)
                        data_right = "";
                    else
                        data_right = "td" + (num + 1);
                    //data_up | data_down
                    if (row == 0) {
                        data_up = "";
                        if (num + 7 <= account)
                            data_down = "td" + (num + 6);
                    }
                    else {
                        data_up = "td" + (num - 6);
                        data_down = "";
                    }
                    if (contentInfo.contenttype == 0) {
                        videocode = contentInfo.contentcode;
                        jumptype = 0;
                    }
                    else {
                        appcode = contentInfo.contentcode;
                        jumptype = 1;
                    }

                    html += "<td id='td" + num + "' style='width: 182px; height: 198px;' jumptype='" + jumptype
                            + "' data-left='" + data_left + "' data-up='" + data_up + "' data-right='" + data_right + "' data-down='" + data_down
                            + "' appcode='" + appcode + "' videocode='" + videocode + "'><div class='tile'>";
                    html += img;
                    html += "</div><div class='content-info' data-title='" + name + "'><label>";
                    html += smname;
                    html += "</label></div></td>";
                }
                else {
                    img = "";
                    name = "";
                    smname = "";
                    data_left = "";
                    data_up = "";
                    data_right = "";
                    data_down = "";
                    jumpurl = "";

                    html += "<td id='td" + num + "' style='width: 182px; height: 198px;' ></td>";
                }
                num++;
            }
            html += "</tr>"
        }
        html += "</table>";
        var table = document.all("page_content");
        table.innerHTML = html;
    },
    enter: function (key) {
        var that = historyInstance;
        var ctr = tableEvent.curCtr;
        if (!ctr) return;

        var content_code = "", category_code = "";;
        var imglist = "", pagecode = "", areacode = "";
        var backUrl = "", targetUrl = "", callback = "";


        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;


        backUrl = tp.util.getQueryString("backUrl");
        backUrl = encodeURIComponent(backUrl);

        callback = config.portal_history_url;
        callback = common.setBaseParam(callback);
        callback = tp.util.appendParam(callback, "pageindex", that.pageIndex);
        callback = tp.util.appendParam(callback, "focusid", tableEvent.curid);
        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);

        targetUrl = common.setBaseParam(targetUrl);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);
    },
    esc: function (key) {
        var that = historyInstance;
        tableEvent.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    noMove: function (attr) {
        var that = historyInstance;
        if (attr == tp_enum_moveData.down)//向下翻页
        {
            if (that.pageIndex == that.pageNumber) return;
            that.loadData(that.pageIndex + 1);
            that.actionlog("下翻页", "");
        }
        else if (attr == tp_enum_moveData.up)//向上翻页
        {
            if (that.pageIndex == 1) return;
            that.loadData(that.pageIndex - 1);
            that.actionlog("上翻页", "");
        }
    },
    after_selctr: function (ctr) {
        var that = historyInstance;
        if (!ctr) return;
        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var l_title = d_title.children[0];
        var smname = "", name = "";
        var width = ctr.offsetWidth;
        name = d_title.getAttribute("data-title")
        smname = l_title.innerHTML;

        if (name == smname) return;
        var html = "<marquee scrollamount='3' scrolldelay='2' style=\"width:" + width + "px;\" class='content-info-marquee' behavior='scroll' loop='-1' >" + name + "</marquee>";
        d_title.innerHTML = html;
        d_title.setAttribute("data-title", smname);
    },
    after_unselctr: function (ctr) {
        var that = historyInstance;
        if (!ctr) return;
        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var m_title = d_title.children[0];
        var smname = "", name = "";
        smname = d_title.getAttribute("data-title")
        name = m_title.innerHTML;

        var html = "<label>" + smname + "</label>";
        d_title.innerHTML = html;
        d_title.setAttribute("data-title", name);
    }, getActionDetail: function () {
        var that = historyInstance;
        var curtd = null, detail = "";

        curtd = tableEvent.curCtr;
        if (curtd != null) {
            detail = common.getActionDetail(curtd);
        }

        return detail;
    },
    actionlog: function (action, detail) {
        var that = historyInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "使用记录页_页码" + "[" + that.pageIndex + "]",
            detail: detail
        });
    }
};