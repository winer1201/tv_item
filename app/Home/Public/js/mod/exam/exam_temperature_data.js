function page_init() {
    exam_temperature_data.init();
}

var exam_temperature_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    data_alllength: 0,
    data_loadsize: 80,
    data_inited: false,
    data_curpage: 0,
    data_loadfinished: false,
    newreach_token: "",
    defaultid: "",
    datalist: [
    {
        date: "2016-09-28 23:56",
        type: "口腔体温",
        cel: "34.38",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-28 20:37",
        type: "口腔体温",
        cel: "36.34",
        celflag: 0,
        result: "体温正常",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-28 12:48",
        type: "口腔体温",
        cel: "34.4",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-28 12:32",
        type: "口腔体温",
        cel: "34.25",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-28 12:27",
        type: "口腔体温",
        cel: "33.83",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-27 00:58",
        type: "口腔体温",
        cel: "35.32",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-27 00:55",
        type: "口腔体温",
        cel: "34.66",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-27 00:52",
        type: "口腔体温",
        cel: "35.66",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-26 21:24",
        type: "口腔体温",
        cel: "33.81",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-26 21:22",
        type: "口腔体温",
        cel: "33.02",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    },
    {
        date: "2016-09-26 19:57",
        type: "口腔体温",
        cel: "33.24",
        celflag: -1,
        result: "体温偏低",
        device: "爱康泰体温计"
    }],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.newreach_token = tp.util.getQueryString("newreach_token");
        that.loaddata(function () {
            that.formatdata(true);
            that.listen();
        });
    },
    loaddata: function (callback) {
        var that = exam_temperature_data;
        var url = config.cbs_newreach_healthdata + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        if (that.data_loadfinished) {
            callback();
            return;
        }

        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "measure_type", "bt");
        url = tp.util.appendParam(url, "timetype", "3");
        url = tp.util.appendParam(url, "page", that.data_curpage);
        url = tp.util.appendParam(url, "pagesize", that.data_loadsize);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //that.location();
                callback();
            }
        });
        if (!that.data_inited)
            that.datalist = [];
        that.data_inited = true;
        //loaddata
        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                var jsondata = that.initData(data);
                tp_ui.popup.loading.close();
                if (jsondata && jsondata.retcode == 0 && jsondata.data) {
                    that.data_alllength = jsondata.data.account;
                    that.data_curpage += 1;
                    var datalist = jsondata.data.datalist;

                    for (var i = 0; i < datalist.length; i++) {
                        that.datalist.push(datalist[i]);
                    }

                    that.datalength += datalist.length;

                    if (that.datalength >= that.data_alllength)
                        that.data_loadfinished = true;
                    else if (datalist.length < that.data_loadsize)
                        that.data_loadfinished = true;
                }
                else {
                    tp.util.showMsg("data-error");
                }
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("data-error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });

    },
    initData: function (json) {
        var that = this;
        if (!json) return;
        var data = JSON.parse(json);
        return data;
    },
    listen: function () {
        var that = exam_temperature_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_temperature_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_temperature_trend_url;

            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

            tp.util.redirectUrl(url);
        }
        else if (key == tp_move_key.down) {
            that.changePage(that.curPageIndex + 1);
        }
        else if (key == tp_move_key.up) {
            that.changePage(that.curPageIndex - 1);
        }

    },
    formatdata: function (changepage) {
        var that = exam_temperature_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        if (changepage)
            that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_temperature_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "", arr_down_img = "",typeStr = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        arrimg = "<img src='" + arrowurl + "' />";
        arr_down_img = "<img src='" + arrow_down_url + "' />";
        up = document.all("upctr");
        down = document.all("downctr");

        for (var i = 0; i <= 7; i++) {
            startindex = i + start;
            if (startindex <= end) {
                obj = that.datalist[i + start];
                if (!obj) {
                    html += that.getEmptyHtml();
                    continue;
                }
                switch (obj.btType) {
                    case "oral": typeStr = "口腔体温"; break;
                    case "rect": typeStr = "直肠体温"; break;
                    case "body": typeStr = "腋下体温"; break;
                    default: typeStr = ""; break;
                }
                flag = "";
                html += "<tr>";
                html += "<td>" + obj.measureTime + "</td>";
                html += "<td>" + typeStr + "</td>";
                if (obj.btValue < 36)
                    html += "<td><label class='exam-form-data-blue'>" + obj.btValue + "</label>" + arr_down_img + "</td>";
                else if(obj.btValue>37)
                    html += "<td><label class='exam-form-data-red'>" + obj.btValue + "</label>" + arrimg + "</td>";
                else
                    html += "<td>" + obj.btValue + "</td>";
                html += "<td>" + obj.comments + "</td>";
                html += "<td>" + obj.mdevice + "</td>";

                html += "</tr>";
            }
            else {
                html += that.getEmptyHtml();
            }
        }

        var tbody = document.all("tbbody");
        tbody.innerHTML = html;

        that.curPageIndex = index;

        if (index <= 1)
            up.style.display = "none";
        else
            up.style.display = "block";

        if (index >= that.pageAccount) {
            that.loaddata(function () {
                that.formatdata(false);
                if (that.pageAccount <= that.curPageIndex)
                    down.style.display = "none";
                else
                    down.style.display = "block";
            });
        }
        else
            down.style.display = "block";
    },
    getEmptyHtml: function () {
        return "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
    }
}