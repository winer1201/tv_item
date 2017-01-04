//function page_init() {
//    albumListInstance.init();
//}

var albumListInstance = {
    list: null,
    areacode: "",
    album_code: "",
    album_name:"",
    focusid: "",
    backUrl: "",
    pageIndex: 0,
    itemTotal: 0,
    pageNumber: 0,
    maxRow: 2,
    maxCol: 6,
    defaultid: "td0",
    init: function () {
        var that = albumListInstance;
        var index = 1;
        //加载背景图片
        loadingHelper.loadbg();

        that.areacode = m_areacode;
        that.album_code = tp.util.getQueryString("album_code");
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
        var that = albumListInstance;

        var count = 0, offset = 0;

        index = parseInt(index);
        var url = config.tps_content_list_url;
        url = tp.util.appendParam(url, "areacode", that.areacode);
        url = tp.util.appendParam(url, "content_scope", "album");
        url = tp.util.appendParam(url, "album_code", that.album_code);

        count = that.maxCol * that.maxRow;
        offset = (index - 1) * count;

        url = tp.util.appendParam(url, "count", count);
        url = tp.util.appendParam(url, "offset", offset);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                tableEvent.init({
                    defaultid: that.defaultid,
                    noMove: that.noMove,
                    doEnter: that.enter,
                    after_selctr: that.after_selctr,
                    after_unselctr: that.after_unselctr
                    //doEsc:that.esc
                });
                that.actionlog("进入", "");
            }
        });
        tp.ajax({
            url: url,
            success: function (data) {
                that.pageIndex = index;
                //数据格式化
                that.initData(data);
                loadingHelper.loadimg();
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
    initData: function (data) {
        var that = albumListInstance;
        if (!data) return;
        var list = JSON.parse(data);
        if (list.retcode != 0) return;
        that.itemTotal = list.totalcount;

        that.list = list;
        //that.pageIndex = 1;
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
        var that = albumListInstance;
        var title = that.list.album_name;
        var divTitle = document.all("page-title");
        that.album_name = that.list.album_name;
        divTitle.innerHTML = "<label id='lbltitle'>" + title + "</label>";
    },
    //格式化页码
    formatNumber: function () {
        var that = albumListInstance;
        var divNumber = document.all("page-number");
        divNumber.innerHTML = "<label>" + that.pageIndex + "</label><label style='font-size: 20px;'>/" + that.pageNumber + "</label>";
    },
    //格式化数据列表
    formatTableData: function (datalist) {
        var that = albumListInstance;
        var html = "", img = "", name = "", smname = "", jumptype = "", data_left = "", data_up = "", data_right = "", data_down = "", guid = "";
        var num = 0, account = 0;
        var dimgurl = "", appcode = "", videocode = "";
        var contentInfo = null;
        dimgurl = "../../app/home/public/img/default/default_list.png";
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
                    name = contentInfo.colname;
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
    noMove: function (attr) {
        var that = albumListInstance;
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
    enter: function (key) {
        var that = albumListInstance;
        var ctr = tableEvent.curCtr;
        if (!ctr) return;

        var content_code = "", album_code = "";;
        var imglist = "", pagecode = "", areacode = "";
        var backUrl = "", targetUrl = "", targetcode = "", callback = "";

        targetcode = common.getTargetcode(ctr);
        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;


        areacode = tp.util.getQueryString("areacode");
        album_code = tp.util.getQueryString("album_code");
        backUrl = tp.util.getQueryString("backUrl");
        backUrl = encodeURIComponent(backUrl);

        callback = config.portal_album_url;
        callback = common.setBaseParam(callback);
        callback = tp.util.appendParam(callback, "album_code", album_code);
        callback = tp.util.appendParam(callback, "pageIndex", that.pageIndex);
        callback = tp.util.appendParam(callback, "focusid", tableEvent.curid);
        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);
        targetUrl = common.setBaseParam(targetUrl);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);

        //记录用户行为
        that.actionlog("点击", "内容图标_[" + targetcode + "]");
    },
    esc: function (key) {
        var that = albumListInstance;
        //返回上一页
        //TODO：

        var backUrl = tp.util.getQueryString("backUrl");
        if (!backUrl) return;
        tp.util.redirectUrl(backUrl);
        //记录用户行为
        that.actionlog("外设返回", "");
    },
    after_selctr: function (ctr) {
        var that = albumListInstance;
        if (!ctr) return;
        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var l_title = d_title.children[0];
        var smname = "", name = "";
        var width = ctr.offsetWidth;
        //if (ctr.style.width && ctr.style.width != "")
        //    width = ctr.style.width;
        name = d_title.getAttribute("data-title")
        smname = l_title.innerHTML;

        if (name == smname) return;
        var html = "<marquee scrollamount='100' scrolldelay='2000' style=\"width:" + width + "px;\" class='content-info-marquee' behavior='scroll' loop='-1' >" + name + "</marquee>";
        d_title.innerHTML = html;
        d_title.setAttribute("data-title", smname);
    },
    after_unselctr: function (ctr) {
        var that = albumListInstance;
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
    },
    actionlog: function (action, detail) {
        var that = albumListInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "专辑列表页" + "[" + that.album_name + "("+that.album_code+")]_页码[" + that.pageIndex + "]",
            detail: detail
        });
    }
};


document.body.onload = function () {
    albumListInstance.init();
}