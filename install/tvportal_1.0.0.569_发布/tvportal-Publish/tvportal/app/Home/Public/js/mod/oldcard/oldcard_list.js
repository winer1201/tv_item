function page_init() {
    oldcardListInstance.init();
}

var oldcardListInstance = {
    list: null,
    areacode: "",
    category_code: "",
    focusid: "",
    backUrl: "",
    pageIndex: 0,
    itemTotal: 0,
    pageNumber: 0,
    maxRow: 2,
    maxCol: 6,
    defaultid: "td0",
    init: function () {
        var that = oldcardListInstance;
        //加载背景图片
        loadingHelper.loadbg();

        that.areacode = tp.util.getQueryString("areacode");
        that.category_code = tp.util.getQueryString("category_code");
        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");

        var url = config.tps_content_list_url;
        url = tp.util.appendParam(url, "areacode", that.areacode);
        url = tp.util.appendParam(url, "category_code", that.category_code);

        if (that.focusid && that.focusid != "")
            that.defaultid = that.focusid;

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                tableEvent.init({
                    defaultid: that.defaultid,
                    doEnter: that.enter,
                });
            }
        });

        
        tp_ui.popup.loading.close();
        //tp.ajax({
        //    url: url,
        //    success: function (data) {
        //        //数据格式化
        //        that.initData(data);
        //        loadingHelper.loadimg();
        //        tableEvent.init({
        //            defaultid: that.defaultid
        //        });
        //        tp_ui.popup.loading.close();
        //    },
        //    error: function (status) {
        //        console.log(status);
        //    },
        //    loading: function () {
        //        console.log('loading');
        //    }
        //});
    },
    initData: function (data) {
        var that = oldcardListInstance;
        if (!data) return;
        var list = JSON.parse(data);
        if (list.retcode != 0) return;
        that.itemTotal = list.totalcount;

        that.list = list;
        that.pageIndex = 1;
        that.pageNumber = Math.ceil(that.itemTotal / (that.maxCol * that.maxRow));
        //初始化标题
        that.formatTitle();
        //初始化页码
        that.formatNumber();
        //初始化列表
        that.formatTableData(that.list.data);
    },
    //格式化标题
    formatTitle: function () {
        var that = oldcardListInstance;
        var title = that.list.category_name;
        var divTitle = document.all("page-title");
        divTitle.innerHTML = "<label id='lbltitle'>" + title + "</label>";
    },
    //格式化页码
    formatNumber: function () {
        var that = oldcardListInstance;
        var divNumber = document.all("page-number");
        divNumber.innerHTML = "<label>" + that.pageIndex + "</label><label style='font-size: 20px;'>/" + that.pageNumber + "</label>";
    },
    //格式化数据列表
    formatTableData: function (datalist) {
        var html = "", img = "", name = "", jumptype = "", data_left = "", data_up = "", data_right = "", data_down = "", guid = "";
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
                    name = contentInfo.contentname;

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
                    html += "</div><div class='content-info'><label>";
                    html += name;
                    html += "</label></div></td>";
                }
                else {
                    img = "";
                    name = "";
                    data_left = "";
                    data_up = "";
                    data_right = "";
                    data_down = "";
                    jumpurl = "";

                    html += "<td id='td" + num + "' style='width: 182px; height: 198px;' ></td>";
                }
                //html += "<td id='td" + num + "' style='width: 182px; height: 198px;' jump-url='" + jumpurl + "' data-left='" + data_left + "' data-up='" + data_up + "' data-right='" + data_right + "' data-down='" + data_down + "' ><div class='tile'>";
                //html += img;
                //html += "</div><div class='content-info'><label>";
                //html += name;
                //html += "</label></div></td>";
                num++;
            }
            html += "</tr>"
        }
        html += "</table>";
        var table = document.all("page_content");
        table.innerHTML = html;
    },
    enter: function (key) {
        var that = oldcardListInstance;
        var ctr = tableEvent.curCtr;
        if (!ctr) return;

        var id = ctr.getAttribute("id");
        var callback = "", url = "";

        callback = config.portal_oldcard_list_url;
        callback = common.setBaseParam(callback);
        //callback = tp.util.appendParam(callback, "areacode", that.areacode);
        callback = tp.util.appendParam(callback, "focusid", id);
        callback = tp.util.appendParam(callback, "backUrl", encodeURIComponent(that.backUrl));
        callback = encodeURIComponent(callback);

        if (id == "td3")//新增绑定
            url = config.portal_oldcard_bind_url;
        else //查看绑定
            url = config.portal_oldcard_info_url;            
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", callback);

        tp.util.redirectUrl(url);
    }
};